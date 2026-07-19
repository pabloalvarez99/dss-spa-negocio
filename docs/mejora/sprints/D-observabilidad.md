# Sprint D — Observabilidad

**Estado:** ver [`../STATUS.md`](../STATUS.md)  
**Esfuerzo:** 1–2 días  
**Objetivo:** Saber qué hace la gente en la landing y si las demos top están vivas.  
**Ideal después de:** Sprint A (eventos de form/precios).

## Prompt de sesión

```text
Leé docs/mejora/STATUS.md y docs/mejora/sprints/D-observabilidad.md.
Implementá Sprint D. No agregues ads. Actualizá STATUS.md.
```

## Checklist

### Eventos en la landing
Implementar `track(event, props)` (Vercel Analytics custom, o capa que no rompa si falla).

Eventos mínimos:
- [x] `wa_click` (id del botón: header, hero, cta, footer, mobar, form fallback, tienda)  
- [x] `form_submit` (rubro, comuna, fuente si existe)  
- [x] `form_spam_blocked` (honeypot)  
- [x] `demo_open` (slug al click de card)  
- [x] `filter_use` (categoría)  
- [x] `plan_cta` (si hay botones por plan)  

### Vercel Insights
- [x] Confirmar script Insights sigue OK tras split de archivos (Sprint B)  
- [x] No duplicar si se migra a `@vercel/analytics`  

### Salud de demos
- [x] Script o checklist semanal: top 20 demos del portafolio (o todas si es barato)  
- [x] Salida: `docs/mejora/inventario-demos.md` o CI local  
- [x] Demos caídas → marcar en inventario / ocultar del grid  

## Definition of done
- [x] Clicks WA y submits visibles en analytics  
- [x] Proceso de uptime demos documentado  
- [x] `STATUS.md` → D done  

## Fuera de alcance
- Meta Pixel / Google Ads (Sprint F, solo con tracción)  
- Dashboard custom  

## Notas de implementación (2026-07-19)

- `website/app.js`: `window.va` queue + `track`/`dssTrack` → custom events; try/catch no-op si falla.
- WA ids: header, hero, cta, footer, mobar, form_fallback, tienda, retiro, retiro_footer.
- Insights: una sola etiqueta `/_vercel/insights/script.js` en `index.html` (sin npm `@vercel/analytics`).
- Uptime: `node scripts/check-demos-uptime.mjs` → `inventario-demos.md` + `uptime-last.json` (123/123 OK).
- Docs: [`../OBSERVABILIDAD.md`](../OBSERVABILIDAD.md).
- Smoke: `node scripts/smoke-d-observability.mjs`.
- Deploy: `cd website && vercel --prod --yes` (dss-chile); alias `dss-chile.vercel.app` reasignado.
