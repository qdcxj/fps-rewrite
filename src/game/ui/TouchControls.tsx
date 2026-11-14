import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { runtime } from "../runtime";
import { useGame } from "../store";

type Stick = { x: number; y: number };

/** 触屏控制：左半屏虚拟摇杆，右半屏拖动视角，右侧动作按钮（与原版一致） */
export default function TouchControls() {
  const phase = useGame((s) => s.phase);
  const prompt = useGame((s) => s.prompt);
  const [enabled, setEnabled] = useState(false);
  const [stick, setStick] = useState<Stick | null>(null);
  const [nub, setNub] = useState({ x: 0, y: 0 });
  const drag = useRef<{ id: number; mode: "move" | "look"; x: number; y: number } | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const update = () => setEnabled(mq.matches || navigator.maxTouchPoints > 0);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    const app = document.getElementById("app");
    app?.classList.toggle("is-touch", enabled);
    return () => app?.classList.remove("is-touch");
  }, [enabled]);

  const endDrag = () => {
    drag.current = null;
    setStick(null);
    setNub({ x: 0, y: 0 });
    runtime.input.touchMoveX = 0;
    runtime.input.touchMoveY = 0;
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest(".t-btn")) return;
    if (useGame.getState().phase !== "playing") return;
    const mode = e.clientX < window.innerWidth * 0.45 ? "move" : "look";
    drag.current = { id: e.pointerId, mode, x: e.clientX, y: e.clientY };
    canvasRef.current?.setPointerCapture(e.pointerId);
    if (mode === "move") {
      setStick({ x: e.clientX, y: e.clientY });
      setNub({ x: 0, y: 0 });
    }
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const state = drag.current;
    if (!state || state.id !== e.pointerId) return;
    if (state.mode === "move") {
      const dx = e.clientX - state.x;
      const dy = e.clientY - state.y;
      const len = Math.hypot(dx, dy);
      const radius = 52;
      const k = len > radius ? radius / len : 1;
      setNub({ x: dx * k, y: dy * k });
      runtime.input.touchMoveX = (dx * k) / radius;
      runtime.input.touchMoveY = (-dy * k) / radius;
    } else {
      const { sensitivity, invertY } = useGame.getState().settings;
      const sens = 0.0021 * sensitivity;
      runtime.yaw -= (e.clientX - state.x) * sens;
      runtime.pitch -= (e.clientY - state.y) * sens * (invertY ? -1 : 1);
      runtime.pitch = Math.max(-1.42, Math.min(1.42, runtime.pitch));
      state.x = e.clientX;
      state.y = e.clientY;
    }
  };

  const holdFire = (on: boolean) => (e: ReactPointerEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    runtime.input.fire = on;
  };
  const holdAds = (on: boolean) => (e: ReactPointerEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    runtime.input.adsHeld = on;
  };
  const holdInteract = (on: boolean) => (e: ReactPointerEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    runtime.input.touchInteract = on;
  };

  const tap = (action: "jump" | "reload") => (e: ReactPointerEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (useGame.getState().phase !== "playing") return;
    runtime.input.pressed.add(action);
  };

  const on = enabled && phase === "playing";

  return (
    <div
      className={`touch ${on ? "on" : ""}`}
      ref={canvasRef}
      style={{ touchAction: "none" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <div className={`t-stick ${stick ? "on" : ""}`} style={{ left: stick?.x ?? 0, top: stick?.y ?? 0 }}>
        <div className="t-ring" />
        <div className="t-nub" style={{ transform: `translate(${nub.x}px, ${nub.y}px)` }} />
      </div>
      <button className="t-btn t-fire" onPointerDown={holdFire(true)} onPointerUp={holdFire(false)} onPointerCancel={holdFire(false)}>
        <span>开火</span>
      </button>
      <button className="t-btn t-ads" onPointerDown={holdAds(true)} onPointerUp={holdAds(false)} onPointerCancel={holdAds(false)}>
        <span>瞄准</span>
      </button>
      <button className="t-btn t-jump" onPointerDown={tap("jump")}>
        <span>跳跃</span>
      </button>
      <button className="t-btn t-reload" onPointerDown={tap("reload")}>
        <span>换弹</span>
      </button>
      <button
        className={`t-btn t-interact ${prompt ? "on" : ""}`}
        onPointerDown={holdInteract(true)}
        onPointerUp={holdInteract(false)}
        onPointerCancel={holdInteract(false)}
      >
        <span>互动</span>
      </button>
      <button className="t-btn t-pause" onPointerDown={(e) => { e.stopPropagation(); useGame.getState().pause(); }}>
        <span>暂停</span>
      </button>
    </div>
  );
}
