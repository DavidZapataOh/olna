---
name: Olna
description: El S&P 500, en automático, desde $5.000 al día. Campos de petróleo y arcilla a sangre, la app real en la mano.
colors:
  petroleo: "#123B3F"
  petroleo-hondo: "#0B2A2D"
  arcilla: "#C8553D"
  arcilla-hover: "#D15F46"
  campo-arcilla: "#B34730"
  arcilla-honda: "#A23F2B"
  arcilla-sombra: "#8F3624"
  crema: "#F6EFE6"
  pantalla: "#FAF3EB"
  arena: "#E8D5BF"
  arena-honda: "#D9C1A3"
  salvia: "#7E9C86"
  salvia-plan: "#698769"
  salvia-ui: "#587A63"
  salvia-texto: "#4F6F5A"
typography:
  display:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(56px, 8.6vw, 136px)"
    fontWeight: 830
    lineHeight: 0.9
    letterSpacing: "-0.045em"
  display-hero:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "7.72cqw"
    fontWeight: 820
    lineHeight: 0.845
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(40px, 5.6vw, 84px)"
    fontWeight: 820
    lineHeight: 0.96
    letterSpacing: "-0.035em"
  headline-accent:
    fontFamily: "Fraunces, Georgia, serif"
    fontWeight: 480
    letterSpacing: "-0.02em"
    fontVariation: "'SOFT' 100, 'WONK' 0"
  title:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(30px, 3.4vw, 48px)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
  lead:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(19px, 1.6vw, 23px)"
    fontWeight: 500
    lineHeight: 1.42
  body:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 750
    lineHeight: 1
  fineprint:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  pill: "999px"
  campo: "36px"
  tarjeta-grande: "32px"
  tarjeta: "24px"
  inserto: "20px"
  foco: "6px"
spacing:
  pad-x: "clamp(20px, 5vw, 80px)"
  sec-y: "clamp(88px, 11vw, 176px)"
  maxw: "1320px"
  pildora-gap: "10px"
components:
  button-primary:
    backgroundColor: "{colors.arcilla}"
    textColor: "{colors.crema}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    height: "60px"
    padding: "0 28px"
  button-primary-hover:
    backgroundColor: "{colors.arcilla-hover}"
    textColor: "{colors.crema}"
  button-crema:
    backgroundColor: "{colors.crema}"
    textColor: "{colors.petroleo}"
    rounded: "{rounded.pill}"
    height: "44px"
    padding: "0 18px"
  button-petroleo:
    backgroundColor: "{colors.petroleo}"
    textColor: "{colors.crema}"
    rounded: "{rounded.pill}"
    height: "44px"
    padding: "0 16px"
  chip:
    textColor: "{colors.petroleo}"
    rounded: "{rounded.pill}"
    height: "48px"
    padding: "0 20px"
  chip-selected:
    backgroundColor: "{colors.arcilla-honda}"
    textColor: "{colors.crema}"
    rounded: "{rounded.pill}"
    height: "48px"
    padding: "0 20px"
  tab:
    textColor: "{colors.crema}"
    rounded: "{rounded.pill}"
    height: "48px"
    padding: "0 22px"
  tab-selected:
    backgroundColor: "{colors.crema}"
    textColor: "{colors.petroleo}"
    rounded: "{rounded.pill}"
    height: "48px"
    padding: "0 22px"
  input-waitlist:
    backgroundColor: "{colors.pantalla}"
    textColor: "{colors.petroleo}"
    rounded: "{rounded.pill}"
    height: "60px"
  card-calculadora:
    backgroundColor: "{colors.pantalla}"
    textColor: "{colors.petroleo}"
    rounded: "{rounded.tarjeta-grande}"
    padding: "clamp(24px, 3vw, 44px)"
  card-inserto:
    backgroundColor: "{colors.arena}"
    textColor: "{colors.petroleo}"
    rounded: "{rounded.inserto}"
    padding: "6px 20px"
  nav-bar:
    backgroundColor: "{colors.petroleo-hondo}"
    textColor: "{colors.crema}"
    rounded: "{rounded.pill}"
    height: "60px"
    padding: "0 8px 0 22px"
---

# Design System: Olna

## Overview

**Creative North Star: "La quincena a sangre"**

Olna se ve como un cartel de color que se turna, no como una página fintech de crema con un mockup flotando. Cada sección es un campo completo de petróleo o de arcilla, de borde a borde, y sobre ese campo la protagonista es la app real: pantallas construidas en código dentro de un teléfono, con montos en pesos, el plan "El S&P 500 · 100 %" y la "o" de 500 cuentas que se llena. El color manda; la crema se reserva para la tinta y para la pantalla del teléfono.

La forma es una sola: la píldora de radio completo, que sale de la terminal redonda del wordmark "asentado". Botones, chips, pestañas, la barra fija, el aviso de consentimiento, las etiquetas de personas y hasta el arco superior de los retratos usan esa misma terminal. La tipografía es Figtree en negro/extra negrita (800–870) con tracking negativo, densa y cercana; Fraunces itálica blanda aparece como máximo en una palabra por titular, casi siempre de tiempo o ritmo ("cada", "poquito"; también "comprobar").

El movimiento es calmado y se asienta: entra una vez, desde un estado que ya es legible, y se queda quieto. No hay bucles. Con movimiento reducido, la página solo cambia opacidad. El gráfico propio es la "o" de 500 cuentas de arcilla sombreadas, una por empresa del S&P 500, que se llena por estratos de abajo hacia arriba como se llenan los aportes.

**Key Characteristics:**
- Campos de color completos que alternan petróleo y arcilla, sección por sección.
- La app real, construida en código, como imagen principal; nunca una captura.
- Una sola forma: píldora de radio completo (999px).
- Figtree 800–870 con tracking negativo; Fraunces itálica solo para una palabra por titular.
- La "o" de 500 cuentas como firma gráfica.
- Movimiento que entra una vez y se asienta; sin bucles; reducido = solo opacidad.

## Colors

Una paleta de tierra y agua: petróleo profundo y arcilla cocida se turnan como campos; crema, arena y salvia viven dentro de la interfaz.

### Primary
- **Arcilla** (`arcilla`): el color de acción. Botón de la lista de espera, CTA de la barra fija, cuentas llenas de la "o", pin, selección de texto y pulgar de la barra de scroll. Al pasar el puntero sube a **Arcilla encendida** (`arcilla-hover`).
- **Campo de arcilla** (`campo-arcilla`): el fondo completo de las secciones de arcilla (El problema, Cuánto cuesta, Preguntas). Es un punto más oscuro que la arcilla de acción para que la crema encima pase ≥4,5:1.
- **Arcilla honda** (`arcilla-honda`): el campo de arcilla más profundo (Tu plata), el texto de arcilla sobre pantalla (montos de comisión, chip seleccionado, enlaces dentro de la app) y el color del ícono abierto en Preguntas.
- **Arcilla sombra** (`arcilla-sombra`): solo como sombra interna del degradado radial de las cuentas y del pin. No es un color de superficie.

### Secondary
- **Petróleo** (`petroleo`): el campo base. Hero, Cómo funciona, Qué compras, Tú mandas y el cierre. También es la tinta sobre pantalla y arena, el `theme-color` del navegador y el botón oscuro dentro de la UI.
- **Petróleo hondo** (`petroleo-hondo`): pie de página, cápsula de la barra fija (al 90 %), las píldoras de "Sin…" sobre arcilla y el riel de la barra de scroll.

### Tertiary
- **Salvia** (`salvia`): los círculos de verificación (checks) dentro de la app y de las listas.
- **Salvia plan** (`salvia-plan`): la fila "El S&P 500 · 100 %" de la pantalla "Tu plan", tomada del comp aprobado.
- **Salvia UI** (`salvia-ui`): la píldora de la lista de espera en estado "listo" o "ya estabas".
- **Salvia texto** (`salvia-texto`): texto secundario sobre pantalla y arena (subtítulos de la app, leyendas de la calculadora, nota de TRM).

### Neutral
- **Crema** (`crema`): toda la tinta sobre petróleo y arcilla, el botón claro de la barra del hero, la pestaña seleccionada y el aviso de consentimiento.
- **Pantalla** (`pantalla`): el fondo de la pantalla del teléfono y de las superficies que se leen como app (calculadora, tarjeta del día rojo, notificación).
- **Arena** (`arena`): insertos dentro de la UI (filas de la calculadora, tarjeta "próximo aporte", tarjeta de calma), anillo de foco y texto de apoyo sobre petróleo.
- **Arena honda** (`arena-honda`): bordes de chips y opciones sin seleccionar.

### Named Rules
**The Campo a Sangre Rule.** Cada sección es un campo completo de un solo color, de borde a borde, y los campos alternan estrictamente: petróleo, arcilla, petróleo, arcilla… (hero petróleo → problema arcilla → cómo funciona petróleo → costo arcilla → qué compras petróleo → tu plata arcilla honda → tú mandas petróleo → preguntas arcilla → cierre petróleo → pie petróleo hondo). Nunca dos campos iguales seguidos.

**The Arena Adentro Rule.** Arena, salvia y pantalla solo existen dentro de la UI (pantallas, tarjetas, insertos). Nunca son el fondo de una sección. La clase `.sec--sand` existe en el CSS pero ninguna sección la usa, y así debe quedar.

**The Resplandor Rule.** Los campos de petróleo llevan un resplandor radial de arcilla (34 % → 0) que sale de un costado, el mismo del hero. Es la única luz de ambiente del sistema.

## Typography

**Display Font:** Figtree (variable, con ui-sans-serif, system-ui)
**Body Font:** Figtree
**Accent Font:** Fraunces itálica, ejes SOFT y opsz (con Georgia)

**Character:** una sans geométrica muy negra y apretada que habla como una persona, con una sola palabra en serif blanda que le pone tiempo y calidez a la frase.

### Hierarchy
- **Display** (830, clamp 56–136px, interlineado 0.9, −0.045em): el titular del cierre, en dos líneas en bloque.
- **Display hero** (820, 7.72cqw del marco ≈ 86px de altura de mayúscula en escritorio, 0.845, −0.04em): el H1 de tres líneas del hero; en móvil pasa a clamp(46px, 13.4vw, 96px) con 0.88.
- **Headline** (820, clamp 40–84px, 0.96, −0.035em): los H2 de cada sección. El titular de El problema sube a 830 y clamp 44–112px.
- **Title** (800, clamp 30–48px, 1, −0.03em): subtítulos de bloque.
- **Lead** (500, clamp 19–23px, 1.42, máx. 34em): el párrafo que sigue a un titular.
- **Body** (400, 18px, 1.55): texto corrido, con `text-wrap: pretty`.
- **Label** (700–760, 15–17px): texto de píldoras, chips, pestañas y enlaces de navegación.
- **Fineprint** (14px, 1.5, máx. 60ch): notas legales y de riesgo; opacidad 0.86, que sube a 1 sobre arcilla para mantener contraste.
- **Números de la app** (820–870 en cqw, −0.035em, `tabular-nums`): montos como "$75.000" dentro del teléfono.

### Named Rules
**The Una Palabra de Tiempo Rule.** Fraunces itálica (480, SOFT 100, WONK 0) aparece como máximo una vez por titular, sobre una sola palabra, de preferencia de tiempo o de ritmo ("cada", "poquito"; en Tu plata, "comprobar"). En el cierre va en arcilla y a 1.04em. Nunca un titular entero en serif, nunca en cuerpo.

**The Negro y Apretado Rule.** Todo titular va en Figtree 800 o más con tracking negativo (−0.03em a −0.045em) e interlineado menor a 1. Pesos de 600 hacia abajo son para cuerpo y apoyo.

## Layout

El contenido vive en un contenedor de `min(100% − 2·pad-x, 1320px)` centrado. Cada sección lleva un relleno vertical de `sec-y` (88–176px) y corta lo que se sale (`overflow: clip`) para que el resplandor no desborde.

El hero de escritorio (≥1024px) es un marco de proporción 1536/1024 con `container-type: inline-size`: todo (logo, enlaces, H1, píldora, pantalla del teléfono) se posiciona en porcentajes y `cqw` sobre la placa del mensajero, para que la composición sea idéntica al comp a cualquier ancho. La pantalla del teléfono está rotada 3.1° para seguir la mano. Por debajo de 1024px el hero se vuelve una columna: barra de 76px, texto y una ventana recortada sobre la placa que muestra el teléfono y la persona.

Las secciones usan rejillas de dos o tres columnas asimétricas (por ejemplo 1.05fr / 0.72fr / 1fr en Cómo funciona: texto, teléfono, "o") que colapsan a una columna entre 900 y 1024px. Cómo funciona se fija con `position: sticky` sobre 340vh para avanzar los pasos con el scroll.

Puntos de corte observados: 520, 640, 720, 760, 900 y 1024px.

## Elevation & Depth

El sistema es plano por campos: la profundidad la da el cambio de color entre secciones, no las sombras. Las sombras aparecen solo en objetos que existen en el mundo físico o en la app: el teléfono, la calculadora, la escena de video, la notificación, la barra flotante y las cuentas. Son sombras largas, suaves y teñidas del color del campo (petróleo o arcilla tostada), nunca grises ni duras.

### Shadow Vocabulary
- **Teléfono** (`0 0 0 1.5px #3c4646, 0 40px 80px -20px rgba(4,18,20,.6), 0 18px 36px -18px rgba(4,18,20,.5)`): el cuerpo del teléfono en código.
- **Objeto sobre arcilla** (`0 30px 60px -30px rgba(90,50,20,.35)`): la calculadora de costos.
- **Escena** (`0 40px 80px -40px rgba(60,30,10,.55)`): el recuadro de video de Tú mandas.
- **Flotante** (`0 10px 30px rgba(4,20,22,.28)` más borde interno crema al 8 %): la barra fija, con `backdrop-filter: blur(14px)`.
- **Notificación** (`0 24px 48px -16px rgba(10,20,22,.5)`): el aviso sobre el video.
- **Cuenta** (`0 2px 3px rgba(60,20,10,.3)`): cada cuenta de arcilla y el punto de los pasos.

### Named Rules
**The Sombra Solo en Objetos Rule.** Una sombra solo la lleva algo que se puede sostener o tocar (teléfono, tarjeta de la app, notificación, cuenta). Los campos y los textos nunca proyectan sombra.

## Shapes

Una sola familia de formas, derivada de la terminal redonda del wordmark. Todo lo interactivo es una píldora de radio completo (999px). Las superficies de app usan esquinas amplias (20–36px) y dentro del teléfono escalan en `cqw` (5–7cqw). Los retratos y el video del cierre usan un arco: tope en píldora y base de 28–40px (`999px 999px 28px 28px`). Los círculos (pin, cuentas, checks, ícono de pregunta) completan el vocabulario. No hay esquinas rectas en nada que se toque.

### Named Rules
**The Terminal del Wordmark Rule.** Botones, chips, pestañas, entradas, barra, consentimiento, etiquetas y barras de progreso usan 999px. Si algo se toca y no es una píldora o un círculo, está mal.

## Components

### Buttons
Tácticos y llenos, con un leve levantamiento.
- **Shape:** píldora completa (999px).
- **Primary:** arcilla con texto crema, 750–760 de peso. En la lista de espera mide 60–64px de alto.
- **Hover / Focus:** sube a arcilla encendida y se levanta 1px (`translateY(-1px)`, 160ms, `--ease-calm`); al presionar baja 1px y escala 0.99. Foco: contorno de 3px en arena a 3px de distancia.
- **Crema:** píldora crema con texto petróleo para el CTA de la barra del hero.
- **Petróleo:** píldora petróleo con texto crema dentro de superficies claras (acciones de notificación, consentimiento, "Ver de nuevo").
- **Ghost:** transparente con borde interno de 2px en `currentColor` (`box-shadow: inset`), 48px.

### Chips
- **Style:** píldora de 48px, transparente, borde interno de 2px en arena honda, texto petróleo 700 con `tabular-nums`.
- **State:** al pasar el puntero el borde pasa a petróleo; seleccionado (`aria-checked`) se llena de arcilla honda con texto crema y sin borde.

### Tabs
- **Style:** pestañas de 48px dentro de un riel en píldora (crema al 8 %).
- **State:** seleccionada en crema con texto petróleo; hover crema al 10 %.

### Cards / Containers
- **Corner Style:** 32px para la calculadora y el reproductor Rive; 24px para la tarjeta del día rojo; 20px para insertos de arena; 36px para la escena de video.
- **Background:** pantalla para superficies de app; arena para insertos dentro de ellas.
- **Shadow Strategy:** ver Elevation & Depth; solo los objetos tienen sombra.
- **Border:** ninguno; las divisiones internas son líneas de 1px en petróleo al 12 %.
- **Internal Padding:** clamp(24px, 3vw, 44px) en la calculadora; 22–24px en tarjetas.

### Inputs / Fields
- **Style:** la entrada de correo nace dentro del botón primario. En reposo es solo la píldora arcilla; al activarla, la píldora pasa a pantalla con anillo de 2px en arcilla, aparece el campo y el botón se encoge a "Avisarme" a la derecha.
- **Focus:** el anillo de arcilla; inválido = anillo de 3px en arena.
- **Error / Disabled:** "listo" o "ya estabas" = píldora en salvia UI con texto crema.

### Navigation
- **Hero:** wordmark crema a la izquierda, tres enlaces (520 de peso, subrayado que crece de 0 a 100 % en 280ms) y la píldora crema arriba a la derecha.
- **Barra fija:** cápsula de 60px en petróleo hondo al 90 % con desenfoque, centrada a 12px del borde, que baja en 560ms cuando el hero sale de vista. En ≤720px oculta los enlaces y acorta el CTA.

### Teléfono en código (Signature Component)
El teléfono es un marco (`aspect-ratio: 390/820`, radio 15%/7.2%) con un vidrio en pantalla que declara `container-type: inline-size`. Todo lo de adentro (isla de cámara, barra de estado, títulos, montos, filas, botones) se mide en `cqw` del ancho de la pantalla, así que la misma pantalla sirve en el hero rotado, en una columna de 300px o en móvil sin una sola imagen. Las pantallas son: Tu plan, elegir monto, aviso en pantalla bloqueada, Inicio, retiro, verificación y día rojo.

### La "o" de 500 cuentas (Signature Component)
Un canvas 2D sin librerías dibuja 500 cuentas sombreadas (una por empresa del S&P 500) en 24 estratos, uno por quincena. Cada cuenta es un sprite con degradado radial y sombra de contacto; se llena de abajo hacia arriba y cada cuenta cae y se asienta. Tiene cuatro paletas: `screen` (sobre pantalla), `petrol` (sobre petróleo), `pin` (cuentas crema sobre el disco de arcilla) y `sand`. En el pin grande es interactiva: las cuentas se levantan bajo el puntero. Con movimiento reducido salta directo al estado final.

### Placas
Las imágenes del mundo (el mensajero con el teléfono, la "o" de la pantalla del plan) son placas generadas con su procedencia embebida: los PNG fuente en `assets/plates/` llevan el prompt en un bloque `tEXt` (`impeccable:prompt`) y el manifiesto de origen con `digitalSourceType: trainedAlgorithmicMedia`; cada WebP servido en `public/plates/` tiene un `.json` al lado que apunta a su fuente. La pantalla del teléfono nunca se hornea en la placa: se pinta encima en código.

## Do's and Don'ts

### Do:
- **Do** alternar campos completos de petróleo y arcilla sección por sección (The Campo a Sangre Rule).
- **Do** construir toda pantalla de app en código, dentro del teléfono, medida en `cqw`.
- **Do** usar píldora de 999px para todo lo que se toca.
- **Do** escribir titulares en Figtree 800–870 con tracking negativo y, si hace falta, una sola palabra en Fraunces itálica SOFT 100.
- **Do** animar con `--ease-calm` (cubic-bezier(0.16, 1, 0.3, 1)) o `--ease-settle` (cubic-bezier(0.22, 1, 0.36, 1)) y las duraciones 160 / 280 / 420 / 560 / 900ms; cada entrada ocurre una vez y parte de un estado ya visible.
- **Do** dejar que con movimiento reducido solo cambie la opacidad, y que la "o" salte a su estado final.
- **Do** usar `tabular-nums` en todo monto en pesos.
- **Do** guardar la procedencia en cada placa nueva (prompt en el PNG y `.json` junto al WebP).

### Don't:
- **Don't** usar arena, salvia o pantalla como fondo de una sección; viven solo dentro de la UI.
- **Don't** poner dos campos del mismo color seguidos.
- **Don't** hacer un hero de crema con mockup flotante y titular en serif.
- **Don't** hornear la UI de la app en una imagen o captura.
- **Don't** usar Fraunces para más de una palabra por titular, ni en cuerpo.
- **Don't** usar esquinas rectas en elementos interactivos.
- **Don't** animar en bucle (videos y "o" corren una vez y se quedan en el último cuadro).
- **Don't** poner etiquetas tipo "eyebrow" sobre los titulares.
