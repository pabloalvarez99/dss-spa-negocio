# Sprint 0 — Higiene base

**Estado:** ver [`../STATUS.md`](../STATUS.md)  
**Esfuerzo:** 1–2 días  
**Objetivo:** Repo confiable, docs alineados, demos inventariadas, menos riesgo legal basura.

## Prompt de sesión

```text
Leé docs/mejora/STATUS.md y docs/mejora/sprints/0-higiene.md.
Ejecutá el Sprint 0. Actualizá STATUS.md y los checklists al terminar.
No implementes Sprint A todavía.
```

## Checklist

### Git y estructura
- [ ] Primer commit(s) limpio(s) en `main` si aún no hay historial usable
- [ ] Remote privado configurado (si aplica)
- [ ] Confirmar que `_mirror/` sigue en `.gitignore` y no se edita como fuente
- [ ] `.obsidian/` en gitignore o fuera del repo si no debe versionarse

### Docs unificados
- [ ] Mover o copiar `website/ventas/*` → `docs/ventas/` (fuente de verdad)
- [ ] Dejar en `website/ventas/` solo un README que apunte a `docs/ventas/` **o** eliminar duplicado
- [ ] Actualizar `README.md` raíz (árbol + links) para que coincida con la realidad
- [ ] Actualizar links internos en `docs/negocio/PLAN.md` si apuntan a rutas viejas

### Inventario de demos
- [ ] Exportar lista de slugs desde `DEMOS` en `website/index.html`
- [ ] Verificar HTTP de una muestra representativa (idealmente todas) de URLs
  - Patrón: `https://{d}.pages.dev` o `https://{u}.vercel.app`
- [ ] Documentar resultado en `docs/mejora/inventario-demos.md` (crear):
  - slug · URL · status · acción (`ok` / `fix` / `retirar` / `anonimizar`)
- [ ] Listar demos prioritarias a retirar o anonimizar (dueños que pidan, links rotos)

### Legal mínimo operativo
- [ ] Definir texto de respuesta WhatsApp para “sacame del portafolio” (24 h)
- [ ] Anotar en `DECISIONES.md` si se acuerda el proceso

## Fuera de alcance
- Rediseño visual de la landing  
- Extraer CSS/JS  
- CRM completo  

## Definition of done
- [ ] Docs de ventas en una sola ruta canónica  
- [ ] README coherente  
- [ ] Inventario de demos creado  
- [ ] `STATUS.md` → Sprint 0 `done`, siguiente = A  

## Archivos típicos a tocar
- `README.md`
- `docs/ventas/*` (nuevo o movido)
- `website/ventas/*`
- `.gitignore`
- `docs/mejora/inventario-demos.md` (nuevo)
- `docs/mejora/STATUS.md`
