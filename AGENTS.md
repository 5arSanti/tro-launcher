# AGENTS

Fuente de verdad del launcher. Un agente nuevo lee este archivo antes de implementar software o de redactar el taller de Arquitectura Empresarial.

Si un hecho no está aquí ni en las fuentes canónicas, se escribe `NO CONFIRMADO`. No se inventa.

## Identidad

LIRN es la firma. TORNS es el único producto. No se mezclan.

- LIRN vende. Ofrece un producto para sistemas masivos con estaciones (metro, BRT / Transmilenio, tren).
- TORNS opera. Detecta demanda en estación con visión por computadora y recomienda oferta al centro de control (tipo de vehículo y cantidad).
- Misión: hacer que el transporte masivo ajuste su oferta a la demanda real de cada estación, midiendo quién espera ahora y no solo lo que el horario predijo.
- Visión: que cada estación de un sistema masivo opere con la demanda que ocurre, no con la que se supuso.

TORNS es un prototipo aplicado. No es un piloto firmado. Transmilenio es caso de estudio, no cliente.

## Equipo

Equipo actual: **Johel Arias** (una persona).

No hay plantilla, gerencias ocupadas ni años de empresa. Los dueños de proceso (Dirección, Comercial, Producto / Ingeniería, Operación, Calidad) son roles futuros del mapa ISO, no cargos actuales.

La landing pública puede seguir mostrando tres nombres. Eso es copia publicada antigua. Para agentes y para el taller AE, el equipo es solo Johel Arias.

## Claims prohibidos

No afirmar clientes, contratos, alianzas, piloto firmado, KPIs de impacto, testimonios, logos de terceros ni la identidad TRO / Sistema de Vigilancia / Transport Route Optimization en entregables nuevos.

No afirmar que el código optimiza todas las rutas de la ciudad, predice demanda histórica o calcula densidad por área. El prototipo cuenta personas y aplica reglas de despacho.

## Mapa técnico (AS-IS del prototipo)

El launcher no es una arquitectura de microservicios. Son cuatro superficies en este repo:

| Superficie | Ruta | Stack | Función |
|------------|------|-------|---------|
| Sitio comercial | `lirn-web-main` | React + Vite, GitHub Pages | Home LIRN y `/torns`. Contacto a Google Sheets si existe `VITE_CONTACT_ENDPOINT`. No opera el sistema. |
| Aplicación operativa | `tro-frontend` | React 19 + Vite | Inicio, Monitoreo, Cámaras, Optimización. Consumidor del prototipo. |
| API y detección | `tro-backend` | Python ≥3.11, FastAPI, Ultralytics, OpenCV | Inferencia YOLO, MJPEG, WebSocket de métricas, regla de despacho. |
| Entrenamiento | `yolo-train-routes-optimization` | Ultralytics YOLO11s | Dataset, notebook y pesos `my_model/my_model.pt`. |

Prefijo API: `/api/v1`. Routers: `/health`, `/videos`, `/routing`.

### Flujo en operación

1. El operador abre `tro-frontend` y elige una estación o cámara.
2. El backend abre el video con OpenCV (archivo en `tro-backend/src/app/assets/` o cámara USB/RTSP).
3. `GET /api/v1/videos/{video_id}/stream` corre inferencia y entrega MJPEG con cajas dibujadas.
4. El modelo (`my_model.pt`, clase `person`, umbral 0,5) produce cajas. El backend las resume en un conteo de personas. No calcula densidad por m².
5. `WS /api/v1/videos/ws/{video_id}/detections` publica JSON: `video_id`, `timestamp`, `total_objects`, `person_count`, `label_counts`.
6. El mismo stream actualiza la carga de la estación. La calculadora de despacho elige el tren más pequeño que cubre N y usa `⌈N/C⌉`. Capacidades: 5, 10 y 15. Eso es regla, no IA.
7. `GET /api/v1/routing/stations/status` y `POST /api/v1/routing/dispatch` exponen el estado y la recomendación.

El frontend pinta el video como `<img>` MJPEG. El WebSocket es solo métricas. No envía frames de webcam del navegador.

### Qué no está implementado

- Integración con el control real de un operador.
- Instalación física de cámaras en campo.
- VRP, optimizador de toda la red, predicción histórica.
- Densidad poblacional, ocupación % o bandas bajo/medio/alto.
- Tests de backend. Evaluación de producción del modelo.
- CRM, ERP o autenticación de operador.

### Contratos que no se rompen a ciegas

- Ultralytics: `results[0].boxes` (`.xyxy`, `.cls`, `.conf`) y el nombre de clase `"person"`.
- `person_count` alimenta el despacho. Si la clase cambia de nombre, el conteo queda en cero.
- Abrir el stream dispara la inferencia. Sin stream no hay conteo en vivo.

### Cómo implementar software

1. Leer esta sección y el código vecino en `tro-backend` o `tro-frontend`.
2. Contrastar con `docs/presentations/torns-respuestas-ia-ml.md` si el cambio toca visión.
3. No introducir Flask, otro peso que no sea `my_model.pt`, ni un WebSocket de frames.
4. No afirmar en UI impacto comercial ni piloto.

Hechos de producto y marca: `PRODUCT.md`, `DESIGN.md`.

## Taller de Arquitectura Empresarial

Espacio único: `docs/ae-final-project/`. Índice: `docs/ae-final-project/README.md`. Enunciado: `docs/ae-final-project/docs/definicion-taller-final.md`.

Hitos: M0 fundación (hecho). M1 negocio. M2 datos. M3 aplicaciones. M4 tecnología. M5 roadmap e informe único.

Cada hito M1 a M5 requiere spec y plan antes de redactar. El informe no cita archivos `.md`. Cita entregables por nombre y URL. Tono formal TOGAF, orientado a un decisor de negocio.

Procesos de empresa: `docs/ae-final-project/procesos/` (P-01 a P-05).

## Fuentes canónicas

| Fuente | Autoridad |
|--------|-----------|
| Este archivo | Identidad, equipo, mapa técnico y forma de trabajo |
| `PRODUCT.md` | Misión, visión, posicionamiento y claims |
| `DESIGN.md` | Identidad visual |
| `docs/ae-final-project/` | Taller TOGAF |
| `docs/torns-project-structure.md` | Descubrimiento, entrevista SITP, encuesta n=20 |
| `docs/presentations/torns-respuestas-ia-ml.md` | IA/ML contrastada con código |
| `docs/presentations/torns-core-guion-5min.md` | Principios del núcleo técnico |
| Código de las cuatro superficies | AS-IS real. Manda sobre README antiguos |

`docs/_archive/` no es autoridad.
