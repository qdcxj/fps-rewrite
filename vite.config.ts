import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // GitHub Pages 项目页部署在 /fps-rewrite/ 子路径下，使用相对路径 base
  base: "./",
  server: {
    host: "127.0.0.1",
    port: 5173,
  },
  build: {
    // 游戏引擎是预构建的单文件 bundle；ez-tree 贴图内联块约 4MB，均为按需加载，体积较大属预期
    chunkSizeWarningLimit: 4096,
  },
});
