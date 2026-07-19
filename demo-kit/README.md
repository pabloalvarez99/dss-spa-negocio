# demo-kit — Fábrica de demos (DSS Chile)

Genera un sitio estático **enviable** para un negocio local en minutos: WhatsApp prearmado, horarios, mapa, SEO y skin por rubro.

**Meta operativa:** demo futura ≤ **45 min** (brief + fotos + `content.json` + build + deploy).  
**Deploy unificado (C3 / P002):** aún no decidido — este kit solo genera HTML local.

> La landing comercial (`website/` → `dss-chile`) **no** se reescribe aquí. No subas el kit a `dss-chile` salvo docs.

---

## Estructura

```text
demo-kit/
  templates/
    _shared/layout.html     # layout base (WA float, mapa, SEO, mobile-first)
    restaurant/             # skin + meta (comida)
    barber/
    clinic/
    services/
  clients/
    {slug}/
      content.json          # datos del negocio
      assets/               # fotos opcionales (se copian al dist)
  scripts/
    build-demo.mjs          # content.json → dist/{slug}/
    preview.mjs             # http local del dist
    check-demo.mjs          # checklist “demo enviable”
  schema/content.schema.json
  dist/                     # salida (gitignored)
  README.md
```

**Legacy:** `clients/malta-lupulo/` es HTML a mano (pre-fábrica). No tiene `content.json`; no entra en `npm run build -- --all`.

---

## Requisitos

- Node.js **≥ 18**
- Sin dependencias npm (cero `node_modules` obligatorios)

```bash
cd demo-kit
```

---

## Flujo rápido (piloto)

```bash
# 1) Build del ejemplo restaurant
npm run build -- --slug=pizzeria-ejemplo

# 2) Checklist enviable
npm run check -- --slug=pizzeria-ejemplo

# 3) Preview local
npm run preview -- --slug=pizzeria-ejemplo
# → http://127.0.0.1:4173/
```

Otros ejemplos de rubro:

| Slug | Template |
|------|----------|
| `pizzeria-ejemplo` | `restaurant` |
| `barberia-norte` | `barber` |
| `kine-ejemplo` | `clinic` |
| `cerrajeria-ejemplo` | `services` |

```bash
npm run build -- --all
npm run check -- --all
```

---

## Nueva demo en ~45 min

1. **Brief (10 min)** — nombre, ciudad, WA, dirección, horarios, 4–8 ítems de carta/servicios, color si hay.
2. **Fotos (10–15 min)** — ≥3 fotos del local/producto; optimizar a WebP ~100–200 KB; poner en `clients/{slug}/assets/`.
3. **Scaffold (2 min)**
   ```bash
   mkdir clients/mi-negocio
   # copiar un content.json del mismo rubro y editar
   ```
4. **Editar `content.json` (10 min)** — ver schema abajo.
5. **Build + check (2 min)**
   ```bash
   npm run build -- --slug=mi-negocio
   npm run check -- --slug=mi-negocio
   npm run preview -- --slug=mi-negocio
   ```
6. **Deploy (cuando exista C3)** — publicar `dist/mi-negocio/` en la plataforma unificada (P002). Hoy: subir carpeta estática a Vercel/Cloudflare a mano si hace falta.

---

## Schema `content.json` (mínimo)

Campos obligatorios para build:

| Campo | Ejemplo | Notas |
|-------|---------|--------|
| `slug` | `"pizzeria-ejemplo"` | = nombre de carpeta |
| `template` | `"restaurant"` | `restaurant` \| `barber` \| `clinic` \| `services` |
| `name` | `"Pizzería Ejemplo"` | Visible en UI + SEO |
| `phone_wa` | `"56912345678"` | Solo dígitos, sin `+` |
| `city` | `"Coquimbo"` | |
| `tagline` | `"Pizza al horno…"` | Lead + fallback SEO |
| `hours` | `[{ "days":"Lun–Vie", "time":"12:00–22:00" }]` | ≥1 |
| `menu` | `[{ "name","price","desc","category?" }]` | ≥3 recomendado |
| `address` / `maps_url` | | Al menos uno para mapa |
| `colors.primary` | `"#e8a33d"` | Opcional; override del skin |
| `images` | `["assets/1.webp"]` | Opcional; ≥3 para demo enviable |

JSON de referencia (piloto):

```json
{
  "slug": "pizzeria-ejemplo",
  "template": "restaurant",
  "name": "Pizzería Ejemplo",
  "tagline": "Pizza al horno en Coquimbo",
  "phone_wa": "56912345678",
  "city": "Coquimbo",
  "address": "Av. Costanera 1200, Coquimbo",
  "hours": [{ "days": "Mar–Dom", "time": "12:00–22:00" }],
  "menu": [{ "name": "Margarita", "price": "$8.900", "desc": "Tomate y mozzarella" }],
  "colors": { "primary": "#e8a33d" },
  "maps_url": "",
  "instagram": "",
  "images": []
}
```

Schema formal: [`schema/content.schema.json`](schema/content.schema.json).

Campos útiles extra: `seo_title`, `seo_description`, `wa_message` (soporta `{name}`), `stats`, `marquee`, `hero_title`, `about`, `show_demo_badge`.

---

## Checklist “demo enviable”

Automatizado:

```bash
npm run check -- --slug=mi-negocio
```

Manual (venta):

- [ ] WA prearmado con nombre del negocio (`wa.me/…?text=…`)
- [ ] Horarios + mapa (link Maps)
- [ ] ≥3 fotos optimizadas en `assets/` referenciadas en `images`
- [ ] `<title>` / description con **nombre** del negocio
- [ ] Sin lorem / “tu negocio aquí”
- [ ] Mobile: botón WA flotante visible
- [ ] Badge “Demo” si aún no es cliente pago (`show_demo_badge`)

Checks **duros** (fallan el script): `wa`, `hours`, `map`, `seo_*`, `no_lorem`, `name`, `city`, `menu`.  
Fotos ≥3 es **recomendado** (el piloto puede ir sin fotos).

---

## Templates / skins

Un solo layout (`templates/_shared/layout.html`). Cada rubro aporta:

- `skin.css` — variables CSS (`--primary`, fuentes, fondos)
- `meta.json` — labels por defecto (Carta vs Servicios, CTAs, mensaje WA)

| ID | Uso típico |
|----|------------|
| `restaurant` | Pizza, café, sandwich, picada |
| `barber` | Barbería, peluquería |
| `clinic` | Kine, dental, estética, podología |
| `services` | Cerrajería, taller, ferretería, oficios |

Añadir rubro: copiar una carpeta de `templates/`, ajustar `skin.css` + `meta.json`, registrar en `schema/content.schema.json` enum.

---

## CLI

```bash
npm run build -- --slug=<slug>      # dist/<slug>/index.html
npm run build -- --all
npm run build -- --list
npm run build -- --slug=x --out=ruta

npm run preview -- --slug=<slug> [--port=4173]
npm run check -- --slug=<slug> | --all
```

---

## Fuera de alcance (hoy)

- **C3** deploy unificado / multi-host (pendiente **P002** en `docs/mejora/DECISIONES.md`)
- Panel admin multi-tenant
- Reemplazar la landing comercial
- IA full-auto sin revisión humana

---

## Relación con el monorepo

| Ruta | Rol |
|------|-----|
| `website/` | Sitio comercial prod (`dss-chile`) |
| `demo-kit/` | Fábrica de demos de clientes (este directorio) |
| `docs/mejora/sprints/C-demo-kit.md` | Sprint C |
| `docs/mejora/DECISIONES.md` D004 | Decisión de fábrica versionada |
