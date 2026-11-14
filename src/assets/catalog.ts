import { LEGACY_PROP_MODULE } from "../game/legacy/worldBuilders";
import "../game/legacy/themeAssets";

export type PropCategory = "集装箱" | "厂区设施" | "设备机具" | "货运物资";

export interface PropEntry {
  /** 原版道具键名 */
  key: string;
  /** 中文显示名 */
  label: string;
  category: PropCategory;
  /** 原版 PROP_SIZES 尺寸（米） */
  size: [number, number, number];
  /** 主体材质 / 碰撞表面材质 */
  materials: [string, string];
  /** 是否有原版特化构建器（否 = 基础盒体兜底构建） */
  custom: boolean;
}

const PROP_SIZES = (
  LEGACY_PROP_MODULE as unknown as {
    PROP_SIZES: Record<string, [number, number, number, string, string]>;
  }
).PROP_SIZES;

const LABELS: Record<string, string> = {
  container20: "20 尺集装箱",
  container40: "40 尺集装箱",
  container40hc: "40 尺高柜集装箱",
  jersey_barrier: "混凝土隔离墩",
  light_mast: "高杆照明灯",
  fence_panel: "铁丝网围栏",
  guard_booth: "门卫岗亭",
  gate_arm: "道闸横杆",
  bollard_mooring: "系船柱",
  bollard_post: "防撞立柱",
  relay_node: "中继节点",
  shelf_rack: "仓储货架",
  stairs_metal: "金属楼梯",
  catwalk: "检修走道",
  reefer_unit: "冷机机组",
  barrel: "工业油桶",
  pallet: "木托盘",
  pallet_stack: "托盘堆垛",
  crate_wood: "木制货箱",
  crate_stack: "木箱堆垛",
  ibc_tote: "IBC 吨桶",
  forklift: "叉车",
  cable_reel: "电缆卷盘",
  tire_stack: "轮胎堆",
  dumpster: "工业垃圾箱",
  generator: "发电机组",
  jerry_can: "便携油桶",
  traffic_cone: "交通锥",
  gas_cylinders: "气瓶组",
  tarp_cargo: "篷布货垛",
  sandbags: "沙袋垛",
  toolbox_cart: "工具推车",
  floodlight_stand: "移动泛光灯",
  cardboard_boxes: "纸箱堆",
  pipe_stack: "钢管堆",
  sign_post: "标识立牌",
  factory_wall: "铸造厂砖墙",
  factory_smokestack: "砖砌烟囱",
  factory_furnace: "熔炉",
  factory_pipe_rack: "架空管廊",
  factory_tank: "工业储罐",
  factory_machine: "冲压机",
  factory_rubble: "厂房废墟",
  desert_dune: "沙丘",
  desert_rock: "砂岩岩层",
  desert_arch: "砂岩拱门",
  desert_dead_tree: "枯树",
  desert_derrick: "废弃油井",
  desert_train_car: "货运车厢",
  desert_tent: "游牧帐篷",
  desert_water_tower: "水塔",
  snow_pine: "雪松",
  snow_ice_ridge: "冰脊",
  snow_drift: "雪堆",
  snow_radar: "雷达罩",
  snow_station: "科考站",
  snow_radio_tower: "信号塔",
  extraction_truck: "撤离卡车",
};

const CATEGORY_OF: Record<string, PropCategory> = {
  container20: "集装箱",
  container40: "集装箱",
  container40hc: "集装箱",
  jersey_barrier: "厂区设施",
  light_mast: "厂区设施",
  fence_panel: "厂区设施",
  guard_booth: "厂区设施",
  gate_arm: "厂区设施",
  bollard_mooring: "厂区设施",
  bollard_post: "厂区设施",
  relay_node: "厂区设施",
  shelf_rack: "厂区设施",
  stairs_metal: "厂区设施",
  catwalk: "厂区设施",
  sign_post: "厂区设施",
  floodlight_stand: "厂区设施",
  reefer_unit: "设备机具",
  forklift: "设备机具",
  generator: "设备机具",
  toolbox_cart: "设备机具",
  barrel: "货运物资",
  pallet: "货运物资",
  pallet_stack: "货运物资",
  crate_wood: "货运物资",
  crate_stack: "货运物资",
  ibc_tote: "货运物资",
  cable_reel: "货运物资",
  tire_stack: "货运物资",
  dumpster: "货运物资",
  jerry_can: "货运物资",
  traffic_cone: "货运物资",
  gas_cylinders: "货运物资",
  tarp_cargo: "货运物资",
  sandbags: "货运物资",
  cardboard_boxes: "货运物资",
  pipe_stack: "货运物资",
  factory_wall: "厂区设施",
  factory_smokestack: "厂区设施",
  factory_furnace: "厂区设施",
  factory_pipe_rack: "厂区设施",
  factory_tank: "厂区设施",
  factory_machine: "设备机具",
  factory_rubble: "厂区设施",
  desert_dune: "厂区设施",
  desert_rock: "厂区设施",
  desert_arch: "厂区设施",
  desert_dead_tree: "厂区设施",
  desert_derrick: "设备机具",
  desert_train_car: "设备机具",
  desert_tent: "厂区设施",
  desert_water_tower: "厂区设施",
  snow_pine: "厂区设施",
  snow_ice_ridge: "厂区设施",
  snow_drift: "厂区设施",
  snow_radar: "设备机具",
  snow_station: "厂区设施",
  snow_radio_tower: "厂区设施",
  extraction_truck: "设备机具",
};

/** 在原版 prop 模块中注册了专属构建器的道具 */
export const CUSTOM_BUILDERS = new Set([
  "container20",
  "container40",
  "container40hc",
  "jersey_barrier",
  "light_mast",
  "fence_panel",
  "guard_booth",
  "gate_arm",
  "bollard_mooring",
  "bollard_post",
  "relay_node",
  "shelf_rack",
  "stairs_metal",
  "catwalk",
  "reefer_unit",
  "sign_post",
  "floodlight_stand",
]);

export const PROPS: PropEntry[] = Object.entries(PROP_SIZES).map(([key, value]) => ({
  key,
  label: LABELS[key] ?? key,
  category: CATEGORY_OF[key] ?? "货运物资",
  size: [value[0], value[1], value[2]],
  materials: [value[3], value[4]],
  custom: CUSTOM_BUILDERS.has(key),
}));

export const CATEGORIES: readonly ("全部" | PropCategory)[] = [
  "全部",
  "集装箱",
  "厂区设施",
  "设备机具",
  "货运物资",
];
