export interface ContainerSpec {
  pos: [number, number, number];
  size: [number, number, number];
  color: string;
}

export const RELAYS = [
  { id: "A", name: "RELAY A · CONTAINER YARD", pos: [-14, 0, -4] as [number, number, number] },
  { id: "B", name: "RELAY B · MAINTENANCE SHED", pos: [8, 0, -16] as [number, number, number] },
  { id: "C", name: "RELAY C · QUAYSIDE BERTH 04", pos: [26, 0, 14] as [number, number, number] },
];

export const BOAT_POS: [number, number, number] = [33, 0, 24];
export const PLAYER_START: [number, number, number] = [0, 0, 18];

export const SHED = { pos: [0, 0, -34] as [number, number, number], size: [14, 6, 8] as [number, number, number] };

export const CONTAINER_COLORS = {
  red: "#8f3527",
  blue: "#1f4f63",
  green: "#3c5f3a",
  orange: "#a45f2a",
  gray: "#555c61",
  rust: "#6f3b2c",
};

export const CONTAINERS: ContainerSpec[] = [
  // 左侧堆场
  { pos: [-26.6, 1.3, -20], size: [2.44, 2.6, 12.2], color: CONTAINER_COLORS.red },
  { pos: [-24.1, 1.3, -20], size: [2.44, 2.6, 12.2], color: CONTAINER_COLORS.blue },
  { pos: [-21.6, 1.3, -20], size: [2.44, 2.6, 12.2], color: CONTAINER_COLORS.green },
  { pos: [-26.6, 3.9, -20], size: [2.44, 2.6, 12.2], color: CONTAINER_COLORS.orange },
  { pos: [-26.6, 1.3, 5], size: [2.44, 2.6, 12.2], color: CONTAINER_COLORS.gray },
  { pos: [-24.1, 1.3, 5], size: [2.44, 2.6, 12.2], color: CONTAINER_COLORS.rust },
  { pos: [-30, 1.3, 14], size: [2.44, 2.6, 12.2], color: CONTAINER_COLORS.blue },
  // 中央集装箱
  { pos: [-12, 1.3, -12], size: [12.2, 2.6, 2.44], color: CONTAINER_COLORS.rust },
  { pos: [-12, 1.3, 0], size: [12.2, 2.6, 2.44], color: CONTAINER_COLORS.blue },
  { pos: [-12, 3.9, 0], size: [12.2, 2.6, 2.44], color: CONTAINER_COLORS.orange },
  // 右侧堆场
  { pos: [14, 1.3, -26], size: [12.2, 2.6, 2.44], color: CONTAINER_COLORS.blue },
  { pos: [14, 1.3, -22], size: [12.2, 2.6, 2.44], color: CONTAINER_COLORS.red },
  { pos: [12, 1.3, -6], size: [12.2, 2.6, 2.44], color: CONTAINER_COLORS.green },
  { pos: [18, 1.3, 6], size: [12.2, 2.6, 2.44], color: CONTAINER_COLORS.orange },
  { pos: [18, 3.9, 6], size: [12.2, 2.6, 2.44], color: CONTAINER_COLORS.gray },
  { pos: [8, 1.3, 20], size: [6.1, 2.6, 2.44], color: CONTAINER_COLORS.blue },
  // 后方
  { pos: [-16, 1.3, -32], size: [6.1, 2.6, 2.44], color: CONTAINER_COLORS.gray },
  { pos: [18, 1.3, -32], size: [6.1, 2.6, 2.44], color: CONTAINER_COLORS.rust },
];

export const LAMPS: [number, number, number][] = [
  [-20, 0, 8],
  [6, 0, 10],
  [24, 0, -4],
  [-2, 0, -20],
];

export const CRANES: { pos: [number, number, number]; rot: number }[] = [
  { pos: [-34, 0, -6], rot: 0 },
  { pos: [32, 0, -18], rot: Math.PI / 2 },
];

export const ENEMY_SPAWNS: { kind: "drone" | "hound"; pos: [number, number, number] }[] = [
  { kind: "drone", pos: [-10, 3.2, -6] },
  { kind: "drone", pos: [12, 3.4, -12] },
  { kind: "drone", pos: [20, 3.8, 8] },
  { kind: "drone", pos: [-20, 3.3, 10] },
  { kind: "hound", pos: [-4, 0, -14] },
  { kind: "hound", pos: [10, 0, -2] },
  { kind: "hound", pos: [16, 0, 14] },
  { kind: "hound", pos: [-18, 0, -2] },
  { kind: "hound", pos: [4, 0, 8] },
];
