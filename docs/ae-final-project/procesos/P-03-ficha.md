# Ficha P-03 Realización del producto TORNS

Tipo ISO: misional
Dueño futuro: Producto
Suplente futuro: Operación

## 1. Objetivo

Entregar la solución de producto TORNS que mide demanda en estación y propone oferta al centro de control, como prototipo aplicado.

## 2. Alcance

Incluye:
- Medición de demanda en estación a partir de fuentes de video del prototipo.
- Análisis de conteo y propuesta de frecuencia, capacidad o asignación al centro de control.
- Preparación y verificación de la solución de demostración lista para acompañamiento (P-04).
- Entrega a Operación o apertura de no conformidad si la solución no está lista.

Excluye:
- Instalación física de cámaras en campo del operador.
- Integración con el control real de un operador.
- Piloto firmado, SLA de cliente, o métricas de impacto comercial.
- Afirmar ocupación en vivo del operador.

## 3. Partes interesadas

- Interna: Producto; Operación; Calidad
- Externa: centro de control como usuario previsto del prototipo; academia. No nombrar operadores como clientes.

## 4. Entradas

| Entrada | Origen | Registro |
|---------|--------|----------|
| Alcance de producto | P-01 | Acta de dirección |
| Interés calificado (si existe) | P-02 | Nota Comercial — puede ser vacía |
| Fuente de video de estación (entorno de demostración) | Prototipo | Registro de fuente |
| No conformidad técnica | P-05 | Registro de no conformidad |

## 5. Salidas

| Salida | Destino | Registro |
|--------|---------|----------|
| Solución de demostración lista | P-04 | Acta de entrega interna |
| Métricas de demanda en estación | Operación | Informe de medición |
| Oferta propuesta al centro de control | Operación | Propuesta de oferta |
| No conformidad abierta | P-05 | Registro de no conformidad |

## 6. Actividades PHVA

| Fase | Actividad | Rol futuro | Registro / artefacto |
|------|-----------|------------|----------------------|
| Planear | Acotar el alcance de entrega: medir demanda en estación y proponer oferta; rechazar instalación en campo e integración con operador real | Producto | Nota de alcance |
| Hacer | Preparar la solución de demostración con medición de demanda y propuesta de oferta | Producto | Solución de demostración |
| Verificar | Comprobar que la solución muestra demanda medida y oferta propuesta sin afirmar operación en vivo del operador | Producto, Calidad | Checklist de verificación |
| Actuar | Entregar a Operación si está lista; abrir no conformidad si persiste un fallo o un claim indebido | Producto, Calidad | Acta de entrega; no conformidad |

## 7. Indicadores

| Indicador | Fórmula | Fuente real | Meta | Nota |
|-----------|---------|-------------|------|------|
| Solución de demostración verificada | Sí/No en checklist | Checklist interno | Sí antes de entrega | No es uptime de un operador |
| Fuentes de medición disponibles | Conteo en entorno de demostración | Registro de fuentes | NO CONFIRMADO número fijo | Prototipo, no campo |
| Oferta propuesta disponible | Sí/No en verificación | Checklist interno | Sí en el prototipo | No “minutos ahorrados” |

## 8. Riesgos y controles

| Riesgo | Control |
|--------|---------|
| Afirmar piloto o cliente | Texto de alcance + revisión Dirección |
| Confundir medición de demostración con ocupación en vivo del operador | Copy de prototipo; no conformidad a P-05 |
| Instalar cámaras en campo sin acuerdo | Fuera de alcance; rechazar en planificación |

## 9. Recursos

Personas: Producto (dueño); Operación (suplente de recepción).
Infraestructura: entorno de demostración del prototipo, registro de no conformidad. No inventes ERP/ITSM.
