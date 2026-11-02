# Registro de Empresa LIRN

Tablero de coherencia del taller TOGAF. Un hecho bloqueado no se contradice en ondas posteriores.

Marcas: Observado | Diseñado AS-IS | Objetivo TO-BE.

## 1. Identidad legal y de mercado

Desarrollado y bloqueado en `ondas/M1-negocio/01-organizacion-y-estrategia.md`.

| Hecho | Marca | Estado |
|-------|-------|--------|
| Razón social de trabajo: LIRN (proyectada LIRN S.A.S.) | Diseñado AS-IS | Bloqueado (M1) |
| Forma: Proyectada como S.A.S. unipersonal (Ley 1258 de 2008), sin constituir, Colombia | Objetivo TO-BE; sin registro, Observado por declaración del dueño (2 de noviembre de 2026) | Bloqueado (M1) |
| Sede: Bogotá | Diseñado AS-IS | Bloqueado (M1) |
| Tamaño: microempresa unipersonal (Decreto 957 de 2019) | Observado (equipo) / Diseñado AS-IS (marco) | Bloqueado (M1) |
| Sector: software e ITS para movilidad y transporte masivo (CIIU 6201 / 6202) | Diseñado AS-IS | Bloqueado (M1) |
| NIT y matrícula mercantil | No hay registro ante Cámara de Comercio | Observado por declaración del dueño (2 de noviembre de 2026). Brecha G-N01; no se asigna número; el registro ante la Cámara de Comercio de Bogotá ocurre después de la fecha de entrega |
| Mercado: operadores B2B y B2G de sistemas masivos con estaciones | Diseñado AS-IS | Bloqueado (M1) |
| Datos personales: Ley 1581 de 2012 y Decreto 1377 de 2013 | Diseñado AS-IS | Bloqueado (M1) |

## 2. Equipo y organigrama

Desarrollado y bloqueado en `ondas/M1-negocio/02-organigrama-y-stakeholders.md`.

| Hecho | Marca | Estado |
|-------|-------|--------|
| Equipo actual: Johel Santiago Arias. | Observado | Bloqueado (M1) |
| Organigrama AS-IS: Dirección General, una persona | Diseñado AS-IS | Bloqueado (M1) |
| Vista funcional: Dirección, Comercial, Producto / Ingeniería, Operación, Calidad | Diseñado AS-IS | Bloqueado (M1) |
| El fundador es responsable actual de las cinco áreas | Diseñado AS-IS | Bloqueado (M1) |
| Áreas ocupadas por gerencias distintas | Objetivo TO-BE | No afirmar como hoy |
| Banda pública de tres nombres en `/torns` | Observado (copia histórica) | Brecha de alineación documental |

## 3. Misión, visión, objetivos estratégicos

Desarrollado y bloqueado en `ondas/M1-negocio/01-organizacion-y-estrategia.md`.

Misión (Observado, `PRODUCT.md`): Hacer que el transporte masivo ajuste su oferta a la demanda real de cada estación, midiendo quién espera ahora y no solo lo que el horario predijo.

Visión (Observado, `PRODUCT.md`): Que cada estación de un sistema masivo opere con la demanda que ocurre, no con la que se supuso.

Objetivos estratégicos (Diseñado AS-IS, bloqueados como `OE-01` a `OE-05`):

1. `OE-01`: Convertir el prototipo TORNS en un producto demostrable y controlado para un centro de control.
2. `OE-02`: Abrir un canal comercial honesto hacia operadores B2B y B2G, sin afirmar cliente.
3. `OE-03`: Proteger datos personales y evidencia según Ley 1581 y el mapa de procesos.
4. `OE-04`: Cerrar la brecha entre demanda medida y oferta recomendada como propuesta de valor única.
5. `OE-05`: Preparar la firma para un primer piloto pagado en el horizonte TO-BE, no como hecho actual.

## 4. Producto y oferta

Desarrollado y bloqueado en `ondas/M1-negocio/01-organizacion-y-estrategia.md` y `04-arquitectura-negocio-as-is.md`.

| Hecho | Marca | Estado |
|-------|-------|--------|
| LIRN es la firma. TORNS es el único producto. | Observado | Bloqueado (M1) |
| TORNS es prototipo aplicado. No es piloto firmado. | Observado | Bloqueado (M1) |
| Mecanismo: conteo de personas y recomendación de oferta | Observado | Bloqueado (M1) |
| El prototipo cuenta personas. No calcula densidad por área. | Observado | Bloqueado (M1) |
| Capacidades de tren del prototipo: 5, 10 y 15. Regla ⌈N/C⌉ y tren más pequeño suficiente. | Observado | Bloqueado (M1) |
| Servicios de negocio AS-IS: `SN-01` (información y recepción de interés), `SN-02` (demostración guiada de medición y despacho), `SN-03` (verificación de evidencia y no-claims) | Observado / Diseñado AS-IS | Bloqueado (M1) |
| Producto listo para piloto pagado | Objetivo TO-BE | Brecha |

## 5. Clientes, segmentos y partes interesadas

Desarrollado y bloqueado en `ondas/M1-negocio/01-organizacion-y-estrategia.md` y `02-organigrama-y-stakeholders.md`.

| Hecho | Marca | Estado |
|-------|-------|--------|
| Clientes firmados: ninguno | Observado | Bloqueado (M1) |
| Transmilenio es caso de estudio, no cliente. | Observado | Bloqueado (M1) |
| Segmento objetivo: operadores de transporte masivo con estaciones (B2B operadores concesionarios 4,15/5; B2G Sistema Metro de Bogotá 4,00/5) | Observado / Diseñado AS-IS | Bloqueado (M1) |
| `SH-01` Fundador: influencia alta | Diseñado AS-IS | Bloqueado (M1) |
| `SH-02` Universidad Libre / academia del taller: influencia alta | Observado | Bloqueado (M1) |
| `SH-03` Operadores concesionarios y controladores (incluye entrevistado SITP): influencia alta en requisitos / media en AS-IS sin contrato | Observado / Diseñado AS-IS | Bloqueado (M1) |
| `SH-04` Administradores de estaciones: influencia media | Diseñado AS-IS | Bloqueado (M1) |
| `SH-05` Entes gestores de movilidad (TransMilenio S.A. como referente, Metro como segmento B2G): influencia media en AS-IS | Observado / Diseñado AS-IS | Bloqueado (M1) |
| `SH-06` Visitantes del sitio y leads del formulario: influencia media | Observado | Bloqueado (M1) |
| `SH-07` Pasajeros de transporte masivo (incluye encuesta `n=20`): influencia baja en compra directa / media como evidencia | Observado | Bloqueado (M1) |
| `SH-08` Proveedores técnicos: GitHub, Google, Roboflow, Ultralytics: influencia media | Observado | Bloqueado (M1) |

## 6. Procesos y capacidades

Desarrollado y bloqueado en `ondas/M1-negocio/03-activos-procesos-capacidades.md`.

| Hecho | Marca | Estado |
|-------|-------|--------|
| Procesos: P-01 a P-05. | Observado | Bloqueado (M1) |
| P-01 estratégico. P-02, P-03 y P-04 misionales. P-05 apoyo. | Observado | Bloqueado (M1) |
| Capacidades presentes: dirección de producto único (`CAP-01`), evidencia y cumplimiento (`CAP-02`), captura de interés / ventas precomercial (`CAP-03`), detección y conteo (`CAP-04`), recomendación de oferta (`CAP-05`), atención / acompañamiento de demostración (`CAP-06`) y catálogo digital (`CAP-08` parcial) | Observado / Diseñado AS-IS | Bloqueado (M1) |
| Capacidades ausentes: facturación (`CAP-09`), CRM, talento humano (`CAP-10`), inventario físico (`CAP-08` físico), despacho real del operador (`CAP-07`) | Observado | Brecha (M1) |

## 7. Activos de información y datos

Clasificación de negocio y Ley 1581 de 2012 bloqueada en `ondas/M1-negocio/03-activos-procesos-capacidades.md` (`AI-01` a `AI-07`). El modelo relacional, flujo y problemas de datos se detallan en M2:

| Activo | Clasificación | Marca |
|--------|---------------|-------|
| `AI-01` Leads del formulario | Confidencial / Datos personales privados y semiprivados, Ley 1581 | Observado |
| `AI-02` Encuesta 17 de agosto de 2026, n=20. Entrevista a controlador SITP (rol, no nombre). | Investigación, interno (resumen autorizado público) / Sin datos personales identificables | Observado |
| `AI-03` Video y conteos del prototipo (`person_count`) | Interno / puede incluir imagen de personas (dato potencialmente sensible; sin biometría ni identificación) | Observado |
| `AI-04` Pesos del modelo (`my_model.pt`) y dataset curado | Reservado (secreto empresarial; tensores sin datos personales) | Observado |
| `AI-05` Código fuente (`lirn-web-main`, `tro-frontend`, `tro-backend`, `yolo-train-routes-optimization`) | Interno / Reservado | Observado |
| `AI-06` Fichas y diagramas de proceso (`P-01` a `P-05` y registro) | Interno / publicado el diagrama Lucid (dato público empresarial del fundador) | Observado |
| `AI-07` Facturación y contratos | No existen | Brecha |

## 8. Aplicaciones

Se detalla en M3. Superficies bloqueadas:

Superficies de software: `lirn-web-main`, `tro-frontend`, `tro-backend`, `yolo-train-routes-optimization`.

También observados: Google Sheets (contacto), GitHub, Lucidchart, SharePoint, correo.

CRM, ERP e identidad de operador: Objetivo TO-BE.

## 9. Tecnología

Estado: cerrada en M4 (Arquitectura Tecnológica, Punto 4). AS-IS Observado: estación de trabajo del fundador como único entorno, Docker local, GitHub Pages, Git, pesos `.pt`, OpenCV (archivo, USB o RTSP), cámaras USB usb0 y usb1, GPU obsoleta y disco cerca de su capacidad, sin respaldos. Cámaras: se han hecho pruebas con cámaras USB integradas en portátiles (usb0) y con cámaras USB externas (usb1); Observado por declaración del dueño (2 de noviembre de 2026): pruebas con usb0 y usb1 los días 16, 17, 18 y 20 de noviembre de 2025, en varios portátiles y PC con cámaras externas; resultados NO CONFIRMADO. Riesgos RT-01 a RT-13 del Punto 4 (RT-12, gestión de secretos, NO CONFIRMADO). Objetivo TO-BE: AP-03a y AP-03b separados con cola IT-07 (producto NO CONFIRMADO), entornos de laboratorio, demostración y piloto separados, nodos alojables en nube (Azure y GCP como alternativas; costos según el anexo de nube del Punto 4, estimación a precios de lista de pago por uso consultados el 2 de noviembre de 2026: piloto Azure 755,45 y GCP 650,11 USD/mes, escala Azure 3.096,77 y GCP 2.864,32 USD/mes; el equipo recomienda GCP como Objetivo TO-BE y la decisión es de Santiago), GPU bajo demanda, almacén de objetos versionado y autenticación N-02. Fuentes normativas revisadas el 1 de noviembre de 2026: Resolución DIAN 000165 de 2023 (facturación electrónica), Resolución DIAN 000013 de 2021 (nómina electrónica), Ley 100 de 1993 (afiliación y aportes a seguridad social) y Decreto 1072 de 2015 (PILA para teletrabajadores). IT-EQ-04 Pruebas con cámaras: ver la marca de cámaras de este apartado. IT-RD-06 Segmentación, firewall o VPN: no existen actualmente, Observado por declaración del dueño (1 de noviembre de 2026).

Resultados agregados de la encuesta del 17 de agosto de 2026 (n=20, formulario anónimo), tomados del documento interno no publicado «Guía Actividad 2, Ingeniería Aplicada» (Equipo TORNS, 2026). Marca: Observado (cifras agregadas; sin datos personales de encuestados). Las etiquetas siguen las del documento:

- Frecuencia de uso: el 30 % usa el sistema a diario y el 50 % lo usa 3 o más veces por semana.
- Franjas horarias (opción múltiple): el 80 % viaja entre 4:00 y 7:30 p. m. y el 60 % entre 6:00 y 8:30 a. m.
- Hora fija de llegada: el 80 % tiene hora de llegada; para el 35 % llegar tarde tiene consecuencias.
- Recencia del problema: el 55 % dejó pasar buses llenos en los últimos 7 días y el 80 % dentro del último mes.
- Frecuencia del problema: al 65 % le pasa varias veces por semana.
- Tiempo adicional perdido por un solo evento: el 70 % pierde 15 minutos o más y el 35 % más de media hora.
- Tiempo estimado perdido al mes, estimación del equipo que cruza la duración y la frecuencia declaradas: promedio de 3 horas por persona; el 40 % está en las bandas de 3 a 6 h (15 %) y de más de 6 h (25 %).
- Estrategias actuales (opción múltiple): el 75 % sale más temprano, el 30 % paga taxi o aplicación y el 25 % no hace nada.
- Gasto en alternativas el mes pasado: el 90 % gastó algo y el 65 % gastó $50.000 o más.
- Afirmación con la que se identifica: desbalance entre oferta y demanda 40 %, estrés 25 % y puntualidad 20 %.

## 10. Brechas y proyectos

Estado: cerrada en M5 (Transformación, Punto 5). Los candidatos C-01 a C-08 quedan resueltos en el portafolio PY-01 a PY-10: C-06 se separa en PY-06 para CAP-07, PY-09 para CAP-09 y P-08, y PY-10 para CAP-10 y P-09, condicional y sin fecha. Las 26 brechas consolidadas, la priorización y la hoja de ruta 0-1, 1-3 y 3-5 años están en la carpeta M5-transformacion. Todos los proyectos son Objetivo TO-BE; ninguno está en ejecución (Observado).

Candidatos de origen, identificados al cierre de M1:

- Formalización legal S.A.S. ante Cámara de Comercio de Bogotá y DIAN (NIT y matrícula mercantil).
- Alinear la banda pública de tres nombres en `/torns` con el equipo actual (Johel Santiago Arias) y retirar identificadores técnicos residuales `tro-*`.
- Formalizar política e aviso de tratamiento de datos personales (Ley 1581 de 2012) en el canal de contacto y pasar de una hoja de cálculo suelta a un CRM o gestor estructurado de leads (`CAP-03`).
- Persistencia histórica de conteos (`person_count`) y recomendaciones de despacho, hoy volátiles en memoria.
- Desacoplar la inferencia de video respecto de la apertura del stream MJPEG y evaluar el modelo (`recall 0,55`) en condiciones reales de estación (`CAP-04`).
- Implementar capacidades empresariales ausentes requeridas para operar comercialmente: gestión financiera y facturación electrónica (`CAP-09`), gestión de talento humano (`CAP-10`) e interoperabilidad segura con centros de control (`CAP-07`).
- Respaldo, gestión de secretos y separación entre entorno de demostración y laboratorio.
- Primer piloto pagado con un operador B2B o entidad B2G (solo en horizonte `Objetivo TO-BE`).

## 11. Glosario de términos bloqueados

- LIRN es la firma. TORNS es el único producto.
- Equipo actual: Johel Santiago Arias.
- TORNS es prototipo aplicado. No es piloto firmado.
- Transmilenio es caso de estudio, no cliente.
- El prototipo cuenta personas. No calcula densidad por área.
- Capacidades de tren del prototipo: 5, 10 y 15. Regla `⌈N/C⌉` y tren más pequeño suficiente.
- Procesos: P-01 a P-05.
- Superficies de software: `lirn-web-main`, `tro-frontend`, `tro-backend`, `yolo-train-routes-optimization`.
- Encuesta 17 de agosto de 2026, n=20. Entrevista a controlador SITP (rol, no nombre).
- Formulario de la encuesta en uso (AP-13 Google Forms). Observado por declaración del dueño (1 de noviembre de 2026).
- Identidad TRO prohibida en entregables nuevos.
- Lead no es cliente.
- Observado no se presenta como Objetivo. Objetivo no se presenta como Observado.
