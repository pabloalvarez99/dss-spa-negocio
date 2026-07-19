# Sprint A — Landing / conversión

**Estado:** ver [`../STATUS.md`](../STATUS.md)  
**Esfuerzo:** ~1 semana (se puede partir en A1–A3)  
**Objetivo:** Más confianza y conversión sin reescribir el stack.  
**Depende de:** Sprint 0 idealmente (docs); se puede empezar copy en paralelo.

## Prompt de sesión

```text
Leé docs/mejora/STATUS.md, docs/mejora/DECISIONES.md (D006, D007)
y docs/mejora/sprints/A-landing.md.
Implementá solo el bloque indicado (A1 / A2 / A3).
Actualizá checklists y STATUS.md.
```

Precios fuente: `docs/negocio/PROPUESTA.md`.

---

## A1 — Copy chileno + honestidad

- [ ] Reemplazar voseo en `website/index.html` (UI, FAQ, form, empty states)
  - postulás/postulá → postula  
  - vos → tú o reescritura neutra  
  - Activá → Activa  
  - hacé/miralas → formas chilenas/neutrales  
- [ ] Hero: reforzar zona (Coquimbo / La Serena) y plazo demo 24–72 h  
- [ ] Stats honestos: no inventar “clientes en mantención” si no hay datos  
- [ ] Revisar Schema.org: no sobre-prometer e-commerce si el core es plan local simple  
- [ ] Alinear FAQ con precios mensuales y “sin permanencia”  

## A2 — Precios + prueba social + legal web

- [ ] Nueva sección `#planes` (o ancla) con tabla:
  - Presencia $29.990  
  - Comercial $49.990  
  - Pro $79.990  
  - Nota: demo gratis; precio solo si publica  
- [ ] Links de nav (desktop + móvil) a Planes  
- [ ] Scrollspy: incluir `planes` si aplica  
- [ ] FAQ: “¿Cuánto cuesta?” con los tres planes  
- [ ] Bloque o página de **Privacidad** (datos del form, Web3Forms, WhatsApp)  
- [ ] Enlace “¿Sos dueño de un negocio del portafolio? Pedí retiro” → WA  
- [ ] Espacio para 1–3 testimonios (placeholder honesto si aún no hay)  
- [ ] Reforzar “sin permanencia” cerca de CTAs de precio  

## A3 — Form anti-spam y calidad de lead

Archivo: `website/index.html` (submit handler ~línea form).

- [ ] Honeypot oculto + rechazo si viene lleno  
- [ ] Timestamp / tiempo mínimo de llenado (anti-bot simple)  
- [ ] Validación teléfono Chile (al menos formato razonable +56 9)  
- [ ] Campo opcional: “¿Cómo nos conociste?” (calle / Google / referido / otro)  
- [ ] Incluir ese campo en mensaje WA y payload Web3Forms  
- [ ] Hook listo para analytics (aunque el wire real sea Sprint D): data attributes o funciones `track('form_submit')` stub  

## Definition of done
- [ ] Landing se lee natural en Chile  
- [ ] Precios visibles y alineados a PROPUESTA  
- [ ] Privacidad + retiro de demo enlazados  
- [ ] Form más resistente a spam y con fuente de lead  
- [ ] `STATUS.md` actualizado (A done o parcial por bloque)  

## Verificación manual
```bash
cd website
npx --yes serve .
```
- [ ] Nav → Planes  
- [ ] Submit form abre WA con texto completo  
- [ ] Móvil: barra sticky + menú  
- [ ] FAQ JSON-LD no contradice el HTML  

## Fuera de alcance
- Extraer CSS/JS (Sprint B)  
- Demo-kit (Sprint C)  
- CRM (Sprint E)  
