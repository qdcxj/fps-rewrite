import { getMaterials, type MaterialSystem } from "./materials";
import { useGame } from "./store";

/** 订阅材质系统就绪状态，就绪后返回原版材质注册表 */
export function useMaterials(): MaterialSystem | null {
  const ready = useGame((s) => s.materialsReady);
  return ready ? getMaterials() : null;
}
