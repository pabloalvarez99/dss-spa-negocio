#!/usr/bin/env node
/**
 * Checklist "demo enviable" (C2 + H3).
 * Uso:
 *   npm run check -- --slug=pizzeria-ejemplo
 *   npm run check -- --all
 *
 * Revisa clients/{slug}/content.json y, sobre todo, dist/{slug}/index.html:
 * los invariantes de H3 se verifican en la salida real, no en la fuente.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CLIENTS = path.join(ROOT, 'clients');

/** Checks que hacen fallar el script (exit 1). */
const HARD = [
  // comerciales (C2)
  'wa', 'hours', 'map', 'seo_title', 'seo_desc', 'no_lorem', 'name', 'city', 'menu',
  // build + dirección de arte (H3)
  'build', 'no_tokens', 'reduced_motion', 'contrast_aa', 'fonts_preconnect', 'no_fixed_width',
];

function parseArgs(argv) {
  const args = { slug: null, all: false };
  for (const raw of argv) {
    if (raw === '--all') args.all = true;
    else if (raw.startsWith('--slug=')) args.slug = raw.slice(7).trim();
  }
  return args;
}

function listClients() {
  return fs
    .readdirSync(CLIENTS, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .filter((n) => fs.existsSync(path.join(CLIENTS, n, 'content.json')));
}

/* ── color / contraste (WCAG 2.1) ───────────────────────────────── */

function parseHex(v) {
  const m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(String(v || '').trim());
  if (!m) return null;
  let h = m[1];
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

function relLuminance(rgb) {
  const [r, g, b] = rgb.map((c) => {
    const x = c / 255;
    return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(a, b) {
  const l1 = relLuminance(a);
  const l2 = relLuminance(b);
  const [hi, lo] = l1 >= l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

/** Última definición gana: así se respeta el override de content.json. */
function lastVar(css, name) {
  const all = [...css.matchAll(new RegExp(`--${name}\\s*:\\s*([^;}]+)`, 'g'))];
  return all.length ? all[all.length - 1][1].trim() : null;
}

/* ── análisis de la salida ───────────────────────────────────────── */

function styleOf(html) {
  const m = html.match(/<style>([\s\S]*?)<\/style>/);
  return m ? m[1] : '';
}

/**
 * Anchos fijos > 360 px en bloques de declaración que sí pueden empujar el
 * documento. Se ignoran reglas posicionadas (absolute/fixed), las que ya
 * acotan con max-width y los pasos de @keyframes.
 */
function fixedWidthOffenders(css, limit = 360) {
  const offenders = [];
  const ruleRe = /([^{}]+)\{([^{}]*)\}/g;
  let m;
  while ((m = ruleRe.exec(css))) {
    const selector = m[1].trim().replace(/\s+/g, ' ');
    const body = m[2];
    if (/position\s*:\s*(absolute|fixed)/.test(body)) continue;
    if (/max-width/.test(body)) continue;
    if (/^\d+%$/.test(selector) || /^(from|to)$/.test(selector)) continue;
    const decl = /(?:^|[;\s])(min-width|width|min-inline-size)\s*:\s*(\d+(?:\.\d+)?)px/g;
    let d;
    while ((d = decl.exec(body))) {
      if (Number(d[2]) > limit) offenders.push(`${selector} { ${d[1]}:${d[2]}px }`);
    }
  }
  return offenders;
}

function checkOne(slug) {
  const content = JSON.parse(fs.readFileSync(path.join(CLIENTS, slug, 'content.json'), 'utf8'));
  const checks = [];
  const pass = (id, ok, detail) => checks.push({ id, ok: !!ok, detail });

  /* ── contenido ── */
  const phone = String(content.phone_wa || '').replace(/\D/g, '');
  pass('wa', phone.length >= 11, phone ? `wa.me/${phone}` : 'falta phone_wa');

  const hours = content.hours;
  pass('hours', Array.isArray(hours) && hours.length > 0, hours?.length ? `${hours.length} franja(s)` : 'falta hours[]');

  const maps = content.maps_url || (content.address ? `maps search: ${content.address}` : '');
  pass('map', !!maps, maps || 'falta maps_url o address');

  const images = content.images || [];
  const assetsDir = path.join(CLIENTS, slug, 'assets');
  const assetFiles = fs.existsSync(assetsDir)
    ? fs.readdirSync(assetsDir).filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
    : [];
  const photoCount = Math.max(images.length, assetFiles.length);
  pass('photos', photoCount >= 3, `${photoCount} foto(s) (meta ≥3; placeholder OK en piloto)`);

  const title = content.seo_title || `${content.name || ''} · ${content.city || ''}`;
  pass(
    'seo_title',
    !!(content.name && title.toLowerCase().includes(String(content.name).toLowerCase().slice(0, 4))),
    title || 'sin title'
  );

  const desc = content.seo_description || content.tagline || '';
  pass('seo_desc', desc.length >= 20, desc ? `${desc.length} chars` : 'falta description/tagline');

  const blob = JSON.stringify(content).toLowerCase();
  const lorem = /lorem ipsum|dolor sit|placeholder text|texto de relleno|tu negocio aquí/.test(blob);
  pass('no_lorem', !lorem, lorem ? 'parece haber lorem/placeholder' : 'OK');

  pass('name', !!content.name, content.name || 'falta name');
  pass('city', !!content.city, content.city || 'falta city');
  pass('menu', Array.isArray(content.menu) && content.menu.length >= 3, `${content.menu?.length || 0} ítems`);

  /* ── salida ── */
  const distHtml = path.join(ROOT, 'dist', slug, 'index.html');
  if (!fs.existsSync(distHtml)) {
    pass('build', false, 'sin dist — corre npm run build');
    return checks;
  }
  const html = fs.readFileSync(distHtml, 'utf8');
  const css = styleOf(html);
  pass('build', true, `${Buffer.byteLength(html, 'utf8')} bytes`);

  pass('build_wa', html.includes('wa.me/'), 'float/CTAs WA en HTML');
  pass('build_title', html.includes('<title>') && html.includes(content.name), 'title con nombre');
  pass('build_jsonld', html.includes('application/ld+json'), 'JSON-LD');
  pass('build_badge', content.show_demo_badge === false || html.includes('demo-badge'), 'badge de demo');

  // 1) cero tokens {{ }} sin resolver
  const tokens = [...new Set(html.match(/\{\{[^}\n]{0,80}\}\}/g) || [])];
  pass('no_tokens', tokens.length === 0, tokens.length ? tokens.join(' ') : 'sin {{ }} pendientes');

  // 2) si el skin anima, respeta prefers-reduced-motion
  const animates = /@keyframes|animation\s*:|transition\s*:/.test(css);
  const hasRM = /@media[^{]*prefers-reduced-motion\s*:\s*reduce/.test(css);
  pass(
    'reduced_motion',
    !animates || hasRM,
    animates ? (hasRM ? 'anima y respeta reduce' : 'anima SIN @media prefers-reduced-motion') : 'no anima'
  );

  // 3) contraste AA del texto principal sobre el fondo del skin
  const bgHex = parseHex(lastVar(css, 'bg'));
  const textHex = parseHex(lastVar(css, 'text'));
  if (bgHex && textHex) {
    const ratio = contrastRatio(bgHex, textHex);
    pass('contrast_aa', ratio >= 4.5, `texto/fondo ${ratio.toFixed(2)}:1 (mín 4.5)`);
    const mutedHex = parseHex(lastVar(css, 'muted'));
    if (mutedHex) {
      const r2 = contrastRatio(bgHex, mutedHex);
      pass('contrast_muted', r2 >= 4.5, `muted/fondo ${r2.toFixed(2)}:1 (recomendado ≥4.5)`);
    }
  } else {
    pass('contrast_aa', false, 'no se pudo leer --bg / --text en hex desde el CSS');
  }

  // 4) fuentes externas: preconnect + display=swap
  if (/fonts\.googleapis\.com\/css/.test(html)) {
    const pre1 = /rel="preconnect"[^>]*fonts\.googleapis\.com|fonts\.googleapis\.com[^>]*rel="preconnect"/.test(html);
    const pre2 = /rel="preconnect"[^>]*fonts\.gstatic\.com|fonts\.gstatic\.com[^>]*rel="preconnect"/.test(html);
    const swap = /fonts\.googleapis\.com\/css[^"']*display=swap/.test(html);
    pass(
      'fonts_preconnect',
      pre1 && pre2 && swap,
      [
        pre1 ? 'preconnect googleapis' : 'FALTA preconnect googleapis',
        pre2 ? 'gstatic' : 'FALTA gstatic',
        swap ? 'display=swap' : 'FALTA display=swap',
      ].join(' · ')
    );
  } else {
    pass('fonts_preconnect', true, 'sin fuentes externas');
  }

  // 5) sin scroll horizontal a 360 px (verificable por CSS)
  const offenders = fixedWidthOffenders(css);
  pass(
    'no_fixed_width',
    offenders.length === 0,
    offenders.length
      ? `${offenders.length} regla(s): ${offenders.slice(0, 3).join(' | ')}`
      : 'sin anchos fijos > 360px'
  );

  return checks;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const slugs = args.all ? listClients() : args.slug ? [args.slug] : [];
  if (!slugs.length) {
    console.error('Uso: npm run check -- --slug=<slug> | --all');
    process.exit(1);
  }

  let hardFail = 0;
  let softFail = 0;
  for (const slug of slugs) {
    console.log(`\n== ${slug} ==`);
    for (const c of checkOne(slug)) {
      const hard = HARD.includes(c.id);
      const mark = c.ok ? '✓' : hard ? '✗' : '!';
      console.log(`  ${mark} ${c.id}: ${c.detail}`);
      if (!c.ok) hard ? hardFail++ : softFail++;
    }
  }

  console.log(
    hardFail
      ? `\n${hardFail} check(s) duro(s) fallaron${softFail ? ` · ${softFail} aviso(s)` : ''}`
      : `\nTodos los checks duros OK${softFail ? ` · ${softFail} aviso(s) blando(s)` : ''}`
  );
  process.exit(hardFail ? 1 : 0);
}

main();
