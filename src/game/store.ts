import { create } from "zustand";
import { harborAudio } from "../audio";
import { THEMES } from "./themes";
import { LEVELS, getLevel, type LevelId } from "./levels";

export type Phase = "title" | "playing" | "paused" | "dead" | "complete";
export type Panel = "settings" | "controls" | null;
export type Quality = "low" | "medium" | "high";

export interface Settings {
  volume: number;
  muted: boolean;
  sensitivity: number;
  invertY: boolean;
  fov: number;
  quality: Quality;
  reducedShake: boolean;
  subtitles: boolean;
}

export interface RunStats {
  kills: number;
  time: number;
  accuracy: number;
}

const SETTINGS_KEY = "harbor.settings.v2";
const LEVEL_KEY = "harbor.level.v1";

const DEFAULT_SETTINGS: Settings = {
  volume: 0.7,
  muted: false,
  sensitivity: 1,
  invertY: false,
  fov: 82,
  quality: "medium",
  reducedShake: false,
  subtitles: true,
};

function loadLevel(): LevelId {
  try {
    const raw = localStorage.getItem(LEVEL_KEY);
    if (raw && LEVELS.some((level) => level.id === raw)) return raw as LevelId;
  } catch {
    /* 忽略损坏的本地关卡记录 */
  }
  return "harbor";
}

function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) return { ...DEFAULT_SETTINGS, ...(JSON.parse(raw) as Partial<Settings>) };
  } catch {
    /* 忽略损坏的本地设置 */
  }
  return DEFAULT_SETTINGS;
}

interface GameStore {
  phase: Phase;
  panel: Panel;
  levelId: LevelId;
  runId: number;
  health: number;
  ammo: number;
  reserve: number;
  reloading: boolean;
  relays: boolean[];
  prompt: { text: string; progress: number } | null;
  hit: { at: number; kill: boolean } | null;
  damageAt: number;
  damageDir: number;
  shotAt: number;
  warning: { text: string; at: number } | null;
  caches: boolean[];
  comms: { text: string; at: number } | null;
  feed: { id: number; text: string; at: number }[];
  stats: RunStats;
  settings: Settings;
  materialsReady: boolean;
  materialsError: string | null;
  worldReady: boolean;
  actorsReady: boolean;
  start: () => void;
  pause: () => void;
  resume: () => void;
  toTitle: () => void;
  setLevelId: (levelId: LevelId) => void;
  setPanel: (panel: Panel) => void;
  setMaterialsReady: (ready: boolean) => void;
  setMaterialsError: (error: string | null) => void;
  setWorldReady: (ready: boolean) => void;
  setActorsReady: (ready: boolean) => void;
  die: (stats: RunStats) => void;
  finish: (stats: RunStats) => void;
  setHealth: (v: number) => void;
  setWeapon: (ammo: number, reserve: number, reloading: boolean) => void;
  setRelays: (relays: boolean[]) => void;
  setPrompt: (prompt: { text: string; progress: number } | null) => void;
  registerHit: (kill: boolean) => void;
  registerShot: () => void;
  setDamage: (at: number, dir?: number) => void;
  setWarning: (text: string | null) => void;
  useCache: (index: number) => void;
  setComms: (text: string) => void;
  pushFeed: (text: string) => void;
  updateSettings: (patch: Partial<Settings>) => void;
}

let feedId = 0;

export const useGame = create<GameStore>((set, get) => ({
  phase: "title",
  panel: null,
  levelId: loadLevel(),
  runId: 0,
  health: 100,
  ammo: 30,
  reserve: 210,
  reloading: false,
  relays: [false, false, false],
  prompt: null,
  hit: null,
  damageAt: 0,
  damageDir: 0,
  shotAt: 0,
  warning: null,
  caches: [false, false, false],
  comms: null,
  feed: [],
  stats: { kills: 0, time: 0, accuracy: 0 },
  settings: loadSettings(),
  materialsReady: false,
  materialsError: null,
  worldReady: false,
  actorsReady: false,

  start: () => {
    harborAudio.init();
    harborAudio.setVolume(get().settings.volume);
    harborAudio.setMuted(get().settings.muted);
    harborAudio.playUi();
    const themeInfo = THEMES[getLevel(get().levelId).theme];
    set({
      phase: "playing",
      panel: null,
      runId: get().runId + 1,
      health: 100,
      ammo: 30,
      reserve: 210,
      reloading: false,
      relays: [false, false, false],
      prompt: null,
      hit: null,
      damageAt: 0,
      damageDir: 0,
      shotAt: 0,
      warning: null,
      caches: [false, false, false],
      comms: { text: themeInfo.intro, at: Date.now() },
      feed: [],
      stats: { kills: 0, time: 0, accuracy: 0 },
    });
    get().pushFeed(`已部署 · ${getLevel(get().levelId).name}`);
    harborAudio.playObjective();
    harborAudio.setInterior(false);
  },

  pause: () => {
    if (get().phase !== "playing") return;
    set({ phase: "paused", panel: null, prompt: null });
    harborAudio.playUi();
  },

  resume: () => {
    if (get().phase !== "paused") return;
    set({ phase: "playing", panel: null });
    harborAudio.playUi();
  },

  toTitle: () => {
    set({ phase: "title", panel: null, prompt: null, comms: null });
    harborAudio.playUi();
  },

  setLevelId: (levelId) => {
    if (get().levelId === levelId) return;
    set({ levelId, worldReady: false, actorsReady: false, panel: null });
    try {
      localStorage.setItem(LEVEL_KEY, levelId);
    } catch {
      /* 忽略存储失败 */
    }
  },

  setPanel: (panel) => set({ panel }),
  setMaterialsReady: (ready) => set({ materialsReady: ready }),
  setMaterialsError: (materialsError) => set({ materialsError }),
  setWorldReady: (worldReady) => set({ worldReady }),
  setActorsReady: (actorsReady) => set({ actorsReady }),

  die: (stats) => {
    set({ phase: "dead", panel: null, prompt: null, stats });
    harborAudio.playHurt();
  },

  finish: (stats) => {
    set({
      phase: "complete",
      panel: null,
      prompt: null,
      stats,
      comms: { text: "特工已撤离，港口灯火管制生效。任务完成！", at: Date.now() },
    });
    harborAudio.playVictory();
  },

  setHealth: (v) => set({ health: v }),
  setWeapon: (ammo, reserve, reloading) => set({ ammo, reserve, reloading }),
  setRelays: (relays) => set({ relays }),
  setPrompt: (prompt) => set({ prompt }),
  registerHit: (kill) => set({ hit: { at: Date.now(), kill } }),
  registerShot: () => set({ shotAt: Date.now() }),
  setDamage: (at, dir = 0) => set({ damageAt: at, damageDir: dir }),
  setWarning: (text) => set({ warning: text ? { text, at: Date.now() } : null }),
  useCache: (index) => {
    const caches = [...get().caches];
    caches[index] = true;
    set({ caches });
  },
  setComms: (text) => set({ comms: { text, at: Date.now() } }),
  pushFeed: (text) => {
    const entry = { id: ++feedId, text, at: Date.now() };
    set({ feed: [...get().feed.slice(-4), entry] });
  },

  updateSettings: (patch) => {
    const settings = { ...get().settings, ...patch };
    set({ settings });
    harborAudio.setVolume(settings.volume);
    harborAudio.setMuted(settings.muted);
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch {
      /* 忽略存储失败 */
    }
  },
}));
