# Diseño: Onda M1. Arquitectura de Negocio (Punto 1 TOGAF)

Fecha: 2026-10-21
Estado: aprobado
Alcance: diseño y contratos de la Onda M1 (`docs/ae-final-project/ondas/M1-negocio/`), actualización de `docs/ae-final-project/registro-empresa.md` al cierre de M1 y verificación mediante `scripts/assert-ae-m1.mjs`. No redacta `informe/` ni los puntos 2 a 5.

## 1. Propósito

Entregar el **Punto 1. Arquitectura de Negocio** completo del taller TOGAF para **LIRN** (la firma) y **TORNS** (el único producto), cumpliendo todos los subpuntos del enunciado (`docs/ae-final-project/docs/definicion-taller-final.md`) sin huecos, contradicciones ni afirmaciones de escala inexistente.

Cada afirmación lleva su marca (`Observado`, `Diseñado AS-IS`, `Objetivo TO-BE`) o se declara `NO CONFIRMADO` cuando no exista en las fuentes canónicas.

## 2. Estructura de archivos en `docs/ae-final-project/ondas/M1-negocio/`

Para que el Punto 1 sea modular, trazable hacia el futuro informe único (M5) y fácil de auditar por subpunto del enunciado, la carpeta `ondas/M1-negocio/` contendrá:

| Archivo | Subpunto del enunciado que cubre |
|---------|----------------------------------|
| `README.md` | Índice de la onda M1, estado (`completada` al cerrar), tabla de entregables y enlace al registro. |
| `01-organizacion-y-estrategia.md` | **1. Descripción de la organización**, **2. Misión, visión y objetivos estratégicos** y **Justificación empresarial del AS-IS** (SAS unipersonal, organigrama sin gerencias ocupadas, mercado sin cliente firmado). |
| `02-organigrama-y-stakeholders.md` | **3. Organigrama** (recreación gráfica Mermaid AS-IS jerárquica + vista funcional de 5 áreas y relaciones entre áreas) y **7. Stakeholders** (partes interesadas con clasificación e influencia). |
| `03-activos-procesos-capacidades.md` | **4. Activos de información** (inventario clasificado ≥5 activos + clasificación de datos personales bajo Ley 1581 de 2012), **5. Mapa de procesos BPM** (P-01 estratégico, P-02 a P-04 misionales, P-05 apoyo, con diagramas BPMN publicados y enlace a Lucidchart) y **6. Mapa de capacidades** (capacidades presentes y ausentes como brecha). |
| `04-arquitectura-negocio-as-is.md` | **8. Documento Arquitectura de Negocio (AS-IS)** (documento integrador de cómo opera hoy LIRN en negocio, procesos, servicios, capacidades, actores y flujos de información, y cómo se apoya en datos, aplicaciones y tecnología para cumplir misión y visión). |

## 3. Decisiones de contenido por entregable (bloqueadas para M1)

### 3.1 Descripción de la organización (`01-organizacion-y-estrategia.md`)
- **Nombre de la organización:** LIRN (`Diseñado AS-IS` como razón social de trabajo; marca observada en el sitio institucional).
- **Forma jurídica y sede:** Sociedad por Acciones Simplificada (SAS) en Bogotá D.C., Colombia (`Diseñado AS-IS`). NIT y matrícula mercantil: pendientes de formalización registral (`Brecha`, no se inventa número).
- **Sector económico:** Desarrollo de software y Sistemas Inteligentes de Transporte (ITS) aplicados a movilidad urbana y transporte público masivo (`Diseñado AS-IS`, CIIU de referencia 6201 / 6202 como marco de actividad económica).
- **Tamaño:** Microempresa unipersonal (`Observado` en equipo: 1 persona, Johel Arias; `Diseñado AS-IS` en clasificación empresarial colombiana según Decreto 957 de 2019).
- **Producto o servicio:** Un único producto: **TORNS** (*Train Optimization Route and Navigation System*), prototipo funcional aplicado que mide demanda de pasajeros en estación mediante visión por computadora (conteo de personas con YOLO11s, umbral 0,5) y calcula recomendaciones deterministas de oferta de vehículos (`⌈N/C⌉` sobre capacidades 5, 10 y 15 elgiiendo el tren más pequeño suficiente) para el centro de control (`Observado`).
- **Clientes principales:** Ningún cliente firmado ni piloto contratado (`Observado`). Segmento objetivo prioritario: operadores de transporte masivo con estaciones (B2B concesionarios de operación troncal/ferroviaria, valoración 4,15/5, y B2G entes gestores y sistemas metro/BRT como el Sistema Metro de Bogotá, valoración 4,00/5, según matriz de descubrimiento en `docs/torns-project-structure.md`). Transmilenio es caso de estudio y problema público de referencia, no cliente.

### 3.2 Misión, visión, objetivos estratégicos y justificación (`01-organizacion-y-estrategia.md`)
- **Misión actual (`Observado`, `PRODUCT.md`):** Hacer que el transporte masivo ajuste su oferta a la demanda real de cada estación, midiendo quién espera ahora y no solo lo que el horario predijo.
- **Visión actual (`Observado`, `PRODUCT.md`):** Que cada estación de un sistema masivo opere con la demanda que ocurre, no con la que se supuso.
- **Objetivos estratégicos (`Diseñado AS-IS`, bloqueados en registro):**
  1. Convertir el prototipo TORNS en un producto demostrable y controlado para un centro de control.
  2. Abrir un canal comercial honesto hacia operadores B2B y B2G, sin afirmar cliente.
  3. Proteger datos personales y evidencia según Ley 1581 y el mapa de procesos.
  4. Cerrar la brecha entre demanda medida y oferta recomendada como propuesta de valor única.
  5. Preparar la firma para un primer piloto pagado en el horizonte TO-BE, no como hecho actual.
- **Justificación obligatoria:**
  - *Por qué SAS unipersonal:* En Colombia (Ley 1258 de 2008), la SAS permite constitución por un único accionista y separa el patrimonio personal del fundador frente a futuros contratos B2B/B2G y tratamiento de datos.
  - *Por qué organigrama funcional sin gerencias ocupadas:* TOGAF distingue entre roles arquitectónicos/funcionales y dotación de personal (headcount). LIRN necesita ejecutar cinco funciones empresariales (Dirección, Comercial, Producto/Ingeniería, Operación y Calidad) para que sus procesos P-01 a P-05 existan, pero hoy las cinco recaen en Johel Arias. Separar las áreas como unidades funcionales evita rediseñar los procesos cuando la empresa contrate personal en el TO-BE, sin fingir una nómina inexistente hoy.
  - *Por qué mercado sin cliente firmado:* En software B2B/B2G para infraestructura pública, el ciclo comercial exige primero validación del problema (encuesta n=20 del 17 de agosto de 2026 y entrevista a controlador SITP) y un prototipo demostrable antes de una licitación o piloto pagado. Confundir un segmento objetivo o un lead con un cliente firmado distorsionaría la Arquitectura de Datos, Aplicaciones y el Gap Analysis de TOGAF.

### 3.3 Organigrama y partes interesadas (`02-organigrama-y-stakeholders.md`)
- **Organigrama AS-IS (dos vistas en Mermaid):**
  1. *Vista jerárquica de planta actual (`Observado` / `Diseñado AS-IS`):* Dirección General ocupada por Johel Arias (único integrante actual; sin gerencias intermedias ocupadas).
  2. *Vista funcional de arquitectura de negocio (`Diseñado AS-IS`):* Dirección General articulada en cinco áreas funcionales (Dirección, Comercial, Producto e Ingeniería, Operación, Calidad), todas operadas hoy por el fundador y proyectadas como cargos diferenciados en `Objetivo TO-BE`.
- **Relaciones entre áreas:**
  - **Dirección (P-01)** define el alcance de producto único, custodia misión/visión y emite la lista de claims prohibidos hacia Comercial y Producto.
  - **Comercial (P-02)** recibe solicitudes del canal público, filtra interés bajo las reglas de Dirección y transfiere prospectos calificados a Producto/Operación.
  - **Producto e Ingeniería (P-03)** construye y verifica el prototipo TORNS (visión + despacho) y lo entrega mediante acta interna a Operación.
  - **Operación (P-04)** ejecuta las sesiones de acompañamiento del prototipo y reporta fallos técnicos a Producto o desviaciones de mensaje a Calidad.
  - **Calidad (P-05)** custodia la evidencia autorizada (`n=20`, entrevista SITP) y gestiona las no conformidades que retroalimentan a Dirección y Producto.
- **Partes interesadas (Stakeholders) con nivel de influencia (`Observado` / `Diseñado AS-IS`):**
  - *Interna:* Johel Arias (Fundador y Director General; ejecuta los 5 roles funcionales) -> Influencia **Alta** (poder de decisión total sobre alcance, arquitectura y recursos).
  - *Académica / Evaluadora:* Universidad Libre / Docente evaluadora del taller de Arquitectura Empresarial -> Influencia **Alta** (define estándares metodológicos TOGAF y criterios de aceptación de los entregables).
  - *Mercado objetivo B2B:* Operadores concesionarios de transporte masivo y administradores de estaciones (interesados potenciales, no clientes; incluye rol de controlador operativo como el entrevistado del SITP) -> Influencia **Alta** sobre requerimientos funcionales del producto, **Media** en el AS-IS actual al no existir contrato.
  - *Mercado objetivo B2G:* Entes gestores de movilidad (como TransMilenio S.A. en calidad de referente público y la Empresa Metro de Bogotá como segmento potencial) -> Influencia **Media** (definen el marco regulatorio y operativo del caso de estudio, sin vínculo contractual actual).
  - *Canal comercial:* Visitantes del sitio web LIRN/TORNS y prospectos (leads) registrados en el formulario de contacto -> Influencia **Media** (activan el proceso misional P-02 y originan el tratamiento de datos personales).
  - *Comunidad / Usuarios finales del transporte:* Pasajeros de sistemas masivos (incluidos los participantes de la encuesta del 17 de agosto de 2026, `n=20`) -> Influencia **Baja** en decisión de compra (segmento B2C sin disposición de pago directo por el software), pero **Media** como fuente de evidencia del problema público.
  - *Proveedores tecnológicos:* GitHub (alojamiento de código y GitHub Pages), Google (Google Sheets / Apps Script / Forms), Roboflow (dataset `coco-person`) y Ultralytics (base YOLO11s) -> Influencia **Media** (dependencia técnica de infraestructura y herramientas en el AS-IS).

### 3.4 Activos de información, mapa de procesos y capacidades (`03-activos-procesos-capacidades.md`)
- **Activos de información (7 activos clasificados, superando el mínimo de 5) + clasificación Ley 1581 de 2012:**
  1. **Registro de prospectos (leads) del formulario web (`/torns#contacto`):** Contiene nombre, correo electrónico, organización opcional y mensaje. *Clasificación de seguridad:* Confidencial / Interno. *Datos personales (Ley 1581 de 2012):* **Sí** (datos personales privados/semiprivados de identificación y contacto; LIRN actúa como Responsable del Tratamiento). *Marca:* `Observado`.
  2. **Base de evidencia de descubrimiento (Encuesta 17 de agosto de 2026, `n=20`, y notas de entrevista a controlador SITP):** Respuestas agregadas de percepción de congestión y notas de rol operativo sin nombre propio del controlador. *Clasificación de seguridad:* Interno (resúmenes autorizados son Públicos en `/torns`). *Datos personales:* **No** (anonimizado / datos estadísticos y de rol sin identificación personal). *Marca:* `Observado`.
  3. **Fuentes de video de estaciones y conteos operativos del prototipo (`tro-backend/src/app/assets/`, streams MJPEG y JSON WebSocket):** Grabaciones de prueba, cajas delimitadoras y conteo `person_count`. *Clasificación de seguridad:* Interno / Restringido. *Datos personales:* **Potencialmente sensible (biométrico/imagen)** si se capturan rostros identificables en cámaras USB/RTSP bajo Ley 1581 de 2012; en el prototipo no se realiza reconocimiento facial ni se persiste identificación de individuos, solo conteo de la clase `"person"`. *Marca:* `Observado`.
  4. **Pesos entrenados del modelo de visión (`my_model/my_model.pt`) y configuración de entrenamiento (`yolo-train-routes-optimization`):** Red YOLO11s ajustada a 512px durante 60 épocas sobre 3.694 imágenes de entrenamiento y 1.000 de validación. *Clasificación de seguridad:* Reservado (secreto empresarial / propiedad intelectual central de LIRN). *Datos personales:* **No** (parámetros numéricos de red neuronal). *Marca:* `Observado`.
  5. **Código fuente de las cuatro superficies (`lirn-web-main`, `tro-frontend`, `tro-backend`, `yolo-train-routes-optimization`):** Lógica de negocio, regla determinista `⌈N/C⌉`, interfaz operativa y sitio comercial. *Clasificación de seguridad:* Interno / Reservado (aunque alojado en repositorio accesible para evaluación académica). *Datos personales:* **No**. *Marca:* `Observado`.
  6. **Documentación normativa y mapa de procesos ISO/BPMN (`P-01` a `P-05`, fichas, guías, imágenes BPMN y tablero de empresa):** Reglas de dirección, control de claims y flujos PHVA. *Clasificación de seguridad:* Interno (diagrama BPMN en Lucidchart publicado como entregable). *Datos personales:* **Sí, mínimos** (identificación del fundador Johel Arias como dato público/empresarial). *Marca:* `Observado`.
  7. **Registros de facturación, contabilidad y contratos comerciales:** *Clasificación:* No existen actualmente en el AS-IS. Se declaran explícitamente como **Brecha de activo de información** para el `Objetivo TO-BE`. *Marca:* `Observado (ausencia) / Brecha`.
- **Mapa de procesos modelados en BPM (`Observado`):**
  - Síntesis estructurada de la arquitectura de procesos aprobada el 13 de septiembre de 2026:
    - **Estratégico:** `P-01 Dirección estratégica de LIRN` (fija producto único, misión/visión y lista de claims prohibidos).
    - **Misionales:** `P-02 Relación comercial y partes interesadas` (captura y califica leads sin fingir piloto), `P-03 Realización del producto TORNS` (ejecuta inferencia de conteo y regla de despacho en entorno de demostración) y `P-04 Acompañamiento al uso del prototipo` (sesiones guiadas mostrando demanda medida y oferta propuesta sin operar la red real).
    - **Apoyo:** `P-05 Evidencia, calidad y mejora` (custodia encuesta `n=20`, entrevista SITP y gestiona no conformidades).
  - Incluye diagrama general de interacción de procesos (Mermaid), referencias a las fichas y guías en `../../procesos/`, inserción de las 5 imágenes BPMN (`../../procesos/imagenes/1. Proceso 1 - Apoyo Estrategico.jpeg` a `5. Proceso 5 - Apoyo.jpeg`) y enlace al entregable publicado en Lucidchart (`https://lucid.app/lucidchart/4bc5f4f1-c350-40a4-b752-63eb17d2cb77/edit`).
- **Mapa de capacidades de negocio (Business Capabilities):**
  - Se evalúan tanto las capacidades propias del giro de LIRN como las cinco capacidades exigidas explícitamente por la guía del taller (Ventas, Atención al cliente, Gestión financiera, Gestión de inventarios, Gestión de talento humano), clasificadas por nivel de madurez AS-IS:
    1. **Dirección estratégica y gobierno de marca/claims** (`Presente - Básica`, soporta P-01).
    2. **Gestión comercial y ventas (captura de interés B2B/B2G)** (`Presente - Incipiente / Manual`, soporta P-02 mediante formulario web y Google Sheets; sin CRM ni cierre de contratos aún).
    3. **Ingeniería de visión por computadora y conteo en estación** (`Presente - Funcional en prototipo`, soporta P-03 con YOLO11s `my_model.pt`).
    4. **Cálculo y recomendación de despacho operativo** (`Presente - Funcional en prototipo`, soporta P-03 con regla `⌈N/C⌉` sobre capacidades 5, 10 y 15).
    5. **Atención al interesado y acompañamiento de demostración** (`Presente - Manual en prototipo`, soporta P-04; equivale a la capacidad de atención al cliente en fase precomercial, acotada a sesiones guiadas sin mesa de ayuda 24/7 ni SLA de producción).
    6. **Gestión de evidencia, calidad y cumplimiento (Ley 1581 / no-claims)** (`Presente - Básica documental`, soporta P-05).
    7. **Gestión financiera y facturación** (`Ausente - Brecha AS-IS`, sin ERP, contabilidad formal ni facturación electrónica por ausencia de clientes pagados; requerida en `Objetivo TO-BE`).
    8. **Gestión de inventarios (activos digitales hoy / hardware en campo ausente)** (`Parcial / Ausente para hardware - Brecha AS-IS`: LIRN no comercializa ni almacena inventario físico de cámaras o servidores; solo gestiona catálogo digital de videos de prueba, modelos de tren configurados [5, 10, 15] y pesos `.pt`).
    9. **Gestión de talento humano** (`Ausente como proceso formal - Brecha AS-IS`, microempresa unipersonal donde Johel Arias asume los cinco roles; requerida en `Objetivo TO-BE` al incorporar especialistas).
    10. **Integración y despacho en vivo sobre la red del operador** (`Ausente - Brecha AS-IS`, fuera del alcance del prototipo actual; proyectada para piloto en `Objetivo TO-BE`).

### 3.5 Documento Arquitectura de Negocio (AS-IS) (`04-arquitectura-negocio-as-is.md`)
- Documento formal e integrador requerido por el numeral 8 del Punto 1:
  1. **Propósito y alcance de la línea base (Baseline Business Architecture):** cómo opera LIRN hoy como SAS unipersonal en Bogotá alrededor de TORNS.
  2. **Modelo operativo actual (Estructura, Procesos, Servicios y Actores):** articulación del fundador único ejecutando `P-01` a `P-05` para ofrecer el servicio de demostración y análisis de demanda en estación.
  3. **Flujos de información de negocio:**
     - *Flujo comercial:* Visitante -> Sitio comercial (`lirn-web-main`, ruta `/torns#contacto`) -> Apps Script -> Google Sheets -> Calificación manual en `P-02`.
     - *Flujo operativo de demostración:* Fuente de video de estación -> `tro-backend` (OpenCV + YOLO11s `my_model.pt`, umbral 0,5) -> Stream MJPEG (`/api/v1/videos/{video_id}/stream`) + WebSocket de métricas (`/api/v1/videos/ws/{video_id}/detections` con `person_count`) -> Regla de despacho (`⌈N/C⌉`, capacidades 5, 10 y 15 en `/api/v1/routing/*`) -> Interfaz `tro-frontend` -> Sesión guiada `P-04`.
     - *Flujo de gobierno y calidad:* Evidencia (`n=20`, entrevista SITP) + auditoría de mensajes -> `P-05` -> `P-01` y `P-03`.
  4. **Alineación transversal AS-IS (Negocio, Datos, Aplicaciones y Tecnología):** cuadro y explicación de cómo las cuatro superficies de software, los activos de datos y la estación de trabajo local habilitan hoy la misión y visión, y dónde se detiene la capacidad actual (brechas hacia el TO-BE que se abordarán en M2–M5).

## 4. Actualización del Registro de Empresa al cerrar M1

Al finalizar la onda M1, `docs/ae-final-project/registro-empresa.md` se actualiza (sin alterar ninguna clave bloqueada del glosario) para:
- Marcar en las secciones 1 a 6 que sus entregables de detalle quedaron desarrollados y bloqueados en `ondas/M1-negocio/`.
- Precisar en la sección 7 los 7 activos clasificados en M1 (incluyendo el análisis de datos personales bajo Ley 1581 de 2012) que servirán de entrada obligatoria a M2.
- Añadir en la sección 10 (Brechas y proyectos) los candidatos detectados en M1 (ausencia de capacidades de facturación, talento humano, inventario físico e integración en vivo; tratamiento manual de leads bajo Ley 1581).

## 5. Verificación (`scripts/assert-ae-m1.mjs`)

Se creará un script de verificación automatizada `scripts/assert-ae-m1.mjs` (además de mantener en verde `assert-ae-m0.mjs` y `assert-ae-ondas.mjs`) que compruebe:
1. Existencia de los 5 archivos en `docs/ae-final-project/ondas/M1-negocio/` (`README.md`, `01-organizacion-y-estrategia.md`, `02-organigrama-y-stakeholders.md`, `03-activos-procesos-capacidades.md`, `04-arquitectura-negocio-as-is.md`).
2. Presencia de las claves obligatorias (`LIRN`, `TORNS`, `Johel Arias`, `Observado`, `Diseñado AS-IS`, `Objetivo TO-BE`, `Ley 1581`, `P-01`, `P-02`, `P-03`, `P-04`, `P-05`, `⌈N/C⌉`, `n=20`).
3. Ausencia de términos prohibidos como identidad actual (`Sistema de Vigilancia`, `Transport Route Optimization`) y ausencia del conector raya (`—` o `–`) en la prosa de `ondas/M1-negocio/`.
4. Que `docs/ae-final-project/informe` siga sin existir.
