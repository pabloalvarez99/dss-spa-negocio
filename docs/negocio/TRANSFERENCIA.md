# Datos de transferencia — plantilla interna SpA

**Uso:** copiar a nota privada / mensaje WA al cliente **solo al cerrar**.  
**Repo:** plantilla **sin** números de cuenta reales, secretos ni credenciales bancarias (T004).

Completar los campos en un archivo **fuera del git** o en el gestor de contraseñas de la SpA (p. ej. `TRANSFERENCIA.local.md` en `.gitignore` si se guarda en el PC).

---

## Plantilla para el cliente (WhatsApp / PDF)

```text
Datos para transferencia — DSS Chile
Desarrollo de Software y Sistemas SpA
RUT: 78.392.075-1

Banco: [COMPLETAR — ej. Banco Estado / BCI / …]
Tipo de cuenta: [COMPLETAR — corriente / vista]
Número de cuenta: [COMPLETAR — no en repo]
Nombre: Desarrollo de Software y Sistemas SpA
RUT titular: 78.392.075-1
Correo para comprobante: contactodssspa@gmail.com

Monto: $[MONTO PLAN] CLP
Glosa / asunto: [Plan Presencia|Comercial|Pro] — [NOMBRE NEGOCIO] — [MES/AÑO]

Al transferir, envíeme el comprobante por este WhatsApp.
```

---

## Checklist interno al pedir el pago

- [ ] Plan y monto confirmados por escrito
- [ ] Contrato / condiciones aceptadas (CONTRATO.md o OK por WA)
- [ ] Enviar solo datos de cuenta desde fuente privada (no desde este archivo vacío)
- [ ] Registrar en CRM: `estado=pago`, `plan`, `monto`, `fecha_pago` al acreditar
- [ ] No pegar capturas de cartola ni CVV/claves en el repo ni en issues públicos

---

## Qué sí puede vivir en el repo

| Dato | ¿En repo? |
|------|-----------|
| Razón social y RUT SpA | Sí (ya públicos en PLAN/PROPUESTA) |
| Correo comercial | Sí |
| Número de cuenta / dígitos completos | **No** |
| Usuario/clave banca o app | **No** |
| Comprobantes de clientes | **No** |

---

## Relacionado

- Condiciones de pago: `CONTRATO.md`, `PROPUESTA.md`
- Go-live tras pago: `CHECKLIST-GO-LIVE.md`
- CRM: `docs/mejora/crm-schema.md`
