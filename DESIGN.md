# Design

## World

Red de estaciones. LIRN es el mapa (papel, día, empresa). TORNS es el estado en vivo de los nodos (consola, turno, producto). Misma tinta, distinta luz. Marca avalada.

## Voices

LIRN habla de ciudad y movilidad. TORNS habla al centro de control, preciso y operativo.

## Color

Estrategia: neutros como arquitectura; el azul de tinta cívica puede ocupar una región (banda, línea, bloque de producto), no un botón cian.

| Token | Value | Role |
|---|---|---|
| `--paper` | `#F3F4F2` | Suelo LIRN (papel frío, no crema) |
| `--graphite` | `#3A3F3C` | Texto secundario LIRN |
| `--ink` | `#141714` | Texto primario LIRN |
| `--civic` | `#1B4D73` | Tinta cívica (regiones LIRN) |
| `--civic-strong` | `#3D8EC4` | Tinta a más croma (TORNS) |
| `--line` | `#C5C9C4` | Filete de plano |
| `--night` | `#101410` | Suelo TORNS |
| `--night-panel` | `#181D1A` | Panel de consola |
| `--ok` | `#2F7D4A` | Operación, no marca |
| `--warn` | `#C4922A` | Operación, no marca |
| `--fail` | `#B33A32` | Operación, no marca |

Rechazado: `#00a8ff`, glow, TransMilenio rojo, vidrio, neón, Inter / Space Grotesk / Outfit / IBM Plex como display.

## Type

UI y títulos: Schibsted Grotesk (Google Fonts). Cifras TORNS: `ui-monospace, "Fragment Mono", monospace`, `font-variant-numeric: tabular-nums`. Radios: 0–2px. Filetes 1px.

## Wordmark

LIRN es lettering, no fuente: puntas, I = nodo, R/N pueden compartir trazo. Maestro: blanco. Tinta: `--ink` sobre `--paper`. Fallback de UI: el texto `LIRN` en Schibsted Grotesk 700 si falta el PNG.

## Endorsement

`by LIRN` a la derecha o debajo de TORNS. 30–40 % del tamaño de TORNS. Nunca un segundo logo.

## Mission justification

Frase pública: Hacer que el transporte masivo ajuste su oferta a la demanda real de cada estación, midiendo quién espera ahora y no solo lo que el horario predijo.

| Pregunta | Respuesta |
|---|---|
| ¿Qué hacemos? | Medimos demanda en estación y la convertimos en decisión de oferta. |
| ¿Cuál es nuestro negocio? | Movilidad operativa para sistemas masivos con estaciones. |
| ¿A qué nos dedicamos? | A que frecuencia y capacidad sigan a quien está en el andén. |
| ¿Razón de ser? | Evitar que la oferta viva del promedio cuando la estación ya cambió. |
| ¿Público? | Centros de control y despacho. |
| ¿Ámbito? | Cualquier sistema con estaciones. Transmilenio es problema de referencia, no territorio comercial. |
| ¿Ventaja? | Demanda medida + recomendación al control. |
| ¿Diferencia? | No vendemos cámaras ni horarios fijos. Vendemos la estación como dato vivo. |

Visión pública: Que cada estación de un sistema masivo opere con la demanda que ocurre, no con la que se supuso.
