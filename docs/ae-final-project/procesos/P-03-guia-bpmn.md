# Guía BPMN P-03 Realización del producto TORNS
Notación: BPMN 2.0. El modelador humano dibuja; tú no.

## Carriles (pools / lanes)

- Producto
- Operación
- Calidad

## Evento de inicio

Necesidad de entregar o actualizar la solución de producto TORNS (medición de demanda en estación y oferta propuesta), o no conformidad técnica desde P-05.

## Actividades (orden)

1. Acotar el alcance de entrega contra el acta de dirección: medir demanda en estación y proponer oferta — lane: Producto — tipo: tarea de usuario
2. Rechazar el pedido si exige instalación física en campo del operador o integración con su control real — lane: Producto — tipo: tarea de usuario
3. Preparar la solución de demostración con medición de demanda en estación — lane: Producto — tipo: tarea de usuario
4. Generar la propuesta de oferta al centro de control dentro del prototipo — lane: Producto — tipo: tarea de usuario
5. Verificar que la solución está lista para acompañamiento sin claims de operador en vivo — lane: Producto — tipo: tarea de usuario
6. Entregar la solución a Operación para acompañamiento — lane: Producto — tipo: tarea de usuario
7. Abrir no conformidad si la verificación falla — lane: Calidad — tipo: tarea de usuario

## Decisiones (gateways)

| Pregunta | Sí | No |
|----------|----|-----|
| ¿El pedido exige instalación física en campo del operador o integración con su control real? | Rechazar por fuera de alcance | Continuar preparación |
| ¿La solución de demostración pasa la verificación de demanda medida y oferta propuesta? | Entregar a Operación | Abrir no conformidad |

## Mensajes

| De | A | Contenido |
|----|---|-----------|
| Producto | Operación | Solución de demostración lista |
| Producto | Calidad | No conformidad técnica o claim indebido |
| P-02 | Producto | Interés calificado (opcional) |

## Artefactos / data objects

Nota de alcance; solución de demostración; informe de medición; propuesta de oferta; acta de entrega interna. No contrato de operador.

## Evento de fin

Queda hecho: solución de producto verificable entregada a Operación. No queda hecho: integración con el operador, instalación en campo, ni piloto firmado.

## Qué no modelar

- Integración con el operador de Transmilenio / Metro
- Compra, pago, SLA de cliente firmado
- Departamentos que no estén en la tabla de roles futuros
- Identidad TRO / vigilancia
- Despliegue de cámaras en estaciones reales del operador
- KPI de impacto al usuario

## Instrucción al modelador

Dibujar un proceso colaborativo con los carriles de arriba. Etiquetar actividades con frases completas. Gateways con preguntas completas. Mantener el flujo feliz (alcance acotado → preparación → verificación → entrega) y un flujo de error por cada decisión. No añadir tareas de contrato con operador ni instalación en campo.
