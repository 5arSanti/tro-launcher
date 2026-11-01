# Registro de Requisitos de Arquitectura (Fases E y F)
> Borrador de apoyo v1.0, 1 de noviembre de 2026. Líder de Transformación. Santiago redacta el texto final. Sin cifras, costos ni NIT. Marcas: Observado, Diseñado AS-IS, Objetivo TO-BE. Los riesgos citados como «RT-xx (Punto 4)» son los de la Arquitectura Tecnológica; los citados sin ese sufijo son los del Punto 3.

| ID | Dominio | Enunciado | Origen | Marca | Proyecto | Criterio de verificación |
|----|---------|-----------|--------|-------|----------|--------------------------|
| RQ-01 | Negocio | La organización debe contar con matrícula mercantil y NIT | G-N01 | Objetivo TO-BE | PY-01 | Certificado de existencia vigente |
| RQ-02 | Negocio | La comunicación pública debe reflejar el equipo vigente | G-N02; PI-07 | Objetivo TO-BE | PY-02 | Revisión de sitio sin nombres ni residuos no vigentes |
| RQ-03 | Datos | Todo formulario debe publicar política y capturar autorización Ley 1581 | PI-02; PR-02 | Objetivo TO-BE | PY-03 | Formulario con casilla y enlace a política |
| RQ-04 | Negocio | Todo lead debe tener estado, responsable y respuesta registrada | PI-16; PR-17 | Objetivo TO-BE | PY-03 | Registro en gestor con campos completos |
| RQ-05 | Aplicaciones | El canal de contacto debe confirmar recepción y reintentar | PR-01 | Objetivo TO-BE | PY-03 | Prueba de acuse |
| RQ-06 | Datos | Conteos y planes deben persistir por estación y fecha | PI-01; PR-05 | Objetivo TO-BE | PY-04 | Consulta histórica tras reinicio |
| RQ-07 | Datos | Cada estación debe tener un identificador único | PI-05; PR-08 | Objetivo TO-BE | PY-04 | Catálogo sin duplicados |
| RQ-08 | Aplicaciones | La inferencia debe ejecutarse sin depender de clientes de video | PR-04 | Objetivo TO-BE | PY-05 | Conteo activo sin stream abierto |
| RQ-09 | Aplicaciones | AP-05 debe publicarse versionado con metadatos y entorno fijado | PR-07 | Objetivo TO-BE | PY-05 | Versión trazable de AP-04 a AP-03 |
| RQ-10 | Negocio | Toda métrica del modelo debe citar fuente y alcance; la de entrenamiento no se presenta como de estación | G-N05; RT-03 | Objetivo TO-BE | PY-05 | Revisión de claims |
| RQ-11 | Tecnología | Debe existir respaldo verificado de pesos, dataset, leads y configuración | PI-18; RT-02 (Punto 4) | Objetivo TO-BE | PY-07 | Restauración de prueba desde el almacén de objetos fuera de la estación |
| RQ-12 | Tecnología | Secretos fuera del código en gestor dedicado | B-T03; RT-12 (Punto 4) | Objetivo TO-BE | PY-07 | Escaneo del repositorio sin secretos y secretos cargados desde el gestor por entorno |
| RQ-13 | Aplicaciones | AP-02 y AP-03 deben autenticar con roles y CORS restringido | PR-03; RT-07 | Objetivo TO-BE | PY-07 | Acceso anónimo rechazado |
| RQ-14 | Tecnología | Entornos de demostración, laboratorio y piloto separados | PR-13; B-T01; tabla de entornos (Punto 4) | Objetivo TO-BE | PY-07 | Laboratorio, demostración y piloto operan separados con el acceso definido en la tabla de entornos |
| RQ-15 | Datos | Ningún dato personal en repositorios públicos | PI-13; PR-14 | Objetivo TO-BE | PY-07 | Revisión de AP-07 sin base de AP-08 |
| RQ-16 | Aplicaciones | Facturación electrónica conforme a la DIAN (fuente normativa NO CONFIRMADO) | PR-15; N-06 | Objetivo TO-BE | PY-09 | Factura de prueba (requiere RQ-01) |
| RQ-17 | Aplicaciones | Interfaz autenticada con centro de control del operador | PR-06 | Objetivo TO-BE | PY-06 | Contrato de interfaz acordado con el operador |
| RQ-18 | Negocio | El piloto requiere fuente de video y red acordadas, actas y evidencia de resultados | G-N07; SN-04 | Objetivo TO-BE | PY-08 | Actas firmadas con resultados y alcance |
| RQ-19 | Negocio | La vinculación de personal debe hacerse con contrato, afiliaciones y tratamiento Ley 1581 de datos de empleados (fuente normativa de nómina NO CONFIRMADO) | G-N06; N-07 | Objetivo TO-BE (condicional) | PY-10 | Expediente por colaborador |
| RQ-20 | Negocio | Ninguna pieza pública afirma cliente, contrato, piloto firmado ni impacto no medido | PN-02; P-05 | Objetivo TO-BE | Todos | Revisión de claims en P-05 |

