# Estado de sprints — DSS Chile

> **Actualizar este archivo al cerrar cada sesión.**  
> Es la única fuente de “qué sigue” para no gastar tokens re-descubriendo.

Última actualización: 2026-07-19

## Anti-conflicto (sesiones paralelas C / D / E)

Cuando C, D y E corren a la vez, **no compartir árbol de archivos** y **no reescribir filas ajenas**:

| Sesión | Sprint | Árbol permitido | En `STATUS.md` al cerrar |
|--------|--------|-----------------|--------------------------|
| **C** | Demo-kit | `demo-kit/` (+ `sprints/C-*.md`) | **Solo** fila **C** (+ nota de sesión C) |
| **D** | Observabilidad | `website/` (+ scripts uptime D, `docs/mejora/OBSERVABILIDAD.md`, inventario/uptime, `sprints/D-*.md`) | **Solo** fila **D** (+ nota de sesión D) |
| **E** | Ops comercial | `docs/` ops/ventas/negocio de E (+ `sprints/E-*.md`) | **Solo** fila **E** (+ nota de sesión E) |

Reglas:

1. **No tocar** el árbol de otra sesión (C ≠ `website/`, D ≠ `demo-kit/`, E ≠ código de landing/kit salvo lo que liste el sprint E).
2. Al cerrar: actualizar **solo tu fila** en la tabla Progreso. No pisar estado/notas de filas ajenas.
3. **No reescribir** el bloque “Sprint activo” si otra sesión lo usa; solo tocarlo si eres dueño actual o la única sesión activa.
4. Commits con mensaje **solo de tu sprint**. Si choca `STATUS.md`: merge conservando filas C/D/E.
5. Inventario demos / uptime: escribe **D**; C no borra demos del portafolio sin coordinar.

## Sprint activo

| Campo | Valor |
|-------|--------|
| **Sprint actual** | — (0–E cerrados; F blocked) |
| **Archivo** | [`sprints/F-escala.md`](sprints/F-escala.md) (solo con tracción) |
| **Bloqueado por** | F: ≥8 clientes pagos (D009) |
| **Notas** | C3 residual si se decide P002. Residual ops: montar Sheet real desde `crm-schema.md`. |

## Progreso

| Sprint | Estado | Fecha inicio | Fecha fin | Notas |
|--------|--------|--------------|-----------|-------|
| 0 Higiene | `done` | 2026-07-19 | 2026-07-19 | ventas→docs; 123 demos OK; WA retiro 24h |
| A Landing | `done` | 2026-07-19 | 2026-07-19 | A1+A2+A3 en index.html; deploy prod |
| B Performance | `done` | 2026-07-19 | 2026-07-19 | CSS/JS/DEMOS extraídos; WebP dual; deploy prod |
| C Demo-kit | `done` | 2026-07-19 | 2026-07-19 | C1+C2 done (4 skins + build/check); C3 diferido (P002) |
| D Observabilidad | `done` | 2026-07-19 | 2026-07-19 | track→va; eventos WA/form/demo/filter/plan; uptime 123 OK; OBSERVABILIDAD.md |
| E Ops comercial | `done` | 2026-07-19 | 2026-07-19 | Sheet CRM + pack cierre + EXTRAS; solo docs |
| F Escala | `blocked` | | | Solo con ≥8 clientes pagos |

Estados válidos: `pending` · `in_progress` · `done` · `blocked` · `skipped`

## Checklist de cierre de sesión

Al terminar trabajo, el agente o la persona debe:

1. Marcar ítems hechos en el archivo del sprint (**solo el tuyo**)
2. Actualizar **solo tu fila** en la tabla Progreso (ver anti-conflicto C/D/E)
3. Si no hay paralelismo: poner el siguiente sprint en “Sprint activo”. **Con C∥D∥E: no pisar “Sprint activo” ajeno**
4. Anotar en **Notas de sesión** una entrada de **tu** sprint (no borrar notas ajenas)
5. No empezar otro sprint grande en la misma sesión
6. Commit + push con mensaje solo de tu sprint  

## Notas de sesión (más reciente arriba)

### 2026-07-19 — Sprint E Ops comercial (cerrado)
- Solo docs de E (`docs/negocio/*` pack, `crm-schema.md`, DECISIONES P003/D011, sprint E). **No** `website/`, **no** `demo-kit/`, **no** deploy.
- CRM: **Google Sheet** (P003→D011). Esquema + embudo + KPI en `docs/mejora/crm-schema.md`.
- Embudo: FU 48–72 h y 7 d; máx ~15 demos activas sin respuesta; 14 d archivar/expirar; metas semanales desde PLAN.
- Pack cierre: `PROPUESTA.md` (export), `CONTRATO.md`, `TRANSFERENCIA.md` (sin cuentas reales), `CHECKLIST-GO-LIVE.md`.
- Extras: `docs/negocio/EXTRAS.md` (dominio .cl, fotos, catálogo grande, reservas, solo-links delivery).
- KPI meta documentados (sin inventar datos): demo→pago ≥25%; lead→demo ≤72 h en 90%.
- Leads históricos: N/A (Sheet en cero; portafolio ilustrativo ≠ CRM).
- Filas C/D no pisadas.

### 2026-07-19 — Sprint C Demo-kit (C1+C2 cerrados; C3 diferido)
- Scaffold `demo-kit/`: templates `restaurant` · `barber` · `clinic` · `services` (layout `_shared`), clients ejemplo, `scripts/build-demo.mjs` + `preview.mjs` + `check-demo.mjs`.
- Schema: `demo-kit/schema/content.schema.json` + README (flujo objetivo ≤45 min).
- Build: `npm run build -- --slug=pizzeria-ejemplo` → `dist/{slug}/index.html` (cero deps npm). Preview local OK (puerto 8765).
- Check enviable: hard checks OK; fotos ≥3 soft (pilotos sin assets).
- **No** C3 multi-host (P002 abierto). **No** deploy a `dss-chile`. No reescribir landing.
- Legacy: `clients/malta-lupulo` HTML a mano (sin content.json).
- **Siguiente residual C:** C3 cuando se decida P002. Sprint activo paralelo: E Ops.

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
