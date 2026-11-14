import * as THREE from "three";

/**
 * 原版 PCSS 软阴影在 npm three r187 上的兼容实现。
 *
 * 原版引擎内嵌的 Three 版本允许直接替换 ShaderChunk.shadowmap_pars_fragment
 * （其 PCF 阴影图以 RGBA 打包深度，可由 getShadow 内读取原始深度）。
 * r187 改为 sampler2DShadow 硬件比较采样，chunk 布局已不兼容。
 * 这里保留原版算法（blocker search + 可变半影 + 接收面深度梯度偏移），
 * 但改为直接采样太阳阴影深度纹理，并在标准材质光照累加后乘以软阴影因子。
 */
export interface SoftSunHandle {
  uniforms: Record<string, THREE.IUniform>;
  update: (light: THREE.DirectionalLight, camera: THREE.PerspectiveCamera) => void;
  dispose: () => void;
}

const buildPcssFragment = (searchTaps: number, filterTaps: number) => `
uniform sampler2D uSLShadow;
uniform vec2 uSLMapSize;
uniform vec2 uSLFrustum;
uniform float uSLDepth;
uniform float uSLBias;

float slIGN( vec2 p ) {
  return fract( 52.9829189 * fract( dot( p, vec2( 0.06711056, 0.00583715 ) ) ) );
}
vec2 slVogel( int i, int n, float phi ) {
  float r = sqrt( ( float( i ) + 0.5 ) / float( n ) );
  float th = float( i ) * 2.39996323 + phi;
  return r * vec2( cos( th ), sin( th ) );
}
float slPCSS( vec4 coord ) {
  if ( coord.w <= 0.0 ) return 1.0;
  vec3 sc = coord.xyz / coord.w;
  if ( sc.x < 0.0 || sc.x > 1.0 || sc.y < 0.0 || sc.y > 1.0 || sc.z > 1.0 ) return 1.0;
  vec2 texel = 1.0 / max( uSLMapSize, vec2( 1.0 ) );
  float phi = slIGN( gl_FragCoord.xy ) * 6.2831853;
  // receiver plane depth bias: depth gradient of the receiver in shadow-map uv space
  vec3 dx = dFdx( sc ), dy = dFdy( sc );
  float det = dx.x * dy.y - dx.y * dy.x;
  vec2 dz = vec2( 0.0 );
  if ( abs( det ) > 1e-12 ) dz = vec2( dy.y * dx.z - dx.y * dy.z, dx.x * dy.z - dy.x * dx.z ) / det;
  float maxSlope = 0.0030 / max( texel.x, texel.y );
  dz = clamp( dz, vec2( - maxSlope ), vec2( maxSlope ) );
  float zr = sc.z - uSLBias - ( abs( dz.x ) * texel.x + abs( dz.y ) * texel.y ) * 0.35;

  vec2 searchR = 0.55 / max( uSLFrustum, vec2( 1.0 ) );
  float blk = 0.0, nb = 0.0;
  for ( int i = 0; i < ${searchTaps}; i ++ ) {
    vec2 o = slVogel( i, ${searchTaps}, phi ) * searchR;
    float d = texture2D( uSLShadow, sc.xy + o ).r;
    if ( d < zr ) { blk += d; nb += 1.0; }
  }
  if ( nb < 0.5 ) return 1.0;

  float avg = blk / nb;
  float distM = max( zr - avg, 0.0 ) * uSLDepth;
  float penM = clamp( distM * 0.022, 0.012, 0.60 );
  vec2 filtR = max( vec2( penM ) / max( uSLFrustum, vec2( 1.0 ) ), texel * 1.25 );

  float lit = 0.0;
  for ( int i = 0; i < ${filterTaps}; i ++ ) {
    vec2 o = slVogel( i, ${filterTaps}, phi + 1.7 ) * filtR;
    float d = texture2D( uSLShadow, sc.xy + o ).r;
    lit += step( zr, d );
  }
  lit /= float( ${filterTaps} );
  vec2 edge = min( sc.xy, 1.0 - sc.xy );
  lit = mix( 1.0, lit, smoothstep( 0.0, 0.02, min( edge.x, edge.y ) ) );
  return lit;
}
`;

/** 给场景中所有标准材质注入 PCSS 软阴影（保留材质原有的 onBeforeCompile 补丁） */
export function installSoftSunShadows(
  scene: THREE.Scene,
  light: THREE.DirectionalLight,
  bounds: { width: number; height: number; depth: number },
  options: { searchTaps?: number; filterTaps?: number } = {},
): SoftSunHandle {
  const searchTaps = Math.max(4, Math.round(options.searchTaps ?? 8));
  const filterTaps = Math.max(6, Math.round(options.filterTaps ?? 12));
  const PCSS_FRAGMENT = buildPcssFragment(searchTaps, filterTaps);
  const uniforms: Record<string, THREE.IUniform> = {
    uSLShadow: { value: null },
    uSLShadowMatrix: { value: new THREE.Matrix4() },
    uSLMapSize: { value: new THREE.Vector2(light.shadow.mapSize.x, light.shadow.mapSize.y) },
    uSLFrustum: { value: new THREE.Vector2(bounds.width, bounds.height) },
    uSLDepth: { value: bounds.depth },
    uSLBias: { value: Math.abs(light.shadow.bias) + 0.00006 },
  };

  const patched: THREE.Material[] = [];
  const originalCompile = new Map<THREE.Material, THREE.Material["onBeforeCompile"]>();
  const seen = new Set<THREE.Material>();
  scene.traverse((object: any) => {
    // 视图模型（层 1）单独一遍渲染，点光补光不应被太阳阴影压暗
    if (object.layers && ((object.layers.mask ?? 1) & 1) === 0) return;
    const materials = Array.isArray(object.material) ? object.material : object.material ? [object.material] : [];
    for (const material of materials) {
      if (!material || seen.has(material)) continue;
      seen.add(material);
      if (!material.isMeshStandardMaterial && !material.isMeshPhysicalMaterial) continue;
      const previous = material.onBeforeCompile;
      originalCompile.set(material, previous);
      material.onBeforeCompile = function (shader: THREE.WebGLProgramParametersWithUniforms, renderer: THREE.WebGLRenderer) {
        previous?.call(this, shader, renderer);
        shader.uniforms.uSLShadow = uniforms.uSLShadow;
        shader.uniforms.uSLShadowMatrix = uniforms.uSLShadowMatrix;
        shader.uniforms.uSLMapSize = uniforms.uSLMapSize;
        shader.uniforms.uSLFrustum = uniforms.uSLFrustum;
        shader.uniforms.uSLDepth = uniforms.uSLDepth;
        shader.uniforms.uSLBias = uniforms.uSLBias;
        shader.vertexShader = shader.vertexShader
          .replace(
            "#include <common>",
            "#include <common>\nuniform mat4 uSLShadowMatrix;\nvarying vec4 vSLShadowCoord;",
          )
          .replace(
            "#include <project_vertex>",
            `#include <project_vertex>
vec4 slWorldPos = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
slWorldPos = batchingMatrix * slWorldPos;
#endif
#ifdef USE_INSTANCING
slWorldPos = instanceMatrix * slWorldPos;
#endif
vSLShadowCoord = uSLShadowMatrix * modelMatrix * slWorldPos;`,
          );
        shader.fragmentShader = shader.fragmentShader
          .replace(
            "#include <common>",
            `#include <common>\nvarying vec4 vSLShadowCoord;\n${PCSS_FRAGMENT}`,
          )
          .replace(
            "#include <lights_fragment_end>",
            `#include <lights_fragment_end>
float slShadowFactor = slPCSS( vSLShadowCoord );
reflectedLight.directDiffuse *= slShadowFactor;
reflectedLight.directSpecular *= slShadowFactor;`,
          );
      };
      material.needsUpdate = true;
      patched.push(material);
    }
  });

  return {
    uniforms,
    update(nextLight, camera) {
      // r187：阴影图深度存放在 depthTexture，map.texture 是未使用的颜色附件
      const map = nextLight.shadow.map;
      uniforms.uSLShadow.value = map ? map.depthTexture ?? map.texture : null;
      uniforms.uSLShadowMatrix.value.copy(nextLight.shadow.matrix);
      const shadowCamera = nextLight.shadow.camera;
      uniforms.uSLFrustum.value.set(
        shadowCamera.right - shadowCamera.left,
        shadowCamera.top - shadowCamera.bottom,
      );
      uniforms.uSLDepth.value = shadowCamera.far - shadowCamera.near;
      uniforms.uSLMapSize.value.set(nextLight.shadow.mapSize.x, nextLight.shadow.mapSize.y);
      void camera;
    },
    dispose() {
      // 恢复材质原有的 onBeforeCompile，便于按画质重新注入不同采样数
      for (const material of patched) {
        const previous = originalCompile.get(material);
        if (previous) material.onBeforeCompile = previous;
        material.needsUpdate = true;
      }
      originalCompile.clear();
      patched.length = 0;
    },
  };
}
