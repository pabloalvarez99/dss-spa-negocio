#!/usr/bin/env node
/**
 * build-demo.mjs — genera HTML estático desde clients/{slug}/content.json
 *
 * Uso:
 *   npm run build -- --slug=pizzeria-ejemplo
 *   npm run build -- --slug=pizzeria-ejemplo --out=dist
 *   node scripts/build-demo.mjs --all
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CLIENTS = path.join(ROOT, 'clients');
const TEMPLATES = path.join(ROOT, 'templates');
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

/** Minimal mustache-ish: {{key}} and {{#if key}}...{{/if}} */
function render(template, data) {
  let out = template;
  // if blocks (truthy string / non-empty)
  out = out.replace(/\{\{#if\s+(\w+)\}\}([\s\S]*?)\{\{\/if\}\}/g, (_, key, body) => {
    const v = data[key];
    if (v === undefined || v === null || v === false || v === '') return '';
    return body;
  });
  // simple keys
  out = out.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    if (!(key in data)) return '';
    return String(data[key] ?? '');
  });
  return out;
}

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

function buildMenuHtml(menu) {
  if (!Array.isArray(menu) || menu.length === 0) {
    return '<p class="lead" style="color:var(--muted)">Agrega ítems en <code>menu</code> del content.json.</p>';
  }
  return menu
    .map((item) => {
      const name = esc(item.name || 'Ítem');
      const desc = esc(item.desc || item.description || '');
      const price = esc(item.price || '');
      const cat = esc(item.category || item.cat || '');
      return `<article class="menu-card">
  ${cat ? `<div class="cat">${cat}</div>` : ''}
  <h3>${name}</h3>
  <p class="desc">${desc}</p>
  <div class="foot">
    <span class="price">${price || 'Consultar'}</span>
    <span class="ask">WA</span>
  </div>
</article>`;
    })
    .join('\n');
}

function buildHoursHtml(hours) {
  if (!Array.isArray(hours) || hours.length === 0) {
    return '<li><span>Horario</span><b>Consultar por WA</b></li>';
  }
  return hours
    .map((h) => {
      if (typeof h === 'string') return `<li><span>${esc(h)}</span><b></b></li>`;
      const days = esc(h.days || h.day || '');
      const time = esc(h.time || h.hours || '');
      return `<li><span>${days}</span><b>${time}</b></li>`;
    })
    .join('\n');
}

function buildStatsHtml(stats) {
  if (!Array.isArray(stats) || stats.length === 0) return '';
  return stats
    .map((s) => {
      const value = esc(s.value || s.v || '');
      const label = esc(s.label || s.l || '');
      return `<div><b>${value}</b><span>${label}</span></div>`;
    })
    .join('');
}

function buildMarqueeHtml(items) {
  if (!Array.isArray(items) || items.length === 0) return '';
  return items.map((t) => `${esc(t)} <i>·</i>`).join('');
}

function buildGalleryHtml(images, slug) {
  if (!Array.isArray(images) || images.length === 0) return '';
  return images
    .map((img) => {
      const src = typeof img === 'string' ? img : img.src || img.url || '';
      const alt = typeof img === 'string' ? slug : img.alt || slug;
      if (!src) return '';
      // relative assets/ paths stay relative in dist
      const href = src.startsWith('http') ? src : src.replace(/^\//, '');
      return `<figure><img src="${escAttr(href)}" alt="${escAttr(alt)}" loading="lazy" width="400" height="400" /></figure>`;
    })
    .join('\n');
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
  // strip undefined
  return JSON.stringify(
    Object.fromEntries(Object.entries(data).filter(([, v]) => v !== undefined)),
    null,
    2
  );
}

function nameHtml(name) {
  const parts = String(name || '').trim().split(/\s+/);
  if (parts.length <= 1) return esc(name);
  const last = parts.pop();
  return `${esc(parts.join(' '))} <span>${esc(last)}</span>`;
}

function loadTemplate(templateId) {
  if (!VALID_TEMPLATES.has(templateId)) {
    throw new Error(
      `Template desconocido: "${templateId}". Válidos: ${[...VALID_TEMPLATES].join(', ')}`
    );
  }
  const dir = path.join(TEMPLATES, templateId);
  const metaPath = path.join(dir, 'meta.json');
  const skinPath = path.join(dir, 'skin.css');
  const layoutPath = path.join(TEMPLATES, '_shared', 'layout.html');
  // optional per-template layout override
  const customLayout = path.join(dir, 'layout.html');
  const layout = fs.existsSync(customLayout)
    ? fs.readFileSync(customLayout, 'utf8')
    : fs.readFileSync(layoutPath, 'utf8');
  const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
  const skin_css = fs.readFileSync(skinPath, 'utf8');
  return { meta, skin_css, layout };
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

function buildOne(slug, outRoot) {
  const clientDir = path.join(CLIENTS, slug);
  const contentPath = path.join(clientDir, 'content.json');
  if (!fs.existsSync(contentPath)) {
    throw new Error(`No existe clients/${slug}/content.json`);
  }
  const content = JSON.parse(fs.readFileSync(contentPath, 'utf8'));
  validateContent(content, slug);

  const templateId = content.template || 'restaurant';
  const { meta, skin_css, layout } = loadTemplate(templateId);
  const d = meta.defaults || {};

  const name = content.name;
  const waMessage = applyName(content.wa_message || d.wa_message, name);
  const heroTitle = applyName(content.hero_title || d.hero_title || name, name);
  const menuTitle = content.menu_title || d.menu_title || 'Carta';
  const aboutTitle = content.about_title || d.about_title || 'Nosotros';
  const contactTitle = content.contact_title || d.contact_title || 'Contacto';

  const maps =
    content.maps_url ||
    (content.address
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          `${content.address} ${content.city || ''}`
        )}`
      : '');

  const data = {
    name: esc(name),
    name_html: nameHtml(name),
    tagline: esc(content.tagline || ''),
    city: esc(content.city || ''),
    eyebrow: esc(content.eyebrow || d.eyebrow || 'Local'),
    hero_title_html: italicizeLastWord(heroTitle),
    label_menu: esc(content.label_menu || d.label_menu || 'Carta'),
    menu_title_html: italicizeLastWord(menuTitle),
    menu_intro: esc(content.menu_intro || d.menu_intro || ''),
    about: esc(content.about || content.tagline || ''),
    about_title_html: italicizeLastWord(aboutTitle),
    about_card: esc(content.about_card || d.about_card || ''),
    contact_title_html: italicizeLastWord(contactTitle),
    cta_primary: esc(content.cta_primary || d.cta_primary || 'WhatsApp'),
    cta_secondary: esc(content.cta_secondary || d.cta_secondary || 'Ver más'),
    cta_short: esc(content.cta_short || d.cta_short || 'WA'),
    phone_display: esc(phoneDisplay(content.phone_wa)),
    wa_url: escAttr(waUrl(content.phone_wa, waMessage)),
    address_display: esc(content.address || `${content.city}, Chile`),
    maps_url: maps ? escAttr(maps) : '',
    instagram: content.instagram ? escAttr(content.instagram) : '',
    hours_html: buildHoursHtml(content.hours),
    menu_html: buildMenuHtml(content.menu),
    stats_html: buildStatsHtml(content.stats),
    marquee_html: buildMarqueeHtml(content.marquee || content.highlights),
    gallery_html: buildGalleryHtml(content.images, slug),
    seo_title: esc(
      content.seo_title || `${name} · ${content.city || 'Chile'}`
    ),
    seo_description: esc(
      content.seo_description ||
        content.tagline ||
        `${name} en ${content.city || 'Chile'}. Contáctanos por WhatsApp.`
    ),
    canonical_url: escAttr(content.canonical_url || ''),
    og_image: content.og_image ? escAttr(content.og_image) : '',
    color_primary: escAttr(content.colors?.primary || ''),
    fonts_url: escAttr(meta.fonts_url),
    skin_css: (() => {
      let css = skin_css;
      if (content.colors?.primary) {
        css += `\n:root{--primary:${content.colors.primary};}`;
      }
      if (content.colors?.on_primary) {
        css += `\n:root{--on-primary:${content.colors.on_primary};}`;
      }
      if (content.colors?.bg) {
        css += `\n:root{--bg:${content.colors.bg};}`;
      }
      return css;
    })(),
    json_ld: buildJsonLd(content, meta),
    show_demo_badge: content.show_demo_badge === false ? '' : '1',
  };

  // theme-color fallback if no primary override in content
  if (!content.colors?.primary) {
    const m = skin_css.match(/--primary:\s*([^;]+);/);
    data.color_primary = escAttr((m && m[1].trim()) || '#6366F1');
  } else {
    data.color_primary = escAttr(content.colors.primary);
  }

  const html = render(layout, data);
  const outDir = path.join(outRoot, slug);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');

  // copy assets/
  const assetsSrc = path.join(clientDir, 'assets');
  const assetsDst = path.join(outDir, 'assets');
  if (fs.existsSync(assetsSrc)) {
    copyDir(assetsSrc, assetsDst);
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
