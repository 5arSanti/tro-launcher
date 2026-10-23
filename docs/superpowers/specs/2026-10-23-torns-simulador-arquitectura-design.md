# Diseño: base técnica del simulador de arquitecturas TORNS

Fecha: 2026-10-23  
Estado: aprobado  
Curso: Ingeniería Aplicada, Universidad Libre, Actividad 9 (2026-2)  
Alcance: requisitos 1 a 4 de la guía (ficha de proyecto, tres alternativas, tres entradas, modelo computacional). Es la base para que otro integrante programe el aplicativo. No cubre interfaz, gráficos, alojamiento ni acoplamiento a `tro-backend`.

Los resultados del modelo son **estimaciones**. No son mediciones de un laboratorio ni de un operador.

## 1. Propósito

Comparar tres formas de desplegar el **mismo** prototipo TORNS y recomendar una, con reglas reproducibles.

No se simula la regla de trenes `⌈N/C⌉`. Esa regla es contexto del producto. El objeto de comparación es la arquitectura de despliegue.

LIRN es la firma. TORNS es el único producto. Equipo actual: Johel Arias. Transmilenio es caso de estudio, no cliente. TORNS es prototipo aplicado, no piloto firmado.

## 2. Contrato para quien programa

El motor es un conjunto de funciones puras. No llama a YOLO, ni a FastAPI, ni a cámaras.

**Entrada de un escenario**

| Campo | Tipo | Rango |
|-------|------|--------|
| `K` | entero | 1 a 20 |
| `E` | booleano | `false` = no cifrar, `true` = hay que cifrar |
| `F` | entero | 1 a 15 |

Si `K` o `F` no son enteros o salen del rango, o `E` no es sí/no, el motor no calcula y devuelve el error en lenguaje natural (qué campo y cuál rango válido).

**Salida por cada alternativa:** capacidad `C`, ocupación `ρ`, latencia `L`, escalabilidad `S`, disponibilidad `A`, cumple cifrado, usa contenedores, elegible, puntaje (o vacío si no es elegible).

**Salida global:** alternativa recomendada, o “ninguna elegible” con la lista de umbrales fallidos.

Escenario de referencia: `K = 2`, `E = false`, `F = 5`.

Regla de lenguaje: cada etiqueta de pantalla y cada nombre de variable visible debe ir con una frase en español que la explique. No se asume que el evaluador sepa qué es MJPEG, ρ o TLS.

## 3. Glosario

| Término | En lenguaje natural |
|---------|---------------------|
| Arquitectura | Cómo se parte el software y en qué máquina corre cada pieza. |
| Detector / inferencia | El modelo de visión que mira cada cuadro y cuenta personas. |
| API | El servicio que entrega video, conteo y recomendación a la pantalla del operador. |
| Cuadro | Una imagen suelta del video. |
| Stream MJPEG | El video en vivo, cuadro tras cuadro, que la pantalla muestra como una imagen que se actualiza. |
| Contenedor | Caja de software que aísla un programa para arrancarlo o copiarlo sin mezclarlo con el resto. |
| Borde | Un equipo junto a la cámara, en la estación, no en el computador del centro de control. |
| Cifrar | Hacer que el video no viaje legible por la red. “En claro” es lo contrario: viaja legible. |
| `K` | Cámaras analizadas al mismo tiempo. |
| `E` | Si el escenario exige proteger el video de personas. |
| `F` | Cuántas veces por segundo se analiza el video. |
| Carga `Λ` | Cuadros por segundo a analizar: `Λ = K × F`. |
| Capacidad `C` | Cuadros por segundo que esa arquitectura puede analizar. |
| Ocupación `ρ` | Qué tan llena está la máquina: carga del cuello de botella dividida por `C`. Si `ρ ≥ 1`, no da abasto. |
| Latencia `L` | Milisegundos desde el cuadro hasta que el operador ve el conteo. |
| Escalabilidad `S` | Cuántas cámaras aguantaría esta arquitectura a este `F` sin saturarse. |
| Disponibilidad `A` | Porcentaje estimado de tiempo en que el conteo sigue saliendo. |
| Elegible | Pasa los dos requisitos obligatorios. |
| Punto único de fallo | Si esa pieza se cae, se cae todo el conteo. |

## 4. Requisito 1 — Ficha del proyecto

El aplicativo registra estos valores. Pueden mostrarse como ficha de solo lectura. No son las palancas `K`, `E`, `F`.

### 4.1 Características

- Firma LIRN. Producto único TORNS.
- Función: detectar demanda en estación con visión por computadora y recomendar oferta al centro de control.
- AS-IS observado: FastAPI y YOLO11s (`my_model.pt`, clase `person`, umbral 0,5) en el mismo proceso; video anotado por MJPEG; métricas por WebSocket; regla de despacho `⌈N/C⌉` con capacidades 5, 10 y 15 (contexto de producto, no objeto de esta simulación).
- Caso de estudio: Transmilenio. No es cliente ni piloto firmado.
- Equipo: Johel Arias, una persona. Sin granja GPU de producción.

### 4.2 Usuarios previstos (del producto TORNS)

- Primario: personal de centro de control o despacho.
- Secundario: evaluador académico en demostración guiada.
- El usuario del simulador es el equipo del curso: configura escenarios, no opera trenes.

### 4.3 Requisitos de calidad

| Código | Requisito | Tipo |
|--------|-----------|------|
| RQ-01 | Latencia de recomendación ≤ `L_max = 1000` ms | Obligatorio |
| RQ-02 | Si `E` es verdadero, el video de personas no viaja en claro | Obligatorio |
| RQ-03 | Escalabilidad con `K` cámaras concurrentes | Puntuado |
| RQ-04 | Capacidad de inferencia frente a la carga `K × F` | Puntuado |
| RQ-05 | Disponibilidad estimada del servicio de detección | Puntuado |
| RQ-06 | Empaquetado en contenedores | Puntuado (se muestra; no descalifica) |

`L_max = 1000` ms es parámetro de diseño del taller: el operador debe ver el conteo cerca del tiempo real. No es un SLA medido.

### 4.4 Restricciones

- Sin integración al control real de un operador y sin cámaras de campo en producción.
- Imagen de personas en video: Ley 1581 de 2012; el prototipo no identifica ni hace biometría.
- AS-IS: abrir el stream dispara la inferencia; sin stream no hay conteo en vivo.
- Sin autenticación de operador.
- Toda salida del simulador se etiqueta como estimación del modelo.

## 5. Requisito 2 — Tres alternativas

Las tres montan el mismo TORNS. Se evalúan con las mismas `K`, `E` y `F`.

**Alternativa 1 — Proceso único local (lo que hay hoy).**  
Todo corre junto en el computador del fundador: detector, API y recomendación. El conteo solo existe si alguien tiene abierto el video. No hay copias del detector. No cifra el video. Si ese computador se apaga, no hay sistema.

**Alternativa 2 — Servicios en contenedores.**  
El detector va en una caja; la API y la recomendación van en otra. El conteo ya no depende de que alguien mire el video. Se pueden arrancar hasta 4 copias del detector. El video anotado sigue viajando al centro de control; si piden cifrado, viaja protegido.

**Alternativa 3 — Inferencia en el borde.**  
El detector corre junto a la cámara, en la estación. Al centro de control solo llega el número de personas (un mensaje corto). El video de personas no cruza esa red. Cada estación carga su propia cámara.

## 6. Requisito 3 — Variables de entrada

| Variable | Pregunta en pantalla | Rango | Por qué existe | Qué mueve |
|----------|----------------------|-------|----------------|-----------|
| `K` | ¿Cuántas cámaras hay que analizar al mismo tiempo? | entero 1–20 | TORNS se ofrece a un sistema con varias estaciones; el prototipo de hoy las atiende en un solo proceso | Más cámaras suben la carga. En la 1 la espera crece de golpe. En la 2 se copian detectores. En la 3 cada estación carga la suya |
| `E` | ¿Hay que cifrar el video de personas? | no / sí | Las cámaras captan imagen de personas (Ley 1581). El prototipo hoy mueve video anotado | Si es sí, la 1 queda fuera. La 2 paga recargo de tiempo. La 3 casi no mueve video |
| `F` | ¿Cuántos cuadros por segundo se analizan? | entero 1–15 | El prototipo mira cuadro a cuadro; esa cadencia es el ritmo de YOLO | Sube la carga `K × F`, baja la holgura y puede saturar |

Justificación conjunta: las tres palancas cambian latencia, capacidad, escalabilidad, disponibilidad y cifrado de forma distinta en cada arquitectura. Por eso la comparación es verificable y no es una recomendación prefijada.

## 7. Requisito 4 — Modelo

### 7.1 Constantes (fijas; el usuario no las mueve)

Estos milisegundos no se midieron en laboratorio. Son parámetros del taller.

| Clave | Significado | Valor |
|-------|-------------|-------|
| `T_CPU` | Tiempo de analizar un cuadro en un PC de escritorio | 80 ms |
| `T_EDGE` | Tiempo de analizar un cuadro en el equipo de estación | 110 ms |
| `NET_1` | Demora de red cuando el video vive en el mismo PC | 20 ms |
| `NET_2` | Demora de red del video entre contenedores | 50 ms |
| `NET_3` | Demora de red de un mensaje corto (solo el número) | 12 ms |
| `TLS_VIDEO` | Recargo por cifrar el video | 25 ms |
| `TLS_JSON` | Recargo por cifrar el mensaje corto | 4 ms |
| `R_MAX` | Copias máximas del detector en la alternativa 2 | 4 |
| `A_BASE_1` | Disponibilidad base, PC único | 93 |
| `A_BASE_2` | Disponibilidad base, contenedores | 97 |
| `A_BASE_3` | Disponibilidad base, borde | 94 |
| `L_SAT` | Latencia si no da abasto | 10000 ms |
| `L_MAX` | Tope obligatorio | 1000 ms |
| `A_PISO` | Disponibilidad mínima mostrada | 50 |

Capacidad de un detector de escritorio: `C_CPU = 1000 / T_CPU = 12,5` cuadros/s.  
Capacidad de un detector de borde: `C_EDGE = 1000 / T_EDGE = 1000 / 110` cuadros/s.

### 7.2 Orden de cálculo (por alternativa)

1. Calcular `C`.
2. Calcular `ρ`.
3. Calcular cumplimiento de cifrado y uso de contenedores.
4. Si `ρ ≥ 1`: `L = 10000` y `A = max(A_PISO, A_base − 15)`.  
   Si `ρ < 1`: usar las fórmulas de latencia y disponibilidad de abajo.
5. `S = ⌊C / F⌋` (entero; división real antes del piso).
6. Elegible si `L ≤ 1000` **y** cumple cifrado.
7. Puntaje solo si es elegible.

Usar números de punto flotante. No redondear hasta mostrar:

- `L`: entero más cercano.
- `C`: dos decimales.
- `ρ`: cuatro decimales.
- `A`: un decimal.
- Puntaje: cuatro decimales para mostrar, con el redondeo de Python (`round`, mitad al par). El ganador se decide con el valor sin redondear.

### 7.3 Capacidad `C` (cuadros/s)

- Alt. 1: `C = 12,5`
- Alt. 2: `C = min(K, 4) × 12,5`
- Alt. 3: `C = K × (1000 / 110)`

### 7.4 Ocupación `ρ`

- Alt. 1 y 2 (el centro procesa el video de todas las cámaras): `ρ = (K × F) / C`
- Alt. 3 (cada estación procesa la suya): `ρ = F / (1000 / 110)` que es `F × 110 / 1000`

### 7.5 Latencia `L` (ms), solo si `ρ < 1`

`L = tiempo_de_análisis + demora_de_red + recargo_de_cifrado`

- Alt. 1: análisis = `80 × K`. Red = 20. Recargo = 0 siempre (esta alternativa no cifra; no hay TLS que sumar).
- Alt. 2: análisis = `80 × ⌈K / min(K, 4)⌉`. Red = 50. Recargo = 25 si `E`, si no 0.
- Alt. 3: análisis = 110. Red = 12. Recargo = 4 si `E`, si no 0.

`⌈x⌉` es el entero mayor o igual más cercano. Con `K` y `R = min(K, 4)` enteros, `⌈K / R⌉` es el techo de la división real.

### 7.6 Cifrado (RQ-02)

- Si `E` es falso: las tres cumplen (no pidieron proteger el video).
- Si `E` es verdadero:
  - Alt. 1: no cumple (el prototipo manda el video en claro y aquí no hay cifrado).
  - Alt. 2: cumple (cifra el video).
  - Alt. 3: cumple (el video no sale de la estación).

### 7.7 Disponibilidad `A` (%)

- Si `ρ < 1`: `A = A_base − 20 × max(0, ρ − 0,7)`
- Si `ρ ≥ 1`: `A = A_base − 15`
- Luego: `A = max(50, A)`

En limpio: por encima del 70 % de ocupación el servicio puntual empieza a degradarse. Si satura, se resta un bloque fijo.

### 7.8 Contenedores (RQ-06)

Alt. 1: no. Alt. 2: sí. Alt. 3: no. Se muestra. No descalifica.

### 7.9 Puntaje y recomendación

Solo alternativas elegibles.

```
N_L = max(0, (1000 − L) / 1000)
N_A = A / 100
N_S = min(1, S / 20)
N_C = min(1, C / 50)
complejidad = 0 si alt. 1; 0,03 si alt. 2; 0,02 si alt. 3

puntaje = 0,35×N_L + 0,25×N_A + 0,20×N_S + 0,15×N_C − complejidad
```

La resta de complejidad evita recomendar más piezas cuando un solo PC basta.

Recomendación: mayor puntaje entre elegibles. Empate: menor `L`. Si sigue el empate: menor número de alternativa (1 antes que 2).  
Si ninguna es elegible: no hay ganadora; listar, por alternativa, si falló latencia, cifrado o ambas.

### 7.10 Ejemplos reproducibles

**Referencia: `K = 2`, `E = no`, `F = 5`**

| Indicador | Alt. 1 | Alt. 2 | Alt. 3 |
|-----------|--------|--------|--------|
| `C` | 12,50 | 25,00 | 18,18 |
| `ρ` | 0,8000 | 0,4000 | 0,5500 |
| `L` | 180 ms | 130 ms | 122 ms |
| `S` | 2 | 5 | 3 |
| `A` | 91,0 % | 97,0 % | 94,0 % |
| Cifrado | cumple | cumple | cumple |
| Elegible | sí | sí | sí |
| Puntaje | 0,5720 | 0,6420 | 0,6068 |

Recomendación: **alternativa 2**.

Detalle alt. 1: `L = 80×2 + 20 = 180`. `A = 93 − 20×(0,8 − 0,7) = 91`.  
`N_L = 0,82`; `N_A = 0,91`; `N_S = 0,10`; `N_C = 0,25`.  
Puntaje = `0,35×0,82 + 0,25×0,91 + 0,20×0,10 + 0,15×0,25 = 0,5720`.

Detalle alt. 2: `R = 2`; análisis = `80×⌈2/2⌉ = 80`; `L = 80 + 50 = 130`. `A = 97`.  
`N_L = 0,87`; `N_A = 0,97`; `N_S = 0,25`; `N_C = 0,50`.  
Puntaje = `0,35×0,87 + 0,25×0,97 + 0,20×0,25 + 0,15×0,50 − 0,03 = 0,6420`.

Detalle alt. 3: `C = 2000/110 ≈ 18,1818`. `L = 110 + 12 = 122`. `A = 94`.  
`N_L = 0,878`; `N_A = 0,94`; `N_S = 0,15`; `N_C ≈ 0,3636`.  
Puntaje = `0,35×0,878 + 0,25×0,94 + 0,20×0,15 + 0,15×(2000/110/50) − 0,02 ≈ 0,6068`.

**`K = 1`, `E = no`, `F = 5` — gana la 1**

| | Alt. 1 | Alt. 2 | Alt. 3 |
|---|--------|--------|--------|
| `L` | 100 | 130 | 122 |
| `S` | 2 | 2 | 1 |
| `A` | 93,0 | 97,0 | 94,0 |
| Puntaje | 0,6050 | 0,5745 | 0,5596 |

**`K = 1`, `E = sí`, `F = 5` — la 1 queda fuera; gana la 2**

Alt. 1: no cumple cifrado (no elegible). `L` sigue siendo 100; el fallo es el cifrado, no la latencia.  
Alt. 2: `L = 80 + 50 + 25 = 155`; `A = 97,0`; puntaje = 0,5657.  
Alt. 3: `L = 110 + 12 + 4 = 126`; `S = 1`; `A = 94,0`; puntaje = 0,5582.

**`K = 8`, `E = sí`, `F = 5` — gana la 3**

Alt. 1: no cumple cifrado; además `ρ = 40/12,5 = 3,2 ≥ 1`, `L = 10000`.  
Alt. 2: `C = 50`; `ρ = 0,8000`; `L = 80×2 + 50 + 25 = 235`; `S = 10`; `A = 95,0`; puntaje = 0,7252.  
Alt. 3: `C ≈ 72,73`; `ρ = 0,5500`; `L = 126`; `S = 14`; `A = 94,0`; puntaje ≈ 0,8109.

**`K = 1`, `E = no`, `F = 15` — ninguna elegible**

Las tres saturan (`ρ ≥ 1`, `L = 10000`): un detector de escritorio aguanta 12,5 cuadros/s y uno de borde aguanta ≈ 9,09. Ninguna pasa RQ-01.

### 7.11 Cinco pruebas mínimas (para el requisito 10 de la guía, ya con oráculo)

1. Entrada inválida `K = 0`: no calcula; mensaje que cite el rango 1–20.
2. Referencia `K = 2`, `E = no`, `F = 5`: tabla de 7.10 y ganadora 2.
3. `K = 1`, `E = no`, `F = 5`: ganadora 1; `L` alt. 1 = 100.
4. `K = 1`, `E = sí`, `F = 5`: alt. 1 no elegible por cifrado; ganadora 2.
5. `K = 1`, `E = no`, `F = 15`: ninguna elegible por latencia.

## 8. Supuestos y limitaciones

- Los tiempos 80 ms y 110 ms son parámetros del taller, no una medición de `my_model.pt`.
- No hay azar ni colas reales: si satura, la latencia se marca 10 000 ms.
- El modelo no simula la regla de trenes ni el recall 0,55 del detector.
- No afirma que un operador vaya a observar estos milisegundos.
- Para validar en un sistema real haría falta medir tiempo de inferencia por cuadro, tiempo de red con y sin cifrado, y tiempo de caída del computador o de los contenedores, en el hardware de destino.

## 9. Fuera de este spec

Requisitos 5 a 12 de la guía (tres escenarios en la interfaz, gráficos, recomendación explicable en pantalla, web adaptable a celular, cinco pruebas documentadas, manual y sustentación). El modelo de la sección 7 ya produce lo que esos requisitos necesitan: escenario de referencia, cuatro indicadores cuantificables (`L`, `C`, `S`, `A`), comparación bajo las mismas entradas y recomendación con criterios explícitos.

## 10. Decisiones bloqueadas

1. Objeto: arquitecturas de despliegue de TORNS, no el despacho de trenes.
2. Alternativas: proceso único local, servicios en contenedores, inferencia en el borde.
3. Entradas: `K`, `E`, `F`.
4. Motor: analítico determinista, no simulación discreta ni matriz cualitativa.
5. Umbrales duros: `L ≤ 1000` ms y cifrado si `E`.
6. Toda etiqueta visible se explica en lenguaje natural.
