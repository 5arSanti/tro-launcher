# B-05. Documento fuente del Punto 1 y cotejo del consolidado

## Propuesta de documento fuente (decisión de Santiago)
- Fuente de trabajo: los cuatro archivos por apartado de la onda M1 (organización y estrategia, organigrama y stakeholders, activos, procesos y capacidades, arquitectura AS-IS). El README de la onda ya declara que el consolidado no los reemplaza.
- Documento de entrega: el Punto 1 consolidado, que es el que Santiago reescribe con voz propia.
- Hechos bloqueados: el registro de empresa prevalece sobre ambos si hay discrepancia.

## Método del cotejo
1. Comparé todos los identificadores (OE, SH, AI, CAP, SN, P-xx), cifras decimales y años de cada archivo por apartado contra el consolidado.
2. Revisé si el consolidado cita rutas .md.
Resultado: no hay identificadores, cifras ni años que aparezcan en un apartado y falten en el consolidado. Las únicas diferencias de la comparación automática son numeración de subsecciones (por ejemplo 4.1, 5.2), que es esperable al fusionar.

## Alcance y límite del cotejo (Observado)
- La comparación de texto literal no sirve porque el consolidado reescribe y condensa los apartados. Lo que se verificó es la coherencia de hechos, no la igualdad de redacción.
- Una lectura frase por frase del consolidado completo (unas 60 mil caracteres) queda pendiente si Santiago la quiere antes de reescribir. Lo marco como no verificado.

## Hallazgos para decisión
| N.º | Hallazgo | Marca | Acción propuesta |
|-----|----------|-------|------------------|
| 1 | El consolidado no contiene rutas .md. Los archivos por apartado sí enlazan fichas y guías por ruta .md. | Observado | Correcto para el informe. Mantener la regla al reescribir. |
| 2 | La ficha de organización dice que TORNS significa "Train Optimization Route and Navigation System". Esa expansión no aparece en el archivo de identidad del repositorio ni en el registro. | NO CONFIRMADO | Santiago confirma si la expansión es oficial. Además contiene "Optimization" y "Route", cercanos a un claim que el repositorio prohíbe (optimizar rutas de toda la ciudad). |
| 3 | La misma ficha da cifras de entrenamiento y evaluación del modelo (tamaño de datos, precisión, recall, mAP50). Solo el recall 0,55 aparece en el registro. | Observado según la ficha, sin cotejo con el código | Que el Arquitecto de Tecnología las coteje con el notebook y los resultados antes de citarlas. |
| 4 | Porcentajes de la encuesta (80 %, 55 %, 65 %) sobre n=20. | Observado | Al redactar, expresarlos también como conteos (por ejemplo 16 de 20) para no sobrerrepresentar una muestra pequeña. |
| 5 | La evidencia de n=20 se cita como investigación del equipo, no como resultado de un operador. | Observado | Mantener la leyenda en toda cita. |
