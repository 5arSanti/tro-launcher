---
title: "Plan de Transformación Empresarial de LIRN (proyectada LIRN S.A.S.)"
subtitle: "Arquitectura Empresarial para el producto TORNS"
lang: es-CO
---

# 1. Portada

| Campo | Valor |
|---|---|
| Institución | Universidad Libre |
| Asignatura | Arquitectura Empresarial, Taller final |
| Docente | Mgs. Maria del Pilar Niño Campos |
| Autor | Johel Santiago Arias |
| Organización analizada | LIRN (proyectada LIRN S.A.S.), producto TORNS |
| Fecha | 1 de noviembre de 2026 |
| Versión | 1.0 |

## Marcas de evidencia

| Marca | Significado |
|---|---|
| Observado | Hecho verificado en el código, la documentación o la evidencia del proyecto. |
| Observado por declaración del dueño (1 de noviembre de 2026) | Hecho declarado por el dueño de LIRN, sin otra evidencia documental. |
| Diseñado AS-IS | Modelado del estado actual hecho por el autor a partir de lo observado. |
| Objetivo TO-BE | Estado futuro propuesto; no existe hoy. |
| NO CONFIRMADO | Dato que no se ha podido verificar; no se rellena. |

# 2. Introducción

LIRN es una microempresa de una sola persona que desarrolla TORNS, un prototipo que mide la demanda de pasajeros en estación con visión por computador y propone al centro de control un plan de despacho. Este informe integra los cinco puntos del taller final siguiendo el Método de Desarrollo de Arquitectura (ADM) de TOGAF (The Open Group, 2022): la visión y el negocio (fases A y B), los sistemas de información en datos y aplicaciones (fase C), la tecnología (fase D) y la transformación (fases E y F, con criterios de gobierno para G y H).

La pregunta que guía el documento es: ¿cómo ayuda la Arquitectura Empresarial propuesta a que la organización alcance sus objetivos estratégicos y sea más eficiente durante los próximos cinco años? El capítulo 9 la responde.

# 3. Descripción de la organización

| Aspecto | Descripción | Marca |
|---|---|---|
| Razón social | LIRN (proyectada LIRN S.A.S.), sociedad por acciones simplificada que se constituiría según la Ley 1258 de 2008 (Congreso de la República de Colombia, 2008) | Diseñado AS-IS |
| Sector económico | Software e ITS para movilidad y transporte masivo (CIIU 6201 / 6202) | Diseñado AS-IS |
| NIT y matrícula mercantil | Sin NIT ni matrícula; no hay registro ante Cámara de Comercio | Observado por declaración del dueño (2 de noviembre de 2026) |
| Tamaño | Microempresa unipersonal; el Decreto 957 de 2019 (Presidencia de la República de Colombia, 2019) clasifica por ingresos, que no están confirmados, por lo que la clasificación es una hipótesis de diseño | Observado (equipo), Diseñado AS-IS (marco) |
| Equipo | Un autor y responsable único, Johel Santiago Arias | Observado por declaración del dueño (1 de noviembre de 2026) |
| Producto | TORNS: detección y conteo de pasajeros con YOLO11s (Ultralytics, s. f.) y recomendación determinista de despacho | Observado |
| Clientes | Ninguno; no hay piloto ni contrato | Observado |
| Caso de estudio | El sistema TransMilenio y el SITP de Bogotá se usan como caso de estudio, no como cliente | Observado |
| Evidencia de mercado | Encuesta del 17 de agosto de 2026 (n=20, formulario anónimo en Google Forms, que sigue en uso) y entrevista a un controlador del SITP, citado por su rol. El 80 % dejó pasar buses llenos dentro del último mes, al 65 % le pasa varias veces por semana y el 40 % se identifica con el desbalance entre oferta y demanda (Equipo TORNS, 2026) | Observado (cifras agregadas); uso del formulario: Observado por declaración del dueño (1 de noviembre de 2026) |

La misión, la visión y los objetivos estratégicos OE-01 a OE-05 están en el entregable «Arquitectura de Negocio (Punto 1)». En síntesis: OE-01 convertir TORNS en un producto demostrable y controlado para un centro de control; OE-02 abrir un canal comercial honesto hacia operadores B2B y B2G; OE-03 proteger datos personales y evidencia según la Ley 1581 de 2012 (Congreso de la República de Colombia, 2012); OE-04 cerrar la brecha entre demanda medida y oferta recomendada; OE-05 preparar la firma para un primer piloto pagado.

# 4. Arquitectura de Negocio

Fase B del ADM. El entregable «Arquitectura de Negocio (Punto 1)» documenta el organigrama, los activos de información AI-01 a AI-07, el mapa de procesos BPMN 2.0 (Object Management Group, 2014), el mapa de capacidades y las partes interesadas.

**Estructura.** La Dirección General concentra las cinco unidades funcionales, una por proceso. Ver «Organigrama: vista jerárquica de la planta actual».

![Organigrama: vista jerárquica de la planta actual](../ondas/M1-negocio/complementos/imagenes/png/02-1.png)

**Procesos.** Cinco procesos AS-IS: P-01 Dirección estratégica de LIRN (estratégico), P-02 Relación comercial y partes interesadas, P-03 Realización del producto TORNS y P-04 Acompañamiento al uso del prototipo (misionales), y P-05 Evidencia, calidad y mejora (apoyo). Los diagramas BPMN de los cinco procesos están en el entregable; aquí se muestra la cadena de valor.

![Cadena de valor de LIRN](../ondas/M1-negocio/complementos/imagenes/png/cadena-de-valor.png)

**Capacidades.** De diez capacidades, CAP-04 Detección y conteo y CAP-05 Recomendación de despacho son funcionales en prototipo; CAP-07 Integración en vivo con el operador, CAP-09 Gestión financiera y facturación y CAP-10 Gestión de talento humano están ausentes y son brechas hacia el Objetivo TO-BE.

**Activos de información.** Siete activos, desde el registro de leads (AI-01), que contiene datos personales sujetos a la Ley 1581 de 2012 (Congreso de la República de Colombia, 2012), hasta facturación y contratos (AI-07), hoy inexistente.

**Hallazgo principal.** Toda la operación descansa en una persona y en un equipo de cómputo. El negocio TO-BE agrega P-06 Piloto, P-07 Integración con el centro de control, P-08 Gestión financiera y P-09 Talento humano, este último condicional a que exista personal que vincular.

# 5. Arquitectura de Datos

Fase C, datos. El entregable «Arquitectura de Datos (Punto 2)» contiene el inventario D-01 a D-23, los modelos conceptual y lógico AS-IS y TO-BE, tres flujos de información y los problemas PI-01 a PI-18.

![Modelo conceptual AS-IS](../ondas/M2-datos/diagramas/E-02-conceptual-as-is.png)

![Modelo conceptual TO-BE](../ondas/M2-datos/diagramas/E-02-conceptual-to-be.png)

Los flujos son el técnico (FL-T: video, inferencia, conteo y plan), el comercial (FL-C: formulario hacia la hoja de cálculo) y el de evidencia (FL-E).

![Flujo técnico FL-T](../ondas/M2-datos/diagramas/E-04-FL-T-tecnico.png)

**Problemas centrales.** Los conteos y planes no se guardan, por lo que no hay historial ni forma de medir; los leads se capturan sin política de tratamiento ni la autorización previa que exigen los artículos 5 a 7 del Decreto 1377 de 2013 (Presidencia de la República de Colombia, 2013); los pesos del modelo, el dataset y los videos no tienen respaldo. Marca: Observado por declaración del dueño (1 de noviembre de 2026). Las imágenes de personas en estación exigen tratar con cuidado los datos que pueden ser sensibles en el sentido del art. 5 de la Ley 1581 de 2012 (Congreso de la República de Colombia, 2012).

**Propuesta.** Modelo TO-BE con persistencia de conteos y planes por estación y fecha, registro versionado del modelo, gestor de leads con autorización y entidades de piloto, factura y contrato.

# 6. Arquitectura de Aplicaciones

Fase C, aplicaciones. El entregable «Arquitectura de Aplicaciones (Punto 3)» inventaría AP-01 a AP-13, mapea las integraciones, registra los problemas PR-01 a PR-17 y los riesgos RA-01 a RA-07, y propone la interoperabilidad con las aplicaciones nuevas N-01 a N-07 y las interfaces IT-01, IT-02, IT-04, IT-05, IT-06 e IT-07.

![Contexto de aplicaciones AS-IS](../ondas/M3-aplicaciones/diagramas/E6a-contexto-as-is.png)

**Situación AS-IS.** AP-01 Sitio web comercial de LIRN y TORNS, AP-02 Consola de operación de estaciones y AP-03 Servicio de detección de pasajeros y plan de despacho funcionan como prototipo; AP-02 y AP-03 no tienen autenticación; la inferencia está acoplada a la apertura del flujo de video; una hoja de cálculo con Apps Script (AP-06) sustituye al CRM; no hay integración con ningún centro de control ni aplicación de facturación.

![Contexto de aplicaciones TO-BE](../ondas/M3-aplicaciones/diagramas/E6c-contexto-to-be.png)

![Integraciones TO-BE](../ondas/M3-aplicaciones/diagramas/E6d-integraciones-to-be.png)

**Propuesta.** AP-06, la hoja de cálculo que hace de CRM, se elimina y la reemplaza el gestor de leads N-01 con autorización de tratamiento (RA-01). AP-03 se divide en AP-03a, API de despacho, y AP-03b, servicio de inferencia; se añaden identidad y roles (N-02), persistencia (N-04), registro de modelos (N-05) y facturación (N-06). Estas dos últimas responden a la necesidad DF-08 de la Arquitectura de Datos: el registro versionado del modelo y la facturación como necesidades de aplicación. La interfaz con el centro de control (IT-06) entrega una recomendación; la decisión de despacho sigue siendo del operador (principio PN-04).

# 7. Arquitectura Tecnológica

Fase D. El entregable «Arquitectura Tecnológica (Punto 4)» contiene el inventario tecnológico, los diagramas AS-IS y TO-BE, los riesgos RT-01 a RT-13 y la propuesta de entornos.

![Diagrama tecnológico AS-IS](../ondas/M4-tecnologia/diagramas/E4a-tecnologia-as-is.png)

**Situación AS-IS.** Todo corre en una sola estación de trabajo, con disco cerca de su capacidad y sin respaldos ni separación de entornos. Marca: Observado por declaración del dueño (1 de noviembre de 2026). Hoy no existen segmentación de red, firewall ni VPN. Marca: Observado por declaración del dueño (1 de noviembre de 2026). Sobre las cámaras: Observado por declaración del dueño (2 de noviembre de 2026): pruebas con usb0 y usb1 los días 16, 17, 18 y 20 de noviembre de 2025, en varios portátiles y PC con cámaras externas; resultados NO CONFIRMADO.

![Diagrama tecnológico TO-BE](../ondas/M4-tecnologia/diagramas/E4b-tecnologia-to-be.png)

**Propuesta.** Cinco entornos (Desarrollo, Laboratorio, Demostración, Piloto y Público), almacén de objetos para modelos y videos, gestor de secretos, respaldo verificado y GPU bajo demanda para la inferencia. Azure y GCP se mantienen como alternativas de nube (Objetivo TO-BE). El anexo «Anexo Punto 4. Comparativo de nube Azure y GCP para TORNS» estima la operación en São Paulo (Azure Brazil South y GCP southamerica-east1), única ubicación donde ambas ofrecen la GPU T4, con precios de lista de pago por uso de la Azure Retail Prices API (Microsoft, 2026) y de las páginas de precios de Google Cloud (Google, 2026), consultados el 2 de noviembre de 2026. Es una estimación y no una cotización.

| Escenario | Azure (USD/mes) | GCP (USD/mes) | Diferencia |
|---|---|---|---|
| Piloto (1 a 3 cámaras) | 755,45 | 650,11 | GCP 105,34 menos (14 %) |
| Escala (15 cámaras) | 3.096,77 | 2.864,32 | GCP 232,45 menos (8 %) |

Fuente: anexo «Anexo Punto 4. Comparativo de nube Azure y GCP para TORNS». Los totales excluyen los rubros marcados NO CONFIRMADO y no aplican descuentos. El equipo recomienda GCP southamerica-east1 por costo y por disponibilidad de T4 en tres zonas; Azure publica niveles de SLA iguales o superiores en VPN, secretos y base de datos sin alta disponibilidad. Marca: Objetivo TO-BE; la decisión es de Santiago y sigue pendiente. En ambas nubes los datos personales saldrían a Brasil, por lo que antes de cargarlos debe firmarse el contrato de transmisión con el proveedor como Encargado (Presidencia de la República de Colombia, 2013); el nivel adecuado de Brasil es NO CONFIRMADO. Los nodos administrativos de facturación y nómina, condicionales a la formalización, se rigen por la Resolución 000165 de 2023 (Dirección de Impuestos y Aduanas Nacionales [DIAN], 2023), la Resolución 000013 de 2021 (DIAN, 2021), la Ley 100 de 1993 (Congreso de la República de Colombia, 1993) y el Decreto 1072 de 2015 (Presidencia de la República de Colombia, 2015).

**Riesgos principales.** Los entregables de Aplicaciones y Tecnología registran 20 riesgos; se resumen así:

| Riesgo | Descripción breve |
|---|---|
| RA-01 | Hoja de cálculo usada como CRM, sin control |
| RA-02 | Identidad TRO residual en descripciones y nombres |
| RA-03 | Textos sin respaldo en consola y sitio |
| RA-04 | Identificadores de estación inconsistentes |
| RA-05 | Middleware no activado y detecciones simuladas |
| RA-06 | Base de Label Studio con datos personales en repositorio público |
| RA-07 | Google Fonts transfiere la IP del visitante sin aviso |
| RT-01 | Dependencia de una sola persona |
| RT-02 | Sin respaldos de pesos, dataset ni videos |
| RT-03 | Disco cerca de su capacidad |
| RT-04 | Modelo sin evaluación en estación |
| RT-05 | Consola y API sin autenticación |
| RT-06 | Configuración de desarrollo expuesta |
| RT-07 | Backend sin pruebas ni integración continua |
| RT-08 | Conteos solo en memoria |
| RT-09 | Datos personales en el laboratorio |
| RT-10 | Dependencia de cuentas de GitHub y Google |
| RT-11 | Cámara USB distinta de una cámara de campo |
| RT-12 | Gestión de secretos sin evidencia (NO CONFIRMADO) |
| RT-13 | Equipos obsoletos en la única estación |

# 8. Roadmap de Transformación

Fases E y F del ADM. El detalle está en los entregables de la Arquitectura de Transformación (Punto 5): resumen del negocio TO-BE, análisis de brechas, portafolio de proyectos, matriz de priorización, hoja de ruta, indicadores de éxito, registro de requisitos RQ-01 a RQ-20, gobierno de la implementación y gestión del cambio.

## 8.1 Situación objetivo TO-BE

LIRN, formalizada como S.A.S., ofrece TORNS a un operador B2B o una entidad B2G mediante un primer piloto pagado, con medición de demanda en estación, recomendación de despacho que decide el centro de control, datos personales tratados conforme a la ley y una operación que ya no depende de un solo equipo ni de una sola persona. Todo lo anterior es Objetivo TO-BE.

## 8.2 Análisis de brechas

Se identifican 26 brechas en cuatro series: negocio (B-N), datos (B-D), aplicaciones (B-A) y tecnología (B-T). Las más críticas son la falta de formalización legal (B-N01), el formulario sin autorización de tratamiento (B-D02), la ausencia de respaldos (B-D06) y el disco casi lleno con equipos obsoletos en la única estación (B-T06).

## 8.3 Portafolio de proyectos

| Proyecto | Nombre | Prioridad |
|---|---|---|
| PY-01 | Formalización legal de LIRN S.A.S. | 1 |
| PY-02 | Alineación de la identidad pública de TORNS | 2 |
| PY-03 | Canal comercial conforme a la Ley 1581 | 1 |
| PY-04 | Historial de conteos y despacho | 2 |
| PY-05 | Inferencia desacoplada y evaluación en estación | 2 |
| PY-06 | Interoperabilidad con el centro de control | 3 |
| PY-07 | Seguridad, respaldo y separación de entornos | 1 |
| PY-08 | Primer piloto pagado B2B o B2G | 3 |
| PY-09 | Gestión financiera y facturación | 1 |
| PY-10 | Gestión del talento humano | Condicional |

## 8.4 Matriz de priorización

Cada proyecto se valoró por impacto, complejidad y costo relativo, y por las dependencias que habilita. PY-01 tiene impacto alto y complejidad baja y habilita PY-03, PY-08, PY-09 y PY-10, por lo que va primero. PY-06 queda en prioridad 3 porque requiere un operador real. La matriz completa está en el entregable «Matriz de priorización».

## 8.5 Hoja de ruta

| Horizonte | Proyectos |
|---|---|
| 0 a 1 año | PY-01, PY-03, PY-07, PY-09, PY-02, PY-04 |
| 1 a 3 años | PY-05, PY-08 |
| 3 a 5 años | PY-06 |
| Sin fecha | PY-10, condicional a que haya personal que vincular |

![Hoja de ruta de transformación](../ondas/M5-transformacion/diagramas/hoja-de-ruta.png)

## 8.6 Indicadores de éxito

| Categoría | Indicadores |
|---|---|
| Reducción de tiempos | IN-01 primera respuesta a un lead; IN-02 restauración tras pérdida del equipo; IN-03 espera en andén durante el piloto |
| Disminución de costos | IN-04 pasos manuales para publicar el modelo; IN-05 despachos sin respaldo de demanda observada |
| Incremento de ventas | IN-06 conversión de leads; IN-07 piloto pagado firmado; IN-08 pilotos facturados |
| Satisfacción de usuarios | IN-09 satisfacción del controlador; IN-10 solicitudes de titulares atendidas en plazo |
| Calidad técnica | IN-11 recall en video de estación; IN-12 coincidencia con la decisión del operador; IN-13 activos con respaldo verificado |

Las metas no fijan cifras que no estén sustentadas. El recall de 0,55 corresponde a la última época del entrenamiento del 15 de noviembre de 2025 (precisión 0,73, mAP50 0,64), no a operación; IN-11 mide el recall sobre video real de estación, que hoy no existe.

# 9. Conclusiones

**Respuesta a la pregunta del taller.** La Arquitectura Empresarial propuesta ayuda a LIRN a alcanzar sus objetivos estratégicos en cinco años porque ordena la transformación según dependencias reales y no según preferencias técnicas.

1. En el primer año la arquitectura elimina los dos riesgos que hoy pueden detener la empresa: la dependencia de un solo equipo, con respaldo y entornos separados (PY-07), y la operación sin existencia legal ni tratamiento conforme de datos personales (PY-01 y PY-03). Sin esto ningún operador podría contratar a LIRN.
2. En ese mismo primer año, el historial de conteos (PY-04) deja medir el prototipo y la facturación (PY-09) permite cobrar el futuro piloto.
3. Entre el primer y el tercer año, la inferencia desacoplada (PY-05) hace medible el modelo con video real de estación, que es la condición para el primer piloto pagado (PY-08).
4. Entre el tercer y el quinto año, la interoperabilidad con el centro de control (PY-06) lleva la recomendación de despacho al operador, que mantiene la decisión.
5. La eficiencia se mide con los indicadores IN-01 a IN-13, que parten de líneas base observadas y no de cifras supuestas.

La organización resultante sigue siendo pequeña, pero deja de depender de una sola máquina y de una sola persona, y cada paso queda trazado desde un objetivo OE hasta una brecha, un proyecto y un indicador.

# 10. Recomendaciones

1. Iniciar PY-01, la formalización ante la Cámara de Comercio y la DIAN, porque habilita casi todo el portafolio.
2. Publicar la política y el aviso de tratamiento de datos antes de seguir recibiendo leads.
3. Hacer y probar el respaldo de pesos, dataset y videos de inmediato.
4. Conseguir video de estación con un acuerdo que respete la Ley 1581 de 2012 antes de anunciar cualquier métrica de desempeño.
5. Mantener la regla de comunicar solo lo evidenciado (PN-02) y no presentar a TransMilenio como cliente.
6. Decidir entre Azure y GCP con la estimación del anexo de nube del Punto 4 (GCP recomendado por el equipo; decisión de Santiago) y firmar el contrato de transmisión con el proveedor antes de cargar datos personales.
7. Revisar la hoja de ruta cada año, según la fase H del ADM.

# 11. Bibliografía

Congreso de la República de Colombia. (1993, 23 de diciembre). *Ley 100 de 1993, por la cual se crea el sistema de seguridad social integral y se dictan otras disposiciones*. Función Pública, Gestor Normativo. https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=5248

Congreso de la República de Colombia. (2008, 5 de diciembre). *Ley 1258 de 2008, por medio de la cual se crea la sociedad por acciones simplificada*. Función Pública, Gestor Normativo. https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=34130

Congreso de la República de Colombia. (2012, 17 de octubre). *Ley Estatutaria 1581 de 2012, por la cual se dictan disposiciones generales para la protección de datos personales*. Función Pública, Gestor Normativo. https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=49981

Dirección de Impuestos y Aduanas Nacionales. (2021, 11 de febrero). *Resolución 000013 de 2021, por la cual se implementa y desarrolla en el sistema de facturación electrónica la funcionalidad del documento soporte de pago de nómina electrónica y se adopta el anexo técnico*. https://www.dian.gov.co/normatividad/Normatividad/Resoluci%C3%B3n%20000013%20de%2011-02-2021.pdf

Dirección de Impuestos y Aduanas Nacionales. (2023, 1 de noviembre). *Resolución 000165 de 2023, por la cual se desarrolla el sistema de facturación, los proveedores tecnológicos, se adopta la versión 1.9 del anexo técnico de factura electrónica de venta, se expide el anexo técnico 1.0 del documento equivalente electrónico, y se dictan otras disposiciones en materia del sistema de facturación*. https://www.dian.gov.co/normatividad/Normatividad/Resoluci%C3%B3n%20000165%20de%2001-11-2023.pdf

Google. (2026). *Accelerator-optimized VM pricing* [Página de precios de Google Cloud]. Recuperado el 2 de noviembre de 2026, de https://cloud.google.com/products/compute/pricing/accelerator-optimized

Equipo TORNS. (2026). *Guía Actividad 2, Ingeniería Aplicada* [Documento interno no publicado].

Microsoft. (2026). *Azure Retail Prices API* [Interfaz de precios de lista]. Recuperado el 2 de noviembre de 2026, de https://prices.azure.com/api/retail/prices

Object Management Group. (2014). *Business Process Model and Notation (BPMN), Version 2.0.2*. https://www.omg.org/spec/BPMN/2.0.2/

The Open Group. (2022). *The TOGAF Standard, 10th Edition*. https://www.opengroup.org/togaf

Presidencia de la República de Colombia. (2013, 27 de junio). *Decreto 1377 de 2013, por el cual se reglamenta parcialmente la Ley 1581 de 2012*. Función Pública, Gestor Normativo. https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=53646

Presidencia de la República de Colombia. (2015, 26 de mayo). *Decreto 1072 de 2015, Decreto Único Reglamentario del Sector Trabajo*. Función Pública, Gestor Normativo. https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=72173

Presidencia de la República de Colombia. (2019, 5 de junio). *Decreto 957 de 2019, por el cual se adiciona el capítulo 13 al Título 1 de la Parte 2 del Libro 2 del Decreto 1074 de 2015*. Función Pública, Gestor Normativo. https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=94550

Ultralytics. (s. f.). *Ultralytics YOLO11* [Documentación]. Recuperado el 1 de noviembre de 2026, de https://docs.ultralytics.com/models/yolo11/
