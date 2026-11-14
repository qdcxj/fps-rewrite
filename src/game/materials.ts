import type * as THREE from "three";
import { createMaterialSystem } from "./legacy/proceduralMaterials";

export interface DecalAsset {
  material: THREE.Material;
  aspect: number;
}

export interface MaterialSystem {
  get: (name: string, opts?: Record<string, unknown>) => THREE.Material;
  emissive: (color?: number, intensity?: number) => THREE.Material;
  decal: (name: string | string[]) => DecalAsset;
  label: (text: string, opts?: Record<string, unknown>) => DecalAsset;
  number: (value: number) => DecalAsset;
  names: string[];
  decalNames: string[];
  uniforms: { wet: { value: number } };
  update: () => void;
  prewarm: (names?: string[]) => void;
  stats: () => { sets: number; textureMB: number; genMs: number; decalMB: number };
  tileOf: (name: string) => number;
}

let current: MaterialSystem | null = null;
let pending: Promise<MaterialSystem> | null = null;

// R3F 场景实际用到的材质集合（按原版名称）
const CORE_MATERIALS = [
  "asphalt",
  "concrete_dirty",
  "paint_red",
  "paint_blue",
  "paint_green",
  "paint_orange",
  "paint_grey",
  "paint_yellow",
  "steel_rust",
  "steel_galv",
  "steel_dark",
  "steel_worn",
  "corrugated_roof",
  "gunmetal",
  "anodized_black",
  "polymer_black",
  "polymer_tan",
  "hazard_stripes",
  "water_dark",
  "armor_white",
  "glass_dirty",
  "hull_red",
  "hull_paint",
  // 主题关卡材质（启动时预热，避免切换关卡时集中生成纹理与编译着色器）
  "factory_concrete",
  "factory_concrete_dark",
  "factory_brick",
  "factory_floor",
  "factory_steel",
  "factory_rust",
  "factory_roof",
  "factory_hazard",
  "sand",
  "sand_dark",
  "sandstone",
  "desert_metal",
  "desert_rust",
  "desert_roof",
  "desert_hazard",
  "snow",
  "snow_dark",
  "snow_ice",
  "snow_rock",
  "snow_metal",
  "snow_rust",
  "snow_roof",
  "snow_hazard",
  "pine_needle",
];

export function getMaterials(): MaterialSystem | null {
  return current;
}

export function initMaterials(renderer: THREE.WebGLRenderer, tex = 1024): Promise<MaterialSystem> {
  if (current) return Promise.resolve(current);
  if (!pending) {
    pending = (createMaterialSystem({ renderer, quality: { tex }, params: {} }) as Promise<MaterialSystem>)
      .then((system) => {
        // 预生成纹理，避免进入游戏后首帧卡顿（原版同样在启动阶段 prewarm）
        for (const name of CORE_MATERIALS) {
          try {
            system.get(name, { triplanar: true });
          } catch (err) {
            console.warn("[mats] prewarm failed:", name, err);
          }
        }
        current = system;
        return system;
      })
      .catch((err) => {
        pending = null;
        throw err;
      });
  }
  return pending;
}
