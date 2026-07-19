#!/usr/bin/env node
/**
 * Checklist "demo enviable" (C2).
 * Uso:
 *   npm run check -- --slug=pizzeria-ejemplo
 *   npm run check -- --all
 *
 * Revisa content.json (+ dist si existe).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CLIENTS = path.join(ROOT, 'clients');

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

function checkOne(slug) {
  const content = JSON.parse(
    fs.readFileSync(path.join(CLIENTS, slug, 'content.json'), 'utf8')
  );
  const checks = [];
  const pass = (id, ok, detail) => checks.push({ id, ok: !!ok, detail });

  const phone = String(content.phone_wa || '').replace(/\D/g, '');
  pass('wa', phone.length >= 11, phone ? `wa.me/${phone}` : 'falta phone_wa');

  const hours = content.hours;
  pass('hours', Array.isArray(hours) && hours.length > 0, hours?.length ? `${hours.length} franja(s)` : 'falta hours[]');

  const maps =
    content.maps_url ||
    (content.address
      ? `maps search: ${content.address}`
      : '');
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

  const distHtml = path.join(ROOT, 'dist', slug, 'index.html');
  if (fs.existsSync(distHtml)) {
    const html = fs.readFileSync(distHtml, 'utf8');
    pass('build_wa', html.includes('wa.me/'), 'float/CTAs WA en HTML');
    pass('build_title', html.includes('<title>') && html.includes(content.name), 'title con nombre');
    pass('build_jsonld', html.includes('application/ld+json'), 'JSON-LD');
  } else {
    pass('build', false, 'sin dist — corre npm run build');
  }

  return checks;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const slugs = args.all ? listClients() : args.slug ? [args.slug] : [];
  if (!slugs.length) {
    console.error('Uso: npm run check -- --slug=<slug> | --all');
    process.exit(1);
  }

  let failed = 0;
  for (const slug of slugs) {
    console.log(`\n== ${slug} ==`);
    const checks = checkOne(slug);
    for (const c of checks) {
      const mark = c.ok ? '✓' : '✗';
      console.log(`  ${mark} ${c.id}: ${c.detail}`);
      if (!c.ok) failed++;
    }
  }
  console.log(failed ? `\n${failed} check(s) fallaron` : '\nTodos los checks OK (o solo avisos de fotos en piloto)');
  // photos < 3 is soft for pilot — exit 1 only on hard fails
  const hard = ['wa', 'hours', 'map', 'seo_title', 'seo_desc', 'no_lorem', 'name', 'city', 'menu'];
  let hardFail = 0;
  for (const slug of slugs) {
    for (const c of checkOne(slug)) {
      if (hard.includes(c.id) && !c.ok) hardFail++;
    }
  }
  process.exit(hardFail ? 1 : 0);
}

main();
