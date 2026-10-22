# Onda M1. Arquitectura de Negocio

Estado: **completada**. Hechos de negocio bloqueados en `docs/ae-final-project/registro-empresa.md`.

Fuente de coherencia: `docs/ae-final-project/registro-empresa.md` y el enunciado del taller (`docs/ae-final-project/docs/definicion-taller-final.md`). Spec y plan de esta onda: `docs/superpowers/specs/2026-10-21-ae-m1-negocio-design.md` y `docs/superpowers/plans/2026-10-21-ae-m1-negocio.md`.

## Documento de lectura y entrega

El Punto 1 consolidado, en el orden de la entrega del taller (portada, introducción, descripción de la organización y arquitectura de negocio, con el detalle de cada documento exigido), está en [entregable-punto-1.md](entregable-punto-1.md).

Los archivos numerados de esta carpeta conservan el mismo contenido por apartado. El documento consolidado no los reemplaza como fuente de trabajo.

## Entregables del Punto 1 (Arquitectura de Negocio)

| Subpunto del enunciado | Archivo entregable en esta carpeta | Contenido principal |
|---|---|---|
| **1. Descripción de la organización**<br/>**2. Misión, visión y objetivos estratégicos**<br/>**Justificación empresarial AS-IS** | [01-organizacion-y-estrategia.md](01-organizacion-y-estrategia.md) | Ficha de LIRN S.A.S. (Bogotá, microempresa unipersonal, sector software e ITS), producto único TORNS, matriz de segmentos B2B/B2G (operadores 4,15/5 y Metro 4,00/5), ausencia de clientes actuales, misión, visión, 5 objetivos estratégicos (`OE-01` a `OE-05`) y justificación de S.A.S. unipersonal, organigrama funcional y mercado sin cliente. |
| **3. Organigrama**<br/>**7. Stakeholders (Partes interesadas)** | [02-organigrama-y-stakeholders.md](02-organigrama-y-stakeholders.md) | Recreación gráfica en Mermaid de la vista jerárquica AS-IS (Johel Arias, Dirección General) y de la vista funcional de 5 áreas (Dirección, Comercial, Producto e Ingeniería, Operación y Calidad), relaciones interdepartamentales y matriz de 8 grupos de partes interesadas (`SH-01` a `SH-08`) con nivel de influencia. |
| **4. Activos de información (Ley 1581)**<br/>**5. Mapa de Procesos BPM (`P-01` a `P-05`)**<br/>**6. Mapa de Capacidades** | [03-activos-procesos-capacidades.md](03-activos-procesos-capacidades.md) | Inventario de 7 activos de información (`AI-01` a `AI-07`) clasificados por seguridad y datos personales bajo la Ley 1581 de 2012; mapa de procesos `P-01` a `P-05` con diagramas BPMN e hipervínculo a Lucidchart; mapa de 10 capacidades de negocio (`CAP-01` a `CAP-10`, incluyendo Ventas, Atención al cliente, Gestión financiera, Gestión de inventarios y Gestión de talento humano). |
| **8. Documento Arquitectura de Negocio (AS-IS)** | [04-arquitectura-negocio-as-is.md](04-arquitectura-negocio-as-is.md) | Documento integrador del estado actual de LIRN: estructura, procesos, servicios (`SN-01` a `SN-03`), actores, flujos de información (comercial, operativo de demostración y calidad) y soporte transversal de datos, aplicaciones y tecnología hacia la misión y la visión. |

## Bloqueo aplicado al cerrar M1

Secciones 1 a 7, 10 y 11 de `docs/ae-final-project/registro-empresa.md` actualizadas y bloqueadas como entrada obligatoria para la Onda M2 (Arquitectura de Datos).
