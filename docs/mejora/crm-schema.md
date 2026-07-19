# Esquema CRM — DSS Chile

**Decisión:** Google Sheet (P003 / D011).  
**Fuente de verdad del proceso:** este archivo + `docs/negocio/PLAN.md` + scripts en `docs/ventas/`.  
**No commitear** el Sheet con datos reales de clientes (RUT, chats, fotos privadas). El repo solo guarda el **esquema** y las reglas.

---

## 1. Herramienta

| Campo | Valor |
|-------|--------|
| Herramienta | **Google Sheet** (una hoja principal + vistas filtradas) |
| Nombre sugerido | `DSS Chile — CRM leads` |
| Dueño | SpA / Pablo |
| Acceso | solo operador comercial (no compartir link público) |
| Alternativa descartada | Notion (mejor notas, peor para KPI numéricos rápidos en calle) |

### Cómo montarlo (una vez)

1. Crear Sheet en Drive privado de la SpA.
2. Primera pestaña: `Leads` con la fila 1 = encabezados de la sección 2.
3. Segunda pestaña: `Metas` (sección 4) y `KPI` (sección 5).
4. Validación de datos en `estado` y `fuente` (listas fijas).
5. Filtro de vistas: “Demos activas”, “Seguimiento hoy”, “Pagos del mes”, “Perdidos 14d+”.

---

## 2. Columnas (pestaña `Leads`)

Orden canónico. Nombres exactos para no divergir entre sesiones.

| # | Columna | Tipo | Valores / notas |
|---|---------|------|-----------------|
| A | `negocio` | texto | Nombre comercial del local |
| B | `rubro` | texto | restó, farmacia, barbería, etc. |
| C | `comuna` | texto | Coquimbo, La Serena, … |
| D | `encargado` | texto | Persona de contacto |
| E | `whatsapp` | texto | +56 9… (sin espacios o con; consistente) |
| F | `correo` | texto | opcional |
| G | `fuente` | enum | `calle` · `web` · `referido` |
| H | `estado` | enum | `contactado` · `demo` · `seguimiento` · `pago` · `perdido` |
| I | `plan` | enum/texto | `Presencia` · `Comercial` · `Pro` · vacío |
| J | `monto` | número CLP | 29990 / 49990 / 79990 o vacío |
| K | `fecha_contacto` | fecha | Primer contacto / visita |
| L | `fecha_demo` | fecha | Envío del link de demo |
| M | `fecha_seguimiento` | fecha | Próximo o último follow-up programado |
| N | `fecha_pago` | fecha | Primer pago (solo estado `pago`) |
| O | `link_demo` | URL | Link público de la demo |
| P | `notas` | texto largo | Contexto, objeciones, acuerdos |
| Q | `proximo_paso` | texto | Acción concreta + fecha si aplica |

### Columnas opcionales (no obligatorias Sprint E)

| Columna | Uso |
|---------|-----|
| `id` | UUID o correlativo |
| `direccion` | Calle/número |
| `fecha_archivo` | Cuando pasó a `perdido` o demo expirada |
| `demo_expirada` | `sí` / `no` (14 días sin respuesta) |
| `origen_detalle` | post, referido por X, etc. |

### Estados — definición

| Estado | Significa | Cuándo pasar |
|--------|-----------|--------------|
| `contactado` | Datos tomados; aún no hay demo enviada | Checklist / visita / form web |
| `demo` | Link de demo enviado | Al mandar WA con link |
| `seguimiento` | En ciclo de follow-up (48–72 h / 7 d) | Tras primer o segundo ping sin cierre |
| `pago` | Mensualidad activa (primer pago recibido) | Transferencia confirmada |
| `perdido` | No sigue; archivado | 14 d sin respuesta, rechazo explícito, o fuera de ICP |

Regla: un lead **nuevo del día** debe figurar en el Sheet **el mismo día** (Definition of done del Sprint E).

---

## 3. Reglas de embudo

Alineadas a `docs/negocio/PLAN.md` §5–6 y scripts en `docs/ventas/WHATSAPP.md`.

### 3.1 Seguimientos obligatorios

| Hito | Plazo desde envío demo | Script | Acción en CRM |
|------|------------------------|--------|---------------|
| Follow-up 1 | **48–72 h** | WHATSAPP.md §3 | `estado` → `seguimiento`; actualizar `fecha_seguimiento` y `proximo_paso` |
| Follow-up 2 | **7 días** | WHATSAPP.md §4 | Registrar nota; programar decisión 14 d |
| Archivo / expiración | **14 días** sin respuesta útil | — | `estado` → `perdido`; opcional watermark “Demo expirada” o despublicar |

- No spamear: máximo **2 follow-ups** automáticos + 1 cierre suave en el día 14.
- Si responde con interés: volver a `demo` o `seguimiento` con `proximo_paso` claro (ajuste / cierre).
- Si paga: `pago` + `fecha_pago` + `plan` + `monto`.

### 3.2 Límite de demos activas sin respuesta

| Regla | Valor |
|-------|------:|
| Máximo demos en `demo` o `seguimiento` **sin respuesta del prospecto** | **~15** |
| Si se llega al tope | No armar demos nuevas frías; priorizar follow-ups y cierres |
| Excepción | Referido caliente o visita presencial con datos completos |

“Sin respuesta” = sin mensaje del cliente después del envío del link (ni “lo veo”, ni ajustes pedidos).

### 3.3 Expiración a 14 días

1. Marcar `estado = perdido` (o mantener fila y `demo_expirada = sí`).
2. En notas: `expirada 14d — YYYY-MM-DD`.
3. Ops técnica (cuando aplique): watermark “Demo expirada” o bajar el deploy de la demo (no bloquea el registro CRM).
4. No borrar la fila: sirve para medir tasa demo→pago y no re-contactar a ciegas.

### 3.4 Metas semanales (desde PLAN, validación 4–6 semanas)

El PLAN fija metas de **validación** (primeras 4–6 semanas). Traducción **semanal** operativa (aprox. /6 semanas):

| Métrica PLAN (4–6 sem) | Meta total | Meta semanal orientativa |
|------------------------|----------:|-------------------------:|
| Negocios visitados / contactados | 50 | **~8–12** |
| Interesados (datos tomados) | 15 | **~3** |
| Demos enviadas | 10 | **~2** |
| Clientes pagos | 2–4 | **~0,5–1** (acumulado) |
| Tasa demo → pago (PLAN) | ≥ 20–40% | ver KPI Sprint E abajo |

Metas de **roadmap 90 días** (PLAN §9) — no son semanales fijas, pero guían el ritmo:

| Fase | Contactos / demos / pagos |
|------|---------------------------|
| Días 1–14 | 20 visitas · 5 demos |
| Días 15–45 | 50 contactos · 10 demos · 2–4 pagos |
| Días 46–90 | 8–12 clientes pagos · referidos · onboarding |

Cargar la pestaña `Metas` del Sheet con la semana ISO y check de cumplimiento (sí/no).

---

## 4. Pestaña `Metas` (ejemplo)

| semana | contactos_meta | contactos_real | demos_meta | demos_real | pagos_meta | pagos_real | notas |
|--------|---------------:|---------------:|-----------:|-----------:|-----------:|-----------:|-------|
| 2026-W29 | 10 | | 2 | | 0 | | |

---

## 5. KPI (metas documentadas — no inventar datos reales)

Valores objetivo del **Sprint E**. Medir en el Sheet; **no rellenar números inventados** en el repo.

| KPI | Definición | Meta |
|-----|------------|------|
| **demo → pago** | `# estado=pago` con `fecha_demo` no vacía ÷ `# con fecha_demo` (en ventana definida, p. ej. últimos 90 d, excl. demos &lt;14 d aún abiertas) | **≥ 25%** |
| **lead → demo** | Tiempo `fecha_demo − fecha_contacto`; % de leads con demo en ≤ **72 h** | **≤ 72 h en el 90%** de los leads que reciben demo |

Notas de medición:

- Un lead en `contactado` sin demo aún **no** entra al denominador de demo→pago.
- Rechazo explícito el mismo día de la demo cuenta como demo enviada y no-pago (baja la tasa; es honesto).
- El PLAN menciona 20–40% demo→pago como rango de validación; el KPI operativo de Sprint E fija el piso en **25%**.

### Fórmulas orientativas (Google Sheet)

```text
// demo → pago (ejemplo, ajustar rangos)
=COUNTIFS(H:H;"pago";L:L;">="&FECHA(2026;1;1)) / COUNTIF(L:L;">="&FECHA(2026;1;1))

// lead → demo en 72 h: columna auxiliar horas = (L-K)*24
// % con horas<=72 sobre filas con L no vacío
```

---

## 6. Importar leads históricos

| Situación | Acción |
|-----------|--------|
| No hay export formal de leads previos | **N/A** en Sprint E: empezar Sheet en cero el día de go-live del CRM |
| Hay chats WA / notas sueltas | Cargar solo leads **aún abiertos** (demo viva o seguimiento &lt;14 d); no rescatar todo el historial de demos del portafolio |
| Portafolio de demos ilustrativas | **No** son leads CRM por defecto (D005); solo si hubo contacto real de venta |

---

## 7. Rutina diaria (checklist operador)

- [ ] Cargar leads nuevos del día (calle / web / referido) → `contactado`
- [ ] Enviar demos pendientes → `demo` + `fecha_demo` + `link_demo`
- [ ] Ejecutar follow-ups 48–72 h y 7 d → actualizar `fecha_seguimiento` / `proximo_paso`
- [ ] Archivar 14 d sin respuesta → `perdido`
- [ ] Contar demos activas sin respuesta; si ≥15, frenar demos frías
- [ ] Si hubo pago: `pago` + plan + monto + fecha; armar go-live (`docs/negocio/CHECKLIST-GO-LIVE.md`)

---

## 8. Documentos del pack de cierre

| Doc | Ruta |
|------|------|
| Propuesta exportable | `docs/negocio/PROPUESTA.md` (+ notas de export abajo en PROPUESTA) |
| Contrato 1 pág. | `docs/negocio/CONTRATO.md` |
| Datos transferencia (plantilla) | `docs/negocio/TRANSFERENCIA.md` |
| Checklist go-live | `docs/negocio/CHECKLIST-GO-LIVE.md` |
| Extras / cotización | `docs/negocio/EXTRAS.md` |
| Scripts WA / pitch | `docs/ventas/*` |
