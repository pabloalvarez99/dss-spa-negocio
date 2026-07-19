# Estado de sprints — DSS Chile

> **Actualizar este archivo al cerrar cada sesión.**  
> Es la única fuente de “qué sigue” para no gastar tokens re-descubriendo.

Última actualización: 2026-07-19

## Sprint activo

| Campo | Valor |
|-------|--------|
| **Siguiente sprint** | `A` — Landing |
| **Archivo** | [`sprints/A-landing.md`](sprints/A-landing.md) |
| **Bloqueado por** | — |
| **Notas** | Sprint 0 cerrado; docs de ventas + inventario demos listos |

## Progreso

| Sprint | Estado | Fecha inicio | Fecha fin | Notas |
|--------|--------|--------------|-----------|-------|
| 0 Higiene | `done` | 2026-07-19 | 2026-07-19 | ventas→docs; 123 demos OK; WA retiro 24h |
| A Landing | `pending` | | | Depende de 0 en parte (docs paths) |
| B Performance | `pending` | | | Ideal después de A (menos conflictos en index.html) |
| C Demo-kit | `pending` | | | Puede ir en paralelo a B si hay sesión dedicada |
| D Observabilidad | `pending` | | | Después de A (eventos de form/WA) |
| E Ops comercial | `pending` | | | No es solo código; CRM/Sheet |
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
