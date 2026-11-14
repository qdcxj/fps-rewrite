import { Suspense, lazy, useEffect, useState } from "react";
import Game from "./game/Game";

// 资产预览页按路由懒加载，进入游戏时不会加载它的代码与样式
const AssetsPreview = lazy(() => import("./assets/AssetsPreview"));

function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const onChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return hash;
}

export default function App() {
  const isAssets = useHashRoute().startsWith("#/assets");
  if (isAssets) {
    return (
      <Suspense
        fallback={
          <div
            style={{
              minHeight: "100vh",
              display: "grid",
              placeItems: "center",
              background: "#f2f3f5",
              color: "#909399",
              fontFamily: '"Helvetica Neue", Helvetica, "PingFang SC", "Microsoft YaHei", sans-serif',
              fontSize: 14,
            }}
          >
            正在加载资产预览…
          </div>
        }
      >
        <AssetsPreview />
      </Suspense>
    );
  }
  return <Game />;
}
