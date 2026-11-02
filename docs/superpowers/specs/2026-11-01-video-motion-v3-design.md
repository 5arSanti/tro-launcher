# Video motion v3 — señalética en papel, 6:00

Spec de diseño aprobada (arco, piel, cuadro completo, frases gancho). Guion revisado: tono conversacional y conectores de discurso (ahora bien, en cambio, por eso, además, en suma, dicho de otro modo). No se implementa hasta que esta spec se confirme.

## Intención

Sustentación de 6:00 del artículo Wang, Su, Zhou y Miao (ICCMS 2022). Motion a cuadro completo, sin hueco de cámara. Santiago graba voz y monta su toma aparte. Energía: explainer promocional con golpes de tipo cinético. Mundo visual: mapa de metro impreso en papel (Unimark claro), no el negro técnico de v2.

## Decisiones cerradas

- Duración 6:00 (360 s, 10 800 fotogramas a 30 fps). Diez bloques, no once.
- Una frase gancho por idea (6–12 palabras). La voz lleva el resto.
- Paleta clara de papel. Acento naranja de línea.
- Sin audio en el render. 1920×1080, H.264, yuv420p.
- Datos solo de la hoja del artículo. Curvas de resultados: **ilustrativo**. Andén: **esquema**. TransMilenio / metro de Bogotá: **idea propia**.
- TOPSIS en mayúsculas. Coma decimal. Fórmulas: \(f(n)=g(n)+h(n)\); \(S=(10\cdot\ln(P+e)+\sqrt{L}\cdot 1/M)\cdot K\).

## Lo que no vuelve

- Tercio derecho vacío.
- Fondo `#111315`, glow, auroras, tarjetas con borde de color, emojis, 3D, rebotes en texto.
- Guion de 8:50. Párrafos de universidades, Chongqing, área 0,198 m, recitado entero de DoorManager.

## Paleta

| Rol | Hex | Uso |
|---|---|---|
| Papel | `#F4EFE6` | Fondo plano |
| Tinta | `#1A1916` | Títulos y pasajeros |
| Secundario | `#6F6A62` | Metadatos |
| Línea | `#C9C2B6` | Bordes, ejes |
| Superficie | `#E8E2D6` | Andén |
| Acento | `#E5481C` | Lo importante ahora (máx. 1–2) |
| Frío | `#2F5BFF` | Alternativa / nodos abiertos A* |
| Validación | `#1F7A52` | Pesos 0,4 / 0,4 / 0,2 |

Tipo: Inter Tight 600 (gancho 72–96 px), Inter Tight 400 (apoyo), JetBrains Mono (números, fórmulas, índice de escena).

Movimiento: entradas `cubic-bezier(0.16, 1, 0.3, 1)` 12–16 f, máscara abajo→arriba. Cámara: un empujón o paneo por bloque, `cubic-bezier(0.65, 0, 0.35, 1)` 24–36 f. Pasajeros a velocidad constante. Tras cada gancho, 1 s de quietud.

## Arquitectura de implementación

Proyecto Remotion existente en `video-v2/`. Nueva piel (tokens claros), diez composiciones `Escena01`…`Escena10` más `Completo`, duraciones exactas de la tabla. Reutilizar geometría del andén (`src/lib/platform.ts`, A*, fórmula S y TOPSIS). Entrega en `video-v2/out/` (clips, concatenado, hojas de contacto).

## Bloques (voz canónica)

Ritmo 130 ppm. Total ≈ 780 palabras.

### 01 · 0:00–0:35 (35 s, 1050 f) · Gancho

**Pantalla:** ¿Por qué puerta subimos al metro?

Bajan las escaleras, miran las puertas y eligen una. Sin hacer cuentas. ¿Por qué esa, y no la de al lado? Justamente ese gesto, tan automático que casi no lo vemos, es lo que este artículo intenta simular. Soy Santiago Arias, y vengo a sustentar «A Subway Station Platform Crowd Simulation System». Desde ya, mi postura: vale la pena, porque no se quedan en el modelo; lo contrastan con una estación de verdad.

**Visual:** andén esquema, un punto baja, pausa, elige puerta 3 (acento). Cámara: empujón suave al andén.

### 02 · 0:35–0:55 (20 s, 600 f) · El paper

**Pantalla:** Wang, Su, Zhou y Miao · ICCMS 2022

El artículo lo firman Xinyu Wang, Hu Su, Tianbao Zhou y Xiyu Miao. Se presentó en ICCMS 2022 y lo publicó la ACM, páginas 69 a 75. Ahora bien, antes de entrar al método, conviene el problema.

**Visual:** título del paper por líneas (máscara); meta en mono: ICCMS 2022 · ACM · pp. 69–75.

### 03 · 0:55–1:30 (35 s, 1050 f) · Problema

**Pantalla:** Ruta fija vs. decide

El problema se entiende de inmediato. En casi todos los simuladores, la gente del andén no decide: sigue una ruta ya dibujada, como fichas. En cambio, en la vida real uno mira la fila, la distancia y si alcanza a ver la puerta. Por eso, los autores quieren pasajeros virtuales que elijan solos, y que esas elecciones se parezcan a las nuestras.

**Visual:** dos andenes. A: fila absurda a una puerta. B: se reparte. Zoom hacia B.

### 04 · 1:30–2:05 (35 s, 1050 f) · Sistema

**Pantalla:** Entorno y pasajero inteligente

Para lograrlo, el sistema se parte en dos. Por un lado, el entorno: toma la estación en Unity, quita lo que no se pisa y teje una malla NavMesh de polígonos convexos. Ahí vive cada puerta: dónde está, cuánta fila hay, cuántos caben. Por el otro, el pasajero inteligente: planea, cambia de estado y no todos corren igual. De hecho, cada uno trae, por ejemplo, su propia velocidad máxima.

**Visual:** dos rótulos ligados por una línea que se dibuja; NavMesh trazo a trazo; puntos a distinta velocidad.

### 05 · 2:05–2:35 (30 s, 900 f) · Cuatro estados

**Pantalla:** Baja, busca, hace fila, sube

Ese pasajero, con todo, no improvisa. Siempre está en uno de cuatro estados. Primero baja. Luego busca puerta. Después hace fila. Por último, cuando llega el tren, se sube. En cuanto se cumple la condición, cambia el estado y cambia la animación.

**Visual:** cuatro nodos; activo en acento; pasajero sincronizado. Nombres EN en mono: DownStair, FindDoor, QueueUp, GetCar.

### 06 · 2:35–3:10 (35 s, 1050 f) · A*

**Pantalla:** f(n) = g(n) + h(n)

Para moverse, usa A*: el camino más barato dentro de la malla. La fórmula es f(n) igual a g(n) más h(n): g es lo que ya costó; h, lo que estima que falta. Así, siempre gana el punto con f más bajo. Además, para no atravesarse, cada uno lleva un colisionador cápsula de 0,25 metros de radio.

**Visual:** A* real (expansión abierta en frío, camino en acento). Términos de la fórmula se encienden al nombrarlos. Luego r = 0,25 m.

### 07 · 3:10–4:25 (75 s, 2250 f) · Corazón

**Pantalla, en orden:** Cómo se escoge la puerta → S, la más baja gana → TOPSIS

Y aquí viene, para mí, el corazón. ¿Cómo se escoge la puerta? La elección depende de la gente alrededor, de la distancia y de si se ve. Si queda en un punto ciego, ni la consideramos. Con eso, probaron dos maneras. La primera es una fórmula: S junta el logaritmo de la fila, la raíz de la distancia y la gente alrededor, y lo multiplica por un K al azar, entre 0,8 y 1,2. Se elige la de S más bajo. La segunda es TOPSIS: cada puerta se mide contra la ideal y contra la peor. Si se ve, vale 1; si no, 0,3. Al final, gana la de mejor puntaje.

**Visual:** visibilidad 0,3 en puerta 1; fórmula término a término; K en [0,8 ; 1,2]; TOPSIS con líneas al ideal. Números de ejemplo: ilustrativo.

### 08 · 4:25–5:00 (35 s, 1050 f) · Campo

**Pantalla:** Xingye North Street, 5:00 p. m.

Para comprobarlo, se fueron a campo: Xingye North Street, línea 6 de Chengdu, las cinco de la tarde. En ese momento pasaba un tren cada cuatro minutos, más o menos, y contaron las cinco puertas más cercanas a la escalera. La uno, además, queda atrás: no se ve. Luego, en la simulación, generaron un pasajero cada 0,7 segundos, igual que allá.

**Visual:** ficha de estación (Línea 6, tren ≈ 4 min, 5 puertas); línea de visión cortada; llegadas cada 0,7 s.

### 09 · 5:00–5:30 (30 s, 900 f) · Resultado

**Pantalla:** 0,4 · 0,4 · 0,2, lo más parecido

¿Qué encontraron? Con la fórmula, la gente se reparte demasiado pareja. Sin embargo, el método no castiga a la puerta que no se ve. Con TOPSIS, en cambio, probaron tres juegos de pesos. El que más se pareció a lo real fue 0,4 distancia, 0,4 fila y 0,2 visibilidad. Dicho de otro modo: si hay mucha cola, caminamos más lejos; y la puerta que no vemos, aunque esté cerca, no existe.

**Visual:** tres pequeños múltiplos (0,4/0,4/0,2 · 0,2/0,6/0,2 · 0,6/0,2/0,2), eje 0–240 s, etiqueta ilustrativo. El primero en color de validación.

### 10 · 5:30–6:00 (30 s, 900 f) · Cierre

**Pantalla:** Validar · idea propia

En suma, el paper entrega un sistema completo —A*, colisionador, elección contrastada con la calle— y, aun así, una limitación honesta: los pasajeros van sueltos, sin ir de a dos, sin fuerzas sociales. Lo más relevante que me queda: una simulación vale lo que vale su validación. Por último, como idea propia —no está en el artículo—, esto sirve para pensar TransMilenio o el metro de Bogotá. Gracias.

**Visual:** puntos sueltos, luego un par enlazado; palabras Validar e idea propia; andén final; fundido al papel (último fotograma = `#F4EFE6`).

## Entrega

- `video-v2/`: código Remotion, `README` de re-render.
- `out/escena01.mp4` … `escena10.mp4` y `video-motion-v3.mp4` (360 s).
- Hojas de contacto inicio | medio | fin.
- Guion de voz para Santiago: esta spec, bloques 01–10.

Verificación: `scripts/probe-mp4.sh` 1920×1080, 30 fps, H.264, sin audio, duraciones exactas; suma 360 s.
