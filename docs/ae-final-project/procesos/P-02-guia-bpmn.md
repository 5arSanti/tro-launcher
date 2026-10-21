# Guía BPMN P-02 Relación comercial y partes interesadas
Notación: BPMN 2.0. El modelador humano dibuja; tú no.

## Carriles (pools / lanes)

- Persona interesada
- Comercial
- Canal de contacto

## Evento de inicio

La persona interesada envía una solicitud de contacto por el canal público de LIRN (nombre, correo y mensaje obligatorios).

## Actividades (orden)

1. Validar que la solicitud incluye nombre, correo y mensaje — lane: Canal de contacto — tipo: tarea de servicio
2. Comprobar si el canal público de contacto está disponible para recibir solicitudes — lane: Canal de contacto — tipo: tarea de servicio
3. Registrar la solicitud de contacto cuando el canal está disponible — lane: Canal de contacto — tipo: tarea de servicio
4. Comunicar al visitante un fallo honesto (no éxito falso) cuando el canal no está disponible — lane: Canal de contacto — tipo: tarea de servicio
5. Leer la solicitud registrada y calificar el interés comercial — lane: Comercial — tipo: tarea de usuario
6. Responder a la persona interesada sin afirmar cliente ni piloto firmado — lane: Comercial — tipo: tarea de usuario

## Decisiones (gateways)

| Pregunta | Sí | No |
|----------|----|-----|
| ¿La solicitud incluye nombre, correo y mensaje? | Comprobar disponibilidad del canal | Comunicar fallo por datos incompletos |
| ¿El canal público de contacto está disponible? | Registrar la solicitud | Comunicar fallo honesto sin fingir recepción |
| ¿El mensaje pide algo fuera de alcance (piloto firmado, alianza, integración con operador)? | Escalar a P-01; responder con alcance real | Responder sin afirmar cliente ni piloto |

## Mensajes

| De | A | Contenido |
|----|---|-----------|
| Persona interesada | Canal de contacto | Solicitud de contacto |
| Canal de contacto | Comercial | Solicitud registrada |
| Comercial | Persona interesada | Respuesta o propuesta (medio NO CONFIRMADO) |
| Comercial | P-01 | Desvío de claims o pedido fuera de alcance |

## Artefactos / data objects

Solicitud de contacto; guía de mensajes del canal; nota de calificación comercial. No objeto CRM.

## Evento de fin

Queda hecho: interés registrado o fallo comunicado con honestidad. No queda hecho: cliente, contrato, pago, ni entrada en un CRM.

## Qué no modelar

- Integración con el operador de Transmilenio / Metro
- Compra, pago, SLA de cliente firmado
- Departamentos que no estén en la tabla de roles futuros
- Identidad TRO / vigilancia
- CRM, scoring de leads, o demo en vivo del operador
- Confirmación falsa de recepción cuando el canal no está disponible

## Instrucción al modelador

Dibujar un proceso colaborativo con los carriles de arriba. Etiquetar actividades con frases completas. Gateways con preguntas completas. Mantener el flujo feliz (solicitud completa → canal disponible → registro → calificación → respuesta) y un flujo de error por cada decisión. No añadir tareas de contrato con operador ni alta en CRM.
