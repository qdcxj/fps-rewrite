import { chromium } from "playwright-core";

const browser = await chromium.launch({
  channel: "msedge",
  headless: true,
  args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
await page.goto("http://127.0.0.1:5174/?q=high", { waitUntil: "domcontentloaded" });
await page.waitForFunction(() => window.__ready === true, null, { timeout: 300000 });
const deploy = await page.$("text=/^DEPLOY$/i");
console.log("deploy button:", !!deploy);
if (deploy) await deploy.click().catch(() => {});
for (let i = 0; i < 12; i++) {
  await page.waitForTimeout(2500);
  const s = await page.evaluate(() => {
    const st = window.__stats ? window.__stats() : null;
    return { frames: window.__frames, state: st?.state, calls: st?.calls, tris: st?.tris, scale: st?.scale, res: st?.res };
  });
  console.log(i, JSON.stringify(s));
  if (s.state && s.state !== "intro" && s.state !== "loading") break;
}
const t0 = await page.evaluate(() => {
  window.__t0 = performance.now();
  window.__f0 = window.__frames;
  return { f: window.__frames, t: window.__t0 };
});
await page.waitForTimeout(10000);
const final = await page.evaluate(() => ({
  fps: Math.round(((window.__frames - window.__f0) / ((performance.now() - window.__t0) / 1000)) * 100) / 100,
  stats: window.__stats ? window.__stats() : null,
}));
console.log("final:", JSON.stringify(final));
await page.screenshot({ path: "tools/_orig_play.png" });
await browser.close();
