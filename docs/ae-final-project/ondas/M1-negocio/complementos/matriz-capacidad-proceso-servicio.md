# Matriz capacidad x proceso x servicio (AS-IS, borrador de apoyo)

Leyenda: P = proceso principal que ejerce la capacidad (fuente: mapa de capacidades de la Arquitectura de Negocio, Observado o Diseñado AS-IS). A = apoyo propuesto a partir de las entradas y salidas de las fichas (pendiente de confirmación de Santiago). Vacío = sin relación documentada. "Ausente" = la capacidad no existe hoy (Observado).

| Capacidad | Estado AS-IS | P-01 | P-02 | P-03 | P-04 | P-05 | Servicio de negocio | Marca |
|-----------|--------------|------|------|------|------|------|---------------------|-------|
| CAP-01 Gobierno de producto único y control de claims | Presente (básica) | P | A | A |  | A | SN-03 | Observado |
| CAP-02 Gestión de evidencia, calidad y privacidad (Ley 1581) | Presente (básica) | A |  |  | A | P | SN-03 | Observado |
| CAP-03 Ventas y captación de interés B2B / B2G | Presente (incipiente) | A | P |  |  |  | SN-01 | Observado / Diseñado AS-IS |
| CAP-04 Detección y conteo de pasajeros en estación | Presente (prototipo) |  |  | P | A |  | SN-02 | Observado |
| CAP-05 Cálculo y recomendación determinista de despacho | Presente (prototipo) |  |  | P | A |  | SN-02 | Observado |
| CAP-06 Atención al cliente / Acompañamiento de demostración | Presente (acotada) |  | A |  | P |  | SN-02 | Observado / Diseñado AS-IS |
| CAP-07 Integración y despacho en vivo con el centro de control | Ausente |  |  |  |  |  | Ninguno | Observado |
| CAP-08 Gestión de inventarios (catálogo digital vs. hardware físico) | Parcial |  |  | P |  |  | NO CONFIRMADO | Observado (catálogo digital existente; no existe inventario de hardware físico) |
| CAP-09 Gestión financiera, contable y facturación | Ausente |  |  |  |  |  | Ninguno | Observado |
| CAP-10 Gestión de talento humano | Ausente |  |  |  |  |  | Ninguno | Observado |

## Lectura
- Las letras P salen de la columna "proceso asociado" del mapa de capacidades. Las letras A son propuestas y Santiago debe aprobarlas o borrarlas.
- Tres capacidades ausentes (CAP-07, CAP-09, CAP-10) no tienen proceso ni servicio. Alimentan C-06. En el TO-BE aprobado por Santiago el 1 de noviembre de 2026 las cubren P-07, P-08 y P-09 (ver la proyección TO-BE).
- Los dueños funcionales de cada proceso (Dirección, Comercial, Producto, Operación, Calidad) hoy son una sola persona, Johel Santiago Arias (Diseñado AS-IS). No se afirma como hoy que existan áreas separadas.

## Proyección TO-BE aprobada (1 de noviembre de 2026)
Marca: Objetivo TO-BE. Procesos y servicios aprobados por Santiago el 1 de noviembre de 2026; no existen hoy (Observado).

| Capacidad | P-06 | P-07 | P-08 | P-09 | Servicio de negocio TO-BE |
|-----------|------|------|------|------|---------------------------|
| CAP-03 Ventas y captación de interés B2B / B2G | P |  |  |  | SN-04 |
| CAP-04 Detección y conteo de pasajeros en estación |  |  |  |  | SN-04 |
| CAP-05 Cálculo y recomendación determinista de despacho |  |  |  |  | SN-04 |
| CAP-06 Atención al cliente / Acompañamiento de demostración | P |  |  |  | SN-04, SN-05 |
| CAP-07 Integración y despacho en vivo con el centro de control |  | P |  |  | NO CONFIRMADO |
| CAP-08 Gestión de inventarios (catálogo digital vs. hardware físico) |  |  |  |  | SN-05 |
| CAP-09 Gestión financiera, contable y facturación | A |  | P |  | Ninguno de cara al cliente |
| CAP-10 Gestión de talento humano |  |  |  | P | Ninguno de cara al cliente |

- P-06 ejerce CAP-09 como apoyo, porque produce los contratos que factura P-08. Fundamento: la descripción aprobada de P-06 en el TO-BE de negocio lo liga a CAP-03, CAP-06 y CAP-09.
- P-09 se separó de P-08 por decisión de Santiago: CAP-09 y CAP-10 tienen ciclos, normas y datos distintos.

## Servicios de negocio AS-IS (de la Arquitectura de Negocio)
- SN-01 Información institucional y recepción de interés comercial (P-02).
- SN-02 Demostración guiada de medición de demanda y recomendación de oferta (P-03 y P-04).
- SN-03 Verificación de evidencia y control de no-claims (P-01 y P-05).

Nota: los nombres de capacidad se alinearon con los del diagrama del mapa de capacidades de la Arquitectura de Negocio (28 oct 2026).
