# Brief para infografía: «A Subway Station Platform Crowd Simulation System»

Este documento es el encargo completo para crear una infografía que acompañe un video de sustentación académica. La infografía debe tener el mismo tono, la misma información y el mismo lenguaje visual que el video. Léelo entero antes de diseñar.

## 1. Contexto

- **Qué es:** pieza de apoyo para la sustentación oral de un artículo científico.
- **Quién sustenta:** Santiago Arias.
- **Artículo:** Xinyu Wang, Hu Su, Tianbao Zhou y Xiyu Miao. «A Subway Station Platform Crowd Simulation System». ICCMS 2022, ACM, pp. 69–75.
- **Público:** jurado y compañeros. Personas que no leyeron el artículo y deben entenderlo de un vistazo.
- **Postura del sustentante:** el artículo vale la pena porque no se queda en el modelo; lo contrasta con una estación real.
- **Idioma:** español.

## 2. Idea central (una frase)

> Los autores simulan cómo cada pasajero elige por qué puerta subir al metro, y validan esa elección contra una estación real.

Pregunta gancho que abre todo: **¿Por qué puerta subimos al metro?**

## 3. Tono

- Conversacional y claro, como alguien que explica a un amigo inteligente. No es un póster de congreso denso.
- Frases cortas de 6 a 12 palabras. Una idea por bloque.
- Conectores de discurso visibles que guían la lectura: *ahora bien*, *en cambio*, *por eso*, *además*, *dicho de otro modo*, *en suma*.
- Busca captar la atención: ganchos grandes, una palabra clave resaltada por bloque y mucho aire.
- Honesto: muestra también la limitación del artículo.

## 4. Contenido (orden narrativo)

Respeta este orden. Son los mismos 10 bloques del video. La infografía puede agrupar los bloques, pero no cambiar el orden ni inventar contenido.

### 01 · Gancho
- **Titular:** ¿Por qué puerta subimos al metro?
- **Apoyo:** Bajan las escaleras, miran las puertas y eligen una. Sin hacer cuentas. Ese gesto automático es lo que el artículo intenta simular.

### 02 · El artículo
- **Autores:** Wang, Su, Zhou y Miao.
- **Datos de publicación:** ICCMS 2022 · ACM · pp. 69–75.

### 03 · El problema
- **Titular:** Ruta fija vs. decide.
- **Apoyo:**
  - En casi todos los simuladores, la gente del andén no decide: sigue una ruta ya dibujada, como fichas.
  - En la vida real, uno mira la fila, la distancia y si alcanza a ver la puerta.
- **Objetivo de los autores:** pasajeros virtuales que elijan solos y que se parezcan a nosotros.

### 04 · El sistema: dos partes
- **Entorno:** la estación modelada en Unity. Se quita lo que no se pisa y se teje una malla **NavMesh** de polígonos convexos. Cada puerta guarda tres datos: dónde está, cuánta fila hay y cuántos caben.
- **Pasajero inteligente:** planea su ruta, cambia de estado y tiene su propia velocidad máxima. No todos corren igual.

### 05 · Cuatro estados
El pasajero siempre está en uno de cuatro estados. Cuando se cumple la condición, cambia de estado y cambia su animación.

| Paso | Estado | Nombre original |
|---|---|---|
| 1 | Baja | DownStair |
| 2 | Busca puerta | FindDoor |
| 3 | Hace fila | QueueUp |
| 4 | Sube | GetCar |

### 06 · Cómo se mueve: A*
- **Fórmula:** \(f(n) = g(n) + h(n)\).
  - **g** es lo que ya costó.
  - **h** es lo que estima que falta.
- Siempre gana el punto con la f más baja: es el camino más barato dentro de la malla.
- Para no atravesarse, cada pasajero lleva un **colisionador cápsula de 0,25 m de radio**.

### 07 · El corazón: cómo elige la puerta
La elección depende de tres factores: **la gente alrededor**, **la distancia** y **si la puerta se ve**. Si la puerta queda en un punto ciego, ni la consideramos.

Los autores probaron dos métodos:

1. **Fórmula ajustada:**
   \[S = (10\cdot\ln(P+e) + \sqrt{L}\cdot 1/M)\cdot K\]
   - P es la fila, L la distancia y M la gente alrededor.
   - K es un factor al azar entre 0,8 y 1,2.
   - Se elige la puerta con la **S más baja**.
2. **TOPSIS:** cada puerta se compara con una puerta ideal y con la peor posible.
   - Visibilidad: si la puerta se ve, vale **1**; si no se ve, vale **0,3**.
   - Gana la puerta con el mejor puntaje.

### 08 · Validación en campo
- **Estación:** Xingye North Street, línea 6 de Chengdu, a las 5:00 p. m.
- Pasaba un tren cada **≈ 4 minutos**.
- Se contaron las **5 puertas** más cercanas a la escalera. La puerta 1 queda detrás de la escalera y **no se ve**.
- Orden de las puertas por distancia a la escalera: 3, 2, 4, 1, 5.
- En la simulación se generó **un pasajero cada 0,7 s**, igual que en la estación real.

### 09 · Resultado
- **Con la fórmula:** la gente se reparte demasiado pareja, y el método no castiga a la puerta que no se ve.
- **Con TOPSIS:** se probaron tres juegos de pesos (distancia / fila / visibilidad):

  | Pesos | Resultado |
  |---|---|
  | **0,4 / 0,4 / 0,2** | **El más parecido a lo real** |
  | 0,2 / 0,6 / 0,2 | Menos parecido |
  | 0,6 / 0,2 / 0,2 | Menos parecido |

- **Dicho de otro modo:** si hay mucha cola, caminamos más lejos; y la puerta que no vemos, aunque esté cerca, no existe.

### 10 · Cierre
- **En suma:** un sistema completo que reúne A*, colisionador y una elección contrastada con la calle.
- **Limitación honesta:** los pasajeros van sueltos. No van en grupos de dos y no hay fuerzas sociales.
- **Lo más relevante:** una simulación vale lo que vale su validación.
- **Idea propia** (no está en el artículo): esto sirve para pensar en TransMilenio o en el metro de Bogotá.

## 5. Reglas de datos (obligatorias)

- Usa solo los datos de la sección 4. No inventes cifras, porcentajes, KPIs ni conclusiones.
- Cualquier gráfico de curvas o reparto por puerta es **ilustrativo**. El artículo no entrega esas curvas exactas; etiquétalo así: «ilustrativo · 0–240 s».
- El plano del andén es un **esquema**; etiquétalo «esquema». No es un plano real de la estación.
- TransMilenio y Bogotá aparecen **solo** con la etiqueta «idea propia». No se presentan como un hallazgo del artículo.
- Escribe TOPSIS siempre en mayúsculas.
- Usa coma decimal: 0,25 m, 0,7 s, 0,4, 0,3, entre 0,8 y 1,2.
- No menciones marcas, empresas ni productos ajenos al artículo, y no inventes logos, patrocinadores ni instituciones.
- No incluyas datos que el video omitió a propósito: universidades de los autores, Chongqing, el área de 0,198 m ni el detalle interno de DoorManager.

## 6. Sistema visual

### 6.1 Mundo visual
Inspírate en la señalética de metro: mapas de líneas, estaciones como círculos, rótulos tipo andén y planos cenitales simples. El estilo es moderno, plano y gráfico, cercano al diseño suizo (Unimark).

### 6.2 Paleta
El video usa cinco temas y alterna fondos oscuros y claros para dar ritmo. En la infografía, cada bloque o grupo de bloques puede tomar un tema; usa como máximo 3 o 4 temas para no fragmentarla.

| Tema | Fondo | Superficie | Línea | Texto | Secundario | Acento | Alterno | Validación |
|---|---|---|---|---|---|---|---|---|
| Noche | `#0A1F2E` | `#11324A` | `#2B5370` | `#F3F9FD` | `#8EAAC0` | `#00A8FF` | `#FFB547` | `#34D399` |
| Blanco | `#FFFFFF` | `#EEF1F4` | `#CDD3DA` | `#000000` | `#6B7280` | `#0094E0` | `#F2643A` | `#1F8A5B` |
| Aire | `#F3F9FD` | `#DDEBF5` | `#B4CEE1` | `#0A1A26` | `#587083` | `#0B7BC0` | `#F2643A` | `#1F8A5B` |
| Azul | `#1480B8` | `#1F8FC8` | `#5AAEDB` | `#FFFFFF` | `#CBE6F5` | `#FFD166` | `#0A1F2E` | `#B6F5D3` |
| Profundo | `#0B4F78` | `#135E8C` | `#3E7FA8` | `#F3F9FD` | `#A9CBE0` | `#FF8A5B` | `#7FDBFF` | `#5EEAA8` |

Asignación usada en el video:

| Tema | Bloques |
|---|---|
| Noche | 01 Gancho, 06 A*, 10 Cierre |
| Blanco | 02 El artículo, 05 Estados, 09 Resultado |
| Aire | 03 Problema, 07 Corazón |
| Azul | 04 Sistema |
| Profundo | 08 Campo |

Uso de cada rol de color:

- **Acento:** solo para lo importante ahora. Como máximo una o dos cosas por bloque, por ejemplo la palabra clave, la puerta elegida o el pasajero protagonista.
- **Alterno:** para la contraparte. Por ejemplo, la puerta «peor» en TOPSIS o los nodos explorados por A*.
- **Validación (verde):** reservado para el resultado 0,4 / 0,4 / 0,2.
- **Bandas de transición:** negro `#000000` y azul `#00A8FF`. Sirven como separadores entre secciones.

### 6.3 Tipografía
- **Inter Tight 600:** titulares y ganchos. Grandes, con tracking negativo (≈ −0,035 em).
- **Inter Tight 400:** texto de apoyo.
- **JetBrains Mono:** números, fórmulas, etiquetas pequeñas en MAYÚSCULAS con tracking amplio (por ejemplo, «ESQUEMA» o «ILUSTRATIVO · 0–240 S»), y números de bloque (01…10).
- **Fórmulas:** compuestas con estilo matemático (tipo KaTeX/LaTeX).
- **Jerarquía:** gancho ≈ 2× el apoyo y etiqueta ≈ ⅓ del apoyo. Usa tres niveles como máximo por bloque.

### 6.4 Énfasis
- La palabra o frase clave de cada bloque va en color acento con un **subrayado grueso** del mismo color, nunca con negrita extra ni cajas.
- Ejemplos: «¿Por qué puerta **subimos** al metro?», «Ruta fija **vs.** decide», «colisionador cápsula de **0,25 m**», «la puerta que no vemos **no existe**».

### 6.5 Elementos gráficos recurrentes
- **Línea de metro de progreso:** una línea horizontal con 10 estaciones (círculos) que numera y ordena los bloques. Las estaciones recorridas van rellenas y la actual lleva un anillo en acento. Puede funcionar como el eje vertical u horizontal de toda la infografía.
- **Insignia de bloque:** un círculo en acento con el número del bloque (01…10) y su título al lado.
- **Plano del andén (esquema cenital):**
  - Un rectángulo de superficie con el borde del tren como línea gruesa abajo.
  - Una escalera con peldaños arriba a la izquierda.
  - Cinco puertas marcadas como trazos cortos numerados del 1 al 5; la puerta 1 queda detrás de la escalera, atenuada.
  - Los pasajeros son puntos y el elegido va en acento.
- **Línea de visión:** un trazo fino que se corta en la escalera y sigue punteado hacia la puerta 1, para mostrar que no se ve.
- **Cadena de estados:** cuatro rótulos en fila (Baja → Busca → Hace fila → Sube), con el nombre original en mono debajo y una barra de acento bajo el estado activo.
- **A*:** cuadrícula fina sobre el andén, celdas exploradas en color alterno y el camino final en acento.
- **Cápsula:** un círculo de trazo en acento alrededor de un pasajero, rotulado «r = 0,25 m».
- **TOPSIS:** líneas finas desde cada puerta hacia dos puntos, «ideal» en acento y «peor» en color alterno.
- **Ficha de estación:** un círculo en acento con el «6», el nombre «Xingye North Street» y los datos en mono: Línea 6 · Chengdu · tren ≈ 4 min · 5 puertas · 5:00 p. m.
- **Gráficos pequeños (small multiples):** tres gráficos idénticos lado a lado, uno por juego de pesos. El de 0,4 / 0,4 / 0,2 va en verde de validación y los otros dos atenuados. Etiqueta «ilustrativo».

### 6.6 Composición
- **Mucho aire:** márgenes amplios (≈ 5 % del ancho).
- **Un protagonista por bloque:** un gancho grande o un diagrama grande, nunca los dos compitiendo.
- **Variedad de layout entre bloques**, como en el video: un bloque con el texto a la izquierda y el diagrama a la derecha, el siguiente al revés, y luego un gancho centrado a todo ancho.
- **Regla de tercios** para ubicar los focos.
- **Alineación a una retícula clara;** los diagramas se alinean al borde del texto.

## 7. Qué evitar

- Brillos (glow), degradados, neón, sombras fuertes, 3D o tarjetas con bordes de colores.
- Emojis o íconos de stock genéricos.
- Fondos con cuadrícula decorativa a pantalla completa. La cuadrícula solo aparece dentro del bloque de A*.
- Párrafos largos. Si una idea necesita más de dos líneas, divídela.
- Más de dos colores de acento por bloque.
- Presentar la «idea propia» como resultado del artículo.

## 8. Formatos sugeridos

- **Vertical larga** (1080 × 4000–6000 px): recorre los 10 bloques de arriba abajo, con la línea de metro como columna vertebral.
- **Horizontal tipo póster** (16:9 o A3 apaisado): seis módulos.
  1. Gancho y artículo.
  2. Problema.
  3. Sistema y estados.
  4. A* y elección de puerta.
  5. Campo y resultado.
  6. Cierre.

## 9. Lista de comprobación final

- [ ] La pregunta gancho es lo primero que se lee.
- [ ] Los 10 bloques están en orden, con su número.
- [ ] Hay una palabra clave resaltada por bloque.
- [ ] Las dos fórmulas aparecen bien escritas.
- [ ] Los datos de campo son exactos: Xingye North Street, línea 6 de Chengdu, 5:00 p. m., tren cada ≈ 4 min, 5 puertas, puerta 1 no visible y un pasajero cada 0,7 s.
- [ ] El resultado 0,4 / 0,4 / 0,2 va destacado en verde.
- [ ] La limitación aparece: pasajeros sueltos, sin grupos ni fuerzas sociales.
- [ ] Llevan su etiqueta: «esquema» en los planos, «ilustrativo» en las curvas e «idea propia» en TransMilenio/Bogotá.
- [ ] Coma decimal y TOPSIS en mayúsculas en todo el texto.
- [ ] Solo se usan colores de la paleta, sin degradados ni brillos.
