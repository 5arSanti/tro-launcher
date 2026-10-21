# Guía BPMN P-04 Acompañamiento al uso del prototipo
Notación: BPMN 2.0. El modelador humano dibuja; tú no.

## Carriles (pools / lanes)

- Operación
- Persona interesada
- Producto
- Calidad

## Evento de inicio

Solicitud de sesión de demostración o acompañamiento al uso del prototipo TORNS (desde P-02 o equipo interno).

## Actividades (orden)

1. Programar la sesión de demostración con la persona interesada o el equipo interno — lane: Operación — tipo: tarea de usuario
2. Comprobar que la solución de demostración entregada por Producto está disponible — lane: Operación — tipo: tarea de usuario
3. Mostrar la demanda medida en estación durante la sesión — lane: Operación — tipo: tarea de usuario
4. Mostrar la oferta propuesta al centro de control sin afirmar operación en vivo del operador — lane: Operación — tipo: tarea de usuario
5. Recoger observaciones de la persona interesada o del equipo — lane: Operación — tipo: tarea de usuario
6. Escalar a Producto si hay fallo técnico de la solución — lane: Operación — tipo: tarea de usuario
7. Escalar a Calidad si el acompañamiento detecta un claim indebido — lane: Operación — tipo: tarea de usuario

## Decisiones (gateways)

| Pregunta | Sí | No |
|----------|----|-----|
| ¿La solución de demostración está disponible al inicio de la sesión? | Mostrar demanda y oferta propuesta | Escalar fallo técnico a Producto |
| ¿Durante la sesión se afirma ocupación en vivo del operador? | Escalar claim indebido a Calidad | Continuar recolección de observaciones |

## Mensajes

| De | A | Contenido |
|----|---|-----------|
| Operación | Persona interesada | Invitación y guía de sesión |
| Operación | Producto | Fallo técnico de la solución |
| Operación | Calidad | Claim indebido detectado en sesión |
| Operación | sistemas del operador | Prohibido: no hay mensaje |

## Artefactos / data objects

Solicitud de acompañamiento; informe de acompañamiento; checklist de sesión. No orden de despacho del operador.

## Evento de fin

Queda hecho: sesión de acompañamiento con observaciones registradas. No queda hecho: despacho ejecutado en el operador, ni integración con sus sistemas.

## Qué no modelar

- Integración con el operador de Transmilenio / Metro
- Compra, pago, SLA de cliente firmado
- Departamentos que no estén en la tabla de roles futuros
- Identidad TRO / vigilancia
- Envío de la recomendación a un sistema de despacho real
- Turno operativo de un operador como cliente

## Instrucción al modelador

Dibujar un proceso colaborativo con los carriles de arriba. Etiquetar actividades con frases completas. Gateways con preguntas completas. Mantener el flujo feliz (sesión programada → solución disponible → demostración → observaciones) y un flujo de error por cada decisión. No añadir tareas de contrato con operador ni envío de despacho al control real.
