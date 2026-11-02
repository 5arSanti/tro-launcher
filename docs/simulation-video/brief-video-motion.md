# Brief — Video de motion graphics · Actividad 10 (Ingeniería Aplicada)

> Documento autocontenido para entregar a una IA de código. Adjuntar: **articulo.pdf** (fuente de verdad) y **guion-video.md** (narración y tiempos). Idioma de todo el texto en pantalla: español.

## 1. Contexto

- **Curso:** Ingeniería Aplicada (prof. Javier Ríos). Estudiante: Santiago Arias. Actividad 10: sustentar en video un artículo científico.
- **Artículo (APA):** Wang, X., Su, H., Zhou, T., & Miao, X. (2022). A subway station platform crowd simulation system. En *ICCMS 2022* (pp. 69–75). ACM. https://doi.org/10.1145/3547578.3547589
- **Objetivo:** producir el **fondo animado** (motion graphics) de un video de **8:50** (530 s). Santiago grabará encima su voz y añadirá sus tomas de cámara en un editor. El video explica paso a paso lo que dice la narración.
- **Especificación técnica:** sin audio · 1920×1080 · 30 fps · MP4 H.264 (yuv420p) · un clip por escena con la duración exacta de su bloque + el video completo concatenado.
- **Zona de cámara:** en las escenas 1, 2, 8, 10 y 11 dejar libre **el tercio derecho** (x ≥ 1280 px) sin elementos importantes; fondo liso allí (sin texto ni marcas "ZONA CÁMARA").
- **Intento anterior rechazado:** un render en Python/skia con fondo azul noche, rejilla, brillos radiales, acentos neón cian/magenta, tarjetas redondeadas con borde y mucho texto. Santiago lo describió como «IA slop». No repetir esa estética.

## 2. Skills y herramienta base (repositorio iart-ai/motion-skills)

Revisado el 1 nov 2026 clonando https://github.com/iart-ai/motion-skills. El README actual dice **56 skills en 19 packs**; cada pack es un repositorio aparte. Los nombres de skills de abajo salen de los `SKILL.md` reales de cada pack.

**Instalación (comandos tal como aparecen en los README):**

```bash
npx skills add iart-ai/motion-design-skills
npx skills add iart-ai/explainer-video-skills
npx skills add iart-ai/data-animation-skills
npx skills add iart-ai/kinetic-typography-skills
# opcional, solo si se usa Manim para la escena de A*/fórmulas:
npx skills add iart-ai/manim-skills
```

Alternativa en Claude Code (según el README): `/plugin marketplace add iart-ai/motion-design-skills` y luego `/plugin install motion-design-skills` (igual para cada pack).

| Pack | Skills a usar | Para qué en este video |
|---|---|---|
| motion-design-skills | `motion-art-direction`, `animation-principles`, `shot-composition`, `color-motion`, `remotion-video` | Lenguaje de movimiento coherente, curvas, composición con zona de cámara, paleta, y el render en Remotion |
| explainer-video-skills | `explainer-video`, `diagram-animation` | Estructura escena a escena sincronizada con la narración; diagramas de bloques, estados y flujos que se revelan paso a paso |
| data-animation-skills | `chart-animation`, `animated-infographic` | Pequeños múltiplos de la escena 9, fichas de datos de la escena 8 |
| kinetic-typography-skills | `kinetic-typography` | Títulos y palabras clave con reveal por línea/palabra, sin exceso de texto |
| manim-skills (opcional) | `manim` | Si se prefiere Manim para la fórmula 4 y la expansión A* |

**No recomendados aquí:** `motion-background` (tienta a poner fondos animados genéricos), `talking-head-b-roll` del pack b-roll-skills (asume un video hablado ya grabado y transcrito; Santiago aún no ha grabado), packs de TikTok, anuncios, e-commerce.

**Herramienta base:** **Remotion** (React, cada fotograma es función de `useCurrentFrame()`; render determinista a MP4). Es lo que usan `remotion-video` y los skills de video del repositorio. Una composición por escena (`Escena01`…`Escena11`) con `durationInFrames = segundos × 30`, más una composición `Completo` que las encadena con `<Series>`. Manim solo como apoyo opcional para la escena 6/7, exportado y montado dentro de Remotion o concatenado con ffmpeg.

**Verificación (carpeta `tools/verify/` del repositorio):** `contact-sheet.sh` (hoja de contactos de fotogramas) y `probe-mp4.sh` (comprueba resolución, códec, fps y duración). Uso según su README: `npx remotion still <Comp> out/f.png --frame=N` para fotogramas y `scripts/probe-mp4.sh out/video.mp4 1920x1080 30`.

## 3. Dirección de arte (anti «IA slop»)

**Concepto:** *señalética de metro + plano técnico editorial.* El video debe parecer diseñado por un estudio de diseño de información, no generado. Un solo sistema visual, repetido con disciplina.

**Referencias de estilo:** diagrama del metro de Nueva York de Massimo Vignelli (1972) y la señalética de Unimark; Estilo Tipográfico Internacional (suizo); explicativos de Vox y los gráficos de The Pudding / NYT Upshot (pequeños múltiplos); 3Blue1Brown solo para el ritmo de las fórmulas (término a término). Mirar planos arquitectónicos: líneas finas, cotas, etiquetas pequeñas.

**Paleta (hex), usar solo estos:**

| Rol | Hex | Uso |
|---|---|---|
| Fondo | `#111315` | Fondo plano, sin degradado, sin rejilla, sin viñeta |
| Superficie | `#1B1E21` | Áreas del andén, paneles (sin borde o con borde 1 px `#2C3035`) |
| Línea / estructura | `#3A3F45` | Bordes del andén, malla, ejes |
| Texto principal | `#ECE8E1` | Titulares y etiquetas (blanco cálido, no blanco puro) |
| Texto secundario | `#8C9096` | Metadatos, fuentes, unidades |
| Acento único | `#FF5A1F` | Lo importante en cada escena: puerta elegida, camino A*, estado activo, peso ganador. Máx. 1–2 elementos a la vez |
| Secundario frío | `#4C7DFF` | Solo para contraste en comparaciones (p. ej., alternativa no elegida, nodos abiertos de A*) |
| Validación | `#2FA37A` | Solo en la escena 9 (combinación más parecida a la realidad) |

Pasajeros: puntos sólidos de 10–12 px en `#ECE8E1`; cambian a `#FF5A1F` solo al decidir. Las 5 puertas NO tienen cada una un color arcoíris: se distinguen por número (1–5) y posición.

**Tipografía:** *Inter Tight* o *Inter* (titulares 600, cuerpo 400) + *JetBrains Mono* o *IBM Plex Mono* para números, fórmulas y metadatos. Fórmulas renderizadas con KaTeX (en Remotion) o LaTeX (Manim). Escala: título de escena 40 px; palabra clave 72–110 px; etiquetas 22–26 px; fuente/página 16 px mono. Máx. 2 pesos por pantalla. Interlineado 1,1 en titulares. Números con coma decimal (0,25; 0,7).

**Ritmo y curvas:**
- Entradas: `cubic-bezier(0.16, 1, 0.3, 1)` (expo‑out), 14–20 f. Salidas: `cubic-bezier(0.7, 0, 0.84, 0)`, 8–12 f, más rápidas que las entradas.
- Movimientos de cámara/zoom: `cubic-bezier(0.65, 0, 0.35, 1)`, 30–45 f.
- Springs de Remotion solo para elementos pequeños (`damping: 200`, sin rebote visible). Nada de overshoot en texto.
- Escalonado (stagger) 3–5 f entre elementos hermanos.
- Cada escena: un movimiento principal, que ocurre cuando la narración lo nombra (calcular a 130 palabras/min sobre el texto del guion). Después, quietud: dejar 1–2 s de pausa visual antes del siguiente evento.
- Pasajeros: velocidad constante en recta, ligera desaceleración al llegar a la fila; nunca 'flotan'.

**Composición:**
- Rejilla de 12 columnas, márgenes 96 px laterales y 80 px arriba/abajo; safe area de títulos 5 %.
- Título de escena discreto arriba a la izquierda: número en mono + nombre (p. ej. `07  Elección de puerta`).
- Un punto focal por pantalla. Mucho espacio negativo (≥ 40 % del cuadro vacío).
- El andén (vista cenital) es el escenario recurrente: misma geometría y orientación en todas las escenas para dar continuidad; las transiciones son movimientos de cámara dentro de ese mundo (zoom, paneo), no cortinillas.
- Escenas con cámara: todo el contenido en x < 1280 px.

**Qué evitar (prohibido):** degradados de fondo, auroras, rejillas decorativas, brillos/glow/bloom, partículas decorativas, tarjetas redondeadas con borde de color, íconos de stock y emojis, glassmorphism, sombras largas, texto con degradado, más de un color de acento a la vez, barras de progreso, rebotes, giros 3D gratuitos, párrafos en pantalla, viñetas de más de 5 palabras, la narración escrita en pantalla.

**Regla de texto:** como máximo **12 palabras visibles a la vez** (fórmulas aparte). La voz explica; la imagen muestra.

## 4. Storyboard (tiempos exactos del guion actual, total 8:50)

### Escena 1 · 0:00–0:45 (45 s) · Introducción · gancho · cámara a la derecha

- **Narración (del guion; la de las escenas 1 y 11 la reescribirá Santiago, pero el sentido se mantiene):** Hola, soy Santiago Arias y en este video les voy a sustentar el artículo «A Subway Station Platform Crowd Simulation System». Para empezar, piensen en lo que hacemos cada vez que llegamos al andén de un metro: bajamos la escalera, miramos las puertas y, casi sin pensarlo, escogemos una. Pues bien, ese gesto tan cotidiano es justo lo que este artículo intenta simular. Desde ya les adelanto mi postura: me parece un trabajo valioso porque no se queda en la teoría, sino que compara su simulación con lo que pasa en una estación real.
- **Qué se ve:** Santiago a cámara a la izquierda (2/3 libre para su toma). En el tercio derecho, un andén visto desde arriba en estilo de plano técnico: línea del borde, 5 puertas como marcas cortas, la escalera. Un único punto (pasajero) baja la escalera, se detiene y 'mira' (un arco muy sutil barre las puertas) y elige una.
- **Animación clave:** El punto se detiene 0,5 s antes de decidir: la pausa es la idea. La puerta elegida se marca con el acento naranja.
- **Texto mínimo en pantalla:** «¿Por qué puerta?»
- **Transición a la siguiente:** Corte seco a la escena 2 en el cambio de frase.

### Escena 2 · 0:45–1:10 (25 s) · El artículo · cámara a la derecha

- **Narración (del guion; la de las escenas 1 y 11 la reescribirá Santiago, pero el sentido se mantiene):** El artículo lo escribieron Xinyu Wang, Hu Su, Tianbao Zhou y Xiyu Miao, de universidades chinas como la Southwest Jiaotong University. Se presentó en la 14.ª Conferencia Internacional de Modelado y Simulación por Computador, ICCMS 2022, en Chongqing, y lo publicó la ACM. Ahora bien, antes de entrar en el método, conviene entender qué problema quieren resolver.
- **Qué se ve:** Ficha editorial tipo portada de revista científica, ocupando 2/3 izquierdos; cámara a la derecha. Tipografía grande para el título, metadatos en mono pequeña.
- **Animación clave:** El título se escribe por líneas con máscara (reveal de abajo arriba, 12 f por línea). Los metadatos entran en cascada de 4 f.
- **Texto mínimo en pantalla:** Título del artículo · ICCMS 2022 · ACM · pp. 69–75
- **Transición a la siguiente:** Wipe horizontal del panel hacia la izquierda que deja ver el andén.

### Escena 3 · 1:10–1:55 (45 s) · El problema

- **Narración (del guion; la de las escenas 1 y 11 la reescribirá Santiago, pero el sentido se mantiene):** El problema es sencillo de explicar. En la mayoría de los simuladores de metro que existen, los pasajeros del andén usan rutas fijas, planeadas de antemano, para subir y bajar del tren. Es decir, no deciden nada: simplemente siguen un camino. Y en la vida real eso no pasa, porque cada persona mira cuánta gente hay, qué tan lejos está la puerta y si la alcanza a ver. Por eso, el objetivo de los autores es construir un sistema en el que cada pasajero virtual tome sus propias decisiones y, al final, comprobar que esas decisiones se parecen a las reales.
- **Qué se ve:** Pantalla completa. Mismo andén dibujado dos veces (arriba/abajo o izquierda/derecha). A: puntos en fila india siguiendo UNA línea discontinua fija hasta la misma puerta. B: puntos que salen de la escalera y se reparten entre puertas según la fila.
- **Animación clave:** Mismo ritmo de llegada en A y B; en A la fila crece absurda en una sola puerta; en B se equilibra. La diferencia debe entenderse sin texto.
- **Texto mínimo en pantalla:** «Ruta fija» / «Decide»
- **Transición a la siguiente:** Zoom continuo hacia el andén B, que se convierte en el escenario de la escena 4.

### Escena 4 · 1:55–2:50 (55 s) · Arquitectura del sistema

- **Narración (del guion; la de las escenas 1 y 11 la reescribirá Santiago, pero el sentido se mantiene):** Para lograrlo, el sistema se divide en dos partes. La primera es el generador de información del entorno. Este toma el modelo 3D de la estación en Unity, quita los obstáculos y zonas por donde no se puede pasar, y crea una malla de navegación, llamada NavMesh, hecha de polígonos convexos. Además, guarda la información de cada puerta: dónde está, cuántas personas hay en la fila y el máximo de personas que caben. La segunda parte es el sistema de pasajero inteligente, que planea la ruta, decide el comportamiento y pone la animación correcta. Lo interesante es que cada pasajero tiene atributos propios, como su velocidad máxima, para que no todos se comporten igual.
- **Qué se ve:** Dos bloques conectados: 'Entorno' → 'Pasajero inteligente'. Luego el andén: los obstáculos se borran y aparece la malla NavMesh de polígonos convexos dibujándose línea a línea. Junto a cada puerta, una etiqueta mínima (posición · fila · máximo) que representa la clase DoorManager.
- **Animación clave:** La malla se 'teje' con trazos (stroke-dashoffset) en ~2 s, no aparece de golpe. Cada pasajero recibe una velocidad máxima distinta: puntos que avanzan a ritmos distintos.
- **Texto mínimo en pantalla:** «Entorno» · «Pasajero» · «NavMesh»
- **Transición a la siguiente:** El punto de un pasajero se agranda y se convierte en el nodo 1 del diagrama de estados (match cut).

### Escena 5 · 2:50–3:30 (40 s) · Máquina de 4 estados

- **Narración (del guion; la de las escenas 1 y 11 la reescribirá Santiago, pero el sentido se mantiene):** Ahora, ¿cómo se controla lo que hace cada pasajero? Con una máquina de estados finitos. La idea es que el pasajero siempre está en uno de cuatro estados. Primero, baja las escaleras. Luego, cuando llega al andén, busca la puerta más conveniente. Después, hace la fila frente a esa puerta. Y por último, cuando llega el tren, se sube. El sistema revisa todo el tiempo si se cumple la condición para pasar al siguiente estado y, cuando se cumple, cambia la acción y la animación.
- **Qué se ve:** Diagrama lineal de 4 nodos (no en ciclo cerrado si confunde): Bajar escaleras → Buscar puerta → Hacer fila → Subir al tren, con los nombres del artículo DownStair, FindDoor, QueueUp, GetCar en mono pequeña. A la vez, un pasajero en el andén ejecuta cada estado sincronizado con el nodo activo.
- **Animación clave:** El nodo activo se rellena; la transición entre nodos es una línea que se dibuja cuando 'se cumple la condición'. Sincronizar con las frases 'Primero… Luego… Después… Y por último'.
- **Texto mínimo en pantalla:** Los 4 nombres de estado
- **Transición a la siguiente:** El andén se rasteriza en cuadrícula para la escena A*.

### Escena 6 · 3:30–4:15 (45 s) · Ruta A* y colisiones

- **Narración (del guion; la de las escenas 1 y 11 la reescribirá Santiago, pero el sentido se mantiene):** Para moverse, cada pasajero usa el algoritmo A*, que busca el camino de menor costo dentro de la malla. Su fórmula es f(n) igual a g(n) más h(n): g es lo que ya costó llegar a un punto y h es una estimación de lo que falta hasta el destino. Así, el algoritmo siempre avanza por el punto con menor costo total. Por otra parte, para que los pasajeros no se atraviesen entre sí, a cada uno le ponen un cuerpo rígido y un colisionador tipo cápsula de 0,25 metros de radio, calculado a partir de medidas del cuerpo humano.
- **Qué se ve:** Cuadrícula sobre el andén con obstáculos. A* real (calculado, no simulado a ojo) expandiendo nodos desde el pasajero hasta la puerta; luego el camino óptimo en acento. Después, zoom a un pasajero: círculo-cápsula de radio 0,25 m.
- **Animación clave:** Frontera abierta en tono medio, nodos cerrados atenuados, camino en naranja dibujado de inicio a fin. La fórmula f(n) = g(n) + h(n) aparece y cada término se ilumina cuando la narración lo nombra.
- **Texto mínimo en pantalla:** f(n) = g(n) + h(n) · r = 0,25 m
- **Transición a la siguiente:** Zoom out a las 5 puertas: arranca la escena 7.

### Escena 7 · 4:15–5:50 (95 s) · ¿Qué puerta elegir?

- **Narración (del guion; la de las escenas 1 y 11 la reescribirá Santiago, pero el sentido se mantiene):** Y aquí viene la parte que, para mí, es el corazón del artículo: cómo se escoge la puerta. Los autores observaron que la elección depende de la gente alrededor, de la distancia y de si la puerta se ve, porque las puertas en un punto ciego se ignoran. Con eso probaron dos métodos. El primero es una fórmula ajustada: S es igual a diez por el logaritmo natural de P más e, más la raíz de L por uno sobre M, y todo eso multiplicado por K, un valor aleatorio entre 0,8 y 1,2 que le da algo de azar a cada pasajero. Aquí P es la fila, L la distancia y M la gente alrededor de la puerta. El efecto de la fila es fuerte al principio y luego se suaviza, y el pasajero escoge la puerta con el valor más bajo. El segundo método es TOPSIS, una técnica de decisión con varios criterios: califica cada puerta según qué tan cerca está de la opción ideal y qué tan lejos de la peor, con pesos para la distancia, la fila y la visibilidad. Una puerta visible vale 1 y una que no se ve, 0,3. Al final, gana la puerta con mejor puntaje.
- **Qué se ve:** Tres actos: (1) criterios: distancia, fila, gente alrededor, visibilidad (la puerta oculta se atenúa al 30 %: visible = 1, no visible = 0,3); (2) fórmula 4 construida término a término; K como un dial que oscila entre 0,8 y 1,2; la puerta con menor S se marca; (3) TOPSIS: plano con punto ideal y anti‑ideal; distancias de cada puerta; gana la de mayor Si.
- **Animación clave:** Fórmula: cada término entra cuando se nombra (ln, raíz, 1/M, K). En TOPSIS las distancias se trazan como líneas finas que se cuentan, no como 'brillos'. Valores de ejemplo marcados «ilustrativo».
- **Texto mínimo en pantalla:** S = (10·ln(P+e) + √L·1/M)·K · K ∈ [0,8 ; 1,2] · «TOPSIS»
- **Transición a la siguiente:** Fundido a la vista de la estación real (escena 8).

### Escena 8 · 5:50–6:35 (45 s) · Estudio de campo en Chengdu · cámara a la derecha

- **Narración (del guion; la de las escenas 1 y 11 la reescribirá Santiago, pero el sentido se mantiene):** Para comprobar si todo esto se parece a la realidad, los autores hicieron un estudio de campo en la estación Xingye North Street, de la línea 6 del metro de Chengdu, a las cinco de la tarde. En ese momento pasaba un tren cada cuatro minutos, más o menos, y contaron la gente en las cinco puertas más cercanas a la escalera. Una de ellas, la puerta 1, queda detrás de la escalera y no se ve directamente. Luego, en la simulación, generaron un pasajero cada 0,7 segundos aproximadamente, igual que en la realidad.
- **Qué se ve:** Tercio derecho libre para la cámara. Ficha de datos estilo señalética de metro: Xingye North Street · Línea 6 · Chengdu · 5:00 p. m. · tren ≈ cada 4 min · 5 puertas. Andén esquemático con la puerta 1 detrás de la escalera (sin línea de visión). Después, pasajeros apareciendo cada ≈ 0,7 s.
- **Animación clave:** La línea de visión hacia la puerta 1 se corta contra la escalera. Contador discreto de llegadas al ritmo de 0,7 s.
- **Texto mínimo en pantalla:** Los 5 datos de la ficha, nada más
- **Transición a la siguiente:** Los datos se condensan en las tres etiquetas de pesos (escena 9).

### Escena 9 · 6:35–7:30 (55 s) · Resultados con TOPSIS

- **Narración (del guion; la de las escenas 1 y 11 la reescribirá Santiago, pero el sentido se mantiene):** ¿Y qué encontraron? Con la fórmula ajustada, la gente se repartía de forma muy pareja entre las puertas, pero el método no tiene en cuenta que preferimos las puertas que vemos, así que la puerta oculta no se comportaba como en la realidad. Con TOPSIS probaron tres combinaciones de pesos. Al cambiarlos, cambiaba bastante cuánto pesaba la cercanía frente a la fila. Sin embargo, la combinación que más se pareció a lo observado fue 0,4 para la distancia, 0,4 para la fila y 0,2 para la visibilidad. En otras palabras, la gente camina hasta una puerta más lejana cuando hay mucha fila, y no escoge la puerta que no ve aunque esté más cerca.
- **Qué se ve:** Tres pequeños múltiplos (small multiples) con los pesos distancia/fila/visibilidad: 0,4/0,4/0,2 · 0,2/0,6/0,2 · 0,6/0,2/0,2. Eje del tiempo 0–240 s. Curvas de tendencia por puerta CLARAMENTE marcadas «ilustrativo, no datos del artículo». Al final, el primer panel se destaca como el más parecido a lo observado.
- **Animación clave:** Antes: un comentario sobre la fórmula ajustada (reparto parejo, falla con la puerta oculta). Las curvas se dibujan de izquierda a derecha; los otros dos paneles bajan a 40 % de opacidad al destacar 0,4/0,4/0,2.
- **Texto mínimo en pantalla:** Pesos · «0–240 s» · «ilustrativo»
- **Transición a la siguiente:** Los paneles se colapsan en tres marcas de verificación (escena 10).

### Escena 10 · 7:30–8:00 (30 s) · Conclusión y limitación · cámara a la derecha

- **Narración (del guion; la de las escenas 1 y 11 la reescribirá Santiago, pero el sentido se mantiene):** En conclusión, el artículo logra un sistema completo de simulación de pasajeros con rutas óptimas usando A*, choques evitados con colisionadores y una estrategia de elección de puerta basada en un estudio real. Aun así, los mismos autores reconocen una limitación: los pasajeros son individuos sueltos, sin fuerzas sociales, como caminar en pareja o seguir a otros. Eso queda como su siguiente paso.
- **Qué se ve:** Tercio derecho libre. Tres logros en una línea cada uno (A*, colisionador, elección de puerta basada en estudio real). Luego la limitación: puntos que caminan sueltos vs. puntos que caminan en pareja o siguiéndose (fuerzas sociales: siguiente paso).
- **Animación clave:** Los puntos sueltos se mueven independientes; luego dos se 'enlazan' con una línea fina y caminan juntos para mostrar lo que falta.
- **Texto mínimo en pantalla:** «Sin fuerzas sociales»
- **Transición a la siguiente:** Fundido lento al fondo del cierre.

### Escena 11 · 8:00–8:50 (50 s) · Cierre · cámara a la derecha

- **Narración (del guion; la de las escenas 1 y 11 la reescribirá Santiago, pero el sentido se mantiene):** Para cerrar, lo más relevante que aprendí es que una simulación vale lo que vale su validación: no basta con que se vea bonita, hay que compararla con datos reales. También me quedó claro que pequeñas decisiones humanas, como no ver una puerta, cambian el resultado de todo el sistema. Y, por último, creo que esto sirve mucho para nuestro contexto, por ejemplo para pensar cómo se distribuye la gente en estaciones de TransMilenio o del metro que se está construyendo en Bogotá. Aclaro que este ejemplo de TransMilenio y del metro de Bogotá es una idea propia, no algo que aparezca en el artículo. Muchas gracias.
- **Qué se ve:** Santiago a cámara (2/3). Tres palabras clave grandes aparecen una tras otra: Validar · Decisiones humanas · Contexto local. La tercera lleva la etiqueta «idea propia» (TransMilenio/metro de Bogotá NO está en el artículo). Último plano: el andén inicial con el punto subiendo al tren.
- **Animación clave:** Ritmo lento, mucho espacio negativo; cada palabra entra con la frase correspondiente.
- **Texto mínimo en pantalla:** 3 palabras + «idea propia» + «Gracias»
- **Transición a la siguiente:** Fundido a negro de 1 s al final (8:50).

## 5. Hoja de datos verificados (articulo.pdf; páginas impresas 69–75)

| Dato | Valor | Ubicación |
|---|---|---|
| Problema | Los simuladores usan rutas fijas planificadas para los pasajeros del andén | Resumen, p. 69 |
| Arquitectura | Generador de información del entorno (Unity, NavMesh de polígonos convexos, datos de puertas en clase singleton DoorManager: posición, personas en fila, máximo) + sistema de pasajero inteligente (ruta, comportamiento, animación; atributos propios como velocidad máxima) | Secc. 2–2.2, p. 70 |
| Máquina de estados | 4 estados: DownStair (bajar escaleras) → FindDoor (buscar puerta) → QueueUp (hacer fila) → GetCar (subir al tren) | Secc. 3.1, p. 71 |
| Búsqueda de ruta | Algoritmo A*; f(n) = g(n) + h(n) (fórmula 1) | Secc. 3.2, pp. 71–72 |
| Colisiones | Cuerpo rígido + colisionador cápsula de radio 0,25 m (derivado de un área proyectada de 0,198 m) | Secc. 3.2, p. 72 |
| Criterios de puerta | Distancia, personas en fila, personas alrededor, visibilidad; puertas en punto ciego se ignoran; visible = 1, no visible = 0,3 | Secc. 3.3, p. 72 |
| Fórmula 4 (verificada en la imagen del PDF) | S = (10·ln(P + e) + √L · 1/M) · K; P = personas en fila, L = distancia, M = personas alrededor de la puerta; se elige la puerta con menor S; el efecto de P es fuerte al inicio y se suaviza | Secc. 3.3.1, p. 72 |
| Factor K | Aleatorio entre 0,8 y 1,2 | Secc. 3.3.1, p. 72 |
| TOPSIS | Fórmulas 5–13; se elige la puerta con mayor Si (cercanía a la solución ideal) | Secc. 3.3.2, p. 72 |
| Estudio de campo | Estación Xingye North Street, línea 6 del metro de Chengdu, 5:00 p. m., un tren cada ≈ 4 min, 5 puertas observadas; la puerta 1 está detrás de la escalera y no se ve directamente | Secc. 4.1, p. 73 |
| Simulación | Un pasajero generado cada ≈ 0,7 s | Secc. 4.2, p. 73 |
| Pesos TOPSIS (distancia/fila/visibilidad) | 0,4/0,4/0,2 (Fig. 11, la más parecida a lo observado); 0,2/0,6/0,2 (Fig. 12); 0,6/0,2/0,2 (Fig. 13) | Secc. 4.2.2, pp. 73–74 |
| Ejes de resultados | Tiempo de 0 a 240 s (Figs. 10–13) | p. 74 |
| Resultado fórmula ajustada | Reparto parejo entre puertas, pero no considera la preferencia por puertas visibles | Secc. 4.2.1, p. 73 |
| Limitación | Pasajeros como individuos, sin fuerzas sociales (caminar en pareja, seguir a otros); trabajo futuro | Secc. 5, pp. 74–75 |

**Reglas de datos:**
1. No inventar ningún valor. Solo los de esta tabla (y del PDF adjunto, citando página).
2. Las figuras 10–13 del PDF tienen baja resolución: **no leer valores de ellas**. Las curvas de la escena 9 son tendencias cualitativas y deben llevar la etiqueta visible «ilustrativo».
3. Cualquier número de ejemplo (valores de S, puntuaciones Si, velocidades, cuántos pasajeros hay en fila) lleva la etiqueta «ejemplo ilustrativo».
4. El esquema del andén no es el plano real de la estación: rotularlo como «esquema».
5. TransMilenio / metro de Bogotá NO aparecen en el artículo: en la escena 11 rotular «idea propia».
6. Escribir siempre «TOPSIS» en mayúsculas y usar coma decimal.

## 6. Entregables y criterios de aceptación

**Entregables** (carpeta `video-v2/`):
- `escena01.mp4` … `escena11.mp4` (duración exacta: 45, 25, 45, 55, 40, 45, 95, 45, 55, 30, 50 s).
- `video-motion-v2.mp4` concatenado (530 s = 15.900 fotogramas).
- Código fuente del proyecto Remotion (y Manim si se usa) con instrucciones `README` para re-renderizar.
- `contact-sheet-escenaNN.png` (inicio | medio | fin) para cada escena, y 4 capturas PNG representativas.

**Criterios de aceptación:**
- `probe-mp4.sh` pasa: 1920×1080, H.264, 30 fps, duración exacta por clip y total; sin pista de audio.
- Cada evento visual coincide (±1 s) con la frase de la narración que lo nombra, leída a 130 palabras/min.
- Todos los datos coinciden con la hoja de la sección 5; lo ilustrativo está rotulado.
- Escenas 1, 2, 8, 10 y 11: tercio derecho limpio.
- Paleta, tipografías y lista de prohibiciones de la sección 3 respetadas.

**Lista de verificación de calidad** (revisar en la hoja de contactos de cada escena):
- [ ] Ningún texto cortado, solapado o fuera de los márgenes.
- [ ] ≤ 12 palabras visibles a la vez; ningún párrafo en pantalla.
- [ ] Un solo acento naranja dominante por cuadro.
- [ ] Sin degradados, brillos, rejillas decorativas, íconos de stock ni emojis.
- [ ] El andén mantiene la misma geometría y orientación entre escenas.
- [ ] Movimientos suaves, sin tirones ni rebotes; pausas visuales tras cada idea.
- [ ] Ortografía y tildes correctas en español; coma decimal.
- [ ] Fórmulas legibles (≥ 48 px) y correctas: f(n) = g(n) + h(n); S = (10·ln(P + e) + √L · 1/M) · K.
- [ ] Etiquetas «ilustrativo», «esquema» e «idea propia» presentes donde corresponde.
- [ ] Fundidos sin fotogramas negros intermedios no deseados; el último fotograma termina en negro.

## 7. Prompt inicial para pegar a la IA

```text
Instala los packs de iart-ai: motion-design-skills, explainer-video-skills, data-animation-skills y kinetic-typography-skills (npx skills add iart-ai/<pack>). Lee brief-video-motion.md completo, guion-video.md y articulo.pdf (adjuntos). Usa los skills motion-art-direction, explainer-video, diagram-animation, chart-animation, kinetic-typography y remotion-video. Construye en Remotion un video SIN audio de 8:50, 1920x1080, 30 fps, H.264, con 11 composiciones (una por escena, con las duraciones exactas del brief) y una completa. Respeta al pie de la letra la dirección de arte (paleta hex, tipografías, curvas, prohibiciones, máx. 12 palabras en pantalla) y la hoja de datos: no inventes valores y rotula lo ilustrativo. Antes de renderizar todo, entrega la escena 7 como prueba con su hoja de contactos (inicio|medio|fin) y espera aprobación. Verifica cada clip con probe-mp4.sh.
```

**Adjuntar a la IA:** `articulo.pdf` y `guion-video.md` (más este brief).
