# Guion oral: Core técnico de TORNS

Duración máxima: **5 minutos**.  
Tono: conversacional, claro, para cualquier oyente.  
Ámbito: principios matemáticos y científicos del núcleo técnico (demanda medida y recomendación de oferta).

Cada principio se presenta en tres partes: **nombre**, **descripción** y **aplicación al proyecto**.

---

## 1. Apertura (≈ 35 s)

En una estación de transporte masivo el horario planea una oferta. En el andén la demanda ocurre ahora. A veces hay poca gente y sobra capacidad. A veces hay mucha gente y la oferta no alcanza. El problema de fondo es alinear la oferta con la demanda real en estación, no solo con lo planificado.

**TORNS**, producto de **LIRN**, prototipa ese enfoque. A continuación presentamos los principios que sustentan el núcleo técnico de nuestro proyecto.

---

## 2. Principio científico (≈ 55 s)

**Nombre:** Control en lazo cerrado (teoría de control).

**Descripción:** En teoría de control, un sistema en lazo cerrado mide el estado real, lo compara con lo deseado y corrige la acción. En lazo abierto se ejecuta un plan fijo sin observar el resultado. El lazo cerrado usa la medición para ajustar. Es un principio clásico de ingeniería de control y de la cibernética: la acción se guía por la observación del sistema.

**Aplicación al proyecto:** TORNS cierra el lazo midiendo la demanda en estación, calculando una recomendación de capacidad y mostrándola al centro de control. El operador decide. Más demanda medida implica recomendar más oferta. Menos demanda implica no sobredimensionar. El ciclo es medir, informar y recomendar.

---

## 3. Principio matemático 1 (≈ 55 s)

**Nombre:** Cota inferior del empaquetamiento en contenedores (bin packing).

**Descripción:** En el problema clásico de empaquetamiento en contenedores, si el tamaño total a cubrir es N y cada contenedor tiene capacidad C, hace falta al menos ⌈N/C⌉ contenedores. Esa cota inferior es un resultado estándar de investigación de operaciones y matemática discreta. No se puede cubrir N con menos unidades enteras de capacidad C. La función techo, ⌈x⌉, redondea hacia el entero mayor o igual más cercano.

**Aplicación al proyecto:** Con el conteo N y la capacidad C del tren elegido, el núcleo técnico calcula la flota mínima como ⌈N/C⌉. Ejemplo: 23 personas y capacidad 10. El cociente es 2,3. El techo es 3. Con dos no alcanza. Con tres sí. Así el conteo se traduce en flota mínima.

---

## 4. Principio matemático 2 (≈ 55 s)

**Nombre:** Paradigma de los algoritmos voraces (greedy algorithms).

**Descripción:** Un algoritmo voraz elige, en cada paso, la opción localmente adecuada según una regla fija, sin explorar todas las combinaciones globales. Es un paradigma formal de diseño de algoritmos, usado por ejemplo en selección de actividades o en caminos mínimos. La idea es una regla simple y determinista. La calidad de la solución depende del problema; aquí la regla prioriza no sobrar de más y no quedarse corto.

**Aplicación al proyecto:** TORNS dispone de varios modelos de tren. El núcleo los ordena de menor a mayor capacidad y selecciona el más pequeño que aún cubre la demanda medida. Si la demanda supera al más grande, usa ese modelo y aplica el techo. No es un optimizador de todas las rutas de la ciudad. Es una regla voraz de selección de capacidad anclada al conteo.

---

## 5. Cierre (≈ 30 s)

En resumen: control en lazo cerrado para alinear oferta con demanda medida, cota de bin packing para flota mínima, y algoritmo voraz para elegir el vehículo suficiente. Con eso el núcleo técnico de TORNS fundamenta una recomendación al centro de control.

LIRN es la firma. TORNS es el producto. Hablamos de un prototipo aplicado para sistemas masivos con estaciones. No afirmamos cliente, contrato ni piloto firmado. Afirmamos principios medibles y su aplicación al conteo de demanda y a la recomendación de oferta.

Gracias. Si quieren, abrimos preguntas.

---

## Notas para quien presenta

- Tiempo objetivo: **4:30 a 5:00**. Si vas largo, acorta el ejemplo 23/10. No cortes el cierre.
- Mantén en cada principio el orden nombre, descripción, aplicación.
- Puedes nombrar brevemente el origen: teoría de control; cota clásica de bin packing; paradigma greedy de algoritmos.
- No digas que el código optimiza todas las rutas de la red ni que predice demanda histórica como hecho implementado.
- Evita jerga de repositorio. Di “núcleo técnico”, “detector”, “calculadora de despacho”.
