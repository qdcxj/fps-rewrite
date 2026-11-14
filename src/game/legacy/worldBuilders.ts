// @ts-nocheck
/* eslint-disable */
/**
 * 原版 HARBOR BLACKOUT 世界生成器（自动抽取，逻辑未改动）
 * 来源：legacy/engine.js 中 $g(道具) / cv(关卡) / mv(背景) / vv(地面) / Sv(特效) 的依赖闭包
 * 依赖：Three.js 公开 API + 浏览器全局；材质通过上下文 i.mats 注入。
 * 模块导出：
 *   LEGACY_PROP_MODULE  ($g)  PROP_SIZES/create/register/showcase
 *   LEGACY_LEVEL_MODULE (cv)  create/showcase
 *   LEGACY_BACKDROP_MODULE (mv) create/showcase
 *   LEGACY_GROUND_MODULE (vv) create/showcase
 *   LEGACY_FX_MODULE    (Sv)  create/showcase
 */
import * as THREE from "three";

const lt = THREE;

const _n = THREE.RGBAFormat;
const $n = THREE.Box3;
const Ae = THREE.Vector2;
const ar = THREE.LatheGeometry;
const Bi = THREE.ClampToEdgeWrapping;
const bo = THREE.DynamicDrawUsage;
const bs = THREE.MathUtils;
const Ci = THREE.TorusGeometry;
const Dn = THREE.Sphere;
const Dt = THREE.Vector4;
const ea = THREE.InstancedBufferGeometry;
const Er = THREE.LinearSRGBColorSpace;
const et = THREE.BufferAttribute;
const G0 = THREE.OneFactor;
const go = THREE.Plane;
const He = THREE.Float32BufferAttribute;
const hi = THREE.NoColorSpace;
const hr = THREE.AdditiveBlending;
const In = THREE.Euler;
const Is = THREE.RepeatWrapping;
const ji = THREE.Shape;
const Jr = THREE.CatmullRomCurve3;
const js = THREE.HalfFloatType;
const Kr = THREE.TubeGeometry;
const Ln = THREE.LinearMipmapLinearFilter;
const ls = THREE.SphereGeometry;
const Lt = THREE.Quaternion;
const Na = THREE.OctahedronGeometry;
const Nn = THREE.MeshBasicMaterial;
const nr = THREE.AddEquation;
const nt = THREE.BufferGeometry;
const on = THREE.Object3D;
const or = THREE.Path;
const Qe = THREE.Mesh;
const Qr = THREE.PointLight;
const Qt = THREE.MeshStandardMaterial;
const rn = THREE.PlaneGeometry;
const rr = THREE.ExtrudeGeometry;
const Sh = THREE.CustomBlending;
const si = THREE.WebGLRenderTarget;
const Sn = THREE.DoubleSide;
const Sr = THREE.InstancedMesh;
const Th = THREE.ZeroFactor;
const U0 = THREE.CapsuleGeometry;
const ui = THREE.DataTexture;
const un = THREE.BoxGeometry;
const Ve = THREE.Color;
const Vn = THREE.SRGBColorSpace;
const W = THREE.Vector3;
const w0 = THREE.OneMinusSrcAlphaFactor;
const Wn = THREE.PerspectiveCamera;
const wt = THREE.Group;
const xs = THREE.CanvasTexture;
const Xs = THREE.ShapeUtils;
const Ye = THREE.Matrix4;
const yi = THREE.UnsignedByteType;
const Ys = THREE.CylinderGeometry;
const zn = THREE.ShaderMaterial;
const zs = THREE.InstancedBufferAttribute;
const Zt = THREE.LinearFilter;

var _M = Object.defineProperty;

var br = (i, e) => {
    for (var t in e) _M(i, t, { get: e[t], enumerable: !0 });
  };

var oi = {
      min: new W(-40, 0, -30),
      max: new W(40, 30, 30),
      groundY: 0,
      seaY: -1.6,
      quayX: 30,
    },
    Mn = {
      dir: new W(0.916, 0.225, 0.331).normalize(),
      color: new Ve(1, 0.72, 0.42),
      intensity: 9,
    },
    en = {
      zenith: new Ve(0.055, 0.085, 0.13),
      horizon: new Ve(0.95, 0.55, 0.28),
      horizonAway: new Ve(0.16, 0.22, 0.3),
      fog: new Ve(0.42, 0.47, 0.52),
    },
    Pi = {
      eye: 1.68,
      crouchEye: 1.05,
      radius: 0.32,
      height: 1.8,
      fov: 74,
      viewFov: 54,
    },
    vf = 0,
    zc = 1,
    Pr = {
      test: {
        name: "test",
        scale: 1,
        msaa: 0,
        shadow: 1024,
        tex: 256,
        volSteps: 10,
        ao: !0,
        planar: 0.5,
        bloom: !0,
        motionBlur: !1,
        rain: 0.4,
      },
      low: {
        name: "low",
        scale: 0.7,
        msaa: 0,
        shadow: 2048,
        tex: 512,
        volSteps: 12,
        ao: !1,
        planar: 0,
        bloom: !0,
        motionBlur: !1,
        rain: 0.5,
      },
      medium: {
        name: "medium",
        scale: 0.85,
        msaa: 2,
        shadow: 2048,
        tex: 1024,
        volSteps: 16,
        ao: !0,
        planar: 0.5,
        bloom: !0,
        motionBlur: !1,
        rain: 0.8,
      },
      high: {
        name: "high",
        scale: 1,
        msaa: 4,
        shadow: 4096,
        tex: 1024,
        volSteps: 24,
        ao: !0,
        planar: 0.5,
        bloom: !0,
        motionBlur: !0,
        rain: 1,
      },
      ultra: {
        name: "ultra",
        scale: 1,
        msaa: 4,
        shadow: 4096,
        tex: 2048,
        volSteps: 40,
        ao: !0,
        planar: 1,
        bloom: !0,
        motionBlur: !0,
        rain: 1,
      },
    };

function il(i = 1337) {
    let e = i >>> 0,
      t = () => {
        ((e |= 0), (e = (e + 1831565813) | 0));
        let n = Math.imul(e ^ (e >>> 15), 1 | e);
        return (
          (n = (n + Math.imul(n ^ (n >>> 7), 61 | n)) ^ n),
          ((n ^ (n >>> 14)) >>> 0) / 4294967296
        );
      };
    return (
      (t.range = (n, s) => n + (s - n) * t()),
      (t.int = (n, s) => Math.floor(n + (s - n + 1) * t())),
      (t.pick = (n) => n[Math.floor(t() * n.length)]),
      (t.sign = () => (t() < 0.5 ? -1 : 1)),
      (t.fork = () => il(Math.floor(t() * 4294967296))),
      t
    );
  }

function sa(i, e = !1) {
    let t = i[0].index !== null,
      n = new Set(Object.keys(i[0].attributes)),
      s = new Set(Object.keys(i[0].morphAttributes)),
      o = {},
      r = {},
      a = i[0].morphTargetsRelative,
      l = new nt(),
      c = 0;
    for (let u = 0; u < i.length; ++u) {
      let h = i[u],
        f = 0;
      if (t !== (h.index !== null))
        return (
          console.error(
            "THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " +
              u +
              ". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.",
          ),
          null
        );
      for (let p in h.attributes) {
        if (!n.has(p))
          return (
            console.error(
              "THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " +
                u +
                '. All geometries must have compatible attributes; make sure "' +
                p +
                '" attribute exists among all geometries, or in none of them.',
            ),
            null
          );
        (o[p] === void 0 && (o[p] = []), o[p].push(h.attributes[p]), f++);
      }
      if (f !== n.size)
        return (
          console.error(
            "THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " +
              u +
              ". Make sure all geometries have the same number of attributes.",
          ),
          null
        );
      if (a !== h.morphTargetsRelative)
        return (
          console.error(
            "THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " +
              u +
              ". .morphTargetsRelative must be consistent throughout all geometries.",
          ),
          null
        );
      for (let p in h.morphAttributes) {
        if (!s.has(p))
          return (
            console.error(
              "THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " +
                u +
                ".  .morphAttributes must be consistent throughout all geometries.",
            ),
            null
          );
        (r[p] === void 0 && (r[p] = []), r[p].push(h.morphAttributes[p]));
      }
      if (e) {
        let p;
        if (t) p = h.index.count;
        else if (h.attributes.position !== void 0)
          p = h.attributes.position.count;
        else
          return (
            console.error(
              "THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index " +
                u +
                ". The geometry must have either an index or a position attribute",
            ),
            null
          );
        (l.addGroup(c, p, u), (c += p));
      }
    }
    if (t) {
      let u = 0,
        h = [];
      for (let f = 0; f < i.length; ++f) {
        let p = i[f].index;
        for (let d = 0; d < p.count; ++d) h.push(p.getX(d) + u);
        u += i[f].attributes.position.count;
      }
      l.setIndex(h);
    }
    for (let u in o) {
      let h = Ly(o[u]);
      if (!h)
        return (
          console.error(
            "THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " +
              u +
              " attribute.",
          ),
          null
        );
      l.setAttribute(u, h);
    }
    for (let u in r) {
      let h = r[u][0].length;
      if (h === 0) break;
      ((l.morphAttributes = l.morphAttributes || {}),
        (l.morphAttributes[u] = []));
      for (let f = 0; f < h; ++f) {
        let p = [];
        for (let v = 0; v < r[u].length; ++v) p.push(r[u][v][f]);
        let d = Ly(p);
        if (!d)
          return (
            console.error(
              "THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the " +
                u +
                " morphAttribute.",
            ),
            null
          );
        l.morphAttributes[u].push(d);
      }
    }
    return l;
  }

function Ly(i) {
    let e,
      t,
      n,
      s = -1,
      o = 0;
    for (let c = 0; c < i.length; ++c) {
      let u = i[c];
      if (
        (e === void 0 && (e = u.array.constructor), e !== u.array.constructor)
      )
        return (
          console.error(
            "THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.",
          ),
          null
        );
      if ((t === void 0 && (t = u.itemSize), t !== u.itemSize))
        return (
          console.error(
            "THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.",
          ),
          null
        );
      if ((n === void 0 && (n = u.normalized), n !== u.normalized))
        return (
          console.error(
            "THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.",
          ),
          null
        );
      if ((s === -1 && (s = u.gpuType), s !== u.gpuType))
        return (
          console.error(
            "THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.",
          ),
          null
        );
      o += u.count * t;
    }
    let r = new e(o),
      a = new et(r, t, n),
      l = 0;
    for (let c = 0; c < i.length; ++c) {
      let u = i[c];
      if (u.isInterleavedBufferAttribute) {
        let h = l / t;
        for (let f = 0, p = u.count; f < p; f++)
          for (let d = 0; d < t; d++) {
            let v = u.getComponent(f, d);
            a.setComponent(f + h, d, v);
          }
      } else r.set(u.array, l);
      l += u.count * t;
    }
    return (s !== void 0 && (a.gpuType = s), a);
  }

var oa = new W();

function $e(i, e, t, n = "center") {
    let s = new un(i, e, t),
      o = s.attributes.uv,
      r = s.attributes.position,
      a = s.attributes.normal;
    for (let l = 0; l < o.count; l++) {
      let c = Math.abs(a.getX(l)),
        u = Math.abs(a.getY(l)),
        h = r.getX(l),
        f = r.getY(l),
        p = r.getZ(l);
      c > 0.5
        ? o.setXY(l, p, f)
        : u > 0.5
          ? o.setXY(l, h, p)
          : o.setXY(l, h, f);
    }
    return (n === "bottom" && s.translate(0, e / 2, 0), s);
  }

function Wi(i, e, t, n = 0.02, s = "center") {
    n = Math.min(n, i / 2 - 1e-4, e / 2 - 1e-4, t / 2 - 1e-4);
    let o = new un(i, e, t, 3, 3, 3),
      r = o.attributes.position,
      a = o.attributes.normal,
      l = o.attributes.uv,
      c = i / 2,
      u = e / 2,
      h = t / 2,
      f = (p, d) => {
        let v = Math.abs(p),
          g = Math.sign(p);
        return v > d - 1e-5 ? g * d : g * (d - n);
      };
    for (let p = 0; p < r.count; p++) {
      let d = f(r.getX(p), c),
        v = f(r.getY(p), u),
        g = f(r.getZ(p), h),
        x = Math.max(-(c - n), Math.min(c - n, d)),
        y = Math.max(-(u - n), Math.min(u - n, v)),
        b = Math.max(-(h - n), Math.min(h - n, g));
      if ((oa.set(d - x, v - y, g - b), oa.lengthSq() > 1e-10)) {
        oa.normalize();
        let M = a.getX(p),
          E = a.getY(p),
          w = a.getZ(p);
        (Math.abs(d) > c - 1e-5 ? 1 : 0) +
          (Math.abs(v) > u - 1e-5 ? 1 : 0) +
          (Math.abs(g) > h - 1e-5 ? 1 : 0) >=
        2
          ? ((d = x + oa.x * n),
            (v = y + oa.y * n),
            (g = b + oa.z * n),
            a.setXYZ(p, oa.x, oa.y, oa.z))
          : a.setXYZ(p, M, E, w);
      }
      r.setXYZ(p, d, v, g);
      let m = Math.abs(a.getX(p)),
        A = Math.abs(a.getY(p)),
        _ = Math.abs(a.getZ(p));
      m >= A && m >= _
        ? l.setXY(p, g, v)
        : A >= m && A >= _
          ? l.setXY(p, d, g)
          : l.setXY(p, d, v);
    }
    return (s === "bottom" && o.translate(0, e / 2, 0), o);
  }

function ot(i, e, t, n = 16, s = !1, o = "center") {
    let r = new Ys(i, e, t, n, 1, s),
      a = r.attributes.uv,
      l = r.attributes.position,
      c = r.attributes.normal,
      u = Math.PI * (i + e);
    for (let h = 0; h < a.count; h++)
      Math.abs(c.getY(h)) > 0.9
        ? a.setXY(h, l.getX(h), l.getZ(h))
        : a.setXY(h, a.getX(h) * u, l.getY(h));
    return (o === "bottom" && r.translate(0, t / 2, 0), r);
  }

function Fn(i, e = 0.03, t = 8, n = !1, s = 0) {
    let o = i.map((h) => (h.isVector3 ? h : new W(h[0], h[1], h[2]))),
      r = new Jr(o, n, "catmullrom", s),
      a = r.getLength(),
      l = Math.max(2, Math.ceil(a / Math.max(0.08, e * 3))),
      c = new Kr(r, Math.min(l, 400), e, t, n),
      u = c.attributes.uv;
    for (let h = 0; h < u.count; h++)
      u.setXY(h, u.getX(h) * a, u.getY(h) * Math.PI * 2 * e);
    return c;
  }

var ky = new Ye(),
    Fy = new Lt(),
    Uy = new In(),
    Ny = new W(),
    Fg = new W();

function Dc(i, { p: e = [0, 0, 0], r: t = [0, 0, 0], s: n = 1 } = {}) {
    return (
      Uy.set(t[0], t[1], t[2]),
      Fy.setFromEuler(Uy),
      Ny.set(e[0], e[1], e[2]),
      typeof n == "number" ? Fg.set(n, n, n) : Fg.set(n[0], n[1], n[2]),
      ky.compose(Ny, Fy, Fg),
      i.applyMatrix4(ky),
      i
    );
  }

function Lc(i, e) {
    let t = i.attributes.position,
      n = t.count,
      s = new Float32Array(n * 3);
    for (let o = 0; o < n; o++) {
      let r = typeof e == "function" ? e(t.getX(o), t.getY(o), t.getZ(o)) : e;
      ((s[o * 3] = r[0]), (s[o * 3 + 1] = r[1]), (s[o * 3 + 2] = r[2]));
    }
    return (i.setAttribute("color", new et(s, 3)), i);
  }

function Ii(i) {
    let e = i
      .filter(Boolean)
      .map(
        (l) => (
          l.attributes.uv ||
            l.setAttribute(
              "uv",
              new et(new Float32Array(l.attributes.position.count * 2), 2),
            ),
          l.attributes.normal || l.computeVertexNormals(),
          l
        ),
      );
    if (!e.length) return new nt();
    let t = e.some((l) => l.attributes.color),
      n = e.map((l) => {
        let c = (l.index, l);
        if (t && !c.attributes.color) {
          let u = new Float32Array(c.attributes.position.count * 3).fill(1);
          c.setAttribute("color", new et(u, 3));
        }
        for (let u of Object.keys(c.attributes))
          ["position", "normal", "uv", "color"].includes(u) ||
            c.deleteAttribute(u);
        return c;
      }),
      s = n.every((l) => l.index),
      o = n.every((l) => !l.index),
      r = s || o ? n : n.map((l) => (l.index ? l.toNonIndexed() : l));
    return sa(r, !1) || new nt();
  }

function By(i, { castShadow: e = !0, receiveShadow: t = !0 } = {}) {
    i.updateMatrixWorld(!0);
    let n = new Map(),
      s = [];
    i.traverse((r) => {
      if (!r.isMesh) return;
      let a = r,
        l = !1;
      for (; a; ) {
        if (a.userData && a.userData.noMerge) {
          l = !0;
          break;
        }
        a = a.parent;
      }
      if (
        l ||
        r.isSkinnedMesh ||
        r.isInstancedMesh ||
        Array.isArray(r.material)
      ) {
        s.push(r);
        return;
      }
      let c =
        r.material.uuid +
        (r.castShadow ? "c" : "n") +
        (r.receiveShadow ? "r" : "n") +
        ":" +
        r.layers.mask;
      n.has(c) ||
        n.set(c, {
          mat: r.material,
          geos: [],
          cast: r.castShadow,
          recv: r.receiveShadow,
          layers: r.layers.mask,
        });
      let u = r.geometry.clone();
      (u.applyMatrix4(r.matrixWorld), n.get(c).geos.push(u));
    });
    let o = new wt();
    for (let r of n.values()) {
      let a = new Qe(Ii(r.geos), r.mat);
      ((a.castShadow = r.cast && e),
        (a.receiveShadow = r.recv && t),
        (a.layers.mask = r.layers),
        o.add(a));
    }
    for (let r of s) {
      r.updateMatrixWorld(!0);
      let a = r.matrixWorld.clone();
      (o.add(r),
        r.matrix.copy(a),
        r.matrix.decompose(r.position, r.quaternion, r.scale));
    }
    return o;
  }

function Qi(i, e, { cast: t = !0, recv: n = !0 } = {}) {
    let s = new Qe(i, e);
    return ((s.castShadow = t), (s.receiveShadow = n), s);
  }

var $g = {};

br($g, {
    PROP_SIZES: () => Gi,
    create: () => Yg,
    register: () => _i,
    showcase: () => AA,
  });

var Gi = {
      container20: [6.06, 2.59, 2.44, "paint_red", "metal"],
      container40: [12.19, 2.59, 2.44, "paint_blue", "metal"],
      container40hc: [12.19, 2.9, 2.44, "paint_green", "metal"],
      jersey_barrier: [3, 0.81, 0.6, "concrete", "concrete"],
      light_mast: [0.5, 14, 0.5, "steel_galv", "metal"],
      fence_panel: [3, 2.4, 0.08, "chainlink", "metal"],
      guard_booth: [2.6, 2.7, 2.2, "paint_white", "metal"],
      gate_arm: [5, 1.1, 0.3, "hazard_stripes", "metal"],
      bollard_mooring: [0.7, 0.6, 0.7, "steel_dark", "metal"],
      bollard_post: [0.17, 1, 0.17, "paint_yellow", "metal"],
      relay_node: [1.2, 2.4, 0.8, "paint_grey", "metal"],
      shelf_rack: [2.7, 4.2, 1.1, "paint_orange", "metal"],
      stairs_metal: [3, 2.6, 1, "diamond_plate", "metal"],
      catwalk: [3, 1.1, 1.2, "diamond_plate", "metal"],
      reefer_unit: [0.5, 2.3, 2.3, "paint_white", "metal"],
      barrel: [0.6, 0.9, 0.6, "paint_blue", "metal"],
      pallet: [1.2, 0.144, 1, "wood_pallet", "wood"],
      pallet_stack: [1.2, 1.15, 1, "wood_pallet", "wood"],
      crate_wood: [1.1, 1, 0.9, "wood_pallet", "wood"],
      crate_stack: [1.2, 1.9, 1, "wood_pallet", "wood"],
      ibc_tote: [1.2, 1.16, 1, "plastic_grey", "metal"],
      forklift: [3.4, 2.2, 1.25, "paint_yellow", "metal"],
      cable_reel: [1.3, 1.3, 0.8, "wood_dark", "wood"],
      tire_stack: [0.8, 1, 0.8, "tire", "rubber"],
      dumpster: [1.9, 1.35, 1.1, "paint_green", "metal"],
      generator: [2.2, 1.4, 1, "paint_yellow", "metal"],
      jerry_can: [0.35, 0.47, 0.17, "paint_green", "metal"],
      traffic_cone: [0.36, 0.7, 0.36, "plastic_red", "rubber"],
      gas_cylinders: [0.9, 1.6, 0.5, "steel_dark", "metal"],
      tarp_cargo: [2.4, 1.5, 1.4, "tarp", "dirt"],
      sandbags: [2, 0.9, 0.6, "tarp", "dirt"],
      toolbox_cart: [0.9, 0.95, 0.5, "plastic_red", "metal"],
      floodlight_stand: [1, 2.2, 1, "paint_yellow", "metal"],
      cardboard_boxes: [1, 0.8, 0.8, "cardboard", "wood"],
      pipe_stack: [6, 0.9, 1.2, "steel_rust", "metal"],
      sign_post: [0.6, 2.4, 0.08, "paint_white", "metal"],
    },
    Xg = {};

function _i(i, e) {
    Xg[i] = e;
  }

function Yg(i) {
    return {
      names: () => Object.keys(Gi),
      has: (e) => !!Gi[e],
      build(e, t = {}) {
        if (Xg[e])
          try {
            let o = Xg[e](i, t);
            if (o) return ((o.userData.prop = e), o);
          } catch (o) {
            console.error(`[props] builder "${e}" threw`, o);
          }
        let n = Gi[e] || [1, 1, 1, "concrete", "concrete"];
        Gi[e] || console.warn(`[props] unknown prop "${e}"`);
        let s = new wt();
        return (
          s.add(Qi($e(n[0], n[1], n[2], "bottom"), i.mats.get(n[3]))),
          (s.userData.colliders = [
            {
              min: [-n[0] / 2, 0, -n[2] / 2],
              max: [n[0] / 2, n[1], n[2] / 2],
              surface: n[4],
            },
          ]),
          (s.userData.size = [n[0], n[1], n[2]]),
          (s.userData.prop = e),
          s
        );
      },
    };
  }

function AA(i) {
    let e = i.params.names ? i.params.names.split(",") : Object.keys(Gi),
      t = 0,
      n = 0,
      s = 0,
      o = 0;
    for (let a of e) {
      let l = i.props.build(a, {
          seed: 7,
          doors: a.startsWith("container") ? 0.6 : 0,
        }),
        c = l.userData.size || Gi[a] || [1, 1, 1];
      (t + c[0] > 26 && ((t = 0), (n += s + 1.5), (s = 0)),
        l.position.set(t + c[0] / 2, 0, n),
        i.scene.add(l),
        (t += c[0] + 1),
        (s = Math.max(s, c[2])),
        (o = Math.max(o, t)));
    }
    let r = Math.min(o, 26) / 2;
    return { cam: [r - 4, 2.2, n + s + 6], target: [r, 1, n / 2] };
  }

function $a(i) {
    let e = ((i | 0) * 2654435761) | 0;
    return () => {
      e = (e + 1831565813) | 0;
      let t = Math.imul(e ^ (e >>> 15), 1 | e);
      return (
        (t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t),
        ((t ^ (t >>> 14)) >>> 0) / 4294967296
      );
    };
  }

function h1(i, e) {
    let t = Math.sin(i * 127.1 + e * 311.7) * 43758.5453;
    return t - Math.floor(t);
  }

function ri(i, e) {
    let t = Math.floor(i),
      n = Math.floor(e),
      s = i - t,
      o = e - n,
      r = s * s * (3 - 2 * s),
      a = o * o * (3 - 2 * o),
      l = h1(t, n),
      c = h1(t + 1, n),
      u = h1(t, n + 1),
      h = h1(t + 1, n + 1);
    return l + (c - l) * r + (u - l) * a + (l - c - u + h) * r * a;
  }

var RA = (i) => Math.max(0, Math.min(1, i)),
    mn = (i, e, t) => {
      let n = RA((t - i) / (e - i));
      return n * n * (3 - 2 * n);
    },
    Ir = (i, e, t) => [
      i[0] + (e[0] - i[0]) * t,
      i[1] + (e[1] - i[1]) * t,
      i[2] + (e[2] - i[2]) * t,
    ];

function p3(i, e, t, n = 0.01, s = "center") {
    n = Math.max(5e-4, Math.min(n, i / 2 - 1e-4, e / 2 - 1e-4, t / 2 - 1e-4));
    let o = i / 2,
      r = e / 2,
      a = t / 2,
      l = new Float32Array(72),
      c = new Float32Array(72),
      u = new Float32Array(48),
      h = (x, y, b, m) =>
        ((x > 0 ? 1 : 0) + (y > 0 ? 2 : 0) + (b > 0 ? 4 : 0)) * 3 + m;
    for (let x of [-1, 1])
      for (let y of [-1, 1])
        for (let b of [-1, 1]) {
          let m = [
              [x * o, y * (r - n), b * (a - n)],
              [x * (o - n), y * r, b * (a - n)],
              [x * (o - n), y * (r - n), b * a],
            ],
            A = [
              [x, 0, 0],
              [0, y, 0],
              [0, 0, b],
            ];
          for (let _ = 0; _ < 3; _++) {
            let M = h(x, y, b, _);
            (l.set(m[_], M * 3),
              c.set(A[_], M * 3),
              _ === 0
                ? ((u[M * 2] = m[_][2]), (u[M * 2 + 1] = m[_][1]))
                : _ === 1
                  ? ((u[M * 2] = m[_][0]), (u[M * 2 + 1] = m[_][2]))
                  : ((u[M * 2] = m[_][0]), (u[M * 2 + 1] = m[_][1])));
          }
        }
    let f = [],
      p = (x, y, b) => {
        let m = l[x * 3],
          A = l[x * 3 + 1],
          _ = l[x * 3 + 2],
          M = l[y * 3] - m,
          E = l[y * 3 + 1] - A,
          w = l[y * 3 + 2] - _,
          S = l[b * 3] - m,
          z = l[b * 3 + 1] - A,
          H = l[b * 3 + 2] - _,
          O = E * H - w * z,
          q = w * S - M * H,
          U = M * z - E * S,
          T = m + (M + S) / 3,
          D = A + (E + z) / 3,
          C = _ + (w + H) / 3;
        O * T + q * D + U * C >= 0 ? f.push(x, y, b) : f.push(x, b, y);
      },
      d = (x, y, b, m) => {
        (p(x, y, b), p(x, b, m));
      },
      v = [
        [-1, -1],
        [1, -1],
        [1, 1],
        [-1, 1],
      ];
    for (let x of [-1, 1])
      (d(...v.map(([y, b]) => h(x, y, b, 0))),
        d(...v.map(([y, b]) => h(y, x, b, 1))),
        d(...v.map(([y, b]) => h(y, b, x, 2))));
    for (let x of [-1, 1])
      for (let y of [-1, 1])
        (d(h(-1, x, y, 1), h(1, x, y, 1), h(1, x, y, 2), h(-1, x, y, 2)),
          d(h(x, -1, y, 0), h(x, 1, y, 0), h(x, 1, y, 2), h(x, -1, y, 2)),
          d(h(x, y, -1, 0), h(x, y, 1, 0), h(x, y, 1, 1), h(x, y, -1, 1)));
    for (let x of [-1, 1])
      for (let y of [-1, 1])
        for (let b of [-1, 1]) p(h(x, y, b, 0), h(x, y, b, 1), h(x, y, b, 2));
    let g = new nt();
    return (
      g.setAttribute("position", new et(l, 3)),
      g.setAttribute("normal", new et(c, 3)),
      g.setAttribute("uv", new et(u, 2)),
      g.setIndex(f),
      s === "bottom" && g.translate(0, e / 2, 0),
      g
    );
  }

function m3(i, e, t, n, s, o) {
    let r = 0;
    for (let a = t; a < n; a += 9) {
      let l = i[a + 3] - i[a],
        c = i[a + 4] - i[a + 1],
        u = i[a + 5] - i[a + 2],
        h = i[a + 6] - i[a],
        f = i[a + 7] - i[a + 1],
        p = i[a + 8] - i[a + 2],
        d = c * p - u * f,
        v = u * h - l * p,
        g = l * f - c * h;
      r +=
        d * ((i[a] + i[a + 3] + i[a + 6]) / 3 - s[0]) +
        v * ((i[a + 1] + i[a + 4] + i[a + 7]) / 3 - s[1]) +
        g * ((i[a + 2] + i[a + 5] + i[a + 8]) / 3 - s[2]);
    }
    if (r < 0 != !!o)
      for (let a = t; a < n; a += 9) {
        for (let c = 0; c < 3; c++) {
          let u = i[a + 3 + c];
          ((i[a + 3 + c] = i[a + 6 + c]), (i[a + 6 + c] = u));
        }
        let l = (a / 3) * 2;
        for (let c = 0; c < 2; c++) {
          let u = e[l + 2 + c];
          ((e[l + 2 + c] = e[l + 4 + c]), (e[l + 4 + c] = u));
        }
      }
  }

function la(
    i,
    e,
    t,
    { closed: n = !1, center: s = null, inward: o = !1, caps: r = !1 } = {},
  ) {
    let a = [],
      l = [],
      c = i.length,
      u = n ? c : c - 1,
      h = [0];
    for (let g = 0; g < u; g++) {
      let x = i[g],
        y = i[(g + 1) % c];
      h.push(h[g] + Math.hypot(y[0] - x[0], y[1] - x[1]));
    }
    for (let g = 0; g < e.length - 1; g++) {
      let x = e[g],
        y = e[g + 1];
      for (let b = 0; b < u; b++) {
        let m = i[b],
          A = i[(b + 1) % c],
          _ = t(m[0], m[1], x, g),
          M = t(A[0], A[1], x, g),
          E = t(A[0], A[1], y, g + 1),
          w = t(m[0], m[1], y, g + 1);
        (a.push(..._, ...M, ...E, ..._, ...E, ...w),
          l.push(
            h[b],
            x,
            h[b + 1],
            x,
            h[b + 1],
            y,
            h[b],
            x,
            h[b + 1],
            y,
            h[b],
            y,
          ));
      }
    }
    let f = a.length,
      p = null,
      d = () => {
        if (s) return s;
        if (!p) {
          p = [0, 0, 0];
          for (let x = 0; x < f; x += 3)
            ((p[0] += a[x]), (p[1] += a[x + 1]), (p[2] += a[x + 2]));
          let g = 3 / f;
          ((p[0] *= g), (p[1] *= g), (p[2] *= g));
        }
        return p;
      };
    if ((m3(a, l, 0, f, d(), o), r && n)) {
      let g = 0,
        x = 0;
      for (let y of i) ((g += y[0]), (x += y[1]));
      ((g /= c), (x /= c));
      for (let y of [0, e.length - 1]) {
        let b = a.length,
          m = e[y],
          A = t(g, x, m, y);
        for (let _ = 0; _ < c; _++) {
          let M = i[_],
            E = i[(_ + 1) % c];
          (a.push(...A, ...t(M[0], M[1], m, y), ...t(E[0], E[1], m, y)),
            l.push(g, x, M[0], M[1], E[0], E[1]));
        }
        m3(a, l, b, a.length, d(), o);
      }
    }
    let v = new nt();
    return (
      v.setAttribute("position", new et(new Float32Array(a), 3)),
      v.setAttribute("uv", new et(new Float32Array(l), 2)),
      v.computeVertexNormals(),
      v
    );
  }

function CA(i, e, t, n, s) {
    let o = i % e;
    o < 0 && (o += e);
    let r = e - n - 2 * s;
    return o <= n
      ? 0
      : o < n + s
        ? (-t * (o - n)) / s
        : o <= n + s + r
          ? -t
          : -t * (1 - (o - n - s - r) / s);
  }

function Uc(i, e, t, n, s, o, r = i) {
    let a = t - s - 2 * o,
      l = [0, s, s + o, s + o + a],
      c = [i],
      u = Math.floor((i - r) / t) - 1,
      h = Math.ceil((e - r) / t) + 1;
    for (let f = u; f <= h; f++)
      for (let p of l) {
        let d = r + f * t + p;
        d > i + 1e-4 && d < e - 1e-4 && c.push(d);
      }
    return (c.push(e), c.map((f) => [f, CA(f - r, t, n, s, o)]));
  }

function pr(i, e, t = 5) {
    let n = [],
      s = Math.min(i, e) / 2,
      o = i / 2 - s,
      r = e / 2 - s;
    for (let u = 0; u < 4; u++)
      for (let h = 0; h <= t; h++) {
        let f = ((u + h / t) * Math.PI) / 2;
        n.push([
          Math.cos(f) * s + (u === 0 || u === 3 ? o : -o),
          Math.sin(f) * s + (u < 2 ? r : -r),
        ]);
      }
    let a = [],
      l = [];
    for (let u = 0; u < n.length; u++) {
      let h = n[u],
        f = n[(u + 1) % n.length];
      (a.push(0, 0, 0, h[0], h[1], 0, f[0], f[1], 0),
        l.push(
          0.5,
          0.5,
          h[0] / i + 0.5,
          h[1] / e + 0.5,
          f[0] / i + 0.5,
          f[1] / e + 0.5,
        ));
    }
    let c = new nt();
    return (
      c.setAttribute("position", new et(new Float32Array(a), 3)),
      c.setAttribute("uv", new et(new Float32Array(l), 2)),
      c.computeVertexNormals(),
      c
    );
  }

function cn(i, e) {
    return new rn(i, e);
  }

function Nc(i, e) {
    let t = new rn(i, e),
      n = t.attributes.uv;
    for (let s = 0; s < n.count; s++) n.setXY(s, n.getX(s) * i, n.getY(s) * e);
    return t;
  }

function PA(i) {
    let e = i.index ? i.toNonIndexed() : i;
    return (e.computeVertexNormals(), e);
  }

function mr(i, e = 10, t = 6, n = Math.PI * 2, s = 0, o = Math.PI) {
    return new ls(i, e, t, 0, n, s, o);
  }

function g1(i, e = 16) {
    return new ar(
      i.map((t) => new Ae(t[0], t[1])),
      e,
    );
  }

var f1 = new In(),
    Fc = new Lt(),
    g3 = new Ye(),
    d1 = new W(),
    p1 = new W(1, 1, 1);

function je(i, e = 0, t = 0, n = 0, s = null) {
    return (
      s ? (f1.set(s[0], s[1], s[2]), Fc.setFromEuler(f1)) : Fc.identity(),
      d1.set(e, t, n),
      g3.compose(d1, Fc, p1),
      i.applyMatrix4(g3),
      i
    );
  }

function _o(i = 0, e = 0, t = 0, n = null) {
    return (
      n ? (f1.set(n[0], n[1], n[2]), Fc.setFromEuler(f1)) : Fc.identity(),
      d1.set(i, e, t),
      new Ye().compose(d1, Fc, p1)
    );
  }

var jn = class {
    constructor(e) {
      ((this.G = e),
        (this.buckets = new Map()),
        (this.stack = []),
        (this.m = null),
        (this.defCol = new Map()));
    }
    M(e, t) {
      return this.G.mats.get(e, t);
    }
    push(e) {
      return (
        this.stack.push(this.m),
        (this.m = this.m ? this.m.clone().multiply(e) : e.clone()),
        this
      );
    }
    pop() {
      return ((this.m = this.stack.pop()), this);
    }
    add(e, t, n, s) {
      this.m && t.applyMatrix4(this.m);
      let o = n || this.defCol.get(e);
      o && Lc(t, o);
      let r = this.buckets.get(e);
      return (
        r || ((r = { mat: e, geos: [], cast: !s }), this.buckets.set(e, r)),
        r.geos.push(t),
        t
      );
    }
    box(e, t, n, s, o, r, a, l = {}) {
      return this.add(
        e,
        je(
          l.r === 0
            ? $e(t, n, s)
            : p3(t, n, s, l.r || Math.min(0.012, Math.min(t, n, s) * 0.25)),
          o,
          r,
          a,
          l.rot,
        ),
        l.col,
      );
    }
    cyl(e, t, n, s, o, r, a, l = {}) {
      let c = ot(t, n, s, l.seg || 12, !!l.open);
      return (l.flat && (c = PA(c)), this.add(e, je(c, o, r, a, l.rot), l.col));
    }
    tube(e, t, n, s = {}) {
      return this.add(
        e,
        Fn(t, n, s.seg || 6, !1, s.tension === void 0 ? 0.5 : s.tension),
        s.col,
      );
    }
    bar(e, t, n, s, o = {}) {
      let r = new W(n[0] - t[0], n[1] - t[1], n[2] - t[2]),
        a = r.length(),
        l = ot(o.r2 === void 0 ? s : o.r2, s, a, o.seg || 6, !o.caps),
        c = new Lt().setFromUnitVectors(new W(0, 1, 0), r.normalize());
      return (
        l.applyMatrix4(
          new Ye().compose(
            new W((t[0] + n[0]) / 2, (t[1] + n[1]) / 2, (t[2] + n[2]) / 2),
            c,
            p1,
          ),
        ),
        this.add(e, l, o.col)
      );
    }
    beam(e, t, n, s, o, r = {}) {
      let a = new W(n[0] - t[0], n[1] - t[1], n[2] - t[2]),
        l = a.length(),
        c = r.r === 0 ? $e(s, l, o) : p3(s, l, o, r.r || Math.min(s, o) * 0.2),
        u = new Lt().setFromUnitVectors(new W(0, 1, 0), a.normalize());
      return (
        r.twist &&
          u.multiply(new Lt().setFromAxisAngle(new W(0, 1, 0), r.twist)),
        c.applyMatrix4(
          new Ye().compose(
            new W((t[0] + n[0]) / 2, (t[1] + n[1]) / 2, (t[2] + n[2]) / 2),
            u,
            p1,
          ),
        ),
        this.add(e, c, r.col)
      );
    }
    decal(e, t, n, s, o, r, a) {
      return this.add(
        e.material,
        je(cn(a || t * e.aspect, t), n, s, o, r),
        null,
        !0,
      );
    }
    parts() {
      let e = [];
      for (let t of this.buckets.values())
        e.push({ mat: t.mat, geo: Ii(t.geos), cast: t.cast });
      return e;
    }
    group(e) {
      return Zg(this.parts(), e);
    }
  };

function Zg(i, e) {
    let t = new wt();
    for (let n of i) {
      let s = new Qe(n.geo, (e && e.get(n.mat)) || n.mat);
      ((s.castShadow = n.cast), (s.receiveShadow = !0), t.add(s));
    }
    return t;
  }

function qi(i, e, t, n) {
    return ((i.userData.size = t), (i.userData.colliders = n), (i.name = e), i);
  }

var m1 = new WeakMap();

function Mi(i, e, t) {
    let n = m1.get(i.mats);
    n || ((n = new Map()), m1.set(i.mats, n));
    let s = "L|" + e + "|" + JSON.stringify(t || {});
    if (!n.has(s)) {
      let o;
      try {
        o = i.mats.label(e, t || {});
      } catch {
        o = null;
      }
      n.set(
        s,
        o && o.material
          ? o
          : {
              material: i.mats.get("paint_white"),
              aspect: Math.max(1, e.length * 0.6),
            },
      );
    }
    return n.get(s);
  }

function Jn(i, e) {
    let t = m1.get(i.mats);
    t || ((t = new Map()), m1.set(i.mats, t));
    let n = "D|" + e;
    if (!t.has(n)) {
      let s;
      try {
        s = i.mats.decal(e);
      } catch {
        s = null;
      }
      t.set(
        n,
        s && s.material
          ? s
          : { material: i.mats.get("paint_white"), aspect: 1 },
      );
    }
    return t.get(n);
  }

var Bc = 2.438,
    _3 = {
      container20: {
        type: "22G1",
        gross: "30,480",
        tare: "2,230",
        net: "28,250",
        cu: "33.2",
        def: "red",
      },
      container40: {
        type: "42G1",
        gross: "32,500",
        tare: "3,750",
        net: "28,750",
        cu: "67.7",
        def: "blue",
      },
      container40hc: {
        type: "45G1",
        gross: "32,500",
        tare: "3,940",
        net: "28,560",
        cu: "76.3",
        def: "green",
      },
    },
    v1 = [
      "SLTU 482915 7",
      "HBMU 307144 2",
      "NRDU 665201 9",
      "OKTU 119873 4",
      "VSLU 850362 1",
      "TQLU 274590 6",
    ],
    v3 = ["logo_a", "logo_b", "logo_c", "logo_d"],
    jg = ["red", "blue", "green", "yellow", "orange", "white", "grey", "teal"],
    Jt = { body: !0 },
    IA = 6,
    x3 = new Map(),
    y3 = 0.178,
    bf = 0.118,
    b3 = 0.162,
    Uo = { P: 0.278, d: 0.036, fo: 0.072, sl: 0.068 },
    x1 = { P: 0.209, d: 0.02, fo: 0.09, sl: 0.03 },
    y1 = { P: 0.25, d: 0.042, fo: 0.07, sl: 0.06 };

function zA(i, e, t, n, s) {
    let o = Gi[e][0],
      r = Gi[e][1],
      a = _3[e],
      l = $a(1e3 + t * 77 + e.length * 13),
      c = new jn(i),
      u = c.M("steel_galv"),
      h = c.M("wood_pallet"),
      f = Bc / 2,
      p = o / 2,
      d = f - 0.012,
      v = -p + 0.085,
      g = p - 0.135,
      x = 0.167,
      y = r - 0.06,
      b = [],
      m = Math.round((1 + l() * 2.4) * (0.4 + s)),
      A = [
        [-p * 0.75, -p * 0.05],
        [p - 2.2, p],
      ];
    for (let $ = 0; $ < m; $++) {
      let ue = l() < 0.5 ? 1 : -1,
        me = 0,
        ee = 0;
      do ((me = (l() * 2 - 1) * (p - 0.9)), ee++);
      while (
        ee < 8 &&
        A.some((B) => me > B[0] - 0.4 && me < B[1] + 0.4 && l() < 0.9)
      );
      b.push({
        side: ue,
        x: ue * me,
        y: 0.45 + l() * 1.3,
        r: 0.22 + l() * 0.3,
        depth: 0.025 + l() * 0.04,
      });
    }
    let _ = [],
      M = Math.round((o / 2.2) * (0.5 + s) * (0.6 + l()));
    for (let $ = 0; $ < M * 2; $++)
      _.push({
        side: $ % 2 ? 1 : -1,
        x: (l() * 2 - 1) * (p - 0.3),
        w: 0.05 + l() * 0.12,
        k: 0.4 + l() * 0.6,
      });
    let E = [0.5, 0.44, 0.38],
      w = [0.62, 0.38, 0.24],
      S = t * 9.7,
      z = ($, ue, me) => {
        let ee =
          1 + (ri($ * 0.9 + S, ue * 1.7 + me * 0.4) - 0.5) * 0.16 * (0.5 + s);
        ee *= 0.94 + 0.06 * ri($ * 6.1 + me * 3.3, ue * 5 + S);
        let B = [ee, ee, ee],
          P =
            mn(0.62, 0.02, ue) *
            (0.45 + 0.5 * s) *
            (0.75 + 0.5 * ri($ * 2.3 + me, S));
        return (
          (B = Ir(B, [E[0] * ee, E[1] * ee, E[2] * ee], Math.min(1, P))),
          B
        );
      };
    c.defCol.set(Jt, z);
    let H = ($, ue, me) => {
        let ee = 0;
        for (let B of b)
          if (B.side === me) {
            let P = Math.hypot($ - B.x, (ue - B.y) * 0.9) / B.r;
            if (P < 1) {
              let V = 1 - P * P;
              ee += B.depth * V * V;
            }
          }
        return ee;
      },
      O = [0.035, 0.035, 0.04];
    for (let $ of [-1, 1])
      for (let ue of [0, 1])
        for (let me of [-1, 1]) {
          let ee = $ * (p - y3 / 2),
            B = ue ? r - bf / 2 : bf / 2,
            P = me * (f - b3 / 2);
          (c.box(Jt, y3, bf, b3, ee, B, P, { r: 0.012 }),
            c.add(
              Jt,
              je(pr(0.078, 0.052, 3), ee, B, me * (f + 0.0012), [
                0,
                me > 0 ? 0 : Math.PI,
                0,
              ]),
              O,
            ),
            c.add(
              Jt,
              je(pr(0.064, 0.05, 3), $ * (p + 0.0012), B, P, [
                0,
                ($ * Math.PI) / 2,
                0,
              ]),
              O,
            ),
            ue &&
              c.add(
                Jt,
                je(pr(0.124, 0.064, 3), ee, r + 0.0012, P, [
                  -Math.PI / 2,
                  0,
                  0,
                ]),
                O,
              ));
        }
    for (let $ of [-1, 1])
      (c.box(
        Jt,
        0.085,
        r - 2 * bf + 0.01,
        0.15,
        -p + 0.0465,
        r / 2,
        $ * (f - 0.079),
        { r: 0.014 },
      ),
        c.box(
          Jt,
          0.14,
          r - 2 * bf + 0.01,
          0.056,
          p - 0.074,
          r / 2,
          $ * (f - 0.032),
          { r: 0.012 },
        ),
        c.box(Jt, o - 0.2, 0.062, 0.062, -0.02, r - 0.031, $ * (f - 0.035), {
          r: 0.008,
        }),
        c.box(Jt, o - 0.2, 0.158, 0.05, -0.02, 0.012 + 0.079, $ * (f - 0.029), {
          r: 0.008,
        }));
    if (
      (c.box(Jt, 0.062, 0.062, Bc - 0.2, -p + 0.035, r - 0.031, 0, {
        r: 0.008,
      }),
      c.box(Jt, 0.05, 0.158, Bc - 0.2, -p + 0.029, 0.091, 0, { r: 0.008 }),
      c.box(Jt, 0.13, 0.12, Bc - 0.12, p - 0.072, r - 0.06, 0, { r: 0.01 }),
      c.box(Jt, 0.13, 0.158, Bc - 0.12, p - 0.072, 0.091, 0, { r: 0.01 }),
      c.box(Jt, 0.03, 0.012, Bc - 0.4, p - 0.012, r - 0.125, 0, {
        r: 0.003,
        rot: [0, 0, -0.5],
      }),
      e === "container20")
    )
      for (let $ of [-1, 1])
        for (let ue of [-1.025, 1.025]) {
          (c.add(
            Jt,
            je(cn(0.36, 0.112), ue, 0.075, $ * (f - 0.0035), [
              0,
              $ > 0 ? 0 : Math.PI,
              0,
            ]),
            O,
          ),
            c.box(Jt, 0.46, 0.018, 0.012, ue, 0.142, $ * (f - 0.002), {
              r: 0.003,
            }));
          for (let me of [-1, 1])
            c.box(
              Jt,
              0.018,
              0.13,
              0.01,
              ue + me * 0.19,
              0.078,
              $ * (f - 0.003),
              { r: 0.003 },
            );
        }
    let q = [x, 0.44, 1.25, r - 0.5, y],
      U = Uc(v, g, Uo.P, Uo.d, Uo.fo, Uo.sl, v + 0.02);
    for (let $ of [-1, 1]) {
      let ue = la(U, q, (B, P, V) => [B, V, $ * (d + P - H(B, V, $))], {
        center: [0, r / 2, 0],
      });
      ue.computeVertexNormals();
      let me = ue.attributes.position,
        ee = new Float32Array(me.count * 3);
      for (let B = 0; B < me.count; B++) {
        let P = me.getX(B),
          V = me.getY(B),
          Y = me.getZ(B),
          L = z(P, V, Y),
          Z = d - Math.abs(Y),
          J = mn(0.008, 0.034, Z);
        L = [
          L[0] * (1 - 0.17 * J),
          L[1] * (1 - 0.18 * J),
          L[2] * (1 - 0.18 * J),
        ];
        let oe = mn(r - 0.75, y, V);
        if (oe > 0) {
          for (let le of _)
            if (le.side === $) {
              let R = Math.abs(P - le.x) / le.w;
              R < 1 &&
                (L = Ir(
                  L,
                  [L[0] * w[0], L[1] * w[1], L[2] * w[2]],
                  oe * oe * le.k * (1 - R * R) * (0.45 + 0.55 * s),
                ));
            }
        }
        let fe = H(P, V, $);
        (fe > 0.004 &&
          (L = Ir(
            L,
            [L[0] * 0.66, L[1] * 0.46, L[2] * 0.36],
            Math.min(0.8, fe * 22),
          )),
          (ee[B * 3] = L[0]),
          (ee[B * 3 + 1] = L[1]),
          (ee[B * 3 + 2] = L[2]));
      }
      (ue.setAttribute("color", new et(ee, 3)),
        c.buckets.get(Jt).geos.push(ue));
    }
    for (let $ of [-1, 1])
      for (let ue of o > 7 ? [-1, 1] : [1]) {
        let me = $ * ue * (p - 0.62),
          ee = r - 0.165,
          B = $ * (d - 0.004);
        c.box(Jt, 0.24, 0.1, 0.03, me, ee, B, { r: 0.008 });
        for (let P = -1; P <= 1; P++)
          c.add(
            Jt,
            je(cn(0.18, 0.012), me, ee + P * 0.026, $ * (d + 0.0116), [
              0,
              $ > 0 ? 0 : Math.PI,
              0,
            ]),
            O,
          );
      }
    {
      let $ = Uc(
          -f + 0.155,
          f - 0.155,
          y1.P,
          y1.d,
          y1.fo,
          y1.sl,
          -f + 0.155 + 0.03,
        ),
        ue = la($, [x, 1.25, y], (ee, B, P) => [-(p - 0.014 + B), P, ee], {
          center: [0, r / 2, 0],
        }),
        me = -(p - 0.014);
      c.add(Jt, ue, (ee, B, P) => {
        let V = z(ee, B, P),
          Y = mn(0.008, 0.038, ee - me);
        return [
          V[0] * (1 - 0.17 * Y),
          V[1] * (1 - 0.18 * Y),
          V[2] * (1 - 0.18 * Y),
        ];
      });
    }
    {
      let $ = Uc(-p + 0.07, p - 0.13, x1.P, x1.d, x1.fo, x1.sl, -p + 0.1),
        ue = r - 0.008,
        me = la(
          $,
          o > 7 ? [-(f - 0.066), f - 0.066] : [-(f - 0.066), 0, f - 0.066],
          (ee, B, P) => [ee, ue + B + (Math.abs(P) < 0.01 ? 0.006 : 0), P],
          { center: [0, r / 2, 0] },
        );
      c.add(Jt, me, (ee, B, P) => {
        let V = 0.78 + 0.3 * ri(ee * 0.8 + S, P * 1.1),
          Y = mn(0.004, 0.018, ue - B);
        return [
          V * (1 - 0.25 * Y),
          V * (1 - 0.3 * Y) * 0.97,
          V * (1 - 0.32 * Y) * 0.94,
        ];
      });
    }
    let T = n > 0.03,
      D = 0.172;
    if (T) {
      let $ = (ee, B, P) => {
          let Y =
            (0.16 + 0.62 * mn(-p, p, ee) * mn(-p, p, ee)) *
            (0.8 + 0.2 * mn(0.2, 1.4, B));
          return [Y, Y, Y];
        },
        ue = Uc(v, g, Uo.P, Uo.d, Uo.fo, Uo.sl, v + 0.02);
      for (let ee of [-1, 1])
        c.add(
          Jt,
          la(ue, [D, y - 0.02], (B, P, V) => [B, V, ee * (d + P - 0.004)], {
            center: [0, r / 2, 0],
            inward: !0,
          }),
          $,
        );
      (c.add(
        Jt,
        je(cn(g - v, 2 * d), (v + g) / 2, y - 0.03, 0, [Math.PI / 2, 0, 0]),
        $,
      ),
        c.add(
          Jt,
          je(cn(2 * d, y - D), v + 0.03, (D + y) / 2, 0, [0, Math.PI / 2, 0]),
          $,
        ));
      let me = Nc(g - v + 0.1, 2 * d - 0.02);
      (c.add(
        h,
        je(me, (v + g) / 2 + 0.05, D, 0, [-Math.PI / 2, 0, 0]),
        (ee) => {
          let B = 0.3 + 0.6 * mn(-p, p, ee) ** 2;
          return [B, B * 0.97, B * 0.93];
        },
      ),
        c.box(u, 0.05, 0.006, 2 * d - 0.1, p - 0.11, D + 0.001, 0, {
          r: 0.002,
        }));
    }
    let C = 0.175,
      G = r - 0.124,
      j = G - C,
      N = f - 0.058 - 0.004,
      Q = p - 0.066,
      K = ($, ue, me) => z($, ue, me),
      ie = [];
    for (let $ of [1, -1]) {
      let ue = n * ($ > 0 ? 1 : 0.88) * bs.degToRad($ > 0 ? 112 : 100),
        me = $ * (f - 0.058);
      c.push(_o(Q, 0, me, [0, -$ * ue, 0]));
      let ee = (k) => -$ * k,
        B = (C + G) / 2;
      c.box(Jt, 0.034, j, N - 0.006, 0, B, ee(N / 2), { r: 0.008, col: K });
      let P = e === "container40hc" ? 7 : 6,
        V = C + 0.085,
        Y = G - 0.085,
        L = (Y - V) / P,
        Z = 0.019,
        J = 0.031,
        oe = [];
      for (let k = 0; k < P; k++) {
        let ce = V + k * L;
        oe.push(
          [ce, Z],
          [ce + 0.022, Z],
          [ce + 0.05, J],
          [ce + L - 0.05, J],
          [ce + L - 0.022, Z],
        );
      }
      (oe.push([Y, Z]),
        c.add(
          Jt,
          la(oe, [0.075, N - 0.085], (k, ce, ve) => [ce, k, ee(ve)], {
            center: [-1, B, ee(N / 2)],
          }),
          (k, ce, ve) => z(k, ce, ve),
        ));
      let fe = (k) => V + (k + 0.5) * L,
        le = [0.05, 0.05, 0.05];
      (c.box(Jt, 0.022, j + 0.012, 0.018, 0.004, B, ee(N + 0.001), {
        r: 0,
        col: le,
      }),
        c.box(Jt, 0.022, 0.016, N, 0.004, G + 0.004, ee(N / 2), {
          r: 0,
          col: le,
        }),
        c.box(Jt, 0.022, 0.016, N, 0.004, C - 0.004, ee(N / 2), {
          r: 0,
          col: le,
        }));
      let R = e === "container40hc" ? 5 : 4;
      for (let k = 0; k < R; k++) {
        let ce = C + 0.16 + (k * (j - 0.32)) / (R - 1);
        (c.box(Jt, 0.012, 0.062, 0.15, 0.021, ce, ee(0.085), { r: 0 }),
          c.cyl(u, 0.013, 0.013, 0.086, 0.026, ce, ee(-0.002), {
            seg: 6,
            open: !0,
          }));
      }
      for (let k of [0.31, 0.83]) {
        c.cyl(u, 0.0155, 0.0155, j + 0.2, 0.052, B, ee(k), {
          seg: 7,
          open: !0,
        });
        for (let Te of [-1, 1])
          (c.add(
            u,
            je(
              $e(0.03, 0.045, 0.085),
              0.052 - 0.004,
              B + Te * (j / 2 + 0.065),
              ee(k),
            ),
          ),
            c.box(
              Jt,
              0.03,
              0.05,
              0.075,
              0.052 - 0.012,
              B + Te * (j / 2 - 0.035),
              ee(k),
              { r: 0 },
            ));
        for (let Te of [C + j * 0.3, C + j * 0.72])
          c.box(Jt, 0.026, 0.04, 0.07, 0.052 - 0.012, Te, ee(k), { r: 0 });
        let ve = 1.02 + (k > 0.5 ? 0 : 0.13),
          _e = k > 0.5 ? -1 : 1;
        (c.box(u, 0.02, 0.05, 0.05, 0.052 + 0.008, ve, ee(k), { r: 0 }),
          c.box(u, 0.011, 0.032, 0.36, 0.052 + 0.016, ve, ee(k + _e * 0.19), {
            r: 0.004,
          }),
          c.box(Jt, 0.03, 0.07, 0.05, 0.052 - 0.008, ve, ee(k + _e * 0.33), {
            r: 0,
          }),
          c.box(
            u,
            0.012,
            0.085,
            0.012,
            0.052 + 0.012,
            ve + 0.005,
            ee(k + _e * 0.33),
            { r: 0 },
          ));
      }
      let I = 0.031 + 0.0025,
        se = [0, Math.PI / 2, 0],
        ae = (k, ce, ve, _e, Te) => {
          let Pe = ce * k.aspect;
          (Te && Pe > Te && ((ce *= Te / Pe), (Pe = Te)),
            c.add(k.material, je(cn(Pe, ce), I, ve, ee(_e), se), null, !0));
        };
      if ($ < 0) {
        (ae(
          Mi(i, v1[t % v1.length], {
            color: "white",
            font: "stencil",
            distress: 0.3,
          }),
          0.115,
          fe(P - 1),
          N / 2,
          N - 0.24,
        ),
          ae(
            Mi(i, a.type, { color: "white", font: "stencil", distress: 0.3 }),
            0.1,
            fe(P - 2),
            N / 2 + 0.2,
            0.4,
          ));
        let k = { color: "white", font: "sans", distress: 0.2 };
        (ae(
          Mi(i, "MAX GROSS " + a.gross + " KG", k),
          0.052,
          fe(P - 3) + 0.062,
          N / 2 - 0.01,
          0.44,
        ),
          ae(
            Mi(i, "TARE " + a.tare + " KG  NET " + a.net + " KG", k),
            0.045,
            fe(P - 3),
            N / 2 - 0.01,
            0.44,
          ),
          ae(
            Mi(i, "CAPACITY " + a.cu + " CU.M", k),
            0.045,
            fe(P - 3) - 0.062,
            N / 2 - 0.01,
            0.44,
          ));
      } else
        (ae(Jn(i, v3[t % 4]), 0.2, fe(P - 1), N / 2, N - 0.36),
          ae(Jn(i, "csc_plate"), 0.17, fe(1), N / 2 + 0.05, 0.36),
          e === "container40hc" &&
            ae(Jn(i, "caution_stripes"), 0.1, G - 0.04, N / 2, N - 0.1));
      if ((c.pop(), T))
        for (let k = 0; k < 3; k++) {
          let ce = (N * k) / 3,
            ve = (N * (k + 1)) / 3,
            _e = [Q + Math.sin(ue) * ce, me - $ * Math.cos(ue) * ce],
            Te = [Q + Math.sin(ue) * ve, me - $ * Math.cos(ue) * ve];
          ie.push({
            min: [
              Math.min(_e[0], Te[0]) - 0.03,
              C,
              Math.min(_e[1], Te[1]) - 0.03,
            ],
            max: [
              Math.max(_e[0], Te[0]) + 0.03,
              G,
              Math.max(_e[1], Te[1]) + 0.03,
            ],
            surface: "metal",
          });
        }
    }
    for (let $ of [1, -1])
      for (let ue of [0.31, 0.83])
        for (let me of [-1, 1]) {
          let ee = $ * (f - 0.058) - $ * ue;
          c.add(
            Jt,
            je($e(0.035, 0.05, 0.11), p - 0.03, me > 0 ? r - 0.07 : 0.115, ee),
          );
        }
    let F = ($, ue, me, ee, B, P) => {
        let V = B * $.aspect;
        P && V > P && ((B *= P / V), (V = P));
        let Y = me - V / 2,
          L = me + V / 2,
          Z = ue > 0 ? Y : -L,
          J = ue > 0 ? L : -Y,
          oe = Uc(
            Math.max(v, Z),
            Math.min(g, J),
            Uo.P,
            Uo.d,
            Uo.fo,
            Uo.sl,
            v + 0.02,
          ),
          fe = ee - B / 2,
          le = ee + B / 2,
          R = la(
            oe,
            [fe, le],
            (ae, k, ce) => [ae, ce, ue * (d + k + 0.003 - H(ae, ce, ue))],
            { center: [0, r / 2, 0] },
          ),
          I = R.attributes.position,
          se = R.attributes.uv;
        for (let ae = 0; ae < I.count; ae++) {
          let k = (I.getX(ae) - Z) / (J - Z);
          se.setXY(ae, ue > 0 ? k : 1 - k, (I.getY(ae) - fe) / B);
        }
        return (c.add($.material, R, null, !0), V);
      },
      X = Mi(i, v1[t % v1.length], {
        color: "white",
        font: "stencil",
        distress: 0.3,
      }),
      ne = Mi(i, a.type, { color: "white", font: "stencil", distress: 0.3 }),
      re = Jn(i, v3[t % 4]);
    for (let $ of [-1, 1]) {
      let ue = Math.min(r * 0.4, 1.05),
        me = Math.min(ue * re.aspect, e === "container20" ? 2.2 : 3.4);
      F(
        re,
        $,
        e === "container20" ? -0.75 : -p * 0.42,
        r * 0.52,
        me / re.aspect,
        me,
      );
      let ee = Math.min(0.14 * X.aspect, 1.9);
      F(X, $, p - 0.3 - ee / 2, r - 0.32, 0.14, 1.9);
      let B = Math.min(0.11 * ne.aspect, 0.6);
      F(ne, $, p - 0.3 - B / 2, r - 0.52, 0.11, 0.6);
      let P = Math.round((1 + l() * 2) * (0.4 + s) * (o > 7 ? 1.6 : 1));
      for (let V = 0; V < P; V++) {
        let Y = Jn(i, l() < 0.6 ? "rust_run" : "grime_streak"),
          L = 0.5 + l() * 0.7,
          Z = Math.min(0.5, Math.max(0.16, L * Y.aspect));
        F(
          { material: Y.material, aspect: Z / L },
          $,
          (l() * 2 - 1) * (p - 0.6),
          y - L / 2 - 0.005,
          L,
        );
      }
    }
    return (
      T
        ? ie.push(
            { min: [-p, 0, -f], max: [p, D, f], surface: "wood" },
            { min: [-p, r - 0.09, -f], max: [p, r, f], surface: "metal" },
            { min: [-p, 0, -f], max: [p, r, -f + 0.07], surface: "metal" },
            { min: [-p, 0, f - 0.07], max: [p, r, f], surface: "metal" },
            { min: [-p, 0, -f], max: [-p + 0.07, r, f], surface: "metal" },
          )
        : ie.push({ min: [-p, 0, -f], max: [p, r, f], surface: "metal" }),
      { parts: c.parts(), colliders: ie }
    );
  }

function M3(i, e, t = {}) {
    let n = _3[e],
      s = t.seed === void 0 ? 0 : Math.abs(Math.floor(t.seed)),
      o = s % IA,
      r = Math.round(bs.clamp(t.doors || 0, 0, 1) * 10) / 10,
      a = Math.round(bs.clamp(t.wear === void 0 ? 0.5 : t.wear, 0, 1) * 2) / 2,
      l = e + "|" + o + "|" + r + "|" + a,
      c = x3.get(i.mats);
    (c || ((c = new Map()), x3.set(i.mats, c)),
      c.has(l) || c.set(l, zA(i, e, o, r, a)));
    let u = c.get(l),
      h = t.color;
    jg.includes(h) ||
      (h = t.seed === void 0 ? n.def : jg[(s * 7 + 3) % jg.length]);
    let f = Zg(
        u.parts,
        new Map([[Jt, i.mats.get("paint_" + h, { vertexColors: !0 })]]),
      ),
      p = Gi[e];
    return (
      (f.userData.color = h),
      (f.userData.doors = r),
      qi(
        f,
        e,
        [p[0], p[1], p[2]],
        u.colliders.map((d) => ({
          min: d.min.slice(),
          max: d.max.slice(),
          surface: d.surface,
        })),
      )
    );
  }

var ca = (i) => Gi[i].slice(0, 3),
    hn = Math.PI;

function S3(i, e = {}) {
    let t = new jn(i),
      n = e.seed | 0,
      s = $a(n + 11),
      o = n * 3.7,
      r = t.M("concrete", { vertexColors: !0 }),
      a = [
        [-0.3, 0],
        [0.3, 0],
        [0.3, 0.076],
        [0.127, 0.33],
        [0.1, 0.57],
        [0.077, 0.79],
        [0.06, 0.81],
        [-0.06, 0.81],
        [-0.077, 0.79],
        [-0.1, 0.57],
        [-0.127, 0.33],
        [-0.3, 0.076],
      ],
      l = [-1.5, -1.47];
    for (let f = -1.25; f <= 1.26; f += 0.25) l.push(f);
    l.push(1.47, 1.5);
    let c = [];
    for (let f = 0; f < 7; f++)
      c.push([
        (s() * 2 - 1) * 1.5,
        s() * 0.8,
        0.08 + s() * 0.14,
        s() < 0.5 ? 1 : -1,
      ]);
    let u = la(
      a,
      l,
      (f, p, d) => {
        let v = Math.abs(d) > 1.49 ? 1 : 0;
        return [d, p - v * 0.022 * (p / 0.81), f * (1 - v * 0.09)];
      },
      { closed: !0, caps: !0 },
    );
    t.add(r, u, (f, p, d) => {
      let v =
          0.86 +
          0.2 * ri(f * 1.3 + o, p * 3 + d * 2) +
          0.08 * ri(f * 7, p * 9 + o),
        g = [v, v * 0.99, v * 0.97];
      g = Ir(g, [v * 0.5, v * 0.48, v * 0.44], mn(0.3, 0, p) * 0.8);
      let x = mn(0.55, 0.8, ri(f * 4.5 + o, 3.3)) * mn(0.25, 0.8, p);
      g = Ir(g, [v * 0.62, v * 0.6, v * 0.56], x * 0.6);
      let y =
        mn(0.6, 0.85, ri(f * 2.1 + o * 2, d * 3)) *
        mn(0.2, 0.33, p) *
        mn(0.62, 0.4, p);
      g = Ir(g, [0.22, 0.22, 0.22], y * 0.65);
      for (let b of c)
        if (Math.sign(d || 1) === b[3]) {
          let m = Math.hypot(f - b[0], p - b[1]) / b[2];
          m < 1 && (g = Ir(g, [1.12, 1.1, 1.05], (1 - m) * 0.7));
        }
      return (
        Math.abs(f) > 1.4 &&
          (g = Ir(g, [1.08, 1.06, 1.02], 0.4 * ri(p * 9, d * 9 + o))),
        g
      );
    });
    let h = [0.05, 0.05, 0.05];
    for (let f of [-1, 1])
      for (let p of [-0.85, 0.85])
        (t.add(
          r,
          je(cn(0.3, 0.058), p, 0.03, f * 0.3008, [0, f > 0 ? 0 : hn, 0]),
          h,
        ),
          t.box(r, 0.34, 0.012, 0.012, p, 0.064, f * 0.3, {
            r: 0.003,
            col: [0.7, 0.7, 0.68],
          }));
    for (let f of [-0.9, 0.9])
      t.tube(
        t.M("steel_rust"),
        [
          [f - 0.05, 0.8, 0],
          [f - 0.04, 0.85, 0],
          [f + 0.04, 0.85, 0],
          [f + 0.05, 0.8, 0],
        ],
        0.008,
        { seg: 5 },
      );
    if (e.stripe) {
      let f = t.M("hazard_stripes");
      t.add(f, je(Nc(2.9, 0.118), 0, 0.8125, 0, [-hn / 2, 0, 0]));
      for (let p of [-1, 1])
        t.add(
          f,
          je(Nc(2.9, 0.2), 0, 0.68, p * 0.0905, [
            p > 0 ? -0.108 : 0.108,
            p > 0 ? 0 : hn,
            0,
          ]),
        );
    }
    return qi(t.group(), "jersey_barrier", ca("jersey_barrier"), [
      { min: [-1.5, 0, -0.3], max: [1.5, 0.33, 0.3], surface: "concrete" },
      { min: [-1.5, 0.33, -0.13], max: [1.5, 0.81, 0.13], surface: "concrete" },
    ]);
  }

function w3(i, e, t, n, s, o, r, a, l) {
    (i.push(_o(s, o, r, [0, a, 0])),
      i.push(_o(0, 0, 0, [0, 0, l])),
      i.box(t, 0.1, 0.34, 0.46, 0.09, 0, 0, { r: 0.014 }),
      i.add(n, je(cn(0.4, 0.28), 0.1415, 0, 0, [0, hn / 2, 0]), null, !0),
      i.box(t, 0.012, 0.018, 0.47, 0.146, 0.156, 0, { r: 0 }),
      i.box(t, 0.012, 0.018, 0.47, 0.146, -0.156, 0, { r: 0 }),
      i.box(t, 0.012, 0.33, 0.018, 0.146, 0, 0.222, { r: 0 }),
      i.box(t, 0.012, 0.33, 0.018, 0.146, 0, -0.222, { r: 0 }),
      i.box(t, 0.09, 0.008, 0.48, 0.17, 0.175, 0, {
        r: 0,
        rot: [0, 0, -0.12],
      }));
    for (let c = -3; c <= 3; c++)
      i.add(t, je($e(0.045, 0.3, 0.008), 0.02, 0, c * 0.062));
    (i.pop(), i.box(e, 0.03, 0.05, 0.56, 0.02, -0.02, 0, { r: 0.004 }));
    for (let c of [-1, 1])
      i.box(e, 0.1, 0.05, 0.012, 0.05, -0.02, c * 0.275, {
        r: 0,
        rot: [0, 0, l * 0.5],
      });
    i.pop();
  }

function T3(i, e = {}) {
    let t = new jn(i),
      n = t.M("steel_galv"),
      s = t.M("concrete", { vertexColors: !0 }),
      o = t.M("steel_dark"),
      r = i.mats.emissive(16769981, e.on === !1 ? 0.02 : 8);
    (t.box(s, 0.8, 0.32, 0.8, 0, 0.16, 0, {
      r: 0.03,
      col: (x, y, b) => {
        let m = 0.62 + 0.36 * mn(0, 0.3, y) + 0.1 * ri(x * 5, b * 5);
        return [m, m, m * 0.97];
      },
    }),
      t.box(n, 0.5, 0.03, 0.5, 0, 0.335, 0, { r: 0.006 }));
    for (let x = 0; x < 8; x++) {
      let y = ((x + 0.5) * hn) / 4,
        b = Math.cos(y) * 0.215,
        m = Math.sin(y) * 0.215;
      (t.cyl(n, 0.014, 0.014, 0.1, b, 0.38, m, { seg: 6 }),
        t.cyl(n, 0.027, 0.027, 0.024, b, 0.362, m, { seg: 6, flat: !0 }));
    }
    let a = 0.35,
      l = 13.3,
      c = 0.168,
      u = 0.07,
      h = (x) => c + ((u - c) * (x - a)) / (l - a),
      f = [
        [a, 4.75, 0],
        [4.6, 9.15, 0.007],
        [9, l, 0.014],
      ];
    for (let [x, y, b] of f)
      t.cyl(n, h(y) + b, h(x) + b, y - x, 0, (x + y) / 2, 0, {
        seg: 8,
        flat: !0,
        open: !0,
        rot: [0, hn / 8, 0],
      });
    for (let x = 0; x < 4; x++) {
      let y = (x * hn) / 2;
      t.box(n, 0.012, 0.2, 0.12, Math.cos(y) * 0.2, 0.45, -Math.sin(y) * 0.2, {
        r: 0,
        rot: [0, y + hn / 2, 0],
      });
    }
    (t.cyl(n, 0.2, 0.2, 0.02, 0, 0.36, 0, { seg: 8, rot: [0, hn / 8, 0] }),
      t.cyl(n, 0.09, 0.09, 0.03, 0, l, 0, { seg: 8, rot: [0, hn / 8, 0] }));
    let p = h(1.05) * 0.924;
    (t.box(n, 0.13, 0.52, 0.012, 0, 1.05, p + 0.005, { r: 0.004 }),
      t.box(o, 0.03, 0.045, 0.012, 0.04, 1.05, p + 0.013, { r: 0.003 }),
      t.decal(Jn(i, "hazard_voltage"), 0.09, -0.01, 1.2, p + 0.0125, null),
      t.tube(
        o,
        [
          [-0.3, 0.3, 0.28],
          [-0.3, 0.52, 0.28],
          [-0.24, 0.72, 0.2],
          [-0.1, 0.8, 0.1],
        ],
        0.024,
        { seg: 6 },
      ),
      t.cyl(o, 0.034, 0.034, 0.03, -0.3, 0.335, 0.28, { seg: 8 }),
      t.bar(n, [0.1, 3, -0.13], [0.42, 3, -0.13], 0.012),
      t.bar(n, [0.1, 3, 0.13], [0.42, 3, 0.13], 0.012),
      t.bar(n, [0.42, 3, -0.16], [0.42, 3, 0.16], 0.012, { caps: !0 }),
      t.bar(n, [0.42, 3, -0.13], [0.42, 3.09, -0.13], 0.012, { caps: !0 }),
      t.bar(n, [0.42, 3, 0.13], [0.42, 3.09, 0.13], 0.012, { caps: !0 }),
      t.cyl(n, h(3) + 0.012, h(3) + 0.012, 0.05, 0, 3, 0, {
        seg: 8,
        rot: [0, hn / 8, 0],
      }));
    let d = 0;
    for (let x = 3.45; x < 12.9; x += 0.38, d++) {
      let y = d % 2 ? 1 : -1;
      t.bar(n, [0, x, y * h(x) * 0.8], [0, x, y * (h(x) + 0.15)], 0.009, {
        seg: 5,
        caps: !0,
      });
    }
    let v = l + 0.12;
    (t.box(n, 0.1, 0.1, 1.9, 0, v, 0, { r: 0.012 }),
      t.box(n, 0.5, 0.07, 0.07, 0, v + 0.085, 0.55, { r: 0.01 }),
      t.box(n, 0.5, 0.07, 0.07, 0, v + 0.085, -0.55, { r: 0.01 }),
      t.beam(n, [0, l - 0.5, 0.08], [0, v - 0.03, 0.7], 0.04, 0.04),
      t.beam(n, [0, l - 0.5, -0.08], [0, v - 0.03, -0.7], 0.04, 0.04));
    for (let x of [-0.55, 0.55])
      (w3(t, n, o, r, 0.22, v - 0.14, x, 0, -0.62),
        w3(t, n, o, r, -0.22, v - 0.14, x, hn, -0.62));
    (t.box(o, 0.16, 0.2, 0.12, 0, l - 0.25, -0.14, { r: 0.01 }),
      t.bar(n, [0, v, 0], [0, 14, 0], 0.012, { r2: 0.003, seg: 5, caps: !0 }));
    let g = t.group();
    g.userData.lamps = [];
    for (let x of [-0.55, 0.55])
      for (let y of [-1, 1])
        g.userData.lamps.push({
          pos: [y * 0.34, v - 0.22, x],
          dir: [y * 0.81, -0.58, 0],
          color: 16769981,
        });
    return qi(g, "light_mast", ca("light_mast"), [
      { min: [-0.4, 0, -0.4], max: [0.4, 0.32, 0.4], surface: "concrete" },
      { min: [-0.17, 0.32, -0.17], max: [0.17, 14, 0.17], surface: "metal" },
    ]);
  }

function A3(i, e = {}) {
    let t = new jn(i),
      n = $a((e.seed | 0) + 5),
      s = t.M("steel_galv"),
      o = t.M("concrete", { vertexColors: !0 }),
      r = t.M("chainlink", { doubleSide: !0 }),
      a = e.posts || "both",
      l = e.lean === 1 ? 1 : -1,
      c =
        a === "both"
          ? [-1.5, 1.5]
          : a === "left"
            ? [-1.5]
            : a === "right"
              ? [1.5]
              : [];
    for (let p of c) {
      (t.box(o, 0.32, 0.09, 0.32, p, 0.035, 0, {
        r: 0.02,
        col: (d, v) => {
          let g = 0.6 + 0.4 * mn(0, 0.08, v);
          return [g, g, g];
        },
      }),
        t.cyl(s, 0.03, 0.03, 2.02, p, 1.05, 0, { seg: 8, open: !0 }),
        t.cyl(s, 0.05, 0.05, 0.012, p, 0.086, 0, { seg: 8 }),
        t.bar(s, [p, 2.02, 0], [p, 2.4 - 0.02, l * 0.36], 0.019, {
          seg: 6,
          caps: !0,
        }),
        t.cyl(s, 0.034, 0.034, 0.05, p, 2.03, 0, { seg: 8 }));
      for (let d of [0.2, 1.05, 1.9])
        t.cyl(s, 0.034, 0.034, 0.03, p, d, 0, { seg: 8, open: !0 });
    }
    t.bar(s, [-1.5, 2, 0.036], [1.5, 2, 0.036], 0.021, { seg: 7 });
    for (let p of [0.09, 1.02])
      t.bar(s, [-1.5, p, 0.012], [1.5, p, 0.012], 0.0035, { seg: 4 });
    (t.box(s, 0.008, 1.9, 0.02, -1.462, 1.03, 0.012, { r: 0 }),
      t.box(s, 0.008, 1.9, 0.02, 1.462, 1.03, 0.012, { r: 0 }));
    let u = new rn(2.92, 1.93, 6, 3),
      h = u.attributes.position,
      f = u.attributes.uv;
    for (let p = 0; p < h.count; p++) {
      let d = h.getX(p),
        v = h.getY(p);
      (f.setXY(p, d + 1.5, v + 1),
        h.setZ(
          p,
          0.012 +
            0.02 *
              (ri(d * 1.3 + (e.seed | 0), v * 1.5) - 0.5) *
              (1 - Math.abs(d) / 1.46),
        ));
    }
    (u.computeVertexNormals(), t.add(r, je(u, 0, 1.025, 0)));
    for (let p = 0; p < 3; p++) {
      let d = 0.3 + p * 0.33,
        v = 2.02 + d * 0.36,
        g = l * d * 0.36;
      t.bar(s, [-1.5, v, g], [1.5, v, g], 0.0032, { seg: 4 });
      for (let x = -1.42 + (p % 2) * 0.09; x < 1.45; x += 0.18)
        t.add(s, je($e(0.004, 0.032, 0.004), x, v, g, [n() * 3, 0, 0.8 + n()]));
    }
    for (let p = 0; p < 5; p++)
      t.add(s, je($e(0.012, 0.012, 0.03), -1.2 + p * 0.6, 2, 0.02));
    return qi(t.group(), "fence_panel", ca("fence_panel"), [
      { min: [-1.5, 0, -0.04], max: [1.5, 2.4, 0.04], surface: "metal" },
    ]);
  }

function R3(i, e = {}) {
    let t = new jn(i),
      n = e.seed | 0,
      s = n * 1.3,
      o = 2.6,
      r = 2.2,
      a = o / 2,
      l = r / 2,
      c = t.M(
        "paint_" +
          (["white", "grey", "teal"].includes(e.color) ? e.color : "white"),
        { vertexColors: !0 },
      ),
      u = t.M("steel_dark"),
      h = t.M("steel_galv"),
      f = t.M("glass", { doubleSide: !0 }),
      p = t.M("wood_dark"),
      d = t.M("polymer_black"),
      v = (H, O, q) => {
        let U =
          (0.9 + 0.14 * ri(H * 2 + s, O * 2 + q)) *
          (0.6 + 0.4 * mn(0.1, 0.7, O)) *
          (1 - 0.25 * mn(2.25, 2.45, O));
        return [U, U * 0.985, U * 0.96];
      };
    t.defCol.set(c, v);
    let g = 0.12,
      x = 1,
      y = 2.08,
      b = 2.42;
    t.box(u, o, 0.12, r, 0, 0.06, 0, { r: 0.015 });
    for (let H of [-0.7, 0.7])
      t.box(u, o + 0.06, 0.06, 0.1, 0, 0.03, H, { r: 0.01 });
    for (let H of [-1, 1])
      for (let O of [-1, 1])
        t.box(
          c,
          0.09,
          b - g,
          0.09,
          H * (a - 0.045),
          (b + g) / 2,
          O * (l - 0.045),
          { r: 0.012 },
        );
    let m = 0.3,
      A = 1.12,
      _ = (H, O) => {
        let q = O > 0 ? [[-a + 0.09, m - 0.04]] : [[-a + 0.09, a - 0.09]];
        for (let [U, T] of q) {
          (t.box(c, T - U, x - g, 0.05, (U + T) / 2, (x + g) / 2, H, {
            r: 0.006,
          }),
            t.box(c, T - U, 0.05, 0.075, (U + T) / 2, x + 0.01, H + O * 0.005, {
              r: 0.008,
            }),
            t.box(
              f,
              T - U,
              y - x - 0.03,
              0.008,
              (U + T) / 2,
              (x + y) / 2 + 0.01,
              H,
              { r: 0 },
            ));
          let D = T - U > 1.6 ? 2 : 1;
          for (let C = 1; C <= D; C++)
            t.box(
              c,
              0.04,
              y - x,
              0.05,
              U + ((T - U) * C) / (D + 1),
              (x + y) / 2,
              H,
              { r: 0.006 },
            );
          for (let C = 1; C < 3; C++)
            t.box(
              c,
              0.006,
              x - g - 0.04,
              0.056,
              U + ((T - U) * C) / 3,
              (x + g) / 2,
              H,
              { r: 0 },
            );
        }
        t.box(c, o - 0.18, b - y, 0.05, 0, (b + y) / 2, H, { r: 0.006 });
      };
    (_(l - 0.03, 1), _(-l + 0.03, -1));
    for (let H of [-1, 1]) {
      let O = H * (a - 0.03);
      (t.box(c, 0.05, x - g, r - 0.18, O, (x + g) / 2, 0, { r: 0.006 }),
        t.box(c, 0.075, 0.05, r - 0.18, O + H * 0.005, x + 0.01, 0, {
          r: 0.008,
        }),
        t.box(f, 0.008, y - x - 0.03, r - 0.18, O, (x + y) / 2 + 0.01, 0, {
          r: 0,
        }),
        t.box(c, 0.05, y - x, 0.04, O, (x + y) / 2, 0, { r: 0.006 }),
        t.box(c, 0.05, b - y, r - 0.18, O, (b + y) / 2, 0, { r: 0.006 }));
    }
    let M = l - 0.03;
    (t.box(c, 0.05, y - g, 0.07, m - 0.015, (y + g) / 2, M, { r: 0.006 }),
      t.box(c, 0.05, y - g, 0.07, A + 0.015, (y + g) / 2, M, { r: 0.006 }),
      t.box(
        c,
        a - 0.09 - A - 0.04,
        y - g,
        0.05,
        (a - 0.09 + A + 0.04) / 2,
        (y + g) / 2,
        M,
        { r: 0.006 },
      ));
    let E = A - m - 0.02,
      w = (m + A) / 2;
    (t.box(c, E, x - g - 0.01, 0.04, w, (x + g) / 2, M + 0.005, { r: 0.006 }),
      t.box(c, E, 0.07, 0.04, w, y - 0.04, M + 0.005, { r: 0.006 }));
    for (let H of [-1, 1])
      t.box(
        c,
        0.07,
        y - x,
        0.04,
        w + H * (E / 2 - 0.035),
        (x + y) / 2,
        M + 0.005,
        { r: 0.006 },
      );
    (t.box(f, E - 0.12, y - x - 0.08, 0.008, w, (x + y) / 2 - 0.02, M + 0.005, {
      r: 0,
    }),
      t.box(h, E - 0.06, 0.22, 0.004, w, g + 0.14, M + 0.027, { r: 0 }),
      t.box(h, 0.03, 0.14, 0.02, m + 0.09, 1.05, M + 0.035, { r: 0.004 }),
      t.bar(h, [m + 0.09, 1, M + 0.06], [m + 0.2, 1, M + 0.06], 0.009, {
        caps: !0,
      }));
    for (let H of [0.4, 1.75])
      t.cyl(h, 0.012, 0.012, 0.1, A + 0.002, H, M + 0.03, { seg: 6 });
    (t.box(u, 0.9, 0.03, 0.3, w, 0.105, l + 0.15, { r: 0.006 }),
      t.box(c, o + 0.36, 0.1, r + 0.4, 0, b + 0.05, 0, {
        r: 0.02,
        col: (H, O, q) => {
          let U = 0.72 + 0.2 * ri(H * 1.5, q * 1.5 + s);
          return [U, U, U * 0.97];
        },
      }),
      t.box(u, o + 0.3, 0.03, r + 0.34, 0, b + 0.112, 0, { r: 0.01 }));
    for (let H of [-1, 1])
      t.box(h, o + 0.36, 0.06, 0.08, 0, b - 0.005, H * (l + 0.2 + 0.03), {
        r: 0.012,
      });
    t.tube(
      h,
      [
        [-a - 0.16, b - 0.03, l + 0.23],
        [-a - 0.1, b - 0.2, l + 0.1],
        [-a - 0.03, b - 0.4, l + 0.03],
        [-a - 0.03, 0.2, l + 0.03],
        [-a - 0.1, 0.06, l + 0.1],
      ],
      0.03,
      { seg: 6, tension: 0.2 },
    );
    let S = -a - 0.17;
    (t.box(c, 0.3, 0.52, 0.78, S, 0.62, -0.25, { r: 0.02 }),
      t.add(
        c,
        je(pr(0.44, 0.44, 6), S - 0.151, 0.62, -0.14, [0, -hn / 2, 0]),
        [0.06, 0.06, 0.06],
      ));
    for (let H = -3; H <= 3; H++)
      t.add(
        u,
        je(
          $e(0.006, 0.008, Math.sqrt(0.22 * 0.22 - (H * 0.06) ** 2) * 2),
          S - 0.154,
          0.62 + H * 0.06,
          -0.14,
        ),
      );
    t.cyl(u, 0.05, 0.05, 0.012, S - 0.156, 0.62, -0.14, {
      seg: 8,
      rot: [0, 0, hn / 2],
    });
    for (let H of [-0.55, 0.05])
      t.beam(u, [-a, 0.32, H], [S - 0.1, 0.34, H], 0.03, 0.03, { r: 0 });
    (t.tube(
      t.M("rubber"),
      [
        [S + 0.05, 0.86, 0.14],
        [S + 0.06, 1, 0.2],
        [-a - 0.02, 1.25, 0.24],
        [-a - 0.02, 2.2, 0.24],
      ],
      0.014,
      { seg: 5 },
    ),
      t.add(
        t.M("floor_epoxy"),
        je(Nc(o - 0.1, r - 0.1), 0, 0.122, 0, [-hn / 2, 0, 0]),
      ),
      t.box(p, 0.6, 0.04, r - 0.3, -a + 0.4, 0.76, 0, { r: 0.008 }));
    for (let H of [-0.85, 0.85])
      t.box(u, 0.5, 0.64, 0.03, -a + 0.4, 0.44, H, { r: 0.005 });
    (t.box(d, 0.05, 0.32, 0.5, -a + 0.3, 1.02, -0.3, {
      r: 0.01,
      rot: [0, 0.25, 0],
    }),
      t.add(
        i.mats.emissive(9418984, 1.6),
        je(cn(0.45, 0.27), -a + 0.3 + 0.027, 1.02, -0.3 - 0.007, [
          0,
          hn / 2 + 0.25,
          0,
        ]),
        null,
        !0,
      ),
      t.box(d, 0.05, 0.1, 0.06, -a + 0.28, 0.83, -0.3, { r: 0.008 }),
      t.box(d, 0.18, 0.015, 0.22, -a + 0.28, 0.787, -0.3, { r: 0.004 }),
      t.box(d, 0.14, 0.02, 0.42, -a + 0.52, 0.79, -0.25, { r: 0.004 }),
      t.box(d, 0.46, 0.07, 0.46, -a + 1, 0.5, -0.2, {
        r: 0.02,
        rot: [0, 0.3, 0],
      }),
      t.box(d, 0.07, 0.55, 0.42, -a + 1.22, 0.86, -0.13, {
        r: 0.02,
        rot: [0, 0.3, -0.12],
      }),
      t.cyl(u, 0.025, 0.025, 0.36, -a + 1, 0.3, -0.2, { seg: 6 }));
    for (let H = 0; H < 5; H++) {
      let O = H * hn * 0.4;
      t.beam(
        u,
        [-a + 1, 0.16, -0.2],
        [-a + 1 + Math.cos(O) * 0.26, 0.14, -0.2 + Math.sin(O) * 0.26],
        0.03,
        0.025,
        { r: 0 },
      );
    }
    (t.box(u, 0.2, 0.07, 0.1, w, y + 0.19, l + 0.03, { r: 0.012 }),
      t.add(
        i.mats.emissive(16767398, e.on === !1 ? 0.02 : 5),
        je(cn(0.17, 0.05), w, y + 0.152, l + 0.035, [hn / 2, 0, 0]),
        null,
        !0,
      ),
      t.decal(
        Mi(i, "ACCESS CONTROL", {
          color: "black",
          font: "stencil",
          distress: 0.2,
        }),
        0.1,
        -0.45,
        (b + y) / 2,
        l - 0.003,
        null,
        0.9,
      ),
      t.decal(Jn(i, "berth4"), 0.34, a - 0.003, 0.56, 0.3, [0, hn / 2, 0]),
      t.decal(Jn(i, "no_entry"), 0.2, w, 0.72, M + 0.0265, null),
      t.decal(Jn(i, "grime_streak"), 0.7, -0.6, 0.55, l - 0.003, null, 0.3),
      t.decal(
        Jn(i, "rust_run"),
        0.6,
        -a + 0.003 - 0,
        0.6,
        0.55,
        [0, -hn / 2, 0],
        0.25,
      ));
    let z = t.group();
    return (
      (z.userData.lamps = [
        { pos: [w, y + 0.14, l + 0.04], dir: [0, -1, 0.2], color: 16767398 },
      ]),
      qi(z, "guard_booth", ca("guard_booth"), [
        { min: [-a, 0, -l], max: [a, 2.54, l], surface: "metal" },
      ])
    );
  }

function C3(i, e = {}) {
    let t = new jn(i),
      n = bs.clamp(e.open || 0, 0, 1),
      s = t.M("paint_orange", { vertexColors: !0 }),
      o = t.M("paint_white"),
      r = t.M("paint_red"),
      a = t.M("steel_dark"),
      l = t.M("steel_galv"),
      c = t.M("paint_yellow"),
      u = -2.5 + 0.19,
      h = 0.92;
    (t.box(t.M("concrete"), 0.5, 0.06, 0.46, u, 0.03, 0, { r: 0.015 }),
      t.box(s, 0.36, 1, 0.3, u, 0.56, 0, {
        r: 0.02,
        col: (y, b) => {
          let m = 0.6 + 0.4 * mn(0.05, 0.5, b);
          return [m, m, m];
        },
      }),
      t.box(a, 0.4, 0.04, 0.34, u, 1.075, 0, { r: 0.012 }),
      t.box(s, 0.3, 0.6, 0.012, u, 0.5, 0.151, {
        r: 0.004,
        col: [0.9, 0.9, 0.9],
      }),
      t.cyl(l, 0.012, 0.012, 0.016, u + 0.1, 0.5, 0.16, {
        seg: 6,
        rot: [hn / 2, 0, 0],
      }),
      t.decal(Jn(i, "hazard_general"), 0.14, u, 0.9, 0.153, null),
      t.decal(Jn(i, "caution_stripes"), 0.08, u, 0.12, 0.153, null, 0.34),
      t.cyl(a, 0.03, 0.03, 0.05, u, 1.12, 0, { seg: 8 }),
      t.add(
        i.mats.emissive(16734750, 2.2),
        je(ot(0.026, 0.026, 0.045, 8), u, 1.165, 0),
        null,
        !0,
      ),
      t.push(_o(u, h, 0, [0, 0, n * 1.48])),
      t.cyl(a, 0.075, 0.075, 0.36, 0, 0, 0, { seg: 10, rot: [hn / 2, 0, 0] }));
    for (let y of [-1, 1])
      t.box(a, 0.62, 0.11, 0.012, 0.05, 0, y * 0.175, { r: 0.004 });
    t.box(a, 0.3, 0.16, 0.3, -0.33, -0.02, 0, { r: 0.02 });
    let f = 4.62,
      p = 0.12,
      d = 9,
      v = f / d;
    for (let y = 0; y < d; y++)
      t.box(
        y % 2 ? o : r,
        v + 0.001,
        0.1 - y * 0.003,
        0.05,
        p + v * (y + 0.5),
        0,
        0,
        { r: 0.008 },
      );
    (t.box(a, 0.03, 0.11, 0.06, p + f + 0.012, 0, 0, { r: 0.008 }),
      t.add(
        i.mats.emissive(16722450, 1.5),
        je($e(0.05, 0.03, 0.054), p + f - 0.5, 0.058, 0),
        null,
        !0,
      ),
      t.pop());
    let g = 2.5 - 0.1;
    (t.box(t.M("concrete"), 0.3, 0.05, 0.3, g, 0.025, 0, { r: 0.012 }),
      t.cyl(c, 0.04, 0.04, 0.8, g, 0.45, 0, { seg: 8 }),
      t.box(c, 0.14, 0.02, 0.16, g, 0.855, 0, { r: 0.005 }));
    for (let y of [-1, 1])
      t.box(c, 0.14, 0.14, 0.014, g, 0.93, y * 0.073, { r: 0.004 });
    t.cyl(l, 0.07, 0.07, 0.01, g, 0.055, 0, { seg: 8 });
    let x = [
      { min: [u - 0.2, 0, -0.17], max: [u + 0.2, 1.1, 0.17], surface: "metal" },
      { min: [g - 0.07, 0, -0.08], max: [g + 0.07, 1, 0.08], surface: "metal" },
    ];
    return (
      n < 0.5 &&
        x.push({
          min: [u, h - 0.07, -0.04],
          max: [g, h + 0.07, 0.04],
          surface: "metal",
        }),
      qi(t.group(), "gate_arm", ca("gate_arm"), x)
    );
  }

function P3(i, e = {}) {
    let t = new jn(i),
      n = (e.seed | 0) * 2.1,
      s = t.M("steel_dark", { vertexColors: !0 }),
      o = t.M("steel_rust"),
      r = (a, l, c) => {
        let u = mn(0.3, 0.4, l) * mn(0.47, 0.4, l),
          h = 0.75 + 0.4 * ri(a * 6 + n, c * 6 + l * 4) + u * 0.9;
        return [h, h * 0.97, h * 0.93];
      };
    (t.defCol.set(s, r),
      t.cyl(s, 0.34, 0.35, 0.045, 0, 0.0225, 0, { seg: 20 }),
      t.cyl(o, 0.37, 0.37, 0.006, 0, 0.003, 0, { seg: 20 }));
    for (let a = 0; a < 6; a++) {
      let l = (a * hn) / 3 + 0.3;
      (t.cyl(
        o,
        0.026,
        0.026,
        0.03,
        Math.cos(l) * 0.285,
        0.058,
        Math.sin(l) * 0.285,
        { seg: 6, flat: !0 },
      ),
        t.cyl(
          o,
          0.013,
          0.013,
          0.022,
          Math.cos(l) * 0.285,
          0.08,
          Math.sin(l) * 0.285,
          { seg: 6 },
        ));
    }
    (t.add(
      s,
      g1(
        [
          [0.25, 0.045],
          [0.21, 0.08],
          [0.165, 0.16],
          [0.145, 0.27],
          [0.15, 0.36],
          [0.17, 0.43],
          [0.19, 0.5],
          [0.17, 0.57],
          [0.1, 0.6],
          [0, 0.602],
        ],
        18,
      ),
    ),
      t.cyl(s, 0.105, 0.115, 0.5, 0, 0.485, 0, {
        seg: 14,
        open: !0,
        rot: [0, 0, hn / 2],
      }));
    for (let a of [-1, 1]) {
      let l = mr(0.108, 14, 8);
      (l.scale(0.55, 1, 1),
        t.add(s, je(l, a * 0.25, 0.485, 0)),
        t.cyl(s, 0.125, 0.125, 0.03, a * 0.235, 0.485, 0, {
          seg: 14,
          rot: [0, 0, hn / 2],
        }));
    }
    return qi(t.group(), "bollard_mooring", ca("bollard_mooring"), [
      { min: [-0.3, 0, -0.22], max: [0.3, 0.6, 0.22], surface: "metal" },
    ]);
  }

function I3(i, e = {}) {
    let t = new jn(i),
      n = (e.seed | 0) * 1.7,
      s = t.M("paint_yellow", { vertexColors: !0 }),
      o = t.M("steel_galv"),
      r = 0.083,
      a = (u) => (u > 0.6 && u < 0.69) || (u > 0.78 && u < 0.87),
      l = [
        0.012, 0.3, 0.6, 0.6001, 0.69, 0.6901, 0.78, 0.7801, 0.87, 0.8701,
        0.955,
      ];
    for (let u = 0; u < l.length - 1; u++) {
      let h = l[u],
        f = l[u + 1];
      if (f - h < 0.001) continue;
      let p = a((h + f) / 2);
      t.cyl(s, r, r, f - h, 0, (h + f) / 2, 0, {
        seg: 14,
        open: !0,
        col: (d, v, g) => {
          if (p) return [0.05, 0.05, 0.05];
          let x =
            (0.55 + 0.45 * mn(0, 0.35, v)) *
            (0.9 + 0.2 * ri(d * 30 + n, v * 6 + g * 30));
          return [x, x * 0.97, x * 0.9];
        },
      });
    }
    let c = mr(r, 14, 5, hn * 2, 0, hn / 2);
    (c.scale(1, 0.55, 1),
      t.add(s, je(c, 0, 0.955, 0), [0.95, 0.93, 0.88]),
      t.cyl(o, 0.085, 0.085, 0.012, 0, 0.006, 0, {
        seg: 4,
        rot: [0, hn / 4, 0],
      }),
      t.box(o, 0.17, 0.012, 0.17, 0, 0.006, 0, { r: 0.004 }));
    for (let u of [-1, 1])
      for (let h of [-1, 1])
        t.cyl(o, 0.011, 0.011, 0.012, u * 0.066, 0.017, h * 0.066, { seg: 6 });
    return (
      t.cyl(s, r + 0.006, r + 0.006, 0.02, 0, 0.022, 0, {
        seg: 14,
        open: !0,
        col: [0.5, 0.48, 0.42],
      }),
      qi(t.group(), "bollard_post", ca("bollard_post"), [
        { min: [-0.085, 0, -0.085], max: [0.085, 1, 0.085], surface: "metal" },
      ])
    );
  }

var Jg = [
      "hazard_general",
      "no_entry",
      "hazard_voltage",
      "berth4",
      "arrow",
      "hazard_flammable",
    ],
    E3 = [
      "AUTHORIZED PERSONNEL ONLY",
      "NO PEDESTRIANS",
      "PPE REQUIRED: VEST & HARD HAT",
      "AUTONOMOUS VEHICLES ACTIVE",
      "KEEP CLEAR",
    ];

function z3(i, e = {}) {
    let t = new jn(i),
      n = e.seed | 0,
      s = t.M("steel_galv"),
      o = t.M("aluminium"),
      r = t.M("paint_white"),
      a = t.M("paint_yellow"),
      l = Jg.includes(e.sign) ? e.sign : Jg[n % Jg.length];
    (t.box(t.M("concrete"), 0.3, 0.07, 0.3, 0, 0.03, 0, { r: 0.015 }),
      t.box(s, 0.05, 2.38, 0.05, 0, 1.2, 0, { r: 0.006 }),
      t.box(s, 0.058, 0.012, 0.058, 0, 2.395, 0, { r: 0.004 }),
      t.box(s, 0.13, 0.012, 0.13, 0, 0.07, 0, { r: 0.003 }));
    let c = ((n % 5) - 2) * 0.006;
    (t.push(_o(0, 0, 0, [0, 0, c])),
      t.box(o, 0.6, 0.6, 0.004, 0, 2.02, 0.031, { r: 0.0015 }),
      t.box(l.startsWith("hazard") ? a : r, 0.58, 0.58, 0.002, 0, 2.02, 0.034, {
        r: 8e-4,
      }),
      t.decal(Jn(i, l), 0.5, 0, 2.02, 0.0362, null, 0.5),
      t.box(o, 0.6, 0.22, 0.004, 0, 1.56, 0.031, { r: 0.0015 }),
      t.box(r, 0.58, 0.2, 0.002, 0, 1.56, 0.034, { r: 8e-4 }),
      t.decal(
        Mi(i, e.text || E3[n % E3.length], {
          color: "black",
          font: "sans",
          distress: 0.15,
        }),
        0.07,
        0,
        1.56,
        0.0362,
        null,
        0.52,
      ));
    for (let u of [1.85, 2.2, 1.56])
      (t.box(s, 0.5, 0.03, 0.012, 0, u, 0.024, { r: 0 }),
        t.box(s, 0.09, 0.04, 0.07, 0, u, -0.002, { r: 0.004 }));
    for (let [u, h] of [
      [-0.26, 2.28],
      [0.26, 2.28],
      [-0.26, 1.76],
      [0.26, 1.76],
    ])
      t.cyl(s, 0.008, 0.008, 0.004, u, h, 0.0365, {
        seg: 6,
        rot: [hn / 2, 0, 0],
      });
    return (
      t.pop(),
      qi(t.group(), "sign_post", ca("sign_post"), [
        { min: [-0.03, 0, -0.03], max: [0.03, 2.4, 0.03], surface: "metal" },
        {
          min: [-0.3, 1.44, 0.02],
          max: [0.3, 2.33, 0.04],
          surface: "metal",
          bulletOnly: !0,
        },
      ])
    );
  }

function D3(i, e = {}) {
    let t = new jn(i),
      n = e.seed | 0,
      s = $a(n + 3),
      o = t.M("paint_yellow"),
      r = t.M("steel_dark"),
      a = t.M("aluminium"),
      l = t.M("rubber"),
      c = i.mats.emissive(16773596, e.on === !1 ? 0.02 : 10);
    (t.cyl(a, 0.021, 0.021, 1.1, 0, 0.75, 0, { seg: 8, open: !0 }),
      t.cyl(a, 0.016, 0.016, 0.9, 0, 1.6, 0, { seg: 8, open: !0 }),
      t.cyl(r, 0.03, 0.03, 0.06, 0, 1.3, 0, { seg: 8 }),
      t.bar(r, [0.03, 1.3, 0], [0.085, 1.3, 0], 0.008, { caps: !0 }),
      t.box(r, 0.02, 0.03, 0.05, 0.09, 1.3, 0, { r: 0.005 }),
      t.cyl(r, 0.032, 0.032, 0.07, 0, 0.82, 0, { seg: 8 }),
      t.cyl(r, 0.03, 0.03, 0.05, 0, 0.36, 0, { seg: 8 }));
    for (let d = 0; d < 3; d++) {
      let v = (d * hn * 2) / 3 + 0.5,
        g = Math.cos(v),
        x = Math.sin(v);
      (t.bar(
        a,
        [g * 0.035, 0.82, x * 0.035],
        [g * 0.5, 0.025, x * 0.5],
        0.013,
        { seg: 6 },
      ),
        t.bar(a, [g * 0.03, 0.36, x * 0.03], [g * 0.3, 0.37, x * 0.3], 0.008, {
          seg: 5,
        }),
        t.add(l, je(mr(0.028, 8, 5), g * 0.5, 0.02, x * 0.5)));
    }
    t.box(r, 0.05, 0.04, 0.72, 0, 2.03, 0, { r: 0.008 });
    for (let d of [-1, 1]) {
      (t.push(_o(0.03, 2.03, d * 0.2, [0, d * -0.12, 0])),
        t.push(_o(0, 0, 0, [0, 0, -0.22])),
        t.box(o, 0.075, 0.24, 0.32, 0.06, 0.02, 0, { r: 0.012 }),
        t.add(c, je(cn(0.28, 0.2), 0.0985, 0.02, 0, [0, hn / 2, 0]), null, !0),
        t.box(r, 0.012, 0.25, 0.012, 0.1, 0.02, 0.157, { r: 0 }),
        t.box(r, 0.012, 0.25, 0.012, 0.1, 0.02, -0.157, { r: 0 }),
        t.box(r, 0.012, 0.012, 0.33, 0.1, 0.143, 0, { r: 0 }),
        t.box(r, 0.012, 0.012, 0.33, 0.1, -0.103, 0, { r: 0 }));
      for (let v = -3; v <= 3; v++)
        t.add(r, je($e(0.035, 0.2, 0.006), 0.008, 0.02, v * 0.043));
      (t.tube(
        o,
        [
          [0.05, 0.14, -0.1],
          [0.05, 0.2, -0.06],
          [0.05, 0.2, 0.06],
          [0.05, 0.14, 0.1],
        ],
        0.008,
        { seg: 5 },
      ),
        t.pop(),
        t.pop());
    }
    let u = s() * hn * 2,
      h = Math.cos(u),
      f = Math.sin(u);
    (t.tube(
      l,
      [
        [0, 2, 0.03],
        [-0.03, 1.7, 0.04],
        [0.035, 1.25, 0.02],
        [-0.03, 0.9, 0.03],
        [0.05, 0.5, 0.06],
        [0.12, 0.08, 0.1],
        [0.25, 0.012, 0.16],
        [0.3 + h * 0.3, 0.012, 0.2 + f * 0.3],
        [0.2 + h * 0.75 - f * 0.2, 0.012, 0.1 + f * 0.75 + h * 0.2],
        [h * 1.2, 0.012, f * 1.2],
      ],
      0.011,
      { seg: 5 },
    ),
      t.box(o, 0.09, 0.05, 0.06, h * 1.24, 0.026, f * 1.24, {
        r: 0.01,
        rot: [0, -u, 0],
      }));
    let p = t.group();
    return (
      (p.userData.lamps = [
        { pos: [0.14, 2.03, 0], dir: [0.976, -0.218, 0], color: 16773596 },
      ]),
      qi(p, "floodlight_stand", ca("floodlight_stand"), [
        { min: [-0.12, 0, -0.12], max: [0.12, 2.2, 0.12], surface: "metal" },
      ])
    );
  }

var b1 = (i) => Gi[i].slice(0, 3),
    wi = Math.PI;

function k3(i, e = {}) {
    let t = new jn(i),
      n = t.M("diamond_plate"),
      s = t.M("steel_dark"),
      o = t.M("paint_yellow"),
      r = t.M("steel_galv"),
      a = 12,
      l = 0.2,
      c = 0.2,
      u = -1.5,
      h = 0.5,
      f = u + a * c,
      p = [];
    for (let g = 0; g < a; g++) {
      let x = (g + 1) * l,
        y = u + g * c;
      (t.box(n, 0.25, 0.03, 0.9, y + 0.125, x - 0.015, 0, { r: 0.005 }),
        t.box(o, 0.035, 0.034, 0.9, y + 0.016, x - 0.015, 0, { r: 0.006 }));
      for (let b of [-1, 1])
        t.box(s, 0.2, 0.05, 0.01, y + 0.13, x - 0.05, b * 0.452, { r: 0 });
      p.push({ min: [y, 0, -h], max: [y + c, x, h], surface: "metal" });
    }
    for (let g of [-1, 1]) {
      (t.beam(
        s,
        [u + 0.07, 0.13, g * 0.465],
        [f + 0.04, 2.5, g * 0.465],
        0.24,
        0.014,
        { r: 0.004 },
      ),
        t.box(r, 0.3, 0.012, 0.12, u + 0.06, 0.006, g * 0.465, { r: 0 }));
      for (let x of [-0.08, 0.1])
        t.cyl(r, 0.012, 0.012, 0.02, u + 0.06 + x, 0.02, g * 0.5, { seg: 6 });
    }
    let d = (a + 1) * l;
    (t.box(n, 0.64, 0.035, 0.96, f + 0.3, d - 0.0175, 0, { r: 0.005 }),
      t.box(o, 0.035, 0.038, 0.96, f + 0.016, d - 0.0175, 0, { r: 0.006 }));
    for (let g of [-1, 1])
      t.box(s, 0.66, 0.16, 0.06, f + 0.3, d - 0.115, g * 0.47, { r: 0.008 });
    (t.box(s, 0.06, 0.16, 0.96, 1.47, d - 0.115, 0, { r: 0.008 }),
      t.box(s, 0.06, 0.12, 0.9, f + 0.02, d - 0.1, 0, { r: 0.008 }));
    for (let g of [-1, 1])
      (t.box(s, 0.08, d - 0.19, 0.08, 1.44, (d - 0.19) / 2, g * 0.45, {
        r: 0.008,
      }),
        t.box(r, 0.18, 0.012, 0.18, 1.44, 0.006, g * 0.45, { r: 0 }),
        t.beam(
          s,
          [1.44, 1.5, g * 0.45],
          [f + 0.1, d - 0.2, g * 0.45],
          0.05,
          0.05,
          { r: 0.006 },
        ));
    (t.beam(s, [1.44, 0.15, -0.42], [1.44, 2.2, 0.42], 0.045, 0.008, { r: 0 }),
      t.beam(s, [1.44, 0.15, 0.42], [1.44, 2.2, -0.42], 0.045, 0.008, { r: 0 }),
      t.box(s, 0.06, 0.06, 0.82, 1.44, 1.2, 0, { r: 0.006 }),
      p.push({ min: [f, d - 0.2, -h], max: [1.5, d, h], surface: "metal" }));
    for (let g of [-1, 1])
      p.push({
        min: [1.4, 0, g * 0.45 - 0.04],
        max: [1.48, d - 0.2, g * 0.45 + 0.04],
        surface: "metal",
      });
    let v = (g) => ((g - u) / c) * l + l;
    for (let g of [-1, 1]) {
      let x = g * 0.485,
        y = [
          [u + 0.1, v(u + 0.1)],
          [u + 0.9, v(u + 0.9) - 0.1],
          [u + 1.7, v(u + 1.7) - 0.1],
          [f + 0.03, d],
          [1.47, d],
        ];
      for (let [b, m] of y)
        (t.bar(o, [b, m - 0.12, x], [b, m + 1, x], 0.019, { seg: 7 }),
          t.box(s, 0.07, 0.1, 0.012, b, m - 0.1, x - g * 0.012, { r: 0 }));
      for (let b of [1, 0.52]) {
        let m = b === 1 ? 0.021 : 0.016;
        (t.bar(o, [y[0][0], y[0][1] + b, x], [y[3][0], y[3][1] + b, x], m, {
          seg: 7,
        }),
          t.bar(o, [y[3][0], y[3][1] + b, x], [y[4][0], y[4][1] + b, x], m, {
            seg: 7,
          }),
          t.add(o, je(mr(m * 1.05, 7, 5), y[3][0], y[3][1] + b, x)),
          t.add(o, je(mr(m * 1.05, 7, 5), y[0][0], y[0][1] + b, x)),
          t.add(o, je(mr(m * 1.05, 7, 5), y[4][0], y[4][1] + b, x)));
      }
      (t.box(s, 0.6, 0.1, 0.008, f + 0.3, d + 0.05, g * 0.476, { r: 0 }),
        p.push({
          min: [f, d, x - 0.03],
          max: [1.5, d + 1.02, x + 0.03],
          surface: "metal",
        }));
    }
    return qi(t.group(), "stairs_metal", b1("stairs_metal"), p);
  }

function F3(i, e = {}) {
    let t = new jn(i),
      n = t.M("steel_dark"),
      s = t.M("paint_yellow"),
      o = t.M("steel_galv"),
      r = e.rails || "both",
      a =
        r === "both" ? [-1, 1] : r === "left" ? [-1] : r === "right" ? [1] : [],
      l = 0.05;
    for (let u = -0.51; u <= 0.511; u += 0.034)
      t.add(o, je($e(2.98, 0.03, 0.004), 0, l - 0.015, u));
    for (let u = -1.45; u <= 1.451; u += 0.1)
      t.add(o, je($e(0.006, 0.006, 1.04), u, l - 0.004, 0));
    for (let u of [-1, 1])
      (t.add(o, je($e(2.99, 0.032, 0.005), 0, l - 0.016, u * 0.525)),
        t.add(o, je($e(0.005, 0.032, 1.05), u * 1.493, l - 0.016, 0)));
    for (let u of [-1, 1])
      t.box(n, 3, 0.18, 0.06, 0, l - 0.09, u * 0.565, { r: 0.008 });
    for (let u of [-1.45, -0.5, 0.5, 1.45])
      t.box(n, 0.05, 0.1, 1.08, u, l - 0.085, 0, { r: 0.006 });
    let c = [
      { min: [-1.5, l - 0.08, -0.6], max: [1.5, l, 0.6], surface: "metal" },
    ];
    for (let u of a) {
      let h = u * 0.565;
      t.box(n, 3, 0.1, 0.008, 0, l + 0.05, u * 0.535, { r: 0 });
      for (let f of [-1.42, 0, 1.42])
        (t.box(s, 0.045, 1.07, 0.045, f, l + 0.52, h, { r: 0.006 }),
          t.box(n, 0.09, 0.012, 0.09, f, l + 0.006, h, { r: 0 }));
      (t.bar(s, [-1.5, l + 1.05, h], [1.5, l + 1.05, h], 0.021, {
        seg: 7,
        caps: !0,
      }),
        t.bar(s, [-1.5, l + 0.55, h], [1.5, l + 0.55, h], 0.016, {
          seg: 6,
          caps: !0,
        }),
        c.push({
          min: [-1.5, l, h - 0.035],
          max: [1.5, l + 1.05, h + 0.035],
          surface: "metal",
        }));
    }
    return qi(t.group(), "catwalk", b1("catwalk"), c);
  }

function L3(i, e, t, n, s) {
    for (let o = -2; o <= 2; o++)
      i.add(
        e,
        je(
          $e(0.14 + (o === 0 ? 0.02 : 0), 0.022, 1),
          t + o * 0.2525,
          n + 0.133,
          s,
        ),
      );
    for (let o of [-1, 0, 1])
      i.add(e, je($e(1.15, 0.022, 0.1), t, n + 0.111, s + o * 0.45));
    for (let o of [-1, 0, 1])
      for (let r of [-1, 0, 1])
        i.add(
          e,
          je($e(0.14, 0.078, 0.1), t + r * 0.505, n + 0.061, s + o * 0.45),
        );
    for (let o of [-1, 0, 1])
      i.add(e, je($e(1.15, 0.022, 0.1), t, n + 0.011, s + o * 0.45));
  }

function DA(i, e, t, n, s, o, r) {
    L3(i, e.wood, n, s, o);
    let a = s + 0.144;
    if (t === "cartons") {
      let l = 2 + Math.floor(r() * 2),
        c = 0.36;
      for (let u = 0; u < l; u++)
        for (let h of [-1, 1])
          for (let f of [-1, 1])
            (u === l - 1 && r() < 0.25) ||
              (i.box(
                e.card,
                0.53,
                c - 0.006,
                0.46,
                n + h * 0.272 + (r() - 0.5) * 0.02,
                a + c * (u + 0.5),
                o + f * 0.237 + (r() - 0.5) * 0.02,
                { r: 0.008, rot: [0, (r() - 0.5) * 0.05, 0] },
              ),
              i.add(
                e.tape,
                je(
                  $e(0.535, 0.002, 0.05),
                  n + h * 0.272,
                  a + c * (u + 1) - 0.004,
                  o + f * 0.237,
                ),
              ));
      for (let u of [-0.3, 0.3])
        (i.add(
          e.poly,
          je(
            $e(0.016, l * c + 0.004, 0.002),
            n + u,
            a + (l * c) / 2,
            o + 0.475,
          ),
        ),
          i.add(
            e.poly,
            je(
              $e(0.016, l * c + 0.004, 0.002),
              n + u,
              a + (l * c) / 2,
              o - 0.475,
            ),
          ));
    } else if (t === "wrapped") {
      let l = 0.9 + r() * 0.25;
      (i.box(e.card, 1.08, l, 0.92, n, a + l / 2, o, { r: 0.012 }),
        i.box(e.wrap, 1.1, l + 0.012, 0.94, n, a + l / 2 + 0.002, o, {
          r: 0.03,
        }));
      for (let c of [-1, 1])
        for (let u of [-1, 1])
          i.box(
            e.card,
            0.05,
            l * 0.96,
            0.05,
            n + c * 0.535,
            a + l / 2,
            o + u * 0.455,
            { r: 0.004 },
          );
      i.decal(
        Mi(i.G, "LOT " + (1e3 + Math.floor(r() * 8999)), {
          color: "black",
          font: "sans",
          distress: 0.1,
        }),
        0.06,
        n + 0.2,
        a + l * 0.7,
        o + 0.474,
        null,
        0.3,
      );
    } else if (t === "drums") {
      for (let l of [-1, 1])
        for (let c of [-1, 1]) {
          let u = n + l * 0.285,
            h = o + c * 0.24,
            f = r() < 0.3 ? e.drum2 : e.drum;
          i.cyl(f, 0.225, 0.225, 0.86, u, a + 0.43, h, { seg: 14, open: !0 });
          for (let p of [0.29, 0.58])
            i.cyl(f, 0.233, 0.233, 0.022, u, a + p, h, { seg: 14, open: !0 });
          (i.cyl(f, 0.232, 0.232, 0.02, u, a + 0.85, h, { seg: 14, open: !0 }),
            i.cyl(f, 0.232, 0.232, 0.02, u, a + 0.01, h, { seg: 14, open: !0 }),
            i.add(
              e.dark,
              je(pr(0.44, 0.44, 4), u, a + 0.845, h, [-wi / 2, 0, 0]),
            ),
            i.cyl(e.dark, 0.03, 0.03, 0.02, u + 0.13, a + 0.855, h, {
              seg: 6,
            }));
        }
      (i.add(e.poly, je($e(1.04, 0.03, 0.002), n, a + 0.6, o + 0.468)),
        i.add(e.poly, je($e(1.04, 0.03, 0.002), n, a + 0.6, o - 0.468)));
    } else if (t === "pallets") {
      let l = 2 + Math.floor(r() * 4);
      for (let c = 0; c < l; c++)
        L3(
          i,
          e.wood,
          n + (r() - 0.5) * 0.04,
          a + c * 0.146,
          o + (r() - 0.5) * 0.04,
        );
    }
  }

function U3(i, e = {}) {
    let t = new jn(i),
      n = e.seed | 0,
      s = $a(n + 21),
      o = t.M("paint_blue", { vertexColors: !0 }),
      r = t.M("paint_orange"),
      a = t.M("steel_galv"),
      l = {
        wood: t.M("wood_pallet"),
        card: t.M("cardboard"),
        tape: t.M("polymer_tan"),
        poly: t.M("polymer_black"),
        wrap: t.M("glass_dirty"),
        drum: t.M("plastic_blue"),
        drum2: t.M("paint_red"),
        dark: t.M("steel_dark"),
      },
      c = 4.2,
      u = 1.305,
      h = 0.5,
      f = [0.04, 0.04, 0.05];
    for (let v of [-1, 1]) {
      for (let x of [-1, 1]) {
        (t.box(o, 0.09, c, 0.07, v * u, c / 2, x * h, {
          r: 0.008,
          col: (y, b) => {
            let m = 0.7 + 0.3 * mn(0, 0.5, b);
            return [m, m, m];
          },
        }),
          t.box(a, 0.14, 0.01, 0.12, v * u, 0.005, x * h, { r: 0 }));
        for (let y of [-0.05, 0.05])
          t.cyl(a, 0.01, 0.01, 0.02, v * u + y, 0.016, x * h, { seg: 6 });
        for (let y = 0.12; y < c - 0.05; y += 0.1)
          for (let b of [-0.022, 0.022])
            t.add(
              o,
              je(cn(0.014, 0.034), v * u + b, y, x * (h + 0.0356), [
                0,
                x > 0 ? 0 : wi,
                0,
              ]),
              f,
            );
      }
      let g = [0.2, 1.1, 2, 2.9, 3.8];
      for (let x = 0; x < g.length; x++)
        (t.box(o, 0.03, 0.03, 2 * h - 0.07, v * u, g[x], 0, { r: 0 }),
          x < g.length - 1 &&
            t.beam(
              o,
              [v * u, g[x], x % 2 ? h - 0.04 : -h + 0.04],
              [v * u, g[x + 1], x % 2 ? -h + 0.04 : h - 0.04],
              0.03,
              0.03,
              { r: 0 },
            ));
      t.box(t.M("paint_yellow"), 0.14, 0.4, 0.02, v * u, 0.2, h + 0.06, {
        r: 0.006,
      });
    }
    let p = [1.45, 2.86];
    for (let v of p) {
      for (let g of [-1, 1]) {
        t.box(r, 2 * u - 0.09, 0.12, 0.05, 0, v, g * (h + 0.01), { r: 0.008 });
        for (let x of [-1, 1])
          t.box(
            r,
            0.012,
            0.2,
            0.065,
            x * (u - 0.051),
            v - 0.02,
            g * (h + 0.005),
            { r: 0 },
          );
      }
      for (let g of [-0.85, 0, 0.85])
        t.add(a, je($e(0.04, 0.025, 2 * h), g, v + 0.045, 0));
      for (let g = -0.45; g <= 0.451; g += 0.1)
        t.add(a, je($e(2 * u - 0.1, 0.005, 0.005), 0, v + 0.062, g));
      for (let g = -1.2; g <= 1.201; g += 0.2)
        t.add(a, je($e(0.005, 0.005, 2 * h + 0.04), g, v + 0.066, 0));
    }
    (t.decal(
      Mi(
        i,
        "BAY " + String.fromCharCode(65 + (n % 6)) + "-" + (10 + (n % 40)),
        { color: "black", font: "sans", distress: 0.1 },
      ),
      0.07,
      0,
      p[0],
      h + 0.0365,
      null,
      0.34,
    ),
      t.decal(
        Mi(i, "MAX LOAD 2000 KG PER TIER", {
          color: "black",
          font: "sans",
          distress: 0.1,
        }),
        0.045,
        0.6,
        p[1],
        h + 0.0365,
        null,
        0.5,
      ));
    let d = [
      "cartons",
      "wrapped",
      "drums",
      "cartons",
      "wrapped",
      "pallets",
      "none",
    ];
    return (
      [0, p[0] + 0.068, p[1] + 0.068].forEach((v, g) => {
        for (let x of [-1, 1]) {
          let y = d[Math.floor(s() * d.length)];
          (g === 2 && y === "drums" && (y = "wrapped"),
            y !== "none" &&
              DA(
                t,
                l,
                y,
                x * 0.615 + (s() - 0.5) * 0.03,
                v,
                (s() - 0.5) * 0.05,
                s,
              ));
        }
      }),
      qi(t.group(), "shelf_rack", b1("shelf_rack"), [
        { min: [-1.35, 0, -0.55], max: [1.35, 4.2, 0.55], surface: "metal" },
      ])
    );
  }

function N3(i, e = {}) {
    let t = new jn(i),
      n = e.seed | 0,
      s = n * 2.3,
      o = t.M("paint_white", { vertexColors: !0 }),
      r = t.M("steel_dark"),
      a = t.M("steel_galv"),
      l = t.M("paint_grey"),
      c = t.M("brass"),
      u = t.M("rubber"),
      h = t.M("aluminium"),
      f = (g, x, y) => {
        let b =
          (0.86 + 0.18 * ri(y * 2 + s, x * 2)) * (0.62 + 0.38 * mn(0, 0.6, x));
        return [b, b * 0.985, b * 0.955];
      };
    t.defCol.set(o, f);
    let p = [0.05, 0.05, 0.055];
    e.flip || t.push(_o(0, 0, 0, [0, wi, 0]));
    let d = 0.13;
    t.box(o, 0.38, 2.3, 2.3, -0.06, 1.15, 0, { r: 0.012 });
    for (let g of [-1, 1])
      t.box(o, 0.12, 2.3, 0.09, 0.19, 1.15, g * 1.105, { r: 0.012 });
    (t.box(o, 0.12, 0.09, 2.12, 0.19, 2.255, 0, { r: 0.012 }),
      t.box(o, 0.12, 0.1, 2.12, 0.19, 0.05, 0, { r: 0.012 }),
      t.box(o, 0.1, 0.06, 2.12, 0.18, 1.42, 0, { r: 0.01 }),
      t.box(o, 0.1, 0.06, 2.12, 0.18, 0.9, 0, { r: 0.01 }));
    for (let g of [0.3, 0.9, 1.5, 2.1])
      for (let x of [-1, 1])
        t.cyl(a, 0.014, 0.014, 0.012, 0.255, g, x * 1.105, {
          seg: 6,
          rot: [0, 0, wi / 2],
        });
    for (let g of [-0.8, -0.3, 0.3, 0.8])
      for (let x of [0.05, 2.255])
        t.cyl(a, 0.014, 0.014, 0.012, 0.255, x, g, {
          seg: 6,
          rot: [0, 0, wi / 2],
        });
    for (let g of [-1, 1]) {
      let x = g * 0.53,
        y = 1.83;
      (t.add(o, je(pr(0.66, 0.66, 6), d + 0.004, y, x, [0, wi / 2, 0]), p),
        t.cyl(o, 0.335, 0.345, 0.1, d + 0.05, y, x, {
          seg: 20,
          open: !0,
          rot: [0, 0, wi / 2],
        }),
        t.cyl(o, 0.36, 0.36, 0.014, d + 0.006, y, x, {
          seg: 20,
          open: !0,
          rot: [0, 0, wi / 2],
        }));
      for (let b = 0; b < 3; b++)
        t.add(
          r,
          je($e(0.012, 0.6, 0.12), d + 0.04, y, x, [
            (b * wi) / 3 + g * 0.4,
            0.5,
            0,
          ]),
        );
      t.cyl(r, 0.07, 0.07, 0.06, d + 0.05, y, x, {
        seg: 10,
        rot: [0, 0, wi / 2],
      });
      for (let b = 0; b < 8; b++) {
        let m = (b * wi) / 4;
        t.add(a, je($e(0.005, 0.66, 0.005), d + 0.098, y, x, [m, 0, 0]));
      }
      for (let b of [0.12, 0.22, 0.32])
        t.cyl(a, b, b, 0.006, d + 0.1, y, x, {
          seg: 20,
          open: !0,
          rot: [0, 0, wi / 2],
        });
    }
    t.decal(
      Mi(i, "NORTHSTAR MARINE REFRIGERATION", {
        color: "black",
        font: "sans",
        distress: 0.2,
      }),
      0.05,
      0.2505,
      2.255,
      0,
      [0, wi / 2, 0],
      1.2,
    );
    for (let g of [-1, 1]) {
      t.add(
        o,
        je(cn(0.98, 0.44), d + 0.004, 1.16, g * 0.53, [0, wi / 2, 0]),
        p,
      );
      for (let x = 0; x < 9; x++)
        t.box(o, 0.06, 0.006, 0.98, d + 0.035, 0.965 + x * 0.049, g * 0.53, {
          r: 0,
          rot: [0, 0, -0.75],
        });
      t.box(o, 0.05, 0.46, 0.03, d + 0.03, 1.16, g * 0.53, { r: 0.005 });
    }
    (t.add(o, je(cn(1, 0.76), d + 0.004, 0.49, -0.53, [0, wi / 2, 0]), p),
      t.cyl(r, 0.15, 0.15, 0.46, d + 0.1, 0.36, -0.58, {
        seg: 14,
        open: !0,
        rot: [wi / 2, 0, 0],
      }));
    for (let g of [-1, 1]) {
      let x = mr(0.15, 14, 6);
      (x.scale(1, 1, 0.45), t.add(r, je(x, d + 0.1, 0.36, -0.58 + g * 0.23)));
    }
    (t.box(r, 0.26, 0.03, 0.5, d + 0.1, 0.19, -0.58, { r: 0.006 }),
      t.cyl(h, 0.07, 0.07, 0.4, d + 0.07, 0.5, -0.17, { seg: 10 }),
      t.tube(
        c,
        [
          [d + 0.1, 0.5, -0.5],
          [d + 0.1, 0.68, -0.5],
          [d + 0.08, 0.78, -0.4],
          [d + 0.08, 0.8, -0.2],
          [d + 0.07, 0.72, -0.17],
        ],
        0.012,
        { seg: 6 },
      ),
      t.tube(
        c,
        [
          [d + 0.12, 0.42, -0.36],
          [d + 0.14, 0.6, -0.33],
          [d + 0.1, 0.84, -0.34],
          [d + 0.06, 0.88, -0.6],
          [d + 0.03, 0.88, -0.9],
        ],
        0.009,
        { seg: 6 },
      ),
      t.tube(
        c,
        [
          [d + 0.1, 0.36, -0.82],
          [d + 0.1, 0.36, -0.93],
          [d + 0.06, 0.6, -0.96],
          [d + 0.04, 0.86, -0.96],
        ],
        0.012,
        { seg: 6 },
      ),
      t.box(t.M("paint_red"), 0.04, 0.05, 0.05, d + 0.12, 0.6, -0.33, {
        r: 0.008,
      }));
    let v = 0.55;
    (t.box(l, 0.11, 0.56, 0.74, d + 0.055, 0.5, v, { r: 0.012 }),
      t.box(l, 0.012, 0.5, 0.68, d + 0.114, 0.5, v, { r: 0.004 }),
      t.add(r, je(cn(0.26, 0.11), d + 0.1215, 0.66, v - 0.1, [0, wi / 2, 0])),
      t.add(
        i.mats.emissive(16757850, 2.4),
        je(cn(0.15, 0.05), d + 0.122, 0.665, v - 0.06, [0, wi / 2, 0]),
        null,
        !0,
      ),
      t.add(
        i.mats.emissive(5832570, 3),
        je(cn(0.014, 0.014), d + 0.122, 0.66, v - 0.2, [0, wi / 2, 0]),
        null,
        !0,
      ));
    for (let g = 0; g < 4; g++)
      for (let x = 0; x < 2; x++)
        t.box(
          r,
          0.008,
          0.03,
          0.03,
          d + 0.122,
          0.5 - x * 0.045,
          v - 0.04 - g * 0.045,
          { r: 0.003 },
        );
    return (
      t.box(t.M("paint_red"), 0.03, 0.09, 0.03, d + 0.13, 0.42, v + 0.22, {
        r: 0.006,
      }),
      t.cyl(a, 0.012, 0.012, 0.1, d + 0.124, 0.5, v + 0.325, { seg: 6 }),
      t.decal(Jn(i, "hazard_voltage"), 0.11, d + 0.1215, 0.64, v + 0.2, [
        0,
        wi / 2,
        0,
      ]),
      t.tube(
        u,
        [
          [d + 0.06, 0.78, v + 0.2],
          [d + 0.06, 0.95, v + 0.25],
          [d + 0.05, 1.4, v + 0.5],
          [d + 0.05, 1.5, v - 0],
        ],
        0.012,
        { seg: 5 },
      ),
      t.tube(
        u,
        [
          [d + 0.06, 0.78, v - 0.2],
          [d + 0.06, 0.92, v - 0.3],
          [d + 0.05, 0.93, -0.1],
        ],
        0.01,
        { seg: 5 },
      ),
      t.cyl(a, 0.022, 0.022, 0.04, d + 0.06, 0.2, v + 0.2, { seg: 8 }),
      t.tube(
        u,
        [
          [d + 0.06, 0.2, v + 0.2],
          [d + 0.08, 0.12, v + 0.1],
          [d + 0.1, 0.16, v - 0.15],
          [d + 0.1, 0.2, v - 0.3],
          [d + 0.1, 0.13, v - 0.36],
          [d + 0.09, 0.12, v - 0.1],
          [d + 0.09, 0.14, v + 0.05],
        ],
        0.016,
        { seg: 6 },
      ),
      t.box(t.M("paint_blue"), 0.07, 0.07, 0.12, d + 0.09, 0.14, v + 0.1, {
        r: 0.015,
      }),
      t.decal(
        Jn(i, "grime_streak"),
        0.8,
        0.2512,
        0.5,
        -1.105,
        [0, wi / 2, 0],
        0.08,
      ),
      e.flip || t.pop(),
      qi(t.group(), "reefer_unit", b1("reefer_unit"), [
        { min: [-0.25, 0, -1.15], max: [0.25, 2.3, 1.15], surface: "metal" },
      ])
    );
  }

var es = Math.PI,
    Kg = new Ve(16752680),
    LA = new Ve(16721940),
    kA = new Ve(16767392);

function B3(i, e = {}) {
    let t = e.seed | 0,
      n = t * 1.9,
      s = e.id || e.label || "ABC"[t % 3],
      o = new jn(i),
      r = new jn(i),
      a = new jn(i),
      l = new jn(i),
      c = o.M("paint_grey", { vertexColors: !0 }),
      u = o.M("steel_dark"),
      h = o.M("steel_galv"),
      f = o.M("aluminium"),
      p = o.M("rubber"),
      d = o.M("concrete", { vertexColors: !0 }),
      v = (le, R, I) => {
        let se =
          (0.88 + 0.2 * ri(le * 3 + n, R * 3 + I * 2)) *
          (0.6 + 0.4 * mn(0.16, 0.7, R));
        return [se, se, se * 0.98];
      };
    (o.defCol.set(c, v),
      r.defCol.set(c, (le, R, I) => {
        let se = 0.9 + 0.14 * ri(le * 4 + n, R * 3);
        return [se, se, se];
      }));
    let g = [0.035, 0.035, 0.04],
      x = { em: !0 };
    (o.box(d, 1.36, 0.16, 0.96, 0, 0.08, 0, {
      r: 0.025,
      col: (le, R, I) => {
        let se = 0.6 + 0.38 * mn(0, 0.15, R) + 0.1 * ri(le * 5, I * 5);
        return [se, se, se * 0.97];
      },
    }),
      o.decal(Jn(i, "caution_stripes"), 0.1, 0, 0.085, 0.4815, null, 1.2));
    for (let le of [-1, 1])
      for (let R of [-1, 1])
        (o.cyl(h, 0.016, 0.016, 0.03, le * 0.44, 0.185, R * 0.36, { seg: 6 }),
          o.box(h, 0.1, 0.012, 0.1, le * 0.44, 0.166, R * 0.36, { r: 0 }));
    let y = -0.5,
      b = 0.5,
      m = 0.18,
      A = 1.62,
      _ = -0.3,
      M = 0.3,
      E = 0.025,
      w = (m + A) / 2,
      S = A - m;
    o.box(c, 1, S, E, 0, w, _ + E / 2, { r: 0.006 });
    for (let le of [-1, 1])
      o.box(c, E, S, 0.6, le * (0.5 - E / 2), w, 0, { r: 0.006 });
    (o.box(c, 1, E, 0.6, 0, m + E / 2, 0, { r: 0.006 }),
      o.box(c, 1, E, 0.6, 0, A - E / 2, 0, { r: 0.006 }),
      o.box(c, E, S, 0.58, 0, w, 0, { r: 0.004 }),
      o.box(c, 1, 0.12, E, 0, A - 0.06, M - E / 2, { r: 0.006 }),
      o.box(c, 1, 0.07, E, 0, m + 0.035, M - E / 2, { r: 0.006 }),
      o.box(u, 1.04, 0.04, 0.64, 0, m - 0.01, 0, { r: 0.008 }),
      o.box(c, 1.12, 0.05, 0.74, 0, A + 0.025, 0.01, { r: 0.012 }));
    for (let le of [-1, 1])
      o.tube(
        h,
        [
          [le * 0.4 - 0.04, A + 0.05, 0.2],
          [le * 0.4 - 0.03, A + 0.1, 0.2],
          [le * 0.4 + 0.03, A + 0.1, 0.2],
          [le * 0.4 + 0.04, A + 0.05, 0.2],
        ],
        0.008,
        { seg: 5 },
      );
    let z = (le, R, I) => [0.16, 0.16, 0.17];
    (o.add(c, je(cn(0.45, S - 0.06), -0.25, w, _ + E + 0.002), z),
      o.add(c, je(cn(0.55, S - 0.06), y + E + 0.002, w, 0, [0, es / 2, 0]), z),
      o.add(
        c,
        je(cn(0.55, S - 0.06), -E / 2 - 0.002, w, 0, [0, -es / 2, 0]),
        z,
      ));
    for (let le = 0; le < 5; le++) {
      let R = 0.42 + le * 0.22;
      (o.box(u, 0.42, 0.17, 0.4, -0.25, R, -0.05, { r: 0.008 }),
        o.box(f, 0.4, 0.02, 0.012, -0.25, R + 0.06, 0.152, { r: 0 }));
      for (let I = 0; I < 4; I++)
        a.add(x, je(cn(0.012, 0.012), -0.41 + I * 0.035, R - 0.04, 0.1512));
      for (let I = 0; I < 3; I++)
        o.add(u, je(pr(0.03, 0.022, 2), -0.2 + I * 0.06, R - 0.03, 0.1512), g);
    }
    let H = [p, p, p];
    for (let le = 0; le < 4; le++)
      o.tube(
        H[le % 3],
        [
          [-0.2 + (le % 3) * 0.06, 0.39 + le * 0.22, 0.15],
          [-0.14 + (le % 3) * 0.05, 0.36 + le * 0.22, 0.24],
          [-0.07, 0.55 + le * 0.22, 0.22],
          [-0.2 + ((le + 1) % 3) * 0.06, 0.61 + le * 0.22, 0.15],
        ],
        0.007,
        { seg: 5 },
      );
    let O = 0.474,
      q = 1.3,
      U = 0.9,
      T = (le, R, I) => {
        let se = R + O / 2,
          ae = 0;
        (le.box(c, O, q, 0.024, se, U, ae, { r: 0.006 }),
          le.box(c, O - 0.07, q - 0.07, 0.006, se, U, ae + 0.013, {
            r: 0.003,
          }));
        for (let ve of [U + 0.36, U - 0.4]) {
          le.add(c, je(cn(O - 0.14, 0.3), se, ve, ae + 0.0165), g);
          for (let _e = 0; _e < 7; _e++)
            le.box(
              c,
              O - 0.13,
              0.034,
              0.005,
              se,
              ve - 0.125 + _e * 0.042,
              ae + 0.027,
              { r: 0, rot: [0.75, 0, 0] },
            );
          (le.box(c, 0.02, 0.31, 0.02, se - (O - 0.13) / 2, ve, ae + 0.022, {
            r: 0.003,
          }),
            le.box(c, 0.02, 0.31, 0.02, se + (O - 0.13) / 2, ve, ae + 0.022, {
              r: 0.003,
            }));
        }
        let k = I ? R + 0.07 : R + O - 0.07;
        (le.box(u, 0.045, 0.2, 0.02, k, U - 0.02, ae + 0.026, { r: 0.006 }),
          le.box(h, 0.028, 0.13, 0.018, k, U + 0, ae + 0.042, { r: 0.006 }),
          le.cyl(h, 0.012, 0.012, 0.012, k, U - 0.09, ae + 0.04, {
            seg: 8,
            rot: [es / 2, 0, 0],
          }));
        let ce = I ? R + O : R;
        for (let ve of [U - 0.5, U, U + 0.5])
          le.cyl(h, 0.011, 0.011, 0.09, ce, ve, ae + 0.016, { seg: 6 });
      };
    (o.push(_o(0, 0, M - 0.004)),
      T(o, 0.013, !0),
      o.decal(
        Mi(i, "RELAY " + s, {
          color: "yellow",
          font: "stencil",
          distress: 0.15,
        }),
        0.12,
        0.013 + O / 2,
        U + 0.02,
        0.018,
        null,
        O - 0.1,
      ),
      o.decal(
        Mi(i, "HARBOR MASTER UPLINK", {
          color: "white",
          font: "sans",
          distress: 0.15,
        }),
        0.034,
        0.013 + O / 2,
        U - 0.1,
        0.018,
        null,
        O - 0.1,
      ),
      o.decal(
        Jn(i, "hazard_voltage"),
        0.13,
        0.013 + O / 2 + 0.1,
        U + 0.14,
        0.018,
        null,
      ),
      o.pop());
    let D = [-0.487, 0, M - 0.004];
    (T(r, 0, !1),
      r.decal(Jn(i, "hazard_general"), 0.13, O / 2, U + 0.1, 0.018, null),
      r.box(c, O - 0.1, 0.03, 0.014, O / 2, U + 0.55, -0.018, { r: 0.003 }),
      r.box(c, O - 0.1, 0.03, 0.014, O / 2, U - 0.55, -0.018, { r: 0.003 }),
      r.box(c, 0.03, 1.1, 0.014, 0.07, U, -0.018, { r: 0.003 }),
      r.box(c, 0.03, 1.1, 0.014, O - 0.07, U, -0.018, { r: 0.003 }),
      r.box(u, 0.24, 0.3, 0.02, O / 2, U - 0.05, -0.02, { r: 0.004 }),
      r.add(
        Mi(i, "WIRING DIAGRAM SLT-R4", {
          color: "white",
          font: "sans",
          distress: 0.1,
        }).material,
        je(cn(0.2, 0.03), O / 2, U + 0.03, -0.0305, [0, es, 0]),
        null,
        !0,
      ));
    for (let le of [U + 0.36, U - 0.4])
      r.add(c, je(cn(O - 0.14, 0.3), O / 2, le, -0.0125, [0, es, 0]), g);
    r.decal(
      Mi(i, "DISCONNECT POWER BEFORE SERVICE", {
        color: "white",
        font: "sans",
        distress: 0.15,
      }),
      0.03,
      O / 2,
      U - 0.03,
      0.018,
      null,
      O - 0.1,
    );
    for (let le of [-1, 1]) {
      o.box(f, 0.012, 0.98, 0.5, le * 0.506, 1.06, 0, { r: 0.003 });
      for (let R = -6; R <= 6; R++)
        o.add(f, je($e(0.06, 0.94, 0.007), le * 0.54, 1.06, R * 0.038));
      o.box(c, 0.075, 0.03, 0.52, le * 0.54, 1.56, 0, { r: 0.006 });
    }
    for (let le = 0; le < 3; le++) {
      let R = -0.17 + le * 0.17,
        I = 0.44 - le * 0.02,
        se = 0.86 + le * 0.07;
      (o.tube(
        p,
        [
          [0.5, I, R],
          [0.6, I, R],
          [0.72 + le * 0.04, I - 0.06, R],
          [se - 0.02, 0.16, R + 0.02],
          [se, -0.03, R + 0.02],
        ],
        0.04,
        { seg: 8, tension: 0.4 },
      ),
        o.cyl(h, 0.055, 0.055, 0.05, 0.515, I, R, {
          seg: 8,
          flat: !0,
          rot: [0, 0, es / 2],
        }),
        o.cyl(h, 0.06, 0.066, 0.03, se, 0.015, R + 0.02, { seg: 8 }));
    }
    (o.tube(
      p,
      [
        [-0.3, 0.35, _],
        [-0.3, 0.33, _ - 0.1],
        [-0.34, 0.2, _ - 0.2],
        [-0.5, 0.165, _ - 0.3],
        [-0.9, 0.02, _ - 0.36],
        [-1.5, 0.018, _ - 0.2],
      ],
      0.022,
      { seg: 6 },
    ),
      o.box(u, 0.3, 0.22, 0.1, 0.2, 0.75, _ - 0.05, { r: 0.012 }),
      o.tube(
        p,
        [
          [0.2, 0.86, _ - 0.06],
          [0.2, 1.2, _ - 0.04],
          [-0.1, 1.55, _ - 0.03],
          [-0.3, 1.66, -0.16],
        ],
        0.012,
        { seg: 5 },
      ));
    let C = -0.3,
      G = -0.14,
      j = A + 0.05,
      N = 2.5,
      Q = [0, 1, 2].map((le) => [
        C + Math.cos(le * 2.094 + 0.52) * 0.085,
        G + Math.sin(le * 2.094 + 0.52) * 0.085,
      ]);
    o.box(h, 0.24, 0.012, 0.24, C, j + 0.006, G, { r: 0 });
    for (let le = 0; le < 3; le++) {
      let R = Q[le],
        I = Q[(le + 1) % 3];
      o.bar(h, [R[0], j, R[1]], [R[0], N, R[1]], 0.011, { seg: 6 });
      let se = 5,
        ae = (N - j) / se;
      for (let k = 0; k < se; k++)
        (o.bar(
          h,
          [R[0], j + k * ae, R[1]],
          [I[0], j + (k + 1) * ae, I[1]],
          0.005,
          { seg: 4 },
        ),
          o.bar(
            h,
            [R[0], j + (k + 1) * ae, R[1]],
            [I[0], j + (k + 1) * ae, I[1]],
            0.005,
            { seg: 4 },
          ));
    }
    (o.cyl(h, 0.11, 0.11, 0.014, C, N + 0.007, G, { seg: 10 }),
      o.cyl(u, 0.05, 0.06, 0.1, C, N + 0.06, G, { seg: 10 }));
    let K = (le, R, I) => {
      (o.cyl(u, 0.016, 0.02, 0.07, le, A + 0.085, R, { seg: 8 }),
        o.cyl(h, 0.011, 0.011, 0.06, le, A + 0.15, R, { seg: 6 }),
        o.bar(u, [le, A + 0.17, R], [le + 0.02, I, R - 0.015], 0.005, {
          r2: 0.0018,
          seg: 5,
          caps: !0,
        }));
    };
    (K(0.4, -0.24, 3.15),
      K(0.26, -0.24, 2.72),
      o.cyl(u, 0.03, 0.03, 0.26, 0.42, A + 0.18, 0.18, { seg: 8 }),
      o.add(u, je(mr(0.03, 8, 4, es * 2, 0, es / 2), 0.42, A + 0.31, 0.18)));
    let ie = g1(
      [
        [0, 0],
        [0.06, 0.006],
        [0.12, 0.024],
        [0.18, 0.054],
        [0.215, 0.078],
        [0.222, 0.078],
        [0.185, 0.05],
        [0.12, 0.016],
        [0.06, -0.003],
        [0, -0.01],
      ],
      18,
    );
    (ie.computeVertexNormals(),
      l.add(f, je(ie, 0, 0.3, 0.02, [es / 2 - 0.12, 0, 0])),
      l.cyl(f, 0.022, 0.03, 0.2, 0, 0.1, 0, { seg: 8 }),
      l.box(f, 0.07, 0.1, 0.06, 0, 0.26, -0.02, { r: 0.01 }));
    for (let le of [0.5, 2.6, 4.7])
      l.bar(
        f,
        [Math.cos(le) * 0.2, 0.3 + Math.sin(le) * 0.2, 0.09],
        [0, 0.325, 0.25],
        0.0045,
        { seg: 4 },
      );
    l.cyl(f, 0.022, 0.016, 0.05, 0, 0.325, 0.25, {
      seg: 8,
      rot: [es / 2, 0, 0],
    });
    let F = [C, N + 0.11, G];
    (o.box(u, 0.9, 0.07, 0.03, 0, A - 0.06, M + 0.012, { r: 0.008 }),
      a.add(x, je(cn(0.84, 0.036), 0, A - 0.06, M + 0.0275)));
    for (let le = 1; le < 6; le++)
      o.add(
        u,
        je($e(0.008, 0.05, 0.006), -0.42 + le * 0.14, A - 0.06, M + 0.028),
      );
    (o.box(u, 0.6, 0.06, 0.03, 0, A - 0.06, _ - 0.012, { r: 0.008 }),
      a.add(x, je(cn(0.54, 0.03), 0, A - 0.06, _ - 0.0275, [0, es, 0])));
    for (let le of [-1, 1])
      (o.box(u, 0.03, 1.2, 0.03, le * 0.5, 0.86, M, {
        r: 0.008,
        rot: [0, es / 4, 0],
      }),
        a.add(
          x,
          je(cn(0.014, 1.14), le * 0.5, 0.86, M + 0.0215, [
            0,
            (le * es) / 4,
            0,
          ]).translate(le * 0.0152, 0, 0),
        ),
        a.add(
          x,
          je(cn(0.014, 0.9), le * 0.5715, 1.06, 0.262, [0, (le * es) / 2, 0]),
        ));
    for (let le of [-1, 1])
      (o.box(u, 0.03, 0.06, 0.46, le * 0.587, A - 0.01, 0, { r: 0.008 }),
        a.add(
          x,
          je(cn(0.4, 0.032), le * 0.6025, A - 0.01, 0, [0, (le * es) / 2, 0]),
        ));
    (o.cyl(u, 0.028, 0.028, 0.02, C + 0.2, A + 0.06, G, { seg: 8 }),
      o.bar(h, [C + 0.2, A + 0.06, G], [C + 0.2, 2.64, G], 0.009, { seg: 6 }),
      a.add(x, je(ot(0.045, 0.045, 0.1, 10), C + 0.2, 2.69, G)),
      o.cyl(u, 0.05, 0.05, 0.014, C + 0.2, 2.747, G, { seg: 10 }),
      o.cyl(u, 0.05, 0.05, 0.014, C + 0.2, 2.633, G, { seg: 10 }),
      o.decal(Jn(i, "rust_run"), 0.5, 0.5135, 0.3, 0.2, [0, es / 2, 0], 0.14),
      o.decal(
        Jn(i, "grime_streak"),
        0.6,
        -0.2,
        1.2,
        _ - 0.001,
        [0, es, 0],
        0.2,
      ));
    let X = o.group(),
      ne = new wt();
    ((ne.userData.noMerge = !0), (ne.name = "relay_dynamic"), X.add(ne));
    let re = i.mats.emissive(16752680, 4);
    re = re.clone();
    let $ = new Qe(Ii(a.buckets.get(x).geos), re);
    (($.userData.noMerge = !0), ne.add($));
    let ue = r.group().children.slice();
    for (let le of ue)
      (le.position.set(D[0], D[1], D[2]),
        (le.userData.noMerge = !0),
        ne.add(le));
    let me = l.group().children.slice();
    for (let le of me)
      (le.position.set(F[0], F[1], F[2]),
        (le.userData.noMerge = !0),
        ne.add(le));
    let ee = new Ve(),
      B = (le, R) => {
        if (re.userData && typeof re.userData.setEmissive == "function") {
          re.userData.setEmissive(le, R);
          return;
        }
        re.emissive && re.emissive.isColor && re.isMeshStandardMaterial
          ? (re.emissive.copy(le), (re.emissiveIntensity = R))
          : re.uniforms &&
              re.uniforms.color &&
              re.uniforms.color.value &&
              re.uniforms.color.value.isColor
            ? (re.uniforms.color.value.copy(le).multiplyScalar(R),
              re.uniforms.intensity && (re.uniforms.intensity.value = 1))
            : re.color &&
              re.color.isColor &&
              re.color.copy(le).multiplyScalar(R);
      },
      P = "live",
      V = (t % 7) * 0.9,
      Y = 0,
      L = 0.7,
      Z = 0,
      J = 0,
      oe = 0,
      fe = X.userData;
    if (
      ((fe.state = P),
      (fe.beacon = [C + 0.2, 2.68, G]),
      (fe.interact = [0, 1, 0.75]),
      (fe.emissiveMaterial = re),
      (fe.level = 0),
      (fe.setState = (le) => {
        (le !== "live" && le !== "cutting" && le !== "cut") ||
          (le !== P &&
            ((P = le),
            (fe.state = le),
            le === "cut" && ((Y = 0), (oe = 1.32), (J = 2.5)),
            le === "live" && (oe = 0)));
      }),
      (fe.update = (le) => {
        ((le = Math.min(le || 0, 0.1)), (V += le));
        let R = 0,
          I = Kg,
          se = 0.7;
        if (P === "live") R = 5.5 + 3 * Math.sin(V * 2.2);
        else if (P === "cutting") {
          let ae = Math.sin(V * 2 * es * 5.5) > 0;
          ((R = ae ? 9 : 0.5),
            (I = ae ? kA : Kg),
            (se = 2.6 + Math.sin(V * 9) * 1.5));
        } else if (((Y += le), (I = LA), (se = 0), Y < 0.3)) R = 9;
        else if (Y < 2.6) {
          let ae = 1 - (Y - 0.3) / 2.3;
          R =
            7 *
            ae *
            ae *
            (Math.sin(Y * 37) * Math.sin(Y * 13.3) > -0.2 ? 1 : 0.08);
        } else R = 0;
        if (
          ((fe.level = R),
          B(ee.copy(I), R),
          (L += (se - L) * Math.min(1, le * (P === "cut" ? 1.6 : 3))),
          Math.abs(L) > 0.001)
        )
          for (let ae of me) ae.rotateY(L * le);
        if (Math.abs(oe - Z) > 1e-4 || Math.abs(J) > 0.001) {
          J += (-(Z - oe) * 30 - J * 3.2) * le;
          let ae = Z + J * le;
          (ae < 0 && ((ae = 0), (J = Math.abs(J) * 0.3)),
            ae > 1.9 && ((ae = 1.9), (J = -Math.abs(J) * 0.4)));
          let k = ae - Z;
          Z = ae;
          for (let ce of ue) ce.rotateY(-k);
        }
      }),
      e.state === "cut")
    ) {
      fe.setState("cut");
      for (let le = 0; le < 80; le++) fe.update(0.05);
    } else
      (e.state === "cutting" && fe.setState("cutting"),
        fe.update(0),
        P === "live" && B(ee.copy(Kg), 6));
    return qi(X, "relay_node", Gi.relay_node.slice(0, 3), [
      { min: [-0.68, 0, -0.48], max: [0.68, 0.16, 0.48], surface: "concrete" },
      { min: [-0.57, 0.16, -0.32], max: [0.57, 1.67, 0.33], surface: "metal" },
      {
        min: [-0.42, 1.67, -0.26],
        max: [-0.18, 2.5, -0.02],
        surface: "metal",
        bulletOnly: !0,
      },
    ]);
  }

for (let i of ["container20", "container40", "container40hc"])
    _i(i, (e, t) => M3(e, i, t));

_i("jersey_barrier", S3);

_i("light_mast", T3);

_i("fence_panel", A3);

_i("guard_booth", R3);

_i("gate_arm", C3);

_i("bollard_mooring", P3);

_i("bollard_post", I3);

_i("sign_post", z3);

_i("floodlight_stand", D3);

_i("stairs_metal", k3);

_i("catwalk", F3);

_i("shelf_rack", U3);

_i("reefer_unit", N3);

_i("relay_node", B3);

var At = Math.PI,
    tt = Math.PI / 2,
    zi = (i, e, t) => Math.min(t, Math.max(e, i));

function Za(i, e, t) {
    let n =
      Math.imul(i, 374761393) ^
      Math.imul(e, 668265263) ^
      Math.imul(t, 2147483647);
    return (
      (n = Math.imul(n ^ (n >>> 13), 1274126177)),
      ((n ^ (n >>> 16)) >>> 0) / 4294967296
    );
  }

function gn(i, e = 0, t = 0) {
    let n = Math.floor(i),
      s = Math.floor(e),
      o = Math.floor(t),
      r = i - n,
      a = e - s,
      l = t - o;
    ((r = r * r * (3 - 2 * r)),
      (a = a * a * (3 - 2 * a)),
      (l = l * l * (3 - 2 * l)));
    let c = (u, h, f) => u + (h - u) * f;
    return c(
      c(
        c(Za(n, s, o), Za(n + 1, s, o), r),
        c(Za(n, s + 1, o), Za(n + 1, s + 1, o), r),
        a,
      ),
      c(
        c(Za(n, s, o + 1), Za(n + 1, s, o + 1), r),
        c(Za(n, s + 1, o + 1), Za(n + 1, s + 1, o + 1), r),
        a,
      ),
      l,
    );
  }

function Mf(i, e, t, n) {
    let s = new nt();
    return (
      s.setAttribute("position", new et(new Float32Array(i), 3)),
      e && s.setAttribute("normal", new et(new Float32Array(e), 3)),
      s.setAttribute("uv", new et(new Float32Array(t), 2)),
      n && s.setIndex(n),
      e || s.computeVertexNormals(),
      s
    );
  }

function us(i, e = 16) {
    let t = i.length,
      n = [],
      s = [],
      o = [],
      r = [],
      a = [],
      l = [],
      c = [],
      u = 0,
      h = 0;
    for (let f = 0; f < t; f++) {
      let p = 0,
        d = 0;
      if (f > 0) {
        let g = i[f][0] - i[f - 1][0],
          x = i[f][1] - i[f - 1][1],
          y = Math.hypot(g, x);
        y > 1e-6 && ((p += g / y), (d += x / y), (h += y));
      }
      if (f < t - 1) {
        let g = i[f + 1][0] - i[f][0],
          x = i[f + 1][1] - i[f][1],
          y = Math.hypot(g, x);
        y > 1e-6 && ((p += g / y), (d += x / y));
      }
      let v = Math.hypot(p, d) || 1;
      (a.push(d / v), l.push(-p / v), c.push(h), (u = Math.max(u, i[f][0])));
    }
    for (let f = 0; f < t; f++)
      for (let p = 0; p <= e; p++) {
        let d = (p / e) * At * 2,
          v = Math.cos(d),
          g = Math.sin(d);
        (n.push(i[f][0] * v, i[f][1], i[f][0] * g),
          s.push(a[f] * v, l[f], a[f] * g),
          o.push((p / e) * At * 2 * u, c[f]));
      }
    for (let f = 0; f < t - 1; f++)
      if (!(Math.hypot(i[f + 1][0] - i[f][0], i[f + 1][1] - i[f][1]) < 1e-6))
        for (let p = 0; p < e; p++) {
          let d = f * (e + 1) + p,
            v = d + e + 1,
            g = v + 1,
            x = d + 1;
          (i[f][0] > 1e-6 && r.push(d, v, x),
            i[f + 1][0] > 1e-6 && r.push(v, g, x));
        }
    return Mf(n, s, o, r);
  }

function Ge(i, e, t, n = 0.008, s = "center") {
    let o = [i / 2, e / 2, t / 2];
    n = Math.min(n, o[0] * 0.9, o[1] * 0.9, o[2] * 0.9);
    let r = [],
      a = [],
      l = [],
      c = [];
    for (let p = 0; p < 8; p++)
      for (let d = 0; d < 3; d++) {
        let v = [p & 1 ? 1 : -1, p & 2 ? 1 : -1, p & 4 ? 1 : -1],
          g = [0, 1, 2].map((x) => v[x] * (o[x] - (x !== d ? n : 0)));
        (r.push(g[0], g[1], g[2]),
          a.push(d === 0 ? v[0] : 0, d === 1 ? v[1] : 0, d === 2 ? v[2] : 0),
          d === 0
            ? l.push(g[2], g[1])
            : d === 1
              ? l.push(g[0], g[2])
              : l.push(g[0], g[1]));
      }
    let u = (p, d) => p * 3 + d,
      h = (p, d, v, g, x, y) => {
        let b = r[d * 3] - r[p * 3],
          m = r[d * 3 + 1] - r[p * 3 + 1],
          A = r[d * 3 + 2] - r[p * 3 + 2],
          _ = r[v * 3] - r[p * 3],
          M = r[v * 3 + 1] - r[p * 3 + 1],
          E = r[v * 3 + 2] - r[p * 3 + 2];
        (m * E - A * M) * g + (A * _ - b * E) * x + (b * M - m * _) * y >= 0
          ? c.push(p, d, v)
          : c.push(p, v, d);
      };
    for (let p = 0; p < 3; p++) {
      let d = (p + 1) % 3,
        v = (p + 2) % 3;
      for (let g of [0, 1]) {
        let x = [
            [0, 0],
            [1, 0],
            [1, 1],
            [0, 1],
          ].map(([b, m]) => (g << p) | (b << d) | (m << v)),
          y = [0, 0, 0];
        ((y[p] = g ? 1 : -1),
          h(u(x[0], p), u(x[1], p), u(x[2], p), ...y),
          h(u(x[0], p), u(x[2], p), u(x[3], p), ...y));
      }
      for (let g of [0, 1])
        for (let x of [0, 1]) {
          let y = (g << d) | (x << v),
            b = y | (1 << p),
            m = [0, 0, 0];
          ((m[d] = g ? 1 : -1),
            (m[v] = x ? 1 : -1),
            h(u(y, d), u(b, d), u(b, v), ...m),
            h(u(y, d), u(b, v), u(y, v), ...m));
        }
    }
    for (let p = 0; p < 8; p++)
      h(
        u(p, 0),
        u(p, 1),
        u(p, 2),
        p & 1 ? 1 : -1,
        p & 2 ? 1 : -1,
        p & 4 ? 1 : -1,
      );
    let f = Mf(r, a, l, c);
    return (s === "bottom" && f.translate(0, e / 2, 0), f);
  }

function eo(i, e, t, n = 0.03, s = 3, o = 3, r = 3, a = "center") {
    let l = new un(i, e, t, s, o, r),
      c = l.attributes.position,
      u = l.attributes.normal,
      h = l.attributes.uv,
      f = i / 2,
      p = e / 2,
      d = t / 2;
    n = Math.min(n, f * 0.95, p * 0.95, d * 0.95);
    let v = (x, y, b) => {
        if (Math.abs(x) > y - 1e-6 || b < 3) return x;
        let m = (2 * y) / b;
        return (x * (y - n)) / (y - m);
      },
      g = new W();
    for (let x = 0; x < c.count; x++) {
      let y = v(c.getX(x), f, s),
        b = v(c.getY(x), p, o),
        m = v(c.getZ(x), d, r),
        A = zi(y, -(f - n), f - n),
        _ = zi(b, -(p - n), p - n),
        M = zi(m, -(d - n), d - n);
      (g.set(y - A, b - _, m - M),
        (Math.abs(y) > f - 1e-5 ? 1 : 0) +
          (Math.abs(b) > p - 1e-5 ? 1 : 0) +
          (Math.abs(m) > d - 1e-5 ? 1 : 0) >=
          2 &&
          g.lengthSq() > 1e-12 &&
          (g.normalize(),
          (y = A + g.x * n),
          (b = _ + g.y * n),
          (m = M + g.z * n),
          u.setXYZ(x, g.x, g.y, g.z)),
        c.setXYZ(x, y, b, m));
      let w = Math.abs(u.getX(x)),
        S = Math.abs(u.getY(x)),
        z = Math.abs(u.getZ(x));
      w >= S && w >= z
        ? h.setXY(x, m, b)
        : S >= w && S >= z
          ? h.setXY(x, y, m)
          : h.setXY(x, y, b);
    }
    return (a === "bottom" && l.translate(0, e / 2, 0), l);
  }

function to(i, e) {
    let t = i.attributes.position,
      n = new W();
    for (let s = 0; s < t.count; s++)
      (n.fromBufferAttribute(t, s), e(n, s), t.setXYZ(s, n.x, n.y, n.z));
    return i;
  }

function gr(i) {
    let e = i.attributes.position,
      t = i.index,
      n = e.count,
      s = new Map(),
      o = (f) =>
        Math.round(e.getX(f) * 2e3) +
        "," +
        Math.round(e.getY(f) * 2e3) +
        "," +
        Math.round(e.getZ(f) * 2e3),
      r = new Array(n);
    for (let f = 0; f < n; f++) r[f] = o(f);
    let a = new W(),
      l = new W(),
      c = new W(),
      u = t ? t.count : n;
    for (let f = 0; f < u; f += 3) {
      let p = t ? t.getX(f) : f,
        d = t ? t.getX(f + 1) : f + 1,
        v = t ? t.getX(f + 2) : f + 2;
      (a.fromBufferAttribute(e, p),
        l.fromBufferAttribute(e, d),
        c.fromBufferAttribute(e, v),
        l.sub(a),
        c.sub(a),
        l.cross(c));
      for (let g of [p, d, v]) {
        let x = s.get(r[g]);
        (x || ((x = [0, 0, 0]), s.set(r[g], x)),
          (x[0] += l.x),
          (x[1] += l.y),
          (x[2] += l.z));
      }
    }
    let h = new Float32Array(n * 3);
    for (let f = 0; f < n; f++) {
      let p = s.get(r[f]) || [0, 1, 0],
        d = Math.hypot(p[0], p[1], p[2]) || 1;
      ((h[f * 3] = p[0] / d),
        (h[f * 3 + 1] = p[1] / d),
        (h[f * 3 + 2] = p[2] / d));
    }
    return (i.setAttribute("normal", new et(h, 3)), i);
  }

function M1(i) {
    if (i.index) {
      let t = i.index.array;
      for (let n = 0; n < t.length; n += 3) {
        let s = t[n + 1];
        ((t[n + 1] = t[n + 2]), (t[n + 2] = s));
      }
    } else
      for (let t of Object.keys(i.attributes)) {
        let n = i.attributes[t],
          s = n.itemSize,
          o = n.array;
        for (let r = 0; r < n.count; r += 3)
          for (let a = 0; a < s; a++) {
            let l = o[(r + 1) * s + a];
            ((o[(r + 1) * s + a] = o[(r + 2) * s + a]),
              (o[(r + 2) * s + a] = l));
          }
      }
    let e = i.attributes.normal.array;
    for (let t = 0; t < e.length; t++) e[t] = -e[t];
    return i;
  }

function ev(i, e) {
    let t = i.groups[e];
    if (!t) return i;
    let n = Array.from(i.index.array);
    (n.splice(t.start, t.count), i.setIndex(n));
    for (let s of i.groups) s.start > t.start && (s.start -= t.count);
    return ((t.count = 0), i);
  }

var O3 = new Lt(),
    FA = new W(0, 1, 0),
    _1 = new W(),
    H3 = new Ye();

function vn(i, e, t = 0.02, n = 6, s = !1, o = t) {
    _1.set(e[0] - i[0], e[1] - i[1], e[2] - i[2]);
    let r = _1.length();
    _1.normalize();
    let a = ot(o, t, r, n, !s);
    return (
      O3.setFromUnitVectors(FA, _1),
      H3.compose(
        new W((i[0] + e[0]) / 2, (i[1] + e[1]) / 2, (i[2] + e[2]) / 2),
        O3,
        new W(1, 1, 1),
      ),
      a.applyMatrix4(H3),
      a
    );
  }

function Mo(i, e, { soft: t = 0.6, caps: n = !0 } = {}) {
    let s = i.length,
      o = [],
      r = [],
      a = [],
      l = [],
      c = e / 2,
      u = [],
      h = 0,
      f = [0];
    for (let d = 0; d < s; d++) {
      let v = i[d],
        g = i[(d + 1) % s],
        x = g[0] - v[0],
        y = g[1] - v[1],
        b = Math.hypot(x, y) || 1;
      (u.push([y / b, -x / b]), (h += b), f.push(h));
    }
    let p = (d, v) => {
      let g = u[d],
        x = u[(v + s) % s];
      if (g[0] * x[0] + g[1] * x[1] > Math.cos(t)) {
        let y = g[0] + x[0],
          b = g[1] + x[1],
          m = Math.hypot(y, b) || 1;
        return [y / m, b / m];
      }
      return g;
    };
    for (let d = 0; d < s; d++) {
      let v = i[d],
        g = i[(d + 1) % s],
        x = p(d, d - 1),
        y = p(d, d + 1),
        b = o.length / 3;
      (o.push(v[0], v[1], c, v[0], v[1], -c, g[0], g[1], -c, g[0], g[1], c),
        r.push(x[0], x[1], 0, x[0], x[1], 0, y[0], y[1], 0, y[0], y[1], 0),
        a.push(f[d], c, f[d], -c, f[d + 1], -c, f[d + 1], c),
        l.push(b, b + 1, b + 2, b, b + 2, b + 3));
    }
    if (n) {
      let d = Xs.triangulateShape(
        i.map((v) => new Ae(v[0], v[1])),
        [],
      );
      for (let v of [1, -1]) {
        let g = o.length / 3;
        for (let x of i)
          (o.push(x[0], x[1], v * c), r.push(0, 0, v), a.push(x[0], x[1]));
        for (let x of d)
          v > 0
            ? l.push(g + x[0], g + x[1], g + x[2])
            : l.push(g + x[0], g + x[2], g + x[1]);
      }
    }
    return Mf(o, r, a, l);
  }

function vr(i, e, t = !0) {
    let n = i.length,
      s = [],
      o = [],
      r = [],
      a = 0,
      l = Math.hypot(e[0], e[1], e[2]) * 2;
    for (let p = 0; p < n; p++)
      (p &&
        (a += Math.hypot(
          i[p][0] - i[p - 1][0],
          i[p][1] - i[p - 1][1],
          i[p][2] - i[p - 1][2],
        )),
        s.push(
          i[p][0] - e[0],
          i[p][1] - e[1],
          i[p][2] - e[2],
          i[p][0] + e[0],
          i[p][1] + e[1],
          i[p][2] + e[2],
        ),
        o.push(a, 0, a, l));
    for (let p = 0; p < n - 1; p++) {
      let d = p * 2;
      r.push(d, d + 1, d + 3, d, d + 3, d + 2);
    }
    let c = Mf(s, null, o, r);
    if (!t) return c;
    let u = c.clone(),
      h = u.index.array;
    for (let p = 0; p < h.length; p += 3) {
      let d = h[p + 1];
      ((h[p + 1] = h[p + 2]), (h[p + 2] = d));
    }
    let f = u.attributes.normal.array;
    for (let p = 0; p < f.length; p++) f[p] = -f[p];
    return Ii([c, u]);
  }

function _f(i, e) {
    return new rn(i, e);
  }

function UA(i, e, t, n = 4) {
    let s = [],
      o = [],
      r = [],
      a = [];
    for (let l = 0; l <= n; l++) {
      let c = ((l / n - 0.5) * e) / i,
        u = Math.sin(c),
        h = Math.cos(c);
      (s.push(i * u, -t / 2, i * h, i * u, t / 2, i * h),
        o.push(u, 0, h, u, 0, h),
        r.push(l / n, 0, l / n, 1));
    }
    for (let l = 0; l < n; l++) {
      let c = l * 2;
      a.push(c, c + 2, c + 3, c, c + 3, c + 1);
    }
    return Mf(s, o, r, a);
  }

function ja(i, e, t = 6, n = 12, s = At * 2) {
    let o = new Ci(i, e, t, n, s),
      r = o.attributes.uv;
    for (let a = 0; a < r.count; a++)
      r.setXY(a, r.getX(a) * s * i, r.getY(a) * 2 * At * e);
    return o;
  }

function Y3(i, e = 8, t = 6) {
    let n = new ls(i, e, t),
      s = n.attributes.uv;
    for (let o = 0; o < s.count; o++)
      s.setXY(o, s.getX(o) * 2 * At * i, s.getY(o) * At * i);
    return n;
  }

function NA(i, e) {
    let t = i.attributes.position.count,
      n = i.attributes.color;
    if (
      (n ||
        ((n = new et(new Float32Array(t * 3).fill(1), 3)),
        i.setAttribute("color", n)),
      e === 1 || e == null)
    )
      return i;
    let s = n.array;
    if (typeof e == "function") {
      let l = i.attributes.position;
      for (let c = 0; c < t; c++) {
        let u = e(l.getX(c), l.getY(c), l.getZ(c));
        typeof u == "number"
          ? ((s[c * 3] *= u), (s[c * 3 + 1] *= u), (s[c * 3 + 2] *= u))
          : ((s[c * 3] *= u[0]),
            (s[c * 3 + 1] *= u[1]),
            (s[c * 3 + 2] *= u[2]));
      }
      return i;
    }
    let o = typeof e == "number" ? e : e[0],
      r = typeof e == "number" ? e : e[1],
      a = typeof e == "number" ? e : e[2];
    for (let l = 0; l < t; l++)
      ((s[l * 3] *= o), (s[l * 3 + 1] *= r), (s[l * 3 + 2] *= a));
    return i;
  }

var V3 = {
    red: ["paint_red", 1],
    blue: ["paint_blue", 1],
    green: ["paint_green", 1],
    yellow: ["paint_yellow", 1],
    orange: ["paint_orange", 1],
    white: ["paint_white", 1],
    grey: ["paint_grey", 1],
    teal: ["paint_teal", 1],
    rust: ["steel_rust", 1],
    black: ["paint_grey", [0.2, 0.2, 0.22]],
    olive: ["paint_green", [0.75, 0.8, 0.45]],
  };

function Ja(i, e = "blue") {
    return V3[i] || V3[e];
  }

var pI = new Ye(),
    W3 = new Lt(),
    G3 = new In(),
    q3 = new W(),
    Qg = new W();

function BA({ p: i = [0, 0, 0], r: e = [0, 0, 0], s: t = 1 } = {}) {
    return (
      G3.set(e[0], e[1], e[2]),
      W3.setFromEuler(G3),
      q3.set(i[0], i[1], i[2]),
      typeof t == "number" ? Qg.set(t, t, t) : Qg.set(t[0], t[1], t[2]),
      new Ye().compose(q3, W3, Qg)
    );
  }

var Kn = class {
      constructor(e, t, n = 1) {
        ((this.G = e),
          (this.name = t),
          (this.seed = Math.abs(n | 0)),
          (this.rng = il((this.seed + 1) * 7919 + t.length * 131)),
          (this.b = new Map()),
          (this.stack = [new Ye()]));
      }
      push(e) {
        return (
          this.stack.push(
            this.stack[this.stack.length - 1].clone().multiply(BA(e)),
          ),
          this
        );
      }
      pop() {
        return (this.stack.pop(), this);
      }
      mat(e, t) {
        return this.G.mats.get(e, { vertexColors: !0, ...(t || {}) });
      }
      add(e, t, n, s = 1, { raw: o = !1, cast: r = !0 } = {}) {
        let a = typeof e == "string" ? this.mat(e) : e;
        (n && Dc(t, n),
          t.applyMatrix4(this.stack[this.stack.length - 1]),
          o || NA(t, s));
        let l = a.uuid + (r ? "c" : "n"),
          c = this.b.get(l);
        return (
          c || ((c = { mat: a, geos: [], raw: o, cast: r }), this.b.set(l, c)),
          c.geos.push(t),
          this
        );
      }
      decal(e, t, n, s) {
        return this.add(e.material, _f(t, s || t / (e.aspect || 1)), n, 1, {
          raw: !0,
          cast: !1,
        });
      }
      label(e, t, n, s, o) {
        let r = this.G.mats.label(e, t),
          a = Math.min(n, s * (r.aspect || 1));
        return this.add(r.material, _f(a, a / (r.aspect || 1)), o, 1, {
          raw: !0,
          cast: !1,
        });
      }
      cdecal(e, t, n, s, o) {
        return this.add(e.material, UA(t, n, o || n / (e.aspect || 1)), s, 1, {
          raw: !0,
          cast: !1,
        });
      }
      finish({ size: e, colliders: t, grime: n = 1, surface: s } = {}) {
        let o = new wt(),
          r = this.seed * 3.71;
        for (let c of this.b.values()) {
          let u = Ii(c.geos);
          if (!c.raw && n > 0 && u.attributes.color) {
            let f = u.attributes.position,
              p = u.attributes.normal,
              d = u.attributes.color.array;
            for (let v = 0; v < f.count; v++) {
              let g = f.getX(v),
                x = f.getY(v),
                y = f.getZ(v),
                b = p.getY(v),
                m = gn(g * 1.9 + r, x * 1.9, y * 1.9 + 5.3),
                A = gn(g * 9 + 2.1, x * 9 + r, y * 9),
                _ =
                  (0.82 + 0.18 * m) *
                  (0.92 + 0.08 * A) *
                  (0.76 + 0.24 * zi(b * 0.6 + 0.62, 0, 1)),
                M = zi(1 - x / 0.2, 0, 1);
              ((_ *= 1 - 0.42 * M * M * (0.55 + 0.45 * A)),
                (_ = 1 + (_ - 1) * n),
                (d[v * 3] *= _),
                (d[v * 3 + 1] *= _ * (1 - 0.05 * M * n)),
                (d[v * 3 + 2] *= _ * (1 - 0.12 * M * n)));
            }
          }
          let h = new Qe(u, c.mat);
          ((h.castShadow = c.cast), (h.receiveShadow = !0), o.add(h));
        }
        let a = Gi[this.name] || [1, 1, 1, "", "metal"],
          l = e || [a[0], a[1], a[2]];
        return (
          (o.userData.size = l),
          (o.userData.colliders = t || [
            {
              min: [-l[0] / 2, 0, -l[2] / 2],
              max: [l[0] / 2, l[1], l[2] / 2],
              surface: s || a[4],
            },
          ]),
          o
        );
      }
    },
    X3 = new Map();

function wf(i, e) {
    let t = X3.get(i);
    return (t || ((t = e()), X3.set(i, t)), t.clone(!0));
  }

var j3 = (i, e, t) => {
    let n = zi((t - i) / (e - i), 0, 1);
    return n * n * (3 - 2 * n);
  };

function $3(i, e, t = 0, n = 0) {
    let s = new lt.PlaneGeometry(i, e),
      o = s.attributes.uv,
      r = s.attributes.position;
    for (let a = 0; a < o.count; a++) o.setXY(a, r.getX(a) + t, r.getY(a) + n);
    return s;
  }

var w1 = { pz: [0, 0, 0], nz: [0, At, 0], px: [0, tt, 0], nx: [0, -tt, 0] };

function OA(i) {
    let t = [
      [0, 0.016],
      [0.262, 0.016],
      [0.262, 0.016],
      [0.268, 0.002],
      [0.288, 0],
      [0.295, 0.008],
      [0.295, 0.022],
      [0.284, 0.034],
    ];
    for (let n of [0.305, 0.595])
      t.push(
        [0.283, n - 0.03],
        [0.291, n - 0.018],
        [0.297, n],
        [0.291, n + 0.018],
        [0.283, n + 0.03],
      );
    return (
      t.push(
        [0.284, 0.866],
        [0.295, 0.878],
        [0.295, 0.892],
        [0.288, 0.9],
        [0.268, 0.898],
      ),
      i
        ? t.push(
            [0.268, 0.898],
            [0.272, 0.888],
            [0.272, 0.03],
            [0.272, 0.03],
            [0, 0.03],
          )
        : t.push([0.262, 0.884], [0.262, 0.884], [0, 0.884]),
      t
    );
  }

function HA(i, e, t) {
    let n = new Kn(i, "barrel", t),
      s = n.rng,
      o = 22,
      [r, a] = Ja(e.color, "blue");
    e.lying && n.push({ p: [-0.45, 0.297, 0], r: [0, 0, -tt] });
    let l = us(OA(!!e.open), o),
      c = [];
    for (let d = 0; d < 2 + (t % 2); d++)
      c.push([
        s() * At * 2,
        s.range(0.12, 0.78),
        s.range(0.07, 0.13),
        s.range(0.006, 0.014),
      ]);
    (to(l, (d) => {
      let v = Math.hypot(d.x, d.z);
      if (v < 0.27) return;
      let g = Math.atan2(d.z, d.x);
      for (let x of c) {
        let y = Math.abs(g - x[0]) % (At * 2);
        y > At && (y = At * 2 - y);
        let b = Math.hypot(y * 0.285, d.y - x[1]);
        if (b < x[2]) {
          let m = 1 - (x[3] * (0.5 + 0.5 * Math.cos((At * b) / x[2]))) / v;
          ((d.x *= m), (d.z *= m));
        }
      }
    }),
      l.computeVertexNormals());
    let u = l.attributes.normal,
      h = l.attributes.position.count / (o + 1);
    for (let d = 0; d < h; d++) {
      let v = d * (o + 1),
        g = v + o,
        x = u.getX(v) + u.getX(g),
        y = u.getY(v) + u.getY(g),
        b = u.getZ(v) + u.getZ(g),
        m = Math.hypot(x, y, b) || 1;
      (u.setXYZ(v, x / m, y / m, b / m), u.setXYZ(g, x / m, y / m, b / m));
    }
    let f = t * 2.37,
      p = e.color === "rust";
    return (
      n.add(r, l, null, (d, v, g) => {
        let x = Math.hypot(d, g),
          y = Math.atan2(g, d);
        if (x < 0.27) {
          let w = v > 0.5 ? 0.62 + 0.3 * gn(d * 9 + f, g * 9) : 0.6;
          return [w, w, w];
        }
        let b = Math.pow(gn(y * 2.6 + f, 3.1), 2.2),
          m =
            v > 0.6
              ? (0.88 - v) / 0.28
              : v > 0.31
                ? (0.6 - v) / 0.29
                : (0.31 - v) / 0.31,
          A = 1 - 0.55 * b * (1 - 0.6 * zi(m, 0, 1)),
          M = (x > 0.289 ? 1 : 0) * (0.35 + 0.65 * gn(y * 7 + f, v * 20)),
          E = [A * (1 - 0.25 * M), A * (1 - 0.42 * M), A * (1 - 0.55 * M)];
        return (
          typeof a != "number" &&
            ((E[0] *= a[0]), (E[1] *= a[1]), (E[2] *= a[2])),
          E
        );
      }),
      e.open ||
        (n.add(
          "steel_galv",
          ot(0.036, 0.038, 0.016, 8),
          { p: [0.17, 0.891, 0.02] },
          0.8,
        ),
        n.add(
          "steel_galv",
          ot(0.017, 0.018, 0.014, 8),
          { p: [-0.16, 0.89, -0.08] },
          0.8,
        )),
      !p &&
        t % 3 !== 2 &&
        n.cdecal(i.mats.decal("hazard_flammable"), 0.2855, 0.15, {
          p: [0, 0.455, 0],
          r: [0, 0.9 + t, 0],
        }),
      t % 2 === 0 &&
        n.cdecal(
          i.mats.label("UN 1202", {
            color:
              p || e.color === "white" || e.color === "yellow"
                ? "black"
                : "white",
            font: "stencil",
            distress: 0.5,
          }),
          0.2855,
          0.2,
          { p: [0, 0.74, 0], r: [0, 2.6 + t, 0] },
        ),
      n.finish(e.lying ? { size: [0.9, 0.6, 0.6] } : {})
    );
  }

function S1(i, e, { broken: t = !1, stamp: n = !0, bevel: s = !1 } = {}) {
    let o = s ? (u, h, f) => Ge(u, h, f, 0.004) : (u, h, f) => $e(u, h, f),
      r = () => {
        let u = e.range(0.62, 1),
          h = e.range(0.9, 1);
        return [u, u * (0.93 + 0.07 * h), u * (0.82 + 0.18 * h)];
      },
      a = (u = 0.003) => e.range(-u, u);
    for (let [u, h] of [
      [-0.45, 0.1],
      [0, 0.145],
      [0.45, 0.1],
    ])
      i.add(
        "wood_pallet",
        o(1.2, 0.022, h),
        { p: [a(), 0.011, u + a()], r: [0, a(0.006), 0] },
        r(),
      );
    let l = (u, h, f = 0.012) => [
      [-u / 2 + f, -h / 2],
      [u / 2 - f, -h / 2],
      [u / 2, -h / 2 + f],
      [u / 2, h / 2 - f],
      [u / 2 - f, h / 2],
      [-u / 2 + f, h / 2],
      [-u / 2, h / 2 - f],
      [-u / 2, -h / 2 + f],
    ];
    for (let u of [-0.5275, 0, 0.5275])
      for (let h of [-0.45, 0, 0.45])
        i.add(
          "wood_pallet",
          Mo(l(0.145, h === 0 ? 0.145 : 0.1), 0.078, { caps: !1, soft: 0 }),
          { p: [u + a(), 0.061, h + a()], r: [-tt, a(0.03), 0] },
          r().map((f) => f * 0.8),
        );
    for (let u of [-0.5275, 0, 0.5275])
      i.add(
        "wood_pallet",
        o(0.145, 0.022, 1),
        { p: [u + a(), 0.111, a()], r: [0, a(0.006), 0] },
        r(),
      );
    if (
      ([
        [-0.4275, 0.145],
        [-0.215, 0.1],
        [0, 0.145],
        [0.215, 0.1],
        [0.4275, 0.145],
      ].forEach(([u, h], f) => {
        (t && f === 3) ||
          i.add(
            "wood_pallet",
            o(1.2, 0.022, h),
            { p: [a(), 0.133, u + a(0.006)], r: [a(0.004), a(0.008), 0] },
            r(),
          );
      }),
      n)
    ) {
      let u = i.G.mats.label("EUR", {
        color: "black",
        font: "sans",
        distress: 0.6,
      });
      (i.decal(u, 0.085, { p: [-0.5275, 0.062, 0.5015] }),
        i.decal(u, 0.085, { p: [0.5275, 0.062, -0.5015], r: [0, At, 0] }));
    }
  }

function VA(i, e, t) {
    let n = new Kn(i, "pallet", t);
    return (S1(n, n.rng, { broken: !!e.broken, bevel: !0 }), n.finish());
  }

function WA(i, e) {
    let t = new Kn(i, "pallet_stack", e.seed || 0),
      n = t.rng,
      s = zi(e.count | 0 || 8, 1, 12);
    for (let o = 0; o < s; o++) {
      let r = o === s - 1;
      (t.push({
        p: [
          o ? n.range(-0.028, 0.028) : 0,
          o * 0.144,
          o ? n.range(-0.022, 0.022) : 0,
        ],
        r: [
          0,
          n.range(-0.035, 0.035) +
            (n() < 0.3 ? At : 0) +
            (r ? n.range(-0.06, 0.06) : 0),
          0,
        ],
      }),
        S1(t, n, { broken: !r && n() < 0.2, stamp: o % 3 === 0, bevel: r }),
        t.pop());
    }
    return t.finish({ size: [1.2, s * 0.144, 1] });
  }

function E1(
    i,
    e,
    t,
    n,
    {
      detail: s = !0,
      label: o = "FRAGILE",
      code: r = "B4-117",
      skids: a = !0,
    } = {},
  ) {
    let l = i.rng,
      c = i.G,
      u = 0.022,
      h = 0.07,
      f = a ? 0.07 : 0,
      p = t - f,
      d = f + p / 2,
      v = (z = 1) => {
        let H = l.range(0.7, 1) * z;
        return [H, H * l.range(0.92, 1), H * l.range(0.82, 0.95)];
      },
      g = s ? (z, H, O) => Ge(z, H, O, 0.004) : (z, H, O) => $e(z, H, O);
    if (a)
      for (let z of [-(e / 2 - 0.13), 0, e / 2 - 0.13])
        i.add(
          "wood_pallet",
          Ge(0.09, f, n - 0.02, 0.006),
          { p: [z, f / 2, 0] },
          v(0.6),
        );
    i.add(
      "wood_dark",
      $e(e - 2 * u - 0.012, p - u - 0.012, n - 2 * u - 0.012),
      { p: [0, f + (p - u - 0.012) / 2 + 0.002, 0] },
      0.25,
    );
    let x = Math.max(3, Math.round(p / 0.125)),
      y = p / x;
    for (let z = 0; z < x; z++) {
      let H = f + y * (z + 0.5);
      for (let [O, q, U] of [
        ["pz", e, n / 2 - u],
        ["nz", e, n / 2 - u],
        ["px", n, e / 2 - u],
        ["nx", n, e / 2 - u],
      ]) {
        let T = U - l.range(0, 0.004),
          D =
            O === "pz"
              ? [0, H, T]
              : O === "nz"
                ? [0, H, -T]
                : O === "px"
                  ? [T, H, 0]
                  : [-T, H, 0];
        i.add(
          "wood_pallet",
          $3(q - 0.03, y - 0.005, l() * 3, l() * 3),
          { p: D, r: w1[O] },
          v(),
        );
      }
    }
    let b = Math.max(3, Math.round(n / 0.13)),
      m = (n - 0.02) / b;
    for (let z = 0; z < b; z++)
      i.add(
        "wood_pallet",
        $3(e - 0.03, m - 0.005, l() * 3, l() * 3),
        {
          p: [0, t - u - l.range(0, 0.003), -n / 2 + 0.01 + m * (z + 0.5)],
          r: [-tt, 0, 0],
        },
        v(),
      );
    let A = Math.atan2(p - 2 * h, e - 2 * h),
      _ = Math.hypot(e - 2 * h, p - 2 * h);
    for (let z of [1, -1]) {
      let H = z * (n / 2 - u / 2);
      (i.add("wood_pallet", g(e, h, u), { p: [0, f + h / 2, H] }, v(0.85)),
        i.add("wood_pallet", g(e, h, u), { p: [0, t - h / 2, H] }, v(0.85)));
      for (let U of [1, -1])
        i.add(
          "wood_pallet",
          g(h, p - 2 * h, u),
          { p: [U * (e / 2 - h / 2), d, H] },
          v(0.85),
        );
      s &&
        i.add(
          "wood_pallet",
          Ge(_, h * 0.85, u * 0.8, 0.004),
          { p: [0, d, z * (n / 2 - u * 0.6)], r: [0, 0, z * A] },
          v(0.8),
        );
      let O = z * (e / 2 - u / 2),
        q = n - 2 * u;
      for (let U of [1, -1])
        i.add(
          "wood_pallet",
          g(u, p, h),
          { p: [O, d, U * (q / 2 - h / 2)] },
          v(0.85),
        );
      (i.add(
        "wood_pallet",
        g(u, h, q - 2 * h),
        { p: [O, f + h / 2, 0] },
        v(0.85),
      ),
        i.add(
          "wood_pallet",
          g(u, h, q - 2 * h),
          { p: [O, t - h / 2, 0] },
          v(0.85),
        ),
        i.add(
          "wood_pallet",
          g(e, u, h),
          { p: [0, t - u / 2, z * (n / 2 - h / 2)] },
          v(0.85),
        ),
        i.add(
          "wood_pallet",
          g(h, u, n - 2 * h),
          { p: [z * (e / 2 - h / 2), t - u / 2, 0] },
          v(0.85),
        ));
    }
    s &&
      i.add(
        "wood_pallet",
        Ge(h, u, n - 2 * h, 0.004),
        { p: [0, t - u / 2, 0] },
        v(0.85),
      );
    let M = 0.085,
      E = () => {
        let z = l.range(0.55, 0.9);
        return [z, z * 0.9, z * 0.8];
      };
    for (let z of [1, -1])
      for (let H of [1, -1])
        for (let O of s ? [1, 0] : [1]) {
          let q = O ? t - M / 2 : f + M / 2,
            U = E();
          (i.add(
            "steel_galv",
            $e(M, M, 0.003),
            { p: [z * (e / 2 - M / 2), q, H * (n / 2 + 0.0015)] },
            U,
          ),
            i.add(
              "steel_galv",
              $e(0.003, M, M),
              { p: [z * (e / 2 + 0.0015), q, H * (n / 2 - M / 2)] },
              U,
            ),
            O &&
              i.add(
                "steel_galv",
                $e(M, 0.003, M),
                { p: [z * (e / 2 - M / 2), t + 0.0015, H * (n / 2 - M / 2)] },
                U,
              ));
        }
    let w = n / 2 - u + 0.003,
      S = Math.min(0.11, p * 0.15);
    (o &&
      (i.label(
        o,
        { color: "black", font: "stencil", distress: 0.25 },
        e * 0.4,
        S,
        { p: [-e * 0.2, t - h - S * 0.95, w] },
      ),
      i.label(
        o,
        { color: "black", font: "stencil", distress: 0.25 },
        e * 0.4,
        S,
        { p: [e * 0.2, t - h - S * 0.95, -w], r: [0, At, 0] },
      ),
      i.decal(c.mats.decal("arrow"), Math.min(0.14, p * 0.2), {
        p: [e * 0.27, f + h + p * 0.16, w],
        r: [0, 0, tt],
      })),
      r &&
        i.label(
          r,
          { color: "black", font: "stencil", distress: 0.3 },
          n * 0.5,
          S * 0.9,
          { p: [e / 2 - u + 0.003, d + p * 0.12, 0], r: w1.px },
        ),
      s &&
        i.decal(c.mats.decal("logo_b"), Math.min(0.2, p * 0.25), {
          p: [-(e / 2 - u + 0.003), d - p * 0.05, 0],
          r: w1.nx,
        }));
  }

function GA(i, e) {
    let t = new Kn(i, "crate_wood", e.seed || 0);
    return (
      E1(t, 1.1, 1, 0.9, {
        label:
          e.label === void 0
            ? ["FRAGILE", "THIS SIDE UP", "KEEP DRY", "MACHINERY PARTS"][
                t.seed % 4
              ]
            : e.label,
        code: e.code || "B4-" + [117, 204, 318][t.seed % 3],
      }),
      t.finish()
    );
  }

function qA(i, e) {
    let t = new Kn(i, "crate_stack", e.seed || 0),
      n = t.rng;
    E1(t, 1.2, 0.95, 1, { label: "HEAVY CARGO", code: "NS-04" + (t.seed % 2) });
    let s = {
      x: n.range(-0.1, 0.02),
      z: n.range(-0.05, 0.05),
      th: (n() < 0.5 ? -1 : 1) * n.range(0.1, 0.16),
      L: 0.86,
      W: 0.72,
    };
    (t.push({ p: [s.x, 0.95, s.z], r: [0, s.th, 0] }),
      E1(t, s.L, 0.6, s.W, {
        detail: !1,
        skids: !1,
        label: "FRAGILE",
        code: "B4-204",
      }),
      t.pop());
    let o = {
      x: s.x + n.range(-0.05, 0.05),
      z: s.z + n.range(-0.04, 0.04),
      th: n.range(-0.12, 0.12),
    };
    (t.push({ p: [o.x, 1.55, o.z], r: [0, o.th, 0] }),
      E1(t, 0.55, 0.35, 0.45, { detail: !1, skids: !1, label: "", code: "" }),
      t.pop());
    let r = (a, l, c, u, h) => {
      let f = (a - l.x - h * u * Math.sin(c)) / Math.cos(c);
      return l.z - f * Math.sin(c) + h * u * Math.cos(c);
    };
    for (let a of [-0.2, 0.17]) {
      let c = [],
        u = (h) => [
          [a, 0.09, h * 0.506],
          [a, 0.956, h * 0.506],
          [a, 1.556, r(a, s, s.th, s.W / 2, h) + h * 0.006],
          [a, 1.906, r(a, o, o.th, 0.225, h) + h * 0.006],
        ];
      (c.push(...u(1), ...u(-1).reverse()),
        t.add("paint_orange", vr(c, [0.02, 0, 0]), null, [1, 0.8, 0.5]),
        t.add(
          "steel_worn",
          Ge(0.06, 0.09, 0.025, 0.006),
          { p: [a, 0.62, 0.5 + 0.016] },
          0.8,
        ),
        t.add(
          "steel_dark",
          vn([a - 0.035, 0.66, 0.53], [a + 0.035, 0.66, 0.53], 0.008, 6, !0),
          null,
          0.8,
        ));
    }
    return t.finish();
  }

function XA(i, e) {
    let t = new Kn(i, "ibc_tote", e.seed || 0),
      n = t.rng,
      s = () => n.range(0.75, 1);
    for (let y of [-0.44, 0, 0.44])
      t.add("steel_galv", $e(1.2, 0.028, 0.1), { p: [0, 0.014, y] }, s());
    for (let y of [-0.54, 0, 0.54])
      for (let b of [-0.44, 0, 0.44])
        t.add(
          "steel_galv",
          Ge(0.12, 0.074, 0.1, 0.008),
          { p: [y, 0.065, b] },
          s() * 0.85,
        );
    for (let y of [-0.48, 0.48])
      t.add(
        "steel_galv",
        Ge(1.2, 0.03, 0.04, 0.006),
        { p: [0, 0.115, y] },
        s(),
      );
    for (let y of [-0.58, 0.58])
      t.add(
        "steel_galv",
        Ge(0.04, 0.03, 0.92, 0.006),
        { p: [y, 0.115, 0] },
        s(),
      );
    t.add("steel_galv", $e(1.12, 0.012, 0.92), { p: [0, 0.124, 0] }, 0.6);
    let o = 1.1,
      r = 0.95,
      a = 0.9,
      l = 0.13 + r / 2,
      c = eo(o, r, a, 0.07, 8, 6, 8);
    (to(c, (y) => {
      let b = y.x / (o / 2),
        m = y.y / (r / 2),
        A = y.z / (a / 2),
        _ = Math.cos(tt * m) * Math.cos(tt * A),
        M = Math.cos(tt * b) * Math.cos(tt * A),
        E = Math.cos(tt * b) * Math.cos(tt * m);
      (Math.abs(b) > 0.9 &&
        (y.x +=
          Math.sign(b) *
          (0.016 * _ + 0.004 * Math.abs(Math.sin((y.y * At) / 0.22)) * _)),
        Math.abs(A) > 0.9 &&
          (y.z +=
            Math.sign(A) *
            (0.016 * E + 0.004 * Math.abs(Math.sin((y.y * At) / 0.22)) * E)),
        m > 0.9 &&
          (y.y +=
            0.012 * M - 0.01 * Math.max(0, 1 - Math.hypot(y.x, y.z) / 0.3)));
    }),
      gr(c));
    let u = 0.13 + r * n.range(0.45, 0.8),
      h = t.seed * 1.3,
      f = t.mat("plastic_grey", { color: 14278096 });
    (t.add(f, c, { p: [0, l, 0] }, (y, b, m) => {
      let A = j3(u - 0.03, u + 0.03, b + 0.02 * gn(y * 3 + h, m * 3)),
        _ = 0.9 + 0.1 * gn(y * 6, b * 6 + h, m * 6);
      return [
        _ * (0.52 + 0.48 * A),
        _ * (0.6 + 0.4 * A),
        _ * (0.66 + 0.34 * A),
      ];
    }),
      t.add(f, ot(0.12, 0.125, 0.03, 14), { p: [0, 0.13 + r + 0.005, 0] }, 0.9),
      t.add(
        "plastic_red",
        us(
          [
            [0.105, 0],
            [0.105, 0.042],
            [0.105, 0.042],
            [0.09, 0.05],
            [0, 0.05],
          ],
          14,
        ),
        { p: [0, 0.13 + r + 0.015, 0] },
        0.9,
      ));
    for (let y = 0; y < 8; y++) {
      let b = (y * At) / 4;
      t.add(
        "plastic_red",
        $e(0.012, 0.04, 0.02),
        {
          p: [Math.cos(b) * 0.108, 0.13 + r + 0.036, Math.sin(b) * 0.108],
          r: [0, -b, 0],
        },
        0.8,
      );
    }
    let p = 0.575,
      d = 0.475,
      v = 0.13,
      g = 1.1,
      x = 0.011;
    for (let y of [0.2, 0.42, 0.64, 0.86, g]) {
      let b = y === g ? 0.014 : x;
      for (let m of [1, -1])
        (t.add(
          "steel_galv",
          vn([-p, y, m * d], [p, y, m * d], b, 5),
          null,
          s(),
        ),
          t.add(
            "steel_galv",
            vn([m * p, y, -d], [m * p, y, d], b, 5),
            null,
            s(),
          ));
    }
    for (let y of [1, -1]) {
      for (let b = -0.46; b <= 0.461; b += 0.184)
        t.add(
          "steel_galv",
          vn([b, v, y * (d - 0.012)], [b, g, y * (d - 0.012)], x, 5),
          null,
          s(),
        );
      for (let b = -0.36; b <= 0.361; b += 0.18)
        t.add(
          "steel_galv",
          vn([y * (p - 0.012), v, b], [y * (p - 0.012), g, b], x, 5),
          null,
          s(),
        );
      t.add(
        "steel_galv",
        vn([y * 0.28, g + 0.01, -d], [y * 0.28, g + 0.01, d], 0.013, 5),
        null,
        s(),
      );
    }
    return (
      t.add(
        "aluminium",
        Ge(0.42, 0.3, 0.004, 0.0015),
        { p: [-0.1, 0.72, d + 0.014] },
        0.85,
      ),
      t.label(
        "STORAGE TANK 1000 L",
        { color: "black", font: "sans", distress: 0.2 },
        0.36,
        0.06,
        { p: [-0.1, 0.8, d + 0.0175] },
      ),
      t.decal(
        i.mats.decal(["hazard_flammable", "hazard_general"][t.seed % 2]),
        0.15,
        { p: [-0.19, 0.67, d + 0.0175] },
      ),
      t.decal(i.mats.decal("numbers_0_9"), 0.2, { p: [0, 0.66, d + 0.0175] }),
      t.decal(i.mats.decal("leak_stain"), 0.3, {
        p: [p + 0.004, 0.3, 0.02],
        r: w1.px,
      }),
      t.add(
        "polymer_black",
        vn([0.52, 0.2, 0], [0.575, 0.2, 0], 0.05, 10, !0),
        null,
        1,
      ),
      t.add(
        "plastic_red",
        vn([0.575, 0.2, 0], [0.598, 0.2, 0], 0.045, 10, !0),
        null,
        0.9,
      ),
      t.add(
        "plastic_red",
        Ge(0.02, 0.022, 0.13, 0.005),
        { p: [0.55, 0.262, 0.02], r: [0, 0.4, 0] },
        0.9,
      ),
      t.add("polymer_black", ot(0.012, 0.012, 0.03, 6), {
        p: [0.55, 0.245, 0],
      }),
      t.finish()
    );
  }

function Z3(i, e, t, n = 0) {
    let s = [],
      o = (2 * i) / e;
    for (let r = 0; r < e; r++) {
      let a = -i + r * o + 0.003,
        l = -i + (r + 1) * o - 0.003,
        c = [a, (a + l) / 2, l],
        u = [],
        h = [],
        f = [],
        p = [],
        d = (y) => Math.sqrt(Math.max(0, i * i - y * y)),
        v = t() * 2,
        g = t() * 2;
      for (let y of c)
        (u.push(y, -d(y), 0, y, d(y), 0),
          h.push(0, 0, 1, 0, 0, 1),
          f.push(-d(y) + v, y + g, d(y) + v, y + g));
      p.push(0, 2, 3, 0, 3, 1, 2, 4, 5, 2, 5, 3);
      let x = new lt.BufferGeometry();
      (x.setAttribute(
        "position",
        new lt.BufferAttribute(new Float32Array(u), 3),
      ),
        x.setAttribute(
          "normal",
          new lt.BufferAttribute(new Float32Array(h), 3),
        ),
        x.setAttribute("uv", new lt.BufferAttribute(new Float32Array(f), 2)),
        x.setIndex(p),
        s.push(x));
    }
    return s;
  }

function YA(i, e) {
    let t = new Kn(i, "cable_reel", e.seed || 0),
      n = t.rng,
      s = 0.65,
      o = s,
      r = 0.4,
      a = 0.045,
      l = (y = 1) => {
        let b = n.range(0.7, 1) * y;
        return [b, b * n.range(0.93, 1), b * n.range(0.85, 0.97)];
      },
      c = n.range(-0.5, 0.5);
    t.push({ p: [0, o, 0], r: [0, 0, c] });
    for (let y of [1, -1]) {
      for (let b of Z3(s - 0.004, 9, n))
        t.add(
          "wood_dark",
          b,
          { p: [0, 0, y * (r + n.range(0, 0.003))], r: [0, y > 0 ? 0 : At, 0] },
          l(),
        );
      for (let b of Z3(s - 0.004, 9, n))
        t.add(
          "wood_dark",
          b,
          { p: [0, 0, y * (r - a)], r: [0, y > 0 ? At : 0, tt] },
          l(0.8),
        );
      (t.add(
        "wood_dark",
        ot(s, s, a, 24, !0),
        { p: [0, 0, y * (r - a / 2)], r: [tt, 0, 0] },
        l(0.75),
      ),
        t.add(
          "steel_dark",
          ot(0.105, 0.105, 0.008, 12),
          { p: [0, 0, y * (r + 0.006)], r: [tt, 0, 0] },
          0.9,
        ),
        t.add(
          "polymer_black",
          ot(0.04, 0.04, 0.004, 10),
          { p: [0, 0, y * (r + 0.0105)], r: [tt, 0, 0] },
          0.3,
        ));
      for (let b = 0; b < 6; b++) {
        let m = (b * At) / 3 + 0.3;
        t.add(
          "steel_galv",
          ot(0.017, 0.017, 0.014, 6),
          {
            p: [Math.cos(m) * 0.3, Math.sin(m) * 0.3, y * (r + 0.006)],
            r: [tt, 0, 0],
          },
          n.range(0.5, 0.9),
        );
      }
      (t.label(
        y > 0 ? "NYY-J 4x95 mm2  500 m" : "NORTHSTAR HARBOR",
        { color: "white", font: "stencil", distress: 0.45 },
        0.7,
        0.085,
        { p: [0, 0.4, y * (r + 0.006)], r: [0, y > 0 ? 0 : At, 0] },
      ),
        y > 0 &&
          t.decal(i.mats.decal("arrow"), 0.2, {
            p: [0.36, -0.2, r + 0.006],
            r: [0, 0, -1.2],
          }));
    }
    let u = 16,
      h = r - a,
      f = (2 * h) / u,
      p = 0.47,
      d = [];
    for (let y = 0; y <= u; y++)
      (d.push([p - 0.017, -h + y * f]),
        y < u && d.push([p, -h + (y + 0.5) * f]));
    let v = t.seed * 0.7;
    (t.add(
      "rubber",
      us(d, 20),
      { r: [tt, 0, 0] },
      (y, b, m) => 0.7 + 0.5 * gn(Math.atan2(b, y) * 2 + v, m * 30),
    ),
      t.pop());
    let g = 0.2,
      x = [];
    for (let y = 1.9; y >= -0.25; y -= 0.36)
      x.push([
        Math.cos(y) * (p + 0.012),
        o + Math.sin(y) * (p + 0.012),
        g + (1.9 - y) * 0.02,
      ]);
    (x.push(
      [0.53, 0.3, g + 0.05],
      [0.56, 0.08, g + 0.06],
      [0.5, 0.024, g + 0.02],
      [0.3, 0.022, g - 0.1],
      [0.05, 0.022, g - 0.02],
      [-0.2, 0.022, g + 0.06],
      [-0.38, 0.022, g - 0.05],
    ),
      t.add("rubber", Fn(x, 0.02, 6, !1, 0.5), null, 0.9),
      t.add(
        "brass",
        vn([-0.38, 0.022, g - 0.05], [-0.41, 0.022, g - 0.07], 0.014, 6, !0),
        null,
        0.9,
      ));
    for (let y of [r - a / 2, -(r - a / 2)])
      (t.add(
        "wood_pallet",
        Mo(
          [
            [0.14, 0],
            [0.37, 0],
            [0.37, 0.1],
          ],
          0.1,
          { soft: 0 },
        ),
        { p: [0, 0, y] },
        l(0.8),
      ),
        t.add(
          "wood_pallet",
          Mo(
            [
              [-0.37, 0],
              [-0.14, 0],
              [-0.37, 0.1],
            ],
            0.1,
            { soft: 0 },
          ),
          { p: [0, 0, y] },
          l(0.8),
        ));
    return t.finish();
  }

function tv(i, e, t, n = 20) {
    let s = i - t,
      o = Math.min(0.011, s * 0.08),
      r = [
        [t, e * 0.18],
        [t + s * 0.45, e * 0.035],
        [i - s * 0.2, e * 0.02],
        [i - s * 0.06, e * 0.07],
        [i, e * 0.17],
        [i, e * 0.17],
        [i, e * 0.355],
        [i - o, e * 0.385],
        [i, e * 0.415],
        [i, e * 0.585],
        [i - o, e * 0.615],
        [i, e * 0.645],
        [i, e * 0.83],
        [i, e * 0.83],
        [i - s * 0.06, e * 0.93],
        [i - s * 0.2, e * 0.98],
        [t + s * 0.45, e * 0.965],
        [t, e * 0.82],
        [t, e * 0.82],
        [t, e * 0.18],
      ],
      a = us(r, n),
      l = a.attributes.uv,
      c = r.length,
      u = [0];
    for (let v = 1; v < c; v++)
      u.push(
        u[v - 1] + Math.hypot(r[v][0] - r[v - 1][0], r[v][1] - r[v - 1][1]),
      );
    let h = (u[8] + u[9]) / 2,
      f = h - u[4],
      p = u[4] - u[0],
      d = Math.max(1, Math.round((2 * At * i) / 0.5)) * 0.5;
    for (let v = 0; v < c; v++) {
      let g = v >= c - 2 ? -(f + p) : u[v] - h,
        x = Math.abs(g),
        y =
          Math.sign(g) *
          (x <= f + 1e-6
            ? (x / f) * 0.126
            : 0.126 + Math.min(1, (x - f) / p) * 0.022);
      for (let b = 0; b <= n; b++) l.setXY(v * (n + 1) + b, (b / n) * d, y);
    }
    return a;
  }

function $A(i, e) {
    let t = new Kn(i, "tire_stack", e.seed || 0),
      n = t.rng,
      s = zi(e.count | 0 || 4, 1, 5);
    for (let o = 0; o < s; o++) {
      let r = tv(0.39, 0.25, 0.215, s > 4 ? 16 : 20),
        a = {
          p: [
            o ? n.range(-0.022, 0.022) : 0,
            o * 0.25 - (o ? 0.004 : 0),
            o ? n.range(-0.022, 0.022) : 0,
          ],
          r: [0, n() * 6, 0],
        },
        l = n.range(0.75, 1),
        c = o * 3.1;
      t.add("tire", r, a, (u, h, f) => {
        let p = Math.hypot(u - a.p[0], f - a.p[2]);
        return (
          l *
          (p < 0.23 ? 0.5 : 0.8 + 0.2 * gn(Math.atan2(f, u) * 3 + c, p * 30))
        );
      });
    }
    return t.finish({ size: [0.8, s * 0.25, 0.8] });
  }

function ZA(i, e, t) {
    let n = new Kn(i, "jerry_can", t),
      [s, o] = Ja(e.color, "olive"),
      r = eo(0.336, 0.36, 0.156, 0.022, 3, 3, 3, "bottom"),
      a = (x, y) => (y > 0.3 && x > 0.04 ? y - (x - 0.04) * 0.5 : y);
    (to(r, (x) => {
      ((x.y = a(x.x, x.y)),
        Math.abs(x.z) > 0.07 &&
          Math.abs(x.x) < 0.14 &&
          x.y > 0.04 &&
          x.y < 0.3 &&
          (x.z *= 1.02));
    }),
      r.computeVertexNormals(),
      n.add(s, r, null, o),
      n.add(
        s,
        Mo(
          [
            [-0.172, 0],
            [0.172, 0],
            [0.172, 0.297],
            [0.045, 0.364],
            [-0.172, 0.364],
          ],
          0.007,
          { soft: 0 },
        ),
        null,
        typeof o == "number" ? 0.8 : o.map((x) => x * 0.8),
      ));
    let l = 0.24,
      c = 0.2,
      u = -0.025,
      h = 0.165,
      f = Math.hypot(l, c) - 0.02,
      p = Math.atan2(c, l);
    for (let x of [1, -1]) {
      let y = x * 0.079;
      for (let b of [1, -1])
        n.add(s, Ge(l, 0.016, 0.007, 0.003), { p: [u, h + (b * c) / 2, y] }, o);
      for (let b of [1, -1])
        n.add(s, Ge(0.016, c, 0.007, 0.003), { p: [u + (b * l) / 2, h, y] }, o);
      for (let b of [1, -1])
        n.add(
          s,
          Ge(f, 0.018, 0.008, 0.003),
          { p: [u, h, y], r: [0, 0, b * p] },
          o,
        );
    }
    for (let x of [-0.042, 0, 0.042])
      n.add(
        s,
        Fn(
          [
            [-0.135, 0.35, x],
            [-0.125, 0.42, x],
            [-0.09, 0.44, x],
            [-0.02, 0.44, x],
            [0.01, 0.42, x],
            [0.02, 0.35, x],
          ],
          0.0105,
          5,
          !1,
          0.5,
        ),
        null,
        o,
      );
    let d = [0.1, 0.33, 0],
      v = [0.42, 0.9, 0],
      g = (x) => [d[0] + v[0] * x, d[1] + v[1] * x, 0];
    return (
      n.add(s, vn(g(-0.02), g(0.07), 0.03, 8, !0), null, o),
      n.add("steel_dark", vn(g(0.07), g(0.1), 0.036, 8, !0), null, 0.9),
      n.add(
        "steel_galv",
        Ge(0.07, 0.008, 0.02, 0.002),
        { p: g(0.108), r: [0, 0, -0.44] },
        0.8,
      ),
      n.decal(i.mats.decal("hazard_flammable"), 0.055, {
        p: [0.125, 0.25, 0.0795],
      }),
      n.decal(i.mats.decal("hazard_flammable"), 0.055, {
        p: [-0.125, 0.25, -0.0795],
        r: [0, At, 0],
      }),
      n.finish()
    );
  }

function jA(i, e, t) {
    let n = new Kn(i, "traffic_cone", t),
      s = n.rng,
      o = t * 4.1;
    e.lying &&
      (n.push({ p: [-0.34, 0.18, 0], r: [0, s() * 6, 0] }),
      n.push({ r: [0, 0, -tt + 0.16] }));
    let r = (h) => 0.128 + ((0.031 - 0.128) * (h - 0.05)) / (0.685 - 0.05);
    n.add("rubber", Ge(0.36, 0.03, 0.36, 0.008, "bottom"), null, 0.9);
    let a = (h, f, p) => {
        let d = gn(Math.atan2(p, h) * 3 + o, f * 14);
        return d > 0.68 ? 0.45 : 0.85 + 0.15 * d;
      },
      l = (h, f, p = [], d = []) => us([...p, [r(h), h], [r(f), f], ...d], 16),
      c = n.mat("plastic_red", { color: 12734234 }),
      u = n.mat("plastic_grey", { color: 13224386 });
    return (
      n.add(
        c,
        l(0.05, 0.36, [
          [0.165, 0.03],
          [0.15, 0.04],
          [0.136, 0.05],
        ]),
        null,
        a,
      ),
      n.add(u, l(0.36, 0.5), null, (h, f, p) => 0.85 * a(h, f, p)),
      n.add(c, l(0.5, 0.56), null, a),
      n.add(u, l(0.56, 0.61), null, (h, f, p) => 0.85 * a(h, f, p)),
      n.add(
        c,
        l(
          0.61,
          0.685,
          [],
          [
            [0.028, 0.696],
            [0.018, 0.7],
            [0.018, 0.7],
            [0, 0.7],
          ],
        ),
        null,
        a,
      ),
      e.lying && (n.pop(), n.pop()),
      n.finish(e.lying ? { size: [0.72, 0.36, 0.36] } : {})
    );
  }

function JA(i, e) {
    let t = new Kn(i, "gas_cylinders", e.seed || 0),
      n = t.rng,
      s = 12,
      o = () => n.range(0.6, 0.9);
    t.add("diamond_plate", Ge(0.9, 0.016, 0.5, 0.004, "bottom"), null, 0.8);
    for (let u of [-0.43, 0.43])
      (t.add(
        "steel_dark",
        Ge(0.04, 1.14, 0.04, 0.005),
        { p: [u, 0.585, -0.225] },
        o(),
      ),
        t.add(
          "steel_dark",
          Ge(0.036, 0.036, 0.43, 0.005),
          { p: [u, 1.06, -0.01] },
          o(),
        ),
        t.add(
          "steel_dark",
          Ge(0.036, 0.036, 0.43, 0.005),
          { p: [u, 0.3, -0.01] },
          o(),
        ),
        t.add(
          "steel_dark",
          Ge(0.036, 0.32, 0.036, 0.005),
          { p: [u, 0.16, 0.19] },
          o(),
        ),
        t.add(
          "steel_galv",
          ja(0.016, 0.004, 4, 8),
          { p: [u - Math.sign(u) * 0, 1.06, 0.215], r: [0, tt, 0] },
          0.8,
        ));
    for (let u of [0.45, 1.06])
      t.add(
        "steel_dark",
        Ge(0.9, 0.04, 0.036, 0.005),
        { p: [0, u, -0.225] },
        o(),
      );
    (t.add(
      "paint_yellow",
      Ge(0.3, 0.2, 0.004, 0.001),
      { p: [0, 0.76, -0.245] },
      0.9,
    ),
      t.decal(i.mats.decal("hazard_flammable"), 0.15, {
        p: [0, 0.76, -0.2475],
        r: [0, At, 0],
      }));
    let r = [
        ["paint_red", 1],
        ["paint_white", 1],
        ["paint_blue", 1],
        ["paint_yellow", 1],
        ["paint_grey", 0.5],
      ],
      a = [
        ["paint_grey", 0.75],
        ["paint_grey", 0.55],
        ["paint_red", [0.55, 0.4, 0.4]],
        ["paint_blue", 0.8],
      ];
    for (let u = 0; u < 3; u++) {
      let h = (u - 1) * 0.272,
        f = 1 - n.range(0, 0.05),
        p = 0.115,
        d = r[(t.seed + u * 2) % r.length],
        v = a[(t.seed + u) % a.length],
        g = u * 5.3 + t.seed,
        x = n() * 6;
      (t.push({
        p: [h, 0.016, 0.015 + n.range(-0.01, 0.01)],
        r: [0, x, 0],
        s: [1, f, 1],
      }),
        t.add(
          v[0],
          us(
            [
              [0, 0.012],
              [0.095, 0.012],
              [0.095, 0.012],
              [0.1, 0],
              [0.111, 0],
              [p, 0.008],
              [p, 0.4],
              [p, 0.8],
              [p, 1.22],
            ],
            s,
          ),
          null,
          (y, b, m) => {
            let A = gn(Math.atan2(m, y) * 3 + g, b * 5),
              _ = A > 0.7 ? 0.55 : 1,
              M = typeof v[1] == "number" ? [v[1], v[1], v[1]] : v[1];
            return [
              M[0] * _,
              M[1] * _ * (A > 0.7 ? 0.85 : 1),
              M[2] * _ * (A > 0.7 ? 0.7 : 1),
            ];
          },
        ),
        t.add(
          d[0],
          us(
            [
              [p, 1.22],
              [0.111, 1.285],
              [0.098, 1.34],
              [0.075, 1.385],
              [0.052, 1.41],
              [0.04, 1.42],
            ],
            s,
          ),
          null,
          d[1],
        ),
        t.add(
          "steel_dark",
          us(
            [
              [0.04, 1.42],
              [0.057, 1.42],
              [0.057, 1.42],
              [0.057, 1.448],
              [0.057, 1.448],
              [0.05, 1.452],
              [0.053, 1.53],
              [0.046, 1.565],
              [0.026, 1.585],
              [0, 1.588],
            ],
            s,
          ),
          null,
          0.8,
        ));
      for (let y of [0, At])
        t.add(
          "polymer_black",
          ot(0.016, 0.016, 0.004, 6),
          {
            p: [Math.cos(y) * 0.052, 1.5, Math.sin(y) * 0.052],
            r: [0, -y, tt],
          },
          0.2,
        );
      (u !== 1 &&
        t.cdecal(
          i.mats.decal(u ? "hazard_general" : "hazard_flammable"),
          p + 0.0015,
          0.1,
          { p: [0, 1.08, 0], r: [0, n.range(-0.5, 0.5) - x, 0] },
        ),
        t.cdecal(
          i.mats.label(
            ["ACETYLENE", "OXYGEN", "ARGON", "PROPANE"][(t.seed + u) % 4],
            { color: "white", font: "stencil", distress: 0.4 },
          ),
          p + 0.0015,
          0.2,
          { p: [0, 0.86, 0], r: [0, n.range(-0.4, 0.4) - x, 0] },
        ),
        t.pop());
    }
    let l = 19,
      c = (u) => {
        let h = 0.215;
        for (let f = -1; f <= 1; f++) {
          let p = u - f * 0.272;
          Math.abs(p) < 0.115 &&
            (h = Math.max(h, 0.015 + Math.sqrt(0.123 * 0.123 - p * p) + 0));
        }
        return Math.max(h, 0.1);
      };
    for (let u = 0; u < l; u++) {
      let h = u / (l - 1),
        f = -0.425 + 0.85 * h,
        p = Math.max(c(f), c(f - 0.03), c(f + 0.03)) + 0.004,
        d = 1.05 - 0.035 * Math.sin(At * ((h * 3) % 1)) - 0.01;
      t.add(
        "steel_galv",
        ja(0.017, 0.0045, 3, 6),
        { p: [f, d, p], r: [u % 2 ? tt : 0.15, 0, 0], s: [1.35, 1, 1] },
        n.range(0.6, 0.95),
      );
    }
    return t.finish();
  }

function KA(i, e) {
    let t = new Kn(i, "pipe_stack", e.seed || 0),
      n = t.rng,
      s = 0.1365,
      o = 0.012,
      r = 0.08,
      a = 14,
      l = (h = 1) => {
        let f = n.range(0.6, 0.95) * h;
        return [f, f * 0.95, f * 0.86];
      };
    for (let h of [-2.2, 0, 2.2]) {
      t.add(
        "wood_dark",
        Ge(0.11, r, 1.2, 0.008),
        {
          p: [h + n.range(-0.1, 0.1), r / 2, 0],
          r: [0, n.range(-0.03, 0.03), 0],
        },
        l(),
      );
      for (let f of [1, -1])
        t.add(
          "wood_pallet",
          Mo(
            f > 0
              ? [
                  [0, 0],
                  [0.158, 0],
                  [0.158, 0.1],
                ]
              : [
                  [-0.158, 0],
                  [0, 0],
                  [-0.158, 0.1],
                ],
            0.1,
            { soft: 0 },
          ),
          { p: [h, r, f * 0.44], r: [0, -tt, 0] },
          l(0.9),
        );
    }
    let c = [4, 3, 2],
      u = 2 * s * Math.sin(At / 3);
    c.forEach((h, f) => {
      for (let p = 0; p < h; p++) {
        let d = (p - (h - 1) / 2) * 2 * s,
          v = r + s + f * u,
          g = n.range(5.78, 5.92),
          x = n.range(-3, 3 - g) * 0.999 + 0,
          y = Math.max(-3, Math.min(3 - g, x)) + g / 2,
          b = n() < 0.7 ? "steel_rust" : "steel_dark",
          m = n() * 50,
          A = n.range(0.75, 1),
          _ = new lt.CylinderGeometry(s, s, g, a, 4, !0);
        {
          let w = _.attributes.uv,
            S = _.attributes.position;
          for (let z = 0; z < w.count; z++)
            w.setXY(z, w.getX(z) * 2 * At * s, S.getY(z));
        }
        let M = { p: [y, v, d], r: [n() * 6, 0, tt] };
        t.add(
          b,
          _,
          M,
          (w, S, z) => A * (0.75 + 0.35 * gn(w * 1.3 + m, z * 9, S * 9)),
        );
        let E = M1(ot(s - o, s - o, g - 0.002, a, !0));
        t.add(
          "steel_rust",
          E,
          M,
          (w) =>
            0.16 +
            0.5 *
              j3(
                g / 2 + Math.abs(y) - 0.9,
                g / 2 + Math.abs(y) + 0.2,
                Math.abs(w - y) + Math.abs(y),
              ),
        );
        for (let w of [1, -1])
          t.add(
            b,
            us(
              w > 0
                ? [
                    [s, 0],
                    [s - o, 0],
                  ]
                : [
                    [s - o, 0],
                    [s, 0],
                  ],
              a,
            ),
            { p: [y + (w * g) / 2, v, d], r: [0, 0, -tt] },
            A * 1.1,
          );
      }
    });
    for (let h of [-1.35, 1.5]) {
      let p = 2 * s,
        d = r + s + 2 * u + s + 0.004,
        v = [],
        g = [
          [-(1.5 * p + s + 0.004), r + s],
          [-(0.5 * p + s * 0.5 + 0.004), r + s + 2 * u + s * 0.87],
          [-0.5 * p, d],
          [0.5 * p, d],
          [0.5 * p + s * 0.5 + 0.004, r + s + 2 * u + s * 0.87],
          [1.5 * p + s + 0.004, r + s],
          [1.5 * p, r - 0.004],
          [-1.5 * p, r - 0.004],
          [-(1.5 * p + s + 0.004), r + s],
        ];
      for (let x of g) v.push([h, x[1], x[0]]);
      (t.add("steel_dark", vr(v, [0.016, 0, 0]), null, 0.7),
        t.add(
          "steel_galv",
          Ge(0.04, 0.012, 0.05, 0.003),
          { p: [h, d + 0.005, 0.03] },
          0.8,
        ));
    }
    return (
      t.cdecal(
        i.mats.label("API 5L X52  273.1 x 12.5  HEAT 40719", {
          color: "white",
          font: "stencil",
          distress: 0.5,
        }),
        s + 0.002,
        0.2,
        { p: [0.9, r + s + 2 * u, s], r: [-tt + 0.9, 0, tt] },
        1.6,
      ),
      t.finish()
    );
  }

function J3(i) {
    (i("barrel", (e, t = {}) => {
      let n = Math.abs(t.seed | 0) % 4;
      return wf(`barrel|${t.color}|${!!t.lying}|${!!t.open}|${n}`, () =>
        HA(e, t, n),
      );
    }),
      i("pallet", (e, t = {}) => {
        let n = Math.abs(t.seed | 0) % 4;
        return wf(`pallet|${!!t.broken}|${n}`, () => VA(e, t, n));
      }),
      i("pallet_stack", (e, t = {}) => WA(e, t)),
      i("crate_wood", (e, t = {}) => GA(e, t)),
      i("crate_stack", (e, t = {}) => qA(e, t)),
      i("ibc_tote", (e, t = {}) => XA(e, t)),
      i("cable_reel", (e, t = {}) => YA(e, t)),
      i("tire_stack", (e, t = {}) => $A(e, t)),
      i("jerry_can", (e, t = {}) => {
        let n = Math.abs(t.seed | 0) % 2;
        return wf(`jerry|${t.color}|${n}`, () => ZA(e, t, n));
      }),
      i("traffic_cone", (e, t = {}) => {
        let n = Math.abs(t.seed | 0) % 3;
        return wf(`cone|${!!t.lying}|${n}`, () => jA(e, t, n));
      }),
      i("gas_cylinders", (e, t = {}) => JA(e, t)),
      i("pipe_stack", (e, t = {}) => KA(e, t)));
  }

var Q3 = (i, e, t) => {
    let n = zi((t - i) / (e - i), 0, 1);
    return n * n * (3 - 2 * n);
  };

function nv(i, e, t = 0, n = 0) {
    let s = new lt.PlaneGeometry(i, e),
      o = s.attributes.uv,
      r = s.attributes.position;
    for (let a = 0; a < o.count; a++) o.setXY(a, r.getX(a) + t, r.getY(a) + n);
    return s;
  }

function QA(i, e) {
    let t = new Kn(i, "tarp_cargo", e.seed || 0),
      n = t.rng,
      s = t.seed * 1.7,
      o = 0.144,
      r = [
        [-1.06, -0.12, -0.58, 0.58, n.range(0.98, 1.12)],
        [-0.06, 1.06, -0.58, 0.12, n.range(1.32, 1.42)],
        [0.02, 0.62, 0.16, 0.58, n.range(0.72, 0.86)],
        [0.66, 1.06, 0.18, 0.56, n.range(0.5, 0.62)],
      ];
    for (let N of [-0.6, 0.6])
      (t.push({ p: [N, 0, 0], r: [0, 0, 0] }),
        S1(t, n, { stamp: !1 }),
        t.pop());
    for (let N of r) {
      let Q = N[1] - N[0],
        K = N[3] - N[2],
        ie = N[4] - o,
        F = (N[0] + N[1]) / 2,
        X = (N[2] + N[3]) / 2,
        ne = n.range(0.7, 0.95);
      (t.add("wood_pallet", Ge(Q, ie, K, 0.006), { p: [F, o + ie / 2, X] }, [
        ne,
        ne * 0.95,
        ne * 0.88,
      ]),
        t.add(
          "wood_pallet",
          $e(Q + 0.012, 0.07, K + 0.012),
          { p: [F, o + 0.04, X] },
          ne * 0.75,
        ));
    }
    let a = 1.9,
      l = 22,
      c = 14,
      u = -1.125,
      h = 1.125,
      f = -0.645,
      p = 0.645,
      d = 5,
      v = (N, Q) => {
        let K = 0.3;
        for (let ie of r) {
          let F = Math.max(ie[0] - N, 0, N - ie[1]),
            X = Math.max(ie[2] - Q, 0, Q - ie[3]),
            ne = Math.hypot(F, X);
          K = Math.max(K, ie[4] - 0.95 * ne - 0.9 * ne * ne);
        }
        return (
          K +
          0.016 +
          0.022 * gn(N * 5 + s, Q * 5) +
          0.008 * Math.sin(N * 23 + Q * 7 + s) +
          0.006 * Math.sin(Q * 31 - N * 5)
        );
      },
      g = [],
      x = [],
      y = [],
      b = (N, Q) => Q * (l + 1) + N;
    for (let N = 0; N <= c; N++)
      for (let Q = 0; Q <= l; Q++) {
        let K = u + ((h - u) * Q) / l,
          ie = f + ((p - f) * N) / c;
        (g.push(K, v(K, ie), ie), x.push(K * a, ie * a));
      }
    for (let N = 0; N < c; N++)
      for (let Q = 0; Q < l; Q++) {
        let K = b(Q, N),
          ie = b(Q + 1, N),
          F = b(Q + 1, N + 1),
          X = b(Q, N + 1);
        y.push(K, X, ie, ie, X, F);
      }
    let m = [];
    for (let N = 0; N < l; N++) m.push([N, 0, 0, -1]);
    for (let N = 0; N < c; N++) m.push([l, N, 1, 0]);
    for (let N = l; N > 0; N--) m.push([N, c, 0, 1]);
    for (let N = c; N > 0; N--) m.push([0, N, -1, 0]);
    let A = m.length,
      _ = (l + 1) * (c + 1),
      M = new Map(),
      E = n() * A;
    m.forEach((N, Q) => {
      M.set(N[0] + "," + N[1], Q);
      let K = (N[0] === 0 || N[0] === l) && (N[1] === 0 || N[1] === c),
        ie = N[2],
        F = N[3];
      K &&
        ((ie = N[0] === 0 ? -0.707 : 0.707), (F = N[1] === 0 ? -0.707 : 0.707));
      let X = b(N[0], N[1]),
        ne = g[X * 3],
        re = g[X * 3 + 1],
        $ = g[X * 3 + 2],
        ue = Math.abs(Q - E);
      ue = Math.min(ue, A - ue);
      let me =
          0.17 +
          0.07 * Math.sin(Q * 0.55 + s) +
          0.07 * gn(Q * 0.31 + s, 2.2) +
          0.3 * Math.exp((-ue * ue) / 14),
        ee = n() * 6;
      for (let B = 1; B <= d; B++) {
        let P = B / d,
          V = re + (me - re) * (0.25 * P + 0.75 * P * P) - (B === 1 ? 0.02 : 0),
          Y =
            (N[0] === 5 || N[0] === 16) && N[2] === 0
              ? 0.035 * Math.sin(Math.PI * P)
              : 0,
          L =
            P *
              (0.04 * Math.sin(Q * 1.7 + ee * 0.2) +
                0.028 * Math.sin(Q * 0.83 + 1.3 + s)) +
            0.02 * P * gn(Q * 0.8, B * 0.9 + s) -
            Y,
          Z = (B === 1 ? 0.028 : 0.04 + 0.03 * P) + L + (K ? 0.012 * P : 0),
          J = zi(ne + ie * Z, -1.2, 1.2),
          oe = zi($ + F * Z, -0.7, 0.7),
          fe = re - V;
        (g.push(J, V, oe),
          x.push((ne + ie * (Z + fe)) * a, ($ + F * (Z + fe)) * a));
      }
    });
    let w = (N, Q) => (Q === 0 ? b(m[N][0], m[N][1]) : _ + N * d + (Q - 1));
    for (let N = 0; N < A; N++)
      for (let Q = 0; Q < d; Q++) {
        let K = (N + 1) % A,
          ie = w(N, Q),
          F = w(K, Q),
          X = w(K, Q + 1),
          ne = w(N, Q + 1);
        y.push(ie, F, ne, F, X, ne);
      }
    let S = new lt.BufferGeometry();
    (S.setAttribute("position", new lt.BufferAttribute(new Float32Array(g), 3)),
      S.setAttribute("uv", new lt.BufferAttribute(new Float32Array(x), 2)),
      S.setIndex(y),
      S.computeVertexNormals());
    let z = S.attributes.normal,
      H = S.attributes.position,
      O = (N, Q) => [
        H.getX(N) + z.getX(N) * Q,
        H.getY(N) + z.getY(N) * Q,
        H.getZ(N) + z.getZ(N) * Q,
      ],
      q = [];
    for (let N of [5, 16]) {
      let Q = [],
        K = M.get(N + ",0"),
        ie = M.get(N + "," + c);
      Q.push([H.getX(w(K, d)), 0.11, -0.52]);
      for (let F = d; F >= 1; F--) Q.push(O(w(K, F), 0.007));
      for (let F = 0; F <= c; F++) Q.push(O(b(N, F), 0.007));
      for (let F = 1; F <= d; F++) Q.push(O(w(ie, F), 0.007));
      (Q.push([H.getX(w(ie, d)), 0.11, 0.52]), q.push(Q));
    }
    let U = 6,
      T = [],
      D = M.get("0," + U),
      C = M.get(l + "," + U);
    T.push([-1.1, 0.1, H.getZ(w(D, d))]);
    for (let N = d; N >= 1; N -= 2) T.push(O(w(D, N), 0.012));
    for (let N = 0; N <= l; N += 2) T.push(O(b(N, U), 0.012));
    for (let N = 1; N <= d; N += 2) T.push(O(w(C, N), 0.012));
    (T.push([1.1, 0.1, H.getZ(w(C, d))]),
      t.add(t.mat("tarp", { doubleSide: !0 }), S, null, (N, Q, K) => {
        let ie = gn(N * 2.3 + s, Q * 2.3, K * 2.3),
          F = gn(N * 11, Q * 11, K * 11 + s);
        return (
          (0.72 + 0.28 * ie) * (0.9 + 0.1 * F) * (0.8 + 0.2 * Q3(0.15, 0.6, Q))
        );
      }));
    for (let N of q) {
      t.add("paint_orange", vr(N, [0.024, 0, 0]), null, [1, 0.82, 0.5]);
      let Q = N[N.length - 4];
      (t.add(
        "steel_worn",
        Ge(0.065, 0.1, 0.03, 0.006),
        { p: [Q[0], Q[1], Q[2] + 0.014], r: [0.25, 0, 0] },
        0.8,
      ),
        t.add(
          "steel_dark",
          Ge(0.02, 0.09, 0.012, 0.003),
          { p: [Q[0] + 0.03, Q[1] + 0.06, Q[2] + 0.04], r: [0.9, 0, 0] },
          0.8,
        ));
    }
    t.add("rope", Fn(T, 0.009, 4, !1, 0.5), null, 0.85);
    let G = [2.4, 1.5, 1.4],
      j = Math.max(...r.map((N) => N[4])) + 0.04;
    return t.finish({
      size: G,
      colliders: [
        { min: [-1.2, 0, -0.7], max: [1.2, j, 0.7], surface: "dirt" },
      ],
    });
  }

function eR(i, e, t, n) {
    let s = ev(eo(i, e, t, Math.min(e * 0.46, 0.075), 3, 3, 3), 3),
      o = n() * 9,
      r = n.range(-0.05, 0.05),
      a = n.range(0.4, 1);
    return (
      to(s, (l) => {
        let c = l.x / (i / 2),
          u = l.z / (t / 2),
          h = l.y / (e / 2),
          f = 1 - 0.22 * Math.pow(Math.abs(c), 2.5);
        ((l.z *= f * (h < 0 ? 1.05 : 1)),
          (l.y = (l.y + e / 2) * (1 - 0.3 * Math.pow(Math.abs(c), 3)) - e / 2),
          h > 0 && (l.y += 0.016 * Math.cos(tt * c) * Math.cos(tt * u)),
          (l.y -=
            a * 0.018 * Math.abs(c) * Math.abs(c) * (h > -0.9 ? 1 : 0) +
            r * l.x * 0.3));
        let p = gn(l.x * 9 + o, l.y * 9, l.z * 9 + o) - 0.5;
        ((l.x += p * 0.014),
          (l.z += p * 0.016),
          h > -0.9 && (l.y += p * 0.014));
      }),
      gr(s)
    );
  }

function tR(i, e) {
    let t = new Kn(i, "sandbags", e.seed || 0),
      n = t.rng,
      s = 0.18,
      o = zi(e.courses | 0 || 5, 1, 7),
      r = t.mat(K3[0], K3[1]),
      a = (l, c, u, h) => {
        let f = s * n.range(1.02, 1.12),
          p = n() < 0.3 ? n.range(0.55, 0.75) : n.range(0.82, 1),
          d = n() * 30,
          v = {
            p: [
              u[0] + n.range(-0.012, 0.012),
              u[1] + f / 2 - 0.004,
              u[2] + n.range(-0.012, 0.012),
            ],
            r: [n.range(-0.03, 0.03), h + n.range(-0.06, 0.06), 0],
          };
        t.add(r, eR(l, f, c, n), v, (g, x, y) => {
          let b = gn(g * 7 + d, x * 7, y * 7);
          return [
            p * (0.85 + 0.15 * b),
            p * (0.84 + 0.15 * b),
            p * (0.8 + 0.16 * b),
          ];
        });
        for (let g of [1, -1])
          t.add(
            r,
            vr(
              [
                [g * (l / 2 - 0.004), n.range(-0.008, 0.008), -c * 0.27],
                [g * (l / 2 - 0.002), n.range(-0.008, 0.008), c * 0.27],
              ],
              [g * 0.009, 0.001, 0],
            ),
            v,
            p * 0.9,
          );
      };
    for (let l = 0; l < o; l++) {
      let c = l * s,
        u = l === o - 1;
      if (l % 2 === 0)
        for (let h = 0; h < 3; h++)
          for (let f of [1, -1])
            (u && h === 2 && f === 1 && o > 2) ||
              a(0.655, 0.3, [(h - 1) * 0.655, c, f * 0.148], 0);
      else
        for (let h = 0; h < 5; h++)
          (u && h === 0 && o > 2) ||
            a(0.585, 0.385, [(h - 2) * 0.392, c, 0], tt);
    }
    return t.finish({ size: [2, o * s, 0.6], surface: "dirt" });
  }

var K3 = ["glove_fabric", { color: 9207134 }];

function Oc(
    i,
    e,
    t,
    n,
    s,
    {
      crush: o = 0,
      damp: r = 0.3,
      open: a = !1,
      tape: l = !0,
      label: c = "",
      arrow: u = !1,
      tint: h = 1,
    } = {},
  ) {
    let f = i.rng,
      p = i.G,
      d = f() * 40;
    i.push(s);
    let v = (_) => {
        if (!o) return;
        let M = zi(_.y / t, 0, 1),
          E = M * M;
        ((_.y -=
          o *
          t *
          0.32 *
          E *
          (0.55 + 0.45 * Math.cos(((At * _.x) / e) * 0.9 + 0.5)) *
          (0.8 + 0.2 * Math.cos((At * _.z) / n))),
          (_.z *= 1 + 0.1 * o * Math.sin(At * M)),
          (_.x +=
            0.12 * o * t * M + 0.02 * o * Math.sin(At * M) * Math.sign(_.x)));
      },
      g = eo(e, t, n, 0.007, 4, 5, 4, "bottom");
    (a && ev(g, 2), o && (to(g, v), gr(g)));
    let x = r * t,
      y = (_, M, E) => {
        let w = gn(_ * 6 + d, M * 3, E * 6 + d),
          S = Q3(x - 0.03, x + 0.04, M + 0.08 * (w - 0.5)),
          z = (0.86 + 0.14 * gn(_ * 13, M * 13 + d, E * 13)) * h;
        return [
          z * (0.5 + 0.5 * S),
          z * (0.47 + 0.53 * S),
          z * (0.42 + 0.58 * S),
        ];
      };
    {
      let _ = g.attributes.position,
        M = new Float32Array(_.count * 3);
      for (let E = 0; E < _.count; E++) {
        let w = y(_.getX(E), _.getY(E), _.getZ(E));
        ((M[E * 3] = w[0]), (M[E * 3 + 1] = w[1]), (M[E * 3 + 2] = w[2]));
      }
      g.setAttribute("color", new lt.BufferAttribute(M, 3));
    }
    i.add("cardboard", g);
    let b = 0.0025;
    if (a) {
      let _ = Math.min(0.16, t * 0.6);
      i.add(
        "cardboard",
        nv(e - 0.012, n - 0.012),
        { p: [0, t - _, 0], r: [-tt, 0, 0] },
        0.45 * h,
      );
      for (let [E, w, S] of [
        [0, e, n / 2],
        [At, e, n / 2],
        [tt, n, e / 2],
        [-tt, n, e / 2],
      ])
        i.add(
          "cardboard",
          M1(nv(w - 0.012, _)),
          {
            p: [
              Math.sin(E) * (S - 0.006),
              t - _ / 2,
              Math.cos(E) * (S - 0.006),
            ],
            r: [0, E, 0],
          },
          0.55 * h,
        );
      let M = (E, w, S) => {
        let z = Math.sin(S),
          H = Math.cos(S);
        return [E, w, z, H];
      };
      for (let E of [1, -1]) {
        let w = f.range(0.3, 1.9),
          S = n / 2 - 0.01;
        i.add(
          "cardboard",
          vr(
            [
              [0, t, (E * n) / 2],
              [
                0,
                t + Math.sin(w) * S * 0.5,
                E * (n / 2 + Math.cos(w) * S * 0.5),
              ],
              [0, t + Math.sin(w) * S, E * (n / 2 + Math.cos(w) * S + 0.01)],
            ],
            [e / 2 - 0.004, 0, 0],
          ),
          null,
          0.9 * h,
        );
      }
      for (let E of [1, -1]) {
        let w = f.range(0.9, 2.3),
          S = n / 2 - 0.02;
        i.add(
          "cardboard",
          vr(
            [
              [(E * e) / 2, t, 0],
              [E * (e / 2 + Math.cos(w) * S), t + Math.sin(w) * S, 0],
            ],
            [0, 0, n / 2 - 0.004],
          ),
          null,
          0.82 * h,
        );
      }
    } else if (l) {
      let M = [];
      M.push([-e / 2 - b, t - 0.075, 0]);
      for (let w = 0; w <= 8; w++)
        M.push([(-0.5 + w / 8) * (e + 2 * b), t + b, 0]);
      M.push([e / 2 + b, t - 0.075, 0]);
      let E = new lt.Vector3();
      for (let w of M)
        (E.set(w[0], w[1], w[2]),
          v(E),
          (w[0] = E.x),
          (w[1] = E.y + (o ? 0.004 : 0)),
          (w[2] = E.z));
      i.add("polymer_tan", vr(M, [0, 0, 0.025], !1), null, 0.9);
    }
    let m = n / 2 + b,
      A = Math.min(0.055, t * 0.2);
    if (
      (c &&
        !o &&
        (i.label(
          c,
          { color: "black", font: "sans", distress: 0.3 },
          e * 0.6,
          A,
          { p: [-e * 0.1, t * 0.62, m] },
        ),
        i.add(
          "paint_white",
          nv(0.11, 0.075),
          { p: [e * 0.26, t * 0.3, m - 0.001] },
          0.9,
          { cast: !1 },
        ),
        i.decal(p.mats.decal("numbers_0_9"), 0.095, {
          p: [e * 0.26, t * 0.3, m + 6e-4],
        })),
      u && !o)
    )
      for (let _ of [1, -1])
        i.decal(p.mats.decal("arrow"), Math.min(0.09, t * 0.3), {
          p: [_ * (e / 2 + b), t * 0.55, _ * n * 0.2],
          r: [0, _ * tt, tt],
        });
    i.pop();
  }

function nR(i, e) {
    let t = new Kn(i, "cardboard_boxes", e.seed || 0),
      n = t.rng,
      s = () => n.range(-0.015, 0.015),
      o = () => n.range(0.82, 1);
    return (
      Oc(
        t,
        0.5,
        0.38,
        0.44,
        { p: [-0.23 + s(), 0, -0.16 + s()], r: [0, n.range(-0.05, 0.05), 0] },
        { damp: 0.45, label: "FRAGILE", arrow: !0, tint: o() },
      ),
      Oc(
        t,
        0.42,
        0.33,
        0.4,
        { p: [0.26 + s(), 0, -0.17 + s()], r: [0, n.range(-0.08, 0.08), 0] },
        { damp: 0.5, label: "KEEP DRY", tint: o() },
      ),
      Oc(
        t,
        0.46,
        0.28,
        0.4,
        { p: [-0.24 + s(), 0.38, -0.15 + s()], r: [0, n.range(-0.2, 0.2), 0] },
        { crush: 1, damp: 0.75, tint: o() * 0.92 },
      ),
      Oc(
        t,
        0.33,
        0.26,
        0.32,
        { p: [0.27 + s(), 0.33, -0.18 + s()], r: [0, n.range(-0.3, 0.3), 0] },
        { open: !0, damp: 0.1, label: "", arrow: !0, tint: o() },
      ),
      Oc(
        t,
        0.3,
        0.16,
        0.24,
        {
          p: [-0.26 + s(), 0.565, -0.16 + s()],
          r: [0.03, n.range(-0.5, 0.5), -0.09],
        },
        { damp: 0.2, label: "HX-2291", tint: o() },
      ),
      Oc(
        t,
        0.36,
        0.26,
        0.3,
        { p: [0.06 + s(), 0.105, 0.2], r: [0.62, n.range(-0.25, 0.25), 0] },
        { damp: 0.9, crush: 0.25, tint: o() * 0.85 },
      ),
      t.finish()
    );
  }

function eb(i) {
    (i("tarp_cargo", (e, t = {}) => QA(e, t)),
      i("sandbags", (e, t = {}) => tR(e, t)),
      i("cardboard_boxes", (e, t = {}) => nR(e, t)));
  }

var tb = new lt.Quaternion(),
    iR = new lt.Vector3(0, 1, 0),
    T1 = new lt.Vector3(),
    nb = new lt.Matrix4();

function zr(i, e, t, n, s = 0.006, o = !1) {
    T1.set(e[0] - i[0], e[1] - i[1], e[2] - i[2]);
    let r = T1.length();
    T1.normalize();
    let a = o ? $e(t, r, n) : Ge(t, r, n, s);
    return (
      tb.setFromUnitVectors(iR, T1),
      nb.compose(
        new lt.Vector3((i[0] + e[0]) / 2, (i[1] + e[1]) / 2, (i[2] + e[2]) / 2),
        tb,
        new lt.Vector3(1, 1, 1),
      ),
      a.applyMatrix4(nb),
      a
    );
  }

var sR = (i) => {
    let e = 0;
    for (let t = 0; t < i.length; t++) {
      let n = i[t],
        s = i[(t + 1) % i.length];
      e += n[0] * s[1] - s[0] * n[1];
    }
    return e < 0 ? i.slice().reverse() : i;
  };

function ib(i, e, t, n, s, o, r, a, l, c) {
    let u = tv(t, n, r, a);
    (i.push({
      p: [e, t, o > 0 ? s - n / 2 : -(s - n / 2)],
      r: [o > 0 ? tt : -tt, 0, 0],
    }),
      i.push({ r: [0, c() * 6, 0] }));
    let h = c() * 20;
    i.add("tire", u, null, (p, d, v) => {
      let g = Math.hypot(p, v);
      return g < r + 0.01
        ? 0.45
        : 0.78 + 0.22 * gn(Math.atan2(v, p) * 3 + h, g * 30);
    });
    let f = n * 0.8;
    (i.add(
      "paint_yellow",
      us(
        [
          [r + 0.006, f + 0.012],
          [r - 0.012, f + 0.016],
          [r - 0.03, f - 0.02],
          [r * 0.62, f - 0.05],
          [r * 0.5, f - 0.02],
          [r * 0.42, f - 0.012],
          [0, f - 0.012],
        ],
        14,
      ),
      null,
      (p, d, v) =>
        Math.hypot(p, v) > r * 0.7 ? [0.55, 0.5, 0.42] : [0.8, 0.78, 0.7],
    ),
      i.add(
        "steel_dark",
        us(
          [
            [0, n * 0.2],
            [r + 0.004, n * 0.2],
          ],
          10,
        ),
        null,
        0.4,
      ),
      i.add(
        "steel_dark",
        ot(r * 0.2, r * 0.24, 0.035, 8),
        { p: [0, f, 0] },
        0.7,
      ));
    for (let p = 0; p < 6; p++) {
      let d = (p * At) / 3;
      i.add(
        "steel_galv",
        ot(0.011, 0.012, 0.016, 6),
        { p: [Math.cos(d) * r * 0.33, f - 0.006, Math.sin(d) * r * 0.33] },
        c.range(0.5, 0.8),
      );
    }
    (i.pop(), i.pop());
  }

function oR(i, e) {
    let t = new Kn(i, "forklift", e.seed || 0),
      n = t.rng,
      s = zi(+e.forksUp || 0, 0, 1),
      o = s * 1.5,
      r = o / 2,
      [a, l] = Ja(e.color, "yellow"),
      c = (K = 1) => (typeof l == "number" ? l * K : l.map((ie) => ie * K)),
      u = "steel_dark",
      h = () => n.range(0.68, 0.95),
      f = e.number || ["04", "07", "12", "22"][t.seed % 4],
      p = 0.33,
      d = 0.23,
      v = 0.22,
      g = 0.47,
      x = 0.27,
      y = 0.18,
      b = -1.1,
      m = 0.46;
    for (let K of [1, -1])
      (ib(t, v, p, d, g, K, 0.195, 24, 0, n),
        ib(t, b, x, y, m, K, 0.155, 20, 0, n));
    (t.add(u, vn([v, p, -0.4], [v, p, 0.4], 0.07, 8), null, 0.5),
      t.add(u, Ge(0.12, 0.1, 0.78, 0.01), { p: [b, x, 0] }, 0.5),
      t.add(u, Ge(1.95, 0.34, 0.68, 0.02), { p: [-0.425, 0.37, 0] }, 0.55));
    for (let K of [1, -1]) {
      (t.add(
        a,
        Ge(0.6, 0.3, 0.17, 0.02),
        { p: [-0.47, 0.4, K * 0.42] },
        c(0.92),
      ),
        t.add(
          "diamond_plate",
          Ge(0.3, 0.012, 0.16, 0.003),
          { p: [-0.32, 0.556, K * 0.42] },
          0.7,
        ),
        t.add(u, ot(0.03, 0.03, 0.02, 8), { p: [-0.62, 0.56, K * 0.42] }, 0.6));
      let ie = [],
        F = p + 0.035,
        X = p + 0.06;
      for (let ne = 0; ne <= 7; ne++) {
        let re = 0.12 + ((At - 0.5) * ne) / 7;
        ie.push([v + Math.cos(re) * X, p + Math.sin(re) * X]);
      }
      for (let ne = 7; ne >= 0; ne--) {
        let re = 0.12 + ((At - 0.5) * ne) / 7;
        ie.push([v + Math.cos(re) * F, p + Math.sin(re) * F]);
      }
      t.add(a, Mo(ie, 0.27, { soft: 0.7 }), { p: [0, 0, K * 0.475] }, c(0.95));
    }
    t.add("diamond_plate", $e(0.66, 0.016, 0.68), { p: [0.2, 0.548, 0] }, 0.6);
    for (let K of [-0.12, 0.1])
      t.add(
        "rubber",
        Ge(0.1, 0.02, 0.07, 0.006),
        { p: [0.33, 0.6, K], r: [0, 0, 0.5] },
        0.8,
      );
    let A = eo(0.62, 0.63, 1.12, 0.12, 3, 3, 3);
    (to(A, (K) => {
      if (K.y > 0.1) {
        let ie = (K.y - 0.1) / 0.215;
        K.x += 0.03 * ie * (K.x < 0 ? 1 : 0);
      }
    }),
      t.add(a, gr(A), { p: [-1.39, 0.915, 0] }, c(0.97)),
      t.add(a, Ge(0.56, 0.37, 0.64, 0.05), { p: [-1.4, 0.43, 0] }, c(0.85)),
      t.add(
        "hazard_stripes",
        Ge(0.014, 0.085, 0.84, 0.004),
        { p: [-1.702, 0.77, 0] },
        0.95,
      ),
      t.label(
        f,
        { color: "black", font: "stencil", distress: 0.35 },
        0.4,
        0.2,
        { p: [-1.703, 0.96, 0], r: [0, -tt, 0] },
      ));
    for (let K of [1, -1])
      (t.add(
        i.mats.emissive(16722450, 0.16),
        Ge(0.012, 0.05, 0.11, 0.004),
        { p: [-1.69, 1.1, K * 0.37] },
        1,
        { raw: !0 },
      ),
        t.add(
          u,
          Ge(0.016, 0.066, 0.126, 0.004),
          { p: [-1.684, 1.1, K * 0.37] },
          0.4,
        ),
        t.label(
          "NORTHSTAR",
          { color: "black", font: "sans", distress: 0.3 },
          0.42,
          0.085,
          { p: [-1.39, 0.99, K * 0.5625], r: [0, K > 0 ? 0 : At, 0] },
        ),
        t.add(
          u,
          Ge(0.06, 0.05, 0.02, 0.004),
          { p: [-1.67, 0.44, K * 0.05] },
          0.5,
        ));
    (t.add("steel_worn", ot(0.02, 0.02, 0.13, 8), { p: [-1.68, 0.44, 0] }, 0.7),
      t.add(a, Ge(0.98, 0.46, 0.94, 0.04), { p: [-0.59, 0.79, 0] }, c()));
    for (let K of [1, -1]) {
      (t.label(
        f,
        { color: "black", font: "stencil", distress: 0.35 },
        0.3,
        0.19,
        { p: [-0.84, 0.8, K * 0.4715], r: [0, K > 0 ? 0 : At, 0] },
      ),
        t.add(u, $e(0.34, 0.2, 0.004), { p: [-0.36, 0.8, K * 0.47] }, 0.2));
      for (let ie = 0; ie < 5; ie++)
        t.add(
          a,
          $e(0.34, 0.03, 0.006),
          { p: [-0.36, 0.72 + ie * 0.04, K * 0.474], r: [K * 0.5, 0, 0] },
          c(0.85),
        );
    }
    t.add(u, Ge(0.4, 0.05, 0.4, 0.01), { p: [-0.54, 1.045, 0] }, 0.5);
    let _ = eo(0.46, 0.1, 0.46, 0.04, 3, 3, 3);
    (to(_, (K) => {
      K.y > 0 && (K.y -= 0.018 * Math.cos(K.x * 5) * Math.cos(K.z * 5));
    }),
      t.add("rubber", gr(_), { p: [-0.53, 1.115, 0] }, 1));
    let M = eo(0.1, 0.5, 0.44, 0.04, 3, 4, 3);
    (to(M, (K) => {
      K.x > 0 && (K.x -= 0.02 * Math.cos(K.z * 5.5));
    }),
      t.add("rubber", gr(M), { p: [-0.8, 1.39, 0], r: [0, 0, 0.16] }, 1));
    for (let K of [1, -1])
      t.add(
        u,
        zr([-0.78, 1.08, K * 0.24], [-0.82, 1.3, K * 0.24], 0.03, 0.012, 0.004),
        null,
        0.5,
      );
    t.add(
      a,
      Mo(
        [
          [0.2, 0.55],
          [0.54, 0.55],
          [0.54, 1],
          [0.46, 1.12],
          [0.3, 1.14],
          [0.21, 1.02],
        ],
        0.7,
        { soft: 0.5 },
      ),
      null,
      c(),
    );
    let E = Math.atan2(0.12, 0.09);
    (t.push({ p: [0.253, 1.082, 0], r: [0, 0, E] }),
      t.add(u, Ge(0.012, 0.13, 0.44, 0.004), { p: [-0.006, 0, 0] }, 0.45),
      t.add(
        i.mats.emissive(9429168, 0.3),
        _f(0.09, 0.05),
        { p: [-0.0135, 0.01, 0.1], r: [0, -tt, 0] },
        1,
        { raw: !0, cast: !1 },
      ),
      t.decal(i.mats.decal("csc_plate"), 0.09, {
        p: [-0.0135, 0, -0.12],
        r: [0, -tt, 0],
      }),
      t.add(
        "plastic_red",
        ot(0.016, 0.016, 0.02, 8),
        { p: [-0.02, 0, 0.19], r: [0, 0, tt] },
        0.9,
      ),
      t.add(
        "steel_bare",
        ot(0.009, 0.009, 0.02, 6),
        { p: [-0.018, -0.03, -0.01], r: [0, 0, tt] },
        0.9,
      ),
      t.pop());
    let w = [0.3, 1.1, 0.04],
      S = [0.1, 1.31, 0.04];
    (t.add(u, vn(w, S, 0.024, 8), null, 0.5),
      t.push({ p: S, r: [0, 0, Math.atan2(S[1] - w[1], S[0] - w[0])] }),
      t.add("rubber", ja(0.165, 0.014, 6, 18), { r: [0, tt, 0] }, 1));
    for (let K = 0; K < 3; K++) {
      let ie = (K * At * 2) / 3 + 0.5;
      t.add(
        u,
        vn(
          [-0.01, 0, 0],
          [0, Math.cos(ie) * 0.16, Math.sin(ie) * 0.16],
          0.009,
          5,
        ),
        null,
        0.5,
      );
    }
    (t.add(
      u,
      ot(0.035, 0.04, 0.03, 10),
      { p: [-0.005, 0, 0], r: [0, 0, tt] },
      0.5,
    ),
      t.add(
        "rubber",
        ot(0.016, 0.014, 0.045, 8),
        { p: [0.03, 0.16, 0.02], r: [0, 0, tt] },
        1,
      ),
      t.pop());
    for (let K = 0; K < 3; K++) {
      let ie = -0.2 - K * 0.055,
        F = [0.33, 1.12, ie],
        X = [0.25 - K * 0.012, 1.3 - K * 0.01, ie - 0.01];
      (t.add("steel_bare", vn(F, X, 0.007, 5), null, 0.8),
        t.add("rubber", Y3(0.02, 7, 5), { p: X }, 1));
    }
    {
      let K = [0.3, 1.1, 0.27],
        ie = [0.2, 1.24, 0.29];
      (t.add("steel_bare", vn(K, ie, 0.008, 5), null, 0.8),
        t.add(
          "plastic_red",
          ot(0.016, 0.016, 0.07, 7),
          { p: ie, r: [0, 0, 0.6] },
          0.9,
        ));
    }
    let z = 2.045,
      H = [];
    for (let K of [1, -1]) {
      let ie = [0.47, 1.08, K * 0.4],
        F = [0.27, z, K * 0.46],
        X = [-1, 1, K * 0.44],
        ne = [-0.95, z, K * 0.46];
      (t.add(u, zr(ie, F, 0.06, 0.05, 0.01), null, h()),
        t.add(u, zr(X, ne, 0.06, 0.05, 0.01), null, h()),
        t.add(
          u,
          zr([0.3, z, K * 0.46], [-0.98, z, K * 0.46], 0.05, 0.06, 0.01),
          null,
          h(),
        ),
        t.add(
          u,
          Ge(0.09, 0.012, 0.08, 0.003),
          { p: [0.47, 1.085, K * 0.4] },
          0.5,
        ),
        t.add(
          u,
          Ge(0.09, 0.012, 0.08, 0.003),
          { p: [-1, 1.024, K * 0.44] },
          0.5,
        ));
      let re = 0.36,
        $ = 1.66;
      (t.add(
        u,
        eo(0.085, 0.1, 0.13, 0.02, 3, 3, 3),
        { p: [re + 0.045, $, K * 0.47] },
        0.45,
      ),
        t.add(
          i.mats.emissive(16773330, 0.7),
          Ge(0.006, 0.075, 0.105, 0.002),
          { p: [re + 0.089, $, K * 0.47] },
          1,
          { raw: !0 },
        ),
        t.add(
          u,
          vn([0.385, 1.5, K * 0.42], [0.42, 1.52, K * 0.57], 0.008, 5),
          null,
          0.5,
        ),
        t.add(
          u,
          Ge(0.022, 0.17, 0.1, 0.006),
          { p: [0.42, 1.52, K * 0.573], r: [0, K * 0.25, 0] },
          0.5,
        ),
        t.add(
          "steel_bare",
          $e(0.002, 0.15, 0.084),
          { p: [0.408, 1.52, K * 0.57], r: [0, K * 0.25, 0] },
          1,
        ),
        H.push(
          {
            min: [-1.03, 1, K > 0 ? 0.41 : -0.5],
            max: [-0.92, z, K > 0 ? 0.5 : -0.41],
            surface: "metal",
          },
          {
            min: [0.24, 1.08, K > 0 ? 0.37 : -0.5],
            max: [0.5, z, K > 0 ? 0.5 : -0.37],
            surface: "metal",
          },
        ));
    }
    for (let K of [0.28, -0.96])
      t.add(u, Ge(0.05, 0.06, 0.92, 0.01), { p: [K, z, 0] }, h());
    for (let K = 0; K < 8; K++)
      t.add(
        u,
        Ge(0.03, 0.028, 0.9, 0.006),
        { p: [-0.83 + K * 0.139, z + 0.012, 0] },
        h(),
      );
    (t.add(
      u,
      Fn(
        [
          [0.44, 1.2, 0.44],
          [0.47, 1.25, 0.49],
          [0.41, 1.55, 0.5],
          [0.36, 1.6, 0.455],
        ],
        0.011,
        5,
        !1,
        0.5,
      ),
      null,
      0.5,
    ),
      t.add(u, ot(0.045, 0.05, 0.03, 10), { p: [-0.86, z + 0.045, 0.3] }, 0.5),
      t.add(
        i.mats.emissive(16747026, 0.9),
        us(
          [
            [0.04, 0],
            [0.04, 0.06],
            [0.03, 0.082],
            [0, 0.09],
          ],
          10,
        ),
        { p: [-0.86, z + 0.06, 0.3] },
        1,
        { raw: !0 },
      ));
    let O = -1.4,
      q = 1.23 + 0.05 + 0.155;
    for (let K of [-0.2, 0.2])
      (t.add(u, Ge(0.3, 0.07, 0.04, 0.008), { p: [O, 1.262, K] }, 0.5),
        t.add(
          u,
          ot(0.159, 0.159, 0.035, 16, !0),
          { p: [O, q, K], r: [tt, 0, 0] },
          0.35,
        ));
    (t.add(
      "steel_galv",
      us(
        [
          [0, -0.37],
          [0.08, -0.36],
          [0.132, -0.33],
          [0.155, -0.27],
          [0.155, 0.27],
          [0.132, 0.33],
          [0.08, 0.36],
          [0, 0.37],
        ],
        16,
      ),
      { p: [O, q, 0], r: [tt, 0, 0] },
      (K, ie, F) => 0.8 + 0.2 * gn(K * 8, ie * 8, F * 8),
    ),
      t.add(
        "steel_galv",
        ot(0.09, 0.09, 0.07, 12, !0),
        { p: [O, q, 0.39], r: [tt, 0, 0] },
        0.7,
      ),
      t.add(
        "steel_galv",
        ot(0.02, 0.02, 0.05, 8),
        { p: [O, q, 0.39], r: [tt, 0, 0] },
        0.9,
      ),
      t.add(
        "rubber",
        Fn(
          [
            [O, q, 0.41],
            [O + 0.05, q - 0.02, 0.46],
            [O + 0.2, q - 0.15, 0.44],
            [-1.07, 1.1, 0.38],
            [-1, 0.98, 0.36],
          ],
          0.012,
          5,
          !1,
          0.5,
        ),
        null,
        1,
      ),
      t.push({ p: [O, q, 0], r: [0, 0, 0.7] }),
      t.cdecal(i.mats.decal("hazard_flammable"), 0.157, 0.12, {
        p: [0, 0, -0.05],
        r: [-tt, 0, 0],
      }),
      t.cdecal(
        i.mats.label("LPG", { color: "red", font: "stencil", distress: 0.3 }),
        0.157,
        0.16,
        { p: [0, 0, 0.14], r: [-tt, 0, 0] },
      ),
      t.pop());
    let U = 0.6,
      T = 0.73,
      D = 0.375,
      C = 0.08,
      G = 2.02;
    for (let K of [1, -1]) {
      let ie = K * D,
        F = [
          [U, ie],
          [T, ie],
          [T, ie - K * 0.065],
          [T - 0.014, ie - K * 0.065],
          [T - 0.014, ie - K * 0.014],
          [U + 0.014, ie - K * 0.014],
          [U + 0.014, ie - K * 0.065],
          [U, ie - K * 0.065],
        ];
      (t.add(
        u,
        Mo(sR(F.map((P) => [P[0], -P[1]])), G - C, { soft: 0 }),
        { p: [0, (C + G) / 2, 0], r: [-tt, 0, 0] },
        h(),
      ),
        t.add(
          u,
          Ge(0.085, 1.86, 0.036, 0.006),
          { p: [0.665, 0.13 + r + 0.93, K * 0.335] },
          h() * 1.25,
        ),
        t.decal(i.mats.decal("hazard_general"), 0.1, {
          p: [0.665, 1.3, K * (D + 0.002)],
          r: [0, K > 0 ? 0 : At, 0],
        }));
      let X = [0.36, 0.66, K * 0.3],
        ne = [0.6, 0.86, K * 0.33],
        re = [0.5, 0.777, K * 0.317];
      (t.add(u, vn(X, re, 0.034, 8, !0), null, 0.55),
        t.add("steel_bare", vn(re, ne, 0.018, 6), null, 1));
      let $ = K * 0.13,
        ue = 1.9 + r,
        me = 0.055,
        ee = [
          [0.725, 0.5 + o, $],
          [0.725, ue, $],
        ];
      for (let P = 0.5; P < At; P += 0.55)
        ee.push([0.67 + Math.cos(P) * me, ue + Math.sin(P) * me, $]);
      ee.push([0.615, ue, $], [0.615, 1, $]);
      let B = 0;
      for (let P = 0; P < ee.length - 1; P++) {
        let V = ee[P],
          Y = ee[P + 1],
          L = Math.hypot(Y[0] - V[0], Y[1] - V[1]),
          Z = Math.max(1, Math.round(L / 0.058));
        for (let J = 0; J < Z; J++, B++) {
          let oe = J / Z,
            fe = (J + 0.86) / Z,
            le = (R) => [V[0] + (Y[0] - V[0]) * R, V[1] + (Y[1] - V[1]) * R, $];
          t.add(
            "steel_worn",
            zr(le(oe), le(fe), 0.011, B % 2 ? 0.034 : 0.022, 0, !0),
            null,
            B % 2 ? 0.55 : 0.75,
          );
        }
      }
      t.add(
        u,
        ot(me - 0.006, me - 0.006, 0.04, 12),
        { p: [0.67, ue, $], r: [tt, 0, 0] },
        0.7,
      );
    }
    (t.add(u, Ge(0.04, 0.09, 0.78, 0.008), { p: [U - 0.012, 1.96, 0] }, h()),
      t.add(u, Ge(0.04, 0.12, 0.78, 0.008), { p: [U - 0.012, 0.42, 0] }, h()),
      t.add(u, Ge(0.07, 0.09, 0.66, 0.008), { p: [0.665, 1.99 + r, 0] }, h()),
      t.add(u, ot(0.048, 0.048, 1.15, 10), { p: [0.645, 0.72, 0] }, 0.6),
      t.add(u, ot(0.055, 0.055, 0.05, 10), { p: [0.645, 1.3, 0] }, 0.5),
      t.add(
        "steel_bare",
        ot(0.027, 0.027, 0.64 + r, 8, !0),
        { p: [0.645, 1.31 + (0.64 + r) / 2, 0] },
        1,
      ),
      t.label(
        "MAX LOAD 2500 KG",
        { color: "yellow", font: "stencil", distress: 0.3 },
        0.5,
        0.05,
        { p: [U - 0.033, 0.42, 0], r: [0, -tt, 0] },
      ));
    for (let K of [0.21, 0.245])
      t.add(
        "rubber",
        Fn(
          [
            [0.6, 1.25, K],
            [0.59, 1.65 + r * 0.6, K],
            [0.655, 1.86 + r, K + 0.005],
            [0.735, 1.6 + r * 1.2, K],
            [0.74, 0.56 + o, K],
          ],
          0.011,
          5,
          !1,
          0.5,
        ),
        null,
        1,
      );
    t.push({ p: [0, o, 0] });
    let j = 0.06;
    for (let K of [j + 0.12, j + 0.5])
      t.add(u, Ge(0.04, 0.1, 1.02, 0.008), { p: [0.755, K, 0] }, h());
    t.add(
      "hazard_stripes",
      $e(0.003, 0.06, 0.4),
      { p: [0.7765, j + 0.5, 0] },
      0.9,
    );
    for (let K of [1, -1])
      (t.add(
        u,
        Ge(0.03, 0.5, 0.06, 0.006),
        { p: [0.745, j + 0.31, K * 0.3] },
        h(),
      ),
        t.add(
          u,
          Ge(0.11, 0.36, 0.022, 0.005),
          { p: [0.685, j + 0.31, K * 0.305] },
          h(),
        ),
        t.add(
          u,
          Ge(0.03, 0.78, 0.04, 0.006),
          { p: [0.755, j + 0.94, K * 0.5] },
          h(),
        ),
        t.add(
          "steel_worn",
          ot(0.04, 0.04, 0.03, 10),
          { p: [0.67, j + 0.2, K * 0.325], r: [tt, 0, 0] },
          0.7,
        ));
    (t.add(u, Ge(0.03, 0.04, 1.04, 0.006), { p: [0.755, j + 1.33, 0] }, h()),
      t.add(u, Ge(0.02, 0.03, 1, 0.004), { p: [0.755, j + 0.94, 0] }, h()));
    for (let K = -2; K <= 2; K++)
      t.add(
        u,
        Ge(0.02, 0.76, 0.02, 0.004),
        { p: [0.755, j + 0.94, K * 0.165] },
        h(),
      );
    let N = 0.035;
    for (let K of [1, -1]) {
      let ie = Mo(
        [
          [0.777, N],
          [1.45, N],
          [1.7, N + 0.006],
          [1.7, N + 0.016],
          [0.87, N + 0.046],
          [0.826, N + 0.075],
          [0.822, N + 0.62],
          [0.777, N + 0.62],
        ],
        0.1,
        { soft: 0.45 },
      );
      (t.add("steel_worn", ie, { p: [0, 0, K * 0.26] }, (F, X, ne) => {
        let re = zi((F - 0.8) / 0.9, 0, 1),
          $ = gn(F * 14, ne * 30 + K);
        return (0.5 + 0.5 * re) * (0.8 + 0.2 * $);
      }),
        t.add(
          u,
          Ge(0.075, 0.05, 0.112, 0.006),
          { p: [0.772, j + 0.575, K * 0.26] },
          0.55,
        ),
        t.add(
          u,
          Ge(0.03, 0.04, 0.112, 0.006),
          { p: [0.79, j + 0.07, K * 0.26] },
          0.55,
        ));
    }
    t.pop();
    let Q = Math.max(2.2, 0.06 + o + 1.36, 2.04 + r);
    return t.finish({
      size: [3.4, Q, 1.25],
      colliders: [
        { min: [-1.7, 0, -0.6], max: [0.58, 1.24, 0.6], surface: "metal" },
        { min: [-1.56, 1.24, -0.4], max: [-1.22, 1.6, 0.4], surface: "metal" },
        {
          min: [-0.88, 1.24, -0.24],
          max: [-0.7, 1.66, 0.24],
          surface: "rubber",
        },
        {
          min: [0.56, 0, -0.42],
          max: [0.78, 2.04 + r, 0.42],
          surface: "metal",
        },
        { min: [0.72, o, -0.53], max: [0.8, o + 1.42, 0.53], surface: "metal" },
        { min: [0.8, o, -0.33], max: [1.7, o + 0.1, 0.33], surface: "metal" },
        { min: [-1.02, 2, -0.5], max: [0.32, 2.1, 0.5], surface: "metal" },
        ...H,
      ],
    });
  }

function rR(i, e) {
    let t = new Kn(i, "generator", e.seed || 0),
      n = t.rng,
      [s, o] = Ja(e.color, "yellow"),
      r = (m = 1) => (typeof o == "number" ? o * m : o.map((A) => A * m)),
      a = "steel_dark",
      l = 0.46,
      c = 1.03,
      u = 0.3,
      h = 1.16,
      f = (u + h) / 2;
    for (let m of [1, -1]) {
      t.add(a, Ge(2.2, 0.14, 0.1, 0.012), { p: [0, 0.07, m * 0.4] }, 0.6);
      for (let A of [-0.45, 0.45])
        t.add(a, $e(0.22, 0.075, 0.004), { p: [A, 0.075, m * 0.451] }, 0.12);
    }
    for (let m of [-0.85, 0, 0.85])
      t.add(a, $e(0.1, 0.1, 0.72), { p: [m, 0.07, 0] }, 0.55);
    (t.add(a, Ge(2.1, 0.17, 0.94, 0.012), { p: [0, 0.215, 0] }, 0.8),
      t.add(s, Ge(2.06, h - u, l * 2, 0.025), { p: [0, f, 0] }, r()),
      t.add(s, Ge(2.13, 0.045, 0.99, 0.014), { p: [0, h + 0.02, 0] }, r(0.9)));
    for (let m of [-0.52, 0.52])
      t.add(s, $e(0.04, 0.012, 0.95), { p: [m, h + 0.046, 0] }, r(0.85));
    for (let m of [1, -1]) {
      let A = m > 0 ? 0 : At;
      ([-0.66, 0, 0.66].forEach((_, M) => {
        (t.add(
          s,
          Ge(0.62, 0.72, 0.012, 0.006),
          { p: [_, f + 0.01, m * (l + 0.004)] },
          r(n.range(0.9, 1)),
        ),
          t.add(
            a,
            $e(0.03, 0.11, 0.016),
            { p: [_ + 0.27, f, m * (l + 0.012)] },
            0.6,
          ),
          t.add(
            "steel_galv",
            $e(0.012, 0.03, 0.006),
            { p: [_ + 0.27, f + 0.03, m * (l + 0.022)] },
            0.8,
          ));
        for (let E of [-0.25, 0.25])
          t.add(
            "steel_galv",
            ot(0.009, 0.009, 0.06, 5, !0),
            { p: [_ - 0.305, f + E, m * (l + 0.012)] },
            0.7,
          );
        if (M > 0) {
          let E = M === 2 ? 8 : 5,
            w = 0.42,
            S = M === 2 ? f + 0.14 : f - 0.16;
          t.add(
            a,
            $e(w, E * 0.05, 0.004),
            { p: [_ - 0.03, S, m * (l + 0.0105)] },
            0.12,
          );
          for (let z = 0; z < E; z++)
            t.add(
              s,
              $e(w, 0.04, 0.005),
              {
                p: [_ - 0.03, S + (z - (E - 1) / 2) * 0.05, m * (l + 0.018)],
                r: [m * 0.6, 0, 0],
              },
              r(0.82),
            );
          M === 2 &&
            t.decal(i.mats.decal("rust_run"), 0.3, {
              p: [_ - 0.03, S - 0.36, m * (l + 0.011)],
              r: [0, A, 0],
            });
        }
      }),
        t.label(
          e.label || "GEN-0" + (1 + (t.seed % 2)),
          { color: "black", font: "stencil", distress: 0.35 },
          0.5,
          0.13,
          { p: [-0.66 * m, f + 0.17, m * (l + 0.0108)], r: [0, A, 0] },
        ),
        t.decal(i.mats.decal("hazard_voltage"), 0.15, {
          p: [-0.66 * m - m * 0.18, f - 0.17, m * (l + 0.0108)],
          r: [0, A, 0],
        }));
    }
    t.add(a, $e(0.004, 0.66, 0.74), { p: [c + 0.001, f, 0] }, 0.1);
    for (let m = 0; m < 11; m++)
      t.add(
        s,
        $e(0.006, 0.046, 0.74),
        { p: [c + 0.012, f - 0.3 + m * 0.06, 0], r: [0, 0, -0.6] },
        r(0.8),
      );
    for (let m of [1, -1])
      (t.add(s, $e(0.03, 0.72, 0.03), { p: [c + 0.012, f, m * 0.385] }, r(0.9)),
        t.add(
          s,
          $e(0.03, 0.03, 0.8),
          { p: [c + 0.012, f + m * 0.345, 0] },
          r(0.9),
        ));
    let p = -c - 0.004,
      d = 0.14;
    (t.add(a, Ge(0.01, 0.44, 0.52, 0.004), { p: [p, 0.87, d] }, 0.45),
      t.add(
        s,
        Ge(0.075, 0.014, 0.56, 0.004),
        { p: [p - 0.03, 1.1, d], r: [0, 0, 0.12] },
        r(0.9),
      ));
    for (let m of [1, -1])
      t.add(
        s,
        $e(0.06, 0.44, 0.012),
        { p: [p - 0.025, 0.87, d + m * 0.268] },
        r(0.9),
      );
    let v = p - 0.0055,
      g = [0, -tt, 0];
    (t.add(
      i.mats.emissive(8840104, 0.32),
      _f(0.13, 0.07),
      { p: [v - 0.001, 0.99, d - 0.12], r: g },
      1,
      { raw: !0, cast: !1 },
    ),
      t.add(
        a,
        Ge(0.008, 0.09, 0.15, 0.003),
        { p: [v + 0.003, 0.99, d - 0.12] },
        0.3,
      ),
      t.add(
        "steel_galv",
        ot(0.02, 0.02, 0.012, 10),
        { p: [v - 0.004, 1, d + 0.19], r: [0, 0, tt] },
        0.7,
      ),
      t.add(
        i.mats.emissive(4063082, 3.2),
        ot(0.013, 0.013, 0.014, 10),
        { p: [v - 0.009, 1, d + 0.19], r: [0, 0, tt] },
        1,
        { raw: !0 },
      ),
      t.add(
        s,
        ot(0.042, 0.042, 0.006, 12),
        { p: [v - 0.003, 0.8, d + 0.17], r: [0, 0, tt] },
        1,
      ),
      t.add(
        "plastic_red",
        us(
          [
            [0, 0],
            [0.018, 0],
            [0.018, 0.018],
            [0.03, 0.02],
            [0.03, 0.034],
            [0.02, 0.042],
            [0, 0.044],
          ],
          10,
        ),
        { p: [v - 0.004, 0.8, d + 0.17], r: [0, 0, tt] },
        0.95,
      ));
    for (let m = 0; m < 3; m++) {
      let A = d - 0.2 + m * 0.105;
      (t.add(
        "aluminium",
        ot(0.04, 0.042, 0.012, 10),
        { p: [v - 0.004, 0.86, A], r: [0, 0, tt] },
        0.8,
      ),
        t.add(
          "aluminium",
          ot(0.034, 0.034, 0.002, 10),
          { p: [v - 0.0105, 0.86, A], r: [0, 0, tt] },
          1,
        ),
        t.add(
          a,
          $e(0.002, 0.028, 0.004),
          { p: [v - 0.0125, 0.868, A + 0.005], r: [n.range(-1, 1), 0, 0] },
          0.3,
        ));
    }
    for (let m = 0; m < 5; m++)
      t.add(
        m === 0 ? "plastic_red" : a,
        $e(0.014, 0.04, 0.022),
        {
          p: [v - 0.006, 0.74, d - 0.2 + m * 0.03],
          r: [0, 0, n() < 0.5 ? 0.25 : -0.25],
        },
        0.8,
      );
    (t.decal(i.mats.decal("hazard_voltage"), 0.13, {
      p: [-c - 0.002, 0.95, -0.28],
      r: g,
    }),
      t.label(
        "DANGER",
        { color: "red", font: "stencil", distress: 0.3 },
        0.22,
        0.05,
        { p: [-c - 0.002, 0.82, -0.28], r: g },
      ));
    let x = [
      ["plastic_red", 0.02],
      ["plastic_blue", 0.2],
      ["plastic_blue", -0.25],
    ];
    for (let [m, A] of x)
      (t.add(a, Ge(0.02, 0.12, 0.1, 0.006), { p: [-c - 0.008, 0.5, A] }, 0.4),
        t.add(
          m,
          vn([-c - 0.01, 0.5, A], [-c - 0.06, 0.47, A], 0.036, 10, !0),
          null,
          0.9,
        ));
    (t.add(
      "plastic_blue",
      vn([-c - 0.06, 0.47, 0.2], [-c - 0.068, 0.39, 0.2], 0.03, 8, !0, 0.02),
      null,
      0.85,
    ),
      t.add(
        "rubber",
        Fn(
          [
            [-c - 0.066, 0.4, 0.2],
            [-c - 0.064, 0.25, 0.21],
            [-c - 0.05, 0.06, 0.26],
            [-c + 0.05, 0.016, 0.4],
            [-c + 0.3, 0.016, 0.478],
            [-0.35, 0.016, 0.486],
          ],
          0.014,
          5,
          !1,
          0.5,
        ),
        null,
        1,
      ));
    let y = h + 0.0425;
    (t.add(a, Ge(0.2, 0.012, 0.14, 0.004), { p: [0, y + 0.004, 0] }, 0.6),
      t.add(
        "steel_galv",
        ja(0.045, 0.014, 5, 10),
        { p: [0, y + 0.058, 0] },
        0.7,
      ));
    let b = [0.72, y, 0.24];
    return (
      t.add(
        "steel_rust",
        ot(0.062, 0.066, 0.025, 12),
        { p: [b[0], y + 0.012, b[2]] },
        0.6,
      ),
      t.add(
        "steel_rust",
        ot(0.04, 0.04, 0.17, 12, !0),
        { p: [b[0], y + 0.085, b[2]] },
        (m, A) => 0.45 + 0.55 * zi((y + 0.17 - A) / 0.17, 0, 1),
      ),
      t.add(
        "steel_rust",
        ot(0.034, 0.034, 0.002, 10),
        { p: [b[0], y + 0.15, b[2]] },
        0.08,
      ),
      t.add(
        "steel_rust",
        ot(0.046, 0.046, 0.005, 12),
        { p: [b[0] - 0.012, y + 0.186, b[2]], r: [0, 0, 0.5] },
        0.6,
      ),
      t.decal(i.mats.decal("scorch"), 0.3, {
        p: [b[0], y + 0.001, b[2]],
        r: [-tt, 0, 0],
      }),
      t.add(
        a,
        vn([-0.72, 0.25, 0.46], [-0.72, 0.32, 0.5], 0.03, 8, !0),
        null,
        0.6,
      ),
      t.add(
        "plastic_red",
        vn([-0.72, 0.32, 0.5], [-0.72, 0.338, 0.51], 0.037, 10, !0),
        null,
        0.9,
      ),
      t.decal(i.mats.decal("hazard_flammable"), 0.11, {
        p: [-0.52, 0.215, 0.4712],
      }),
      t.label(
        "DIESEL FUEL",
        { color: "white", font: "stencil", distress: 0.4 },
        0.2,
        0.05,
        { p: [-0.34, 0.215, 0.4712] },
      ),
      t.finish({
        colliders: [
          { min: [-1.1, 0, -0.5], max: [1.1, 1.21, 0.5], surface: "metal" },
        ],
      })
    );
  }

function aR(i, e) {
    let t = new Kn(i, "dumpster", e.seed || 0),
      n = t.rng,
      [s, o] = Ja(e.color, "green"),
      r = (M = 1) => (typeof o == "number" ? o * M : o.map((E) => E * M)),
      a = 0.89,
      l = 0.2,
      c = 1.12,
      u = 0.3,
      h = 0.5,
      f = -0.44,
      p = -0.5,
      d = 0.022,
      v = [
        [-h, c],
        [-u, l],
        [-f, l],
        [-p, c],
        [-p - d, c],
        [-f - d * 0.8, l + d],
        [-u + d * 0.8, l + d],
        [-h + d, c],
      ],
      g = t.seed * 2.3;
    t.add(s, Mo(v, a * 2, { soft: 0 }), { r: [0, tt, 0] }, (M, E, w) => {
      let S =
        Math.abs(w) < 0.4 &&
        E > l + 0.01 &&
        E < c - 0.01 &&
        Math.abs(M) < a - 0.01;
      return r(0.9 + 0.1 * gn(M * 3 + g, E * 3));
    });
    for (let M of [1, -1]) {
      (t.add(
        s,
        Mo(
          [
            [-h, c],
            [-u, l],
            [-f, l],
            [-p, c],
          ],
          d,
          { soft: 0 },
        ),
        { p: [M * (a - d / 2), 0, 0], r: [0, tt, 0] },
        r(0.95),
      ),
        t.add(
          s,
          Ge(0.05, 0.045, h - p + 0.04, 0.008),
          { p: [M * a, c, 0] },
          r(0.9),
        ));
      for (let E of [-0.22, 0.14])
        t.add(
          s,
          Ge(0.03, 0.84, 0.05, 0.006),
          { p: [M * (a + 0.012), 0.66, E] },
          r(0.9),
        );
      (t.add(
        s,
        Ge(0.035, 0.1, 0.84, 0.008),
        { p: [M * (a + 0.014), 0.93, 0] },
        r(0.85),
      ),
        t.add(
          "steel_worn",
          vn(
            [M * (a + 0.01), 0.93, 0.3],
            [M * (a + 0.065), 0.93, 0.3],
            0.03,
            10,
            !0,
          ),
          null,
          0.7,
        ),
        t.add(
          "steel_worn",
          ot(0.042, 0.042, 0.008, 10),
          { p: [M * (a + 0.064), 0.93, 0.3], r: [0, 0, tt] },
          0.6,
        ));
    }
    (t.add(s, Ge(a * 2 + 0.04, 0.045, 0.05, 0.008), { p: [0, c, h] }, r(0.9)),
      t.add(s, Ge(a * 2 + 0.04, 0.045, 0.05, 0.008), { p: [0, c, p] }, r(0.9)));
    let x = Math.atan2(h - u, c - l),
      y = Math.atan2(p - f, c - l);
    for (let M of [-0.6, -0.2, 0.2, 0.6])
      (t.add(
        s,
        zr(
          [M, l + 0.03, u + 0.022],
          [M, c - 0.04, h + 0.012],
          0.055,
          0.03,
          0.006,
        ),
        null,
        r(0.9),
      ),
        t.add(
          s,
          zr(
            [M, l + 0.03, f - 0.016],
            [M, c - 0.04, p - 0.012],
            0.055,
            0.03,
            0.006,
          ),
          null,
          r(0.9),
        ));
    t.add(
      s,
      zr(
        [-a, l + 0.5, u + 0.022 + (0.5 * (h - u)) / (c - l)],
        [a, l + 0.5, u + 0.022 + (0.5 * (h - u)) / (c - l)],
        0.03,
        0.06,
        0.006,
      ),
      { r: [0, 0, 0] },
      r(0.88),
    );
    let b = (M) => u + ((M - l) * (h - u)) / (c - l) + 0.003;
    (t.label(
      e.label || "BERTH 04 WASTE " + (11 + (t.seed % 2)),
      { color: "white", font: "stencil", distress: 0.5 },
      0.36,
      0.09,
      { p: [-0.4, 0.93, b(0.93)], r: [-x, 0, 0] },
    ),
      t.decal(i.mats.decal("grime_streak"), 0.36, {
        p: [0.4, 0.82, b(0.82)],
        r: [-x, 0, 0],
      }),
      t.decal(i.mats.decal("rust_run"), 0.3, {
        p: [0, 0.5, b(0.5)],
        r: [-x, 0, 0],
      }),
      t.decal(i.mats.decal("logo_c"), 0.26, {
        p: [0.4, 0.42, b(0.42)],
        r: [-x, 0, 0],
      }),
      t.decal(i.mats.decal("leak_stain"), 0.34, {
        p: [-0.4, 0.45, b(0.45)],
        r: [-x, 0, 0],
      }));
    let m = c + 0.045,
      A = p - 0.02;
    t.add(
      "steel_galv",
      vn([-a - 0.02, m, A], [a + 0.02, m, A], 0.013, 6, !0),
      null,
      0.7,
    );
    let _ = (M, E) => {
      t.push({ p: [M, m, A], r: [E, 0, 0] });
      let w = 1.07,
        S = eo(0.885, 0.04, w, 0.016, 3, 3, 4);
      (to(S, (H) => {
        H.y > 0 &&
          (H.y +=
            0.018 * Math.cos((H.z / w) * At) * Math.cos((H.x / 0.885) * At));
      }),
        S.computeVertexNormals());
      let z = n.range(0.75, 0.95);
      t.add("plastic_grey", S, { p: [0, 0.005, w / 2] }, z);
      for (let H of [-0.26, 0.26])
        t.add(
          "plastic_grey",
          Ge(0.07, 0.016, w - 0.16, 0.006),
          { p: [H, 0.036, w / 2] },
          z * 0.9,
        );
      t.add(
        "plastic_grey",
        Ge(0.3, 0.035, 0.05, 0.01),
        { p: [0, 0.02, w + 0.01] },
        z * 0.8,
      );
      for (let H of [-0.3, 0.3])
        t.add(
          "plastic_grey",
          Ge(0.08, 0.03, 0.09, 0.008),
          { p: [H, 0.005, 0.03] },
          z * 0.8,
        );
      t.pop();
    };
    (_(-0.45, 0), _(0.45, tt + 0.07 + n.range(0, 0.05)));
    for (let [M, E, w, S] of [
      [0.45, 0.93, 0.05, 1],
      [0.66, 0.9, -0.24, 0.8],
      [0.22, 0.86, -0.2, 0.85],
    ]) {
      let z = eo(0.46 * S, 0.4 * S, 0.42 * S, 0.17 * S, 3, 3, 3),
        H = n() * 20;
      (to(z, (O) => {
        let q = gn(O.x * 9 + H, O.y * 9, O.z * 9) - 0.5;
        ((O.x += q * 0.06), (O.z += q * 0.06), (O.y += q * 0.04));
      }),
        t.add(
          "polymer_black",
          gr(z),
          { p: [M, E, w], r: [n() * 0.5, n() * 6, 0] },
          0.8,
        ));
    }
    t.add(
      "cardboard",
      vr(
        [
          [0.2, 0.9, 0.2],
          [0.24, 1.14, 0.26],
          [0.3, 1.2, 0.33],
        ],
        [0.16, 0, -0.05],
      ),
      null,
      0.7,
    );
    for (let M of [-0.7, 0.7])
      for (let E of [-0.3, 0.17]) {
        (t.push({ p: [M, 0, E], r: [0, n() * 6, 0] }),
          t.add(
            "steel_galv",
            Ge(0.13, 0.012, 0.11, 0.003),
            { p: [0, 0.194, 0] },
            0.7,
          ));
        for (let w of [1, -1])
          t.add(
            "steel_galv",
            zr(
              [0, 0.19, w * 0.034],
              [0.035, 0.08, w * 0.034],
              0.05,
              0.006,
              0,
              !0,
            ),
            null,
            0.65,
          );
        (t.add(
          "rubber",
          ot(0.08, 0.08, 0.045, 14),
          { p: [0.035, 0.08, 0], r: [tt, 0, 0] },
          0.9,
        ),
          t.add(
            "steel_galv",
            ot(0.035, 0.035, 0.05, 8),
            { p: [0.035, 0.08, 0], r: [tt, 0, 0] },
            0.6,
          ),
          t.pop());
      }
    return t.finish({
      colliders: [
        { min: [-0.95, 0.05, -0.56], max: [0.95, 1.2, 0.55], surface: "metal" },
      ],
    });
  }

function lR(i, e) {
    let t = new Kn(i, "toolbox_cart", e.seed || 0),
      n = t.rng,
      [s, o] = Ja(e.color, "red"),
      r = (y = 1) => (typeof o == "number" ? o * y : o.map((b) => b * y)),
      a = 0.04,
      l = 0.74,
      c = 0.125,
      u = 0.785,
      h = 0.23;
    (t.add(s, Ge(l, u - c, h * 2, 0.012), { p: [a, (c + u) / 2, 0] }, r()),
      t.add(
        "steel_dark",
        Ge(l + 0.01, 0.02, h * 2 + 0.01, 0.006),
        { p: [a, c + 0.004, 0] },
        0.5,
      ));
    let f = [0.075, 0.075, 0.1, 0.13, 0.19],
      p = 1 + (t.seed % 3),
      d = u - 0.03;
    (f.forEach((y, b) => {
      let m = b === p ? 0.05 : n() < 0.3 ? 0.004 : 0,
        A = d - y / 2;
      if (
        (t.add(
          s,
          Ge(l - 0.05, y - 0.01, 0.014, 0.004),
          { p: [a, A, h + 0.005 + m] },
          r(n.range(0.9, 1)),
        ),
        t.add(
          "aluminium",
          Ge(l - 0.09, 0.016, 0.016, 0.004),
          { p: [a, A + y / 2 - 0.02, h + 0.019 + m] },
          0.85,
        ),
        m > 0.01)
      ) {
        (t.add(
          "steel_dark",
          $e(l - 0.07, y - 0.02, m),
          { p: [a, A, h + m / 2] },
          0.4,
        ),
          t.add(
            "polymer_black",
            $e(l - 0.08, 0.004, m),
            { p: [a, A + y / 2 - 0.012, h + m / 2] },
            0.3,
          ));
        for (let _ = 0; _ < 4; _++)
          t.add(
            "steel_bare",
            vn(
              [a - 0.25 + _ * 0.15, A + y / 2 - 0.016, h + 0.008],
              [a - 0.23 + _ * 0.15, A + y / 2 - 0.014, h + m - 0.012],
              0.007,
              5,
              !0,
            ),
            null,
            0.8,
          );
      }
      d -= y;
    }),
      t.add(
        "steel_bare",
        ot(0.011, 0.011, 0.008, 8),
        { p: [a + l / 2 - 0.06, u - 0.016, h + 0.004], r: [tt, 0, 0] },
        0.8,
      ),
      t.add(
        "rubber",
        $e(l - 0.04, 0.006, h * 2 - 0.04),
        { p: [a, u + 0.003, 0] },
        0.9,
      ),
      t.add(
        s,
        Ge(l, 0.03, 0.014, 0.004),
        { p: [a, u + 0.013, -h + 0.007] },
        r(0.95),
      ));
    for (let y of [1, -1])
      t.add(
        s,
        Ge(0.014, 0.03, h * 2, 0.004),
        { p: [a + y * (l / 2 - 0.007), u + 0.013, 0] },
        r(0.95),
      );
    t.add(
      "aluminium",
      Fn(
        [
          [a - l / 2, 0.56, -0.17],
          [-0.41, 0.6, -0.17],
          [-0.435, 0.73, -0.17],
          [-0.435, 0.73, 0.17],
          [-0.41, 0.6, 0.17],
          [a - l / 2, 0.56, 0.17],
        ],
        0.012,
        6,
        !1,
        0.2,
      ),
      null,
      0.85,
    );
    for (let y of [1, -1])
      for (let b of [1, -1]) {
        (t.push({
          p: [a + y * (l / 2 - 0.07), 0, b * (h - 0.06)],
          r: [0, y > 0 ? n() * 6 : 0, 0],
        }),
          t.add(
            "steel_galv",
            Ge(0.08, 0.008, 0.07, 0.002),
            { p: [0, 0.119, 0] },
            0.7,
          ));
        for (let m of [1, -1])
          t.add(
            "steel_galv",
            zr(
              [0, 0.117, m * 0.022],
              [0.02, 0.05, m * 0.022],
              0.035,
              0.004,
              0,
              !0,
            ),
            null,
            0.65,
          );
        (t.add(
          "rubber",
          ot(0.05, 0.05, 0.03, 12),
          { p: [0.02, 0.05, 0], r: [tt, 0, 0] },
          0.9,
        ),
          t.add(
            "steel_galv",
            ot(0.02, 0.02, 0.034, 6),
            { p: [0.02, 0.05, 0], r: [tt, 0, 0] },
            0.6,
          ),
          t.pop());
      }
    (t.label(
      e.label || "MAINTENANCE " + (1 + (t.seed % 2)),
      { color: "white", font: "stencil", distress: 0.4 },
      0.3,
      0.07,
      { p: [a + l / 2 + 0.002, 0.6, 0], r: [0, tt, 0] },
    ),
      t.decal(i.mats.decal("logo_d"), 0.2, {
        p: [a + l / 2 + 0.002, 0.42, 0],
        r: [0, tt, 0],
      }),
      t.decal(i.mats.decal("grime_streak"), 0.3, {
        p: [a, 0.45, -h - 0.002],
        r: [0, At, 0],
      }));
    let v = u + 0.006;
    (t.push({ p: [a - 0.18, v, 0.08], r: [0, 0.5, 0] }),
      t.add(
        "steel_bare",
        Ge(0.2, 0.006, 0.02, 0.002),
        { p: [0, 0.004, 0] },
        0.9,
      ),
      t.add(
        "steel_bare",
        ja(0.016, 0.006, 4, 10),
        { p: [0.11, 0.005, 0], r: [tt, 0, 0] },
        0.9,
      ),
      t.add(
        "steel_bare",
        ja(0.017, 0.006, 4, 7, At * 1.4),
        { p: [-0.112, 0.005, 0], r: [tt, 0, 2.2] },
        0.9,
      ),
      t.pop(),
      t.push({ p: [a + 0.02, v, -0.1], r: [0, -0.3, 0] }),
      t.add(
        "wood_pallet",
        vn([-0.14, 0.014, 0], [0.12, 0.016, 0], 0.012, 6, !0, 0.01),
        null,
        0.9,
      ),
      t.add(
        "steel_dark",
        Ge(0.032, 0.03, 0.1, 0.006),
        { p: [0.125, 0.017, 0.005] },
        0.8,
      ),
      t.pop(),
      t.push({ p: [a + 0.2, v, 0.1], r: [0, 0.12, 0] }),
      t.add(
        "polymer_black",
        Ge(0.22, 0.014, 0.05, 0.004),
        { p: [0, 0.007, 0] },
        0.6,
      ));
    for (let y = 0; y < 6; y++)
      t.add(
        "steel_bare",
        ot(0.008 + y * 0.0014, 0.008 + y * 0.0014, 0.03, 8),
        { p: [-0.085 + y * 0.034, 0.029, 0] },
        0.9,
      );
    (t.pop(),
      t.add(
        "plastic_blue",
        ot(0.032, 0.032, 0.13, 12),
        { p: [a + 0.28, v + 0.065, -0.12] },
        0.9,
      ),
      t.add(
        "steel_bare",
        us(
          [
            [0.032, 0],
            [0.028, 0.012],
            [0.014, 0.018],
            [0.014, 0.018],
            [0.014, 0.03],
            [0, 0.03],
          ],
          10,
        ),
        { p: [a + 0.28, v + 0.13, -0.12] },
        0.9,
      ),
      t.add(
        "plastic_red",
        ot(0.012, 0.012, 0.014, 8),
        { p: [a + 0.28, v + 0.165, -0.12] },
        0.95,
      ),
      t.add(
        "paint_yellow",
        vn(
          [a - 0.3, v + 0.012, -0.13],
          [a - 0.2, v + 0.012, -0.16],
          0.014,
          7,
          !0,
        ),
        null,
        0.9,
      ),
      t.add(
        "steel_bare",
        vn(
          [a - 0.2, v + 0.012, -0.16],
          [a - 0.08, v + 0.01, -0.196],
          0.004,
          5,
          !0,
        ),
        null,
        0.9,
      ));
    let g = eo(0.2, 0.02, 0.15, 0.009, 4, 3, 4),
      x = n() * 9;
    return (
      to(g, (y) => {
        ((y.y += 0.012 * gn(y.x * 30 + x, y.z * 30) * (y.y > 0 ? 1 : 0)),
          (y.x += 0.012 * (gn(y.z * 20, x) - 0.5)));
      }),
      t.add(
        t.mat("glove_fabric", { color: 8203044 }),
        gr(g),
        { p: [a - 0.26, v + 0.01, 0.12], r: [0, 0.8, 0] },
        0.9,
      ),
      t.finish()
    );
  }

function sb(i) {
    (i("forklift", (e, t = {}) => oR(e, t)),
      i("generator", (e, t = {}) => rR(e, t)),
      i("dumpster", (e, t = {}) => aR(e, t)),
      i("toolbox_cart", (e, t = {}) => lR(e, t)));
  }

J3(_i);

eb(_i);

sb(_i);

var cv = {};

br(cv, { create: () => C1, showcase: () => mR });

var cR = new Set(["traffic_cone", "jerry_can"]);

function ob(i) {
    let e = new wt();
    e.name = "level-static";
    let t = new wt();
    t.name = "level-dynamic";
    let n = [],
      s = [],
      o = [],
      r = i.rng && i.rng.fork ? i.rng.fork() : Math.random,
      a = (T, D) => T + (D - T) * r(),
      l = (T, D) => i.mats.get(T, D),
      c = (T, D) => i.mats.get(T, { interior: !0, ...(D || {}) }),
      u = (T) => (typeof T == "string" ? l(T) : T);
    function h(T, D, C = {}) {
      let G = Qi(T, u(D), { cast: C.cast !== !1, recv: C.recv !== !1 });
      return (
        C.p && G.position.set(C.p[0], C.p[1], C.p[2]),
        C.r && G.rotation.set(C.r[0] || 0, C.r[1] || 0, C.r[2] || 0),
        (C.parent || e).add(G),
        G
      );
    }
    function f(T, D, C, G, j, N, Q, K = {}) {
      let ie = K.bevel ? Wi(D, C, G, K.bevel) : $e(D, C, G);
      return h(ie, T, { ...K, p: [j, N, Q] });
    }
    function p(T, D, C, G, j, N, Q, K = {}) {
      return f(
        T,
        Math.abs(j - D),
        Math.abs(N - C),
        Math.abs(Q - G),
        (D + j) / 2,
        (C + N) / 2,
        (G + Q) / 2,
        K,
      );
    }
    function d(T, D, C, G, j, N, Q = {}) {
      let K = ot(Q.rTop ?? D, D, C, Q.seg || 12, !!Q.open),
        ie =
          Q.axis === "x"
            ? [0, 0, Math.PI / 2]
            : Q.axis === "z"
              ? [Math.PI / 2, 0, 0]
              : Q.r || [0, 0, 0];
      return h(K, T, { ...Q, p: [G, j, N], r: ie });
    }
    function v(T, D, C = 0.03, G = {}) {
      return h(Fn(D, C, G.radial || 6, !1, G.tension ?? 0.5), T, G);
    }
    function g(T, D, C, G = 0.015, j = {}) {
      let N = new W(...D),
        Q = new W(...C),
        K = N.distanceTo(Q),
        ie = ot(G, G, K, j.seg || 6),
        F = h(ie, T, j);
      return (
        F.position.copy(N).add(Q).multiplyScalar(0.5),
        F.quaternion.setFromUnitVectors(new W(0, 1, 0), Q.sub(N).normalize()),
        F
      );
    }
    function x(
      T,
      D,
      C,
      G,
      j,
      N,
      {
        depth: Q = 0.4,
        width: K = 0.2,
        tf: ie = 0.02,
        tw: F = 0.012,
        depthAxis: X = null,
        r: ne = null,
      } = {},
    ) {
      let re = new wt();
      (re.position.set(G, j, N),
        ne && re.rotation.set(ne[0] || 0, ne[1] || 0, ne[2] || 0));
      let $ = X || (D === "y" ? "z" : "y"),
        ue = ["x", "y", "z"].find((P) => P !== D && P !== $),
        me = (P, V, Y) => {
          let L = {};
          return ((L[D] = P), (L[$] = V), (L[ue] = Y), [L.x, L.y, L.z]);
        },
        ee = (P) => {
          let V = { x: 0, y: 0, z: 0 };
          return ((V[$] = P), [V.x, V.y, V.z]);
        },
        B = u(T);
      for (let P of [-1, 1])
        h($e(...me(C, ie, K)), B, { parent: re, p: ee(P * (Q / 2 - ie / 2)) });
      return (h($e(...me(C, Q - 2 * ie, F)), B, { parent: re }), e.add(re), re);
    }
    function y(T, D, C, G, j, N, Q = "z+", K = 0) {
      let ie = new rn(D, C),
        F = new Qe(ie, T);
      return (
        (F.castShadow = !1),
        (F.receiveShadow = !0),
        F.position.set(G, j, N),
        Q === "z-"
          ? (F.rotation.y = Math.PI)
          : Q === "x+"
            ? (F.rotation.y = Math.PI / 2)
            : Q === "x-"
              ? (F.rotation.y = -Math.PI / 2)
              : Q === "y+" &&
                ((F.rotation.x = -Math.PI / 2), (F.rotation.z = K)),
        e.add(F),
        F
      );
    }
    function b(T, D, C, G, j, N, Q) {
      try {
        let K = i.mats.decal(T);
        return !K || !K.material
          ? null
          : y(K.material, D, D / (K.aspect || 1), C, G, j, N, Q);
      } catch {
        return null;
      }
    }
    function m(T, D, C, G, j, N, Q) {
      try {
        let K = i.mats.label(T, Q || {});
        return !K || !K.material
          ? null
          : y(K.material, D * (K.aspect || 4), D, C, G, j, N);
      } catch {
        return null;
      }
    }
    function A(T, D, C, G, j, N, Q = "concrete", K = {}) {
      return i.physics.addBox([T, D, C], [G, j, N], { surface: Q, ...K });
    }
    let _ = new $n();
    function M(T, D, C = {}) {
      let G = T.userData.colliders || [],
        j = Math.abs(Math.sin(2 * D)) > 0.2;
      for (let N of G) {
        let Q = [N];
        if (j) {
          let K = N.max[0] - N.min[0],
            ie = N.max[2] - N.min[2],
            F = K >= ie ? 0 : 2,
            X = Math.max(K, ie),
            ne = Math.max(0.25, Math.min(K, ie)),
            re = Math.min(10, Math.max(1, Math.round(X / ne)));
          if (re > 1) {
            Q = [];
            for (let $ = 0; $ < re; $++) {
              let ue = N.min.slice(),
                me = N.max.slice();
              ((ue[F] = N.min[F] + (X * $) / re),
                (me[F] = N.min[F] + (X * ($ + 1)) / re),
                Q.push({ min: ue, max: me, surface: N.surface }));
            }
          }
        }
        for (let K of Q)
          if (
            (_.min.set(K.min[0], K.min[1], K.min[2]),
            _.max.set(K.max[0], K.max[1], K.max[2]),
            _.applyMatrix4(T.matrixWorld),
            !(_.max.y - _.min.y < 0.2 && _.max.y < 0.3))
          ) {
            if (j) {
              let ie = (_.max.x - _.min.x) * 0.07,
                F = (_.max.z - _.min.z) * 0.07;
              ((_.min.x += ie),
                (_.max.x -= ie),
                (_.min.z += F),
                (_.max.z -= F));
            }
            i.physics.addBox(_.min, _.max, {
              surface: K.surface || N.surface || "metal",
              ...(C.colOpts || {}),
            });
          }
      }
    }
    function E(T, D, C, G = 0, j = {}, N = 0, Q = {}) {
      let K = i.props.build(T, j);
      return (
        K.position.set(D, N, C),
        (K.rotation.y = G),
        (Q.dynamic ? t : e).add(K),
        K.updateMatrixWorld(!0),
        !Q.noCol && !cR.has(T) && M(K, G, Q),
        typeof K.userData.update == "function" &&
          s.push((ie) => K.userData.update(ie)),
        o.push({ name: T, x: D, y: N, z: C, yaw: G }),
        K
      );
    }
    function w(T, D, C = 0, G = 0, j = {}) {
      let N = E("stairs_metal", T, D, C, j, G),
        Q = Math.abs(Math.cos(C)) > 0.5;
      return (
        n.push(
          Q
            ? [T - 1.5, D - 0.5, T + 1.5, D + 0.5]
            : [T - 0.5, D - 1.5, T + 0.5, D + 1.5],
        ),
        N
      );
    }
    function S(T, D, C = 0, G = 0, j = {}, N = [!0, !0]) {
      let Q = N[0] && N[1] ? "both" : N[0] ? "left" : N[1] ? "right" : "none",
        K = E("catwalk", T, D, C, { ...j, rails: Q }, G),
        ie = Math.abs(Math.cos(C)) > 0.5,
        F = ie ? 1.5 : 0.6,
        X = ie ? 0.6 : 1.5;
      return (n.push([T - F, D - X, T + F, D + X]), K);
    }
    let z = { 20: "container20", 40: "container40", hc: "container40hc" },
      H = { container20: 2.59, container40: 2.59, container40hc: 2.9 },
      O = { container20: 6.06, container40: 12.19, container40hc: 12.19 };
    function q(T, D, C, G = 0, j = 1) {
      let N = 0,
        Q = [];
      for (let K = 0; K < C.length; K++) {
        let [ie, F, X = {}] = C[K],
          ne = z[ie],
          re = (X.dx || 0) + (K ? a(-0.05, 0.05) * j : 0),
          $ = (X.dz || 0) + (K ? a(-0.04, 0.04) * j : 0),
          ue =
            G + a(-1, 1) * 0.022 * j * (K ? 0.6 : 1) + (X.flip ? Math.PI : 0),
          me = E(
            ne,
            T + re,
            D + $,
            ue,
            {
              color: F,
              seed: Math.floor(a(1, 99999)),
              wear: X.wear ?? a(0.2, 0.85),
              doors: X.doors || 0,
            },
            N,
          ),
          ee = O[ne],
          B = H[ne],
          P = Math.abs(Math.cos(G)) > 0.5,
          V = (P ? ee : 2.44) / 2,
          Y = (P ? 2.44 : ee) / 2;
        if (
          (n.push([T + re - V, D + $ - Y, T + re + V, D + $ + Y]), X.reefer)
        ) {
          let L = -(ee / 2 + 0.2),
            Z = Math.cos(ue),
            J = Math.sin(ue);
          E(
            "reefer_unit",
            T + re + L * Z,
            D + $ - L * J,
            ue,
            { seed: K + 3 },
            N + 0.14,
          );
        }
        (Q.push(me), (N += B));
      }
      return { top: N, objs: Q };
    }
    function U(T, D) {
      for (let C of n)
        if (T >= C[0] && T <= C[2] && D >= C[1] && D <= C[3]) return !0;
      return !1;
    }
    return {
      G: i,
      THREE: lt,
      staticRoot: e,
      dynRoot: t,
      metalRects: n,
      updaters: s,
      placed: o,
      rng: r,
      rnd: a,
      M: l,
      MI: c,
      add: h,
      box: f,
      slab: p,
      cyl: d,
      tube: v,
      rod: g,
      ibeam: x,
      quad: y,
      decal: b,
      label: m,
      col: A,
      place: E,
      stairs: w,
      catwalk: S,
      stack: q,
      isMetal: U,
    };
  }

var Dr = 4;

function rb(i, { scale: e = 0.5, maxW: t = 2048 } = {}) {
    let n = { count: 0, material: null, update() {} };
    if (typeof document > "u") return n;
    let s = new Map();
    if (
      (i.traverse((b) => {
        if (!b.isMesh || Array.isArray(b.material)) return;
        let m = b.material;
        if (
          !m ||
          m.name !== "label" ||
          !m.map ||
          !m.map.image ||
          !m.map.image.width
        )
          return;
        let A = b,
          _ = !1;
        for (; A; ) {
          if (A.userData && A.userData.noMerge) {
            _ = !0;
            break;
          }
          A = A.parent;
        }
        _ || (s.has(m) || s.set(m, []), s.get(m).push(b));
      }),
      s.size < 2)
    )
      return n;
    let o = [...s.keys()].map((b) => {
      let m = b.map.image;
      return {
        m: b,
        img: m,
        w: Math.max(4, Math.ceil(m.width * e)),
        h: Math.max(4, Math.ceil(m.height * e)),
      };
    });
    o.sort((b, m) => m.h - b.h || m.w - b.w);
    let r = 0,
      a = 0,
      l = 0;
    for (let b of o) {
      let m = Math.min(b.w, t - 2 * Dr);
      (m < b.w && ((b.h = Math.max(4, Math.round((b.h * m) / b.w))), (b.w = m)),
        r + b.w + 2 * Dr > t && ((r = 0), (a += l), (l = 0)),
        (b.x = r + Dr),
        (b.y = a + Dr),
        (r += b.w + 2 * Dr),
        (l = Math.max(l, b.h + 2 * Dr)));
    }
    let c = t,
      u = bs.ceilPowerOfTwo(Math.max(16, a + l));
    if (u > 4096) return n;
    let h = document.createElement("canvas");
    ((h.width = c), (h.height = u));
    let f = h.getContext("2d"),
      p = () => {
        (f.setTransform(1, 0, 0, 1, 0, 0),
          (f.globalAlpha = 1),
          (f.globalCompositeOperation = "source-over"),
          f.clearRect(0, 0, c, u));
        for (let b of o)
          (f.drawImage(b.img, b.x - Dr, b.y - Dr, b.w + 2 * Dr, b.h + 2 * Dr),
            f.clearRect(b.x, b.y, b.w, b.h),
            f.drawImage(b.img, b.x, b.y, b.w, b.h),
            (b.version = b.m.map.version));
      };
    p();
    let d = o[0].m,
      v = new xs(h);
    ((v.colorSpace = d.map.colorSpace),
      (v.anisotropy = d.map.anisotropy),
      (v.generateMipmaps = !0),
      (v.minFilter = Ln));
    let g = d.clone();
    ((g.map = v), (g.name = "label_atlas"));
    let x = new Map();
    for (let b of o) {
      let m = b.x / c,
        A = (b.x + b.w) / c,
        _ = 1 - b.y / u,
        M = 1 - (b.y + b.h) / u;
      for (let E of s.get(b.m)) {
        let w = E.geometry.uuid + "|" + b.m.uuid,
          S = x.get(w);
        if (!S) {
          S = E.geometry.clone();
          let z = S.attributes.uv;
          if (z) {
            for (let H = 0; H < z.count; H++)
              z.setXY(
                H,
                m + bs.clamp(z.getX(H), 0, 1) * (A - m),
                M + bs.clamp(z.getY(H), 0, 1) * (_ - M),
              );
            z.needsUpdate = !0;
          }
          x.set(w, S);
        }
        ((E.geometry = S), (E.material = g));
      }
    }
    let y = 0;
    return {
      count: o.length,
      material: g,
      size: [c, u],
      update(b) {
        if (!(y > 8)) {
          y += b;
          for (let m of o)
            if (m.m.map.version !== m.version) {
              (p(), (v.needsUpdate = !0));
              break;
            }
        }
      },
    };
  }

var no = {
      X0: -16,
      X1: 12,
      Z0: -28,
      Z1: -11,
      EAVE: 7,
      RIDGE: 9.5,
      ZR: -19.5,
      FLOOR: 0.03,
    },
    No = [-16, -11.1, -6.2, -0.8, 5.6, 12],
    yt = { x0: -6, x1: -1, h: 5 },
    Yt = { z0: -22, z1: -17, h: 4.5 },
    iv = [
      ["S", 1, 4],
      ["S", 2, 5],
      ["S", 1, 11],
      ["S", 2, 15],
      ["S", 3, 8],
      ["N", 2, 7],
      ["N", 1, 13],
      ["N", 3, 17],
    ],
    A1 = [-0.04, 0.25, 0.5, 0.75, 1],
    sv = 20;

function ab(i) {
    let {
        M: e,
        MI: t,
        box: n,
        slab: s,
        cyl: o,
        rod: r,
        ibeam: a,
        col: l,
        add: c,
        G: u,
      } = i,
      { X0: h, X1: f, Z0: p, Z1: d, EAVE: v, RIDGE: g, ZR: x, FLOOR: y } = no,
      b = (d - p) / 2,
      m = g - v,
      A = Math.atan2(m, b),
      _ = Math.hypot(b, m),
      M = (L) => v + m * (1 - Math.abs(L - x) / b),
      E = e("corrugated_roof"),
      w = t("corrugated_roof"),
      S = e("concrete"),
      z = t("concrete_painted"),
      H = t("paint_grey"),
      O = t("steel_galv"),
      q = e("steel_galv"),
      U = t("steel_dark"),
      T = 0.25;
    (s(t("floor_epoxy"), h, -0.25, p, f, y, d, { cast: !1 }),
      l(h, -0.5, p, f, y, d, "concrete"),
      s(S, yt.x0 - 0.4, -0.2, d, yt.x1 + 0.4, 0.02, d + 1.4, { cast: !1 }),
      s(S, f, -0.2, Yt.z0 - 0.4, f + 1.4, 0.02, Yt.z1 + 0.4, { cast: !1 }));
    function D(L, Z, J, oe, fe, le) {
      if (oe - J < 0.02 || le - fe < 0.02) return;
      let R = L,
        I = L - Z * T;
      if (fe < 1.2) {
        let ae = L - Z * T * 0.5;
        (s(
          S,
          J,
          y - 0.2,
          Math.min(R, ae),
          oe,
          Math.min(1.2, le),
          Math.max(R, ae),
          { bevel: 0.015 },
        ),
          s(
            z,
            J,
            y - 0.2,
            Math.min(ae, I),
            oe,
            Math.min(1.2, le),
            Math.max(ae, I),
            { bevel: 0.015 },
          ));
      }
      let se = Math.max(fe, 1.2);
      le <= se ||
        (s(
          E,
          J,
          se - 0.03,
          Math.min(R + Z * 0.02, R + Z * 0.06),
          oe,
          le,
          Math.max(R + Z * 0.02, R + Z * 0.06),
        ),
        s(
          w,
          J,
          se,
          Math.min(R - Z * 0.1, R - Z * 0.13),
          oe,
          le,
          Math.max(R - Z * 0.1, R - Z * 0.13),
        ));
    }
    function C(L, Z, J, oe, fe, le) {
      if (oe - J < 0.02 || le - fe < 0.02) return;
      let R = L,
        I = L - Z * T;
      if (fe < 1.2) {
        let ae = L - Z * T * 0.5;
        (s(
          S,
          Math.min(R, ae),
          y - 0.2,
          J,
          Math.max(R, ae),
          Math.min(1.2, le),
          oe,
          { bevel: 0.015 },
        ),
          s(
            z,
            Math.min(ae, I),
            y - 0.2,
            J,
            Math.max(ae, I),
            Math.min(1.2, le),
            oe,
            { bevel: 0.015 },
          ));
      }
      let se = Math.max(fe, 1.2);
      le <= se ||
        (s(
          E,
          Math.min(R + Z * 0.02, R + Z * 0.06),
          se - 0.03,
          J,
          Math.max(R + Z * 0.02, R + Z * 0.06),
          le,
          oe,
        ),
        s(
          w,
          Math.min(R - Z * 0.1, R - Z * 0.13),
          se,
          J,
          Math.max(R - Z * 0.1, R - Z * 0.13),
          le,
          oe,
        ));
    }
    function G(L, Z, J, oe, fe, le, R = 0.25, I = 0.45, se = 0.26) {
      let ae = Math.max(1, Math.floor((le - fe - 0.1) / I));
      for (let k = 0; k <= ae; k++) {
        let ce = fe + 0.08 + ((le - fe - 0.16) * k) / ae;
        n(q, oe - J, 0.018, se, (J + oe) / 2, ce, L - Z * 0.06, {
          r: [Z * R, 0, 0],
        });
      }
      for (let k of [J + 0.03, oe - 0.03, (J + oe) / 2])
        s(q, k - 0.03, fe, L - Z * 0.2, k + 0.03, le, L + Z * 0.06);
      (s(q, J, fe - 0.05, L - Z * 0.2, oe, fe, L + Z * 0.07),
        s(q, J, le, L - Z * 0.2, oe, le + 0.05, L + Z * 0.07));
    }
    function j(L, Z, J, oe, fe, le, R = 0.5, I = 0.45, se = 0.26) {
      let ae = Math.max(1, Math.floor((le - fe - 0.1) / I));
      for (let k = 0; k <= ae; k++) {
        let ce = fe + 0.08 + ((le - fe - 0.16) * k) / ae;
        n(q, se, 0.018, oe - J, L - Z * 0.06, ce, (J + oe) / 2, {
          r: [0, 0, -Z * R],
        });
      }
      for (let k of [J + 0.03, oe - 0.03, (J + oe) / 2])
        s(q, L - Z * 0.2, fe, k - 0.03, L + Z * 0.06, le, k + 0.03);
      (s(q, L - Z * 0.2, fe - 0.05, J, L + Z * 0.07, fe, oe),
        s(q, L - Z * 0.2, le, J, L + Z * 0.07, le + 0.05, oe));
    }
    let N = 5.45,
      Q = 6.8;
    for (let L = 0; L < No.length - 1; L++) {
      let Z = No[L],
        J = No[L + 1];
      L === 2
        ? (D(d, 1, Z, yt.x0, 0, v),
          D(d, 1, yt.x1, J, 0, v),
          D(d, 1, yt.x0, yt.x1, yt.h, v))
        : (D(d, 1, Z, J, 0, N - 0.05),
          D(d, 1, Z, J, Q + 0.05, v),
          G(d, 1, Z + 0.15, J - 0.15, N, Q));
    }
    (D(p, -1, h, f, 0, v),
      s(t("paint_grey"), 6.2, y, p + T, 7.2, 2.1, p + T + 0.04),
      s(e("paint_grey"), 6.2, 0, p - 0.09, 7.2, 2.1, p - 0.05),
      C(h, -1, p, d, 0, v),
      C(f, 1, p, Yt.z0, 0, N - 0.05));
    let K = { z0: -15.55, z1: -13.35, y0: 3.3 };
    (C(f, 1, Yt.z1, K.z0, 0, N - 0.05),
      C(f, 1, K.z1, d, 0, N - 0.05),
      C(f, 1, K.z0, K.z1, 0, K.y0),
      n(E, 0.03, 1.5, 1.05, f + 0.2, K.y0 - 0.55, K.z0 + 0.5, {
        r: [0.25, 0.1, -0.22],
      }),
      n(E, 1, 0.03, 2, f + 1.3, 0.05, K.z0 + 1.6, { r: [0.02, 0.5, 0.03] }));
    for (let L of [K.z0, K.z1])
      s(O, f - 0.16, K.y0, L - 0.03, f - 0.1, N - 0.05, L + 0.03);
    (C(f, 1, Yt.z0, Yt.z1, Yt.h, N - 0.05), C(f, 1, p, d, Q + 0.05, v));
    for (let [L, Z] of [
      [p + 0.3, -22.45],
      [-22.15, -16.85],
      [-16.55, d - 0.3],
    ])
      j(f, 1, L, Z, N, Q);
    let ie = { y: 8.02, r: 0.56 };
    function F(L, Z, J) {
      let oe = (fe, le, R) => {
        let I = new ji();
        if (
          (I.moveTo(-(d + 0.05), v - 0.02),
          I.lineTo(-x, g),
          I.lineTo(-(p - 0.05), v - 0.02),
          I.closePath(),
          J)
        ) {
          let ae = new or();
          (ae.absarc(-x, ie.y, ie.r, 0, Math.PI * 2, !0), I.holes.push(ae));
        }
        let se = new rr(I, { depth: fe, bevelEnabled: !1, curveSegments: 20 });
        (se.rotateY(Math.PI / 2), se.translate(L + R, 0, 0), c(se, le));
      };
      (oe(0.04, E, Z > 0 ? 0.02 : -0.06), oe(0.03, w, Z > 0 ? -0.13 : 0.1));
    }
    (F(f, 1, !0),
      F(h, -1, !1),
      l(h, 0, d - T, yt.x0, v, d + 0.06, "metal"),
      l(yt.x1, 0, d - T, f, v, d + 0.06, "metal"),
      l(yt.x0, yt.h - 0.5, d - 0.6, yt.x1, v, d + 0.06, "metal"),
      l(h, 0, p - 0.06, f, v, p + T, "metal"),
      l(h - 0.06, 0, p, h + T, g, d, "metal"),
      l(f - T, 0, p, f + 0.06, g, Yt.z0, "metal"),
      l(f - T, 0, Yt.z1, f + 0.06, g, -15.55, "metal"),
      l(f - T, 0, -13.35, f + 0.06, g, d, "metal"),
      l(f - T, 0, -15.55, f + 0.06, 3.3, -13.35, "metal"),
      l(f - T, 5.4, -15.55, f + 0.06, g, -13.35, "metal"),
      l(f - T, Yt.h, Yt.z0, f + 0.06, g, Yt.z1, "metal"));
    let X = [],
      ne = (f - h + 0.6) / sv,
      re = h - 0.3;
    for (let L of ["S", "N"]) {
      let Z = L === "S" ? 1 : -1,
        J = [Z * A, 0, 0],
        oe = Math.cos(A),
        fe = Z * Math.sin(A);
      for (let R = 0; R < 4; R++) {
        let I = A1[R],
          se = A1[R + 1],
          ae = (I + se) / 2,
          k = (se - I) * _,
          ce = x + Z * b * (1 - ae),
          ve = v + m * ae,
          _e = 0;
        for (; _e < sv; ) {
          if (iv.some((Ne) => Ne[0] === L && Ne[1] === R && Ne[2] === _e)) {
            _e++;
            continue;
          }
          let Te = _e;
          for (
            ;
            Te + 1 < sv &&
            !iv.some((Ne) => Ne[0] === L && Ne[1] === R && Ne[2] === Te + 1);

          )
            Te++;
          let Pe = re + _e * ne,
            Re = re + (Te + 1) * ne,
            Fe = (Pe + Re) / 2;
          (n(E, Re - Pe, 0.04, k + 0.02, Fe, ve + oe * 0.03, ce + fe * 0.03, {
            r: J,
          }),
            n(w, Re - Pe, 0.02, k + 0.02, Fe, ve - oe * 0.02, ce - fe * 0.02, {
              r: J,
            }));
          let ze = x + Z * b * (1 - I),
            We = x + Z * b * (1 - se);
          (l(
            Math.max(Pe, h - 0.3),
            v + m * Math.max(0, I) - 0.05,
            Math.min(ze, We),
            Re,
            v + m * se + 0.08,
            Math.max(ze, We),
            "metal",
            { noNav: !0 },
          ),
            (_e = Te + 1));
        }
      }
      for (let R of iv)
        if (R[0] === L) {
          let I = A1[R[1]],
            se = A1[R[1] + 1],
            ae = re + R[2] * ne,
            k = (I + se) / 2,
            ce = x + Z * b * (1 - k),
            ve = v + m * k;
          (X.push({ x: ae + ne / 2, y: ve, z: ce, w: ne, d: (se - I) * b }),
            i.decal(
              "leak_stain",
              1.9,
              ae + ne / 2 + 0.2,
              y + 0.004,
              ce,
              "y+",
              R[2] * 1.7,
            ),
            n(
              O,
              0.05,
              0.05,
              (se - I) * _,
              ae + 0.02,
              ve - oe * 0.06,
              ce - fe * 0.06,
              { r: J },
            ),
            n(
              O,
              0.05,
              0.05,
              (se - I) * _,
              ae + ne - 0.02,
              ve - oe * 0.06,
              ce - fe * 0.06,
              { r: J },
            ));
        }
      for (let R of [0.03, 0.2, 0.37, 0.54, 0.71, 0.88, 0.985]) {
        let I = x + Z * b * (1 - R),
          se = v + m * R;
        n(
          O,
          f - h - 0.3,
          0.17,
          0.06,
          (h + f) / 2,
          se - oe * 0.13,
          I - fe * 0.13,
          { r: J },
        );
      }
      let le = x + Z * (b + 0.38);
      (s(
        q,
        h - 0.3,
        v - 0.22,
        Math.min(le, le + Z * 0.16),
        f + 0.3,
        v - 0.08,
        Math.max(le, le + Z * 0.16),
      ),
        s(
          q,
          h - 0.3,
          v - 0.22,
          Math.min(le - Z * 0.05, le + Z * 0.21),
          f + 0.3,
          v - 0.19,
          Math.max(le - Z * 0.05, le + Z * 0.21),
        ));
      for (let R = 0; R < No.length; R++) {
        if (L === "S" && (R === 2 || R === 3)) continue;
        let I = Math.min(f - 0.5, Math.max(h + 0.5, No[R])) + 0.42,
          se = x + Z * (b + 0.13);
        (o(q, 0.055, v - 0.4, I, (v - 0.4) / 2 + 0.2, se, { seg: 8 }),
          r(q, [I, v - 0.2, se], [I, v - 0.12, le + Z * 0.08], 0.05));
        for (let ae of [1.6, 3.6, 5.6])
          n(q, 0.16, 0.04, 0.14, I, ae, se - Z * 0.02);
        r(q, [I, 0.2, se], [I + 0.02, 0.06, se + Z * 0.22], 0.055);
      }
    }
    for (let L of [-1, 1])
      n(q, f - h + 0.7, 0.03, 0.34, (h + f) / 2, g + 0.03, x + L * 0.15, {
        r: [L * A, 0, 0],
      });
    for (let L of [h - 0.31, f + 0.31])
      for (let Z of [-1, 1])
        n(
          q,
          0.04,
          0.22,
          _ + 0.4,
          L,
          (v + g) / 2 - 0.05,
          x + Z * (b / 2 + 0.1),
          { r: [Z * A, 0, 0] },
        );
    let $ = [d - T - 0.24, p + T + 0.24];
    for (let L = 0; L < No.length; L++) {
      let Z =
        L === 0 ? h + T + 0.12 : L === No.length - 1 ? f - T - 0.12 : No[L];
      for (let J of $)
        (a(H, "y", v - 0.35, Z, y + (v - 0.35) / 2, J, {
          depth: 0.46,
          width: 0.22,
          depthAxis: "z",
        }),
          n(U, 0.36, 0.03, 0.62, Z, y + 0.015, J),
          l(Z - 0.12, 0, J - 0.24, Z + 0.12, v, J + 0.24, "metal"));
      for (let J of [1, -1]) {
        let oe = x + (J * b) / 2 - J * 0.14,
          fe = v + m / 2 - 0.42;
        (a(H, "z", _ - 0.5, Z, fe, oe, {
          depth: 0.4,
          width: 0.2,
          depthAxis: "y",
          r: [J * A, 0, 0],
        }),
          n(H, 0.014, 0.5, 1.5, Z, v - 0.55, x + J * (b - T - 0.9), {
            r: [J * (A + 0.22), 0, 0],
          }),
          n(H, 0.2, 0.02, 1.55, Z, v - 0.82, x + J * (b - T - 0.95), {
            r: [J * (A + 0.42), 0, 0],
          }));
      }
      n(H, 0.22, 0.5, 0.03, Z, g - 0.55, x);
    }
    for (let L of [h + T + 0.12, f - T - 0.12])
      for (let Z of [-22.3, -16.7]) {
        let J = M(Z) - 0.55;
        (a(H, "y", J, L, y + J / 2, Z, {
          depth: 0.3,
          width: 0.18,
          depthAxis: "x",
        }),
          l(L - 0.16, 0, Z - 0.1, L + 0.16, J, Z + 0.1, "metal"));
      }
    for (let L of $) {
      let Z = L > x ? 1 : -1;
      for (let J of [2.3, 3.7, 5.15])
        Z > 0
          ? (s(O, h + 0.3, J - 0.08, d - 0.2, yt.x0 - 0.2, J + 0.08, d - 0.14),
            s(O, yt.x1 + 0.2, J - 0.08, d - 0.2, f - 0.3, J + 0.08, d - 0.14))
          : s(O, h + 0.3, J - 0.08, p + 0.14, f - 0.3, J + 0.08, p + 0.2);
      n(H, f - h - 0.6, 0.14, 0.14, (h + f) / 2, v - 0.25, L);
    }
    for (let L of [h + 0.17, f - 0.17])
      for (let Z of [2.3, 3.7, 5.15])
        L > 0
          ? (s(O, L - 0.03, Z - 0.08, p + 0.3, L + 0.03, Z + 0.08, Yt.z0 - 0.2),
            s(O, L - 0.03, Z - 0.08, Yt.z1 + 0.2, L + 0.03, Z + 0.08, d - 0.3))
          : s(O, L - 0.03, Z - 0.08, p + 0.3, L + 0.03, Z + 0.08, d - 0.3);
    for (let [L, Z] of [
      [No[0] + 0.4, No[1]],
      [No[4], No[5] - 0.4],
    ]) {
      for (let J of $)
        (r(O, [L, 1.35, J], [Z, 5.3, J], 0.016),
          r(O, [Z, 1.35, J + 0.04], [L, 5.3, J + 0.04], 0.016));
      for (let J of [1, -1]) {
        let oe = x + J * (b - 0.6),
          fe = -0.3;
        (r(O, [L, v + fe + 0.1, oe], [Z, g + fe - 0.1, x + J * 0.3], 0.014),
          r(O, [Z, v + fe + 0.1, oe], [L, g + fe - 0.1, x + J * 0.3], 0.014));
      }
    }
    {
      let L = d - T;
      for (let Z of [yt.x0 - 0.07, yt.x1 + 0.07])
        (s(U, Z - 0.07, y, L - 0.16, Z + 0.07, yt.h + 0.75, d + 0.07),
          s(e("hazard_stripes"), Z - 0.11, y, L - 0.2, Z + 0.11, 1.3, d + 0.1, {
            bevel: 0.01,
          }));
      (s(U, yt.x0 - 0.2, yt.h, L - 0.1, yt.x1 + 0.2, yt.h + 0.14, d + 0.08),
        s(O, yt.x0 - 0.25, yt.h + 0.78, L - 0.72, yt.x1 + 0.25, yt.h + 0.81, L),
        s(
          O,
          yt.x0 - 0.25,
          yt.h + 0.3,
          L - 0.72,
          yt.x1 + 0.25,
          yt.h + 0.81,
          L - 0.69,
        ));
      for (let Z of [yt.x0 - 0.24, yt.x1 + 0.24])
        s(O, Z - 0.012, yt.h + 0.05, L - 0.72, Z + 0.012, yt.h + 0.81, L);
      (o(
        w,
        0.3,
        yt.x1 - yt.x0 + 0.3,
        (yt.x0 + yt.x1) / 2,
        yt.h + 0.44,
        L - 0.36,
        { axis: "x", seg: 18 },
      ),
        o(
          U,
          0.05,
          yt.x1 - yt.x0 + 0.46,
          (yt.x0 + yt.x1) / 2,
          yt.h + 0.44,
          L - 0.36,
          { axis: "x", seg: 8 },
        ),
        s(
          w,
          yt.x0 + 0.02,
          yt.h - 0.42,
          L - 0.09,
          yt.x1 - 0.02,
          yt.h + 0.42,
          L - 0.06,
        ),
        s(
          e("hazard_stripes"),
          yt.x0 + 0.02,
          yt.h - 0.52,
          L - 0.12,
          yt.x1 - 0.02,
          yt.h - 0.42,
          L - 0.03,
        ),
        s(
          U,
          yt.x1 + 0.28,
          yt.h + 0.2,
          L - 0.6,
          yt.x1 + 0.7,
          yt.h + 0.7,
          L - 0.15,
          { bevel: 0.02 },
        ),
        r(
          U,
          [yt.x1 + 0.5, yt.h + 0.2, L - 0.3],
          [yt.x1 + 0.5, 1.2, L - 0.3],
          0.008,
        ));
      for (let Z of [yt.x0 - 0.45, yt.x1 + 0.45])
        i.place("bollard_post", Z, d + 0.55, 0, { seed: 5 });
    }
    {
      let L = f + 0.12,
        Z = Yt.z0 - 0.25,
        J = Z - 5.1;
      s(E, L, 0.12, J, L + 0.05, Yt.h + 0.1, Z);
      for (let oe of [J, Z, (J + Z) / 2])
        s(q, L - 0.02, 0.1, oe - 0.05, L + 0.09, Yt.h + 0.12, oe + 0.05);
      for (let oe of [0.14, Yt.h + 0.08, Yt.h * 0.5])
        s(q, L - 0.02, oe - 0.05, J, L + 0.09, oe + 0.05, Z);
      (r(q, [L + 0.02, 0.2, J + 0.1], [L + 0.02, Yt.h, (J + Z) / 2], 0.02),
        r(q, [L + 0.02, 0.2, Z - 0.1], [L + 0.02, Yt.h, (J + Z) / 2], 0.02),
        s(U, L - 0.04, Yt.h + 0.16, J - 0.2, L + 0.12, Yt.h + 0.3, Yt.z1 + 0.3),
        s(U, f - T - 0.02, y, Yt.z0 - 0.12, f + 0.08, Yt.h + 0.1, Yt.z0),
        s(U, f - T - 0.02, y, Yt.z1, f + 0.08, Yt.h + 0.1, Yt.z1 + 0.12),
        s(
          U,
          f - T - 0.02,
          Yt.h,
          Yt.z0 - 0.12,
          f + 0.08,
          Yt.h + 0.12,
          Yt.z1 + 0.12,
        ));
      for (let oe of [Yt.z0 - 0.06, Yt.z1 + 0.06])
        s(
          e("hazard_stripes"),
          f - T - 0.05,
          y,
          oe - 0.1,
          f + 0.1,
          1.3,
          oe + 0.1,
          { bevel: 0.01 },
        );
      (l(L - 0.05, 0, J, L + 0.12, Yt.h + 0.3, Z, "metal"),
        i.place("bollard_post", f + 0.6, Yt.z0 - 0.4, 0, { seed: 6 }));
    }
    let ue = new wt();
    (ue.position.set(f - 0.05, ie.y, x), (ue.userData.noMerge = !0));
    {
      let L = new Ci(ie.r + 0.02, 0.05, 8, 28);
      (L.rotateY(Math.PI / 2), c(L, q, { p: [f + 0.04, ie.y, x] }));
      let Z = new Ci(ie.r + 0.02, 0.035, 6, 28);
      (Z.rotateY(Math.PI / 2), c(Z, O, { p: [f - 0.16, ie.y, x] }));
      for (let fe of [0.4, 0.4 + Math.PI / 2])
        r(
          q,
          [f + 0.1, ie.y - Math.sin(fe) * ie.r, x - Math.cos(fe) * ie.r],
          [f + 0.1, ie.y + Math.sin(fe) * ie.r, x + Math.cos(fe) * ie.r],
          0.012,
        );
      for (let fe of [0, (Math.PI * 2) / 3, (Math.PI * 4) / 3])
        r(
          O,
          [f - 0.18, ie.y + Math.sin(fe) * ie.r, x + Math.cos(fe) * ie.r],
          [f - 0.18, ie.y, x],
          0.014,
        );
      o(U, 0.13, 0.26, f - 0.22, ie.y, x, { axis: "x", seg: 12 });
      let J = t("steel_worn");
      for (let fe = 0; fe < 5; fe++) {
        let le = $e(0.012, 0.42, 0.2);
        (le.rotateY(0.5),
          le.translate(0, 0.3, 0),
          le.rotateX((fe / 5) * Math.PI * 2));
        let R = new Qe(le, J);
        ((R.castShadow = !0), (R.receiveShadow = !0), ue.add(R));
      }
      let oe = new Qe(ot(0.1, 0.1, 0.1, 12).rotateZ(Math.PI / 2), U);
      ((oe.castShadow = !0), ue.add(oe), i.dynRoot.add(ue));
    }
    let me = u.mats.emissive(16757864, 7),
      ee = t("aluminium"),
      B = [];
    for (let L of [-15.4, -23.6])
      for (let Z of [-13.6, -8.5, -3.5, 2.6, 8.6])
        (L < -20 && Z < -10) || B.push([Z, L]);
    for (let [L, Z] of B) {
      let J = M(Z) - 0.3,
        oe = 6.05;
      (r(U, [L, J, Z], [L, oe + 0.3, Z], 0.012, { cast: !1 }),
        o(ee, 0.33, 0.3, L, oe + 0.15, Z, { rTop: 0.09, seg: 14 }),
        o(U, 0.09, 0.14, L, oe + 0.37, Z, { seg: 10 }),
        o(me, 0.24, 0.02, L, oe + 0.02, Z, { seg: 14, cast: !1, recv: !1 }));
    }
    let P = [];
    for (let [L, Z] of [
      [-8.5, -15.4],
      [2.6, -15.4],
      [-3.5, -23.6],
      [8.6, -23.6],
    ]) {
      let J = new Qr(16761994, 34, 13, 2);
      (J.position.set(L, 5.75, Z),
        (J.castShadow = !1),
        i.dynRoot.add(J),
        P.push(J));
    }
    {
      let Z = h + T + 0.02,
        J = -10.25,
        oe = p + T + 0.02,
        fe = -23.75;
      s(t("diamond_plate"), Z, 2.6 - 0.1, oe, J, 2.6, fe);
      for (let Te of [Z + 0.1, -13, J - 0.08])
        s(H, Te - 0.07, 2.6 - 0.3, oe, Te + 0.07, 2.6 - 0.1, fe);
      for (let [Te, Pe] of [
        [J - 0.08, fe - 0.08],
        [J - 0.08, oe + 0.3],
        [-13, fe - 0.08],
      ])
        (n(H, 0.14, 2.6 - 0.1, 0.14, Te, (2.6 - 0.1) / 2, Pe, { bevel: 0.01 }),
          l(Te - 0.08, 0, Pe - 0.08, Te + 0.08, 2.6, Pe + 0.08, "metal", {
            noNav: !0,
          }));
      let le = t("paint_white"),
        R = e("glass_dirty"),
        I = Z + 0.05,
        se = J - 0.05,
        ae = oe + 0.05,
        k = fe - 0.05,
        ce = 5,
        ve = (Te, Pe, Re, Fe = 0.07) => {
          (s(Re, I, Te, k - Fe, se, Pe, k),
            s(Re, se - Fe, Te, ae, se, Pe, k - Fe));
        };
      (ve(2.6, 3.5, le), ve(4.45, ce, le), ve(3.5, 4.45, R, 0.02));
      for (let Te of [I + 0.04, -14.2, -12.9, -11.75, se - 0.04])
        s(le, Te - 0.04, 3.5, k - 0.07, Te + 0.04, 4.45, k);
      for (let Te of [ae + 0.04, -26.3, -25, k - 0.04])
        s(le, se - 0.07, 3.5, Te - 0.04, se, 4.45, Te + 0.04);
      (s(t("paint_grey"), -11.65, 2.6, k - 0.01, -10.75, 4.6, k + 0.03),
        s(le, I, ce, ae, se + 0.1, ce + 0.08, k + 0.1),
        s(t("wood_dark"), I + 0.2, 3.3, ae + 0.3, se - 0.3, 3.36, ae + 1),
        s(U, -13.4, 3.36, ae + 0.5, -12.7, 3.8, ae + 0.56),
        n(
          u.mats.emissive(13624063, 2.4),
          1.2,
          0.04,
          0.14,
          -13,
          ce - 0.05,
          -25.8,
          { cast: !1, recv: !1 },
        ),
        n(
          u.mats.emissive(10473727, 1.6),
          0.6,
          0.36,
          0.01,
          -13.05,
          3.6,
          ae + 0.59,
          { cast: !1, recv: !1 },
        ),
        l(I, 2.6 - 0.12, ae, se, ce + 0.08, k, "metal", { noNav: !0 }),
        l(Z, 2.6 - 0.12, oe, J, 2.6, fe, "metal", { noNav: !0 }));
      let _e = fe + 0.6;
      (i.catwalk(-14.25, _e, 0, 2.6 - 0.05, { seed: 2 }, [!1, !0]),
        i.catwalk(-11.25, _e, 0, 2.6 - 0.05, { seed: 3 }, [!1, !0]));
      for (let Te of [-15.6, -12.75, -9.85])
        n(H, 0.1, 2.6 - 0.12, 0.1, Te, (2.6 - 0.12) / 2, _e + 0.5, {
          bevel: 0.01,
        });
      (s(H, -15.75, 2.6 - 0.26, _e + 0.44, -9.75, 2.6 - 0.12, _e + 0.56),
        i.stairs(-8.25, _e, Math.PI, 0, { seed: 4 }),
        i.metalRects.push([Z, oe, -6.7, _e + 0.6]));
    }
    {
      let J = d - T - 0.05,
        oe = J - 0.75;
      s(t("wood_dark"), 1.6, 0.88, oe, 5, 0.94, J, { bevel: 0.012 });
      for (let fe of [1.6 + 0.06, 5 - 0.06, (1.6 + 5) / 2])
        for (let le of [oe + 0.06, J - 0.06])
          n(U, 0.05, 0.86, 0.05, fe, y + 0.43, le);
      (s(U, 1.6 + 0.04, 0.2, oe + 0.06, 5 - 0.04, 0.23, J - 0.04),
        s(
          t("paint_grey"),
          1.6 + 0.1,
          0.55,
          oe + 0.04,
          1.6 + 1.3,
          0.86,
          J - 0.05,
          { bevel: 0.01 },
        ),
        s(t("wood_pallet"), 1.6, 1.25, J - 0.02, 5, 2.3, J + 0.01));
      for (let fe = 0; fe < 7; fe++)
        r(
          O,
          [1.6 + 0.3 + fe * 0.42, 1.5 + (fe % 3) * 0.12, J - 0.04],
          [1.6 + 0.3 + fe * 0.42, 2.05 + (fe % 2) * 0.1, J - 0.04],
          0.012 + (fe % 2) * 0.006,
          { cast: !1 },
        );
      (n(U, 0.16, 0.14, 0.3, 5 - 0.5, 1.01, oe + 0.2, { bevel: 0.015 }),
        n(O, 0.03, 0.03, 0.34, 5 - 0.5, 1.1, oe + 0.12),
        n(t("paint_red"), 0.45, 0.22, 0.24, 1.6 + 1.9, 1.05, oe + 0.35, {
          bevel: 0.02,
          r: [0, 0.3, 0],
        }),
        s(U, 1.6, 2.5, J - 0.3, 5, 2.53, J),
        n(
          u.mats.emissive(16773328, 3),
          5 - 1.6 - 0.4,
          0.03,
          0.1,
          (1.6 + 5) / 2,
          2.48,
          J - 0.18,
          { cast: !1, recv: !1 },
        ),
        l(1.6, 0, oe, 5, 0.94, J, "wood"));
    }
    {
      for (let fe of [-1, 1]) {
        let le = -11.6 + (fe * 2.6) / 2;
        (r(t("paint_yellow"), [le, y, -17.6 - 0.9], [le, 3.3, -17.6], 0.045),
          r(t("paint_yellow"), [le, y, -17.6 + 0.9], [le, 3.3, -17.6], 0.045),
          r(
            t("paint_yellow"),
            [le, 1, -17.6 - 0.62],
            [le, 1, -17.6 + 0.62],
            0.03,
          ));
        for (let R of [-17.6 - 0.9, -17.6 + 0.9])
          o(U, 0.07, 0.1, le, y + 0.05, R, { axis: "x", seg: 8 });
      }
      (a(t("paint_yellow"), "x", 2.6 + 0.5, -11.6, 3.3 + 0.1, -17.6, {
        depth: 0.22,
        width: 0.14,
      }),
        n(U, 0.3, 0.26, 0.24, -11.6 + 0.2, 3.3 - 0.14, -17.6, { bevel: 0.02 }),
        r(
          O,
          [-11.6 + 0.2, 3.3 - 0.26, -17.6],
          [-11.6 + 0.2, 1.75, -17.6],
          0.012,
        ),
        r(
          O,
          [-11.6 + 0.32, 3.3 - 0.26, -17.6],
          [-11.6 + 0.34, 2.2, -17.6 + 0.02],
          0.008,
        ),
        n(U, 0.85, 0.5, 0.55, -11.6 + 0.2, 1.42, -17.6, {
          bevel: 0.03,
          r: [0, 0.2, 0.05],
        }),
        n(t("steel_worn"), 0.7, 0.16, 0.42, -11.6 + 0.2, 1.74, -17.6, {
          bevel: 0.02,
          r: [0, 0.2, 0.05],
        }),
        o(t("steel_bare"), 0.16, 0.12, -11.6 - 0.28, 1.4, -17.6 - 0.08, {
          axis: "x",
          seg: 12,
        }),
        l(
          -11.6 - 2.6 / 2 - 0.1,
          0,
          -17.6 - 0.35,
          -11.6 + 2.6 / 2 + 0.1,
          1.9,
          -17.6 + 0.35,
          "metal",
        ));
    }
    let V = Math.PI / 2,
      Y = (L, Z, J, oe, fe, le = y, R) => i.place(L, Z, J, oe, fe, le, R);
    for (let L of [-8.4, -5.6, -2.8, 2.8, 5.6, 8.4])
      Y("shelf_rack", L, p + T + 0.62, 0, { seed: Math.round(L * 7 + 90) });
    for (let L of [2.8, 5.6, 8.4])
      Y("shelf_rack", L, -23.45, 0, { seed: Math.round(L * 5 + 40) });
    return (
      Y("pallet_stack", 0, -26.9, 0.1, { seed: 3 }),
      Y("cardboard_boxes", -0.05, -26.9, 0.5, { seed: 4 }, y + 1.15, {
        noCol: !0,
      }),
      Y("crate_stack", 2.9, -15.9, 0.12, { seed: 11 }),
      Y("crate_wood", 4.15, -16.3, -0.25, { seed: 12 }),
      Y("pallet_stack", 2, -17.3, 1.45, { seed: 13 }),
      Y("ibc_tote", 6.9, -19.6, 0.1, { seed: 14 }),
      Y("barrel", 7.9, -18.5, 0, { seed: 15, color: "blue" }),
      Y("barrel", 6, -18.4, 0.6, { seed: 16, color: "red" }),
      Y("ibc_tote", -7.6, -16.4, -0.08, { seed: 17 }),
      Y("barrel", -8.6, -15.3, 0, { seed: 18 }),
      Y("barrel", -7.9, -15, 0.9, { seed: 19, color: "yellow" }),
      Y("sandbags", 10.2, -16.4, V + 0.05, { seed: 20 }),
      Y("forklift", 8.3, -13.9, 2.75, { seed: 21 }),
      Y("toolbox_cart", 6, -12.2, 0.15, { seed: 22 }),
      Y("gas_cylinders", 10.9, -11.9, 0, { seed: 23 }),
      Y("tarp_cargo", -13.2, -13.2, 0.12, { seed: 24 }),
      Y("tire_stack", -15, -15.6, 0, { seed: 25 }),
      Y("tire_stack", -14.9, -16.6, 0.4, { seed: 26 }),
      Y("cardboard_boxes", -14.6, -26.6, 0.2, { seed: 27 }),
      Y("crate_wood", -12.4, -26.9, -0.1, { seed: 28 }),
      Y("barrel", -10.9, -27, 0, { seed: 29, color: "green" }),
      Y("crate_wood", -14.7, -24.6, 0.3, { seed: 30 }),
      Y("jerry_can", -9.3, -12, 0.4, { seed: 31 }),
      Y("jerry_can", -9.7, -12.1, 1.2, { seed: 32 }),
      Y("pallet", 10.6, -13.6, 0.2, { seed: 33 }),
      Y("cardboard_boxes", 10.6, -13.6, 0.3, { seed: 34 }, 0.17),
      Y("traffic_cone", -6.6, -12.2, 0, { seed: 35 }),
      Y("traffic_cone", -0.4, -12.3, 0, { seed: 36 }),
      i.tube(
        t("rubber"),
        [
          [1.7, 0.9, -11.9],
          [1.4, 0.4, -12.3],
          [1.2, 0.06, -13.2],
          [2.4, 0.055, -14],
          [1, 0.055, -14.9],
          [-0.8, 0.055, -14.4],
          [-1.6, 0.055, -15.6],
        ],
        0.018,
        { cast: !1 },
      ),
      s(U, 7.2, y, -14.6, 8.4, y + 0.04, -13.6),
      i.decal("oil_stain", 2.2, 7.6, y + 0.004, -15.2, "y+", 0.6),
      i.decal("oil_stain", 1.6, -3.8, y + 0.004, -13.6, "y+", 2.1),
      i.decal("hazard_voltage", 0.5, -1.25, 1.9, d - T - 0.142, "z-"),
      i.decal("caution_stripes", 2.4, -3.5, y + 0.004, -11.9, "y+", 0),
      {
        fan: ue,
        lights: P,
        skylights: X,
        relayPos: new W(-2, y, -19.5),
        update(L) {
          ue.rotation.x += L * 1.7;
        },
      }
    );
  }

function Hc(i, e, t, n, s = 0) {
    let o = new wt();
    return (
      o.position.set(e, s, t),
      (o.rotation.y = n),
      i.staticRoot.add(o),
      o
    );
  }

function Rn(i, e, t, n, s, o, r, a, l, c = 0, u = null) {
    let h = Qi(
      c ? Wi(n, s, o, c) : $e(n, s, o),
      typeof t == "string" ? i.M(t) : t,
    );
    return (
      h.position.set(r, a, l),
      u && h.rotation.set(u[0], u[1], u[2]),
      e.add(h),
      h
    );
  }

function ov(i, e, t, n, s, o, r, a, l = null, c = 8) {
    let u = Qi(ot(n, n, s, c), typeof t == "string" ? i.M(t) : t);
    return (
      u.position.set(o, r, a),
      l && u.rotation.set(l[0], l[1], l[2]),
      e.add(u),
      u
    );
  }

function rv(i, e, t, n, s, o, r, a = "metal", l = 0) {
    let c = Math.abs(Math.cos(n)),
      u = Math.abs(Math.sin(n)),
      h = Math.abs(Math.sin(2 * n)) > 0.2 ? 0.9 : 1,
      f = ((s * c + o * u) / 2) * h,
      p = ((s * u + o * c) / 2) * h;
    i.col(e - f, l, t - p, e + f, l + r, t + p, a);
  }

function Ka(i, e, t, n = 0, s = "paint_blue", o = 1) {
    let r = Hc(i, e, t, n),
      a = 2.2,
      l = 1.2,
      c = 1.25,
      u = i.M(s),
      h = i.M("steel_dark");
    Rn(i, r, h, a, 0.05, l, 0, 0.13, 0);
    for (let d of [-1, 1])
      Rn(i, r, u, 0.1, 0.1, l, d * (a / 2 - 0.25), 0.05, 0);
    for (let d of [-1, 1])
      for (let v of [-1, 1])
        Rn(
          i,
          r,
          u,
          0.07,
          c - 0.1,
          0.07,
          d * (a / 2 - 0.035),
          0.1 + (c - 0.1) / 2,
          v * (l / 2 - 0.035),
          0.008,
        );
    for (let d of [-1, 1])
      (Rn(i, r, u, a, 0.06, 0.06, 0, c - 0.03, d * (l / 2 - 0.03), 0.008),
        Rn(i, r, u, a, 0.05, 0.05, 0, 0.62, d * (l / 2 - 0.03)),
        Rn(
          i,
          r,
          i.M("chainlink"),
          a - 0.14,
          c - 0.25,
          0.012,
          0,
          0.15 + (c - 0.25) / 2,
          d * (l / 2 - 0.035),
        ));
    for (let d of [-1, 1])
      (Rn(i, r, u, 0.06, 0.06, l, d * (a / 2 - 0.03), c - 0.03, 0, 0.008),
        Rn(
          i,
          r,
          i.M("chainlink"),
          0.012,
          c - 0.25,
          l - 0.14,
          d * (a / 2 - 0.035),
          0.15 + (c - 0.25) / 2,
          0,
        ));
    let f = i.M("steel_worn"),
      p = i.M("steel_rust");
    for (let d = 0; d < 14; d++) {
      let v = (d * 0.618 + o * 0.37) % 1,
        g = (d * 0.414 + o * 0.11) % 1,
        x = 1.5 + g * 0.9;
      ov(
        i,
        r,
        d % 3 ? f : p,
        0.014,
        x,
        -a / 2 + 0.25 + v * (a - 0.9),
        0.16 + (x / 2) * 0.96,
        -l / 2 + 0.2 + g * (l - 0.4),
        [0.1 * (g - 0.5), 0, 0.28 * (v - 0.3)],
        5,
      );
    }
    for (let d = 0; d < 6; d++) {
      let v = (d * 0.37 + o * 0.2) % 1;
      ov(
        i,
        r,
        p,
        0.035,
        0.42,
        a / 2 - 0.45 + (v - 0.5) * 0.3,
        0.22 + d * 0.05,
        (v - 0.5) * 0.7,
        [Math.PI / 2 + v, v * 3, 0.2],
        6,
      );
    }
    return (rv(i, e, t, n, a, l, c, "metal"), r);
  }

function Qa(i, e, t, n = 0, s = "paint_red") {
    let o = Hc(i, e, t, n),
      r = 1.1,
      a = 0.8,
      l = 0.75,
      c = i.M(s);
    for (let h of [-1, 1]) Rn(i, o, c, 0.09, 0.1, a, h * 0.36, 0.05, 0);
    Rn(i, o, c, r, 0.04, a, 0, 0.12, 0);
    for (let h of [-1, 1])
      Rn(
        i,
        o,
        c,
        r,
        l - 0.1,
        0.03,
        0,
        0.1 + (l - 0.1) / 2,
        h * (a / 2 - 0.015),
        0.006,
      );
    for (let h of [-1, 1])
      Rn(
        i,
        o,
        c,
        0.03,
        l - 0.1,
        a,
        h * (r / 2 - 0.015),
        0.1 + (l - 0.1) / 2,
        0,
        0.006,
      );
    for (let h of [-1, 1])
      for (let f of [-1, 1])
        Rn(
          i,
          o,
          c,
          0.06,
          l,
          0.06,
          h * (r / 2 - 0.02),
          l / 2,
          f * (a / 2 - 0.02),
          0.01,
        );
    Rn(i, o, i.M("steel_dark"), r - 0.08, 0.04, a - 0.08, 0, l - 0.22, 0);
    let u = i.M("steel_worn");
    for (let h = 0; h < 12; h++) {
      let f = (h * 0.618) % 1,
        p = (h * 0.37) % 1;
      Rn(
        i,
        o,
        u,
        0.16,
        0.11,
        0.1,
        (f - 0.5) * (r - 0.3),
        l - 0.16 + (h % 3) * 0.03,
        (p - 0.5) * (a - 0.25),
        0.012,
        [p, f * 3, f],
      );
    }
    return (rv(i, e, t, n, r, a, l, "metal"), o);
  }

function Ef(i, e, t, n = 0, s = 9) {
    let o = Hc(i, e, t, n),
      r = i.M("steel_worn"),
      a = i.M("steel_rust");
    for (let l of [-1.1, 1.1])
      Rn(i, o, "wood_dark", 0.1, 0.08, 0.7, l, 0.04, 0, 0.008);
    for (let l = 0; l < s; l++) {
      let c = l < 5 ? 0 : 1,
        u = c ? l - 5 : l;
      ov(
        i,
        o,
        l % 2 ? r : a,
        0.016,
        3.4 + (l % 3) * 0.12,
        ((l % 3) - 1) * 0.06,
        0.1 + c * 0.03,
        (u - (c ? 1.5 : 2)) * 0.045 + c * 0.02,
        [0, 0.01 * (l - 4), Math.PI / 2],
        5,
      );
    }
    for (let l = 0; l < s; l += 3)
      Rn(i, o, a, 0.07, 0.05, 0.03, 1.72, 0.11, (l - 4) * 0.02);
    return o;
  }

function e0(i, e, t, n = 0) {
    let s = Hc(i, e, t, n),
      o = new ji();
    (o.moveTo(-0.16, 0),
      o.lineTo(0.16, 0),
      o.lineTo(0.16, 0.05),
      o.lineTo(-0.1, 0.19),
      o.lineTo(-0.16, 0.19),
      o.closePath());
    let r = new rr(o, { depth: 0.2, bevelEnabled: !1 });
    return (
      r.translate(0, 0, -0.1),
      s.add(Qi(r, i.M("rubber"))),
      Rn(i, s, "paint_yellow", 0.012, 0.16, 0.18, -0.166, 0.1, 0),
      s
    );
  }

function Sf(i, e, t, n, s = "x-", o = 3.2) {
    let r = s[0] === "x";
    (i.cyl("steel_galv", 0.045, o, e, o / 2, t, { seg: 8 }),
      i.box("steel_dark", 0.3, 0.02, 0.3, e, 0.01, t));
    let a = 1.1,
      l = 0.62,
      c = 0.03;
    i.box("paint_yellow", r ? c : a, l, r ? a : c, e, o - l / 2 - 0.05, t, {
      bevel: 0.01,
    });
    let u = s[1] === "+" ? 1 : -1,
      h = r ? e + u * (c / 2 + 0.003) : e,
      f = r ? t : t + u * (c / 2 + 0.003);
    (i.label(n, 0.4, h, o - l / 2 - 0.05, f, s, {
      color: "black",
      font: "stencil",
      distress: 0.35,
    }),
      i.col(e - 0.06, 0, t - 0.06, e + 0.06, o, t + 0.06, "metal", {
        noNav: !0,
      }));
  }

function av(i, e, t, n = 2, s = !0, o = 0.02) {
    let u = ["paint_grey", "paint_teal", "paint_grey", "steel_rust"];
    for (let d = 0; d < n; d++) {
      let v = Hc(
          i,
          e + (d ? 0.12 * Math.sin(d * 2.1) : 0),
          t + (d ? 0.18 * Math.cos(d * 1.7) : 0),
          (s ? Math.PI / 2 : 0) + o * (d % 2 ? -1 : 1.3),
          0,
        ),
        g = 0.1 + d * (0.5 + 0.1);
      for (let y of [-3.6, 0, 3.6])
        Rn(i, v, "wood_dark", 0.14, 0.1, 4.2 - 0.2, y, g - 0.1 / 2, 0, 0.01);
      let x = i.M(u[d % u.length]);
      (Rn(i, v, x, 10.4, 0.5 - 0.08, 4.2, 0, g + (0.5 - 0.08) / 2, 0, 0.03),
        Rn(i, v, x, 10.4 - 0.5, 0.08, 4.2 - 0.5, 0, g + 0.5 - 0.04, 0, 0.02));
      for (let y of [-1.4, -0.7, 0, 0.7, 1.4])
        Rn(i, v, x, 10.4 - 0.9, 0.05, 0.09, 0, g + 0.5 + 0.02, y, 0.01);
      for (let y of [-1, 1])
        for (let b of [-1, 1])
          (Rn(
            i,
            v,
            "steel_dark",
            0.32,
            0.12,
            0.32,
            y * (10.4 / 2 - 0.35),
            g + 0.5 - 0.02,
            b * (4.2 / 2 - 0.35),
            0.02,
          ),
            Rn(
              i,
              v,
              "paint_yellow",
              0.5,
              0.5 - 0.1,
              0.02,
              y * (10.4 / 2 - 0.5),
              g + (0.5 - 0.08) / 2,
              b * (4.2 / 2 + 0.006),
            ));
      for (let y of [-1, 1])
        Rn(
          i,
          v,
          "rubber",
          0.04,
          0.12,
          4.2 - 0.4,
          y * (10.4 / 2 + 0.01),
          g + 0.1,
          0,
        );
    }
    let h = 0.1 + n * (0.5 + 0.1),
      f = (s ? 4.2 : 10.4) / 2 + 0.05,
      p = (s ? 10.4 : 4.2) / 2 + 0.05;
    return (
      i.col(e - f, 0, t - p, e + f, h, t + p, "metal"),
      i.metalRects.push([e - f, t - p, e + f, t + p]),
      h
    );
  }

function Lr(i, e, t = 0.025, n = "rubber", s = null) {
    let o = [];
    for (let r = 0; r < e.length; r++) {
      let a = e[r];
      if (
        (o.push([a[0], a.length > 2 ? a[2] : (s ?? t * 0.9), a[1]]),
        r < e.length - 1)
      ) {
        let l = e[r + 1],
          c = l[0] - a[0],
          u = l[1] - a[1],
          h = Math.hypot(c, u);
        if (h > 2.2 && a.length < 3 && l.length < 3) {
          let f = Math.floor(h / 1.6);
          for (let p = 1; p < f; p++) {
            let d = p / f,
              v = Math.sin((r * 3.1 + p) * 2.3) * Math.min(0.28, h * 0.04);
            o.push([
              a[0] + c * d - (u / h) * v,
              s ?? t * 0.9,
              a[1] + u * d + (c / h) * v,
            ]);
          }
        }
      }
    }
    return i.tube(n, o, t, { radial: 6, cast: !1 });
  }

function lv(i, e, t, n = 0) {
    let s = Hc(i, e, t, n);
    return (
      Rn(i, s, "concrete", 0.7, 0.12, 0.5, 0, 0.06, 0, 0.015),
      Rn(i, s, "paint_grey", 0.55, 0.9, 0.3, 0, 0.57, 0, 0.015),
      Rn(i, s, "steel_dark", 0.5, 0.03, 0.34, 0, 1.03, 0),
      Rn(i, s, "hazard_stripes", 0.3, 0.12, 0.01, 0, 0.8, 0.156),
      rv(i, e, t, n, 0.7, 0.5, 1.05, "metal"),
      s
    );
  }

var lb = { X: 30, LADDER_Z: 20, RAILS: [18.5, 28.5], Z0: -30, Z1: 28 };

function cb(i) {
    let {
        M: e,
        box: t,
        slab: n,
        cyl: s,
        rod: o,
        tube: r,
        col: a,
        add: l,
        place: c,
      } = i,
      { X: u, LADDER_Z: h, Z0: f, Z1: p } = lb,
      d = e("concrete"),
      v = e("concrete_dirty"),
      g = e("steel_worn"),
      x = e("steel_dark"),
      y = e("steel_galv"),
      b = e("paint_yellow"),
      m = h - 0.42,
      A = h + 0.42;
    for (let [E, w] of [
      [f - 1, m],
      [A, p + 1],
    ])
      (n(d, u - 0.65, -0.7, E, u, 0.028, w, { bevel: 0.03 }),
        n(g, u - 0.07, -0.16, E, u + 0.022, 0.036, w, { bevel: 0.012 }),
        n(b, u - 0.66, 0, E, u - 0.5, 0.032, w),
        n(v, u - 0.55, -4.2, E, u - 0.02, -0.7, w));
    (n(d, u - 0.65, -0.7, m, u - 0.38, 0.028, A),
      n(v, u - 0.55, -4.2, m, u - 0.38, -0.7, A));
    for (let E of [m, A])
      n(g, u - 0.38, -0.16, E - 0.02, u + 0.02, 0.034, E + 0.02);
    for (let E = f + 4; E < p; E += 6)
      Math.abs(E - h) < 1 ||
        (n(x, u - 0.03, -4.2, E - 0.02, u - 0.012, -0.2, E + 0.02, {
          cast: !1,
        }),
        i.decal("rust_run", 0.7, u - 0.015, -1.3, E + 1.4, "x+"));
    (a(u - 0.65, -4.2, f - 1, u, 0.028, p + 1, "concrete", { noNav: !0 }),
      a(u + 0.03, -5, f - 2, u + 0.7, 8, p + 2, "concrete", {
        playerOnly: !0,
      }));
    {
      let E = u - 0.12;
      for (let S of [-1, 1]) {
        let z = h + S * 0.26;
        (r(
          e("paint_yellow"),
          [
            [E, -3.9, z],
            [E, 0.2, z],
            [E, 0.95, z],
            [E - 0.12, 1.12, z],
            [E - 0.5, 1.12, z],
            [E - 0.62, 0.95, z],
            [E - 0.62, 0.03, z],
          ],
          0.024,
          { radial: 7, tension: 0.2 },
        ),
          t(x, 0.12, 0.012, 0.12, E - 0.62, 0.034, z));
      }
      for (let S = -3.7; S < 0; S += 0.3)
        o(y, [E, S, h - 0.26], [E, S, h + 0.26], 0.014, { seg: 6 });
      for (let S of [-3, -1.6, -0.3])
        for (let z of [-1, 1])
          o(y, [E, S, h + z * 0.26], [u - 0.38, S, h + z * 0.26], 0.012);
      let w = [[h - 2.6], [h - 0.9], [h + 0.9], [h + 2.6]];
      for (let [S] of w)
        (s(b, 0.032, 1.05, u - 0.82, 0.525, S, { seg: 8 }),
          s(x, 0.09, 0.02, u - 0.82, 0.01, S, { seg: 10 }),
          s(x, 0.045, 0.03, u - 0.82, 1.06, S, { seg: 8 }));
      for (let [S, z] of [
        [h - 2.6, h - 0.9],
        [h + 0.9, h + 2.6],
      ])
        for (let H of [0.98, 0.55])
          r(
            y,
            [
              [u - 0.82, H, S],
              [u - 0.82, H - 0.1, (S + z) / 2 - 0.3],
              [u - 0.82, H - 0.12, (S + z) / 2 + 0.3],
              [u - 0.82, H, z],
            ],
            0.012,
            { radial: 5 },
          );
      i.label("BERTH 04 EXTRACTION POINT", 0.2, u - 1.3, 0.006, h - 1.4, "y+", {
        color: "yellow",
        font: "stencil",
        distress: 0.4,
      });
    }
    let _ = new Ci(0.4, 0.16, 8, 16);
    _.rotateY(Math.PI / 2);
    for (let E = f + 2.5, w = 0; E < p; E += 5, w++) {
      if (Math.abs(E - h) < 2) continue;
      (n(e("wood_dark"), u + 0, -3.9, E - 0.16, u + 0.2, -0.25, E + 0.16, {
        bevel: 0.02,
      }),
        n(x, u - 0.01, -0.5, E - 0.2, u + 0.215, -0.42, E + 0.2),
        n(x, u - 0.01, -2.4, E - 0.2, u + 0.215, -2.32, E + 0.2));
      let S = E + 2.4;
      if (Math.abs(S - h) < 1.6 || S > p - 0.5) continue;
      let z = -0.85 - (w % 3) * 0.18;
      (l(_.clone(), e("tire"), { p: [u + 0.17, z, S] }),
        w % 2 &&
          l(_.clone(), e("tire"), { p: [u + 0.17, z - 0.86, S + 0.05] }));
      for (let H of [-1, 1])
        o(
          y,
          [u - 0.02, 0.02, S + H * 0.3],
          [u + 0.17, z + 0.36, S + H * 0.16],
          0.011,
          { seg: 5 },
        );
      t(x, 0.1, 0.03, 0.8, u - 0.06, 0.04, S);
    }
    let M = [-22, -12, -2, 9, 16.4, 25.6];
    for (let E of M)
      c("bollard_mooring", 29.2, E, 0, { seed: Math.round(E + 40) });
    {
      let E = [...M.map((S) => [S - 1.1, S + 1.1]), [h - 3, h + 3]].sort(
          (S, z) => S[0] - z[0],
        ),
        w = f + 0.3;
      for (let [S, z] of [...E, [p - 0.3, p]]) {
        if (S - w > 1) {
          n(b, u - 0.4, 0.12, w, u - 0.2, 0.3, S, { bevel: 0.02 });
          for (let H = w + 0.3; H < S; H += 1.6)
            n(x, u - 0.42, 0.028, H - 0.12, u - 0.18, 0.12, H + 0.12);
        }
        w = Math.max(w, z);
      }
    }
    for (let E of lb.RAILS) {
      (n(x, E - 0.19, 0, f + 0.4, E + 0.19, 0.007, p - 0.4, { cast: !1 }),
        n(e("steel_rust"), E - 0.075, 0, f + 0.4, E + 0.075, 0.018, p - 0.4, {
          cast: !1,
        }),
        n(g, E - 0.037, 0, f + 0.4, E + 0.037, 0.034, p - 0.4, {
          bevel: 0.008,
          cast: !1,
        }));
      for (let w = f + 0.8; w < p - 0.5; w += 0.9)
        for (let S of [-1, 1])
          t(x, 0.07, 0.022, 0.1, E + S * 0.115, 0.012, w, { cast: !1 });
      for (let [w, S] of [
        [f + 0.75, 1],
        [p - 0.75, -1],
      ])
        (n(b, E - 0.28, 0, w - 0.3, E + 0.28, 0.75, w + 0.3, { bevel: 0.03 }),
          n(
            e("rubber"),
            E - 0.16,
            0.3,
            w + S * 0.3,
            E + 0.16,
            0.62,
            w + S * 0.42,
            { bevel: 0.03 },
          ),
          n(x, E - 0.34, 0, w - 0.38, E + 0.34, 0.04, w + 0.38),
          a(E - 0.28, 0, w - 0.36, E + 0.28, 0.75, w + 0.36, "metal"));
    }
    return (
      av(i, 23.3, -15.4, 2, !0, 0.02),
      av(i, 23.7, 14.4, 2, !0, -0.025),
      c("jersey_barrier", 20.5, -4.7, Math.PI / 2 + 0.12, { seed: 31 }),
      c("jersey_barrier", 25.3, 3.1, -0.2, { seed: 32 }),
      Ka(i, 25.7, -3.3, 0.08, "paint_blue", 2),
      c("sandbags", 20.6, 3, 1.25, { seed: 33 }),
      c("barrel", 26.5, -1.7, 0, { seed: 34, color: "red" }),
      c("barrel", 26.9, -1.05, 0.5, { seed: 35 }),
      Qa(i, 20.55, 1.35, 0.12),
      c("traffic_cone", 22, -1.9, 0, { seed: 36 }),
      c("traffic_cone", 24.2, 1.7, 0, { seed: 37 }),
      i.stack(23.2, -28.6, [
        [20, "white", { reefer: !0 }],
        [20, "white", { reefer: !0 }],
      ]),
      i.stack(23, -25.95, [[20, "grey", { reefer: !0 }]]),
      c("generator", 15, -26.6, 0.06, { seed: 41 }),
      c("floodlight_stand", 16.4, -23.6, 0.3, { seed: 42 }),
      Lr(
        i,
        [
          [16.1, -26.6],
          [18, -27.6],
          [19.2, -27.2],
          [19.6, -26.4],
        ],
        0.028,
      ),
      Lr(
        i,
        [
          [15.6, -26],
          [16.2, -24.6],
          [16.4, -23.9],
        ],
        0.018,
      ),
      Ka(i, 27, -18.1, Math.PI / 2 + 0.05, "paint_orange", 5),
      c("tire_stack", 24.1, -9.5, 0, { seed: 43 }),
      c("tire_stack", 25.05, -9.6, 0.5, { seed: 44 }),
      c("cable_reel", 14.3, -12.9, 0.4, { seed: 45 }),
      c("cable_reel", 15.6, -14.3, 1.9, { seed: 46 }),
      c("pallet_stack", 20.3, -9.3, 0.1, { seed: 47 }),
      c("crate_wood", 19.9, -22.6, 0.3, { seed: 48 }),
      c("barrel", 12.75, -23.3, 0, { seed: 49, color: "blue" }),
      c("barrel", 12.9, -24.1, 0, { seed: 50, color: "blue" }),
      c("light_mast", 26.6, -28.7, 0, { seed: 51 }),
      c("light_mast", 26.6, 26.7, 0, { seed: 52 }),
      Ka(i, 20.6, 22.4, 0.04, "paint_blue", 7),
      Ka(i, 20.7, 24.2, -0.06, "paint_orange", 9),
      Qa(i, 26.6, 5.5, 0.1),
      Qa(i, 26.7, 6.45, -0.15, "paint_blue"),
      c("crate_stack", 26.4, 23.6, 0.2, { seed: 53 }),
      c("ibc_tote", 22.6, 26.3, 0.05, { seed: 54 }),
      c("pallet_stack", 24, 26.2, 0.2, { seed: 55 }),
      c("barrel", 22.6, 20.3, 0, { seed: 56, color: "yellow" }),
      c("barrel", 23.4, 20.4, 0, { seed: 57 }),
      c("tarp_cargo", 20.3, 12.6, Math.PI / 2, { seed: 59 }),
      Ef(i, 19.6, 17.5, Math.PI / 2 + 0.05),
      e0(i, 19.6, 10.4, 0.4),
      e0(i, 20.5, 16.1, -2.6),
      c("traffic_cone", 28.2, 18.2, 0, { seed: 60 }),
      c("traffic_cone", 28.3, 21.8, 0, { seed: 61 }),
      Lr(
        i,
        [
          [28.9, 6.2],
          [28.6, 9.5],
          [28.95, 13],
          [28.7, 16.6],
          [28.3, 17.4],
          [28.6, 17.9],
          [28.9, 17.3],
        ],
        0.022,
      ),
      { relayPos: new W(23, 0, 0), extraction: new W(29, 0, h) }
    );
  }

var uR = Math.PI,
    ts = uR / 2,
    R1 = 0.535,
    mt = (i, e, t) => new W(i, e, t);

function hR(i) {
    let e = i.place,
      t = i.stack;
    (t(-19.45, -5.12, [
      [20, "green"],
      [20, "grey"],
      [20, "orange"],
    ]),
      t(-13.3, -5.12, [[20, "white", { reefer: !0, flip: !0 }]]),
      t(3.7, -5.12, [
        [20, "blue", { doors: 0.8, flip: !0 }],
        [20, "white"],
      ]),
      t(13.53, -5.12, [
        [20, "teal"],
        [20, "grey"],
      ]),
      t(-19.45, 2.08, [[20, "blue"]]),
      t(-13.35, 2.08, [[20, "red"]]),
      t(0.8, 2.08, [
        [40, "orange"],
        [40, "teal"],
        [20, "blue", { dx: 3 }],
      ]),
      t(12.3, 2.08, [
        [20, "red"],
        [20, "yellow"],
      ]),
      t(-21.1, 9.92, [[20, "yellow"]], 0, 0.3),
      t(
        -13.6,
        9.92,
        [
          [20, "green"],
          [20, "blue"],
          [20, "orange"],
        ],
        0,
        0.3,
      ),
      t(
        -21.6,
        12.42,
        [
          [20, "red"],
          [20, "white"],
          [20, "teal"],
        ],
        0,
        0.3,
      ),
      t(-15.4, 12.42, [[20, "grey", { doors: 0.6 }]], 0, 0.3),
      t(4.43, 12.42, [[20, "blue"]], 0, 0),
      t(13.53, 12.42, [[20, "green"]], 0, 0),
      i.stairs(-0.1, 12.42, 0, 0, { seed: 9 }),
      i.catwalk(8.98, 12.42, 0, 2.54, { seed: 10 }));
    for (let s of [7.6, 10.36])
      for (let o of [11.86, 12.98])
        i.rod("steel_galv", [s, 0, o], [s, 2.5, o], 0.035);
    (e("sandbags", 15.95, 12.42, ts, { seed: 61 }, 2.59),
      e("crate_wood", 14.3, 11.75, 0.1, { seed: 62 }, 2.59),
      e("sandbags", 2.3, 11.75, 0, { seed: 63 }, 2.59),
      t(-16.4, 20.12, [
        [40, "grey"],
        [40, "green"],
      ]),
      t(-2.25, 20.12, [[20, "red"]]),
      t(3.85, 20.12, [
        [20, "white"],
        [20, "blue"],
      ]),
      t(13.53, 20.12, [
        [20, "orange"],
        [20, "teal"],
        [20, "red"],
      ]),
      t(-16.4, 22.62, [
        ["hc", "teal"],
        [40, "yellow"],
        [40, "blue"],
      ]),
      t(0.8, 22.62, [
        [40, "green"],
        ["hc", "orange"],
      ]),
      t(13.53, 22.62, [[20, "grey", { doors: 0.4 }]]),
      t(
        -22.6,
        -19.2,
        [
          [40, "red"],
          [40, "white"],
        ],
        ts,
      ),
      t(-30.2, -18.4, [[20, "yellow", { doors: 0.5 }]], 0.35, 0),
      t(-31.2, 24.7, [
        [40, "teal"],
        [40, "orange"],
      ]));
    for (let [s, o] of [
      [-23.4, 0.5],
      [-23.4, 21.4],
      [17, -8.7],
      [17, 18.6],
      [-20.6, -11.6],
    ])
      e("light_mast", s, o, 0, { seed: Math.round(s * 3 + o) });
    let n = (s, o, r, a = 0.018) => {
      let l = [];
      for (let c = 0; c <= 8; c++) {
        let u = c / 8;
        l.push([
          s[0] + (o[0] - s[0]) * u,
          s[1] + (o[1] - s[1]) * u - r * 4 * u * (1 - u),
          s[2] + (o[2] - s[2]) * u,
        ]);
      }
      i.tube("rubber", l, a, { radial: 5, tension: 0.5 });
    };
    (n([-23.4, 12.4, 0.5], [-20.6, 12.4, -11.6], 1.3),
      n([-20.6, 11.8, -11.6], [-16.2, 7.25, -11.4], 0.9),
      n([-23.4, 12, 0.5], [-27.6, 12.2, -0.9], 0.5),
      n([17, 12.4, -8.7], [12.3, 7.3, -11.3], 1),
      Ef(i, -20.9, 8.3, 0.02),
      e0(i, -18.6, 3.75, 1.7),
      e0(i, 0.4, 13.3, 0.3),
      e("barrel", -19.6, 3.85, 0, { seed: 1, color: "blue" }),
      e("barrel", -18.9, 3.95, 0.7, { seed: 2, color: "blue" }),
      e("pallet_stack", -17.4, 4, 0.08, { seed: 3 }),
      e("crate_stack", -14.3, 8.05, 0.04, { seed: 4 }),
      e("ibc_tote", -12.95, 7.95, -0.05, { seed: 5 }));
    {
      let a = Math.cos(-0.22),
        l = -Math.sin(-0.22);
      e("forklift", -8.6, 4.5, -0.22, { seed: 6, forksUp: 0.3 });
      let c = -8.6 + a * 1.42,
        u = 4.5 + l * 1.42;
      (e("pallet", c, u, -0.22, { seed: 7 }, R1, { noCol: !0 }),
        e("crate_wood", c, u, -0.22 + 0.05, { seed: 8 }, R1 + 0.144, {
          noCol: !0,
        }),
        i.col(
          c - 0.62,
          R1 - 0.1,
          u - 0.62,
          c + 0.62,
          R1 + 1.15,
          u + 0.62,
          "wood",
        ),
        e0(i, -8.6 - 1, 4.5 + 0.78, 0.2),
        e0(i, -11.9, 3.6, 2.4));
    }
    (e("jersey_barrier", -2.9, 5.3, 0.12, { seed: 11 }),
      e("jersey_barrier", 5.6, 5, -0.1, { seed: 12 }),
      e("sandbags", -1.7, 9.7, 0.5, { seed: 13 }),
      e("ibc_tote", 5.9, 8.9, 0.1, { seed: 14 }),
      e("ibc_tote", 5.95, 10.05, -0.05, { seed: 15 }),
      e("barrel", 4.9, 9.7, 0, { seed: 16, color: "red" }),
      e("crate_stack", -3.9, 10.5, 0.1, { seed: 17 }),
      e("crate_wood", -3.8, 9.35, -0.2, { seed: 18 }),
      e("pallet_stack", -4.4, 11.8, 0.02, { seed: 19 }),
      e("cable_reel", 4.2, 10.5, 0.3, { seed: 20 }),
      e("tarp_cargo", 12.9, 10, 0.04, { seed: 21 }),
      e("jersey_barrier", 11.6, 3.95, 0.03, { seed: 81 }),
      e("ibc_tote", 15.2, 10.2, 0.1, { seed: 82 }));
    for (let [s, o] of [
      [0.2, 6.3],
      [2.9, 6.4],
      [2.9, 8.8],
      [0.1, 8.7],
    ])
      e("traffic_cone", s, o, 0, { seed: Math.round(s * 9 + o * 5) });
    (Qa(i, -9.55, 9.3, 0.04),
      Ef(i, -7.6, 11.9, ts + 0.06),
      Qa(i, 9.9, 12.9, ts, "paint_blue"),
      e("sign_post", -4.8, 3.72, ts, { seed: 22, sign: "hazard_voltage" }),
      lv(i, 0.9, 3.62, 0),
      Lr(
        i,
        [
          [0.9, 3.9],
          [1.2, 5.2],
          [0.8, 6.2],
          [1.5, 7.1],
        ],
        0.03,
      ),
      e("tarp_cargo", -13.5, -3.1, 0.05, { seed: 23 }),
      e("pallet_stack", -20.6, -0.1, 0.2, { seed: 24 }),
      e("tire_stack", -9.6, 0.2, 0, { seed: 25 }),
      e("barrel", 4.5, 0.35, 0, { seed: 26, color: "yellow" }),
      e("barrel", 5.2, 0.3, 0.4, { seed: 27 }),
      e("jersey_barrier", 12.2, 0.4, 0.03, { seed: 28 }),
      e("crate_wood", 11.2, -3.3, 0.3, { seed: 29 }),
      e("cardboard_boxes", -2, 0.3, 0.2, { seed: 30 }),
      Ka(i, -4.2, -3.2, 0.03, "paint_orange", 3),
      e("jersey_barrier", -0.9, -7.5, 0.1, { seed: 31 }),
      e("sandbags", -6.7, -7.8, -0.1, { seed: 32 }),
      e("dumpster", -12.3, -7.05, 0, { seed: 33 }),
      e("gas_cylinders", 9.6, -10.45, 0, { seed: 34 }),
      e("pallet_stack", 1.2, -9.9, 0.1, { seed: 35 }),
      e("barrel", 2.2, -10.3, 0, { seed: 36, color: "green" }),
      e("cable_reel", -18.2, -8, 0.2, { seed: 37 }),
      e("traffic_cone", -6.5, -9.9, 0, { seed: 38 }),
      e("traffic_cone", -0.5, -9.9, 0, { seed: 39 }),
      Lr(
        i,
        [
          [4.6, -10.9, 0.5],
          [4.7, -10.6, 0.05],
          [4.2, -9.2],
          [1, -8.4],
          [-2.6, -9.1],
          [-4.6, -6.4],
          [-5.9, -5.9],
        ],
        0.024,
      ),
      e("pipe_stack", -16, 14.4, 0, { seed: 41 }),
      e("crate_stack", -10.95, 18.25, 0.06, { seed: 42 }),
      e("barrel", -3, 18.35, 0, { seed: 43, color: "blue" }),
      e("dumpster", 4.2, 14.55, 0.02, { seed: 44 }),
      e("tire_stack", 10.95, 18.3, 0, { seed: 45 }),
      e("ibc_tote", 12, 18.25, 0, { seed: 46 }),
      e("pallet_stack", -12.3, 18.2, 0.1, { seed: 47 }),
      e("tarp_cargo", -20.5, 18.05, 0.03, { seed: 48 }),
      e("jersey_barrier", 0.6, 15.5, 0.12, { seed: 49 }),
      e("tire_stack", -8, 26.9, 0, { seed: 51 }),
      e("pallet_stack", 8.7, 27, 0.3, { seed: 52 }),
      e("crate_wood", -2, 27, 0.2, { seed: 53 }),
      e("barrel", 11.2, 27.1, 0, { seed: 54 }),
      e("cardboard_boxes", -21, 26.9, 0.4, { seed: 55 }),
      Qa(i, 16, 26.9, 0.1),
      e("pipe_stack", -30.5, -27, 0.03, { seed: 56 }),
      e("pipe_stack", -30.2, -25.4, -0.02, { seed: 57 }),
      e("dumpster", -17, -14, ts, { seed: 58 }),
      e("tarp_cargo", -27.5, -11.6, 0.3, { seed: 59 }),
      e("tarp_cargo", -29.9, -11, -0.2, { seed: 60 }),
      e("cable_reel", -34.6, -22.5, 1, { seed: 64 }),
      e("tire_stack", -25.4, -26.9, 0, { seed: 65 }),
      e("gas_cylinders", -16.9, -20.4, ts, { seed: 66 }),
      e("crate_stack", -34.8, -13.5, 0.2, { seed: 67 }),
      e("barrel", -33.6, -13, 0, { seed: 68 }),
      Ka(i, -36.6, -26, ts, "paint_blue", 4),
      e("generator", -34.2, 14.2, 0.15, { seed: 71 }),
      e("floodlight_stand", -31.4, 12.7, 0.55, { seed: 72 }),
      Lr(
        i,
        [
          [-33.2, 14],
          [-32.4, 13.2],
          [-31.6, 12.9],
        ],
        0.02,
      ),
      e("tire_stack", -36.6, 17.2, 0, { seed: 73 }),
      e("tire_stack", -36.5, 18.3, 0.6, { seed: 74 }),
      e("dumpster", -36.4, 21, ts, { seed: 75 }),
      e("pallet_stack", -27.8, 16.6, 0.4, { seed: 76 }),
      e("jerry_can", -33, 15.2, 0.4, { seed: 77 }),
      e("jerry_can", -33.3, 15.35, 1.9, { seed: 78 }),
      e("crate_wood", -28.6, 20.6, 0.1, { seed: 79 }),
      e("ibc_tote", -26.6, 21.2, 0, { seed: 80 }),
      Sf(i, -22.9, -3.62, "PASSAGE 01", "x-"),
      Sf(i, -22.95, 3.62, "PASSAGE 02", "x-"),
      Sf(i, -25, 14, "PASSAGE 03", "x-"),
      Sf(i, 16.9, 9.5, "PASSAGE 02", "x+"),
      i.label(
        "BERTH 04 MAINTENANCE SHED",
        0.55,
        4.2,
        4.3,
        no.Z1 + 0.064,
        "z+",
        { color: "white", font: "stencil", distress: 0.45 },
      ),
      i.decal("berth4", 3.2, -12, 3.4, no.Z1 + 0.064, "z+"),
      i.decal("rust_run", 1, 9, 3.2, no.Z1 + 0.064, "z+"),
      i.decal("grime_streak", 1.2, -14, 3.9, no.Z1 + 0.064, "z+"));
  }

function fR(i) {
    let e = i.place,
      t = -38,
      n = 30,
      s = -30,
      o = 28,
      r = 2,
      a = 8;
    function l(c, u, h, f, p) {
      let d = Math.hypot(h - c, f - u),
        v = Math.max(1, Math.round(d / 3.35)),
        g = d / (v * 3),
        x = Math.abs(h - c) > Math.abs(f - u);
      for (let y = 0; y < v; y++) {
        let b = (y + 0.5) / v,
          m = e(
            "fence_panel",
            c + (h - c) * b,
            u + (f - u) * b,
            x ? 0 : ts,
            { seed: p + y, posts: y === v - 1 ? "both" : "left" },
            0,
            { noCol: !0 },
          );
        m.scale.x = g;
      }
      (i.col(
        Math.min(c, h) - 0.05,
        0,
        Math.min(u, f) - 0.05,
        Math.max(c, h) + 0.05,
        2.4,
        Math.max(u, f) + 0.05,
        "metal",
      ),
        i.col(
          Math.min(c, h) - 0.3,
          0,
          Math.min(u, f) - 0.3,
          Math.max(c, h) + 0.3,
          7,
          Math.max(u, f) + 0.3,
          "metal",
          { playerOnly: !0 },
        ));
    }
    (l(t, s, n, s, 100),
      l(t, o, n, o, 200),
      l(t, s, t, r, 300),
      l(t, a, t, o, 400));
    for (let c of [r - 0.1, a + 0.1])
      (i.box("steel_dark", 0.22, 3.4, 0.22, t, 1.7, c, { bevel: 0.02 }),
        i.box("hazard_stripes", 0.26, 1.2, 0.26, t, 0.6, c, { bevel: 0.02 }),
        i.col(t - 0.13, 0, c - 0.13, t + 0.13, 3.4, c + 0.13, "metal"));
    {
      let c = a + 3.3,
        u = t + 0.28;
      i.box("chainlink", 0.012, 2.1, 6, u, 1.25, c);
      for (let h of [c - 3, c, c + 3])
        i.box("steel_galv", 0.06, 2.2, 0.06, u, 1.25, h);
      for (let h of [0.18, 2.32, 1.25])
        i.box("steel_galv", 0.06, 0.06, 6.06, u, h, c);
      (i.rod("steel_galv", [u, 0.2, c - 3], [u, 2.3, c], 0.018),
        i.rod("steel_galv", [u, 0.2, c + 3], [u, 2.3, c], 0.018),
        i.slab("steel_dark", u - 0.05, 0, r - 0.3, u + 0.05, 0.03, c + 3.2, {
          cast: !1,
        }));
      for (let h of [c - 2.4, c + 2.4])
        i.cyl("rubber", 0.09, 0.05, u, 0.1, h, { axis: "x", seg: 10 });
    }
    (i.col(t - 0.4, 0, r, t - 0.1, 7, a, "metal", { playerOnly: !0 }),
      e("guard_booth", -35.2, 0.35, 0, { seed: 1 }),
      e("gate_arm", -36.3, 5, ts, { seed: 2 }));
    for (let [c, u] of [
      [-37, 1.75],
      [-34.4, 2.3],
      [-37, 8.3],
      [-35.6, 8.9],
      [-34.4, 9.9],
      [-33.5, -1.1],
    ])
      e("bollard_post", c, u, 0, { seed: Math.round(c * 11 + u * 7) });
    (e("jersey_barrier", -34.7, 3.75, ts + 0.08, { seed: 3 }),
      e("jersey_barrier", -33.3, 8.3, ts - 0.06, { seed: 4 }),
      e("jersey_barrier", -30.6, 10.4, 0.03, { seed: 5 }),
      e("jersey_barrier", -27.3, 1.45, 0.05, { seed: 6 }),
      e("jersey_barrier", -32.2, 1.45, -0.04, { seed: 7 }),
      e("sign_post", -33.2, 9.6, ts, { seed: 8, sign: "no_entry" }),
      e("sign_post", -25.3, 1.1, ts, { seed: 9, sign: "berth4" }),
      e("sign_post", -36.6, -1.6, ts, { seed: 10, sign: "hazard_general" }));
    for (let [c, u] of [
      [-34.6, 5.6],
      [-28.3, 2],
      [-33.2, 6.5],
      [-26.6, 9.8],
      [-31.8, 9.9],
    ])
      e("traffic_cone", c, u, 0, { seed: Math.round(c * 5 + u * 3) });
    (e("light_mast", -27.6, -0.9, 0, { seed: 11 }),
      e("light_mast", -36.3, 12.4, 0, { seed: 12 }),
      e("barrel", -33.9, 2, 0, { seed: 13, color: "yellow" }),
      e("pallet_stack", -36.4, 10.3, 0.2, { seed: 14 }),
      i.decal("no_entry", 0.7, t + 0.34, 1.5, a + 3.3, "x+"),
      i.decal("arrow", 2.2, -30.5, 0.006, 6, "y+", 0));
  }

async function C1(i) {
    let e = new wt();
    ((e.name = "level"), i.scene.add(e));
    let t = ob(i);
    (hR(t), fR(t));
    let n = ab(t),
      s = cb(t),
      o = t.place("relay_node", 1.5, 7.5, 0.35, { seed: 1 }, 0),
      r = t.place(
        "relay_node",
        n.relayPos.x,
        n.relayPos.z,
        ts * 0.9,
        { seed: 2 },
        no.FLOOR,
      ),
      a = t.place(
        "relay_node",
        s.relayPos.x,
        s.relayPos.z,
        -0.2,
        { seed: 3 },
        0,
      );
    (Lr(
      t,
      [
        [-2, -27.5, 1.2],
        [-2, -27.55, 0.08],
        [-1.4, -25.6],
        [-2.4, -23],
        [-1.9, -20.3],
      ],
      0.03,
      t.MI("rubber"),
      no.FLOOR + 0.028,
    ),
      lv(t, 20.4, -7.3, 0.2),
      Lr(
        t,
        [
          [20.5, -7],
          [21.4, -4.9],
          [22.4, -2.6],
          [22.9, -0.7],
        ],
        0.03,
      ),
      t.staticRoot.updateMatrixWorld(!0));
    let l = [];
    t.staticRoot.traverse((z) => {
      z.userData &&
        z.userData.noMerge &&
        !(z.parent && dR(z.parent, t.staticRoot)) &&
        l.push(z);
    });
    for (let z of l) t.dynRoot.attach(z);
    let c = new Set();
    t.staticRoot.traverse((z) => {
      z.isMesh && !Array.isArray(z.material) && c.add(z.material);
    });
    let u = new Map();
    for (let z of c)
      if (
        !(
          !z.isMeshStandardMaterial ||
          z.vertexColors ||
          z.transparent ||
          !z.name ||
          !(i.mats.names || []).includes(z.name)
        )
      )
        try {
          let H = z.userData && z.userData.interior ? { interior: !0 } : {};
          if (i.mats.get(z.name, H) !== z) continue;
          let O = i.mats.get(z.name, { ...H, vertexColors: !0 });
          O !== z && c.has(O) && u.set(z, O);
        } catch {}
    t.staticRoot.traverse((z) => {
      if (!z.isMesh || Array.isArray(z.material)) return;
      let H = u.get(z.material);
      H && (z.material = H);
      let O = !z.material.transparent && !z.material.isMeshBasicMaterial;
      ((z.castShadow = O), (z.receiveShadow = !z.material.isMeshBasicMaterial));
    });
    let h = { count: 0, update() {} };
    try {
      h = rb(t.staticRoot);
    } catch (z) {
      console.error("[level] label atlas failed", z);
    }
    let f = By(t.staticRoot);
    ((f.name = "level-merged"), e.add(f), e.add(t.dynRoot));
    for (let z of [o, r, a]) {
      for (let H = z.children.length - 1; H >= 0; H--) z.remove(z.children[H]);
      t.dynRoot.add(z);
    }
    let p = 0;
    f.traverse((z) => {
      if (z.isMesh) {
        let H = z.geometry;
        p += (H.index ? H.index.count : H.attributes.position.count) / 3;
      }
    });
    let d = { pos: mt(-32, 0, 6), yaw: -ts },
      v = [
        {
          id: "relay_a",
          label: "RELAY A · CONTAINER YARD",
          zone: "yard",
          pos: mt(1.5, 0, 7.5),
          object: o,
        },
        {
          id: "relay_b",
          label: "RELAY B · MAINTENANCE SHED",
          zone: "shed",
          pos: mt(n.relayPos.x, no.FLOOR, n.relayPos.z),
          object: r,
        },
        {
          id: "relay_c",
          label: "RELAY C · QUAYSIDE",
          zone: "quay",
          pos: mt(s.relayPos.x, 0, s.relayPos.z),
          object: a,
        },
      ],
      g = (z, H, O) => ({ pos: mt(z, 0, H), zone: O, type: "ground" }),
      x = (z, H, O, q) => ({ pos: mt(z, H, O), zone: q, type: "air" }),
      y = [
        g(-19, -1.4, "yard"),
        g(3.5, -1.6, "yard"),
        g(14.2, 16.4, "yard"),
        g(-3.2, 16.6, "yard"),
        g(-16, 26, "yard"),
        g(6, 26, "yard"),
        g(4.2, -5.12, "yard"),
        g(-7.8, 21.4, "yard"),
        g(-11.3, 12.5, "yard"),
        g(17.5, 22.2, "yard"),
        x(10, 11, 23.5, "yard"),
        x(2, 11, 21.5, "yard"),
        x(13, 9, 11, "yard"),
        x(-4, 12.5, -4.5, "yard"),
        x(9, 10, 1.5, "yard"),
        x(-10, 12, 24.5, "yard"),
        g(-12.4, -24.8, "shed"),
        g(9.6, -25.3, "shed"),
        g(-13.4, -19.6, "shed"),
        g(4.6, -13.8, "shed"),
        g(-21, -27.2, "shed"),
        g(-18.6, -22, "shed"),
        g(13.6, -24, "shed"),
        g(-26.6, -15, "shed"),
        x(-8, 5.4, -20.5, "shed"),
        x(5, 5.2, -18, "shed"),
        x(-20, 10.5, -20, "shed"),
        x(14.5, 10, -22, "shed"),
        x(-2, 12.5, -8.5, "shed"),
        g(27.7, -24.2, "quay"),
        g(18.3, -25.4, "quay"),
        g(27.2, -12.6, "quay"),
        g(20.2, 14, "quay"),
        g(23.4, 23.2, "quay"),
        g(18, 24.4, "quay"),
        g(27.4, 11.6, "quay"),
        x(36, 9, 4, "quay"),
        x(38, 11, -6, "quay"),
        x(35, 8.5, 16, "quay"),
        x(24, 12.5, 10.5, "quay"),
        x(33.5, 10, 24.5, "quay"),
        x(22, 13, -14, "quay"),
      ],
      b = [
        { name: "gate", min: [-40, -30], max: [-24, 30] },
        { name: "yard", min: [-24, -10], max: [16, 30] },
        { name: "shed", min: [-24, -30], max: [16, -10] },
        { name: "quay", min: [16, -30], max: [40, 30] },
      ],
      m = [{ min: mt(no.X0, 0, no.Z0), max: mt(no.X1, no.RIDGE, no.Z1) }],
      A = [
        { pos: [-34, 1.6, 6.2], look: [-12, 2.6, 6.6] },
        { pos: [-20, 1.3, 5.6], look: [0, 2.2, 7] },
        { pos: [-6.2, 2.1, 7.9], look: [2, 1.6, 7.6] },
        { pos: [-6.6, 2.5, 0.4], look: [-4, 2.6, -12] },
        { pos: [-4.4, 1.9, -8.6], look: [-2.4, 2.8, -19.5] },
        { pos: [-3.2, 2.2, -15], look: [-2, 2.2, -20.5] },
        { pos: [4.2, 2.6, -19.6], look: [12, 3.2, -19.5] },
        { pos: [15, 2, -19.5], look: [24, 3.5, -6] },
        { pos: [20.2, 1.7, -9], look: [23, 1.6, 0] },
        { pos: [25.9, 1.8, 1.5], look: [27.5, 1.2, 12] },
        { pos: [27.3, 1.8, 12], look: [29.6, 0.4, 20] },
        { pos: [28.4, 1.9, 17.2], look: [31.5, -0.8, 21] },
      ],
      _ = [
        mt(-33.9, 0, 3.8),
        mt(-27.3, 0, 2.3),
        mt(-19.2, 0, 4.7),
        mt(-17.4, 0, 4.9),
        mt(-12.5, 0, 7.2),
        mt(-9.3, 0, 6.4),
        mt(-6.3, 0, 7.3),
        mt(-2.9, 0, 6.1),
        mt(-2.9, 0, 4.5),
        mt(5.6, 0, 5.8),
        mt(5.6, 0, 4.2),
        mt(-2.2, 0, 10.4),
        mt(5, 0, 8.9),
        mt(-4.8, 0, 10.6),
        mt(7.5, 0, 7.7),
        mt(9.2, 0, 4.4),
        mt(-1, 0, 13.6),
        mt(-13.5, 0, -1.5),
        mt(-9.6, 0, -0.7),
        mt(7.8, 0, -1.5),
        mt(-4.2, 0, -2.2),
        mt(-0.9, 0, -6.7),
        mt(-6.7, 0, -7),
        mt(1.2, 0, -8.9),
        mt(-8.1, 0, 15.4),
        mt(0.6, 0, 16.9),
        mt(4.2, 0, 15.7),
        mt(-16, 0, 15.6),
        mt(12, 0, 17.2),
        mt(2.9, 0, -17),
        mt(4.2, 0, -15.3),
        mt(6.9, 0, -20.6),
        mt(-7.6, 0, -17.4),
        mt(-8.3, 0, -14.3),
        mt(9.6, 0, -21.9),
        mt(-13.2, 0, -14.4),
        mt(-11.6, 0, -18.6),
        mt(0, 0, -25.8),
        mt(-12.4, 0, -25.8),
        mt(21.4, 0, -4.7),
        mt(25.3, 0, 3.9),
        mt(25.7, 0, -4.4),
        mt(20.2, 0, -15.4),
        mt(26.4, 0, -15.4),
        mt(20.6, 0, 14.4),
        mt(26.8, 0, 14.4),
        mt(20.6, 0, 21.2),
        mt(27.4, 0, 22.4),
        mt(19.6, 0, -21.4),
        mt(27, 0, -16.2),
        mt(25.6, 0, 6),
        mt(13.5, 2.59, 12.4),
        mt(4.4, 2.59, 12.4),
        mt(12.9, 0, 8.8),
        mt(11.6, 0, 4.9),
      ],
      M = i.physics.nav,
      E = (z) => {
        if (!(!M || !M.isWalkable || z.y > 0.2 || M.isWalkable(z.x, z.z)))
          for (let H of [0.5, 1, 1.5, 2])
            for (let O = 0; O < 8; O++) {
              let q = z.x + Math.cos(O * 0.7854) * H,
                U = z.z + Math.sin(O * 0.7854) * H;
              if (M.isWalkable(q, U)) {
                ((z.x = q), (z.z = U));
                return;
              }
            }
      };
    (_.forEach(E),
      y.forEach((z) => {
        z.type === "ground" && E(z.pos);
      }));
    let w = !1;
    return {
      root: e,
      playerStart: d,
      objectives: v,
      extraction: { pos: s.extraction.clone(), radius: 2.5 },
      enemySpawns: y,
      zones: b,
      interiorBoxes: m,
      cinematicPath: A,
      coverPoints: _,
      skylights: n.skylights,
      shedLights: n.lights,
      vantage: { stairsFoot: mt(-2.2, 0, 12.4), roof: mt(13.5, 2.59, 12.4) },
      stats: {
        labelsAtlased: h.count,
        containers: t.placed.filter((z) => z.name.startsWith("container"))
          .length,
        props: t.placed.length,
        tris: Math.round(p),
        meshes: f.children.length + pR(t.dynRoot),
      },
      placed: t.placed,
      groundSurfaceAt(z, H) {
        return t.isMetal(z, H) ? "metal" : "concrete";
      },
      update(z) {
        (n.update(z), h.update(z));
        for (let H = 0; H < t.updaters.length; H++)
          try {
            t.updaters[H](z);
          } catch (O) {
            w || ((w = !0), console.error("[level] prop update threw", O));
          }
      },
    };
  }

function dR(i, e) {
    for (; i && i !== e; ) {
      if (i.userData && i.userData.noMerge) return !0;
      i = i.parent;
    }
    return !1;
  }

function pR(i) {
    let e = 0;
    return (
      i.traverse((t) => {
        t.isMesh && e++;
      }),
      e
    );
  }

async function mR(i) {
    let e = await C1(i);
    return {
      cam: [-32, 1.7, 6],
      target: [0, 2.4, 6.4],
      update: (t) => e.update(t),
    };
  }

var mv = {};

br(mv, { create: () => pv, showcase: () => MR });

var _t = (i, e, t) => new W(i, e, t),
    al = (i) => (i.isVector3 ? i : new W(i[0], i[1], i[2])),
    hb = new W(0, 1, 0),
    gR = new W(1, 1, 1),
    ub = new Lt(),
    I1 = new Ye();

function t0(i, e, t) {
    let n =
      Math.imul(i, 374761393) ^
      Math.imul(e, 668265263) ^
      Math.imul(t, 1274126177);
    return (
      (n = Math.imul(n ^ (n >>> 13), 1274126177)),
      ((n ^ (n >>> 16)) >>> 0) / 4294967295
    );
  }

function rl(i, e, t) {
    let n = Math.floor(i),
      s = Math.floor(e),
      o = Math.floor(t),
      r = i - n,
      a = e - s,
      l = t - o;
    ((r = r * r * (3 - 2 * r)),
      (a = a * a * (3 - 2 * a)),
      (l = l * l * (3 - 2 * l)));
    let c = (u, h, f) => u + (h - u) * f;
    return c(
      c(
        c(t0(n, s, o), t0(n + 1, s, o), r),
        c(t0(n, s + 1, o), t0(n + 1, s + 1, o), r),
        a,
      ),
      c(
        c(t0(n, s, o + 1), t0(n + 1, s, o + 1), r),
        c(t0(n, s + 1, o + 1), t0(n + 1, s + 1, o + 1), r),
        a,
      ),
      l,
    );
  }

function uv(i) {
    let e = i >>> 0;
    return () => (
      (e = (Math.imul(e, 1664525) + 1013904223) >>> 0),
      e / 4294967296
    );
  }

var P1 = [1, 1, 1],
    fb = [1, 1, 1];

function hv(i, e, t, n = fb, s = 1) {
    let o = rl(i * 0.31 + 11.3, e * 0.23 + 5.1, t * 0.31 + 3.7),
      r = rl(i * 1.7 + 40.2, 9.5, t * 1.7 + 17.9),
      a = 1 - s * (0.3 - 0.36 * o),
      l = n[0] * a,
      c = n[1] * a,
      u = n[2] * a;
    if (r > 0.68) {
      let h =
        Math.min(1, (r - 0.68) / 0.3) *
        0.6 *
        s *
        (0.35 + 0.65 * rl(i * 0.9, e * 0.45, t * 0.9));
      ((l *= 1 + 0.45 * h), (c *= 1 - 0.3 * h), (u *= 1 - 0.6 * h));
    }
    return ((P1[0] = l), (P1[1] = c), (P1[2] = u), P1);
  }

var db = new WeakSet();

function so(i, e, t = {}) {
    let n = i.mats.get(e, { vertexColors: !0, ...t });
    return (db.add(n), n);
  }

var io = class {
    constructor() {
      ((this.b = new Map()),
        (this.tris = 0),
        (this.remap = null),
        (this.dz = 0),
        (this.minSize = 0));
    }
    add(e, t, n) {
      if (!t) return;
      if (Array.isArray(t)) {
        for (let o of t) this.add(e, o, n);
        return;
      }
      if (this.remap) {
        let o = this.remap(e, n);
        if (!o) return;
        if (this.minSize) {
          t.computeBoundingBox();
          let r = t.boundingBox;
          if (
            Math.max(r.max.x - r.min.x, r.max.y - r.min.y, r.max.z - r.min.z) <
            this.minSize
          )
            return;
        }
        ((e = o[0]), (n = o[1]), this.dz && t.translate(0, 0, this.dz));
      }
      db.has(e) &&
        !t.attributes.color &&
        Lc(t, (o, r, a) => hv(o, r, a, n || fb));
      let s = this.b.get(e.uuid);
      (s || ((s = { mat: e, geos: [] }), this.b.set(e.uuid, s)),
        s.geos.push(t),
        (this.tris +=
          (t.index ? t.index.count : t.attributes.position.count) / 3));
    }
    build({ cast: e = !0, recv: t = !0 } = {}) {
      let n = new wt();
      for (let s of this.b.values()) {
        let o = Ii(s.geos),
          r = new Qe(o, s.mat),
          a = s.mat.isMeshBasicMaterial || s.mat.transparent;
        ((r.castShadow = e && !a), (r.receiveShadow = t && !a), n.add(r));
      }
      return (this.b.clear(), n);
    }
  };

function Ee(i, e, t, n, s, o, r = 0) {
    let a = Math.abs(n - i),
      l = Math.abs(s - e),
      c = Math.abs(o - t),
      u = r > 0 ? Wi(a, l, c, r) : $e(a, l, c);
    return (u.translate((i + n) / 2, (e + s) / 2, (t + o) / 2), u);
  }

function xt(i, e, t, n, s, o, r, a = 12, l = !1) {
    let c = ot(i, e, t, a, l);
    return (
      n === "x" ? c.rotateZ(Math.PI / 2) : n === "z" && c.rotateX(Math.PI / 2),
      c.translate(s, o, r),
      c
    );
  }

function Ke(i, e, t = 0.03, n = 5, s = !1) {
    ((i = al(i)), (e = al(e)));
    let o = new W().subVectors(e, i),
      r = o.length();
    if (r < 1e-5) return null;
    let a = ot(t, t, r, n, !s);
    return (
      ub.setFromUnitVectors(hb, o.multiplyScalar(1 / r)),
      I1.compose(new W().addVectors(i, e).multiplyScalar(0.5), ub, gR),
      a.applyMatrix4(I1),
      a
    );
  }

function jt(i, e, t = 0.3, n = 0.3, s = 0) {
    ((i = al(i)), (e = al(e)));
    let o = new W().subVectors(e, i),
      r = o.length();
    o.multiplyScalar(1 / r);
    let a = new W().crossVectors(o, hb);
    a.lengthSq() < 1e-6 ? a.set(1, 0, 0) : a.normalize();
    let l = new W().crossVectors(a, o),
      c = s > 0 ? Wi(t, r, n, s) : $e(t, r, n);
    return (
      I1.makeBasis(a, o, l).setPosition(
        (i.x + e.x) / 2,
        (i.y + e.y) / 2,
        (i.z + e.z) / 2,
      ),
      c.applyMatrix4(I1),
      c
    );
  }

function kr(i, e = 0.03, t = 5) {
    let n = [];
    for (let s = 0; s < i.length - 1; s++) {
      let o = Ke(i[s], i[s + 1], e, t);
      o && n.push(o);
    }
    return n;
  }

function ua(i, e, t = 1, n = 10) {
    ((i = al(i)), (e = al(e)));
    let s = [];
    for (let o = 0; o <= n; o++) {
      let r = o / n,
        a = new W().lerpVectors(i, e, r);
      ((a.y -= t * 4 * r * (1 - r)), s.push(a));
    }
    return s;
  }

function ll(i, e, t, n, s, o = 0, r = 0) {
    let a = new rn(i, e);
    return (r && a.rotateX(r), o && a.rotateY(o), a.translate(t, n, s), a);
  }

function ns(
    i,
    e,
    t,
    { h: n = 1.1, post: s = 2.2, r: o = 0.022, tint: r, mid: a = !0 } = {},
  ) {
    t = t.map(al);
    for (let l = 0; l < t.length - 1; l++) {
      let c = t[l],
        u = t[l + 1],
        h = c.distanceTo(u),
        f = Math.max(1, Math.round(h / s));
      for (let p = l === 0 ? 0 : 1; p <= f; p++) {
        let d = new W().lerpVectors(c, u, p / f);
        i.add(e, Ke(d, _t(d.x, d.y + n, d.z), o, 4), r);
      }
      (i.add(
        e,
        Ke(_t(c.x, c.y + n, c.z), _t(u.x, u.y + n, u.z), o * 1.15, 5),
        r,
      ),
        a &&
          i.add(
            e,
            Ke(
              _t(c.x, c.y + n * 0.5, c.z),
              _t(u.x, u.y + n * 0.5, u.z),
              o * 0.9,
              4,
            ),
            r,
          ));
    }
  }

function pb() {
    let i = { value: 0 },
      e = new Nn({ vertexColors: !0, fog: !1 });
    ((e.onBeforeCompile = (n) => {
      ((n.uniforms.uTime = i),
        (n.vertexShader =
          `attribute vec3 blink;
uniform float uTime;
varying float vBlink;
` +
          n.vertexShader.replace(
            "#include <begin_vertex>",
            `#include <begin_vertex>
 float bph = fract(uTime / max(blink.x, 0.001) + blink.y);
 vBlink = blink.x <= 0.0 ? 1.0 : mix(0.02, 1.0, smoothstep(0.0, 0.06, bph) * (1.0 - smoothstep(blink.z, blink.z + 0.12, bph)));`,
          )),
        (n.fragmentShader =
          `varying float vBlink;
` +
          n.fragmentShader.replace(
            "#include <color_fragment>",
            `#include <color_fragment>
 diffuseColor.rgb *= vBlink;`,
          )));
    }),
      (e.customProgramCacheKey = () => "saltline-blink"));
    let t = [];
    return {
      uTime: i,
      mat: e,
      add(n, s, o = 0, r = 0, a = 0.5) {
        if (!n) return;
        let l = n.index ? n.toNonIndexed() : n,
          c = l.attributes.position.count,
          u = new Float32Array(c * 3),
          h = new Float32Array(c * 3);
        for (let p = 0; p < c; p++)
          ((u[p * 3] = s[0]),
            (u[p * 3 + 1] = s[1]),
            (u[p * 3 + 2] = s[2]),
            (h[p * 3] = o),
            (h[p * 3 + 1] = r),
            (h[p * 3 + 2] = a));
        let f = new nt();
        (f.setAttribute("position", l.attributes.position),
          f.setAttribute("color", new et(u, 3)),
          f.setAttribute("blink", new et(h, 3)),
          t.push(f));
      },
      build() {
        if (!t.length) return null;
        let n = new Qe(sa(t.splice(0), !1), e);
        return ((n.castShadow = !1), (n.receiveShadow = !1), n);
      },
    };
  }

var Bn = (i, e, t, n = 0.12) => {
    let s = new Na(n, 0);
    return (s.translate(i, e, t), s);
  };

var Bt = 18.5,
    is = 28.5,
    Di = 5.4,
    fv = 21.2,
    ai = 22.8,
    On = 1.8,
    wo = 12,
    Xi = 62,
    ks = 41,
    wn = [0.82, 0.95, 1.12],
    Ms = [0.6, 0.72, 0.86],
    En = [1, 0.95, 0.85],
    cl = [0.95, 0.96, 0.97];

function z1(i, e, t = {}) {
    let n = !!t.into,
      s = t.dz || 0,
      o = t.into || new io(),
      r = n
        ? {
            add(R, I, se, ae, k) {
              (R.translate(0, 0, s), e.add(R, I, se, ae, k));
            },
          }
        : e,
      a = so(i, "paint_grey"),
      l = so(i, "paint_yellow"),
      c = so(i, "paint_white"),
      u = so(i, "paint_red"),
      h = i.mats.get("steel_galv"),
      f = i.mats.get("steel_dark"),
      p = i.mats.get("hazard_stripes"),
      d = i.mats.get("glass"),
      v = i.mats.emissive(16769716, 6),
      g = (R, I, se) => o.add(R, I, se),
      x = [];
    if (n) {
      let R = new Map([
          [a.uuid, [0.2, 0.25, 0.31]],
          [l.uuid, [0.72, 0.52, 0.12]],
          [c.uuid, [0.78, 0.78, 0.76]],
          [u.uuid, [0.5, 0.14, 0.1]],
          [h.uuid, [0.5, 0.52, 0.54]],
          [f.uuid, [0.1, 0.1, 0.11]],
          [p.uuid, [0.7, 0.5, 0.1]],
        ]),
        I = t.mat;
      ((o.remap = (se, ae) => {
        let k = R.get(se.uuid);
        return k
          ? [I, ae ? [k[0] * ae[0], k[1] * ae[1], k[2] * ae[2]] : k]
          : null;
      }),
        (o.dz = s),
        (o.minSize = 2.6));
    }
    function y(R, I) {
      let se = R < 23.5 ? 1 : -1;
      for (let ae of [-1.12, 1.12]) {
        let k = I + ae;
        g(l, Ee(R - 0.3, 0.36, k - 0.98, R + 0.3, 0.84, k + 0.98, 0.04), En);
        for (let ce of [-0.56, 0.56])
          (g(f, xt(0.33, 0.33, 0.14, "x", R, 0.33, k + ce, 16)),
            g(f, xt(0.37, 0.37, 0.025, "x", R - 0.085, 0.33, k + ce, 16)),
            g(f, xt(0.37, 0.37, 0.025, "x", R + 0.085, 0.33, k + ce, 16)),
            g(h, xt(0.11, 0.11, 0.7, "x", R, 0.33, k + ce, 8)));
        (g(f, xt(0.16, 0.16, 0.5, "z", R + se * 0.5, 0.6, k, 10)),
          g(
            l,
            Ee(
              R + se * 0.3,
              0.42,
              k - 0.56 - 0.16,
              R + se * 0.62,
              0.8,
              k - 0.3,
              0.03,
            ),
            En,
          ));
      }
      (g(f, Ee(R - 0.2, 0.1, I - 0.22, R + 0.2, 0.9, I + 0.22, 0.03)),
        g(a, Ee(R - 0.34, 0.9, I - 1.8, R + 0.34, 1.42, I + 1.8, 0.05), wn));
      for (let ae of [-1.12, 0, 1.12])
        g(h, xt(0.14, 0.14, 0.8, "x", R, ae ? 1.08 : 1.22, I + ae, 10));
      g(a, Ee(R - 0.54, 1.42, I - 0.54, R + 0.54, 1.6, I + 0.54, 0.03), Ms);
      for (let ae of [-1, 1]) {
        let k = I + ae * 2.1;
        (g(l, Ee(R - 0.16, 0.44, k - 0.12, R + 0.16, 0.8, k + 0.12, 0.02), En),
          g(h, xt(0.08, 0.08, 0.34, "z", R, 0.62, k + ae * 0.28, 8)),
          g(f, xt(0.17, 0.15, 0.12, "z", R, 0.62, k + ae * 0.5, 12)),
          g(
            p,
            Ee(R - 0.28, 0.04, k + ae * 0.13, R + 0.28, 0.4, k + ae * 0.16),
          ));
      }
      (x.push({ min: [R - 0.5, 0, I - 2.7], max: [R + 0.5, 1.5, I + 2.7] }),
        x.push({
          min: [R - 0.62, 0, I - 0.62],
          max: [R + 0.62, 24, I + 0.62],
        }));
    }
    let b = [3.6, 7.6, 11.2, 12.5, 13.5, 17.2, 20.6, 23.8];
    for (let R of [Bt, is])
      for (let I of [-Di, Di]) {
        (y(R, I), g(p, Ee(R - 0.6, 1.6, I - 0.6, R + 0.6, 3.6, I + 0.6, 0.04)));
        for (let se = 0; se < b.length - 1; se++)
          (g(
            a,
            Ee(R - 0.6, b[se], I - 0.6, R + 0.6, b[se + 1], I + 0.6, 0.05),
            wn,
          ),
            (se === 0 || se === 1 || se === 5) &&
              g(
                a,
                Ee(
                  R - 0.64,
                  b[se] - 0.05,
                  I - 0.64,
                  R + 0.64,
                  b[se] + 0.05,
                  I + 0.64,
                ),
                Ms,
              ));
      }
    let m = i.mats.decal("hazard_voltage");
    for (let R of [-Di, Di]) {
      let I = Bt - 0.6;
      (g(
        c,
        Ee(I - 0.035, 1.72, R - 0.36, I, 3.48, R + 0.36, 0.012),
        [0.62, 0.66, 0.7],
      ),
        g(f, Ee(I - 0.05, 1.66, R - 0.42, I - 0.005, 1.72, R + 0.42)),
        g(f, Ee(I - 0.05, 3.48, R - 0.42, I - 0.005, 3.54, R + 0.42)),
        g(f, Ee(I - 0.05, 1.66, R - 0.42, I - 0.005, 3.54, R - 0.36)),
        g(f, Ee(I - 0.05, 1.66, R + 0.36, I - 0.005, 3.54, R + 0.42)),
        g(
          h,
          Ke([I - 0.08, 2.45, R + 0.26], [I - 0.08, 2.75, R + 0.26], 0.014, 5),
        ));
      for (let se of [2, 3.2])
        g(f, Ee(I - 0.06, se - 0.07, R - 0.37, I - 0.03, se + 0.07, R - 0.33));
      (g(h, Ee(I - 0.3, 1.5, R - 0.4, I, 1.56, R + 0.4)),
        g(h, Ee(I - 0.3, 1, R - 0.4, I - 0.02, 1.05, R + 0.4)),
        g(m.material, ll(0.3, 0.3, I - 0.04, 3.1, R, -Math.PI / 2)));
    }
    for (let R of [Bt, is]) {
      g(a, Ee(R - 0.45, 3.6, -Di + 0.6, R + 0.45, 4.6, Di - 0.6, 0.05), wn);
      for (let I of [-2.4, 0, 2.4])
        g(a, Ee(R - 0.48, 3.58, I - 0.03, R + 0.48, 4.62, I + 0.03), Ms);
    }
    (g(l, xt(1.15, 1.15, 0.06, "x", Bt - 0.62, 5.85, -2.2, 24), En),
      g(l, xt(1.15, 1.15, 0.06, "x", Bt - 1.02, 5.85, -2.2, 24), En),
      g(f, xt(0.7, 0.7, 0.36, "x", Bt - 0.82, 5.85, -2.2, 20)),
      g(h, xt(0.12, 0.12, 0.9, "x", Bt - 0.6, 5.85, -2.2, 8)),
      g(a, Ee(Bt - 0.5, 4.6, -2.5, Bt + 0.3, 5.9, -1.9, 0.03), Ms),
      g(
        f,
        Ke(
          [Bt - 0.82, 4.75, -2.2 + 1],
          [Bt - 0.82, 0.02, -1.2 + 0.3],
          0.035,
          6,
        ),
      ),
      g(h, Ee(Bt - 1, 0, -1.15, Bt - 0.64, 0.5, -0.65, 0.02)),
      x.push({ min: [Bt - 1, 0, -1.15], max: [Bt - 0.64, 0.5, -0.65] }),
      g(c, Ee(Bt - 0.42, 4.6, 1, Bt + 0.42, 6.3, 3.6, 0.03), cl));
    for (let R of [1.65, 2.3, 2.95])
      g(f, Ee(Bt - 0.44, 4.7, R - 0.01, Bt - 0.42, 6.2, R + 0.01));
    g(h, Ee(Bt - 0.47, 5.6, 1.2, Bt - 0.42, 6.1, 1.55));
    for (let R of [-Di, Di]) {
      g(a, Ee(Bt + 0.6, 12.5, R - 0.45, is - 0.6, 13.5, R + 0.45, 0.05), wn);
      for (let se of [21, 23.5, 26])
        g(a, Ee(se - 0.03, 12.48, R - 0.48, se + 0.03, 13.52, R + 0.48), Ms);
      let I = Math.sign(R);
      (g(a, jt([Bt + 0.5, 9.6, R], [Bt + 3.4, 12.6, R], 0.4, 0.4, 0.03), wn),
        g(a, jt([is - 0.5, 9.6, R], [is - 3.4, 12.6, R], 0.4, 0.4, 0.03), wn));
      for (let se of [Bt, is])
        g(
          a,
          jt([se, 9.6, R - I * 0.5], [se, 12.6, R - I * 3.4], 0.4, 0.4, 0.03),
          wn,
        );
      (g(a, Ke([is - 0.4, 13.7, R], [Bt + 0.4, 22.7, R], 0.2, 10), wn),
        g(a, Ke([Bt + 0.4, 13.7, R], [is - 0.4, 22.7, R], 0.2, 10), wn),
        g(
          a,
          Ee(23.5 - 0.5, 17.7, R - 0.24, 23.5 + 0.5, 18.7, R + 0.24, 0.03),
          Ms,
        ),
        g(
          a,
          Ee(Bt + 0.6, 22.95, R - 0.35, is - 0.6, 23.7, R + 0.35, 0.04),
          wn,
        ));
    }
    for (let R of [Bt, is]) {
      (g(a, Ee(R - 0.45, 12.5, -Di + 0.6, R + 0.45, 13.5, Di - 0.6, 0.05), wn),
        g(
          a,
          Ee(R - 0.45, 22.8, -Di + 0.6, R + 0.45, 23.8, Di - 0.6, 0.05),
          wn,
        ));
      for (let I of [-1, 1])
        g(
          a,
          jt(
            [R, 20.2, I * (Di - 0.5)],
            [R, 22.8, I * (On + 1.2)],
            0.36,
            0.36,
            0.03,
          ),
          wn,
        );
    }
    (g(h, Ee(Bt + 0.9, 13.5, 4.05, is - 0.9, 13.55, 4.95)),
      ns(
        o,
        l,
        [
          [Bt + 0.9, 13.55, 4.08],
          [is - 0.9, 13.55, 4.08],
        ],
        { tint: En },
      ),
      g(h, Ee(Bt + 0.45, 13.45, -4.6, Bt + 1.25, 13.5, 4.05)),
      ns(
        o,
        l,
        [
          [Bt + 1.22, 13.5, -4.6],
          [Bt + 1.22, 13.5, 4.05],
        ],
        { tint: En },
      ));
    let A = is + 1.3;
    for (let R of [-1, 1]) {
      let I = R * On,
        se = [
          wo,
          15.4,
          Bt,
          22,
          25.2,
          is,
          A - 0.15,
          A + 0.15,
          34.6,
          39.2,
          43.8,
          48.4,
          53,
          57.6,
          Xi,
        ];
      for (let ce = 0; ce < se.length - 1; ce++)
        ce !== 6 &&
          (g(a, Ee(se[ce], fv, I - 0.45, se[ce + 1], ai, I + 0.45, 0.05), wn),
          ce > 0 &&
            ce !== 7 &&
            g(
              a,
              Ee(
                se[ce] - 0.035,
                fv - 0.05,
                I - 0.5,
                se[ce] + 0.035,
                ai + 0.05,
                I + 0.5,
              ),
              Ms,
            ));
      (g(
        a,
        Ee(A - 0.7, ai - 0.1, I - 0.52, A + 0.7, ai + 0.55, I - 0.4, 0.03),
        Ms,
      ),
        g(
          a,
          Ee(A - 0.7, ai - 0.1, I + 0.4, A + 0.7, ai + 0.55, I + 0.52, 0.03),
          Ms,
        ),
        g(h, xt(0.16, 0.16, 1.2, "z", A, ai + 0.22, I, 12)),
        g(
          f,
          Ee(
            wo + 0.3,
            ai,
            I - R * 0.32 - 0.05,
            Xi - 0.3,
            ai + 0.09,
            I - R * 0.32 + 0.05,
          ),
        ));
      let ae = I + R * 0.45,
        k = I + R * 1.35;
      g(
        h,
        Ee(wo + 0.2, 21.86, Math.min(ae, k), Xi - 0.2, 21.9, Math.max(ae, k)),
      );
      for (let ce = wo + 0.6; ce < Xi; ce += 2.45)
        (g(a, jt([ce, 21.84, ae], [ce, 21.3, ae], 0.07, 0.07), Ms),
          g(a, jt([ce, 21.82, k], [ce, 21.36, ae], 0.06, 0.08), Ms));
      (ns(
        o,
        l,
        [
          [wo + 0.2, 21.9, k - R * 0.03],
          [Xi - 0.2, 21.9, k - R * 0.03],
        ],
        { post: 2.45, tint: En },
      ),
        g(
          l,
          Ee(
            wo + 0.2,
            21.9,
            k - R * 0.03 - 0.008,
            Xi - 0.2,
            22.02,
            k - R * 0.03 + 0.008,
          ),
          En,
        ));
      for (let ce of [44, 58])
        g(
          a,
          Ee(ce - 0.18, ai, I - 0.2, ce + 0.18, ai + 1.5, I + 0.2, 0.03),
          wn,
        );
    }
    for (let R of [44, 58])
      g(
        a,
        Ee(R - 0.2, ai + 1.2, -On - 0.3, R + 0.2, ai + 1.6, On + 0.3, 0.04),
        wn,
      );
    for (let R of [wo + 0.25, Xi - 0.25]) {
      g(
        a,
        Ee(R - 0.25, fv + 0.1, -On + 0.45, R + 0.25, ai - 0.1, On - 0.45, 0.05),
        wn,
      );
      let I = R < 30 ? 1 : -1;
      for (let se of [-0.8, 0.8])
        g(f, xt(0.14, 0.14, 0.4, "x", R + I * 0.45, 22, se, 10));
    }
    (g(h, Ee(Xi - 0.1, 21.86, -On - 1.35, Xi + 0.9, 21.9, On + 1.35)),
      ns(
        o,
        l,
        [
          [Xi - 0.1, 21.9, -On - 1.32],
          [Xi + 0.87, 21.9, -On - 1.32],
          [Xi + 0.87, 21.9, On + 1.32],
          [Xi - 0.1, 21.9, On + 1.32],
        ],
        { post: 1.4, tint: En },
      ),
      g(h, Ke([Xi + 0.6, 21.9, 0], [Xi + 0.6, 25.2, 0], 0.035, 6)),
      g(h, Ke([Xi + 0.6, 24.8, -0.45], [Xi + 0.6, 24.8, 0.45], 0.015, 4)),
      r.add(Bn(Xi + 0.6, 25.32, 0, 0.13), [9, 0.5, 0.25], 2.6, 0.5, 0.45),
      g(f, xt(0.1, 0.12, 0.1, "y", Xi + 0.6, 25.2, 0, 8)));
    let _ = 27.6,
      M = 30,
      E = 1.5;
    for (let R of [-1, 1]) {
      (g(a, jt([is, 23.8, R * Di], [_, M, R * E], 0.55, 0.55, 0.04), wn),
        g(a, jt([Bt, 23.8, R * Di], [_, M, R * E], 0.5, 0.5, 0.04), wn));
      for (let [I, se] of [
        [44, 0.1],
        [58, 0.1],
      ]) {
        let ae = _t(_ + 0.3, M, R * E),
          k = _t(I, ai + 1.45, R * On);
        g(a, Ke(ae, k, se, 8), wn);
        let ce = ae.clone().lerp(k, 0.5);
        g(
          a,
          Ee(
            ce.x - 0.3,
            ce.y - 0.16,
            ce.z - 0.14,
            ce.x + 0.3,
            ce.y + 0.16,
            ce.z + 0.14,
            0.03,
          ),
          Ms,
        );
      }
      (g(f, Ke([_ + 0.2, M + 0.35, R * 0.9], [50, ai + 0.2, R * 1], 0.022, 5)),
        g(f, xt(0.5, 0.5, 0.18, "z", _, M + 0.25, R * 0.9, 16)));
    }
    g(
      a,
      Ee(_ - 0.45, M - 0.35, -E - 0.5, _ + 0.45, M + 0.3, E + 0.5, 0.05),
      wn,
    );
    {
      let R = (k, ce) =>
          _t(
            is + (_ - is) * k,
            23.8 + (M - 23.8) * k,
            ce * (Di + (E - Di) * k),
          ),
        I = (k, ce) =>
          _t(
            Bt + (_ - Bt) * k,
            23.8 + (M - 23.8) * k,
            ce * (Di + (E - Di) * k),
          );
      (g(a, jt(R(0.5, -1), R(0.5, 1), 0.3, 0.3, 0.02), wn),
        g(a, jt(I(0.55, -1), I(0.55, 1), 0.3, 0.3, 0.02), wn),
        g(a, Ke(I(0.55, -1), R(0.5, -1), 0.09, 6), wn),
        g(a, Ke(I(0.55, 1), R(0.5, 1), 0.09, 6), wn));
      let se = R(0.02, 1),
        ae = R(0.97, 1);
      for (let k of [-0.22, 0.22])
        g(
          h,
          Ke(
            [se.x - 0.42, se.y, se.z + k],
            [ae.x - 0.42, ae.y, ae.z + k],
            0.02,
            4,
          ),
        );
      for (let k = 0.03; k < 1; k += 0.045) {
        let ce = se.clone().lerp(ae, k);
        g(
          h,
          Ke(
            [ce.x - 0.42, ce.y, ce.z - 0.22],
            [ce.x - 0.42, ce.y, ce.z + 0.22],
            0.012,
            4,
          ),
        );
      }
    }
    g(a, Ee(wo + 0.05, ai, -3.6, wo + 0.55, ai + 0.4, 3.6, 0.04), wn);
    for (let R of [-1, 1])
      (g(
        a,
        Ee(
          wo + 0.08,
          ai + 0.4,
          R * 3.3 - 0.2,
          wo + 0.52,
          ai + 1,
          R * 3.3 + 0.2,
          0.03,
        ),
        Ms,
      ),
        g(
          a,
          Ke([_ - 0.3, M, R * E], [wo + 0.3, ai + 0.8, R * 3.3], 0.1, 8),
          wn,
        ),
        g(h, xt(0.12, 0.12, 0.6, "z", wo + 0.3, ai + 0.8, R * 3.3, 10)));
    (g(h, Ee(_ - 1, M + 0.3, -E - 0.6, _ + 1, M + 0.34, E + 0.6)),
      ns(
        o,
        l,
        [
          [_ - 0.98, M + 0.34, -E - 0.58],
          [_ + 0.98, M + 0.34, -E - 0.58],
          [_ + 0.98, M + 0.34, E + 0.58],
          [_ - 0.98, M + 0.34, E + 0.58],
          [_ - 0.98, M + 0.34, -E - 0.58],
        ],
        { post: 1.2, tint: En },
      ),
      g(h, Ke([_, M + 0.34, 0], [_, M + 2, 0], 0.045, 6)),
      g(h, Ke([_, M + 2, 0], [_, M + 3.6, 0], 0.016, 4)),
      g(h, Ke([_ - 0.5, M + 1.5, 0], [_ + 0.5, M + 1.5, 0], 0.018, 4)));
    for (let R of [-0.5, 0.5])
      (g(f, xt(0.1, 0.12, 0.1, "y", _ + R, M + 1.56, 0, 8)),
        r.add(Bn(_ + R, M + 1.72, 0, 0.15), [10, 0.5, 0.25], 2.6, 0, 0.45));
    let w = 20.4,
      S = 27.9,
      z = ai,
      H = 26,
      O = 2.9;
    (g(c, Ee(w, z, -O, S, H, O, 0.06), cl),
      g(
        a,
        Ee(w - 0.15, z - 0.12, -O - 0.15, S + 0.15, z + 0.1, O + 0.15, 0.03),
        Ms,
      ),
      g(h, Ee(w - 0.2, H, -O - 0.2, S + 0.2, H + 0.12, O + 0.2, 0.03)));
    for (let R = w + 1.3; R < S; R += 1.3)
      for (let I of [-1, 1])
        g(
          c,
          Ee(R - 0.02, z + 0.1, I * O - 0.015, R + 0.02, H, I * O + 0.015),
          [0.7, 0.72, 0.74],
        );
    function q(R, I, se, ae, k, ce) {
      let ve = [Ee(-ae / 2, -k / 2, 0, ae / 2, k / 2, 0.02)],
        _e = Math.round(k / 0.12);
      for (let Te = 0; Te < _e; Te++) {
        let Pe = Ee(-ae / 2 + 0.03, -0.012, 0, ae / 2 - 0.03, 0.012, 0.11);
        (Pe.rotateX(0.7),
          Pe.translate(0, -k / 2 + (Te + 0.5) * (k / _e), 0.03),
          ve.push(Pe));
      }
      for (let Te of ve) (Te.rotateY(ce), Te.translate(R, I, se));
      (g(f, ve.shift()), g(h, ve));
    }
    for (let R of [-1, 1])
      for (let I of [w + 1.4, w + 3.9, w + 6.1])
        q(I, 24.5, R * (O + 0.005), 1.5, 1.3, R > 0 ? 0 : Math.PI);
    (q(w - 0.005, 23.75, -1.9, 1.4, 1.1, -Math.PI / 2),
      g(
        c,
        Ee(w - 0.03, z + 0.15, 0.8, w, z + 2.15, 1.7, 0.01),
        [0.6, 0.64, 0.68],
      ),
      g(h, Ke([w - 0.06, z + 1, 1.55], [w - 0.06, z + 1.3, 1.55], 0.014, 5)),
      g(h, Ee(w - 0.9, z + 0.05, 0.3, w, z + 0.1, 2.2)),
      ns(
        o,
        l,
        [
          [w, z + 0.1, 0.32],
          [w - 0.88, z + 0.1, 0.32],
          [w - 0.88, z + 0.1, 2.18],
          [w, z + 0.1, 2.18],
        ],
        { post: 1, tint: En },
      ));
    let U = i.mats.decal("logo_a");
    (g(
      U.material,
      ll(
        1.1 * Math.min(3, U.aspect || 1),
        1.1,
        w - 0.012,
        25.2,
        0,
        -Math.PI / 2,
      ),
    ),
      ns(
        o,
        l,
        [
          [w, H + 0.12, -O],
          [S, H + 0.12, -O],
          [S, H + 0.12, O],
          [w, H + 0.12, O],
          [w, H + 0.12, -O],
        ],
        { post: 1.95, tint: En },
      ));
    for (let R of [w + 1.9, w + 5.6])
      (g(h, xt(0.28, 0.28, 0.5, "y", R, H + 0.37, -1.2, 10)),
        g(h, xt(0.1, 0.5, 0.22, "y", R, H + 0.72, -1.2, 10)));
    (g(f, xt(0.13, 0.13, 1.6, "y", w + 3.7, H + 0.9, 1.9, 8)),
      g(f, xt(0.2, 0.14, 0.2, "y", w + 3.7, H + 1.75, 1.9, 8)),
      g(
        c,
        Ee(w + 5.4, H + 0.12, 0.4, w + 6.7, H + 0.85, 1.8, 0.03),
        [0.7, 0.72, 0.75],
      ),
      g(h, Ke([w + 0.3, H + 0.12, 2.5], [w + 0.3, H + 1.9, 2.5], 0.03, 5)),
      r.add(Bn(w + 0.3, H + 2.02, 2.5, 0.13), [9, 0.5, 0.25], 2.6, 0.25, 0.45));
    let T = 6.15,
      D = 6.97,
      C = 7.8,
      G = [19.4, 20.6],
      j = [26.4, 27.6];
    function N(R, I, se, ae, k, ce) {
      let ve = ae - I,
        _e = Math.max(2, Math.round(ve / 0.21));
      for (let Te of [k + 0.03, ce - 0.03]) {
        (g(h, jt([R, I - 0.12, Te], [se, ae - 0.12, Te], 0.05, 0.24)),
          g(l, Ke([R, I + 1, Te], [se, ae + 1, Te], 0.024, 5), En),
          g(l, Ke([R, I + 0.5, Te], [se, ae + 0.5, Te], 0.018, 4), En));
        for (let Pe = 0; Pe <= 4; Pe++) {
          let Re = Pe / 4,
            Fe = R + (se - R) * Re,
            ze = I + ve * Re;
          g(l, Ke([Fe, ze - 0.05, Te], [Fe, ze + 1, Te], 0.02, 4), En);
        }
      }
      for (let Te = 1; Te <= _e; Te++) {
        let Pe = (Te - 0.5) / _e,
          Re = R + (se - R) * Pe,
          Fe = I + ve * (Te / _e);
        g(h, Ee(Re - 0.13, Fe - 0.03, k + 0.06, Re + 0.13, Fe, ce - 0.06));
      }
    }
    function Q(R, I, se, ae) {
      (g(h, Ee(R, se - 0.05, T, I, se, C)),
        g(h, Ee(R, se - 0.2, T, I, se - 0.05, T + 0.06)),
        g(h, Ee(R, se - 0.2, C - 0.06, I, se - 0.05, C)));
      let k = ae > 0 ? I - 0.03 : R + 0.03,
        ce = ae > 0 ? R : I;
      ns(
        o,
        l,
        [
          [ce, se, C - 0.03],
          [k, se, C - 0.03],
          [k, se, T + 0.03],
        ],
        { post: 0.9, tint: En },
      );
    }
    let K = [3.6, 6.9, 10.2, 13.5, 16.8, 20.1];
    for (let R = 0; R < 5; R++)
      R % 2 === 0
        ? (Q(G[0], G[1], K[R], -1), N(G[1], K[R], j[0], K[R + 1], T, D))
        : (Q(j[0], j[1], K[R], 1), N(j[0], K[R], G[1], K[R + 1], D, C));
    (Q(j[0], j[1], K[5], 1),
      N(j[0], K[5], 23.4, 21.9, D, C),
      g(h, Ee(22.5, 21.85, On + 1.35, 23.4, 21.9, C)),
      ns(
        o,
        l,
        [
          [22.53, 21.9, On + 1.4],
          [22.53, 21.9, C - 0.03],
          [23.37, 21.9, C - 0.03],
        ],
        { post: 1.3, tint: En },
      ),
      ns(
        o,
        l,
        [
          [23.37, 21.9, On + 1.4],
          [23.37, 21.9, D],
        ],
        { post: 1.3, tint: En },
      ),
      g(h, Ee(j[0], 13.45, 4.95, j[1], 13.5, T)));
    for (let R of [G[0], j[1]])
      for (let I of [T - 0.05, C + 0.05])
        g(a, Ee(R - 0.07, 3.3, I - 0.07, R + 0.07, 21.4, I + 0.07), wn);
    for (let R = 0; R < K.length; R++) {
      let I = K[R] - 0.25;
      g(a, Ee(G[0], I - 0.06, C + 0, j[1], I + 0.06, C + 0.1), Ms);
      for (let se of [G[0], j[1]])
        g(a, Ee(se - 0.05, I - 0.06, 5.9, se + 0.05, I + 0.06, C + 0.1), Ms);
      if (R < K.length - 1) {
        let se = K[R + 1] - 0.25;
        (g(a, Ke([G[0], I, C + 0.05], [j[1], se, C + 0.05], 0.03, 5), wn),
          g(a, Ke([j[1], I, C + 0.05], [G[0], se, C + 0.05], 0.03, 5), wn));
      }
    }
    {
      let R = G[0] - 0.05,
        I = 7.35;
      for (let ae of [-0.22, 0.22])
        g(h, Ke([R, 0.05, I + ae], [R, 4.75, I + ae], 0.022, 5));
      for (let ae = 0.3; ae < 4.7; ae += 0.3)
        g(h, Ke([R, ae, I - 0.22], [R, ae, I + 0.22], 0.012, 4));
      let se = (ae) => {
        let k = [];
        for (let ce = 0; ce <= 8; ce++) {
          let ve = (Math.PI * ce) / 8;
          k.push(_t(R - Math.sin(ve) * 0.7, ae, I - Math.cos(ve) * 0.36));
        }
        return k;
      };
      for (let ae = 2.3; ae <= 4.75; ae += 0.6) g(h, kr(se(ae), 0.012, 4));
      for (let ae = 1; ae < 8; ae += 1.5) {
        let k = (Math.PI * ae) / 8;
        g(
          h,
          Ke(
            [R - Math.sin(k) * 0.7, 2.3, I - Math.cos(k) * 0.36],
            [R - Math.sin(k) * 0.7, 4.75, I - Math.cos(k) * 0.36],
            0.01,
            4,
          ),
        );
      }
      x.push({
        min: [R - 0.72, 0, I - 0.4],
        max: [R + 0.05, 4.7, I + 0.4],
        bulletOnly: !1,
      });
    }
    g(f, Ee(13, 21.02, -On - 0.95, ks - 1.2, 21.12, -On - 0.85));
    for (let R = 13.5; R < ks - 1.2; R += 3.3)
      g(f, Ee(R - 0.03, 21.1, -On - 0.93, R + 0.03, 21.86, -On - 0.87));
    {
      let se = (ks - 1.6 - 13.6) / 15;
      for (let ae = 0; ae < 15; ae++) {
        let k = 13.6 + ae * se,
          ce = 1.1 + 0.25 * Math.sin(ae * 2.1);
        g(f, Ee(k - 0.1, 20.9, -On - 0.98, k + 0.1, 21.02, -On - 0.82));
        for (let ve of [-0.05, 0.05]) {
          let _e = [];
          for (let Te = 0; Te <= 7; Te++) {
            let Pe = Te / 7;
            _e.push(
              _t(
                k + se * Pe,
                20.92 - ce * (1 - (2 * Pe - 1) ** 2),
                -On - 0.9 + ve,
              ),
            );
          }
          g(f, kr(_e, 0.03, 4));
        }
      }
    }
    function ie(R, I, se, ae, k = "z") {
      let ce = ae * 0.46;
      k === "z"
        ? g(f, Ee(R - 0.03, I, se - ce / 2, R + 0.03, I + 0.06, se + ce / 2))
        : g(f, Ee(R - ce / 2, I, se - 0.03, R + ce / 2, I + 0.06, se + 0.03));
      for (let ve = 0; ve < ae; ve++) {
        let _e = (ve - (ae - 1) / 2) * 0.46,
          Te = k === "z" ? R : R + _e,
          Pe = k === "z" ? se + _e : se;
        (g(f, Ee(Te - 0.17, I - 0.2, Pe - 0.17, Te + 0.17, I, Pe + 0.17, 0.02)),
          g(
            v,
            Ee(Te - 0.14, I - 0.215, Pe - 0.14, Te + 0.14, I - 0.2, Pe + 0.14),
          ));
      }
    }
    for (let R of [33, 47.5, 59.5])
      for (let I of [-1, 1]) ie(R, 21.3, I * (On + 1.3), 3, "x");
    for (let R of [-1, 1])
      (ie(23.5, 12.28, R * (Di - 0.2), 4, "x"),
        ie(15, 21.3, R * (On + 1.3), 2, "x"));
    (ie(is + 0.1, 12.28, 0, 3, "z"),
      ie(Bt - 0.1, 12.28, 0, 3, "z"),
      ie(_ + 0.6, M - 0.55, 0, 3, "z"),
      g(l, Ee(ks - 2.3, 21.35, -1.25, ks + 2.3, 22.2, 1.25, 0.06), En),
      g(l, Ee(ks - 1.6, 20.7, -1.1, ks + 1.6, 21.35, 1.1, 0.05), En));
    for (let R of [-1.8, 1.8])
      for (let I of [-1, 1])
        (g(f, xt(0.24, 0.24, 0.16, "z", ks + R, 22.42, I * 1.3, 12)),
          g(
            l,
            Ee(
              ks + R - 0.35,
              22.1,
              I * 1.3 - 0.14,
              ks + R + 0.35,
              22.5,
              I * 1.3 + 0.14,
              0.03,
            ),
            En,
          ));
    (g(f, xt(0.42, 0.42, 1.5, "z", ks - 0.9, 22.35, 0, 14)),
      g(f, xt(0.42, 0.42, 1.5, "z", ks + 0.9, 22.35, 0, 14)));
    let F = ks + 0.25,
      X = ks + 2.65,
      ne = 2.35,
      re = 4.4,
      $ = 18.3,
      ue = 20.7;
    for (let R of [F + 0.12, X - 0.3]) {
      g(l, Ee(R - 0.12, 20.88, -1, R + 0.12, 21.16, re, 0.03), En);
      for (let I of [ne + 0.1, re - 0.1])
        g(l, Ee(R - 0.06, ue, I - 0.06, R + 0.06, 20.9, I + 0.06), En);
    }
    (g(c, Ee(F, $, ne, X, $ + 0.14, re, 0.03), cl),
      g(
        c,
        Ee(
          F - 0.08,
          ue - 0.02,
          ne - 0.08,
          X + 0.12,
          ue + 0.12,
          re + 0.08,
          0.03,
        ),
        cl,
      ),
      g(c, Ee(F, $ + 0.14, ne, F + 0.08, ue, re), cl));
    for (let R of [ne, re - 0.06])
      (g(c, Ee(F, $ + 0.14, R, X - 0.5, $ + 0.95, R + 0.06), cl),
        g(d, Ee(F + 0.08, $ + 0.95, R + 0.02, X - 0.06, ue, R + 0.04)),
        g(d, Ee(X - 0.5, $ + 0.14, R + 0.02, X - 0.06, $ + 0.95, R + 0.04)));
    for (let R of [X - 0.06])
      for (let I of [ne, re - 0.06, (ne + re) / 2 - 0.03])
        g(c, Ee(R, $ + 0.14, I, R + 0.06, ue, I + 0.06), cl);
    (g(d, Ee(X - 0.04, $ + 0.14, ne + 0.06, X - 0.02, ue, re - 0.06)),
      g(d, Ee(X - 0.9, $ + 0.02, ne + 0.3, X - 0.1, $ + 0.04, re - 0.3)),
      g(f, Ee(F + 0.9, $ + 0.14, 3.1, F + 1.45, $ + 0.6, 3.65, 0.04)),
      g(f, Ee(F + 0.82, $ + 0.6, 3.1, F + 0.96, $ + 1.35, 3.65, 0.04)));
    for (let R of [2.75, 4])
      (g(
        f,
        Ee(F + 1.2, $ + 0.14, R - 0.16, F + 1.75, $ + 0.85, R + 0.16, 0.03),
      ),
        r.add(
          Ee(F + 1.3, $ + 0.855, R - 0.1, F + 1.6, $ + 0.865, R + 0.1),
          [0.75, 0.5, 0.26],
          0,
        ));
    (r.add(
      Ee(F + 0.5, ue - 0.045, 3, F + 1.5, ue - 0.03, 3.2),
      [0.75, 0.5, 0.26],
      0,
    ),
      ie(X + 0.15, $ + 0.1, 3.37, 2, "z"),
      g(h, Ee(F - 0.9, $ + 0.1, ne, F, $ + 0.14, re)),
      ns(
        o,
        l,
        [
          [F, $ + 0.14, ne + 0.03],
          [F - 0.87, $ + 0.14, ne + 0.03],
          [F - 0.87, $ + 0.14, re - 0.03],
          [F, $ + 0.14, re - 0.03],
        ],
        { post: 1, tint: En },
      ));
    let me = i.mats.label("NS-04", {
        color: "white",
        font: "stencil",
        distress: 0.35,
      }),
      ee = Math.max(1, me.aspect || 6);
    {
      let R = Math.min(1.15, 8.6 / ee);
      for (let I of [-1, 1])
        g(
          me.material,
          ll(R * ee, R, 36.9, 22, I * (On + 0.453), I > 0 ? 0 : Math.PI),
        );
    }
    {
      let R = Math.min(0.86, 9.4 / ee);
      g(me.material, ll(R * ee, R, Bt - 0.453, 13, 0, -Math.PI / 2));
    }
    if (n) return ((o.remap = null), (o.dz = 0), (o.minSize = 0), null);
    let B = o.build({ cast: !0, recv: !0 });
    B.name = "crane";
    let P = new io(),
      V = (R, I, se) => P.add(R, I, se),
      Y = 8.3;
    for (let R of [-0.9, 0.9])
      for (let I of [-0.8, 0.8])
        V(f, Ke([R, 0, I], [R * 0.8, -Y, I * 0.7], 0.022, 5));
    V(l, Ee(-0.95, -Y - 0.55, -0.75, 0.95, -Y, 0.75, 0.05), En);
    for (let R of [-0.45, 0.45])
      V(f, xt(0.3, 0.3, 0.12, "z", 0, -Y + 0.12, R, 12));
    let L = -Y - 0.55,
      Z = L - 0.34;
    for (let R of [-0.6, 0.6])
      V(l, Ee(R - 0.16, Z, -6.02, R + 0.16, L, 6.02, 0.03), En);
    for (let R of [-5.92, 5.92])
      V(l, Ee(-1.22, Z, R - 0.14, 1.22, L, R + 0.14, 0.03), En);
    V(l, Ee(-0.9, Z - 0.02, -1.3, 0.9, L + 0.1, 1.3, 0.04), En);
    for (let R of [-1.2, 1.2])
      for (let I of [-6, 6])
        (V(f, Ee(R - 0.1, Z - 0.1, I - 0.1, R + 0.1, Z + 0.05, I + 0.1)),
          V(
            l,
            jt(
              [R * 1.02, Z, I * 1.01],
              [R * 1.22, Z - 0.55, I * 1.04],
              0.28,
              0.03,
            ),
            En,
          ));
    let J = Z - 0.08,
      oe = J - 2.59,
      fe = [0.9, 0.82, 0.8];
    V(u, Ee(-1.2, oe, -6.08, 1.2, J, 6.08, 0.03), fe);
    for (let R of [-1.22, 1.22])
      for (let I = -5.7; I <= 5.71; I += 0.57)
        V(u, Ee(R - 0.02, oe + 0.16, I - 0.1, R + 0.02, J - 0.12, I + 0.1), fe);
    for (let R of [-6.095, 6.095])
      for (let I of [-1.22, 1.22])
        V(
          u,
          Ee(I - 0.08, oe, R - 0.08, I + 0.08, J, R + 0.08),
          [0.7, 0.62, 0.6],
        );
    for (let R of [-0.8, -0.3, 0.3, 0.8])
      V(f, Ke([R, oe + 0.08, 6.1], [R, J - 0.08, 6.1], 0.02, 5));
    let le = P.build({ cast: !0, recv: !0 });
    return (
      le.position.set(ks, 20.7, 0),
      (le.userData.noMerge = !0),
      (le.name = "crane-spreader"),
      B.add(le),
      { root: B, spreader: le, colliders: x, tris: o.tris + P.tris }
    );
  }

function mb(
    i,
    e,
    t,
    n,
    { s = 1, up: o = !1, tint: r = [0.3, 0.36, 0.44] } = {},
  ) {
    let a = [],
      l = (c, u, h, f, p, d) => a.push(Ee(c, u, h, f, p, d));
    for (let c of [-5, 5])
      for (let u of [-5.4, 5.4]) l(c - 0.6, 0, u - 0.6, c + 0.6, 24, u + 0.6);
    for (let c of [-5.4, 5.4])
      (l(-5, 12.5, c - 0.45, 5, 13.5, c + 0.45),
        l(-5, 23, c - 0.4, 5, 23.8, c + 0.4),
        a.push(jt([-5, 13.5, c], [5, 23, c], 0.4, 0.4)));
    for (let c of [-5, 5])
      (l(c - 0.45, 12.5, -5.4, c + 0.45, 13.5, 5.4),
        l(c - 0.45, 22.8, -5.4, c + 0.45, 23.8, 5.4),
        l(c - 0.45, 3.6, -5.4, c + 0.45, 4.6, 5.4));
    (l(-11.5, 21.2, -2.3, 6.3, 22.8, 2.3), l(-10.9, 22.8, -2.9, -3.1, 26, 2.9));
    for (let c of [-1, 1])
      (a.push(jt([5, 23.8, c * 5.4], [4.1, 30, c * 1.5], 0.6, 0.6)),
        a.push(jt([-5, 23.8, c * 5.4], [4.1, 30, c * 1.5], 0.5, 0.5)));
    (l(3.6, 29.6, -2, 4.6, 30.4, 2),
      o
        ? (a.push(jt([6.6, 22, 0], [10.5, 52, 0], 4.6, 1.6)),
          a.push(jt([4.1, 30, 0], [9.4, 44, 0], 0.3, 0.3)))
        : (l(6.6, 21.2, -2.3, 38.5, 22.8, 2.3),
          a.push(jt([4.1, 30, 0], [20.5, 24.3, 0], 0.3, 0.3)),
          a.push(jt([4.1, 30, 0], [34.5, 24.3, 0], 0.3, 0.3)),
          l(15, 18.3, 2.4, 19.5, 22.2, 4.4)));
    for (let c of a) (c.scale(s, s, s), c.translate(t, 0, n), i.add(e, c, r));
    return o ? [t + 10.5 * s, 52.6 * s, n] : [t + 4.1 * s, 31 * s, n];
  }

var rt = 41,
    vR = 8,
    Eo = -9,
    qn = 63,
    xR = -4.4,
    Fs = 13,
    Vc = -1.6,
    gb = (i, e, t) => {
      let n = Math.min(1, Math.max(0, (t - i) / (e - i)));
      return n * n * (3 - 2 * n);
    },
    yR = (i) =>
      1.7 * Math.pow(Math.max(0, 1 - i / 20), 2) +
      0.5 * Math.pow(Math.max(0, (i - (qn - 12)) / 12), 2),
    hs = (i) => Fs + yR(i),
    Tf = (i) => 1.15 * (1 - gb(14.5, 18, i) + gb(qn - 10.5, qn - 8, i)),
    Bo = (i) => hs(i) + Tf(i),
    bR = Bo(0);

function fn(i, e, t) {
    let n = (bR - e) * 0.22,
      s = Math.max(0, 1 - i / 22),
      o = Eo - i - n * s,
      r = Math.min(1, Math.max(0, (e - Vc) / (Fs - Vc))),
      a = 17 - 8.5 * Math.pow(r, 1.3),
      l = i / a,
      c = l >= 1 ? 1 : Math.pow(Math.sin((l * Math.PI) / 2), 0.72),
      u = 0.2 + (vR - 0.2) * c,
      h = (i - (qn - 10)) / 10;
    return (
      h > 0 && (u *= 1 - 0.24 * h * h * (1 - 0.6 * r)),
      new W(rt + t * u, e, o)
    );
  }

function ha(i, e, t) {
    let s = fn(i + 0.05, e, t).sub(fn(Math.max(0, i - 0.05), e, t)),
      o = fn(i, e + 0.05, t).sub(fn(i, e - 0.05, t)),
      r = s.cross(o).normalize();
    return (r.x * t + r.z * 0.25 < 0 && r.negate(), r);
  }

function ul(i, e, t, n, s, o = 0.012, r = 6, a = 1) {
    let l = [],
      c = [],
      u = [],
      h = [];
    for (let d = 0; d <= a; d++)
      for (let v = 0; v <= r; v++) {
        let g = i + ((e - i) * v) / r,
          x = t + ((n - t) * d) / a,
          y = ha(g, x, s),
          b = fn(g, x, s).addScaledVector(y, o);
        (l.push(b.x, b.y, b.z),
          u.push(y.x, y.y, y.z),
          c.push(s < 0 ? 1 - v / r : v / r, d / a));
      }
    let f = r + 1;
    for (let d = 0; d < a; d++)
      for (let v = 0; v < r; v++) {
        let g = d * f + v,
          x = g + 1,
          y = g + f + 1,
          b = g + f;
        s > 0 ? h.push(g, x, y, g, y, b) : h.push(g, y, x, g, b, y);
      }
    let p = new nt();
    return (
      p.setAttribute("position", new He(l, 3)),
      p.setAttribute("normal", new He(u, 3)),
      p.setAttribute("uv", new He(c, 2)),
      p.setIndex(h),
      p
    );
  }

var D1 = class {
      constructor() {
        ((this.p = []), (this.n = []), (this.u = []), (this.c = []));
      }
      v(e, t, n, s, o) {
        (this.p.push(e.x, e.y, e.z),
          this.n.push(t.x, t.y, t.z),
          this.u.push(n, s),
          this.c.push(o[0], o[1], o[2]));
      }
      quad(e, t, n, s) {
        let o = e[1].clone().sub(e[0]),
          r = e[3].clone().sub(e[0]),
          a =
            o.cross(r).dot(t[0]) >= 0 ? [0, 1, 2, 0, 2, 3] : [0, 2, 1, 0, 3, 2];
        for (let l of a) this.v(e[l], t[l], n[l][0], n[l][1], s[l]);
      }
      geo() {
        let e = new nt();
        return (
          e.setAttribute("position", new He(this.p, 3)),
          e.setAttribute("normal", new He(this.n, 3)),
          e.setAttribute("uv", new He(this.u, 2)),
          e.setAttribute("color", new He(this.c, 3)),
          e
        );
      }
    },
    hl = (i, e) => {
      let t = Math.imul(i + 31, 374761393) ^ Math.imul(e + 17, 668265263);
      return (
        (t = Math.imul(t ^ (t >>> 13), 1274126177)),
        ((t ^ (t >>> 16)) >>> 0) / 4294967295
      );
    };

function vb(i, e) {
    let t = new io(),
      n = so(i, "hull_paint"),
      s = so(i, "hull_red"),
      o = so(i, "paint_white"),
      r = i.mats.get("steel_dark"),
      a = i.mats.get("steel_galv"),
      l = i.mats.get("rope"),
      c = i.mats.get("rubber"),
      u = [2.6, 1.75, 0.95],
      h = ($) => e.add($, u, 0),
      f = ($, ue, me) => t.add($, ue, me),
      p = [0, 0.35, 0.9, 1.8, 3, 4.5, 6, 8, 10, 12, 14.5, 17, 20];
    for (let $ = 23; $ < qn - 0.5; $ += 3) p.push($);
    p.push(qn);
    let d = [0, 0.17, 0.34, 0.5, 0.66, 0.83, 1],
      v = ($) => {
        let ue = hs($),
          me = [xR, -2.3, -0.4, 1];
        for (let ee = 1; ee < d.length; ee++) me.push(1 + (ue - 1) * d[ee]);
        return (me.push(Bo($)), me);
      },
      g = 10,
      x = 3,
      y = new D1(),
      b = new D1(),
      m = ($, ue, me, ee) => {
        let B = hv($.x * 0.6, $.y, $.z * 0.6, void 0, 0.8),
          P = [B[0] * ee, B[1] * ee, B[2] * ee];
        return (
          ue < x
            ? $.y < -0.2
              ? ((P[0] *= 0.55), (P[1] *= 0.72), (P[2] *= 0.55))
              : me && ((P[0] *= 1.12), (P[1] *= 1), (P[2] *= 0.92))
            : $.y < 1.1 && ((P[0] *= 1.7), (P[1] *= 1.62), (P[2] *= 1.45)),
          P
        );
      };
    for (let $ of [-1, 1])
      for (let ue = 0; ue < p.length - 1; ue++) {
        let me = p[ue],
          ee = p[ue + 1],
          B = v(me),
          P = v(ee);
        for (let V = 0; V < g; V++) {
          if (V === g - 1 && Tf(me) < 0.02 && Tf(ee) < 0.02) continue;
          let Y =
              (V < x ? 0.8 : 0.58) + 0.36 * hl(ue * 7 + ($ > 0 ? 100 : 0), V),
            L = [
              fn(me, B[V], $),
              fn(ee, P[V], $),
              fn(ee, P[V + 1], $),
              fn(me, B[V + 1], $),
            ],
            Z = [
              ha(me, B[V], $),
              ha(ee, P[V], $),
              ha(ee, P[V + 1], $),
              ha(me, B[V + 1], $),
            ],
            J = [
              [me, B[V]],
              [ee, P[V]],
              [ee, P[V + 1]],
              [me, B[V + 1]],
            ],
            oe = [
              m(L[0], V, !1, Y),
              m(L[1], V, !1, Y),
              m(L[2], V, !0, Y),
              m(L[3], V, !0, Y),
            ];
          if (me > 1.5 && V >= 2 && V < g - 1) {
            let fe = L[0]
              .clone()
              .add(L[1])
              .add(L[2])
              .add(L[3])
              .multiplyScalar(0.25);
            for (let le = 0; le < 4; le++)
              Z[le]
                .addScaledVector(fe.clone().sub(L[le]).normalize(), 0.075)
                .normalize();
          }
          (V < x ? y : b).quad(L, Z, J, oe);
        }
      }
    {
      let $ = v(0),
        ue = v(qn),
        me = _t(0, 0.2, 1).normalize(),
        ee = _t(0, 0, -1),
        B = _t(0, 1, 0);
      for (let P = 0; P < g; P++) {
        let V = P < x ? [0.8, 0.8, 0.8] : [0.9, 0.9, 0.9];
        ((P < x ? y : b).quad(
          [
            fn(0, $[P], -1),
            fn(0, $[P], 1),
            fn(0, $[P + 1], 1),
            fn(0, $[P + 1], -1),
          ],
          [me, me, me, me],
          [
            [0, $[P]],
            [0.4, $[P]],
            [0.4, $[P + 1]],
            [0, $[P + 1]],
          ],
          [V, V, V, V],
        ),
          (P < x ? y : b).quad(
            [
              fn(qn, ue[P], -1),
              fn(qn, ue[P], 1),
              fn(qn, ue[P + 1], 1),
              fn(qn, ue[P + 1], -1),
            ],
            [ee, ee, ee, ee],
            [
              [0, ue[P]],
              [14, ue[P]],
              [14, ue[P + 1]],
              [0, ue[P + 1]],
            ],
            [V, V, V, V],
          ));
      }
      for (let P = 0; P < p.length - 1; P++) {
        let V = fn(p[P], hs(p[P]), -1),
          Y = fn(p[P], hs(p[P]), 1),
          L = fn(p[P + 1], hs(p[P + 1]), 1),
          Z = fn(p[P + 1], hs(p[P + 1]), -1),
          J = [0.75, 0.72, 0.7];
        y.quad(
          [V, Y, L, Z],
          [B, B, B, B],
          [
            [V.x, V.z],
            [Y.x, Y.z],
            [L.x, L.z],
            [Z.x, Z.z],
          ],
          [J, J, J, J],
        );
      }
    }
    (f(s, y.geo()), f(n, b.geo()));
    {
      let $ = (me, ee) => fn(me, ee, -1).addScaledVector(ha(me, ee, -1), 0.012),
        ue = [1.05, 0.92, 0.8];
      for (let me = 2; me < p.length - 1; me++) {
        let ee = v(p[me]),
          B = v(p[me + 1]);
        for (let P = 4; P <= 9; P++)
          f(n, jt($(p[me], ee[P]), $(p[me + 1], B[P]), 0.03, 0.045), ue);
        for (let P = 3; P < 9; P++)
          (me + P) % 2 === 0 &&
            f(n, jt($(p[me], ee[P]), $(p[me], ee[P + 1]), 0.035, 0.03), ue);
      }
    }
    for (let $ of [-1, 1]) {
      for (let Y = 3; Y < p.length - 1; Y++) {
        let L = (Z, J) => fn(Z, J, $).addScaledVector(ha(Z, J, $), 0.07);
        (f(
          n,
          jt(L(p[Y], 9.6), L(p[Y + 1], 9.6), 0.16, 0.3),
          [0.55, 0.55, 0.55],
        ),
          Tf(p[Y]) > 0.6 &&
            Tf(p[Y + 1]) > 0.6 &&
            f(
              r,
              Ke(fn(p[Y], Bo(p[Y]), $), fn(p[Y + 1], Bo(p[Y + 1]), $), 0.07, 6),
            ));
      }
      for (let Y = 0; Y < 3; Y++)
        f(r, Ke(fn(p[Y], Bo(p[Y]), $), fn(p[Y + 1], Bo(p[Y + 1]), $), 0.07, 6));
      let ue = [];
      for (let Y = 18; Y <= qn - 10.4; Y += 3)
        ue.push(fn(Y, hs(Y), $).add(_t(-$ * 0.12, 0, 0)));
      ns(t, r, ue, { h: 1.05, post: 1.5, r: 0.028 });
      let me = 4.6,
        ee = hs(me) - 2.3,
        B = fn(me, ee, $),
        P = ha(me, ee, $);
      f(
        r,
        Ke(
          B.clone().addScaledVector(P, -0.3),
          B.clone().addScaledVector(P, 0.22),
          0.5,
          12,
          !0,
        ),
      );
      let V = (Y, L, Z) => fn(Y, L, $).addScaledVector(ha(Y, L, $), Z);
      (f(r, jt(V(me, ee - 0.1, 0.34), V(me, ee - 2.3, 0.3), 0.22, 0.22, 0.03)),
        f(
          r,
          jt(
            V(me - 0.95, ee - 2.45, 0.34),
            V(me + 0.95, ee - 2.45, 0.34),
            0.42,
            0.42,
            0.05,
          ),
        ));
      for (let Y of [-0.8, 0.8])
        f(
          r,
          jt(
            V(me + Y, ee - 2.4, 0.3),
            V(me + Y * 1.1, ee - 1.1, 0.34),
            0.5,
            0.12,
            0.02,
          ),
        );
    }
    let A = i.mats.label("EXTRACTION BOAT", {
      color: "white",
      font: "sans",
      distress: 0.3,
    });
    {
      let ue = Math.min(12, 1.7 * Math.max(2, A.aspect || 6));
      (f(A.material, ul(7.6, 7.6 + ue, 10.25, 10.25 + 1.7, -1, 0.014, 10, 1)),
        f(A.material, ul(7.6, 7.6 + ue, 10.25, 10.25 + 1.7, 1, 0.014, 10, 1)));
    }
    let _ = i.mats.decal("rust_run");
    f(
      _.material,
      ul(4.6 - 0.8, 4.6 + 0.8, hs(4.6) - 9.5, hs(4.6) - 2.6, -1, 0.012, 2, 3),
    );
    for (let $ = 21.5; $ < qn - 11; $ += 5.5) {
      let ue = fn($, Fs - 0.45, -1);
      f(
        r,
        Ee(
          ue.x - 0.04,
          ue.y - 0.09,
          ue.z - 0.3,
          ue.x + 0.01,
          ue.y + 0.09,
          ue.z + 0.3,
        ),
      );
      let me = 2.6 + 3.2 * hl(Math.round($ * 10), 5);
      f(
        _.material,
        ul($ - 0.45, $ + 0.45, Fs - 0.5 - me, Fs - 0.5, -1, 0.012, 1, 1),
      );
    }
    for (let $ of [6.4, qn - 7])
      for (let ue = 0; ue < 9; ue++) {
        let me = 1.6 + ue * 0.62;
        f(
          o,
          ul($, $ + (ue % 2 ? 0.28 : 0.5), me, me + 0.13, -1, 0.01, 1, 1),
          [1.1, 1.1, 1.05],
        );
      }
    (f(o, ul(33, 33.9, 3.2, 3.3, -1, 0.01, 1, 1), [1.1, 1.1, 1.05]),
      f(o, ul(33.4, 33.5, 2.4, 4.1, -1, 0.01, 1, 1), [1.1, 1.1, 1.05]));
    let M = hs(7);
    for (let $ of [-1, 1]) {
      (f(r, xt(0.55, 0.55, 0.9, "x", rt + $ * 1.5, M + 0.75, Eo - 6.2, 12)),
        f(
          r,
          Ee(rt + $ * 0.5, M, Eo - 6.9, rt + $ * 2.6, M + 0.5, Eo - 5.5, 0.04),
        ));
      for (let ue of [0, 0.7])
        f(
          r,
          xt(0.16, 0.16, 0.7, "y", rt + $ * 4.2, M + 0.35, Eo - 8.5 - ue, 8),
        );
    }
    let E = Eo - 10.5,
      w = M + 15;
    (f(o, xt(0.26, 0.42, 15, "y", rt, M + 7.5, E, 10), [0.85, 0.8, 0.7]),
      f(
        o,
        Ee(rt - 2.6, M + 10, E - 0.12, rt + 2.6, M + 10.24, E + 0.12),
        [0.85, 0.8, 0.7],
      ),
      f(r, Ke([rt, w, E], [rt, w + 2.4, E], 0.03, 5)));
    for (let $ of [-1, 1])
      (f(
        r,
        Ke(
          [rt + $ * 2.5, M + 10.2, E],
          [rt + $ * 5.6, M + 0.6, E - 1.2],
          0.022,
          4,
        ),
      ),
        f(r, Ke([rt + $ * 2.5, M + 10.2, E], [rt, w, E], 0.02, 4)));
    (f(r, Ke([rt, w, E], [rt, Bo(0) + 0.3, Eo - 0.4], 0.022, 4)),
      f(r, Ke([rt, Bo(0), Eo - 0.3], [rt, Bo(0) + 2.6, Eo - 0.15], 0.03, 5)));
    let S = _t(rt, M + 2.2, E - 0.5),
      z = _t(rt + 1.2, M + 9.5, E - 11.5);
    (f(o, Ke(S, z, 0.2, 8, !0), [0.85, 0.8, 0.7]),
      f(r, Ke(z, [rt, w - 0.4, E], 0.022, 4)),
      f(r, Ke(z, [z.x, Fs + 4, z.z], 0.018, 4)),
      f(
        r,
        Ee(
          z.x - 0.18,
          Fs + 3.4,
          z.z - 0.18,
          z.x + 0.18,
          Fs + 4,
          z.z + 0.18,
          0.04,
        ),
      ),
      e.add(Bn(rt, w - 0.6, E + 0.5, 0.14), [5, 4.6, 3.8], 0));
    let H = [
      [0.62, 0.17, 0.13],
      [0.17, 0.29, 0.5],
      [0.2, 0.42, 0.3],
      [0.78, 0.36, 0.12],
      [0.8, 0.62, 0.16],
      [0.82, 0.83, 0.8],
      [0.4, 0.43, 0.47],
      [0.16, 0.42, 0.45],
    ];
    [
      [-45.6, 12.19],
      [-32.7, 12.19],
      [-22.8, 6.06],
    ].forEach(([$, ue], me) => {
      f(
        s,
        Ee(
          rt - 7.7,
          Fs,
          $ - ue / 2 - 0.2,
          rt + 7.7,
          Fs + 0.42,
          $ + ue / 2 + 0.2,
          0.04,
        ),
        [0.6, 0.6, 0.62],
      );
      for (let ee = 0; ee < 6; ee++) {
        let B = rt + (ee - 2.5) * 2.52,
          P = me === 2 ? 2 : 2 + (hl(ee * 3 + me, 9) > 0.4 ? 1 : 0);
        for (let V = 0; V < P; V++) {
          let Y = Fs + 0.44 + V * 2.61,
            L = H[Math.floor(hl(ee * 5 + V * 13 + me * 29, 2) * H.length)];
          if (
            (f(
              o,
              Ee(
                B - 1.22,
                Y,
                $ - ue / 2,
                B + 1.22,
                Y + 2.59,
                $ + ue / 2,
                0.035,
              ),
              L,
            ),
            ee === 0)
          )
            for (let Z = $ - ue / 2 + 0.5; Z < $ + ue / 2 - 0.3; Z += 0.58)
              f(
                o,
                Ee(B - 1.24, Y + 0.15, Z - 0.1, B - 1.21, Y + 2.45, Z + 0.1),
                L,
              );
        }
      }
      for (let ee of [$ - ue / 2 - 0.45, $ + ue / 2 + 0.45]) {
        for (let B = 0; B <= 6; B++)
          f(
            r,
            Ee(
              rt + (B - 3) * 2.52 - 0.05,
              Fs,
              ee - 0.05,
              rt + (B - 3) * 2.52 + 0.05,
              Fs + 5.6,
              ee + 0.05,
            ),
          );
        for (let B of [Fs + 2.9, Fs + 5.6])
          f(
            r,
            Ee(rt - 7.6, B - 0.05, ee - 0.12, rt + 7.6, B + 0.05, ee + 0.12),
          );
      }
    });
    let q = [0.92, 0.93, 0.92],
      U = -53,
      T = -66.5;
    [
      [7.2, 13, 15.9, 0],
      [6.7, 15.9, 18.7, 0.5],
      [6.3, 18.7, 21.5, 1],
      [6.5, 21.5, 24.4, 1.5],
    ].forEach(([$, ue, me, ee], B) => {
      (f(o, Ee(rt - $, ue, T + ee * 0.4, rt + $, me, U - ee, 0.08), q),
        f(
          o,
          Ee(
            rt - $ - 0.7,
            me - 0.06,
            T + ee * 0.4 - 0.3,
            rt + $ + 0.7,
            me + 0.06,
            U - ee + 1,
          ),
          [0.7, 0.72, 0.72],
        ));
      let P = me + 0.06,
        V = rt - $ - 0.67,
        Y = rt + $ + 0.67,
        L = U - ee + 0.97,
        Z = T + ee * 0.4 - 0.27;
      if (
        (ns(
          t,
          a,
          [
            [V, P, Z],
            [V, P, L],
            [Y, P, L],
            [Y, P, Z],
          ],
          { h: 1.05, post: 1.6, r: 0.026 },
        ),
        B < 3)
      )
        for (let J = U - ee - 1.2, oe = 0; J > T + 1.5; J -= 1.45, oe++) {
          let fe = hl(oe * 3 + B * 11, 4) > 0.8;
          for (let le of [-1, 1]) {
            let R = Ee(
              rt + le * ($ + 0.012) - 0.012,
              ue + 1.25,
              J - 0.33,
              rt + le * ($ + 0.012) + 0.012,
              ue + 1.85,
              J + 0.33,
            );
            fe && le < 0 ? h(R) : f(r, R);
          }
        }
      if (B < 3)
        for (let J = rt - $ + 1, oe = 0; J < rt + $ - 0.6; J += 1.5, oe++) {
          let fe = Ee(
            J - 0.33,
            ue + 1.25,
            U - ee - 0.01,
            J + 0.33,
            ue + 1.85,
            U - ee + 0.014,
          );
          hl(oe + B * 7, 8) > 0.84 ? h(fe) : f(r, fe);
        }
    });
    let C = 21.5,
      G = U - 1.5,
      j = 6.5;
    f(r, Ee(rt - j + 0.2, C + 1.3, G - 0.01, rt + j - 0.2, C + 2.25, G + 0.02));
    for (let $ = rt - j + 0.75, ue = 0; $ < rt + j - 0.4; $ += 1.05, ue++)
      (hl(ue, 21) > 0.62 &&
        h(Ee($ - 0.44, C + 1.36, G + 0.02, $ + 0.44, C + 2.19, G + 0.03)),
        f(o, Ee($ + 0.48, C + 1.3, G, $ + 0.57, C + 2.25, G + 0.04), q));
    for (let $ of [-1, 1])
      (f(
        r,
        Ee(
          rt + $ * j - 0.02,
          C + 1.3,
          G - 5,
          rt + $ * j + 0.02,
          C + 2.25,
          G - 0.2,
        ),
      ),
        f(
          o,
          Ee(
            rt + $ * 6.4,
            C - 0.12,
            G - 3.4,
            rt + $ * 8.3,
            C + 0.02,
            G + 0.9,
            0.03,
          ),
          q,
        ),
        f(o, Ee(rt + $ * 8.22, C, G - 3.4, rt + $ * 8.3, C + 1.1, G + 0.9), q),
        f(o, Ee(rt + $ * 6.5, C, G + 0.82, rt + $ * 8.3, C + 1.1, G + 0.9), q),
        f(
          r,
          jt(
            [rt + $ * 6.6, C - 2.6, G - 1.2],
            [rt + $ * 8.1, C - 0.1, G - 1.2],
            0.12,
            0.12,
          ),
        ),
        e.add(
          Bn(rt + $ * 8.25, C + 1.35, G - 0.4, 0.13),
          $ < 0 ? [0.3, 5, 1.6] : [6, 0.4, 0.3],
          0,
        ));
    (h(Ee(rt - 2.2, 24.42, G + 0.6, rt - 1.6, 24.52, G + 0.9)),
      h(Ee(rt + 1.6, 24.42, G + 0.6, rt + 2.2, 24.52, G + 0.9)));
    let N = _t(rt, 24.46, -57.5);
    (f(o, xt(0.16, 0.28, 8.5, "y", N.x, N.y + 4.25, N.z, 8), q),
      f(
        o,
        Ee(N.x - 2.4, N.y + 5.2, N.z - 0.08, N.x + 2.4, N.y + 5.36, N.z + 0.08),
        q,
      ),
      f(
        o,
        Ee(N.x - 1.3, N.y + 7.3, N.z - 0.06, N.x + 1.3, N.y + 7.42, N.z + 0.06),
        q,
      ),
      f(o, Ee(N.x - 0.5, N.y + 3.2, N.z, N.x + 0.5, N.y + 3.3, N.z + 1.2), q));
    for (let $ of [-2.3, -1.2, 1.2, 2.3])
      f(
        r,
        Ke(
          [N.x + $, N.y + 5.36, N.z],
          [N.x + $, N.y + 5.36 + (Math.abs($) > 2 ? 3.2 : 1.2), N.z],
          0.012,
          4,
        ),
      );
    f(r, Ke([N.x, N.y + 8.5, N.z], [N.x, N.y + 10.8, N.z], 0.015, 4));
    for (let $ of [-1, 1])
      f(
        r,
        Ke(
          [N.x + $ * 2.3, N.y + 5.3, N.z],
          [rt + $ * 6, 24.5, T + 2],
          0.014,
          4,
        ),
      );
    (e.add(Bn(N.x, N.y + 8.7, N.z + 0.3, 0.14), [5, 4.6, 3.8], 0),
      e.add(Bn(N.x, N.y + 7.6, N.z, 0.12), [8, 0.4, 0.25], 3.4, 0.6, 0.4));
    let Q = -62.6;
    (f(
      o,
      Ee(rt - 1.7, 24.4, Q - 2.3, rt + 1.7, 29.3, Q + 2.1, 0.25),
      [0.2, 0.34, 0.5],
    ),
      f(
        o,
        Ee(rt - 1.72, 27.2, Q - 2.32, rt + 1.72, 28.1, Q + 2.12, 0.1),
        [0.9, 0.88, 0.8],
      ),
      f(
        o,
        Ee(rt - 1.75, 29.3, Q - 2.35, rt + 1.75, 30.3, Q + 2.15, 0.2),
        [0.07, 0.07, 0.08],
      ));
    for (let $ of [-0.9, 0.5])
      f(r, xt(0.28, 0.28, 1.1, "y", rt, 30.7, Q + $, 10));
    let K = i.mats.decal("logo_b");
    f(
      K.material,
      ll(
        2.6,
        2.6 / Math.max(1, K.aspect || 1),
        rt - 1.705,
        26.1,
        Q - 0.1,
        -Math.PI / 2,
      ),
    );
    {
      let $ = rt - 7.9,
        ue = 17.5,
        me = -61,
        ee = [1.25, 0.42, 0.1],
        B = new U0(1.15, 3.6, 4, 12);
      (B.rotateX(Math.PI / 2),
        B.scale(0.95, 0.82, 1),
        B.translate($, ue, me),
        f(o, B, ee),
        f(
          o,
          Ee($ - 0.6, ue + 0.7, me - 1.2, $ + 0.6, ue + 1.25, me + 0.9, 0.12),
          ee,
        ));
      for (let P of [-2.1, 2.1])
        (f(
          r,
          jt([rt - 6.9, 15.9, me + P], [$ - 0.2, ue + 2.3, me + P], 0.16, 0.22),
        ),
          f(
            r,
            Ke(
              [$ - 0.2, ue + 2.2, me + P],
              [$, ue + 0.9, me + P * 0.8],
              0.02,
              4,
            ),
          ));
    }
    (f(
      r,
      Ke(
        [rt, Bo(qn), Eo - qn + 0.4],
        [rt, Bo(qn) + 3.4, Eo - qn - 0.3],
        0.03,
        5,
      ),
    ),
      e.add(Bn(rt, Bo(qn) + 0.6, Eo - qn - 0.1, 0.1), [4, 3.7, 3], 0));
    {
      let $ = _t(32.55, 13, -51.5),
        ue = _t(31.4, 1.25, -38.5);
      for (let me of [-0.4, 0.4])
        (f(
          a,
          jt(
            [$.x + me, $.y - 0.1, $.z],
            [ue.x + me, ue.y - 0.1, ue.z],
            0.05,
            0.3,
          ),
        ),
          f(
            a,
            Ke([$.x + me, $.y + 1, $.z], [ue.x + me, ue.y + 1, ue.z], 0.025, 5),
          ),
          f(
            a,
            Ke(
              [$.x + me, $.y + 0.5, $.z],
              [ue.x + me, ue.y + 0.5, ue.z],
              0.02,
              4,
            ),
          ));
      for (let me = 0; me <= 8; me++) {
        let ee = $.clone().lerp(ue, me / 8);
        for (let B of [-0.4, 0.4])
          f(
            a,
            Ke(
              [ee.x + B, ee.y - 0.1, ee.z],
              [ee.x + B, ee.y + 1, ee.z],
              0.02,
              4,
            ),
          );
      }
      for (let me = 1; me < 44; me++) {
        let ee = $.clone().lerp(ue, me / 44);
        f(
          a,
          Ee(
            ee.x - 0.38,
            ee.y - 0.02,
            ee.z - 0.12,
            ee.x + 0.38,
            ee.y,
            ee.z + 0.12,
          ),
        );
      }
      (f(a, Ee(31, 1.15, -38.5, 32, 1.2, -37.3)),
        f(a, jt([31.2, 1.2, -37.9], [29.2, 0.12, -37.9], 0.8, 0.06)),
        ns(
          t,
          a,
          [
            [31, 1.2, -37.32],
            [32, 1.2, -37.32],
            [32, 1.2, -38.5],
          ],
          { post: 1.1 },
        ),
        f(
          r,
          Ke(
            [$.x, $.y + 3.2, $.z + 4],
            [ue.x, ue.y + 1.2, ue.z + 0.3],
            0.014,
            4,
          ),
        ),
        f(r, jt([33.2, 13.2, $.z + 4], [32.2, 16.4, $.z + 4], 0.14, 0.14)));
    }
    let ie = ($, ue, me, ee) => {
      let B = fn($, ue, -1);
      ((B.x -= 0.1), f(l, kr(ua(B, me, ee, 12), 0.042, 5)));
      let P = ua(B, me, ee, 12)[3],
        V = ua(B, me, ee, 12)[4].clone().sub(P).normalize(),
        Y = xt(0.42, 0.42, 0.012, "y", 0, 0, 0, 12);
      (Y.applyQuaternion(new Lt().setFromUnitVectors(_t(0, 1, 0), V)),
        Y.translate(P.x, P.y, P.z),
        f(a, Y),
        f(
          r,
          Ee(
            B.x - 0.12,
            B.y - 0.28,
            B.z - 0.35,
            B.x + 0.12,
            B.y + 0.28,
            B.z + 0.35,
            0.05,
          ),
        ));
    };
    (ie(4.4, hs(4.4) + 0.55, _t(29.2, 0.5, -12), 1.3),
      ie(4.9, hs(4.9) + 0.55, _t(29.2, 0.36, -12.1), 1.7),
      ie(1.6, hs(1.6) + 0.6, _t(29.2, 0.5, -2), 1.6),
      ie(2.2, hs(2.2) + 0.6, _t(29.2, 0.36, -2.1), 2.2),
      ie(qn - 5, hs(qn - 5) + 0.6, _t(29.2, 0.5, -82), 1.6),
      ie(qn - 9, hs(qn - 9) + 0.6, _t(29.2, 0.45, -58), 1.2));
    for (let $ of [-82, -58])
      (f(r, xt(0.2, 0.26, 0.55, "y", 29.2, 0.27, $, 10)),
        f(r, xt(0.34, 0.3, 0.14, "y", 29.2, 0.6, $, 10)));
    for (let $ of [-17.6, -37, -54])
      (f(c, xt(1.25, 1.25, 2.2, "z", 31.55, Vc + 0.35, $, 14)),
        f(c, xt(0.45, 1.25, 0.5, "z", 31.55, Vc + 0.35, $ + 1.35, 14)),
        f(c, xt(1.25, 0.45, 0.5, "z", 31.55, Vc + 0.35, $ - 1.35, 14)),
        f(l, Ke([31.55, Vc + 1.6, $], [29.9, 0.1, $ + 0.6], 0.03, 4)));
    let F = t.build({ cast: !0, recv: !0 });
    F.name = "ship";
    let X = new io();
    (X.add(o, Ee(-1.25, -0.07, -0.1, 1.25, 0.07, 0.1, 0.02), q),
      X.add(o, xt(0.1, 0.12, 0.25, "y", 0, -0.18, 0, 8), q));
    let ne = X.build({ cast: !1 });
    (ne.position.set(N.x, N.y + 3.62, N.z + 0.8),
      (ne.userData.noMerge = !0),
      F.add(ne));
    let re = [
      { min: [33, -5, Eo - qn], max: [49, 15, -17.5] },
      { min: [34.9, -5, -17.5], max: [47.1, 15.5, -13] },
      { min: [37.7, -5, -13], max: [44.3, 16, -9.3] },
      { min: [rt - 7.2, 13, T], max: [rt + 7.2, 24.4, U] },
    ];
    return {
      root: F,
      radar: ne,
      colliders: re,
      tris: t.tris,
      name: "EXTRACTION BOAT",
    };
  }

function xb(i, e) {
    let t = new io(),
      n = so(i, "plastic_grey"),
      s = so(i, "paint_orange"),
      o = i.mats.get("polymer_black"),
      r = i.mats.get("steel_galv"),
      a = i.mats.get("glass"),
      l = (U, T, D) => t.add(U, T, D),
      c = [2, 2.02, 2.08],
      u = [0.5, 0.5, 0.52],
      h = [1.9, 1.7, 1.2],
      f = [
        [-3.35, 0.5, 1.03],
        [-1.6, 0.5, 1.06],
        [0.5, 0.52, 1.05],
        [1.8, 0.58, 0.93],
        [2.75, 0.68, 0.6],
        [3.3, 0.78, 0.22],
      ],
      p = [
        ...f.map((U) => _t(U[0], U[1], U[2])),
        _t(3.43, 0.8, 0),
        ...f
          .slice()
          .reverse()
          .map((U) => _t(U[0], U[1], -U[2])),
      ],
      d = new Jr(p, !1, "centripetal"),
      v = new Kr(d, 60, 0.27, 12, !1);
    {
      let U = v.attributes.uv,
        T = d.getLength();
      for (let D = 0; D < U.count; D++)
        U.setXY(D, U.getX(D) * T, U.getY(D) * 1.7);
    }
    l(n, v, c);
    for (let U of [-1, 1])
      l(n, xt(0.07, 0.27, 0.42, "x", -3.56, 0.5, U * 1.03, 12), c);
    let g = 11,
      x = [];
    for (let U = 0; U < g; U++) {
      let T = 0.04 + (0.92 * U) / (g - 1),
        D = d.getPointAt(T),
        C = d.getTangentAt(T),
        G = new Ci(0.276, 0.016, 5, 14);
      (G.applyQuaternion(new Lt().setFromUnitVectors(_t(0, 0, 1), C)),
        G.translate(D.x, D.y, D.z),
        l(n, G, u));
      let j = _t(D.x, 0, D.z)
        .sub(_t(Math.min(D.x, 2.2), 0, 0))
        .normalize();
      x.push(
        D.clone()
          .addScaledVector(j, 0.2)
          .add(_t(0, 0.2, 0)),
      );
    }
    for (let U = 0; U < g - 1; U++)
      l(n, kr(ua(x[U], x[U + 1], 0.1, 4), 0.012, 4), h);
    let y = [-3.4, -2, -0.5, 1, 2, 2.8, 3.3],
      b = [0.9, 0.93, 0.93, 0.85, 0.62, 0.34, 0.08],
      m = [0.22, 0.22, 0.24, 0.3, 0.42, 0.56, 0.7],
      A = [-0.3, -0.32, -0.33, -0.3, -0.15, 0.15, 0.62],
      _ = [],
      M = (U, T, D) => {
        let C = T.clone().sub(U).cross(D.clone().sub(U)),
          G = U.clone()
            .add(T)
            .add(D)
            .multiplyScalar(1 / 3),
          j = _t(0, G.y - 0.45, G.z);
        (Math.abs(G.x) > 3.39 && j.set(G.x, 0, 0),
          C.dot(j) < 0
            ? _.push(U.x, U.y, U.z, D.x, D.y, D.z, T.x, T.y, T.z)
            : _.push(U.x, U.y, U.z, T.x, T.y, T.z, D.x, D.y, D.z));
      };
    for (let U of [-1, 1]) {
      for (let T = 0; T < y.length - 1; T++) {
        let D = _t(y[T], A[T], 0),
          C = _t(y[T + 1], A[T + 1], 0),
          G = _t(y[T], m[T], U * b[T]),
          j = _t(y[T + 1], m[T + 1], U * b[T + 1]),
          N = _t(y[T], 0.5 + Math.max(0, m[T] - 0.22) * 0.6, U * (b[T] + 0.1)),
          Q = _t(
            y[T + 1],
            0.5 + Math.max(0, m[T + 1] - 0.22) * 0.6,
            U * (b[T + 1] + 0.1),
          );
        (M(D, C, j), M(D, j, G), M(G, j, Q), M(G, Q, N));
      }
      (M(
        _t(-3.4, A[0], 0),
        _t(-3.4, m[0], U * b[0]),
        _t(-3.4, 0.78, U * (b[0] + 0.1)),
      ),
        M(
          _t(-3.4, A[0], 0),
          _t(-3.4, 0.78, U * (b[0] + 0.1)),
          _t(-3.4, 0.78, 0),
        ));
    }
    let E = new nt();
    (E.setAttribute("position", new He(_, 3)),
      E.computeVertexNormals(),
      l(o, E),
      l(n, Ee(-3.38, 0.2, -0.86, 2.1, 0.26, 0.86), u),
      l(n, Ee(2, 0.26, -0.62, 2.85, 0.56, 0.62, 0.05), u),
      l(o, Ee(-3.46, 0.1, -0.92, -3.34, 0.8, 0.92, 0.02)),
      l(r, Ke([3.2, 0.95, -0.12], [3.2, 0.95, 0.12], 0.02, 5)),
      l(r, Ke([3.2, 0.8, 0], [3.2, 0.95, 0], 0.018, 5)),
      l(s, Ee(0.3, 0.26, -0.4, 1, 1.12, 0.4, 0.05), [1, 0.9, 0.85]),
      l(o, jt([0.28, 1.14, 0], [0.86, 1.3, 0], 0.76, 0.05)));
    let w = Ee(-0.012, 0, -0.42, 0.012, 0.5, 0.42);
    (w.rotateZ(0.42), w.translate(0.95, 1.2, 0), l(a, w));
    for (let U of [-0.43, 0.43])
      l(
        r,
        Ke(
          [0.95, 1.2, U],
          [0.95 - Math.sin(0.42) * 0.52, 1.2 + Math.cos(0.42) * 0.52, U],
          0.016,
          5,
        ),
      );
    l(
      r,
      Ke(
        [0.95 - Math.sin(0.42) * 0.52, 1.2 + Math.cos(0.42) * 0.52, -0.43],
        [0.95 - Math.sin(0.42) * 0.52, 1.2 + Math.cos(0.42) * 0.52, 0.43],
        0.016,
        5,
      ),
    );
    let S = new Ci(0.18, 0.017, 6, 18);
    (S.rotateY(Math.PI / 2),
      S.rotateZ(-0.5),
      S.translate(0.2, 1.12, -0.12),
      l(o, S),
      l(r, Ke([0.2, 1.12, -0.12], [0.36, 1.03, -0.12], 0.02, 5)));
    for (let U of [0, 2.1, 4.2])
      l(
        r,
        Ke(
          [0.2, 1.12, -0.12],
          [
            0.2 + Math.sin(-0.5) * Math.cos(U) * -0.17,
            1.12 + Math.cos(-0.5) * Math.cos(U) * 0.17,
            -0.12 + Math.sin(U) * 0.17,
          ],
          0.01,
          4,
        ),
      );
    (l(o, Ee(0.34, 1.16, 0.16, 0.5, 1.34, 0.3, 0.02)),
      l(r, Ke([0.42, 1.34, 0.23], [0.36, 1.48, 0.23], 0.012, 4)),
      l(r, Ke([0.35, 0.3, -0.46], [0.35, 1, -0.46], 0.02, 5)),
      l(r, Ke([0.35, 1, -0.46], [0.95, 1, -0.46], 0.02, 5)),
      l(r, Ke([0.35, 0.3, 0.46], [0.35, 1, 0.46], 0.02, 5)),
      l(r, Ke([0.35, 1, 0.46], [0.95, 1, 0.46], 0.02, 5)));
    for (let U of [-0.75, -1.75])
      (l(
        s,
        Ee(U - 0.28, 0.26, -0.2, U + 0.28, 0.82, 0.2, 0.05),
        [1, 0.9, 0.85],
      ),
        l(o, Ee(U - 0.3, 0.82, -0.22, U + 0.3, 0.93, 0.22, 0.04)),
        l(o, Ee(U - 0.34, 0.93, -0.2, U - 0.26, 1.2, 0.2, 0.03)),
        l(r, Ke([U + 0.3, 0.6, -0.22], [U + 0.3, 1.02, 0], 0.014, 4)),
        l(r, Ke([U + 0.3, 0.6, 0.22], [U + 0.3, 1.02, 0], 0.014, 4)));
    l(s, Ee(-2.9, 0.26, -0.3, -2.45, 0.58, 0.3, 0.04), [1.1, 0.5, 0.4]);
    for (let U of [-1, 1])
      (l(r, Ke([-2.95, 0.55, U * 0.9], [-2.75, 2, U * 0.55], 0.03, 6)),
        l(r, Ke([-2.3, 0.55, U * 0.9], [-2.75, 1.3, U * 0.7], 0.022, 5)));
    (l(r, Ke([-2.75, 2, -0.55], [-2.75, 2, 0.55], 0.03, 6)),
      l(r, Ee(-2.88, 2, -0.2, -2.62, 2.04, 0.2)),
      l(o, xt(0.05, 0.06, 0.1, "y", -2.75, 2.09, 0, 8)),
      l(o, Ke([-2.75, 2, 0.42], [-2.9, 3.7, 0.46], 0.011, 5)),
      l(o, xt(0.16, 0.16, 0.07, "y", -2.75, 2.1, -0.36, 10)));
    for (let U of [-0.36, 0.36])
      (l(r, Ee(-3.6, 0.42, U - 0.16, -3.44, 0.78, U + 0.16, 0.02)),
        l(o, Ee(-4.1, 0.78, U - 0.23, -3.48, 1.4, U + 0.23, 0.09)),
        l(n, Ee(-4.11, 1, U - 0.235, -3.47, 1.05, U + 0.235), [1.4, 1.4, 1.4]),
        l(o, Ee(-3.92, -0.05, U - 0.085, -3.62, 0.8, U + 0.085, 0.03)),
        l(o, Ee(-4.02, -0.52, U - 0.04, -3.6, -0.05, U + 0.04, 0.015)),
        l(o, xt(0.07, 0.03, 0.42, "x", -3.9, -0.3, U, 8)));
    for (let U of [-1.8, 0.4, 1.7])
      (l(s, xt(0.11, 0.11, 0.42, "y", U, 0.42, 1.36, 10), [1.2, 0.8, 0.7]),
        l(n, Ke([U, 0.63, 1.36], [U, 0.78, 1.12], 0.01, 4), h));
    let z = new Ci(0.26, 0.07, 6, 16);
    (z.rotateY(Math.PI / 2),
      z.translate(1.02, 0.72, 0),
      l(s, z, [1.3, 0.6, 0.45]));
    let H = t.build({ cast: !0, recv: !0 });
    (e.add(Bn(-2.75, 2.2, 0, 0.075), [1.2, 11, 3.2], 1.5, 0, 0.1),
      e.add(Bn(-2.75, 2.2, 0, 0.074), [1.2, 11, 3.2], 1.5, 0.2, 0.08));
    let O = e.build();
    O && ((O.frustumCulled = !1), H.add(O));
    let q = new wt();
    return (
      (q.name = "boat"),
      q.add(H),
      (q.userData.noMerge = !0),
      { root: q, hullGrp: H, tris: t.tris }
    );
  }

var dv = new Ve(12172214),
    k1 = (i, e = 1) => {
      let t = new Ve(i);
      return [(e * t.r) / dv.r, (e * t.g) / dv.g, (e * t.b) / dv.b];
    },
    yb = [
      8200729, 8200729, 6957596, 2047846, 2047846, 2307146, 2906692, 2906692,
      11751962, 9062946, 5922920, 5922920, 4146764, 2055523, 10121752, 8093308,
      6962468, 6962468,
    ].map((i) => k1(i)),
    L1 = [
      [0.6, 0.17, 0.13],
      [0.17, 0.29, 0.5],
      [0.2, 0.42, 0.3],
      [0.76, 0.35, 0.12],
      [0.78, 0.6, 0.16],
      [0.8, 0.81, 0.78],
      [0.4, 0.43, 0.47],
      [0.16, 0.42, 0.45],
      [0.55, 0.2, 0.15],
      [0.2, 0.3, 0.45],
    ],
    _b = (i, e, t) => {
      let n = Math.min(1, Math.max(0, (t - i) / (e - i)));
      return n * n * (3 - 2 * n);
    },
    bb = (i, e) => 1 - 0.6 * _b(38, 160, Math.hypot(i + 5, e));

function Mb(i, e) {
    let t = new io(),
      n = so(i, "paint_white"),
      s = uv(90417),
      o = [5.5, 4.3, 2.9],
      r = [8, 0.45, 0.25],
      a = [0, 0, 0];
    function l(D, C, G, j, N = 1) {
      let Q = rl(C * 0.23 + 1.3, G * 0.31, j * 0.23 + 7.7),
        K = rl(C * 1.9 + 4.1, 2.2, j * 1.9 + 9.3),
        ie = N * (0.56 + 0.52 * Q) * (0.62 + 0.38 * _b(0, 5, G)),
        F = D[0] * ie,
        X = D[1] * ie,
        ne = D[2] * ie;
      if (K > 0.62) {
        let re = Math.min(1, (K - 0.62) / 0.3) * 0.55;
        ((F = F * (1 - re) + 0.3 * re * ie),
          (X = X * (1 - re) + 0.15 * re * ie),
          (ne = ne * (1 - re) + 0.08 * re * ie));
      }
      return ((a[0] = F), (a[1] = X), (a[2] = ne), a);
    }
    let c = (D, C) => {
        if (!D) return;
        if (Array.isArray(D)) {
          for (let Q of D) c(Q, C);
          return;
        }
        D.computeBoundingBox();
        let G = D.boundingBox,
          j = (G.min.x + G.max.x) / 2,
          N = (G.min.z + G.max.z) / 2;
        if (j < 31) {
          let Q = bb(j, N);
          (Lc(D, (K, ie, F) => l(C, K, ie, F, Q)), t.add(n, D));
        } else t.add(n, D, C);
      },
      u = [],
      h = [],
      f = [],
      p = [];
    function d(D, C, G) {
      let j = D[1][0] - D[0][0],
        N = D[1][1] - D[0][1],
        Q = D[1][2] - D[0][2],
        K = D[3][0] - D[0][0],
        ie = D[3][1] - D[0][1],
        F = D[3][2] - D[0][2],
        X =
          (N * F - Q * ie) * C[0] +
            (Q * K - j * F) * C[1] +
            (j * ie - N * K) * C[2] <
          0;
      for (let ne of X ? [0, 2, 1, 0, 3, 2] : [0, 1, 2, 0, 2, 3]) {
        let re = D[ne];
        (u.push(re[0], re[1], re[2]),
          h.push(C[0], C[1], C[2]),
          p.push(G[ne][0], G[ne][1], G[ne][2]),
          Math.abs(C[0]) > 0.5
            ? f.push(re[2], re[1])
            : Math.abs(C[1]) > 0.5
              ? f.push(re[0], re[2])
              : f.push(re[0], re[1]));
      }
    }
    let v = [0.866, -0.5, 0],
      g = (D, C, G) => C.map((j) => l(D, j[0], j[1], j[2], G).slice());
    function x(D, C, G, j, N, Q, K, ie, F) {
      for (let X of ie) {
        let ne, re;
        X === "E"
          ? ((ne = [
              [j, C, Q],
              [j, C, G],
              [j, N, G],
              [j, N, Q],
            ]),
            (re = v))
          : X === "W"
            ? ((ne = [
                [D, C, G],
                [D, C, Q],
                [D, N, Q],
                [D, N, G],
              ]),
              (re = [-1, 0, 0]))
            : X === "S"
              ? ((ne = [
                  [D, C, Q],
                  [j, C, Q],
                  [j, N, Q],
                  [D, N, Q],
                ]),
                (re = [0, 0, 1]))
              : X === "N"
                ? ((ne = [
                    [j, C, G],
                    [D, C, G],
                    [D, N, G],
                    [j, N, G],
                  ]),
                  (re = [0, 0, -1]))
                : ((ne = [
                    [D, N, Q],
                    [j, N, Q],
                    [j, N, G],
                    [D, N, G],
                  ]),
                  (re = [0, 1, 0]));
        let $ = g(K, ne, X === "T" ? F * 0.8 : X === "E" ? F * 0.92 : F);
        if (C < 0.1 && X !== "T")
          for (let ue of [0, 1])
            (($[ue][0] *= 0.62), ($[ue][1] *= 0.62), ($[ue][2] *= 0.62));
        d(ne, re, $);
      }
    }
    function y(
      D,
      C,
      G,
      { faceZ: j = 0, ribs: N = !1, doorRows: Q = 0, west: K = !1 } = {},
    ) {
      let ie = Math.sign(G - C),
        F = [];
      for (let re = C, $ = 1; ie > 0 ? re < G : re > G; re += ie * 2.62, $++)
        $ % 8 >= 1 &&
          $ % 8 <= 5 &&
          F.push({ z: re, blk: Math.floor($ / 8), first: $ === 1 });
      let X = F.map((re, $) =>
          D.map((ue, me) => {
            let ee = rl(ue * 0.04 + 3, 0.5, re.z * 0.05 + 7),
              B = Math.round(0.2 + ee * 5.4 + (s() - 0.5) * 2.4);
            return (
              !re.first && s() < 0.07 && (B = 0),
              Math.max(re.first ? 2 : 0, Math.min(5, B))
            );
          }),
        ),
        ne = (re, $) =>
          re >= 0 && re < F.length && $ >= 0 && $ < D.length ? X[re][$] : 0;
      F.forEach((re, $) =>
        D.forEach((ue, me) => {
          let ee = X[$][me],
            B = re.z,
            P = bb(ue, B),
            V = Math.max(Math.abs(ue + 5) - 40, Math.abs(B) - 30) < 55,
            Y = (L, Z) =>
              L >= 0 &&
              Z >= 0 &&
              L < D.length &&
              Z < D.length &&
              Math.abs(D[L] - D[Z]) < 12.8;
          for (let L = 0; L < ee; L++) {
            let Z = yb[Math.floor(s() * yb.length)],
              J = 0.6 + s() * 0.4,
              oe = [Z[0] * J, Z[1] * J, Z[2] * J],
              fe = (s() - 0.5) * 0.22,
              le = L * 2.6,
              R = ue - 6.095 + fe,
              I = ue + 6.095 + fe,
              se = B - 1.22,
              ae = B + 1.22,
              k = L === ee - 1 ? "T" : "";
            for (let Pe of j ? [j] : [-1, 1]) {
              let Re = $ + Pe * ie;
              (!(
                Re >= 0 &&
                Re < F.length &&
                F[Re].blk === re.blk &&
                Math.abs(F[Re].z - B) < 2.7
              ) ||
                ne(Re, me) <= L) &&
                (k += Pe > 0 ? "S" : "N");
            }
            let ce = !(Y(me - 1, me) && ne($, me - 1) > L),
              ve = !K && !(Y(me + 1, me) && ne($, me + 1) > L);
            (ce && (k += "E"),
              ve && (k += "W"),
              x(R, le, se, I, le + 2.59, ae, oe, k, P));
            let _e = [oe[0] * 0.45, oe[1] * 0.45, oe[2] * 0.45],
              Te = re.first
                ? j
                  ? [j]
                  : [-ie]
                : me === 0 && K && Math.abs(B) < 42
                  ? [-1, 1].filter((Pe) => k.includes(Pe > 0 ? "S" : "N"))
                  : [];
            if (N && V && Te.length) {
              let Pe = Te;
              for (let Re of Pe) {
                let Fe = Re > 0 ? ae : se,
                  ze = Fe + Re * 0.04,
                  We = le + 0.15,
                  Ne = le + 2.45,
                  dt = [oe[0] * 0.7, oe[1] * 0.7, oe[2] * 0.7];
                for (let xe = R + 0.24; xe < I - 0.3; xe += 0.575) {
                  let Ie = [
                    [xe, We, Fe],
                    [xe + 0.07, We, ze],
                    [xe + 0.07, Ne, ze],
                    [xe, Ne, Fe],
                  ];
                  (d(Ie, [-0.5, 0, Re * 0.87], g(dt, Ie, P)),
                    (Ie = [
                      [xe + 0.07, We, ze],
                      [xe + 0.2, We, ze],
                      [xe + 0.2, Ne, ze],
                      [xe + 0.07, Ne, ze],
                    ]),
                    d(Ie, [0, 0, Re], g(oe, Ie, P)),
                    (Ie = [
                      [xe + 0.2, We, ze],
                      [xe + 0.27, We, Fe],
                      [xe + 0.27, Ne, Fe],
                      [xe + 0.2, Ne, ze],
                    ]),
                    d(Ie, [0.42, -0.52, Re * 0.74], g(dt, Ie, P)));
                }
                for (let [xe, Ie] of [
                  [le, We],
                  [Ne, le + 2.59],
                ]) {
                  let Be = Fe + Re * 0.05,
                    Xe = [
                      [R, xe, Be],
                      [I, xe, Be],
                      [I, Ie, Be],
                      [R, Ie, Be],
                    ];
                  (d(Xe, [0, 0, Re], g(_e, Xe, P)),
                    (Xe = [
                      [R, Ie, Fe],
                      [I, Ie, Fe],
                      [I, Ie, Be],
                      [R, Ie, Be],
                    ]),
                    d(Xe, [0, xe === le ? 1 : -1, 0], g(_e, Xe, P)));
                }
              }
            }
            if (ce && me === 0 && $ < Q) {
              let Pe = I + 0.03,
                Re = I + 0.055,
                Fe = le + 0.02,
                ze = le + 2.57,
                We = [oe[0] * 0.55, oe[1] * 0.55, oe[2] * 0.55],
                Ne = [0.34, 0.35, 0.36],
                dt = [0.05, 0.05, 0.055],
                xe = (Ie, Be, Xe, Me, we, be) => {
                  let Oe = [
                      [Ie, Me, Xe],
                      [Ie, Me, Be],
                      [Ie, we, Be],
                      [Ie, we, Xe],
                    ],
                    pt = g(be, Oe, P);
                  if (le < 0.1 && Me < 0.3)
                    for (let ut of [0, 1])
                      ((pt[ut][0] *= 0.62),
                        (pt[ut][1] *= 0.62),
                        (pt[ut][2] *= 0.62));
                  d(Oe, v, pt);
                };
              (xe(Pe, se, se + 0.13, Fe, ze, We),
                xe(Pe, ae - 0.13, ae, Fe, ze, We),
                xe(Pe, se + 0.13, ae - 0.13, le, le + 0.15, We),
                xe(Pe, se + 0.13, ae - 0.13, le + 2.44, le + 2.59, We),
                xe(Pe, B - 0.018, B + 0.018, le + 0.15, le + 2.44, dt));
              for (let Ie of [-0.8, -0.32, 0.32, 0.8])
                if (
                  (xe(
                    Re,
                    B + Ie - 0.024,
                    B + Ie + 0.024,
                    le + 0.1,
                    le + 2.5,
                    Ne,
                  ),
                  $ < 8)
                )
                  for (let Be of [0.32, 2.2])
                    xe(
                      Re + 0.01,
                      B + Ie - 0.07,
                      B + Ie + 0.07,
                      le + Be,
                      le + Be + 0.09,
                      Ne,
                    );
              if ($ < 8)
                for (let Ie of [-0.56, 0.56])
                  xe(
                    Re + 0.01,
                    B + Ie - 0.1,
                    B + Ie + 0.1,
                    le + 1.02,
                    le + 1.1,
                    Ne,
                  );
            }
          }
        }),
      );
    }
    let b = [-48.6, -61.2, -73.8, -90.5, -103.1, -115.7, -132, -144.6],
      m = [6.3, -6.3, -18.9, -31.5];
    (y(b, -4.9, -112, { ribs: !0, doorRows: 15, west: !0 }),
      y(b, 14.9, 112, { ribs: !0, doorRows: 15, west: !0 }),
      y(m, -36.4, -110, { faceZ: 1, ribs: !0, doorRows: 12 }),
      y(m, 33.9, 110, { faceZ: -1, ribs: !0, doorRows: 12 }));
    {
      let D = new nt();
      (D.setAttribute("position", new He(u, 3)),
        D.setAttribute("normal", new He(h, 3)),
        D.setAttribute("uv", new He(f, 2)),
        D.setAttribute("color", new He(p, 3)),
        t.add(n, D));
    }
    let A = k1(5922920, 0.85),
      _ = [0.1, 0.1, 0.11],
      M = [0.36, 0.38, 0.4],
      E = k1(12159516, 0.5),
      w = [0.5, 0.5, 0.48];
    function S(D, C, G, j, N) {
      let K = G,
        ie = [K[0] * 0.7, K[1] * 0.7, K[2] * 0.7];
      for (let ne of [-1, 1]) {
        let re = C + ne * 9.5;
        for (let $ of [-1, 1]) {
          let ue = D + $ * 7.5;
          (c(Ee(ue - 1.5, 0.05, re - 0.28, ue + 1.5, 0.8, re + 0.28), _),
            c(Ee(ue - 0.36, 0.8, re - 0.36, ue + 0.36, 19.1, re + 0.36), K),
            c(Ee(ue - 0.4, 6.9, re - 0.4, ue + 0.4, 7, re + 0.4), ie),
            c(Ee(ue - 0.4, 13, re - 0.4, ue + 0.4, 13.1, re + 0.4), ie),
            c(jt([ue, 14.6, re], [ue - $ * 3.2, 19.1, re], 0.3, 0.3), K));
        }
        (c(Ee(D - 9.3, 0.8, re - 0.4, D + 9.3, 1.7, re + 0.4), K),
          c(Ee(D - 8, 19.1, re - 0.45, D + 8, 20.2, re + 0.45), K),
          c(Ee(D - 2.4, 1.7, re - 0.5, D + 0.8, 3.9, re + 0.5), w));
      }
      for (let ne of [-1, 1]) {
        let re = D + ne * 3.3,
          $ = C - 9.5 - 5.6,
          ue = C + 9.5 + 5.6;
        c(Ee(re - 0.45, 20.2, $, re + 0.45, 21.9, ue), K);
        for (let me = $ + 4.4; me < ue; me += 4.4)
          c(Ee(re - 0.48, 20.15, me - 0.03, re + 0.48, 21.95, me + 0.03), ie);
        (c(Ee(re + ne * 0.45, 21, $, re + ne * 1.3, 21.05, ue), M),
          ns(
            z,
            null,
            [
              [re + ne * 1.27, 21.05, $],
              [re + ne * 1.27, 21.05, ue],
            ],
            { post: 3.3, r: 0.035, mid: !1, tint: E },
          ),
          c(
            Ke([re, 20.2, C - 9.5 + 0.5], [re, 20.2, C + 9.5 - 0.5], 0.05, 4),
            _,
          ));
      }
      for (let ne of [C - 9.5 - 5.4, C + 9.5 + 5.4])
        c(Ee(D - 3.3, 20.4, ne - 0.25, D + 3.3, 21.7, ne + 0.25), K);
      let F = C + j;
      (c(Ee(D - 4, 21.9, F - 2.3, D + 4, 22.5, F + 2.3), E),
        c(Ee(D - 2.6, 22.5, F - 1.7, D + 1.4, 24.5, F + 1.7), w),
        c(Ee(D + 1.8, 22.5, F - 0.9, D + 3.4, 23.3, F + 0.9), _),
        c(Ee(D + 4.3, 17.2, F - 1, D + 6.1, 19.5, F + 1), w),
        c(
          Ee(D + 4.4, 18.2, F - 1.02, D + 6.12, 19.2, F + 1.02),
          [0.08, 0.1, 0.12],
        ));
      for (let ne of [-0.9, 0.9])
        c(Ee(D + 4.9, 19.5, F + ne - 0.06, D + 5.05, 21.9, F + ne + 0.06), E);
      let X = 21.9 - N;
      for (let ne of [-2.2, 2.2])
        for (let re of [-0.8, 0.8])
          c(Ke([D + ne, 21.9, F + re], [D + ne, X, F + re], 0.03, 4), _);
      (c(Ee(D - 6.1, X - 0.4, F - 1.22, D + 6.1, X, F + 1.22), E),
        c(Ee(D - 2.4, X, F - 0.9, D + 2.4, X + 0.5, F + 0.9), E));
      {
        let ne = D - 7.5 - 0.5,
          re = C - 9.5,
          $ = 1.7;
        for (let ue = 0; ue < 6; ue++) {
          let me = re + (ue % 2 ? 1.9 : -1.9),
            ee = re + (ue % 2 ? -1.9 : 1.9),
            B = Math.min(20.2, $ + 3.1);
          (c(jt([ne, $, me], [ne, B, ee], 0.6, 0.07), M),
            c(Ke([ne - 0.3, $ + 1, me], [ne - 0.3, B + 1, ee], 0.03, 4), E),
            c(Ee(ne - 0.35, B - 0.04, ee - 0.5, ne + 0.35, B, ee + 0.5), M),
            ($ = B));
        }
        for (let ue of [-2.4, 2.4])
          c(
            Ee(ne - 0.3, 1.7, re + ue - 0.05, ne - 0.2, 20.2, re + ue + 0.05),
            ie,
          );
        (c(xt(1.25, 1.25, 0.5, "z", D + 7.5 + 1, 3.3, C + 9.5 + 0.9, 12), E),
          c(xt(0.5, 0.5, 0.6, "z", D + 7.5 + 1, 3.3, C + 9.5 + 0.9, 8), _));
        for (let ue of [-0.2, 0.2])
          c(
            Ke(
              [D + 7.5 + 0.45, 1.7, C - 9.5 + ue],
              [D + 7.5 + 0.45, 20.2, C - 9.5 + ue],
              0.022,
              4,
            ),
            M,
          );
      }
      (e.add(Bn(D, 24.9, F, 0.3), r, 3.1, s(), 0.4),
        e.add(Bn(D - 3.3, 20, C - 4, 0.24), o, 0),
        e.add(Bn(D + 3.3, 20, C + 4, 0.24), o, 0));
    }
    let z = { add: (D, C, G) => c(C, G) },
      H = k1(6172444, 0.7);
    (S(-61, -52.06, A, -3, 4.5),
      S(-61, 41.1, H, 5, 9),
      S(-103, -10.14, H, 2, 3),
      S(-6, -62.6, A, -6, 7),
      S(-12, 60.1, A, 4, 5));
    for (let [D, C, G] of [
      [-67.5, -22, 32],
      [-67.5, 31, 32],
      [-122, 4, 34],
      [-12.6, -53, 30],
      [-12.6, 51, 30],
      [-140, -84, 34],
      [-96, 96, 34],
      [0.2, -100, 30],
      [-52, -70, 28],
      [-55, 72, 28],
      [-84, -45, 34],
      [-84, 24, 34],
      [-25, -84, 30],
      [-28, 90, 30],
      [-120, 60, 34],
      [10.5, 49, 26],
    ]) {
      (c(xt(0.14, 0.3, G, "y", D, G / 2, C, 6), M),
        c(xt(1.5, 1.5, 0.18, "y", D, G - 0.5, C, 8), _));
      for (let [j, N] of [
        [-1.4, 0],
        [1.4, 0],
        [0, -1.4],
        [0, 1.4],
      ])
        (c(
          Ee(
            D + j - 0.25,
            G - 0.95,
            C + N - 0.25,
            D + j + 0.25,
            G - 0.6,
            C + N + 0.25,
          ),
          _,
        ),
          e.add(Bn(D + j, G - 1.05, C + N, 0.2), o, 0));
    }
    for (let [D, C, G] of [
      [-158, -30, 62],
      [-76, -128, 48],
      [-150, 104, 54],
    ]) {
      let N = [
        [-1.1, -0.638],
        [1.1, -0.638],
        [0, 1.265],
      ];
      for (let [Q, K] of N)
        c(
          Ke([D + Q, 0, C + K], [D + Q * 0.3, G, C + K * 0.3], 0.07, 4),
          [0.42, 0.14, 0.1],
        );
      for (let Q = 3, K = 0; Q < G; Q += 6, K++)
        for (let ie = 0; ie < 3; ie++) {
          let F = N[ie],
            X = N[(ie + 1) % 3],
            ne = 1 - (0.7 * Q) / G,
            re = 1 - (0.7 * Math.min(G, Q + 6)) / G;
          c(
            Ke(
              [D + F[0] * ne, Q, C + F[1] * ne],
              [D + X[0] * re, Math.min(G, Q + 6), C + X[1] * re],
              0.04,
              3,
            ),
            K % 2 ? w : [0.42, 0.14, 0.1],
          );
        }
      for (let Q of [0.5, 2.6, 4.7])
        c(
          Ke(
            [D, G * 0.72, C],
            [D + Math.cos(Q) * G * 0.5, 0, C + Math.sin(Q) * G * 0.5],
            0.025,
            3,
          ),
          _,
        );
      (c(Ke([D, G, C], [D, G + 5, C], 0.04, 3), _),
        c(Ee(D - 0.9, G * 0.8, C - 0.25, D + 0.9, G * 0.8 + 1.6, C + 0.25), w),
        e.add(Bn(D, G + 0.4, C, 0.35), r, 2.4, s(), 0.45),
        e.add(Bn(D, G * 0.55, C, 0.28), r, 0));
    }
    for (let [D, C, G] of [
      [-178, -70, 90],
      [-182, 40, 110],
      [-60, -150, 70],
      [-70, 150, 80],
    ]) {
      let j = Math.abs(C) > 120,
        N = (Q, K, ie, F, X, ne, re) =>
          c(
            j
              ? Ee(D + Q, K, C + ie, D + F, X, C + ne)
              : Ee(D + ie, K, C + Q, D + ne, X, C + F),
            re,
          );
      (N(-G / 2, 0, -16, G / 2, 9.5, 16, [0.2, 0.22, 0.24]),
        N(-G / 2, 9.5, -16.4, G / 2, 9.9, 16.4, [0.12, 0.12, 0.13]),
        N(-G / 2, 9.9, -10, G / 2, 12.2, 10, [0.17, 0.18, 0.2]),
        N(-G / 2 + 4, 12.2, -1.2, G / 2 - 4, 13.3, 1.2, [0.13, 0.13, 0.14]));
      for (let Q = -G / 2 + 6; Q < G / 2 - 5; Q += 12)
        (N(Q - 0.25, 0, -16.2, Q + 0.25, 9.5, 16.2, [0.13, 0.14, 0.15]),
          (Q | 0) % 3 === 0 &&
            N(Q + 2, 0, -16.1, Q + 8, 6.2, 16.1, [0.06, 0.06, 0.07]));
    }
    (z1(i, e, { into: t, mat: n, dz: 66 }),
      [
        [-132, 1.15, !0, [0.14, 0.17, 0.21]],
        [-186, 1.25, !1, [0.14, 0.17, 0.21]],
        [-252, 1.35, !0, [0.26, 0.12, 0.06]],
        [-336, 1.4, !1, [0.26, 0.12, 0.06]],
        [128, 1.2, !1, [0.14, 0.17, 0.21]],
        [182, 1.3, !0, [0.24, 0.25, 0.27]],
        [250, 1.4, !1, [0.24, 0.25, 0.27]],
        [330, 1.45, !0, [0.26, 0.12, 0.06]],
      ].forEach(([D, C, G, j], N) => {
        let Q = mb(t, n, 23.5, D, { s: C, up: G, tint: j });
        e.add(
          Bn(Q[0], Q[1], Q[2], 0.45 * C),
          r,
          2.6 + (N % 3) * 0.35,
          N * 0.37,
          0.45,
        );
      }),
      c(Ee(-230, -1.6, -384, 30, -0.12, 425), [0.24, 0.24, 0.25]));
    function q(D, C, G, j, N, Q, K) {
      (c(Ee(D, -1.6, G, C, N, j), Q),
        c(Ee(D, -1.6, G, C, 0.8, j + 0.2), [0.42, 0.14, 0.1]));
      let ie = j - G,
        F = G + ie * K;
      (c(Ee(D + 2, N, F - 7, C - 2, N + 17, F + 7), [0.72, 0.73, 0.7]),
        c(
          Ee((D + C) / 2 - 3, N + 17, F - 5, (D + C) / 2 + 3, N + 24, F + 1),
          [0.2, 0.3, 0.45],
        ));
      for (let X = G + 12; X < j - 12; X += 13.2) {
        if (Math.abs(X + 6 - F) < 14) continue;
        let ne = 2.6 * (2 + Math.floor(s() * 4)),
          re = L1[Math.floor(s() * L1.length)];
        c(Ee(D + 1, N, X, (D + C) / 2 - 0.2, N + ne, X + 12.2), re);
        let $ = L1[Math.floor(s() * L1.length)];
        c(
          Ee(
            (D + C) / 2 + 0.2,
            N,
            X,
            C - 1,
            N + ne - 2.6 * Math.floor(s() * 2),
            X + 12.2,
          ),
          $,
        );
      }
      e.add(Bn((D + C) / 2, N + 26, F, 0.4), [5, 4.6, 3.8], 0);
    }
    (q(34, 62, 140, 345, 11, [0.1, 0.13, 0.2], 0.78),
      q(34, 58, -360, -205, 10, [0.2, 0.08, 0.07], 0.2),
      q(470, 500, -190, -40, 9, [0.12, 0.14, 0.17], 0.8),
      q(600, 626, 160, 300, 9, [0.16, 0.12, 0.1], 0.2));
    for (let D = 340; D > -66; D -= 12.5) {
      let C = 398 + Math.sin(D * 0.013) * 14 + (s() - 0.5) * 3,
        G = Ee(-6 - s() * 2, -1.6, -7, 6 + s() * 2, 2.2 + s() * 1.2, 7);
      (G.rotateY((s() - 0.5) * 0.5),
        G.translate(C, 0, D),
        c(G, [0.2, 0.21, 0.22]));
    }
    {
      (c(xt(5, 6, 3.6, "y", 399, 0.2, -72, 10), [0.3, 0.3, 0.3]),
        c(xt(1.7, 2.3, 6, "y", 399, 5, -72, 10), [0.85, 0.85, 0.82]),
        c(xt(1.5, 1.7, 4, "y", 399, 10, -72, 10), [0.62, 0.14, 0.1]),
        c(xt(1.3, 1.5, 4, "y", 399, 14, -72, 10), [0.85, 0.85, 0.82]),
        c(xt(2, 2, 0.3, "y", 399, 16.1, -72, 10), [0.3, 0.3, 0.32]),
        c(xt(0.2, 1.3, 1.2, "y", 399, 18.9, -72, 8), [0.25, 0.25, 0.27]));
      for (let G = 0; G < 6; G++) {
        let j = (G / 6) * 6.283;
        c(
          Ee(
            399 + Math.cos(j) * 1.1 - 0.06,
            16.2,
            -72 + Math.sin(j) * 1.1 - 0.06,
            399 + Math.cos(j) * 1.1 + 0.06,
            18.3,
            -72 + Math.sin(j) * 1.1 + 0.06,
          ),
          [0.25, 0.25, 0.27],
        );
      }
      e.add(Bn(399, 17.25, -72, 0.85), [16, 15, 11], 6, 0, 0.09);
    }
    let U = 300;
    c(Ee(U - 330, -1.6, -520, U + 330, 2.2, -430), [0.16, 0.17, 0.18]);
    for (let [D, C, G, j] of [
      [-150, -452, 17, 15],
      [-112, -458, 17, 15],
      [-76, -450, 13, 18],
      [20, -455, 20, 14],
      [64, -462, 20, 14],
      [104, -452, 14, 19],
      [136, -462, 14, 19],
      [210, -456, 22, 12],
    ])
      (c(xt(G, G, j, "y", U + D, 2.2 + j / 2, C, 14), [0.62, 0.63, 0.62]),
        c(
          xt(G * 0.2, G, j * 0.12, "y", U + D, 2.2 + j * 1.06, C, 14),
          [0.52, 0.53, 0.53],
        ));
    for (let [D, C, G, j] of [
      [-32, -470, 96, 3.2],
      [168, -475, 70, 2.6],
    ]) {
      c(xt(j * 0.62, j, G, "y", U + D, 2.2 + G / 2, C, 10), [0.5, 0.5, 0.5]);
      for (let N of [0.82, 0.94])
        c(
          xt(j * 0.66, j * 0.7, G * 0.05, "y", U + D, 2.2 + G * N, C, 10),
          [0.6, 0.15, 0.1],
        );
      (e.add(Bn(U + D, 3.2 + G, C, 0.9), r, 2.2, s(), 0.5),
        e.add(Bn(U + D + j, 2.2 + G * 0.55, C, 0.7), r, 2.2, s(), 0.5));
    }
    for (let [D, C, G, j, N] of [
      [-230, -455, 70, 16, 30],
      [-10, -445, 30, 22, 18],
      [0, -452, 8, 44, 8],
      [-18, -450, 5, 36, 5],
      [270, -450, 60, 12, 30],
      [150, -448, 26, 28, 14],
    ])
      c(
        Ee(U + D - G / 2, 2.2, C - N / 2, U + D + G / 2, 2.2 + j, C + N / 2),
        [0.34, 0.36, 0.38],
      );
    for (let D = 0; D < 26; D++)
      e.add(
        Bn(U - 300 + s() * 600, 6 + s() * 26, -436 + s() * 6, 0.55),
        s() > 0.3 ? o : [3, 3.4, 3.8],
        0,
      );
    let T = t.build({ cast: !1, recv: !1 });
    return ((T.name = "skyline"), { root: T, tris: t.tris });
  }

function wb(i, e, t = 12) {
    let n = uv(5521),
      s = [],
      o = [],
      r = [];
    for (let u = 0; u < t; u++) {
      let f =
          u % 3 === 0
            ? [54 + n() * 30, 9 + n() * 14, -4 + n() * 56]
            : [16 + n() * 26, 33 + n() * 12, -14 + n() * 28],
        p = 9 + n() * 16,
        d = (0.16 + n() * 0.16) * (n() > 0.5 ? 1 : -1),
        v = n() * 6.283,
        g = 5 + n() * 3,
        x = [
          [0.15, 0, 0, 0],
          [-0.13, 0, 0, 0],
          [-0.24, 0, 0.8, 1],
          [0.15, 0, 0, 0],
          [-0.24, 0, -0.8, 1],
          [-0.13, 0, 0, 0],
        ];
      for (let y of x)
        (s.push(y[0], y[1] - 60, y[2]),
          o.push(f[0], f[1], f[2], p),
          r.push(d, v, g, y[3]));
    }
    let a = new nt();
    (a.setAttribute("position", new He(s, 3)),
      a.setAttribute("aOrbit", new He(o, 4)),
      a.setAttribute("aPar", new He(r, 4)));
    let l = new Nn({ color: new Ve(0.2, 0.21, 0.23), side: Sn, fog: !1 });
    ((l.onBeforeCompile = (u) => {
      ((u.uniforms.uTime = e),
        (u.vertexShader =
          `attribute vec4 aOrbit;
attribute vec4 aPar;
uniform float uTime;
` +
          u.vertexShader.replace(
            "#include <begin_vertex>",
            `
      float ga = aPar.y + uTime * aPar.x;
      float gdir = sign(aPar.x);
      vec3 gfw = vec3(-sin(ga), 0.0, cos(ga)) * gdir;
      vec3 grt = vec3(gfw.z, 0.0, -gfw.x);
      vec3 gl = position + vec3(0.0, 60.0, 0.0);
      float glide = smoothstep(-0.2, 0.5, sin(uTime * 0.31 + aPar.y * 3.0));
      float gflap = sin(uTime * aPar.z + aPar.y * 7.0) * mix(0.12, 0.55, glide) + 0.18;
      gl.y += aPar.w * gflap * abs(gl.z);
      gl.z *= mix(1.0, 0.86, aPar.w * abs(gflap));
      vec3 gc = aOrbit.xyz + vec3(cos(ga), 0.0, sin(ga)) * aOrbit.w + vec3(0.0, sin(ga * 0.7 + aPar.y) * 2.2 + sin(uTime * 0.23 + aPar.y) * 1.5, 0.0);
      vec3 transformed = gc + gfw * gl.x + grt * gl.z + vec3(0.0, gl.y - 0.3 * gdir * gl.z, 0.0);`,
          )));
    }),
      (l.customProgramCacheKey = () => "saltline-gulls"));
    let c = new Qe(a, l);
    return (
      (c.frustumCulled = !1),
      (c.castShadow = !1),
      (c.receiveShadow = !1),
      (c.name = "gulls"),
      c
    );
  }

var _R = ["crane", "ship", "boat", "sky"];

function Eb(i, { only: e = null, showcase: t = !1 } = {}) {
    let n = (b) => !e || e === b,
      s = new wt();
    s.name = "backdrop";
    let o = pb(),
      r = new W(31.5, -1.6, 21);
    t && r.set(24, 0.34, 15);
    let a = null,
      l = null,
      c = null,
      u = null,
      h = null;
    if (
      (n("boat") &&
        ((a = xb(i, o)),
        a.root.position.copy(r),
        (a.root.rotation.y = -Math.PI / 2),
        s.add(a.root)),
      a && !t)
    ) {
      let b = new io(),
        m = i.mats.get("rope");
      (b.add(
        m,
        kr(ua(_t(3.2, 0.95, 0.05), _t(4.6, 2.12, 2.3), 0.22, 7), 0.016, 5),
      ),
        b.add(
          m,
          kr(ua(_t(-3.25, 0.82, 0.95), _t(-4.6, 2.12, 2.3), 0.2, 7), 0.016, 5),
        ),
        a.root.add(b.build({ cast: !1, recv: !1 })));
    }
    (n("crane") && ((l = z1(i, o)), s.add(l.root)),
      n("ship") && ((c = vb(i, o)), s.add(c.root)),
      n("sky") && ((u = Mb(i, o)), s.add(u.root)),
      (n("sky") || n("crane")) && ((h = wb(i, o.uTime, 12)), s.add(h)));
    let f = o.build();
    (f && ((f.name = "backdrop-lamps"), (f.frustumCulled = !1), s.add(f)),
      i.scene.add(s));
    let p = [],
      d = (b, m) => {
        i.physics &&
          i.physics.addBox &&
          p.push(
            i.physics.addBox(b.min, b.max, {
              surface: m,
              tag: "backdrop",
              noNav: !!b.noNav,
            }),
          );
      };
    if (l) for (let b of l.colliders) d(b, "metal");
    if (c) for (let b of c.colliders) d(b, "metal");
    a &&
      !t &&
      d({ min: [30.25, -1.7, 17.4], max: [32.8, -0.7, 24.6] }, "rubber");
    let v = 0,
      g = 0;
    s.traverse((b) => {
      if (b.isMesh) {
        g++;
        let m = b.geometry;
        v += (m.index ? m.index.count : m.attributes.position.count) / 3;
      }
    });
    let x = 0;
    function y(b) {
      if (((x += b), (o.uTime.value = x), l)) {
        let m = l.spreader;
        ((m.rotation.x =
          0.012 * Math.sin(x * 0.52) + 0.004 * Math.sin(x * 1.31 + 1)),
          (m.rotation.z = 0.009 * Math.sin(x * 0.41 + 1.1)));
      }
      (c && (c.radar.rotation.y = x * 1.9),
        a &&
          ((a.root.position.y =
            r.y +
            (t
              ? 0
              : 0.05 * Math.sin(x * 1.15) + 0.025 * Math.sin(x * 2.3 + 1.3))),
          (a.hullGrp.rotation.x =
            0.05 * Math.sin(x * 0.9 + 0.4) + 0.016 * Math.sin(x * 2.1)),
          (a.hullGrp.rotation.z = 0.02 * Math.sin(x * 1.3 + 2))));
    }
    return (
      y(0),
      {
        update: y,
        root: s,
        boat: a ? a.root : new on(),
        crane: l ? l.root : null,
        ship: c ? c.root : null,
        skyline: u ? u.root : null,
        gulls: h,
        lamps: f,
        colliders: p,
        spreader: l ? l.spreader : null,
        boatBase: r,
        extractionPoint: new W(30, 0, 20),
        shipName: "EXTRACTION BOAT",
        craneId: "NS-04",
        stats: { tris: Math.round(v), drawCalls: g },
      }
    );
  }

async function pv(i) {
    return Eb(i, {});
  }

function MR(i) {
    let e = i.params && _R.includes(i.params.bshow) ? i.params.bshow : null,
      t = Eb(i, { only: e, showcase: !0 });
    console.log("[backdrop] " + JSON.stringify(t.stats));
    let n = {
      crane: { cam: [0, 1.7, 27], target: [33, 13, 0] },
      ship: { cam: [24, 1.7, -2], target: [38, 9, -24] },
      boat: { cam: [19.5, 1.7, 11.5], target: [24, 0.9, 15] },
      sky: { cam: [-32, 1.7, 6], target: [30, 9, 0] },
    };
    return { ...(n[e] || n.crane), update: (s) => t.update(s) };
  }

var vv = {};

br(vv, { create: () => O1, showcase: () => BR });

function F1(i, e, t) {
    let n =
      Math.imul(i | 0, 374761393) ^
      Math.imul(e | 0, 668265263) ^
      Math.imul(t | 0, 1274126177);
    return (
      (n = Math.imul(n ^ (n >>> 13), 1274126177)),
      ((n ^ (n >>> 16)) >>> 0) / 4294967296
    );
  }

function Ab(i, e, t, n) {
    let s = Math.floor(i),
      o = Math.floor(e),
      r = i - s,
      a = e - o,
      l = r * r * (3 - 2 * r),
      c = a * a * (3 - 2 * a),
      u = s,
      h = s + 1,
      f = o,
      p = o + 1;
    n &&
      ((u = ((u % n) + n) % n),
      (h = ((h % n) + n) % n),
      (f = ((f % n) + n) % n),
      (p = ((p % n) + n) % n));
    let d = F1(u, f, t),
      v = F1(h, f, t),
      g = F1(u, p, t),
      x = F1(h, p, t);
    return d + (v - d) * l + (g - d) * c + (d - v - g + x) * l * c;
  }

function fs(i, e, t, n = 4, s = 0) {
    let o = 0,
      r = 0.5,
      a = 0;
    for (let l = 0; l < n; l++)
      ((o += r * Ab(i, e, t + l * 17, s)),
        (a += r),
        (i *= 2),
        (e *= 2),
        (s *= 2),
        (r *= 0.5));
    return o / a;
  }

var So = (i) => (i < 0 ? 0 : i > 1 ? 1 : i),
    fl = (i, e, t) => {
      let n = So((t - i) / (e - i));
      return n * n * (3 - 2 * n);
    },
    wR = 0.385,
    Li = { x0: -44, z0: -40, size: 80 },
    Sb = [
      [-30.5, 6.6, 2.6, 1.7, 0.24],
      [-19.5, 5.2, 7.5, 1.5, 0.27],
      [-11.5, 7, 5, 1.2, 0.24],
      [-7.6, 5.6, 2.3, 1.7, 0.2],
      [5.6, 4.7, 3.3, 1.35, 0.26],
      [13, 6.6, 2.6, 1.2, 0.2],
      [-13, -1.3, 4.6, 1.5, 0.2],
      [1, -1.6, 3.4, 1.4, 0.18],
      [12.5, -1.4, 2.4, 1.3, 0.18],
      [-3.5, -8.2, 4.4, 1.6, 0.2],
      [-20, -8.6, 3.6, 1.6, 0.18],
      [14.6, -19.5, 2, 3.6, 0.2],
      [23.5, 6.9, 3.2, 2, 0.22],
      [23.2, -7.6, 3.4, 1.8, 0.2],
      [20.8, 1.5, 1.4, 3.6, 0.16],
      [23.5, 22.5, 3, 2, 0.2],
      [24, -25, 2.8, 2.6, 0.2],
      [-1, 16.5, 7, 1.7, 0.2],
      [11.5, 16.9, 3.6, 1.4, 0.18],
      [-17, 15.8, 3.2, 1.5, 0.18],
      [8.6, 12.3, 1.5, 3.4, 0.17],
      [-7.8, 19.5, 1.7, 3.6, 0.17],
      [-8, 25.8, 6, 1.3, 0.18],
      [9, 25.9, 4, 1.2, 0.18],
      [-32, -4, 2.6, 3.4, 0.18],
      [-31, 18, 3, 4, 0.18],
    ],
    Tb = 1,
    ER = 0.02;

function SR(i, e) {
    let t =
      0.5 +
      (fs(i / 8.5, e / 8.5, 11, 4) - 0.47) * 0.3 +
      (fs(i / 2.4, e / 2.4, 23, 3) - 0.5) * 0.14;
    for (let n = 0; n < Sb.length; n++) {
      let s = Sb[n],
        o = (i - s[0]) / (s[2] * Tb),
        r = (e - s[1]) / (s[3] * Tb),
        a = o * o + r * r;
      a < 9 && (t -= (s[4] + ER) * Math.exp(-a * a));
    }
    if (i > -37 && i < 29) {
      let n = 0.5 + 0.5 * Ab(i / 6, 3.1, 5),
        s = (e - 4.9) / 0.5,
        o = (e - 7.1) / 0.5,
        r = (e - 15.4) / 0.5,
        a = (e - 17.2) / 0.5,
        l =
          fl(0.14, 0.34, fs(i / 9, 7.7, 19, 2)) *
          fl(-27, -24, i) *
          (1 - fl(14, 17, i));
      t -=
        0.22 * (0.55 + 0.45 * n) * l * (Math.exp(-s * s) + Math.exp(-o * o)) +
        0.09 *
          n *
          (1 - fl(0.3, 0.6, fs(i / 9, 7.7, 19, 2))) *
          (Math.exp(-r * r) + Math.exp(-a * a));
    }
    return ((t += 0.25 * fl(28.6, 29.8, i)), t);
  }

function Rb(i) {
    let e = new Uint8Array(i * i * 4),
      { x0: t, z0: n, size: s } = Li,
      o = s / i;
    for (let r = 0; r < i; r++) {
      let a = n + (r + 0.5) * o;
      for (let l = 0; l < i; l++) {
        let c = t + (l + 0.5) * o,
          u = (r * i + l) * 4,
          h = SR(c, a);
        ((e[u] = Math.round(So(0.5 + (h - wR) * 2.5) * 255)),
          (e[u + 1] = Math.round(
            So(
              0.5 + (fs(c / 5.5, a / 5.5, 41, 3) - 0.5) * 1.5 + (0.5 - h) * 0.9,
            ) * 255,
          )));
        let f =
          fl(0.6, 0.78, fs(c / 1.4, a / 1.4, 77, 4)) *
          fl(0.47, 0.62, fs(c / 9, a / 9, 91, 2));
        ((e[u + 2] = Math.round(So(f) * 255)),
          (e[u + 3] = Math.round(
            So(
              fs(c / 22, a / 0.9, 57, 3) * 0.6 +
                fs(c / 13, a / 13, 63, 3) * 0.4,
            ) * 255,
          )));
      }
    }
    return e;
  }

function U1(i, e, t, n, s) {
    let o = ((t - Li.x0) / Li.size) * e - 0.5,
      r = ((n - Li.z0) / Li.size) * e - 0.5;
    ((o = o < 0 ? 0 : o > e - 1.001 ? e - 1.001 : o),
      (r = r < 0 ? 0 : r > e - 1.001 ? e - 1.001 : r));
    let a = o | 0,
      l = r | 0,
      c = o - a,
      u = r - l,
      h = (l * e + a) * 4 + s,
      f = e * 4;
    return (
      ((i[h] * (1 - c) + i[h + 4] * c) * (1 - u) +
        (i[h + f] * (1 - c) + i[h + f + 4] * c) * u) /
      255
    );
  }

function Cb(i) {
    let e = new Uint8Array(i * i * 4),
      t = new Uint8Array(i * i * 4),
      n = new Float32Array(i * i),
      s = new Float32Array(i * i);
    for (let r = 0; r < i; r++)
      for (let a = 0; a < i; a++) {
        let l = a / i,
          c = r / i,
          u = r * i + a,
          h =
            fs(l * 96, c * 96, 3, 2, 96) * 0.6 +
            fs(l * 40, c * 40, 9, 2, 40) * 0.4,
          f = fs(l * 6, c * 6, 21, 4, 6),
          p = (fs(l * 8, c * 8, 31, 2, 8) - 0.5) * 0.25,
          d = (fs(l * 8, c * 8, 37, 2, 8) - 0.5) * 0.25,
          v = 1 - Math.abs(2 * fs((l + p) * 5, (c + d) * 5, 43, 3, 5) - 1),
          g = fs(l * 28, c * 28, 51, 3, 28);
        ((e[u * 4] = Math.round(So(h) * 255)),
          (e[u * 4 + 1] = Math.round(So(f) * 255)),
          (e[u * 4 + 2] = Math.round(So(v) * 255)),
          (e[u * 4 + 3] = Math.round(So(g) * 255)),
          (n[u] = h),
          (s[u] = fs(l * 9, c * 9, 71, 4, 9)));
      }
    let o = (r) => (r + i) % i;
    for (let r = 0; r < i; r++)
      for (let a = 0; a < i; a++) {
        let l = r * i + a,
          c = (n[r * i + o(a + 1)] - n[r * i + o(a - 1)]) * 2.2,
          u = (n[o(r + 1) * i + a] - n[o(r - 1) * i + a]) * 2.2,
          h = (s[r * i + o(a + 2)] - s[r * i + o(a - 2)]) * 9,
          f = (s[o(r + 2) * i + a] - s[o(r - 2) * i + a]) * 9;
        ((t[l * 4] = Math.round(So(0.5 - c) * 255)),
          (t[l * 4 + 1] = Math.round(So(0.5 - u) * 255)),
          (t[l * 4 + 2] = Math.round(So(0.5 - h) * 255)),
          (t[l * 4 + 3] = Math.round(So(0.5 - f) * 255)));
      }
    return { det: e, nrm: t };
  }

function N1(i, e, { repeat: t = !0, aniso: n = 1 } = {}) {
    let s = new ui(i, e, e, _n, yi);
    return (
      (s.wrapS = s.wrapT = t ? Is : Bi),
      (s.magFilter = Zt),
      (s.minFilter = Ln),
      (s.generateMipmaps = !0),
      (s.anisotropy = n),
      (s.colorSpace = hi),
      (s.needsUpdate = !0),
      s
    );
  }

var fa = { x0: -40, z0: -30, w: 70, h: 60 };

function Pb(i, e = 1) {
    let t = document.createElement("canvas");
    t.width = t.height = i;
    let n = t.getContext("2d");
    ((n.fillStyle = "#000"), n.fillRect(0, 0, i, i));
    let s = i / fa.w,
      o = i / fa.h;
    (n.setTransform(s, 0, 0, o, -fa.x0 * s, -fa.z0 * o),
      (n.globalCompositeOperation = "lighter"));
    let r = "#ff0000",
      a = "#00ff00",
      l = '"Impact", "Arial Black", sans-serif',
      c = 90210,
      u = () => {
        ((c |= 0), (c = (c + 1831565813) | 0));
        let A = Math.imul(c ^ (c >>> 15), 1 | c);
        return (
          (A = (A + Math.imul(A ^ (A >>> 7), 61 | A)) ^ A),
          ((A ^ (A >>> 14)) >>> 0) / 4294967296
        );
      },
      h = (A, _, M, E, w, S, z) => {
        ((n.strokeStyle = S),
          (n.lineWidth = w),
          (n.lineCap = "butt"),
          n.setLineDash(z || []),
          n.beginPath(),
          n.moveTo(A, _),
          n.lineTo(M, E),
          n.stroke(),
          n.setLineDash([]));
      },
      f = (A, _, M, E, w, S) => {
        ((n.strokeStyle = S),
          (n.lineWidth = w),
          n.setLineDash([]),
          n.strokeRect(A, _, M - A, E - _));
      },
      p = (A, _, M, E, w) => {
        ((n.fillStyle = w), n.fillRect(A, _, M - A, E - _));
      },
      d = (A, _, M, E, w, S) => {
        (n.save(),
          n.translate(_, M),
          n.rotate(w),
          n.scale(E / 100, E / 100),
          (n.font = `900 100px ${l}`),
          (n.textAlign = "left"),
          (n.textBaseline = "middle"),
          (n.fillStyle = S));
        let H = -n.measureText(A).width / 2;
        (n.fillText(A, H, 0),
          (n.globalCompositeOperation = "source-over"),
          (n.fillStyle = "#000"));
        for (let O of A) {
          let q = n.measureText(O).width;
          (" I1".includes(O) || n.fillRect(H + q * 0.36, -60, 4.5, 120),
            (H += q));
        }
        ((n.globalCompositeOperation = "lighter"), n.restore());
      },
      v = (A, _, M, E, w, S = 1.1, z = 0.14) => {
        (n.save(), n.beginPath(), n.rect(A, _, M - A, E - _), n.clip());
        let H = M - A + (E - _);
        for (let O = 0; O < H; O += S) h(A + O, _, A + O - (E - _), E, z, w);
        (n.restore(), f(A, _, M, E, 0.15, w));
      },
      g = (A, _, M, E) => {
        (n.save(),
          n.translate(A, _),
          n.scale(M, 1),
          (n.fillStyle = E),
          n.beginPath(),
          n.moveTo(-1.6, -0.14),
          n.lineTo(0.5, -0.14),
          n.lineTo(0.5, -0.5),
          n.lineTo(1.7, 0),
          n.lineTo(0.5, 0.5),
          n.lineTo(0.5, 0.14),
          n.lineTo(-1.6, 0.14),
          n.closePath(),
          n.fill(),
          n.restore());
      };
    (h(-25.6, 3.6, 16.2, 3.6, 0.15, r),
      h(-25.6, 8.4, -5.6, 8.4, 0.15, r),
      h(10.4, 8.4, 16.2, 8.4, 0.15, r),
      h(-24, 6, -3, 6, 0.12, a, [3, 4.5]),
      h(6, 6, 15.5, 6, 0.12, a, [3, 4.5]),
      h(-23, 14, 16.2, 14, 0.15, r),
      h(-23, 18.6, 16.2, 18.6, 0.15, r),
      h(-23, 16.3, 15.5, 16.3, 0.1, a, [2, 6]),
      h(-23, -3.6, 16.2, -3.6, 0.12, r),
      h(-23, 0.56, 16.2, 0.56, 0.12, r),
      h(-23, 24.2, 16.2, 24.2, 0.12, r),
      h(-37.5, 2.6, -26.4, 2.6, 0.15, a),
      h(-37.5, 9.2, -26.4, 9.2, 0.15, a),
      g(-14, 4.7, 1, a),
      g(13, 7.3, -1, a),
      g(-16, 15.2, 1, a),
      g(2, 17.5, -1, a),
      p(-26.2, 3.6, -25.75, 8.4, a));
    for (let A = 2.75; A < 9; A += 1) p(-31.2, A, -28.2, A + 0.5, a);
    (d("SLOW", -21.4, 6, 1.7, Math.PI / 2, a),
      d("10", -19, 6, 1.8, Math.PI / 2, a),
      (n.strokeStyle = a),
      (n.lineWidth = 0.14),
      n.beginPath(),
      n.ellipse(-19, 6, 1.35, 1.8, 0, 0, Math.PI * 2),
      n.stroke(),
      h(-30.4, 2.6, -30.4, -10.2, 0.12, a),
      h(-29, 2.6, -29, -8.8, 0.12, a),
      h(-30.4, -10.2, -7, -10.2, 0.12, a),
      h(-29, -8.8, -7, -8.8, 0.12, a));
    for (let A = -28; A < -7.5; A += 2.2) h(A, -10.2, A + 0.9, -8.8, 0.1, a);
    for (let A = -7.5; A < 2; A += 2.2) h(-30.4, A, -29, A + 0.9, 0.1, a);
    let x = [
        [-22.5, -10.3],
        [-5.3, 6.9],
        [10.5, 16.6],
      ],
      y = (A, _, M, E, w, S) => {
        x.forEach((z, H) => {
          if (S && H === 1) return;
          let O = H === 2 ? 1 : 2,
            q = _ - A > 4 ? 2 : 1;
          for (let U = 0; U < O; U++)
            for (let T = 0; T < q; T++) {
              let D = z[0] + ((z[1] - z[0]) * U) / O,
                C = z[0] + ((z[1] - z[0]) * (U + 1)) / O,
                G = A + ((_ - A) * T) / q,
                j = A + ((_ - A) * (T + 1)) / q;
              f(D - 0.12, G - 0.12, C + 0.12, j + 0.12, 0.1, a);
            }
          d(M + (H + 1), (z[0] + z[1]) / 2, E, 0.85, w, r);
        });
      };
    (y(-6.34, -3.9, "D0", -2.9, Math.PI, !1),
      y(0.86, 3.3, "C0", -0.15, 0, !1),
      y(8.7, 13.64, "B0", 14.75, Math.PI, !0),
      y(18.9, 23.84, "A0", 17.85, 0, !1));
    for (let A of [-10.3, -5.3, 6.9, 10.5])
      h(
        A + (A === -10.3 || A === 6.9 ? 0.35 : -0.35),
        -6.3,
        A + (A === -10.3 || A === 6.9 ? 0.35 : -0.35),
        23.8,
        0.1,
        r,
        [1.5, 1.5],
      );
    (v(-6.6, -10.9, -0.4, -8.9, r, 0.9, 0.12),
      v(12.2, -22.6, 16.2, -16.4, r),
      v(-0.9, 5.4, 3.9, 9.9, r, 0.95, 0.13),
      d("KEEP CLEAR", 1.5, 10.6, 0.62, 0, r),
      v(19.8, -4.2, 27.2, 4.2, r, 1.2, 0.16),
      d("KEEP CLEAR", 17.4, -19.5, 0.8, Math.PI / 2, r),
      h(16.9, -29.5, 16.9, 27.5, 0.15, r),
      h(17.7, -29.5, 17.7, 27.5, 0.1, r, [1, 1]),
      h(19.3, -29.5, 19.3, 27.5, 0.1, r, [1, 1]),
      h(27.7, -29.5, 27.7, 27.5, 0.1, r, [1, 1]),
      d("BERTH 04", 23.5, 21.6, 1.9, 0, a),
      d("BERTH 04", 23.5, -7.7, 1.7, Math.PI, a));
    for (let A = -27; A < 27; A += 9)
      d(
        String(400 + Math.round((A + 27) / 9) * 5),
        26.9,
        A + 2,
        0.5,
        Math.PI / 2,
        a,
      );
    n.lineCap = "round";
    let b = (A, _, M, E, w, S) => {
      for (let z of [-0.95, 0.95])
        for (let H of [-0.16, 0.16])
          ((n.strokeStyle = `rgba(0,0,255,${S})`),
            (n.lineWidth = 0.26),
            n.beginPath(),
            n.moveTo(A, _ + z + H),
            n.quadraticCurveTo(
              (A + M) / 2,
              (_ + E) / 2 + w + z + H,
              M,
              E + z + H,
            ),
            n.stroke());
    };
    for (let A = 0; A < 46; A++) {
      let _ = u() < 0.68 ? 6 : 16.3,
        M = _ + (u() - 0.5) * 2.6,
        E = -36 + u() * 40,
        w = 8 + u() * 26;
      b(
        E,
        M,
        Math.min(E + w, 28),
        M + (u() - 0.5) * 1.6,
        (u() - 0.5) * 1.4,
        0.1 + u() * 0.22,
      );
    }
    for (let A = 0; A < 12; A++) {
      let _ = u() < 0.5 ? 6 : 16.3,
        M = u() < 0.5 ? -1 : 1,
        E = 0.12 + u() * 0.2;
      ((n.strokeStyle = `rgba(0,0,255,${E})`),
        (n.lineWidth = 0.3),
        n.beginPath(),
        n.moveTo(10 + u() * 4, _ + (u() - 0.5) * 2),
        n.quadraticCurveTo(
          21 + u() * 3,
          _,
          22 + u() * 4,
          _ + M * (8 + u() * 10),
        ),
        n.stroke());
    }
    for (let A = 0; A < 60; A++) {
      let _ = -34 + u() * 62,
        M = -8 + u() * 34,
        E = 0.6 + u() * 2.5,
        w = (u() - 0.5) * 0.5;
      ((n.strokeStyle = `rgba(0,0,255,${0.15 + u() * 0.3})`),
        (n.lineWidth = 0.12 + u() * 0.2),
        n.beginPath(),
        n.moveTo(_, M),
        n.lineTo(_ + Math.cos(w) * E, M + Math.sin(w) * E),
        n.stroke());
    }
    let m = new xs(t);
    return (
      (m.flipY = !1),
      (m.colorSpace = hi),
      (m.wrapS = m.wrapT = Bi),
      (m.minFilter = Ln),
      (m.magFilter = Zt),
      (m.generateMipmaps = !0),
      (m.anisotropy = e),
      (m.needsUpdate = !0),
      m
    );
  }

var TR = `
uniform float uTime, uRain, uWetG, uReflOn, uReflLod, uMarkRes, uMaskRes;
uniform sampler2D uMask, uMarks, uDetail, uDetailN, uRefl;
uniform vec3 uMaskRect; uniform vec4 uMarkRect; uniform mat4 uReflMatrix; uniform vec2 uReflScale;
varying vec3 vGWorld;
float gRough; vec2 gNxz; float gPuddle; float gWet; float gFilm; float gSoak;
vec3 gHash3(vec2 p){ vec3 q = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973)); q += dot(q, q.yzx + 33.33); return fract((q.xxy + q.yzz) * q.zyx); }
float gH1(vec2 p){ vec3 q = fract(vec3(p.xyx) * .1031); q += dot(q, q.yzx + 33.33); return fract((q.x + q.y) * q.z); }
float gVN(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(gH1(i), gH1(i + vec2(1.0, 0.0)), f.x), mix(gH1(i + vec2(0.0, 1.0)), gH1(i + vec2(1.0, 1.0)), f.x), f.y); }
// 4-tap B-spline bicubic of the base level: no texel edge of a data map can ever show, however close the camera is
vec4 gBicubic(sampler2D t, vec2 uv, float res){
  vec2 p = uv * res - 0.5; vec2 i = floor(p); vec2 f = p - i; vec2 f2 = f * f, f3 = f2 * f;
  vec2 w0 = (1.0 - 3.0 * f + 3.0 * f2 - f3) / 6.0, w1 = (4.0 - 6.0 * f2 + 3.0 * f3) / 6.0;
  vec2 w2 = (1.0 + 3.0 * f + 3.0 * f2 - 3.0 * f3) / 6.0, w3 = f3 / 6.0;
  vec2 g0 = w0 + w1, g1 = w2 + w3;
  vec2 h0 = (i + w1 / g0 - 0.5) / res, h1 = (i + w3 / g1 + 1.5) / res;
  return (textureLod(t, vec2(h0.x, h0.y), 0.0) * g0.x + textureLod(t, vec2(h1.x, h0.y), 0.0) * g1.x) * g0.y
       + (textureLod(t, vec2(h0.x, h1.y), 0.0) * g0.x + textureLod(t, vec2(h1.x, h1.y), 0.0) * g1.x) * g1.y;
}
// one sparse layer of rain rings: every cell gets a new drop (position, size, strength) each cycle, thin soft crest
// that fades as it expands. Returns a slope (xz) contribution.
vec2 gRipple(vec2 p, float t, float cell, float seed){
  vec2 q = p / cell + seed * 17.3; vec2 id = floor(q); vec2 f = fract(q);
  vec3 h0 = gHash3(id + seed);
  float tt = t * (0.5 + 0.55 * h0.x) + h0.y * 9.0;
  float cyc = floor(tt), life = fract(tt);
  vec3 h = gHash3(id + seed + cyc * 7.31);
  vec3 hc = gHash3(id.yx + cyc * 3.71 + seed * 5.0);
  float on = step(h.z, 0.16 + 0.5 * uRain);
  float rmax = mix(0.1, 0.36, h.x * h.x);
  vec2 c = mix(vec2(rmax + 0.05), vec2(0.95 - rmax), hc.xy);
  vec2 dv = (f - c) * cell; float d = length(dv);
  float r = life * rmax * cell;
  float w = 0.005 + 0.02 * life;
  float x = (d - r) / w;
  float ring = x * exp(-x * x) * 2.3;
  float amp = 1.0 - life; amp = amp * amp * on * mix(0.3, 1.0, h.y) * smoothstep(0.0, 0.06, life);
  return (dv / max(d, 1e-4)) * ring * amp;
}
`,
    AR = `
{
  vec2 gxz = vGWorld.xz;
  float gDist = length(cameraPosition - vGWorld);
  // ---- unique large-scale masks (puddle height, dampness, oil, wear) ----
  vec2 muv = (gxz - uMaskRect.xy) * uMaskRect.z;
  float mIn = smoothstep(0.0, 0.05, min(min(muv.x, 1.0 - muv.x), min(muv.y, 1.0 - muv.y)));
  vec4 mk = mix(vec4(0.66, 0.5, 0.0, 0.5), gBicubic(uMask, muv, uMaskRes), mIn);
  // ---- tiling detail ----
  vec4 d1 = texture2D(uDetail, gxz * 0.21);
  vec4 d2 = texture2D(uDetail, gxz * 1.37 + 0.37);
  vec4 n1 = texture2D(uDetailN, gxz * 1.37 + 0.37);
  vec4 n0 = texture2D(uDetailN, gxz * 0.21);
  float grain = d2.r;
  // ---- slabs: 6 m expansion joints with tar sealing ----
  vec2 sj = gxz / 6.0;
  vec2 sf = (0.5 - abs(fract(sj) - 0.5)) * 6.0;
  float jd = min(sf.x, sf.y) + (d1.a - 0.5) * 0.035;
  float jaa = fwidth(jd) + 1e-5;
  float tarW = 0.022 + 0.03 * d1.g;
  float tar = (1.0 - smoothstep(tarW - jaa, tarW + jaa, jd)) * clamp(tarW / jaa, 0.0, 1.0);
  float groove = (1.0 - smoothstep(0.004, 0.012 + jaa, jd)) * clamp(0.02 / jaa, 0.0, 1.0);
  vec2 sid = floor(sj);
  float sh = fract(sin(dot(sid, vec2(127.1, 311.7))) * 43758.5453);
  float sh2 = fract(sh * 7.31 + 0.13);
  // ---- cracks, some sealed with tar ----
  float crArea = smoothstep(0.6, 0.76, mk.a * 0.7 + sh * 0.45);
  float cfw = fwidth(d1.b) * 1.5 + 0.004;
  float crack = smoothstep(0.955 - cfw, 0.975, d1.b) * crArea;
  float seal = smoothstep(0.915 - cfw, 0.94, d1.b) * crArea * step(0.72, sh2);
  // ---- base albedo: worn asphalt in the yard, concrete slabs on the quay ----
  float conc = smoothstep(15.6, 16.6, gxz.x + (d1.g - 0.5) * 0.6);
  vec3 alb = mix(vec3(0.125, 0.125, 0.13), vec3(0.22, 0.215, 0.2), conc);
  alb *= (0.8 + 0.4 * sh2) * (0.8 + 0.4 * d1.g) * (0.62 + 0.76 * grain);
  alb += vec3(0.11, 0.105, 0.095) * smoothstep(0.58, 0.78, d2.a) * (1.0 - conc * 0.6);    // pale aggregate
  float polish = smoothstep(0.38, 0.72, mk.a);                                            // traffic-polished lanes
  alb *= mix(1.0, 0.78, polish);
  alb = mix(alb, vec3(0.018, 0.018, 0.02), max(max(tar, seal * 0.4) * 0.94, crack * 0.9));
  alb *= 1.0 - 0.62 * mk.b;                                                               // oil
  // ---- painted markings (worn, chipped) + tyre rubber ----
  vec2 kuv = (gxz - uMarkRect.xy) * uMarkRect.zw;
  float kIn = step(0.0, kuv.x) * step(kuv.x, 1.0) * step(0.0, kuv.y) * step(kuv.y, 1.0);
  vec3 mp = texture2D(uMarks, kuv).rgb;
  float kpx = max(fwidth(kuv.x), fwidth(kuv.y)) * uMarkRes;
  if (kpx < 1.0) mp = mix(gBicubic(uMarks, kuv, uMarkRes).rgb, mp, smoothstep(0.5, 1.0, kpx));   // magnified: no texel blocks
  mp *= kIn;
  float kw = clamp(kpx * 0.5, 0.16, 0.5);
  // chips: world-space procedural noise down to sub-centimetre (never the texels of a map)
  float chipN = 0.5;
  if (max(mp.r, mp.g) > 0.02) {
    float cf2 = 1.0 - smoothstep(6.0, 18.0, gDist), cf3 = 1.0 - smoothstep(2.5, 7.0, gDist);
    chipN = gVN(gxz * 17.0) * 0.45 + mix(0.5, gVN(gxz * 57.0 + 11.0), cf2) * 0.33 + mix(0.5, gVN(gxz * 181.0 + 5.0), cf3) * 0.22;
  }
  float chip = chipN * 0.62 + d1.a * 0.38;
  float wear = clamp(mk.a * 1.25 - 0.22 + mp.b * 0.6, 0.0, 1.0);
  float wt = mix(0.24, 0.55, wear);
  float keep = smoothstep(wt - 0.045, wt + 0.045, chip) * (1.0 - max(tar, crack));
  float eN = (chipN - 0.5) * 0.55 * (1.0 - kw * 2.0);
  float pY = smoothstep(0.5 - kw, 0.5 + kw, mp.r + eN) * keep;
  float pW = smoothstep(0.5 - kw, 0.5 + kw, mp.g + eN) * keep;
  alb *= 1.0 - 0.6 * mp.b * (1.0 - 0.5 * conc);
  float fade = 0.72 + 0.28 * d1.g;
  alb = mix(alb, vec3(0.52, 0.34, 0.035) * fade, pY * 0.94);
  alb = mix(alb, vec3(0.47, 0.47, 0.44) * fade, pW * 0.94);
  float paint = max(pY, pW);
  // ---- water: one continuous gradient  standing water -> soaked band -> damp -> drier patches ----
  // organic shoreline: world-space noise (40 / 15 / 5 cm) on the water-level comparison, independent of the mask res
  float sf2 = 1.0 - smoothstep(25.0, 60.0, gDist), sf3 = 1.0 - smoothstep(8.0, 22.0, gDist);
  float sn1 = gVN(gxz * 2.5 + 3.0), sn2 = mix(0.5, gVN(gxz * 6.7 + 17.0), sf2), sn3 = mix(0.5, gVN(gxz * 20.0 + 9.0), sf3);
  float sn = sn1 * 0.5 + sn2 * 0.3 + sn3 * 0.2;
  float depth = 0.5 - mk.r + (sn - 0.5) * 0.11 + (d1.g - 0.5) * 0.03 + (grain - 0.5) * 0.012 + groove * 0.04 + crack * 0.02 - paint * 0.01;
  float puddle = smoothstep(0.0, 0.035, depth) * uWetG;                 // mirror weight (~5 cm ramp)
  float deep = smoothstep(0.0, 0.22, depth);                           // 0 at the rim (bed shows) .. 1 a hand deep
  float bandW = 0.05 + 0.15 * sn1 * sn1 + 0.05 * d1.g;                  // soaked band, roughly 10-30 cm, varies along the shore
  float soak = smoothstep(-bandW, 0.0, depth) * uWetG;
  float fringe = smoothstep(-0.65, -0.02, depth);                      // damp halo, about a metre
  float dryP = 1.0 - smoothstep(0.2, 0.42, mk.g + fringe * 0.55 + (d1.g - 0.5) * 0.25 + (sn - 0.5) * 0.12);
  float damp = (1.0 - dryP) * uWetG;
  float wet = clamp(damp * 0.7 + soak * 0.3, 0.0, 1.0);
  float film = clamp(soak * (1.0 - smoothstep(0.35, 0.95, grain + (1.0 - soak) * 0.6)) + groove * 0.5, 0.0, 1.0) * (1.0 - paint * 0.4);
  alb *= mix(0.95, mix(0.7, 0.54, 1.0 - paint), damp);
  alb *= mix(1.0, 0.5, soak);
  // standing water: shallow rim shows the wet bed, deeper water goes murky and dark (never a black cut-out)
  alb = mix(alb, alb * mix(0.85, 0.4, deep) + vec3(0.004, 0.006, 0.0065) * deep, puddle);
  diffuseColor.rgb *= alb;
  // ---- roughness: dry ~0.72 -> damp 0.36..0.56 -> soaked 0.1..0.2 -> water 0.055, all smooth ramps ----
  float rough = mix(0.74, 0.42, damp) + (grain - 0.5) * 0.24 + (d1.g - 0.5) * 0.16 + conc * 0.03 - paint * 0.05;
  rough -= polish * 0.07 + mk.b * 0.16 + max(tar, seal) * 0.1;
  rough = mix(rough, 0.2 + (grain - 0.5) * 0.14, soak * 0.9);
  rough = mix(rough, 0.13, film * 0.8);
  rough += smoothstep(10.0, 80.0, gDist) * 0.04;
  rough = mix(clamp(rough, 0.1, 1.0), 0.055, puddle);
  // ---- normal (world xz slope): aggregate grain + lumps break up the mirror outside puddles ----
  vec2 nxz = (n1.rg - 0.5) * mix(2.1, 0.7, max(film, soak * 0.6)) + (n0.ba - 0.5) * 0.3;
  nxz *= 1.0 - puddle;
  float wsum = puddle + film * 0.2;
  vec2 wv = texture2D(uDetailN, gxz * 0.13 + uTime * vec2(0.031, 0.017)).ba - 0.5;
  vec2 wv2 = texture2D(uDetailN, gxz.yx * 0.31 - uTime * vec2(0.043, 0.027)).ba - 0.5;
  if (wsum > 0.004) {
    float rf = 1.0 - smoothstep(10.0, 34.0, gDist);
    vec2 rip = vec2(0.0);
    if (rf > 0.0) {
      vec2 gp2 = vec2(0.8 * gxz.x - 0.6 * gxz.y, 0.6 * gxz.x + 0.8 * gxz.y);
      vec2 r2 = gRipple(gp2, uTime * 0.87, 1.31, 2.0);
      rip = gRipple(gxz, uTime, 0.83, 1.0) + vec2(0.8 * r2.x + 0.6 * r2.y, -0.6 * r2.x + 0.8 * r2.y) * 0.9 + gRipple(gxz.yx, uTime * 1.13, 0.57, 3.0).yx * 0.6;
      rip *= rf * (0.3 + 0.7 * uRain) * 0.3 * smoothstep(0.0, 0.08, depth);
    }
    nxz += (rip + (wv * 0.03 + wv2 * 0.018) * (0.4 + 0.6 * deep)) * wsum;
    rough += (1.0 - rf) * 0.03 * puddle * uRain;
  }
  gSoak = soak;
  gRough = rough; gNxz = nxz; gPuddle = puddle; gWet = wet; gFilm = film;
}
`,
    RR = `
{
  vec3 gV = normalize(cameraPosition - vGWorld);
  vec4 rc = uReflMatrix * vec4(vGWorld.x, 0.0, vGWorld.z, 1.0);
  vec2 ruv = rc.xy / max(rc.w, 1e-4);
  vec2 gf = normalize(-gV.xz + vec2(1e-5)); vec2 gs = vec2(-gf.y, gf.x);
  float sinE = clamp(gV.y, 0.03, 1.0);
  float dk = (gPuddle + gFilm * 0.15 + 0.03) / (1.0 + length(cameraPosition - vGWorld) * 0.07);
  vec2 tilt = vec2(dot(gNxz, gs) * sinE, dot(gNxz, gf)) * dk;
  tilt = clamp(tilt, vec2(-0.12), vec2(0.12));
  ruv += tilt * uReflScale;
  float r = material.roughness;
  // puddles: sharp mirror. Damp asphalt: only a heavily blurred, vertically stretched reflection that tightens a
  // little at grazing angles (so it reads as a sheen, not as a second mirror)
  float graz = pow(1.0 - clamp(gV.y, 0.0, 1.0), 5.0);
  float lodP = clamp(r * 9.5 - 0.45, 0.0, 6.5) + 0.9;      // puddles: a touch soft, never razor sharp
  float lodD = clamp(3.0 + r * 6.5 - 3.4 * graz, 2.0, 7.5);
  float lod = mix(mix(lodD, min(lodD, 2.6 + r * 5.0), gSoak), lodP, gPuddle) + uReflLod;
  vec2 st = vec2(0.0, r * 0.11 + (1.0 - gPuddle) * 0.05);
  vec2 lo = vec2(0.002), hi = vec2(0.998);
  vec3 pr = textureLod(uRefl, clamp(ruv, lo, hi), lod).rgb * 0.5
          + textureLod(uRefl, clamp(ruv + st, lo, hi), lod + 0.6).rgb * 0.25
          + textureLod(uRefl, clamp(ruv - st * 0.6, lo, hi), lod + 0.6).rgb * 0.25;
  pr = min(pr, vec3(48.0));
  float pw = mix(1.0 - smoothstep(0.55, 0.9, r), 1.0, max(gPuddle, gSoak)) * uReflOn;
  radiance = mix(radiance, pr, pw);
}
`;

function Ib(i, e) {
    let t = {
        uTime: { value: 0 },
        uRain: { value: 0.6 },
        uWetG: (i.mats && i.mats.uniforms && i.mats.uniforms.wet) || {
          value: 1,
        },
        uReflOn: { value: 0 },
        uReflLod: { value: 0 },
        uMarkRes: { value: e.marks.image.width },
        uMaskRes: { value: e.mask.image.width },
        uMask: { value: e.mask },
        uMarks: { value: e.marks },
        uDetail: { value: e.detail },
        uDetailN: { value: e.detailN },
        uRefl: { value: e.black },
        uMaskRect: { value: new W(Li.x0, Li.z0, 1 / Li.size) },
        uMarkRect: { value: new Dt(fa.x0, fa.z0, 1 / fa.w, 1 / fa.h) },
        uReflMatrix: { value: new Ye() },
        uReflScale: { value: new Ae(0.5, 0.5) },
      },
      n = new Qt({ color: 16777215, roughness: 1, metalness: 0 });
    ((n.name = "apron_wet"),
      (n.onBeforeCompile = (r) => {
        (Object.assign(r.uniforms, t),
          (r.vertexShader =
            `varying vec3 vGWorld;
` +
            r.vertexShader.replace(
              "#include <begin_vertex>",
              `#include <begin_vertex>
  vGWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;`,
            )),
          (r.fragmentShader = r.fragmentShader
            .replace(
              "#include <common>",
              `#include <common>
` + TR,
            )
            .replace("#include <map_fragment>", AR)
            .replace(
              "#include <roughnessmap_fragment>",
              "float roughnessFactor = gRough;",
            )
            .replace(
              "#include <normal_fragment_maps>",
              `#include <normal_fragment_maps>
  normal = normalize(mat3(viewMatrix) * normalize(vec3(-gNxz.x, 1.0, -gNxz.y)));`,
            )
            .replace(
              "#include <lights_physical_fragment>",
              `#include <lights_physical_fragment>
  material.specularColor = mix(material.specularColor, vec3(0.075), max(gPuddle, gSoak * 0.5));`,
            )
            .replace(
              "#include <lights_fragment_maps>",
              `#include <lights_fragment_maps>
` + RR,
            )
            .replace(
              "#include <lights_fragment_end>",
              `#include <lights_fragment_end>
  reflectedLight.directSpecular = min(reflectedLight.directSpecular, vec3(40.0));`,
            )));
      }),
      (n.customProgramCacheKey = () => "saltline-apron-3"));
    let s = new rn(190, 320, 1, 1).rotateX(-Math.PI / 2).translate(-65, 0, 0),
      o = new Qe(s, n);
    return (
      (o.receiveShadow = !0),
      (o.castShadow = !1),
      (o.name = "apron"),
      (o.matrixAutoUpdate = !1),
      o.updateMatrix(),
      { mesh: o, material: n, uniforms: t }
    );
  }

function zb(i, e, t) {
    let n = new Wn();
    (n.layers.set(0), (n.matrixAutoUpdate = !0));
    let s = new si(16, 16, {
      type: js,
      format: _n,
      colorSpace: Er,
      minFilter: Ln,
      magFilter: Zt,
      generateMipmaps: !0,
      depthBuffer: !0,
      stencilBuffer: !1,
      samples: 0,
    });
    s.texture.name = "planarReflection";
    let o = new W(),
      r = new W(),
      a = new Ye(),
      l = new Ae(),
      c = new go(),
      u = new Dt(),
      h = new Dt(),
      f = new Ye().set(
        0.5,
        0,
        0,
        0.5,
        0,
        0.5,
        0,
        0.5,
        0,
        0,
        0.5,
        0.5,
        0,
        0,
        0,
        1,
      ),
      p = [],
      d = { target: s, camera: n, enabled: !0, active: !1 };
    function v(g, x, y) {
      let b = i.quality.planar || 0;
      if (!d.enabled || b <= 0) {
        ((e.uReflOn.value = 0), (d.active = !1));
        return;
      }
      if ((o.setFromMatrixPosition(y.matrixWorld), o.y < 0.03)) {
        ((e.uReflOn.value = 0), (d.active = !1));
        return;
      }
      let m = i.render && i.render.resolution;
      m && m.x > 8 ? l.copy(m) : g.getDrawingBufferSize(l);
      let A = Math.max(64, Math.round((l.x * b) / 16) * 16),
        _ = Math.max(32, Math.round((l.y * b) / 8) * 8);
      ((s.width !== A || s.height !== _) && s.setSize(A, _),
        a.extractRotation(y.matrixWorld),
        r.set(0, 0, -1).applyMatrix4(a).add(o),
        n.position.set(o.x, -o.y, o.z),
        n.up.set(0, 1, 0).applyMatrix4(a),
        (n.up.y = -n.up.y),
        (r.y = -r.y),
        n.lookAt(r),
        (n.near = y.near),
        (n.far = y.far),
        n.updateMatrixWorld(!0),
        n.matrixWorldInverse.copy(n.matrixWorld).invert(),
        n.projectionMatrix.copy(y.projectionMatrix),
        e.uReflMatrix.value
          .copy(f)
          .multiply(n.projectionMatrix)
          .multiply(n.matrixWorldInverse),
        c.normal.set(0, 1, 0),
        (c.constant = 0.01),
        c.applyMatrix4(n.matrixWorldInverse),
        u.set(c.normal.x, c.normal.y, c.normal.z, c.constant));
      let M = n.projectionMatrix.elements;
      ((h.x = (Math.sign(u.x) + M[8]) / M[0]),
        (h.y = (Math.sign(u.y) + M[9]) / M[5]),
        (h.z = -1),
        (h.w = (1 + M[10]) / M[14]),
        u.multiplyScalar(2 / u.dot(h)),
        (M[2] = u.x),
        (M[6] = u.y),
        (M[10] = u.z + 1),
        (M[14] = u.w),
        n.projectionMatrixInverse.copy(n.projectionMatrix).invert());
      let E = y.projectionMatrix.elements;
      (e.uReflScale.value.set(E[0] * 0.5, E[5] * 0.5),
        (e.uReflLod.value = Math.log2(Math.max(_, 1) / 270)));
      for (let w = 0; w < t.length; w++)
        ((p[w] = t[w].visible), (t[w].visible = !1));
      try {
        i.render.renderWorld(n, s);
      } finally {
        for (let w = 0; w < t.length; w++) t[w].visible = p[w];
      }
      ((e.uRefl.value = s.texture), (e.uReflOn.value = 1), (d.active = !0));
    }
    return ((d.pass = v), d);
  }

var B1 = [
      [-0.92, 0.39, 9.5, 0.06],
      [-0.75, -0.66, 5.7, 0.04],
      [-0.99, 0.12, 3.3, 0.026],
      [-0.5, 0.87, 2, 0.016],
    ],
    Db = [
      [-0.8, 0.6, 1.31, 0.02],
      [-0.95, -0.31, 0.83, 0.014],
      [-0.35, -0.94, 0.57, 0.01],
      [-0.6, 0.8, 0.39, 0.007],
      [-1, 0.05, 0.27, 0.005],
      [0.3, 0.95, 0.47, 0.006],
      [-0.86, -0.51, 0.21, 0.0035],
    ];

for (let i of B1.concat(Db)) {
    let e = Math.hypot(i[0], i[1]);
    ((i[0] /= e),
      (i[1] /= e),
      (i[4] = (2 * Math.PI) / i[2]),
      (i[5] = Math.sqrt(9.81 * i[4])));
  }

var fi = (i) => (Number.isInteger(i) ? i.toFixed(1) : i.toFixed(5));

function Lb(i, e, t) {
    let n = 1 - bs.smoothstep(Math.hypot(i - 30, e), 50, 220),
      s = 0;
    for (let o of B1)
      s += o[3] * Math.sin(o[4] * (o[0] * i + o[1] * e) - o[5] * t);
    return oi.seaY + s * n;
  }

var CR = B1.map(
      (i) =>
        `  { float ph = ${fi(i[4])} * dot(vec2(${fi(i[0])}, ${fi(i[1])}), swp.xz) - ${fi(i[5])} * uTime; sdisp.y += ${fi(i[3])} * sin(ph); sdisp.xz += vec2(${fi(i[0])}, ${fi(i[1])}) * (${fi(i[3] * 0.6)} * cos(ph)); }`,
    ).join(`
`),
    PR = B1.map(
      (i) =>
        `  slopeA += vec2(${fi(i[0])}, ${fi(i[1])}) * (${fi(i[3] * i[4])} * cos(${fi(i[4])} * dot(vec2(${fi(i[0])}, ${fi(i[1])}), sxz) - ${fi(i[5])} * uTime));`,
    ).join(`
`),
    IR = Db.map(
      (i) =>
        `  slopeB += vec2(${fi(i[0])}, ${fi(i[1])}) * (${fi(i[3] * i[4])} * cos(${fi(i[4])} * dot(vec2(${fi(i[0])}, ${fi(i[1])}), sxz) - ${fi(i[5])} * uTime));`,
    ).join(`
`),
    zR = `
uniform float uTime; uniform sampler2D uDetail, uDetailN; uniform vec3 uHazeA, uHazeB, uSunDirW;
varying vec3 vGWorld; varying float vSAmp;
float gRough; vec2 gNxz; float gOcc; float gSDist; float gSpark;
`,
    DR = `
{
  vec2 sxz = vGWorld.xz;
  float sd = length(cameraPosition - vGWorld); gSDist = sd;
  vec2 slopeA = vec2(0.0), slopeB = vec2(0.0);
${PR}
${IR}
  float nearB = 1.0 - smoothstep(25.0, 110.0, sd);
  vec2 t1 = texture2D(uDetailN, sxz * 0.113 + uTime * vec2(-0.021, 0.009)).ba - 0.5;
  vec2 t2 = texture2D(uDetailN, sxz * 0.031 + uTime * vec2(-0.007, -0.004)).ba - 0.5;
  vec2 t3 = texture2D(uDetailN, sxz.yx * 0.39 + uTime * vec2(0.031, -0.027)).ba - 0.5;
  gNxz = slopeA * vSAmp + slopeB * nearB + t1 * 0.2 + t2 * 0.24 + t3 * 0.1 * nearB;
  // foam / scum along the quay wall (x = 30) and around the moored hull x[33,49] z[-60,-9]
  float dq = sxz.x - 30.0;
  vec2 hq = abs(sxz - vec2(41.0, -34.5)) - vec2(4.0, 21.5);
  float dh = length(max(hq, 0.0)) + min(max(hq.x, hq.y), 0.0) - 4.0;
  float de = min(dq, dh);
  vec4 fn = texture2D(uDetail, sxz * 0.41 + uTime * vec2(-0.012, 0.007));
  vec4 fn2 = texture2D(uDetail, sxz * 0.093 + uTime * vec2(0.004, 0.003));
  float band = 1.0 - smoothstep(0.0, 0.2 + fn2.g * fn2.g * 2.2, de);
  float foam = clamp(band * smoothstep(0.5, 0.68, fn.a * 0.55 + fn.r * 0.25 + fn2.g * 0.3 + band * 0.2), 0.0, 1.0) * step(-0.3, de);
  float scum = (1.0 - smoothstep(0.0, 5.0, de)) * smoothstep(0.4, 0.7, fn2.g);
  vec3 alb = vec3(0.0045, 0.013, 0.017);
  alb = mix(alb, vec3(0.03, 0.04, 0.034), scum * 0.6);
  alb = mix(alb, vec3(0.3, 0.32, 0.3), foam * 0.7);
  diffuseColor.rgb *= alb;
  // wind structure: broad cat's-paw patches (ruffled, darker, duller) between calmer slicks, plus long swell shading
  vec4 fn3 = texture2D(uDetail, sxz * 0.0123 + uTime * vec2(0.0016, 0.0011));
  float gust = smoothstep(0.38, 0.62, fn2.g * 0.45 + fn3.g * 0.75 - 0.1);
  float swell = sin(dot(sxz, vec2(-0.118, 0.05)) - uTime * 0.55 + fn3.a * 5.0) * 0.5 + 0.5;
  gNxz = gNxz * mix(0.4, 1.35, gust) + vec2(-0.92, 0.39) * (swell - 0.5) * 0.07;
  gSpark = mix(0.55, 1.0, swell) * mix(1.0, 0.6, gust);
  diffuseColor.rgb *= mix(1.0, 0.6, gust);
  gRough = mix(mix(0.1, 0.32, smoothstep(12.0, 380.0, sd)) * mix(0.62, 1.5, gust), 0.65, max(foam, scum * 0.3));
  gNxz *= 1.0 - foam * 0.6;
  gOcc = mix(0.3, 1.0, smoothstep(0.0, 8.0, de)) * mix(0.8, 1.05, swell);
}
`,
    LR = `
{
  vec3 sdir = normalize(vGWorld - cameraPosition);
  float toSun = pow(max(dot(normalize(sdir.xz + vec2(1e-5)), normalize(uSunDirW.xz)), 0.0), 3.0);
  vec3 hz = mix(uHazeA, uHazeB, toSun);
  outgoingLight = mix(outgoingLight, hz, smoothstep(220.0, 860.0, gSDist) * 0.8);
}
`;

function gv(i, e, t, n, s) {
    let o = [i],
      r = i,
      a = t;
    for (; r < e - 0.001; )
      ((r = Math.min(e, r + a)), o.push(r), (a = Math.min(s, a * n)));
    return o;
  }

function kb(i, e) {
    let t = oi.seaY,
      n = gv(27.5, 880, 0.75, 1.075, 120),
      s = gv(48, 880, 0.9, 1.085, 120),
      r = s
        .map((M) => -M)
        .reverse()
        .concat(gv(-48 + 0.9, 48 - 0.9, 0.9, 1, 0.9), s.slice(0)),
      a = n.length,
      l = r.length,
      c = 12,
      u = new Float32Array((a * l + c) * 3),
      h = [],
      f = 0;
    for (let M = 0; M < l; M++)
      for (let E = 0; E < a; E++)
        ((u[f++] = n[E]), (u[f++] = t), (u[f++] = r[M]));
    for (let M = 0; M < l - 1; M++)
      for (let E = 0; E < a - 1; E++) {
        let w = M * a + E,
          S = w + 1,
          z = w + a,
          H = z + 1;
        h.push(w, z, S, S, z, H);
      }
    let p = (M, E, w, S) => {
      let z = f / 3;
      for (let [H, O] of [
        [M, E],
        [w, E],
        [M, S],
        [w, S],
      ])
        ((u[f++] = H), (u[f++] = t), (u[f++] = O));
      h.push(z, z + 2, z + 1, z + 1, z + 2, z + 3);
    };
    (p(-880, -880, 27.5, -158),
      p(-880, 158, 27.5, 880),
      p(-880, -158, -158, 158));
    let d = new nt();
    d.setAttribute("position", new et(u, 3));
    let v = new Float32Array(u.length);
    for (let M = 1; M < v.length; M += 3) v[M] = 1;
    (d.setAttribute("normal", new et(v, 3)),
      d.setIndex(h),
      (d.boundingSphere = new Dn(new W(0, t, 0), 1300)));
    let g = en.horizonAway.clone().multiplyScalar(0.85),
      x = en.horizon.clone().multiplyScalar(0.8),
      y = {
        uTime: { value: 0 },
        uDetail: { value: e.detail },
        uDetailN: { value: e.detailN },
        uHazeA: { value: g },
        uHazeB: { value: x },
        uSunDirW: { value: Mn.dir.clone() },
      },
      b = new Qt({ color: 16777215, roughness: 0.1, metalness: 0 });
    ((b.name = "sea"),
      (b.onBeforeCompile = (M) => {
        (Object.assign(M.uniforms, y),
          (M.vertexShader =
            `uniform float uTime; varying vec3 vGWorld; varying float vSAmp;
` +
            M.vertexShader.replace(
              "#include <begin_vertex>",
              `#include <begin_vertex>
  vec3 swp = (modelMatrix * vec4(transformed, 1.0)).xyz;
  vSAmp = 1.0 - smoothstep(50.0, 220.0, distance(swp.xz, vec2(30.0, 0.0)));
  vec3 sdisp = vec3(0.0);
${CR}
  transformed += sdisp * vSAmp;
  vGWorld = swp;`,
            )),
          (M.fragmentShader = M.fragmentShader
            .replace(
              "#include <common>",
              `#include <common>
` + zR,
            )
            .replace("#include <map_fragment>", DR)
            .replace(
              "#include <roughnessmap_fragment>",
              "float roughnessFactor = gRough;",
            )
            .replace(
              "#include <normal_fragment_maps>",
              `#include <normal_fragment_maps>
  normal = normalize(mat3(viewMatrix) * normalize(vec3(-gNxz.x, 1.0, -gNxz.y)));`,
            )
            .replace(
              "#include <lights_fragment_maps>",
              `#include <lights_fragment_maps>
  radiance *= gOcc; iblIrradiance *= gOcc;`,
            )
            .replace(
              "#include <lights_fragment_end>",
              `#include <lights_fragment_end>
  { // sun glitter: strongest along the sun's azimuth, calmer to the sides; broken by swell and cat's paws
    vec3 sv = normalize(vGWorld - cameraPosition);
    float az = max(dot(normalize(sv.xz + vec2(1e-5)), normalize(uSunDirW.xz)), 0.0);
    reflectedLight.directSpecular = min(reflectedLight.directSpecular, vec3(40.0)) * gSpark * mix(0.3, 1.0, az * az * az);
  }`,
            )
            .replace(
              "#include <opaque_fragment>",
              LR +
                `
#include <opaque_fragment>`,
            )));
      }),
      (b.customProgramCacheKey = () => "saltline-sea-1"));
    let m = new Qe(d, b);
    ((m.name = "sea"),
      (m.receiveShadow = !0),
      (m.castShadow = !1),
      (m.frustumCulled = !1),
      (m.matrixAutoUpdate = !1));
    let A = new Qt({ color: 724238, roughness: 0.55, metalness: 0 }),
      _ = new Qe(
        new rn(320, 4.4).rotateY(Math.PI / 2).translate(29.88, -2.18, 0),
        A,
      );
    return (
      (_.name = "quaySkirt"),
      (_.receiveShadow = !0),
      (_.matrixAutoUpdate = !1),
      { mesh: m, skirt: _, uniforms: y, material: b }
    );
  }

var Ub = `
uniform vec3 uBoxMin[4]; uniform vec3 uBoxMax[4];
bool wInside(vec3 p){
  for (int i = 0; i < 4; i++) { if (all(greaterThan(p, uBoxMin[i])) && all(lessThan(p, uBoxMax[i]))) return true; }
  return false;
}
float wPhase(float c){ float g = 0.72; return (1.0 - g * g) / (12.566 * pow(1.0 + g * g - 2.0 * g * c, 1.5)); }
`,
    kR = `
uniform float uTime, uRain, uPix, uDrip; uniform vec3 uVel, uBox, uSunDir, uSunCol, uAmb;
attribute vec4 aSeed;
varying vec3 vCol; varying float vA; varying vec2 vUv;
${Ub}
uniform vec4 uSky[8];   // roof openings (x, z, half w, half d): rain falls through these into the shed
bool wSky(vec3 p){
  for (int i = 0; i < 8; i++) { if (abs(p.x - uSky[i].x) < uSky[i].z && abs(p.z - uSky[i].y) < uSky[i].w) return true; }
  return false;
}
void main(){
  vUv = position.xy;
  float sp = 0.82 + 0.36 * aSeed.w;
  vec3 vel = uVel * sp;
  vec3 p; float len; float kill = 0.0;
  if (aSeed.w < 0.0) {                       // eave drip line (shed south eave), free-fall from 7 m
    float T = 1.19; float t = fract(uTime / T * (0.9 + 0.2 * aSeed.y) + aSeed.z) * T;
    p = vec3(mix(-16.0, 12.0, aSeed.x), 7.0 - 4.9 * t * t, -10.72 + 0.05 * sin(aSeed.x * 911.0));
    vel = vec3(0.0, -9.81 * t - 0.3, 0.0); len = 0.022 * length(vel) + 0.03;
    kill = 1.0 - uDrip;
    if (fract(aSeed.x * 37.7) > 0.55 + 0.45 * uRain) kill = 1.0;
  } else {
    p = aSeed.xyz * uBox + vel * uTime;
    p = mod(p - cameraPosition + 0.5 * uBox, uBox) - 0.5 * uBox + cameraPosition;
    len = 0.03 * length(vel);
    if (fract(aSeed.w * 7.13 + aSeed.x) > uRain) kill = 1.0;
    if (wInside(p) && !wSky(p)) kill = 1.0;
  }
  if (p.y < (p.x > 30.0 ? -1.6 : 0.0)) kill = 1.0;
  vec3 dir = normalize(vel);
  vec3 toP = p - cameraPosition; float dist = length(toP);
  vec3 side = normalize(cross(dir, toP));
  float w0 = 0.005 + 0.004 * fract(aSeed.w * 3.7);
  float w = max(w0, dist * uPix * 0.75);
  vec3 wp = p + dir * (len * (position.y - 0.5)) + side * (w * position.x);
  float a = (w0 / w) * smoothstep(0.7, 2.6, dist) * (1.0 - smoothstep(0.38, 0.5, dist / uBox.x));
  float c = dot(toP / max(dist, 1e-3), uSunDir);
  vCol = uAmb + uSunCol * wPhase(c);
  vA = a * (0.55 + 0.45 * fract(aSeed.w * 13.3));
  gl_Position = kill > 0.5 ? vec4(2.0, 2.0, 2.0, 1.0) : projectionMatrix * viewMatrix * vec4(wp, 1.0);
}`,
    FR = `
varying vec3 vCol; varying float vA; varying vec2 vUv;
void main(){
  float x = 1.0 - abs(vUv.x) * 2.0;
  float e = smoothstep(0.0, 0.12, vUv.y) * smoothstep(1.0, 0.55, vUv.y);
  gl_FragColor = vec4(vCol, vA * x * e);
}`,
    UR = `
uniform float uTime, uRain; uniform vec3 uSunDir, uSunCol, uAmb, uMaskRect; uniform sampler2D uMask;
attribute vec4 aSeed;
varying vec3 vCol; varying float vA; varying vec2 vUv; varying float vLife;
${Ub}
vec2 sHash(vec2 p){ vec3 q = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973)); q += dot(q, q.yzx + 33.33); return fract((q.xx + q.yz) * q.zy); }
void main(){
  vUv = position.xy;
  float period = 0.26 + 0.14 * aSeed.z;
  float tt = uTime / period + aSeed.w * 10.0; float cyc = floor(tt); float life = fract(tt);
  vec2 r = sHash(aSeed.xy * 91.7 + cyc * 0.371);
  vec2 rr = r - 0.5; rr *= 0.35 + 1.3 * abs(rr);                    // denser near the player
  vec2 snap = floor(cameraPosition.xz / 4.0) * 4.0;
  vec3 p = vec3(snap.x + rr.x * 30.0, 0.0, snap.y + rr.y * 30.0);
  float kill = 0.0;
  vec2 muv = (p.xz - uMaskRect.xy) * uMaskRect.z;
  float inM = step(0.0, muv.x) * step(muv.x, 1.0) * step(0.0, muv.y) * step(muv.y, 1.0);
  float pud = step(textureLod(uMask, muv, 0.0).r, 0.49) * inM;
  float k = fract(aSeed.w * 5.3 + cyc * 0.17);
  if (pud < 0.5 && k > 0.3) kill = 1.0;
  if (k > 0.2 + 0.8 * uRain) kill = 1.0;
  if (p.x > 29.7 || wInside(p + vec3(0.0, 0.2, 0.0))) kill = 1.0;
  float sz = mix(0.04, 0.08, aSeed.z) * mix(0.65, 1.0, pud);
  float wd = sz * (0.7 + 1.5 * life), ht = sz * (0.4 + 1.3 * sin(life * 3.14159));
  vec3 toP = p - cameraPosition; float dist = length(toP);
  vec3 side = normalize(vec3(toP.z, 0.0, -toP.x));
  vec3 wp = p + side * (wd * position.x * 2.0) + vec3(0.0, ht * position.y + 0.004, 0.0);
  float c = dot(toP / max(dist, 1e-3), uSunDir);
  vCol = uAmb * 1.4 + uSunCol * wPhase(c) * 0.8;
  vA = (1.0 - life) * (1.0 - smoothstep(11.0, 15.0, dist)) * mix(0.5, 1.0, pud);
  vLife = life;
  gl_Position = kill > 0.5 ? vec4(2.0, 2.0, 2.0, 1.0) : projectionMatrix * viewMatrix * vec4(wp, 1.0);
}`,
    NR = `
varying vec3 vCol; varying float vA; varying vec2 vUv; varying float vLife;
void main(){
  float x = vUv.x * 2.0, y = vUv.y;
  // little crown: a rim arc that opens outward, plus a few thrown droplets
  float dome = smoothstep(1.0, 0.25, length(vec2(x * 1.15, y * 1.5)));
  float crown = dome * (0.35 + 0.65 * smoothstep(0.25, 0.75, length(vec2(x, y * 1.4))));
  float core = smoothstep(0.5, 0.0, length(vec2(x * 1.6, (y - 0.25) * 1.6))) * (1.0 - vLife);
  float dots = smoothstep(0.16, 0.05, length(vec2(abs(x) - 0.75, y - 0.82))) + smoothstep(0.14, 0.04, length(vec2(x - 0.2, y - 0.93)));
  float a = clamp(crown * 0.5 + core * 0.8 + dots * 0.0, 0.0, 1.0) * vA * 0.6;
  if (a < 0.003) discard;
  gl_FragColor = vec4(vCol, a);
}`;

function Fb(i, e, t) {
    let n = new ea();
    (n.setAttribute(
      "position",
      new et(
        new Float32Array([-0.5, 0, 0, 0.5, 0, 0, -0.5, 1, 0, 0.5, 1, 0]),
        3,
      ),
    ),
      n.setIndex([0, 1, 2, 2, 1, 3]));
    let s = new Float32Array((i + e) * 4);
    for (let o = 0; o < (i + e) * 4; o++) s[o] = t();
    for (let o = i; o < i + e; o++) s[o * 4 + 3] = -1;
    return (
      n.setAttribute("aSeed", new zs(s, 4)),
      (n.instanceCount = i + e),
      (n.boundingSphere = new Dn(new W(), 1e5)),
      n
    );
  }

function Nb(i, e) {
    let t = i.rng && i.rng.fork ? i.rng.fork() : Math.random,
      n = Math.max(0.15, i.quality.rain || 0.5),
      s = Math.round(9e3 * n),
      o = 260,
      r = Math.round(900 * n),
      a = [0, 1, 2, 3].map(() => new W()),
      l = [0, 1, 2, 3].map(() => new W()),
      c = Mn.color.clone().multiplyScalar(1.9),
      u = en.fog.clone().multiplyScalar(0.15),
      h = {
        uTime: { value: 0 },
        uRain: { value: 0.6 },
        uBoxMin: { value: a },
        uBoxMax: { value: l },
        uSunDir: { value: Mn.dir.clone() },
        uSunCol: { value: c },
        uAmb: { value: u },
      },
      f = [0, 1, 2, 3, 4, 5, 6, 7].map(() => new Dt(0, 0, -1, -1)),
      p = {
        ...h,
        uSky: { value: f },
        uPix: { value: 0.002 },
        uDrip: { value: 0 },
        uVel: { value: new W(-2.6, -9.4, 1.1) },
        uBox: { value: new W(26, 15, 26) },
      },
      d = new zn({
        uniforms: p,
        vertexShader: kR,
        fragmentShader: FR,
        transparent: !0,
        depthWrite: !1,
        blending: hr,
        side: Sn,
        fog: !1,
      }),
      v = new Qe(Fb(s, o, t), d);
    ((v.frustumCulled = !1),
      (v.renderOrder = 900),
      (v.name = "rain"),
      (v.matrixAutoUpdate = !1),
      (v.castShadow = v.receiveShadow = !1));
    let g = {
        ...h,
        uMask: { value: e.mask },
        uMaskRect: { value: new W(Li.x0, Li.z0, 1 / Li.size) },
      },
      x = new zn({
        uniforms: g,
        vertexShader: UR,
        fragmentShader: NR,
        transparent: !0,
        depthWrite: !1,
        blending: hr,
        side: Sn,
        fog: !1,
      }),
      y = new Qe(Fb(r, 0, t), x);
    ((y.frustumCulled = !1),
      (y.renderOrder = 890),
      (y.name = "rainSplash"),
      (y.matrixAutoUpdate = !1));
    let b = 0.6,
      m = 0.6,
      A = 22 + t() * 25,
      _ = 0,
      M = new Ae();
    return {
      rain: v,
      splash: y,
      wind: p.uVel.value,
      setRain(w) {
        m = Math.min(1, Math.max(0, w));
      },
      get rainLevel() {
        return b;
      },
      update(w) {
        ((_ += w),
          (b += (m - b) * Math.min(1, w * 0.8)),
          (h.uTime.value = _),
          (h.uRain.value = b),
          (v.visible = y.visible = b > 0.01));
        let S = i.camera;
        if (S) {
          let O = i.render && i.render.resolution;
          (O && O.x > 8 ? M.copy(O) : i.renderer.getDrawingBufferSize(M),
            (p.uPix.value =
              (2 * Math.tan((S.fov * Math.PI) / 360)) / Math.max(1, M.y)));
        }
        let z = (i.level && i.level.interiorBoxes) || [];
        for (let O = 0; O < 4; O++) {
          let q = z[O];
          q && q.min && q.max
            ? (a[O].set(q.min.x - 0.15, q.min.y - 1, q.min.z - 0.15),
              l[O].set(q.max.x + 0.15, q.max.y + 0.3, q.max.z + 0.15))
            : (a[O].set(0, 0, 0), l[O].set(0, 0, 0));
        }
        p.uDrip.value = z.length ? 1 : 0;
        let H = (i.level && i.level.skylights) || [];
        for (let O = 0; O < 8; O++) {
          let q = H[O];
          q && q.w > 0
            ? f[O].set(q.x, q.z, q.w * 0.5, (q.d || q.w) * 0.5)
            : f[O].set(0, 0, -1, -1);
        }
        ((A -= w),
          A <= 0 &&
            ((A = 30 + t() * 30),
            i.events.emit("thunder", { intensity: 0.3 + 0.7 * t() })));
      },
    };
  }

async function O1(i) {
    let e = (i.quality.tex || 512) >= 1024,
      t = Math.min(
        8,
        i.renderer.capabilities.getMaxAnisotropy
          ? i.renderer.capabilities.getMaxAnisotropy()
          : 1,
      ),
      n = e ? 1024 : 512,
      s = Rb(n),
      o = N1(s, n, { repeat: !1, aniso: 2 }),
      r = e ? 512 : 256,
      { det: a, nrm: l } = Cb(r),
      c = N1(a, r, { aniso: t }),
      u = N1(l, r, { aniso: t });
    try {
      document.fonts &&
        document.fonts.load &&
        (await Promise.race([
          document.fonts.load('900 40px "PingFang SC"'),
          new Promise((M) => setTimeout(M, 350)),
        ]));
    } catch {}
    let h = Pb(e ? 2048 : 1024, t),
      f = new ui(new Uint8Array([0, 0, 0, 255]), 1, 1);
    f.needsUpdate = !0;
    let p = { mask: o, detail: c, detailN: u, marks: h, black: f },
      d = new wt();
    d.name = "ground";
    let v = Ib(i, p),
      g = kb(i, p),
      x = Nb(i, p);
    (d.add(v.mesh, g.mesh, g.skirt, x.rain, x.splash), i.scene.add(d));
    let y = zb(i, v.uniforms, [v.mesh, g.mesh, x.rain, x.splash]);
    i.render && i.render.addPrePass && i.render.addPrePass(y.pass);
    let b = (M, E) => {
        let w = i.level && i.level.interiorBoxes;
        if (!w) return !1;
        for (let S = 0; S < w.length; S++) {
          let z = w[S];
          if (
            z &&
            z.min &&
            M > z.min.x &&
            M < z.max.x &&
            E > z.min.z &&
            E < z.max.z
          )
            return !0;
        }
        return !1;
      },
      m = (M, E) =>
        M > Li.x0 && M < Li.x0 + Li.size && E > Li.z0 && E < Li.z0 + Li.size,
      A = 0,
      _ = {
        root: d,
        apron: v.mesh,
        sea: g.mesh,
        rain: x.rain,
        planar: y,
        reflectionTarget: y.target,
        reflectionCamera: y.camera,
        maskTexture: o,
        uniforms: v.uniforms,
        puddleDepth(M, E) {
          return M > oi.quayX || !m(M, E) || b(M, E)
            ? -0.2
            : 0.5 - U1(s, n, M, E, 0);
        },
        isPuddle(M, E) {
          return _.puddleDepth(M, E) > 0.015;
        },
        wetnessAt(M, E) {
          if (M > oi.quayX) return 1;
          if (b(M, E)) return 0.12;
          if (!m(M, E)) return 0.6;
          let w = 0.5 - U1(s, n, M, E, 0);
          if (w > 0.015) return 1;
          let S = bs.smoothstep,
            z = S(w, -0.11, 0),
            H = S(w, -0.65, -0.02),
            O = 1 - S(U1(s, n, M, E, 1) + H * 0.55, 0.2, 0.42);
          return Math.min(0.95, 0.25 + (1 - O) * 0.4 + z * 0.3);
        },
        seaHeight(M, E) {
          return Lb(M, E, A);
        },
        setRain(M) {
          x.setRain(M);
        },
        get rainLevel() {
          return x.rainLevel;
        },
        setReflections(M) {
          y.enabled = !!M;
        },
        update(M) {
          ((A += M),
            x.update(M),
            (v.uniforms.uTime.value = A),
            (v.uniforms.uRain.value = x.rainLevel),
            (g.uniforms.uTime.value = A));
        },
      };
    return _;
  }

async function BR(i) {
    let e = i.scene.children.find(
      (o) =>
        o.isMesh &&
        o.geometry &&
        o.geometry.type === "PlaneGeometry" &&
        o.geometry.parameters &&
        o.geometry.parameters.width === 80,
    );
    (e && i.scene.remove(e), (i.ground = await O1(i)));
    let t = new wt(),
      n = (o, r, a, l, c, u = 0) => {
        let h = new Qe(o, r);
        return (
          h.position.set(a, l, c),
          (h.rotation.y = u),
          (h.castShadow = h.receiveShadow = !0),
          t.add(h),
          h
        );
      },
      s = (o) => i.mats.get(o);
    return (
      n(new un(6.06, 2.59, 2.44), s("paint_red"), 3, 1.295, -0.2),
      n(new un(6.06, 2.59, 2.44), s("paint_blue"), 9.4, 1.295, -0.2),
      n(new un(6.06, 2.59, 2.44), s("paint_teal"), 9.4, 3.885, -0.2),
      n(new un(12.19, 2.59, 2.44), s("paint_yellow"), 3, 1.295, 11.2),
      n(new un(6.06, 2.59, 2.44), s("paint_white"), 12.4, 1.295, 11.2),
      n(new un(1.1, 1.1, 1.1), s("paint_orange"), 5.6, 0.55, 4.7, 0.4),
      n(new Ys(0.29, 0.29, 0.88, 20), s("plastic_blue"), 3.9, 0.44, 6.3),
      n(new Ys(0.29, 0.29, 0.88, 20), s("steel_rust"), 4.6, 0.44, 6.6),
      n(new Ys(0.06, 0.06, 5, 10), s("steel_galv"), 12.5, 2.5, 6.2),
      n(new un(0.08, 1.6, 0.08), i.mats.emissive(16726556, 6), 6.6, 0.82, 2.6),
      n(new un(0.08, 1.6, 0.08), i.mats.emissive(3524863, 5), 2.2, 0.82, 3.2),
      n(new un(2.4, 0.08, 0.06), i.mats.emissive(16773328, 6), 9.4, 2.2, 1.06),
      n(new un(0.3, 0.12, 0.3), i.mats.emissive(16760944, 12), 12.5, 5, 6.2),
      n(new un(0.06, 1.2, 0.06), i.mats.emissive(5832570, 5), 23, 0.62, 8.2),
      n(new un(1.2, 1.2, 1.2), s("steel_dark"), 22.4, 0.6, 9.6, 0.3),
      i.scene.add(t),
      { cam: [-9, 1.65, 5.6], target: [14, 0.4, 5] }
    );
  }

var Sv = {};

br(Sv, { create: () => Cf, showcase: () => JR });

function yv(i) {
    let n = new Float32Array(4096),
      s = i >>> 0,
      o = () => {
        ((s |= 0), (s = (s + 1831565813) | 0));
        let l = Math.imul(s ^ (s >>> 15), 1 | s);
        return (
          (l = (l + Math.imul(l ^ (l >>> 7), 61 | l)) ^ l),
          ((l ^ (l >>> 14)) >>> 0) / 4294967296
        );
      };
    for (let l = 0; l < 4096; l++) n[l] = o();
    let r = (l, c) => {
      let u = Math.floor(l),
        h = Math.floor(c),
        f = l - u,
        p = c - h;
      ((f = f * f * (3 - 2 * f)), (p = p * p * (3 - 2 * p)));
      let d = u & 63,
        v = (u + 1) & 63,
        g = (h & 63) * 64,
        x = ((h + 1) & 63) * 64,
        y = n[g + d],
        b = n[g + v],
        m = n[x + d],
        A = n[x + v];
      return y + (b - y) * f + (m - y + (y - b - m + A) * f) * p;
    };
    return {
      noise: r,
      fbm: (l, c, u = 4) => {
        let h = 0,
          f = 0.5,
          p = 0;
        for (let d = 0; d < u; d++)
          ((h += r(l, c) * f),
            (p += f),
            (l = l * 2.03 + 17.1),
            (c = c * 2.03 + 9.7),
            (f *= 0.5));
        return h / p;
      },
      rnd: o,
    };
  }

var To = (i, e, t) => {
      let n = (t - i) / (e - i);
      return ((n = n < 0 ? 0 : n > 1 ? 1 : n), n * n * (3 - 2 * n));
    },
    Wc = 4,
    H1 = 2;

function Bb(i = 128) {
    let e = i * Wc,
      t = i * H1,
      n = new Uint8Array(e * t * 4),
      s = yv(9173),
      o = new Float32Array(i * i),
      r = new Float32Array(i * i),
      a = new Float32Array(i * i);
    for (let c = 0; c < Wc * H1; c++) {
      let u = c % Wc,
        h = Math.floor(c / Wc),
        f = c * 13.37 + 3.1,
        p = c * 7.77 + 1.3;
      for (let d = 0; d < i; d++)
        for (let v = 0; v < i; v++) {
          let g = ((v + 0.5) / i) * 2 - 1,
            x = ((d + 0.5) / i) * 2 - 1,
            y = 1 - To(0.78, 0.98, Math.max(Math.abs(g), Math.abs(x))),
            b,
            m,
            A;
          if (c === 6) {
            let M = x * 0.5 + 0.5,
              E = 0.16 + 0.5 * M * M,
              w = (s.fbm(g * 2 + f, M * 2 + p, 3) - 0.5) * 0.25,
              S = 1 - To(E * 0.3, E, Math.abs(g + w * M)),
              z = s.fbm(g * 9 + f, M * 2.2 + p, 4),
              H =
                1 - To(0.55, 0.95, M - (s.noise(g * 6 + f, 3.3) - 0.5) * 0.35),
              O = To(0, 0.12, M);
            ((b = S * H * O * To(0.22, 0.7, z + 0.25 * (1 - M))),
              (m = S * H),
              (A = b * 0.5));
          } else {
            let M = c === 7,
              E = M ? 0.3 : 0.6,
              w = (s.fbm(g * 1.4 + f, x * 1.4 + p, 3) - 0.5) * E,
              S = (s.fbm(g * 1.4 + p + 5.2, x * 1.4 + f + 1.7, 3) - 0.5) * E,
              z = g + w,
              H = x + S,
              O = Math.sqrt(z * z + H * H),
              q = (s.fbm(z * 2.2 + f, H * 2.2 + p, 3) - 0.5) * 0.6,
              U = 1 - To(0, M ? 0.84 : 0.8, O + q),
              T = s.fbm(z * 4.2 + f * 2, H * 4.2 + p * 2, 5),
              D = U * (M ? 0.8 + 0.7 * T : 0.25 + 1.5 * T);
            ((b = To(M ? 0.02 : 0.06, M ? 0.7 : 0.95, D)),
              (m = U),
              (A =
                U * 0.55 +
                U * s.fbm(z * 3.1 + f * 3, H * 3.1 + p * 3, 3) * 0.9));
          }
          let _ = d * i + v;
          ((r[_] = b * y), (a[_] = m), (o[_] = A * y));
        }
      for (let d = 0; d < i; d++)
        for (let v = 0; v < i; v++) {
          let g = Math.max(0, v - 2),
            x = Math.min(i - 1, v + 2),
            y = Math.max(0, d - 2),
            b = Math.min(i - 1, d + 2),
            m = ((o[d * i + x] - o[d * i + g]) * i) / 8,
            A = ((o[b * i + v] - o[y * i + v]) * i) / 8,
            _ = 0.55,
            M = -m * _,
            E = -A * _,
            w = 1 / Math.sqrt(M * M + E * E + 1);
          ((M *= w), (E *= w));
          let S = ((h * i + d) * e + u * i + v) * 4,
            z = d * i + v;
          ((n[S] = Math.round((M * 0.5 + 0.5) * 255)),
            (n[S + 1] = Math.round((E * 0.5 + 0.5) * 255)),
            (n[S + 2] = Math.min(255, a[z] * 255)),
            (n[S + 3] = Math.min(255, r[z] * 255)));
        }
    }
    let l = new ui(n, e, t, _n, yi);
    return (
      (l.magFilter = Zt),
      (l.minFilter = Ln),
      (l.generateMipmaps = !0),
      (l.wrapS = l.wrapT = Bi),
      (l.colorSpace = hi),
      (l.needsUpdate = !0),
      l
    );
  }

var Af = 4,
    bv = 2,
    oo = 0,
    _v = 1,
    n0 = 2,
    OR = 3,
    Mv = 4,
    V1 = 5,
    Gc = 6,
    W1 = 7;

function Ob(i = 128) {
    let e = i * Af,
      t = i * bv,
      n = new Uint8Array(e * t * 4),
      s = yv(4441),
      o = [0, 1].map(() => {
        let a = 7 + Math.floor(s.rnd() * 4),
          l = [];
        for (let c = 0; c < a; c++)
          l.push({
            a: (c / a + (s.rnd() - 0.5) * 0.12) * Math.PI * 2,
            l: 0.35 + s.rnd() * 0.6,
            w: 0.018 + s.rnd() * 0.05,
            g: 0.5 + s.rnd() * 0.5,
          });
        return l;
      });
    for (let a = 0; a < 8; a++) {
      let l = a % Af,
        c = Math.floor(a / Af);
      for (let u = 0; u < i; u++)
        for (let h = 0; h < i; h++) {
          let f = ((h + 0.5) / i) * 2 - 1,
            p = ((u + 0.5) / i) * 2 - 1,
            d = Math.sqrt(f * f + p * p),
            v = 1 - To(0.86, 0.99, Math.max(Math.abs(f), Math.abs(p))),
            g = 0;
          if (a === oo) {
            let b = Math.max(0, 1 - d);
            g = b * b * b * 0.75 + Math.exp(-d * d * 22) * 0.5;
          } else if (a === _v) {
            let b = Math.pow(Math.max(0, 1 - f * f), 1.5);
            g = Math.exp(-(p * p) / (0.42 * 0.42)) * b;
          } else if (a === n0 || a === OR) {
            let b = o[a - n0],
              m = Math.atan2(p, f);
            for (let A of b) {
              let _ = Math.abs(m - A.a) % (Math.PI * 2);
              _ > Math.PI && (_ = Math.PI * 2 - _);
              let M = Math.sin(Math.min(_, 1.5)) * d;
              _ < 1.5 &&
                (g +=
                  A.g *
                  Math.exp(-(M * M) / (A.w * A.w * (0.4 + d))) *
                  Math.pow(Math.max(0, 1 - d / A.l), 1.4));
            }
            g =
              g * (0.7 + 0.6 * s.fbm(f * 5 + a * 9, p * 5, 3)) +
              Math.exp(-d * d * 70) * 1.2 +
              Math.max(0, 1 - d * 2.2) * 0.06;
          } else if (a === Mv) {
            let b = Math.atan2(p, f),
              m =
                0.78 +
                (s.noise(Math.cos(b) * 2 + 5, Math.sin(b) * 2 + 5) - 0.5) *
                  0.04;
            g =
              Math.exp(-((d - m) * (d - m)) / (0.03 * 0.03)) *
                (0.6 +
                  0.4 * s.noise(Math.cos(b) * 5 + 9, Math.sin(b) * 5 + 9)) +
              0.05 * To(0.2, 0.78, d) * (1 - To(0.78, 0.8, d));
          } else if (a === V1) {
            let b = (s.fbm(f * 1.6 + 3.3, p * 1.6 + 8.1, 3) - 0.5) * 0.5,
              m = (s.fbm(f * 1.6 + 7.7, p * 1.6 + 2.2, 3) - 0.5) * 0.5,
              A = f + b,
              _ = p + m,
              M = Math.sqrt(A * A + _ * _),
              E = 1 - To(0, 0.84, M),
              w = s.fbm(A * 4 + 1.1, _ * 4 + 6.6, 5);
            g = To(0.04, 0.9, E * (0.3 + 1.4 * w)) * (0.45 + 0.75 * E);
          } else if (a === Gc) g = 1 - To(0.3, 0.62, d);
          else if (a === W1) {
            let b = f * 0.5 + 0.5,
              m = 0.22 + 0.3 * b,
              A = Math.exp(-(p * p) / (m * m)) * Math.pow(b, 1.8),
              _ = (f - 0.8) / 0.16;
            (f > 0.8 && (A *= Math.max(0, 1 - _ * _)), (g = A * 1.15));
          }
          g *= v;
          let x = Math.max(0, Math.min(255, g * 255)),
            y = ((c * i + u) * e + l * i + h) * 4;
          ((n[y] = n[y + 1] = n[y + 2] = x), (n[y + 3] = 255));
        }
    }
    let r = new ui(n, e, t, _n, yi);
    return (
      (r.magFilter = Zt),
      (r.minFilter = Ln),
      (r.generateMipmaps = !0),
      (r.wrapS = r.wrapT = Bi),
      (r.colorSpace = hi),
      (r.needsUpdate = !0),
      r
    );
  }

var dl = 4,
    xv = 2,
    da = {
      bullet_metal: [0, 1],
      bullet_concrete: [2, 3],
      bullet_wood: [4],
      scorch: [5],
      soot: [6],
      bullet_glass: [7],
    };

function Hb(i = 256) {
    let e = i * dl,
      t = i * xv,
      n = document.createElement("canvas");
    ((n.width = e), (n.height = t));
    let s = document.createElement("canvas");
    ((s.width = e), (s.height = t));
    let o = document.createElement("canvas");
    ((o.width = e), (o.height = t));
    let r = n.getContext("2d"),
      a = s.getContext("2d"),
      l = o.getContext("2d", { willReadFrequently: !0 });
    ((l.fillStyle = "rgb(128,128,128)"), l.fillRect(0, 0, e, t));
    let c = (_, M) => {
        let E = l.createRadialGradient(0, 0, 0, 0, 0, M);
        for (let [w, S] of _) E.addColorStop(w, `rgb(${S},${S},${S})`);
        ((l.fillStyle = E),
          l.beginPath(),
          l.arc(0, 0, M, 0, Math.PI * 2),
          l.fill());
      },
      h = yv(77123).rnd;
    ((a.fillStyle = "rgb(0,235,0)"), a.fillRect(0, 0, e, t));
    let f = Math.PI * 2,
      p = (_, M, E, w = 22, S = 1) => {
        _.beginPath();
        for (let z = 0; z < w; z++) {
          let H = (z / w) * f,
            O = M * (1 + (h() - 0.5) * E),
            q = Math.cos(H) * O,
            U = Math.sin(H) * O * S;
          z ? _.lineTo(q, U) : _.moveTo(q, U);
        }
        _.closePath();
      },
      d = (_, M, E, w, S, z, H) => {
        _.beginPath();
        let O = E,
          q = M;
        _.moveTo(Math.cos(q) * O, Math.sin(q) * O);
        let U = 5 + Math.floor(h() * 4);
        for (let T = 1; T <= U; T++)
          ((O = E + ((w - E) * T) / U),
            (q += (h() - 0.5) * S),
            _.lineTo(Math.cos(q) * O, Math.sin(q) * O));
        ((_.strokeStyle = H),
          (_.lineWidth = z),
          (_.lineCap = "round"),
          (_.lineJoin = "round"),
          _.stroke());
      },
      v = (_, M) => {
        let E = ((_ % dl) + 0.5) * i,
          w = (Math.floor(_ / dl) + 0.5) * i,
          S = i / 2;
        for (let z of [r, a, l])
          (z.save(),
            z.beginPath(),
            z.rect(E - S, w - S, i, i),
            z.clip(),
            z.translate(E, w));
        (M(S), r.restore(), a.restore(), l.restore());
      },
      g = (_, M, E, w) => {
        let S = _.createRadialGradient(0, 0, M, 0, 0, E);
        for (let [z, H] of w) S.addColorStop(z, H);
        return S;
      };
    for (let _ of da.bullet_metal)
      v(_, (M) => {
        ((r.fillStyle = g(r, M * 0.1, M * 0.6, [
          [0, "rgba(14,13,12,0.4)"],
          [0.5, "rgba(18,17,16,0.14)"],
          [1, "rgba(20,20,20,0)"],
        ])),
          r.fillRect(-M, -M, 2 * M, 2 * M));
        let E = 6 + Math.floor(h() * 5);
        for (let T = 0; T < E; T++) {
          let D = h() * f;
          d(
            r,
            D,
            M * 0.2,
            M * (0.38 + h() * 0.45),
            0.3,
            0.8 + h() * 1,
            "rgba(8,8,8,0.55)",
          );
        }
        let w = M * (0.24 + h() * 0.08),
          S = 0.7 + h() * 0.5,
          z = h() * f,
          H = (T, D, C, G, j, N) => {
            for (let F of [r, a]) (F.save(), F.translate(T, D), F.rotate(G));
            let Q = [];
            for (let F = 0; F < N; F++) Q.push(1 + (h() - 0.5) * j);
            let K = (F, X) => {
              F.beginPath();
              for (let ne = 0; ne < N; ne++) {
                let re = (ne / N) * f,
                  $ = C * Q[ne] * X,
                  ue = Math.cos(re) * $,
                  me = Math.sin(re) * $ * S;
                ne ? F.lineTo(ue, me) : F.moveTo(ue, me);
              }
              F.closePath();
            };
            (K(r, 1),
              (r.lineJoin = "miter"),
              (r.strokeStyle = "rgba(92,54,36,0.95)"),
              (r.lineWidth = Math.max(1.5, C * 0.14)),
              r.stroke());
            let ie = 150 + Math.floor(h() * 50);
            (K(r, 1),
              (r.fillStyle = g(r, 0, C * 1.2, [
                [0, `rgb(${ie - 30},${ie - 26},${ie - 20})`],
                [0.7, `rgb(${ie + 30},${ie + 33},${ie + 36})`],
                [1, `rgb(${ie},${ie + 3},${ie + 6})`],
              ])),
              r.fill(),
              K(a, 1),
              (a.fillStyle = "rgb(0,85,255)"),
              a.fill(),
              r.restore(),
              a.restore());
          };
        H(0, 0, w, z, 0.75, 11);
        let O = 2 + Math.floor(h() * 4);
        for (let T = 0; T < O; T++) {
          let D = h() * f,
            C = w * (1 + h() * 0.7);
          H(
            Math.cos(D) * C,
            Math.sin(D) * C,
            w * (0.15 + h() * 0.3),
            h() * f,
            0.8,
            7,
          );
        }
        for (let T = 0; T < 9; T++) {
          let D = h() * f,
            C = w * 0.3,
            G = w * (0.6 + h() * 0.3);
          (r.beginPath(),
            r.moveTo(Math.cos(D) * C, Math.sin(D) * C),
            r.lineTo(Math.cos(D + 0.1) * G, Math.sin(D + 0.1) * G),
            (r.strokeStyle =
              h() < 0.5 ? "rgba(245,246,248,0.7)" : "rgba(70,72,76,0.5)"),
            (r.lineWidth = 0.8),
            r.stroke());
        }
        let q = M * (0.1 + h() * 0.025),
          U = 8 + Math.floor(h() * 5);
        for (let T = 0; T < U; T++) {
          if (h() < 0.15) continue;
          let D = ((T + (h() - 0.5) * 0.6) / U) * f,
            C = q * (1.25 + h() * 0.9),
            G = 0.16 + h() * 0.16,
            j = 205 + Math.floor(h() * 50);
          (r.beginPath(),
            r.moveTo(Math.cos(D - G) * q * 0.9, Math.sin(D - G) * q * 0.9),
            r.lineTo(Math.cos(D) * C, Math.sin(D) * C),
            r.lineTo(Math.cos(D + G) * q * 0.9, Math.sin(D + G) * q * 0.9),
            r.closePath(),
            (r.fillStyle = `rgb(${j},${j},${Math.min(255, j + 4)})`),
            r.fill(),
            (r.strokeStyle = "rgba(40,40,42,0.6)"),
            (r.lineWidth = 0.7),
            r.stroke());
        }
        (a.beginPath(),
          a.arc(0, 0, q * 1.8, 0, f),
          (a.fillStyle = "rgb(0,60,255)"),
          a.fill(),
          p(r, q, 0.3, 11),
          (r.fillStyle = g(r, 0, q, [
            [0, "#000000"],
            [0.8, "#040404"],
            [1, "#141414"],
          ])),
          r.fill(),
          c(
            [
              [0, 0],
              [0.26, 10],
              [0.36, 240],
              [0.5, 200],
              [0.62, 100],
              [1, 128],
            ],
            q * 3.4,
          ),
          p(a, q, 0.1, 11),
          (a.fillStyle = "rgb(0,250,0)"),
          a.fill());
      });
    for (let _ of da.bullet_concrete)
      v(_, (M) => {
        ((r.fillStyle = g(r, M * 0.2, M * 0.9, [
          [0, "rgba(186,180,168,0.22)"],
          [0.6, "rgba(180,175,165,0.07)"],
          [1, "rgba(170,165,155,0)"],
        ])),
          r.fillRect(-M, -M, 2 * M, 2 * M));
        let E = 4 + Math.floor(h() * 4);
        for (let O = 0; O < E; O++) {
          let q = h() * f,
            U = M * (0.5 + h() * 0.42);
          (d(r, q, M * 0.25, U, 0.35, 1.3 + h() * 1.3, "rgba(20,19,18,0.75)"),
            h() < 0.5 &&
              d(
                r,
                q + (h() - 0.5) * 0.6,
                U * 0.7,
                U * 1.05,
                0.6,
                0.9,
                "rgba(20,19,18,0.5)",
              ));
        }
        let w = M * (0.33 + h() * 0.09),
          S = 12,
          z = [];
        for (let O = 0; O < S; O++) z.push(1 + (h() - 0.5) * 0.6);
        let H = (O, q, U, T) => {
          O.beginPath();
          for (let D = 0; D < S; D++) {
            let C = (D / S) * f,
              G = w * z[D] * q;
            D
              ? O.lineTo(Math.cos(C) * G + U, Math.sin(C) * G + T)
              : O.moveTo(Math.cos(C) * G + U, Math.sin(C) * G + T);
          }
          O.closePath();
        };
        (H(r, 1.05, 1.5, 1.5),
          (r.fillStyle = "rgba(22,21,20,0.8)"),
          r.fill(),
          H(r, 1, 0, 0),
          (r.fillStyle = g(r, w * 0.1, w * 1.1, [
            [0, "#35332f"],
            [0.4, "#6f6b63"],
            [0.8, "#8f8b82"],
            [1, "#9a968c"],
          ])),
          r.fill(),
          H(r, 0.97, -1, -1),
          (r.strokeStyle = "rgba(206,201,190,0.55)"),
          (r.lineWidth = 1.2),
          r.stroke());
        for (let O = 0; O < 6; O++) {
          let q = h() * f;
          d(r, q, w * 0.2, w * 0.9, 0.5, 1, "rgba(28,27,25,0.5)");
        }
        for (let O = 0; O < 60; O++) {
          let q = h() * f,
            U = Math.sqrt(h()) * w * 0.85;
          ((r.fillStyle =
            h() < 0.55 ? "rgba(36,34,32,0.6)" : "rgba(196,191,180,0.6)"),
            r.beginPath(),
            r.arc(Math.cos(q) * U, Math.sin(q) * U, 0.7 + h() * 2, 0, f),
            r.fill());
        }
        (p(r, w * 0.3, 0.45, 9),
          (r.fillStyle = g(r, 0, w * 0.33, [
            [0, "#060606"],
            [0.7, "#161514"],
            [1, "#2c2a27"],
          ])),
          r.fill(),
          c(
            [
              [0, 0],
              [0.24, 20],
              [0.3, 70],
              [0.8, 112],
              [0.88, 150],
              [1, 128],
            ],
            w * 1.15,
          ));
        for (let O = 0; O < 22; O++) {
          let q = h() * f,
            U = w * (1.15 + h() * 1.3);
          ((r.fillStyle =
            h() < 0.5 ? "rgba(190,185,175,0.45)" : "rgba(30,29,27,0.45)"),
            r.beginPath(),
            r.arc(Math.cos(q) * U, Math.sin(q) * U, 0.6 + h() * 1.6, 0, f),
            r.fill());
        }
      });
    for (let _ of da.bullet_wood)
      v(_, (M) => {
        (p(r, M * 0.27, 0.7, 11, 1.45),
          (r.fillStyle = "rgba(206,182,140,0.85)"),
          r.fill());
        for (let E = 0; E < 46; E++) {
          let w = (h() - 0.5) * M * 0.62,
            S = M * (0.25 + h() * 0.6) * (1 - Math.abs(w) / (M * 0.4)),
            z = (h() - 0.5) * M * 0.2;
          (r.beginPath(),
            r.moveTo(w, z - S),
            r.lineTo(w + (h() - 0.5) * 5, z + S),
            (r.strokeStyle =
              h() < 0.5 ? "rgba(236,216,172,0.85)" : "rgba(88,62,38,0.7)"),
            (r.lineWidth = 0.8 + h() * 2.2),
            r.stroke());
        }
        (p(r, M * 0.1, 0.5, 9, 1.1),
          (r.fillStyle = g(r, 0, M * 0.12, [
            [0, "#050403"],
            [0.8, "#140f0a"],
            [1, "#3a2a1a"],
          ])),
          r.fill(),
          c(
            [
              [0, 0],
              [0.5, 30],
              [0.8, 140],
              [1, 128],
            ],
            M * 0.17,
          ));
      });
    for (let _ of da.scorch)
      v(_, (M) => {
        ((r.fillStyle = g(r, 0, M * 0.98, [
          [0, "rgba(6,5,5,0.92)"],
          [0.3, "rgba(10,9,8,0.85)"],
          [0.55, "rgba(22,18,15,0.5)"],
          [0.8, "rgba(30,24,20,0.16)"],
          [1, "rgba(30,24,20,0)"],
        ])),
          r.fillRect(-M, -M, 2 * M, 2 * M));
        for (let E = 0; E < 90; E++) {
          let w = h() * f,
            S = M * (0.1 + h() * 0.3),
            z = M * (0.5 + h() * 0.46);
          (r.beginPath(),
            r.moveTo(Math.cos(w - 0.03) * S, Math.sin(w - 0.03) * S),
            r.lineTo(Math.cos(w) * z, Math.sin(w) * z),
            r.lineTo(Math.cos(w + 0.03) * S, Math.sin(w + 0.03) * S),
            r.closePath(),
            (r.fillStyle = `rgba(8,7,6,${0.12 + h() * 0.3})`),
            r.fill());
        }
        for (let E = 0; E < 60; E++) {
          let w = h() * f,
            S = M * (0.15 + h() * 0.6);
          ((r.fillStyle =
            h() < 0.3 ? "rgba(150,140,128,0.25)" : "rgba(0,0,0,0.4)"),
            r.beginPath(),
            r.arc(Math.cos(w) * S, Math.sin(w) * S, 1 + h() * 4, 0, f),
            r.fill());
        }
      });
    for (let _ of da.soot)
      v(_, (M) => {
        for (let E = 0; E < 14; E++) {
          let w = h() * f,
            S = h() * M * 0.3,
            z = M * (0.15 + h() * 0.3),
            H = Math.cos(w) * S,
            O = Math.sin(w) * S,
            q = r.createRadialGradient(H, O, 0, H, O, z);
          (q.addColorStop(0, "rgba(8,8,8,0.4)"),
            q.addColorStop(1, "rgba(8,8,8,0)"),
            (r.fillStyle = q),
            r.fillRect(-M, -M, 2 * M, 2 * M));
        }
        (p(r, M * 0.1, 0.4, 12), (r.fillStyle = "rgba(0,0,0,0.9)"), r.fill());
      });
    for (let _ of da.bullet_glass)
      v(_, (M) => {
        ((r.fillStyle = g(r, 0, M * 0.5, [
          [0, "rgba(235,240,242,0.55)"],
          [1, "rgba(235,240,242,0)"],
        ])),
          r.fillRect(-M, -M, 2 * M, 2 * M));
        for (let E = 0; E < 13; E++) {
          let w = ((E + h() * 0.6) / 13) * f;
          d(
            r,
            w,
            M * 0.07,
            M * (0.5 + h() * 0.45),
            0.12,
            0.9 + h(),
            "rgba(240,246,248,0.85)",
          );
        }
        for (let E = 0; E < 3; E++) {
          let w = M * (0.2 + E * 0.17 + h() * 0.05);
          for (let S = 0; S < 9; S++) {
            if (h() < 0.45) continue;
            let z = (S / 9) * f;
            (r.beginPath(),
              r.arc(0, 0, w, z, z + 0.5),
              (r.strokeStyle = "rgba(240,246,248,0.6)"),
              (r.lineWidth = 1),
              r.stroke());
          }
        }
        (p(r, M * 0.07, 0.3, 10), (r.fillStyle = "#060606"), r.fill());
      });
    let x = new xs(n);
    ((x.colorSpace = Vn), (x.anisotropy = 4));
    let y = new xs(s);
    y.colorSpace = hi;
    let b = 2 / i,
      m = (_) => {
        let M = _ % dl,
          E = Math.floor(_ / dl);
        return [
          (M + b) / dl,
          1 - (E + 1 - b) / xv,
          (M + 1 - b) / dl,
          1 - (E + b) / xv,
        ];
      },
      A = null;
    try {
      let _ = l.getImageData(0, 0, e, t),
        M = _.data;
      if (M && M.length === e * t * 4) {
        let E = l.createImageData(e, t),
          w = E.data,
          S = 5 / 255;
        for (let z = 0; z < t; z++) {
          let H = Math.max(0, z - 1) * e,
            O = Math.min(t - 1, z + 1) * e;
          for (let q = 0; q < e; q++) {
            let U = Math.max(0, q - 1),
              T = Math.min(e - 1, q + 1),
              D = (M[(z * e + T) * 4] - M[(z * e + U) * 4]) * S,
              C = (M[(O + q) * 4] - M[(H + q) * 4]) * S,
              G = 1 / Math.sqrt(D * D + C * C + 1),
              j = (z * e + q) * 4;
            ((w[j] = (-D * G * 0.5 + 0.5) * 255),
              (w[j + 1] = (C * G * 0.5 + 0.5) * 255),
              (w[j + 2] = (G * 0.5 + 0.5) * 255),
              (w[j + 3] = 255));
          }
        }
        (l.putImageData(E, 0, 0), (A = new xs(o)), (A.colorSpace = hi));
      }
    } catch {
      A = null;
    }
    return { map: x, orm: y, nrm: A, uv: m };
  }

var HR = `
attribute vec4 aPos;    // xyz centre, w size (m)
attribute vec4 aAxis;   // mode 1: stretch axis (length = streak length); mode 2: plane normal; w = roll (rad)
attribute vec4 aCol;    // rgb (HDR), a
attribute vec4 aMisc;   // x atlas frame, y mode (0 billboard, 1 velocity-stretched, 2 surface-aligned), z age 0..1, w sun visibility
uniform vec2 uAtlas;
uniform float uPx;      // world size of one pixel at distance 1
varying vec2 vUv;
varying vec4 vCol;
varying vec3 vOff;
varying vec3 vToCam;
varying vec3 vInfo;     // view z, age, shade
varying float vSoftD;
varying vec3 vT;
varying vec3 vB;
void main() {
  vec2 c = position.xy;
  vec3 center = aPos.xyz; float size = aPos.w; float mode = aMisc.y;
  vec3 camR = vec3(viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0]);
  vec3 camU = vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]);
  vec3 toCam = cameraPosition - center; float dist = length(toCam); toCam /= max(dist, 1e-4);
  float sn = sin(aAxis.w), cs = cos(aAxis.w);
  vec2 rc = vec2(c.x * cs - c.y * sn, c.x * sn + c.y * cs);
  vec3 off; float comp = 1.0;
  if (mode < 0.5) {
    off = (camR * rc.x + camU * rc.y) * size;
    vT = camR * cs + camU * sn; vB = camU * cs - camR * sn;
  } else if (mode < 1.5) {
    float len = length(aAxis.xyz); vec3 d = aAxis.xyz / max(len, 1e-5);
    vec3 side = cross(d, toCam); float sl = length(side); side = sl > 1e-3 ? side / sl : camR;
    float w = max(size, dist * uPx * 1.4); comp = size / w;
    if (aMisc.w > 1.5) w = min(w, dist * uPx * aMisc.w);       // additive only: cap on-screen width (tracers near the lens)
    off = d * (c.x * max(len, w)) + side * (c.y * w);
    vT = d; vB = side;
  } else {
    vec3 n = normalize(aAxis.xyz);
    vec3 t = normalize(abs(n.y) > 0.9 ? cross(n, vec3(1.0, 0.0, 0.0)) : cross(vec3(0.0, 1.0, 0.0), n));
    vec3 b = cross(n, t);
    off = (t * rc.x + b * rc.y) * size;
    vT = t * cs + b * sn; vB = b * cs - t * sn;
  }
  vec4 mv = viewMatrix * vec4(center + off, 1.0);
  gl_Position = projectionMatrix * mv;
  float f = floor(aMisc.x + 0.5);
  float col = mod(f, uAtlas.x), row = floor(f / uAtlas.x);
  vUv = (vec2(col, row) + c + 0.5) / uAtlas;
  vCol = vec4(aCol.rgb * comp, aCol.a);
  vOff = off / max(size, 1e-4);
  vToCam = toCam;
  vInfo = vec3(mv.z, aMisc.z, aMisc.w);
  vSoftD = clamp(size * 0.4, 0.04, 0.7);
}`,
    Xb = `
uniform sampler2D uTex;
uniform sampler2D uDepth;
uniform vec2 uRes;
uniform vec2 uNearFar;
uniform float uSoft;
varying vec2 vUv;
varying vec4 vCol;
varying vec3 vOff;
varying vec3 vToCam;
varying vec3 vInfo;
varying float vSoftD;
varying vec3 vT;
varying vec3 vB;
float softFade() {
  float s = 1.0;
  if (uSoft > 0.5) {
    float d = texture2D(uDepth, gl_FragCoord.xy / uRes).x;
    float zs = (uNearFar.x * uNearFar.y) / ((uNearFar.y - uNearFar.x) * d - uNearFar.y);
    s = clamp((vInfo.x - zs) / vSoftD, 0.0, 1.0);
  }
  return s;
}`,
    VR =
      Xb +
      `
uniform vec3 uSun, uSunDir, uAmbLo, uAmbHi;
void main() {
  vec4 t = texture2D(uTex, vUv);
  float er = vInfo.y * 0.45;                                  // wisps erode as the puff ages
  float a = smoothstep(er, er + (vInfo.z > 1.5 ? 0.38 : 0.6), t.a) * vCol.a;   // fire lobes: denser body, crisper edge
  a *= softFade() * smoothstep(0.2, 0.9, -vInfo.x);           // soft intersection + fade right at the lens
  if (a < 0.004) discard;
  vec3 V = normalize(vToCam);
  vec3 q = vOff * 2.0; float r2 = min(dot(q, q), 1.0);
  vec3 Ns = q + V * (sqrt(1.0 - r2) * 0.9 + 0.05);            // overall sphere normal
  vec2 tn = t.rg * 2.0 - 1.0;                                 // billow normal from the flipbook
  vec3 Nb = vT * tn.x + vB * tn.y + V * sqrt(max(1.0 - dot(tn, tn), 0.0));
  vec3 N = normalize(Ns * 0.55 + Nb);
  float wrap = clamp((dot(N, uSunDir) + 0.45) / 1.45, 0.0, 1.0);
  float back = pow(clamp(dot(-V, uSunDir), 0.0, 1.0), 5.0);   // looking into the sun: forward scatter through thin edges
  float thin = 1.0 - t.b * smoothstep(0.0, 0.5, a);
  float hot = step(1.5, vInfo.z), shade = vInfo.z - 2.0 * hot;      // aMisc.w >= 2: emissive fire lobe (colour = emission)
  vec3 sun = uSun * (wrap * wrap * 0.85 + back * (0.15 + 1.3 * thin)) * shade;
  vec3 amb = mix(uAmbLo, uAmbHi, N.y * 0.5 + 0.5) * (1.0 - 0.35 * t.b);
  vec3 col = vCol.rgb * (amb + sun);
  if (hot > 0.5) {
    // alpha-blended fire: hot dense cores, dim orange skin, soot underneath. Because it is NOT additive, overlapping lobes
    // keep their shape and smoke in front can occlude them.
    float lump = clamp(dot(tn, vec2(0.6, 0.8)) * 0.6 + 0.5, 0.0, 1.0);
    float core = t.b * t.b * smoothstep(0.15, 0.9, t.a);
    vec3 fire = vCol.rgb * (0.10 + 1.7 * core) * (0.45 + 1.1 * lump);
    col = vec3(0.045, 0.042, 0.04) * (amb + sun) + fire;
  }
  gl_FragColor = vec4(col, a);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
  gl_FragColor.rgb *= gl_FragColor.a;                         // premultiply after the (possibly no-op) output transform
}`,
    WR =
      Xb +
      `
void main() {
  float t = texture2D(uTex, vUv).r;
  float k = t * vCol.a * softFade();
  if (k < 0.002) discard;
  gl_FragColor = vec4(vCol.rgb * k, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`,
    Vb = new Ae();

function Ev(
    i,
    e,
    {
      lit: t,
      tex: n,
      cols: s,
      rows: o,
      renderOrder: r,
      sun: a,
      sunDir: l,
      ambLo: c,
      ambHi: u,
    },
  ) {
    let h = new ea();
    (h.setAttribute(
      "position",
      new et(
        new Float32Array([
          -0.5, -0.5, 0, 0.5, -0.5, 0, 0.5, 0.5, 0, -0.5, 0.5, 0,
        ]),
        3,
      ),
    ),
      h.setIndex([0, 1, 2, 0, 2, 3]));
    let f = (S) => {
        let z = new zs(new Float32Array(e * 4), 4);
        return (z.setUsage(bo), h.setAttribute(S, z), z);
      },
      p = f("aPos"),
      d = f("aAxis"),
      v = f("aCol"),
      g = f("aMisc");
    h.instanceCount = 0;
    let x = {
      uTex: { value: n },
      uAtlas: { value: new Ae(s, o) },
      uPx: { value: 0.001 },
      uDepth: { value: null },
      uRes: { value: new Ae(1, 1) },
      uNearFar: { value: new Ae(0.08, 900) },
      uSoft: { value: 0 },
    };
    t &&
      Object.assign(x, {
        uSun: { value: a },
        uSunDir: { value: l },
        uAmbLo: { value: c },
        uAmbHi: { value: u },
      });
    let y = new zn({
      uniforms: x,
      vertexShader: HR,
      fragmentShader: t ? VR : WR,
      transparent: !0,
      depthWrite: !1,
      depthTest: !0,
      side: Sn,
      fog: !1,
      blending: Sh,
      blendEquation: nr,
      blendSrc: G0,
      blendDst: t ? w0 : G0,
      blendSrcAlpha: Th,
      blendDstAlpha: G0,
    });
    y.name = t ? "fx_lit" : "fx_add";
    let b = new Qe(h, y);
    ((b.frustumCulled = !1),
      (b.renderOrder = r),
      (b.castShadow = !1),
      (b.receiveShadow = !1),
      (b.matrixAutoUpdate = !1),
      (b.name = y.name),
      (b.onBeforeRender = (S, z, H) => {
        let O = S.getRenderTarget(),
          q;
        O ? (q = O.height) : (S.getDrawingBufferSize(Vb), (q = Vb.y));
        let U = H.projectionMatrix.elements;
        x.uPx.value = 2 / (Math.max(U[5], 0.001) * Math.max(q, 1));
        let T = i.render,
          D = T && T.depthTexture;
        D &&
        D.image &&
        H === i.camera &&
        T.depthTextureIsLive !== !0 &&
        i.params.fxsoft !== "0"
          ? ((x.uDepth.value = D),
            (x.uSoft.value = 1),
            T.resolution && T.resolution.x > 0
              ? x.uRes.value.set(T.resolution.x, T.resolution.y)
              : x.uRes.value.set(D.image.width || 1, D.image.height || 1),
            x.uNearFar.value.set(H.near, H.far))
          : ((x.uDepth.value = null), (x.uSoft.value = 0));
      }));
    let m = p.array,
      A = d.array,
      _ = v.array,
      M = g.array,
      E = {
        mesh: b,
        cap: e,
        n: 0,
        P: m,
        A,
        C: _,
        M,
        begin() {
          E.n = 0;
        },
        push(S, z, H, O, q, U, T, D, C, G, j, N, Q, K, ie, F) {
          let X = E.n;
          if (X >= e) return !1;
          let ne = X * 4;
          return (
            (m[ne] = S),
            (m[ne + 1] = z),
            (m[ne + 2] = H),
            (m[ne + 3] = O),
            (A[ne] = q),
            (A[ne + 1] = U),
            (A[ne + 2] = T),
            (A[ne + 3] = D),
            (_[ne] = C),
            (_[ne + 1] = G),
            (_[ne + 2] = j),
            (_[ne + 3] = N),
            (M[ne] = Q),
            (M[ne + 1] = K),
            (M[ne + 2] = ie),
            (M[ne + 3] = F),
            (E.n = X + 1),
            !0
          );
        },
        end: null,
      },
      w = [p, d, v, g];
    return (
      (E.end = () => {
        let S = E.n;
        if (((h.instanceCount = S), (b.visible = S > 0), !!S))
          for (let z = 0; z < 4; z++) {
            let H = w[z];
            (H.clearUpdateRanges(),
              H.addUpdateRange(0, S * 4),
              (H.needsUpdate = !0));
          }
      }),
      E
    );
  }

var qc = 1,
    Xc = 2,
    GR = 4,
    Rf = class {
      constructor(e, t) {
        ((this.cap = e), (this.sorted = t), (this.n = 0), (this.freeTop = e));
        let n = () => new Float32Array(e);
        ((this.px = n()),
          (this.py = n()),
          (this.pz = n()),
          (this.vx = n()),
          (this.vy = n()),
          (this.vz = n()),
          (this.age = n()),
          (this.life = n()),
          (this.s0 = n()),
          (this.s1 = n()),
          (this.sk = n()),
          (this.rot = n()),
          (this.rotv = n()),
          (this.r = n()),
          (this.g = n()),
          (this.b = n()),
          (this.a = n()),
          (this.drag = n()),
          (this.grav = n()),
          (this.wind = n()),
          (this.turb = n()),
          (this.seed = n()),
          (this.fin = n()),
          (this.fout = n()),
          (this.stretch = n()),
          (this.shade = n()),
          (this.key = n()),
          (this.gy = n()),
          (this.frame = new Uint8Array(e)),
          (this.mode = new Uint8Array(e)),
          (this.flags = new Uint8Array(e)),
          (this.ramp = new Uint8Array(e)),
          (this.order = new Uint16Array(e)),
          (this.free = new Uint16Array(e)));
        for (let s = 0; s < e; s++) this.free[s] = e - 1 - s;
      }
      clear() {
        ((this.n = 0), (this.freeTop = this.cap));
        for (let e = 0; e < this.cap; e++) this.free[e] = this.cap - 1 - e;
      }
      emit(e, t, n, s, o, r, a, l, c) {
        if (this.freeTop === 0) return -1;
        let u = this.free[--this.freeTop];
        return (
          (this.order[this.n++] = u),
          (this.px[u] = e),
          (this.py[u] = t),
          (this.pz[u] = n),
          (this.vx[u] = s),
          (this.vy[u] = o),
          (this.vz[u] = r),
          (this.age[u] = -1),
          (this.life[u] = a),
          (this.s0[u] = l),
          (this.s1[u] = c),
          (this.sk[u] = 2),
          (this.rot[u] = 0),
          (this.rotv[u] = 0),
          (this.r[u] = 1),
          (this.g[u] = 1),
          (this.b[u] = 1),
          (this.a[u] = 1),
          (this.drag[u] = 0),
          (this.grav[u] = 0),
          (this.wind[u] = 0),
          (this.turb[u] = 0),
          (this.seed[u] = Math.random() * 100),
          (this.fin[u] = 0),
          (this.fout[u] = 0.5),
          (this.stretch[u] = 0.02),
          (this.shade[u] = 1),
          (this.key[u] = 0),
          (this.gy[u] = 0),
          (this.frame[u] = 0),
          (this.mode[u] = 0),
          (this.flags[u] = 0),
          (this.ramp[u] = 0),
          u
        );
      }
      update(e, t, n, s, o) {
        let {
            px: r,
            py: a,
            pz: l,
            vx: c,
            vy: u,
            vz: h,
            age: f,
            life: p,
            order: d,
            flags: v,
          } = this,
          g = n.x,
          x = n.y,
          y = n.z,
          b = 0,
          m = this.n;
        for (let A = 0; A < m; A++) {
          let _ = d[A];
          if (f[_] < 0) f[_] = 0;
          else {
            if (((f[_] += e), f[_] >= p[_])) {
              this.free[this.freeTop++] = _;
              continue;
            }
            let M = 1 - Math.exp(-this.drag[_] * e),
              E = this.wind[_];
            ((c[_] += (s.x * E - c[_]) * M),
              (u[_] += (s.y * E - u[_]) * M),
              (h[_] += (s.z * E - h[_]) * M),
              (u[_] -= this.grav[_] * e));
            let w = this.turb[_];
            if (w > 0) {
              let H = this.seed[_];
              ((c[_] += Math.sin(a[_] * 2.3 + H + o * 1.7) * w * e),
                (h[_] += Math.cos(r[_] * 1.9 + H * 1.3 + o * 1.3) * w * e),
                (u[_] +=
                  Math.sin(l[_] * 2.1 + H * 0.7 + o * 2.1) * w * 0.4 * e));
            }
            ((r[_] += c[_] * e),
              (a[_] += u[_] * e),
              (l[_] += h[_] * e),
              (this.rot[_] += this.rotv[_] * e));
            let S = v[_],
              z = this.gy[_] + 0.012;
            if (S && a[_] < z) {
              if (S & Xc) {
                this.free[this.freeTop++] = _;
                continue;
              }
              S & qc
                ? ((a[_] = z),
                  u[_] < 0 &&
                    ((u[_] = -u[_] * (0.25 + (this.seed[_] % 1) * 0.3)),
                    (c[_] *= 0.65),
                    (h[_] *= 0.65)))
                : S & GR && ((a[_] = z), (c[_] = u[_] = h[_] = 0));
            }
          }
          if (this.sorted) {
            let M = r[_] - g,
              E = a[_] - x,
              w = l[_] - y;
            this.key[_] = M * M + E * E + w * w;
          }
          d[b++] = _;
        }
        if (((this.n = b), this.sorted && b > 1)) {
          let A = this.key;
          for (let _ = 1; _ < b; _++) {
            let M = d[_],
              E = A[M],
              w = _ - 1;
            for (; w >= 0 && A[d[w]] < E; ) ((d[w + 1] = d[w]), w--);
            d[w + 1] = M;
          }
        }
        for (let A = 0; A < b; A++) {
          let _ = d[A],
            M = f[_] / p[_],
            E = 1 - M,
            w = 1 - Math.pow(E, this.sk[_]),
            S = this.s0[_] + (this.s1[_] - this.s0[_]) * w,
            z = this.a[_],
            H = this.fin[_],
            O = this.fout[_];
          if ((H > 0 && M < H && (z *= M / H), M > O)) {
            let Q = 1 - (M - O) / (1 - O);
            z *= Q * Q * (3 - 2 * Q);
          }
          let q = this.r[_],
            U = this.g[_],
            T = this.b[_],
            D = this.ramp[_];
          if (D === 1)
            ((q *= Math.pow(E, 0.5)),
              (U *= Math.pow(E, 1.4)),
              (T *= Math.pow(E, 3)));
          else if (D === 2) {
            let Q = 1 - Math.pow(M, 1.6),
              K = Q * Math.sqrt(Q);
            ((q *= K),
              (U *= (0.22 + 0.78 * Math.pow(Q, 1.3)) * K),
              (T *= (0.04 + 0.96 * Math.pow(Q, 3.5)) * K));
          } else if (D === 3) {
            let Q = 0.55 + 0.45 * Math.sin(o * 17 + this.seed[_] * 9);
            ((q *= Q), (U *= Q * (0.6 + 0.4 * E)), (T *= Q * E));
          }
          let C = this.mode[_],
            G = 0,
            j = 1,
            N = 0;
          if (C === 1) {
            let Q = this.stretch[_];
            ((G = c[_] * Q), (j = u[_] * Q), (N = h[_] * Q));
          }
          if (
            !t.push(
              r[_],
              a[_],
              l[_],
              S,
              G,
              j,
              N,
              this.rot[_],
              q,
              U,
              T,
              z,
              this.frame[_],
              C,
              M,
              this.shade[_],
            )
          )
            break;
        }
      }
    },
    q1 = class {
      constructor(e = 48) {
        ((this.cap = e), (this.n = 0));
        let t = () => new Float32Array(e);
        ((this.fx = t()),
          (this.fy = t()),
          (this.fz = t()),
          (this.dx = t()),
          (this.dy = t()),
          (this.dz = t()),
          (this.dist = t()),
          (this.speed = t()),
          (this.trav = t()),
          (this.len = t()),
          (this.width = t()),
          (this.r = t()),
          (this.g = t()),
          (this.b = t()),
          (this.frames = new Uint8Array(e)));
      }
      clear() {
        this.n = 0;
      }
      add(e, t, n, s, o, r, a) {
        let l = this.n;
        l >= this.cap ? (l = 0) : this.n++;
        let c = t.x - e.x,
          u = t.y - e.y,
          h = t.z - e.z,
          f = Math.sqrt(c * c + u * u + h * h);
        if (f < 0.001) {
          l === this.n - 1 && this.n--;
          return;
        }
        ((this.fx[l] = e.x),
          (this.fy[l] = e.y),
          (this.fz[l] = e.z),
          (this.dx[l] = c / f),
          (this.dy[l] = u / f),
          (this.dz[l] = h / f),
          (this.dist[l] = f),
          (this.speed[l] = r),
          (this.trav[l] = 0),
          (this.len[l] = Math.min(Math.max(r * 0.022, 2), 7)),
          (this.width[l] = a),
          (this.r[l] = n),
          (this.g[l] = s),
          (this.b[l] = o),
          (this.frames[l] = 0));
      }
      update(e, t, n, s) {
        let o = this.n;
        for (let r = 0; r < o; r++) {
          let a = this.speed[r],
            l = this.dist[r],
            c = this.len[r];
          this.frames[r] === 0
            ? (this.trav[r] = Math.min(
                l,
                a * Math.max(e, 0.008) * (0.35 + Math.random() * 0.4),
              ))
            : (this.trav[r] += a * e);
          let u = Math.min(this.trav[r], l),
            h = Math.max(0, this.trav[r] - c);
          if (h >= l) {
            if (this.frames[r] >= 2) {
              if ((o--, r !== o)) {
                for (let E of qR) this[E][r] = this[E][o];
                this.frames[r] = this.frames[o];
              }
              r--;
              continue;
            }
            ((h = Math.max(0, l - c * 0.5)), (u = l));
          }
          this.frames[r] = Math.min(250, this.frames[r] + 1);
          let f = (u + h) * 0.5,
            p = Math.max(u - h, 0.05),
            d = this.dx[r],
            v = this.dy[r],
            g = this.dz[r],
            x = this.width[r],
            y = this.fx[r] + d * f,
            b = this.fy[r] + v * f,
            m = this.fz[r] + g * f,
            A = this.r[r],
            _ = this.g[r],
            M = this.b[r];
          (t.push(y, b, m, x, d * p, v * p, g * p, 0, A, _, M, 1, n, 1, 0, 5),
            t.push(
              y,
              b,
              m,
              x * 6,
              d * p * 1.05,
              v * p * 1.05,
              g * p * 1.05,
              0,
              A * 0.04,
              _ * 0.032,
              M * 0.028,
              1,
              n,
              1,
              0,
              28,
            ),
            t.push(
              this.fx[r] + d * u,
              this.fy[r] + v * u,
              this.fz[r] + g * u,
              x * 5,
              0,
              1,
              0,
              0,
              A * 0.2,
              _ * 0.16,
              M * 0.12,
              1,
              s,
              0,
              0,
              1,
            ));
        }
        this.n = o;
      }
    },
    qR = [
      "fx",
      "fy",
      "fz",
      "dx",
      "dy",
      "dz",
      "dist",
      "speed",
      "trav",
      "len",
      "width",
      "r",
      "g",
      "b",
    ],
    ws = new Ye(),
    Oo = new Lt(),
    X1 = new W(),
    Y1 = new W(),
    Wb = new W();

function XR() {
    let i = new un(1, 1, 1, 2, 1, 2),
      e = i.attributes.position,
      t = 1234.5,
      n = () => (
        (t = Math.sin(t * 12.9898 + 78.233) * 43758.5453),
        (t -= Math.floor(t)),
        t
      ),
      s = new Map();
    for (let o = 0; o < e.count; o++) {
      let r =
          e.getX(o).toFixed(3) +
          "," +
          e.getY(o).toFixed(3) +
          "," +
          e.getZ(o).toFixed(3),
        a = s.get(r);
      if (!a) {
        let l = e.getX(o),
          c = e.getY(o),
          u = e.getZ(o),
          f = Math.abs(l) > 0.49 && Math.abs(u) > 0.49 ? 0.72 + n() * 0.2 : 1;
        ((l = l * f + (n() - 0.5) * 0.14),
          (u = u * f + (n() - 0.5) * 0.14),
          (c = c * (0.8 + n() * 0.3) + (n() - 0.5) * 0.1),
          (a = [l, c, u]),
          s.set(r, a));
      }
      e.setXYZ(o, a[0], a[1], a[2]);
    }
    return ((i = i.toNonIndexed()), i.computeVertexNormals(), i);
  }

var $1 = class {
      constructor(e, t = 256) {
        ((this.G = e), (this.cap = t), (this.next = 0), (this.live = 0));
        let n = new Qt({ color: 16777215, roughness: 0.82, metalness: 0.05 });
        n.name = "fx_debris";
        let s = (this.mesh = new Sr(XR(), n, t));
        (s.instanceMatrix.setUsage(bo),
          (s.instanceColor = new zs(new Float32Array(t * 3).fill(1), 3)),
          (s.frustumCulled = !1),
          (s.castShadow = !1),
          (s.receiveShadow = !0),
          (s.name = "fx_debris"));
        let o = () => new Float32Array(t);
        ((this.px = o()),
          (this.py = o()),
          (this.pz = o()),
          (this.vx = o()),
          (this.vy = o()),
          (this.vz = o()),
          (this.ax = o()),
          (this.ay = o()),
          (this.az = o()),
          (this.ang = o()),
          (this.spin = o()),
          (this.sx = o()),
          (this.sy = o()),
          (this.sz = o()),
          (this.age = o()),
          (this.life = o()),
          (this.floor = o()),
          (this.state = new Uint8Array(t)),
          ws.makeScale(0, 0, 0));
        for (let r = 0; r < t; r++) ws.toArray(s.instanceMatrix.array, r * 16);
        s.visible = !1;
      }
      clear() {
        (this.state.fill(0), ws.makeScale(0, 0, 0));
        for (let e = 0; e < this.cap; e++)
          ws.toArray(this.mesh.instanceMatrix.array, e * 16);
        ((this.mesh.instanceMatrix.needsUpdate = !0),
          (this.live = 0),
          (this.mesh.visible = !1));
      }
      add(e, t, n, s, o, r, a, l, c, u, h, f, p, d) {
        let v = this.next;
        ((this.next = (v + 1) % this.cap),
          (this.px[v] = e),
          (this.py[v] = t),
          (this.pz[v] = n),
          (this.vx[v] = s),
          (this.vy[v] = o),
          (this.vz[v] = r));
        let g = Math.random() - 0.5,
          x = Math.random() - 0.5,
          y = Math.random() - 0.5,
          b = Math.hypot(g, x, y) || 1;
        ((this.ax[v] = g / b),
          (this.ay[v] = x / b),
          (this.az[v] = y / b),
          (this.ang[v] = Math.random() * 6.28),
          (this.spin[v] = (Math.random() - 0.5) * 50),
          (this.sx[v] = a),
          (this.sy[v] = l),
          (this.sz[v] = c),
          (this.age[v] = 0),
          (this.life[v] = p),
          (this.floor[v] = d),
          (this.state[v] = 1));
        let m = this.mesh.instanceColor.array;
        ((m[v * 3] = u),
          (m[v * 3 + 1] = h),
          (m[v * 3 + 2] = f),
          (this.mesh.instanceColor.needsUpdate = !0));
      }
      update(e) {
        let t = this.state,
          n = this.mesh.instanceMatrix.array,
          s = 0,
          o = !1;
        for (let r = 0; r < this.cap; r++) {
          let a = t[r];
          if (!a) continue;
          this.age[r] += e;
          let l = this.life[r] - this.age[r];
          if (l <= 0) {
            ((t[r] = 0),
              ws.makeScale(0, 0, 0),
              ws.toArray(n, r * 16),
              (o = !0));
            continue;
          }
          if ((s++, a === 2 && l > 0.5)) continue;
          if (a === 1) {
            ((this.vy[r] -= 9.81 * e),
              (this.px[r] += this.vx[r] * e),
              (this.py[r] += this.vy[r] * e),
              (this.pz[r] += this.vz[r] * e),
              (this.ang[r] += this.spin[r] * e));
            let u =
              this.floor[r] +
              Math.min(this.sx[r], this.sy[r], this.sz[r]) * 0.5;
            this.py[r] < u &&
              this.vy[r] < 0 &&
              ((this.py[r] = u),
              this.vy[r] > -1.2
                ? ((t[r] = 2), (this.vx[r] = this.vy[r] = this.vz[r] = 0))
                : ((this.vy[r] = -this.vy[r] * 0.32),
                  (this.vx[r] *= 0.55),
                  (this.vz[r] *= 0.55),
                  (this.spin[r] *= 0.5)));
          }
          let c = l < 0.5 ? l / 0.5 : 1;
          (Wb.set(this.ax[r], this.ay[r], this.az[r]),
            Oo.setFromAxisAngle(Wb, this.ang[r]),
            X1.set(this.px[r], this.py[r], this.pz[r]),
            Y1.set(this.sx[r] * c, this.sy[r] * c, this.sz[r] * c),
            ws.compose(X1, Oo, Y1),
            ws.toArray(n, r * 16),
            (o = !0));
        }
        ((this.live = s),
          (this.mesh.visible = s > 0),
          o && (this.mesh.instanceMatrix.needsUpdate = !0));
      }
    },
    wv = { pos: new W(), surface: "concrete" },
    YR = new W(0, -1, 0),
    Gb = new W(),
    qb = new Lt(),
    G1 = new In();

function $R() {
    let t = [
        [0, 0],
        [0.006076, 0],
        [0.0062, 0.0012],
        [0.005083999999999999, 0.0022],
        [0.005083999999999999, 0.0034],
        [0.006013999999999999, 0.0046],
        [0.005889999999999999, 0.036399999999999995],
        [0.004092, 0.0416],
        [0.003968, 0.052],
        [0.003224, 0.052],
        [0.0031, 0.044719999999999996],
      ],
      n = new ar(
        t.map((s) => new Ae(s[0], s[1] - 0.052 / 2)),
        10,
      );
    return (n.computeVertexNormals(), n);
  }

var Z1 = class {
    constructor(e, t = 60) {
      ((this.G = e), (this.cap = t), (this.next = 0));
      let n;
      try {
        n = e.mats.get("brass");
      } catch {
        n = null;
      }
      (!n || !n.isMaterial) &&
        (n = new Qt({ color: 11570492, roughness: 0.3, metalness: 1 }));
      let s = (this.mesh = new Sr($R(), n, t));
      (s.instanceMatrix.setUsage(bo),
        (s.frustumCulled = !1),
        (s.castShadow = !1),
        (s.receiveShadow = !0),
        (s.name = "fx_shells"));
      let o = () => new Float32Array(t);
      ((this.px = o()),
        (this.py = o()),
        (this.pz = o()),
        (this.vx = o()),
        (this.vy = o()),
        (this.vz = o()),
        (this.qx = o()),
        (this.qy = o()),
        (this.qz = o()),
        (this.qw = o().fill(1)),
        (this.wx = o()),
        (this.wy = o()),
        (this.wz = o()),
        (this.age = o()),
        (this.rest = o()),
        (this.floor = o()),
        (this.state = new Uint8Array(t)),
        (this.bounces = new Uint8Array(t)),
        ws.makeScale(0, 0, 0));
      for (let r = 0; r < t; r++) ws.toArray(s.instanceMatrix.array, r * 16);
      ((s.visible = !1), (this.surface = new Array(t).fill("concrete")));
    }
    clear() {
      (this.state.fill(0), ws.makeScale(0, 0, 0));
      for (let e = 0; e < this.cap; e++)
        ws.toArray(this.mesh.instanceMatrix.array, e * 16);
      ((this.mesh.instanceMatrix.needsUpdate = !0), (this.mesh.visible = !1));
    }
    _floorAt(e) {
      let t = this.G.physics;
      if (
        ((this.floor[e] = 0), (this.surface[e] = "concrete"), t && t.raycast)
      ) {
        Gb.set(this.px[e], this.py[e] + 0.25, this.pz[e]);
        let n = t.raycast(Gb, YR, 6);
        n
          ? ((this.floor[e] = n.point.y),
            (this.surface[e] = n.surface || "concrete"))
          : (this.floor[e] = -50);
      }
    }
    add(e, t) {
      let n = this.next;
      ((this.next = (n + 1) % this.cap),
        (this.px[n] = e.x),
        (this.py[n] = e.y),
        (this.pz[n] = e.z),
        (this.vx[n] = t.x),
        (this.vy[n] = t.y),
        (this.vz[n] = t.z),
        G1.set(
          Math.random() * 6.28,
          Math.random() * 6.28,
          Math.random() * 6.28,
        ),
        Oo.setFromEuler(G1),
        (this.qx[n] = Oo.x),
        (this.qy[n] = Oo.y),
        (this.qz[n] = Oo.z),
        (this.qw[n] = Oo.w),
        (this.wx[n] = (Math.random() - 0.5) * 40),
        (this.wy[n] = (Math.random() - 0.5) * 20),
        (this.wz[n] = (Math.random() - 0.5) * 40),
        (this.age[n] = 0),
        (this.rest[n] = 0),
        (this.state[n] = 1),
        (this.bounces[n] = 0),
        this._floorAt(n));
    }
    update(e) {
      let t = this.state,
        n = this.mesh.instanceMatrix.array,
        s = 0,
        o = !1;
      for (let r = 0; r < this.cap; r++) {
        let a = t[r];
        if (!a) continue;
        (s++, (this.age[r] += e));
        let l = 1;
        if (a === 1) {
          ((this.vy[r] -= 9.81 * e),
            (this.px[r] += this.vx[r] * e),
            (this.py[r] += this.vy[r] * e),
            (this.pz[r] += this.vz[r] * e));
          let c = this.wx[r],
            u = this.wy[r],
            h = this.wz[r],
            f = this.qx[r],
            p = this.qy[r],
            d = this.qz[r],
            v = this.qw[r],
            g = 0.5 * e,
            x = f + g * (c * v + u * d - h * p),
            y = p + g * (u * v + h * f - c * d),
            b = d + g * (h * v + c * p - u * f),
            m = v - g * (c * f + u * p + h * d),
            A = 1 / (Math.hypot(x, y, b, m) || 1);
          ((this.qx[r] = x * A),
            (this.qy[r] = y * A),
            (this.qz[r] = b * A),
            (this.qw[r] = m * A));
          let _ = this.floor[r] + 0.0065;
          if (this.py[r] < _ && this.vy[r] < 0) {
            this.py[r] = _;
            let M = this.bounces[r]++;
            (M < 2 &&
              (wv.pos.set(this.px[r], this.py[r], this.pz[r]),
              (wv.surface = this.surface[r]),
              this.G.events.emit("shell:bounce", wv)),
              this.vy[r] > -0.9 || M >= 4
                ? ((t[r] = 2),
                  (this.vx[r] = this.vy[r] = this.vz[r] = 0),
                  G1.set(Math.PI / 2, 0, Math.random() * 6.28, "ZXY"),
                  Oo.setFromEuler(G1),
                  (this.qx[r] = Oo.x),
                  (this.qy[r] = Oo.y),
                  (this.qz[r] = Oo.z),
                  (this.qw[r] = Oo.w))
                : ((this.vy[r] = -this.vy[r] * (0.32 + Math.random() * 0.16)),
                  (this.vx[r] = this.vx[r] * 0.6 + (Math.random() - 0.5) * 0.6),
                  (this.vz[r] = this.vz[r] * 0.6 + (Math.random() - 0.5) * 0.6),
                  (this.wx[r] = (Math.random() - 0.5) * 50),
                  (this.wy[r] = (Math.random() - 0.5) * 30),
                  (this.wz[r] = (Math.random() - 0.5) * 50),
                  M === 0 && this._floorAt(r)));
          }
          this.age[r] > 8 && (t[r] = 2);
        } else {
          if (((this.rest[r] += e), this.rest[r] < 4 && this.rest[r] > e * 1.5))
            continue;
          if (this.rest[r] >= 4.7) {
            ((t[r] = 0),
              ws.makeScale(0, 0, 0),
              ws.toArray(n, r * 16),
              (o = !0));
            continue;
          }
          this.rest[r] >= 4 && (l = 1 - (this.rest[r] - 4) / 0.7);
        }
        (qb.set(this.qx[r], this.qy[r], this.qz[r], this.qw[r]),
          X1.set(this.px[r], this.py[r], this.pz[r]),
          Y1.set(l, l, l),
          ws.compose(X1, qb, Y1),
          ws.toArray(n, r * 16),
          (o = !0));
      }
      ((this.mesh.visible = s > 0),
        o && (this.mesh.instanceMatrix.needsUpdate = !0));
    }
  };

var ZR = {
      bullet_metal: 0.25,
      bullet_concrete: 0.34,
      bullet_wood: 0.24,
      scorch: 2.4,
      soot: 0.3,
      bullet_glass: 0.3,
    },
    Yb = 14,
    j1 = class {
      constructor(e, t = 160) {
        ((this.cap = t), (this.next = 0), (this.count = 0));
        let n = (this.atlas = Hb(256)),
          s = new nt();
        ((this.pos = new et(new Float32Array(t * 12), 3)),
          this.pos.setUsage(bo),
          (this.nor = new et(new Float32Array(t * 12), 3)),
          this.nor.setUsage(bo),
          (this.uv = new et(new Float32Array(t * 8), 2)),
          this.uv.setUsage(bo),
          (this.col = new et(new Float32Array(t * 16), 4)),
          this.col.setUsage(bo),
          (this.baseA = new Float32Array(t)),
          s.setAttribute("position", this.pos),
          s.setAttribute("normal", this.nor),
          s.setAttribute("uv", this.uv),
          s.setAttribute("color", this.col));
        let o = new Uint16Array(t * 6);
        for (let l = 0; l < t; l++) {
          let c = l * 4,
            u = l * 6;
          ((o[u] = c),
            (o[u + 1] = c + 1),
            (o[u + 2] = c + 2),
            (o[u + 3] = c),
            (o[u + 4] = c + 2),
            (o[u + 5] = c + 3));
        }
        s.setIndex(new et(o, 1));
        let r = new Qt({
          map: n.map,
          roughnessMap: n.orm,
          metalnessMap: n.orm,
          roughness: 1,
          metalness: 1,
          transparent: !0,
          vertexColors: !0,
          depthWrite: !1,
          polygonOffset: !0,
          polygonOffsetFactor: -4,
          polygonOffsetUnits: -4,
        });
        (n.nrm && ((r.normalMap = n.nrm), (r.normalScale = new Ae(1, 1))),
          (r.name = "fx_decals"));
        let a = (this.mesh = new Qe(s, r));
        ((a.frustumCulled = !1),
          (a.castShadow = !1),
          (a.receiveShadow = !0),
          (a.renderOrder = -5),
          (a.matrixAutoUpdate = !1),
          (a.name = "fx_decals"),
          (a.visible = !1),
          (this.uvs = {}));
        for (let l in da) this.uvs[l] = da[l].map((c) => n.uv(c));
      }
      clear() {
        (this.col.array.fill(0),
          this.pos.array.fill(0),
          (this.col.needsUpdate = this.pos.needsUpdate = !0),
          (this.next = 0),
          (this.count = 0),
          (this.mesh.visible = !1));
      }
      add(e, t, n, s, o = 1, r = 1) {
        let a = this.uvs[n] || this.uvs.bullet_concrete,
          l = a[(Math.random() * a.length) | 0],
          c = (s || ZR[n] || 0.25) * (0.85 + Math.random() * 0.3) * 0.5,
          u = this.next;
        ((this.next = (u + 1) % this.cap),
          this.count < this.cap && this.count++);
        let h = t.x,
          f = t.y,
          p = t.z,
          d = Math.hypot(h, f, p) || 1;
        ((h /= d), (f /= d), (p /= d));
        let v, g, x;
        Math.abs(f) > 0.9
          ? ((v = 1), (g = 0), (x = 0))
          : ((v = -p), (g = 0), (x = h));
        let y = v * h + g * f + x * p;
        ((v -= h * y), (g -= f * y), (x -= p * y));
        let b = Math.hypot(v, g, x) || 1;
        ((v /= b), (g /= b), (x /= b));
        let m = f * x - p * g,
          A = p * v - h * x,
          _ = h * g - f * v,
          M =
            n === "bullet_wood"
              ? (Math.random() - 0.5) * 0.3
              : Math.random() * 6.283,
          E = Math.cos(M),
          w = Math.sin(M),
          S = (v * E + m * w) * c,
          z = (g * E + A * w) * c,
          H = (x * E + _ * w) * c,
          O = (m * E - v * w) * c,
          q = (A * E - g * w) * c,
          U = (_ * E - x * w) * c,
          T = 0.004 + (u % 7) * 3e-4,
          D = e.x + h * T,
          C = e.y + f * T,
          G = e.z + p * T,
          j = this.pos.array,
          N = this.nor.array,
          Q = this.uv.array,
          K = this.col.array,
          ie = u * 12;
        ((j[ie] = D - S - O),
          (j[ie + 1] = C - z - q),
          (j[ie + 2] = G - H - U),
          (j[ie + 3] = D + S - O),
          (j[ie + 4] = C + z - q),
          (j[ie + 5] = G + H - U),
          (j[ie + 6] = D + S + O),
          (j[ie + 7] = C + z + q),
          (j[ie + 8] = G + H + U),
          (j[ie + 9] = D - S + O),
          (j[ie + 10] = C - z + q),
          (j[ie + 11] = G - H + U));
        for (let F = 0; F < 4; F++)
          ((N[ie + F * 3] = h),
            (N[ie + F * 3 + 1] = f),
            (N[ie + F * 3 + 2] = p));
        ((ie = u * 8),
          (Q[ie] = l[0]),
          (Q[ie + 1] = l[1]),
          (Q[ie + 2] = l[2]),
          (Q[ie + 3] = l[1]),
          (Q[ie + 4] = l[2]),
          (Q[ie + 5] = l[3]),
          (Q[ie + 6] = l[0]),
          (Q[ie + 7] = l[3]),
          (ie = u * 16),
          (this.baseA[u] = r));
        for (let F = 0; F < 4; F++)
          ((K[ie + F * 4] = o),
            (K[ie + F * 4 + 1] = o),
            (K[ie + F * 4 + 2] = o),
            (K[ie + F * 4 + 3] = r));
        if (this.count >= this.cap)
          for (let F = 0; F < Yb; F++) {
            let X = (this.next + F) % this.cap,
              ne = (this.baseA[X] * (F + 1)) / (Yb + 1),
              re = X * 16;
            K[re + 3] = K[re + 7] = K[re + 11] = K[re + 15] = ne;
          }
        ((this.pos.needsUpdate =
          this.nor.needsUpdate =
          this.uv.needsUpdate =
          this.col.needsUpdate =
            !0),
          (this.mesh.visible = !0));
      }
    };

var $b = 1400,
    Zb = 3200,
    ht = Math.random,
    Ze = (i, e) => i + (e - i) * Math.random(),
    Et = new W(),
    zt = new W(),
    J1 = new W(),
    qe = new W(),
    Es = new W(),
    Ho = new W(),
    Ei = new W(0, 1, 0),
    jR = new W(0, -1, 0),
    K1 = new Ve(),
    Ao = [1, 1, 1];

function Yc(i, e, t, n) {
    return (
      i == null
        ? ((Ao[0] = e), (Ao[1] = t), (Ao[2] = n))
        : Array.isArray(i)
          ? ((Ao[0] = i[0]), (Ao[1] = i[1]), (Ao[2] = i[2]))
          : i.isColor
            ? ((Ao[0] = i.r), (Ao[1] = i.g), (Ao[2] = i.b))
            : (K1.set(i), (Ao[0] = K1.r), (Ao[1] = K1.g), (Ao[2] = K1.b)),
      Ao
    );
  }

function ro(i, e, t) {
    let n = ht() * 2 - 1,
      s = ht() * 2 - 1,
      o = ht() * 2 - 1,
      r = Math.hypot(n, s, o) || 1,
      a = (e * Math.cbrt(ht())) / r;
    t.set(i.x + n * a, i.y + s * a, i.z + o * a);
    let l = t.length();
    return (l < 1e-4 ? t.copy(i) : t.multiplyScalar(1 / l), t);
  }

async function Cf(i) {
    let e = i.scene || (i.render && i.render.scene),
      t = new W(-0.8, 0, 0.3),
      n = new W(Mn.color.r, Mn.color.g, Mn.color.b).multiplyScalar(
        (Mn.intensity / Math.PI) * 0.9,
      ),
      s = new W(
        en.zenith.r * 0.6 + en.horizonAway.r * 0.5 + en.fog.r * 0.25,
        en.zenith.g * 0.6 + en.horizonAway.g * 0.5 + en.fog.g * 0.25,
        en.zenith.b * 0.6 + en.horizonAway.b * 0.5 + en.fog.b * 0.25,
      ),
      o = new W(
        en.horizonAway.r * 0.3 + en.fog.r * 0.14,
        en.horizonAway.g * 0.3 + en.fog.g * 0.14,
        en.horizonAway.b * 0.3 + en.fog.b * 0.14,
      ),
      r = Ev(i, $b, {
        lit: !0,
        tex: Bb(128),
        cols: Wc,
        rows: H1,
        renderOrder: 10,
        sun: n,
        sunDir: Mn.dir.clone().normalize(),
        ambLo: o,
        ambHi: s,
      }),
      a = Ev(i, Zb, {
        lit: !1,
        tex: Ob(128),
        cols: Af,
        rows: bv,
        renderOrder: 20,
      }),
      l = new Rf($b, !0),
      c = new Rf(Zb - 160, !1),
      u = new q1(48),
      h = new $1(i, 256),
      f = new Z1(i, 60),
      p = new j1(i, 160),
      d = new wt();
    ((d.name = "fx"), d.add(p.mesh, h.mesh, f.mesh, r.mesh, a.mesh), e.add(d));
    let v = 0,
      g = -1,
      x = -1,
      y = () => i.render && i.render.lightPool,
      b = (ee, B, P, V, Y) => {
        let L = y();
        L && L.flash(ee, B, P, V, Y);
      };
    function m(ee, B) {
      let P = i.physics;
      if (!P || !P.raycast) return 1;
      (Es.copy(ee), B && Es.addScaledVector(B, 0.08), (Es.y += 0.03));
      let V = null;
      try {
        V = P.raycast(Es, Mn.dir, 90);
      } catch {
        V = null;
      }
      return V ? 0.2 : 1;
    }
    function A(ee) {
      let B = i.physics;
      if (!B || !B.raycast) return 0;
      (Es.copy(ee), (Es.y += 0.1));
      let P = null;
      try {
        P = B.raycast(Es, jR, 12);
      } catch {
        P = null;
      }
      return P ? P.point.y : -50;
    }
    function _(ee, B, P, V, Y, L, Z, J, oe, fe, le, R, I, se, ae, k, ce, ve) {
      let _e = l.emit(ee, B, P, V, Y, L, Z, J, oe);
      return _e < 0
        ? -1
        : ((l.r[_e] = fe),
          (l.g[_e] = le),
          (l.b[_e] = R),
          (l.a[_e] = I),
          (l.shade[_e] = se),
          (l.drag[_e] = ae),
          (l.grav[_e] = -k),
          (l.wind[_e] = ce),
          (l.turb[_e] = 0.5),
          (l.rot[_e] = ht() * 6.283),
          (l.rotv[_e] = (ht() - 0.5) * 1.2),
          (l.frame[_e] = ve < 0 ? (ht() * 6) | 0 : ve),
          (l.fin[_e] = 0.06),
          (l.fout[_e] = 0.3),
          (l.sk[_e] = 2.5),
          _e);
    }
    function M(ee, B, P, V, Y, L, Z, J, oe, fe, le, R) {
      let I = c.emit(ee, B, P, V, Y, L, Z, J, J * 0.5);
      return I < 0
        ? -1
        : ((c.mode[I] = 1),
          (c.frame[I] = _v),
          (c.stretch[I] = 0.03),
          (c.grav[I] = 9.81),
          (c.drag[I] = 0.9),
          (c.ramp[I] = 1),
          (c.r[I] = oe * 0.6),
          (c.g[I] = fe * 0.6),
          (c.b[I] = le * 0.6),
          (c.fout[I] = 0.55),
          (c.flags[I] = R),
          (c.sk[I] = 1),
          I);
    }
    function E(ee, B, P, V, Y, L, Z, J, oe, fe, le, R) {
      for (let I = 0; I < P; I++) {
        ro(B, L, qe);
        let se = Ze(V, Y) * (0.35 + 0.65 * ht());
        M(
          ee.x,
          ee.y,
          ee.z,
          qe.x * se,
          qe.y * se,
          qe.z * se,
          Ze(Z, J),
          Ze(0.01, 0.02),
          oe * Ze(0.6, 1.2),
          fe * Ze(0.6, 1.2),
          le,
          R,
        );
      }
    }
    function w(ee, B, P, V, Y, L, Z, J, oe, fe) {
      let le = c.emit(ee, B, P, 0, 0, 0, V, Y, L);
      return le < 0
        ? -1
        : ((c.frame[le] = fe),
          (c.r[le] = Z),
          (c.g[le] = J),
          (c.b[le] = oe),
          (c.fout[le] = 0.2),
          (c.rot[le] = ht() * 6.283),
          (c.sk[le] = 1.5),
          le);
    }
    function S(ee, B, P, V, Y, L, Z, J, oe) {
      let fe = c.emit(ee, B, P, 0, 0, 0, V, Y, L);
      return fe < 0
        ? -1
        : ((c.mode[fe] = 2),
          (c.frame[fe] = Mv),
          (c.r[fe] = Z),
          (c.g[fe] = J),
          (c.b[fe] = oe),
          (c.fout[fe] = 0.15),
          (c.fin[fe] = 0.08),
          (c.sk[fe] = 2.2),
          (c.rot[fe] = ht() * 6.283),
          fe);
    }
    function z(ee, B, P, V, Y, L, Z, J, oe, fe, le, R, I, se, ae, k) {
      for (let ce = 0; ce < P; ce++) {
        ro(B, ae, qe);
        let ve = Ze(V, Y),
          _e = Ze(0.8, 1.15);
        h.add(
          ee.x + qe.x * 0.02,
          ee.y + qe.y * 0.02,
          ee.z + qe.z * 0.02,
          qe.x * ve,
          qe.y * ve + 0.8,
          qe.z * ve,
          Ze(L, Z),
          Ze(J, oe),
          Ze(fe, le),
          R * _e,
          I * _e,
          se * _e,
          Ze(3.5, 6),
          k,
        );
      }
    }
    function H(ee, B, P = 12) {
      (zt.copy(B || Ei),
        zt.lengthSq() < 1e-6 && zt.copy(Ei),
        zt.normalize(),
        E(ee, zt, P, 5, 18, 0.6, 0.15, 0.5, 36, 22, 9, qc),
        w(ee.x, ee.y, ee.z, 0.05, 0.2, 0.35, 10, 6.5, 3, oo));
    }
    function O(ee, B = {}) {
      let P = B.size || 1,
        V = B.life || 2.5,
        Y = B.rise === void 0 ? 0.6 : B.rise,
        L = Yc(B.color, 0.32, 0.32, 0.33),
        Z = B.vel,
        J = m(ee, null),
        oe = B.count || 3;
      for (let fe = 0; fe < oe; fe++)
        _(
          ee.x + (ht() - 0.5) * 0.2 * P,
          ee.y + (ht() - 0.5) * 0.2 * P,
          ee.z + (ht() - 0.5) * 0.2 * P,
          (Z ? Z.x : 0) + (ht() - 0.5) * 0.4,
          (Z ? Z.y : 0) + ht() * 0.3,
          (Z ? Z.z : 0) + (ht() - 0.5) * 0.4,
          V * Ze(0.75, 1.2),
          P * 0.3,
          P * Ze(1, 1.5),
          L[0],
          L[1],
          L[2],
          B.alpha || 0.4,
          J,
          1.2,
          Y,
          1,
          -1,
        );
    }
    function q(ee, B, P = 1, V = 0.5, Y = 0.48, L = 0.45) {
      (Et.copy(B || Ei), Et.lengthSq() < 1e-6 && Et.copy(Ei), Et.normalize());
      let Z = m(ee, Et);
      for (let J = 0; J < 8; J++) {
        ro(Et, 0.5, qe);
        let oe = Ze(1, 4.5) * P,
          fe = Ze(0.85, 1.1);
        _(
          ee.x + Et.x * 0.03,
          ee.y + Et.y * 0.03,
          ee.z + Et.z * 0.03,
          qe.x * oe,
          qe.y * oe,
          qe.z * oe,
          Ze(0.5, 1.1),
          0.08 * P,
          Ze(0.35, 0.7) * P,
          V * fe,
          Y * fe,
          L * fe,
          0.9,
          Z,
          3.5,
          0.15,
          0.6,
          J < 3 ? 7 : -1,
        );
      }
      for (let J = 0; J < 2; J++)
        _(
          ee.x + Et.x * 0.15,
          ee.y + Et.y * 0.15,
          ee.z + Et.z * 0.15,
          Et.x * 0.5 + (ht() - 0.5) * 0.3,
          Et.y * 0.5 + 0.1,
          Et.z * 0.5 + (ht() - 0.5) * 0.3,
          Ze(2.2, 3.6),
          0.25 * P,
          Ze(0.9, 1.5) * P,
          V,
          Y,
          L,
          0.28,
          Z,
          1.5,
          0.1,
          1,
          -1,
        );
      return Z;
    }
    function U(ee, B = {}) {
      let P;
      if (B.color !== void 0) P = Yc(B.color, 0.4, 0.4, 0.4);
      else if (B.mat) {
        let oe = null;
        try {
          oe = typeof B.mat == "string" ? i.mats.get(B.mat) : B.mat;
        } catch {
          oe = null;
        }
        P = Yc(oe && oe.color ? oe.color : null, 0.4, 0.4, 0.4);
      } else P = Yc(null, 0.4, 0.39, 0.37);
      let V = P[0],
        Y = P[1],
        L = P[2],
        Z = B.size || 0.06,
        J = B.speed || 5;
      (Et.copy(B.normal || Ei).normalize(),
        z(
          ee,
          Et,
          Math.min(B.count || 6, 40),
          J * 0.4,
          J * 1.3,
          Z * 0.4,
          Z * 1.2,
          Z * 0.3,
          Z * 0.9,
          Z * 0.4,
          Z * 1.2,
          V,
          Y,
          L,
          B.spread || 1,
          A(ee),
        ));
    }
    function T(ee, B = 1) {
      let P = m(ee, Ei),
        V = ee.y;
      for (let fe = 0; fe < 5; fe++) {
        let le = Ze(0.35, 0.6) * B,
          R = _(
            ee.x + (ht() - 0.5) * 0.08 * B,
            V + 0.1 * B,
            ee.z + (ht() - 0.5) * 0.08 * B,
            (ht() - 0.5) * 0.5,
            Ze(1.6, 2.8) * Math.sqrt(B),
            (ht() - 0.5) * 0.5,
            Ze(0.4, 0.65),
            le * 0.3,
            le,
            0.72,
            0.78,
            0.84,
            0.95,
            P,
            0.5,
            -7,
            0,
            6,
          );
        R >= 0 &&
          ((l.rot[R] = (ht() - 0.5) * 0.3),
          (l.rotv[R] = 0),
          (l.turb[R] = 0),
          (l.sk[R] = 3),
          (l.fout[R] = 0.4));
      }
      for (let fe = 0; fe < 2; fe++)
        _(
          ee.x,
          V + 0.15 * B,
          ee.z,
          (ht() - 0.5) * 0.6,
          0.5,
          (ht() - 0.5) * 0.6,
          Ze(0.7, 1.1),
          0.2 * B,
          0.7 * B,
          0.7,
          0.75,
          0.8,
          0.14,
          P,
          2,
          0,
          0.8,
          -1,
        );
      let Y = 1.9 * P + 0.35,
        L = 1.5 * P + 0.45,
        Z = 1.05 * P + 0.55,
        J = Math.round(14 * Math.min(B, 1.6));
      for (let fe = 0; fe < J; fe++) {
        ro(Ei, 0.75, qe);
        let le = Ze(1.5, 4.8) * Math.sqrt(B),
          R = c.emit(
            ee.x,
            V + 0.03,
            ee.z,
            qe.x * le,
            Math.abs(qe.y) * le,
            qe.z * le,
            Ze(0.5, 1),
            Ze(0.012, 0.024),
            0.01,
          );
        R >= 0 &&
          ((c.mode[R] = 1),
          (c.frame[R] = Gc),
          (c.stretch[R] = 0.012),
          (c.grav[R] = 9.81),
          (c.drag[R] = 0.4),
          (c.r[R] = Y),
          (c.g[R] = L),
          (c.b[R] = Z),
          (c.fout[R] = 0.7),
          (c.flags[R] = Xc),
          (c.sk[R] = 1),
          (c.gy[R] = V));
      }
      S(
        ee.x,
        V + 0.012,
        ee.z,
        0.9,
        0.12 * B,
        1.5 * B,
        0.3 * P + 0.08,
        0.27 * P + 0.09,
        0.22 * P + 0.1,
      );
      let oe = S(
        ee.x,
        V + 0.012,
        ee.z,
        1.3,
        0.05 * B,
        1 * B,
        0.2 * P + 0.05,
        0.18 * P + 0.06,
        0.15 * P + 0.07,
      );
      oe >= 0 && (c.fin[oe] = 0.35);
    }
    let D = { p: new W() };
    function C(ee, B, P, V, Y) {
      (Et.copy(B || Ei),
        Et.lengthSq() < 1e-6 && Et.copy(Ei),
        Et.normalize(),
        V && V.lengthSq() > 1e-6
          ? zt.copy(V).normalize()
          : zt.copy(Et).negate(),
        J1.copy(zt)
          .addScaledVector(Et, -2 * zt.dot(Et))
          .normalize());
      let L = D.p.copy(ee);
      if (
        (Y && (P = "enemy"),
        P !== "enemy" &&
          P !== "water" &&
          Et.y > 0.7 &&
          i.ground &&
          i.ground.isPuddle)
      )
        try {
          i.ground.isPuddle(L.x, L.z) && L.y < 0.08 && (P = "water");
        } catch {}
      let J =
          (i.camera ? i.camera.position : Es.set(0, 0, 0)).distanceToSquared(
            L,
          ) > 3025,
        oe = J ? 0.5 : 1,
        fe = Et.x,
        le = Et.y,
        R = Et.z;
      switch (P) {
        case "metal": {
          (qe.copy(J1).addScaledVector(Et, 0.6).normalize(),
            zt.copy(qe),
            E(
              L,
              zt,
              Math.round(18 * oe),
              6,
              24,
              0.55,
              0.1,
              0.38,
              40,
              25,
              10.5,
              0,
            ),
            E(L, zt, 2 + ((ht() * 2) | 0), 9, 18, 0.9, 0.7, 1.3, 32, 18, 7, qc),
            w(
              L.x + fe * 0.03,
              L.y + le * 0.03,
              L.z + R * 0.03,
              0.05,
              0.25,
              0.45,
              16,
              11,
              5.5,
              oo,
            ),
            w(
              L.x + fe * 0.04,
              L.y + le * 0.04,
              L.z + R * 0.04,
              0.04,
              0.35,
              0.5,
              9,
              6,
              2.6,
              n0 + ((ht() * 2) | 0),
            ),
            v - g > 0.09 &&
              ((g = v),
              Es.copy(L).addScaledVector(Et, 0.12),
              b(Es, 16760944, 10, 5, 0.05)));
          let I = m(L, Et);
          for (let se = 0; se < 2; se++)
            _(
              L.x + fe * 0.04,
              L.y + le * 0.04,
              L.z + R * 0.04,
              fe * 0.8 + (ht() - 0.5) * 0.5,
              le * 0.8 + 0.2,
              R * 0.8 + (ht() - 0.5) * 0.5,
              Ze(0.5, 0.9),
              0.06,
              Ze(0.3, 0.5),
              0.4,
              0.4,
              0.41,
              0.4,
              I,
              2.5,
              0.3,
              0.8,
              -1,
            );
          (J ||
            z(
              L,
              Et,
              2,
              1.5,
              4,
              0.012,
              0.03,
              0.003,
              0.005,
              0.01,
              0.025,
              0.2,
              0.21,
              0.23,
              0.8,
              A(L),
            ),
            p.add(L, Et, "bullet_metal"));
          break;
        }
        case "wood": {
          let I = q(L, Et, 0.75, 0.5, 0.42, 0.32);
          (z(
            L,
            Et,
            J ? 3 : 7,
            2,
            6,
            0.004,
            0.009,
            0.03,
            0.1,
            0.004,
            0.012,
            0.62,
            0.5,
            0.33,
            0.7,
            A(L),
          ),
            I > 0.5 &&
              ht() < 0.3 &&
              w(L.x, L.y, L.z, 0.04, 0.1, 0.2, 3, 2, 1, oo),
            p.add(L, Et, "bullet_wood"));
          break;
        }
        case "water": {
          T(L, 1);
          break;
        }
        case "rubber":
        case "dirt": {
          let I = m(L, Et),
            se = P === "dirt",
            ae = se ? 0.3 : 0.14,
            k = se ? 0.25 : 0.14,
            ce = se ? 0.19 : 0.14;
          for (let ve = 0; ve < 5; ve++) {
            ro(Et, 0.6, qe);
            let _e = Ze(0.6, 2.6);
            _(
              L.x + fe * 0.03,
              L.y + le * 0.03,
              L.z + R * 0.03,
              qe.x * _e,
              qe.y * _e,
              qe.z * _e,
              Ze(0.5, 1),
              0.07,
              Ze(0.3, 0.55),
              ae,
              k,
              ce,
              0.85,
              I,
              3.5,
              0.1,
              0.6,
              ve < 2 ? 7 : -1,
            );
          }
          (z(
            L,
            Et,
            3,
            1.5,
            4,
            0.01,
            0.03,
            0.008,
            0.02,
            0.01,
            0.03,
            ae * 0.8,
            k * 0.8,
            ce * 0.8,
            0.7,
            A(L),
          ),
            p.add(L, Et, "soot", 0.2, 1, 0.8));
          break;
        }
        case "glass": {
          for (let I = 0; I < 12; I++) {
            ro(Et, 0.9, qe);
            let se = Ze(1.5, 6),
              ae = c.emit(
                L.x,
                L.y,
                L.z,
                qe.x * se,
                qe.y * se,
                qe.z * se,
                Ze(0.4, 0.9),
                Ze(0.012, 0.02),
                0.008,
              );
            ae >= 0 &&
              ((c.mode[ae] = 1),
              (c.frame[ae] = Gc),
              (c.stretch[ae] = 0.01),
              (c.grav[ae] = 9.81),
              (c.r[ae] = 2.6),
              (c.g[ae] = 2.7),
              (c.b[ae] = 2.8),
              (c.flags[ae] = Xc),
              (c.ramp[ae] = 3));
          }
          (z(
            L,
            Et,
            4,
            1.5,
            5,
            0.01,
            0.03,
            0.002,
            0.004,
            0.01,
            0.03,
            0.62,
            0.72,
            0.74,
            0.8,
            A(L),
          ),
            _(
              L.x,
              L.y,
              L.z,
              fe * 0.6,
              le * 0.6 + 0.2,
              R * 0.6,
              0.6,
              0.08,
              0.4,
              0.75,
              0.8,
              0.82,
              0.2,
              m(L, Et),
              2.5,
              0.2,
              0.8,
              -1,
            ),
            p.add(L, Et, "bullet_glass"));
          break;
        }
        case "enemy": {
          (qe.copy(J1).addScaledVector(Et, 0.8).normalize(),
            zt.copy(qe),
            E(
              L,
              zt,
              Math.round(13 * oe),
              5,
              20,
              0.9,
              0.12,
              0.45,
              42,
              29,
              14,
              0,
            ),
            E(L, zt, 2, 6, 12, 1, 0.6, 1.1, 32, 18, 7, qc),
            w(L.x, L.y, L.z, 0.06, 0.3, 0.55, 18, 12, 6, oo),
            w(L.x, L.y, L.z, 0.04, 0.3, 0.45, 8, 5, 2.4, n0 + ((ht() * 2) | 0)),
            v - g > 0.09 && ((g = v), b(L, 16756832, 8, 4.5, 0.05)));
          let I = m(L, Et);
          for (let se = 0; se < 2; se++)
            _(
              L.x,
              L.y,
              L.z,
              fe * 0.5 + (ht() - 0.5) * 0.4,
              le * 0.5 + 0.3,
              R * 0.5 + (ht() - 0.5) * 0.4,
              Ze(0.6, 1.1),
              0.06,
              Ze(0.3, 0.5),
              0.13,
              0.13,
              0.14,
              0.65,
              I,
              2.2,
              0.5,
              0.9,
              -1,
            );
          if (!J) {
            let se = ht() < 0.35;
            z(
              L,
              Et,
              3,
              2,
              6,
              0.012,
              0.035,
              0.004,
              0.008,
              0.012,
              0.03,
              0.6,
              se ? 0.2 : 0.62,
              se ? 0.05 : 0.64,
              0.8,
              A(L),
            );
          }
          break;
        }
        default: {
          (q(L, Et, 1, 0.52, 0.5, 0.47),
            z(
              L,
              Et,
              J ? 2 : 4,
              1.5,
              5.5,
              0.012,
              0.035,
              0.008,
              0.02,
              0.012,
              0.035,
              0.42,
              0.41,
              0.39,
              0.7,
              A(L),
            ),
            qe.copy(J1).addScaledVector(Et, 0.7).normalize(),
            zt.copy(qe));
          for (let I = 0; I < 4; I++) {
            ro(zt, 0.5, qe);
            let se = Ze(3, 9),
              ae = _(
                L.x,
                L.y,
                L.z,
                qe.x * se,
                qe.y * se,
                qe.z * se,
                Ze(0.25, 0.45),
                0.03,
                0.09,
                0.6,
                0.58,
                0.54,
                0.7,
                1,
                2,
                -6,
                0.2,
                7,
              );
            ae >= 0 && (l.turb[ae] = 0);
          }
          (ht() < 0.3 && E(L, zt, 3, 4, 10, 0.6, 0.08, 0.2, 26, 15, 6, 0),
            p.add(L, Et, "bullet_concrete"));
        }
      }
    }
    function G(ee, B, P = {}) {
      let V = Yc(P.color, 1, 0.8, 0.46),
        Y = P.intensity || 16;
      if (
        (u.add(
          ee,
          B,
          V[0] * Y,
          V[1] * Y,
          V[2] * Y,
          P.speed || 260,
          P.width || 0.024,
        ),
        v - x > 0.07 && P.trail !== !1)
      ) {
        ((x = v), qe.subVectors(B, ee));
        let L = qe.length();
        if (L > 2) {
          qe.multiplyScalar(1 / L);
          let Z = 5,
            J = Math.min(L, 7),
            oe = m(ee, null);
          for (let fe = 0; fe < Z; fe++) {
            let le = 0.6 + ((fe + ht()) / Z) * (J - 0.6),
              R = _(
                ee.x + qe.x * le,
                ee.y + qe.y * le,
                ee.z + qe.z * le,
                qe.x * 0.6,
                0.05,
                qe.z * 0.6,
                Ze(0.45, 0.8),
                0.04,
                Ze(0.12, 0.2),
                0.6,
                0.6,
                0.62,
                0.1,
                oe,
                2,
                0.1,
                0.7,
                -1,
              );
            R >= 0 && (l.fin[R] = 0.25);
          }
        }
      }
    }
    function j(ee, B, P = {}) {
      let V = P.scale || 1;
      (zt.copy(B || Ei),
        zt.lengthSq() < 1e-6 && zt.set(0, 0, -1),
        zt.normalize());
      let Y = Yc(P.color, 1, 0.68, 0.32),
        L = ee.x,
        Z = ee.y,
        J = ee.z,
        oe = Y[0],
        fe = Y[1],
        le = Y[2];
      (w(
        L + zt.x * 0.1 * V,
        Z + zt.y * 0.1 * V,
        J + zt.z * 0.1 * V,
        0.045,
        0.75 * V,
        1.15 * V,
        34 * oe,
        34 * fe,
        34 * le,
        n0,
      ),
        w(
          L + zt.x * 0.14 * V,
          Z + zt.y * 0.14 * V,
          J + zt.z * 0.14 * V,
          0.035,
          0.5 * V,
          0.85 * V,
          22 * oe,
          22 * fe,
          22 * le,
          n0 + 1,
        ),
        w(
          L + zt.x * 0.05 * V,
          Z + zt.y * 0.05 * V,
          J + zt.z * 0.05 * V,
          0.045,
          0.13 * V,
          0.2 * V,
          22,
          22 * (fe + 0.25),
          22 * (le + 0.3),
          oo,
        ),
        w(L, Z, J, 0.05, 0.8 * V, 1.1 * V, 0.4 * oe, 0.4 * fe, 0.4 * le, oo));
      let R = c.emit(
        L + zt.x * 0.4 * V,
        Z + zt.y * 0.4 * V,
        J + zt.z * 0.4 * V,
        -zt.x,
        -zt.y,
        -zt.z,
        0.04,
        0.11 * V,
        0.14 * V,
      );
      R >= 0 &&
        ((c.mode[R] = 1),
        (c.frame[R] = W1),
        (c.stretch[R] = 0.9 * V),
        (c.r[R] = 18 * oe),
        (c.g[R] = 18 * fe),
        (c.b[R] = 18 * le),
        (c.fout[R] = 0.3));
      for (let I = 0; I < 3; I++) {
        ro(zt, 0.25, qe);
        let se = Ze(8, 22);
        M(
          L,
          Z,
          J,
          qe.x * se,
          qe.y * se,
          qe.z * se,
          Ze(0.08, 0.22),
          0.012,
          30,
          18,
          7,
          0,
        );
      }
      (_(
        L + zt.x * 0.2,
        Z + zt.y * 0.2,
        J + zt.z * 0.2,
        zt.x * 1.5,
        zt.y * 1.5 + 0.2,
        zt.z * 1.5,
        Ze(0.5, 0.9),
        0.08 * V,
        0.45 * V,
        0.5,
        0.5,
        0.52,
        0.16,
        1,
        3,
        0.3,
        0.8,
        -1,
      ),
        Es.copy(ee).addScaledVector(zt, 0.25),
        b(Es, 16756832, 16 * V, 7 * V, 0.05));
    }
    function N(ee, B) {
      f.add(ee, B);
    }
    let Q = { pos: new W(), size: 1 };
    function K(ee, B = 1) {
      let P = Math.max(0.4, Math.min(B, 4)),
        V = ee.x,
        Y = ee.y,
        L = ee.z,
        Z = Math.sqrt(P),
        J = A(ee),
        oe = Y - J < 1.4 * P,
        fe = m(ee, Ei);
      (Es.set(V, Y + 0.4, L),
        b(Es, 16769712, 320 * P, 10 + 9 * P, 0.08),
        b(Es, 16747056, 55 * P, 8 + 6 * P, 0.45));
      let le = Y + 0.35 * P;
      (w(V, le, L, 0.055, 1.5 * P, 2.3 * P, 16, 13.5, 9.5, oo),
        w(V, le, L, 0.05, 2.6 * P, 4.2 * P, 7, 5, 2.4, n0 + ((ht() * 2) | 0)),
        w(V, le, L, 0.3, 3.5 * P, 5.5 * P, 0.35, 0.2, 0.08, oo));
      let R = Math.round(13 + 5 * P);
      for (let ae = 0; ae < R; ae++) {
        (ro(Ei, 1.6, qe), oe && qe.y < -0.1 && (qe.y = -qe.y * 0.5));
        let k = Ze(2.2, 7.5) * Z,
          ce = Ze(0.7, 1.15),
          ve = l.emit(
            V + qe.x * 0.3 * P,
            le + qe.y * 0.3 * P,
            L + qe.z * 0.3 * P,
            qe.x * k,
            qe.y * k + 1.4,
            qe.z * k,
            Ze(0.55, 1.05),
            0.85 * P,
            Ze(1.8, 2.7) * P,
          );
        ve >= 0 &&
          ((l.frame[ve] = ae % 4 === 0 ? 7 : (ht() * 6) | 0),
          (l.ramp[ve] = 2),
          (l.r[ve] = 5.8 * ce),
          (l.g[ve] = 2.4 * ce),
          (l.b[ve] = 0.5 * ce),
          (l.a[ve] = 0.96),
          (l.shade[ve] = 2 + fe),
          (l.drag[ve] = 4),
          (l.grav[ve] = -2.6),
          (l.wind[ve] = 0.6),
          (l.turb[ve] = 1.5),
          (l.rot[ve] = ht() * 6.283),
          (l.rotv[ve] = (ht() - 0.5) * 2.5),
          (l.sk[ve] = 3),
          (l.fin[ve] = 0),
          (l.fout[ve] = 0.6));
      }
      for (let ae = 0; ae < 5; ae++) {
        ro(Ei, 1.4, qe);
        let k = Ze(2, 5) * Z,
          ce = c.emit(
            V + qe.x * 0.3 * P,
            le + qe.y * 0.3 * P,
            L + qe.z * 0.3 * P,
            qe.x * k,
            Math.abs(qe.y) * k + 1.2,
            qe.z * k,
            Ze(0.3, 0.55),
            0.6 * P,
            Ze(1.2, 1.8) * P,
          );
        ce >= 0 &&
          ((c.frame[ce] = V1),
          (c.ramp[ce] = 2),
          (c.r[ce] = 2.4),
          (c.g[ce] = 1.1),
          (c.b[ce] = 0.3),
          (c.drag[ce] = 4),
          (c.grav[ce] = -2.5),
          (c.rot[ce] = ht() * 6.283),
          (c.sk[ce] = 3),
          (c.fout[ce] = 0.4));
      }
      let I = Math.round(11 + 5 * P);
      for (let ae = 0; ae < I; ae++) {
        let k = ae % 2 === 0;
        (ro(Ei, 1.4, qe), oe && qe.y < 0 && (qe.y = -qe.y * 0.4));
        let ce = (k ? Ze(4.5, 9) : Ze(1.5, 5)) * Z,
          ve = Ze(0.04, 0.1),
          _e = k ? 0.75 : 0.3,
          Te = _(
            V + qe.x * _e * P,
            le + qe.y * _e * P,
            L + qe.z * _e * P,
            qe.x * ce,
            qe.y * ce + 0.8,
            qe.z * ce,
            Ze(2.8, 4.8),
            (k ? 0.8 : 1.2) * P,
            Ze(2.6, 4.2) * P,
            ve,
            ve * 0.95,
            ve * 0.9,
            k ? 0.7 : 0.8,
            fe,
            3.4,
            Ze(0.8, 1.7),
            1,
            ae % 3 === 0 ? 7 : -1,
          );
        Te >= 0 &&
          ((l.fin[Te] = k ? 0.025 : 0.16),
          (l.fout[Te] = 0.35),
          (l.turb[Te] = 1.2));
      }
      X(V, Y + 0.3 * P, L, "smolder", 1.3 + 0.3 * P, P, fe);
      let se = Math.min(90, Math.round(34 * P));
      for (let ae = 0; ae < se; ae++) {
        (ro(Ei, 1.5, qe), oe && qe.y < 0 && (qe.y = -qe.y));
        let k = Ze(6, 26) * Z,
          ce = M(
            V,
            Y + 0.05,
            L,
            qe.x * k,
            qe.y * k,
            qe.z * k,
            Ze(0.5, 1.5),
            Ze(0.014, 0.028),
            40,
            23,
            8,
            qc,
          );
        ce >= 0 && ((c.drag[ce] = 1.4), (c.stretch[ce] = 0.035));
      }
      for (let ae = 0; ae < 10 * P; ae++) {
        ro(Ei, 1.2, qe);
        let k = Ze(1, 5),
          ce = c.emit(
            V,
            Y + 0.3,
            L,
            qe.x * k,
            Math.abs(qe.y) * k + 1,
            qe.z * k,
            Ze(1.4, 3),
            0.035,
            0.02,
          );
        ce >= 0 &&
          ((c.frame[ce] = oo),
          (c.ramp[ce] = 3),
          (c.r[ce] = 9),
          (c.g[ce] = 4),
          (c.b[ce] = 1),
          (c.drag[ce] = 1.2),
          (c.grav[ce] = 0.6),
          (c.turb[ce] = 3),
          (c.wind[ce] = 1),
          (c.fout[ce] = 0.5));
      }
      if (oe) {
        let ae = J + 0.015;
        S(V, ae, L, 0.32, 0.6 * P, 9 * P, 1.6, 1.2, 0.75);
        let k = Math.round(12 + 3 * P);
        for (let ce = 0; ce < k; ce++) {
          let ve = ((ce + ht()) / k) * 6.283,
            _e = Ze(5, 10) * Z,
            Te = Ze(0.42, 0.55),
            Pe = _(
              V + Math.cos(ve) * 0.4 * P,
              ae + 0.2,
              L + Math.sin(ve) * 0.4 * P,
              Math.cos(ve) * _e,
              Ze(0.2, 0.9),
              Math.sin(ve) * _e,
              Ze(1.2, 2.2),
              0.4 * P,
              Ze(1.2, 1.9) * P,
              Te,
              Te * 0.96,
              Te * 0.9,
              0.26,
              fe,
              3,
              0.15,
              0.7,
              -1,
            );
          Pe >= 0 && (l.fin[Pe] = 0.1);
        }
        (Ho.set(V, J, L), p.add(Ho, Ei, "scorch", 2.3 * P, 1, 0.92));
      }
      (Ho.set(V, Math.max(Y, J + 0.1), L),
        z(
          Ho,
          Ei,
          Math.round(13 + 6 * P),
          4,
          13 * Z,
          0.04,
          0.13,
          0.025,
          0.08,
          0.04,
          0.13,
          0.07,
          0.066,
          0.062,
          1.1,
          J,
        ),
        Q.pos.copy(ee),
        (Q.size = B),
        i.events.emit("explosion", Q));
    }
    let ie = [];
    for (let ee = 0; ee < 24; ee++) {
      let B = {
        active: !1,
        kind: "steam",
        pos: new W(),
        acc: 0,
        acc2: 0,
        ttl: 1 / 0,
        scale: 1,
        shade: 1,
        t: 0,
        light: null,
        drop: -1,
      };
      ((B.stop = () => {
        ((B.active = !1), B.light && (B.light.release(), (B.light = null)));
      }),
        (B.setPos = (P) => {
          B.pos.copy(P);
        }),
        ie.push(B));
    }
    let F = { active: !1, pos: new W(), stop() {}, setPos() {} };
    function X(ee, B, P, V, Y, L, Z) {
      let J = null;
      for (let oe = 0; oe < ie.length; oe++)
        if (!ie[oe].active) {
          J = ie[oe];
          break;
        }
      if (!J) return F;
      if (
        ((J.active = !0),
        (J.kind = V),
        J.pos.set(ee, B, P),
        (J.acc = 0),
        (J.acc2 = 0),
        (J.ttl = Y),
        (J.scale = L),
        (J.t = 0),
        (J.drop = -1),
        (J.shade = Z === void 0 ? m(J.pos, null) : Z),
        V === "fire")
      ) {
        let oe = y();
        ((J.light = oe && oe.acquire ? oe.acquire() : null),
          J.light &&
            (J.light.light.color.set(16747066),
            (J.light.light.distance = 9),
            J.light.light.position.set(ee, B + 0.5, P)));
      }
      return J;
    }
    function ne(ee, B = "steam", P = {}) {
      return X(ee.x, ee.y, ee.z, B, P.ttl || 1 / 0, P.scale || 1, void 0);
    }
    function re(ee) {
      for (let B = 0; B < ie.length; B++) {
        let P = ie[B];
        if (!P.active) continue;
        if (((P.t += ee), P.t > P.ttl)) {
          P.stop();
          continue;
        }
        let V = P.pos.x,
          Y = P.pos.y,
          L = P.pos.z,
          Z = P.scale;
        if (P.kind === "steam")
          for (P.acc += ee * 13; P.acc > 1; ) {
            P.acc -= 1;
            let J = _(
              V + (ht() - 0.5) * 0.08,
              Y,
              L + (ht() - 0.5) * 0.08,
              (ht() - 0.5) * 0.4,
              Ze(1.4, 2.4),
              (ht() - 0.5) * 0.4,
              Ze(1.8, 3),
              0.12 * Z,
              Ze(0.8, 1.3) * Z,
              0.8,
              0.82,
              0.85,
              0.2,
              P.shade,
              1.3,
              0.5,
              1,
              -1,
            );
            J >= 0 && ((l.fin[J] = 0.12), (l.turb[J] = 0.9));
          }
        else if (P.kind === "smolder")
          for (P.acc += ee * 9 * (1 - P.t / P.ttl); P.acc > 1; ) {
            P.acc -= 1;
            let J = Ze(0.05, 0.11),
              oe = _(
                V + (ht() - 0.5) * 0.5 * Z,
                Y,
                L + (ht() - 0.5) * 0.5 * Z,
                (ht() - 0.5) * 0.6,
                Ze(1.2, 2.4),
                (ht() - 0.5) * 0.6,
                Ze(2.4, 3.8),
                0.5 * Z,
                Ze(1.6, 2.6) * Z,
                J,
                J,
                J,
                0.6,
                P.shade,
                1,
                0.9,
                1,
                -1,
              );
            oe >= 0 && ((l.fin[oe] = 0.12), (l.turb[oe] = 1));
          }
        else if (P.kind === "embers")
          for (P.acc += ee * 8; P.acc > 1; ) {
            P.acc -= 1;
            let J = c.emit(
              V + (ht() - 0.5) * 0.4 * Z,
              Y,
              L + (ht() - 0.5) * 0.4 * Z,
              (ht() - 0.5) * 0.6,
              Ze(0.6, 1.8),
              (ht() - 0.5) * 0.6,
              Ze(1.5, 3.2),
              Ze(0.02, 0.04),
              0.012,
            );
            J >= 0 &&
              ((c.frame[J] = oo),
              (c.ramp[J] = 3),
              (c.r[J] = 10),
              (c.g[J] = 4.2),
              (c.b[J] = 1),
              (c.drag[J] = 0.8),
              (c.grav[J] = -0.5),
              (c.turb[J] = 3.5),
              (c.wind[J] = 1),
              (c.fout[J] = 0.5));
          }
        else if (P.kind === "fire") {
          for (P.acc += ee * 24; P.acc > 1; ) {
            P.acc -= 1;
            let J = c.emit(
              V + (ht() - 0.5) * 0.3 * Z,
              Y + 0.1 * Z,
              L + (ht() - 0.5) * 0.3 * Z,
              (ht() - 0.5) * 0.5,
              Ze(1.2, 2.6) * Z,
              (ht() - 0.5) * 0.5,
              Ze(0.35, 0.65),
              0.45 * Z,
              Ze(0.2, 0.35) * Z,
            );
            J >= 0 &&
              ((c.frame[J] = V1),
              (c.ramp[J] = 2),
              (c.r[J] = 9),
              (c.g[J] = 5.5),
              (c.b[J] = 2.2),
              (c.drag[J] = 1),
              (c.rot[J] = ht() * 6.283),
              (c.rotv[J] = (ht() - 0.5) * 4),
              (c.fin[J] = 0.12),
              (c.fout[J] = 0.4),
              (c.wind[J] = 1),
              (c.turb[J] = 2));
          }
          for (P.acc2 += ee * 4; P.acc2 > 1; ) {
            P.acc2 -= 1;
            let J = Ze(0.05, 0.1),
              oe = _(
                V,
                Y + 0.8 * Z,
                L,
                (ht() - 0.5) * 0.4,
                Ze(1.2, 2),
                (ht() - 0.5) * 0.4,
                Ze(2.2, 3.4),
                0.3 * Z,
                Ze(1.1, 1.8) * Z,
                J,
                J,
                J,
                0.5,
                P.shade,
                0.9,
                0.8,
                1,
                -1,
              );
            oe >= 0 && ((l.fin[oe] = 0.2), (l.turb[oe] = 1));
            let fe = c.emit(
              V + (ht() - 0.5) * 0.3,
              Y + 0.3,
              L + (ht() - 0.5) * 0.3,
              ht() - 0.5,
              Ze(1.5, 3),
              ht() - 0.5,
              Ze(1, 2.2),
              0.03,
              0.012,
            );
            fe >= 0 &&
              ((c.frame[fe] = oo),
              (c.ramp[fe] = 3),
              (c.r[fe] = 10),
              (c.g[fe] = 4.2),
              (c.b[fe] = 1),
              (c.drag[fe] = 0.8),
              (c.grav[fe] = -0.6),
              (c.turb[fe] = 4),
              (c.wind[fe] = 1));
          }
          P.light &&
            (P.light.light.intensity =
              (14 + 6 * Math.sin(P.t * 23) + 4 * Math.sin(P.t * 37.7)) * Z);
        } else if (P.kind === "drip") {
          if (
            ((P.acc += ee * 1.6), P.drop >= 0 && ((P.drop -= ee), P.drop < 0))
          ) {
            let J = P.shade;
            S(
              V,
              0.014,
              L,
              0.8,
              0.05,
              0.55,
              0.4 * J + 0.14,
              0.36 * J + 0.16,
              0.3 * J + 0.18,
            );
            for (let oe = 0; oe < 3; oe++) {
              ro(Ei, 0.7, qe);
              let fe = c.emit(
                V,
                0.03,
                L,
                qe.x * 1.2,
                Math.abs(qe.y) * 1.6,
                qe.z * 1.2,
                0.35,
                0.012,
                0.008,
              );
              fe >= 0 &&
                ((c.mode[fe] = 1),
                (c.frame[fe] = Gc),
                (c.stretch[fe] = 0.012),
                (c.grav[fe] = 9.81),
                (c.r[fe] = 1.6 * J + 0.3),
                (c.g[fe] = 1.3 * J + 0.4),
                (c.b[fe] = 0.9 * J + 0.5),
                (c.flags[fe] = Xc));
            }
          }
          for (; P.acc > 1; ) {
            P.acc -= 1 + ht() * 0.6;
            let J = Math.sqrt((2 * Math.max(Y, 0.05)) / 9.81),
              oe = c.emit(V, Y, L, 0, -0.2, 0, J + 0.05, 0.014, 0.014);
            (oe >= 0 &&
              ((c.mode[oe] = 1),
              (c.frame[oe] = Gc),
              (c.stretch[oe] = 0.02),
              (c.grav[oe] = 9.81),
              (c.r[oe] = 1.4 * P.shade + 0.4),
              (c.g[oe] = 1.2 * P.shade + 0.5),
              (c.b[oe] = 0.9 * P.shade + 0.6),
              (c.flags[oe] = Xc),
              (c.fout[oe] = 0.98)),
              (P.drop = J));
          }
        }
      }
    }
    i.events.on("impact", (ee) => {
      !ee || !ee.point || C(ee.point, ee.normal, ee.surface, ee.dir, ee.enemy);
    });
    let $ = (ee, B) => {
      try {
        return !!(i.ground && i.ground.isPuddle && i.ground.isPuddle(ee, B));
      } catch {
        return !1;
      }
    };
    (i.events.on("player:step", (ee) => {
      let B = (ee && ee.pos) || (i.player && i.player.pos);
      B &&
        ((ee && ee.surface === "water") || $(B.x, B.z)) &&
        (Ho.set(B.x, Math.max(0, B.y), B.z),
        T(Ho, ee && ee.sprint ? 0.55 : 0.4));
    }),
      i.events.on("player:land", (ee) => {
        let B = i.player && i.player.pos;
        if (B) {
          if (
            (Ho.set(B.x, Math.max(0, B.y), B.z),
            (ee && ee.surface === "water") || $(B.x, B.z))
          )
            T(Ho, 0.9);
          else if (ee && ee.speed > 5) {
            let P = m(Ho, Ei);
            for (let V = 0; V < 6; V++) {
              let Y = ht() * 6.283;
              _(
                Ho.x + Math.cos(Y) * 0.2,
                Ho.y + 0.08,
                Ho.z + Math.sin(Y) * 0.2,
                Math.cos(Y) * 1.6,
                0.3,
                Math.sin(Y) * 1.6,
                Ze(0.7, 1.2),
                0.15,
                Ze(0.5, 0.8),
                0.45,
                0.44,
                0.42,
                0.22,
                P,
                3,
                0.1,
                0.8,
                -1,
              );
            }
          }
        }
      }));
    function ue(ee) {
      (ee > 0 || (ee = 0), (v += ee), re(ee));
      let B = i.camera ? i.camera.position : Es.set(0, 0, 0);
      (r.begin(),
        l.update(ee, r, B, t, v),
        r.end(),
        a.begin(),
        c.update(ee, a, B, t, v),
        u.update(ee, a, W1, oo),
        a.end(),
        h.update(ee),
        f.update(ee));
    }
    function me() {
      (l.clear(), c.clear(), u.clear(), h.clear(), f.clear(), p.clear());
      for (let ee of ie) ee.active && ee.stop();
      (r.begin(), r.end(), a.begin(), a.end());
    }
    return {
      update: ue,
      clear: me,
      muzzleFlash: j,
      tracer: G,
      impact: C,
      sparks: H,
      smoke: O,
      dust: q,
      explosion: K,
      shell: N,
      splash: T,
      addEmitter: ne,
      debris: U,
      decal(ee, B, P = "bullet_concrete", V) {
        (Et.copy(B || Ei), p.add(ee, Et, P, V));
      },
      wind: t,
      root: d,
      stats() {
        return {
          lit: l.n,
          add: c.n,
          tracers: u.n,
          debris: h.live,
          drawCalls: 5,
        };
      },
    };
  }

function JR(i) {
    let e = i.fx,
      t = i.params.fxshow || "all",
      n = new wt(),
      s = (N, Q, K, ie, F) => {
        let X = new Qe(N, i.mats.get(Q));
        return (
          X.position.set(K, ie, F),
          (X.castShadow = X.receiveShadow = !0),
          n.add(X),
          X
        );
      };
    (s(Wi(2.6, 2.2, 0.3, 0.02), "concrete", -3.2, 1.1, 0),
      s(Wi(2.2, 2, 0.08, 0.01), "paint_blue", 0, 1, 0),
      s(Wi(1.2, 1.2, 1.2, 0.015), "wood_pallet", 3.2, 0.6, 0),
      i.scene.add(n),
      i.physics.addBox([-4.5, 0, -0.15], [-1.9, 2.2, 0.15], {
        surface: "concrete",
      }),
      i.physics.addBox([-1.1, 0, -0.04], [1.1, 2, 0.04], { surface: "metal" }),
      i.physics.addBox([2.6, 0, -0.6], [3.8, 1.2, 0.6], { surface: "wood" }));
    let o = (N, Q, K) => new W(N, Q, K),
      r = o(-6.5, 1.5, 7),
      a = o(6.5, 1.4, 7),
      l = o(5.2, 1.3, 3.2),
      c = o(-4.6, 1.35, 4.2),
      u = o(0, 0, 0),
      h = o(0, 0, 0),
      f = o(0, 0, 0),
      p = o(0, 1, 0),
      d = {
        point: o(0, 0, 0),
        normal: o(0, 1, 0),
        surface: "concrete",
        dir: o(0, 0, 0),
        enemy: null,
        from: "player",
      },
      v = Math.random,
      g = 0,
      x = 0,
      y = 0,
      b = 0,
      m = 0,
      A = 0.2,
      _ = 0,
      M = 3.4,
      E = !1,
      w = t === "all" || t === "impact",
      S = t === "all" || t === "explosion",
      z = t === "all" || t === "tracer",
      H = t === "explosion" ? 2.4 : 3.5;
    (t === "explosion" && (M = 0.6),
      (t === "all" || t === "impact") &&
        (e.addEmitter(o(-6.2, 0.05, -1.5), "steam"),
        e.addEmitter(o(5.6, 0, 1.6), "fire"),
        e.addEmitter(o(0.4, 2.6, 1.6), "drip")));
    function O(N) {
      let Q = y++ % 2 ? a : r;
      if (((d.enemy = null), (d.from = "player"), N === 5)) {
        (d.point.set(-1.5 + v() * 0.3, 2.5 + v() * 0.3, 0.8),
          d.normal.copy(Q).sub(d.point).normalize(),
          (d.surface = "enemy"),
          (d.enemy = {}),
          d.dir.copy(d.point).sub(Q).normalize(),
          e.tracer(Q, d.point),
          i.events.emit("impact", d));
        return;
      }
      (N === 0
        ? u.set(-3.2 + (v() - 0.5) * 2, 0.4 + v() * 1.5, 0)
        : N === 1 || N === 7
          ? u.set((v() - 0.5) * 1.8, 0.3 + v() * 1.5, 0)
          : N === 2
            ? u.set(3.2 + (v() - 0.5) * 0.9, 0.2 + v() * 0.9, 0.6)
            : N === 3
              ? u.set(-1.6 + (v() - 0.5) * 1.2, 0, 2.2 + v())
              : N === 4
                ? u.set(1.5 + (v() - 0.5) * 0.8, 0, 2.6 + v() * 0.8)
                : u.set(3.4 + (v() - 0.5), 0, 2.4 + v() * 0.6),
        h.copy(u).sub(Q).normalize());
      let K = i.physics.raycast(Q, h, 100);
      K &&
        (d.point.copy(K.point),
        d.normal.copy(K.normal),
        d.dir.copy(h),
        (d.surface = N === 4 ? "water" : N === 6 ? "dirt" : K.surface),
        e.tracer(Q, d.point),
        i.events.emit("impact", d));
    }
    let q = i.params.fxhold,
      U = o(0, 1.3, 3),
      T = o(1, 0, 0);
    function D(N) {
      if (
        ((g += N),
        q === "muzzle" &&
          (e.muzzleFlash(U, T, { scale: 1 }),
          (U.x = 2.5),
          T.set(-0.5, 0, 0.86),
          e.muzzleFlash(U, T, { scale: 1.6 }),
          (U.x = 0),
          T.set(1, 0, 0)),
        w)
      )
        for (m -= N; m <= 0; )
          ((m += t === "impact" ? 0.09 : 0.13), O(x++ % 8));
      if (
        (z &&
          ((A -= N),
          A <= 0 &&
            ((A += t === "tracer" ? 0.16 : 0.45),
            f.set(-5 + v() * 3, 1.2 + v() * 0.8, 6 + v() * 2),
            h.copy(f).sub(l).normalize(),
            e.muzzleFlash(l, h, { scale: 1 }),
            e.tracer(l, f, { color: 16730658, speed: 120 }),
            t === "tracer" &&
              (f.set(6, 1 + v() * 1.5, -6 - v() * 6),
              u.set(-7, 1.6, 6.5),
              e.tracer(u, f, { speed: 200 }))),
          (_ -= N),
          _ <= 0 &&
            ((_ += 0.22),
            f.set(1.6 + v() * 0.8, 1.6 + v() * 0.8, 0.4 + (v() - 0.5) * 0.8),
            e.shell(c, f))),
        S && ((M -= N), M <= 0))
      ) {
        M += H;
        let Q = +(i.params.fxsize || 0) || 1 + (b++ % 3);
        (f.set(t === "explosion" ? 0 : 7, 0.25, t === "explosion" ? 3.5 : -3.5),
          e.explosion(f, Q));
      }
    }
    let C = !1,
      G = e.update;
    e.update = (N) => {
      C || G(N);
    };
    let j = window.__setShot;
    return (
      j &&
        (window.__setShot = (N) => {
          if (N && N.fxage !== void 0) {
            (e.clear(),
              f.set(0, 0.25, 3.5),
              e.explosion(f, +(N.fxsize || 1.2)));
            let Q = +N.fxage;
            for (let K = 0; K < Q - 1e-6; K += 1 / 60) G(1 / 60);
            (G(0), (C = !0));
          }
          j(N);
        }),
      {
        cam: t === "explosion" ? [0, 2, 12.5] : [0.3, 1.6, 7.2],
        target: t === "explosion" ? [0, 2.2, 3.5] : [0.2, 1, 0],
        update(N) {
          if (!E) {
            E = !0;
            let Q = +(i.params.fxt || 0);
            for (let K = 0; K < Q; K += 1 / 30) (D(1 / 30), e.update(1 / 30));
          }
          C || D(N);
        },
      }
    );
  }

export const LEGACY_PROP_MODULE = $g;
export const LEGACY_LEVEL_MODULE = cv;
export const LEGACY_BACKDROP_MODULE = mv;
export const LEGACY_GROUND_MODULE = vv;
export const LEGACY_FX_MODULE = Sv;
// 供自定义关卡复用原版关卡构建器（道具放置/碰撞/堆叠）与静态合批
export const LEGACY_LEVEL_BUILDER = ob;
export const LEGACY_MERGE_STATIC = By;
