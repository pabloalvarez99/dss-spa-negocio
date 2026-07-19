# Mejora continua — DSS Chile

Documentación del **análisis + ultraplan** para ejecutar sprints en sesiones nuevas **sin re-analizar el repo**.

| | |
|---|---|
| **Sitio** | https://dss-chile.vercel.app |
| **Código del sitio** | `website/index.html` (monolito HTML/CSS/JS) |
| **Plan de negocio** | [`docs/negocio/PLAN.md`](../negocio/PLAN.md) |
| **Propuesta al cliente** | [`docs/negocio/PROPUESTA.md`](../negocio/PROPUESTA.md) |
| **Scripts de venta** | `website/ventas/` *(pendiente unificar a `docs/ventas/` — Sprint 0)* |

---

## Cómo arrancar una sesión nueva (ahorro de tokens)

Copiá y pegá al inicio del chat:

```text
Leé docs/mejora/README.md y docs/mejora/STATUS.md.
Ejecutá solo el sprint indicado en STATUS.md (archivo del sprint).
No re-analices el repo completo salvo que el sprint lo pida.
Seguí los checklists del sprint y actualizá STATUS.md al terminar.
```

Si el sprint es concreto:

```text
Implementá docs/mejora/sprints/A-landing.md
Actualizá docs/mejora/STATUS.md al cerrar.
```

**Regla:** una sesión = un sprint (o un sub-bloque del sprint). No mezclar A + C en la misma corrida.

---

## Orden de ejecución

| Orden | Sprint | Archivo | Objetivo | Esfuerzo |
|------:|--------|---------|----------|----------|
| 0 | Higiene base | [`sprints/0-higiene.md`](sprints/0-higiene.md) | Git, docs, links, inventario demos | 1–2 días |
| A | Landing / conversión | [`sprints/A-landing.md`](sprints/A-landing.md) | Precios, copy CL, privacidad, form | ~1 sem |
| B | Performance | [`sprints/B-performance.md`](sprints/B-performance.md) | CSS/JS/JSON, WebP, LCP | 2–4 días |
| C | Fábrica de demos | [`sprints/C-demo-kit.md`](sprints/C-demo-kit.md) | Templates + CLI + deploy | 2–4 sem |
| D | Observabilidad | [`sprints/D-observabilidad.md`](sprints/D-observabilidad.md) | Eventos, uptime demos | 1–2 días |
| E | Operación comercial | [`sprints/E-ops-comercial.md`](sprints/E-ops-comercial.md) | CRM, contrato, límites demo | 1–2 sem |
| F | Escala (solo con 8+ pagos) | [`sprints/F-escala.md`](sprints/F-escala.md) | Dominio, referidos, cobro | mes 3–6 |

**Prioridad absoluta (si solo hay tiempo para 5 cosas):**

1. CRM + seguimiento de demos → Sprint E  
2. Plantillas por rubro → Sprint C  
3. Precios + privacidad + copy chileno → Sprint A  
4. Saneamiento legal del portafolio → Sprint 0 + A  
5. Dominio y correo propios SpA → Sprint F  

---

## Documentos de esta carpeta

| Archivo | Cuándo leerlo |
|---------|----------------|
| [`STATUS.md`](STATUS.md) | **Siempre** al abrir sesión |
| [`ANALISIS.md`](ANALISIS.md) | Solo si necesitás contexto/estrategia; no en cada sprint |
| [`DECISIONES.md`](DECISIONES.md) | Antes de proponer stack o cambios de modelo |
| [`sprints/*.md`](sprints/) | Solo el sprint activo |

---

## Qué no hacer (salvo decisión explícita)

- Migrar la landing a Next.js/React “porque sí”
- Multi-idioma
- CMS headless para un solo HTML
- Ads pesados sin CRM + unit economics
- Bajar precios a ~$15k
- Re-generar el análisis desde cero si estos docs están al día

---

## Estado actual del producto (snapshot)

- **Modelo:** demo gratis → mensualidad Presencia $29.990 / Comercial $49.990 / Pro $79.990  
- **Canal principal:** visita presencial + WhatsApp; form web → `wa.me` + Web3Forms  
- **Portafolio:** ~123 demos en `website/index.html` (`DEMOS`) + shots en `website/shots/`  
- **Host demos:** mezcla `*.vercel.app` y `*.pages.dev`  
- **Deploy comercial:** Vercel proyecto `dss-chile`, root `website/`  
- **Git:** al momento del plan, historial frágil / sin commits estables — ver Sprint 0  
