import { useState } from "react";
import { harborAudio } from "../../audio";
import { LEVELS, getLevel, type LevelId } from "../levels";
import { runtime } from "../runtime";
import { useGame, type Quality } from "../store";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

function rating(kills: number, accuracy: number, time: number): string {
  if (kills >= 8 && accuracy >= 45 && time < 300) return "完美";
  if (accuracy >= 45 && time < 360) return "精准";
  if (time < 420) return "高效";
  if (accuracy >= 30) return "战术";
  if (kills >= 5) return "激进";
  return "幸存者";
}

function Panel({ initial }: { initial: "settings" | "controls" }) {
  const [tab, setTab] = useState<"settings" | "controls">(initial);
  const settings = useGame((s) => s.settings);
  const updateSettings = useGame((s) => s.updateSettings);
  const close = () => {
    harborAudio.playUi();
    useGame.getState().setPanel(null);
  };

  return (
    <div className="panel" role="dialog" aria-label="设置">
      <div className="panel-h">
        <div className="tabs">
          <button className="tab" aria-selected={tab === "settings"} onClick={() => setTab("settings")}>
            设置
          </button>
          <button className="tab" aria-selected={tab === "controls"} onClick={() => setTab("controls")}>
            操作
          </button>
        </div>
        <button className="btn small" onClick={close}>
          关闭
        </button>
      </div>
      <div className="panel-b" hidden={tab !== "settings"}>
        <div className="row">
          <label>画质</label>
          <div className="seg">
            {(["low", "medium", "high"] as Quality[]).map((q) => (
              <button key={q} aria-pressed={settings.quality === q} onClick={() => updateSettings({ quality: q })}>
                {q === "low" ? "低" : q === "medium" ? "中" : "高"}
              </button>
            ))}
          </div>
        </div>
        <div className="row">
          <label>主音量</label>
          <div className="slider">
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={settings.volume}
              onChange={(e) => updateSettings({ volume: Number(e.target.value) })}
            />
            <output>{Math.round(settings.volume * 100)}%</output>
          </div>
        </div>
        <div className="row">
          <label>鼠标灵敏度</label>
          <div className="slider">
            <input
              type="range"
              min={0.2}
              max={2}
              step={0.05}
              value={settings.sensitivity}
              onChange={(e) => updateSettings({ sensitivity: Number(e.target.value) })}
            />
            <output>{settings.sensitivity.toFixed(2)}</output>
          </div>
        </div>
        <div className="row">
          <label>视野范围</label>
          <div className="slider">
            <input
              type="range"
              min={60}
              max={100}
              step={1}
              value={settings.fov}
              onChange={(e) => updateSettings({ fov: Number(e.target.value) })}
            />
            <output>{settings.fov}°</output>
          </div>
        </div>
        <div className="row">
          <label>反转 Y 轴</label>
          <button
            className="toggle"
            aria-pressed={settings.invertY}
            onClick={() => updateSettings({ invertY: !settings.invertY })}
          >
            <i />
            {settings.invertY ? "开" : "关"}
          </button>
        </div>
        <div className="row">
          <label>静音全部音频</label>
          <button
            className="toggle"
            aria-pressed={settings.muted}
            onClick={() => updateSettings({ muted: !settings.muted })}
          >
            <i />
            {settings.muted ? "开" : "关"}
          </button>
        </div>
        <div className="row">
          <label>减弱镜头晃动</label>
          <button
            className="toggle"
            aria-pressed={settings.reducedShake}
            onClick={() => updateSettings({ reducedShake: !settings.reducedShake })}
          >
            <i />
            {settings.reducedShake ? "开" : "关"}
          </button>
        </div>
        <div className="row">
          <label>无线电字幕</label>
          <button
            className="toggle"
            aria-pressed={settings.subtitles}
            onClick={() => updateSettings({ subtitles: !settings.subtitles })}
          >
            <i />
            {settings.subtitles ? "开" : "关"}
          </button>
        </div>
        <p className="panel-note">设置立即生效。阴影与反射会随画质变化。</p>
      </div>
      <div className="panel-b" hidden={tab !== "controls"}>
        <h3>键盘与鼠标</h3>
        <dl className="keys">
          <div>
            <dt>移动</dt>
            <dd>
              <kbd>W</kbd>
              <kbd>A</kbd>
              <kbd>S</kbd>
              <kbd>D</kbd>
            </dd>
          </div>
          <div>
            <dt>观察</dt>
            <dd>
              <kbd>鼠标</kbd>
            </dd>
          </div>
          <div>
            <dt>射击</dt>
            <dd>
              <kbd>左键</kbd>
            </dd>
          </div>
          <div>
            <dt>瞄准</dt>
            <dd>
              <kbd>右键</kbd>
            </dd>
          </div>
          <div>
            <dt>跳跃</dt>
            <dd>
              <kbd>空格</kbd>
            </dd>
          </div>
          <div>
            <dt>冲刺</dt>
            <dd>
              <kbd>Shift</kbd>
            </dd>
          </div>
          <div>
            <dt>蹲下</dt>
            <dd>
              <kbd>C</kbd>
              <kbd>Ctrl</kbd>
            </dd>
          </div>
          <div>
            <dt>换弹</dt>
            <dd>
              <kbd>R</kbd>
            </dd>
          </div>
          <div>
            <dt>交互</dt>
            <dd>
              <kbd>长按 E</kbd>
            </dd>
          </div>
          <div>
            <dt>暂停</dt>
            <dd>
              <kbd>Esc</kbd>
            </dd>
          </div>
        </dl>
        <h3>任务</h3>
        <p className="panel-note">
          关闭当前区域的三座防御中继，然后抵达 04 号泊位的撤离船。在中继旁长按 E 切断其上行链路。
        </p>
      </div>
    </div>
  );
}

export default function Menus() {
  const phase = useGame((s) => s.phase);
  const panel = useGame((s) => s.panel);
  const levelId = useGame((s) => s.levelId);
  const stats = useGame((s) => s.stats);
  const materialsReady = useGame((s) => s.materialsReady);
  const materialsError = useGame((s) => s.materialsError);
  const worldReady = useGame((s) => s.worldReady);
  const actorsReady = useGame((s) => s.actorsReady);
  const deployReady = (materialsReady || !!materialsError) && worldReady && actorsReady;
  const currentLevel = getLevel(levelId);

  const open = phase !== "playing";
  const screen = phase === "title" ? "title" : phase;

  const start = () => {
    useGame.getState().start();
    runtime.requestLock?.();
  };
  const selectLevel = (id: LevelId) => {
    if (id === levelId) return;
    harborAudio.playUi();
    useGame.getState().setLevelId(id);
  };
  const resume = () => {
    useGame.getState().resume();
    runtime.requestLock?.();
  };
  const openPanel = (p: "settings" | "controls") => {
    harborAudio.playUi();
    useGame.getState().setPanel(p);
  };
  const abort = () => {
    if (document.pointerLockElement) document.exitPointerLock();
    useGame.getState().toTitle();
  };

  return (
    <div className={`menu ${open ? "open" : ""}`} data-screen={screen}>
      <div className="m-veil" />
      <div className="m-bars">
        <i />
        <i />
      </div>

      <div className="m-screen m-title">
        <div className="m-title-main">
          <div className="m-eyebrow">
            <span className="m-tag">战术射击</span>
            <span className="m-dim">{currentLevel.site}</span>
          </div>
          <h1 className="m-word">
            黑港
            <span className="m-subtitle">行动</span>
          </h1>
          <p className="m-premise">{currentLevel.premise}</p>
          <div className="m-levels">
            <span className="m-levels-k">任务区域</span>
            <div className="m-levels-list" role="radiogroup" aria-label="关卡选择">
              {LEVELS.map((level) => (
                <button
                  key={level.id}
                  type="button"
                  role="radio"
                  aria-checked={level.id === levelId}
                  className={`m-level${level.id === levelId ? " on" : ""}`}
                  onClick={() => selectLevel(level.id)}
                >
                  <span className="m-level-head">
                    <i>{level.code}</i>
                    <b>{level.name}</b>
                    <u>{level.difficulty}</u>
                  </span>
                  <em>{level.tags.join(" / ")}</em>
                </button>
              ))}
            </div>
          </div>
          <div className="m-actions">
            <button
              className="btn primary"
              onClick={start}
              disabled={!deployReady}
            >
              {materialsError
                ? "部署 · 降级模式"
                : !materialsReady
                  ? "材质编译中…"
                  : !worldReady
                    ? "场景装配中…"
                    : !actorsReady
                      ? "武装装配中…"
                      : "部署"}
            </button>
            <button className="btn" onClick={() => openPanel("settings")}>
              设置
            </button>
            <button className="btn" onClick={() => openPanel("controls")}>
              操作
            </button>
          </div>
          <p className="m-note">
            {!deployReady
              ? `正在装配关卡 · ${currentLevel.name} · 程序化材质与几何…`
              : "鼠标瞄准使用指针锁定；光标被释放时，行动会自动暂停。"}
          </p>
        </div>
        <div className="m-legend">
          <div>
            <span>
              <kbd>W</kbd>
              <kbd>A</kbd>
              <kbd>S</kbd>
              <kbd>D</kbd> 移动
            </span>
            <span>
              <kbd>鼠标</kbd> 观察
            </span>
            <span>
              <kbd>左键</kbd> 射击
            </span>
            <span>
              <kbd>右键</kbd> 瞄准
            </span>
          </div>
          <div>
            <span>
              <kbd>空格</kbd> 跳跃
            </span>
            <span>
              <kbd>Shift</kbd> 冲刺
            </span>
            <span>
              <kbd>C</kbd> 蹲下
            </span>
            <span>
              <kbd>R</kbd> 换弹
            </span>
            <span>
              <kbd>E</kbd> 交互
            </span>
          </div>
          <div className="lg-touch">关闭 3 座中继 · 抵达撤离船</div>
        </div>
      </div>

      <div className="m-screen m-card" data-s="paused">
        <div className="m-k">行动已暂停</div>
        <h2 className="m-h">原地待命</h2>
        <div className="m-actions col">
          <button className="btn primary" onClick={resume}>
            继续
          </button>
          <button className="btn" onClick={() => openPanel("settings")}>
            设置
          </button>
          <button className="btn" onClick={() => openPanel("controls")}>
            操作
          </button>
          <button className="btn" onClick={start}>
            重新开始
          </button>
          <button className="btn" onClick={abort}>
            中止并返回标题
          </button>
        </div>
      </div>

      <div className="m-screen m-card m-dead" data-s="dead">
        <div className="m-k">特工已阵亡</div>
        <h2 className="m-h">行动失败</h2>
        <dl className="m-stats">
          <div>
            <dt>用时</dt>
            <dd>{formatTime(stats.time)}</dd>
          </div>
          <div>
            <dt>击杀数</dt>
            <dd>{stats.kills}</dd>
          </div>
          <div>
            <dt>命中率</dt>
            <dd>{stats.accuracy}%</dd>
          </div>
        </dl>
        <div className="m-actions col">
          <button className="btn primary" onClick={start}>
            重试
          </button>
          <button className="btn" onClick={abort}>
            中止并返回标题
          </button>
        </div>
      </div>

      <div className="m-screen m-card m-debrief" data-s="complete">
        <div className="m-k">任务完成</div>
        <h2 className="m-h">黑港行动</h2>
        <div className="m-rating">
          <span>评级</span>
          <b>{rating(stats.kills, stats.accuracy, stats.time)}</b>
        </div>
        <dl className="m-stats">
          <div>
            <dt>用时</dt>
            <dd>{formatTime(stats.time)}</dd>
          </div>
          <div>
            <dt>击杀数</dt>
            <dd>{stats.kills}</dd>
          </div>
          <div>
            <dt>命中率</dt>
            <dd>{stats.accuracy}%</dd>
          </div>
        </dl>
        <div className="m-actions col">
          <button className="btn primary" onClick={start}>
            再次部署
          </button>
          <button className="btn" onClick={abort}>
            返回标题
          </button>
        </div>
      </div>

      {panel && <Panel key={panel} initial={panel} />}
    </div>
  );
}
