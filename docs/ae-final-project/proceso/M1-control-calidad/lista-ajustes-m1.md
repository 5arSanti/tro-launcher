# Lista de ajustes de M1 con estado (B-01 a B-04 y B-10)

Borrador de apoyo para Santiago. No es texto final del informe. Marcas: Observado, Diseñado AS-IS, Objetivo TO-BE, NO CONFIRMADO.

| ID | Ajuste | Estado | Decisión o dato que falta | Marca |
|----|--------|--------|---------------------------|-------|
| B-01 | NIT y matrícula mercantil | Cerrado (decisión de Santiago, 28 oct 2026) | No existe NIT ni matrícula real. Se mantiene como Observado: formalización registral no ejecutada. No se asigna número. | Observado |
| B-02 | Banda pública de tres nombres y residuos tro-* | Cerrado (decisión de Santiago, 28 oct 2026) | Quedan como brecha documentada, sin tocar nada. El equipo vigente es solo Johel Santiago Arias. | Observado |
| B-03 | Portada con autor, fecha y grupo | Cerrado (decisión de Santiago, 28 oct 2026) | Autor único, ya definido en la documentación del proyecto. No se pide más. | Observado |
| B-04 | Bibliografía con URL | Cerrado en borrador | Ver archivo de bibliografía. Dos URL oficiales de leyes del Senado dieron error de servidor en la verificación; se usó el Gestor Normativo de la Función Pública. | Observado |
| B-10 | Nombre de las superficies sin identidad TRO | Cerrado (aprobado por Santiago, 28 oct 2026) | Se aplica la tabla vigente de abajo, que reemplaza la propuesta inicial. | Objetivo TO-BE |
| B-06 | Diagramas Mermaid y cotejo de las cinco imágenes BPMN | Cerrado (decisión de Santiago, 1 nov 2026: la imagen prevalece) | Revisados visualmente los diez PNG (02-1, 02-2, 03-1, 03-2, 04-1, cadena de valor, cons-1 a cons-4); cons-5 era copia idéntica de 04-1 y se eliminó; los SVG pasan a imagenes/svg. Los desajustes de P-02, P-04 y P-05 se resuelven a favor de la imagen; el ajuste de las guías queda redactado y su integración está pendiente del Líder o de Santiago (fuera de la carpeta M1). | Observado |
| B-08 | IDs C-01 a C-08 | Cerrado en borrador | Añadida la aclaración DF-07 sobre el recall de 0,55. | Objetivo TO-BE |

## B-02. Nota histórica, ya cerrado por Santiago: banda pública de tres nombres y residuos tro-*

Hechos de partida:
- El equipo actual es solo Johel Santiago Arias (Observado, registro de empresa y archivo de identidad del repositorio).
- La landing pública puede seguir mostrando tres nombres en la ruta del producto. El repositorio la califica como copia publicada antigua (Observado, copia histórica). El registro la deja como brecha de alineación documental.
- El registro bloquea los nombres técnicos tro-frontend y tro-backend como superficies de software, mientras el candidato de proyecto 2 pide retirar los identificadores técnicos residuales tro-*. Son dos instrucciones que se rozan.

Decisión propuesta para que Santiago confirme o corrija (no la tomo yo):
1. En el informe, el equipo es solo Johel Santiago Arias. La banda de tres nombres se menciona una sola vez, como brecha de alineación (Observado), sin atribuir cargos a esos nombres.
2. La landing se alinea como proyecto del portafolio (candidato C-02), no como hecho cumplido.
3. Los nombres tro-* se conservan únicamente como nombres técnicos de repositorio en el inventario de aplicaciones de M3, y en el cuerpo del informe se usan los nombres funcionales de B-10.


## B-10. Nombres de superficies en el informe

Regla propuesta: en el informe se nombra cada superficie por su función y su nombre técnico solo se cita una vez, entre paréntesis, en el inventario de aplicaciones (M3), sin usar la identidad TRO (Transport Route Optimization, Sistema de Vigilancia).

| Nombre técnico del repositorio | Nombre funcional propuesto en el informe | Observación |
|--------------------------------|------------------------------------------|-------------|
| lirn-web-main | Sitio comercial de LIRN y página de TORNS | Sin cambio de sustancia. Nombre ya alineado con la firma. |
| tro-frontend | Aplicación operativa de TORNS | El prefijo tro es residual. Nombre funcional lo evita. |
| tro-backend | Servicio de detección y recomendación de despacho de TORNS | Cubre inferencia, flujo de video, métricas y regla de despacho. |
| yolo-train-routes-optimization | Entrenamiento del modelo de detección de TORNS | Contiene la palabra routes y optimization, que sugiere más de lo que hace; el nombre funcional evita el claim de optimización de rutas. |

Aviso de coherencia: el archivo de identidad del repositorio prohíbe afirmar que el código optimiza rutas de la ciudad. El nombre técnico del cuarto repositorio puede leerse como ese claim. Por eso se recomienda el nombre funcional.

Aviso de decisión pendiente: el glosario bloqueado del registro lista los nombres técnicos como términos fijos. Adoptar los nombres funcionales no los contradice si el informe los usa como alias y cita el nombre técnico una vez. Santiago debe confirmarlo.

## B-10. Tabla vigente aprobada por Santiago (reemplaza la propuesta anterior)

Cada superficie se cita con tres campos fijos: código, nombre para usuario final (Objetivo TO-BE) e identificador técnico como referencia. Los identificadores tro-* aparecen solo como referencia técnica.

| Código | Nombre para usuario final | Identificador técnico |
|--------|---------------------------|-----------------------|
| AP-01 | Sitio web comercial de LIRN y TORNS | lirn-web-main |
| AP-02 | Consola de operación de estaciones | tro-frontend |
| AP-03 | Servicio de detección de pasajeros y plan de despacho (API) | tro-backend |
| AP-04 | Entrenamiento del modelo de detección | yolo-train-routes-optimization |
