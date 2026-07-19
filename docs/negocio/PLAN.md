# Plan de negocio — DSS Chile

**Empresa:** Desarrollo de Software y Sistemas SpA  
**RUT:** 78.392.075-1  
**Representante:** Pablo Bastián Figueroa Álvarez  
**Base:** Coquimbo, Región de Coquimbo  
**Sitio comercial:** https://dss-chile.vercel.app  

---

## 1. Idea central

No vendemos “una página web”. Vendemos **presencia digital mantenida** para negocios locales chilenos:

1. Demo gratis con datos reales del negocio.
2. Conversión a plan mensual (hosting, dominio, cambios, soporte).
3. Relación de largo plazo: el cliente no depende de agencias caras ni de freelancers que desaparecen.

El diferenciador es simple: **el cliente no paga antes de ver**. Primero recibe un link funcionando con su negocio.

---

## 2. Cliente ideal (ICP)

### Perfil prioritario

Negocios locales con venta real y poca o mala presencia web:

| Segmento | Por qué convierte |
|---|---|
| Restaurantes, cafés, comida rápida | Menú + WhatsApp + horarios = pedido inmediato |
| Farmacias independientes | Catálogo, despacho, cotización de recetas |
| Barberías, estética, belleza | Servicios, precios, reservas por WhatsApp |
| Minimarkets y tiendas de barrio | Horarios, ubicación, promociones |
| Talleres y oficios | Confianza, mapa, contacto directo |
| Clínicas y consultas pequeñas | Agenda simple, ubicación, profesionalismo |
| Gimnasios y entrenadores | Planes, horarios, captación local |
| Cabañas / turismo local | Galería, ubicación, reserva por WhatsApp |
| Inmobiliarias chicas | Listados simples, contacto |
| Tiendas de ropa / retail | Catálogo y redes |

### Señales de buen prospecto

- Ya vende por WhatsApp o Instagram.
- No tiene web, o tiene una desactualizada / fea / lenta.
- Atiende en Coquimbo–La Serena (o región) y puede verse en persona.
- Tiene fotos o se pueden obtener de redes/Google.

### Evitar al inicio

- Empresas que piden ERP, inventario, multi-sucursal o pagos online en el primer mes.
- Clientes que quieren “todo gratis para siempre”.
- Proyectos con alcance ilimitado sin presupuesto.

---

## 3. Oferta

### 3.1 Demo gratis (gancho)

Entregable en 24–72 h:

- Nombre, rubro, colores o logo aproximado
- Ubicación, horarios, WhatsApp
- Servicios/productos destacados
- Fotos reales si existen
- Link público listo para abrir en el celular

Sin costo. Sin permanencia. Sin tarjeta.

### 3.2 Planes mensuales (producto)

| Plan | Precio (CLP) | Para quién | Incluye |
|---|---:|---|---|
| **Presencia** | $29.990/mes | Estar online con lo esencial | 1 página, WhatsApp, mapa/horarios, redes, hasta 5 cambios simples/mes, soporte WhatsApp |
| **Comercial** | $49.990/mes | Mostrar catálogo o servicios | Todo lo anterior + catálogo/servicios + promociones + hasta 10 cambios + mejoras visuales mensuales |
| **Pro** | $79.990/mes | Usar la web como canal de venta | Todo lo anterior + formularios/reservas/pedidos simples + secciones extra + reporte mensual + prioridad |

### 3.3 No incluido (se cotiza aparte)

- Pagos online / pasarelas
- Inventario y stock en tiempo real
- Login de usuarios / panel admin completo
- Integraciones (PedidosYa, Uber Eats, SII, etc.)
- Fotografía profesional
- Publicidad pagada (Meta/Google)
- Redacción avanzada de contenido
- Dominio `.cl` de marca propia (se puede incluir en Pro o cobrarse una vez)

### 3.4 Regla comercial

Nunca prometer sistemas complejos dentro de una mensualidad baja.  
Si pide más de lo del plan, **se cotiza como desarrollo adicional** (precio fijo o horas).

---

## 4. Modelo de ingresos

### Unit economics (referencia)

| Concepto | Valor |
|---|---|
| Costo variable por sitio (Vercel free / dominio) | ~$0–$10.000/mes según dominio |
| Tiempo demo (promedio) | 2–4 h |
| Tiempo mantención/mes (Presencia) | 30–60 min |
| Tiempo mantención/mes (Comercial/Pro) | 1–3 h |
| Meta mes 1–2 | 2–4 clientes pagos |
| Meta mes 3–4 | 8–12 clientes pagos |

### Proyección simple

| Clientes | Mix | Ingreso mensual aprox. |
|---:|---|---:|
| 4 | 4 × Comercial | $199.960 |
| 10 | mix $50k promedio | $499.900 |
| 20 | mix $50k promedio | $999.800 |

El negocio escala con **plantillas por rubro** + proceso de demo estandarizado, no con reinventar cada sitio desde cero.

---

## 5. Proceso de venta

### Embudo

```
Visita / postulación web
        ↓
Demo gratis (24–72 h)
        ↓
Envío por WhatsApp + seguimiento
        ↓
Ajustes menores
        ↓
Cierre mensualidad
        ↓
Publicación + cobro anticipado
        ↓
Mantención mensual
```

### Canales

1. **Presencial** (principal al inicio): tablet/celular con portafolio en dss-chile.vercel.app.
2. **Web de captación**: formulario → WhatsApp (ya en el sitio).
3. **Referidos**: descuento 1 mes o demo prioritaria al que refiere un cliente pago.
4. **Redes**: posts de “antes/después” y demos de la zona.

### Meta de validación (primeras 4–6 semanas)

| Métrica | Objetivo |
|---|---:|
| Negocios visitados / contactados | 50 |
| Interesados (datos tomados) | 15 |
| Demos enviadas | 10 |
| Clientes pagos | 2–4 |
| Tasa demo → pago (meta) | ≥ 20–40% |

---

## 6. Operación

### Stack técnico

- Sitio comercial: estático en **Vercel** (`dss-chile.vercel.app`)
- Demos de clientes: subdominios o proyectos Vercel por cliente
- Contacto: WhatsApp + correo `contactodssspa@gmail.com`
- Facturación: boleta/factura como SpA (definir medio de pago: transferencia)

### Flujo de entrega de demo

1. Tomar datos (checklist en `docs/ventas/CHECKLIST.md`).
2. Buscar info pública (Google, Instagram, fotos).
3. Armar demo con plantilla del rubro.
4. Publicar link.
5. Enviar script de WhatsApp + seguimiento a las 48 h y 7 días.

### SLA interno

| Tipo de cambio | Plazo |
|---|---|
| Texto / horario / precio / promo | 24–48 h hábiles |
| Foto o sección simple | 48–72 h hábiles |
| Funcionalidad nueva | Cotización + plazo acordado |

---

## 7. Precios y condiciones

- Pago **mensual anticipado** (transferencia).
- **Sin permanencia** obligatoria (baja fricción de cierre).
- Si deja de pagar: sitio se suspende o pasa a modo “demo”.
- Cambios del plan: solo lo simple (textos, imágenes, horarios, precios, promos).
- Dominio propio `.cl`: se recomienda al pasar a pago (imagen más seria que `*.vercel.app`).

---

## 8. Riesgos y mitigación

| Riesgo | Mitigación |
|---|---|
| Demos gratis sin conversión | Límite de demos activas; seguimiento con fecha; urgencia suave |
| Scope creep | Lista clara de “no incluido”; cotizar extras |
| Tiempo por demo alto | Plantillas por rubro; no custom infinito en demo |
| Impagos | Anticipado; suspensión automática |
| Competencia barata | Enfatizar empresa real (RUT), soporte local y demo con datos reales |

---

## 9. Roadmap 90 días

| Fase | Qué hacer |
|---|---|
| **Días 1–14** | Sitio `dss-chile` estable · 20 visitas · 5 demos · scripts afinados |
| **Días 15–45** | 50 contactos · 10 demos · 2–4 pagos · 3 plantillas de rubro |
| **Días 46–90** | 8–12 clientes · referidos · dominio propio para DSS · proceso de onboarding documentado |

---

## 10. Mensaje de marca (1 frase)

> **DSS Chile arma la web de tu negocio con tus datos reales. La primera versión es gratis; si te gusta, la dejamos online y la mantenemos por una mensualidad clara.**

---

## Documentos relacionados

- Propuesta al cliente → `docs/negocio/PROPUESTA.md`
- Checklist de datos → `docs/ventas/CHECKLIST.md`
- Scripts WhatsApp → `docs/ventas/WHATSAPP.md`
- Correo → `docs/ventas/CORREO.md`
- Pitch presencial → `docs/ventas/PITCH.md`
- Sitio fuente → `website/`
