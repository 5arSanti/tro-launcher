# Guía BPMN P-05 Evidencia, calidad y mejora
Notación: BPMN 2.0. La imagen BPMN publicada prevalece sobre esta guía, aprobado por Santiago el 1 de noviembre de 2026. Marca: Observado.

## Carriles (pools / lanes)

- Calidad
- Dirección
- Producto

La imagen no tiene carril Comunicación pública.

## Evento de inicio

Evento de mensaje «Llega un hallazgo» (carril Calidad).

## Actividades (orden)

1. Clasificar el hallazgo: mensaje público, solución TORNS o solo custodia de evidencia. Carril: Calidad.
2. Abrir una no conformidad y asignarla a Dirección o a Producto, según el hallazgo. Carril: Calidad.
3. Corregir el mensaje público y devolver el caso a Calidad. Carril: Dirección.
4. Corregir la solución TORNS y devolver el caso a Calidad. Carril: Producto.
5. Conservar la encuesta de veinte respuestas del 17 de agosto de 2026 como investigación del equipo, no como resultado de un operador. Carril: Calidad.
6. Verificar que la comunicación pública presente el caso TransMilenio como estudio, no como piloto firmado. Carril: Calidad.
7. Cerrar la no conformidad o dejarla abierta si la corrección no basta. Carril: Dirección (según la posición en la imagen).

## Decisiones (gateways)

| Pregunta | Sí | No |
|----------|----|-----|
| ¿El hallazgo afecta el mensaje público de LIRN? | Abrir no conformidad (es comunicación) | Evaluar si afecta la solución |
| ¿El hallazgo afecta la solución TORNS? | Abrir no conformidad (es el producto) | Conservar la evidencia (solo evidencia) |
| ¿El texto público afirma un piloto firmado o un impacto inventado? | Volver a abrir no conformidad (sigue habiendo afirmación indebida) | Cerrar la no conformidad |

## Artefactos / data objects

«Evidencia n igual a 20», ubicado en el carril Producto.

## Evento de fin

Único evento de fin «Mejora encaminada». El cierre de la no conformidad es la última tarea y no se modela como paso adicional después del fin.

## Qué no modelar

- Integración con el operador de TransMilenio o Metro.
- Auditoría de certificación ISO (NO CONFIRMADO).
- Tablero de impacto al pasajero o indicadores de impacto inventados.
- Identidad TRO o vigilancia.
