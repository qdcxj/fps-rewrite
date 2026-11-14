import { useEffect, useMemo, useRef, useState } from "react";
import { runtime } from "../runtime";
import { useGame } from "../store";

const TAPE_PX = 2168 / 360;

function Compass() {
  const tapeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLSpanElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const markerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const distRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const MARKERS = [
    { label: "A", extract: false },
    { label: "B", extract: false },
    { label: "C", extract: false },
    { label: "撤离", extract: true },
  ];

  const ticks = useMemo(() => {
    const items: { x: number; cls: string; label?: string }[] = [];
    for (let deg = -180; deg <= 540; deg += 5) {
      const norm = ((deg % 360) + 360) % 360;
      const cls = norm % 45 === 0 ? "mj" : norm % 15 === 0 ? "md" : "mn";
      items.push({ x: (deg + 180) * TAPE_PX, cls });
    }
    const labels: { x: number; text: string }[] = [];
    const cards = ["北", "东北", "东", "东南", "南", "西南", "西", "西北"];
    for (let deg = -180; deg <= 540; deg += 45) {
      const norm = ((deg % 360) + 360) % 360;
      labels.push({ x: (deg + 180) * TAPE_PX, text: cards[Math.floor(norm / 45)] });
    }
    return { items, labels };
  }, []);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const heading = ((-runtime.yaw * 180) / Math.PI + 360) % 360;
      const wrap = wrapRef.current;
      if (tapeRef.current && wrap) {
        const width = wrap.clientWidth;
        tapeRef.current.style.transform = `translateX(${width / 2 - (heading + 180) * TAPE_PX}px)`;
      }
      if (headingRef.current) {
        headingRef.current.textContent = `${heading.toFixed(0).padStart(3, "0")}°`;
      }

      // 中继/撤离方向标记（原版 HUD 的 A/B/C + 距离）
      const targets = [
        ...runtime.relayPositions.map((pos, i) => ({
          label: ["A", "B", "C"][i],
          pos,
          active: !runtime.relaysDisabled[i],
          extract: false,
        })),
        {
          label: "撤离",
          pos: runtime.boatPos,
          active: runtime.relaysDisabled.every(Boolean),
          extract: true,
        },
      ];
      targets.forEach((target, i) => {
        const el = markerRefs.current[i];
        if (!el) return;
        if (!target.active) {
          el.style.opacity = "0";
          return;
        }
        const dx = target.pos.x - runtime.pos.x;
        const dz = target.pos.z - runtime.pos.z;
        const targetHeading = ((-Math.atan2(-dx, -dz) * 180) / Math.PI + 360) % 360;
        const delta = (((targetHeading - heading + 540) % 360) - 180);
        el.style.transform = `translateX(${delta * TAPE_PX}px)`;
        el.classList.toggle("edge", Math.abs(delta) > 42);
        el.style.opacity = Math.abs(delta) > 60 ? "0" : "1";
        const dist = distRefs.current[i];
        if (dist) dist.textContent = `${Math.round(Math.hypot(dx, dz))}M`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="h-compass">
      <div className="h-tape-wrap" ref={wrapRef}>
        <div className="h-tape" ref={tapeRef}>
          {ticks.items.map((t, i) => (
            <i key={i} className={t.cls} style={{ left: t.x }} />
          ))}
          {ticks.labels.map((l, i) => (
            <b key={`l${i}`} className={l.text.length === 1 ? "card" : "ic"} style={{ left: l.x }}>
              {l.text}
            </b>
          ))}
        </div>
      </div>
      <div className="h-needle" />
      <span className="h-heading" ref={headingRef}>
        000°
      </span>
      <div className="h-cmarks">
        {MARKERS.map((m, i) => (
          <div
            key={m.label}
            className={`h-cm ${m.extract ? "extract" : ""}`}
            ref={(el) => {
              markerRefs.current[i] = el;
            }}
            style={{ opacity: 0 }}
          >
            <i />
            <b>{m.label}</b>
            <span
              ref={(el) => {
                distRefs.current[i] = el;
              }}
            >
              0M
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HUD() {
  const phase = useGame((s) => s.phase);
  const health = useGame((s) => s.health);
  const ammo = useGame((s) => s.ammo);
  const reserve = useGame((s) => s.reserve);
  const reloading = useGame((s) => s.reloading);
  const relays = useGame((s) => s.relays);
  const prompt = useGame((s) => s.prompt);
  const hit = useGame((s) => s.hit);
  const comms = useGame((s) => s.comms);
  const feed = useGame((s) => s.feed);
  const warning = useGame((s) => s.warning);
  const subtitles = useGame((s) => s.settings.subtitles);

  const [now, setNow] = useState(() => Date.now());
  const [showHit, setShowHit] = useState(false);
  const [hitKill, setHitKill] = useState(false);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const crossRef = useRef<HTMLDivElement>(null);
  const arcRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 200);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (!hit) return;
    setShowHit(true);
    setHitKill(hit.kill);
    const id = window.setTimeout(() => setShowHit(false), 170);
    return () => window.clearTimeout(id);
  }, [hit]);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const gs = useGame.getState();
      const el = vignetteRef.current;
      if (el) {
        const dt = Date.now() - gs.damageAt;
        const low = gs.health <= 30 ? 0.18 + Math.sin(Date.now() / 260) * 0.05 : 0;
        const flash = dt < 700 ? (1 - dt / 700) * 0.55 : 0;
        el.style.opacity = String(Math.min(0.75, flash + low));
      }
      const cross = crossRef.current;
      if (cross) {
        // 原版 ADS 时准星缩放到 45%
        cross.style.transform = `scale(${1 - runtime.ads * 0.55})`;
      }
      const arc = arcRef.current;
      if (arc) {
        const dt = Date.now() - gs.damageAt;
        const opacity = dt < 900 ? (1 - dt / 900) * 0.9 : 0;
        arc.style.opacity = String(opacity);
        arc.style.transform = `translate(-50%, -50%) rotate(${gs.damageDir}rad)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const disabled = relays.filter(Boolean).length;
  const objective =
    disabled >= 3 ? "前往撤离船" : disabled === 2 ? "关闭最后一座中继" : "关闭 3 座防御中继";
  const low = ammo <= 8;
  const crit = health <= 30;
  const visible = phase === "playing" || phase === "paused";
  const commsVisible = comms && subtitles && now - comms.at < 6000;
  const warnVisible = warning && now - warning.at < 3400;
  const feedVisible = feed.filter((f) => now - f.at < 4500);

  return (
    <>
      <div className={`hud ${visible ? "on" : ""}`}>
        <div className="h-vignette" ref={vignetteRef} />
        <Compass />
        <div className={`h-obj ${visible ? "has" : ""}`}>
          <div className="h-k">作战目标</div>
          <div className="h-obj-t">{objective}</div>
          <div className="h-relays">
            <span>中继</span>
            {relays.map((cut, i) => (
              <i key={i} className={cut ? "cut" : ""} />
            ))}
            <b>{disabled}/3</b>
          </div>
        </div>

        <div className={`h-warn ${warnVisible ? "on" : ""}`} key={warning?.at ?? "warn"}>
          {warnVisible ? warning!.text : ""}
        </div>

        <div className="h-cross" ref={crossRef}>
          <i className="c-t" />
          <i className="c-b" />
          <i className="c-l" />
          <i className="c-r" />
          <i className="c-dot" />
        </div>

        <div className="h-arcs">
          <div className="h-arc" ref={arcRef}>
            <svg viewBox="0 0 200 200">
              <path d="M 60 18 A 84 84 0 0 1 140 18" />
              <path className="tip" d="M 76 10 A 96 96 0 0 1 124 10" />
            </svg>
          </div>
        </div>

        <div className={`h-hit ${hitKill ? "kill" : ""}`} style={{ opacity: showHit ? 1 : 0 }}>
          <i />
          <i />
          <i />
          <i />
        </div>

        <div className={`h-prompt ${prompt ? "on" : ""} ${prompt && prompt.progress > 0 ? "busy" : ""}`}>
          <svg viewBox="0 0 48 48">
            <circle className="bg" cx="24" cy="24" r="21" />
            <circle
              className="fg"
              cx="24"
              cy="24"
              r="21"
              strokeDasharray={132}
              strokeDashoffset={132 * (1 - (prompt?.progress ?? 0))}
              transform="rotate(-90 24 24)"
            />
          </svg>
          <span className="h-key">E</span>
          <span className="h-plabel">{prompt?.text ?? ""}</span>
        </div>

        <div className={`comms ${commsVisible ? "on" : ""}`}>
          <span className="comms-who">中央指挥部</span>
          <div className="comms-t">{commsVisible ? comms!.text : ""}</div>
        </div>

        <div className="h-feed">
          {feedVisible.map((f) => (
            <div key={f.id} className={`h-fl ${now - f.at > 3600 ? "out" : ""}`}>
              {f.text}
            </div>
          ))}
        </div>

        <div className={`h-health ${visible ? "on" : ""} ${crit ? "crit" : ""}`}>
          <div className="h-k">生命体征</div>
          <div className="h-hp-row">
            <span className="h-hp-n">{Math.max(0, Math.round(health))}</span>
            <div className="h-hp-bar">
              {Array.from({ length: 10 }, (_, i) => (
                <i key={i} className={health > i * 10 ? "" : "off"} />
              ))}
            </div>
          </div>
        </div>

        <div className={`h-ammo ${low ? "low" : ""}`}>
          <div className={`h-cue ${reloading ? "on" : low ? "on urgent" : ""}`}>
            {reloading ? "装填中…" : ammo === 0 ? "弹药耗尽" : low ? "弹药不足" : ""}
          </div>
          <div className="h-ammo-row">
            <span className="h-ammo-n">{ammo}</span>
            <span className="h-ammo-r">{reserve}</span>
          </div>
          <div className="h-pips">
            {Array.from({ length: 30 }, (_, i) => (
              <i key={i} className={ammo > i ? "" : "off"} />
            ))}
          </div>
          <div className="h-wname">AR-9 制式步枪</div>
        </div>
      </div>
    </>
  );
}
