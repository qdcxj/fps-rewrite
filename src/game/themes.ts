/**
 * 关卡主题：复用港区布局，通过程序化材质映射、天空/雾/光照与天气粒子形成
 * 港口雨夜 / 废弃工厂 / 沙漠 / 雪地四种可玩区域。
 */
export type LevelTheme = "harbor" | "factory" | "desert" | "snow";

export interface ThemeParticles {
  color: number;
  size: number;
  opacity: number;
  /** 每秒下落速度（米） */
  fall: number;
  /** 横向漂移速度（米/秒） */
  drift: number;
  count: number;
}

export interface ThemeConfig {
  id: LevelTheme;
  label: string;
  area: string;
  brief: string;
  intro: string;
  fog: { color: number; near: number; far: number };
  sky: {
    zenith: [number, number, number];
    horizon: [number, number, number];
    horizonAway: [number, number, number];
    sun: [number, number, number];
  };
  sunLight: { color: number; intensity: number };
  /** 太阳方向（默认低角度黄昏；雪地使用更高的阴天太阳，避免长条形硬阴影） */
  sunDirection?: [number, number, number];
  /** 半球补光（雪地等需要天空漫反射的主题） */
  hemisphere?: { sky: number; ground: number; intensity: number };
  /** 材质雨水湿润度（0 = 全干） */
  wet: number;
  /** 地面雨强（0 = 无雨） */
  rain: number;
  saturation: number;
  /** 地面覆盖材质（null = 使用原版湿沥青） */
  ground: string | null;
  groundColor: number;
  groundScale: number;
  particles: ThemeParticles | null;
  /** 基础材质名 → 主题材质名 */
  materialMap: Record<string, string>;
  /** 涂料类材质按名称覆盖颜色 */
  paintColors: Record<string, number>;
}

const PAINTS = [
  "paint_red",
  "paint_blue",
  "paint_green",
  "paint_yellow",
  "paint_orange",
  "paint_white",
  "paint_grey",
  "paint_teal",
] as const;

function paints(colors: Record<(typeof PAINTS)[number], number>): Record<string, number> {
  return Object.fromEntries(PAINTS.map((name) => [name, colors[name]]));
}

const STEEL_BASE = ["steel_galv", "steel_dark", "steel_worn", "steel_bare", "aluminium", "diamond_plate"];

function mapSteel(map: Record<string, string>, target: string): Record<string, string> {
  for (const name of STEEL_BASE) map[name] = target;
  return map;
}

const FACTORY_MAP = mapSteel(
  {
    asphalt: "factory_floor",
    concrete: "factory_concrete",
    concrete_dirty: "factory_concrete_dark",
    concrete_painted: "factory_concrete",
    brick: "factory_brick",
    floor_epoxy: "factory_floor",
    steel_rust: "factory_rust",
    corrugated_roof: "factory_roof",
    hazard_stripes: "factory_hazard",
  },
  "factory_steel",
);

const DESERT_MAP = mapSteel(
  {
    asphalt: "sand",
    concrete: "sand",
    concrete_dirty: "sand_dark",
    concrete_painted: "sand",
    brick: "sandstone",
    floor_epoxy: "sand_dark",
    steel_rust: "desert_rust",
    corrugated_roof: "desert_roof",
    hazard_stripes: "desert_hazard",
  },
  "desert_metal",
);

const SNOW_MAP = mapSteel(
  {
    asphalt: "snow",
    concrete: "snow",
    concrete_dirty: "snow_dark",
    concrete_painted: "snow_dark",
    brick: "snow_rock",
    floor_epoxy: "snow_ice",
    steel_rust: "snow_rust",
    corrugated_roof: "snow_roof",
    hazard_stripes: "snow_hazard",
  },
  "snow_metal",
);

export const THEMES: Record<LevelTheme, ThemeConfig> = {
  harbor: {
    id: "harbor",
    label: "港口雨夜",
    area: "北极星港 · 04 号泊位",
    brief: "自动化防御网格已封锁港口。潜入雨夜，关闭三座中继，并从码头撤离。",
    intro: "特工，这里是中央指挥部。关闭三座中继，然后抵达撤离船。",
    fog: { color: 0x0a1722, near: 55, far: 220 },
    sky: {
      zenith: [0.055, 0.085, 0.13],
      horizon: [0.95, 0.55, 0.28],
      horizonAway: [0.16, 0.22, 0.3],
      sun: [1, 0.72, 0.42],
    },
    sunLight: { color: 0xffb86d, intensity: 9 },
    wet: 1,
    rain: 1,
    saturation: 1,
    ground: null,
    groundColor: 0x5b5f60,
    groundScale: 1,
    particles: null,
    materialMap: {},
    paintColors: {},
  },
  factory: {
    id: "factory",
    label: "废弃工厂",
    area: "旧北区 · 停产铸造厂",
    brief: "停产多年的重工业厂区仍被防御网络接管。锈蚀的钢构与粉尘之间，三座中继正在重启。",
    intro: "特工，铸造厂已停产，但防御节点仍在运转。关闭三座中继，从厂区南门撤离。",
    fog: { color: 0x20211f, near: 28, far: 155 },
    sky: {
      zenith: [0.09, 0.1, 0.11],
      horizon: [0.42, 0.36, 0.3],
      horizonAway: [0.18, 0.19, 0.19],
      sun: [0.85, 0.72, 0.55],
    },
    sunLight: { color: 0xffd0a0, intensity: 4.2 },
    wet: 0.45,
    rain: 0,
    saturation: 0.86,
    ground: "factory_floor",
    groundColor: 0x55524c,
    groundScale: 0.35,
    particles: { color: 0x9a9488, size: 0.04, opacity: 0.26, fall: 0.5, drift: 0.35, count: 320 },
    materialMap: FACTORY_MAP,
    paintColors: paints({
      paint_red: 0x8a4b3a,
      paint_blue: 0x4a6a72,
      paint_green: 0x5a6a4a,
      paint_yellow: 0xb08a3a,
      paint_orange: 0xa86a34,
      paint_white: 0xb8b5aa,
      paint_grey: 0x6a6a66,
      paint_teal: 0x4a6f6a,
    }),
  },
  desert: {
    id: "desert",
    label: "沙漠",
    area: "南线 · 沙海货运站",
    brief: "沙暴掩埋了旧货运站的轨道。中继仍在沙丘间发送加密信号，趁能见度尚可切断它们。",
    intro: "特工，沙暴即将抵达。关闭三座中继，赶在能见度归零前抵达南侧撤离点。",
    fog: { color: 0xe0b47c, near: 70, far: 300 },
    sky: {
      zenith: [0.17, 0.31, 0.5],
      horizon: [1, 0.71, 0.4],
      horizonAway: [0.7, 0.62, 0.5],
      sun: [1, 0.76, 0.44],
    },
    sunLight: { color: 0xffd9a0, intensity: 11.5 },
    wet: 0,
    rain: 0,
    saturation: 1.02,
    ground: "sand",
    groundColor: 0xc7a878,
    groundScale: 0.28,
    particles: { color: 0xd8b98a, size: 0.035, opacity: 0.3, fall: -0.05, drift: 1.4, count: 420 },
    materialMap: DESERT_MAP,
    paintColors: paints({
      paint_red: 0x9e6a52,
      paint_blue: 0x5f8390,
      paint_green: 0x7d8a64,
      paint_yellow: 0xc9ad6a,
      paint_orange: 0xc08a50,
      paint_white: 0xd8cdb8,
      paint_grey: 0x9a948a,
      paint_teal: 0x6f8f8a,
    }),
  },
  snow: {
    id: "snow",
    label: "雪地",
    area: "北湾 · 极地雪港",
    brief: "暴雪覆盖了整座码头。防御节点在低温下依旧在线，三座中继必须被关闭。",
    intro: "特工，暴雪正在加强。关闭三座中继，沿冰封码头撤往撤离船。",
    fog: { color: 0xc3d0da, near: 18, far: 105 },
    sky: {
      zenith: [0.4, 0.46, 0.53],
      horizon: [0.82, 0.86, 0.9],
      horizonAway: [0.64, 0.7, 0.76],
      sun: [0.96, 0.98, 1],
    },
    sunLight: { color: 0xdae7f5, intensity: 2.6 },
    // 低角度冬季太阳：掠射光拉长雪纹阴影，让雪面起伏与颗粒可见
    sunDirection: [0.62, 0.34, 0.32],
    hemisphere: { sky: 0xdce8f5, ground: 0x93a2ad, intensity: 3.4 },
    wet: 0.02,
    rain: 0,
    saturation: 0.88,
    ground: "snow",
    groundColor: 0xe9eff3,
    groundScale: 0.3,
    particles: { color: 0xffffff, size: 0.11, opacity: 0.72, fall: 1.7, drift: 0.8, count: 700 },
    materialMap: SNOW_MAP,
    paintColors: paints({
      paint_red: 0x9a6b62,
      paint_blue: 0x86a2b4,
      paint_green: 0x7a8a7a,
      paint_yellow: 0xc9b98a,
      paint_orange: 0xc09470,
      paint_white: 0xdfe6ea,
      paint_grey: 0xa8b4ba,
      paint_teal: 0x7a9a9a,
    }),
  },
};

export const THEME_ORDER: LevelTheme[] = ["harbor", "factory", "desert", "snow"];
