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

- [ ] Crear `demo-kit/` con README de uso  
- [ ] Template `restaurant` (o el rubro más vendido) funcional  
- [ ] `content.json` schema documentado (nombre, WA, horarios, menú, colores, city, maps)  
- [ ] `npm run build -- --slug=ejemplo` genera carpeta estática  
- [ ] Preview local del output  

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

- [ ] Al menos 4 templates de rubro  
- [ ] Checklist “demo enviable” automatizable o en README:
  - [ ] WA prearmado  
  - [ ] Horarios + mapa  
  - [ ] ≥3 fotos optimizadas  
  - [ ] title/description con nombre  
  - [ ] Sin lorem  
- [ ] Tema visual distinto por rubro sin fork total del layout  

## C3 — Deploy unificado

- [ ] Decidir plataforma única (actualizar `DECISIONES.md` P002)  
- [ ] Script deploy (Vercel CLI o Cloudflare Wrangler)  
- [ ] Convención de URL: `{slug}.…` o path bajo dominio propio  
- [ ] Registrar cada deploy en log o Sheet (link + fecha + cliente)  
- [ ] Documentar SLA interno alineado a `docs/negocio/PLAN.md`  

## KPI del sprint
| Métrica | Meta |
|---------|------|
| Tiempo demo con template | ≤ 45 min |
| Templates listos | ≥ 4 rubros |
| Hosting | 1 sola convención de URL |

## Definition of done
- [ ] Una persona puede generar y publicar demo con el README  
- [ ] No hace falta clonar a mano un sitio viejo  
- [ ] `STATUS.md` actualizado  

## Fuera de alcance
- Panel admin multi-tenant  
- IA full-auto sin revisión humana  
- Reemplazar la landing comercial  
