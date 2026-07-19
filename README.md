# DSS Chile

**Desarrollo de Software y Sistemas SpA**  
Sitio comercial + kit de ventas para demos web a negocios locales.

| | |
|---|---|
| **Sitio en vivo** | https://dss-chile.vercel.app |
| **Empresa** | Desarrollo de Software y Sistemas SpA |
| **RUT** | 78.392.075-1 |
| **Base** | Coquimbo, Chile |
| **Contacto** | contactodssspa@gmail.com · +56 9 9364 9604 |
| **GitHub** | https://github.com/pabloalvarez99/dss-spa-negocio (privado) |

> **Proyecto Vercel:** `dss-chile` → `https://dss-chile.vercel.app` (root de deploy: `website/`).

---

## Estructura del repositorio

```
.
├── website/                 # Sitio estático (deploy Vercel proyecto dss-chile)
│   ├── index.html
│   ├── vercel.json
│   ├── shots/               # Previews del portafolio
│   ├── ventas/              # Solo README → apunta a docs/ventas/
│   └── …assets
├── demo-kit/                # Fábrica de demos (templates + content.json + build)
│   ├── templates/           # restaurant, barber, clinic, services
│   ├── clients/{slug}/      # content.json (+ assets)
│   ├── scripts/build-demo.mjs
│   └── README.md
├── scripts/                 # Uptime demos / smoke (Sprint D)
├── docs/
│   ├── ventas/              # Scripts de campo (fuente de verdad)
│   ├── negocio/             # Plan, propuesta, contrato, extras, go-live
│   └── mejora/              # Ultraplan + STATUS + sprints 0–F
└── README.md
```

### Demo-kit (fábrica de demos)

```bash
cd demo-kit
npm run build -- --slug=pizzeria-ejemplo
npm run preview -- --slug=pizzeria-ejemplo
```

Ver [`demo-kit/README.md`](demo-kit/README.md). No se deploya a `dss-chile` (landing comercial aparte).

---

## Sitio web (`website/`)

Landing de captación de demos gratis: portafolio multi-rubro, formulario → WhatsApp, datos de la SpA.

### Desarrollo local

```bash
cd website
npx --yes serve .
# o
python -m http.server 3000
```

### Deploy a Vercel

```bash
cd website
vercel login
vercel link --yes --project dss-chile
vercel --prod --yes
```

El proyecto Vercel es **`dss-chile`** → `https://dss-chile.vercel.app`.

---

## Documentación de negocio

| Documento | Uso |
|---|---|
| [Plan de negocio](docs/negocio/PLAN.md) | Estrategia, precios, embudo, metas 90 días |
| [Propuesta comercial](docs/negocio/PROPUESTA.md) | PDF/WhatsApp al cliente |
| [Contrato simple](docs/negocio/CONTRATO.md) | Mensualidad, incluye/no incluye, suspensión |
| [Transferencia](docs/negocio/TRANSFERENCIA.md) | Plantilla cobro (sin secretos de más) |
| [Go-live](docs/negocio/CHECKLIST-GO-LIVE.md) | Checklist al publicar cliente |
| [Extras](docs/negocio/EXTRAS.md) | Cotizables fuera del plan |
| [Checklist visita](docs/ventas/CHECKLIST.md) | Captura de datos en campo |
| [WhatsApp](docs/ventas/WHATSAPP.md) | Seguimiento + retiro portafolio |
| [Correo](docs/ventas/CORREO.md) | Propuesta por mail |
| [Pitch](docs/ventas/PITCH.md) | Guion presencial |

## Mejora y sprints (ultraplan)

**[`docs/mejora/`](docs/mejora/README.md)** — no re-analizar el repo en cada sesión.

| Documento | Uso |
|---|---|
| [STATUS](docs/mejora/STATUS.md) | **Siempre primero** — residuales y sprints |
| [Índice](docs/mejora/README.md) | Cómo arrancar sesión post 0–E |
| [CRM schema](docs/mejora/crm-schema.md) | Google Sheet embudo |
| [Observabilidad](docs/mejora/OBSERVABILIDAD.md) | Analytics + uptime |
| [Decisiones](docs/mejora/DECISIONES.md) | Decisiones estables |
| [Sprints 0–F](docs/mejora/sprints/) | Checklists (0–E done; F blocked) |

**Estado:** sprints **0–E cerrados**. Siguiente formal = **F** solo con ≥8 clientes. Residuales en `STATUS.md`.

---

## Planes (resumen)

| Plan | Precio CLP/mes |
|---|---:|
| Presencia | $29.990 |
| Comercial | $49.990 |
| Pro | $79.990 |

Detalle completo en `docs/negocio/PLAN.md` y `docs/negocio/PROPUESTA.md`.

---

## Privacidad

Repositorio **privado**. No subir credenciales, tokens ni datos personales de clientes (RUT de terceros, chats, fotos privadas sin consentimiento).

---

## Licencia

Código y materiales comerciales © Desarrollo de Software y Sistemas SpA. Todos los derechos reservados.
