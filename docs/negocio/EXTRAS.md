# Extras — lista de precios / alcance interno

**Uso:** cotizar fuera de la mensualidad base. No son promesas de la landing.  
**Fuente de planes base:** `PROPUESTA.md` / `PLAN.md` (D002).  
**Regla:** si no está en el plan, se cotiza por escrito antes de hacer el trabajo.

Montos en CLP. Rangos orientativos para Coquimbo–La Serena; ajustar por complejidad.  
**No inventar** un precio cerrado al cliente sin revisar el caso.

---

## 1. Dominio `.cl` (setup)

| Ítem | Qué incluye | Referencia de cobro |
|------|-------------|---------------------|
| Registro / renovación dominio `.cl` | Gestión del registro a nombre del cliente o SpA según acuerdo | Costo registrador (NIC Chile / reseller) **+** fee setup **una vez** |
| Setup DNS + HTTPS | Apuntar a hosting de la web, SSL, prueba móvil | Incluido en setup de dominio o 0,5–1 h de trabajo |
| Dominio en plan Pro | Puede **incluirse** el primer año o el setup según negociación (PLAN §3.3) | Anotar en CRM `notas` qué quedó incluido |

### Pasos ops (resumen)

1. Elegir nombre con el cliente (evitar marcas ajenas).
2. Registrar / transferir.
3. DNS → host de la demo/producción.
4. Verificar HTTPS y WhatsApp en el dominio final.
5. Marcar en go-live (`CHECKLIST-GO-LIVE.md`).

**Pendiente de marca SpA:** P001 (dominio comercial DSS). No bloquea dominios de clientes.

---

## 2. Sesión de fotos

| Ítem | Qué incluye | Referencia de cobro |
|------|-------------|---------------------|
| Sesión básica local | 1 visita, 15–30 fotos útiles (local, productos, equipo) | Cotizar por sesión (fijo) |
| Selección + compresión web | Elegir 8–15 y optimizar para móvil | Suele ir en el mismo pack |
| Retoque avanzado / estudio | Fuera de alcance default | Cotizar aparte o derivar |

**Default del plan:** el cliente aporta fotos o se usan las públicas de redes/Google con su OK.  
Foto profesional **no** está en Presencia/Comercial/Pro.

---

## 3. Catálogo grande

| Umbral | Tratamiento |
|--------|-------------|
| Hasta ~15–20 ítems simples | Cabe en **Comercial** si es listado estático (nombre, precio, foto, nota) |
| Catálogo grande (decenas/cientos, muchas variantes) | **Extra:** diseño de grilla + carga por lotes o estructura acordada |
| Stock en tiempo real / SKU / bodega | **No incluido** — desarrollo aparte (PLAN §3.3) |

Referencia de cobro catálogo grande: precio fijo por tramo (ej. hasta 50 / hasta 100 ítems) o horas.  
Actualizaciones masivas mensuales fuera de cupo de cambios = extra o plan superior.

---

## 4. Reservas / formularios

| Nivel | Dónde cae | Notas |
|-------|-----------|--------|
| Formulario simple (nombre, fecha, mensaje → WA o correo) | Plan **Pro** | Sin panel admin complejo |
| Reserva con calendario / cupos / pagos de seña | **Extra** o proyecto | Cotizar alcance |
| Integración agenda externa (Calendly, etc.) | Link embebido o botón | Puede ser Pro o extra menor |

No prometer “sistema de reservas hospitalario” dentro de la mensualidad baja.

---

## 5. Solo-links delivery (no API)

| Ítem | Qué es | Qué no es |
|------|--------|-----------|
| Botones PedidosYa / Uber Eats / Rappi / WhatsApp pedidos | Links o deep-links que el cliente entrega | Integración API, menú sincronizado, comisiones platform |
| Incluido | Suele ser cambio simple (1–3 botones) dentro del cupo del plan | — |
| Extra | Diseño de sección “Pide aquí” con varios links + textos | Si pide tracking de pedidos o stock desde la app del delivery |

**Regla comercial:** siempre “solo links”; nunca prometer conexión automática con la app del delivery.

---

## 6. Otros extras frecuentes (recordatorio PLAN)

| Extra | Notas |
|-------|--------|
| Pagos online / pasarela | Proyecto aparte |
| Inventario / stock live | Proyecto aparte |
| Login usuarios / panel admin | Proyecto aparte |
| Integraciones SII, ERP, multi-sucursal | Fuera de fase 0–2 |
| Publicidad Meta/Google | No incluida; se puede asesorar o cotizar gestión |
| Redacción avanzada | Copy largo / SEO de contenidos = horas |

---

## 7. Cómo cotizar (plantilla corta WA)

```text
Eso no viene en el plan [Presencia|Comercial|Pro].
Lo puedo hacer como extra:
- Alcance: [1–2 líneas]
- Plazo: [X días hábiles]
- Valor: $[monto] CLP (pago único / o cuotas)

Si le acomoda, lo dejamos por escrito y lo agendo.
```

Registrar en CRM (`notas` / `proximo_paso`) el extra ofrecido y si se aceptó.

---

## 8. Relacionado

- Planes y “no incluido”: `PROPUESTA.md`, `PLAN.md` §3.3  
- Contrato: `CONTRATO.md`  
- Go-live: `CHECKLIST-GO-LIVE.md`  
- Embudo / CRM: `docs/mejora/crm-schema.md`  
