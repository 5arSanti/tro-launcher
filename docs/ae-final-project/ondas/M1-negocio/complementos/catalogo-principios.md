# Catálogo de principios de arquitectura de negocio (borrador de apoyo)

Formato TOGAF: nombre, enunciado, justificación, implicaciones. Cada principio se ancla a un hecho existente en la fuente de verdad. Los enunciados son propuestas de diseño (Objetivo TO-BE como guía de decisión); los hechos citados como ancla llevan su marca. Santiago decide cuáles adopta y los redacta con voz propia.

<!-- reescribir Santiago -->
<!-- reescribir Santiago: enunciados PN-01 a PN-08 -->
| ID | Nombre | Enunciado | Justificación (ancla) | Implicaciones | Marca del ancla |
|----|--------|-----------|------------------------|---------------|-----------------|
| PN-01 | Una firma, un producto | LIRN vende y TORNS opera. No se agrega un segundo producto sin revisión de dirección. | LIRN es la firma y TORNS es el único producto; el proceso P-01 devuelve al alcance si se propone un segundo producto. | Toda iniciativa del portafolio se evalúa contra el alcance de TORNS. Ninguna capacidad nueva se justifica por un producto distinto. | Observado |
| PN-02 | Afirmar solo lo que está evidenciado | Ningún mensaje público ni entregable afirma clientes, contratos, alianzas, piloto firmado ni impacto no medido. | Lista de claims prohibidos; servicio SN-03; indicador de claims inventados en P-05. | Todo indicador futuro se presenta como Objetivo TO-BE. Las metas sin dato se escriben NO CONFIRMADO. | Observado |
| PN-03 | Demanda medida antes que demanda supuesta | La oferta recomendada parte de lo que ocurre en la estación ahora y no solo del horario. | Misión y visión aprobadas; mecanismo de conteo y recomendación. | Las capacidades CAP-04 y CAP-05 son el núcleo. Un cambio que degrade la medición exige evaluarla antes. | Observado |
| PN-04 | La decisión de despacho es del operador | TORNS recomienda; la decisión y la operación siguen en el centro de control. | El producto recomienda oferta al centro de control y no se integra hoy con control real. | Cualquier integración en vivo (CAP-07) se diseña con operador humano en el circuito y autenticación. | Objetivo TO-BE |
| PN-05 | Privacidad desde el diseño | Se recolecta el mínimo de datos personales y se trata bajo la Ley 1581. | El modelo detecta la clase persona sin reconocimiento facial ni biometría; los leads son datos personales con LIRN como responsable. | Política y aviso de tratamiento en el canal de contacto; clasificación de activos; retención definida. | Observado / Diseñado AS-IS |
| PN-06 | Evidencia trazable | Toda cifra citada tiene fuente, fecha y alcance declarados. | Encuesta del 17 de agosto de 2026 con n=20 y entrevista SITP por rol; no es resultado de un operador. | Las citas llevan leyenda de investigación del equipo. No se extrapola una muestra de 20. | Observado |
| PN-07 | Regla explicable sobre caja negra | Donde una regla simple resuelve la decisión, se usa la regla y se declara como regla. | El despacho aplica ⌈N/C⌉ con capacidades 5, 10 y 15 y se documenta como regla, no como IA. | Cambiar a un optimizador requiere justificación y evaluación; no se afirma optimización de red. | Observado |
| PN-08 | Crecer por capacidad, no por organigrama | Las áreas y cargos se crean cuando una capacidad ausente lo exige. | Equipo actual es una persona; las áreas son roles futuros del mapa de procesos. | El TO-BE enlaza cada cargo nuevo a una capacidad ausente (CAP-07, CAP-09, CAP-10) y no al revés. | Observado / Objetivo TO-BE |

## Pendientes para Santiago
1. Confirmar cuáles de los ocho principios adopta y si desea añadir uno de cumplimiento regulatorio general.
2. PN-04 y PN-08 son principios propuestos; el repositorio no los enuncia como principios.
3. El taller no exige un catálogo de principios por nombre; es insumo del Roadmap de Transformación. NO CONFIRMADO si el docente lo pide en el informe.
