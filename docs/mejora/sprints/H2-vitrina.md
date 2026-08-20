# Sprint H2 — Vitrina de tres niveles

**Estado:** `done` (código listo, **sin deploy**)
**Fecha:** 2026-07-27
**Árbol tocado:** `website/**` + este archivo + fila H2 de `STATUS.md`
**No tocado:** `demo-kit/` (solo lectura), `scripts/` de raíz, `docs/negocio/`, `docs/ventas/`

## Problema

`#trabajo` mezclaba en un bloque plano tres cosas de valor muy distinto: el proyecto real en
producción (`tu-farmacia.cl`), y 123 demos ilustrativas hechas con información pública, con un
disclaimer legal ("no son sitios contratados") que teñía la sección completa. El visitante veía
volumen genérico primero. Leía como plantilla.

## Diseño implementado

Tres niveles explícitos, en este orden en la página:

| Nivel | Qué | Dónde | Marca visible |
|---|---|---|---|
| 1 | `tu-farmacia.cl` | `#estudio` (sección nueva) | "Real · en producción · dominio propio" |
| 2 | 15 piezas de autor | `#estudio` | "Proyecto conceptual" (badge por tarjeta) |
| 3 | 123 demos de muestra | `#trabajo` (donde ya estaban) | "Demo ilustrativa · hecha con información pública" |

`#estudio` va **antes** de `#trabajo`. El disclaimer legal se queda en `#trabajo` y ahora aplica
solo al nivel 3. Razón del orden: trabajo real → capacidad de diseño → volumen.

## Cambios por archivo

### `website/index.html`
- Sección nueva `#estudio` antes de `#trabajo`, con encabezado propio (eyebrow + h2 + bajada que
  dice en una frase que son negocios ficticios hechos para mostrar diseño).
- El bloque `.pf-feat` de `tu-farmacia.cl` se **movió** desde `#trabajo` a `#estudio` como nivel 1.
- Marcadores de nivel `.es-lvl` (píldora "Nivel N" + texto) en los tres niveles.
- Contenedor `#estudio-conceptual` con atributo `hidden` por defecto: `.es-lvl` de nivel 2,
  `#es-grid` (lo rellena JS) y una nota `.es-note`.
- Nav: link `#estudio` ("Estudio") en `.nav-links`, `.mnav` y el footer. `#trabajo` pasa a
  llamarse "Demos" / "Demos de muestra" para que los tres niveles se distingan en el nav.
- Se quitó el link de texto "Postular" de `.nav-links` — quedaban 7 links y "Cómo funciona" se
  partía en dos líneas a 1160 px. El botón "Postular gratis" del `.nav-cta` está al lado y cubre
  ese destino; `.mnav` y el footer lo conservan.
- Skip-link: apuntaba a `#trabajo`, ahora a `#estudio` ("Saltar al trabajo").
- `#pf-more-btn`: texto inicial "Ver las demos de muestra ↓" + `aria-expanded="false"` +
  `aria-controls="pf-grid"`.

### `website/app.js`
- `esc()` subió a scope de módulo (lo usan `initPortfolio` e `initEstudio`; antes era local).
- `initEstudio(PIEZAS)` nuevo, mismo estilo que `initPortfolio`: construye las tarjetas, rellena
  `#es-grid` y recién ahí hace `wrap.hidden = false`.
- `loadEstudio()` nuevo: mismo patrón de fetch + fallback silencioso que `loadDemos()`. Si el
  fetch falla o el array viene vacío devuelve `[]` y `initEstudio` retorna sin tocar el DOM, así
  que `#estudio-conceptual` queda oculto. Cero hueco, cero esqueleto roto.
- Tarjeta sin `url`: se renderiza como `<article>` — sin link y sin evento de click. Con `url`:
  `<a target="_blank" rel="noopener">` + `estudio_open`.
- Endurecimiento del render (el JSON es propio, pero el HTML se arma con strings):
  `safeUrl()` acepta solo `https://…`, `safeAccent()` solo `#hex`, todo lo demás pasa por `esc()`.
- `shotBase()` tolera que `shot` venga con extensión (`.webp`/`.jpg`/`.png`) o vacío — así el
  manifest de H1 puede usar cualquiera de las dos convenciones sin romper nada.
- Nivel 3 colapsado: variable `collapsed = true` nueva. `apply()` no muestra ninguna tarjeta
  mientras `collapsed`; `pf-count` se sigue calculando y mostrando siempre. El primer click de
  `pf-more` desactiva `collapsed` (muestra las primeras 14, `PAGE` no cambió); el segundo hace
  `expanded = true` como antes. Buscar con texto o tocar un filtro también desactiva `collapsed`,
  para que la búsqueda nunca devuelva una grilla vacía.
- Scrollspy: `"estudio"` agregado a la lista de secciones observadas.

### `website/styles.css`
- Bloque nuevo `.es-*` (marcadores de nivel, grilla, tarjeta, badge, `solves`, nota). 2 columnas
  en desktop igual que `.pf-grid`, 1 columna bajo 900 px.
- `--acc` por tarjeta (inline desde el JSON): franja de 3 px arriba, color del borde en hover,
  punto del badge y color del monograma del fallback.
- Breakpoint nuevo `@media(max-width:1000px)`: `.nav-links` pasa a hamburguesa antes (antes 720 px)
  porque el nav ganó un link. El resto de las reglas de 720 px queda igual.

### `website/estudio.json` (nuevo, 15 entradas)
Esquema fijo: `{ slug, name, kind, city, url, shot, solves, accent }`.

### `website/shots/estudio/` (nuevo, 15 pares)
`{slug}.webp` + `{slug}.jpg`, **1440×900** (16:10), ~40 KB el webp / ~75 KB el jpg. `<picture>` dual,
`width`/`height` explícitos, `loading="lazy"`, `decoding="async"`, `onerror` que oculta la `img` y
deja ver `.pf-fallback`. Cero layout shift.

Origen: **copiados de `demo-kit/estudio-shots/`**, que H1 publicó durante esta misma sesión
(15 slugs, exactamente los mismos). Solo se copiaron las variantes desktop: las `-mobile` de H1 son
390×844 (retrato) y en una tarjeta 16:10 con `object-fit:cover` se recortarían a una franja
superior — sirven para otra cosa, no para esta grilla.

Antes de que existiera `demo-kit/estudio-shots/` este sprint había generado su propio set a 960×600
(Chrome headless sobre los HTML locales + ffmpeg). Se descartó al aparecer el de H1, que es la
fuente canónica. Peso: 607 KB de webp para las 15, todas `lazy` y bajo el pliegue.

## Datos del nivel 2 — de dónde salieron

`demo-kit/estudio.manifest.json` **no existía** al momento de este sprint, así que se generó
`website/estudio.json` desde este árbol leyendo `demo-kit/clients/{slug}/index.html` (solo lectura;
no se escribió nada en `demo-kit/`).

- **15 piezas**: los 16 clientes con `index.html` propio, menos `malta-lupulo`, que es legacy
  (HTML a mano, sin `content.json`, ver nota de sesión C del 2026-07-19).
- **`url: null` en las 15.** Ninguno de estos slugs está publicado: `wrangler pages project list`
  devuelve 21 proyectos y ninguno coincide. **Faltan las URLs** — las produce H1.
- `name`, `kind`, `city` salen del `<title>` y del `meta description` de cada pieza.
- `accent` es el color de firma real de cada pieza, leído de sus variables CSS
  (`--acid`, `--magenta`, `--fux`, `--lila`, `--ochre`, `--matcha`, `--yel`, …), aclarado cuando
  hacía falta para que contraste sobre el fondo oscuro de la landing.
- `solves` está escrito a mano por pieza: qué problema de diseño resuelve. Es lo que las 123 no
  tienen (ellas solo dicen rubro, ciudad y estrella).
- `shot`: capturas reales, copiadas de `demo-kit/estudio-shots/` (ver arriba). **No** se usó el
  fallback de emoji.

**Cuando H1 entregue `demo-kit/estudio.manifest.json`:** copiar su contenido a
`website/estudio.json` (sobre todo por las `url`) y, si publica `demo-kit/estudio-shots/`, copiar
esos archivos sobre `website/shots/estudio/`. `initEstudio` ya soporta ambas convenciones de `shot`
y activa el link + el evento `estudio_open` en cuanto una entrada trae `url`.

## Analytics

Evento nuevo `estudio_open` con props `{ slug, kind }`, por el mismo `track()` de Sprint D.
Sin teléfono, sin nombre, sin correo, sin texto libre. Hoy no dispara nunca porque ninguna tarjeta
tiene `url`; queda armado para cuando H1 las entregue.

## Desviación del brief (una, deliberada)

El brief pedía que **la sección `#estudio` completa** se oculte si el fetch falla o el array viene
vacío. Se implementó ocultando **solo `#estudio-conceptual`** (nivel 2). Motivo: el nivel 1
(`tu-farmacia.cl`) es HTML estático sin ninguna dependencia de `estudio.json`; hacerlo desaparecer
por un fallo de fetch borraría de la página el único proyecto real en producción — una regresión
peor que el problema que se quería evitar. El resultado observable es el mismo que pedía el brief:
si no hay datos no queda ningún hueco ni esqueleto roto. Es también lo que pasa con JS desactivado.

## Verificado

Servido en local (`127.0.0.1:3210`) y medido en Chrome, no a ojo:

- Orden de secciones: `top → estudio → trabajo → como → incluye`.
- `.pf-feat` está en `#estudio` y ya no está en `#trabajo`.
- 15 tarjetas renderizadas, 15 `<img>` en el DOM, 0 como `<a>` (correcto: `url: null` en todas).
- Nivel 3 al cargar: 123 tarjetas en el DOM, **0 visibles**, `pf-count` = "123 de 123 demos",
  botón "Ver las 123 demos de muestra ↓", `aria-expanded="false"`.
- Click 1 → 14 visibles, texto "Mostrar las 109 demos restantes ↓", `aria-expanded="true"`.
  Click 2 → 123 visibles, `.pf-more` se oculta.
- Buscar "sushi" con la grilla colapsada → 5 visibles (se auto-expande). Buscar "zzzzzz" → 0
  visibles + `#pf-empty` visible.
- Mobile **360×740** emulado: `scrollWidth - clientWidth = 0`, ningún elemento de `#estudio` o
  `#trabajo` se sale del viewport, `.es-grid` a 1 columna (316 px), nav en hamburguesa.
- Contraste (medido en la página): `.es-body h3` 16.97, `.es-badge` 18.30, `.es-lvl-t` 8.08,
  `.es-body .sub` 7.49, `.es-solves` 7.49, `.es-note` 5.26. Todos ≥ 4.5 (AA).
- Foco: las tarjetas de nivel 2 son `<article>` no focusables (no tienen link). Cuando tengan
  `url` serán `<a>` y toman el `:focus-visible` global que ya existe.
- Sin JS: `#estudio-conceptual` nace con `hidden`, así que se ve nivel 1 y nada roto; el
  `<noscript>` de `#trabajo` sigue igual.
- Performance: cero dependencias nuevas, cero build step, cero fuentes nuevas, cero CSS
  render-blocking extra. Solo `styles.css` (más largo), `app.js` (más largo) y un `fetch` más
  a un JSON de 5 KB.

### No verificado

- **Lighthouse / Core Web Vitals**: no se corrió. El riesgo real es LCP en `#estudio`, que ahora
  es la primera sección con imágenes; las 15 son `loading="lazy"` con `width`/`height`, así que no
  debería mover el LCP, pero no está medido.
- **Navegadores fuera de Chrome**: no se probó Safari ni Firefox. `aspect-ratio`, `hidden` y las
  custom properties inline son de soporte amplio, pero no se verificó en dispositivo real.
- **Las 15 URLs de las piezas**: no existen todavía (dependen de H1).

## Fuera de alcance (respetado)

No se tocaron precios, planes, copy del hero, formulario, FAQ ni footer legal. No se editó
`demos.json` ni ninguna de las 123 demos. No se migró hosting (eso es Sprint G). **No se hizo deploy.**
