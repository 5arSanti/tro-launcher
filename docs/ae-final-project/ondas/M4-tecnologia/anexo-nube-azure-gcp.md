# Anexo Punto 4. Comparativo de nube Azure y GCP para TORNS

Anexo de la Arquitectura Tecnológica (Punto 4). Complementa el Entregable del Punto 4 (sección de alternativas de nube, donde los costos figuraban como NO CONFIRMADO) y toma como base el inventario de aplicaciones y nodos TO-BE del Entregable del Punto 3. Se acompaña de la hoja de cálculo del anexo.

## 1. Alcance y método

- Moneda: USD, precio de lista, pago por uso (pay as you go). No se convierte a COP; cualquier conversión queda fuera de este anexo.
- Fecha de consulta de todos los precios y SLA: 2 nov 2026.
- **Las calculadoras interactivas (Azure Pricing Calculator y Google Cloud Pricing Calculator) no se usaron.** Los precios unitarios provienen de la Azure Retail Prices API (filtro de región brazilsouth, tipo Consumption) y de las páginas oficiales de precios de Google Cloud, renderizadas con la región São Paulo (southamerica-east1). Cada total es precio unitario × cantidad del supuesto; la hoja de cálculo permite recalcularlo (columnas precio_unitario, cantidad, subtotal_usd_mes).
- Se ignoran de forma conservadora los niveles gratuitos que no son propios de la región (por ejemplo, el nivel gratuito de Cloud Run, publicado con precios de us-central1).
- No se costean discos de arranque de las VM, operaciones de almacenamiento de objetos, mensajes de la cola, operaciones de secretos ni ingesta de logs, porque sus volúmenes no figuran en la tabla de parámetros aprobada. Su precio unitario se registra y la cantidad queda NO CONFIRMADO.
- Fuera del costeo: AP-05, AP-06 (retirada), AP-07, AP-09 a AP-13, N-06 y N-07. AP-08 (Label Studio) es opcional y no se suma.

## 2. Región elegida y disponibilidad de GPU

Se compara en la misma ciudad: Azure **Brazil South** y GCP **southamerica-east1**, ambas en São Paulo. Ninguna de las dos nubes tiene región en Colombia (Observado, 2 nov 2026).

| Criterio | Azure Brazil South | GCP southamerica-east1 |
|---|---|---|
| GPU NVIDIA T4 | NC4as T4 v3 con precio publicado en la Retail Prices API (Observado) | N1 + T4 en zonas a, b y c; G4 en zonas a y b (Observado, página oficial de regiones y zonas de GPU) |
| GPU L4 | No evaluada | G2/L4 no disponible en la región (Observado) |
| Alternativa cercana | Chile Central: la API no devolvió precio para NC4as T4 v3 (NO CONFIRMADO) | southamerica-west1 (Santiago): GPU NO CONFIRMADO |

São Paulo es la única ubicación donde ambas nubes ofrecen la misma GPU (T4), lo que permite una comparación equivalente. Por eso se compara T4 contra T4.

## 3. Correspondencia de componentes TO-BE con servicios de nube

| Código | Función (Entregable Punto 3) | Azure | GCP |
|---|---|---|---|
| AP-01 | Sitio estático | GitHub Pages (sin costo de nube) | GitHub Pages (sin costo de nube) |
| AP-02 | Portal; parte estática y OIDC (IT-02) contra N-02 | Static Web Apps | Firebase Hosting o Cloud Storage + CDN (equivalente oficial NO CONFIRMADO) |
| AP-03a | API REST en contenedor (IT-02, IT-04 hacia N-04, consume IT-07) | Container Apps (consumo) | Cloud Run (facturación por instancia) |
| AP-03b | Inferencia en GPU (I-07 video, IT-05 pesos desde N-05, publica IT-07) | VM NC4as T4 v3 | Compute Engine n1-standard-4 + T4 |
| AP-04 | Reentrenamiento por lotes en GPU | VM NC4as T4 v3 bajo demanda | n1-standard-4 + T4 bajo demanda |
| N-01 | Datos personales | Esquema separado dentro de N-04 | Esquema separado dentro de N-04 |
| IT-01 | Receptor de leads: cómputo mínimo que recibe los leads de AP-01 (GitHub Pages no ejecuta código) y escribe en el esquema de N-01, con identidad propia, permisos solo sobre ese esquema y sin acceso de AP-03a ni AP-03b | Azure Functions (plan de consumo) o Container App mínima | Cloud Run functions o servicio Cloud Run mínimo |
| N-02 | Proveedor de identidad OIDC | Entra External ID | Identity Platform |
| N-04 | Base de datos gestionada | PostgreSQL Flexible Server | Cloud SQL para PostgreSQL |
| N-05 | Almacenamiento de objetos versionado (pesos, evidencias) | Blob Storage Hot LRS | Cloud Storage Standard |
| IT-07 | Cola de eventos | Service Bus Basic | Pub/Sub |
| Secretos | Credenciales y llaves | Key Vault Standard | Secret Manager |
| Monitoreo | Logs y métricas | Log Analytics | Cloud Logging |
| Enlace estación | Túnel sitio a sitio | VPN Gateway VpnGw1 + conexión S2S | Cloud VPN |

El orden de implantación del Entregable del Punto 3 se mantiene: N-02 antes de IT-06, N-04 antes del análisis histórico y AP-03b antes de habilitar varias cámaras.

## 4. Parámetros de escenario

Todos los valores tienen la marca «Objetivo TO-BE (supuesto de escenario aprobado por Santiago el 2 de noviembre de 2026)». Las cámaras por estación y las 6 h por reentrenamiento tienen la marca «Observado por declaración del dueño (2 de noviembre de 2026)».

| Parámetro | Piloto | Escala |
|---|---|---|
| Estaciones | 1 | 5 |
| Cámaras | 1 a 3 (declaración del dueño) | 15 |
| Horas de inferencia por mes | 540 por VM GPU | 540 por VM GPU |
| VM GPU | 1 | 5 |
| Reentrenamientos por mes × duración | 1 × 6 h | 2 × 6 h |
| Contenedores API × horas | 1 × 730 h | 2 × 730 h |
| Base de datos | Mínima de producción, 32 GB | Media, 128 GB |
| Objetos (N-05) | 100 GB | 1 TB |
| Salida a Internet | 50 GB | 500 GB |
| Usuarios de identidad | Hasta 50 | Hasta 500 |
| Secretos | 10 | 30 |
| Túneles VPN S2S × horas | 1 × 730 h | 5 × 730 h |

La duración de 6 h proviene del entrenamiento en la GTX 1050 Ti (4 a 6 h), Observado por declaración del dueño (2 de noviembre de 2026). Que el tiempo sea menor en una T4 de nube es NO CONFIRMADO, por lo que se conserva 6 h.

Supuestos menores añadidos, también Objetivo TO-BE de escenario: cada contenedor usa 1 vCPU y 2 GiB; el respaldo de la base de datos es igual a su tamaño; en GCP hay una versión activa por secreto. La base de datos no es idéntica entre nubes: en el piloto se compara Azure B1MS (burstable) con Cloud SQL de 1 vCPU dedicada y 3,75 GiB, y en escala Azure D2ds_v5 (2 vCore) con Cloud SQL de 2 vCPU y 8 GiB. Se tomó la instancia dedicada en GCP porque no se extrajo el precio de la instancia de núcleo compartido (NO CONFIRMADO).

Un piloto con 1 cámara y otro con 3 cámaras cuestan lo mismo, porque las tres cámaras comparten una VM GPU durante las mismas 540 h. El mínimo y el máximo del piloto coinciden.

## 5. Totales mensuales por escenario y nube

| Escenario | Azure (USD/mes) | GCP (USD/mes) | Diferencia |
|---|---|---|---|
| Piloto (1 a 3 cámaras) | 755,45 | 650,11 | GCP 105,34 menos (14 %) |
| Escala (15 cámaras) | 3.096,77 | 2.864,32 | GCP 232,45 menos (8 %) |

Los totales excluyen los rubros marcados NO CONFIRMADO. La GPU de inferencia representa cerca del 64 % del piloto en Azure y del 65 % en GCP. Todos los valores son precios de lista de pago por uso. No se aplican el descuento por uso sostenido de GCP, sus descuentos por compromiso (T4 a 0,30 USD/h a 1 año y 0,21 USD/h a 3 años), ni las reservas o el plan de ahorro (savings plan) de Azure. No se usaron las calculadoras de precios de ninguno de los dos proveedores.

Precio de la T4 en GCP: la página oficial de precios de aceleradores (https://cloud.google.com/products/compute/pricing/accelerator-optimized, región «Sao Paulo (southamerica-east1)», fecha de consulta 2 nov 2026) muestra NVIDIA T4, 1 GPU, a 0,48 USD/hora; con la región Iowa (us-central1) la misma tabla muestra 0,35 USD/hora, lo que confirma que el selector de región cambió los valores. Se conserva 0,48 USD/hora. El valor de 0,42525 USD/h señalado en la revisión sí aparece en la página oficial, pero 0,42525 USD/h corresponde a Doha (me-central1), no a São Paulo; por eso no se usa.

Cargo de entorno de Container Apps: la API de precios registra «Environment Management Hour» a 0,1 USD/hora en brazilsouth. La página oficial de precios indica que ese medidor aplica al plan Dedicated, al punto de conexión privado y al mantenimiento planificado. Que no aplique a un entorno solo de consumo es NO CONFIRMADO; el cargo no se suma a los totales. La misma página (https://azure.microsoft.com/en-us/pricing/details/container-apps/, fecha de consulta 2 nov 2026) declara un nivel gratuito mensual por suscripción de 180 000 vCPU-s, 360 000 GiB-s y 2 millones de solicitudes en el plan de consumo.

Diferencias por rubro que explican el resultado: la VM con GPU cuesta 0,894 USD/h en Azure y 0,781595 USD/h en GCP; la VPN de Azure exige un gateway fijo (VpnGw1, 138,70 USD/mes) mientras GCP cobra solo por túnel (54,75 USD/mes por túnel); la salida a Internet favorece levemente a Azure (primeros 100 GB sin costo y 0,181 USD/GB, frente a 0,19 USD/GiB en GCP). En Azure se costea la tarifa por defecto, Routing Preference: Microsoft Global Network (medidor «Standard Data Transfer Out», brazilsouth, 0,181 USD/GB desde 100 GB, API de precios, fecha de consulta 2 nov 2026). La alternativa Routing Preference: Internet cuesta 0,12 USD/GB desde 100 GB y bajaría el escenario de escala en 24,40 USD/mes.

### 5.1 Detalle de precios

Cada línea tiene fuente y fecha de consulta 2 nov 2026 en la hoja de cálculo. Fuentes: Azure Retail Prices API (https://prices.azure.com/api/retail/prices, región brazilsouth); GCP: https://cloud.google.com/products/compute/pricing/accelerator-optimized, https://cloud.google.com/products/compute/pricing/general-purpose, https://cloud.google.com/sql/pricing, https://cloud.google.com/storage/pricing, https://cloud.google.com/run/pricing, https://cloud.google.com/network-connectivity/docs/vpn/pricing, https://cloud.google.com/vpc/network-pricing, https://cloud.google.com/pubsub/pricing, https://cloud.google.com/secret-manager/pricing, https://cloud.google.com/identity-platform/pricing, https://cloud.google.com/stackdriver/pricing.

| Escenario | Nube | Componente | Servicio | SKU | Precio unitario USD | Unidad | Cantidad | Subtotal USD/mes |
|---|---|---|---|---|---|---|---|---|
| Piloto | Azure | AP-03b | Virtual Machines | NC4as T4 v3 Linux | 0,894 | hora | 540 | 482,76 |
| Piloto | Azure | AP-04 | Virtual Machines | NC4as T4 v3 Linux | 0,894 | hora | 6 | 5,36 |
| Piloto | Azure | AP-03a | Container Apps (consumo) | Standard vCPU Active Usage | 2,4e-05 | vCPU-s | 2628000 | 63,07 |
| Piloto | Azure | AP-03a | Container Apps (consumo) | Standard Memory Active Usage | 3e-06 | GiB-s | 5256000 | 15,77 |
| Piloto | Azure | N-04 + N-01 | PostgreSQL Flexible Server | Burstable B1MS | 0,035 | hora | 730 | 25,55 |
| Piloto | Azure | N-04 | PostgreSQL Flexible Server | Storage | 0,2185 | GB-mes | 32 | 6,99 |
| Piloto | Azure | N-04 | PostgreSQL Flexible Server | Backup LRS | 0,095 | GB-mes | 32 | 3,04 |
| Piloto | Azure | N-05 | Blob Storage Hot LRS | Data Stored | 0,0326 | GB-mes | 100 | 3,26 |
| Piloto | Azure | Salida Internet | Bandwidth | Standard Data Transfer Out, Routing Preference: Microsoft Global Network (primeros 100 GB sin costo) | 0,181 | GB | 0 | 0,00 |
| Piloto | Azure | IT-07 | Service Bus Basic | Operations | 0,05 | millon de operaciones | NO CONFIRMADO | 0,00 |
| Piloto | Azure | N-02 | Entra External ID | Core MAU (0 a 50 000 sin costo) | 0,0 | MAU | 50 | 0,00 |
| Piloto | Azure | Secretos | Key Vault Standard | Operations | 0,03 | 10 000 operaciones | NO CONFIRMADO | 0,00 |
| Piloto | Azure | Monitoreo | Log Analytics | Ingestion (primeros 5 GB sin costo) | 4,6 | GB | NO CONFIRMADO | 0,00 |
| Piloto | Azure | Enlace estacion | VPN Gateway | VpnGw1 | 0,19 | hora | 730 | 138,70 |
| Piloto | Azure | Enlace estacion | VPN Gateway | S2S Connection | 0,015 | conexion-hora | 730 | 10,95 |
| Piloto | Azure | AP-02 estatico | Static Web Apps | Plan Free | NO CONFIRMADO | mes | 1 | 0,00 |
| Piloto | GCP | AP-03b | Compute Engine | n1-standard-4 | 0,301595 | hora | 540 | 162,86 |
| Piloto | GCP | AP-03b | Compute Engine GPU | NVIDIA T4 (1 GPU) | 0,48 | hora | 540 | 259,20 |
| Piloto | GCP | AP-04 | Compute Engine + GPU | n1-standard-4 + T4 | 0,781595 | hora | 6 | 4,69 |
| Piloto | GCP | AP-03a | Cloud Run (instancia) | CPU | 2,16e-05 | vCPU-s | 2628000 | 56,76 |
| Piloto | GCP | AP-03a | Cloud Run (instancia) | Memoria | 2,4e-06 | GiB-s | 5256000 | 12,61 |
| Piloto | GCP | N-04 + N-01 | Cloud SQL PostgreSQL Enterprise | vCPU | 0,062 | vCPU-hora | 730 | 45,26 |
| Piloto | GCP | N-04 + N-01 | Cloud SQL PostgreSQL Enterprise | Memoria | 0,0105 | GiB-hora | 2737,5 | 28,74 |
| Piloto | GCP | N-04 | Cloud SQL | SSD | 0,000349315 | GiB-hora | 23360 | 8,16 |
| Piloto | GCP | N-04 | Cloud SQL | Backup | 0,000164384 | GiB-hora | 23360 | 3,84 |
| Piloto | GCP | N-05 | Cloud Storage Standard | Data stored | 4,7945e-05 | GiB-hora | 73000 | 3,50 |
| Piloto | GCP | Salida Internet | Network Premium Tier | Egress a Sudamerica 0-1 TiB | 0,19 | GiB | 50 | 9,50 |
| Piloto | GCP | IT-07 | Pub/Sub | Throughput (primeros 10 GiB sin costo) | 40,0 | TiB | NO CONFIRMADO | 0,00 |
| Piloto | GCP | N-02 | Identity Platform | Tier 1 MAU (0 a 50 000 sin costo) | 0,0 | MAU | 50 | 0,00 |
| Piloto | GCP | Secretos | Secret Manager | Version activa (6 sin costo) | 8,2192e-05 | version-hora | 2920 | 0,24 |
| Piloto | GCP | Monitoreo | Cloud Logging | Ingestion (50 GiB sin costo) | 0,5 | GiB | NO CONFIRMADO | 0,00 |
| Piloto | GCP | Enlace estacion | Cloud VPN | Tunel | 0,075 | tunel-hora | 730 | 54,75 |
| Piloto | GCP | AP-02 estatico | Firebase Hosting / Cloud Storage + CDN | NO CONFIRMADO | NO CONFIRMADO | mes | 1 | 0,00 |
| Escala | Azure | AP-03b | Virtual Machines | NC4as T4 v3 Linux | 0,894 | hora | 2700 | 2.413,80 |
| Escala | Azure | AP-04 | Virtual Machines | NC4as T4 v3 Linux | 0,894 | hora | 12 | 10,73 |
| Escala | Azure | AP-03a | Container Apps (consumo) | Standard vCPU Active Usage | 2,4e-05 | vCPU-s | 5256000 | 126,14 |
| Escala | Azure | AP-03a | Container Apps (consumo) | Standard Memory Active Usage | 3e-06 | GiB-s | 10512000 | 31,54 |
| Escala | Azure | N-04 + N-01 | PostgreSQL Flexible Server | General Purpose Ddsv5 2 vCore | 0,24 | hora | 730 | 175,20 |
| Escala | Azure | N-04 | PostgreSQL Flexible Server | Storage | 0,2185 | GB-mes | 128 | 27,97 |
| Escala | Azure | N-04 | PostgreSQL Flexible Server | Backup LRS | 0,095 | GB-mes | 128 | 12,16 |
| Escala | Azure | N-05 | Blob Storage Hot LRS | Data Stored | 0,0326 | GB-mes | 1024 | 33,38 |
| Escala | Azure | Salida Internet | Bandwidth | Standard Data Transfer Out, Routing Preference: Microsoft Global Network (primeros 100 GB sin costo) | 0,181 | GB | 400 | 72,40 |
| Escala | Azure | IT-07 | Service Bus Basic | Operations | 0,05 | millon de operaciones | NO CONFIRMADO | 0,00 |
| Escala | Azure | N-02 | Entra External ID | Core MAU (0 a 50 000 sin costo) | 0,0 | MAU | 500 | 0,00 |
| Escala | Azure | Secretos | Key Vault Standard | Operations | 0,03 | 10 000 operaciones | NO CONFIRMADO | 0,00 |
| Escala | Azure | Monitoreo | Log Analytics | Ingestion (primeros 5 GB sin costo) | 4,6 | GB | NO CONFIRMADO | 0,00 |
| Escala | Azure | Enlace estacion | VPN Gateway | VpnGw1 | 0,19 | hora | 730 | 138,70 |
| Escala | Azure | Enlace estacion | VPN Gateway | S2S Connection | 0,015 | conexion-hora | 3650 | 54,75 |
| Escala | Azure | AP-02 estatico | Static Web Apps | Plan Free | NO CONFIRMADO | mes | 1 | 0,00 |
| Escala | GCP | AP-03b | Compute Engine | n1-standard-4 | 0,301595 | hora | 2700 | 814,31 |
| Escala | GCP | AP-03b | Compute Engine GPU | NVIDIA T4 (1 GPU) | 0,48 | hora | 2700 | 1.296,00 |
| Escala | GCP | AP-04 | Compute Engine + GPU | n1-standard-4 + T4 | 0,781595 | hora | 12 | 9,38 |
| Escala | GCP | AP-03a | Cloud Run (instancia) | CPU | 2,16e-05 | vCPU-s | 5256000 | 113,53 |
| Escala | GCP | AP-03a | Cloud Run (instancia) | Memoria | 2,4e-06 | GiB-s | 10512000 | 25,23 |
| Escala | GCP | N-04 + N-01 | Cloud SQL PostgreSQL Enterprise | vCPU | 0,062 | vCPU-hora | 1460 | 90,52 |
| Escala | GCP | N-04 + N-01 | Cloud SQL PostgreSQL Enterprise | Memoria | 0,0105 | GiB-hora | 5840 | 61,32 |
| Escala | GCP | N-04 | Cloud SQL | SSD | 0,000349315 | GiB-hora | 93440 | 32,64 |
| Escala | GCP | N-04 | Cloud SQL | Backup | 0,000164384 | GiB-hora | 93440 | 15,36 |
| Escala | GCP | N-05 | Cloud Storage Standard | Data stored | 4,7945e-05 | GiB-hora | 747520 | 35,84 |
| Escala | GCP | Salida Internet | Network Premium Tier | Egress a Sudamerica 0-1 TiB | 0,19 | GiB | 500 | 95,00 |
| Escala | GCP | IT-07 | Pub/Sub | Throughput (primeros 10 GiB sin costo) | 40,0 | TiB | NO CONFIRMADO | 0,00 |
| Escala | GCP | N-02 | Identity Platform | Tier 1 MAU (0 a 50 000 sin costo) | 0,0 | MAU | 500 | 0,00 |
| Escala | GCP | Secretos | Secret Manager | Version activa (6 sin costo) | 8,2192e-05 | version-hora | 17520 | 1,44 |
| Escala | GCP | Monitoreo | Cloud Logging | Ingestion (50 GiB sin costo) | 0,5 | GiB | NO CONFIRMADO | 0,00 |
| Escala | GCP | Enlace estacion | Cloud VPN | Tunel | 0,075 | tunel-hora | 3650 | 273,75 |
| Escala | GCP | AP-02 estatico | Firebase Hosting / Cloud Storage + CDN | NO CONFIRMADO | NO CONFIRMADO | mes | 1 | 0,00 |

Referencia de hosting estático: AP-01 en GitHub Pages tiene costo de nube 0 USD. El precio del plan Free de Azure Static Web Apps y el de Firebase Hosting no se verificaron en esta consulta (NO CONFIRMADO); por eso AP-02 estático no suma a los totales.

### 5.2 IT-01, receptor de leads

Precios unitarios oficiales, región São Paulo, fecha de consulta 2 nov 2026. La cantidad es NO CONFIRMADO porque el volumen de leads no figura en la tabla de parámetros aprobada; por eso IT-01 no suma a los totales y estos no cambian.

| Nube | Servicio | SKU | Precio unitario USD | Unidad | Nivel gratuito mensual | Fuente | SLA publicado |
|---|---|---|---|---|---|---|---|
| Azure | Azure Functions, plan de consumo (brazilsouth) | Standard Execution Time | 0,000016 | GB-s | 400 000 GB-s | Azure Retail Prices API | 99,95 % (Function App en plan de consumo) |
| Azure | Azure Functions, plan de consumo (brazilsouth) | Standard Total Executions | 0,20 | millón de ejecuciones | 1 000 000 ejecuciones | Azure Retail Prices API | 99,95 % |
| GCP | Cloud Run functions o Cloud Run, facturación por solicitud (southamerica-east1) | CPU, tiempo activo | 0,0000336 | vCPU-s | 180 000 vCPU-s (calculado con precio de us-central1) | https://cloud.google.com/run/pricing | 99,95 % (Cloud Run service sin GPU), https://cloud.google.com/run/sla |
| GCP | Ídem | Memoria, tiempo activo | 0,0000035 | GiB-s | 360 000 GiB-s (calculado con precio de us-central1) | https://cloud.google.com/run/pricing | 99,95 % |
| GCP | Ídem | Solicitudes | 0,40 | millón de solicitudes | 2 000 000 solicitudes | https://cloud.google.com/run/pricing | 99,95 % |

El SLA de Azure proviene del documento «Service Level Agreement for Microsoft Online Services (WW)», versión del 1 de noviembre de 2026. La alternativa de Container App mínima usa los precios de Container Apps de la sección 5.1. En GCP, Cloud Run functions se despliega como servicio Cloud Run; aplicarle el SLA de Cloud Run es una lectura de la página de SLA, no una cláusula específica para funciones.

## 6. Acuerdos de nivel de servicio (SLA)

Fuente Azure: «Service Level Agreement for Microsoft Online Services (WW)», versión del 1 de noviembre de 2026 (archivo OnlineSvcsConsolidatedSLA(WW)(English)(November_2026)(CR).docx), descargado de https://www.microsoft.com/licensing/docs/view/Service-Level-Agreements-SLA-for-Online-Services (consulta 2 nov 2026). Fuente GCP: página SLA de cada servicio indicada en la tabla (consulta 2 nov 2026). Los porcentajes son el umbral de disponibilidad mensual por debajo del cual se otorga crédito de servicio.

| Servicio | Azure (Observado) | GCP (Observado) |
|---|---|---|
| VM individual (AP-03b, AP-04) | 99,9 % para VM única con Premium SSD en todos los discos; 99,5 % con Standard SSD; 95 % con Standard HDD | ≥ 99,9 % (instancia única, demás familias), https://cloud.google.com/compute/sla |
| Contenedores (AP-03a) | Container Apps 99,95 % | Cloud Run sin GPU 99,95 %, https://cloud.google.com/run/sla |
| Base de datos (N-04) | PostgreSQL Flexible Server sin HA 99,9 %; en el piloto (Burstable) el SLA excluye las limitaciones propias del nivel Burstable v2; en escala (General Purpose) esa exclusión no aplica | 99,95 % solo con alta disponibilidad; sin HA no hay nivel declarado (NO CONFIRMADO), https://cloud.google.com/sql/sla |
| Objetos (N-05) | Storage Accounts, Hot LRS: 99,9 % lectura y escritura | ≥ 99,9 % (Standard regional), https://cloud.google.com/storage/sla |
| Cola (IT-07) | NO CONFIRMADO para Service Bus Basic en Brazil South: el documento fija 99,9 % para todos los niveles fuera de regiones con zonas de disponibilidad y 99,99 % solo para Premium en regiones con zonas | ≥ 99,95 %, https://cloud.google.com/pubsub/sla |
| Identidad (N-02) | NO CONFIRMADO para Entra External ID, que no figura en el documento; Entra ID Basic y Premium, y Azure AD B2C, figuran con 99,99 % | 99,95 %, https://cloud.google.com/identity-platform/sla |
| Secretos | Key Vault 99,99 % | Secret Manager 99,95 %, https://cloud.google.com/secret-manager/sla |
| VPN | Virtual Network Gateway, SKU distintos de Basic (incluye VpnGw1): 99,95 % | ≥ 99,9 % (Classic VPN), https://cloud.google.com/network-connectivity/docs/vpn/sla |
| Hosting estático (AP-02) | Static Web Apps 99,95 % | NO CONFIRMADO |
| Monitoreo | Azure Monitor: Log Analytics 99,9 % de disponibilidad de consulta; alertas 99,9 % | NO CONFIRMADO |

Para que la VM de Azure tenga el 99,9 %, los discos del sistema operativo y de datos deben ser Premium SSD. Ese disco no está costeado en este anexo, porque los discos de arranque quedaron fuera del alcance.

## 7. Residencia de datos (Ley 1581 de 2012)

Ambas regiones están en Brasil. Los datos personales que saldrían del país son N-01 y las imágenes de personas en el almacén de objetos y en la inferencia (D-04, D-05 y D-13 del inventario de datos).

<!-- reescribir Santiago -->
El proveedor de nube actúa como Encargado del Tratamiento por cuenta de LIRN, que es el Responsable. Por eso el caso típico es una transmisión internacional y no una transferencia. El Decreto 1377 de 2013 define la transferencia como el envío a un receptor que a su vez es Responsable (art. 3, num. 4), y la transmisión como la comunicación de datos para que un Encargado realice el Tratamiento por cuenta del Responsable (art. 3, num. 5). Según el art. 24, las transferencias internacionales deben observar el artículo 26 de la Ley 1581 de 2012 (num. 1). Las transmisiones internacionales entre Responsable y Encargado no necesitan informarse al Titular ni contar con su consentimiento cuando existe un contrato en los términos del art. 25 (num. 2). El art. 25 regula ese contrato de transmisión: alcance del tratamiento, actividades del Encargado y obligaciones mínimas de tratamiento según los principios, seguridad y confidencialidad. Fuente: Función Pública, https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=53646 (consulta 2 nov 2026). Que la transmisión con contrato proceda aunque el país no tenga nivel adecuado declarado se desprende de que el art. 24 remite al artículo 26 de la ley solo para transferencias; es una lectura del texto, no una disposición expresa. El Decreto 1377 de 2013 está compilado en el Decreto Único 1074 de 2015: el art. 24 corresponde al artículo 2.2.2.25.5.1 y el art. 25 al artículo 2.2.2.25.5.2, cuyos textos citan esa procedencia. Fuente: Normograma del Ministerio de Relaciones Exteriores, Decreto 1074 de 2015, https://www.cancilleria.gov.co/sites/default/files/Normograma/docs/decreto_1074_2015_pr026.htm (consulta 2 nov 2026). La página de Función Pública (norma 76608) no respondió a la consulta automática.

Para la transferencia, el artículo 26 de la Ley 1581 de 2012 prohíbe enviar datos a países que no proporcionen niveles adecuados de protección, con las excepciones de los literales a) a f). Su Parágrafo 1 asigna a la Superintendencia de Industria y Comercio la declaración de conformidad, y el artículo 27 trata las normas corporativas vinculantes. Fuente: Función Pública, https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=49981 (consulta 2 nov 2026).

Brasil no figura por nombre en la lista de países con nivel adecuado de protección del numeral 3.2 de la Circular Externa 005 de 2017 de la SIC, ni en su modificación por la Circular Externa 002 de 2018, que añadió Australia y Japón (textos consultados el 2 nov 2026 en https://www.alcaldiabogota.gov.co/sisjur/normas/Norma1.jsp?dt=S&i=70498 y https://normas.cra.gov.co/gestor/docs/circular_superindustria_0002_2018.htm; la sede electrónica de la SIC no se pudo leer). La lista incluye además a los países declarados adecuados por la Comisión Europea; si Brasil tiene esa declaración es NO CONFIRMADO, de modo que su nivel adecuado ante la SIC queda NO CONFIRMADO. Para una transmisión con contrato esto no es condición, según la lectura del art. 2.2.2.25.5.1 expuesta arriba. La condición es igual para Azure y GCP, así que no inclina la decisión. En cualquiera de las dos nubes, el contrato de transmisión con el proveedor debe estar firmado antes de cargar datos personales. Esto es coherente con el pendiente del Entregable del Punto 2: la calificación de Google como Encargado para AP-06 sigue NO CONFIRMADO, y si se elige GCP el mismo análisis de contrato de encargo se extiende a Google Cloud.

## 8. Aislamiento de N-01

Objetivo TO-BE (supuesto de escenario aprobado por Santiago el 2 de noviembre de 2026): N-01 se implementa como un esquema separado dentro de la base de datos gestionada N-04, sin costo adicional, con credenciales y permisos propios y sin acceso desde AP-03a ni AP-03b. La separación se justifica porque N-01 contiene datos personales sujetos a la Ley 1581 y los conteos no. Alternativa: un servicio de base de datos pequeño e independiente para N-01, que no se costea.

## 9. Decisión pendiente de arquitectura: pasarela RTSP en estación

Objetivo TO-BE: cada estación tiene una pasarela RTSP local que publica el video (I-07) hacia AP-03b a través del túnel VPN. Las cámaras USB exigen cómputo en el borde o una pasarela RTSP. El hardware de la pasarela queda fuera de este costeo y se registra como decisión de arquitectura pendiente. Esta solución también mitiga RT-13 (GTX 1050 Ti obsoleta con disco al 85 %), porque la inferencia y el almacenamiento pasan a GPU bajo demanda y almacenamiento de objetos.

## 10. Recomendación

<!-- reescribir Santiago -->
Objetivo TO-BE: se recomienda **GCP southamerica-east1** como opción preferente, sujeta a la decisión de Santiago. Criterios:

1. Costo: GCP es más barato en ambos escenarios (14 % en piloto y 8 % en escala), sobre todo por la VM con GPU y por la VPN sin gateway fijo. La ventaja se reduce cuando crece la salida a Internet, rubro en el que Azure es levemente más barato.
2. Disponibilidad de GPU en la región: ambas ofrecen T4 en São Paulo. GCP documenta T4 en tres zonas, lo que facilita reubicar la carga ante falta de capacidad; la distribución zonal de Azure es NO CONFIRMADO.
3. SLA: en las piezas comparables Azure publica niveles iguales o superiores: VPN (99,95 % frente a 99,9 %), secretos (99,99 % frente a 99,95 %) y base de datos sin HA (99,9 % en Azure; en GCP sin nivel declarado). En GPU, contenedores y objetos ambas quedan empatadas (99,9 %, 99,95 % y 99,9 %). Este criterio favorece levemente a Azure, aunque la diferencia no compensa el costo; si el SLA de la base de datos es requisito, en GCP hay que pasar a Cloud SQL con HA, que no está costeado. La cola y la identidad de Azure siguen NO CONFIRMADO.
4. Ecosistema actual: el ecosistema Microsoft (SharePoint, Outlook) favorece a Azure para identidad corporativa; el ecosistema Google (Forms, Sheets, Fonts) favorece a GCP. El ecosistema no define la decisión.

<!-- reescribir Santiago -->
Si la organización prioriza la integración con Microsoft, Azure es una alternativa viable con un sobrecosto de unos 105 USD/mes en el piloto.
