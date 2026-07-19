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
- [x] Primer commit(s) limpio(s) en `main` si aún no hay historial usable
- [x] Remote privado configurado (si aplica)
- [x] Confirmar que `_mirror/` sigue en `.gitignore` y no se edita como fuente
- [x] `.obsidian/` en gitignore o fuera del repo si no debe versionarse

### Docs unificados
- [x] Mover o copiar `website/ventas/*` → `docs/ventas/` (fuente de verdad)
- [x] Dejar en `website/ventas/` solo un README que apunte a `docs/ventas/` **o** eliminar duplicado
- [x] Actualizar `README.md` raíz (árbol + links) para que coincida con la realidad
- [x] Actualizar links internos en `docs/negocio/PLAN.md` si apuntan a rutas viejas

### Inventario de demos
- [x] Exportar lista de slugs desde `DEMOS` en `website/index.html`
- [x] Verificar HTTP de una muestra representativa (idealmente todas) de URLs
  - Patrón: `https://{d}.pages.dev` o `https://{u}.vercel.app`
- [x] Documentar resultado en `docs/mejora/inventario-demos.md` (crear):
  - slug · URL · status · acción (`ok` / `fix` / `retirar` / `anonimizar`)
- [x] Listar demos prioritarias a retirar o anonimizar (dueños que pidan, links rotos)

### Legal mínimo operativo
- [x] Definir texto de respuesta WhatsApp para “sacame del portafolio” (24 h)
- [x] Anotar en `DECISIONES.md` si se acuerda el proceso

## Fuera de alcance
- Rediseño visual de la landing  
- Extraer CSS/JS  
- CRM completo  

## Definition of done
- [x] Docs de ventas en una sola ruta canónica  
- [x] README coherente  
- [x] Inventario de demos creado  
- [x] `STATUS.md` → Sprint 0 `done`, siguiente = A  

## Archivos típicos a tocar
- `README.md`
- `docs/ventas/*` (nuevo o movido)
- `website/ventas/*`
- `.gitignore`
- `docs/mejora/inventario-demos.md` (nuevo)
- `docs/mejora/STATUS.md`

## Notas de ejecución (2026-07-19)

- Remote: `origin` → `https://github.com/pabloalvarez99/dss-spa-negocio.git`
- `_mirror/` y `.obsidian/` en `.gitignore`
- Ventas canónicas en `docs/ventas/`; `website/ventas/README.md` solo redirige
- 123/123 demos HTTP 200; inventario en `docs/mejora/inventario-demos.md`
- WA retiro 24 h: `docs/ventas/WHATSAPP.md` §8 + decisión D010
- Sitio prod documentado: Vercel `dss-spa` → `https://dss-spa.vercel.app` (sin deploy en este sprint: no se tocó `index.html`)
