import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "127.0.0.1",
    port: 5173,
  },
  build: {
    // 游戏引擎是预构建的单文件 bundle；ez-tree 贴图内联块约 4MB，均为按需加载，体积较大属预期
    chunkSizeWarningLimit: 4096,
  },
});
