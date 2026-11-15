# Taller de Arquitectura Empresarial: LIRN y TORNS

LIRN es la firma. TORNS es el único producto. TORNS es un prototipo aplicado. No es un piloto firmado. Transmilenio es el caso de estudio, no un cliente.

## Documento final para revisar

El documento final del taller es el informe único **Plan de Transformación Empresarial**. Es autocontenido: no remite a otros entregables. Lo acompañan solo cinco anexos en hoja de cálculo.

- Word: [informe/plan-transformacion-empresarial.docx](informe/plan-transformacion-empresarial.docx), generado desde el Markdown con 28 tablas y 20 ilustraciones numeradas, tabla de contenido, glosario y relación de anexos (15 de noviembre de 2026, versión 1.6).
- Markdown fuente: [informe/plan-transformacion-empresarial.md](informe/plan-transformacion-empresarial.md).
- Anexos A a E en [informe/anexos/](informe/anexos/): inventario de datos, matriz de flujos, inventario de aplicaciones, mapa de integraciones y comparativo de nube Azure y GCP. Se generan desde los CSV de las ondas M2, M3 y M4; si cambia un CSV, se regenera el anexo.

Para regenerar el Word desde `informe/`: `pandoc plan-transformacion-empresarial.md --resource-path=.:.. --toc --toc-depth=3 --reference-doc=plantilla-estilos.docx -o plan-transformacion-empresarial.docx` y fijar la propiedad de autor en Johel Santiago Arias. La plantilla define los títulos de nivel 1 a 3 y los bordes de las tablas.

## Material de trabajo por onda

Fuentes de las que se consolidó el informe. No forman parte de la entrega ni se citan en ella.

| Onda | Fuente |
|------|-------|
| M1 | [Entregable Punto 1. Arquitectura de Negocio](ondas/M1-negocio/entregable-punto-1.md), con apartados 01 a 04 y [complementos](ondas/M1-negocio/complementos/) |
| M2 | [Entregable Punto 2. Arquitectura de Datos](ondas/M2-datos/entregable-punto-2.md), con [tablas](ondas/M2-datos/tablas/) y [diagramas](ondas/M2-datos/diagramas/) |
| M3 | [Entregable Punto 3. Arquitectura de Aplicaciones](ondas/M3-aplicaciones/entregable-punto-3.md), con [tablas](ondas/M3-aplicaciones/tablas/) y [diagramas](ondas/M3-aplicaciones/diagramas/) |
| M4 | [Entregable Punto 4. Arquitectura Tecnológica](ondas/M4-tecnologia/entregable-punto-4.md) y [Anexo Punto 4. Comparativo de nube Azure y GCP para TORNS](ondas/M4-tecnologia/anexo-nube-azure-gcp.md) ([CSV](ondas/M4-tecnologia/anexo-nube-azure-gcp.csv)) |
| M5 | [Roadmap de Transformación, archivos 00 a 08](ondas/M5-transformacion/README.md) |
| Procesos | [Fichas, guías e imágenes BPMN de P-01 a P-05](procesos/README.md) |
| Registro | [Registro de empresa](registro-empresa.md) |

La carpeta [proceso/](proceso/) guarda evidencia de control de calidad que no forma parte de la entrega: [M1-control-calidad](proceso/M1-control-calidad/), el [inventario de pendientes NO CONFIRMADO](proceso/pendientes-no-confirmado.md) y la [evidencia del 5 de noviembre de 2026](proceso/evidencia-2026-11-05/).

## Secciones para reescritura de Santiago

Las marcas `reescribir Santiago` del informe único (versión 1.2, 6 de noviembre de 2026) y de los anexos de M1 a M4 están cerradas. No quedan marcas de ese tipo en el repositorio.

## Fuente de coherencia

El tablero de hechos es `registro-empresa.md`. Las playbooks viven en `ondas/`.

Cada afirmación usa una marca: Observado, Diseñado AS-IS u Objetivo TO-BE. Un Objetivo no se afirma como hecho de hoy.

`AGENTS.md` es la fuente de verdad del launcher. El registro es la fuente de verdad de la empresa diseñada para el taller.

## Fuentes canónicas

Estas rutas son autoridad para agentes. No se copian ni se citan como archivos en el informe único.

| Fuente | Qué autoriza |
|--------|----------------|
| `AGENTS.md` | Identidad, equipo (Johel Santiago Arias), mapa técnico AS-IS y forma de trabajo |
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

| Hito | Punto del taller | Carpeta | Resultado |
|------|------------------|----------|-----------|
| M0 | Fundación | Hecho | Árbol, archivo, AGENTS.md y rules |
| M1 | Punto 1. Arquitectura de Negocio | `ondas/M1-negocio/` | Organización, misión y visión, organigrama, activos, mapa BPM, capacidades, partes interesadas y AS-IS |
| M2 | Punto 2. Arquitectura de Datos | `ondas/M2-datos/` | Inventario, modelo, flujo y problemas de información |
| M3 | Punto 3. Arquitectura de Aplicaciones | `ondas/M3-aplicaciones/` | Inventario, integraciones, problemas y propuesta de interoperabilidad |
| M4 | Punto 4. Arquitectura Tecnológica | `ondas/M4-tecnologia/` | Inventario, diagrama, riesgos y propuesta |
| M5 | Punto 5 y entrega | `ondas/M5-transformacion/` | TO-BE, brechas, portafolio, priorización, hoja de ruta, indicadores, informe único y pregunta final |

Los hitos M0 a M5 están cerrados; cada entregable se integró en el informe (M1 en el capítulo 3, M2 en el 4, M3 en el 5, M4 en el 6 y M5 en el 7). El registro está actualizado. Lo bloqueado no se contradice.

## Estructura del informe único

Portada y tabla de contenido, sin número. Luego:

1. Capítulo 1. Introducción
2. Capítulo 2. Descripción de la organización
3. Capítulo 3. Arquitectura de Negocio
4. Capítulo 4. Arquitectura de Datos
5. Capítulo 5. Arquitectura de Aplicaciones
6. Capítulo 6. Arquitectura Tecnológica
7. Capítulo 7. Roadmap de Transformación (fases E a H: brechas, portafolio, hoja de ruta, indicadores, requisitos, gobierno y gestión del cambio)
8. Capítulo 8. Conclusiones
9. Capítulo 9. Recomendaciones

Cierran el documento el Glosario, la Bibliografía y los Anexos, sin número. Tablas e ilustraciones llevan título y nota en formato APA 7 («Tabla N» e «Ilustración N»).

La pregunta final de análisis se responde en el capítulo 8.

Citas del informe: nombre del entregable y URL. Nunca una ruta `.md` del repositorio.

## Claims prohibidos

Clientes, contratos, alianzas, piloto firmado, KPIs de impacto comercial y la identidad TRO.
