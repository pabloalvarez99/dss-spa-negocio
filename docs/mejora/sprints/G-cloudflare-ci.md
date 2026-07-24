# Sprint G — Cloudflare + CI

**Estado:** ver [`../STATUS.md`](../STATUS.md)
**Esfuerzo:** 2–3 días (G2 es el grueso)
**Objetivo:** Un solo proveedor de hosting (Cloudflare), analytics propias y automatización que elimine el trabajo manual recurrente.
**Ideal después de:** Sprints 0–E (cerrados). No toca la precondición de F (≥8 clientes pagos).

## Prompt de sesión

```text
Leé docs/mejora/STATUS.md y docs/mejora/sprints/G-cloudflare-ci.md.
Ejecutá SOLO el sub-bloque acordado (G1…G6). No mezclar G1 con G2 en la misma corrida.
wrangler ya está autenticado; confirmar antes de cada deploy productivo.
Actualizá STATUS.md al cerrar.
```

---

## Contexto medido (2026-07-24)

Datos verificados con `wrangler` y `vercel`, no estimados:

| Hecho | Valor |
|---|---|
| wrangler | 4.100.0, OAuth activo, cuenta `timadapa@gmail.com`, scope `pages (write)` |
| Proyectos en Cloudflare Pages | 21 |
| Demos en `demos.json` | 123 — **18** en `*.pages.dev` (campo `d`), **105** asumidas en `*.vercel.app` |
| Inconsistencia | `shawarma-cairo` existe como proyecto CF Pages pero `demos.json` lo manda a `vercel.app` |
| Fuente de las 105 demos Vercel | **No está en el repo ni en el disco.** Solo existen desplegadas |
| Proyecto Vercel de la landing | `dss-chile`, prod URL real `website-henna-alpha-60.vercel.app`, alias `dss-chile.vercel.app` reasignado a mano |
| CI | Inexistente (`.github/` no existe) |
| Tests | Inexistentes |
| Peso `website/shots/` | 8.4 MB, 123 pares jpg+webp, sin faltantes ni huérfanos |

**Decisiones que este sprint cierra:**

- **P002** (Vercel vs Cloudflare Pages para las demos) → **Cloudflare Pages**, todo.
- **P001** (dominio de marca) → **sigue abierto**. La landing va a `dss-chile.pages.dev`; el dominio propio se conecta como custom domain cuando exista, sin rehacer nada.

---

## G1 — Landing a Cloudflare Pages + analytics propias

Proyecto Pages `dss-chile` → `https://dss-chile.pages.dev`, deploy con `wrangler pages deploy website`.

### Headers
- [ ] `website/_headers` replica lo que hoy hace `vercel.json`: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, y `Cache-Control: public, max-age=31536000, immutable` para `/shots/*` y para `png|jpg|jpeg|svg|webp|ico`.
- [ ] `vercel.json` se conserva mientras el proyecto Vercel siga vivo como redirect.

### Analytics — reemplazo de Vercel Web Analytics
Vercel Insights no funciona fuera de Vercel. Cloudflare Web Analytics no tiene eventos custom en el plan gratis, y Zaraz exige una zona propia (no hay dominio todavía). Solución: canal propio.

- [ ] `track(event, props)` **conserva su firma y su contrato** — solo cambia el destino. `sanitizeProps()` se mantiene tal cual.
- [ ] Sink nuevo: `navigator.sendBeacon("/api/track", …)`, con fallback `fetch(…, {keepalive:true})`. Sigue siendo no-op silencioso si falla.
- [ ] Pages Function `website/functions/api/track.js`: valida, acota tamaño y escribe en D1.
- [ ] D1 `dss-events`, tabla `events(id, ts, name, props, path)`. Creación por CLI (`wrangler d1 create`), binding en `wrangler.toml`.
- [ ] `page_view` se emite por el mismo canal (no depende del dashboard).
- [ ] Quitar `/_vercel/insights/script.js` y el stub `window.va` de `index.html` / `app.js`.

**Privacidad — regla dura:** los eventos actuales ya son no-PII (`rubro`, `comuna`, `slug`, `plan`, `id` de botón, `category`). Se mantiene así. **Nunca** entran teléfono, nombre, correo ni texto libre del formulario. La Function descarta cualquier clave fuera de una allowlist.

### Lectura del embudo
- [ ] `scripts/report-funnel.mjs` → `wrangler d1 execute` → consola: `wa_click` por id, `form_submit` por rubro/comuna, top `demo_open`, `plan_cta` por plan, y conversión visita→lead.
- [ ] `docs/mejora/OBSERVABILIDAD.md` actualizado al canal nuevo.

### Smoke y URLs
- [ ] `scripts/smoke-d-observability.mjs` reescrito a los asserts nuevos (hoy verifica `window.va` e Insights; con G1 daría falso rojo).
- [ ] Barrido de `dss-chile.vercel.app` → `dss-chile.pages.dev` en `README.md`, `docs/`, `website/sitemap.xml`, canonical y OG de `index.html`, y el `User-Agent` de `check-demos-uptime.mjs`.
- [ ] Proyecto Vercel `dss-chile`: **no se borra**. Queda con redirect 308 a la URL nueva — hay WhatsApp ya enviados que apuntan ahí.

---

## G2 — Demos a Cloudflare (cierra P002)

Las 105 demos en Vercel no tienen fuente recuperable. Son estáticas, así que se migran por espejo HTTP.

- [ ] `scripts/mirror-demo.mjs`: baja `https://{slug}.vercel.app` y los assets locales que referencia (css, js, imágenes, fuentes, manifest, favicon) a `mirror/{slug}/`. `mirror/` va a `.gitignore`.
- [ ] `scripts/deploy-demo.mjs`: `wrangler pages deploy mirror/{slug} --project-name={slug}`.
- [ ] **Puerta de verificación antes de tocar `demos.json`:** el espejo en `pages.dev` debe responder 200, tener el mismo `<title>`, la misma cantidad de links `wa.me` y un tamaño de HTML dentro de ±10% del original. Si falla cualquiera, el slug no se flipea y queda anotado.
- [ ] Flip en lotes de ~10: setear `d: "{slug}.pages.dev"` en `demos.json`, correr uptime, redeploy de la landing.
- [ ] `shawarma-cairo`: ya existe en CF, solo requiere el flip.
- [ ] Al terminar: 123/123 en `*.pages.dev` y `demoUrl()` en `app.js` se simplifica.
- [ ] Proyectos Vercel de demos: se dejan vivos **30 días** post-flip antes de borrar.

---

## G3 — demo-kit que deploya

- [ ] `demo-kit/scripts/deploy-demo.mjs`: `wrangler pages deploy dist/{slug} --project-name={slug}`, imprime la URL final.
- [ ] `npm run ship -- --slug=x` = build + check + deploy, un solo comando. Es el flujo de campo real; hoy el kit compila a `dist/` y ahí muere.
- [ ] `--portfolio` agrega el slug a `website/demos.json` con el `d` correcto.
- [ ] `demo-kit/README.md` actualizado.

---

## G4 — CI en GitHub Actions (sin secretos)

- [ ] `.github/workflows/ci.yml` — en PR y push a `main`:
  - `node --test`
  - `node scripts/check-demos-assets.mjs`
  - `node scripts/smoke-d-observability.mjs`
  - `cd demo-kit && npm run check -- --all`
  - build de cada cliente del kit (que compile sin reventar)
- [ ] `scripts/check-demos-assets.mjs` (nuevo): valida `demos.json` contra `website/shots/` — thumb jpg/webp faltante, slug duplicado, shot huérfano, campos requeridos (`n`, `u`, `c`, `city`, `e`).
- [ ] `.github/workflows/uptime.yml` — cron semanal + `workflow_dispatch`: corre el chequeo, commitea `inventario-demos.md` + `uptime-last.json` (`permissions: contents: write`), y **falla el job si hay demos caídas** para que GitHub mande el mail. Esto elimina el residual 5 de forma permanente.
- [ ] **Sin token de Cloudflare en CI.** El deploy sigue siendo local con wrangler. Automatizarlo después es un token `Pages:Edit` y un step más.

---

## G5 — Tests (`node:test`, cero dependencias)

Coherente con el "cero deps npm" del demo-kit. Node ≥18 ya trae el runner.

- [ ] `build-demo.mjs`: escapado de HTML en los campos de `content.json` — hoy un `<script>` en el `name` entra crudo al output.
- [ ] `build-demo.mjs`: `wa.me` bien formado desde `phone_wa`; JSON-LD del output es `JSON.parse`-able; slug inexistente = exit 1; template desconocido = error claro.
- [ ] `check-demos-assets.mjs`: detecta thumb faltante y slug duplicado.
- [ ] `isChileMobile()`: `+56 9…`, `09…`, `9xxxxxxxx`, y basura → false. Requiere extraerla a un módulo importable.
- [ ] `sanitizeProps()`: corte a 255 chars, descarte de null/vacío, coerción de tipos.

---

## G6 — Robustez `website/app.js`

- [ ] Guards en `form` (`app.js:214`), `hdr` y `totop` (`app.js:115`). Hoy, si falta cualquiera de esos nodos, el script muere y se lleva el portafolio entero.
- [ ] `demoUrl()` simplificada post-G2.

---

## Definition of done

- [ ] `https://dss-chile.pages.dev` sirve la landing con los mismos headers de seguridad.
- [ ] Los 6 eventos del Sprint D siguen registrándose y `report-funnel.mjs` los muestra.
- [ ] 123/123 demos en `*.pages.dev`; `demos.json` sin referencias a `vercel.app`.
- [ ] `npm run ship` publica una demo nueva de punta a punta.
- [ ] CI verde en `main`; el cron de uptime corrió al menos una vez y commiteó.
- [ ] `node --test` pasa.
- [ ] `STATUS.md` → G done, P002 cerrado en `DECISIONES.md`, residual 5 eliminado.

## Fuera de alcance

- Comprar o configurar el dominio .cl (P001 sigue abierto).
- Migrar la landing a un framework (D003 sigue vigente).
- Ads, pixel, Zaraz.
- Borrar los proyectos Vercel (recién 30 días después del flip).
- CRM Sheet (residual 1, es otra corrida).
