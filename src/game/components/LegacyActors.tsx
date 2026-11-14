import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { ENEMY_SPAWNS } from "../config";
import { createLegacyGameplay, getLegacyPhysicsHandle, type LegacyGameplay } from "../legacy/gameplay";
import { runtime } from "../runtime";
import { useGame } from "../store";
import { useMaterials } from "../useMaterials";

/**
 * 原版武器视图模型 + 敌人系统（Gull 无人机 / Hound 猎犬）。
 * 模型、骨骼动画、AI、射击判定全部来自原版模块。
 */
export default function LegacyActors() {
  const scene = useThree((s) => s.scene);
  const camera = useThree((s) => s.camera);
  const gl = useThree((s) => s.gl);
  const mats = useMaterials();
  const worldReady = useGame((s) => s.worldReady);
  const runId = useGame((s) => s.runId);
  const phase = useGame((s) => s.phase);
  const levelId = useGame((s) => s.levelId);
  const quality = useGame((s) => s.settings.quality);
  const gameplay = useRef<LegacyGameplay | null>(null);
  const spawnedRun = useRef(-1);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!mats || !worldReady) return;
    let alive = true;
    const physicsHandle = getLegacyPhysicsHandle();
    createLegacyGameplay({
      scene,
      camera: camera as THREE.PerspectiveCamera,
      renderer: gl,
      mats,
      physics: physicsHandle.physics,
      ground: physicsHandle.ground,
      level: physicsHandle.ctx.level,
      levelId,
      quality,
    })
      .then((instance) => {
        if (!alive) {
          instance.dispose();
          return;
        }
        gameplay.current = instance;
        setReady(true);
        // 武器/敌人/特效与全部着色器预热（PCSS、视图模型、后处理）完成，
        // 才允许部署，保证进入关卡后不再有首帧编译卡顿
        useGame.getState().setActorsReady(true);
        console.info(
          "[legacy] weapon + enemies + fx",
          instance.weapon.info,
          instance.enemies.debug?.tris,
          instance.fx?.stats?.(),
        );
      })
      .catch((err) => console.error("[legacy] gameplay failed", err));
    return () => {
      alive = false;
      gameplay.current?.dispose();
      gameplay.current = null;
      setReady(false);
      useGame.getState().setActorsReady(false);
    };
  }, [mats, worldReady, scene, camera, gl, levelId]);

  useEffect(() => {
    if (!ready) return;
    gameplay.current?.setQuality(quality);
  }, [quality, ready]);

  useEffect(() => {
    if (!ready) return;
    const instance = gameplay.current;
    if (!instance) return;
    // 原版强化波次：从离玩家最远的刷新点补充敌人
    runtime.spawnWave = (kinds) => {
      const source = runtime.enemySpawns.length
        ? runtime.enemySpawns
        : ENEMY_SPAWNS.map((spawn) => ({ kind: spawn.kind, pos: new THREE.Vector3(...spawn.pos) }));
      const ordered = [...source].sort(
        (a, b) => b.pos.distanceToSquared(runtime.pos) - a.pos.distanceToSquared(runtime.pos),
      );
      kinds.forEach((kind, i) => {
        const spawn = ordered[i % ordered.length];
        instance.enemies.spawn(kind === "drone" ? "gull" : "hound", spawn.pos.clone(), {
          state: "patrol",
        });
      });
    };
    runtime.addAmmo = (amount) => instance.weapon.addAmmo(amount);
    return () => {
      runtime.spawnWave = null;
      runtime.addAmmo = null;
    };
  }, [ready]);

  useEffect(() => {
    const instance = gameplay.current;
    if (!instance || !ready) return;
    if (phase === "playing" && runId > 0) {
      // 暂停/恢复不应重新布防，只在新的 runId 时刷新
      if (spawnedRun.current === runId) return;
      spawnedRun.current = runId;
      instance.weapon.reset();
      instance.enemies.clear();
      instance.fx?.clear?.();
      const spawns = runtime.enemySpawns.length
        ? runtime.enemySpawns.map((spawn) => ({ kind: spawn.kind, pos: spawn.pos.clone() }))
        : ENEMY_SPAWNS.map((spawn) => ({ kind: spawn.kind, pos: new THREE.Vector3(...spawn.pos) }));
      // 原版开局只部署 2 架无人机 + 2 只猎犬，其余由中继触发的波次补充
      const initial = [
        ...spawns.filter((spawn) => spawn.kind === "hound").slice(0, 2),
        ...spawns.filter((spawn) => spawn.kind === "drone").slice(0, 2),
      ];
      for (const spawn of initial) {
        instance.enemies.spawn(spawn.kind === "drone" ? "gull" : "hound", spawn.pos, {
          state: "patrol",
        });
      }
      instance.weapon.setVisible(true);
    } else if (phase === "title") {
      spawnedRun.current = -1;
      instance.enemies.clear();
      instance.weapon.setVisible(false);
    }
    // runId 变化时重新布防；阶段变化只控制显隐
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runId, ready, phase]);

  // priority=1 接管 R3F 渲染：世界一遍 + 视图模型一遍（原版 viewCamera 方案）
  useFrame((state, delta) => {
    const instance = gameplay.current;
    if (instance) {
      if (phase === "playing") {
        instance.update(Math.min(delta, 0.05));
      } else {
        runtime.input.fire = false;
        runtime.input.ads = false;
        runtime.input.pressed.clear();
      }
    }
    const { gl, scene, camera } = state;
    if (instance) {
      instance.renderFrame(gl, scene, camera as THREE.PerspectiveCamera);
    } else {
      gl.render(scene, camera);
    }
  }, 1);

  return null;
}
