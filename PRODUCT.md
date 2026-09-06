# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Sitio comercial LIRN (`lirn-web-main`): React + Vite, decisión explícita del equipo. Se despliega en GitHub Pages. La URL pública de `/torns` alimenta el QR de la infografía; el prompt de generación se completa cuando exista esa URL. Dashboard TORNS: React + Vite ya existente en `tro-frontend`.

## Users

**Visitante de LIRN y de la landing de TORNS.** Decisor o operador de transporte masivo (y evaluador académico como lector secundario). Llega a creer que LIRN es una empresa creíble, entender TORNS como producto ofertarable, y poder iniciar una conversación comercial. No opera el sistema desde el sitio.

**Usuario de la aplicación TORNS.** Personal de centro de control o despacho. En un turno mira ocupación por estación, cámaras y recomendaciones de frecuencia para ajustar la operación.

## Product Purpose

LIRN es una empresa de movilidad. Su oficio: hacer que el transporte masivo responda a la demanda real en estación. Oferta TORNS (Train Optimization Route and Navigation System) como producto.

**Misión (aprobada):** Hacer que el transporte masivo ajuste su oferta a la demanda real de cada estación, midiendo quién espera ahora y no solo lo que el horario predijo.

**Visión (aprobada):** Que cada estación de un sistema masivo opere con la demanda que ocurre, no con la que se supuso.

TORNS detecta, cuantifica y analiza la demanda real de pasajeros en estaciones de transporte masivo, y convierte esos datos en recomendaciones operativas (frecuencia, capacidad, asignación de recursos) para el centro de control.

Éxito operativo: un operador puede ver demanda real por estación y actuar sobre la oferta, en lugar de operar solo con horarios e históricos. LIRN existe para vender esa capacidad como producto, no solo como prototipo de aula.

Éxito del sitio comercial: el visitante entiende quién es LIRN, qué es TORNS y por qué existe, y puede iniciar contacto comercial (CTA primario: Hablemos / Contacto). No hay “comprar” ni demo falsa. La ruta de contacto concreta (mailto, formulario o canal) queda abierta hasta que el equipo la entregue; el sitio reserva el CTA.

## Positioning

TORNS no es un tablero de cámaras ni un planificador de horarios fijos. Su mecanismo es la demanda medida en estación (visión por computadora) unida a un motor de optimización que propone ajustes de oferta.

El nombre TORNS nace de sistemas ferroviarios ("Train"). El producto no se limita a trenes: cubre cualquier sistema masivo con estaciones (metro, Transmilenio / BRT, tren). "Train" es origen del nombre, no frontera de la oferta.

## Operating Context

El caso de problema público de referencia es Transmilenio en Bogotá: estaciones y vehículos con congestión desigual; la cantidad y la frecuencia no siempre coinciden con la demanda real; eso alarga esperas y empeora el viaje.

Ese contexto es un problema público conocido, no un contrato, piloto ni alianza con TransMilenio.

La aplicación operativa actual vive en `tro-frontend` (React + Vite): Inicio, Monitoreo, Cámaras y Optimización. El backend (`tro-backend`, FastAPI) y el módulo YOLO (`yolo-train-routes-optimization`) alimentan video, conteos y recomendaciones en tiempo real por WebSocket.

La presencia comercial de LIRN (empresa madre que presenta TORNS como producto) vive en un sitio propio, repositorio previsto `lirn-web-main`: landing comercial completa, no una sola pantalla de misión/visión. El dashboard TORNS y el sitio LIRN no comparten repositorio.

Arquitectura del sitio: home institucional de LIRN (nombre, logo, misión, visión, problema, camino a TORNS, cierre de contacto). TORNS tiene página propia (`/torns`) en la misma familia de diseño. El dashboard en `tro-frontend` se restylea en la misma familia (modo Operate: mismos flujos, otra piel).

La documentación académica en `docs/torns-doc.md` describe un planteamiento previo centrado en Metro de Bogotá y APCA Transmimetro. Ese recorte queda superado por este registro: la oferta es genérica para sistemas con estaciones; el problema de referencia es Transmilenio.

## Capabilities and Constraints

**Capacidades confirmadas en el prototipo**

- Listado y control de fuentes de video / cámaras por estación.
- Monitoreo en vivo con detección y conteo de personas (YOLOv11).
- Streaming de frames y métricas por WebSocket.
- Vista de optimización: modelos de tren/vehículo, estaciones, estados y panel de despacho con recomendaciones.
- Health check de sistema (versión, entorno, online/offline).

**Restricciones**

- El sistema actual es un prototipo funcional, no una integración con el control real de un operador.
- Queda fuera: instalación física de cámaras e integración con sistemas de gestión del operador.
- No hay cliente, piloto firmado ni alianza comercial confirmada.
- La UI actual aún se presenta como "TRO" / "Sistema de Vigilancia" / "Transport Route Optimization". Esa identidad queda sustituida por LIRN (empresa) y TORNS (producto).
- Rediseño del dashboard: restyle visual completo de las 4 rutas (Inicio, Monitoreo, Cámaras, Optimización). Misma información y mismos flujos; otra piel y otra jerarquía visual. Reescritura de copy de producto queda fuera, salvo el reemplazo de nombre e identidad.
- Misión y visión de LIRN están aprobadas (ver Product Purpose). El cuadro de preguntas de justificación vive en DESIGN.md; no se publica en el home.
- Línea de productos más allá de TORNS: no decidida. Por ahora LIRN oferta un solo producto.

**Terminología**

- LIRN: empresa. El nombre une "Line" (líneas de metro / sistemas de transporte) y "RN" de TORNS.
- TORNS: producto. Train Optimization Route and Navigation System.
- Estación, demanda, ocupación, frecuencia, despacho, centro de control.

## Brand Commitments

- LIRN and TORNS remain endorsed brands. TORNS has its own face; “by LIRN” is manufacturer mark.
- Visual direction (2026-09-06): Architectural Tech Corporate. LIRN is black/white with a stronger `#00A8FF` tertiary (grid, cuts, mission card, hovers). The home TORNS panel uses the TORNS palette. TORNS `/torns` is a chapter film: product, then system stages, then the Transmilenio case. Grounds use `#0a3a5c`, `#135a84`, `#1c7aad`, `#e8f4fb`, and white. Official LIRN marks stay prominent. Not luxury serif. Not the amber/navy brochure.
- `tro-frontend` stays on the 2026-09-05 civic-blue Operate skin until a later cycle. Dashboard still forbids TRO cyan fills.
- CTA Hablemos / Contacto allowed. No comprar, fake demo, invented logos, impact metrics, testimonials, or third-party clients.
- Spanish. Do not reuse TRO / Sistema de Vigilancia / Transport Route Optimization.

## Evidence on Hand

**Autorizado en `/torns`:** el párrafo de problema de Transmilenio; la etiqueta “caso de estudio y prototipo aplicado”; la entrevista al controlador SITP; la encuesta del 17 de agosto de 2026 (n=20), siempre con la leyenda de investigación del equipo. No es resultado de un operador. No es piloto firmado.

**Autorizado como contexto de producto:** capacidades del prototipo (cámaras, YOLOv11, WebSocket, recomendaciones). En `/torns` se puede contar la historia estación → cámara → conteo → recomendación, sin inventar impacto comercial.

**No autorizado:** clientes, contratos, piloto firmado, alianza con TransMilenio S.A., Metro/APCA como cliente, métricas de impacto comercial, testimonios, logos de terceros.

## Product Principles

1. La demanda medida en estación manda sobre el horario histórico cuando hay que decidir oferta.
2. LIRN vende un producto para cualquier sistema masivo con estaciones. Transmilenio es el caso de estudio y el prototipo aplicado, no un cliente ni un piloto firmado.
3. TORNS se diseña primero para el centro de control: ocupación, cámaras y recomendación de frecuencia.
4. No se inventa prueba. El problema público es contexto; el prototipo es el producto; nada más se afirma como hecho.
5. Empresa y producto no se mezclan: LIRN es quién vende; TORNS es qué se opera.

## Accessibility & Inclusion

No hay un estándar ni una necesidad de usuario específica confirmada. Queda abierto.
