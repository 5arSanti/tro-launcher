# 1. Descripción de la Organización, Misión, Visión y Objetivos Estratégicos

**Onda:** M1. Arquitectura de Negocio (Fase B de TOGAF ADM)  
**Organización:** LIRN  
**Producto único:** TORNS  
**Política de hechos:** `Observado` | `Diseñado AS-IS` | `Objetivo TO-BE` | `NO CONFIRMADO`

---

## 1. Descripción de la organización

**LIRN** es una firma colombiana de tecnología dedicada al diseño y desarrollo de software para movilidad urbana y Sistemas Inteligentes de Transporte (ITS). Su propósito empresarial consiste en dotar a los sistemas de transporte público masivo basados en estaciones de la capacidad de ajustar su oferta operativa frente a la demanda real observada en los andenes.

En la arquitectura empresarial actual, la identidad corporativa se rige por una separación estricta: **LIRN es la firma. TORNS es el único producto.** La organización concentra la relación institucional, la propiedad intelectual, el gobierno de procesos y el canal comercial; el producto ejecuta la medición de pasajeros en estación y el cálculo de oferta recomendada para el centro de control.

### 1.1 Ficha técnica de la organización (Línea base AS-IS)

| Atributo empresarial | Definición en la arquitectura de negocio | Marca de hecho |
|---|---|---|
| **Nombre de la organización** | LIRN (razón social proyectada: LIRN S.A.S.). El nombre integra el concepto *Line* (líneas de metro y transporte masivo) con las siglas finales de su producto (*RN* de TORNS). | `Observado` (marca institucional) / `Diseñado AS-IS` (razón social) |
| **Forma jurídica y domicilio** | Sociedad por Acciones Simplificada (S.A.S.) bajo la Ley 1258 de 2008, con domicilio principal en Bogotá D.C., Colombia. | `Diseñado AS-IS` |
| **Identificación tributaria (NIT) y matrícula mercantil** | Pendiente de formalización registral ante la Cámara de Comercio de Bogotá y la DIAN. No se asigna número tributario en el estado actual. | `Brecha AS-IS` (`NO CONFIRMADO` registro mercantil activo) |
| **Sector económico** | Tecnología de la información, desarrollo de software e ingeniería aplicada a Sistemas Inteligentes de Transporte (ITS) y movilidad urbana (actividades de referencia CIIU 6201 y 6202). | `Diseñado AS-IS` |
| **Tamaño de la empresa** | Microempresa unipersonal, de acuerdo con los criterios del Decreto 957 de 2019 en Colombia. Equipo actual: **Johel Arias** (una persona). | `Observado` (equipo) / `Diseñado AS-IS` (marco societario) |
| **Productos o servicios** | Un único producto: **TORNS** (*Train Optimization Route and Navigation System*), acompañado del servicio precomercial de demostración guiada sobre escenarios de demanda en estación. | `Observado` |
| **Clientes principales actuales** | Ninguno. La firma no cuenta hoy con contratos comerciales, clientes activos, alianzas ni pilotos firmados. | `Observado` |
| **Segmentos de mercado objetivo** | Operadores de sistemas de transporte masivo con estaciones (segmento B2B: empresas concesionarias de operación; segmento B2G: entes gestores de movilidad y sistemas ferroviarios o BRT). | `Diseñado AS-IS` (respaldado por matriz de descubrimiento) |
| **Marco normativo de datos personales** | Ley Estatutaria 1581 de 2012 y Decreto 1377 de 2013 (Régimen General de Protección de Datos Personales en Colombia). | `Diseñado AS-IS` |

### 1.2 Producto o servicio ofertado: TORNS

**TORNS** es un prototipo aplicado. No es un piloto firmado. Su función consiste en conectar lo que ocurre en el andén de una estación con la toma de decisiones del centro de control mediante dos mecanismos acoplados (`Observado`):

1. **Medición de demanda en estación por visión por computadora:** El sistema procesa flujos de video de estación mediante el modelo entrenado `my_model.pt` (basado en la arquitectura YOLO11s, entrenado a resolución de 512 píxeles durante 60 épocas sobre 3.694 imágenes de entrenamiento y 1.000 de validación). Con un umbral de confianza de `0,5`, el backend detecta instancias de la clase `"person"` y entrega el conteo puntual de pasajeros presentes (`person_count`). El prototipo cuenta personas. No calcula densidad por área.
2. **Recomendación determinista de oferta al centro de control:** A partir de la carga medida \(N\) en la estación, el motor de despacho evalúa las capacidades configuradas en el prototipo (5, 10 y 15 pasajeros por unidad de referencia), selecciona el tipo de tren más pequeño que cubra la demanda y aplica la cota inferior de empaquetamiento \(\lceil N / C \rceil\) bajo un esquema voraz (*greedy*). El resultado indica al operador qué tipo de unidad y cuántas unidades despachar.

### 1.3 Clientes principales y segmentos de mercado

En el estado actual (`Observado`), LIRN no posee clientes facturados ni convenios operativos vigentes. **Transmilenio es caso de estudio, no cliente.** Su operación en Bogotá se utiliza como problema público de referencia porque ilustra el desajuste entre frecuencias programadas por horario fijo y la demanda real acumulada en plataforma.

Durante la fase de descubrimiento de mercado registrada por la firma (`Observado`), se evaluaron siete segmentos bajo cinco criterios ponderados: tiempo de conversión (15 %), potencial de ingresos (30 %), impacto económico del problema (15 %), potencial de expansión (30 %) y madurez de la necesidad (10 %). Los resultados definen el mercado objetivo de LIRN:

| Segmento evaluado | Tipo | Rol decisor o afectado | Valoración ponderada (sobre 5,00) | Clasificación en la arquitectura de negocio |
|---|---|---|---|---|
| **Operadores de transporte** | B2B | Empresas concesionarias responsables de operar y distribuir la flota | **4,15** | **Segmento cliente prioritario 1 (`Diseñado AS-IS`)** |
| **Sistema Metro de Bogotá** | B2G | Entidad responsable de la operación y planificación ferroviaria | **4,00** | **Segmento cliente prioritario 2 (`Diseñado AS-IS`)** |
| **Administradores de estaciones** | B2B | Supervisores de operación y flujo en plataforma | **2,70** | Segmento secundario e influenciador operativo |
| **Entidades de movilidad** | B2G | Autoridades de planeación y regulación del transporte urbano | **2,55** | Segmento institucional y regulador del entorno |
| **Usuarios frecuentes del transporte** | B2C | Ciudadanos que viajan 3 o más veces por semana | **2,40** | Usuario final afectado por el problema (sin pago directo a LIRN) |
| **Trabajadores** | B2C | Pasajeros con desplazamiento pendular diario | **2,10** | Usuario final afectado por el problema (sin pago directo a LIRN) |
| **Estudiantes universitarios** | B2C | Pasajeros en franjas de hora pico | **1,40** | Usuario final afectado por el problema (sin pago directo a LIRN) |

La validación empírica de este problema de negocio se apoya en dos fuentes primarias custodiadas por la firma (`Observado`):

- **Entrevista a controlador SITP (rol, no nombre):** Evidenció que la gestión de contingencias en troncal (como un vehículo bloqueado, código `TQ 04`, o saturación de plataforma, código `TP 19`) depende de reportes radiales manuales y maniobras reactivas (`TP 69`, `TP 70`, `TP 59`, `TP 56` y `TP 29`), lo que expone a los operadores a pérdida de horas-hombre y multas operativas del ente gestor.
- **Encuesta 17 de agosto de 2026, n=20:** Aplicada a usuarios de transporte masivo en Bogotá. Confirmó la existencia del problema (el 80 % dejó pasar buses llenos en el último mes y el 55 % en los últimos 7 días), su recurrencia (el 65 % lo padece varias veces por semana) y su costo económico y de tiempo (pérdida media estimada de 3 horas mensuales y gasto adicional igual o superior a 50.000 COP mensuales en el 65 % de la muestra).

---

## 2. Misión, Visión y Objetivos Estratégicos

Las declaraciones estratégicas de LIRN están aprobadas y bloqueadas como línea base de gobierno corporativo (`Observado`, proceso estratégico `P-01`).

### 2.1 Misión actual (`Observado`)

> Hacer que el transporte masivo ajuste su oferta a la demanda real de cada estación, midiendo quién espera ahora y no solo lo que el horario predijo.

### 2.2 Visión actual (`Observado`)

> Que cada estación de un sistema masivo opere con la demanda que ocurre, no con la que se supuso.

### 2.3 Objetivos estratégicos identificados (`Diseñado AS-IS`)

Para articular el paso desde la línea base actual (AS-IS) hacia la arquitectura objetivo a cinco años (TO-BE), LIRN establece cinco objetivos estratégicos trazables a sus procesos de negocio:

| Código | Objetivo estratégico | Proceso principal que lo habilita | Horizonte de realización | Marca |
|---|---|---|---|---|
| **OE-01** | Convertir el prototipo TORNS en un producto demostrable y controlado para un centro de control. | `P-03 Realización del producto TORNS` y `P-04 Acompañamiento al uso del prototipo` | Corto y mediano plazo (base en AS-IS, consolidación en TO-BE) | `Diseñado AS-IS` |
| **OE-02** | Abrir un canal comercial honesto hacia operadores B2B y B2G, sin afirmar cliente. | `P-02 Relación comercial y partes interesadas` | Corto plazo (activo en `/torns#contacto`, evolución a CRM en TO-BE) | `Diseñado AS-IS` |
| **OE-03** | Proteger datos personales y evidencia según Ley 1581 y el mapa de procesos. | `P-01 Dirección estratégica de LIRN` y `P-05 Evidencia, calidad y mejora` | Permanente (control documental hoy, automatización en TO-BE) | `Diseñado AS-IS` |
| **OE-04** | Cerrar la brecha entre demanda medida y oferta recomendada como propuesta de valor única. | `P-01 Dirección estratégica de LIRN` y `P-03 Realización del producto TORNS` | Corto a largo plazo (regla determinista hoy, desacoplamiento y evaluación en estación en TO-BE) | `Diseñado AS-IS` |
| **OE-05** | Preparar la firma para un primer piloto pagado en el horizonte TO-BE, no como hecho actual. | Todos los procesos (`P-01` a `P-05`) | Mediano y largo plazo (`Objetivo TO-BE`) | `Diseñado AS-IS` / `Objetivo TO-BE` |

---

## 3. Justificación de decisiones de Arquitectura de Negocio (AS-IS)

En cumplimiento del método TOGAF, la línea base de negocio debe reflejar con exactitud la realidad operativa de la organización sin inventar capacidades inexistentes ni dejar vacíos estructurales. Se justifican a continuación las tres decisiones centrales del modelo empresarial de LIRN:

### 3.1 Por qué una S.A.S. unipersonal en Bogotá es el marco AS-IS adecuado

1. **Viabilidad societaria unipersonal:** La legislación mercantil colombiana (Ley 1258 de 2008) permite constituir y operar una Sociedad por Acciones Simplificada con un único accionista. Dado que el equipo real actual está conformado exclusivamente por **Johel Arias** (`Observado`), la figura de S.A.S. unipersonal formaliza la personalidad jurídica de LIRN sin exigir socios ficticios ni juntas directivas simuladas.
2. **Separación patrimonial y responsabilidad sobre datos:** LIRN captura datos de contacto en su sitio público y procesa secuencias de video en su prototipo. Operar bajo el marco de una S.A.S. delimita al responsable jurídico del tratamiento de datos personales frente a la Ley 1581 de 2012 y habilita a la firma para suscribir acuerdos de confidencialidad o contratos futuros con operadores B2B y entidades B2G.
3. **Coherencia geográfica con el caso de estudio:** Domiciliar la firma en Bogotá D.C. alinea la sede operativa con el entorno donde se levantó la evidencia empírica (encuesta `n=20` y acercamiento operativo en el entorno de la troncal Calle 26 / Salitre El Greco) y con sus dos segmentos prioritarios iniciales (concesionarios de transporte masivo de Bogotá y Sistema Metro de Bogotá). La pendiente de NIT y matrícula mercantil se registra con transparencia como la primera brecha legal que el Roadmap (M5) deberá cerrar.

### 3.2 Por qué el organigrama distingue la planta real de la vista funcional sin afirmar gerencias ocupadas

1. **Separación TOGAF entre rol arquitectónico y actor humano:** En el metamodelo de contenido de TOGAF, un *Rol* o *Unidad Organizacional* representa una responsabilidad funcional estable dentro de los procesos de negocio, mientras que un *Actor* es la persona física asignada a desempeñarlo. En una microempresa tecnológica en etapa temprana, un único actor (**Johel Arias**) ejecuta múltiples roles funcionales.
2. **Trazabilidad con el mapa de procesos ISO (`P-01` a `P-05`):** LIRN cuenta con cinco procesos definidos cuyos dueños funcionales son Dirección, Comercial, Producto / Ingeniería, Operación y Calidad. Si la arquitectura omitiera la vista funcional, los procesos carecerían de responsabilidades diferenciadas; por el contrario, si inventara cinco gerentes en nómina, incurriría en un claim falso de plantilla.
3. **Escalabilidad sin rediseño estructural:** Mantener un organigrama jerárquico AS-IS de una sola persona junto con una vista funcional de cinco áreas permite que, en el `Objetivo TO-BE`, el crecimiento de LIRN consista en delegar áreas ya delimitadas a nuevos especialistas o contratistas sin alterar la arquitectura de procesos ni los contratos de información entre áreas.

### 3.3 Por qué el mercado se estructura sobre segmentos e interesados sin afirmar clientes actuales

1. **Realidad del ciclo comercial en transporte masivo (B2B y B2G):** La adquisición de tecnología para centros de control de transporte público exige validación del problema, pruebas de concepto controladas, cumplimiento normativo y procesos de contratación corporativa o licitación pública cuyos tiempos superan los 90 días (calificados con puntaje 1 y 2 en el criterio de tiempo de conversión del estudio de descubrimiento).
2. **Distinción rigurosa entre lead, caso de estudio y cliente:** **Lead no es cliente.** Una solicitud recibida en el formulario de `/torns#contacto` constituye un prospecto interesado que ingresa al proceso `P-02`, no una venta cerrada. Del mismo modo, TransMilenio aporta el contexto público del problema y las reglas de operación analizadas, pero no mantiene vínculo contractual con LIRN.
3. **Integridad de las ondas posteriores (Datos, Aplicaciones y Brechas):** Reconocer que hoy existen cero clientes firmados explica de forma coherente por qué en la Arquitectura de Datos (M2) no existen registros históricos de facturación ni contratos activos, por qué en la Arquitectura de Aplicaciones (M3) no opera un ERP financiero, y por qué el Análisis de Brechas (M5) prioriza la preparación técnica y legal para alcanzar el primer piloto pagado en el horizonte TO-BE.
