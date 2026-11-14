﻿// @ts-nocheck
import * as THREE from "three";
import { harborAudio } from "../../audio";
import { runtime } from "../runtime";
import { useGame } from "../store";
import { getLevel, type LevelId } from "../levels";
import { THEMES } from "../themes";
import type { MaterialSystem } from "../materials";
import { LEGACY_ENEMY_MODULE } from "./enemyBuilders";
import { LEGACY_FX_MODULE } from "./fxBuilders";
import { LEGACY_PHYSICS_MODULE } from "./physicsBuilders";
import { legacyEnvironmentEvents, legacyPrepasses, legacyRenderResolution } from "./environment";
import { LEGACY_POST_MODULE, POST_QUALITY_PRESETS } from "./postBuilders";
import { LEGACY_SKY_MODULE } from "./skyBuilders";
import { installSoftSunShadows, type SoftSunHandle } from "./sunShadows";
import { LEGACY_WEAPON_MODULE } from "./weaponBuilders";

/** 原版确定性随机源（支持 fork） */
function makeRng(seed = 4207): (() => number) & { fork: () => () => number } {
  let s = seed >>> 0;
  const rng = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
  rng.fork = () => makeRng((s = (s * 1664525 + 1013904223) >>> 0));
  return rng;
}

function makeEvents() {
  const map = new Map<string, Set<(payload?: unknown) => void>>();
  return {
    on(name: string, fn: (payload?: unknown) => void) {
      if (!map.has(name)) map.set(name, new Set());
      map.get(name)!.add(fn);
      return () => map.get(name)?.delete(fn);
    },
    off(name: string, fn: (payload?: unknown) => void) {
      map.get(name)?.delete(fn);
    },
    emit(name: string, payload?: unknown) {
      map.get(name)?.forEach((fn) => {
        try {
          fn(payload);
        } catch (err) {
          console.error("[events]", name, err);
        }
      });
    },
  };
}

export interface LegacyPhysicsHandle {
  physics: any;
  ctx: { level: any; [key: string]: unknown };
  ground?: any;
}

let physicsHandle: LegacyPhysicsHandle | null = null;

/** 原版碰撞/导航系统：环境构建时持续向其添加碰撞盒 */
export function getLegacyPhysicsHandle(): LegacyPhysicsHandle {
  if (!physicsHandle) {
    const ctx: Record<string, unknown> = { level: null };
    physicsHandle = { physics: LEGACY_PHYSICS_MODULE(ctx), ctx };
  }
  return physicsHandle;
}

const eyeVec = new THREE.Vector3();
const TEMP_A = new THREE.Vector3();
const TEMP_B = new THREE.Vector3();
const STEP_ORIGIN = new THREE.Vector3();
const STEP_DOWN = new THREE.Vector3(0, -1, 0);

const playerAdapter = {
  pos: runtime.pos,
  eye: eyeVec,
  get alive() {
    return runtime.health > 0;
  },
  get crouching() {
    return runtime.crouching;
  },
  get sprinting() {
    return runtime.sprinting;
  },
  get onGround() {
    return runtime.onGround;
  },
  get speed() {
    return Math.hypot(runtime.vel.x, runtime.vel.z);
  },
  vel: runtime.vel,
  addRecoil(pitch: number, yaw: number) {
    // 原版：后坐力写入 kick 弹簧，衰减后准心自动回正
    const scale = useGame.getState().settings.reducedShake ? 0.55 : 1;
    const adsScale = runtime.ads > 0.5 ? 0.6 : 1;
    runtime.kickPitch += pitch * adsScale * scale;
    runtime.kickYaw += yaw * adsScale * scale;
  },
  addShake(amount: number) {
    runtime.shake = Math.min(1.1, runtime.shake + amount);
  },
  damage(amount: number, source?: THREE.Vector3) {
    runtime.damagePlayer(amount, source?.x, source?.z);
  },
};

const inputAdapter = {
  get fire() {
    return runtime.input.fire;
  },
  get ads() {
    return runtime.input.ads;
  },
  get move() {
    return { x: runtime.input.moveX, y: runtime.input.moveY };
  },
  get look() {
    return { dx: runtime.input.lookX, dy: runtime.input.lookY };
  },
  pressed(name: string) {
    if (!runtime.input.pressed.has(name)) return false;
    runtime.input.pressed.delete(name);
    return true;
  },
};

/** 后处理镜头污渍/噪点纹理（原版由程序化贴图模块生成，这里用等价灰度噪声） */
function makeNoiseTexture(): THREE.Texture {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d")!;
  const image = context.createImageData(size, size);
  for (let i = 0; i < size * size; i++) {
    const x = i % size;
    const y = (i / size) | 0;
    let value = 0;
    let amplitude = 0.5;
    let frequency = 0.09;
    for (let octave = 0; octave < 4; octave++) {
      const n =
        Math.sin(x * frequency * 12.9898 + y * frequency * 78.233) * 43758.5453;
      value += (n - Math.floor(n)) * amplitude;
      amplitude *= 0.5;
      frequency *= 2.1;
    }
    const shade = Math.max(0, Math.min(255, value * 210));
    image.data[i * 4] = shade;
    image.data[i * 4 + 1] = shade;
    image.data[i * 4 + 2] = shade;
    image.data[i * 4 + 3] = 255;
  }
  context.putImageData(image, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.NoColorSpace;
  return texture;
}

function makeLightPool(scene: THREE.Scene) {
  // 原版：6 盏闪光灯自初始化起常驻场景，从不切换 visible，仅动画 intensity。
  // 点光源数量恒定 → three.js 材质程序缓存键不变 → 战斗/爆炸期间不会再
  // 触发全部世界材质重编译（此前的 visible 切换是枪战时突发卡顿的根源）。
  type Entry = {
    light: THREE.PointLight;
    busy: boolean;
    ttl: number;
    dur: number;
    peak: number;
    persistent: boolean;
  };
  const pool: Entry[] = Array.from({ length: 6 }, () => {
    const light = new THREE.PointLight(0xffffff, 0, 12, 2);
    scene.add(light);
    return { light, busy: false, ttl: 0, dur: 0, peak: 0, persistent: false };
  });
  return {
    flash(pos: THREE.Vector3, color = 16763008, intensity = 30, distance = 10, dur = 0.06) {
      // 原版：优先取空闲灯；全忙时取最早到期且非持久的灯复用
      const item =
        pool.find((entry) => !entry.busy) ??
        pool.filter((entry) => !entry.persistent).sort((a, b) => a.ttl - b.ttl)[0];
      if (!item) return;
      item.light.position.copy(pos);
      item.light.color.setHex(color);
      item.light.distance = distance;
      item.light.intensity = intensity;
      item.busy = true;
      item.ttl = dur;
      item.dur = dur;
      item.peak = intensity;
      item.persistent = false;
    },
    acquire() {
      // 原版：无人机头灯从同一池中借灯（持久占用），不足时返回 null
      const item = pool.find((entry) => !entry.busy);
      if (!item) return null;
      item.busy = true;
      item.persistent = true;
      item.light.intensity = 0;
      return {
        light: item.light,
        release() {
          item.busy = false;
          item.persistent = false;
          item.light.intensity = 0;
        },
      };
    },
    dispose() {
      for (const item of pool) scene.remove(item.light);
    },
    update(dt: number) {
      for (const item of pool) {
        if (!item.busy || item.persistent) continue;
        item.ttl -= dt;
        if (item.ttl <= 0) {
          item.busy = false;
          item.light.intensity = 0;
        } else {
          item.light.intensity = item.peak * (item.ttl / item.dur);
        }
      }
    },
  };
}

/** 原版战斗判定：按目标类型伤害、爆炸与敌方射击 */
function makeCombat(ctx: Record<string, any>) {
  return {
    playerShot(origin: THREE.Vector3, dir: THREE.Vector3, opts: { damage?: number; range?: number } = {}) {
      const range = opts.range ?? 300;
      runtime.shots += 1;
      useGame.getState().registerShot();
      const wall = ctx.physics.raycast(origin, dir, range);
      const hit = ctx.enemies.raycast(origin, dir, wall ? wall.dist : range);
      if (hit) {
        runtime.hits += 1;
        const weak = hit.part === "weak";
        // 原版伤害按目标类型：无人机 40、猎犬 34（无弱点倍率）
        const damage = hit.enemy.type === "gull" ? 40 : 34;
        const killed =
          hit.enemy.damage(damage, hit.point, dir, hit.part) === true;
        const result = {
          point: hit.point,
          normal: hit.normal ? hit.normal.clone() : dir.clone().negate(),
          dist: hit.dist,
          surface: "enemy",
          enemy: hit.enemy,
          part: hit.part,
          dir,
          from: "player",
          killed,
        };
        ctx.events.emit("impact", result);
        ctx.events.emit("player:hitEnemy", {
          enemy: hit.enemy,
          part: hit.part,
          killed,
          weak,
        });
        return result;
      }
      if (wall) {
        const result = {
          point: wall.point,
          normal: wall.normal,
          dist: wall.dist,
          surface: wall.surface,
          enemy: null,
          dir,
          from: "player",
        };
        ctx.events.emit("impact", result);
        return result;
      }
      return null;
    },
    enemyShot(origin: THREE.Vector3, dir: THREE.Vector3, opts: { damage?: number; range?: number } = {}) {
      const damage = opts.damage ?? 6;
      const range = opts.range ?? 200;
      const wall = ctx.physics.raycast(origin, dir, range);
      const limit = wall ? wall.dist : range;
      const player = ctx.player;
      if (player && player.alive) {
        TEMP_A.copy(player.pos);
        TEMP_A.y += 1;
        const along = TEMP_A.sub(origin).dot(dir);
        if (along > 0 && along < limit) {
          TEMP_B.copy(origin).addScaledVector(dir, along);
          const dy = Math.abs(TEMP_B.y - (player.pos.y + 0.95));
          if (Math.hypot(TEMP_B.x - player.pos.x, TEMP_B.z - player.pos.z) < 0.38 && dy < 0.95) {
            player.damage(damage, origin);
            return true;
          }
        }
      }
      if (wall) {
        ctx.events.emit("impact", {
          point: wall.point,
          normal: wall.normal,
          dist: wall.dist,
          surface: wall.surface,
          enemy: null,
          dir,
          from: "enemy",
        });
      }
      return false;
    },
    explode(pos: THREE.Vector3, radius = 5, damage = 80) {
      for (const enemy of ctx.enemies.list) {
        if (!enemy.alive) continue;
        const distance = enemy.pos.distanceTo(pos);
        if (distance >= radius) continue;
        const target = TEMP_A.copy(enemy.pos).setY(enemy.pos.y + 0.5);
        if (!ctx.physics.lineOfSight(pos, target)) continue;
        enemy.damage(
          damage * (1 - distance / radius),
          enemy.pos,
          TEMP_B.copy(enemy.pos).sub(pos).normalize(),
          "body",
        );
      }
      const player = ctx.player;
      if (player && player.alive) {
        const target = TEMP_A.copy(player.pos).setY(player.pos.y + 1);
        const distance = target.distanceTo(pos);
        if (distance < radius && ctx.physics.lineOfSight(pos, target)) {
          player.damage(damage * 0.5 * (1 - distance / radius), pos);
        }
      }
    },
  };
}

export interface LegacyGameplay {
  weapon: any;
  enemies: any;
  fx: any;
  physics: any;
  update: (dt: number) => void;
  renderFrame: (gl: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.PerspectiveCamera) => void;
  setQuality: (name: string) => void;
  dispose: () => void;
}

let active: LegacyGameplay | null = null;

export function getLegacyGameplay(): LegacyGameplay | null {
  return active;
}

export async function createLegacyGameplay(opts: {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  mats: MaterialSystem;
  physics: any;
  ground?: any;
  level?: any;
  levelId?: LevelId;
  quality?: string;
}): Promise<LegacyGameplay> {
  const { scene, camera, renderer, mats, physics, ground, level } = opts;
  const theme = THEMES[getLevel(opts.levelId ?? "harbor").theme];
  const events = makeEvents();
  const lightPool = makeLightPool(scene);

  // 主相机只渲染世界（层 0）；视图模型由独立相机（层 1）在清深度后叠加渲染，
  // 与原版 renderWorld + viewCamera 的两遍渲染一致。相机需加入场景，其子节点才会被遍历。
  camera.layers.set(0);
  scene.add(camera);

  const ctx: Record<string, any> = {
    scene,
    camera,
    viewCamera: camera,
    renderer,
    mats,
    params: {},
    quality: { ...(POST_QUALITY_PRESETS[opts.quality || "high"] || POST_QUALITY_PRESETS.high) },
    level,
    rng: makeRng(),
    events,
    time: { t: 0, dt: 0, frame: 0, real: 0 },
    player: playerAdapter,
    input: inputAdapter,
    physics,
    ground,
    render: {
      lightPool,
      scene,
      camera,
      renderer,
      post: {},
      exposure: 1,
      resolution: new THREE.Vector2(1, 1),
    },
    audio: harborAudio,
  };
  ctx.combat = makeCombat(ctx);

  // ---- 原版后处理管线（HDR 场景目标 + AO/体积光/Bloom/自适应曝光/调色）----
  const hdrDepth = new THREE.DepthTexture(4, 4);
  hdrDepth.type = THREE.UnsignedIntType;
  hdrDepth.minFilter = THREE.NearestFilter;
  hdrDepth.magFilter = THREE.NearestFilter;
  const hdrTarget = new THREE.WebGLRenderTarget(4, 4, {
    type: THREE.HalfFloatType,
    format: THREE.RGBAFormat,
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    depthBuffer: true,
    stencilBuffer: false,
    generateMipmaps: false,
    depthTexture: hdrDepth,
  });
  let postPipeline: any = null;
  const dirtTexture = makeNoiseTexture();
  try {
    postPipeline = LEGACY_POST_MODULE(renderer, ctx, { noiseTex: dirtTexture });
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.toneMappingExposure = 1;
    // 体积光依赖太阳阴影，即使画质为 low 也要启用阴影贴图（仅零强度太阳光投射）
    renderer.shadowMap.enabled = true;
    // 原版：阴影贴图不每帧重烘（相机与太阳都基本静止，隔帧更新足够）
    renderer.shadowMap.autoUpdate = false;
    renderer.shadowMap.needsUpdate = true;
  } catch (err) {
    console.warn("[legacy] post chain failed, using forward fallback", err);
    postPipeline = null;
  }
  // 原版太阳：暖色平行光 + 阴影（与世界材质、体积光和天空使用同一太阳参数）
  const sunDirection = new THREE.Vector3(...(theme.sunDirection ?? [0.916, 0.225, 0.331])).normalize();
  const sunLight = new THREE.DirectionalLight(theme.sunLight.color, theme.sunLight.intensity);
  sunLight.name = "legacy-sun";
  const sunTarget = new THREE.Vector3(-2, 15.9, -1);
  sunLight.target.position.copy(sunTarget);
  sunLight.position.copy(sunTarget).addScaledVector(sunDirection, 200);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.set(2048, 2048);
  sunLight.shadow.bias = -0.00012;
  sunLight.shadow.normalBias = 0.02;
  sunLight.shadow.radius = 1;
  const sunShadowCamera = sunLight.shadow.camera;
  sunShadowCamera.left = -90;
  sunShadowCamera.right = 90;
  sunShadowCamera.top = 90;
  sunShadowCamera.bottom = -90;
  sunShadowCamera.near = 1;
  sunShadowCamera.far = 400;
  sunShadowCamera.updateProjectionMatrix();
  scene.add(sunLight, sunLight.target);
  // 主题半球补光：雪地需要天空雪面反射形成的漫射底光，否则背光面会死黑
  let themeFill: THREE.HemisphereLight | null = null;
  if (theme.hemisphere) {
    themeFill = new THREE.HemisphereLight(
      theme.hemisphere.sky,
      theme.hemisphere.ground,
      theme.hemisphere.intensity,
    );
    themeFill.name = "theme-hemisphere";
    scene.add(themeFill);
  }
  const sunStub = {
    color: sunLight.color,
    intensity: sunLight.intensity,
    shadow: sunLight.shadow,
  };

  // ---- 阴影策略 ----
  // 默认（low/medium）走 three 原生 BasicShadowMap 硬阴影（1 次采样，最省）；
  // high/ultra 才启用自定义 PCSS（r187 兼容实现，材质创建后安装）。
  // PCSS 用 BasicShadowMap 让深度纹理保持原始可采样格式（compareFunction = null），
  // 此时可见阴影完全由自定义 PCSS 接管（sunLight.shadow.intensity = 0）。
  // 初始值会在下方 installSoftShadows() 依据画质立即校正。
  renderer.shadowMap.type = THREE.BasicShadowMap;
  sunLight.shadow.intensity = 0;
  let softShadows: SoftSunHandle | null = null;

  // ---- 原版天空穹顶（云层 / 太阳光晕 / 闪电）----
  let sky: any = null;
  let skyNoise: THREE.Texture | null = null;
  try {
    skyNoise = LEGACY_SKY_MODULE.createNoise();
    sky = LEGACY_SKY_MODULE.createSky(skyNoise);
    // 主题天空：在生成 PMREM 环境贴图前写入，保证环境反射与天空一致
    const uniforms = sky.material.uniforms;
    uniforms.uZen.value.set(...theme.sky.zenith);
    uniforms.uHor.value.set(...theme.sky.horizon);
    uniforms.uHorAway.value.set(...theme.sky.horizonAway);
    uniforms.uSunCol.value.set(...theme.sky.sun);
    scene.add(sky.mesh);
  } catch (err) {
    console.warn("[legacy] sky failed", err);
    sky = null;
  }

  // 用天空生成 PMREM 环境贴图（原版 Vy），为 PBR 材质提供天空漫反射/反射
  let envTarget: THREE.WebGLRenderTarget | null = null;
  if (sky && skyNoise) {
    try {
      const pmrem = new THREE.PMREMGenerator(renderer);
      const envScene = new THREE.Scene();
      const envMaterial = sky.material.clone();
      envMaterial.uniforms.uEnv.value = 1;
      envMaterial.uniforms.tNoise.value = skyNoise;
      const envMesh = new THREE.Mesh(sky.geometry, envMaterial);
      envMesh.frustumCulled = false;
      envScene.add(envMesh);
      envTarget = pmrem.fromScene(envScene, 0, 0.1, 100);
      envMaterial.dispose();
      pmrem.dispose();
      scene.environment = envTarget.texture;
      // 原版 Jy：室外环境强度
      scene.environmentIntensity = 2;
    } catch (err) {
      console.warn("[legacy] environment capture failed", err);
      envTarget = null;
    }
  }
  const postParams = {
    damage: 0,
    lowHealth: 0,
    ads: 0,
    flash: 0,
    fade: 0,
    saturation: theme.saturation,
    focusDist: 0,
    shake: 0,
    wet: theme.wet,
  };

  // ---- 雷暴：环境模块的 thunder 事件驱动天空闪电与体积光闪烁 ----
  const thunderState = { t: 99, power: 0, value: 0 };
  const offThunder = legacyEnvironmentEvents.on("thunder", (payload?: unknown) => {
    const intensity = (payload as { intensity?: number } | undefined)?.intensity ?? 0.6;
    thunderState.t = 0;
    thunderState.power = Math.min(1, Math.max(0, intensity));
    if (sky) {
      const angle = Math.PI * (0.55 + Math.random() * 0.9);
      sky.material.uniforms.uFlashDir.value
        .set(
          Math.cos(angle),
          0.35 + Math.random() * 0.3,
          Math.sin(angle) * (Math.random() < 0.5 ? -1 : 1),
        )
        .normalize();
    }
  });

  const fx = await LEGACY_FX_MODULE(ctx);
  ctx.fx = fx;

  const weapon = await LEGACY_WEAPON_MODULE(ctx);
  ctx.weapon = weapon;
  weapon.setVisible(false);

  // 视图模型专用补光（层 1，只在第二遍渲染中生效）
  const keys = [
    { color: 0xdbe7f2, intensity: 11, pos: [0.35, 0.4, 0.22] },
    { color: 0x5f7c96, intensity: 5, pos: [-0.45, -0.1, 0.1] },
    { color: 0xffb877, intensity: 3, pos: [0.1, -0.3, -0.4] },
  ];
  const viewLights: THREE.PointLight[] = [];
  for (const entry of keys) {
    const light = new THREE.PointLight(entry.color, entry.intensity, 3, 2);
    light.position.set(entry.pos[0], entry.pos[1], entry.pos[2]);
    light.layers.set(1);
    camera.add(light);
    viewLights.push(light);
  }

  const vmCamera = new THREE.PerspectiveCamera(54, camera.aspect, 0.01, 10);
  vmCamera.layers.set(1);
  vmCamera.matrixAutoUpdate = false;
  vmCamera.matrixWorldAutoUpdate = false;

  // ---- 软粒子深度预通道 ----
  // 原版主渲染目标自带 depthTexture；R3F 的默认帧缓冲没有深度纹理，
  // 因此每帧先渲染一遍只写深度的场景到 RT，供 fx 粒子做软相交淡出。
  const depthMaterial = new THREE.MeshBasicMaterial({
    colorWrite: false,
    depthWrite: true,
    depthTest: true,
  });
  depthMaterial.name = "depth-prepass";
  const drawingSize = new THREE.Vector2();
  const depthResolution = new THREE.Vector2(1, 1);
  const DEPTH_SCALE = 0.5;
  let depthRT: THREE.WebGLRenderTarget | null = null;
  let depthWidth = 0;
  let depthHeight = 0;

  const ensureDepthTarget = (gl: THREE.WebGLRenderer) => {
    gl.getDrawingBufferSize(drawingSize);
    const width = Math.max(2, Math.floor(drawingSize.x * DEPTH_SCALE));
    const height = Math.max(2, Math.floor(drawingSize.y * DEPTH_SCALE));
    depthResolution.set(drawingSize.x, drawingSize.y);
    if (depthRT && depthWidth === width && depthHeight === height) return;
    if (depthRT) {
      depthRT.depthTexture?.dispose();
      depthRT.dispose();
    }
    const depthTexture = new THREE.DepthTexture(width, height);
    depthTexture.minFilter = THREE.NearestFilter;
    depthTexture.magFilter = THREE.NearestFilter;
    depthTexture.generateMipmaps = false;
    depthRT = new THREE.WebGLRenderTarget(width, height, {
      depthTexture,
      depthBuffer: true,
      stencilBuffer: false,
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      generateMipmaps: false,
    });
    depthWidth = width;
    depthHeight = height;
  };

  const enemies = await LEGACY_ENEMY_MODULE(ctx);
  ctx.enemies = enemies;

  // 深度预通道只应包含不透明几何：透明/无深度写入的物体（雨、贴花、加色特效等）不参与遮挡
  const depthSkip: THREE.Object3D[] = [];
  scene.traverse((object: any) => {
    const renderable = object.isMesh || object.isPoints || object.isLine || object.isInstancedMesh;
    if (!renderable) return;
    if (((object.layers?.mask ?? 1) & 1) === 0) return; // 不在层 0（视图模型）不参与世界深度
    const materials = Array.isArray(object.material) ? object.material : [object.material];
    const transparent = object.isPoints || object.isLine ||
      materials.some((material: any) => material && (material.transparent || material.depthWrite === false));
    if (transparent) depthSkip.push(object);
  });

  // 所有标准材质（世界/敌人/武器）就绪后安装 PCSS 软阴影
  // 低画质用更少的采样数（原版 low 也是 10 taps），高画质保留完整半影质量
  const shadowBounds = {
    width: sunShadowCamera.right - sunShadowCamera.left,
    height: sunShadowCamera.top - sunShadowCamera.bottom,
    depth: sunShadowCamera.far - sunShadowCamera.near,
  };
  let shadowTier = "";
  const installSoftShadows = (qualityName: string) => {
    // PCSS 软阴影为每个片元做 10~16 次依赖纹理采样 + 导数，是全屏最大的填充成本来源。
    // 仅在 high/ultra 启用；low/medium（默认）退回 three 原生 PCFSoftShadowMap（5 次硬件 PCF 采样）。
    const tier =
      qualityName === "high" || qualityName === "ultra" ? "high" : "off";
    if (tier === shadowTier) return;
    shadowTier = tier;
    try {
      softShadows?.dispose();
    } catch (err) {
      /* 忽略补丁恢复异常 */
    }
    softShadows = null;
    if (tier === "off") {
      // 原生硬阴影（BasicShadowMap，1 次采样）。保留原始深度纹理，
      // 体积光 sunVis 仍按 texture2D 读原始深度，不会因 compareFunction 冲突而失效。
      renderer.shadowMap.type = THREE.BasicShadowMap;
      sunLight.shadow.intensity = 1;
      renderer.shadowMap.needsUpdate = true;
      return;
    }
    // PCSS 接管：BasicShadowMap 保留可采样原始深度，原生阴影强度归零
    renderer.shadowMap.type = THREE.BasicShadowMap;
    sunLight.shadow.intensity = 0;
    try {
      softShadows = installSoftSunShadows(
        scene,
        sunLight,
        shadowBounds,
        { searchTaps: 6, filterTaps: 10 },
      );
      renderer.shadowMap.needsUpdate = true;
      console.info("[legacy] soft shadows (PCSS, high) enabled");
    } catch (err) {
      console.warn("[legacy] soft shadows unavailable", err);
      softShadows = null;
    }
  };
  installSoftShadows(opts.quality || "high");

  // ---- 室内环境探针（原版 K）：从室内盒中心抓取立方体环境，切成 PMREM ----
  const exteriorEnv = (scene.environment as THREE.Texture | null) ?? null;
  let interiorEnv: THREE.Texture | null = null;
  let interiorEnvRT: THREE.WebGLRenderTarget | null = null;
  let insideInterior = false;
  let wetness = 1;
  const isInsideInterior = (point: THREE.Vector3) => {
    const box = level?.interiorBoxes?.[0];
    return !!(
      box?.min &&
      box?.max &&
      point.x > box.min.x &&
      point.x < box.max.x &&
      point.z > box.min.z &&
      point.z < box.max.z &&
      point.y < box.max.y
    );
  };
  const captureInteriorProbe = () => {
    const boxes = level?.interiorBoxes;
    if (!boxes?.length) return;
    const box = boxes[0];
    if (!box?.min || !box?.max) return;
    const centerX = (box.min.x + box.max.x) / 2;
    const centerZ = (box.min.z + box.max.z) / 2;
    const centerY = box.min.y + Math.min(2.4, (box.max.y - box.min.y) * 0.4);
    const cubeRT = new THREE.WebGLCubeRenderTarget(128, {
      type: THREE.HalfFloatType,
      generateMipmaps: false,
    });
    const cubeCamera = new THREE.CubeCamera(0.15, 300, cubeRT);
    cubeCamera.layers.set(0);
    cubeCamera.position.set(centerX, centerY, centerZ);
    cubeCamera.updateMatrixWorld(true);
    const previousTone = renderer.toneMapping;
    const previousSkyEnv = sky ? sky.material.uniforms.uEnv.value : 0;
    renderer.toneMapping = THREE.NoToneMapping;
    if (sky) sky.material.uniforms.uEnv.value = 1;
    renderer.shadowMap.needsUpdate = true;
    try {
      cubeCamera.update(renderer, scene);
    } finally {
      if (sky) sky.material.uniforms.uEnv.value = previousSkyEnv;
      renderer.toneMapping = previousTone;
      renderer.setRenderTarget(null);
    }
    const pmrem = new THREE.PMREMGenerator(renderer);
    const target = pmrem.fromCubemap(cubeRT.texture);
    pmrem.dispose();
    cubeRT.dispose();
    interiorEnvRT?.dispose();
    interiorEnvRT = target;
    interiorEnv = target.texture;
    // 室内材质直接绑定室内探针（原版 Ky = 1）
    const seen = new Set<THREE.Material>();
    let assigned = 0;
    scene.traverse((object: any) => {
      const materials = Array.isArray(object.material) ? object.material : object.material ? [object.material] : [];
      for (const material of materials) {
        if (!material || seen.has(material)) continue;
        seen.add(material);
        if (material.userData?.interior === true && "envMap" in material) {
          (material as THREE.MeshStandardMaterial).envMap = interiorEnv;
          // 原版 Ky：室内材质探针强度为 1（保留材质自定义强度）
          if (!material.userData.keepEnvIntensity) {
            (material as THREE.MeshStandardMaterial).envMapIntensity = 1;
          }
          material.needsUpdate = true;
          assigned++;
        }
      }
    });
    if (assigned) console.info(`[legacy] interior probe assigned to ${assigned} material(s)`);
  };
  try {
    captureInteriorProbe();
  } catch (err) {
    console.warn("[legacy] interior probe failed", err);
  }

  // ---- 事件接线 ----
  const unsubscribes = [
    events.on("weapon:fire", () => {
      harborAudio.playGunshot();
      harborAudio.playShell();
      runtime.weapon.muzzleAt = performance.now();
      runtime.weapon.kick = 1;
    }),
    events.on("impact", (payload: any) => {
      if (payload?.surface !== "enemy") harborAudio.playImpact();
    }),
    events.on("weapon:reload", (payload: any) => {
      if (payload?.phase === "start") harborAudio.playReload();
    }),
    events.on("weapon:dry", () => harborAudio.playEmpty()),
    events.on("player:hitEnemy", (payload: any) => {
      useGame.getState().registerHit(!!payload?.killed);
      harborAudio.playHitMarker(!!payload?.killed);
    }),
    events.on("enemy:killed", (payload: any) => {
      runtime.kills += 1;
      const name = payload?.type === "gull" ? "巡逻无人机" : "安保猎犬";
      useGame.getState().pushFeed(`目标已消灭 · ${name}`);
    }),
    events.on("enemy:alert", () => {
      if (runtime.alertPlayed) return;
      runtime.alertPlayed = true;
      harborAudio.playAlert();
      useGame.getState().setComms("敌人已警觉！巡逻无人机升空，安保猎犬正在推进。消灭他们！");
      useGame.getState().pushFeed("发现敌人");
    }),
    events.on("enemy:fire", (payload: any) => {
      if (payload?.enemy?.type === "gull") harborAudio.playDroneShot();
    }),
  ];

  const prepareVmCamera = (source: THREE.PerspectiveCamera) => {
    vmCamera.aspect = source.aspect;
    vmCamera.fov = 54;
    vmCamera.updateProjectionMatrix();
    vmCamera.matrixWorld.copy(source.matrixWorld);
    vmCamera.matrixWorldInverse.copy(source.matrixWorld).invert();
  };

  let stepAcc = 0;
  let wasOnGround = true;
  let lastDt = 0;
  // 渲染开销控制：帧序号（阴影/反射隔帧）
  let frameIndex = 0;
  const PIXEL_BUDGET: Record<string, number> = {
    test: 0.8e6,
    low: 0.9e6,
    medium: 1.25e6,
    high: 1.9e6,
    ultra: 3.2e6,
  };
  const surfaceAt = (pos: THREE.Vector3) => {
    STEP_ORIGIN.set(pos.x, pos.y + 0.25, pos.z);
    try {
      return physics.raycast?.(STEP_ORIGIN, STEP_DOWN, 2.5)?.surface || "concrete";
    } catch {
      return "concrete";
    }
  };

  const gameplay: LegacyGameplay = {
    weapon,
    enemies,
    fx,
    physics,
    setQuality(name: string) {
      const preset = POST_QUALITY_PRESETS[name] || POST_QUALITY_PRESETS.high;
      Object.assign(ctx.quality, preset);
      // 原版 setQuality：阴影贴图分辨率随画质变化
      const shadowSize = Math.min(
        preset.shadow || 2048,
        renderer.capabilities.maxTextureSize,
      );
      if (sunLight.shadow.mapSize.x !== shadowSize) {
        sunLight.shadow.mapSize.set(shadowSize, shadowSize);
        if (sunLight.shadow.map) {
          sunLight.shadow.map.dispose();
          sunLight.shadow.map = null;
        }
      }
      // 低画质切换 PCSS 采样数（会重编译材质，只在层级变化时执行）
      installSoftShadows(preset.name || name);
      renderer.shadowMap.needsUpdate = true;
      try {
        postPipeline?.applyQuality();
      } catch (err) {
        console.warn("[legacy] applyQuality failed", err);
      }
    },
    update(dt: number) {
      lastDt = dt;
      eyeVec.copy(camera.position);
      weapon.update(dt);
      enemies.update(dt);

      // 原版由玩家控制器发出脚步/落地事件，供水花、尘土与碎石特效使用
      const speed = Math.hypot(runtime.vel.x, runtime.vel.z);
      const onGround = runtime.onGround;
      if (onGround && speed > 0.6) {
        stepAcc += speed * dt;
        if (stepAcc >= (runtime.sprinting ? 2.6 : 2.0)) {
          stepAcc = 0;
          events.emit("player:step", {
            pos: runtime.pos,
            surface: surfaceAt(runtime.pos),
            sprint: runtime.sprinting,
          });
        }
      } else {
        stepAcc = Math.min(stepAcc, 1.5);
      }
      if (!wasOnGround && onGround) {
        events.emit("player:land", { surface: surfaceAt(runtime.pos), speed });
      }
      wasOnGround = onGround;

      lightPool.update(dt);
      fx.update(dt);
      if (sky) sky.material.uniforms.uTime.value = runtime.elapsed;

      // 闪电：天空自发光 + 体积光闪烁（与原版渲染循环一致的衰减曲线）
      thunderState.t += dt;
      thunderState.value =
        thunderState.t < 0.9
          ? thunderState.power *
            Math.exp(-thunderState.t * 5) *
            (0.55 + 0.45 * Math.sin(thunderState.t * 47) * Math.sin(thunderState.t * 13 + 1)) *
            0.35
          : 0;
      if (sky) {
        sky.material.uniforms.uFlash.value = Math.max(0, thunderState.value);
      }

      // 室内外切换（原版主循环）：相机在室内盒内时武器湿度降到 0.3，环境切换在渲染通道中进行
      insideInterior = isInsideInterior(camera.position);
      const wetTarget = insideInterior ? 0.3 : Math.max(0.12, theme.wet);
      wetness += (wetTarget - wetness) * Math.min(1, dt * (insideInterior ? 0.25 : 0.6));
      try {
        weapon.setWetness?.(wetness);
      } catch {
        /* 武器不支持湿度时忽略 */
      }
      runtime.weapon.ammo = weapon.ammo;
      runtime.weapon.reserve = weapon.reserve;
      runtime.weapon.reloading = weapon.state === "reloading";
      runtime.weapon.kick = Math.max(0, runtime.weapon.kick - dt * 9);
      runtime.ads = weapon.ads;
      runtime.input.lookX = 0;
      runtime.input.lookY = 0;
      runtime.input.pressed.clear();
      const gs = useGame.getState();
      if (
        gs.ammo !== weapon.ammo ||
        gs.reserve !== weapon.reserve ||
        gs.reloading !== (weapon.state === "reloading")
      ) {
        gs.setWeapon(weapon.ammo, weapon.reserve, weapon.state === "reloading");
      }
    },
    renderFrame(gl: THREE.WebGLRenderer, renderScene: THREE.Scene, source: THREE.PerspectiveCamera) {
      const frame = frameIndex++;

      // 原版预通道（地面平面反射）：隔帧刷新，30Hz 的镜面反射足够，省掉一半全场景重绘
      if ((frame & 1) === 0) {
        // 反射里不需要粒子/贴花等透明特效，隐藏以省填充率
        const fxRoot = fx?.root as THREE.Object3D | undefined;
        const fxVisible = fxRoot?.visible;
        if (fxRoot) fxRoot.visible = false;
        try {
          for (const pass of legacyPrepasses) {
            try {
              pass(gl, renderScene, source);
            } catch (err) {
              console.warn("[legacy] prepass failed", err);
            }
          }
        } finally {
          if (fxRoot) fxRoot.visible = fxVisible ?? true;
        }
      }
      // 阴影贴图隔帧重烘（主题关卡静态建筑更多，放宽到每 3 帧）
      const shadowStride = theme.id === "harbor" ? 2 : 3;
      if (frame % shadowStride === 0 || !sunLight.shadow.map) {
        gl.shadowMap.needsUpdate = true;
      }
      try {
        sunLight.shadow.updateMatrices(sunLight);
      } catch {
        /* 阴影矩阵在首次渲染前可能尚未初始化 */
      }
      softShadows?.update(sunLight, source);

      if (postPipeline) {
        // ---- 原版后处理路径 ----
        const cssWidth = gl.domElement.clientWidth || 1280;
        const cssHeight = gl.domElement.clientHeight || 720;
        // 原版按像素预算限制内部渲染分辨率（高分辨率屏幕上自动降采样）。
        // 不做运行时动态调整：调整会重建后处理渲染目标，导致周期性卡顿。
        const budget = PIXEL_BUDGET[ctx.quality.name] ?? 2.3e6;
        const budgetScale = Math.sqrt(budget / Math.max(1, cssWidth * cssHeight));
        const presetScale = ctx.quality.scale ?? 1;
        const scale = Math.max(0.5, Math.min(presetScale, budgetScale));
        const width = Math.max(4, Math.round(cssWidth * scale));
        const height = Math.max(4, Math.round(cssHeight * scale));
        // 平面反射按内部渲染分辨率的一半出图（跟随像素预算）
        legacyRenderResolution.set(width, height);
        if (hdrTarget.width !== width || hdrTarget.height !== height) {
          hdrTarget.setSize(width, height);
          postPipeline.resize(width, height);
          postPipeline.applyQuality();
        }
        ctx.render.resolution.set(width, height);
        if (!ctx.render.depthTexture) {
          ctx.render.depthTexture = postPipeline.ensureDepthCopy();
        }

        // 世界渲染进 HDR（颜色 + 深度）
        gl.setRenderTarget(hdrTarget);
        gl.clear(true, true, false);
        gl.render(renderScene, source);

        // 深度拷贝供软粒子采样（与原版一致：拷贝发生在视图模型之前）
        try {
          postPipeline.copyDepth(hdrTarget.depthTexture);
        } catch {
          /* 深度拷贝失败时软粒子回退为硬边 */
        }

        // 视图模型叠加到 HDR（层 1）
        // 原版不清深度：把深度范围压到 [0, 0.05] 让武器始终置前，
        // 同时保留世界深度供后处理（体积光 / AO / 运动模糊）使用。
        if (weapon.root.visible) {
          gl.setRenderTarget(hdrTarget);
          prepareVmCamera(source);
          // 原版：视图模型通道使用 (Ky / Jy) * viewFill 的环境强度；
          // 室内时临时换用室内探针，渲染后恢复世界环境。
          const baseEnvironment = scene.environment;
          const baseIntensity = scene.environmentIntensity;
          const viewFill = 1.35;
          if (insideInterior && interiorEnv) {
            scene.environment = interiorEnv;
            scene.environmentIntensity = baseIntensity * 0.5 * viewFill;
          } else {
            scene.environmentIntensity = baseIntensity * viewFill;
          }
          const context = gl.getContext();
          const autoClear = gl.autoClear;
          gl.autoClear = false;
          context.depthRange(0, 0.05);
          try {
            gl.render(renderScene, vmCamera);
          } finally {
            context.depthRange(0, 1);
            gl.autoClear = autoClear;
            scene.environment = baseEnvironment;
            scene.environmentIntensity = baseIntensity;
          }
        }
        gl.setRenderTarget(null);

        // 调色/曝光/ADS/受伤等动态参数
        const state = useGame.getState();
        const sinceDamage = state.damageAt ? (Date.now() - state.damageAt) / 1000 : 99;
        postParams.damage = Math.max(0, 1 - sinceDamage / 0.55) * 0.85;
        postParams.lowHealth = runtime.health < 40 ? 1 - runtime.health / 40 : 0;
        postParams.ads = runtime.ads;
        postParams.flash = 0;
        postParams.fade = state.phase === "title" ? 0.35 : 0;
        postParams.saturation = theme.saturation;
        postParams.wet = theme.wet;

        try {
          postPipeline.run({
            hdr: hdrTarget,
            camera: source,
            sun: sunStub,
            dt: lastDt,
            post: postParams,
            exposure: ctx.render.exposure,
            time: runtime.elapsed,
            fast: ctx.quality.name === "low",
            thunder: thunderState.value,
          });
        } catch (err) {
          console.error("[legacy] post run failed", err);
        }
        return;
      }

      // ---- 前向回退路径（后处理初始化失败时）----
      // 1) 深度预通道（软粒子采样源）
      ensureDepthTarget(gl);
      if (depthRT) {
        ctx.render.depthTexture = depthRT.depthTexture;
        ctx.render.resolution.copy(depthResolution);

        const hidden: { object: THREE.Object3D; visible: boolean }[] = [];
        const hide = (object: any) => {
          if (object && object.visible) {
            hidden.push({ object, visible: true });
            object.visible = false;
          }
        };
        const prevOverride = renderScene.overrideMaterial;
        const prevAutoShadow = gl.shadowMap.autoUpdate;
        const prevNeedsShadow = gl.shadowMap.needsUpdate;
        try {
          hide(fx.root);
          for (const object of depthSkip) hide(object);
          for (const list of [enemies.debug?.gulls, enemies.debug?.hounds]) {
            if (!Array.isArray(list)) continue;
            for (const enemy of list) hide(enemy?.rig?.extraMesh);
          }

          renderScene.overrideMaterial = depthMaterial;
          gl.shadowMap.autoUpdate = false;
          gl.shadowMap.needsUpdate = false;
          gl.setRenderTarget(depthRT);
          gl.clear(true, true, false);
          gl.render(renderScene, source);
        } finally {
          gl.setRenderTarget(null);
          gl.shadowMap.autoUpdate = prevAutoShadow;
          gl.shadowMap.needsUpdate = prevNeedsShadow;
          renderScene.overrideMaterial = prevOverride;
          for (const item of hidden) item.object.visible = item.visible;
        }
      }

      // 2) 世界主通道（层 0）
      gl.render(renderScene, source);

      // 3) 视图模型通道（层 1，清深度后叠加）
      if (!weapon.root.visible) return;
      vmCamera.aspect = source.aspect;
      vmCamera.fov = 54;
      vmCamera.updateProjectionMatrix();
      vmCamera.matrixWorld.copy(source.matrixWorld);
      vmCamera.matrixWorldInverse.copy(source.matrixWorld).invert();
      gl.clearDepth();
      const autoClear = gl.autoClear;
      gl.autoClear = false;
      try {
        gl.render(scene, vmCamera);
      } finally {
        gl.autoClear = autoClear;
      }
    },
    dispose() {
      for (const off of unsubscribes) off?.();
      offThunder?.();
      try {
        softShadows?.dispose();
      } catch {
        /* 忽略阴影补丁恢复异常 */
      }
      softShadows = null;
      interiorEnvRT?.dispose();
      interiorEnvRT = null;
      interiorEnv = null;
      try {
        camera.remove(weapon.root);
      } catch {
        /* 忽略卸载异常 */
      }
      for (const light of viewLights) camera.remove(light);
      scene.remove(sunLight);
      scene.remove(sunLight.target);
      if (themeFill) {
        scene.remove(themeFill);
        themeFill = null;
      }
      scene.remove(camera);
      const group = scene.getObjectByName("enemies");
      if (group) scene.remove(group);
      try {
        fx.clear?.();
        if (fx.root) scene.remove(fx.root);
      } catch {
        /* 忽略特效清理异常 */
      }
      lightPool.dispose();
      if (depthRT) {
        depthRT.depthTexture?.dispose();
        depthRT.dispose();
        depthRT = null;
      }
      try {
        postPipeline?.dispose?.();
      } catch {
        /* 忽略后处理释放异常 */
      }
      hdrTarget.depthTexture?.dispose();
      hdrTarget.dispose();
      dirtTexture.dispose();
      if (sky) {
        scene.remove(sky.mesh);
        sky.material?.dispose();
        sky.geometry?.dispose();
        sky = null;
      }
      skyNoise?.dispose();
      skyNoise = null;
      envTarget?.dispose();
      envTarget = null;
      scene.environment = null;
      active = null;
    },
  };
  active = gameplay;

  // ---- 入场预热：把首帧才会发生的着色器编译全部吸收在装配阶段 ----
  // PCSS 补丁与室内探针会把世界材质标记 needsUpdate，后处理通道与视图模型
  // 通道的着色器也只在首次渲染时编译。若留到进入关卡后才编译，会出现
  // 「加载卡一下、枪一出现卡一下」。这里在部署按钮启用前一次性完成。
  try {
    // 世界材质（基础光照：太阳 + 半球 + 6 盏常驻池灯，数量恒定）
    renderer.compile(scene, camera);
    // 视图模型（层 1）武器材质
    renderer.compile(camera, vmCamera, scene);
    // 完整跑一帧管线：后处理全通道着色器 + 阴影贴图烘焙 + 平面反射预热
    const vmWasVisible = weapon.root.visible;
    weapon.root.visible = true;
    try {
      gameplay.renderFrame(renderer, scene, camera);
    } finally {
      weapon.root.visible = vmWasVisible;
    }
  } catch (err) {
    console.warn("[legacy] shader warmup failed", err);
  }

  if (import.meta.env.DEV) {
    const debugWindow = window as unknown as {
      __legacyGameplay?: LegacyGameplay;
      __legacyPost?: unknown;
      __legacyHdr?: THREE.WebGLRenderTarget;
      __legacyRender?: Record<string, unknown>;
      __legacySoftShadow?: boolean;
      __legacySoftUniforms?: Record<string, THREE.IUniform>;
      __legacyEnvEvents?: unknown;
      __legacyLevel?: unknown;
    };
    debugWindow.__legacyGameplay = gameplay;
    debugWindow.__legacyPost = postPipeline;
    debugWindow.__legacyHdr = hdrTarget;
    debugWindow.__legacyRender = ctx.render;
    debugWindow.__legacySoftShadow = !!softShadows;
    debugWindow.__legacySoftUniforms = softShadows?.uniforms;
    debugWindow.__legacyEnvEvents = legacyEnvironmentEvents;
    debugWindow.__legacyLevel = level;
  }
  return gameplay;
}
