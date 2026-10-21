# Guía BPMN P-05 Evidencia, calidad y mejora
Notación: BPMN 2.0. El modelador humano dibuja; tú no.

## Carriles (pools / lanes)

- Calidad
- Dirección
- Producto
- Comunicación pública

## Evento de inicio

Nueva evidencia a custodiar, hallazgo de mensaje público, o no conformidad del prototipo (desde P-01, P-03 o P-04).

## Actividades (orden)

1. Clasificar el hallazgo como claim público, evidencia o fallo del prototipo — lane: Calidad — tipo: tarea de usuario
2. Custodiar la evidencia n=20 con leyenda de investigación del equipo (17 agosto 2026) — lane: Calidad — tipo: tarea de usuario
3. Abrir un registro de no conformidad cuando el hallazgo lo requiere — lane: Calidad — tipo: tarea de usuario
4. Corregir el mensaje público cuando la no conformidad afecta claims — lane: Dirección — tipo: tarea de usuario
5. Corregir la solución de producto cuando la no conformidad afecta el prototipo — lane: Producto — tipo: tarea de usuario
6. Verificar que la comunicación mantiene caso de estudio (no piloto) y que n=20 no es resultado de operador — lane: Calidad — tipo: tarea de usuario
7. Cerrar la no conformidad cuando la verificación confirma el caso no piloto — lane: Calidad — tipo: tarea de usuario

## Decisiones (gateways)

| Pregunta | Sí | No |
|----------|----|-----|
| ¿El hallazgo afecta claims en mensajes públicos? | Abrir no conformidad y corregir mensaje (P-01) | Evaluar si afecta prototipo |
| ¿El hallazgo afecta la solución de producto o el prototipo? | Abrir no conformidad y corregir solución (P-03) | Custodiar evidencia |
| ¿El texto afirma piloto firmado o impacto inventado? | Abrir no conformidad y corregir mensaje | Cerrar no conformidad si verificación ok |

## Mensajes

| De | A | Contenido |
|----|---|-----------|
| P-04 / P-03 / P-01 | Calidad | Hallazgo |
| Calidad | Dirección | No conformidad de claim |
| Calidad | Producto | No conformidad de prototipo |
| Calidad | Comunicación pública | Evidencia autorizada (n=20, caso no piloto) |

## Artefactos / data objects

Evidencia n=20; entrevista rol SITP; registro de no conformidad; matriz de evidencia. Plantilla de no conformidad: NO CONFIRMADO.

## Evento de fin

Queda hecho: evidencia custodiada y no conformidad encaminada o cerrada. No queda hecho: ISO certificado, KPI de minutos ahorrados, ni estudio de un operador.

## Qué no modelar

- Integración con el operador de Transmilenio / Metro
- Compra, pago, SLA de cliente firmado
- Departamentos que no estén en la tabla de roles futuros
- Identidad TRO / vigilancia
- Auditoría de certificación ISO (NO CONFIRMADO)
- Tablero de impacto al pasajero

## Instrucción al modelador

Dibujar un proceso colaborativo con los carriles de arriba. Etiquetar actividades con frases completas. Gateways con preguntas completas. Mantener el flujo feliz (evidencia ok → verificación → cierre) y un flujo de error por cada decisión. No añadir tareas de contrato con operador ni métricas de impacto inventadas.
