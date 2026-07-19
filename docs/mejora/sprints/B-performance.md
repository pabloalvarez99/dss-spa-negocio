# Sprint B — Performance y mantenibilidad del monolito

**Estado:** ver [`../STATUS.md`](../STATUS.md)  
**Esfuerzo:** 2–4 días  
**Objetivo:** HTML más liviano, thumbs optimizados, código más editable **sin** migrar a framework.  
**Ideal después de:** Sprint A (menos conflictos en `index.html`).

## Prompt de sesión

```text
Leé docs/mejora/STATUS.md y docs/mejora/sprints/B-performance.md.
Implementá Sprint B. No migres a React/Next. Actualizá STATUS.md.
```

## Checklist

### Separación de archivos (sin build obligatorio)
- [x] Extraer CSS de `index.html` → `website/styles.css` (o `assets/styles.css`)  
- [x] Extraer JS → `website/app.js`  
- [x] Extraer `DEMOS` → `website/demos.json` y cargarlo con `fetch` (con fallback razonable)  
- [x] Mantener una sola página; paths relativos OK en Vercel root `website/`  
- [x] Verificar que sin JS el mensaje noscript del portafolio sigue OK  

### Imágenes
- [x] Convertir `website/shots/*.jpg` a WebP (o dual jpg+webp)  
- [x] Objetivo ~40–60 KB por thumb de card  
  - Resultado: 123 WebP, avg ~21 KB (min 13 / max 37.5 KB), dual jpg+webp  
- [x] Actualizar `cardHTML` / src a `.webp` (o `<picture>`)  
- [x] Revisar `preview-tu-farmacia.jpg` y `og-image.png` (peso razonable)  
  - preview: jpg ~101 KB + webp ~35 KB (`<picture>`); og-image.png ~118 KB (OK para OG 1200×630; webp auxiliar ~26 KB sin cambiar meta OG)  
- [x] Cache headers en `vercel.json` cubren webp  
  - Ya existía `/(.*)\.(png|jpg|jpeg|svg|webp|ico)` + `/shots/(.*)` immutable  

### LCP / fonts
- [x] Preload del asset LCP crítico (si hay imagen hero real; no preload de 123 thumbs)  
  - Hero = texto + mock CSS; sin preload de thumbs  
- [x] Evaluar self-host o subset de Inter / Space Grotesk  
  - Se mantiene Google Fonts async (`display=swap` + `media=print onload`); self-host diferido (bajo ROI sin build step)  
- [x] Mantener `prefers-reduced-motion`  

### Smoke
- [x] Filtros y búsqueda de portafolio funcionan  
- [x] Paginación “mostrar más” (PAGE=14) OK  
- [x] Ticker OK  
- [x] Form + WA OK  
- [x] Stats count-up OK  

## Definition of done
- [x] `index.html` ya no concentra CSS+JS+DEMOS en un solo bloque monstruo  
- [x] Thumbs más livianos  
- [x] Lighthouse mobile (referencial) sin regresión grave  
  - Smoke local HTTP 36/36 + assets WebP/CSS/JS/JSON 200; sin Lighthouse formal en CI  
- [x] `STATUS.md` → B done  

## Fuera de alcance
- Framework SSG (Astro opcional solo si se decide y se documenta en DECISIONES)  
- CDN de demos de clientes  

## Notas de implementación (2026-07-19)
- Archivos nuevos: `styles.css`, `app.js`, `demos.json`, `shots/*.webp`, `preview-tu-farmacia.webp`, `og-image.webp`  
- `app.js` preserva Sprint A: form, honeypot, tiempo mínimo, planes WA, `track`/`dssTrack`  
- `demos.json` vía `fetch`; fallback UI si falla la carga  
- Deploy: `cd website && vercel --prod --yes` (proyecto `dss-chile`)  
