# Decisiones de diseño / producto

Registrar aquí **decisiones estables** para que sesiones nuevas no reabran debates.

Formato: fecha · decisión · por qué · consecuencias.

---

## Producto y negocio

### D001 — Modelo demo gratis → mensualidad
- **Decisión:** No vender proyecto cerrado como default; vender presencia mantenida con demo gratis.
- **Por qué:** Baja fricción en negocios locales; alinea con ICP que ya vende por IG/WA.
- **Consecuencia:** Hay que limitar demos activas sin conversión y medir demo→pago.

### D002 — Tres planes fijos (no cotización opaca)
- **Precios CLP/mes:** Presencia 29.990 · Comercial 49.990 · Pro 79.990  
- **Fuente de verdad comercial:** `docs/negocio/PROPUESTA.md` y `PLAN.md`  
- **Extras siempre cotizados aparte:** pagos online, inventario, login, integraciones, foto pro, ads.

### D003 — No framework en la landing (por ahora)
- **Decisión:** Mantener HTML/CSS/JS estático en `website/` para el sitio comercial.
- **Por qué:** Conversión no mejora con React; ops y deploy ya son triviales.
- **Revisar si:** se necesita i18n, CMS multi-página o A/B server-side complejo.

### D004 — Fábrica de demos sí versionada (Sprint C)
- **Decisión:** Las demos de clientes no deben vivir solo “fuera del repo”; plantillas + `content.json` + build.
- **Hosting demos:** unificar a **una** plataforma (preferir subdominios bajo dominio propio cuando exista).
- **No:** 123 diseños únicos a mano.

### D005 — Portafolio: honestidad legal
- **Decisión:** Demos de terceros = ilustrativas; disclaimer obligatorio; proceso de retiro 24 h.
- **Meta:** ~70% genéricas / con permiso; no inflar “clientes” si son solo demos.

### D010 — Retiro de portafolio en 24 h (operativo)
- **Fecha:** 2026-07-19 (Sprint 0)
- **Decisión:** Si un dueño pide no figurar en el portafolio, se confirma por WhatsApp y se retira en **≤ 24 h hábiles**.
- **Texto canónico:** `docs/ventas/WHATSAPP.md` §8 (recepción + confirmación post-retiro).
- **Ops:** quitar de `DEMOS` → deploy `dss-chile` → bajar demo si aplica → marcar `retirar` en `docs/mejora/inventario-demos.md` → avisar al solicitante.
- **Por qué:** reduce riesgo reputacional/legal; alinea con D005.

### D006 — Copy orientado a Chile
- **Decisión:** Evitar voseo rioplatense en UI; preferir español chileno neutro o “usted” en pitch calle.
- **Ejemplos a corregir:** postulás → postula; Activá → Activa; vos → tú/usted según tono.

### D007 — Precios visibles en la web
- **Decisión:** Mostrar planes “desde $29.990” en la landing (Sprint A).
- **Por qué:** Leads fríos online desconfían si solo “te paso valores por WA”.
- **Demo sigue gratis** y sin compromiso.

### D008 — CRM simple antes que software custom
- **Decisión:** Notion o Google Sheet; no construir CRM propio en fase 0–2.
- **Estados mínimos:** contactado → demo → seguimiento → pago → perdido.

### D009 — Escala solo con tracción
- **Decisión:** Sprint F (ads, junior, QR barato, multi-región) solo con **≥8 clientes pagos**.
- **Por qué:** Sin unit economics medidos se quema tiempo y plata.

---

## Técnicas

### T001 — Root de deploy
- Vercel project **`dss-chile`**, directorio `website/`, URL `https://dss-chile.vercel.app`.
- GitHub: `pabloalvarez99/dss-spa-negocio` (privado, `main`).

### T002 — Lead capture
- Primario: `wa.me/56993649604` con texto prearmado.  
- Secundario: Web3Forms (`access_key` en cliente en `index.html`).  
- Draft form: `localStorage` key `dss-postulacion`.

### T003 — Catálogo portafolio
- Array `DEMOS` en `website/index.html`.  
- URL demo: `https://` + (`d.d` si existe, si no `d.u + '.vercel.app'`).  
- Thumb: `shots/{u}.jpg`.

### T004 — No commitear secretos
- Repo privado; no tokens, chats de clientes, RUT de terceros, fotos privadas sin consentimiento (ver README).

---

## Pendientes de decisión (no asumir)

| ID | Pregunta | Quién decide |
|----|----------|--------------|
| P001 | Dominio final de marca (¿dsschile.cl u otro?) | Pablo / SpA |
| P002 | Vercel vs Cloudflare Pages para **todas** las demos | Al hacer Sprint C |
| P003 | ¿CRM Notion o Google Sheet? | Al hacer Sprint E |
| P004 | ¿Publicar precios exactos o solo “desde $29.990”? | Preferencia: tabla completa (D007) |
