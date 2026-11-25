# Diseño: guion de 4 min y vista `/plan` en LIRN

Fecha: 2026-11-24  
Estado: aprobado  
Alcance: guion oral/lectura y una ruta nueva en `lirn-web-main` que lo sostiene. No reemplaza el home ni `/torns`.

## Objetivo

Explicar a alto nivel quién es LIRN, qué es TORNS, qué hizo el taller (AS-IS, TO-BE, cinco puntos) y cómo se proyecta la firma a cinco años según el Plan de Transformación Empresarial. El mismo recorido sirve para una defensa oral y para un visitante que entra en silencio.

Éxito: Santiago puede narrar las nueve escenas en 5:14. Un visitante puede pausar, saltar capítulos y leer el mismo texto. Nadie sale creyendo que hay cliente, piloto firmado o impacto comercial medido.

## Decisiones aprobadas

- Uso dual: defensa oral y página autonarrada.
- Avance: autoreproducción con el ritmo del guion, más pausa, anterior/siguiente y riel. El salto de capítulo pausa el autoplay. Con movimiento reducido no hay autoplay.
- Lenguaje: prosa limpia. Los códigos del taller van al margen, no en voz alta.
- Enfoque A: ruta nueva `/plan`, película de capítulos con imagen LIRN.
- Analogía única: planos de una obra.
- Sin audio grabado en esta versión. El reloj queda listo por si más adelante se engancha voz.
- Al terminar, la escena Cierre se queda. No vuelve a empezar sola.
- Equipo en esta vista: una persona, Johel Santiago Arias. No se copia la banda de tres nombres de `/torns`.

## Fuentes de verdad

- Identidad y claims: `AGENTS.md`, `PRODUCT.md`, `docs/ae-final-project/registro-empresa.md`.
- Visual: `DESIGN.md`. Negro y blanco LIRN, azul `#00A8FF` como señal, Manrope, cortes del isotipo, botones rectos. Paleta TORNS solo en la escena Producto, como velo, no como baño de página.
- Motion ya existente: librería Motion, curva `[0.22, 1, 0.36, 1]`, `StageSlide`, `Reveal`, `usePrefersReducedMotion`. Sin partículas ni loops decorativos.
- Proyección TO-BE: capítulos 8 y 9 del informe y hoja de ruta M5. Horizontes relativos (0–1, 1–3, 3–5 años), no fechas de calendario.

## Guion canónico

Duración total: 5:14. Ritmo de lectura: ~140 palabras por minuto. Una sola voz, español, formal y directo. Sin guion largo. Sin «el dueño decidió».

| # | Id | Escena | Reloj | Palabras guía | Etiqueta de riel |
|---|----|--------|-------|---------------|------------------|
| 1 | `firma` | Firma | 0:00–0:28 | 65 | Firma |
| 2 | `desajuste` | Desajuste | 0:28–1:00 | 75 | Desajuste |
| 3 | `producto` | Qué hace | 1:00–1:42 | 95 | Producto |
| 4 | `limite` | Qué no es | 1:42–2:10 | 70 | Límite |
| 5 | `planos` | El taller | 2:10–2:39 | 68 | Taller |
| 6 | `hoy` | Qué hay hoy | 2:39–3:19 | 93 | Hoy |
| 7 | `puntos` | Los cinco puntos | 3:19–4:20 | 143 | Puntos |
| 8 | `ruta` | Cinco años | 4:20–4:52 | 75 | Ruta |
| 9 | `cierre` | Cierre | 4:52–5:14 | 50 | Cierre |

### Texto hablado / leído

Fuente: `PLAN_BEATS` en `lirn-web-main/src/content/plan.ts`. Si divergen, manda ese arreglo.

**Firma.** LIRN es una firma de movilidad. Aún no está constituida: hoy la conforma una sola persona, su fundador, y ofrece un único producto, TORNS. Por eso la misión es que el transporte masivo ajuste su oferta a quien espera ahora, no solo a lo que el horario predijo. En la misma línea, la visión es que cada estación opere con la demanda que ocurre, no con la que se supuso.

**Desajuste.** En un sistema masivo la oferta se fija por horario y por histórico; el andén, en cambio, cambia a cada minuto. Esa diferencia no es menor: quien espera paga el desajuste con vehículos llenos, estaciones desiguales y una espera que el horario no vio. TransMilenio y el SITP de Bogotá sirven aquí como caso de estudio, no como cliente. Por la misma razón, el desajuste aparece también en metro, BRT o tren.

**Qué hace.** TORNS toma el video de una estación, cuenta a las personas que esperan y, con ese número, recomienda al centro de control el tipo de vehículo y cuántas unidades despachar. En concreto, cuenta personas; no calcula densidad por metro cuadrado. La decisión de despacho, además, sigue siendo humana. Así, la herramienta en el terreno se limita a medir y proponer. El edificio de la empresa, por su parte, viene después.

**Qué no es.** Conviene decir, entonces, lo que no es. No es un piloto firmado ni hay clientes. Tampoco optimiza todas las rutas de la ciudad ni predice la demanda histórica: cuenta personas y aplica una regla de despacho. Aun así, el prototipo existe y se puede consultar, porque el sitio, la página del producto y el código están publicados.

**El taller.** El taller pidió aplicar TOGAF a una organización real y diseñar una arquitectura que apoye sus objetivos. La organización es LIRN; el único producto es TORNS. El método es como los planos de una obra: primero el AS-IS, lo que existe; después el TO-BE, lo que se quiere levantar; y al final el orden de la obra. El resultado es un informe único: el Plan de Transformación Empresarial.

**Qué hay hoy.** Hoy el terreno es estrecho. LIRN aún no está constituida y la conforma una sola persona, su fundador. TORNS es un prototipo aplicado: toma video, cuenta personas y recomienda despacho. No es un piloto firmado y no hay clientes. TransMilenio y el SITP sirven como caso de estudio. Cinco procesos cubren dirección, contacto, producto, acompañamiento y evidencia. El software, además, vive en cuatro superficies, en un solo computador. El conteo se pierde al apagar. No hay respaldo. El video puede incluir imagen de personas y todavía no hay una política de datos publicada.

**Los cinco puntos.** Con ese terreno se recorrieron los cinco puntos del taller. En negocio se fijaron misión, visión y cinco objetivos, un organigrama de una persona, el mapa de procesos y las capacidades que existen y las que faltan. En datos se inventarió lo que circula: leads, encuesta, video, conteos y código; y se vio el problema: memoria volátil y una hoja de cálculo suelta. En aplicaciones se describieron las cuatro superficies y se constató que no hay CRM ni ERP, y que abrir el video dispara la inferencia. En tecnología se documentó la estación de trabajo, las páginas públicas, una GPU obsoleta y un disco cerca de su capacidad; la nube quedó como alternativa, no como decisión tomada. En transformación se cruzó el AS-IS con el TO-BE, se nombraron veintiséis brechas y se armó el portafolio y la hoja de ruta a cinco años.

**Cinco años.** El edificio que se quiere no es una empresa grande. Es una firma pequeña que ya no dependa de un solo computador ni de una sola persona. Por eso el orden es estricto. En el primer año: formalizar, abrir un canal honesto y respaldar lo crítico. Entre el primero y el tercero: video real de estación y un primer piloto pagado. Entre el tercero y el quinto: llevar la recomendación al operador, con decisión humana.

**Cierre.** Así, la arquitectura ayuda porque cada objetivo tiene un proyecto y un horizonte. No hay un impacto comercial que afirmar. Hay un camino: mostrar, cobrar y, solo al final, conectar. LIRN seguirá siendo una empresa pequeña; no debería, sin embargo, depender de un solo computador ni de una sola persona.

### Códigos al margen (no se dicen)

| Escena | Códigos |
|--------|---------|
| Firma | `OE-01` Producto demostrable; `OE-04` Demanda y oferta |
| Desajuste | Caso de estudio |
| Producto | `CAP-04` Detección y conteo; `CAP-05` Recomendación de despacho |
| Límite | Prototipo, no piloto |
| El taller | ADM de TOGAF; Puntos 1 a 5 |
| Qué hay hoy | Observado; P-01 a P-05 |
| Los cinco puntos | Punto 1 Negocio; Punto 2 Datos; Punto 3 Aplicaciones; Punto 4 Tecnología; Punto 5 Roadmap |
| Ruta | `PY-01` Formalización legal; `PY-03` Canal comercial; `PY-07` Seguridad y respaldo; `PY-05` Video de estación; `PY-08` Primer piloto pagado; `PY-06` Integración con el centro de control |
| Cierre | Pregunta del taller; `OE-01` a `OE-05` |

El texto de cada escena en pantalla es el bloque hablado, en medida máxima de 65ch. No se resume a un titular huérfano.

## Vista

Ruta: `/plan`. Título de nav: Plan. Orden: Empresa, Plan, TORNS, Contacto.

Una escena a pantalla por vez. Riel superior con los nueve ids. Controles inferiores: Anterior, Reproducir/Pausa, Siguiente, barra de 5:14. Teclado: flechas y espacio. Hash por escena (`/plan#ruta`).

### Composición por escena

1. **Firma.** Papel azul claro (air / blanco / velo `#00A8FF`). Wordmark oficial a tamaño display sobre claro. Línea de apoyo: «Una persona. Un producto.» Texto del guion. Marca de agua del isotipo.
2. **Desajuste.** Foto de andén monocroma, recorte LIRN. Columna «horario» frente a columna «quien espera». Línea de señal `#00A8FF` que no calza con la foto.
3. **Producto.** Tres nodos: cámara, conteo, recomendación. Se encienden en orden. Velo TORNS pastel (air / panel), no un fill de página. Endoso «TORNS by LIRN».
4. **Límite.** Tres tarjetas: no es piloto; no hay clientes; no es un optimizador de toda la red. Entran una tras otra.
5. **El taller.** Rejilla. Capa «AS-IS» (hoy) y capa «TO-BE» (objetivo) que se dibuja encima.
6. **Hoy.** Cuatro tarjetas: una persona; un computador; prototipo, no piloto; sin respaldo.
7. **Puntos.** Cinco nodos numerados: negocio, datos, aplicaciones, tecnología, transformación.
8. **Ruta.** Línea 0–1 / 1–3 / 3–5 años. El tramo activo se llena con azul de señal. Hitos con código + nombre.
9. **Cierre.** Wordmark. Frase final. CTA Ver TORNS (`/torns`) y Hablemos (`/torns#contacto`).

Fotografía: assets existentes de estación (`StationPhoto`). No se distorsiona ni recolorea el logo oficial.

## Arquitectura

Fuente única: `lirn-web-main/src/content/plan.ts` exporta `PLAN_BEATS` (id, título, texto, `durationMs`, códigos, tipo visual). El hook, el riel, las duraciones y el markdown del guion se alimentan de ese arreglo.

Piezas:

| Pieza | Rol |
|-------|-----|
| `pages/PlanPage.tsx` | Escena activa, riel, controles, live region |
| `hooks/usePlanPlayback.ts` | Índice, playing, tiempo de escena, fin sin loop |
| `components/PlanRail.tsx` | Nueve capítulos |
| `components/PlanStage.tsx` | Cambia el visual según `kind` |
| `StageSlide` | Transición existente |
| `components/PlanControls.tsx` | Anterior, Reproducir/Pausa, Siguiente y barra de 5:14. `StageControls` de `/torns` no se modifica |
| `App.tsx` | Ruta `/plan` |
| `SiteNav.tsx` | Enlace Plan |
| `styles/site.css` | Bloque `.page-plan` con tokens LIRN |

Guion en repo: `docs/presentations/lirn-plan-guion-4min.md`, escrito a mano junto a `plan.ts` con el mismo texto. Si alguna vez divergen, manda `plan.ts` y se corrige el markdown.

Duraciones `durationMs`: Firma 28000; Desajuste 32000; Producto 42000; Límite 28000; El taller 29000; Hoy 40000; Puntos 61000; Ruta 32000; Cierre 22000. Suma 314000.

`usePlanPlayback`:

- Autoplay recorre `durationMs` de cada beat y pasa al siguiente.
- Carga en `/plan` o `/plan#firma`: autoplay encendido, salvo movimiento reducido.
- Carga con otro hash: aterriza en esa escena, en pausa.
- `goPrev`, `goNext`, clic en riel o cambio de hash: pausa y salta.
- Espacio: pausa o reanuda, salvo que el foco esté en un enlace o en un control que no sea Reproducir/Pausa.
- `prefers-reduced-motion`: `playing` arranca en falso y no se enciende solo. Transiciones instantáneas. Línea de tiempo y nodos en estado final de la escena activa.
- Al llegar al último beat y agotar su duración: `playing = false`, se permanece en Cierre.

## Claims prohibidos en copy y tests

La vista y el markdown no contienen: cliente firmado, contrato, alianza, piloto firmado como hecho, KPI de impacto, testimonio, logo de tercero, TRO, Sistema de Vigilancia, Transport Route Optimization, ni Azure/GCP como decisión ya tomada. TransMilenio y SITP solo como caso de estudio. El primer piloto pagado y la integración con el operador se enuncian como camino, no como presente.

## Fuera de alcance

- Grabar o sintetizar audio.
- Cambiar copy del home o de `/torns`, salvo el enlace de nav.
- Corregir la banda de tres nombres en `/torns`.
- Integrar el dashboard `tro-frontend`.
- Elegir nube, publicar política de datos, o afirmar constitución legal.
- Animaciones de partículas, loops de fondo, o una identidad visual nueva.

## Pruebas

- `plan.ts`: el texto canónico está, los `durationMs` suman 314000, cada código lleva nombre, y un assert rechaza las frases prohibidas.
- `usePlanPlayback`: avanza, pausa al saltar, no hace loop, y con movimiento reducido no autoplay.
- `PlanPage`: las nueve escenas se pueden alcanzar; Cierre tiene los dos CTA; hay `aria-live` para el texto de escena.
- `App` / nav: `/plan` existe; el enlace Plan apunta ahí; home y `/torns` conservan su copy actual.
- Manual: desktop y un viewport estrecho; teclado; `prefers-reduced-motion`.

## Criterio de cierre

La ruta `/plan` se puede recorrer en 5:14 en autoplay y a mano. El guion en pantalla coincide con `docs/presentations/lirn-plan-guion-4min.md`. La imagen es LIRN. Un evaluador reconoce AS-IS, TO-BE y los cinco puntos del taller sin ver un claim inventado.
