# Matriz de trazabilidad OE-01 a OE-05 contra procesos, capacidades y servicios

Borrador de apoyo. Fuente: tabla de objetivos estratégicos (objetivo a proceso, Diseñado AS-IS), mapa de capacidades (capacidad a proceso) y catálogo de servicios SN-01 a SN-03 de la Arquitectura de Negocio. Las capacidades y servicios por objetivo se derivan pasando por el proceso. Nota: las columnas de capacidades y servicios se obtienen pasando por el proceso y requieren confirmación de Santiago; no constituyen marca.

| Objetivo | Procesos (fuente Arquitectura de Negocio) | Capacidades presentes | Capacidades en brecha | Servicios | Marca |
|----------|----------------------|----------------------------------|----------------------------------|----------------------|-------|
| OE-01 Producto demostrable y controlado | P-03, P-04 | CAP-04, CAP-05, CAP-06, CAP-08 parcial | CAP-07 | SN-02 | Diseñado AS-IS (objetivo) |
| OE-02 Canal comercial honesto B2B y B2G | P-02 | CAP-03 | Sin CRM ni facturación (CAP-09) | SN-01 | Diseñado AS-IS |
| OE-03 Proteger datos personales y evidencia | P-01, P-05 | CAP-01, CAP-02 | Política de tratamiento registrada (parte de CAP-02 en TO-BE) | SN-03 | Diseñado AS-IS |
| OE-04 Cerrar brecha entre demanda medida y oferta recomendada | P-01, P-03 | CAP-01, CAP-04, CAP-05 | CAP-07 | SN-02 | Diseñado AS-IS |
| OE-05 Preparar primer piloto pagado (TO-BE) | P-01 a P-05 | CAP-01 a CAP-06 | CAP-07, CAP-09, CAP-10, inventario físico de CAP-08 | SN-01, SN-02, SN-03 | Objetivo TO-BE |

## Hallazgos de trazabilidad
1. Todo objetivo tiene al menos un proceso y un servicio. Ningún objetivo queda huérfano.
2. CAP-07, CAP-09 y CAP-10 no tienen proceso ni servicio AS-IS. Solo se enlazan a OE-05 (TO-BE). Es coherente con el registro (Observado, ausencia).
3. CAP-08 no tiene servicio explícito en la Arquitectura de Negocio. NO CONFIRMADO si el catálogo digital se considera parte de SN-02.
4. P-05 y P-01 sostienen OE-03, pero no existe aún un servicio de cara al interesado para datos personales. Brecha cubierta por C-03.
5. Los indicadores de las fichas de proceso no cuantifican ningún objetivo. Varias metas figuran como NO CONFIRMADO. No se inventa ninguna.
