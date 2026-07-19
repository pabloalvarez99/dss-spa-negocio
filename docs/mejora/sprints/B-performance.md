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
- [ ] Extraer CSS de `index.html` → `website/styles.css` (o `assets/styles.css`)  
- [ ] Extraer JS → `website/app.js`  
- [ ] Extraer `DEMOS` → `website/demos.json` y cargarlo con `fetch` (con fallback razonable)  
- [ ] Mantener una sola página; paths relativos OK en Vercel root `website/`  
- [ ] Verificar que sin JS el mensaje noscript del portafolio sigue OK  

### Imágenes
- [ ] Convertir `website/shots/*.jpg` a WebP (o dual jpg+webp)  
- [ ] Objetivo ~40–60 KB por thumb de card  
- [ ] Actualizar `cardHTML` / src a `.webp` (o `<picture>`)  
- [ ] Revisar `preview-tu-farmacia.jpg` y `og-image.png` (peso razonable)  
- [ ] Cache headers en `vercel.json` cubren webp  

### LCP / fonts
- [ ] Preload del asset LCP crítico (si hay imagen hero real; no preload de 123 thumbs)  
- [ ] Evaluar self-host o subset de Inter / Space Grotesk  
- [ ] Mantener `prefers-reduced-motion`  

### Smoke
- [ ] Filtros y búsqueda de portafolio funcionan  
- [ ] Paginación “mostrar más” (PAGE=14) OK  
- [ ] Ticker OK  
- [ ] Form + WA OK  
- [ ] Stats count-up OK  

## Definition of done
- [ ] `index.html` ya no concentra CSS+JS+DEMOS en un solo bloque monstruo  
- [ ] Thumbs más livianos  
- [ ] Lighthouse mobile (referencial) sin regresión grave  
- [ ] `STATUS.md` → B done  

## Fuera de alcance
- Framework SSG (Astro opcional solo si se decide y se documenta en DECISIONES)  
- CDN de demos de clientes  
