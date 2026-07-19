# Estado de sprints — DSS Chile

> **Actualizar este archivo al cerrar cada sesión.**  
> Es la única fuente de “qué sigue” para no gastar tokens re-descubriendo.

Última actualización: 2026-07-19

## Sprint activo

| Campo | Valor |
|-------|--------|
| **Sprint actual** | `E` — Ops comercial (sesión paralela a C/D) |
| **Archivo** | [`sprints/E-ops-comercial.md`](sprints/E-ops-comercial.md) |
| **Bloqueado por** | — |
| **Notas** | Solo docs/proceso. No tocar demo-kit/ ni website/app.js·index.html. C y D en paralelo: no pisar. |

## Progreso

| Sprint | Estado | Fecha inicio | Fecha fin | Notas |
|--------|--------|--------------|-----------|-------|
| 0 Higiene | `done` | 2026-07-19 | 2026-07-19 | ventas→docs; 123 demos OK; WA retiro 24h |
| A Landing | `done` | 2026-07-19 | 2026-07-19 | A1+A2+A3 en index.html; deploy prod |
| B Performance | `done` | 2026-07-19 | 2026-07-19 | CSS/JS/DEMOS extraídos; WebP dual; deploy prod |
| C Demo-kit | `in_progress` | 2026-07-19 | | C1 en curso; no C3 multi-host (sesión paralela) |
| D Observabilidad | `done` | 2026-07-19 | 2026-07-19 | track→va; eventos WA/form/demo/filter/plan; uptime 123 OK; OBSERVABILIDAD.md |
| E Ops comercial | `in_progress` | 2026-07-19 | | CRM + pack cierre + embudo; solo docs (sesión paralela) |
| F Escala | `blocked` | | | Solo con ≥8 clientes pagos |

Estados válidos: `pending` · `in_progress` · `done` · `blocked` · `skipped`

## Checklist de cierre de sesión

Al terminar trabajo, el agente o la persona debe:

1. [x] Marcar ítems hechos en el archivo del sprint  
2. [x] Actualizar la tabla de arriba  
3. [x] Poner el **siguiente sprint** en “Sprint activo”  
4. [x] Anotar en **Notas de sesión** qué quedó a medias  
5. [x] No empezar otro sprint grande en la misma sesión  

## Notas de sesión (más reciente arriba)

### 2026-07-19 — Sprint D Observabilidad (cerrado)
- Wire `track`/`dssTrack` → Vercel Web Analytics (`window.va` + queue); try/catch no-op si falla. Sin ads/pixel.
- Eventos: `wa_click` (id), `form_submit` (rubro/comuna/fuente), `form_spam_blocked` (reason), `demo_open` (slug), `filter_use` (category), `plan_cta` (plan).
- Insights: un solo `/_vercel/insights/script.js` en index (sin npm `@vercel/analytics`).
- Uptime: `scripts/check-demos-uptime.mjs` → `inventario-demos.md` + `uptime-last.json` (123/123 OK).
- Docs: `docs/mejora/OBSERVABILIDAD.md`; smoke `scripts/smoke-d-observability.mjs`.
- Deploy: `cd website && vercel --prod --yes`; alias `dss-chile.vercel.app` → deploy nuevo.
- **No tocar** `demo-kit/` (C) ni reescribir docs/ventas (E).

### 2026-07-19 — Sprint B Performance / mantenibilidad (cerrado)
- Extraídos `website/styles.css`, `website/app.js`, `website/demos.json` (fetch + fallback UI).
- 123 thumbs dual jpg+webp (`<picture>`), avg ~21 KB/webp; preview-tu-farmacia webp; og-image.png se mantiene para OG.
- `vercel.json` ya cachea webp; sin preload de thumbs; fonts Google async; `prefers-reduced-motion` + noscript OK.
- Smoke local 36/36 (filtros/PAGE/ticker/form/track/stats/planes/privacidad a nivel de código + HTTP assets).
- Deploy: `cd website && vercel --prod --yes` (proyecto `dss-chile`); re-alias manual de `dss-chile.vercel.app` al deploy nuevo (prod URL del proyecto sigue en `website-henna-alpha-60.vercel.app`).
- **Siguiente:** Sprint C (Demo-kit) o D (Observabilidad). **No** C/D/E en esta sesión.

### 2026-07-19 — Sprint A Landing / conversión (cerrado)
- A1: copy chileno (sin voseo), hero Coquimbo/La Serena + demo 24–72 h, stats honestos, Schema planes reales (sin e-commerce core), FAQ con precios y sin permanencia.
- A2: sección `#planes` (29.990 / 49.990 / 79.990), nav + scrollspy, testimonios placeholder honestos, `#privacidad`, link retiro portafolio WA (≤24 h), sin permanencia cerca de CTAs.
- A3: honeypot + tiempo mínimo, validación celular +56 9, “¿Cómo nos conociste?”, WA + Web3Forms, stub `track()` / `dssTrack`.
- Deploy: `cd website && vercel --prod --yes` (proyecto `dss-chile`). Alias `dss-chile.vercel.app` reasignado al deploy nuevo (antes apuntaba al proyecto `website`).
- **Siguiente:** Sprint B — Performance (extraer CSS/JS).

### 2026-07-19 — Sprint 0 Higiene base (cerrado)
- `.obsidian/` añadido a `.gitignore`; `_mirror/` ya ignorado; remote `origin` OK.
- `website/ventas/*` unificado en `docs/ventas/`; stub README en `website/ventas/`.
- README + PLAN + DECISIONES (T001) alineados a prod Vercel **`dss-chile`** → `https://dss-chile.vercel.app`.
- Inventario: 123 demos, todas HTTP 200 → `docs/mejora/inventario-demos.md`.
- Texto WA retiro portafolio 24 h + D010 en DECISIONES.
- Sin deploy de landing en Sprint 0 (solo docs + higiene).
- **Siguiente:** Sprint A — Landing.

### 2026-07-19 — Documentación del ultraplan
- Creada carpeta `docs/mejora/` con análisis, decisiones y sprints 0–F.
- No se implementó código de sprints.
- Hallazgos vivos al documentar:
  - Scripts de venta en `website/ventas/` (README aún dice `docs/ventas/`).
  - Git sin commits estables / muchos archivos staged.
  - `WEB3FORMS_KEY` en cliente dentro de `website/index.html`.
  - ~123 demos en array `DEMOS`; ~5 MB en `website/shots/`.
