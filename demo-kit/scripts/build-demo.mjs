#!/usr/bin/env node
/**
 * build-demo.mjs — genera HTML estático desde clients/{slug}/content.json
 *
 * Motor H3: shell + bloques + sections.json por skin.
 * Salida: un index.html autocontenido, cero deps npm.
 *
 * Uso:
 *   npm run build -- --slug=pizzeria-ejemplo
 *   npm run build -- --all
 *   node scripts/build-demo.mjs --list
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CLIENTS = path.join(ROOT, 'clients');
const TEMPLATES = path.join(ROOT, 'templates');
const SHARED = path.join(TEMPLATES, '_shared');
const BLOCKS = path.join(SHARED, 'blocks');
const DEFAULT_OUT = path.join(ROOT, 'dist');

const VALID_TEMPLATES = new Set(
  fs
    .readdirSync(TEMPLATES, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith('_'))
    .map((d) => d.name)
);

function parseArgs(argv) {
  const args = { slug: null, out: DEFAULT_OUT, all: false, list: false };
  for (const raw of argv) {
    if (raw === '--all') args.all = true;
    else if (raw === '--list') args.list = true;
    else if (raw.startsWith('--slug=')) args.slug = raw.slice(7).trim();
    else if (raw.startsWith('--out=')) args.out = path.resolve(raw.slice(6).trim());
    else if (raw === '--help' || raw === '-h') args.help = true;
  }
  return args;
}

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escAttr(s) {
  return esc(s).replace(/'/g, '&#39;');
}

/* ── template engine (mustache-ish + each + nested this) ─────────── */

function resolvePath(ctx, pathStr) {
  if (!pathStr) return undefined;
  if (pathStr === '@n2') return ctx['@n2'];
  if (pathStr === '@index') return ctx['@index'];
  const parts = pathStr.split('.');
  let cur = ctx;
  for (const p of parts) {
    if (cur == null) return undefined;
    if (p === 'this') {
      cur = ctx.this !== undefined ? ctx.this : cur;
      continue;
    }
    cur = cur[p];
  }
  return cur;
}

function isTruthy(v) {
  if (v === undefined || v === null || v === false || v === '') return false;
  if (Array.isArray(v) && v.length === 0) return false;
  return true;
}

/**
 * Busca el primer bloque {{#kw path}}…{{/kw}} contando anidamiento, para
 * resolver siempre el MÁS EXTERNO primero. Sin esto, un {{#each}} dentro de
 * otro {{#each}} se evaluaría sin el contexto del padre (menu.leader).
 */
function findSection(str, kw) {
  const open = new RegExp(`\\{\\{#${kw}\\s+([\\w.@]+)\\}\\}`);
  const m = open.exec(str);
  if (!m) return null;
  const bodyStart = m.index + m[0].length;
  const tok = new RegExp(`\\{\\{#${kw}\\s+[\\w.@]+\\}\\}|\\{\\{\\/${kw}\\}\\}`, 'g');
  tok.lastIndex = bodyStart;
  let depth = 1;
  let t;
  while ((t = tok.exec(str))) {
    if (t[0].startsWith(`{{#${kw}`)) depth++;
    else if (--depth === 0) {
      return {
        index: m.index,
        pathStr: m[1],
        body: str.slice(bodyStart, t.index),
        end: t.index + t[0].length,
      };
    }
  }
  throw new Error(`falta {{/${kw}}} en la plantilla`);
}

function render(template, data) {
  let out = String(template);

  // {{#each path}}…{{/each}}
  let guard = 0;
  while (guard++ < 500) {
    const sec = findSection(out, 'each');
    if (!sec) break;
    const arr = resolvePath(data, sec.pathStr);
    let built = '';
    if (Array.isArray(arr)) {
      arr.forEach((item, i) => {
        const child = {
          ...data,
          this: item,
          '@index': i,
          '@n2': String(i + 1).padStart(2, '0'),
        };
        // promote plain object fields onto child for {{name}} shorthand inside each
        if (item && typeof item === 'object' && !Array.isArray(item)) {
          for (const [k, v] of Object.entries(item)) {
            if (!(k in child) || k === 'this') child[k] = v;
          }
        }
        built += render(sec.body, child);
      });
    }
    out = out.slice(0, sec.index) + built + out.slice(sec.end);
  }

  // {{#if path}}…{{/if}}
  guard = 0;
  while (guard++ < 500) {
    const sec = findSection(out, 'if');
    if (!sec) break;
    const rep = isTruthy(resolvePath(data, sec.pathStr)) ? render(sec.body, data) : '';
    out = out.slice(0, sec.index) + rep + out.slice(sec.end);
  }

  // {{path}} — leave raw HTML for *_html keys (already escaped at build)
  out = out.replace(/\{\{([\w.@]+)\}\}/g, (_, pathStr) => {
    const v = resolvePath(data, pathStr);
    if (v === undefined || v === null) return '';
    return String(v);
  });

  return out;
}

/* ── content helpers ─────────────────────────────────────────────── */

function applyName(str, name) {
  return String(str ?? '').replaceAll('{name}', name);
}

function phoneDisplay(wa) {
  const d = String(wa || '').replace(/\D/g, '');
  if (d.startsWith('56') && d.length >= 11) {
    return `+${d.slice(0, 2)} ${d.slice(2, 3)} ${d.slice(3, 7)} ${d.slice(7)}`;
  }
  return wa ? `+${d}` : '';
}

function waUrl(phone, message) {
  const d = String(phone || '').replace(/\D/g, '');
  const text = encodeURIComponent(message || 'Hola, quiero más información');
  return `https://wa.me/${d}?text=${text}`;
}

function italicizeLastWord(text) {
  const t = String(text || '').trim();
  if (!t) return '';
  const parts = t.split(/\s+/);
  if (parts.length === 1) return `<em>${esc(parts[0])}</em>`;
  const last = parts.pop();
  return `${esc(parts.join(' '))} <em>${esc(last)}</em>`;
}

function nameHtml(name) {
  const parts = String(name || '').trim().split(/\s+/);
  if (parts.length <= 1) return esc(name);
  const last = parts.pop();
  return `${esc(parts.join(' '))} <span>${esc(last)}</span>`;
}

function buildJsonLd(content, meta) {
  const phone = String(content.phone_wa || '').replace(/\D/g, '');
  const data = {
    '@context': 'https://schema.org',
    '@type': content.schema_type || meta.schema_type || 'LocalBusiness',
    name: content.name,
    description: content.tagline || content.seo_description || '',
    telephone: phone ? `+${phone}` : undefined,
    address: content.address
      ? {
          '@type': 'PostalAddress',
          streetAddress: content.address,
          addressLocality: content.city || '',
          addressCountry: 'CL',
        }
      : undefined,
    url: content.canonical_url || undefined,
    sameAs: content.instagram ? [content.instagram] : undefined,
  };
  return JSON.stringify(
    Object.fromEntries(Object.entries(data).filter(([, v]) => v !== undefined)),
    null,
    2
  );
}

function groupMenu(menu, itemWaUrl) {
  const groups = [];
  const byCat = new Map();
  for (const raw of menu || []) {
    const item = {
      name: esc(raw.name || 'Ítem'),
      desc: esc(raw.desc || raw.description || ''),
      price: esc(raw.price || 'Consultar'),
      category: esc(raw.category || raw.cat || ''),
      wa_url: escAttr(itemWaUrl),
    };
    const cat = item.category || '';
    if (!byCat.has(cat)) {
      const g = { category: cat, items: [] };
      byCat.set(cat, g);
      groups.push(g);
    }
    byCat.get(cat).items.push(item);
  }
  return groups;
}

function loadJson(file, fallback = null) {
  if (!fs.existsSync(file)) return fallback;
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function loadTemplate(templateId) {
  if (!VALID_TEMPLATES.has(templateId)) {
    throw new Error(
      `Template desconocido: "${templateId}". Válidos: ${[...VALID_TEMPLATES].join(', ')}`
    );
  }
  const dir = path.join(TEMPLATES, templateId);
  const meta = JSON.parse(fs.readFileSync(path.join(dir, 'meta.json'), 'utf8'));
  const skin_css = fs.readFileSync(path.join(dir, 'skin.css'), 'utf8');
  const shell = fs.readFileSync(path.join(SHARED, 'shell.html'), 'utf8');
  const base_css = fs.readFileSync(path.join(SHARED, 'base.css'), 'utf8');
  const classicPath = path.join(SHARED, 'classic.css');
  const classic_css = fs.existsSync(classicPath)
    ? fs.readFileSync(classicPath, 'utf8')
    : '';

  const sections =
    loadJson(path.join(dir, 'sections.json')) ||
    loadJson(path.join(SHARED, 'sections.default.json')) ||
    { blocks: [] };

  const heroPath = path.join(dir, 'hero.html');
  const custom_hero = fs.existsSync(heroPath)
    ? fs.readFileSync(heroPath, 'utf8')
    : null;

  return { meta, skin_css, shell, base_css, classic_css, sections, custom_hero, dir };
}

function loadBlock(block, variant) {
  const file = path.join(BLOCKS, `${block}.${variant}.html`);
  if (!fs.existsSync(file)) {
    throw new Error(`Bloque no encontrado: blocks/${block}.${variant}.html`);
  }
  return fs.readFileSync(file, 'utf8');
}

function composeCss({ base_css, classic_css, skin_css, meta, content }) {
  const layers = [base_css];
  if (meta.base === 'classic' && classic_css) layers.push(classic_css);
  layers.push(skin_css);
  let css = layers.join('\n\n');
  if (content.colors?.primary) css += `\n:root{--primary:${content.colors.primary};}`;
  if (content.colors?.on_primary) css += `\n:root{--on-primary:${content.colors.on_primary};}`;
  if (content.colors?.bg) css += `\n:root{--bg:${content.colors.bg};}`;
  return css;
}

function validateContent(content, slug) {
  const errors = [];
  if (!content.name) errors.push('name es obligatorio');
  if (!content.phone_wa) errors.push('phone_wa es obligatorio (ej. 56912345678)');
  if (!content.city) errors.push('city es obligatorio');
  if (content.slug && content.slug !== slug) {
    errors.push(`slug en JSON ("${content.slug}") no coincide con carpeta ("${slug}")`);
  }
  const phone = String(content.phone_wa || '').replace(/\D/g, '');
  if (phone && phone.length < 11) {
    errors.push('phone_wa parece corto; usa formato 569XXXXXXXX');
  }
  if (errors.length) {
    throw new Error(`content.json inválido (${slug}):\n  - ${errors.join('\n  - ')}`);
  }
}

function buildContext(content, meta, slug) {
  const d = meta.defaults || {};
  const name = content.name;
  const waMessage = applyName(content.wa_message || d.wa_message, name);
  const heroTitle = applyName(content.hero_title || d.hero_title || name, name);
  const menuTitle = content.menu_title || d.menu_title || 'Carta';
  const aboutTitle = content.about_title || d.about_title || 'Nosotros';
  const contactTitle = content.contact_title || d.contact_title || 'Contacto';
  const ctaTitle = content.cta_title || d.cta_title || '¿Hablamos?';
  const galleryTitle = content.gallery_title || d.gallery_title || 'Fotos del lugar';
  const stepsTitle = content.steps_title || d.steps_title || 'Cómo funciona';
  const itemWa = waUrl(content.phone_wa, waMessage);

  const maps =
    content.maps_url ||
    (content.address
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          `${content.address} ${content.city || ''}`
        )}`
      : '');

  const menu = Array.isArray(content.menu) ? content.menu : [];
  const menu_items = menu.map((raw) => ({
    name: esc(raw.name || 'Ítem'),
    desc: esc(raw.desc || raw.description || ''),
    price: esc(raw.price || 'Consultar'),
    category: esc(raw.category || raw.cat || ''),
    wa_url: escAttr(itemWa),
  }));
  const menu_groups = groupMenu(menu, itemWa);

  const marqueeSrc = content.marquee || content.highlights || [];
  const marquee_items = (Array.isArray(marqueeSrc) ? marqueeSrc : []).map((t) => ({
    text: esc(typeof t === 'string' ? t : t.text || ''),
  }));

  const statsSrc = content.stats || [];
  const stats_items = (Array.isArray(statsSrc) ? statsSrc : []).map((s) => ({
    value: esc(s.value || s.v || ''),
    label: esc(s.label || s.l || ''),
  }));

  const hours = Array.isArray(content.hours) ? content.hours : [];
  const hours_rows = hours.map((h) => {
    if (typeof h === 'string') return { days: esc(h), time: '' };
    return {
      days: esc(h.days || h.day || ''),
      time: esc(h.time || h.hours || ''),
    };
  });

  const images = Array.isArray(content.images) ? content.images : [];
  const gallery_items = images
    .map((img) => {
      const src = typeof img === 'string' ? img : img.src || img.url || '';
      const alt = typeof img === 'string' ? slug : img.alt || slug;
      if (!src) return null;
      const href = src.startsWith('http') ? src : src.replace(/^\//, '');
      return { src: escAttr(href), alt: escAttr(alt) };
    })
    .filter(Boolean);

  const factsSrc = content.facts || [];
  const facts = (Array.isArray(factsSrc) ? factsSrc : []).map((f) => ({
    label: esc(f.label || ''),
    value: esc(f.value || ''),
  }));

  const stepsSrc = content.steps || d.steps || [];
  const steps = (Array.isArray(stepsSrc) ? stepsSrc : []).map((s) => ({
    title: esc(s.title || ''),
    desc: esc(s.desc || s.description || ''),
  }));

  let hero_image = '';
  if (content.hero_image) hero_image = escAttr(content.hero_image);
  else if (gallery_items[0]) hero_image = gallery_items[0].src;

  const quote_text = esc(content.quote || content.quote_text || d.quote || '');
  const quote_by = esc(content.quote_by || d.quote_by || '');

  return {
    name: esc(name),
    name_html: nameHtml(name),
    tagline: esc(content.tagline || ''),
    city: esc(content.city || ''),
    eyebrow: esc(content.eyebrow || d.eyebrow || 'Local'),
    hero_title_html: italicizeLastWord(heroTitle),
    label_menu: esc(content.label_menu || d.label_menu || 'Carta'),
    menu_title_html: italicizeLastWord(menuTitle),
    menu_intro: esc(content.menu_intro || d.menu_intro || ''),
    menu_note: esc(content.menu_note || d.menu_note || 'Precios referenciales. Confirma disponibilidad por WhatsApp.'),
    menu_items,
    menu_groups,
    about: esc(content.about || content.tagline || ''),
    about_title_html: italicizeLastWord(aboutTitle),
    about_card: esc(content.about_card || d.about_card || ''),
    contact_title_html: italicizeLastWord(contactTitle),
    cta_title_html: italicizeLastWord(ctaTitle),
    cta_text: esc(content.cta_text || d.cta_text || 'Escríbenos por WhatsApp y te respondemos el mismo día.'),
    gallery_title_html: italicizeLastWord(galleryTitle),
    gallery_intro: esc(content.gallery_intro || d.gallery_intro || ''),
    steps_kicker: esc(content.steps_kicker || d.steps_kicker || 'Proceso'),
    steps_title_html: italicizeLastWord(stepsTitle),
    steps,
    cta_primary: esc(content.cta_primary || d.cta_primary || 'WhatsApp'),
    cta_secondary: esc(content.cta_secondary || d.cta_secondary || 'Ver más'),
    cta_short: esc(content.cta_short || d.cta_short || 'WA'),
    phone_display: esc(phoneDisplay(content.phone_wa)),
    wa_url: escAttr(itemWa),
    address_display: esc(content.address || `${content.city}, Chile`),
    maps_url: maps ? escAttr(maps) : '',
    instagram: content.instagram ? escAttr(content.instagram) : '',
    marquee_items,
    stats_items,
    hours_rows,
    gallery_items,
    facts,
    hero_image,
    quote_text,
    quote_by,
    seo_title: esc(content.seo_title || `${name} · ${content.city || 'Chile'}`),
    seo_description: esc(
      content.seo_description ||
        content.tagline ||
        `${name} en ${content.city || 'Chile'}. Contáctanos por WhatsApp.`
    ),
    canonical_url: content.canonical_url ? escAttr(content.canonical_url) : '',
    og_image: content.og_image ? escAttr(content.og_image) : '',
    fonts_url: meta.fonts_url ? escAttr(meta.fonts_url) : '',
    json_ld: buildJsonLd(content, meta),
    show_demo_badge: content.show_demo_badge === false ? '' : '1',
    skin_id: esc(meta.id || content.template || 'default'),
    menu_anchor: 'carta',
  };
}

function buildBlocksHtml(sections, ctx, custom_hero) {
  const blocks = sections.blocks || [];
  const nav = [];
  const parts = [];

  for (const spec of blocks) {
    const block = spec.block;
    const variant = spec.variant || 'default';
    const cond = spec.if;
    if (cond && !isTruthy(resolvePath(ctx, cond))) continue;

    // empty structural gates
    if (block === 'menu' && (!ctx.menu_items || !ctx.menu_items.length)) continue;
    if (block === 'steps' && (!ctx.steps || !ctx.steps.length)) continue;

    let tpl;
    if (block === 'hero' && custom_hero && (variant === 'custom' || spec.custom)) {
      tpl = custom_hero;
    } else {
      tpl = loadBlock(block, variant);
    }

    const anchor = spec.anchor || '';
    const classes = [
      'blk',
      `blk-${block}`,
      `blk-${block}--${variant}`,
      ...(spec.class ? String(spec.class).split(/\s+/) : []),
    ]
      .filter(Boolean)
      .join(' ');

    const local = {
      ...ctx,
      blk: { classes, anchor, variant, block },
      menu_anchor: ctx.menu_anchor || 'carta',
    };
    // first menu block defines secondary CTA target
    if (block === 'menu' && anchor) local.menu_anchor = anchor;

    parts.push(render(tpl, local));

    if (spec.nav && anchor) {
      const label = render(String(spec.nav), ctx).trim() || anchor;
      nav.push({ href: `#${anchor}`, label: esc(label) });
    }
  }

  // fix menu_anchor in already-rendered heroes: re-render is hard; set before loop
  return { html: parts.join('\n'), nav_links: nav };
}

function buildOne(slug, outRoot) {
  const clientDir = path.join(CLIENTS, slug);
  const contentPath = path.join(clientDir, 'content.json');
  if (!fs.existsSync(contentPath)) {
    throw new Error(`No existe clients/${slug}/content.json`);
  }
  const content = JSON.parse(fs.readFileSync(contentPath, 'utf8'));
  validateContent(content, slug);

  const templateId = content.template || 'restaurant';
  const tpl = loadTemplate(templateId);
  const ctx = buildContext(content, tpl.meta, slug);

  // Pre-scan sections for menu anchor so hero secondary CTA works
  const menuSpec = (tpl.sections.blocks || []).find((b) => b.block === 'menu' && b.anchor);
  if (menuSpec) ctx.menu_anchor = menuSpec.anchor;

  const { html: blocks_html, nav_links } = buildBlocksHtml(
    tpl.sections,
    ctx,
    tpl.custom_hero
  );

  let color_primary = content.colors?.primary || '';
  if (!color_primary) {
    const m = tpl.skin_css.match(/--primary:\s*([^;]+);/);
    color_primary = (m && m[1].trim()) || '#6366F1';
  }

  const shellData = {
    ...ctx,
    blocks_html,
    nav_links,
    css: composeCss({
      base_css: tpl.base_css,
      classic_css: tpl.classic_css,
      skin_css: tpl.skin_css,
      meta: tpl.meta,
      content,
    }),
    color_primary: escAttr(color_primary),
  };

  const html = render(tpl.shell, shellData);
  const outDir = path.join(outRoot, slug);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');

  const assetsSrc = path.join(clientDir, 'assets');
  if (fs.existsSync(assetsSrc)) {
    copyDir(assetsSrc, path.join(outDir, 'assets'));
  }

  const bytes = Buffer.byteLength(html, 'utf8');
  return { slug, templateId, outDir, bytes };
}

function copyDir(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dst, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

function listBuildableClients() {
  if (!fs.existsSync(CLIENTS)) return [];
  return fs
    .readdirSync(CLIENTS, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .filter((name) => fs.existsSync(path.join(CLIENTS, name, 'content.json')));
}

function printHelp() {
  console.log(`
demo-kit build

  npm run build -- --slug=<slug>     Genera dist/<slug>/
  npm run build -- --all             Genera todos los clients con content.json
  npm run build -- --list            Lista clients buildables
  npm run build -- --slug=x --out=ruta

Templates: ${[...VALID_TEMPLATES].join(', ')}
`);
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    process.exit(0);
  }
  if (args.list) {
    const list = listBuildableClients();
    console.log(list.length ? list.join('\n') : '(ningún client con content.json)');
    process.exit(0);
  }

  const slugs = args.all
    ? listBuildableClients()
    : args.slug
      ? [args.slug]
      : [];

  if (!slugs.length) {
    printHelp();
    console.error('Error: indica --slug=<slug> o --all');
    process.exit(1);
  }

  let ok = 0;
  for (const slug of slugs) {
    try {
      const r = buildOne(slug, args.out);
      console.log(
        `✓ ${r.slug}  template=${r.templateId}  → ${path.relative(ROOT, r.outDir)}/index.html  (${r.bytes} bytes)`
      );
      ok++;
    } catch (err) {
      console.error(`✗ ${slug}: ${err.message}`);
      process.exitCode = 1;
    }
  }
  if (ok) console.log(`\nListo: ${ok} demo(s). Preview: npm run preview -- --slug=${slugs[0]}`);
}

main();
