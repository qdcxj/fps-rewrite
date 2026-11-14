/**
 * 主题关卡程序化资产：废弃工厂 / 沙漠 / 雪地。
 * 全部沿用原版道具管线：注册到 LEGACY_PROP_MODULE 后即可被关卡构建器 place/stack 使用，
 * 材质来自程序化材质注册表，碰撞体通过 userData.colliders 交给原版关卡构建器。
 */
import * as THREE from "three";
import { LEGACY_PROP_MODULE } from "./worldBuilders";

interface PropContext {
  mats: {
    get: (name: string, opts?: Record<string, unknown>) => THREE.Material;
    emissive: (color?: number, intensity?: number) => THREE.Material;
  };
}

type PropBuilder = (ctx: PropContext, opts?: Record<string, unknown>) => THREE.Group;
type BoxCollider = { min: [number, number, number]; max: [number, number, number]; surface: string };

const PROP = LEGACY_PROP_MODULE as unknown as {
  PROP_SIZES: Record<string, [number, number, number, string, string]>;
  register: (name: string, builder: PropBuilder) => void;
};

function rng(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function box(
  parent: THREE.Object3D,
  w: number,
  h: number,
  d: number,
  mat: THREE.Material,
  x: number,
  y: number,
  z: number,
  ry = 0,
  rx = 0,
  rz = 0,
): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  mesh.position.set(x, y, z);
  mesh.rotation.set(rx, ry, rz);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

function cyl(
  parent: THREE.Object3D,
  top: number,
  bottom: number,
  h: number,
  mat: THREE.Material,
  x: number,
  y: number,
  z: number,
  rx = 0,
  rz = 0,
  segments = 12,
): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(top, bottom, h, segments), mat);
  mesh.position.set(x, y, z);
  mesh.rotation.set(rx, 0, rz);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

function cone(
  parent: THREE.Object3D,
  radius: number,
  h: number,
  mat: THREE.Material,
  x: number,
  y: number,
  z: number,
  ry = 0,
  segments = 10,
): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.ConeGeometry(radius, h, segments), mat);
  mesh.position.set(x, y, z);
  mesh.rotation.y = ry;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

function sphere(
  parent: THREE.Object3D,
  radius: number,
  mat: THREE.Material,
  x: number,
  y: number,
  z: number,
  sx = 1,
  sy = 1,
  sz = 1,
): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 24, 16), mat);
  mesh.position.set(x, y, z);
  mesh.scale.set(sx, sy, sz);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

function beam(
  parent: THREE.Object3D,
  a: [number, number, number],
  b: [number, number, number],
  radius: number,
  mat: THREE.Material,
): THREE.Mesh {
  const from = new THREE.Vector3(...a);
  const to = new THREE.Vector3(...b);
  const dir = to.clone().sub(from);
  const len = Math.max(0.01, dir.length());
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, len, 6), mat);
  mesh.position.copy(from).add(to).multiplyScalar(0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

function prop(
  object: THREE.Group,
  size: [number, number, number],
  colliders: BoxCollider[],
  surface = "concrete",
): THREE.Group {
  object.userData.size = size;
  object.userData.colliders = colliders;
  object.userData.primarySurface = surface;
  return object;
}

function collider(x: number, z: number, w: number, d: number, h = 4, surface = "concrete"): BoxCollider {
  return { min: [x - w / 2, 0, z - d / 2], max: [x + w / 2, h, z + d / 2], surface };
}

function register(name: string, size: [number, number, number, string, string], builder: PropBuilder) {
  PROP.PROP_SIZES[name] = size;
  PROP.register(name, builder);
}

/* ==================================================================  废弃工厂  */

register("factory_wall", [8, 6.2, 0.9, "factory_brick", "concrete"], (ctx) => {
  const g = new THREE.Group();
  const brick = ctx.mats.get("factory_brick");
  const steel = ctx.mats.get("factory_steel");
  const dark = ctx.mats.get("factory_steel");
  box(g, 8, 5.6, 0.52, brick, 0, 2.8, 0);
  box(g, 8.2, 0.35, 0.72, steel, 0, 5.82, 0);
  box(g, 8, 0.3, 1.1, ctx.mats.get("factory_concrete_dark"), 0, 0.15, 0);
  for (const x of [-3.6, -1.8, 1.8, 3.6]) box(g, 0.3, 5.6, 0.78, steel, x, 2.8, 0);
  for (let i = 0; i < 3; i++) {
    box(g, 1.35, 1.5, 0.1, dark, -2.4 + i * 2.4, 3.35, 0.3);
    box(g, 1.55, 0.18, 0.16, steel, -2.4 + i * 2.4, 4.18, 0.32);
  }
  return prop(g, [8, 6.2, 0.9], [collider(0, 0, 8, 0.6, 5.8)]);
});

register("factory_smokestack", [4, 20, 4, "factory_brick", "concrete"], (ctx) => {
  const g = new THREE.Group();
  const brick = ctx.mats.get("factory_brick");
  const steel = ctx.mats.get("factory_steel");
  box(g, 3.6, 1.2, 3.6, ctx.mats.get("factory_concrete_dark"), 0, 0.6, 0);
  cyl(g, 1.35, 1.95, 17, brick, 0, 9.4, 0, 0, 0, 18);
  for (const y of [2.2, 6.5, 11, 15.5]) cyl(g, 2.02, 2.02, 0.28, steel, 0, y, 0, 0, 0, 18);
  cyl(g, 1.45, 1.45, 0.4, steel, 0, 18.1, 0, 0, 0, 18);
  for (let i = 0; i < 8; i++) box(g, 0.5, 0.12, 0.16, steel, 1.9, 2.4 + i * 1.8, 0);
  return prop(g, [4, 20, 4], [collider(0, 0, 3.6, 3.6, 18)]);
});

register("factory_furnace", [8, 6, 5, "factory_brick", "concrete"], (ctx) => {
  const g = new THREE.Group();
  const brick = ctx.mats.get("factory_brick");
  const steel = ctx.mats.get("factory_steel");
  const glow = ctx.mats.emissive(0xff6a24, 2.6);
  box(g, 7, 0.6, 4.6, ctx.mats.get("factory_concrete_dark"), 0, 0.3, 0);
  box(g, 6, 4.4, 4, brick, 0, 2.8, 0);
  for (const x of [-3.05, 3.05]) {
    for (const z of [-2.05, 2.05]) box(g, 0.25, 5.4, 0.25, steel, x, 2.7, z);
  }
  box(g, 6.4, 0.22, 4.4, steel, 0, 5.1, 0);
  for (let i = 0; i < 3; i++) {
    box(g, 0.9, 0.16, 0.12, glow, -1.7 + i * 1.7, 1.5, 2.05);
    box(g, 0.7, 0.1, 0.1, glow, -1.7 + i * 1.7, 2.4, 2.05);
  }
  cyl(g, 0.75, 1.1, 2.2, brick, 1.6, 6.2, 0, 0, 0, 12);
  cyl(g, 0.34, 0.34, 6, ctx.mats.get("factory_rust"), -2.1, 3.2, 2.2, 0, Math.PI / 2, 8);
  return prop(g, [8, 6, 5], [collider(0, 0, 6, 4, 5.3)]);
});

register("factory_pipe_rack", [8, 4.2, 2.2, "factory_rust", "metal"], (ctx) => {
  const g = new THREE.Group();
  const pipe = ctx.mats.get("factory_rust");
  const steel = ctx.mats.get("factory_steel");
  for (const y of [2.1, 2.9, 3.7]) {
    for (const z of [-0.5, 0.5]) {
      cyl(g, 0.2, 0.2, 8, pipe, 0, y, z, 0, Math.PI / 2, 8);
    }
  }
  for (const x of [-3.1, 3.1]) {
    box(g, 0.35, 4, 0.35, steel, x, 2, -0.8);
    box(g, 0.35, 4, 0.35, steel, x, 2, 0.8);
    box(g, 0.28, 0.28, 2, steel, x, 3.85, 0);
  }
  return prop(g, [8, 4.2, 2.2], [collider(-3.1, 0, 0.7, 2, 4), collider(3.1, 0, 0.7, 2, 4)]);
});

register("factory_tank", [4, 6, 4, "factory_steel", "metal"], (ctx) => {
  const g = new THREE.Group();
  const steel = ctx.mats.get("factory_steel");
  const rust = ctx.mats.get("factory_rust");
  for (const x of [-1.35, 1.35]) for (const z of [-1.35, 1.35]) cyl(g, 0.16, 0.16, 3.4, steel, x, 1.7, z, 0, 0, 8);
  cyl(g, 1.75, 1.75, 3, steel, 0, 4.1, 0, 0, 0, 18);
  cyl(g, 1.78, 1.78, 0.2, rust, 0, 3.1, 0, 0, 0, 18);
  cyl(g, 0.28, 0.28, 2.6, rust, 1.3, 5.6, 0, 0, 0, 8);
  for (let i = 0; i < 5; i++) box(g, 0.04, 0.1, 0.5, steel, -2.1, 2 + i * 0.6, 0);
  return prop(g, [4, 6, 4], [collider(0, 0, 3.4, 3.4, 5.6)]);
});

register("factory_machine", [3.2, 2.6, 2.2, "factory_steel", "metal"], (ctx) => {
  const g = new THREE.Group();
  const steel = ctx.mats.get("factory_steel");
  const rust = ctx.mats.get("factory_rust");
  box(g, 2.8, 0.7, 2, rust, 0, 0.35, 0);
  box(g, 2.2, 1.3, 1.5, steel, 0, 1.35, 0);
  cyl(g, 0.62, 0.62, 0.24, rust, 0.4, 1.7, 0.85, Math.PI / 2, 0, 14);
  box(g, 0.14, 1.4, 0.14, rust, -0.9, 2.2, 0.2, 0, 0, 0.5);
  box(g, 0.5, 0.1, 0.1, steel, -1.25, 2.85, 0.2);
  return prop(g, [3.2, 2.6, 2.2], [collider(0, 0, 3, 2, 2)]);
});

register("factory_rubble", [4, 1.2, 4, "factory_concrete_dark", "concrete"], (ctx) => {
  const g = new THREE.Group();
  const concrete = ctx.mats.get("factory_concrete_dark");
  const steel = ctx.mats.get("factory_steel");
  const r = rng(19);
  for (let i = 0; i < 9; i++) {
    const s = 0.35 + r() * 0.9;
    box(g, s, s * 0.6, s * (0.6 + r() * 0.6), concrete, (r() - 0.5) * 3, s * 0.3, (r() - 0.5) * 3, r() * 3, r() * 0.6, r() * 0.6);
  }
  for (let i = 0; i < 5; i++) box(g, 0.05, 1.6, 0.05, steel, (r() - 0.5) * 2.6, 0.8, (r() - 0.5) * 2.6, r() * 3, (r() - 0.5) * 0.7);
  return prop(g, [4, 1.2, 4], [collider(0, 0, 3.4, 3.4, 0.9)]);
});

/* ==================================================================  沙漠  */

register("desert_dune", [16, 3, 12, "sand", "sand"], (ctx) => {
  const g = new THREE.Group();
  const sand = ctx.mats.get("dune_sand");
  sphere(g, 6, sand, 0, 0.2, 0, 1.4, 0.28, 0.95);
  sphere(g, 4.2, sand, 4.2, 0.1, 1.8, 1.1, 0.24, 0.8);
  sphere(g, 3.6, sand, -4.5, 0.1, -1.5, 1.2, 0.22, 0.9);
  return prop(g, [16, 3, 12], []);
});

register("desert_rock", [6, 4, 5, "sandstone", "concrete"], (ctx) => {
  const g = new THREE.Group();
  const rock = ctx.mats.get("sandstone");
  const dark = ctx.mats.get("sand_dark");
  const r = rng(31);
  for (let i = 0; i < 4; i++) {
    const s = 1 + r() * 1.6;
    const mesh = new THREE.Mesh(new THREE.DodecahedronGeometry(s, 0), i % 2 ? rock : dark);
    mesh.position.set((r() - 0.5) * 3, s * 0.65, (r() - 0.5) * 2.4);
    mesh.rotation.set(r() * 2, r() * 3, r() * 2);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    g.add(mesh);
  }
  return prop(g, [6, 4, 5], [collider(0, 0, 4.6, 3.6, 3.4)]);
});

register("desert_arch", [8, 6, 3, "sandstone", "concrete"], (ctx) => {
  const g = new THREE.Group();
  const rock = ctx.mats.get("sandstone");
  const dark = ctx.mats.get("sand_dark");
  box(g, 1.4, 5.2, 1.5, rock, -3.1, 2.6, 0);
  box(g, 1.4, 5.2, 1.5, rock, 3.1, 2.6, 0);
  box(g, 7.8, 1.2, 1.7, rock, 0, 5.5, 0);
  box(g, 8.6, 0.35, 2, dark, 0, 6.15, 0);
  for (const x of [-3.1, 3.1]) box(g, 1.9, 0.4, 2, dark, x, 0.2, 0);
  return prop(g, [8, 6, 3], [collider(-3.1, 0, 1.4, 1.5, 5.2), collider(3.1, 0, 1.4, 1.5, 5.2)]);
});

register("desert_dead_tree", [3, 4.5, 3, "wood_dark", "wood"], (ctx) => {
  const g = new THREE.Group();
  const wood = ctx.mats.get("wood_dark");
  cyl(g, 0.12, 0.2, 3, wood, 0, 1.5, 0, 0, 0.08, 7);
  beam(g, [0, 2.6, 0], [1.1, 3.6, 0.4], 0.09, wood);
  beam(g, [0, 2.2, 0], [-0.9, 3.3, -0.5], 0.08, wood);
  beam(g, [0.2, 3.1, 0.1], [0.5, 4.2, -0.7], 0.06, wood);
  return prop(g, [3, 4.5, 3], [collider(0, 0, 0.5, 0.5, 3)]);
});

register("desert_derrick", [4, 10, 4, "desert_rust", "metal"], (ctx) => {
  const g = new THREE.Group();
  const steel = ctx.mats.get("desert_rust");
  const metal = ctx.mats.get("desert_metal");
  const base = 1.8;
  const top = 0.35;
  for (const [sx, sz] of [
    [-1, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
  ]) {
    beam(g, [sx * base, 0, sz * base], [sx * top, 9, sz * top], 0.11, steel);
  }
  for (const y of [2.4, 4.6, 6.8]) {
    const s = base - (y / 9) * (base - top);
    box(g, s * 2, 0.12, 0.12, metal, 0, y, -s);
    box(g, s * 2, 0.12, 0.12, metal, 0, y, s);
    box(g, 0.12, 0.12, s * 2, metal, -s, y, 0);
    box(g, 0.12, 0.12, s * 2, metal, s, y, 0);
  }
  box(g, 2.2, 0.3, 2.2, metal, 0, 9, 0);
  cyl(g, 0.55, 0.55, 0.22, metal, 0, 9.35, 0, Math.PI / 2, 0, 12);
  box(g, 2.6, 0.22, 0.4, steel, 0.4, 8.6, 0.8, 0, 0, -0.12);
  box(g, 1.4, 0.9, 1.2, ctx.mats.get("desert_metal"), -1.9, 0.55, 0);
  return prop(g, [4, 10, 4], [collider(0, 0, 3.4, 3.4, 9.4)]);
});

register("desert_train_car", [10, 4, 3, "desert_rust", "metal"], (ctx) => {
  const g = new THREE.Group();
  const rust = ctx.mats.get("desert_rust");
  const dark = ctx.mats.get("desert_metal");
  box(g, 9, 2.4, 2.6, rust, 0, 2.15, 0);
  box(g, 9.4, 0.25, 2.9, dark, 0, 3.45, 0);
  for (const x of [-3.2, -1.1, 1.1, 3.2]) {
    cyl(g, 0.5, 0.5, 0.28, dark, x, 0.5, 1.25, Math.PI / 2, 0, 12);
    cyl(g, 0.5, 0.5, 0.28, dark, x, 0.5, -1.25, Math.PI / 2, 0, 12);
  }
  box(g, 0.8, 0.35, 0.5, dark, -5, 1.1, 0);
  box(g, 0.8, 0.35, 0.5, dark, 5, 1.1, 0);
  return prop(g, [10, 4, 3], [collider(0, 0, 9, 2.6, 3.3)]);
});

register("desert_tent", [5, 2.6, 4, "tarp", "dirt"], (ctx) => {
  const g = new THREE.Group();
  const cloth = ctx.mats.get("tarp");
  const wood = ctx.mats.get("wood_dark");
  cone(g, 3.3, 2, cloth, 0, 1.35, 0, Math.PI / 4, 4);
  for (const x of [-1.8, 1.8]) for (const z of [-1.3, 1.3]) cyl(g, 0.05, 0.05, 2.1, wood, x, 1.05, z, 0, 0, 6);
  return prop(g, [5, 2.6, 4], [collider(0, 0, 3.6, 2.6, 2)]);
});

register("desert_water_tower", [4, 7, 4, "desert_metal", "metal"], (ctx) => {
  const g = new THREE.Group();
  const metal = ctx.mats.get("desert_metal");
  const rust = ctx.mats.get("desert_rust");
  for (const [x, z] of [
    [-1.3, -1.3],
    [1.3, -1.3],
    [-1.3, 1.3],
    [1.3, 1.3],
  ]) {
    cyl(g, 0.09, 0.11, 4.2, metal, x, 2.1, z, 0, 0, 6);
  }
  cyl(g, 1.7, 1.7, 2.2, rust, 0, 5.3, 0, 0, 0, 16);
  cyl(g, 1.75, 1.75, 0.16, metal, 0, 4.3, 0, 0, 0, 16);
  box(g, 0.06, 3.8, 0.4, metal, -1.9, 2, 0);
  return prop(g, [4, 7, 4], [collider(0, 0, 3.2, 3.2, 4.4)]);
});

/* ==================================================================  雪地  */

register("snow_pine", [4, 7.5, 4, "pine_needle", "wood"], (ctx) => {
  const g = new THREE.Group();
  const wood = ctx.mats.get("wood_dark");
  const needle = ctx.mats.get("pine_needle");
  const snow = ctx.mats.get("snow");
  cyl(g, 0.16, 0.24, 2.2, wood, 0, 1.1, 0, 0, 0, 7);
  const tiers: [number, number, number][] = [
    [1.9, 2.4, 2.1],
    [1.5, 2.1, 3.5],
    [1.0, 1.8, 4.9],
  ];
  for (const [radius, height, y] of tiers) {
    cone(g, radius, height, needle, 0, y, 0, 0.3, 9);
    cone(g, radius * 0.82, 0.4, snow, 0, y + height * 0.34, 0, 0.3, 9);
  }
  return prop(g, [4, 7.5, 4], [collider(0, 0, 0.7, 0.7, 2.4)]);
});

register("snow_ice_ridge", [8, 3, 4, "snow_ice", "concrete"], (ctx) => {
  const g = new THREE.Group();
  const ice = ctx.mats.get("snow_ice");
  const snow = ctx.mats.get("snow");
  const rock = ctx.mats.get("snow_rock");
  const r = rng(53);
  // 低矮、块状的冰岩露头：顶点扰动 + 雪帽，避免规则圆锥的塑料感
  for (let i = 0; i < 6; i++) {
    const radius = 0.9 + r() * 1.2;
    const geometry = new THREE.IcosahedronGeometry(radius, 1);
    const position = geometry.attributes.position as THREE.BufferAttribute;
    for (let v = 0; v < position.count; v++) {
      const px = position.getX(v);
      const py = position.getY(v);
      const pz = position.getZ(v);
      const hash = Math.sin(px * 12.9898 + py * 78.233 + pz * 37.719) * 43758.5453;
      const noise = hash - Math.floor(hash);
      const spread = 0.78 + noise * 0.45;
      position.setXYZ(v, px * spread, py * (0.55 + noise * 0.35), pz * spread);
    }
    geometry.computeVertexNormals();
    const boulder = new THREE.Mesh(geometry, i % 4 === 0 ? rock : ice);
    boulder.position.set((r() - 0.5) * 6, 0.1 + r() * 0.25, (r() - 0.5) * 2.6);
    boulder.rotation.set((r() - 0.5) * 0.3, r() * Math.PI, (r() - 0.5) * 0.3);
    boulder.scale.set(1, 0.7 + r() * 0.5, 1);
    boulder.castShadow = true;
    boulder.receiveShadow = true;
    g.add(boulder);
    sphere(
      g,
      radius * 0.72,
      snow,
      boulder.position.x,
      boulder.position.y + radius * 0.42,
      boulder.position.z,
      1,
      0.28,
      1,
    );
  }
  return prop(g, [8, 3, 4], [collider(0, 0, 6, 2.8, 2.4)]);
});

register("snow_drift", [8, 1.4, 6, "snow", "snow"], (ctx) => {
  const g = new THREE.Group();
  const snow = ctx.mats.get("snow");
  const scoured = ctx.mats.get("snow_dark");
  // 多层雪丘：主体 + 被风掏空的硬雪壳，低矮交叠
  sphere(g, 3.4, snow, -1.2, 0.08, 0, 1.25, 0.24, 1);
  sphere(g, 2.6, snow, 2.6, 0.06, 0.6, 1.2, 0.22, 1);
  sphere(g, 2.2, scoured, 0.4, 0.04, -1.8, 1.15, 0.18, 1);
  sphere(g, 1.5, snow, -2.4, 0.05, -1.2, 1.1, 0.2, 1);
  sphere(g, 1.1, scoured, 1.4, 0.04, 1.9, 1.2, 0.16, 1);
  return prop(g, [8, 1.4, 6], []);
});

register("snow_radar", [6, 6, 6, "snow_metal", "metal"], (ctx) => {
  const g = new THREE.Group();
  const metal = ctx.mats.get("snow_metal");
  const base = ctx.mats.get("snow_dark");
  const glow = ctx.mats.emissive(0xff4a3a, 2.2);
  cyl(g, 2.4, 2.7, 0.8, base, 0, 0.4, 0, 0, 0, 16);
  cyl(g, 0.85, 1.1, 2.2, metal, 0, 1.9, 0, 0, 0, 12);
  const dome = new THREE.Mesh(new THREE.SphereGeometry(2, 18, 12, 0, Math.PI * 2, 0, Math.PI / 2), metal);
  dome.position.set(0, 3, 0);
  dome.castShadow = true;
  dome.receiveShadow = true;
  g.add(dome);
  cyl(g, 0.12, 0.12, 1.4, glow, 0, 5.2, 0, 0, 0, 6);
  return prop(g, [6, 6, 6], [collider(0, 0, 4.4, 4.4, 3.6)]);
});

register("snow_station", [10, 4.4, 8, "paint_white", "metal"], (ctx) => {
  const g = new THREE.Group();
  const wall = ctx.mats.get("paint_white");
  const metal = ctx.mats.get("snow_metal");
  const glass = ctx.mats.get("glass");
  const base = ctx.mats.get("snow_dark");
  box(g, 10, 0.5, 8, base, 0, 0.25, 0);
  box(g, 9.4, 3.2, 7.4, wall, 0, 2, 0);
  box(g, 10, 0.35, 8, metal, 0, 3.75, 0);
  box(g, 8, 0.2, 6.4, ctx.mats.get("snow"), 0, 3.98, 0);
  for (const x of [-3, 0, 3]) box(g, 1.6, 1, 0.1, glass, x, 2.3, 3.72);
  box(g, 1.4, 2.2, 0.12, metal, 0, 1.35, 3.75);
  box(g, 1, 1, 0.6, metal, -3.6, 4.2, -2);
  box(g, 1, 1, 0.6, metal, 3.6, 4.2, -2);
  return prop(g, [10, 4.4, 8], [collider(0, 0, 9.4, 7.4, 4.2)]);
});

register("snow_radio_tower", [2.4, 12, 2.4, "snow_metal", "metal"], (ctx) => {
  const g = new THREE.Group();
  const metal = ctx.mats.get("snow_metal");
  const glow = ctx.mats.emissive(0xff3a2a, 2.6);
  const base = 0.9;
  for (const [x, z] of [
    [-1, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
  ]) {
    beam(g, [x * base, 0, z * base], [x * 0.18, 10.6, z * 0.18], 0.06, metal);
  }
  for (const y of [2.4, 5, 7.6]) {
    const s = base - (y / 10.6) * (base - 0.18);
    box(g, s * 2, 0.08, 0.08, metal, 0, y, -s);
    box(g, s * 2, 0.08, 0.08, metal, 0, y, s);
    box(g, 0.08, 0.08, s * 2, metal, -s, y, 0);
    box(g, 0.08, 0.08, s * 2, metal, s, y, 0);
  }
  cyl(g, 0.06, 0.06, 1.6, metal, 0, 11.2, 0, 0, 0, 5);
  sphere(g, 0.14, glow, 0, 12, 0);
  return prop(g, [2.4, 12, 2.4], [collider(0, 0, 1.4, 1.4, 10)]);
});

/* ==================================================================  撤离载具  */

register("extraction_truck", [6.4, 3, 2.8, "paint_white", "metal"], (ctx) => {
  const g = new THREE.Group();
  const body = ctx.mats.get("paint_white");
  const dark = ctx.mats.get("steel_dark");
  const tire = ctx.mats.get("tire");
  const glass = ctx.mats.get("glass");
  const glow = ctx.mats.emissive(0x5affa0, 2.4);
  box(g, 6, 0.5, 2.4, dark, 0, 0.85, 0);
  box(g, 2.2, 1.7, 2.3, body, 1.8, 1.75, 0);
  box(g, 1.7, 0.65, 2.1, glass, 2.05, 2.15, 0);
  box(g, 3.4, 1.5, 2.3, body, -1.3, 1.7, 0);
  box(g, 3.4, 0.18, 2.4, dark, -1.3, 2.5, 0);
  for (const x of [-1.9, 1.9]) {
    for (const z of [-1.2, 1.2]) {
      cyl(g, 0.52, 0.52, 0.34, tire, x, 0.55, z, Math.PI / 2, 0, 12);
    }
  }
  box(g, 0.35, 0.18, 0.35, glow, 1.4, 2.72, 0);
  return prop(g, [6.4, 3, 2.8], [collider(0, 0, 5.8, 2.4, 2.6)]);
});
