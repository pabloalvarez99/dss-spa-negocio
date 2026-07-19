# Observabilidad — landing DSS Chile

Sprint D. Sin ads, Meta Pixel ni Google Ads.

## 1. Métricas de producto (Vercel Web Analytics)

### Dónde mirar

1. [Vercel Dashboard](https://vercel.com) → proyecto **`dss-chile`**
2. Pestaña **Analytics** (Web Analytics / Insights)
3. Pageviews, top pages, referrers, y **Custom Events**

Prod: https://dss-chile.vercel.app

### Cómo está cableado

| Pieza | Ubicación | Rol |
|-------|-----------|-----|
| Script Insights | `website/index.html` → `/_vercel/insights/script.js` | Pageviews + receptor de custom events |
| `track` / `dssTrack` | `website/app.js` | Emite `window.va('event', …)`; no rompe si falla |
| Queue stub | `window.va` / `window.vaq` al inicio de `app.js` | Eventos tempranos no se pierden |

**No** se usa el paquete npm `@vercel/analytics` (evita duplicar el script). Una sola etiqueta Insights.

Requisito: Web Analytics **habilitado** en el proyecto Vercel (`dss-chile`). Custom events suelen requerir plan Pro+; pageviews básicos según plan del proyecto.

### Eventos custom

| Evento | Props | Cuándo |
|--------|-------|--------|
| `wa_click` | `id` | Click en WA: `header`, `hero`, `cta`, `footer`, `mobar`, `form_fallback`, `tienda`, `retiro`, `retiro_footer` |
| `form_submit` | `rubro`, `comuna`, `fuente` | Postulación válida (abre WA + Web3Forms) |
| `form_spam_blocked` | `reason` | Honeypot (`honeypot`) o demasiado rápido (`too_fast`) |
| `demo_open` | `slug` | Click en card del portafolio |
| `filter_use` | `category` | Chip de filtro de rubro |
| `plan_cta` | `plan` | CTA de planes: `presencia`, `comercial`, `pro` |

También pueden aparecer eventos auxiliares de `data-track` (`cta_hero_postular`, `form_submit_click`, `form_invalid_phone`, …).

API pública en página: `window.dssTrack('nombre', { key: 'value' })`.

### Cómo verificar en 2 minutos

1. Abrir prod (o preview) con DevTools → Network.
2. Click en un botón WhatsApp del header.
3. Buscar request a Vercel analytics / `vitals` / insights; en consola: `typeof window.va` → `"function"`.
4. En el dashboard, Custom Events → filtrar `wa_click` (puede tardar unos minutos en aparecer).

### Fuera de alcance (Sprint F o con tracción)

- Meta Pixel / Google Ads / GTM de marketing
- Dashboard custom propio
- CRM de leads (Sprint E)

---

## 2. Uptime del portafolio de demos

### Script

```bash
# Desde la raíz del repo
node scripts/check-demos-uptime.mjs          # las 123 demos
node scripts/check-demos-uptime.mjs --top 20 # solo las primeras 20 del JSON
node scripts/check-demos-uptime.mjs --json-only
node scripts/check-demos-uptime.mjs --timeout 8000
```

- Fuente: `website/demos.json`
- Salida markdown: `docs/mejora/inventario-demos.md`
- Salida machine: `docs/mejora/uptime-last.json`
- Exit code `1` si hay demos caídas (útil para CI local / Task Scheduler)

### Cadencia

- **Semanal** (recomendado): correr el script y commitear el inventario si cambió.
- Si hay caídas: sección **Demos caídas** del inventario; acción `fix`.
- Si la caída persiste: ocultar del grid (quitar/comentar en `demos.json`) o retiro SLA 24 h (D010) si lo pide el dueño.

### Windows (Task Scheduler, ejemplo)

```powershell
cd C:\Users\Administrator\dss-spa-negocio
node scripts\check-demos-uptime.mjs
```

Programar semanalmente; revisar `docs/mejora/uptime-last.json` → clave `failed`.

---

## 3. Checklist operativo semanal

- [ ] Dashboard Vercel → Analytics: ¿bajan `wa_click` y `form_submit`?
- [ ] ¿Qué `id` de WA gana? (hero vs mobar vs footer)
- [ ] `node scripts/check-demos-uptime.mjs` → fallas = 0 o plan de fix
- [ ] Commit inventario si hubo cambios
