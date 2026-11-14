import * as THREE from "three";
import type { MaterialSystem } from "../materials";
import { getLevel, type LevelId } from "../levels";
import { THEMES, type ThemeConfig } from "../themes";
import { runtime } from "../runtime";
import { buildCustomLevel } from "./customLevels";
import { buildThemeEnvironment } from "./themeLevels";
import {
  LEGACY_BACKDROP_MODULE,
  LEGACY_GROUND_MODULE,
  LEGACY_LEVEL_MODULE,
  LEGACY_PROP_MODULE,
} from "./worldBuilders";

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

/** 环境模块事件总线（雷暴等），供后处理/天空共享 */
export const legacyEnvironmentEvents = makeEvents();

/** 原版渲染前预通道（地面平面反射等），由 gameplay 的世界渲染前调用 */
export const legacyPrepasses: ((gl: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera) => void)[] = [];

/** 当前内部渲染分辨率（由 gameplay 写入），平面反射按它的一半尺寸渲染 */
export const legacyRenderResolution = new THREE.Vector2();

export interface LegacyEnvironment {
  level: any;
  backdrop: any;
  ground: any;
  update: (dt: number) => void;
  dispose: () => void;
}

/**
 * 使用原版 backdrop(pv) + ground(O1) 在原场景中构建港区环境：
 * 码头地面、海面、雨、吊机、货轮、天际线、撤离艇、路灯。
 * 材质全部来自原版材质注册表。levelId 决定使用原版关卡还是追加关卡布局。
 * 构建任务串行执行，避免切换关卡时两个构建同时向物理系统写入碰撞盒。
 */
let environmentBuildQueue: Promise<unknown> = Promise.resolve();

/** 按主题把基础材质替换为程序化主题材质，保留原有渲染标志 */
function themedMaterial(base: THREE.Material, mats: MaterialSystem, theme: ThemeConfig): THREE.Material {
  const name = base.name;
  if (!name) return base;
  const mapped = theme.materialMap[name];
  const paint = theme.paintColors[name];
  if (!mapped && paint === undefined) return base;
  const std = base as THREE.MeshStandardMaterial;
  const opts: Record<string, unknown> = {};
  if ((base as unknown as { defines?: Record<string, unknown> }).defines?.SL_TRIPLANAR !== undefined) {
    opts.triplanar = true;
  }
  if (std.vertexColors) opts.vertexColors = true;
  if (base.side === THREE.DoubleSide) opts.doubleSide = true;
  if (base.userData?.interior) opts.interior = true;
  if (paint !== undefined) opts.color = paint;
  const next = mats.get(mapped ?? name, opts);
  next.side = base.side;
  next.transparent = base.transparent;
  next.opacity = base.opacity;
  next.alphaTest = base.alphaTest;
  next.depthWrite = base.depthWrite;
  return next;
}

function applyThemeToRoot(
  root: THREE.Object3D | undefined,
  mats: MaterialSystem,
  theme: ThemeConfig,
) {
  if (!root) return;
  root.traverse((child) => {
    const mesh = child as THREE.Mesh;
    if (!mesh.isMesh) return;
    if (Array.isArray(mesh.material)) {
      mesh.material = mesh.material.map((mat) => themedMaterial(mat, mats, theme));
    } else if (mesh.material) {
      mesh.material = themedMaterial(mesh.material, mats, theme);
    }
  });
}

export function buildLegacyEnvironment(
  scene: THREE.Scene,
  camera: THREE.Camera,
  renderer: THREE.WebGLRenderer,
  mats: MaterialSystem,
  legacyPhysics?: Record<string, any>,
  levelId: LevelId = "harbor",
): Promise<LegacyEnvironment> {
  const task = () => buildLegacyEnvironmentInner(scene, camera, renderer, mats, legacyPhysics, levelId);
  const result = environmentBuildQueue.then(task, task);
  environmentBuildQueue = result.then(
    () => undefined,
    () => undefined,
  );
  return result;
}

async function buildLegacyEnvironmentInner(
  scene: THREE.Scene,
  camera: THREE.Camera,
  renderer: THREE.WebGLRenderer,
  mats: MaterialSystem,
  legacyPhysics: Record<string, any> | undefined,
  levelId: LevelId,
): Promise<LegacyEnvironment> {
  // 使用原版碰撞系统时清空旧碰撞盒（开发模式 StrictMode 会重建环境）
  if (legacyPhysics) {
    runtime.aabbs.length = 0;
    if (Array.isArray(legacyPhysics.boxes)) legacyPhysics.boxes.length = 0;
  }
  const physicsApi: Record<string, any> = legacyPhysics ?? {
    addBox(min: [number, number, number], max: [number, number, number], opts: Record<string, unknown> = {}) {
      return {
        min: new THREE.Vector3(min[0], min[1], min[2]),
        max: new THREE.Vector3(max[0], max[1], max[2]),
        ...opts,
      };
    },
    nav: null,
    build() {},
  };
  const physics = {
    ...physicsApi,
    addBox(min: [number, number, number], max: [number, number, number], opts: Record<string, unknown> = {}) {
      const box = physicsApi.addBox(min, max, opts);
      // bulletOnly 是只挡子弹的栏杆/细杆，不参与玩家胶囊碰撞
      if (!box.bulletOnly) runtime.aabbs.push({ min: box.min, max: box.max });
      return box;
    },
  };
  // 原版渲染前预通道（地面平面反射）：由环境模块注册，渲染主通道前执行
  const registeredPrepasses: typeof legacyPrepasses = [];
  const ctx: Record<string, unknown> = {
    scene,
    camera,
    renderer,
    viewCamera: camera,
    mats,
    params: {},
    quality: { tex: 1024, planar: 0.5, rain: 0.5 },
    rng: makeRng(),
    events: legacyEnvironmentEvents,
    time: { t: 0, dt: 0, frame: 0, real: 0 },
    level: { interiorBoxes: [], skylights: [] },
    physics,
    render: {
      scene,
      renderer,
      camera,
      viewCamera: camera,
      resolution: legacyRenderResolution,
      post: {},
      exposure: 1.2,
      onLevelReady: async () => {},
      stats: () => ({}),
      addPrePass(pass: (gl: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera) => void) {
        if (registeredPrepasses.includes(pass)) return;
        registeredPrepasses.push(pass);
        legacyPrepasses.push(pass);
      },
      // 供平面反射等预通道把场景渲染到指定目标（原版 renderWorld）
      renderWorld(viewCamera: THREE.Camera, target: THREE.WebGLRenderTarget) {
        const previousTarget = renderer.getRenderTarget();
        const previousAuto = renderer.shadowMap.autoUpdate;
        renderer.shadowMap.autoUpdate = false;
        try {
          renderer.setRenderTarget(target);
          renderer.clear();
          renderer.render(scene, viewCamera);
        } finally {
          renderer.setRenderTarget(previousTarget);
          renderer.shadowMap.autoUpdate = previousAuto;
        }
      },
    },
  };

  const backdropModule = LEGACY_BACKDROP_MODULE as unknown as {
    create: (ctx: Record<string, unknown>) => Promise<any>;
  };
  const groundModule = LEGACY_GROUND_MODULE as unknown as {
    create: (ctx: Record<string, unknown>) => Promise<any>;
  };
  const levelModule = LEGACY_LEVEL_MODULE as unknown as {
    create: (ctx: Record<string, unknown>) => Promise<any>;
  };
  const propsModule = LEGACY_PROP_MODULE as unknown as {
    create: (ctx: Record<string, unknown>) => any;
  };

  runtime.aabbs.length = 0;
  ctx.props = propsModule.create(ctx);
  const themed = levelId === "factory" || levelId === "desert" || levelId === "snow";
  const custom = themed || levelId === "steel" || levelId === "fuel";
  const level = custom
    ? await buildCustomLevel(ctx, levelId)
    : await levelModule.create(ctx);
  ctx.level = level;

  let backdrop: any;
  let ground: any;
  if (themed) {
    // 主题关卡不再生成港区海面/吊机/货轮，改用独立地面与远景
    const themeEnv = await buildThemeEnvironment(ctx, levelId);
    backdrop = themeEnv.backdrop;
    ground = themeEnv.ground;
  } else {
    backdrop = await backdropModule.create(ctx);
    ground = await groundModule.create(ctx);
  }
  legacyPhysics?.build?.();

  // 主题关卡：替换程序化材质、雨水湿润度与地面反射
  const theme = THEMES[getLevel(levelId).theme];
  mats.uniforms.wet.value = theme.wet;
  ground?.setRain?.(theme.rain);
  ground?.setReflections?.(theme.wet > 0.3);
  applyThemeToRoot(level?.root, mats, theme);
  applyThemeToRoot(backdrop?.root, mats, theme);

  // backdrop 的撤离艇位置仅作兜底，关卡数据优先（由 applyLegacyLevelRuntime 应用）
  return {
    level,
    backdrop,
    ground,
    update(dt: number) {
      level?.update?.(dt);
      backdrop?.update?.(dt);
      ground?.update?.(dt);
    },
    dispose() {
      for (const pass of registeredPrepasses) {
        const index = legacyPrepasses.indexOf(pass);
        if (index >= 0) legacyPrepasses.splice(index, 1);
      }
      disposeTree(level?.root);
      disposeTree(backdrop?.root);
      disposeTree(ground?.root);
      ground?.dispose?.();
      if (level?.root) scene.remove(level.root);
      if (backdrop?.root) scene.remove(backdrop.root);
      if (ground?.root) scene.remove(ground.root);
    },
  };
}

/** 只释放几何体，材质来自共享材质系统，不能随场景销毁 */
function disposeTree(root: THREE.Object3D | undefined) {
  root?.traverse((child) => {
    const mesh = child as THREE.Mesh;
    if (mesh.isMesh && mesh.geometry) mesh.geometry.dispose();
  });
}

/**
 * 把关卡数据写入运行时（中继位置、撤离点、出生点、敌人刷新点）。
 * 只有在环境构建仍有效时才调用，避免快速切换关卡时旧构建覆盖新数据。
 */
export function applyLegacyLevelRuntime(level: any, backdrop: any) {
  if (level?.objectives?.length) {
    level.objectives.slice(0, 3).forEach((objective: any, index: number) => {
      if (objective?.pos) runtime.relayPositions[index].copy(objective.pos);
    });
    runtime.relayObjects = level.objectives
      .slice(0, 3)
      .map((objective: any) => objective?.object)
      .filter(Boolean);
  }
  // 原版：每座中继旁有一个一次性弹药补给箱（+60 备弹）
  runtime.ammoCaches = runtime.relayPositions.map((pos) => ({
    pos: new THREE.Vector3(pos.x + 1.6, 0, pos.z + 1.4),
    used: false,
  }));
  if (level?.extraction?.pos) {
    runtime.boatPos.copy(level.extraction.pos);
    runtime.extractionRadius = level.extraction.radius ?? 2.5;
  }
  if (level?.playerStart?.pos) {
    runtime.playerStart.copy(level.playerStart.pos);
    runtime.playerStartYaw = level.playerStart.yaw ?? 0;
  }
  if (level?.enemySpawns?.length) {
    const spawns = level.enemySpawns as { pos: THREE.Vector3; type: string }[];
    const groundSpawns = spawns.filter((s) => s.type === "ground");
    const airSpawns = spawns.filter((s) => s.type === "air");
    const pick = (list: typeof spawns, count: number) =>
      list
        .filter((_, i) => i % Math.max(1, Math.floor(list.length / count)) === 0)
        .slice(0, count);
    runtime.enemySpawns = [
      ...pick(groundSpawns, 5).map((s) => ({ kind: "hound" as const, pos: s.pos.clone().setY(0.75) })),
      ...pick(airSpawns, 4).map((s) => ({ kind: "drone" as const, pos: s.pos.clone() })),
    ];
  }
  if (!level?.extraction?.pos && backdrop?.extractionPoint) {
    runtime.boatPos.copy(backdrop.extractionPoint);
  }
}
