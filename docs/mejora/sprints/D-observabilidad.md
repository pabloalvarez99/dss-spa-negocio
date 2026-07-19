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
- [ ] `wa_click` (id del botón: header, hero, cta, footer, mobar, form fallback, tienda)  
- [ ] `form_submit` (rubro, comuna, fuente si existe)  
- [ ] `form_spam_blocked` (honeypot)  
- [ ] `demo_open` (slug al click de card)  
- [ ] `filter_use` (categoría)  
- [ ] `plan_cta` (si hay botones por plan)  

### Vercel Insights
- [ ] Confirmar script Insights sigue OK tras split de archivos (Sprint B)  
- [ ] No duplicar si se migra a `@vercel/analytics`  

### Salud de demos
- [ ] Script o checklist semanal: top 20 demos del portafolio (o todas si es barato)  
- [ ] Salida: `docs/mejora/inventario-demos.md` o CI local  
- [ ] Demos caídas → marcar en inventario / ocultar del grid  

## Definition of done
- [ ] Clicks WA y submits visibles en analytics  
- [ ] Proceso de uptime demos documentado  
- [ ] `STATUS.md` → D done  

## Fuera de alcance
- Meta Pixel / Google Ads (Sprint F, solo con tracción)  
- Dashboard custom  
