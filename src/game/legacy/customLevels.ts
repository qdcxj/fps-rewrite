/**
 * 用原版程序化道具构建器搭建的追加关卡。
 * 布局全部由 PROP_SIZES 中的道具组合而成，碰撞、堆叠与静态合批复用原版关卡构建器。
 */
import * as THREE from "three";
import "./themeAssets";
import { LEGACY_LEVEL_BUILDER, LEGACY_MERGE_STATIC, LEGACY_PROP_MODULE } from "./worldBuilders";

export type CustomLevelId = "steel" | "fuel" | "factory" | "desert" | "snow";

type StackKind = 20 | 40 | "hc";

interface PropPlacement {
  name: string;
  x: number;
  z: number;
  yaw?: number;
  y?: number;
  opts?: Record<string, unknown>;
}

interface StackPlacement {
  x: number;
  z: number;
  yaw?: number;
  layers: [StackKind, string, Record<string, unknown>?][];
  jitter?: number;
}

interface RelayPlacement {
  x: number;
  z: number;
  yaw?: number;
  label: string;
}

/** ez-tree 程序化树木（雪松 / 枯树） */
interface TreePlacement {
  /** ez-tree 预设名，如 "Pine Small" */
  preset: string;
  x: number;
  z: number;
  yaw?: number;
  /** 相对预设原始尺寸的缩放 */
  scale: number;
  seed?: number;
  /** 无叶枯树 */
  bare?: boolean;
  barkTint?: number;
  leafTint?: number;
}

interface MapLayout {
  playerStart: { pos: [number, number, number]; yaw: number };
  relays: RelayPlacement[];
  props: PropPlacement[];
  stacks: StackPlacement[];
  trees?: TreePlacement[];
  enemyGround: [number, number][];
  enemyAir: [number, number, number][];
  /** 撤离点（默认码头泊位） */
  extraction?: { x: number; z: number; radius?: number };
  /** 不可见边界，避免玩家走出新关卡 */
  bounds?: [number, number, number, number];
  /** 物理地面材质 */
  surface?: string;
}

const STEEL: MapLayout = {
  playerStart: { pos: [-33, 0, 6], yaw: -Math.PI / 2 },
  relays: [
    { x: -19.5, z: -5.5, yaw: 0.4, label: "中继 A · 钢材堆场" },
    { x: 5, z: -4, yaw: -0.3, label: "中继 B · 中央通道" },
    { x: 20, z: 4, yaw: 0.2, label: "中继 C · 码头侧线" },
  ],
  stacks: [
    { x: -24, z: -24, layers: [[20, "green"], [20, "grey"]] },
    { x: -24, z: -16, layers: [[20, "white"], [20, "blue"]] },
    { x: -24, z: -8, layers: [[20, "orange"]] },
    { x: -12, z: -24, layers: [["hc", "blue"], [20, "grey"]] },
    { x: -12, z: -14, layers: [[40, "red"], [20, "green"]] },
    { x: 1, z: -24, layers: [[20, "grey"], [20, "white"]] },
    { x: 1, z: -14, layers: [["hc", "teal"], [20, "blue"]] },
    { x: 13, z: -24, layers: [[20, "blue"], [20, "red"], [20, "yellow"]] },
    { x: 15, z: -13, layers: [[40, "orange"], [20, "green"]] },
    { x: -24, z: 14, layers: [[20, "white"], [20, "green"]] },
    { x: -24, z: 22, layers: [[20, "blue"]] },
    { x: -12, z: 16, layers: [[40, "teal"], [20, "grey"]] },
    { x: 1, z: 12, layers: [[20, "orange"], [20, "white"]] },
    { x: 1, z: 22, layers: [["hc", "blue"], [20, "red"]] },
    { x: 13, z: 14, layers: [[20, "grey"], [20, "blue"]] },
    { x: 13, z: 23, layers: [[20, "red"], [20, "green"]] },
    { x: 22, z: 8, layers: [[20, "yellow"]] },
  ],
  props: [
    { name: "pipe_stack", x: -14, z: -4, yaw: 0 },
    { name: "pipe_stack", x: 10, z: 2, yaw: Math.PI / 2 },
    { name: "pipe_stack", x: -30, z: 16, yaw: 0 },
    { name: "cable_reel", x: -18, z: 3, yaw: 0.2 },
    { name: "cable_reel", x: 14, z: -2, yaw: -0.3 },
    { name: "cable_reel", x: 24, z: -16, yaw: 0.5 },
    { name: "shelf_rack", x: -31, z: -2, yaw: Math.PI / 2 },
    { name: "shelf_rack", x: 8, z: 8, yaw: 0 },
    { name: "forklift", x: -3, z: 6, yaw: 0.4 },
    { name: "generator", x: -28, z: 8, yaw: 0.1 },
    { name: "dumpster", x: 17, z: -4, yaw: 0.15 },
    { name: "toolbox_cart", x: -2, z: -5, yaw: 0.6 },
    { name: "crate_stack", x: -16, z: 20, yaw: 0.2 },
    { name: "crate_stack", x: 9.5, z: 25, yaw: -0.25 },
    { name: "pallet_stack", x: -4, z: 18, yaw: 0.1 },
    { name: "pallet_stack", x: 16, z: 18, yaw: 0.6 },
    { name: "ibc_tote", x: -26, z: -5, yaw: 0 },
    { name: "barrel", x: -9, z: 7, yaw: 0 },
    { name: "barrel", x: -8.4, z: 8.2, yaw: 0 },
    { name: "barrel", x: 14, z: 19, yaw: 0 },
    { name: "tarp_cargo", x: 20, z: 14, yaw: 0.2 },
    { name: "jersey_barrier", x: -17.5, z: -6.5, yaw: 0.8 },
    { name: "jersey_barrier", x: -21.5, z: -4, yaw: -0.4 },
    { name: "traffic_cone", x: -20, z: -7.5, yaw: 0 },
    { name: "traffic_cone", x: 6, z: -6, yaw: 0 },
    { name: "traffic_cone", x: 21, z: 2, yaw: 0 },
    { name: "sign_post", x: -30, z: 2, yaw: Math.PI / 2 },
    { name: "sign_post", x: 18, z: 6, yaw: Math.PI / 2 },
    { name: "floodlight_stand", x: 0, z: 19, yaw: 0 },
    { name: "floodlight_stand", x: 24, z: -6, yaw: 0 },
    { name: "light_mast", x: -30, z: -26, yaw: 0 },
    { name: "light_mast", x: -30, z: 26, yaw: 0 },
    { name: "light_mast", x: 16, z: -27, yaw: 0 },
    { name: "light_mast", x: 16, z: 27, yaw: 0 },
    { name: "fence_panel", x: -33, z: -12, yaw: Math.PI / 2 },
    { name: "fence_panel", x: -33, z: -9, yaw: Math.PI / 2 },
    { name: "sandbags", x: 24, z: 22, yaw: 0.2 },
    { name: "cardboard_boxes", x: 18, z: -12, yaw: 0.3 },
    { name: "tire_stack", x: -8.5, z: -20, yaw: 0 },
    { name: "gas_cylinders", x: 16, z: 20, yaw: 0.1 },
  ],
  enemyGround: [
    [-30, -4],
    [-20, 10],
    [-6, -20],
    [6, 4],
    [16, -20],
    [23, 12],
    [-8, 24],
    [10, 20],
  ],
  enemyAir: [
    [-18, 9, -18],
    [4, 10, 16],
    [22, 9, -8],
    [-8, 11, 2],
    [12, 12, 22],
  ],
};

const FUEL: MapLayout = {
  playerStart: { pos: [20, 0, -25], yaw: 0 },
  relays: [
    { x: -12, z: -20, yaw: 0.3, label: "中继 A · 油料北场" },
    { x: 0, z: 6, yaw: -0.4, label: "中继 B · 隔离墙" },
    { x: 14, z: 18, yaw: 0.1, label: "中继 C · 码头油泵区" },
  ],
  stacks: [
    { x: -20, z: -24, layers: [[20, "grey"]] },
    { x: -20, z: 14, layers: [[20, "red"], [20, "white"]] },
    { x: 22, z: 6, layers: [[20, "yellow"]] },
    { x: -16, z: 22, layers: [["hc", "teal"]] },
    { x: 6, z: 24, layers: [[20, "blue"], [20, "grey"]] },
    { x: 18, z: 24, layers: [[20, "green"]] },
    { x: -4, z: 18, layers: [[20, "orange"]] },
    { x: 10, z: 14, layers: [[20, "white"]] },
  ],
  props: [
    // 油桶阵列
    { name: "barrel", x: 0, z: -20, yaw: 0 },
    { name: "barrel", x: 0, z: -18.2, yaw: 0.4 },
    { name: "barrel", x: 1.8, z: -20, yaw: 0.8 },
    { name: "barrel", x: 1.8, z: -18.2, yaw: 0.2 },
    { name: "barrel", x: -4, z: -14, yaw: 0 },
    { name: "barrel", x: -2.2, z: -14, yaw: 0.5 },
    { name: "barrel", x: -4, z: -12.2, yaw: 0.9 },
    { name: "barrel", x: -2.2, z: -12.2, yaw: 0.1 },
    { name: "barrel", x: 4, z: -10, yaw: 0 },
    { name: "barrel", x: 5.8, z: -10, yaw: 0.6 },
    { name: "barrel", x: 4, z: -8.2, yaw: 0.3 },
    { name: "barrel", x: 5.8, z: -8.2, yaw: 0.7 },
    { name: "barrel", x: 10, z: -18, yaw: 0 },
    { name: "barrel", x: 11.8, z: -18, yaw: 0.4 },
    { name: "barrel", x: 10, z: -16.2, yaw: 0.8 },
    { name: "barrel", x: -10, z: -6, yaw: 0 },
    { name: "barrel", x: -8.2, z: -6, yaw: 0.3 },
    { name: "barrel", x: -10, z: -4.2, yaw: 0.6 },
    { name: "barrel", x: 0, z: -6, yaw: 0.2 },
    { name: "barrel", x: 8, z: 2, yaw: 0 },
    { name: "barrel", x: 8.8, z: 2.6, yaw: 0.5 },
    // 吨桶与气瓶
    { name: "ibc_tote", x: 2.2, z: -15.6, yaw: 0.1 },
    { name: "ibc_tote", x: 8, z: -13, yaw: -0.2 },
    { name: "gas_cylinders", x: 12, z: -14, yaw: 0.1 },
    { name: "gas_cylinders", x: 13, z: -14.8, yaw: -0.1 },
    { name: "gas_cylinders", x: -6, z: -20, yaw: 0 },
    { name: "gas_cylinders", x: 6, z: -22, yaw: 0.3 },
    // 机具与杂物
    { name: "generator", x: 14, z: -8, yaw: 0.05 },
    { name: "dumpster", x: 16, z: -4, yaw: 0.1 },
    { name: "toolbox_cart", x: 12, z: -4, yaw: -0.3 },
    { name: "tire_stack", x: 18, z: -14, yaw: 0 },
    { name: "tarp_cargo", x: -14, z: -10, yaw: 0.2 },
    { name: "sandbags", x: -16, z: -4, yaw: -0.1 },
    { name: "cardboard_boxes", x: -10, z: -24, yaw: 0.2 },
    { name: "floodlight_stand", x: 0, z: -24, yaw: 0 },
    { name: "floodlight_stand", x: 10, z: -6, yaw: 0.2 },
    { name: "floodlight_stand", x: -8, z: 6, yaw: 0 },
    { name: "floodlight_stand", x: 14, z: 12, yaw: 0 },
    // 隔离墙与护栏
    { name: "jersey_barrier", x: -8, z: -2, yaw: 0 },
    { name: "jersey_barrier", x: -5, z: -2, yaw: 0 },
    { name: "jersey_barrier", x: 2, z: -2, yaw: 0 },
    { name: "jersey_barrier", x: 5, z: -2, yaw: 0 },
    { name: "jersey_barrier", x: 12, z: 18, yaw: Math.PI / 2 },
    { name: "jersey_barrier", x: 16, z: 20, yaw: 0.3 },
    // 管线与堆场
    { name: "pipe_stack", x: -18, z: 4, yaw: 0 },
    { name: "cable_reel", x: 8, z: -20, yaw: 0.4 },
    { name: "cable_reel", x: -14, z: -16, yaw: -0.2 },
    { name: "shelf_rack", x: -22, z: -4, yaw: Math.PI / 2 },
    { name: "forklift", x: -2, z: -6, yaw: -0.4 },
    { name: "pallet_stack", x: 12, z: -22, yaw: 0.1 },
    { name: "pallet_stack", x: 16, z: 10, yaw: 0.5 },
    { name: "pallet_stack", x: -6, z: 12, yaw: 0.2 },
    { name: "crate_stack", x: 6, z: -16, yaw: -0.2 },
    { name: "crate_stack", x: -12, z: 10, yaw: 0.2 },
    { name: "traffic_cone", x: 19, z: -20, yaw: 0 },
    { name: "traffic_cone", x: -2, z: -10, yaw: 0 },
    { name: "traffic_cone", x: 12, z: 4, yaw: 0 },
    { name: "traffic_cone", x: 22, z: 14, yaw: 0 },
    { name: "sign_post", x: -14, z: -24, yaw: 0 },
    { name: "sign_post", x: 10, z: 8, yaw: Math.PI / 2 },
    { name: "light_mast", x: -26, z: -26, yaw: 0 },
    { name: "light_mast", x: -26, z: 26, yaw: 0 },
    { name: "light_mast", x: 16, z: -26, yaw: 0 },
    { name: "light_mast", x: 16, z: 26, yaw: 0 },
    { name: "fence_panel", x: -26, z: 0, yaw: Math.PI / 2 },
    { name: "sandbags", x: 12, z: 16, yaw: 0.2 },
    { name: "tire_stack", x: 20, z: 16, yaw: 0 },
  ],
  enemyGround: [
    [-22, -12],
    [-8, 0],
    [7, -18],
    [14, -10],
    [8, 10],
    [-10, 18],
    [18, 2],
    [20, -2],
  ],
  enemyAir: [
    [-14, 9, -12],
    [4, 10, 10],
    [20, 9, -16],
    [-4, 11, 20],
    [12, 12, -4],
  ],
};

const FACTORY: MapLayout = {
  playerStart: { pos: [0, 0, 22], yaw: 0 },
  relays: [
    { x: -14, z: -6, yaw: 0.2, label: "中继 A · 熔炉车间" },
    { x: 2, z: -20, yaw: -0.3, label: "中继 B · 装配线" },
    { x: 18, z: 6, yaw: 0.1, label: "中继 C · 管廊" },
  ],
  bounds: [-33, 30, -30, 27],
  surface: "concrete",
  extraction: { x: 26, z: 22, radius: 2.6 },
  stacks: [
    { x: 10, z: 14, layers: [[20, "grey"], [20, "red"]] },
    { x: -20, z: 18, layers: [[20, "green"]] },
    { x: 20, z: 16, layers: [[20, "orange"], [20, "grey"]] },
    { x: -24, z: -20, layers: [["hc", "blue"]] },
    { x: 22, z: -18, layers: [[20, "white"]] },
  ],
  props: [
    // 围墙
    { name: "factory_wall", x: -28, z: -28, yaw: 0 },
    { name: "factory_wall", x: -20, z: -28, yaw: 0 },
    { name: "factory_wall", x: -12, z: -28, yaw: 0 },
    { name: "factory_wall", x: -4, z: -28, yaw: 0 },
    { name: "factory_wall", x: 4, z: -28, yaw: 0 },
    { name: "factory_wall", x: 12, z: -28, yaw: 0 },
    { name: "factory_wall", x: 20, z: -28, yaw: 0 },
    { name: "factory_wall", x: -28, z: 26, yaw: 0 },
    { name: "factory_wall", x: -20, z: 26, yaw: 0 },
    { name: "factory_wall", x: -12, z: 26, yaw: 0 },
    { name: "factory_wall", x: -4, z: 26, yaw: 0 },
    { name: "factory_wall", x: 4, z: 26, yaw: 0 },
    { name: "factory_wall", x: 12, z: 26, yaw: 0 },
    { name: "factory_wall", x: -33, z: -24, yaw: Math.PI / 2 },
    { name: "factory_wall", x: -33, z: -16, yaw: Math.PI / 2 },
    { name: "factory_wall", x: -33, z: -8, yaw: Math.PI / 2 },
    { name: "factory_wall", x: -33, z: 0, yaw: Math.PI / 2 },
    { name: "factory_wall", x: -33, z: 8, yaw: Math.PI / 2 },
    { name: "factory_wall", x: -33, z: 16, yaw: Math.PI / 2 },
    { name: "factory_wall", x: 31, z: -24, yaw: Math.PI / 2 },
    { name: "factory_wall", x: 31, z: -16, yaw: Math.PI / 2 },
    { name: "factory_wall", x: 31, z: -8, yaw: Math.PI / 2 },
    { name: "factory_wall", x: 31, z: 0, yaw: Math.PI / 2 },
    { name: "factory_wall", x: 31, z: 8, yaw: Math.PI / 2 },
    { name: "factory_wall", x: 31, z: 16, yaw: Math.PI / 2 },
    // 熔炉车间
    { name: "factory_furnace", x: -14, z: -12, yaw: 0 },
    { name: "factory_wall", x: -22, z: -19, yaw: 0 },
    { name: "factory_wall", x: -14, z: -19, yaw: 0 },
    { name: "factory_wall", x: -6, z: -19, yaw: 0 },
    { name: "factory_wall", x: -25, z: -14, yaw: Math.PI / 2 },
    { name: "factory_wall", x: -25, z: -6, yaw: Math.PI / 2 },
    { name: "factory_wall", x: -3, z: -14, yaw: Math.PI / 2 },
    { name: "factory_wall", x: -3, z: -6, yaw: Math.PI / 2 },
    { name: "factory_smokestack", x: -29, z: -25, yaw: 0 },
    { name: "factory_smokestack", x: 24, z: -27, yaw: 0 },
    { name: "factory_pipe_rack", x: -2, z: -9, yaw: 0 },
    { name: "factory_pipe_rack", x: 11, z: -2, yaw: Math.PI / 2 },
    { name: "factory_pipe_rack", x: 14, z: -19, yaw: 0 },
    { name: "factory_tank", x: -28, z: 6, yaw: 0 },
    { name: "factory_tank", x: -28, z: 14, yaw: 0 },
    { name: "factory_machine", x: 4, z: -16, yaw: 0.15 },
    { name: "factory_machine", x: 9, z: -13.5, yaw: -0.1 },
    { name: "factory_rubble", x: -7, z: 3, yaw: 0.4 },
    { name: "factory_rubble", x: 22, z: -6, yaw: 1.1 },
    { name: "factory_rubble", x: -18, z: 4, yaw: -0.3 },
    { name: "factory_rubble", x: 8, z: 8, yaw: 0.8 },
    { name: "extraction_truck", x: 25, z: 19, yaw: 0 },
    // 杂物与掩体
    { name: "barrel", x: -20, z: -2, yaw: 0, opts: { color: "red" } },
    { name: "barrel", x: -19.2, z: -1.2, yaw: 0.3 },
    { name: "barrel", x: 2, z: -14, yaw: 0 },
    { name: "crate_stack", x: -9, z: 12, yaw: 0.2 },
    { name: "pallet_stack", x: 16, z: 2, yaw: 0.4 },
    { name: "generator", x: 6, z: 2, yaw: 0.1 },
    { name: "shelf_rack", x: -30, z: -2, yaw: Math.PI / 2 },
    { name: "forklift", x: 16, z: 12, yaw: -0.4 },
    { name: "dumpster", x: -6, z: 18, yaw: 0.2 },
    { name: "pipe_stack", x: 18, z: -10, yaw: 0.1 },
    { name: "sandbags", x: 0, z: -8, yaw: 0 },
    { name: "floodlight_stand", x: 10, z: -6, yaw: 0 },
    { name: "cable_reel", x: -22, z: 10, yaw: 0.5 },
    { name: "traffic_cone", x: 14, z: 6, yaw: 0 },
  ],
  enemyGround: [
    [-26, -10],
    [-10, 2],
    [4, -6],
    [14, -14],
    [20, 4],
    [-2, 16],
    [12, 18],
    [24, 8],
  ],
  enemyAir: [
    [-18, 9, -18],
    [2, 10, 12],
    [20, 10, -8],
    [-6, 11, -2],
    [10, 12, 20],
  ],
};

const DESERT: MapLayout = {
  playerStart: { pos: [-24, 0, 22], yaw: -0.85 },
  relays: [
    { x: -16, z: -6, yaw: 0.2, label: "中继 A · 废弃油井" },
    { x: 8, z: -15, yaw: -0.2, label: "中继 B · 货运列车" },
    { x: 18, z: 8, yaw: 0.1, label: "中继 C · 砂岩拱门" },
  ],
  bounds: [-34, 28, -30, 26],
  surface: "sand",
  extraction: { x: 26, z: 22, radius: 2.6 },
  stacks: [
    { x: 2, z: 6, layers: [[20, "yellow"]] },
    { x: -20, z: -20, layers: [[20, "red"], [20, "white"]] },
    { x: 22, z: 16, layers: [[20, "blue"]] },
  ],
  trees: [
    { preset: "Oak Small", x: -20, z: 2, yaw: 0.2, scale: 0.2, seed: 3101, bare: true, barkTint: 0x9c7a55 },
    { preset: "Ash Small", x: 6, z: -8, yaw: -0.4, scale: 0.2, seed: 3102, bare: true, barkTint: 0x8f6f4c },
    { preset: "Oak Small", x: 24, z: -22, yaw: 0.7, scale: 0.22, seed: 3103, bare: true, barkTint: 0xa5825c },
    { preset: "Ash Small", x: -10, z: -26, yaw: 1.1, scale: 0.22, seed: 3104, bare: true, barkTint: 0x94724f },
    { preset: "Ash Small", x: 0, z: 14, yaw: 0.3, scale: 0.18, seed: 3105, bare: true, barkTint: 0xa5825c },
  ],
  props: [
    // 远景沙丘
    { name: "desert_dune", x: -34, z: -24, yaw: 0.3 },
    { name: "desert_dune", x: 30, z: -26, yaw: -0.4 },
    { name: "desert_dune", x: -34, z: 10, yaw: 0.8 },
    { name: "desert_dune", x: 32, z: 14, yaw: -0.2 },
    { name: "desert_dune", x: 2, z: -32, yaw: 0.1 },
    { name: "desert_dune", x: 10, z: 30, yaw: 0.5 },
    // 岩层与地标
    { name: "desert_arch", x: 18, z: 4, yaw: 0.08 },
    { name: "desert_rock", x: -28, z: -18, yaw: 0.4 },
    { name: "desert_rock", x: 22, z: -12, yaw: -0.2 },
    { name: "desert_rock", x: -26, z: 8, yaw: 1.2 },
    { name: "desert_rock", x: 12, z: 2, yaw: 0.7 },
    { name: "desert_rock", x: -12, z: 18, yaw: -0.5 },
    { name: "desert_rock", x: 6, z: -2, yaw: 0.2 },
    { name: "desert_derrick", x: -16, z: -10, yaw: 0.1 },
    { name: "desert_train_car", x: 8, z: -18, yaw: 0.16 },
    { name: "desert_tent", x: -24, z: 14, yaw: 0.3 },
    { name: "desert_water_tower", x: 22, z: -24, yaw: 0 },
    { name: "extraction_truck", x: 25, z: 19, yaw: 0 },
    // 补给与掩体
    { name: "barrel", x: -18, z: 16, yaw: 0 },
    { name: "barrel", x: -17.2, z: 16.6, yaw: 0.4 },
    { name: "barrel", x: 12, z: 10, yaw: 0.2 },
    { name: "crate_stack", x: -12, z: 18, yaw: 0.3 },
    { name: "pallet_stack", x: 14, z: -6, yaw: 0.1 },
    { name: "sandbags", x: -6, z: -12, yaw: 0.4 },
    { name: "tarp_cargo", x: 20, z: -2, yaw: 0.2 },
    { name: "jerry_can", x: -22, z: 12, yaw: 0 },
    { name: "cable_reel", x: -8, z: 8, yaw: 0.3 },
    { name: "tire_stack", x: 18, z: 14, yaw: 0 },
    { name: "pipe_stack", x: -24, z: -4, yaw: 0.2 },
    { name: "generator", x: 4, z: -24, yaw: 0.1 },
    { name: "dumpster", x: 24, z: 10, yaw: 0.2 },
    { name: "traffic_cone", x: 8, z: 20, yaw: 0 },
  ],
  enemyGround: [
    [-24, -8],
    [-12, 6],
    [0, -6],
    [12, -12],
    [22, 2],
    [2, 16],
    [16, 18],
    [-18, 20],
  ],
  enemyAir: [
    [-16, 9, -20],
    [4, 10, 8],
    [20, 10, -10],
    [-8, 11, -2],
    [10, 12, 18],
  ],
};

const SNOW: MapLayout = {
  playerStart: { pos: [0, 0, 22], yaw: 0 },
  relays: [
    { x: -16, z: -8, yaw: 0.2, label: "中继 A · 科考站西侧" },
    { x: 14, z: -14, yaw: -0.2, label: "中继 B · 雷达阵列" },
    { x: 20, z: 6, yaw: 0.1, label: "中继 C · 冰脊" },
  ],
  bounds: [-34, 28, -30, 26],
  surface: "snow",
  extraction: { x: 26, z: 22, radius: 2.6 },
  stacks: [
    { x: -20, z: 12, layers: [[20, "white"], [20, "blue"]] },
    { x: 18, z: 18, layers: [[20, "grey"]] },
    { x: -24, z: -12, layers: [[20, "white"]] },
  ],
  trees: [
    { preset: "Pine Small", x: -32, z: -26, yaw: 0, scale: 0.26, seed: 5201, leafTint: 0xdfeee4 },
    { preset: "Pine Small", x: -24, z: -28, yaw: 0.4, scale: 0.22, seed: 5202 },
    { preset: "Pine Small", x: -34, z: -4, yaw: 0.2, scale: 0.28, seed: 5203, leafTint: 0xdfeee4 },
    { preset: "Pine Small", x: -32, z: 10, yaw: -0.3, scale: 0.24, seed: 5204 },
    { preset: "Pine Small", x: 32, z: -22, yaw: 0.5, scale: 0.29, seed: 5205, leafTint: 0xdfeee4 },
    { preset: "Pine Small", x: 32, z: -6, yaw: 0.1, scale: 0.22, seed: 5206 },
    { preset: "Pine Small", x: 30, z: 18, yaw: -0.2, scale: 0.25, seed: 5207, leafTint: 0xdfeee4 },
    { preset: "Pine Small", x: -20, z: 26, yaw: 0.3, scale: 0.24, seed: 5208 },
    { preset: "Pine Small", x: 8, z: 26, yaw: -0.4, scale: 0.26, seed: 5209, leafTint: 0xdfeee4 },
    { preset: "Pine Small", x: -6, z: 24, yaw: 0.2, scale: 0.21, seed: 5210 },
    { preset: "Pine Small", x: -28, z: 20, yaw: 0.6, scale: 0.23, seed: 5211, leafTint: 0xdfeee4 },
    { preset: "Pine Small", x: -14, z: 28, yaw: -0.2, scale: 0.2, seed: 5212 },
    { preset: "Pine Small", x: 22, z: 28, yaw: 0.35, scale: 0.25, seed: 5213, leafTint: 0xdfeee4 },
    { preset: "Pine Small", x: 36, z: 4, yaw: -0.5, scale: 0.27, seed: 5214 },
    // 场内雪松林，给出生点正前方形成林线
    { preset: "Pine Small", x: -16, z: 8, yaw: 0.25, scale: 0.28, seed: 5215, leafTint: 0xdfeee4 },
    { preset: "Pine Small", x: 10, z: 16, yaw: -0.35, scale: 0.24, seed: 5216 },
    { preset: "Pine Small", x: -24, z: -6, yaw: 0.5, scale: 0.3, seed: 5217, leafTint: 0xdfeee4 },
    { preset: "Pine Small", x: 26, z: -12, yaw: -0.15, scale: 0.26, seed: 5218 },
    { preset: "Pine Small", x: 4, z: -2, yaw: 0.7, scale: 0.22, seed: 5219, leafTint: 0xdfeee4 },
    { preset: "Pine Small", x: -8, z: 20, yaw: -0.4, scale: 0.27, seed: 5220 },
  ],
  props: [
    { name: "snow_station", x: -8, z: -16, yaw: 0 },
    { name: "snow_radar", x: 14, z: -18, yaw: 0.2 },
    { name: "snow_radio_tower", x: -26, z: -22, yaw: 0 },
    { name: "snow_ice_ridge", x: -28, z: 4, yaw: 0.3 },
    { name: "snow_ice_ridge", x: 24, z: -2, yaw: -0.4 },
    { name: "snow_ice_ridge", x: 6, z: 12, yaw: 0.8 },
    { name: "snow_ice_ridge", x: -4, z: -26, yaw: 0 },
    { name: "snow_ice_ridge", x: 20, z: 24, yaw: 0.2 },
    { name: "snow_drift", x: -12, z: -4, yaw: 0.1 },
    { name: "snow_drift", x: 12, z: 8, yaw: -0.2 },
    { name: "snow_drift", x: -22, z: -12, yaw: 0.4 },
    { name: "snow_drift", x: 2, z: 2, yaw: 0.2 },
    { name: "snow_drift", x: 18, z: 14, yaw: 0.3 },
    { name: "snow_drift", x: -2, z: 18, yaw: 0.1 },
    { name: "extraction_truck", x: 25, z: 19, yaw: 0 },
    { name: "barrel", x: -14, z: -10, yaw: 0 },
    { name: "barrel", x: -13.2, z: -10.8, yaw: 0.3 },
    { name: "crate_stack", x: 2, z: -10, yaw: 0.2 },
    { name: "pallet_stack", x: 10, z: 2, yaw: 0.4 },
    { name: "generator", x: -16, z: 0, yaw: 0.1 },
    { name: "shelf_rack", x: 24, z: 12, yaw: Math.PI / 2 },
    { name: "dumpster", x: 4, z: -4, yaw: 0.2 },
    { name: "pipe_stack", x: -26, z: 18, yaw: 0.2 },
    { name: "sandbags", x: 12, z: -4, yaw: 0 },
    { name: "cable_reel", x: -2, z: 8, yaw: 0.3 },
  ],
  enemyGround: [
    [-24, -10],
    [-10, -2],
    [4, -14],
    [16, -6],
    [22, 4],
    [-2, 14],
    [12, 18],
    [-18, 20],
  ],
  enemyAir: [
    [-18, 9, -20],
    [2, 10, 10],
    [20, 10, -8],
    [-6, 11, -4],
    [10, 12, 20],
  ],
};

const LAYOUTS: Record<CustomLevelId, MapLayout> = {
  steel: STEEL,
  fuel: FUEL,
  factory: FACTORY,
  desert: DESERT,
  snow: SNOW,
};

interface BuilderApi {
  staticRoot: THREE.Group;
  dynRoot: THREE.Group;
  updaters: ((dt: number) => void)[];
  placed: { name: string; x: number; y: number; z: number; yaw: number }[];
  place: (
    name: string,
    x: number,
    z: number,
    yaw?: number,
    opts?: Record<string, unknown>,
    y?: number,
  ) => THREE.Group;
  stack: (
    x: number,
    z: number,
    layers: [StackKind, string, Record<string, unknown>?][],
    yaw?: number,
    jitter?: number,
  ) => { top: number; objs: THREE.Object3D[] };
}

/**
 * 构建追加关卡：道具放置 → 顶点色材质升级 → 阴影设置 → noMerge 节点拆分 → 静态合批。
 * 与 LEGACY_LEVEL_MODULE 的 create 采用同一套处理顺序，保证碰撞与动态中继行为一致。
 */
export async function buildCustomLevel(
  ctx: Record<string, unknown>,
  levelId: CustomLevelId,
): Promise<Record<string, unknown>> {
  const layout = LAYOUTS[levelId];
  const createBuilder = LEGACY_LEVEL_BUILDER as unknown as (context: Record<string, unknown>) => BuilderApi;
  const mergeStatic = LEGACY_MERGE_STATIC as unknown as (root: THREE.Object3D) => THREE.Group;
  const builder = createBuilder(ctx);

  let seed = 100;
  for (const prop of layout.props) {
    builder.place(prop.name, prop.x, prop.z, prop.yaw ?? 0, { seed: seed++, ...(prop.opts ?? {}) }, prop.y ?? 0);
  }
  const stackTops: { x: number; z: number; yaw: number; top: number; kind: StackKind }[] = [];
  for (const stack of layout.stacks) {
    const result = builder.stack(stack.x, stack.z, stack.layers, stack.yaw ?? 0, stack.jitter ?? 1);
    stackTops.push({
      x: stack.x,
      z: stack.z,
      yaw: stack.yaw ?? 0,
      top: result.top,
      kind: stack.layers[stack.layers.length - 1][0],
    });
  }

  // 雪地：集装箱顶部积雪，避免整片堆场像刚清洗过的彩色盒子
  if (levelId === "snow") {
    const snowMaterial = (ctx.mats as { get: (name: string) => THREE.Material }).get("snow");
    const capLength: Record<StackKind, number> = { 20: 6.06, 40: 12.19, hc: 12.19 };
    for (const item of stackTops) {
      // 双层雪帽：下层宽、上层窄，形成圆润的积雪堆积轮廓
      const holder = new THREE.Group();
      holder.position.set(item.x, item.top, item.z);
      holder.rotation.y = item.yaw;
      const lower = new THREE.Mesh(
        new THREE.BoxGeometry(capLength[item.kind] * 0.96, 0.07, 2.34),
        snowMaterial,
      );
      lower.position.y = 0.035;
      const upper = new THREE.Mesh(
        new THREE.BoxGeometry(capLength[item.kind] * 0.76, 0.07, 1.85),
        snowMaterial,
      );
      upper.position.y = 0.105;
      lower.castShadow = upper.castShadow = true;
      lower.receiveShadow = upper.receiveShadow = true;
      holder.add(lower, upper);
      builder.staticRoot.add(holder);
    }

    // 通用道具积雪：盒状道具双层雪帽、曲面道具圆顶雪堆。
    // 尺寸来自 PROP_SIZES（与原版道具构建器同一张表）。
    const propSizes = LEGACY_PROP_MODULE as unknown as {
      PROP_SIZES: Record<string, [number, number, number, string, string]>;
    };
    const sizes = propSizes.PROP_SIZES;
    const capBoxProps = new Set([
      "crate_stack",
      "pallet_stack",
      "generator",
      "dumpster",
      "shelf_rack",
      "pipe_stack",
      "extraction_truck",
    ]);
    const blobProps = new Set(["barrel", "sandbags", "cable_reel"]);
    for (const item of builder.placed) {
      const size = sizes[item.name];
      if (!size) continue;
      const [w, h, d] = size;
      const baseY = item.y ?? 0;
      if (capBoxProps.has(item.name)) {
        const holder = new THREE.Group();
        holder.position.set(item.x, baseY, item.z);
        holder.rotation.y = item.yaw ?? 0;
        const lower = new THREE.Mesh(new THREE.BoxGeometry(w * 0.96, 0.06, d * 0.96), snowMaterial);
        lower.position.y = h + 0.03;
        const upper = new THREE.Mesh(new THREE.BoxGeometry(w * 0.76, 0.06, d * 0.76), snowMaterial);
        upper.position.y = h + 0.09;
        lower.castShadow = upper.castShadow = true;
        lower.receiveShadow = upper.receiveShadow = true;
        holder.add(lower, upper);
        builder.staticRoot.add(holder);
      } else if (blobProps.has(item.name)) {
        // 圆顶雪堆：比道具本体略宽，模拟积雪披挂过边缘的形态
        const blob = new THREE.Mesh(
          new THREE.SphereGeometry(Math.max(w, d) * 0.82, 14, 9),
          snowMaterial,
        );
        blob.scale.set(1.25, 0.5, 1);
        blob.position.set(item.x, baseY + h + 0.01, item.z);
        blob.rotation.y = item.yaw ?? 0;
        blob.castShadow = true;
        blob.receiveShadow = true;
        builder.staticRoot.add(blob);
      }
    }
  }

  const relayObjects = layout.relays.map((relay, index) =>
    builder.place("relay_node", relay.x, relay.z, relay.yaw ?? 0, { seed: index + 1 }, 0),
  );

  // 新关卡边界：不可见碰撞墙，防止越过关卡范围
  if (layout.bounds) {
    const [minX, maxX, minZ, maxZ] = layout.bounds;
    const physics = ctx.physics as {
      addBox: (min: [number, number, number], max: [number, number, number], opts?: Record<string, unknown>) => unknown;
    };
    const H = 14;
    const surface = layout.surface ?? "concrete";
    physics.addBox([minX - 0.6, 0, minZ - 0.6], [minX, H, maxZ + 0.6], { surface });
    physics.addBox([maxX, 0, minZ - 0.6], [maxX + 0.6, H, maxZ + 0.6], { surface });
    physics.addBox([minX - 0.6, 0, minZ - 0.6], [maxX + 0.6, H, minZ], { surface });
    physics.addBox([minX - 0.6, 0, maxZ], [maxX + 0.6, H, maxZ + 0.6], { surface });
  }

  // ez-tree 程序化树木：雪松 / 枯树。按需加载，避免影响其它关卡的首屏体积
  const treeLeafMaterials: THREE.Material[] = [];
  if (layout.trees?.length) {
    const { Tree, TreePreset } = await import("@dgreenheck/ez-tree");
    const presets = TreePreset as unknown as Record<string, Record<string, any>>;
    const physics = ctx.physics as {
      addBox: (min: [number, number, number], max: [number, number, number], opts?: Record<string, unknown>) => unknown;
    };
    for (const spec of layout.trees) {
      const presetJson = presets[spec.preset];
      if (!presetJson) continue;
      const json = structuredClone(presetJson);
      if (spec.seed !== undefined) json.seed = spec.seed;
      if (spec.bare) json.leaves.count = 0;
      if (spec.barkTint !== undefined) json.bark.tint = spec.barkTint;
      if (spec.leafTint !== undefined) json.leaves.tint = spec.leafTint;

      const tree = new Tree();
      tree.loadFromJson(json as unknown as Parameters<typeof tree.loadFromJson>[0]);
      tree.scale.setScalar(spec.scale);
      tree.position.set(spec.x, 0, spec.z);
      tree.rotation.y = spec.yaw ?? 0;
      tree.updateMatrixWorld(true);
      builder.staticRoot.add(tree);
      if (!spec.bare) treeLeafMaterials.push(tree.leavesMesh.material as THREE.Material);

      // 树干碰撞（树冠不挡子弹/走位）
      const half = 0.28;
      physics.addBox(
        [spec.x - half, 0, spec.z - half],
        [spec.x + half, Math.max(2.4, spec.scale * 32), spec.z + half],
        { surface: "wood" },
      );
    }
  }

  // 与原版关卡相同的顶点色材质升级：集装箱等涂装依赖顶点色材质变体
  builder.staticRoot.updateMatrixWorld(true);
  const mats = ctx.mats as {
    names?: string[];
    get: (name: string, opts?: Record<string, unknown>) => THREE.Material;
  };
  const usedMaterials = new Set<THREE.Material>();
  builder.staticRoot.traverse((child) => {
    const mesh = child as THREE.Mesh;
    if (mesh.isMesh && !Array.isArray(mesh.material)) usedMaterials.add(mesh.material);
  });
  const swaps = new Map<THREE.Material, THREE.Material>();
  for (const material of usedMaterials) {
    const standard = material as THREE.MeshStandardMaterial;
    if (
      !standard.isMeshStandardMaterial ||
      standard.vertexColors ||
      standard.transparent ||
      !standard.name ||
      !(mats.names || []).includes(standard.name)
    ) {
      continue;
    }
    try {
      const interior = standard.userData && standard.userData.interior ? { interior: true } : {};
      if (mats.get(standard.name, interior) !== standard) continue;
      const variant = mats.get(standard.name, { ...interior, vertexColors: true });
      if (variant !== standard && usedMaterials.has(variant)) swaps.set(standard, variant);
    } catch {
      /* 单个材质升级失败不影响整张地图 */
    }
  }
  builder.staticRoot.traverse((child) => {
    const mesh = child as THREE.Mesh;
    if (!mesh.isMesh || Array.isArray(mesh.material)) return;
    const swapped = swaps.get(mesh.material);
    if (swapped) mesh.material = swapped;
    const opaque = !(mesh.material as THREE.Material).transparent && !(mesh.material as THREE.MeshBasicMaterial).isMeshBasicMaterial;
    mesh.castShadow = opaque;
    mesh.receiveShadow = !(mesh.material as THREE.MeshBasicMaterial).isMeshBasicMaterial;
  });

  // 拆分 noMerge 节点（中继动态灯组等），随后对静态部分按材质合批
  const movable: THREE.Object3D[] = [];
  builder.staticRoot.traverse((child) => {
    if (!child.userData || !child.userData.noMerge) return;
    let parent = child.parent;
    while (parent && parent !== builder.staticRoot) {
      if (parent.userData && parent.userData.noMerge) return;
      parent = parent.parent;
    }
    movable.push(child);
  });
  for (const node of movable) builder.dynRoot.attach(node);

  const merged = mergeStatic(builder.staticRoot);
  merged.name = `level-${levelId}-merged`;

  const root = new THREE.Group();
  root.name = `level-${levelId}`;
  root.add(merged, builder.dynRoot);
  // 与原版 LEGACY_LEVEL_MODULE.create 一致：关卡根节点自行加入场景
  const scene = ctx.scene as THREE.Scene | undefined;
  scene?.add(root);

  // 中继锚点：静态几何已合批，锚点本身保留在动态根下携带状态与更新
  for (const relay of relayObjects) {
    for (let i = relay.children.length - 1; i >= 0; i--) relay.remove(relay.children[i]);
    builder.dynRoot.add(relay);
  }

  let triangles = 0;
  merged.traverse((child) => {
    const mesh = child as THREE.Mesh;
    if (!mesh.isMesh) return;
    const geometry = mesh.geometry;
    triangles += geometry.index ? geometry.index.count / 3 : (geometry.attributes.position?.count ?? 0) / 3;
  });

  const placed = builder.placed;
  const coverPoints = layout.stacks.map((stack) => new THREE.Vector3(stack.x, 0, stack.z + 4));
  let treeTime = 0;

  return {
    root,
    playerStart: {
      pos: new THREE.Vector3(...layout.playerStart.pos),
      yaw: layout.playerStart.yaw,
    },
    objectives: layout.relays.map((relay, index) => ({
      id: `relay_${String.fromCharCode(97 + index)}`,
      label: relay.label,
      zone: "yard",
      pos: new THREE.Vector3(relay.x, 0, relay.z),
      object: relayObjects[index],
    })),
    extraction: {
      pos: new THREE.Vector3(layout.extraction?.x ?? 29, 0, layout.extraction?.z ?? 20),
      radius: layout.extraction?.radius ?? 2.5,
    },
    enemySpawns: [
      ...layout.enemyGround.map(([x, z]) => ({
        pos: new THREE.Vector3(x, 0, z),
        zone: "yard",
        type: "ground",
      })),
      ...layout.enemyAir.map(([x, y, z]) => ({
        pos: new THREE.Vector3(x, y, z),
        zone: "yard",
        type: "air",
      })),
    ],
    zones: [{ name: "yard", min: [-40, -30], max: [40, 30] }],
    interiorBoxes: [],
    skylights: [],
    cinematicPath: [],
    coverPoints,
    shedLights: [],
    vantage: null,
    stats: {
      labelsAtlased: 0,
      containers: placed.filter((item) => item.name.startsWith("container")).length,
      props: placed.length,
      tris: Math.round(triangles),
      meshes: merged.children.length,
    },
    placed,
    groundSurfaceAt: () => layout.surface ?? "concrete",
    update(dt: number) {
      if (treeLeafMaterials.length) {
        treeTime += dt;
        for (const material of treeLeafMaterials) {
          const shader = (material as any).userData?.shader;
          if (shader?.uniforms?.uTime) shader.uniforms.uTime.value = treeTime;
        }
      }
      for (const updater of builder.updaters) {
        try {
          updater(dt);
        } catch {
          /* 单个道具更新失败不影响整张地图 */
        }
      }
    },
  };
}
