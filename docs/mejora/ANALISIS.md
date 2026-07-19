# Análisis del proyecto — DSS Chile

Snapshot estratégico. **No re-generar** salvo cambio de modelo de negocio o arquitectura.  
Para ejecutar trabajo: usar [`STATUS.md`](STATUS.md) + sprint activo.

---

## 1. Qué es

**Máquina de captación y venta de presencia web mantenida** para negocios locales (Coquimbo–La Serena):

1. Demo gratis con datos reales del negocio  
2. Conversión a plan mensual (hosting, cambios, soporte)  
3. Relación recurrente; no proyecto one-shot de agencia  

**No es (todavía):** SaaS multi-tenant, generador automático en producción, ni agencia full-service.

Empresa: Desarrollo de Software y Sistemas SpA · RUT 78.392.075-1 · Coquimbo.

---

## 2. Anatomía del repo

| Ruta | Rol |
|------|-----|
| `website/` | Landing estática deploy Vercel (`index.html` ~85 KB, monolito) |
| `website/shots/` | ~123 previews JPG del portafolio (~5 MB total) |
| `website/ventas/` | Scripts de campo (checklist, WA, correo, pitch) |
| `docs/negocio/` | PLAN + PROPUESTA comercial |
| `docs/mejora/` | Este ultraplan y sprints |
| `_mirror/` | Copia local del sitio (`.gitignore`); no editar como fuente |

**Stack landing:** HTML + CSS + JS vanilla · Vercel · Web3Forms · WhatsApp · Schema.org · PWA light · Vercel Insights.

**Ausente hoy:** framework, tests, CI, CRM, generador de demos versionado, dominio propio marca, analytics de embudo, pipeline onboarding.

---

## 3. Fortalezas

- Oferta clara: “no pagás antes de ver”  
- Confianza SpA (RUT, sello legal)  
- CTA WhatsApp en todo el funnel  
- Portafolio hiper-local (misma zona que el ICP)  
- Disclaimer de demos ilustrativas  
- Form con draft `localStorage` + backup Web3Forms  
- Mobile-first, a11y básica (skip, reduced-motion)  
- Docs de negocio + scripts de objeción  
- Precios sin permanencia  

---

## 4. Riesgos y deudas

### A. Legal / reputación (alto)
Demos con nombres y datos de negocios reales sin contrato. Disclaimer mitiga, no elimina.  
**Mitigar:** takedown 24h, más plantillas genéricas, casos reales solo con permiso.

### B. Expectativas vs plan (medio-alto)
“100+ demos”, showcase e-commerce (`tu-farmacia.cl`), Schema con tienda online → puede atraer pedidos fuera del plan $29.990–$79.990.  
PLAN ya dice: no prometer ERP/pagos/inventario dentro de la mensualidad baja.

### C. Operación (crítico)
Demo 2–4 h manual, sin templates en este repo, demos en Vercel + Pages, sin CRM.  
Conversión baja quema margen.

### D. Monolito técnico
Un solo `index.html` (CSS + 123 demos + lógica) dificulta A/B, PRs y performance.

### E. Marca / mercado
- Voseo (“postulás”, “vos”) vs audiencia chilena  
- Precios no visibles en la web  
- Dominio `*.vercel.app` y mail Gmail  
- README desalineado (`docs/ventas/` vs `website/ventas/`)  

### F. Seguridad / higiene
- Access key Web3Forms en cliente (esperado del servicio; falta honeypot)  
- Historial git frágil al documentar el plan  

---

## 5. Unit economics (referencia del PLAN)

| Concepto | Valor |
|----------|------:|
| Costo variable hosting/demo | ~$0–$10.000/mes |
| Tiempo demo | 2–4 h (meta con fábrica: ≤45 min) |
| Mantención Presencia | 30–60 min/mes |
| Mantención Comercial/Pro | 1–3 h/mes |
| Meta mes 1–2 | 2–4 pagos |
| Meta mes 3–4 | 8–12 pagos |
| ARPU mix referencial | ~$50.000 |

Embudo validación 4–6 semanas: 50 contactos → 15 interesados → 10 demos → 2–4 pagos (demo→pago meta 20–40%).

---

## 6. Mapa hoy → ideal (90 días)

| Hoy | Ideal |
|-----|--------|
| Landing + scripts | Landing + precios + privacidad + dominio .cl |
| 123 demos dispersas | 8 plantillas/rubro + ~12 casos con permiso |
| Leads en WhatsApp caótico | CRM (Notion/Sheet) + estados |
| Demo artesanal 2–4 h | Demo &lt; 45 min |
| Cobro ad-hoc | Anticipado + recordatorio + suspensión |
| Sin métricas de embudo | visitas → leads → demos → pagos |

---

## 7. Prioridad absoluta

1. CRM + seguimiento de cada demo  
2. Plantillas por rubro (fábrica)  
3. Precios + privacidad + copy chileno en web  
4. Saneamiento legal del portafolio  
5. Dominio y correo propios SpA  

Detalle de ejecución → [`sprints/`](sprints/) · estado → [`STATUS.md`](STATUS.md).
