# Sprint H3 — Fábrica: skins con dirección de arte

**Estado:** `done` (2026-07-27)
**Árbol tocado:** `demo-kit/templates/`, `demo-kit/schema/`, `demo-kit/scripts/{build-demo,check-demo}.mjs`,
`demo-kit/clients/{cabanas-elqui-astral,orfebreria-andacollo,bar-cuarto-menguante}`, `demo-kit/README.md`,
este archivo y la fila H3 de `STATUS.md`.
**No tocado:** `website/`, `scripts/` de la raíz, las 15 piezas a mano de `clients/`, `preview.mjs`.

---

## 1. El problema (cerrado, no se reabre)

Los 4 skins de C1/C2 eran 14 líneas de variables CSS sobre un `layout.html` único de 424 líneas.
Toda demo salía con el mismo hero, las mismas secciones y el mismo orden: cambiaba el color y nada más.
Al lado, las 15 piezas escritas a mano (`teteria-ukiyo`, `ceramica-tongoy`, `speakeasy-la-vuelta`, `brutal-arq`, …)
tienen escala tipográfica propia, composición propia y motion propio. Ese es el piso, no el techo.

## 2. El mecanismo

### 2.1 Qué se rompió en pedazos

`templates/_shared/layout.html` **ya no existe**. Se partió en:

| Archivo | Rol |
|---|---|
| `_shared/shell.html` | Cáscara: `<head>` + SEO + JSON-LD, nav, footer, WA flotante, badge de demo, script de scroll/reveal. Un solo hueco: `{{blocks_html}}`. |
| `_shared/blocks/{bloque}.{variante}.html` | Bloques componibles. Hoy: `hero`(classic·editorial·statement), `marquee`(line·band), `menu`(cards·leader·index), `about`(split·editorial), `quote`(pull), `steps`(numbered), `gallery`(grid·frames), `stats`(band), `contact`(panel·split), `cta`(center). |
| `_shared/base.css` | Invariantes estructurales: reset, `.wrap`, `.blk`, esqueleto de nav/footer, WA flotante, badge, `.reveal` y el `@media (prefers-reduced-motion: reduce)` global. Sin dirección de arte. |
| `_shared/classic.css` | Capa de compatibilidad con el look de C1/C2. La cargan sólo los skins que aún no tienen arte propio. |
| `_shared/sections.default.json` | Composición por defecto si un skin no declara la suya (= el layout único viejo). |

### 2.2 Qué es hoy un skin

```
templates/{skin}/
  skin.css        dirección de arte completa (150–400 líneas)
  meta.json       labels, CTAs, mensaje WA por defecto, fuentes, capa base
  sections.json   qué bloques, en qué orden, con qué variante
  hero.html       (opcional) hero propio cuando la variante no alcanza
```

`sections.json`:

```json
{
  "blocks": [
    { "block": "hero",  "variant": "custom", "anchor": "inicio" },
    { "block": "menu",  "variant": "leader", "anchor": "carta", "nav": "{{label_menu}}" },
    { "block": "quote", "variant": "pull",   "anchor": "cita",  "if": "quote_text" }
  ]
}
```

- `block` + `variant` resuelven el archivo del bloque.
- `anchor` es el `id` de la sección y el destino del link de nav.
- `nav` (opcional) agrega el link al nav; se renderiza con el mismo motor, así que acepta `{{label_menu}}`.
- `if` (opcional) omite el bloque si ese dato viene vacío — así `gallery` y `quote` desaparecen solas.
- `variant: "custom"` en `hero` usa `templates/{skin}/hero.html`. Lo usa `nocturno`.
- El build inyecta `class="blk blk-{bloque} blk-{bloque}--{variante}"`: ese es el gancho de CSS del skin.

`meta.json` ganó `"base"`: `"classic"` carga la capa vieja, `"none"` (o ausente) deja al skin vestirse solo.

### 2.3 Motor

`build-demo.mjs` trae un motor mustache-ish propio, sin dependencias:
`{{clave}}`, `{{this.campo}}`, `{{#if}}`, `{{#each}}` con `{{@n2}}` / `{{@index}}`.
Los bloques `#each` e `#if` se resuelven **de afuera hacia adentro contando anidamiento**,
que es lo que permite `{{#each menu_groups}} … {{#each this.items}}` en `menu.leader`.
Todos los valores llegan ya escapados desde `buildContext()`; el motor no re-escapa ni re-parsea su propia salida.

### 2.4 Por qué así y no de otra forma

- **Bloques como archivos, no como funciones JS.** Agregar una variante es crear un `.html`, no editar el motor.
  Un skin nuevo no toca código.
- **Composición declarativa en JSON, no en CSS.** El orden de secciones es una decisión de dirección de arte;
  esconder secciones con `display:none` habría dejado el HTML mintiendo (y el SEO también).
- **Dos capas de CSS compartido en vez de una.** Si todo el look vivía en la capa común, cada skin nuevo tenía
  que pelearla a fuerza de overrides y volvíamos a converger. `base.css` tiene sólo lo que ningún skin puede romper
  (WA flotante, badge, reduced-motion, sin scroll horizontal); `classic.css` es opt-in y está condenado a morir.
- **La salida sigue siendo un `index.html` autocontenido.** CSS inline en `<style>`, JS inline, cero npm, cero build step.
- **Sin motor de plantillas de terceros.** La regla de cero dependencias es dura y el subconjunto necesario cabe en ~60 líneas.

## 3. Skins nuevos

| Skin | Rubros | Dirección de arte | Composición |
|---|---|---|---|
| `boutique` | hotel, cabaña, viña, astroturismo | Cormorant Garamond + Outfit; papel cálido, foto grande con velo, itálicas de acento, ritmo lento (`--sec-pad:6rem`) | hero editorial · marquee · carta con puntos · nosotros editorial · fotos a sangre · cita · visita |
| `atelier` | taller, oficio, estudio, servicio de autor | DM Serif Display + Syne + IBM Plex Sans; blanco, grilla de 48 px visible de fondo, catálogo indexado `01/02/03` | hero de declaración · banda de datos · catálogo · proceso · taller · fotos · cierre · contacto |
| `nocturno` | bar, pub, gastronomía nocturna, eventos | Bodoni Moda + Jost; negro azulado, un solo acento saturado (fucsia) usado con avaricia, marcos y filetes en vez de tarjetas | hero propio (afiche enmarcado) · marquee · carta enmarcada · cita · la casa · fotos · cómo llegar · reservar |

Ejemplos que buildean:

| Slug | Skin | Negocio |
|---|---|---|
| `cabanas-elqui-astral` | boutique | Cabañas y astroturismo, Vicuña |
| `orfebreria-andacollo` | atelier | Taller de orfebrería, Andacollo |
| `bar-cuarto-menguante` | nocturno | Bar de coctelería, La Serena |

No se copió HTML de las 15 piezas: se extrajo el sistema (escala tipográfica, ritmo vertical, tratamiento de imagen,
motion) y se parametrizó por `content.json`.

## 4. Migración de `restaurant`

`restaurant` pasó de "classic + 14 variables" a skin propio: `base: "none"`, ~210 líneas de `skin.css`,
hero editorial oscuro con grano, carta con línea de puntos agrupada por categoría, visita en dos paneles y cierre en CTA.
`pizzeria-ejemplo` **no se editó** y sigue buildeando: todos los campos nuevos son opcionales.

`barber`, `clinic` y `services` quedan **funcionando con el mecanismo nuevo** (shell + bloques + `sections.default.json`)
pero con `base: "classic"` y su `skin.css` superficial de 14 líneas.
**Les falta dirección de arte propia: es deuda explícita de H3.**

## 5. Checks

`check-demo.mjs` mantiene los duros de C2 (`wa`, `hours`, `map`, `seo_title`, `seo_desc`, `no_lorem`, `name`, `city`, `menu`)
y suma como duros, verificados sobre `dist/{slug}/index.html`:

| Check | Qué exige |
|---|---|
| `build` | existe la salida |
| `no_tokens` | cero `{{ }}` sin resolver |
| `reduced_motion` | si el CSS anima, hay `@media (prefers-reduced-motion: reduce)` |
| `contrast_aa` | contraste WCAG del texto principal sobre el fondo ≥ 4.5:1 (última definición de `--text`/`--bg`, o sea con los overrides de `content.json` ya aplicados) |
| `fonts_preconnect` | si carga Google Fonts: preconnect a `googleapis` y `gstatic` + `display=swap` |
| `no_fixed_width` | sin `width`/`min-width` en px > 360 en reglas que puedan empujar el documento (se ignoran `position:absolute/fixed`, las que ya acotan con `max-width` y los pasos de `@keyframes`) |

Blandos (avisan, no fallan): `photos` (≥3) y `contrast_muted` (≥4.5:1 del texto secundario).

## 6. Schema

`content.schema.json`: enum de `template` con los 7 skins y campos nuevos **todos opcionales con default sensato**:
`menu_note`, `hero_image`, `facts[]`, `steps[]`, `steps_kicker`, `steps_title`, `quote`, `quote_by`,
`gallery_title`, `gallery_intro`, `cta_title`, `cta_text`.
Si faltan, el skin usa su default de `meta.json`; si tampoco hay, el bloque se omite (`if`) o no dibuja esa parte.

## 7. Qué quedó fuera

- **Dirección de arte de `barber`, `clinic` y `services`.** Funcionan, pero siguen siendo color sobre `classic.css`.
- **Override de composición desde `content.json`.** Hoy la composición la fija el skin; un cliente no puede reordenar bloques.
- **Variantes de bloque por skin** más allá de `hero.html`: el resolver mira `_shared/blocks/` salvo el hero custom.
- **Fotos reales.** Los tres ejemplos van sin `images[]`, así que `photos` queda en aviso y el bloque `gallery` no se dibuja.
- Fuera de alcance por definición del sprint: landing `website/`, publicar demos, Cloudflare (Sprint G), panel multi-tenant,
  generación automática sin revisión humana, las 105 demos legacy de Vercel sin fuente en el repo.

## 8. Verificación

```
cd demo-kit && npm run build -- --all && npm run check -- --all
```

7 demos buildean; **todos los checks duros pasan**; 7 avisos blandos (`photos`: los ejemplos van sin fotos).
Salida real pegada en la nota de sesión de `STATUS.md`.
Revisión visual en Chrome a 360 px y 1440 px de un build de cada skin nuevo + `pizzeria-ejemplo`.
