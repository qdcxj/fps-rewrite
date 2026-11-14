/**
 * 主题关卡专用环境：替换原版港区地面与远景，避免海面、吊机、集装箱堆场混入
 * 废弃工厂 / 沙漠 / 雪地关卡。地面与远景全部使用程序化材质。
 */
import * as THREE from "three";
import { getLevel, type LevelId } from "../levels";
import { THEMES } from "../themes";

interface ThemeEnvContext {
  scene: THREE.Scene;
  mats: {
    get: (name: string, opts?: Record<string, unknown>) => THREE.Material;
  };
}

export interface ThemeEnvironment {
  ground: {
    root: THREE.Group;
    rainLevel: number;
    setRain: (v: number) => void;
    setReflections: (v: boolean) => void;
    update: (dt: number) => void;
    dispose?: () => void;
  };
  backdrop: {
    root: THREE.Group;
    stats: Record<string, number>;
  };
}

function mesh(
  parent: THREE.Object3D,
  geometry: THREE.BufferGeometry,
  material: THREE.Material,
  x: number,
  y: number,
  z: number,
  ry = 0,
): THREE.Mesh {
  const item = new THREE.Mesh(geometry, material);
  item.position.set(x, y, z);
  item.rotation.y = ry;
  item.receiveShadow = true;
  parent.add(item);
  return item;
}

/**
 * 地面专用材质：复用程序化贴图，但改用普通 UV 平铺的 StandardMaterial。
 * 大面积地面不再运行 triplanar + 湿滑/宏观噪声着色器，全屏填充开销显著降低。
 */
function makeGroundMaterial(src: THREE.Material, repeat = 40): THREE.MeshStandardMaterial {
  const std = src as THREE.MeshStandardMaterial;
  const tiled = (texture: THREE.Texture | null): THREE.Texture | null => {
    if (!texture) return null;
    const cloned = texture.clone();
    cloned.wrapS = cloned.wrapT = THREE.RepeatWrapping;
    cloned.repeat.set(repeat, repeat);
    cloned.needsUpdate = true;
    return cloned;
  };
  const orm = tiled(std.roughnessMap);
  const material = new THREE.MeshStandardMaterial({
    color: std.color ? std.color.clone() : new THREE.Color(0xffffff),
    map: tiled(std.map),
    normalMap: tiled(std.normalMap),
    roughnessMap: orm,
    metalnessMap: orm,
    roughness: Math.max(0.85, std.roughness),
    metalness: Math.min(0.06, std.metalness),
  });
  material.normalScale.copy(std.normalScale);
  material.name = `${std.name || "theme"}-ground`;
  material.envMapIntensity = 0.35;
  return material;
}

/**
 * 雪地专用地面材质：原雪材质的贴图是给自定义着色器采样用的，含大面积空块，
 * 直接平铺会出现黑色带状区域。这里生成专用的可平铺雪面贴图，
 * 并从高度场派生法线贴图（粉末雪的微起伏）与粗糙度贴图（闪晶处略光滑）。
 */
function makeSnowGroundMaterial(): THREE.MeshStandardMaterial {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d")!;
  const image = context.createImageData(size, size);
  const normalImage = context.createImageData(size, size);
  const roughImage = context.createImageData(size, size);

  const hash = (x: number, y: number) => {
    const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
    return n - Math.floor(n);
  };
  const tileNoise = (u: number, v: number, grid: number) => {
    const x = u * grid;
    const y = v * grid;
    const x0 = Math.floor(x) % grid;
    const y0 = Math.floor(y) % grid;
    const x1 = (x0 + 1) % grid;
    const y1 = (y0 + 1) % grid;
    const fx = x - Math.floor(x);
    const fy = y - Math.floor(y);
    const sx = fx * fx * (3 - 2 * fx);
    const sy = fy * fy * (3 - 2 * fy);
    const a = hash(x0, y0);
    const b = hash(x1, y0);
    const c = hash(x0, y1);
    const d = hash(x1, y1);
    return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy;
  };

  let seed = 7919;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  // 先采样高度场，法线贴图需要邻域梯度；加入高频分量呈现雪粒微起伏
  const heights = new Float32Array(size * size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = x / size;
      const v = y / size;
      heights[y * size + x] =
        tileNoise(u, v, 4) * 0.45 +
        tileNoise(u, v, 9) * 0.27 +
        tileNoise(u, v, 21) * 0.18 +
        tileNoise(u, v, 64) * 0.1;
    }
  }

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = y * size + x;
      const broad = heights[i];
      // 高度梯度 → 切线空间法线（法线贴图默认 +Y 向上）
      const xl = x === 0 ? size - 1 : x - 1;
      const xr = x === size - 1 ? 0 : x + 1;
      const yl = y === 0 ? size - 1 : y - 1;
      const yr = y === size - 1 ? 0 : y + 1;
      const dhx = heights[y * size + xr] - heights[y * size + xl];
      const dhy = heights[yr * size + x] - heights[yl * size + x];
      const strength = 3.4;
      let nx = -dhx * strength;
      let ny = -dhy * strength;
      let nz = 1;
      const inv = 1 / Math.sqrt(nx * nx + ny * ny + nz * nz);
      nx *= inv;
      ny *= inv;
      nz *= inv;
      const ni = i * 4;
      normalImage.data[ni] = (nx * 0.5 + 0.5) * 255;
      normalImage.data[ni + 1] = (ny * 0.5 + 0.5) * 255;
      normalImage.data[ni + 2] = (nz * 0.5 + 0.5) * 255;
      normalImage.data[ni + 3] = 255;

      const grain = random() - 0.5;
      const value = 232 + (broad - 0.5) * 22 + grain * 7;
      const sparkle = random() > 0.996 ? 26 : 0;
      const ai = i * 4;
      image.data[ai] = Math.max(0, Math.min(255, value - 4 + sparkle));
      image.data[ai + 1] = Math.max(0, Math.min(255, value - 1 + sparkle));
      image.data[ai + 2] = Math.max(0, Math.min(255, value + 3 + sparkle));
      image.data[ai + 3] = 255;

      // 粉末雪整体很粗糙，闪晶处略光滑 → 光照下出现细碎亮点
      const ri = i * 4;
      const rough = 246 - sparkle * 2;
      roughImage.data[ri] = rough;
      roughImage.data[ri + 1] = rough;
      roughImage.data[ri + 2] = rough;
      roughImage.data[ri + 3] = 255;
    }
  }
  context.putImageData(image, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(80, 80);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  const makeCanvasTexture = (data: ImageData): THREE.CanvasTexture => {
    const c = document.createElement("canvas");
    c.width = size;
    c.height = size;
    c.getContext("2d")!.putImageData(data, 0, 0);
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(80, 80);
    t.colorSpace = THREE.NoColorSpace;
    t.needsUpdate = true;
    return t;
  };

  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: texture,
    normalMap: makeCanvasTexture(normalImage),
    roughnessMap: makeCanvasTexture(roughImage),
    roughness: 0.96,
    metalness: 0,
  });
  material.normalScale.set(0.85, 0.85);
  material.name = "snow-ground";
  material.envMapIntensity = 0.35;
  return material;
}

/**
 * 沙漠专用地面材质：暖色沙面 + 风成沙纹条带 + 细颗粒噪声。
 * 不再复用混凝土基纹理（灰底会让沙地发灰发绿），环境反射降到最低，
 * 避免冷色天空把沙面洗成泥色。
 */
function makeDesertGroundMaterial(): THREE.MeshStandardMaterial {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d")!;
  const image = context.createImageData(size, size);

  const hash = (x: number, y: number) => {
    const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
    return n - Math.floor(n);
  };
  const tileNoise = (u: number, v: number, grid: number) => {
    const x = u * grid;
    const y = v * grid;
    const x0 = Math.floor(x) % grid;
    const y0 = Math.floor(y) % grid;
    const x1 = (x0 + 1) % grid;
    const y1 = (y0 + 1) % grid;
    const fx = x - Math.floor(x);
    const fy = y - Math.floor(y);
    const sx = fx * fx * (3 - 2 * fx);
    const sy = fy * fy * (3 - 2 * fy);
    const a = hash(x0, y0);
    const b = hash(x1, y0);
    const c = hash(x0, y1);
    const d = hash(x1, y1);
    return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy;
  };

  let seed = 9901;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = x / size;
      const v = y / size;
      // 风成沙纹：主风向条带被噪声扰动，明暗对比刻意压低
      const band = Math.sin((v * 36 + Math.sin(u * 19.3) * 2.8) * Math.PI * 2);
      const broad =
        tileNoise(u, v, 5) * 0.5 + tileNoise(u, v, 13) * 0.3 + tileNoise(u, v, 31) * 0.2;
      const grain = random() - 0.5;
      const lum = 0.78 + band * 0.05 + (broad - 0.5) * 0.11 + grain * 0.05;
      const i = (y * size + x) * 4;
      image.data[i] = Math.max(0, Math.min(255, 232 * lum));
      image.data[i + 1] = Math.max(0, Math.min(255, 200 * lum));
      image.data[i + 2] = Math.max(0, Math.min(255, 150 * lum));
      image.data[i + 3] = 255;
    }
  }
  context.putImageData(image, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(64, 64);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    map: texture,
    roughness: 1,
    metalness: 0,
  });
  material.name = "desert-ground";
  // 沙地几乎不反射天空：降低环境反射，保持暖沙本色
  material.envMapIntensity = 0.12;
  return material;
}

function addFactoryBackdrop(root: THREE.Group, ctx: ThemeEnvContext) {
  const concrete = ctx.mats.get("factory_concrete_dark");
  const brick = ctx.mats.get("factory_brick");
  const rust = ctx.mats.get("factory_rust");
  const dummy = new THREE.Object3D();
  // 远景厂房
  const warehouses = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), concrete, 7);
  for (let i = 0; i < 7; i++) {
    const w = 18 + (i % 3) * 8;
    const h = 8 + (i % 4) * 3;
    dummy.position.set(-90 + i * 30, h / 2, -78 - (i % 2) * 18);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(w, h, 12);
    dummy.updateMatrix();
    warehouses.setMatrixAt(i, dummy.matrix);
  }
  warehouses.instanceMatrix.needsUpdate = true;
  root.add(warehouses);
  // 烟囱
  const stacks = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.722, 1, 1, 10), brick, 4);
  [-102, -54, 12, 66].forEach((x, i) => {
    dummy.position.set(x, 17, -96);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(3.6, 34, 3.6);
    dummy.updateMatrix();
    stacks.setMatrixAt(i, dummy.matrix);
  });
  stacks.instanceMatrix.needsUpdate = true;
  root.add(stacks);
  // 近处废弃输送管廊
  const pipes = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.5, 0.5, 40, 8), rust, 4);
  for (let i = 0; i < 4; i++) {
    dummy.position.set(-60 + i * 18, 4.5 + i * 0.4, -44);
    dummy.rotation.set(0, 0, Math.PI / 2);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    pipes.setMatrixAt(i, dummy.matrix);
  }
  pipes.instanceMatrix.needsUpdate = true;
  root.add(pipes);
}

function addDesertBackdrop(root: THREE.Group, ctx: ThemeEnvContext) {
  const rock = ctx.mats.get("sandstone");
  const sand = ctx.mats.get("dune_sand");
  const dummy = new THREE.Object3D();
  // 台地
  const mesas = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.72, 1, 1, 7), rock, 9);
  for (let i = 0; i < 9; i++) {
    const radius = 12 + (i % 3) * 7;
    const height = 10 + (i % 4) * 6;
    dummy.position.set(-120 + i * 30, height / 2, -92 - (i % 2) * 24);
    dummy.rotation.set(0, i * 0.7, 0);
    dummy.scale.set(radius, height, radius);
    dummy.updateMatrix();
    mesas.setMatrixAt(i, dummy.matrix);
  }
  mesas.instanceMatrix.needsUpdate = true;
  root.add(mesas);
  // 远景沙丘：近排低缓、远排沿地平线延绵，形成连续沙丘天际线
  const dunes = new THREE.InstancedMesh(new THREE.SphereGeometry(16, 12, 8), sand, 16);
  let index = 0;
  for (let i = 0; i < 8; i++) {
    dummy.position.set(-152 + i * 42, -3.2, -72 - (i % 3) * 12);
    dummy.rotation.set(0, i * 0.35, 0);
    dummy.scale.set(2.3, 0.4, 1.5);
    dummy.updateMatrix();
    dunes.setMatrixAt(index++, dummy.matrix);
  }
  for (let i = 0; i < 8; i++) {
    dummy.position.set(-146 + i * 42 + 16, -5.4, -104 - (i % 2) * 9);
    dummy.rotation.set(0, i * 0.2, 0);
    dummy.scale.set(3.1, 0.5, 1.7);
    dummy.updateMatrix();
    dunes.setMatrixAt(index++, dummy.matrix);
  }
  dunes.instanceMatrix.needsUpdate = true;
  root.add(dunes);
}

function addSnowBackdrop(root: THREE.Group, ctx: ThemeEnvContext) {
  const rock = ctx.mats.get("snow_rock");
  const metal = ctx.mats.get("snow_metal");

  // 暴雪中远景应被雪幕吞没：不再放置规则的白色圆锥山体，
  // 只保留信号塔与观测站剪影，让雾、树线和雪丘承担纵深。
  for (const x of [-64, -20, 30, 74]) {
    mesh(root, new THREE.CylinderGeometry(0.5, 1.4, 26, 6), metal, x, 13, -62);
    mesh(root, new THREE.BoxGeometry(16, 5, 9), rock, x + 8, 2.5, -74);
  }
}

/** 雪地表面高度：场地内接近平坦（物理地面为 0），场外逐渐堆成雪脊 */
function snowHeightAt(x: number, z: number): number {
  const X0 = -34;
  const X1 = 28;
  const Z0 = -30;
  const Z1 = 26;
  const outX = Math.max(0, X0 - x, x - X1);
  const outZ = Math.max(0, Z0 - z, z - Z1);
  const outside = Math.hypot(outX, outZ);
  const inner = 1 - Math.min(1, outside / 6);
  // 风蚀雪脊（sastrugi）：短波、低幅，靠法线产生明暗
  const sastrugi =
    Math.sin(x * 1.31 + Math.sin(z * 0.42) * 2.4) * 0.022 +
    Math.sin(z * 1.07 + x * 0.27) * 0.015 +
    Math.sin((x + z) * 1.9) * 0.008;
  // 大尺度雪面起伏
  const roll =
    Math.sin(x * 0.062 + 1.3) * Math.cos(z * 0.055 - 0.6) * 0.045 +
    Math.sin((x - z) * 0.041 + 2.1) * 0.03;
  const t = Math.min(1, outside / 30);
  const bank = Math.pow(t, 1.55) * 3.8;
  const drift =
    outside > 0
      ? (Math.sin(x * 0.17 + 2.3) * Math.cos(z * 0.15 - 1.1) * 0.95 +
          Math.sin((x + z) * 0.09) * 0.55) * t
      : 0;
  return (sastrugi + roll) * (0.35 + 0.65 * inner) + bank + drift;
}

function createSnowGroundGeometry(): THREE.PlaneGeometry {
  const geometry = new THREE.PlaneGeometry(260, 260, 200, 200);
  const position = geometry.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i);
    // 平面绕 X 轴 -90° 后，局部 Y 对应世界 -Z
    const z = -position.getY(i);
    position.setZ(i, snowHeightAt(x, z));
  }
  geometry.computeVertexNormals();
  return geometry;
}

/** 沙漠表面高度：场内轻微起伏（沙面呼吸感，不破坏道具落地），场外堆成沙丘坡 */
function desertHeightAt(x: number, z: number): number {
  const X0 = -34;
  const X1 = 28;
  const Z0 = -30;
  const Z1 = 26;
  const outX = Math.max(0, X0 - x, x - X1);
  const outZ = Math.max(0, Z0 - z, z - Z1);
  const outside = Math.hypot(outX, outZ);
  const inner = 1 - Math.min(1, outside / 6);
  // 风成波纹：短波低幅
  const ripple =
    Math.sin(x * 0.82 + Math.sin(z * 0.31) * 1.8) * 0.028 +
    Math.sin((x + z) * 1.55) * 0.014;
  // 大尺度沙丘起伏（波长 60m+，场内仅剩 15% 幅度，保持道具贴合地面）
  const roll =
    (Math.sin(x * 0.052 + 1.7) * Math.cos(z * 0.046 - 0.8) +
      Math.sin((x - z) * 0.038 + 2.3)) *
    0.09;
  const t = Math.min(1, outside / 32);
  const bank = Math.pow(t, 1.6) * 3.4;
  const drift =
    outside > 0
      ? (Math.sin(x * 0.13 + 2.1) * Math.cos(z * 0.11 - 0.9) * 0.85 +
          Math.sin((x + z) * 0.07) * 0.5) * t
      : 0;
  return (ripple + roll) * (0.15 + 0.85 * inner) + bank + drift;
}

function createDesertGroundGeometry(): THREE.PlaneGeometry {
  const geometry = new THREE.PlaneGeometry(260, 260, 200, 200);
  const position = geometry.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i);
    const z = -position.getY(i);
    position.setZ(i, desertHeightAt(x, z));
  }
  geometry.computeVertexNormals();
  return geometry;
}

export async function buildThemeEnvironment(
  raw: Record<string, unknown>,
  levelId: LevelId,
): Promise<ThemeEnvironment> {
  const ctx = raw as unknown as ThemeEnvContext;
  const theme = THEMES[getLevel(levelId).theme];
  const groundRoot = new THREE.Group();
  groundRoot.name = `theme-ground-${levelId}`;
  const backdropRoot = new THREE.Group();
  backdropRoot.name = `theme-backdrop-${levelId}`;

  const groundSource = ctx.mats.get(theme.ground ?? "asphalt", {
    triplanar: true,
    scale: theme.groundScale,
  });
  const groundMaterial =
    theme.id === "snow"
      ? makeSnowGroundMaterial()
      : theme.id === "desert"
        ? makeDesertGroundMaterial()
        : makeGroundMaterial(groundSource, 40);
  const groundGeometry =
    theme.id === "snow"
      ? createSnowGroundGeometry()
      : theme.id === "desert"
        ? createDesertGroundGeometry()
        : new THREE.PlaneGeometry(260, 260);
  const plane = mesh(
    groundRoot,
    groundGeometry,
    groundMaterial,
    0,
    0,
    0,
  );
  plane.rotation.x = -Math.PI / 2;
  plane.receiveShadow = true;
  plane.name = "theme-ground-plane";

  if (theme.id === "factory") {
    const seam = ctx.mats.get("factory_concrete_dark");
    // 地坪伸缩缝使用实例化，26 条缝隙仅一次 draw call
    const seams = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 0.02, 0.14), seam, 26);
    const dummy = new THREE.Object3D();
    let index = 0;
    for (let i = -6; i <= 6; i++) {
      dummy.position.set(0, 0.012, i * 6);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(100, 1, 1);
      dummy.updateMatrix();
      seams.setMatrixAt(index++, dummy.matrix);
      dummy.position.set(i * 6, 0.012, 0);
      dummy.rotation.set(0, Math.PI / 2, 0);
      dummy.updateMatrix();
      seams.setMatrixAt(index++, dummy.matrix);
    }
    seams.instanceMatrix.needsUpdate = true;
    seams.receiveShadow = true;
    groundRoot.add(seams);
    addFactoryBackdrop(backdropRoot, ctx);
  } else if (theme.id === "desert") {
    // 沙地起伏与沙纹由地面几何+定制纹理承担，不再铺深色斑块（低视角下像水坑）
    addDesertBackdrop(backdropRoot, ctx);
  } else if (theme.id === "snow") {
    // 雪地不再铺平面冰斑（会在起伏地形上裁切成硬边碎片），改由雪丘/冰岩道具表现
    addSnowBackdrop(backdropRoot, ctx);
  }

  ctx.scene.add(groundRoot, backdropRoot);

  return {
    ground: {
      root: groundRoot,
      rainLevel: 0,
      setRain: () => {},
      setReflections: () => {},
      update: () => {},
      dispose: () => {
        const textures = new Set<THREE.Texture>();
        for (const texture of [
          groundMaterial.map,
          groundMaterial.normalMap,
          groundMaterial.roughnessMap,
          groundMaterial.metalnessMap,
        ]) {
          if (texture) textures.add(texture);
        }
        for (const texture of textures) texture.dispose();
        groundMaterial.dispose();
      },
    },
    backdrop: {
      root: backdropRoot,
      stats: { meshes: backdropRoot.children.length },
    },
  };
}
