import type { LevelTheme } from "./themes";

export type LevelId = "harbor" | "steel" | "fuel" | "factory" | "desert" | "snow";

export interface LevelDef {
  id: LevelId;
  /** 关卡编号 */
  code: string;
  /** 关卡名（中文） */
  name: string;
  /** 地点/时间信息 */
  site: string;
  /** 任务简报 */
  premise: string;
  /** 难度标签 */
  difficulty: string;
  /** 特征标签 */
  tags: string[];
  /** 环境主题（材质 / 天空 / 雾 / 天气） */
  theme: LevelTheme;
}

export const LEVELS: LevelDef[] = [
  {
    id: "harbor",
    code: "01",
    name: "货柜堆场",
    site: "北极星港 · 04 号泊位 · 05:42",
    premise: "港口自动防御系统已经失控。潜入警戒区，关闭三座上行中继，并从码头撤离船撤离。",
    difficulty: "标准",
    tags: ["原版布局", "均衡"],
    theme: "harbor",
  },
  {
    id: "steel",
    code: "02",
    name: "西区钢材场",
    site: "北极星港 · 西区钢材场 · 05:47",
    premise: "钢材与管件塞满西区货场，集装箱窄巷切断了视线。沿堆场纵深推进，关闭三座中继后抵达 04 号泊位。",
    difficulty: "紧凑",
    tags: ["巷战", "掩体密集"],
    theme: "harbor",
  },
  {
    id: "fuel",
    code: "03",
    name: "南区油料码头",
    site: "北极星港 · 南区油料码头 · 05:53",
    premise: "油桶与气瓶密集堆放在南区码头，任何流弹都可能引发连锁爆燃。快速穿行开阔地，逐座切断中继。",
    difficulty: "高危",
    tags: ["爆裂物", "开阔地"],
    theme: "harbor",
  },
  {
    id: "factory",
    code: "04",
    name: "废弃工厂",
    site: "旧北区 · 停产铸造厂 · 06:10",
    premise: "停产多年的重工业厂区仍被防御网络接管。熔炉、烟囱与管廊之间，三座中继正在重启——切断它们并从厂区撤离。",
    difficulty: "标准",
    tags: ["铸造厂", "熔炉"],
    theme: "factory",
  },
  {
    id: "desert",
    code: "05",
    name: "沙漠",
    site: "南线 · 沙海货运站 · 12:20",
    premise: "沙暴掩埋了旧货运站的轨道。沙丘、砂岩拱门与废弃油井之间，三座中继仍在发送加密信号。",
    difficulty: "标准",
    tags: ["沙丘", "油井"],
    theme: "desert",
  },
  {
    id: "snow",
    code: "06",
    name: "雪地",
    site: "北湾 · 极地雪港 · 04:05",
    premise: "暴雪覆盖了极地科考站，雷达与信号塔仍在运转。穿过冰脊与雪松林，关闭三座中继并撤离。",
    difficulty: "标准",
    tags: ["雪原", "科考站"],
    theme: "snow",
  },
];

export function getLevel(id: LevelId): LevelDef {
  return LEVELS.find((level) => level.id === id) ?? LEVELS[0];
}
