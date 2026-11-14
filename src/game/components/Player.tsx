import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { harborAudio } from "../../audio";
import { runtime, WEAPON, type EnemyKind } from "../runtime";
import { useGame } from "../store";

const FORWARD = new THREE.Vector3();
const RIGHT = new THREE.Vector3();
const WISH = new THREE.Vector3();

/** 原版强化波次：每关闭一座中继触发一波 */
const WAVE_SPECS: EnemyKind[][] = [
  ["hound", "drone", "hound"],
  ["hound", "hound", "drone", "drone"],
  ["hound", "drone", "hound", "drone", "hound"],
];
const WAVE_COMMS = [
  "中继 A 已关闭。防御网格正在重新分配哨兵——增援正在赶来！",
  "中继 B 已关闭。又侦测到两批目标——利用集装箱做掩护！",
  "中继 C 已关闭。网络切换到本地控制——准备迎接最后一波攻势！",
];

// ?nolock 用于自动化测试/内嵌场景：跳过指针锁定，仍然允许移动与射击
const NO_LOCK = typeof location !== "undefined" && new URLSearchParams(location.search).has("nolock");

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

export default function Player() {
  const { camera: rawCamera, gl } = useThree();
  const camera = rawCamera as THREE.PerspectiveCamera;
  const runId = useGame((s) => s.runId);
  const fov = useGame((s) => s.settings.fov);

  const keys = useRef<Record<string, boolean>>({});
  const jumpQueued = useRef(false);
  const interactHeld = useRef(false);
  const lastHealth = useRef(100);
  const lastPrompt = useRef("");
  const dead = useRef(false);
  const lockFailed = useRef(false);
  const hadLock = useRef(false);
  const stepAcc = useRef(0);
  const lastDamageSeen = useRef(0);
  const extractProgress = useRef(0);
  const cacheProgress = useRef([0, 0, 0]);

  const setPrompt = (text: string | null, progress = 0) => {
    const key = text ? `${text}|${Math.round(progress * 20)}` : "";
    if (key === lastPrompt.current) return;
    lastPrompt.current = key;
    useGame.getState().setPrompt(text ? { text, progress } : null);
  };

  useEffect(() => {
    runtime.reset();
    dead.current = false;
    lastHealth.current = 100;
    lastPrompt.current = "";
    stepAcc.current = 0;
    lastDamageSeen.current = 0;
    extractProgress.current = 0;
    cacheProgress.current = [0, 0, 0];
    runtime.fov = useGame.getState().settings.fov;
    useGame.getState().setHealth(100);
    useGame.getState().setWeapon(WEAPON.magSize, WEAPON.reserveMax, false);
    useGame.getState().setRelays([false, false, false]);
    useGame.getState().setPrompt(null);
    camera.rotation.order = "YXZ";
    camera.rotation.set(0, 0, 0);
  }, [runId, camera]);

  useEffect(() => {
    const canvas = gl.domElement;
    runtime.requestLock = () => {
      if (NO_LOCK || lockFailed.current) return;
      if (document.pointerLockElement !== canvas) {
        const result = canvas.requestPointerLock() as unknown as Promise<void> | undefined;
        if (result && typeof result.catch === "function") {
          result.catch(() => {
            lockFailed.current = true;
            useGame.getState().pushFeed("指针锁定不可用 · 拖动鼠标观察");
          });
        }
      }
    };
    const onLockError = () => {
      lockFailed.current = true;
      useGame.getState().pushFeed("指针锁定不可用 · 拖动鼠标观察");
    };
    const onLockChange = () => {
      const locked = document.pointerLockElement === canvas;
      if (locked) {
        hadLock.current = true;
        return;
      }
      if (!hadLock.current) return;
      hadLock.current = false;
      const gs = useGame.getState();
      if (gs.phase === "playing" && !NO_LOCK) {
        gs.pause();
      }
    };
    document.addEventListener("pointerlockchange", onLockChange);
    document.addEventListener("pointerlockerror", onLockError);
    return () => {
      document.removeEventListener("pointerlockchange", onLockChange);
      document.removeEventListener("pointerlockerror", onLockError);
    };
  }, [gl]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const code = e.code;
      if (code === "Space" || code.startsWith("Arrow") || code === "Tab") e.preventDefault();
      if (code === "Space") {
        // 原版跳跃为按键触发（actionPressed），按住空格不会连跳
        if (!e.repeat && useGame.getState().phase === "playing") jumpQueued.current = true;
      }
      keys.current[code] = true;
      if (code === "KeyR") runtime.input.pressed.add("reload");
      if (code === "Escape") {
        const gs = useGame.getState();
        if (gs.phase === "playing") gs.pause();
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      keys.current[e.code] = false;
    };
    const onMouseDown = (e: MouseEvent) => {
      if (e.button === 0) runtime.input.fire = true;
      if (e.button === 2) runtime.input.adsHeld = true;
    };
    const onMouseUp = (e: MouseEvent) => {
      if (e.button === 0) runtime.input.fire = false;
      if (e.button === 2) runtime.input.adsHeld = false;
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!NO_LOCK && document.pointerLockElement !== gl.domElement) {
        if (!lockFailed.current || (e.buttons & 3) === 0) return;
      }
      if (useGame.getState().phase !== "playing") return;
      const { sensitivity, invertY } = useGame.getState().settings;
      const sens = 0.0021 * sensitivity;
      runtime.yaw -= e.movementX * sens;
      runtime.pitch -= e.movementY * sens * (invertY ? -1 : 1);
      runtime.pitch = clamp(runtime.pitch, -1.42, 1.42);
      runtime.input.lookX += e.movementX * sens;
      runtime.input.lookY += e.movementY * sens;
    };
    const onContextMenu = (e: MouseEvent) => e.preventDefault();
    // 原版：失焦/切后台时清空按键并暂停
    const pauseIfPlaying = () => {
      keys.current = {};
      runtime.input.fire = false;
      runtime.input.adsHeld = false;
      const gs = useGame.getState();
      if (gs.phase === "playing") gs.pause();
    };
    const onVisibility = () => {
      if (document.hidden) pauseIfPlaying();
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("contextmenu", onContextMenu);
    window.addEventListener("blur", pauseIfPlaying);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("contextmenu", onContextMenu);
      window.removeEventListener("blur", pauseIfPlaying);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [gl]);

  useEffect(() => {
    runtime.fov = fov;
    camera.fov = fov;
    camera.updateProjectionMatrix();
  }, [fov, camera]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    const gs = useGame.getState();
    const playing = gs.phase === "playing";

    if (!playing || dead.current) {
      jumpQueued.current = false;
      camera.rotation.set(runtime.pitch, runtime.yaw, 0, "YXZ");
      return;
    }

    runtime.elapsed += dt;

    // ---- 移动 ----
    const active = keys.current;
    if (runtime.input.pressed.delete("jump")) jumpQueued.current = true;
    const crouching = !!(active.KeyC || active.ControlLeft || active.ControlRight);
    const sprintKey = !!(active.ShiftLeft || active.ShiftRight);
    runtime.crouching = crouching;
    // 原版优先级：先判定 ADS，再判定冲刺
    const adsActive = runtime.input.adsHeld && !runtime.sprinting;
    runtime.input.ads = adsActive;
    const sprinting = sprintKey && !crouching && !adsActive;
    runtime.sprinting = sprinting;

    let speed = crouching ? 2.5 : adsActive ? 3.1 : sprinting ? 7.2 : 4.7;
    if (!runtime.onGround) speed *= 0.82;

    const forwardInput =
      (active.KeyW ? 1 : 0) -
      (active.KeyS ? 1 : 0) +
      (active.ArrowUp ? 1 : 0) -
      (active.ArrowDown ? 1 : 0) +
      runtime.input.touchMoveY;
    const rightInput =
      (active.KeyD ? 1 : 0) - (active.KeyA ? 1 : 0) + runtime.input.touchMoveX;
    runtime.input.moveX = rightInput;
    runtime.input.moveY = forwardInput;

    // 原版方向键补充视角
    if (active.ArrowLeft) runtime.yaw += 0.026;
    if (active.ArrowRight) runtime.yaw -= 0.026;

    FORWARD.set(-Math.sin(runtime.yaw), 0, -Math.cos(runtime.yaw));
    RIGHT.set(Math.cos(runtime.yaw), 0, -Math.sin(runtime.yaw));
    WISH.set(0, 0, 0).addScaledVector(FORWARD, forwardInput).addScaledVector(RIGHT, rightInput);
    if (WISH.lengthSq() > 1) WISH.normalize();
    WISH.multiplyScalar(speed);
    const moving = Math.abs(forwardInput) + Math.abs(rightInput) > 0.05;

    runtime.vel.x = WISH.x;
    runtime.vel.z = WISH.z;

    // 原版跳跃参数：初速 5.5、重力 16.5，且蹲伏时不可起跳
    if (runtime.onGround && jumpQueued.current && !crouching) {
      runtime.vel.y = 5.5;
      runtime.onGround = false;
      harborAudio.playStep(true);
    }
    jumpQueued.current = false;
    runtime.vel.y -= 16.5 * dt;

    // ---- 平移与静态碰撞 ----
    runtime.pos.x += runtime.vel.x * dt;
    runtime.pos.z += runtime.vel.z * dt;
    runtime.pos.y += runtime.vel.y * dt;

    const radius = 0.42;
    for (const box of runtime.aabbs) {
      if (runtime.pos.y > box.max.y - 0.05) continue;
      const minX = runtime.pos.x - radius;
      const maxX = runtime.pos.x + radius;
      const minZ = runtime.pos.z - radius;
      const maxZ = runtime.pos.z + radius;
      if (maxX > box.min.x && minX < box.max.x && maxZ > box.min.z && minZ < box.max.z) {
        const dx1 = box.max.x - minX;
        const dx2 = maxX - box.min.x;
        const dz1 = box.max.z - minZ;
        const dz2 = maxZ - box.min.z;
        const minDx = Math.min(dx1, dx2);
        const minDz = Math.min(dz1, dz2);
        if (minDx < minDz) {
          runtime.pos.x += dx1 < dx2 ? minDx : -minDx;
          runtime.vel.x = 0;
        } else {
          runtime.pos.z += dz1 < dz2 ? minDz : -minDz;
          runtime.vel.z = 0;
        }
      }
    }

    runtime.pos.x = clamp(runtime.pos.x, -38, 38);
    runtime.pos.z = clamp(runtime.pos.z, -38, 30);

    if (runtime.pos.y <= 0) {
      runtime.pos.y = 0;
      runtime.vel.y = 0;
      runtime.onGround = true;
    }

    // ---- 蹲伏视线高度（原版 1.6 / 1.02）----
    const targetEye = crouching ? 1.02 : 1.6;
    runtime.eye += (targetEye - runtime.eye) * Math.min(1, dt * 12);

    // ---- 后坐力弹簧 / 镜头晃动 / 头部晃动 ----
    const kickDamp = 1 - Math.exp(-11 * dt);
    runtime.kickPitch -= runtime.kickPitch * kickDamp;
    runtime.kickYaw -= runtime.kickYaw * kickDamp;
    runtime.shake = Math.max(0, runtime.shake - dt * 2.2);

    if (runtime.onGround && moving) {
      runtime.bob += dt * (sprinting ? 13 : 9);
      stepAcc.current += speed * dt;
      if (stepAcc.current >= 2.15) {
        stepAcc.current = 0;
        harborAudio.playStep(sprinting);
      }
    } else {
      stepAcc.current = Math.min(stepAcc.current, 1.5);
    }
    const bobTarget = runtime.onGround && moving && !adsActive ? (sprinting ? 1.25 : 0.8) : 0;
    runtime.bobAmount += (bobTarget - runtime.bobAmount) * Math.min(1, dt * 8);

    // ---- FOV（原版：冲刺 +4.5，ADS -15，平滑过渡）----
    const targetFov = fov + (sprinting ? 4.5 : 0) - (adsActive ? 15 : 0);
    runtime.fov += (targetFov - runtime.fov) * Math.min(1, dt * 9);
    if (Math.abs(camera.fov - runtime.fov) > 0.02) {
      camera.fov = runtime.fov;
      camera.updateProjectionMatrix();
    }

    // ---- 相机 ----
    const shakeScale = gs.settings.reducedShake ? 0.28 : 1;
    const sx = (Math.random() - 0.5) * runtime.shake * 0.018 * shakeScale;
    const sy = (Math.random() - 0.5) * runtime.shake * 0.018 * shakeScale;
    const bobY = Math.sin(runtime.bob * 2) * 0.032 * runtime.bobAmount;
    const bobX = Math.cos(runtime.bob) * 0.022 * runtime.bobAmount;
    camera.position.set(
      runtime.pos.x + RIGHT.x * bobX + sx,
      runtime.pos.y + runtime.eye + bobY + sy,
      runtime.pos.z + RIGHT.z * bobX,
    );
    camera.rotation.set(
      runtime.pitch + runtime.kickPitch + sy * 0.4,
      runtime.yaw + runtime.kickYaw + sx * 0.4,
      0,
      "YXZ",
    );

    // ---- 生命恢复（原版：6 秒后 6.5/s）----
    if (runtime.health > 0 && runtime.elapsed - runtime.regenAt > 6 && runtime.health < 100) {
      runtime.health = Math.min(100, runtime.health + dt * 6.5);
      const next = Math.ceil(runtime.health);
      if (next !== lastHealth.current) {
        lastHealth.current = next;
        gs.setHealth(next);
      }
    }

    // ---- 强化波次 ----
    if (runtime.waveAt > 0 && runtime.elapsed >= runtime.waveAt) {
      const spec = WAVE_SPECS[Math.max(0, runtime.waveIndex - 1)];
      runtime.spawnWave?.(spec);
      runtime.waveAt = 0;
    }

    // ---- 交互目标（中继 / 弹药 / 撤离，取最近）----
    interactHeld.current = !!active.KeyE || runtime.input.touchInteract;
    const damaged = runtime.regenAt !== lastDamageSeen.current;
    lastDamageSeen.current = runtime.regenAt;
    const allRelays = runtime.relaysDisabled.every(Boolean);

    type Target = { type: "relay" | "cache" | "extract"; index: number; dist: number };
    let target: Target | null = null;
    for (let i = 0; i < runtime.relayPositions.length; i++) {
      if (runtime.relaysDisabled[i]) continue;
      const p = runtime.relayPositions[i];
      const d = Math.hypot(runtime.pos.x - p.x, runtime.pos.z - p.z);
      if (d < 3.0 && (!target || d < target.dist)) target = { type: "relay", index: i, dist: d };
    }
    for (let i = 0; i < runtime.ammoCaches.length; i++) {
      const cache = runtime.ammoCaches[i];
      if (cache.used) continue;
      const d = Math.hypot(runtime.pos.x - cache.pos.x, runtime.pos.z - cache.pos.z);
      if (d < 1.8 && (!target || d < target.dist)) target = { type: "cache", index: i, dist: d };
    }
    if (allRelays) {
      const d = Math.hypot(runtime.pos.x - runtime.boatPos.x, runtime.pos.z - runtime.boatPos.z);
      if (d < runtime.extractionRadius && (!target || d < target.dist)) {
        target = { type: "extract", index: -1, dist: d };
      }
    }
    const targetType = target?.type ?? null;
    const targetIndex = target?.index ?? -1;

    if (targetType === "relay") {
      const relay = ["A", "B", "C"][targetIndex];
      const relayData = (runtime.relayObjects[targetIndex] as unknown as { userData?: { setState?: (s: string) => void } })
        ?.userData;
      let progress = runtime.relayProgress[targetIndex];
      if (interactHeld.current) {
        relayData?.setState?.("cutting");
        progress += (dt / 3.4) * (damaged ? 0.45 : 1);
        if (damaged) progress = Math.max(0, progress - 0.06);
        progress = Math.min(1, progress);
      } else {
        relayData?.setState?.("live");
        progress = Math.max(0, progress - dt * 0.55);
      }
      runtime.relayProgress[targetIndex] = progress;

      if (progress >= 1) {
        runtime.relaysDisabled[targetIndex] = true;
        relayData?.setState?.("cut");
        gs.setRelays([...runtime.relaysDisabled]);
        gs.pushFeed(`中继 ${relay} 已关闭`);
        harborAudio.playObjective();
        if (runtime.waveIndex < WAVE_SPECS.length) {
          runtime.waveIndex += 1;
          runtime.waveAt = runtime.elapsed + 1.7;
          gs.setWarning(`增援抵达 · 第 ${runtime.waveIndex} 波`);
          gs.setComms(WAVE_COMMS[runtime.waveIndex - 1]);
          gs.pushFeed("侦测到增援信号");
        }
        if (runtime.relaysDisabled.every(Boolean)) {
          gs.setComms("所有中继已关闭！撤离船正在南码头待命。立即撤离！");
          gs.pushFeed("撤离船已就绪");
        }
        setPrompt(null);
      } else {
        setPrompt(`按住 E · 关闭中继 ${relay}`, progress);
      }
    } else if (targetType === "cache") {
      let progress = cacheProgress.current[targetIndex];
      if (interactHeld.current) progress = Math.min(1, progress + dt / 0.55);
      else progress = Math.max(0, progress - dt * 2);
      cacheProgress.current[targetIndex] = progress;
      if (progress >= 1) {
        runtime.ammoCaches[targetIndex].used = true;
        runtime.addAmmo?.(60);
        gs.useCache(targetIndex);
        gs.pushFeed("弹药补给 +60");
        harborAudio.playUi();
        setPrompt(null);
      } else {
        setPrompt("按住 E · 补充弹药", progress);
      }
    } else if (targetType === "extract") {
      let progress = extractProgress.current;
      if (interactHeld.current) progress = Math.min(1, progress + dt / 1.6);
      else progress = Math.max(0, progress - dt * 0.8);
      extractProgress.current = progress;
      if (progress >= 1 && !dead.current) {
        dead.current = true;
        const accuracy = runtime.shots > 0 ? Math.round((runtime.hits / runtime.shots) * 100) : 0;
        gs.finish({ kills: runtime.kills, time: runtime.elapsed, accuracy });
        if (document.pointerLockElement) document.exitPointerLock();
      } else {
        setPrompt("按住 E · 登上撤离船", progress);
      }
    } else {
      setPrompt(null);
    }
  });

  return null;
}
