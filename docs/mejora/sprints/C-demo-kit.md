# Sprint C — Fábrica de demos (`demo-kit`)

**Estado:** ver [`../STATUS.md`](../STATUS.md)  
**Esfuerzo:** 2–4 semanas (partir en C1–C3)  
**Objetivo:** Demo enviable en ≤45 min con plantilla por rubro.  
**Este es el moat operativo del negocio.**

## Prompt de sesión

```text
Leé docs/mejora/STATUS.md, docs/mejora/DECISIONES.md (D004)
y docs/mejora/sprints/C-demo-kit.md.
Implementá solo el bloque C1 / C2 / C3 indicado.
Actualizá STATUS.md.
```

## Arquitectura objetivo

```text
demo-kit/
  templates/
    restaurant/
    barber/
    clinic/
    cabin/
    store/
    services/
  clients/
    {slug}/
      content.json
      assets/
  scripts/
    build-demo.mjs
    deploy.mjs
  README.md
```

- 1 layout base (WA float, mapa, SEO, mobile-first)  
- 6–8 skins por rubro  
- Contenido en JSON → build HTML estático → deploy  

---

## C1 — Scaffold + 1 template piloto

- [x] Crear `demo-kit/` con README de uso  
- [x] Template `restaurant` (o el rubro más vendido) funcional  
- [x] `content.json` schema documentado (nombre, WA, horarios, menú, colores, city, maps)  
- [x] `npm run build -- --slug=ejemplo` genera carpeta estática  
- [x] Preview local del output  

**Hecho 2026-07-19:** `demo-kit/` con layout compartido, `npm run build -- --slug=pizzeria-ejemplo`, preview en `http://127.0.0.1:8765/` (puerto libre), schema en `demo-kit/schema/content.schema.json` + README.

### Schema mínimo `content.json`
```json
{
  "slug": "pizzeria-ejemplo",
  "name": "Pizzería Ejemplo",
  "tagline": "Pizza al horno en Coquimbo",
  "phone_wa": "56912345678",
  "city": "Coquimbo",
  "address": "",
  "hours": [],
  "menu": [{ "name": "", "price": "", "desc": "" }],
  "colors": { "primary": "#6366F1" },
  "maps_url": "",
  "instagram": "",
  "images": []
}
```

## C2 — Multi-template + calidad

- [x] Al menos 4 templates de rubro  
- [x] Checklist “demo enviable” automatizable o en README:
  - [x] WA prearmado  
  - [x] Horarios + mapa  
  - [x] ≥3 fotos optimizadas  
  - [x] title/description con nombre  
  - [x] Sin lorem  
- [x] Tema visual distinto por rubro sin fork total del layout  

**Hecho 2026-07-19:** skins `restaurant` · `barber` · `clinic` · `services` (layout `_shared`); `npm run check -- --slug=…`; checklist en README. Fotos ≥3 son soft-check (pilotos sin assets OK).

## C3 — Deploy unificado

- [ ] Decidir plataforma única (actualizar `DECISIONES.md` P002)  
- [ ] Script deploy (Vercel CLI o Cloudflare Wrangler)  
- [ ] Convención de URL: `{slug}.…` o path bajo dominio propio  
- [ ] Registrar cada deploy en log o Sheet (link + fecha + cliente)  
- [ ] Documentar SLA interno alineado a `docs/negocio/PLAN.md`  

**Diferido:** P002 abierto; no multi-host en esta sesión.

## KPI del sprint
| Métrica | Meta |
|---------|------|
| Tiempo demo con template | ≤ 45 min |
| Templates listos | ≥ 4 rubros |
| Hosting | 1 sola convención de URL |

## Definition of done
- [x] Una persona puede **generar** demo con el README (publicar = C3 / P002)  
- [x] No hace falta clonar a mano un sitio viejo  
- [x] `STATUS.md` actualizado  

## Fuera de alcance
- Panel admin multi-tenant  
- IA full-auto sin revisión humana  
- Reemplazar la landing comercial  
