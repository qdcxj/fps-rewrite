import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import type { MaterialSystem } from "../game/materials";
import { createMaterialSystem } from "../game/legacy/proceduralMaterials";
import { LEGACY_LEVEL_MODULE, LEGACY_PROP_MODULE } from "../game/legacy/worldBuilders";

type Rng = (() => number) & { fork: () => Rng };

/** 原版确定性随机源（与 environment.ts 一致，支持 fork） */
function makeRng(seed = 4207): Rng {
  let s = seed >>> 0;
  const rng = (() => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  }) as Rng;
  rng.fork = () => makeRng((s = (s * 1664525 + 1013904223) >>> 0));
  return rng;
}

interface PropBuildApi {
  names: () => string[];
  has: (name: string) => boolean;
  build: (name: string, opts?: Record<string, unknown>) => THREE.Group;
}

interface PropModuleApi {
  PROP_SIZES: Record<string, [number, number, number, string, string]>;
  create: (ctx: Record<string, unknown>) => PropBuildApi;
}

interface LevelModuleApi {
  create: (ctx: Record<string, unknown>) => Promise<{
    root?: THREE.Object3D;
    stats?: { props?: number; containers?: number };
  } | null>;
}

export interface LevelStats {
  /** 关卡内道具实例总数 */
  total: number;
  /** 其中集装箱实例数 */
  containers: number;
  /** 按道具类型统计的实例数 */
  byName: Record<string, number>;
  /** 统计过程失败（页面显示 —） */
  failed?: boolean;
}

export interface PreviewHooks {
  onPhase: (text: string) => void;
  onMaterials: (count: number) => void;
  onThumbnail: (key: string, url: string, meshes: number, triangles: number) => void;
  onLevel: (stats: LevelStats) => void;
}

const THUMB_WIDTH = 480;
const THUMB_HEIGHT = 360;

const yieldFrame = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

function disposeObject(root: THREE.Object3D) {
  root.traverse((child) => {
    const mesh = child as THREE.Mesh;
    if (mesh.isMesh && mesh.geometry) mesh.geometry.dispose();
  });
}

function countMeshStats(root: THREE.Object3D) {
  let meshes = 0;
  let triangles = 0;
  root.traverse((child) => {
    const mesh = child as THREE.Mesh;
    if (!mesh.isMesh || !mesh.geometry) return;
    meshes += 1;
    const geometry = mesh.geometry;
    triangles += geometry.index ? geometry.index.count / 3 : (geometry.attributes.position?.count ?? 0) / 3;
  });
  return { meshes, triangles: Math.round(triangles) };
}

/**
 * 用原版 PROPS.build 逐个构建道具，在共享的离屏渲染器中生成缩略图。
 * 材质与几何全部来自原版程序化构建器，不做任何简化或替代。
 */
export async function runAssetPreview(
  names: string[],
  hooks: PreviewHooks,
  cancelled: () => boolean,
): Promise<void> {
  hooks.onPhase("正在初始化程序化材质…");

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    preserveDrawingBuffer: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(1);
  renderer.setSize(THUMB_WIDTH, THUMB_HEIGHT, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // 程序化材质纹理与创建它的 WebGL 上下文绑定，资产页必须使用自己的材质系统，
  // 不能复用游戏侧的单例，否则任一方的渲染器都会读到非本上下文的纹理而发黑。
  const mats = (await createMaterialSystem({
    renderer,
    quality: { tex: 512 },
    params: {},
  })) as unknown as MaterialSystem;

  const propSizes = (LEGACY_PROP_MODULE as unknown as PropModuleApi).PROP_SIZES;
  const needed = new Set<string>(["concrete", "metal"]);
  for (const name of names) {
    const entry = propSizes[name];
    if (!entry) continue;
    needed.add(entry[3]);
    needed.add(entry[4]);
  }
  mats.prewarm([...needed]);

  hooks.onMaterials(mats.names.length);
  if (cancelled()) {
    renderer.dispose();
    return;
  }

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envScene = new RoomEnvironment();
  const envTarget = pmrem.fromScene(envScene, 0.04);
  scene.environment = envTarget.texture;
  scene.environmentIntensity = 0.35;

  const camera = new THREE.PerspectiveCamera(32, THUMB_WIDTH / THUMB_HEIGHT, 0.05, 400);
  const hemi = new THREE.HemisphereLight(0xbfd4ff, 0x2a2f38, 0.85);
  const rim = new THREE.DirectionalLight(0x9fc4ff, 1.15);
  rim.position.set(-6, 4, -5);
  scene.add(hemi, rim);

  const key = new THREE.DirectionalLight(0xfff1df, 2.6);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.bias = -0.0008;
  key.shadow.normalBias = 0.02;
  scene.add(key, key.target);

  const floorGeometry = new THREE.PlaneGeometry(240, 240);
  const floor = new THREE.Mesh(floorGeometry, new THREE.ShadowMaterial({ opacity: 0.22 }));
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  const canvas = renderer.domElement;
  const propsModule = (LEGACY_PROP_MODULE as unknown as PropModuleApi).create({
    scene,
    mats,
    params: {},
    quality: { tex: 512 },
    rng: makeRng(),
  });

  const viewDir = new THREE.Vector3(1, 0.62, 1.15).normalize();
  const center = new THREE.Vector3();
  const size = new THREE.Vector3();

  try {
    for (const name of names) {
      if (cancelled()) return;
      hooks.onPhase(`正在渲染缩略图 · ${name}`);

      let object: THREE.Object3D | null = null;
      try {
        object = propsModule.build(name, {
          seed: 7,
          doors: name.startsWith("container") ? 0.6 : 0,
        });
        object.updateMatrixWorld(true);
        scene.add(object);

        const box = new THREE.Box3().setFromObject(object);
        box.getSize(size);
        box.getCenter(center);
        if (box.isEmpty()) throw new Error("empty bounding box");

        const radius = Math.max(size.length() * 0.5, 0.4);
        const fov = THREE.MathUtils.degToRad(camera.fov);
        const distance = (radius / Math.sin(fov * 0.5)) * 1.12;
        camera.position.copy(center).addScaledVector(viewDir, distance);
        camera.near = Math.max(distance * 0.01, 0.05);
        camera.far = distance * 6;
        camera.lookAt(center);
        camera.updateProjectionMatrix();

        const shadowSize = Math.max(size.x, size.y, size.z) * 0.75 + 0.6;
        key.position.copy(center).add(new THREE.Vector3(3.5, 6.5, 4.5));
        key.target.position.copy(center);
        key.target.updateMatrixWorld(true);
        key.shadow.camera.left = -shadowSize;
        key.shadow.camera.right = shadowSize;
        key.shadow.camera.top = shadowSize;
        key.shadow.camera.bottom = -shadowSize;
        key.shadow.camera.near = 0.1;
        key.shadow.camera.far = distance * 5;
        key.shadow.camera.updateProjectionMatrix();

        renderer.setClearColor(0x000000, 0);
        renderer.clear();
        renderer.render(scene, camera);

        const { meshes, triangles } = countMeshStats(object);
        hooks.onThumbnail(name, canvas.toDataURL("image/png"), meshes, triangles);
      } catch (err) {
        console.warn(`[assets] 缩略图渲染失败: ${name}`, err);
      } finally {
        if (object) {
          scene.remove(object);
          disposeObject(object);
        }
        await yieldFrame();
      }
    }

    if (cancelled()) return;
    hooks.onPhase("正在统计关卡道具实例…");
    try {
      hooks.onLevel(await collectLevelStats(mats, cancelled));
    } catch (err) {
      console.error("[assets] 关卡统计失败", err);
      hooks.onLevel({ total: 0, containers: 0, byName: {}, failed: true });
    }
  } finally {
    scene.remove(floor);
    floorGeometry.dispose();
    disposeObject(envScene);
    envTarget.dispose();
    pmrem.dispose();
    envScene.dispose();
    renderer.dispose();
  }
}

/**
 * 以计数代理包裹 props.build，再跑一遍原版关卡生成器，
 * 从 placed 清单精确统计每类道具在关卡中的实例数。
 */
async function collectLevelStats(mats: MaterialSystem, cancelled: () => boolean): Promise<LevelStats> {
  const scene = new THREE.Scene();
  const byName: Record<string, number> = {};
  const baseProps = (LEGACY_PROP_MODULE as unknown as PropModuleApi).create({
    scene,
    mats,
    params: {},
    quality: { tex: 256 },
    rng: makeRng(),
  });
  const countingProps = {
    names: () => baseProps.names(),
    has: (name: string) => baseProps.has(name),
    build: (name: string, opts?: Record<string, unknown>) => {
      byName[name] = (byName[name] ?? 0) + 1;
      return baseProps.build(name, opts);
    },
  };

  const ctx: Record<string, unknown> = {
    scene,
    mats,
    props: countingProps,
    params: {},
    quality: { tex: 256 },
    rng: makeRng(),
    physics: {
      boxes: [],
      addBox: (min: THREE.Vector3, max: THREE.Vector3) => ({ min, max }),
      nav: null,
      build() {},
    },
    level: { interiorBoxes: [], skylights: [] },
    events: { on: () => () => {}, off: () => {}, emit: () => {} },
    render: {
      resolution: new THREE.Vector2(960, 540),
      addPrePass() {},
      renderWorld() {},
      post: {},
    },
    time: { t: 0, dt: 0, frame: 0, real: 0 },
  };

  try {
    const level = await (LEGACY_LEVEL_MODULE as unknown as LevelModuleApi).create(ctx);
    if (cancelled()) return { total: 0, containers: 0, byName: {} };
    const total =
      level?.stats?.props ??
      Object.values(byName).reduce((sum, value) => sum + value, 0);
    const containers =
      level?.stats?.containers ??
      Object.entries(byName)
        .filter(([key]) => key.startsWith("container"))
        .reduce((sum, [, value]) => sum + value, 0);
    return { total, containers, byName };
  } finally {
    disposeObject(scene);
  }
}
