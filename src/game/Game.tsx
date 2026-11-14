import { Canvas, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";
import LegacyActors from "./components/LegacyActors";
import LegacyEnvironmentStage from "./components/LegacyEnvironment";
import Player from "./components/Player";
import { initMaterials } from "./materials";
import { runtime } from "./runtime";
import { useGame } from "./store";
import HUD from "./ui/HUD";
import Menus from "./ui/Menus";
import TouchControls from "./ui/TouchControls";
import World from "./world/World";

function MaterialsBootstrap() {
  const gl = useThree((s) => s.gl);
  const quality = useGame((s) => s.settings.quality);

  useEffect(() => {
    let alive = true;
    const tex = quality === "high" ? 1024 : quality === "medium" ? 512 : 256;
    initMaterials(gl, tex)
      .then((system) => {
        if (!alive) return;
        useGame.getState().setMaterialsReady(true);
        if (import.meta.env.DEV) {
          (window as unknown as { __mats?: typeof system }).__mats = system;
        }
        console.info("[mats]", system.stats());
      })
      .catch((err) => {
        console.error("[mats] init failed", err);
        if (alive) useGame.getState().setMaterialsError(String(err));
      });
    return () => {
      alive = false;
    };
  }, [gl, quality]);

  return null;
}

function DebugBridge() {
  const scene = useThree((s) => s.scene);
  useEffect(() => {
    if (import.meta.env.DEV) {
      const w = window as unknown as { __scene?: THREE.Scene; __THREE?: typeof THREE };
      w.__scene = scene;
      w.__THREE = THREE;
    }
  }, [scene]);
  return null;
}

export default function Game() {
  const phase = useGame((s) => s.phase);

  useEffect(() => {
    if (phase !== "playing" && document.pointerLockElement) document.exitPointerLock();
  }, [phase]);

  useEffect(() => {
    if (import.meta.env.DEV) {
      const w = window as unknown as { __harbor?: typeof runtime; __harborGame?: typeof useGame };
      w.__harbor = runtime;
      w.__harborGame = useGame;
    }
  }, []);

  return (
    <div
      id="app"
      onPointerDown={() => {
        if (useGame.getState().phase === "playing") runtime.requestLock?.();
      }}
    >
      <Canvas
        shadows={false}
        // 内部渲染分辨率由后处理的像素预算控制，画布 DPR 保持 1，避免高 DPI 屏幕上成倍的合成开销
        dpr={1}
        camera={{ fov: 74, near: 0.05, far: 260, position: [0, 1.7, 18] }}
        // 抗锯齿由后处理链负责（原版 renderer 也是 antialias:false）
        gl={{ antialias: false, powerPreference: "high-performance", stencil: false }}
        onCreated={({ gl }) => {
          gl.domElement.id = "view";
          gl.domElement.tabIndex = 0;
          gl.setClearColor("#071019");
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.3;
        }}
      >
        <LegacyEnvironmentStage />
        <World />
        <Player />
        <LegacyActors />
        <MaterialsBootstrap />
        <DebugBridge />
      </Canvas>
      <div id="ui">
        <HUD />
        <TouchControls />
        <Menus />
      </div>
    </div>
  );
}
