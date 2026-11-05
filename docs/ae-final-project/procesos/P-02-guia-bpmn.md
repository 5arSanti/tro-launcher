# Guía BPMN P-02 Relación comercial y partes interesadas
Notación: BPMN 2.0. La imagen BPMN publicada prevalece sobre esta guía, aprobado por Santiago el 1 de noviembre de 2026. Marca: Observado.

## Carriles (pools / lanes)

- Persona interesada
- Comercial
- Canal de contacto

## Evento de inicio

Evento de mensaje «Llega una solicitud» en el carril Persona interesada (solicitud de contacto).

## Actividades (orden)

1. Revisar que la solicitud tenga nombre, correo y un mensaje claro. Carril: Canal de contacto. Tipo: tarea.
2. Conservar la solicitud en el registro comercial de LIRN cuando los datos son suficientes y el canal está en servicio. Carril: Canal de contacto. Tipo: tarea.
3. Informar que el mensaje no se pudo enviar, sin simular un envío exitoso. Carril: Canal de contacto. Tipo: tarea.
4. Leer la solicitud y calificar el interés: quién escribe y qué espera de TORNS. Carril: Comercial. Tipo: tarea.
5. Responder o preparar una propuesta sin afirmar que ya existe un cliente o un piloto. Carril: Comercial. Tipo: tarea.

## Decisiones (gateways)

| Pregunta | Sí | No |
|----------|----|-----|
| ¿La solicitud está completa? | Comprobar si el canal está en servicio | Informar que el mensaje no se pudo enviar |
| ¿El canal de contacto está en servicio? | Conservar la solicitud en el registro comercial | Informar que el mensaje no se pudo enviar |
| ¿La persona pide un piloto firmado, una alianza o algo fuera del alcance real? | Responder con el alcance real | Responder (pedido dentro de alcance) |

En ambos casos de la última decisión Comercial responde con el alcance real. La imagen no escala a P-01.

## Mensajes y flujos

| De | A | Contenido |
|----|---|-----------|
| Persona interesada | Canal de contacto | Solicitud de contacto |
| Canal de contacto | Comercial | Solicitud registrada |

## Artefactos / data objects

Registro de contacto (objeto de datos; en el AS-IS es una hoja de cálculo, no un CRM).

## Eventos de fin

- «Interés atendido» (carril Comercial).
- «Error informado» (evento de fin de error, carril Canal de contacto).

## Nota AS-IS

Observado por declaración del dueño (1 de noviembre de 2026): en la práctica los leads se recopilan y no se responden. La tarea de respuesta queda como diseño (Diseñado AS-IS).

## Qué no modelar

- Integración con el operador de TransMilenio o Metro.
- Compra, pago o acuerdo de nivel de servicio firmado.
- Identidad TRO o vigilancia.
- CRM o puntuación de leads.
- Confirmación falsa de recepción cuando el canal no está disponible.
