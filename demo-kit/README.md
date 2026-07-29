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
    _shared/                # shell, base/classic CSS, blocks/, sections.default
    restaurant|barber|clinic|services|boutique|atelier|nocturno/
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

### Dos tipos de cliente en `clients/`

| Tipo | Cómo se hace | Entra en `build --all` |
|------|--------------|------------------------|
| **De fábrica** | `content.json` + skin. Son los 7 ejemplos de rubro (`pizzeria-ejemplo`, `barberia-norte`, …) | Sí |
| **Conceptual (Nivel 2)** | `index.html` escrito a mano, con dirección de arte propia y arte hecho solo con CSS | No |

Los conceptuales son negocios ficticios de la Región de Coquimbo que existen para mostrar hasta
dónde llega el diseño del estudio. No pasan por la fábrica a propósito: cada uno inventa su propia
paleta, tipografía y composición. Se publican en la landing como **Nivel 2** vía
[`website/estudio.json`](../website/estudio.json).

**Legacy:** `clients/malta-lupulo/` es HTML a mano pre-fábrica y **no** es una pieza conceptual: no
tiene badge, ni pie de «negocio ficticio», ni entrada en `estudio.json`.

### Añadir una pieza conceptual

1. `clients/{slug}/index.html` — autocontenido. Copia la estructura de uno existente:
   badge `PROYECTO CONCEPTUAL`, nav, hero con una **pieza firma** propia del rubro, secciones,
   horario + mapa, CTA, pie con «Negocio ficticio… DSS Chile», botón WA flotante y la
   `capa estudio` del final del CSS (focus visible, `overflow-x:clip`, `prefers-reduced-motion`).
2. Sin imágenes: todo el arte se dibuja con CSS o SVG inline.
3. Capturas a **1440×900** y móvil, en `.jpg` + `.webp` → `estudio-shots/` y, las desktop,
   a `../website/shots/estudio/{slug}.{jpg,webp}`.
4. Entrada en `../website/estudio.json` con `slug`, `name`, `kind`, `city`, `url` (`null` mientras
   no esté publicada), `shot`, `solves` (el problema de diseño que resuelve) y `accent` único.

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
| `cabanas-elqui-astral` | `boutique` |
| `orfebreria-andacollo` | `atelier` |
| `bar-cuarto-menguante` | `nocturno` |

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
| `template` | `"restaurant"` | `restaurant` \| `barber` \| `clinic` \| `services` \| `boutique` \| `atelier` \| `nocturno` |
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

Checks **duros** (fallan el script, exit 1):

- De contenido: `wa`, `hours`, `map`, `seo_title`, `seo_desc`, `no_lorem`, `name`, `city`, `menu`.
- De salida (H3, sobre `dist/{slug}/index.html`):
  - `build` — hay salida (corre `npm run build` antes de `check`).
  - `no_tokens` — cero `{{ }}` sin resolver.
  - `reduced_motion` — si el CSS anima, existe `@media (prefers-reduced-motion: reduce)`.
  - `contrast_aa` — texto principal sobre fondo del skin ≥ 4.5:1 (WCAG).
  - `fonts_preconnect` — si carga Google Fonts: preconnect a `googleapis` + `gstatic` y `display=swap`.
  - `no_fixed_width` — sin anchos fijos > 360 px que puedan generar scroll horizontal.

**Avisos** (no fallan): `photos` ≥3 y `contrast_muted` ≥4.5:1.

---

## Templates / skins (H3)

Cada skin controla **dirección de arte y composición**, no solo color.

```text
templates/
  _shared/
    shell.html              # chrome: nav, footer, WA, SEO
    base.css                # invariantes estructurales
    classic.css             # look C1/C2 (si meta.base = "classic")
    sections.default.json   # composición por defecto
    blocks/{block}.{variant}.html
  {skin}/
    meta.json               # labels, fonts_url, base?
    skin.css                # arte (tipografía, ritmo, motion)
    sections.json           # bloques + orden + variantes
    hero.html               # opcional (variant custom)
```

| ID | Uso típico | Ejemplo |
|----|------------|---------|
| `restaurant` | Pizza, café, sandwich | `pizzeria-ejemplo` |
| `barber` | Barbería, peluquería | `barberia-norte` |
| `clinic` | Kine, dental, estética | `kine-ejemplo` |
| `services` | Cerrajería, oficios | `cerrajeria-ejemplo` |
| `boutique` | Hotel, cabaña, viña, astroturismo | `cabanas-elqui-astral` |
| `atelier` | Taller, estudio, oficio de autor | `orfebreria-andacollo` |
| `nocturno` | Bar, pub, gastronomía nocturna, eventos | `bar-cuarto-menguante` |

Los 7 skins tienen dirección de arte propia (`base: "none"`): `restaurant`, `boutique`, `atelier` y
`nocturno` desde H3; `barber` (póster barber shop vintage), `clinic` (calma clínica, único skin claro) y
`services` (plano técnico 24/7, teléfono gigante) desde 2026-07-29. `classic.css` ya no lo carga ningún
skin: queda como referencia histórica, candidato a borrar.

### Bloques disponibles

| Bloque | Variantes | Notas |
|---|---|---|
| `hero` | `classic` · `editorial` · `statement` · `custom` | `custom` usa `templates/{skin}/hero.html` |
| `marquee` | `line` · `band` | se omite sin `marquee[]` |
| `menu` | `cards` · `leader` · `index` | `leader` agrupa por `category` |
| `about` | `split` · `editorial` | `editorial` muestra `facts[]` y `hero_image` |
| `quote` | `pull` | se omite sin `quote` |
| `steps` | `numbered` | se omite sin `steps[]` (propios o del skin) |
| `gallery` | `grid` · `frames` | se omite sin `images[]` |
| `stats` | `band` | se omite sin `stats[]` |
| `contact` | `panel` · `split` | siempre lleva horarios + mapa |
| `cta` | `center` | cierre con WhatsApp |

### Añadir un rubro (skin nuevo)

1. `templates/{id}/meta.json` — `id`, `label`, `fonts_url`, `base` (`"none"` para arte propio) y `defaults` (labels, CTAs, `wa_message`).
2. `templates/{id}/sections.json` — bloques, orden, variantes, `anchor`, `nav`, `if`.
3. `templates/{id}/skin.css` — dirección de arte. Engancha por `.blk-{bloque}--{variante}`.
   Mantén el contraste AA y no uses anchos fijos > 360 px: los valida `check`.
4. Opcional: `templates/{id}/hero.html` + `"variant": "custom"` si el hero no sale de una variante compartida.
5. Agregar `{id}` al enum `template` en `schema/content.schema.json`.
6. Cliente de ejemplo en `clients/{slug}/content.json`.
7. `npm run build -- --slug=…` && `npm run check -- --slug=…`.

### Añadir una variante de bloque

Crear `templates/_shared/blocks/{bloque}.{variante}.html` y referenciarla desde el `sections.json` del skin.
No hay que tocar `build-demo.mjs`.

Diseño del mecanismo: [`docs/mejora/sprints/H3-fabrica.md`](../docs/mejora/sprints/H3-fabrica.md).

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
