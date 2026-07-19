#!/usr/bin/env node
/**
 * Sirve dist/{slug} en localhost (sin deps: http estático nativo).
 * Uso: npm run preview -- --slug=pizzeria-ejemplo [--port=4173]
 */
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

function parseArgs(argv) {
  const args = { slug: null, port: 4173 };
  for (const raw of argv) {
    if (raw.startsWith('--slug=')) args.slug = raw.slice(7).trim();
    else if (raw.startsWith('--port=')) args.port = Number(raw.slice(7)) || 4173;
  }
  return args;
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.slug) {
    console.error('Uso: npm run preview -- --slug=<slug> [--port=4173]');
    process.exit(1);
  }
  const root = path.join(ROOT, 'dist', args.slug);
  if (!fs.existsSync(path.join(root, 'index.html'))) {
    console.error(`No hay build en dist/${args.slug}. Corre: npm run build -- --slug=${args.slug}`);
    process.exit(1);
  }

  const server = http.createServer((req, res) => {
    try {
      let urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
      if (urlPath === '/') urlPath = '/index.html';
      const filePath = path.normalize(path.join(root, urlPath));
      if (!filePath.startsWith(root)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
      }
      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('404');
        return;
      }
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
    } catch (e) {
      res.writeHead(500);
      res.end(String(e));
    }
  });

  server.listen(args.port, '127.0.0.1', () => {
    console.log(`Preview: http://127.0.0.1:${args.port}/  (dist/${args.slug})`);
    console.log('Ctrl+C para salir');
  });
}

main();
