# Sprint E — Operación comercial

**Estado:** ver [`../STATUS.md`](../STATUS.md)  
**Esfuerzo:** 1–2 semanas (mucho es proceso, no solo código)  
**Objetivo:** Embudo medible; demos gratis no se pierden en el chat.  
**Relacionado:** `docs/negocio/PLAN.md`, `docs/ventas/*`.

## Prompt de sesión

```text
Leé docs/mejora/STATUS.md, docs/negocio/PLAN.md
y docs/mejora/sprints/E-ops-comercial.md.
Ejecutá Sprint E (CRM + plantillas de cierre). Actualizá STATUS.md.
Si pedís crear Sheet/Notion, dejá el esquema en docs/mejora/crm-schema.md.
```

## Checklist

### CRM mínimo
- [x] Elegir Notion **o** Google Sheet (anotar en `DECISIONES.md` P003) → **Google Sheet (D011)**  
- [x] Columnas:
  - negocio, rubro, comuna, encargado, WhatsApp, correo  
  - fuente (calle / web / referido)  
  - estado: `contactado | demo | seguimiento | pago | perdido`  
  - plan, monto, fecha contacto, fecha demo, fecha seguimiento, fecha pago  
  - link demo, notas, próximo paso  
- [x] Documentar esquema en `docs/mejora/crm-schema.md`  
- [x] Importar leads históricos si existen → **N/A** (sin export formal; Sheet en cero; no cargar portafolio ilustrativo como leads)

### Reglas de embudo
- [x] Seguimiento 48–72 h y 7 días (scripts ya en WHATSAPP.md) — documentado en `crm-schema.md` §3  
- [x] Límite de demos activas sin respuesta (sugerido: 15)  
- [x] A los 14 días sin respuesta: archivar o watermark “Demo expirada”  
- [x] Meta semanal de contactos/demos/pagos alineada al PLAN  

### Pack de cierre
- [x] PDF o MD exportable desde `PROPUESTA.md` (notas de export en el propio archivo)  
- [x] Datos de transferencia SpA (doc interno, **no** secretos en repo público) → `docs/negocio/TRANSFERENCIA.md`  
- [x] Contrato simple 1 página: incluye, no incluye, mensual anticipado, suspensión → `docs/negocio/CONTRATO.md`  
- [x] Checklist go-live: dominio, WA, fotos finales, horarios → `docs/negocio/CHECKLIST-GO-LIVE.md`  

### Extras (lista de precios internos)
Documentar en `docs/negocio/EXTRAS.md`:
- [x] Dominio `.cl` setup  
- [x] Sesión de fotos  
- [x] Catálogo grande  
- [x] Reservas / formularios  
- [x] Solo-links delivery (no API)  

## KPI
| Métrica | Meta |
|---------|------|
| demo → pago | ≥ 25% |
| lead → demo | ≤ 72 h en el 90% |

> Metas documentadas en `crm-schema.md` §5. **No inventar** tasas reales en el repo; medir en el Sheet.

## Definition of done
- [x] Todo lead nuevo entra al CRM el mismo día (regla en `crm-schema.md` + rutina diaria)  
- [x] Pack de cierre usable en WhatsApp/PDF  
- [x] `STATUS.md` → E done  

## Fuera de alcance
- Software de facturación propio  
- App de fuerza de ventas  
- Tocar `website/` o `demo-kit/` (sesión E solo docs)

## Entregables (2026-07-19)

| Archivo | Rol |
|---------|-----|
| `docs/mejora/crm-schema.md` | Esquema Sheet + reglas embudo + KPI |
| `docs/mejora/DECISIONES.md` | P003 resuelto · D011 |
| `docs/negocio/PROPUESTA.md` | Export notes + link pack |
| `docs/negocio/CONTRATO.md` | Contrato 1 pág. |
| `docs/negocio/TRANSFERENCIA.md` | Plantilla sin cuentas reales |
| `docs/negocio/CHECKLIST-GO-LIVE.md` | Go-live post-pago |
| `docs/negocio/EXTRAS.md` | Extras cotizables |
