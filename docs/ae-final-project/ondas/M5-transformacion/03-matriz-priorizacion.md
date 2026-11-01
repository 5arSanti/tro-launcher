# Matriz de Priorización (Fase F)
> Borrador de apoyo v1.0, 1 de noviembre de 2026. Líder de Transformación. Santiago redacta el texto final. Sin cifras, costos ni NIT. Marcas: Observado, Diseñado AS-IS, Objetivo TO-BE. «Pendiente M4» significa que el insumo depende del entregable de la Arquitectura Tecnológica, aún no publicado en main.

Escalas cualitativas (no hay montos; el costo es un nivel relativo):
- Impacto: Alto, Medio, Bajo según aporte a OE-01 a OE-05 y reducción de riesgo observado.
- Complejidad: Alta, Media, Baja según dependencias, conocimiento requerido y esfuerzo para un autor único.
- Costo relativo: Bajo (trámite o configuración con herramientas existentes), Medio (servicio o infraestructura adicional), Alto (trabajo de campo, equipo o personal adicional).
- Prioridad: 1 (iniciar primero), 2, 3, o Condicional.

| Proyecto | Impacto | Complejidad | Costo relativo | Justificación | Prioridad |
|----------|---------|-------------|----------------|---------------|-----------|
| PY-01 | Alto | Baja | Bajo | Habilita PY-03, PY-08, PY-09 y PY-10 | 1 |
| PY-03 | Alto | Media | Bajo | Riesgo actual Ley 1581 (Observado) | 1 |
| PY-07 | Alto | Media | Medio | Sin respaldos ni entornos separados (Observado por declaración del dueño); infraestructura Pendiente M4 | 1 |
| PY-09 | Alto | Media | Medio | Precondición del piloto; requiere PY-01 y un servicio de facturación | 1 |
| PY-02 | Medio | Baja | Bajo | Cambios de texto | 2 |
| PY-04 | Alto | Media | Medio | Base de indicadores; persistencia gestionada Pendiente M4 | 2 |
| PY-05 | Alto | Alta | Alto | Requiere video de estación, acuerdo con operador y posible cómputo con GPU (Pendiente M4) | 2 |
| PY-08 | Alto | Alta | Alto | Meta de la visión; depende de PY-01, PY-03, PY-05, PY-07 y PY-09 | 3 |
| PY-06 | Medio | Alta | Medio | Requiere operador real y acuerdo de interfaz | 3 |
| PY-10 | Medio | Media | Alto | Solo con personal que vincular | Condicional |

Todas las valoraciones son Diseñado AS-IS (criterio del equipo) y se revisan cuando se publique la Arquitectura Tecnológica.
