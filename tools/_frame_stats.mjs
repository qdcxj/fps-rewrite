import { chromium } from "playwright-core";

const browser = await chromium.launch({
  channel: "msedge",
  headless: true,
  args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const errors = [];
page.on("pageerror", (err) => errors.push(err.message.slice(0, 300)));
await page.goto("http://127.0.0.1:5173/?nolock", { waitUntil: "domcontentloaded" });
await page.waitForFunction(() => !!window.__legacyGameplay, null, { timeout: 300000 });
await page.evaluate(() => {
  const gl = window.__legacyRender.renderer;
  gl.info.autoReset = false;
  window.__harborGame.getState().start();
  const g = window.__legacyGameplay;
  const orig = g.renderFrame.bind(g);
  window.__perf = { calls: [], tris: [], shadow: [], jsUpdate: [], jsRender: [] };
  const update = g.update.bind(g);
  window.__updateMs = 0;
  g.update = (dt) => {
    const t = performance.now();
    update(dt);
    window.__updateMs = performance.now() - t;
  };
  g.renderFrame = (gl2, scene, camera) => {
    gl2.info.reset();
    const t = performance.now();
    orig(gl2, scene, camera);
    window.__perf.jsRender.push(performance.now() - t);
    if (window.__perf.calls.length < 6) {
      window.__perf.calls.push(gl2.info.render.calls);
      window.__perf.tris.push(gl2.info.render.triangles);
      window.__perf.shadow.push(0);
      window.__perf.jsUpdate.push(window.__updateMs);
    }
  };
});
await page.waitForTimeout(8000);
console.log(
  JSON.stringify(
    await page.evaluate(() => {
      let meshes = 0;
      let lights = 0;
      window.__scene.traverse((o) => {
        if (o.isMesh || o.isInstancedMesh) meshes++;
        if (o.isLight) lights++;
      });
      return {
        callsPerFrame: window.__perf.calls,
        trisPerFrame: window.__perf.tris,
        updateMs: window.__perf.jsUpdate,
        renderMs: window.__perf.jsRender,
        meshes,
        lights,
        hdr: [window.__legacyHdr.width, window.__legacyHdr.height],
      };
    }),
    null,
    2,
  ),
);
console.log("errors:", errors.slice(0, 4));
await browser.close();
