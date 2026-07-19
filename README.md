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

> **Nota de URL:** Vercel solo permite letras minúsculas, números y guiones en el nombre del proyecto. Por eso el dominio es `dss-chile.vercel.app` (no `dss_chile`).

---

## Estructura del repositorio

```
.
├── website/                 # Sitio estático (deploy Vercel)
│   ├── index.html
│   ├── vercel.json
│   ├── shots/               # Previews del portafolio
│   ├── ventas/              # Scripts de campo (canónico futuro: docs/ventas/)
│   └── …assets
├── docs/
│   ├── negocio/             # Plan y propuesta comercial
│   │   ├── PLAN.md
│   │   └── PROPUESTA.md
│   └── mejora/              # Ultraplan + sprints (sesiones nuevas)
│       ├── README.md
│       ├── STATUS.md
│       ├── ANALISIS.md
│       ├── DECISIONES.md
│       └── sprints/
└── README.md
```

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

El proyecto Vercel debe llamarse **`dss-chile`** para que la URL sea `https://dss-chile.vercel.app`.

---

## Documentación de negocio

| Documento | Uso |
|---|---|
| [Plan de negocio](docs/negocio/PLAN.md) | Estrategia, precios, embudo, metas 90 días |
| [Propuesta comercial](docs/negocio/PROPUESTA.md) | PDF/WhatsApp al cliente |
| [Checklist](website/ventas/CHECKLIST.md) | Captura de datos en visita |
| [WhatsApp](website/ventas/WHATSAPP.md) | Scripts de seguimiento |
| [Correo](website/ventas/CORREO.md) | Propuesta por mail |
| [Pitch](website/ventas/PITCH.md) | Guion presencial |

## Mejora y sprints (ultraplan)

Para no re-analizar el repo en cada sesión: **[`docs/mejora/`](docs/mejora/README.md)**.

| Documento | Uso |
|---|---|
| [Índice + cómo arrancar sesión](docs/mejora/README.md) | Prompt corto y orden de sprints |
| [STATUS](docs/mejora/STATUS.md) | Qué sprint sigue; actualizar al cerrar |
| [Análisis](docs/mejora/ANALISIS.md) | Diagnóstico (solo si hace falta contexto) |
| [Decisiones](docs/mejora/DECISIONES.md) | Decisiones estables de producto/tech |
| [Sprints 0–F](docs/mejora/sprints/) | Checklists ejecutables |

**Siguiente sprint:** ver `docs/mejora/STATUS.md` (hoy: Sprint 0 — higiene).

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
