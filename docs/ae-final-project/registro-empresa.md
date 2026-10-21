# Registro de Empresa LIRN

Tablero de coherencia del taller TOGAF. Un hecho bloqueado no se contradice en ondas posteriores.

Marcas: Observado | Diseñado AS-IS | Objetivo TO-BE.

## 1. Identidad legal y de mercado

| Hecho | Marca | Estado |
|-------|-------|--------|
| Razón social de trabajo: LIRN | Diseñado AS-IS | Bloqueado |
| Forma: Sociedad por Acciones Simplificada (SAS), Colombia | Diseñado AS-IS | Bloqueado |
| Sede: Bogotá | Diseñado AS-IS | Bloqueado |
| Tamaño: microempresa unipersonal | Observado (equipo) / Diseñado AS-IS (marco) | Bloqueado |
| Sector: software e ITS para movilidad y transporte masivo | Diseñado AS-IS | Bloqueado |
| NIT y matrícula mercantil | Pendiente de formalización | Brecha. No inventar número |
| Mercado: operadores B2B y B2G de sistemas masivos con estaciones | Diseñado AS-IS | Bloqueado |
| Datos personales: Ley 1581 de 2012 | Diseñado AS-IS | Bloqueado |

## 2. Equipo y organigrama

| Hecho | Marca | Estado |
|-------|-------|--------|
| Equipo actual: Johel Arias. | Observado | Bloqueado |
| Organigrama AS-IS: Dirección General, una persona | Diseñado AS-IS | Bloqueado |
| Vista funcional: Dirección, Comercial, Producto / Ingeniería, Operación, Calidad | Diseñado AS-IS | Bloqueado |
| El fundador es responsable actual de las cinco áreas | Diseñado AS-IS | Bloqueado |
| Áreas ocupadas por gerencias distintas | Objetivo TO-BE | No afirmar como hoy |

## 3. Misión, visión, objetivos estratégicos

Misión (Observado, `PRODUCT.md`): Hacer que el transporte masivo ajuste su oferta a la demanda real de cada estación, midiendo quién espera ahora y no solo lo que el horario predijo.

Visión (Observado, `PRODUCT.md`): Que cada estación de un sistema masivo opere con la demanda que ocurre, no con la que se supuso.

Objetivos estratégicos (Diseñado AS-IS, bloqueados):

1. Convertir el prototipo TORNS en un producto demostrable y controlado para un centro de control.
2. Abrir un canal comercial honesto hacia operadores B2B y B2G, sin afirmar cliente.
3. Proteger datos personales y evidencia según Ley 1581 y el mapa de procesos.
4. Cerrar la brecha entre demanda medida y oferta recomendada como propuesta de valor única.
5. Preparar la firma para un primer piloto pagado en el horizonte TO-BE, no como hecho actual.

## 4. Producto y oferta

| Hecho | Marca | Estado |
|-------|-------|--------|
| LIRN es la firma. TORNS es el único producto. | Observado | Bloqueado |
| TORNS es prototipo aplicado. No es piloto firmado. | Observado | Bloqueado |
| Mecanismo: conteo de personas y recomendación de oferta | Observado | Bloqueado |
| El prototipo cuenta personas. No calcula densidad por área. | Observado | Bloqueado |
| Capacidades de tren del prototipo: 5, 10 y 15. Regla ⌈N/C⌉ y tren más pequeño suficiente. | Observado | Bloqueado |
| Producto listo para piloto pagado | Objetivo TO-BE | Brecha |

## 5. Clientes, segmentos y partes interesadas

| Hecho | Marca | Estado |
|-------|-------|--------|
| Clientes firmados: ninguno | Observado | Bloqueado |
| Transmilenio es caso de estudio, no cliente. | Observado | Bloqueado |
| Segmento objetivo: operadores de transporte masivo con estaciones | Diseñado AS-IS | Bloqueado |
| Fundador: influencia alta | Diseñado AS-IS | Bloqueado |
| Universidad Libre / academia del taller: influencia alta | Observado | Bloqueado |
| Visitantes del sitio y leads del formulario | Observado | Bloqueado |
| Operadores: interesados, no clientes | Diseñado AS-IS | Bloqueado |
| Proveedores técnicos: GitHub, Google, Roboflow | Observado | Bloqueado |

## 6. Procesos y capacidades

| Hecho | Marca | Estado |
|-------|-------|--------|
| Procesos: P-01 a P-05. | Observado | Bloqueado |
| P-01 estratégico. P-02, P-03 y P-04 misionales. P-05 apoyo. | Observado | Bloqueado |
| Capacidades presentes: dirección de producto único, captura de interés, detección y conteo, recomendación de oferta, evidencia | Observado / Diseñado AS-IS | Bloqueado |
| Capacidades ausentes: facturación, CRM, talento humano, inventario físico, despacho real del operador | Observado | Brecha |

## 7. Activos de información y datos

Se detalla en M2. Candidatos bloqueados como existencia:

| Activo | Clasificación | Marca |
|--------|---------------|-------|
| Leads del formulario | Datos personales, Ley 1581 | Observado |
| Encuesta 17 de agosto de 2026, n=20. Entrevista a controlador SITP (rol, no nombre). | Investigación, interno | Observado |
| Video y conteos del prototipo | Interno / puede incluir imagen de personas | Observado |
| Pesos del modelo | Reservado | Observado |
| Fichas y diagramas de proceso | Interno / publicado el diagrama Lucid | Observado |
| Código fuente | Interno | Observado |
| Facturación y contratos | No existen | Brecha |

## 8. Aplicaciones

Se detalla en M3. Superficies bloqueadas:

Superficies de software: `lirn-web-main`, `tro-frontend`, `tro-backend`, `yolo-train-routes-optimization`.

También observados: Google Sheets (contacto), GitHub, Lucidchart, SharePoint, correo.

CRM, ERP e identidad de operador: Objetivo TO-BE.

## 9. Tecnología

Se detalla en M4. AS-IS observado: estación de trabajo del fundador, Docker local, GitHub Pages, Git, pesos `.pt`, OpenCV (archivo / USB / RTSP). Sin granja GPU de producción.

## 10. Brechas y proyectos

Candidatos (no son portafolio cerrado; M5 decide):

- Formalización SAS (NIT y matrícula).
- Alinear la landing de tres nombres con el equipo actual.
- Persistencia de conteos y canal de leads distinto de una hoja suelta.
- Evaluación en estación del conteo.
- Respaldo, secretos y separación demo / laboratorio.
- Primer piloto pagado (solo TO-BE).

## 11. Glosario de términos bloqueados

- LIRN es la firma. TORNS es el único producto.
- Equipo actual: Johel Arias.
- TORNS es prototipo aplicado. No es piloto firmado.
- Transmilenio es caso de estudio, no cliente.
- El prototipo cuenta personas. No calcula densidad por área.
- Capacidades de tren del prototipo: 5, 10 y 15. Regla `⌈N/C⌉` y tren más pequeño suficiente.
- Procesos: P-01 a P-05.
- Superficies de software: `lirn-web-main`, `tro-frontend`, `tro-backend`, `yolo-train-routes-optimization`.
- Encuesta 17 de agosto de 2026, n=20. Entrevista a controlador SITP (rol, no nombre).
- Identidad TRO prohibida en entregables nuevos.
- Lead no es cliente.
- Observado no se presenta como Objetivo. Objetivo no se presenta como Observado.
