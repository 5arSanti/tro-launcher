# LIRN y TORNS — sistema de marca, sitio comercial y restyle del dashboard

Fecha: 2026-09-05  
Estado: aprobado en diálogo de diseño; pendiente de revisión del archivo por el usuario  
Autoridad de producto: `PRODUCT.md`  
Método de construcción: code-first (`.impeccable/config.json`)

Este documento es la spec de implementación. No inventa hechos fuera de `PRODUCT.md`.

## 1. Qué se construye

Cuatro entregables, en este orden:

1. `DESIGN.md` en `tro-launcher`: autoridad visual de la familia (LIRN + TORNS). Legible para agentes, subagentes y humanos. Justifica marca, color, tipo, estructura y voces. No es un PDF de papelería.
2. Sitio comercial `lirn-web-main` (repo propio, React + Vite), publicado en GitHub Pages: home LIRN y landing `/torns`.
3. Prompts de generación: wordmark LIRN (blanco) e infografía TORNS. El de infografía se completa cuando exista la URL pública de `/torns`.
4. Restyle visual de `tro-frontend` (Inicio, Monitoreo, Cámaras, Optimización) a la expresión TORNS.

## 2. Qué no se construye

- Conversión (demo, contacto, comprar, newsletter).
- Login, integración con un operador, instalación de cámaras.
- Cliente, piloto, alianza o cifras de impacto.
- Manual PDF, merchandising, más productos LIRN.
- Reescritura del copy de cuerpo del dashboard, salvo reemplazo de nombre e identidad (“TRO”, “Sistema de Vigilancia”, “Transport Route Optimization”).
- Diagrama de stack (YOLO, FastAPI, WebSockets) en sitio o infografía.
- QR con URL de ejemplo. Sin URL real, no se genera la infografía ni se muestra un QR falso.

## 3. Relación de marcas

Marca avalada. TORNS tiene cara propia. `by LIRN` es el fabricante.

- LIRN: empresa de movilidad. Voz de ciudad. Home institucional.
- TORNS: producto. Voz de centro de control. Landing `/torns` y dashboard.
- Metáfora: **Red de estaciones**. LIRN es el mapa. TORNS es el estado en vivo de los nodos.
- Parentesco: misma tinta y misma lógica nodo/segmento; distinta luz. No clones. No dos mundos pegados.

**Misión (publicable):** Hacer que el transporte masivo ajuste su oferta a la demanda real de cada estación, midiendo quién espera ahora y no solo lo que el horario predijo.

**Visión (publicable):** Que cada estación de un sistema masivo opere con la demanda que ocurre, no con la que se supuso.

La justificación pregunta a pregunta de la misión vive solo en `DESIGN.md`, no en el home.

## 4. Identidad visual

**Escena.** LIRN: mesa de evaluación, día, papel, mapa bajo vidrio. TORNS: turno de control, luz baja, cifras.

**Color.** Neutros (papel frío, grafito, tinta) son la arquitectura. Un azul de tinta cívica (plano de ingeniería, no cian eléctrico) puede ocupar una región entera en LIRN (banda, línea, bloque de producto). TORNS usa la misma tinta a más croma sobre suelo nocturno. Semáforo (ok / aviso / fallo) es operación, no marca.

**Rechazado.** Cian `#00a8ff` y glow del TRO actual. TransMilenio rojo. Vidrio, neón, héroe en degradado. Crema + serif. Navy SaaS genérico. Inter, Space Grotesk, Outfit e IBM Plex como display.

**Materia.** Papel, grafito, esmalte de señal, metal de línea. Radios casi nulos. Filetes de plano. LIRN se siente impreso. TORNS se siente consola del mismo plano.

**Tipo.** Wordmark LIRN = lettering, no fuente: L I R N, puntas, I como nodo, R/N pueden compartir trazo. Versión maestra blanca (fondos oscuros y prompt). Versión tinta para papel. Grotesca aguda para UI (fuera de la lista rechazada). TORNS: misma familia, más apretada, cifras tabulares.

**Marca TORNS.** No es el wordmark LIRN estirado. Mismo ADN, más peso. Siempre puede llevar `by LIRN` pequeño, a la derecha o debajo, nunca al mismo tamaño.

## 5. Sitio `lirn-web-main`

React + Vite. Dos rutas. Navegación: `LIRN` | `TORNS`. Éxito: el visitante entiende quién es LIRN, qué es TORNS y por qué existe. Base path de GitHub Pages desde el primer commit.

### 5.1 Home `/`

1. Firma: wordmark LIRN + una línea de oficio (empresa de movilidad).
2. Misión y visión: las dos frases de la sección 3. Sin recuadros de valores inventados.
3. Producto: bloque principal TORNS by LIRN. Qué es (demanda medida → recomendación al control). Un enlace a `/torns`.
4. Por qué existe: desajuste de oferta como problema público (contexto Transmilenio, no cliente).
5. Cierre: firma LIRN. Sin contacto.

### 5.2 Landing `/torns`

1. Cabecera: `TORNS` + `by LIRN` + `Demanda real en estación. Oferta ajustada al control.`
2. Problema → solución: los textos de la sección 7.2.
3. Qué hace el operador: `Ve la ocupación.` / `Ve la cámara con detección.` / `Recibe la recomendación.`
4. Infografía (cuando exista el asset con QR real).
5. Límite: `Prototipo. No hay piloto firmado.`

El home no duplica el detalle. El detalle no vuelve a contar la misión.

### 5.3 Errores del sitio

- Ruta desconocida → 404 en voz LIRN: `Esta página no existe.` Enlaces a `/` y `/torns`.
- Asset de marca ausente → wordmark en texto (`LIRN` / `TORNS by LIRN`), no un recuadro roto.
- Sin URL de Pages → no hay QR en página ni en asset.

## 6. Dashboard `tro-frontend`

Restyle visual completo. Mismas rutas, mismos datos, mismos clics.

- Barra: TORNS a la izquierda, nav al centro, estado operativo/desconectado a la derecha, `by LIRN` pequeño. Sin TRO / vigilancia / Transport Route Optimization.
- Inicio: mapa de estado (cámaras, versión, entorno, online/offline, CTA de monitoreo). Las cuatro características se leen como hechos de estación.
- Monitoreo: estación = nodo. Video + conteo + panel. La cifra pesa más que el cromo.
- Cámaras: inventario de nodos.
- Optimización: el panel de despacho es el ancla.

No se tocan hooks, WebSockets ni APIs. Los estados actuales (loading, error de API, vacío, desconectado) conservan comportamiento y cambian de piel. Sin login. Sin enlace de conversión al sitio LIRN.

## 7. Prompts

Se redactan en limpio **después** de `DESIGN.md`. El Prompt B no se ejecuta hasta tener `{{TORNS_LANDING_URL}}` sustituida por la URL que entregue el usuario.

### 7.1 Prompt A — wordmark LIRN

Salida: las letras `LIRN` en blanco sobre negro o transparente. Lettering minimalista, corporativo, elegante. Terminales en punta. I = nodo. R y N pueden compartir trazo. Sin isotipo, tren, bus, chip, glow, color, serif, slogan, `by LIRN` dentro de la marca, mockup. Variante opcional: misma geometría en tinta sobre blanco.

### 7.2 Prompt B — infografía TORNS by LIRN

Poster 16:9 (1920×1080). Dos mitades. Suelo de consola. Tinta cívica. Nodos y segmentos. Cifras tabulares.

**Cabecera**

| Pieza | Texto |
|---|---|
| Marca | `TORNS` |
| Aval | `by LIRN` (30–40 % del tamaño de TORNS) |
| Oficio | `Demanda real en estación. Oferta ajustada al control.` |

**Problema (izquierda)**

| Pieza | Texto |
|---|---|
| Rótulo | `PROBLEMA` |
| Título | `La oferta no sigue a la estación` |
| Cuerpo | `En un sistema masivo, la frecuencia y la capacidad se fijan por horario e histórico. La estación cambia. Una se satura. Otra viaja vacía. Quien espera paga el desajuste.` |
| Pie | `Contexto: congestión y desajuste de oferta en Transmilenio, Bogotá. Problema público. No es un piloto ni un cliente.` |

Imagen: dos nodos (saturado / vacío) y un horario que no se mueve. Sin logo de TransMilenio. Sin foto stock.

**Solución (derecha)**

| Pieza | Texto |
|---|---|
| Rótulo | `SOLUCIÓN` |
| Título | `TORNS mide la estación y recomienda la oferta` |
| Cuerpo | `Cámaras en estación. Conteo de demanda. Recomendación de frecuencia y capacidad al centro de control. El operador ve ocupación, no un promedio.` |
| Hechos | `Ve la ocupación.` / `Ve la cámara con detección.` / `Recibe la recomendación.` |
| Límite | `Prototipo. No hay piloto firmado.` |

Imagen: el mismo mapa con un nodo activo, cifra tabular, flecha a control/despacho. Sin stack.

**Pie**

| Pieza | Texto |
|---|---|
| QR | Destino `{{TORNS_LANDING_URL}}` (solo `/torns`, no el home) |
| Leyenda | `Abrir la landing de TORNS` |
| Firma | `TORNS by LIRN` |
| Cierre | `Cualquier sistema masivo con estaciones.` |

QR: alto contraste, módulo grande, zona de silencio. Placa clara detrás si el suelo es oscuro.

**Prohibido.** “Implementado en TransMilenio”, porcentajes, testimonios, stack, TRO, vigilancia, contacto, compra.

Si el generador falla, se redibuja en SVG con las mismas reglas.

## 8. Datos y flujo

El sitio comercial no llama al backend TORNS. Es estático.

Flujo de la infografía:

1. Publicar `lirn-web-main` en GitHub Pages.
2. Usuario entrega la URL pública de `/torns`.
3. Sustituir `{{TORNS_LANDING_URL}}` en el Prompt B.
4. Generar (o dibujar) la infografía.
5. Colocar el asset en `lirn-web-main/public` (es quien lo sirve). Los prompts cerrados y `DESIGN.md` viven en `tro-launcher`.

El dashboard sigue el flujo actual: frontend → FastAPI → YOLO / WebSocket. El restyle no lo altera.

## 9. Prueba

- Home y `/torns` en desktop y móvil: el visitante puede repetir misión, visión y qué es TORNS.
- Cero CTA de conversión. Cero cifras inventadas.
- `by LIRN` visible en el bloque de producto del home y en `/torns`.
- Pages: la URL de `/torns` abre la landing. El QR, cuando exista, apunta a esa URL y no a `/`.
- App: los cuatro flujos actuales siguen iguales. No quedan las cadenas TRO / Sistema de Vigilancia / Transport Route Optimization.
- Contraste de textos de marca y del QR sobre suelo oscuro.
- 404 y fallback de wordmark en texto.

## 10. Orden de implementación

1. Escribir `DESIGN.md` en `tro-launcher` (familia + justificación de misión).
2. Crear `lirn-web-main`, home y `/torns`, configurar GitHub Pages.
3. Generar wordmark (Prompt A) e integrarlo.
4. Usuario envía URL → completar Prompt B → infografía → integrar.
5. Restyle de `tro-frontend`.

Cada corte es un plan de implementación propio si el volumen lo exige. Esta spec es la autoridad única de los tres.
