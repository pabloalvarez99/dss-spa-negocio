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
├── docs/
│   ├── ventas/              # Scripts de campo (fuente de verdad)
│   │   ├── CHECKLIST.md
│   │   ├── WHATSAPP.md
│   │   ├── CORREO.md
│   │   └── PITCH.md
│   ├── negocio/             # Plan y propuesta comercial
│   │   ├── PLAN.md
│   │   └── PROPUESTA.md
│   └── mejora/              # Ultraplan + sprints (sesiones nuevas)
│       ├── README.md
│       ├── STATUS.md
│       ├── ANALISIS.md
│       ├── DECISIONES.md
│       ├── inventario-demos.md
│       └── sprints/
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
| [Checklist](docs/ventas/CHECKLIST.md) | Captura de datos en visita |
| [WhatsApp](docs/ventas/WHATSAPP.md) | Scripts de seguimiento + retiro de portafolio |
| [Correo](docs/ventas/CORREO.md) | Propuesta por mail |
| [Pitch](docs/ventas/PITCH.md) | Guion presencial |

## Mejora y sprints (ultraplan)

Para no re-analizar el repo en cada sesión: **[`docs/mejora/`](docs/mejora/README.md)**.

| Documento | Uso |
|---|---|
| [Índice + cómo arrancar sesión](docs/mejora/README.md) | Prompt corto y orden de sprints |
| [STATUS](docs/mejora/STATUS.md) | Qué sprint sigue; actualizar al cerrar |
| [Análisis](docs/mejora/ANALISIS.md) | Diagnóstico (solo si hace falta contexto) |
| [Decisiones](docs/mejora/DECISIONES.md) | Decisiones estables de producto/tech |
| [Sprints 0–F](docs/mejora/sprints/) | Checklists ejecutables |

**Siguiente sprint:** ver `docs/mejora/STATUS.md` (hoy: Sprint A — landing).

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
