# B-06. Diagramas Mermaid y cotejo de las cinco imágenes BPMN

## Mermaid (organigrama, capacidades, procesos, AS-IS)
- Extraje los bloques Mermaid de los cuatro apartados y del consolidado como archivos .mmd en la carpeta imagenes/mmd (10 archivos): organigrama jerárquico (02-1), vista funcional (02-2), interacción de procesos (03-1), mapa de capacidades (03-2), línea base AS-IS (04-1) y sus copias en el consolidado (cons-1 a cons-4; cons-5 era copia idéntica de 04-1 y se eliminó).
- Exportación: PNG en imagenes/png y SVG en imagenes/svg. Revisé visualmente los diez PNG; renderizan completos y sin títulos cortados. La cadena de valor se volvió a exportar con el ajuste de B5. Estado: cerrado.

## Cotejo de las cinco imágenes BPMN contra fichas y guías
Revisé visualmente cada imagen y la comparé con su guía BPMN. Marca de todo lo siguiente: Observado (imagen y guía publicadas).

| Proceso | Carriles imagen | Carriles guía | Coincidencia | Desajustes |
|---------|-----------------|---------------|--------------|------------|
| P-01 Dirección estratégica | Dirección, Calidad, Comunicación pública | Dirección, Calidad, Comunicación pública | Alta | Ninguno relevante. Gateways y bucle de devolver al alcance presentes. |
| P-02 Relación comercial | Persona interesada, Comercial, Canal de contacto | Igual | Media | La guía pide escalar a P-01 cuando el mensaje pide algo fuera de alcance. La imagen responde con el alcance real en ambos casos y no muestra el mensaje a P-01. Además la guía nombra una tarea de registro y otra de aviso de fallo; la imagen las muestra, pero el "registro de contacto" aparece como objeto de datos sin indicar que no es CRM. |
| P-03 Realización del producto | Producto, Calidad, Operación | Producto, Operación, Calidad | Alta | La guía separa "preparar solución" y "generar propuesta de oferta"; la imagen las funde en una tarea y una verificación. Sin impacto de contenido. |
| P-04 Acompañamiento | Operación, Persona interesada, Calidad | Operación, Persona interesada, Producto, Calidad | Media | La imagen no tiene carril Producto. El fallo técnico termina en un evento "Vuelve a Producto" dentro del carril Calidad. El inicio es "Se agenda una demostración" y la guía dice solicitud de sesión desde P-02 o equipo interno. |
| P-05 Evidencia, calidad y mejora | Calidad, Dirección, Producto | Calidad, Dirección, Producto, Comunicación pública | Media | Falta el carril Comunicación pública. El objeto "Evidencia n=20" aparece en el carril Producto, mientras la guía asigna la custodia a Calidad. El cierre de la no conformidad ocurre en un solo evento de fin, la guía lo describe como paso explícito. |

## Observaciones para Santiago
1. Ningún desajuste contradice un hecho bloqueado. Son diferencias entre guía e imagen; el modelador humano decide cuál manda.
2. Propuesta: declarar que la imagen publicada es la autoridad del Punto 1 y que las guías son documentos de trabajo, o corregir las tres imágenes (P-02, P-04, P-05) en Lucidchart. La decisión y el cambio son de Santiago; yo no modifico el tablero.
3. Sugerencia de redacción: en el informe, describir cada proceso con lo que muestra la imagen, no con lo que dice la guía.

## Resolución (1 de noviembre de 2026)
Santiago decidió que la imagen publicada prevalece. Los ajustes de guía para P-02, P-04 y P-05 quedan redactados en el documento de ajustes a las guías BPMN; su integración en las guías corresponde al Líder o a Santiago porque están fuera de la carpeta de la onda M1.
