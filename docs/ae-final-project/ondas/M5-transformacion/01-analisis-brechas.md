# Análisis de Brechas consolidado (Fase E del ADM)
> Borrador de apoyo v1.0, 1 de noviembre de 2026. Líder de Transformación. Santiago redacta el texto final. Sin cifras, costos ni NIT. Marcas: Observado, Diseñado AS-IS, Objetivo TO-BE. «Pendiente M4» significa que el insumo depende del entregable de la Arquitectura Tecnológica, aún no publicado en main.

| ID | Dominio | AS-IS (qué existe hoy) | Marca AS-IS | TO-BE (qué hace falta) | Qué debe cambiar | Trazas | Estado de insumo |
|----|---------|------------------------|-------------|------------------------|------------------|--------|------------------|
| B-N01 | Negocio | Sin NIT ni matrícula mercantil | Observado | S.A.S. formalizada | Registro ante Cámara de Comercio y DIAN | G-N01; PI-17 | Completo |
| B-N02 | Negocio | Banda pública de tres nombres frente a equipo de una persona (Johel Arias); identificadores tro-* residuales | Observado | Comunicación alineada al equipo vigente | Actualizar banda y retirar residuos TRO | G-N02; PI-07; PR-09, PR-10 | Completo |
| B-N03 | Negocio | Leads recopilados en hoja sin respuesta ni seguimiento | Observado por declaración | Embudo con atención y seguimiento (CAP-03) | Incorporar paso de atención al proceso comercial | G-N03; PI-02, PI-16; PR-17 | Completo |
| B-N04 | Negocio | Sin evaluación del modelo en estación; recall 0,55 es métrica de entrenamiento de la última época sobre 1.000 imágenes del COCO Person Dataset de Roboflow, no de estación | Observado | Evaluación con video de estación acordado con operador | Definir protocolo de evaluación en campo | G-N05; RT-03, RT-05; PR-16 | Completo |
| B-N05 | Negocio | CAP-07, CAP-09 y CAP-10 ausentes | Observado | Capacidades con proceso (P-07, P-08, P-09) | Diseñar interoperabilidad, facturación y talento | G-N06; PR-06, PR-15 | Completo |
| B-N06 | Negocio | Sin proceso de contratación ni piloto | Observado | P-06 y SN-04 | Diseñar proceso de piloto pagado | G-N07 | Completo |
| B-N07 | Negocio | Dependencia de una sola persona para las cinco áreas | Observado | Roles futuros (Comercial, Ingeniería, Operación, Calidad) | Plan de talento ligado a CAP-10 | G-N06; PR-15 | Pendiente M4 |
| B-D01 | Datos | Conteos y planes solo en memoria | Observado | Historial comparable por estación | Persistencia gestionada | G-N04; PI-01; PR-05; PI-01 | Completo |
| B-D02 | Datos | Formulario sin política Ley 1581 ni casilla de autorización; datos en cuenta personal de Google | Observado por declaración | Política, aviso y autorización publicados | Formalizar tratamiento de datos personales | G-N03; PI-02, PI-17; PR-02 | Completo (aviso requiere B-N01) |
| B-D03 | Datos | Sin diccionario, propietario de dato ni retención | Observado (ausencia) | Gobierno de datos mínimo | Catálogo y política de retención | PI-03, PI-11, PI-12 | Completo |
| B-D04 | Datos | Cuenta de anotador con datos personales en repositorio público | Observado | Datos personales fuera del repositorio | Retirar y controlar base de Label Studio (AP-08) | PI-13; PR-14 | Completo |
| B-D05 | Datos | Inconsistencias de identificadores y datos de demostración legibles como reales | Observado | Catálogo de estaciones único y datos de demo rotulados | Corregir y rotular | PI-05, PI-06, PI-09; PR-08 | Completo |
| B-D06 | Datos | Sin respaldos de datos | Observado por declaración | Respaldo de pesos, dataset y leads | Política de respaldo | PI-18; RT-02 | Pendiente M4 |
| B-A01 | Aplicaciones | AP-06 (hoja con Apps Script) como sustituto de CRM, sin acuse ni reintento | Observado | Gestor estructurado de leads (N-01) | Reemplazar AP-06 con integración IT-01 | PR-01; PI-02 | Completo (Punto 3) |
| B-A02 | Aplicaciones | AP-02 y AP-03 sin autenticación; CORS abierto | Observado | Identidad y roles (N-02) | Autenticación y CORS restringido | PR-03; PI-14; RT-07 | Completo (Punto 3) |
| B-A03 | Aplicaciones | Inferencia ligada a la apertura del stream en AP-03 | Observado | AP-03a API de despacho y AP-03b inferencia desacoplada (N-03) | Partición lógica y cola de conteos | G-N05; PR-04 | Completo (Punto 3) |
| B-A04 | Aplicaciones | AP-05 copiado a mano, deriva de versiones entre AP-04 y AP-03 | Observado | Registro versionado del modelo (N-05) | Publicación de artefacto con metadatos | PR-07 | Completo (Punto 3) |
| B-A05 | Aplicaciones | Sin integración con centro de control | Observado (ausencia) | Interfaz autenticada IT-06 | Acordar contrato de interfaz con operador | G-N06; PR-06 | Completo (Punto 3) |
| B-A06 | Aplicaciones | Sin aplicación de facturación y contabilidad | Observado (ausencia) | Facturación electrónica SaaS (N-06) | Adoptar servicio | G-N06; PR-15 | Completo (Punto 3); requiere B-N01 |
| B-A07 | Aplicaciones | Código sin uso, textos sin respaldo, sin pruebas | Observado | Código limpio, textos alineados, pruebas | Saneamiento | PR-10, PR-11, PR-12; RT-06 | Completo (Punto 3) |
| B-T01 | Tecnología | Sin despliegue fuera del equipo local ni entorno de piloto | Observado por declaración | Entorno de piloto separado de demo y laboratorio | Separación de entornos | PR-13; PI-18 | Pendiente M4 |
| B-T02 | Tecnología | Configuración de desarrollo expuesta en imagen | Observado | Imagen de producción contenerizada | Endurecer imágenes | PR-12 | Pendiente M4 |
| B-T03 | Tecnología | Gestión de secretos no verificada | NO CONFIRMADO | Gestor de secretos | Adoptar gestor | Pendiente M4 | Pendiente M4 |
| B-T04 | Tecnología | Cámara USB no equivale a cámara de campo; sin GPU de producción | Observado | Fuente y red de estación acordadas; nodo con GPU a evaluar | Evaluación de infraestructura de campo | RT-05; G-N05 | Pendiente M4 |
| B-T05 | Tecnología | Dependencia de GitHub (AP-07) y Google | Observado | Dependencias gestionadas con respaldo | Plan de continuidad | RT-04 | Pendiente M4 |
| B-T06 | Tecnología | Binarios pesados en repositorios; equipos sin especificación | Observado / NO CONFIRMADO | Almacenamiento de artefactos y equipo especificado | Limpieza y especificación | Pendiente M4 | Pendiente M4 |

Totales: 26 brechas (Negocio 7, Datos 6, Aplicaciones 7, Tecnología 6). Las brechas de Tecnología B-T01 a B-T06 se derivan de los riesgos ya Observados en los Puntos 2 y 3 y de la sección de tecnología del registro de empresa; su inventario y diagrama quedan Pendiente M4 y se cotejan cuando la Arquitectura Tecnológica se publique.

Correspondencia con las brechas de negocio del TO-BE de Negocio: B-N01 a B-N06 corresponden a G-N01 a G-N03, G-N05, G-N06 y G-N07; G-N04 se consolida en B-D01. B-N07 es una brecha adicional de M5.

Nota: los identificadores RT-01 a RT-07 son los riesgos técnicos del Punto 3. Las brechas que en el borrador previo citaban riesgos de M4 aún no publicados quedan marcadas Pendiente M4.
