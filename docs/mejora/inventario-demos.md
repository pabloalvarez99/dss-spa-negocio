# Inventario de demos — portafolio DSS

> Generado por `scripts/check-demos-uptime.mjs` (Sprint D).
> Fuente: `website/demos.json`.
> Fecha de chequeo HTTP: 2026-07-19.
> Alcance: todas (123 demos). Timeout: 10000 ms.

## Resumen

| Métrica | Valor |
|--------|------:|
| Total chequeadas | 123 |
| HTTP OK (2xx–3xx) | 123 |
| Falla / timeout | 0 |
| Con host `*.pages.dev` | 18 |
| Default `*.vercel.app` | 105 |

## Convención de URL

- Si el item tiene `d`: `https://{d}` (ej. `el-amir.pages.dev`).
- Si no: `https://{u}.vercel.app`.
- Thumbnail en landing: `website/shots/{u}.jpg` (+ `.webp`).

## Demos caídas (acción prioritaria)

Todas las URLs respondieron **OK** en el chequeo del 2026-07-19. No hay links rotos detectados.

## Acciones

| Prioridad | Acción | Criterio |
|-----------|--------|----------|
| Alta | `retirar` | Dueño del negocio pide no figurar (SLA 24 h — D010) |
| Media | `anonimizar` | Demo sensible o sin permiso claro |
| Baja | `fix` | Link cae en rechequeos |
| — | `ok` | Online y usable en portafolio |

## Cómo re-chequear

```bash
node scripts/check-demos-uptime.mjs          # todas
node scripts/check-demos-uptime.mjs --top 20 # solo top 20 del JSON
```

Ver también: [`OBSERVABILIDAD.md`](OBSERVABILIDAD.md).

## Tabla completa

| # | slug (`u`) | nombre | URL | status | ms | acción |
|--:|---|---|---|---:|---:|---|
| 1 | `hotel-club-la-serena` | Hotel Club La Serena | https://hotel-club-la-serena.vercel.app | 200 | 480 | ok |
| 2 | `energy-club-gym` | Energy Club | https://energy-club-gym.vercel.app | 200 | 392 | ok |
| 3 | `club-punto-verde` | Club Punto Verde | https://club-punto-verde.vercel.app | 200 | 381 | ok |
| 4 | `veterinaria-larrain` | Veterinaria Larrain | https://veterinaria-larrain.vercel.app | 200 | 222 | ok |
| 5 | `taller-sr-automotriz` | Taller Automotriz S&R | https://taller-sr-automotriz.vercel.app | 200 | 384 | ok |
| 6 | `base-studio-barberia` | BaseStudio Barbería | https://base-studio-barberia.vercel.app | 200 | 403 | ok |
| 7 | `refugio-misterios-elqui` | Refugio Misterios del Elqui | https://refugio-misterios-elqui.vercel.app | 200 | 395 | ok |
| 8 | `mohen-dental` | Mohen Odontología | https://mohen-dental.vercel.app | 200 | 449 | ok |
| 9 | `optica-marcopolo` | Óptica Marcopolo | https://optica-marcopolo.vercel.app | 200 | 433 | ok |
| 10 | `floreria-la-pergola` | Florería La Pérgola | https://floreria-la-pergola.vercel.app | 200 | 456 | ok |
| 11 | `aravena-propiedades` | Patricio Aravena Propiedades | https://aravena-propiedades.vercel.app | 200 | 459 | ok |
| 12 | `ferreteria-islon` | Ferretería Islón | https://ferreteria-islon.vercel.app | 200 | 426 | ok |
| 13 | `at-your-service-laundry` | At Your Service Laundry | https://at-your-service-laundry.vercel.app | 200 | 432 | ok |
| 14 | `alfa-aldea` | Alfa Aldea | https://alfa-aldea.vercel.app | 200 | 424 | ok |
| 15 | `mascotiendas-ls` | Mascotiendas | https://mascotiendas-ls.vercel.app | 200 | 500 | ok |
| 16 | `la-escalera` | La Escalera | https://la-escalera.vercel.app | 200 | 498 | ok |
| 17 | `amo-la-pizza` | Amo La Pizza | https://amo-la-pizza.vercel.app | 200 | 348 | ok |
| 18 | `la-rusia-nikkei` | La Rusia Nikkei | https://la-rusia-nikkei.vercel.app | 200 | 383 | ok |
| 19 | `bash-burger` | Bash Burger | https://bash-burger.vercel.app | 200 | 390 | ok |
| 20 | `don-ostion` | Don Ostión | https://don-ostion.vercel.app | 200 | 393 | ok |
| 21 | `luka-brunch` | Luka Brunch | https://luka-brunch.vercel.app | 200 | 394 | ok |
| 22 | `taikin-sushi` | Taikin Sushi | https://taikin-sushi.vercel.app | 200 | 5201 | ok |
| 23 | `salisucre` | Salisucre | https://salisucre.vercel.app | 200 | 360 | ok |
| 24 | `kogo-coreano` | Kogo Coreano | https://kogo-coreano.vercel.app | 200 | 366 | ok |
| 25 | `shawarma-cairo` | Shawarma Cairo | https://shawarma-cairo.vercel.app | 200 | 372 | ok |
| 26 | `el-amir` | El Amir | https://el-amir.pages.dev | 200 | 75 | ok |
| 27 | `cerrajeria-vidales` | Cerrajería Vidales 24H | https://cerrajeria-vidales.pages.dev | 200 | 81 | ok |
| 28 | `atlas-kinesiologia` | Centro Atlas Kinesiología | https://atlas-kinesiologia.pages.dev | 200 | 80 | ok |
| 29 | `boga-ink` | Boga Ink Tattoo | https://boga-ink.pages.dev | 200 | 68 | ok |
| 30 | `cabanas-pinamar` | Cabañas Pinamar | https://cabanas-pinamar.pages.dev | 200 | 69 | ok |
| 31 | `zorro-bike` | Zorro Bike | https://zorro-bike.pages.dev | 200 | 72 | ok |
| 32 | `nuba-sisu-salon` | Nüba by Sisu Salón | https://nuba-sisu-salon.pages.dev | 200 | 72 | ok |
| 33 | `vulcanizacion-el-iquiqueno` | Vulcanización El Iquiqueño | https://vulcanizacion-el-iquiqueno.pages.dev | 200 | 78 | ok |
| 34 | `hostal-luna-del-mar` | Hostal Luna del Mar | https://hostal-luna-del-mar.pages.dev | 200 | 74 | ok |
| 35 | `spa-detailing-automotriz` | SPA Detailing Automotriz | https://spa-detailing-automotriz.pages.dev | 200 | 72 | ok |
| 36 | `veterinaria-claudia-ojeda` | Veterinaria Claudia Ojeda | https://veterinaria-claudia-ojeda.pages.dev | 200 | 77 | ok |
| 37 | `cabanas-agua-marina` | Cabañas Agua Marina 2500 | https://cabanas-agua-marina.pages.dev | 200 | 83 | ok |
| 38 | `floristeria-narciso` | Floristería Narciso II | https://floristeria-narciso.pages.dev | 200 | 72 | ok |
| 39 | `el-gelatto` | El Gelatto de Vicuña | https://el-gelatto.pages.dev | 200 | 70 | ok |
| 40 | `entre-costas` | Entre Costas | https://entre-costas.pages.dev | 200 | 80 | ok |
| 41 | `escala-real` | Apart Hotel Escala Real | https://escala-real.pages.dev | 200 | 75 | ok |
| 42 | `pisku-bar` | PisKu Bar | https://pisku-bar.pages.dev | 200 | 75 | ok |
| 43 | `estacion-chilenita` | Estación Chilenita | https://estacion-chilenita.pages.dev | 200 | 86 | ok |
| 44 | `pescaderia-don-santino` | Pescadería Don Santino | https://pescaderia-don-santino.vercel.app | 200 | 360 | ok |
| 45 | `panaderia-mama-hilda` | Panadería La Mama Hilda | https://panaderia-mama-hilda.vercel.app | 200 | 365 | ok |
| 46 | `las-brasas-del-mar` | Las Brasas del Mar | https://las-brasas-del-mar.vercel.app | 200 | 431 | ok |
| 47 | `emerson-express` | Emerson Express | https://emerson-express.vercel.app | 200 | 341 | ok |
| 48 | `flores-del-bosque` | Flores del Bosque | https://flores-del-bosque.vercel.app | 200 | 374 | ok |
| 49 | `fama-minimarket` | Fama Minimarket | https://fama-minimarket.vercel.app | 200 | 404 | ok |
| 50 | `comida-rapida-fama` | Comida Rápida Fama | https://comida-rapida-fama.vercel.app | 200 | 201 | ok |
| 51 | `family-power` | Family Power Neumáticos | https://family-power.vercel.app | 200 | 383 | ok |
| 52 | `cabanas-lonquimei` | Cabañas Lonquimei | https://cabanas-lonquimei.vercel.app | 200 | 407 | ok |
| 53 | `panaderia-robertinis` | Panadería Robertini's | https://panaderia-robertinis.vercel.app | 200 | 200 | ok |
| 54 | `de-panes-y-pasteles` | De Panes y Pasteles | https://de-panes-y-pasteles.vercel.app | 200 | 354 | ok |
| 55 | `penuelas-hostel` | Peñuelas Hostel | https://penuelas-hostel.vercel.app | 200 | 347 | ok |
| 56 | `mecanicool` | Mecanicool A/C Automotriz | https://mecanicool.vercel.app | 200 | 369 | ok |
| 57 | `cabanas-morena` | Cabañas Morena | https://cabanas-morena.vercel.app | 200 | 371 | ok |
| 58 | `vet-blanco-y-violeta` | Vet. Blanco y Violeta | https://vet-blanco-y-violeta.vercel.app | 200 | 366 | ok |
| 59 | `optica-colon` | Óptica Colón | https://optica-colon.vercel.app | 200 | 383 | ok |
| 60 | `ecoturismo-nativas` | Ecoturismo Nativas | https://ecoturismo-nativas.vercel.app | 200 | 390 | ok |
| 61 | `cabanas-vientos-del-sur` | Cabañas Vientos del Sur | https://cabanas-vientos-del-sur.vercel.app | 200 | 380 | ok |
| 62 | `ferreteria-los-moyano` | Ferretería Los Moyano | https://ferreteria-los-moyano.vercel.app | 200 | 362 | ok |
| 63 | `lavanderia-maxicleaner` | Lavandería Maxicleaner | https://lavanderia-maxicleaner.vercel.app | 200 | 411 | ok |
| 64 | `petsitter-store-spa` | Petsitter Store & Spa | https://petsitter-store-spa.vercel.app | 200 | 384 | ok |
| 65 | `cabanas-quilacan` | Cabañas Quilacan | https://cabanas-quilacan.vercel.app | 200 | 371 | ok |
| 66 | `automek-psi` | Automek Taller | https://automek-psi.vercel.app | 200 | 399 | ok |
| 67 | `thoros-bike` | Thoros Bike | https://thoros-bike.vercel.app | 200 | 378 | ok |
| 68 | `podologia-karen-manterola` | Podología Karen Manterola | https://podologia-karen-manterola.vercel.app | 200 | 397 | ok |
| 69 | `la-arepa-cuadrada` | La Arepa Cuadrada | https://la-arepa-cuadrada.vercel.app | 200 | 403 | ok |
| 70 | `el-toque-de-la-chef` | El Toque De La Chef | https://el-toque-de-la-chef.vercel.app | 200 | 340 | ok |
| 71 | `chile-tierra-querida` | Chile Tierra Querida | https://chile-tierra-querida.vercel.app | 200 | 393 | ok |
| 72 | `el-viejo-bar-ingles` | El Viejo Bar Inglés | https://el-viejo-bar-ingles.vercel.app | 200 | 385 | ok |
| 73 | `pizzeria-mendoza` | Pizzería Mendoza | https://pizzeria-mendoza.vercel.app | 200 | 372 | ok |
| 74 | `porto-ron` | Porto Ron | https://porto-ron.vercel.app | 200 | 379 | ok |
| 75 | `jardin-sushi` | Jardín Sushi | https://jardin-sushi.vercel.app | 200 | 365 | ok |
| 76 | `el-bandido` | El Bandido | https://el-bandido.vercel.app | 200 | 368 | ok |
| 77 | `sumac-sabor-peruano` | Sumac Sabor Peruano | https://sumac-sabor-peruano.vercel.app | 200 | 341 | ok |
| 78 | `bullhouse` | Bullhouse | https://bullhouse.vercel.app | 200 | 370 | ok |
| 79 | `full-market` | Full Market | https://full-market.vercel.app | 200 | 376 | ok |
| 80 | `mil-sabores-de-casa` | Mil Sabores de Casa | https://mil-sabores-de-casa.vercel.app | 200 | 361 | ok |
| 81 | `marisqueria-gladys` | Marisquería Gladys | https://marisqueria-gladys.vercel.app | 200 | 383 | ok |
| 82 | `ricopan-la-serena` | Ricopan | https://ricopan-la-serena.vercel.app | 200 | 364 | ok |
| 83 | `tortuga-restaurant` | Tortuga Restaurant | https://tortuga-restaurant.vercel.app | 200 | 383 | ok |
| 84 | `hand-rolls-sushi` | Hand Rolls Sushi | https://hand-rolls-sushi.vercel.app | 200 | 388 | ok |
| 85 | `la-pica-frente-al-mar` | La Pica Frente al Mar | https://la-pica-frente-al-mar.vercel.app | 200 | 376 | ok |
| 86 | `daga-beach` | Daga Beach | https://daga-beach.vercel.app | 200 | 412 | ok |
| 87 | `cafe-elqui` | Café Elqui | https://cafe-elqui.vercel.app | 200 | 400 | ok |
| 88 | `lemur-cafe` | Lemur Café | https://lemur-cafe.vercel.app | 200 | 372 | ok |
| 89 | `dulce-salar` | Dulce Salar | https://dulce-salar.vercel.app | 200 | 421 | ok |
| 90 | `bocatta` | Bocatta Food | https://bocatta.vercel.app | 200 | 642 | ok |
| 91 | `gelateria-san-damian` | Gelatería San Damián | https://gelateria-san-damian.vercel.app | 200 | 365 | ok |
| 92 | `mas-sabores-saludables` | Más Sabores Saludables | https://mas-sabores-saludables.vercel.app | 200 | 379 | ok |
| 93 | `magnolia-seven` | Magnolia | https://magnolia-seven.vercel.app | 200 | 418 | ok |
| 94 | `martin-fierro-ten` | Martín Fierro | https://martin-fierro-ten.vercel.app | 200 | 412 | ok |
| 95 | `la-trinidad` | La Trinidad | https://la-trinidad.vercel.app | 200 | 386 | ok |
| 96 | `la-pica-del-lupa` | La Picá del Lupa | https://la-pica-del-lupa.vercel.app | 200 | 387 | ok |
| 97 | `el-vecino` | El Vecino | https://el-vecino.vercel.app | 200 | 376 | ok |
| 98 | `la-pica-el-pionero` | La Pica El Pionero | https://la-pica-el-pionero.vercel.app | 200 | 410 | ok |
| 99 | `picada-mar-adentro` | Mar Adentro | https://picada-mar-adentro.vercel.app | 200 | 388 | ok |
| 100 | `invictus-sport-bar` | Invictus Sport Bar | https://invictus-sport-bar.vercel.app | 200 | 366 | ok |
| 101 | `che-pollo123` | Che Pollo | https://che-pollo123.vercel.app | 200 | 358 | ok |
| 102 | `new-pirats` | New Pirats | https://new-pirats.vercel.app | 200 | 373 | ok |
| 103 | `crunchy-rolls` | Crunchy Rolls | https://crunchy-rolls.vercel.app | 200 | 374 | ok |
| 104 | `mar-y-fuego` | Mar y Fuego | https://mar-y-fuego.vercel.app | 200 | 372 | ok |
| 105 | `casona-del-900` | Casona del 900 | https://casona-del-900.vercel.app | 200 | 372 | ok |
| 106 | `pub-duna` | Duna Pub Rock | https://pub-duna.vercel.app | 200 | 387 | ok |
| 107 | `tacos-tacones` | Tacos & Tacones | https://tacos-tacones.vercel.app | 200 | 456 | ok |
| 108 | `las-emilias` | Las Emilias | https://las-emilias.vercel.app | 200 | 361 | ok |
| 109 | `tio-coco` | Tío Coco | https://tio-coco.vercel.app | 200 | 416 | ok |
| 110 | `living-loft` | Living & Loft | https://living-loft.vercel.app | 200 | 425 | ok |
| 111 | `vida-sana-con-amor` | Vida Sana con Amor | https://vida-sana-con-amor.vercel.app | 200 | 361 | ok |
| 112 | `bakulic` | Bakulic | https://bakulic.vercel.app | 200 | 406 | ok |
| 113 | `porotas` | Porota's | https://porotas.vercel.app | 200 | 201 | ok |
| 114 | `terracota-cafe` | Terracota Café | https://terracota-cafe.vercel.app | 200 | 482 | ok |
| 115 | `aroma-caffe-delta` | A'roma Caffè | https://aroma-caffe-delta.vercel.app | 200 | 350 | ok |
| 116 | `guanaqueros-cafe` | Guanaqueros Café | https://guanaqueros-cafe.vercel.app | 200 | 362 | ok |
| 117 | `donde-elbita` | Donde Elbita | https://donde-elbita.vercel.app | 200 | 387 | ok |
| 118 | `rincon-de-jenny` | Rincón de Jenny | https://rincon-de-jenny.vercel.app | 200 | 347 | ok |
| 119 | `merendero-tia-sonia` | Merendero Tía Sonia | https://merendero-tia-sonia.vercel.app | 200 | 370 | ok |
| 120 | `pollo-balon` | Pollo Balón | https://pollo-balon.vercel.app | 200 | 371 | ok |
| 121 | `las-tias-eight` | Las Tías | https://las-tias-eight.vercel.app | 200 | 353 | ok |
| 122 | `fuente-liverpool` | Fuente Liverpool | https://fuente-liverpool.vercel.app | 200 | 388 | ok |
| 123 | `nina-cakes` | Nina Cakes | https://nina-cakes.vercel.app | 200 | 362 | ok |
