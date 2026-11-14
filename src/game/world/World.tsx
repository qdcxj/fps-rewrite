import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getLevel } from "../levels";
import { runtime } from "../runtime";
import { useGame } from "../store";
import { THEMES } from "../themes";
import { useMat } from "../useMaterial";

/** 中继旁的一次性弹药补给箱（原版 +60 备弹） */
function AmmoCaches() {
  const ready = useGame((s) => s.worldReady);
  const used = useGame((s) => s.caches);
  const crate = useMat("paint_yellow", "#a45f2a", { triplanar: true });
  const lid = useMat("steel_dark", "#3a3f42", { triplanar: true });

  if (!ready) return null;
  return (
    <>
      {runtime.ammoCaches.map((cache, i) =>
        used[i] ? null : (
          <group key={i} position={[cache.pos.x, 0.26, cache.pos.z]}>
            <mesh material={crate} castShadow receiveShadow>
              <boxGeometry args={[0.72, 0.5, 0.5]} />
            </mesh>
            <mesh material={lid} position={[0, 0.27, 0]}>
              <boxGeometry args={[0.52, 0.06, 0.34]} />
            </mesh>
          </group>
        ),
      )}
    </>
  );
}

/** 软圆点粒子贴图：让雪片/粉尘不再是方块像素 */
let particleTexture: THREE.CanvasTexture | null = null;
function getParticleTexture() {
  if (particleTexture) return particleTexture;
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d")!;
  const gradient = context.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.35, "rgba(255,255,255,0.85)");
  gradient.addColorStop(0.7, "rgba(255,255,255,0.28)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);
  particleTexture = new THREE.CanvasTexture(canvas);
  particleTexture.colorSpace = THREE.SRGBColorSpace;
  return particleTexture;
}

/** 主题天气粒子：工厂粉尘 / 沙漠扬沙 / 雪地落雪 */
function ThemeWeather() {
  const levelId = useGame((s) => s.levelId);
  const theme = THEMES[getLevel(levelId).theme];
  const particles = theme.particles;
  const pointsRef = useRef<THREE.Points>(null);
  const geoRef = useRef<THREE.BufferGeometry>(null);

  const data = useMemo(() => {
    if (!particles) return null;
    const positions = new Float32Array(particles.count * 3);
    for (let i = 0; i < particles.count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 44;
      positions[i * 3 + 1] = Math.random() * 24;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 44;
    }
    return { positions };
  }, [theme.id, particles]);

  useFrame((state, delta) => {
    if (!data || !particles || !geoRef.current) return;
    const attr = geoRef.current.getAttribute("position") as THREE.BufferAttribute;
    const array = attr.array as Float32Array;
    const dt = Math.min(delta, 0.05);
    const time = state.clock.elapsedTime;
    for (let i = 0; i < particles.count; i++) {
      const i3 = i * 3;
      // 每片雪花横向摆动，避免整片粒子匀速平移的机械感
      const sway = Math.sin(time * 0.9 + i * 1.7) * 0.16;
      array[i3] += (particles.drift + sway) * dt;
      array[i3 + 1] -= particles.fall * dt;
      array[i3 + 2] += particles.drift * 0.35 * dt;
      if (array[i3] > 22) array[i3] = -22;
      else if (array[i3] < -22) array[i3] = 22;
      if (array[i3 + 1] < 0) array[i3 + 1] = 24;
      else if (array[i3 + 1] > 24) array[i3 + 1] = 0;
      if (array[i3 + 2] > 22) array[i3 + 2] = -22;
      else if (array[i3 + 2] < -22) array[i3 + 2] = 22;
    }
    attr.needsUpdate = true;
    pointsRef.current?.position.set(state.camera.position.x, 0, state.camera.position.z);
  });

  if (!data || !particles) return null;
  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry ref={geoRef}>
        <bufferAttribute attach="attributes-position" args={[data.positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={particles.color}
        size={particles.size}
        map={getParticleTexture()}
        alphaTest={0.02}
        transparent
        opacity={particles.opacity}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

/**
 * 世界雾与主题环境。
 * 光照现在来自原版太阳（gameplay.ts）与天空生成的 PMREM 环境贴图，
 * 不再使用 R3F 手搭的补光灯组。
 */
export default function World() {
  const levelId = useGame((s) => s.levelId);
  const theme = THEMES[getLevel(levelId).theme];
  return (
    <>
      <fog attach="fog" args={[theme.fog.color, theme.fog.near, theme.fog.far]} />
      <ThemeWeather />
      <AmmoCaches />
    </>
  );
}
