import { useEffect, useMemo, useState } from "react";
import { CATEGORIES, PROPS, type PropCategory } from "./catalog";
import { runAssetPreview, type LevelStats } from "./thumbnails";
import "../styles/assets.css";

interface ThumbInfo {
  url: string;
  meshes: number;
  triangles: number;
}

const CATEGORY_CLASS: Record<PropCategory, string> = {
  集装箱: "container",
  厂区设施: "site",
  设备机具: "equip",
  货运物资: "cargo",
};

const TONE_ICONS: Record<string, string> = {
  primary: "M12 3 3 8v8l9 5 9-5V8l-9-5Zm0 2.3 6.6 3.7L12 12.7 5.4 9 12 5.3Z",
  success: "M4 5h16v4H4V5Zm0 6h10v4H4v-4Zm0 6h16v2H4v-2Z",
  warning: "M12 2 2 20h20L12 2Zm0 5.2L18.4 18H5.6L12 7.2Z",
  info: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-6h2v6Zm0-8h-2V7h2v2Z",
};

function formatTriangles(value: number) {
  return value >= 1000 ? `${(value / 1000).toFixed(1)}k` : String(value);
}

export default function AssetsPreview() {
  const [thumbs, setThumbs] = useState<Record<string, ThumbInfo>>({});
  const [level, setLevel] = useState<LevelStats | null>(null);
  const [materialCount, setMaterialCount] = useState<number | null>(null);
  const [phase, setPhase] = useState("正在准备渲染环境…");
  const [done, setDone] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("全部");

  useEffect(() => {
    const previous = document.title;
    document.title = "资产预览 · 黑港行动";
    return () => {
      document.title = previous;
    };
  }, []);

  useEffect(() => {
    let disposed = false;
    let finished = 0;
    runAssetPreview(
      PROPS.map((prop) => prop.key),
      {
        onPhase: (text) => {
          if (!disposed) setPhase(text);
        },
        onMaterials: (count) => {
          if (!disposed) setMaterialCount(count);
        },
        onThumbnail: (key, url, meshes, triangles) => {
          if (disposed) return;
          finished += 1;
          setDone(finished);
          setThumbs((prev) => ({ ...prev, [key]: { url, meshes, triangles } }));
        },
        onLevel: (stats) => {
          if (!disposed) setLevel(stats);
        },
      },
      () => disposed,
    ).catch((err: unknown) => {
      console.error("[assets] 生成失败", err);
      if (!disposed) setError(err instanceof Error ? err.message : String(err));
    });
    return () => {
      disposed = true;
    };
  }, []);

  const visible = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    return PROPS.filter((prop) => {
      if (category !== "全部" && prop.category !== category) return false;
      if (!keyword) return true;
      return prop.label.toLowerCase().includes(keyword) || prop.key.toLowerCase().includes(keyword);
    });
  }, [category, query]);

  const progress = Math.round((done / PROPS.length) * 100);
  const levelReady = level !== null && !level.failed;
  const customCount = visible.filter((prop) => prop.custom).length;

  const statCards = [
    {
      label: "程序化道具种类",
      value: String(PROPS.length),
      unit: "类",
      tone: "primary",
      hint: "来自原版 PROP_SIZES 注册表",
    },
    {
      label: "关卡内道具实例",
      value: levelReady ? String(level!.total) : "—",
      unit: "个",
      tone: "success",
      hint: level?.failed ? "统计失败，详见控制台" : "原地生成后经 placed 清单统计",
    },
    {
      label: "集装箱实例",
      value: levelReady ? String(level!.containers) : "—",
      unit: "个",
      tone: "warning",
      hint: "20 尺 / 40 尺 / 40 尺高柜",
    },
    {
      label: "程序化材质",
      value: materialCount === null ? "—" : String(materialCount),
      unit: "种",
      tone: "info",
      hint: "实时生成的 PBR 材质组",
    },
  ];

  return (
    <div className="ap-root">
      <header className="ap-header">
        <div className="ap-header-inner">
          <div className="ap-brand">
            <span className="ap-logo">HB</span>
            <div className="ap-brand-text">
              <h1>资产预览</h1>
              <p>HARBOR BLACKOUT · 程序化道具清单</p>
            </div>
          </div>
          <a className="ap-back" href="#/">
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M9.5 3 5 8l4.5 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            返回游戏
          </a>
        </div>
        <div className="ap-progress-track" aria-hidden="true">
          <div className="ap-progress-bar" style={{ width: `${progress}%` }} />
        </div>
      </header>

      <main className="ap-main">
        <section className="ap-stats">
          {statCards.map((card) => (
            <div className="ap-stat" key={card.label}>
              <span className={`ap-stat-icon tone-${card.tone}`}>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d={TONE_ICONS[card.tone]} fill="currentColor" />
                </svg>
              </span>
              <div className="ap-stat-body">
                <span className="ap-stat-label">{card.label}</span>
                <div className="ap-stat-value">
                  {card.value}
                  <em>{card.unit}</em>
                </div>
                <span className="ap-stat-hint">{card.hint}</span>
              </div>
            </div>
          ))}
        </section>

        {error && (
          <div className="ap-alert">
            <strong>生成失败</strong>
            <span>{error}</span>
          </div>
        )}

        <section className="ap-toolbar">
          <label className="ap-search">
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <circle cx="7" cy="7" r="4.6" fill="none" stroke="currentColor" strokeWidth="1.4" />
              <path d="m10.6 10.6 3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索道具名称或键名"
              spellCheck={false}
            />
            {query && (
              <button type="button" className="ap-search-clear" onClick={() => setQuery("")} aria-label="清空搜索">
                ×
              </button>
            )}
          </label>

          <div className="ap-tabs" role="tablist" aria-label="道具分类">
            {CATEGORIES.map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={category === item}
                className={`ap-tab${category === item ? " on" : ""}`}
                onClick={() => setCategory(item)}
              >
                {item}
                <em>{item === "全部" ? PROPS.length : PROPS.filter((prop) => prop.category === item).length}</em>
              </button>
            ))}
          </div>

          <div className="ap-status">
            <span className={done >= PROPS.length ? "ap-status-done" : ""}>
              {done >= PROPS.length ? "缩略图已全部生成" : `${phase} · ${done}/${PROPS.length}`}
            </span>
            {!level && done >= PROPS.length && <i className="ap-status-dot" title="正在统计关卡实例" />}
          </div>
        </section>

        <div className="ap-result-line">
          <span>
            当前显示 <b>{visible.length}</b> / {PROPS.length} 类
          </span>
          <span>
            特化建模 <b>{customCount}</b>
          </span>
          <span>
            基础盒体 <b>{visible.length - customCount}</b>
          </span>
          <span className="ap-result-dim">
            关卡实例 {levelReady ? `${level!.total} 个` : level?.failed ? "统计失败" : "统计中…"}
          </span>
        </div>

        {visible.length === 0 ? (
          <div className="ap-empty">
            <p>没有匹配“{query}”的道具</p>
            <button type="button" onClick={() => { setQuery(""); setCategory("全部"); }}>
              清除筛选条件
            </button>
          </div>
        ) : (
          <section className="ap-grid">
            {visible.map((prop) => {
              const thumb = thumbs[prop.key];
              const instance = levelReady ? level!.byName[prop.key] ?? 0 : null;
              const instanceText =
                level === null ? "统计中" : level.failed ? "统计失败" : instance ? `×${instance}` : "未放置";
              const instanceClass =
                level === null ? "pending" : level.failed ? "failed" : instance ? "has" : "none";
              return (
                <article className="ap-card" key={prop.key}>
                  <div className="ap-thumb">
                    {thumb ? (
                      <img src={thumb.url} alt={prop.label} loading="lazy" draggable={false} />
                    ) : (
                      <div className="ap-thumb-loading" />
                    )}
                    <span className={`ap-instance ${instanceClass}`}>{instanceText}</span>
                  </div>
                  <div className="ap-card-body">
                    <div className="ap-title-row">
                      <h3>{prop.label}</h3>
                      <code>{prop.key}</code>
                    </div>
                    <div className="ap-tags">
                      <span className={`ap-tag cat-${CATEGORY_CLASS[prop.category]}`}>{prop.category}</span>
                      <span className={`ap-tag ${prop.custom ? "model-custom" : "model-box"}`}>
                        {prop.custom ? "特化建模" : "基础盒体"}
                      </span>
                    </div>
                    <dl className="ap-meta">
                      <div>
                        <dt>尺寸</dt>
                        <dd>
                          {prop.size[0]} × {prop.size[1]} × {prop.size[2]} m
                        </dd>
                      </div>
                      <div>
                        <dt>材质</dt>
                        <dd>{prop.materials.join(" / ")}</dd>
                      </div>
                      <div>
                        <dt>网格</dt>
                        <dd>{thumb ? `${thumb.meshes} 个 · ${formatTriangles(thumb.triangles)} 三角面` : "生成中…"}</dd>
                      </div>
                    </dl>
                  </div>
                </article>
              );
            })}
          </section>
        )}

        <footer className="ap-footer">
          所有缩略图均由原版程序化构建器实时生成，未经过简化或手工重绘 · 数据来源：worldBuilders.ts 的 PROP_SIZES
          注册表与关卡 placed 清单
        </footer>
      </main>
    </div>
  );
}
