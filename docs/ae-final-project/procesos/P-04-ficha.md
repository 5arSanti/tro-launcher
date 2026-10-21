# Ficha P-04 Acompañamiento al uso del prototipo

Tipo ISO: misional
Dueño futuro: Operación
Suplente futuro: Producto

## 1. Objetivo

Acompañar el uso del prototipo TORNS mostrando demanda medida y oferta propuesta, sin afirmar operación en vivo del operador.

## 2. Alcance

Incluye:
- Programación de sesiones de demostración o acompañamiento con personas interesadas o el equipo interno.
- Verificación de que la solución de demostración está disponible.
- Presentación de demanda en estación medida y oferta propuesta al centro de control.
- Recolección de observaciones y escalamiento a Producto o Calidad cuando corresponda.

Excluye:
- Despacho real hacia sistemas del operador.
- Integración con el control de Transmilenio, Metro u otro operador.
- Afirmar ocupación en vivo del operador.
- Instalación de cámaras en campo.

## 3. Partes interesadas

- Interna: Operación; Producto
- Externa: centro de control como usuario previsto; persona interesada en sesión de demostración. No nombrar operadores como clientes.

## 4. Entradas

| Entrada | Origen | Registro |
|---------|--------|----------|
| Solución de demostración entregada | P-03 | Acta de entrega interna |
| Solicitud de sesión | P-02 o equipo interno | Solicitud de acompañamiento |
| Métricas de demanda y oferta propuesta | Prototipo | Informe de sesión |

## 5. Salidas

| Salida | Destino | Registro |
|--------|---------|----------|
| Observaciones de la sesión | Operación | Informe de acompañamiento |
| Escalamiento por fallo o claim indebido | P-03 o P-05 | Nota o no conformidad |
| Decisión de oferta en el operador | — | Fuera de alcance |

## 6. Actividades PHVA

| Fase | Actividad | Rol futuro | Registro / artefacto |
|------|-----------|------------|----------------------|
| Planear | Programar la sesión de demostración y confirmar disponibilidad de la solución | Operación | Solicitud de acompañamiento |
| Hacer | Mostrar demanda medida en estación y oferta propuesta sin afirmar operación en vivo del operador | Operación | Informe de acompañamiento |
| Verificar | Contrastar lo mostrado con el alcance aprobado (prototipo, no piloto ni operador en vivo) | Operación | Checklist de sesión |
| Actuar | Registrar observaciones; escalar a Producto si hay fallo técnico o a Calidad si hay claim indebido | Operación | Nota; no conformidad |

## 7. Indicadores

| Indicador | Fórmula | Fuente real | Meta | Nota |
|-----------|---------|-------------|------|------|
| Sesiones de acompañamiento realizadas | Conteo | Informe de acompañamiento | NO CONFIRMADO | No es uso de un operador |
| Solución disponible al inicio de sesión | Sí/No | Checklist de sesión | Sí | Prototipo en entorno del equipo |
| Escalamientos por claim indebido | Conteo | Registro de no conformidad | 0 preferido | Sin inventar clientes |

## 8. Riesgos y controles

| Riesgo | Control |
|--------|---------|
| Modelar despacho real del operador | Alcance: solo acompañamiento del prototipo |
| Afirmar piloto o cliente | Texto de alcance + revisión Dirección |
| Tomar la medición de demostración como ocupación en vivo | Copy + no conformidad a P-05 |

## 9. Recursos

Personas: Operación (dueño); Producto (suplente).
Infraestructura: solución de demostración del prototipo, registro de solicitudes de acompañamiento. No inventes ERP/ITSM ni consola del operador.
