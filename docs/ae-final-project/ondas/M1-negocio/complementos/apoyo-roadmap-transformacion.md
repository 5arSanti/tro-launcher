# Apoyo de negocio al Roadmap de Transformación de LIRN (borrador)

<!-- reescribir Santiago; lenguaje de proceso interno, no pasa al informe -->
Versión 0.2, 1 de noviembre de 2026. Borrador de apoyo para el Roadmap de Transformación; Santiago redacta el texto final. Fuentes: TO-BE de negocio v0.2, matriz de trazabilidad OE-01 a OE-05, identificadores C-01 a C-08 y matriz capacidad, proceso y servicio de la Arquitectura de Negocio; inventario de datos D-01 a D-23 de la Arquitectura de Datos; inventario AP-01 a AP-13 y diferencias DF-01 a DF-10 de la Arquitectura de Aplicaciones. No se fijan cifras, costos, plazos ni metas numéricas: lo que el repositorio no contiene queda NO CONFIRMADO.

## 1. Trazabilidad de brechas de negocio

<!-- reescribir Santiago; lenguaje de proceso interno, no pasa al informe -->
Las brechas G-N01 a G-N07 son de tipo Brecha. Su estado actual es Observado según el TO-BE de negocio; el enlace con objetivos, candidatos y referencias cruzadas es Diseñado AS-IS (derivado de las matrices existentes) y su cierre es Objetivo TO-BE.

| Brecha | Estado actual (marca) | OE | Proceso, capacidad y servicio afectados | Candidato | Arquitectura de Datos | Arquitectura de Aplicaciones |
|--------|-----------------------|----|------------------------------------------|-----------|-----------------------|------------------------------|
| G-N01 Sin NIT ni matrícula mercantil | Observado | OE-05 | P-01, P-08; CAP-01, CAP-09; sin servicio | C-01 | D-23 (Brecha) | Sin aplicación asociada |
| G-N02 Banda pública desalineada | Observado | OE-02, OE-03 | P-01, P-02; CAP-01; SN-01, SN-03 | C-02 | D-17 | AP-01 |
| G-N03 Leads en hoja personal, sin respuesta ni política de tratamiento | Observado | OE-02, OE-03 | P-02, P-05; CAP-02, CAP-03; SN-01 | C-03 | D-01, D-18 (Brecha) | AP-01, AP-06 |
| G-N04 Conteos solo en memoria | Observado | OE-01, OE-04 | P-03; CAP-04, CAP-05; SN-02, SN-04 | C-04 | D-06, D-10, D-11 | AP-02, AP-03 (AP-03a y AP-03b en el TO-BE) |
| G-N05 Modelo evaluado solo con validación de entrenamiento, recall 0,55 en la última época de entrenamiento (entrenamiento del 15 de noviembre de 2025) | Observado | OE-01, OE-04 | P-03; CAP-04; SN-02, SN-04 | C-05 | D-04, D-12, D-13 | AP-03, AP-04, AP-05; DF-07; DF-08: registro versionado del modelo (P-03; CAP-04, CAP-08) |
| G-N06 CAP-07, CAP-09 y CAP-10 ausentes | Observado | OE-04, OE-05 | P-07 (CAP-07), P-08 (CAP-09) y P-09 (CAP-10) | C-06 | D-20, D-21, D-22 (Brecha) | AP-02 y AP-03a con autenticación (DF-05); DF-08: facturación (P-08; CAP-09); gestión de personal y nómina (P-09; CAP-10), NO CONFIRMADO hasta que la Arquitectura de Aplicaciones lo registre |
| G-N07 Sin contratación ni piloto; sin respaldo y despliegue en un solo equipo | Observado; Observado por declaración del dueño (1 de noviembre de 2026) para el respaldo | OE-01, OE-03, OE-05 | P-06, P-04; CAP-03, CAP-06, CAP-08; SN-04 | C-08 y C-07 | D-18, D-22; D-14, D-15 | AP-07; entorno de piloto en la Arquitectura Tecnológica |

<!-- reescribir Santiago; lenguaje de proceso interno, no pasa al informe -->
Nota: el detalle de respaldo y entornos de G-N07 corresponde a la Arquitectura Tecnológica, cuyo inventario aún no está publicado; la referencia queda NO CONFIRMADO hasta entonces.

## 2. Propuesta de portafolio desde negocio

Se usan los candidatos C-01 a C-08 sin renumerar. Marca: Objetivo TO-BE. La priorización, el costo y el horizonte los decide el Roadmap de Transformación; aquí no se fijan.

| ID | Nombre propuesto | Objetivo | Beneficio de negocio | Brecha |
|----|------------------|----------|----------------------|--------|
| C-01 | Formalización legal de LIRN S.A.S. | Obtener matrícula mercantil y NIT ante la Cámara de Comercio de Bogotá y la DIAN | Habilita contratar y facturar el piloto | G-N01 |
| C-02 | Alineación de la comunicación pública | Ajustar la página de TORNS al autor único y retirar identificadores técnicos residuales | Evita afirmaciones no sustentadas frente a operadores y entidades | G-N02 |
| C-03 | Tratamiento de datos personales y gestión de leads | Publicar política y aviso Ley 1581 y llevar los leads a un gestor con autorización registrada | Reduce el riesgo legal y permite responder y calificar el interés | G-N03 |
| C-04 | Historial de conteos y recomendaciones | Persistir conteos y planes de despacho por estación y fecha | Permite comparar la recomendación con la decisión real del operador | G-N04 |
| C-05 | Desacople de inferencia y evaluación en estación | Separar la inferencia de la apertura del stream y evaluar el modelo con video de estación | Da evidencia propia del desempeño antes de ofrecer un piloto | G-N05 |
| C-06 | Capacidades empresariales ausentes | Crear facturación, talento humano e interoperabilidad segura con centros de control; puede separarse en C-06a, C-06b y C-06c | Cubre lo que un contrato B2B o B2G exige | G-N06 |
| C-07 | Continuidad operativa | Respaldo, gestión de secretos y separación entre demostración y laboratorio | Evita perder código, modelo y evidencia | G-N07 |
| C-08 | Primer piloto pagado | Ejecutar un piloto acotado con un operador B2B o una entidad B2G | Primer ingreso y primera evidencia en operación real | G-N07 |

Dependencias de negocio (Diseñado AS-IS, derivadas de las condiciones de entrada de P-06 y SN-04): C-08 requiere C-01, C-03, C-05 y C-07; C-04 alimenta el informe de resultados de C-08.

## 3. Indicadores de éxito propuestos por objetivo

Marca de las definiciones y fórmulas: Objetivo TO-BE. Ningún indicador tiene línea base medida en el repositorio; donde el valor actual se deduce del estado Observado se indica así. Las metas quedan NO CONFIRMADO hasta que el Roadmap de Transformación las fije.

| OE | Indicador | Definición | Fórmula | Fuente del dato | Línea base |
|----|-----------|------------|---------|-----------------|------------|
| OE-01 | Recall en estación | Proporción de personas detectadas sobre las anotadas en video de estación | personas detectadas correctamente / personas anotadas | Evaluación de C-05 (D-04, D-12, D-13) | NO CONFIRMADO; el recall 0,55 en la última época de entrenamiento (entrenamiento del 15 de noviembre de 2025) no sirve como línea base (Observado) |
| OE-01 | Disponibilidad de la demostración | Sesiones de demostración completadas sin incidencia | sesiones sin incidencia / sesiones realizadas | Registro de P-04 | NO CONFIRMADO |
| OE-02 | Leads respondidos | Proporción de leads con respuesta registrada | leads respondidos / leads recibidos | Gestor de leads de C-03 (D-01) | Ningún lead se responde hoy (Observado); valor numérico NO CONFIRMADO |
| OE-02 | Propuestas emitidas | Propuestas comerciales aprobadas en P-01 y enviadas | conteo por periodo | Registro de P-02 y P-06 | Cero, sin clientes ni propuestas (Observado) |
| OE-03 | Leads con autorización | Leads con autorización de tratamiento registrada | leads con autorización / leads recibidos | Gestor de leads (D-01, D-18) | Sin política publicada (Observado); valor NO CONFIRMADO |
| OE-03 | Afirmaciones públicas con fuente | Piezas públicas cuyas cifras tienen fuente verificada en SN-03 | piezas con fuente / piezas publicadas | Registro de SN-03 (D-17) | NO CONFIRMADO |
| OE-04 | Cobertura histórica | Estaciones con historial de conteos y recomendaciones persistido | estaciones con historial / estaciones medidas | Persistencia de C-04 (D-06, D-10, D-11) | Cero, datos solo en memoria (Observado) |
| OE-04 | Coincidencia con la decisión del operador | Recomendaciones que coinciden con el despacho real decidido por el centro de control | recomendaciones coincidentes / recomendaciones emitidas | Historial de C-04 y registro del operador vía P-07 | NO CONFIRMADO; requiere piloto |
| OE-05 | Piloto pagado firmado (indicador de llegada) | Existencia de acta de inicio de piloto con contrato | sí o no | Registro de P-06 (D-22) | No existe (Observado) |
| OE-05 | Habilitantes del piloto cumplidos (indicador principal) | Candidatos C-01, C-03, C-05 y C-07 cerrados | candidatos cerrados / 4 | Seguimiento del Roadmap de Transformación | Ninguno cerrado (Observado) |

## 4. Cierre de P-06 a P-09, SN-04 y SN-05

Aprobados por Santiago (1 de noviembre de 2026). Marca: Objetivo TO-BE, porque ninguno existe todavía. En la misma decisión, la gestión de talento humano se separó de P-08 como P-09.

| Elemento | Definición | Entradas | Salidas | Capacidad | Brecha que cierra | Criterio de aceptación |
|----------|------------|----------|---------|-----------|-------------------|------------------------|
| P-06 Contratación y piloto | Lleva una propuesta aprobada hasta el acta de cierre del piloto | Propuesta aprobada en P-01; evaluación en estación de C-05; acuerdo de fuente de video y red con el operador | Contrato, acta de inicio, informe de resultados, acta de cierre | CAP-03, CAP-06, CAP-09 | G-N07 | Existe un piloto con contrato, actas e informe cuyas cifras pasan por SN-03 |
| P-07 Integración con el centro de control | Acuerda y opera el intercambio técnico con el operador con decisión humana | Requisitos del operador; AP-02 y AP-03a con autenticación (DF-05) | Acuerdo de intercambio, interfaz autenticada, registro de decisiones del operador | CAP-07 | G-N06 | El operador recibe recomendaciones por un canal autenticado y su decisión queda registrada |
| P-08 Gestión financiera y facturación | Gestiona facturación electrónica, contabilidad y contratos comerciales | NIT y matrícula de C-01; contratos de P-06 | Facturas electrónicas, registros contables, contratos comerciales | CAP-09 | G-N01, G-N06 | El piloto se factura electrónicamente y queda registrado en contabilidad; fuente normativa de la facturación electrónica NO CONFIRMADO |
| P-09 Gestión del talento humano | Gestiona vinculación, nómina, seguridad social y desvinculación, con datos personales de empleados bajo la Ley 1581 | Necesidad de personal; NIT de C-01 | Contratos laborales, registros de nómina | CAP-10 | G-N06 | Cada vinculación queda con contrato y afiliaciones registradas |
| SN-04 Piloto de medición de demanda en estación | Servicio pagado, acotado en tiempo y estaciones, con informe de resultados | Contrato de P-06; video de estación; modelo evaluado | Conteos, recomendaciones históricas e informe | CAP-04, CAP-05, CAP-06 | G-N04, G-N05, G-N07 | Informe entregado con métricas por estación y fecha y fuente trazable; precio, duración y número de estaciones NO CONFIRMADO |
| SN-05 Soporte y mejora del servicio | Atiende incidencias y ajustes acordados con el operador | Incidencias del operador; resultados de SN-04 | Incidencias resueltas, versiones del modelo o de la regla registradas | CAP-06, CAP-08 | G-N07 | Cada incidencia tiene registro de apertura, respuesta y cierre |

<!-- reescribir Santiago -->
Con estos seis elementos, las actividades de la cadena de valor que hoy no tienen proceso (Observado) quedan cubiertas en el estado objetivo, y cada brecha de negocio tiene un candidato, un indicador y un criterio de aceptación (Objetivo TO-BE).

## Datos NO CONFIRMADO
1. Línea base numérica de todos los indicadores de proporción.
2. Metas, plazos, costos, precio y alcance del piloto.
3. Referencias de respaldo y entornos en la Arquitectura Tecnológica.
4. Resuelto: Santiago aprobó P-06 a P-08, SN-04 y SN-05 el 1 de noviembre de 2026 y separó P-09. Precio, duración y número de estaciones de SN-04 siguen NO CONFIRMADO (ítem 2).
