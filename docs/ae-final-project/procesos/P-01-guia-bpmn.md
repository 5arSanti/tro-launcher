# Guía BPMN P-01 Dirección estratégica de LIRN
Notación: BPMN 2.0. El modelador humano dibuja; tú no.

## Carriles (pools / lanes)

- Dirección
- Calidad
- Comunicación pública

## Evento de inicio

Revisión de dirección disparada por cambio de mensajes públicos, cambio de alcance de producto, o no conformidad de claims llegada desde P-05.

## Actividades (orden)

1. Revisar la misión, la visión y confirmar que TORNS es un solo producto — lane: Dirección — tipo: tarea de usuario
2. Revisar los mensajes públicos de LIRN y TORNS frente a la lista de claims prohibidos — lane: Dirección — tipo: tarea de usuario
3. Abrir un registro de no conformidad cuando un mensaje afirma un claim prohibido — lane: Calidad — tipo: tarea de usuario
4. Corregir el mensaje público hasta que deje de afirmar el claim prohibido — lane: Dirección — tipo: tarea de usuario
5. Devolver al alcance vigente si se propone un segundo producto — lane: Dirección — tipo: tarea de usuario
6. Confirmar en acta que LIRN mantiene un solo producto (TORNS) — lane: Dirección — tipo: tarea de usuario

## Decisiones (gateways)

| Pregunta | Sí | No |
|----------|----|-----|
| ¿El mensaje público afirma cliente, contrato, piloto firmado o alianza? | Abrir no conformidad y corregir mensaje | Confirmar un solo producto |
| ¿Se propone un segundo producto distinto de TORNS? | Devolver al alcance vigente | Confirmar un solo producto |

## Mensajes

| De | A | Contenido |
|----|---|-----------|
| Calidad | Dirección | No conformidad de claim |
| Dirección | P-05 | Alcance corregido o claim cerrado |
| Dirección | P-02 y P-03 | Alcance de producto vigente |

## Artefactos / data objects

Acta de dirección; lista de claims prohibidos; registro de no conformidad (plantilla física: NO CONFIRMADO).

## Evento de fin

Queda hecho: alcance y no-claims revisados y un solo producto confirmado. No queda hecho: piloto firmado, organigrama staffed, ni contrato con operador.

## Qué no modelar

- Integración con el operador de Transmilenio / Metro
- Compra, pago, SLA de cliente firmado
- Departamentos que no estén en la tabla de roles futuros
- Identidad TRO / vigilancia
- Junta de accionistas o ISO certificado (NO CONFIRMADO)

## Instrucción al modelador

Dibujar un proceso colaborativo con los carriles de arriba. Etiquetar actividades con frases completas, no abreviaturas. Gateways con preguntas completas. Mantener el flujo feliz (mensajes limpios → confirmar un solo producto) y un flujo de error por cada decisión. No añadir tareas de contrato con operador.
