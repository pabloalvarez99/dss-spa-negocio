#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const js = readFileSync(join(ROOT, "website", "app.js"), "utf8");
const html = readFileSync(join(ROOT, "website", "index.html"), "utf8");

let ok = 0;
let fail = 0;
function check(name, pass) {
  console.log((pass ? "OK  " : "FAIL") + " " + name);
  if (pass) ok++;
  else fail++;
}

check("va stub", js.includes("window.va = window.va || function"));
check("track calls va event", js.includes('window.va("event"'));
check("dssTrack exported", js.includes("window.dssTrack = track"));
check("wa_click", js.includes('track("wa_click"'));
check("form_submit", js.includes('track("form_submit"'));
check("form_spam_blocked", js.includes('track("form_spam_blocked"'));
check("demo_open", js.includes('track("demo_open"'));
check("filter_use", js.includes('track("filter_use"'));
check("plan_cta", js.includes('track("plan_cta"'));
check("data-slug on cards", js.includes("data-slug="));
check("no gtag primary", !js.includes("window.gtag"));
const insights = (html.match(/\/_vercel\/insights\/script\.js/g) || []).length;
check("insights script once (" + insights + ")", insights === 1);
check("no @vercel/analytics npm", !html.includes("@vercel/analytics") && !js.includes("@vercel/analytics"));
check(
  "no ads/pixel",
  !/facebook|fbevents|googletagmanager|GTM-|fbq\s*\(/i.test(html + js)
);

const ids = [
  "wa-header",
  "wa-hero",
  "wa-cta",
  "wa-footer",
  "wa-mobar",
  "wa-fallback",
  "wa-tienda",
  "wa-retiro",
  "wa-retiro-foot",
];
for (const id of ids) {
  const inHtml = html.includes('id="' + id + '"');
  const inMap = js.includes('"' + id + '"');
  check("WA id " + id, inHtml && inMap);
}

check("uptime script exists", (() => {
  try {
    readFileSync(join(ROOT, "scripts", "check-demos-uptime.mjs"), "utf8");
    return true;
  } catch {
    return false;
  }
})());
check("OBSERVABILIDAD.md exists", (() => {
  try {
    readFileSync(join(ROOT, "docs", "mejora", "OBSERVABILIDAD.md"), "utf8");
    return true;
  } catch {
    return false;
  }
})());

console.log("RESULT " + ok + "/" + (ok + fail));
process.exit(fail ? 1 : 0);
