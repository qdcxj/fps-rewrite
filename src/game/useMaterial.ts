import { useMemo } from "react";
import * as THREE from "three";
import { useMaterials } from "./useMaterials";

/**
 * 优先返回原版程序化材质；材质系统未就绪时返回同色基础材质占位。
 * 参数与原版材质注册表一致：纹理、雨湿、宏观变化、三平面均由原引擎生成。
 */
export function useMat(
  name: string,
  fallbackColor: string,
  opts?: Record<string, unknown>,
  roughness = 0.7,
  metalness = 0.3,
): THREE.Material {
  const mats = useMaterials();
  const optsKey = JSON.stringify(opts ?? {});
  return useMemo(() => {
    if (mats) return mats.get(name, opts);
    return new THREE.MeshStandardMaterial({ color: fallbackColor, roughness, metalness });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mats, name, fallbackColor, roughness, metalness, optsKey]);
}

export function useEmissive(color: number, intensity: number): THREE.Material {
  const mats = useMaterials();
  return useMemo(() => {
    if (mats) return mats.emissive(color, intensity);
    return new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(intensity) });
  }, [mats, color, intensity]);
}
