# Checklist go-live — cliente pago

Usar cuando el lead pasa a **`pago`** en el CRM. Orden sugerido; marcar en el Sheet o en notas del lead.

**Relacionado:** `docs/mejora/crm-schema.md` · `CONTRATO.md` · `TRANSFERENCIA.md` · `EXTRAS.md` · `docs/ventas/CHECKLIST.md`

---

## 0. Comercial (antes de publicar)

- [ ] Plan elegido (Presencia / Comercial / Pro) y monto
- [ ] Condiciones aceptadas (`CONTRATO.md` o confirmación por WhatsApp)
- [ ] Transferencia del primer mes **acreditada** (comprobante)
- [ ] CRM: `estado=pago`, `plan`, `monto`, `fecha_pago`
- [ ] Datos del negocio validados (checklist de ventas completo o parcial OK)

---

## 1. Dominio y URL

- [ ] ¿Subdominio temporal (`*.vercel.app` / similar) o dominio propio?
- [ ] Si dominio `.cl` / propio: cotizar según `EXTRAS.md` y configurar DNS
- [ ] DNS apuntando (A/CNAME) según host
- [ ] HTTPS OK al abrir en celular
- [ ] URL final anotada en CRM

---

## 2. WhatsApp y contacto

- [ ] Número WA correcto en botones y links `wa.me`
- [ ] Mensaje prearmado coherente (si aplica)
- [ ] Correo / redes del cliente revisados
- [ ] Prueba real: tap en celular → abre el chat correcto

---

## 3. Contenido y fotos

- [ ] Textos finales (sin placeholder de demo)
- [ ] Horarios y dirección correctos
- [ ] Fotos finales del cliente (o acuerdo de usar las de redes)
- [ ] Logo si existe (legible en móvil)
- [ ] Promociones vigentes (sin fechas vencidas)
- [ ] Mapa / link Maps OK

---

## 4. Plan y funcionalidad

| Ítem | Presencia | Comercial | Pro |
|------|:---------:|:---------:|:---:|
| Página + WA + horarios + mapa | sí | sí | sí |
| Catálogo / servicios / promos | — | sí | sí |
| Form / reservas / pedidos simples | — | — | sí |
| Cupo cambios mensuales comunicado | 5 | 10 | según plan |

- [ ] Nada prometido fuera del plan sin cotizar (`EXTRAS.md`)
- [ ] Links de delivery solo-enlace si el cliente lo pidió (no API)

---

## 5. Técnico

- [ ] Deploy de producción del sitio del cliente
- [ ] Revisión móvil y carga razonable
- [ ] Título de pestaña / favicon con nombre del negocio
- [ ] Si aplica portafolio ilustrativo: alinear con D005 / retiro

---

## 6. Entrega al cliente

- [ ] Enviar link final por WhatsApp
- [ ] Recordar: pago mensual anticipado, sin permanencia, cómo pedir cambios
- [ ] Indicar canal de soporte (WA DSS) y plazos SLA (`PLAN.md` §6)
- [ ] CRM `proximo_paso` = mantención / próximo cobro del mes siguiente

### Mensaje tipo

```text
Listo: su página ya está publicada.
Link: [URL]

Plan: [Presencia|Comercial|Pro] — $[monto] / mes
Sin permanencia. Para cambios (textos, fotos, horarios, promos) escríbame por este WhatsApp.

El próximo pago corresponde a [mes], anticipado por transferencia.
```
