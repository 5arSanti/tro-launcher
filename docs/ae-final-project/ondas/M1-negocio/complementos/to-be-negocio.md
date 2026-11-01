# Arquitectura de Negocio TO-BE de LIRN (borrador de apoyo para el Punto 5)

Versión 0.2, 1 de noviembre de 2026 (cambios frente a 0.1 al final del documento). Borrador de apoyo; Santiago redacta el texto final. Todo lo descrito como estado futuro es Objetivo TO-BE. Los puntos de partida citan su marca AS-IS. No se fijan cifras, costos, fechas de mercado ni clientes: donde el taller pida una meta, queda NO CONFIRMADO hasta que el Roadmap de Transformación la defina.

Alcance según el enunciado del taller: capacidades, procesos, servicios, información y recursos tecnológicos del negocio TO-BE. Información y tecnología se describen aquí solo como requisito de negocio; el detalle está en la Arquitectura de Datos (Punto 2) y en la Arquitectura Tecnológica (Punto 4).

Hechos confirmados por el dueño (Observado por declaración del dueño (1 de noviembre de 2026)): LIRN tiene un autor único, Johel Santiago Arias; los tres nombres de la página de TORNS son de presentación y no corresponden a un equipo. Los nombres técnicos tro-* se mantienen en la descripción AS-IS. Las pruebas de captura se hicieron con dos cámaras USB (usb0 y usb1). Label Studio se considera aplicación (AP-08 en la Arquitectura de Aplicaciones); SharePoint y el correo son herramientas de apoyo.

Nombres de superficies aprobados por Santiago: AP-01 Sitio web comercial de LIRN y TORNS, AP-02 Consola de operación de estaciones, AP-03 Servicio de detección de pasajeros y plan de despacho, que en el TO-BE se divide en AP-03a (API de despacho) y AP-03b (servicio de inferencia), AP-04 Entrenamiento del modelo de detección. El inventario completo de aplicaciones (AP-01 a AP-13, incluidas AP-12 Google Fonts y AP-13 Google Forms) y las diferencias DF-01 a DF-10 están en el entregable de Aplicaciones (Punto 3); el modelo de datos, los flujos y el tratamiento Ley 1581 están en el entregable de Datos (Punto 2).

## 1. Visión de negocio TO-BE

Punto de partida: misión y visión aprobadas (Observado); cero clientes y sin piloto (Observado); equipo de una persona (Observado).

<!-- reescribir Santiago -->
Estado objetivo: LIRN, formalizada como S.A.S., ofrece TORNS a un operador B2B o una entidad B2G bajo un primer piloto pagado, con medición de demanda en estación, recomendación de despacho que decide el centro de control, datos personales tratados bajo la Ley 1581 y evidencia trazable de resultados. Objetivo TO-BE, ligado a OE-05.

Principios que gobiernan el TO-BE: PN-01 a PN-08 del catálogo de principios (borrador). En especial PN-02 (afirmar solo lo evidenciado), PN-04 (la decisión de despacho es del operador) y PN-08 (crecer por capacidad).

## 2. Capacidades TO-BE

| Capacidad | AS-IS (marca) | Estado objetivo (Objetivo TO-BE) | Candidato que la habilita | OE |
|-----------|---------------|----------------------------------|---------------------------|----|
| CAP-01 Gobierno de producto único y control de claims | Presente, básica documental (Observado) | Revisión de claims formal para cada pieza pública y propuesta comercial, con registro de decisiones | Formalización legal; alineación de la banda pública | OE-03, OE-05 |
| CAP-02 Gestión de evidencia, calidad y privacidad (Ley 1581) | Presente, básica documental (Observado) | Política y aviso de tratamiento publicados, autorización registrada, evidencia del piloto custodiada con fecha y alcance | Política Ley 1581 y gestor de leads | OE-03 |
| CAP-03 Ventas y captación de interés B2B / B2G | Incipiente: los leads se recopilan en una hoja de la cuenta Google personal de Santiago y no se responden (Observado); riesgo actual frente a la Ley 1581/2012 (Observado) | Seguimiento de leads con autorización de tratamiento registrada: interés, respuesta, calificación, propuesta y contrato, en un gestor con trazabilidad | Política Ley 1581 y gestor de leads; primer piloto | OE-02, OE-05 |
| CAP-04 Detección y conteo de pasajeros en estación | Funcional en prototipo (Observado) | Conteo evaluado en condiciones reales de estación, con métrica reportada por estación y fecha | Desacople de inferencia y evaluación en estación | OE-01, OE-04 |
| CAP-05 Cálculo y recomendación determinista de despacho | Funcional en prototipo, regla ⌈N/C⌉ (Observado) | Recomendación persistida e histórica, comparable con la decisión real del centro de control | Persistencia histórica de conteos y recomendaciones | OE-01, OE-04 |
| CAP-06 Atención al cliente / acompañamiento de demostración | Presente acotada (Observado) | Acompañamiento de piloto con soporte, incidencias y cierre de sesión documentados | Primer piloto | OE-01, OE-05 |
| CAP-07 Integración y despacho en vivo con el centro de control | Ausente (Observado) | Intercambio seguro y autenticado con el centro de control; el operador sigue decidiendo | Capacidades ausentes (interoperabilidad) | OE-04, OE-05 |
| CAP-08 Gestión de inventarios | Parcial, solo activos digitales (Observado) | Inventario de activos digitales y físicos del piloto (cámaras, equipos) con responsable | Respaldo, secretos y separación de entornos | OE-01 |
| CAP-09 Gestión financiera, contable y facturación | Ausente (Observado) | Facturación electrónica y contabilidad mínimas para cobrar el piloto | Formalización legal; capacidades ausentes | OE-05 |
| CAP-10 Gestión de talento humano | Ausente como proceso formal (Observado) | Roles definidos cuando una capacidad lo exija, con vinculación formal | Capacidades ausentes | OE-05 |

## 3. Procesos TO-BE

Se conservan P-01 a P-05 y se proponen procesos nuevos solo donde una capacidad ausente lo exige (PN-08). Los identificadores P-06 a P-08 son propuestos y quedan pendientes de decisión de Santiago.

| Proceso | Tipo | Cambio TO-BE (Objetivo TO-BE) | Capacidades |
|---------|------|-------------------------------|-------------|
| P-01 Dirección estratégica | Estratégico | Añade revisión de portafolio y aprobación de propuestas comerciales antes de enviarlas | CAP-01 |
| P-02 Relación comercial | Misional | Pasa de recibir interés a gestionar el embudo hasta la propuesta; aviso de privacidad en el primer contacto | CAP-03, CAP-02 |
| P-03 Realización del producto | Misional | Incluye evaluación en estación y versionado de modelo y regla antes de cada entrega | CAP-04, CAP-05, CAP-08 |
| P-04 Acompañamiento | Misional | Se extiende de la demostración al acompañamiento de piloto con registro de incidencias | CAP-06 |
| P-05 Evidencia, calidad y mejora | Apoyo | Custodia la evidencia del piloto y verifica que todo indicador publicado tenga fuente | CAP-02 |
| P-06 Contratación y piloto (propuesto, pendiente de decisión de Santiago) | Misional | Desde la propuesta aprobada hasta el acta de inicio y cierre del piloto. Condición de entrada: evaluar el modelo con video de estación y acordar con el operador la fuente de video y la red (Objetivo TO-BE) | CAP-03, CAP-06, CAP-09 |
| P-07 Integración con el centro de control (propuesto, pendiente de decisión de Santiago) | Misional | Acuerdo técnico y operativo de intercambio con el operador; operador humano en el circuito | CAP-07 |
| P-08 Gestión administrativa y financiera (propuesto, pendiente de decisión de Santiago) | Apoyo | Facturación, contabilidad, contratos y vinculación de personal | CAP-09, CAP-10 |

<!-- reescribir Santiago -->
Cadena de valor TO-BE: las actividades primarias "Propuesta, contrato y piloto pagado" y "Soporte técnico y mejora con el operador", que hoy no tienen proceso (Observado), quedan cubiertas por P-06 y por P-04 extendido con SN-05, respectivamente (Objetivo TO-BE). P-07 habilita CAP-07.

## 4. Servicios de negocio TO-BE

| Servicio | AS-IS | Objetivo TO-BE |
|----------|-------|----------------|
| SN-01 Información institucional y recepción de interés | Diseñado AS-IS; en la práctica el interés se recibe y no se responde (Observado) | Con aviso de privacidad, autorización de tratamiento y respuesta trazable bajo CAP-03 |
| SN-02 Demostración guiada de medición y recomendación | Observado | Se mantiene como paso previo a la propuesta |
| SN-03 Verificación de evidencia y control de no-claims | Observado | Se aplica también a los informes del piloto |
| SN-04 Piloto de medición de demanda en estación (propuesto, pendiente de decisión de Santiago) | No existe (Observado) | Servicio pagado y acotado en tiempo y estaciones, con informe de resultados. Condición previa: evaluación del modelo con video de estación y acuerdo con el operador sobre fuente de video y red |
| SN-05 Soporte y mejora del servicio (propuesto, pendiente de decisión de Santiago) | No existe (Observado) | Atención de incidencias y ajustes acordados con el operador |

Sin precio, duración ni número de estaciones: NO CONFIRMADO, lo define el Roadmap de Transformación.

<!-- reescribir Santiago -->
Nota sobre el desempeño del modelo (Observado): el recall de 0,55 es la métrica de entrenamiento de la última época, medida sobre 1.000 imágenes de validación del COCO Person Dataset de Roboflow, sin imágenes de TransMilenio ni de estaciones; el entrenamiento se realizó el 15 de noviembre de 2025 (Observado por declaración del dueño, 1 de noviembre de 2026). No anticipa el desempeño en plataforma; por eso SN-04 y P-06 exigen la evaluación previa con video de estación.

## 5. Información requerida por el negocio TO-BE (insumo para la Arquitectura de Datos)

- Historial de conteos y recomendaciones por estación y fecha (CAP-05, SN-04).
- Registro de leads con autorización de tratamiento (CAP-02, CAP-03).
- Contratos, actas y facturación del piloto (AI-07 deja de ser brecha).
- Evidencia de resultados del piloto con fuente y alcance (CAP-02, P-05).
El modelo de datos, la clasificación y los flujos se desarrollan en la Arquitectura de Datos.

## 6. Recursos tecnológicos requeridos (insumo para la Arquitectura de Aplicaciones y la Arquitectura Tecnológica)

- AP-03b (servicio de inferencia continua) publica el evento IT-07 y AP-03a (API de despacho) lo persiste, de modo que el conteo no depende de que haya un cliente conectado (Objetivo TO-BE; CAP-04, CAP-05).
- AP-02 y AP-03a con autenticación y roles de usuario (Objetivo TO-BE; DF-05 de la Arquitectura de Aplicaciones), requisito para CAP-07.
- Entorno de piloto separado del laboratorio, con respaldo y gestión de secretos (CAP-08).
- Gestor de leads en reemplazo de la hoja de la cuenta personal, con registro de autorización de tratamiento (CAP-02, CAP-03).
- Registro versionado de modelos de detección, necesidad de aplicación enlazada a P-03 y a CAP-04 y CAP-08 (Objetivo TO-BE; DF-08 de la Arquitectura de Aplicaciones).
- Facturación, necesidad de aplicación enlazada a P-08 y CAP-09 (Objetivo TO-BE; DF-08 de la Arquitectura de Aplicaciones).
La selección y el diseño son de Aplicaciones y Tecnología; aquí solo se declara la necesidad de negocio.

## 7. Organización TO-BE

<!-- reescribir Santiago -->
Punto de partida: una persona, Johel Arias, autor único, cubre las cinco áreas funcionales (Diseñado AS-IS). Estado objetivo: las áreas existen como roles; un cargo nuevo solo se justifica por una capacidad ausente (CAP-07, CAP-09, CAP-10). No se fija número de personas ni fecha: NO CONFIRMADO.

## 8. Brechas de negocio AS-IS a TO-BE (insumo para el Gap Analysis del Roadmap de Transformación)

| ID | Tipo | Lo que falta hoy (Observado) | Estado que la cierra (Objetivo TO-BE) | Candidato |
|----|------|------------------------------|---------------------------------------|-----------|
| G-N01 | Brecha | Sin NIT ni matrícula (Observado) | S.A.S. formalizada | C-01: Formalización legal ante Cámara de Comercio y DIAN |
| G-N02 | Brecha | Banda pública desalineada (Observado) | Comunicación alineada con el equipo vigente | C-02: Alineación de la banda pública |
| G-N03 | Brecha | Leads en hoja de la cuenta Google personal de Santiago, sin respuesta y sin política publicada; riesgo Ley 1581/2012 (Observado) | Embudo con gestor y política Ley 1581 | C-03: Política Ley 1581 y gestor de leads |
| G-N04 | Brecha | Conteos solo en memoria (Observado) | Historial comparable por estación | C-04: Persistencia histórica |
| G-N05 | Brecha | Modelo evaluado solo en validación de entrenamiento sobre imágenes genéricas, recall 0,55 (Observado) | Evaluación en estación | C-05: Desacople y evaluación en estación |
| G-N06 | Brecha | CAP-07, CAP-09 y CAP-10 ausentes (Observado) | Capacidades con proceso (P-07, P-08) | C-06: Capacidades ausentes |
| G-N07 | Brecha | Sin proceso de contratación ni piloto (Observado). Riesgo de continuidad: no hay copias de respaldo y todo se despliega solo en el equipo de Santiago (Observado por declaración del dueño, 1 de noviembre de 2026; detalle en la Arquitectura Tecnológica) | P-06 y SN-04, con respaldo y entorno de piloto separado | C-08 y C-07: Primer piloto pagado; respaldo y separación de entornos |

## Pendientes para Santiago
1. Aprobar o descartar P-06, P-07, P-08, SN-04 y SN-05 (propuestos).
2. Confirmar que el piloto pagado es el único hito comercial del horizonte TO-BE.
3. Metas, plazos y costos: NO CONFIRMADO, se definen en el Roadmap de Transformación.

## Cambios de la versión 0.2
- G-N07: riesgo de continuidad por ausencia de respaldo y despliegue en un solo equipo, enlazado a la Arquitectura Tecnológica.
- SN-04 y P-06: condición de piloto y nota sobre el recall de 0,55.
- CAP-03, SN-01 y G-N03: leads recopilados sin respuesta en cuenta personal; riesgo Ley 1581/2012; seguimiento con autorización como objetivo.
- Sección 6: autenticación con roles en AP-02 y AP-03a (DF-05); AP-03a y AP-03b con IT-07; registro versionado de modelos y facturación (DF-08).
- P-06 a P-08, SN-04 y SN-05 marcados como propuestos pendientes de decisión de Santiago.
- Hechos confirmados: autor único, nombres tro-* en AS-IS, cámaras usb0 y usb1, clasificación de Label Studio, SharePoint y correo.
