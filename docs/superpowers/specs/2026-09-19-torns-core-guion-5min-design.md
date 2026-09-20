# Diseño: guion oral 5 min - core técnico TORNS

Fecha: 2026-09-19  
Estado: aprobado (oral, máx. 5 min, enfoque narrativo único)

## Objetivo

Guion conversacional en español para cualquier oyente. Explica el núcleo técnico de TORNS (detección de demanda → recomendación de oferta) con **1 principio científico real y 2 principios matemáticos reales** anclados en lo implementado en `tro-backend` / YOLO, sin inventar optimización formal de rutas.

## Formato

- Oral, una sola voz
- Duración máxima: 5 minutos (~650–750 palabras habladas)
- Archivo: `docs/presentations/torns-core-guion-5min.md`

## Principios (fijos)

1. Científico: control en lazo cerrado (teoría de control / cibernética)
2. Matemático: cota inferior de bin packing `⌈N/C⌉` (flota mínima)
3. Matemático: paradigma de algoritmos voraces (selección del vehículo más pequeño suficiente)

## Estructura

1. Gancho oferta vs demanda  
2. Ciencia: nombre real, descripción, aplicación  
3. Matemática 1: nombre real, descripción, aplicación  
4. Matemática 2: nombre real, descripción, aplicación  
5. Cierre: prototipo aplicado, no piloto firmado  

Sin sección “Qué hace TORNS”. Sin guiones largos (—) como conectores. Cada principio se fundamenta primero como principio nombrado y luego se aplica al proyecto.

## Restricciones

- No afirmar cliente, piloto firmado, alianza, optimizador de rutas / VRP / predicción histórica como hechos de código
- Números de ejemplo didácticos, no KPIs de impacto
- Tono alineado al guion de landing (`docs/presentations/torns-landing-guion.md`)
- Los nombres deben ser principios, resultados o paradigmas reconocibles (no etiquetas inventadas ad hoc)
