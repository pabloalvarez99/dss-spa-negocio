#!/usr/bin/env node
/**
 * Sprint D — chequeo de uptime del portafolio de demos.
 *
 * Uso (desde la raíz del repo):
 *   node scripts/check-demos-uptime.mjs
 *   node scripts/check-demos-uptime.mjs --top 20
 *   node scripts/check-demos-uptime.mjs --all          (default: todas)
 *   node scripts/check-demos-uptime.mjs --json-only    (solo consola JSON)
 *   node scripts/check-demos-uptime.mjs --timeout 8000
 *
 * Fuente: website/demos.json
 * Salida: docs/mejora/inventario-demos.md (+ docs/mejora/uptime-last.json)
 *
 * Cadencia recomendada: 1× por semana (manual o Task Scheduler / cron).
 * Demos caídas → acción `fix` en inventario; revisar y ocultar del grid si persisten.
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DEMOS_PATH = join(ROOT, "website", "demos.json");
const OUT_MD = join(ROOT, "docs", "mejora", "inventario-demos.md");
const OUT_JSON = join(ROOT, "docs", "mejora", "uptime-last.json");

function parseArgs(argv) {
  const opts = { top: 0, all: true, jsonOnly: false, timeout: 10000, concurrency: 12 };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--top") {
      opts.top = Math.max(1, parseInt(argv[++i], 10) || 20);
      opts.all = false;
    } else if (a === "--all") {
      opts.all = true;
      opts.top = 0;
    } else if (a === "--json-only") {
      opts.jsonOnly = true;
    } else if (a === "--timeout") {
      opts.timeout = Math.max(1000, parseInt(argv[++i], 10) || 10000);
    } else if (a === "--concurrency") {
      opts.concurrency = Math.max(1, parseInt(argv[++i], 10) || 12);
    } else if (a === "--help" || a === "-h") {
      console.log(`Usage: node scripts/check-demos-uptime.mjs [--top N] [--all] [--json-only] [--timeout ms]`);
      process.exit(0);
    }
  }
  return opts;
}

function demoUrl(d) {
  return "https://" + (d.d || d.u + ".vercel.app");
}

async function checkOne(demo, timeoutMs) {
  const url = demoUrl(demo);
  const started = Date.now();
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  let status = 0;
  let ok = false;
  let error = "";
  try {
    let res = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: ctrl.signal,
      headers: { "User-Agent": "DSS-uptime-check/1.0 (+https://dss-chile.vercel.app)" },
    });
    // Algunos hosts no responden bien a HEAD
    if (res.status === 405 || res.status === 501 || res.status === 403) {
      res = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: ctrl.signal,
        headers: { "User-Agent": "DSS-uptime-check/1.0 (+https://dss-chile.vercel.app)" },
      });
    }
    status = res.status;
    ok = status >= 200 && status < 400;
  } catch (err) {
    error = err && err.name === "AbortError" ? "timeout" : String((err && err.message) || err);
    status = 0;
    ok = false;
  } finally {
    clearTimeout(timer);
  }
  return {
    slug: demo.u,
    name: demo.n,
    url,
    host: demo.d ? "pages.dev" : "vercel.app",
    status,
    ok,
    ms: Date.now() - started,
    error,
    action: ok ? "ok" : "fix",
  };
}

async function mapPool(items, concurrency, fn) {
  const out = new Array(items.length);
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      out[idx] = await fn(items[idx], idx);
    }
  }
  const workers = Array.from({ length: Math.min(concurrency, items.length) }, () => worker());
  await Promise.all(workers);
  return out;
}

function formatMd(results, meta) {
  const okN = results.filter((r) => r.ok).length;
  const failN = results.length - okN;
  const pagesN = results.filter((r) => r.host === "pages.dev").length;
  const vercelN = results.length - pagesN;
  const failed = results.filter((r) => !r.ok);

  const lines = [];
  lines.push("# Inventario de demos — portafolio DSS");
  lines.push("");
  lines.push(`> Generado por \`scripts/check-demos-uptime.mjs\` (Sprint D).`);
  lines.push(`> Fuente: \`website/demos.json\`.`);
  lines.push(`> Fecha de chequeo HTTP: ${meta.date}.`);
  lines.push(`> Alcance: ${meta.scope} (${results.length} demos). Timeout: ${meta.timeout} ms.`);
  lines.push("");
  lines.push("## Resumen");
  lines.push("");
  lines.push("| Métrica | Valor |");
  lines.push("|--------|------:|");
  lines.push(`| Total chequeadas | ${results.length} |`);
  lines.push(`| HTTP OK (2xx–3xx) | ${okN} |`);
  lines.push(`| Falla / timeout | ${failN} |`);
  lines.push(`| Con host \`*.pages.dev\` | ${pagesN} |`);
  lines.push(`| Default \`*.vercel.app\` | ${vercelN} |`);
  lines.push("");
  lines.push("## Convención de URL");
  lines.push("");
  lines.push("- Si el item tiene `d`: `https://{d}` (ej. `el-amir.pages.dev`).");
  lines.push("- Si no: `https://{u}.vercel.app`.");
  lines.push("- Thumbnail en landing: `website/shots/{u}.jpg` (+ `.webp`).");
  lines.push("");
  lines.push("## Demos caídas (acción prioritaria)");
  lines.push("");
  if (failed.length === 0) {
    lines.push(`Todas las URLs respondieron **OK** en el chequeo del ${meta.date}. No hay links rotos detectados.`);
    lines.push("");
  } else {
    lines.push(`**${failed.length} demo(s) caídas** — marcar en inventario y considerar ocultar del grid hasta restaurar.`);
    lines.push("");
    lines.push("| slug | nombre | URL | status | error |");
    lines.push("|---|---|---|---:|---|");
    for (const r of failed) {
      lines.push(`| \`${r.slug}\` | ${r.name} | ${r.url} | ${r.status || "—"} | ${r.error || "http"} |`);
    }
    lines.push("");
  }
  lines.push("## Acciones");
  lines.push("");
  lines.push("| Prioridad | Acción | Criterio |");
  lines.push("|-----------|--------|----------|");
  lines.push("| Alta | `retirar` | Dueño del negocio pide no figurar (SLA 24 h — D010) |");
  lines.push("| Media | `anonimizar` | Demo sensible o sin permiso claro |");
  lines.push("| Baja | `fix` | Link cae en rechequeos |");
  lines.push("| — | `ok` | Online y usable en portafolio |");
  lines.push("");
  lines.push("## Cómo re-chequear");
  lines.push("");
  lines.push("```bash");
  lines.push("node scripts/check-demos-uptime.mjs          # todas");
  lines.push("node scripts/check-demos-uptime.mjs --top 20 # solo top 20 del JSON");
  lines.push("```");
  lines.push("");
  lines.push("Ver también: [`OBSERVABILIDAD.md`](OBSERVABILIDAD.md).");
  lines.push("");
  lines.push("## Tabla completa");
  lines.push("");
  lines.push("| # | slug (`u`) | nombre | URL | status | ms | acción |");
  lines.push("|--:|---|---|---|---:|---:|---|");
  results.forEach((r, i) => {
    const st = r.status || (r.error === "timeout" ? "timeout" : "err");
    lines.push(`| ${i + 1} | \`${r.slug}\` | ${r.name} | ${r.url} | ${st} | ${r.ms} | ${r.action} |`);
  });
  lines.push("");
  return lines.join("\n");
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  let demos;
  try {
    demos = JSON.parse(readFileSync(DEMOS_PATH, "utf8"));
  } catch (err) {
    console.error("No se pudo leer website/demos.json:", err.message);
    process.exit(1);
  }
  if (!Array.isArray(demos) || !demos.length) {
    console.error("demos.json vacío o inválido");
    process.exit(1);
  }

  const list = opts.all || !opts.top ? demos : demos.slice(0, opts.top);
  const scope = opts.all || !opts.top ? "todas" : `top ${opts.top}`;
  const date = new Date().toISOString().slice(0, 10);

  console.error(`[uptime] chequeando ${list.length} demos (${scope}), timeout=${opts.timeout}ms …`);

  const results = await mapPool(list, opts.concurrency, (d) => checkOne(d, opts.timeout));
  const okN = results.filter((r) => r.ok).length;
  const failN = results.length - okN;
  const failed = results.filter((r) => !r.ok);

  const payload = {
    date,
    scope,
    timeout: opts.timeout,
    total: results.length,
    ok: okN,
    fail: failN,
    failed: failed.map((r) => ({ slug: r.slug, url: r.url, status: r.status, error: r.error })),
    results,
  };

  mkdirSync(dirname(OUT_JSON), { recursive: true });
  writeFileSync(OUT_JSON, JSON.stringify(payload, null, 2) + "\n", "utf8");

  if (!opts.jsonOnly) {
    writeFileSync(OUT_MD, formatMd(results, { date, scope, timeout: opts.timeout }), "utf8");
    console.error(`[uptime] escrito ${OUT_MD}`);
  }
  console.error(`[uptime] escrito ${OUT_JSON}`);
  console.error(`[uptime] OK=${okN} FAIL=${failN}`);
  if (failed.length) {
    console.error("[uptime] caídas:");
    failed.forEach((r) => console.error(`  - ${r.slug} ${r.url} (${r.status || r.error})`));
  }

  // exit 1 si hay caídas (útil en CI local)
  process.exit(failN > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
