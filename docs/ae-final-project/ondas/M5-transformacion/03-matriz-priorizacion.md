# Matriz de Priorización (Fase F)

Escalas cualitativas (no hay montos; el costo es un nivel relativo):
- Impacto: Alto, Medio, Bajo según aporte a OE-01 a OE-05 y reducción de riesgo observado.
- Complejidad: Alta, Media, Baja según dependencias, conocimiento requerido y esfuerzo para un autor único.
- Costo relativo: Bajo (trámite o configuración con herramientas existentes), Medio (servicio o infraestructura adicional), Alto (trabajo de campo, equipo o personal adicional).
- Prioridad: 1 (iniciar primero), 2, 3, o Condicional.

| Proyecto | Impacto | Complejidad | Costo relativo | Justificación | Prioridad |
|----------|---------|-------------|----------------|---------------|-----------|
| PY-01 | Alto | Baja | Bajo | Habilita PY-03, PY-08, PY-09 y PY-10 | 1 |
| PY-03 | Alto | Media | Bajo | Riesgo actual Ley 1581 (Observado) | 1 |
| PY-07 | Alto | Media | Medio | Sin respaldos ni entornos separados. Observado por declaración del dueño (1 de noviembre de 2026); requiere almacén de objetos, gestor de secretos y entornos separados según la propuesta TO-BE de la Arquitectura Tecnológica; RT-02, RT-12 | 1 |
| PY-09 | Alto | Media | Medio | Precondición del piloto; requiere PY-01 y un servicio de facturación | 1 |
| PY-02 | Medio | Baja | Bajo | Cambios de texto | 2 |
| PY-04 | Alto | Media | Medio | Base de indicadores; requiere N-04 en el nodo de datos alojable en nube; proveedor sin elegir (GCP recomendado en el anexo de nube del Punto 4, decisión pendiente de Santiago) | 2 |
| PY-05 | Alto | Alta | Alto | Requiere video de estación, acuerdo con operador y GPU bajo demanda y cola IT-07, producto NO CONFIRMADO; RT-04, RT-11, RT-13 | 2 |
| PY-08 | Alto | Alta | Alto | Meta de la visión; depende de PY-01, PY-03, PY-05, PY-07 y PY-09 | 3 |
| PY-06 | Medio | Alta | Medio | Requiere operador real y acuerdo de interfaz | 3 |
| PY-10 | Medio | Media | Alto | Solo con personal que vincular | Condicional |

Todas las valoraciones son Objetivo TO-BE (criterio del equipo) y quedan cotejadas con la propuesta TO-BE de la Arquitectura Tecnológica. Los niveles de costo son relativos. El anexo de nube del Punto 4 aporta una estimación a precios de lista de pago por uso consultados el 2 de noviembre de 2026 de la operación en nube (piloto: Azure 755,45 y GCP 650,11 USD/mes; escala: Azure 3.096,77 y GCP 2.864,32 USD/mes), que no cambia los niveles asignados.
