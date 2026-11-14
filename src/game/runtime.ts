import * as THREE from "three";
import { harborAudio } from "../audio";
import { BOAT_POS, PLAYER_START, RELAYS } from "./config";
import { useGame } from "./store";

export type EnemyKind = "drone" | "hound";

export interface RuntimeEnemy {
  id: number;
  kind: EnemyKind;
  name: string;
  pos: THREE.Vector3;
  home: THREE.Vector3;
  hp: number;
  maxHp: number;
  alive: boolean;
  group: THREE.Group | null;
  phase: number;
  cooldown: number;
  hitRadius: number;
  rotors: THREE.Object3D[];
  legs: THREE.Object3D[];
}

export interface Box {
  min: THREE.Vector3;
  max: THREE.Vector3;
}

export const WEAPON = {
  magSize: 30,
  reserveMax: 210,
  fireInterval: 60 / 619,
  reloadTime: 2.15,
  damage: 34,
};

export const runtime = {
  pos: new THREE.Vector3(...PLAYER_START),
  vel: new THREE.Vector3(),
  yaw: 0,
  pitch: 0,
  onGround: true,
  crouching: false,
  sprinting: false,
  eye: 1.6,
  // 原版相机弹簧：后坐力只作用于 kick，衰减后准心自动回正
  kickPitch: 0,
  kickYaw: 0,
  shake: 0,
  bob: 0,
  bobAmount: 0,
  fov: 82,
  health: 100,
  regenAt: 0,
  damageDir: 0,
  enemies: [] as RuntimeEnemy[],
  aabbs: [] as Box[],
  relayPositions: RELAYS.map((r) => new THREE.Vector3(...r.pos)),
  relayProgress: [0, 0, 0],
  relaysDisabled: [false, false, false],
  boatPos: new THREE.Vector3(...BOAT_POS),
  extractionRadius: 3.4,
  ammoCaches: [] as { pos: THREE.Vector3; used: boolean }[],
  waveIndex: 0,
  waveAt: 0,
  spawnWave: null as null | ((kinds: EnemyKind[]) => void),
  addAmmo: null as null | ((amount: number) => void),
  playerStart: new THREE.Vector3(...PLAYER_START),
  playerStartYaw: 0,
  enemySpawns: [] as { kind: "drone" | "hound"; pos: THREE.Vector3 }[],
  relayObjects: [] as THREE.Object3D[],
  ads: 0,
  input: {
    fire: false,
    ads: false,
    adsHeld: false,
    moveX: 0,
    moveY: 0,
    touchMoveX: 0,
    touchMoveY: 0,
    touchInteract: false,
    lookX: 0,
    lookY: 0,
    pressed: new Set<string>(),
  },
  weapon: {
    ammo: WEAPON.magSize,
    reserve: WEAPON.reserveMax,
    reloading: false,
    reloadT: 0,
    cooldown: 0,
    muzzleAt: 0,
    recoilPitch: 0,
    recoilYaw: 0,
    kick: 0,
  },
  shots: 0,
  hits: 0,
  kills: 0,
  elapsed: 0,
  alertPlayed: false,
  requestLock: null as null | (() => void),
  reset() {
    this.pos.copy(this.playerStart);
    this.vel.set(0, 0, 0);
    this.yaw = this.playerStartYaw;
    this.pitch = 0;
    this.onGround = true;
    this.crouching = false;
    this.sprinting = false;
    this.eye = 1.6;
    this.kickPitch = 0;
    this.kickYaw = 0;
    this.shake = 0;
    this.bob = 0;
    this.bobAmount = 0;
    this.health = 100;
    this.regenAt = 0;
    this.damageDir = 0;
    this.enemies.length = 0;
    this.relayProgress = [0, 0, 0];
    this.relaysDisabled = [false, false, false];
    this.waveIndex = 0;
    this.waveAt = 0;
    for (const cache of this.ammoCaches) cache.used = false;
    for (const object of this.relayObjects) {
      const data = (object as unknown as { userData?: { setState?: (s: string) => void } }).userData;
      try {
        data?.setState?.("live");
      } catch {
        /* 忽略单个中继复位失败 */
      }
    }
    this.ads = 0;
    this.input.fire = false;
    this.input.ads = false;
    this.input.adsHeld = false;
    this.input.moveX = 0;
    this.input.moveY = 0;
    this.input.touchMoveX = 0;
    this.input.touchMoveY = 0;
    this.input.touchInteract = false;
    this.input.lookX = 0;
    this.input.lookY = 0;
    this.input.pressed.clear();
    this.weapon.ammo = WEAPON.magSize;
    this.weapon.reserve = WEAPON.reserveMax;
    this.weapon.reloading = false;
    this.weapon.reloadT = 0;
    this.weapon.cooldown = 0;
    this.weapon.muzzleAt = 0;
    this.weapon.recoilPitch = 0;
    this.weapon.recoilYaw = 0;
    this.weapon.kick = 0;
    this.shots = 0;
    this.hits = 0;
    this.kills = 0;
    this.elapsed = 0;
    this.alertPlayed = false;
  },
  damagePlayer(amount: number, sourceX?: number, sourceZ?: number) {
    if (this.health <= 0) return;
    this.health = Math.max(0, this.health - amount);
    this.regenAt = this.elapsed;
    this.shake = Math.min(1.1, this.shake + 0.35 + amount * 0.014);
    if (sourceX !== undefined && sourceZ !== undefined) {
      let angle = Math.atan2(sourceX - this.pos.x, -(sourceZ - this.pos.z)) - this.yaw;
      angle = Math.atan2(Math.sin(angle), Math.cos(angle));
      this.damageDir = angle;
    }
    const gs = useGame.getState();
    gs.setHealth(Math.ceil(this.health));
    gs.setDamage(Date.now(), this.damageDir);
    harborAudio.playHurt();
    if (this.health <= 0) {
      const accuracy = this.shots > 0 ? Math.round((this.hits / this.shots) * 100) : 0;
      gs.die({ kills: this.kills, time: this.elapsed, accuracy });
      if (document.pointerLockElement) document.exitPointerLock();
    }
  },
};

export function addCollider(cx: number, cz: number, sx: number, sz: number, height = 2.6): void {
  runtime.aabbs.push({
    min: new THREE.Vector3(cx - sx / 2, 0, cz - sz / 2),
    max: new THREE.Vector3(cx + sx / 2, height, cz + sz / 2),
  });
}
