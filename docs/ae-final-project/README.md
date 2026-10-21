# Taller de Arquitectura Empresarial: LIRN y TORNS

LIRN es la firma. TORNS es el único producto. TORNS es un prototipo aplicado. No es un piloto firmado. Transmilenio es el caso de estudio, no un cliente.

Este árbol es el único espacio de trabajo del taller TOGAF. El informe único se redactará más adelante en `informe/plan-transformacion-empresarial.md`. Esa ruta no se crea hasta M5.

## Fuente de coherencia

El tablero de hechos es `registro-empresa.md`. Las playbooks viven en `ondas/`.

Cada afirmación usa una marca: Observado, Diseñado AS-IS u Objetivo TO-BE. Un Objetivo no se afirma como hecho de hoy.

`AGENTS.md` es la fuente de verdad del launcher. El registro es la fuente de verdad de la empresa diseñada para el taller.

## Fuentes canónicas

Estas rutas son autoridad para agentes. No se copian ni se citan como archivos en el informe único.

| Fuente | Qué autoriza |
|--------|----------------|
| `AGENTS.md` | Identidad, equipo (Johel Arias), mapa técnico AS-IS y forma de trabajo |
| `docs/ae-final-project/registro-empresa.md` | Hechos bloqueados de empresa |
| `PRODUCT.md` | Misión, visión, separación LIRN/TORNS, capacidades del prototipo y claims prohibidos |
| `DESIGN.md` | Identidad visual. No es fuente de arquitectura empresarial |
| `docs/ae-final-project/docs/definicion-taller-final.md` | Enunciado y estructura de la entrega |
| `docs/ae-final-project/procesos/` | Mapa, fichas, guías e imágenes BPMN de P-01 a P-05 |
| `docs/torns-project-structure.md` | Descubrimiento, entrevista SITP y encuesta n=20 |
| `docs/presentations/torns-respuestas-ia-ml.md` | Inferencia y datos reales de visión |
| `docs/presentations/torns-core-guion-5min.md` | Principios del núcleo técnico |
| Código de `tro-backend`, `tro-frontend`, `lirn-web-main` y YOLO | AS-IS de aplicaciones y tecnología |

Si un hecho no está en esta tabla ni en el registro, se escribe `NO CONFIRMADO`.

## Ondas

| Hito | Punto del taller | Playbook | Resultado |
|------|------------------|----------|-----------|
| M0 | Fundación | Hecho | Árbol, archivo, AGENTS.md y rules |
| M1 | Punto 1. Arquitectura de Negocio | `ondas/M1-negocio/` | Organización, misión y visión, organigrama, activos, mapa BPM, capacidades, partes interesadas y AS-IS |
| M2 | Punto 2. Arquitectura de Datos | `ondas/M2-datos/` | Inventario, modelo, flujo y problemas de información |
| M3 | Punto 3. Arquitectura de Aplicaciones | `ondas/M3-aplicaciones/` | Inventario, integraciones, problemas y propuesta de interoperabilidad |
| M4 | Punto 4. Arquitectura Tecnológica | `ondas/M4-tecnologia/` | Inventario, diagrama, riesgos y propuesta |
| M5 | Punto 5 y entrega | `ondas/M5-roadmap/` | TO-BE, brechas, portafolio, priorización, hoja de ruta, indicadores, informe único y pregunta final |

Cada hito M1 a M5 requiere spec y plan propios antes de redactar. Al cerrar, se actualiza el registro. Lo bloqueado no se contradice.

## Informe único (reservado)

1. Portada
2. Introducción
3. Descripción de la organización
4. Arquitectura de Negocio
5. Arquitectura de Datos
6. Arquitectura de Aplicaciones
7. Arquitectura Tecnológica
8. Roadmap de Transformación
9. Conclusiones
10. Recomendaciones
11. Bibliografía
12. Pregunta final de análisis

Citas del informe: nombre del entregable y URL. Nunca una ruta `.md` del repositorio.

## Claims prohibidos

Clientes, contratos, alianzas, piloto firmado, KPIs de impacto comercial y la identidad TRO.
