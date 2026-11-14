import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import type * as THREE from "three";
import type { LegacyEnvironment } from "../legacy/environment";
import { applyLegacyLevelRuntime, buildLegacyEnvironment } from "../legacy/environment";
import { getLegacyPhysicsHandle } from "../legacy/gameplay";
import { useMaterials } from "../useMaterials";
import { useGame } from "../store";

/** 原版港区环境：backdrop(吊机/货轮/天际线/撤离艇) + ground(码头/海面/雨) + 当前选中关卡的布局 */
export default function LegacyEnvironmentStage() {
  const scene = useThree((s) => s.scene);
  const camera = useThree((s) => s.camera);
  const gl = useThree((s) => s.gl);
  const mats = useMaterials();
  const levelId = useGame((s) => s.levelId);
  const envRef = useRef<LegacyEnvironment | null>(null);

  useEffect(() => {
    if (!mats) return;
    let alive = true;
    useGame.getState().setWorldReady(false);
    const physicsHandle = getLegacyPhysicsHandle();
    buildLegacyEnvironment(scene, camera as THREE.PerspectiveCamera, gl, mats, physicsHandle.physics, levelId)
      .then((env) => {
        if (!alive) {
          env.dispose();
          return;
        }
        // 只有仍有效的构建才写入运行时，避免快速切换关卡时旧数据覆盖新关卡
        applyLegacyLevelRuntime(env.level, env.backdrop);
        physicsHandle.ctx.level = env.level;
        physicsHandle.ground = env.ground;
        physicsHandle.physics.build?.();
        envRef.current = env;
        if (import.meta.env.DEV) {
          (window as unknown as { __legacyEnv?: LegacyEnvironment }).__legacyEnv = env;
        }
        useGame.getState().setWorldReady(true);
        console.info("[legacy] environment", levelId, env.level?.stats, env.backdrop?.stats, env.ground?.stats);
      })
      .catch((err) => console.error("[legacy] environment failed", err));
    return () => {
      alive = false;
      envRef.current?.dispose();
      envRef.current = null;
    };
  }, [mats, scene, camera, gl, levelId]);

  useFrame((_, delta) => {
    envRef.current?.update(Math.min(delta, 0.05));
  });

  return null;
}
