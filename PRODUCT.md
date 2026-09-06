# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Sitio comercial LIRN (`lirn-web-main`): React + Vite, decisión explícita del equipo. Se despliega en GitHub Pages. La URL pública de `/torns` alimenta el QR de la infografía; el prompt de generación se completa cuando exista esa URL. Dashboard TORNS: React + Vite ya existente en `tro-frontend`.

## Users

**Visitante de LIRN y de la landing de TORNS.** Público mixto: el jurado o evaluador académico es el primer lector, pero el discurso debe servir también a un operador o decisor de transporte masivo. Llega a decidir si LIRN es una empresa creíble y si TORNS es un producto ofertarable, no a operar el sistema.

**Usuario de la aplicación TORNS.** Personal de centro de control o despacho. En un turno mira ocupación por estación, cámaras y recomendaciones de frecuencia para ajustar la operación.

## Product Purpose

LIRN es una empresa de movilidad. Su oficio: hacer que el transporte masivo responda a la demanda real en estación. Oferta TORNS (Train Optimization Route and Navigation System) como producto.

**Misión (aprobada):** Hacer que el transporte masivo ajuste su oferta a la demanda real de cada estación, midiendo quién espera ahora y no solo lo que el horario predijo.

**Visión (aprobada):** Que cada estación de un sistema masivo opere con la demanda que ocurre, no con la que se supuso.

TORNS detecta, cuantifica y analiza la demanda real de pasajeros en estaciones de transporte masivo, y convierte esos datos en recomendaciones operativas (frecuencia, capacidad, asignación de recursos) para el centro de control.

Éxito operativo: un operador puede ver demanda real por estación y actuar sobre la oferta, en lugar de operar solo con horarios e históricos. LIRN existe para vender esa capacidad como producto, no solo como prototipo de aula.

Éxito del sitio comercial: el visitante entiende quién es LIRN, qué es TORNS y por qué existe. No hay conversión: ni demo, ni contacto, ni “comprar”.

## Positioning

TORNS no es un tablero de cámaras ni un planificador de horarios fijos. Su mecanismo es la demanda medida en estación (visión por computadora) unida a un motor de optimización que propone ajustes de oferta.

El nombre TORNS nace de sistemas ferroviarios ("Train"). El producto no se limita a trenes: cubre cualquier sistema masivo con estaciones (metro, Transmilenio / BRT, tren). "Train" es origen del nombre, no frontera de la oferta.

## Operating Context

El caso de problema público de referencia es Transmilenio en Bogotá: estaciones y vehículos con congestión desigual; la cantidad y la frecuencia no siempre coinciden con la demanda real; eso alarga esperas y empeora el viaje.

Ese contexto es un problema público conocido, no un contrato, piloto ni alianza con TransMilenio.

La aplicación operativa actual vive en `tro-frontend` (React + Vite): Inicio, Monitoreo, Cámaras y Optimización. El backend (`tro-backend`, FastAPI) y el módulo YOLO (`yolo-train-routes-optimization`) alimentan video, conteos y recomendaciones en tiempo real por WebSocket.

La presencia comercial de LIRN (empresa madre que presenta TORNS como producto) vive en un sitio propio, repositorio previsto `lirn-web-main`: landing comercial completa, no una sola pantalla de misión/visión. El dashboard TORNS y el sitio LIRN no comparten repositorio.

Arquitectura del sitio: home institucional de LIRN (nombre, logo, misión, visión). TORNS es el bloque de producto principal en ese home, y tiene página propia de detalle (`/torns` o equivalente) si el visitante quiere profundizar.

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

- LIRN y TORNS son identidades distintas. Relación: marca avalada. TORNS tiene cara propia; “by LIRN” aparece como fabricante. LIRN es la empresa; TORNS es el producto que LIRN oferta.
- La autoridad visual se documenta en DESIGN.md (legible para agentes, subagentes y humanos): justificación de marca, identidad, color, tipografía y estructura visual. No hay manual PDF de papelería o merchandising.
- Distancia visual: familia reconocible (parientes, no clones). LIRN es casa corporativa elegante: papel, grafito, tinta; un azul de tinta cívica puede ocupar una región, no un acento cian. TORNS es la misma tinta a más croma sobre suelo de consola. El gris es el registro de confianza, no el límite de la paleta. Se rechazan el cian y el glow del TRO actual, TransMilenio rojo, vidrio, neón y el default “SaaS gris + acento”. El logotipo de LIRN es lettering del nombre (wordmark), no un isotipo. Versión maestra en blanco; puntas; I como nodo; R/N pueden compartir trazo.
- Habrá un prompt de logotipo LIRN y un prompt de infografía con la base de diseño de TORNS. Esos prompts se escriben después del sistema de marca, no antes.
- La infografía cuenta problema → solución: el desajuste de oferta (contexto Transmilenio) y lo que TORNS cambia. Lleva un código QR que abre la landing `/torns` en GitHub Pages. El prompt se escribe completo en la spec; la URL del QR se inserta cuando el usuario la entregue. No es un diagrama de stack.
- Voces: LIRN habla de ciudad y movilidad; TORNS habla al centro de control, preciso y operativo.
- Idioma de producto y de marca: español, alineado a la UI y a la documentación actuales.
- No reutilizar "TRO", "Sistema de Vigilancia" ni "Transport Route Optimization" como nombre oficial.

## Evidence on Hand

**Autorizado para citar como contexto:** el problema público de congestión y desajuste de oferta en Transmilenio (Bogotá). No presentarlo como implementación, cliente o resultado medido.

**No autorizado como prueba de mercado o de impacto:** clientes, contratos, pilotos, testimonios, logos de terceros, cifras de reducción de espera o de eficiencia. No fabricarlos.

**Existe en el repositorio y no es caso de estudio de un tercero:** el prototipo (frontend, backend, YOLO), capturas en `tro-docs/Assets/`, y el planteamiento en `docs/torns-doc.md`. Pueden mostrar qué es el producto. No pueden usarse como evidencia de adopción real.

## Product Principles

1. La demanda medida en estación manda sobre el horario histórico cuando hay que decidir oferta.
2. LIRN vende un producto para cualquier sistema masivo con estaciones; Transmilenio es el problema de referencia, no un cliente.
3. TORNS se diseña primero para el centro de control: ocupación, cámaras y recomendación de frecuencia.
4. No se inventa prueba. El problema público es contexto; el prototipo es el producto; nada más se afirma como hecho.
5. Empresa y producto no se mezclan: LIRN es quién vende; TORNS es qué se opera.

## Accessibility & Inclusion

No hay un estándar ni una necesidad de usuario específica confirmada. Queda abierto.
