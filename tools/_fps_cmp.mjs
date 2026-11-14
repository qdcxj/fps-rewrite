import { chromium } from "playwright-core";

const browser = await chromium.launch({
  channel: "msedge",
  headless: true,
  args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});

async function measureOriginal(quality) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await page.goto(`http://127.0.0.1:5174/?q=${quality}`, { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => window.__ready === true, null, { timeout: 300000 });
  const deploy = await page.$("text=/^DEPLOY$/i");
  if (deploy) await deploy.click().catch(() => {});
  await page.waitForTimeout(1500);
  const start = await page.evaluate(() => {
    window.__t0 = performance.now();
    window.__f0 = window.__frames;
    return { frames: window.__frames, t: window.__t0 };
  });
  await page.waitForTimeout(12000);
  const result = await page.evaluate(() => {
    const frames = window.__frames - window.__f0;
    const seconds = (performance.now() - window.__t0) / 1000;
    return {
      fps: Math.round((frames / seconds) * 100) / 100,
      frames,
      stats: window.__stats ? window.__stats() : null,
    };
  });
  await page.screenshot({ path: `tools/_orig_${quality}.png` });
  await page.close();
  console.log("original", quality, JSON.stringify({ ...result, start }));
  return result;
}

async function measurePort(quality) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await page.goto("http://127.0.0.1:5173/?nolock", { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => !!window.__legacyGameplay, null, { timeout: 300000 });
  await page.evaluate((q) => {
    window.__harborGame.getState().updateSettings({ quality: q });
    window.__harborGame.getState().start();
    const g = window.__legacyGameplay;
    const orig = g.renderFrame.bind(g);
    window.__pf = 0;
    g.renderFrame = (gl, scene, camera) => {
      window.__pf++;
      orig(gl, scene, camera);
    };
    window.__t0 = performance.now();
  }, quality);
  await page.waitForTimeout(12000);
  const result = await page.evaluate(() => ({
    fps: Math.round((window.__pf / ((performance.now() - window.__t0) / 1000)) * 100) / 100,
    frames: window.__pf,
    hdr: [window.__legacyHdr.width, window.__legacyHdr.height],
    dpr: window.__legacyRender.renderer.getPixelRatio(),
  }));
  await page.screenshot({ path: `tools/_port_${quality}.png` });
  await page.close();
  console.log("port", quality, JSON.stringify(result));
  return result;
}

await measureOriginal("high");
await measurePort("high");
await browser.close();
