# Mejora continua — DSS Chile

Documentación del **análisis + ultraplan** para ejecutar sprints en sesiones nuevas **sin re-analizar el repo**.

| | |
|---|---|
| **Sitio** | https://dss-chile.vercel.app |
| **Código del sitio** | `website/` (`index.html` + `styles.css` + `app.js` + `demos.json`) |
| **Fábrica demos** | [`demo-kit/`](../../demo-kit/README.md) |
| **Plan de negocio** | [`docs/negocio/PLAN.md`](../negocio/PLAN.md) |
| **Propuesta al cliente** | [`docs/negocio/PROPUESTA.md`](../negocio/PROPUESTA.md) |
| **Scripts de venta** | [`docs/ventas/`](../ventas/) |
| **Estado sprints** | **0–E done** · F blocked · ver [`STATUS.md`](STATUS.md) |

---

## Cómo arrancar una sesión nueva (ahorro de tokens)

```text
Leé docs/mejora/STATUS.md (y este README si hace falta).
Trabajá SOLO lo que diga STATUS (residual o sprint).
No re-analices el repo. Actualizá STATUS al cerrar. Commit + push main.
```

### Después de 0–E (estado actual)

No hay sprint de código pendiente formal. Opciones útiles:

```text
Leé docs/mejora/STATUS.md sección Residuales.
Ejecutá solo: [montar Sheet CRM | C3/P002 | testimonios | uptime demos].
No abras Sprint F sin ≥8 clientes pagos.
```

**Sprint F** (solo con tracción): [`sprints/F-escala.md`](sprints/F-escala.md)

**Regla:** una sesión = un residual o un sprint. No mezclar demo-kit + landing + CRM en la misma corrida sin necesidad.

---

## Orden de ejecución

| Orden | Sprint | Estado | Archivo |
|------:|--------|--------|---------|
| 0 | Higiene base | **done** | [`sprints/0-higiene.md`](sprints/0-higiene.md) |
| A | Landing / conversión | **done** | [`sprints/A-landing.md`](sprints/A-landing.md) |
| B | Performance | **done** | [`sprints/B-performance.md`](sprints/B-performance.md) |
| C | Fábrica de demos | **done** (C3 diferido) | [`sprints/C-demo-kit.md`](sprints/C-demo-kit.md) |
| D | Observabilidad | **done** | [`sprints/D-observabilidad.md`](sprints/D-observabilidad.md) |
| E | Operación comercial | **done** | [`sprints/E-ops-comercial.md`](sprints/E-ops-comercial.md) |
| F | Escala | **blocked** | [`sprints/F-escala.md`](sprints/F-escala.md) |

**Prioridad ahora (ops, no F):**

1. Montar y usar Google Sheet CRM ([`crm-schema.md`](crm-schema.md))  
2. Generar demos con `demo-kit/` en campo real  
3. Decidir P002 (host unificado demos) cuando duela el caos Vercel/Pages  
4. Dominio/correo SpA cuando haya tracción → Sprint F  

---

## Documentos de esta carpeta

| Archivo | Cuándo leerlo |
|---------|----------------|
| [`STATUS.md`](STATUS.md) | **Siempre** al abrir sesión |
| [`ANALISIS.md`](ANALISIS.md) | Solo si hace falta contexto/estrategia |
| [`DECISIONES.md`](DECISIONES.md) | Antes de proponer stack o cambios de modelo |
| [`crm-schema.md`](crm-schema.md) | Columnas y reglas del Sheet CRM (Sprint E) |
| [`OBSERVABILIDAD.md`](OBSERVABILIDAD.md) | Analytics + uptime demos (Sprint D) |
| [`inventario-demos.md`](inventario-demos.md) | Último chequeo HTTP del portafolio |
| [`sprints/*.md`](sprints/) | Solo si reabrís un sprint / residual |

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
- **Canal:** presencial + WhatsApp; form → `wa.me` + Web3Forms + Analytics  
- **Landing:** `website/` split (HTML/CSS/JS/JSON) + WebP; planes, privacidad, form anti-spam  
- **Portafolio:** 123 demos en `demos.json` + `shots/`; uptime script en `scripts/`  
- **Demo-kit:** 4 templates (restaurant, barber, clinic, services) + build CLI  
- **Ops:** pack cierre en `docs/negocio/`; CRM schema listo (Sheet por montar)  
- **Deploy comercial:** Vercel `dss-chile` → https://dss-chile.vercel.app  
- **Git:** `main` en GitHub privado `pabloalvarez99/dss-spa-negocio`
