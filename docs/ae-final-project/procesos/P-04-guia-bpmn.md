# Guía BPMN P-04 Acompañamiento al uso del prototipo
Notación: BPMN 2.0. La imagen BPMN publicada prevalece sobre esta guía, aprobado por Santiago el 1 de noviembre de 2026. Marca: Observado.

## Carriles (pools / lanes)

- Operación
- Persona interesada
- Calidad

El carril Producto no figura en la imagen; Producto aparece solo como destino del evento de fin «Vuelve a Producto».

## Evento de inicio

«Se agenda una demostración» (carril Operación).

## Actividades (orden)

1. Comprobar que la solución TORNS está disponible para la demostración. Carril: Operación.
2. Explicar y mostrar la demanda medida por estación, sin afirmar ocupación en vivo de un operador. Carril: Operación.
3. Observar la demostración y plantear dudas sobre demanda y oferta. Carril: Persona interesada.
4. Explicar y mostrar la oferta que TORNS propone: frecuencia, capacidad o asignación. Carril: Operación.
5. Recoger observaciones de la persona interesada y cerrar el acompañamiento. Carril: Operación.
6. Devolver el caso a Realización de TORNS porque la demostración no se pudo hacer. Carril: Calidad.
7. Registrar una no conformidad de comunicación por afirmar ocupación en vivo de un operador. Carril: Calidad.

## Decisiones (gateways)

| Pregunta | Sí | No |
|----------|----|-----|
| ¿La solución está disponible para mostrar demanda y oferta? | Mostrar la demanda por estación | Devolver el caso a Realización de TORNS (Calidad) |
| ¿El discurso de la demostración afirma ocupación en vivo de un operador? | Registrar no conformidad de comunicación (Calidad) | Fin «Acompañamiento cerrado» |

## Flujos

| De | A | Contenido |
|----|---|-----------|
| Operación | Persona interesada | Demanda por estación |

## Eventos de fin

- «Acompañamiento cerrado» (carril Operación).
- «Vuelve a Producto» (carril Calidad), tras un fallo técnico.
- «Vuelve a Calidad» (carril Calidad), tras una afirmación indebida.

## Qué no modelar

- Integración con el operador o envío de la recomendación a un sistema de despacho real.
- Compra, pago o acuerdo de nivel de servicio firmado.
- Identidad TRO o vigilancia.
