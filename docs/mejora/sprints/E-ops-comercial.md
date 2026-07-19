# Sprint E — Operación comercial

**Estado:** ver [`../STATUS.md`](../STATUS.md)  
**Esfuerzo:** 1–2 semanas (mucho es proceso, no solo código)  
**Objetivo:** Embudo medible; demos gratis no se pierden en el chat.  
**Relacionado:** `docs/negocio/PLAN.md`, `docs/ventas/*` o `website/ventas/*`.

## Prompt de sesión

```text
Leé docs/mejora/STATUS.md, docs/negocio/PLAN.md
y docs/mejora/sprints/E-ops-comercial.md.
Ejecutá Sprint E (CRM + plantillas de cierre). Actualizá STATUS.md.
Si pedís crear Sheet/Notion, dejá el esquema en docs/mejora/crm-schema.md.
```

## Checklist

### CRM mínimo
- [ ] Elegir Notion **o** Google Sheet (anotar en `DECISIONES.md` P003)  
- [ ] Columnas:
  - negocio, rubro, comuna, encargado, WhatsApp, correo  
  - fuente (calle / web / referido)  
  - estado: `contactado | demo | seguimiento | pago | perdido`  
  - plan, monto, fecha contacto, fecha demo, fecha seguimiento, fecha pago  
  - link demo, notas, próximo paso  
- [ ] Documentar esquema en `docs/mejora/crm-schema.md`  
- [ ] Importar leads históricos si existen  

### Reglas de embudo
- [ ] Seguimiento 48–72 h y 7 días (scripts ya en WHATSAPP.md)  
- [ ] Límite de demos activas sin respuesta (sugerido: 15)  
- [ ] A los 14 días sin respuesta: archivar o watermark “Demo expirada”  
- [ ] Meta semanal de contactos/demos/pagos alineada al PLAN  

### Pack de cierre
- [ ] PDF o MD exportable desde `PROPUESTA.md`  
- [ ] Datos de transferencia SpA (doc interno, **no** secretos en repo público)  
- [ ] Contrato simple 1 página: incluye, no incluye, mensual anticipado, suspensión  
- [ ] Checklist go-live: dominio, WA, fotos finales, horarios  

### Extras (lista de precios internos)
Documentar en `docs/negocio/EXTRAS.md`:
- [ ] Dominio `.cl` setup  
- [ ] Sesión de fotos  
- [ ] Catálogo grande  
- [ ] Reservas / formularios  
- [ ] Solo-links delivery (no API)  

## KPI
| Métrica | Meta |
|---------|------|
| demo → pago | ≥ 25% |
| lead → demo | ≤ 72 h en el 90% |

## Definition of done
- [ ] Todo lead nuevo entra al CRM el mismo día  
- [ ] Pack de cierre usable en WhatsApp/PDF  
- [ ] `STATUS.md` → E done  

## Fuera de alcance
- Software de facturación propio  
- App de fuerza de ventas  
