# TORNS · Ingeniería Aplicada

Este archivo es el hilo de la presentación. Duración: **12 a 15 minutos** y después preguntas.

La historia que hay que dejar en la cabeza del público es esta: el horario planea una oferta, pero en el andén la gente llega ahora. TORNS mira quién está esperando y le dice al centro de control qué vehículo mandar y cuántos. Transmilenio es el caso con el que se explica. No es un cliente ni un piloto firmado. Lo que se ve al final es un prototipo funcionando.

Rebeca abre y cuenta el problema. Hanna toma esa gente acumulada y la convierte en vehículos y capacidad. Johel muestra cómo el prototipo cuenta y calcula, y abre el sistema en vivo.


| #   | Capítulo     | Título en la lámina                                | Quién habla           | Tiempo     |
| --- | ------------ | -------------------------------------------------- | --------------------- | ---------- |
| 1   | Introducción | TORNS · Demanda real en estación                   | Rebeca                | 10 s       |
| 2   | Introducción | Somos el equipo TORNS                              | Rebeca                | 50 s       |
| 3   | Problema     | El horario planea. El andén ocurre.                | Rebeca                | 1 min      |
| 4   | Problema     | En operación se decide a ciegas                    | Rebeca                | 1 min 15 s |
| 5   | Problema     | El problema está vivo para quien viaja             | Rebeca                | 1 min 15 s |
| 6   | Producto     | TORNS traduce gente en andén a oferta de vehículos | Hanna                 | 1 min      |
| 7   | Producto     | Espera · Ve · Mide · Actúa                         | Hanna                 | 1 min      |
| 8   | Producto     | El vehículo es capacidad finita                    | Hanna                 | 1 min 15 s |
| 9   | Ingeniería   | El prototipo cuenta personas                       | Johel                 | 1 min      |
| 10  | Ingeniería   | La oferta se calcula con una regla                 | Johel                 | 1 min      |
| 11  | Demo         | Centro de control                                  | Johel, Hanna y Rebeca | 5 min      |
| 12  | Cierre       | Prototipo aplicado. El operador decide.            | Johel                 | 1 min      |


---

# Capítulo 1 — Introducción

**Quién lo lleva:** Rebeca Pedrozo

**Para qué existe este capítulo.** El público acaba de sentarse. Todavía no sabe quiénes son ustedes ni qué van a ver. Este bloque no cuenta el problema a fondo. Solo deja tres cosas claras antes de que alguien se distraiga: el producto se llama TORNS, son tres personas, y hoy van a ver un prototipo aplicado al caso Transmilenio. Cuando Rebeca termine, el salón ya debería poder repetir esa frase.

## Diapositiva 1 — TORNS · Demanda real en estación

**Objetivo de esta lámina.** Que el nombre TORNS quede leído en silencio mientras ustedes se paran. Si Rebeca empieza a hablar encima, el público lee y no escucha. Por eso esta lámina no se narra.

**Qué mostrar.** Fondo azul profundo (`#0b4f78`) y texto blanco. En el centro, grande: TORNS. Debajo, una sola línea: «Demanda real en estación. Recomendación al control.» Más abajo, en letra menor: caso de estudio Transmilenio, prototipo aplicado, Ingeniería Aplicada. Al pie, los tres nombres y, pequeño, «by LIRN». Si ponen foto, que sea un andén recortado, no una ciudad genérica ni un bus de stock. No llenen la portada de párrafos.

**Qué se dice.** Nada. Tres respiraciones. Mirada al público. Click.

## Diapositiva 2 — Somos el equipo TORNS

**Objetivo de esta lámina.** Presentarse sin biografías y clavar la promesa del día en una frase, para que lo que viene no suene a clase de movilidad sino a un producto que van a demostrar.

**Qué mostrar.** Fondo blanco. Arriba a la izquierda, TORNS. En el centro, los tres nombres en una sola fila: Rebeca Pedrozo, Hanna Cerinza, Johel Arias. Debajo, una línea nada más: «Producto para el centro de control de transporte masivo.» Sin fotos, sin cargos, sin logos de Transmilenio.

**Qué se dice.** Rebeca mira al salón, no a la pantalla. Habla como quien invita, no como quien lee un abstract:

> Hoy no les vamos a explicar Bogotá en teoría. Les vamos a mostrar un prototipo que hace una sola cosa, y la hace en serio: mira quién está ahora en un andén y le recomienda al centro de control qué vehículo mandar y cuántos.
>
> El caso con el que trabajamos es Transmilenio. Insisto en eso: es nuestro caso de estudio, no un piloto firmado. Empiezo yo por por qué existe el problema. Hanna después les va a hablar de vehículos y de capacidad, que es donde esto se vuelve ingeniería. Y Johel cierra con el sistema prendido.

Al terminar, no diga «pasemos al problema». Haga click. El título de la siguiente lámina hace el trabajo.

---

# Capítulo 2 — El problema

**Quién lo lleva:** Hanna Cerinza

**Para qué existe este capítulo.** Si el horario bastara, no habría estaciones reventadas al lado de estaciones holgadas. Este bloque tiene que hacer sentir ese desajuste, no definirlo en una diapositiva de “contexto”. Van tres golpes, en este orden, porque cada uno prepara el siguiente: primero qué pasa en Bogotá, después cómo se vive eso en el control, y al final cómo lo paga quien viaja. Hanna todavía no entra. Si ustedes muestran el producto aquí, el problema se oye como pretexto.

## Diapositiva 3 — El horario planea. El andén ocurre.

**Objetivo de esta lámina.** Que el público vea dos mundos al mismo tiempo. A la izquierda, lo que el sistema planeó. A la derecha, lo que está pasando en el andén. La frase que debe quedar es: el plan es uno, la estación es otra.

**Qué mostrar.** Título grande, tal cual: «El horario planea. El andén ocurre.» Dos columnas, poco texto. Izquierda, en gris, encabezada «Demanda prevista»: horario, histórico, oferta fija. Derecha, en azul, encabezada «Demanda real»: quién espera ahora, esta estación en este momento, andén desigual. Al pie, una sola frase: en Bogotá, la cantidad y la frecuencia no siempre coinciden con la demanda real de cada estación. Nada de gráficos inventados ni de un mapa de la ciudad.

**Qué se dice.** Empiece con una escena, no con una definición. Señale primero la columna gris y después la azul:

> Piensen en una mañana cualquiera en Transmilenio. El horario ya decidió cuántos vehículos salen y cada cuánto. Eso está aquí. *(columna izquierda)* Limpio. Planificado. Cerrado.
>
> Y acá. *(columna derecha)* Está el andén. A veces hay cuatro personas y pasa un articulado casi vacío. Dos estaciones más abajo, la gente no puede subir. Misma hora. Mismo sistema. Demanda distinta.
>
> Eso no es mala suerte. Es que la oferta se armó con lo que se esperaba, no con lo que está ocurriendo ahora. El horario planea. El andén ocurre. Y quien espera, paga esa diferencia.

Haga una pausa de un segundo. Click. Ahora el público tiene que oírlo en quien opera.

## Diapositiva 4 — En operación se decide a ciegas

**Objetivo de esta lámina.** Sacar el problema de la queja del pasajero y ponerlo en la cabina de control. La idea que debe quedar: no es que no quieran mover la flota; es que se enteran tarde.

**Qué mostrar.** Título: «En operación se decide a ciegas.» Debajo, en letra chica: entrevista a un controlador SITP; se cita el rol, no el nombre. El centro de la lámina no es una lista: es una cita grande, entre comillas: «Mientras el operador nos avisa y nosotros tomamos decisiones, la estación ya colapsó.» Debajo de la cita, en texto corto, la consecuencia: la comunicación va por radio; el aviso de ocupación llega cuando el andén ya se llenó; la flota se nivela casi a ciegas. Al pie, pequeño y honesto: caso de estudio, no es un piloto firmado con el operador. No transcriban códigos. No pongan el nombre de la persona.

**Qué se dice.** Baje un poco el tono. Esto es testimonio, no slogan:

> Entonces fuimos a preguntarle a quien vive eso en el turno. Hablamos con un controlador SITP. Y lo que nos dijo no fue «falta gente» ni «falta voluntad».
>
> Lo más difícil, cuando la estación se llena, es esto: ellos no están viendo el andén. Están oyendo un radio. Alguien reporta que la plataforma ya está ocupada… y para cuando esa frase llega, la estación ya colapsó.
>
> *(Lee la cita con calma, mirando al público, no a la pantalla.)*
>
> Las maniobras existen. Hay manuales. Hay códigos. Pero se decide a ciegas. El problema no es que no sepan operar. El problema es que no tienen una señal a tiempo: cuánta gente hay ahora, en esa estación.

Si más tarde preguntan por los códigos, se puede decir que usan radio para ocupación de plataforma, vehículo bloqueado, agilice o disminuya, y volver al punto: se decide sin medir el andén. No reciten la lista aquí.

## Diapositiva 5 — El problema está vivo para quien viaja

**Objetivo de esta lámina.** Cerrar el capítulo con tres números que se recuerdan, para que nadie salga pensando que esto es anécdota de un controlador. Y dejarle a Hanna, en la última frase, la gente ya acumulada en el andén.

**Qué mostrar.** Título: «El problema está vivo para quien viaja.» Subtítulo pequeño: encuesta del 17 de agosto de 2026, veinte personas, investigación del equipo, no es resultado de un operador. Tres números grandes, no una tabla densa. El 80 %, dejó pasar buses llenos en el último mes. El 65 %, lo vive varias veces por semana. El 70 %, pierde quince minutos o más en un solo evento. Debajo, en letra muy chica, para quien se acerque: el 55 % lo vivió en los últimos siete días; la estimación del equipo, cruzando duración y frecuencia, da unas tres horas al mes; el 65 % gastó cincuenta mil pesos o más el mes pasado en alternativas; no se extrapola la muestra. Si hay duda entre gráfico y números, ganen los números.

**Qué se dice.** No lea las tres cifras como inventario. Dé cada una y deje que caiga:

> Y del otro lado de esa radio, está quien viaja. Nosotros no le preguntamos al operador si el problema «se siente». Se lo preguntamos a la gente. Veinte respuestas, el 17 de agosto de este año. Investigación nuestra, no un estudio de Transmilenio.
>
> Ocho de cada diez dejaron pasar un bus lleno el mes pasado. Más de la mitad… la semana pasada. A casi dos tercios les pasa varias veces por semana. Y cuando les pasa, el 70 % pierde quince minutos o más. En un solo evento.
>
> Esto no es nostalgia de hora pico. Está pasando ahora. Se está acumulando gente en un andén mientras la oferta llega con el tamaño y el minuto que el horario ya había cerrado.
>
> Hanna toma esa acumulación. Y la convierte en una pregunta de ingeniería: qué vehículo mandar, y cuántos.

Rebeca se queda un segundo y le cede el piso a Hanna. No explique el producto. Eso es de Hanna.

**Si en preguntas piden más de la encuesta.** Misma fecha, n=20, misma leyenda. El 30 % viaja a diario y el 50 % tres veces o más por semana. El 80 % se mueve entre 4:00 y 7:30 p. m.; el 60 %, entre 6:00 y 8:30 a. m. El 80 % tiene hora fija de llegada; para el 35 % llegar tarde tiene consecuencias. El 35 % pierde más de media hora en un evento. El 75 % sale más temprano, el 30 % paga taxi o app, el 25 % no hace nada. El 90 % gastó algo el mes pasado. Con lo que más se identifican: desbalance entre oferta y demanda (40 %), estrés (25 %), puntualidad (20 %).

---

# Capítulo 3 — El producto

**Quién lo lleva:** Hanna Cerinza

**Para qué existe este capítulo.** Rebeca dejó una estación que se llena y un control que se entera tarde. Hanna no abre el software. Hanna explica qué es TORNS con el lenguaje de quien dimensiona equipos: el andén junta personas, el vehículo tiene un tope, y despachar es mandar unidades enteras de esa capacidad. Si este bloque se oye a marketing, el jurado se desconecta. Si se oye a ingeniería de capacidad, Johel entra fácil.

## Diapositiva 6 — TORNS traduce gente en andén a oferta de vehículos

**Objetivo de esta lámina.** Nombrar el producto en una frase que se pueda repetir: gente en el andén, de un lado; vehículo que hay que enviar, del otro. TORNS es el puente. No es un tablero de cámaras. No es un horario nuevo.

**Qué mostrar.** Título largo y claro: «TORNS traduce gente en andén a oferta de vehículos.» En el cuerpo, tres frases cortas en una columna, no iconos: el andén acumula personas; el vehículo tiene una capacidad finita; TORNS le recomienda al centro de control el tipo de vehículo y la cantidad. Al pie: el usuario es quien despacha; el pasajero no opera la pantalla.

**Qué se dice.** Hanna entra con energía, como quien recoge el testigo, no como quien cambia de tema:

> Gracias, Rebeca. Señal tarde. Andén lleno. Esa es la foto.
>
> TORNS no llega a reemplazar al operador. Tampoco a redibujar el horario de la ciudad. Hace una cosa más concreta, y más dura: toma a la gente que está ahora en esa estación y la convierte en una oferta de vehículos.
>
> En ingeniería esto es alinear dos magnitudes. Aquí se está juntando gente. *(un gesto hacia “andén”)* Aquí hay equipos con un tope de personas que pueden llevar. *(un gesto hacia “vehículo”)* Si esas dos no coinciden, o mandamos aire vacío… o dejamos gente afuera.
>
> El producto existe para que el centro de control vea esa diferencia a tiempo, y reciba una recomendación: este tipo de vehículo, estas unidades. Quien sufre el desajuste es el pasajero. Quien usa TORNS es quien despacha.

Una respiración. Click. Ahora el cómo, sin abrir aún el computador.

## Diapositiva 7 — Espera · Ve · Mide · Actúa

**Objetivo de esta lámina.** Que el producto se vea como una cadena que se recorre, no como cuatro funciones sueltas. El público debería poder decir al final: espera, ve, mide, actúa.

**Qué mostrar.** Título: «De la estación al despacho.» Cuatro bloques en una sola fila, con una flecha suave entre ellos. Espera: el andén cambia, el horario no. Ve: cámara por estación, presencia visible. Mide: se cuenta quién está ahora. Actúa: el control recibe tipo de vehículo y cantidad. El último bloque, Actúa, lleva el azul de acento. Al pie: TORNS recomienda; el operador decide. No dibujen cajas de software ni logos de YOLO.

**Qué se dice.** Camine la lámina con el dedo o con la mirada, un acto a la vez. No los suelte todos en un párrafo:

> Entonces, ¿cómo se recorre esto?
>
> Uno. La estación no espera. La gente llega. Si no sale capacidad, se junta. Dos. Una cámara ve ese andén. No el promedio del día: esa plataforma, ahora. Tres. Se mide. Se cuenta quién está. Cuatro. Se actúa. El control recibe una propuesta: qué vehículo, cuántos. Y decide.
>
> Fíjense en la última palabra. Decide. TORNS cierra el lazo entre lo que está pasando en plataforma y lo que se envía. No pisa el acelerador por su cuenta. Recomienda. El operador sigue dentro del lazo.
>
> Y ese cuarto acto, actuar, para alguien que dimensiona flota, es el que duele. Porque ahí ya no estamos hablando de una pantalla. Estamos hablando de un vehículo.

Click. El vehículo entra grande.

## Diapositiva 8 — El vehículo es capacidad finita

**Objetivo de esta lámina.** Que el jurado entienda por qué no se manda “más buses” a ciegas. Un vehículo es un contenedor con un número C de personas. No existen 2,3 trenes. El criterio de TORNS es el de no sobredimensionar: el más pequeño que todavía cubre a la gente que hay. Cuando Johel muestre la fórmula, esta lámina ya le habrá hecho el trabajo físico.

**Qué mostrar.** Título: «El vehículo es capacidad finita.» En el centro, grande, una C. Alrededor, en frases, no en viñeta larga: un vehículo es un equipo con capacidad nominal C; la demanda N son personas en el andén; la oferta se manda en unidades enteras. A un lado, en rojo suave o en gris, «siempre el más grande» = capacidad vacía. Al otro, «siempre el más chico» = gente afuera. En el medio, destacado: el más pequeño que aún cubre. Abajo, los tres modelos del prototipo, bien claros: C = 5, 10 y 15. Pie: dimensionar oferta, no redibujar la red.

**Qué se dice.** Aquí Hanna puede ir más despacio. Es su lámina. Use un ejemplo que se vea:

> Un articulado, un bus, un tren, en este prototipo, no es un dibujo. Es un equipo. Tiene un tope. Esa C: cuántas personas caben. Enteras.
>
> ¿Por qué enteras? Porque la gente en el andén es un número, N, y ustedes no despachan “dos trenes y un tercio”. Despachan uno. O dos. O tres. Entonces hay que elegir dos cosas: qué modelo, o sea qué C, y cuántas unidades.
>
> Si siempre mando el más grande, estoy moviendo más capacidad de la que ese andén pidió. Asientos vacíos. Más masa rodando. Un equipo sobrado para ese instante. Si siempre mando el más chico, la gente se queda en plataforma… y volvemos a la foto de Rebeca.
>
> TORNS no adivina. Dimensiona. Toma el vehículo más pequeño que todavía cubre a esa gente. En el prototipo esas capacidades están simplificadas a 5, 10 y 15, para que se vea la lógica. No estamos modelando la red de la ciudad ni el consumo del vehículo. Estamos alineando acumulación en estación con unidades de capacidad.
>
> Johel les va a mostrar de dónde sale ese N, y cómo el prototipo hace la cuenta.

Hanna mira a Johel y le entrega el piso.

---

# Capítulo 4 — Ingeniería

**Quién lo lleva:** Johel Arias

**Para qué existe este capítulo.** Hanna ya dijo el criterio. Ahora el público necesita ver de dónde sale el número de personas y cómo ese número se vuelve “tres unidades”. Son dos láminas de implementación, dichas en cristiano. No es un mapa de toda la red. No es “inteligencia artificial que optimiza Bogotá”.

## Diapositiva 9 — El prototipo cuenta personas

**Objetivo de esta lámina.** Anclar la N. Que nadie piense que el conteo se escribe a mano. Y dejar dicho, sin drama, que esto cuenta personas: no calcula densidad por metro cuadrado.

**Qué mostrar.** Título: «El prototipo cuenta personas.» Una sola flecha horizontal, de izquierda a derecha: video de la estación, detección de personas, conteo, métricas en vivo. Debajo, cuatro frases cortas, como subtítulos de la flecha: se abre el video (archivo o cámara); un modelo de visión detecta personas con umbral 0,5 y dibuja cajas; el resultado es un conteo, no una densidad; si no hay video en vivo, no hay conteo en vivo. En el título de la lámina no pongan YOLO ni nombres de archivos. Johel puede decir YOLO al hablar.

**Qué se dice.** Johel entra concreto, casi como quien destapa la caja:

> Entonces, ¿de dónde sale esa N? No se inventa.
>
> El sistema abre el video de la estación. Un modelo de visión busca personas. Cada persona es una caja. Esas cajas se suman. Eso es el conteo. El operador ve el video con las cajas encima, y al mismo tiempo le llegan los números.
>
> Una cosa que quiero dejar quieta: no estamos midiendo densidad por metro cuadrado. Estamos contando quién está en el cuadro. Y hay una condición de taller, bien práctica: si no abrimos el video, no hay conteo. Sin conteo, no hay N. Y sin N, lo que Hanna describió no arranca.

Si preguntan por calidad del modelo, Johel puede decir: precisión 0,73, recall 0,55, mAP50 0,64. Suele acertar cuando detecta, y se le escapan personas cuando hay aglomeración, así que tiende a contar de menos. El siguiente paso sería comparar con un conteo a mano en clips del andén, y aceptar el modelo si el error no cambia la recomendación.

## Diapositiva 10 — La oferta se calcula con una regla

**Objetivo de esta lámina.** Que el ejemplo 23 personas, capacidad 10, 3 unidades, se vea tan grande que el público haga la cuenta con ustedes. Y que quede una honestidad en voz alta: esto es una regla, no una IA que diseña la red.

**Qué mostrar.** Título: «La oferta se calcula con una regla.» El centro de la lámina es el ejemplo, enorme: N = 23 personas, C = 10, 2,3, techo 3 unidades. Arriba o abajo, en una línea, las dos ideas: se elige el tren más pequeño que aún cubre, y la flota mínima es el techo de N sobre C, escrito ⌈N/C⌉. Capacidades del prototipo, 5, 10 y 15, en una sola cinta. Pie: regla de despacho, no IA; no optimiza todas las rutas de la ciudad.

**Qué se dice.** Haga la cuenta en voz alta, como en un tablero, señalando cada número:

> Llegamos a la cuenta. Hanna ya nos dijo el criterio: el más pequeño que cubre. Ahora, los números.
>
> Hay 23 personas en el andén. El vehículo que estamos mirando carga 10. 23 entre 10 es 2,3. ¿Mandamos dos? No. Con dos caben 20. Quedan tres afuera. El techo de 2,3 es 3. Tres unidades.
>
> El prototipo ordena los modelos de chico a grande, 5, 10, 15, y se queda con el más pequeño que todavía alcanza. Si la gente supera al más grande, usa ese y aplica el techo.
>
> Eso no es una red neuronal decidiendo la ciudad. La visión cuenta. La regla dimensiona. Y eso, ahora, lo vamos a ver prendido.

Click. Cambia de ventana. No espere aplauso.

---

# Capítulo 5 — Demo

**Quién lo lleva:** Johel en el teclado. Hanna habla de capacidad cuando aparecen los vehículos. Rebeca recuerda el problema cuando aparece el andén.

**Para qué existe este capítulo.** Hasta aquí el público ha creído una historia. Ahora tiene que verla. Cinco minutos. No se explica código. No se debuggea en público. Si el video no sale, hay un plan B.

## Diapositiva 11 — Centro de control

**Objetivo de esta lámina.** Servir de puente. Existe para no pelear con el navegador: se ve dos segundos y se cambia a la aplicación.

**Qué mostrar.** Fondo negro o el mismo azul de la portada. Una línea enorme: Centro de control. Debajo, chico: Inicio, Monitoreo, Cámaras, Optimización. Cero capturas de pantalla. El conteo de hoy es el de hoy; una foto vieja miente.

Antes de entrar al salón, el backend y el frontend ya están arriba, y el video se abrió una vez. Si no hay stream, no hay conteo.

**Qué se dice, en vivo, sobre la aplicación.** No es un monólogo de Johel. Es un relevo corto, casi conversado:

En **Inicio**, Johel muestra que el sistema está operativo y cuántas cámaras hay, y entra a Monitoreo. Hanna, sin prisa: «Esto ya no es la diapositiva. Esto es el centro de control. Aquí se opera.»

En **Monitoreo**, Johel elige una estación, abre el video y espera a que aparezcan las cajas. Rebeca entra solo cuando se ven personas: «Eso que están viendo es lo que el radio no entrega a tiempo. Quién espera ahora.» Hanna no pisa esa frase.

En **Cámaras**, Johel pasa por las fuentes y no se queda. Hanna: «Una estación, una fuente. Si se cae el video, se cae el conteo. Y si se cae el conteo, no hay N.»

En **Optimización**, Johel abre los modelos 5, 10 y 15 y señala el N, la C y las unidades recomendadas. Hanna toma esta pantalla, es suya: «Estos tres modelos son tres capacidades. El sistema no manda “más buses”. Elige la más pequeña que todavía cubre a esa gente, en unidades enteras.» Rebeca cierra el arco: «El controlador deja de improvisar a ciegas. Recibe una oferta. La decisión, igual, es humana.»

Johel vuelve tres segundos a Monitoreo, con el video vivo, y cambia otra vez a las diapositivas.

Si el stream falla, no se explica el error. Se abre un video de respaldo del mismo recorrido, de cuarenta y cinco segundos a un minuto, y Hanna sigue el mismo hilo. Después, Johel pasa a la última lámina.

---

# Capítulo 6 — Cierre

**Quién lo lleva:** Rebeca

**Para qué existe este capítulo.** El público ya vio el sistema. Ahora hay que repetir la frase del principio, con el mismo tamaño de honestidad, y abrir la sala. No hay una segunda ronda de conclusiones.

## Diapositiva 12 — Prototipo aplicado. El operador decide.

**Objetivo de esta lámina.** Que se vayan con cuatro hechos y una pregunta, no con un párrafo de “trabajo futuro”.

**Qué mostrar.** Mismo fondo de la portada, para que apertura y cierre se reconozcan. Título: «Prototipo aplicado. El operador decide.» Cuatro líneas, no un muro: medimos demanda en estación; recomendamos oferta al control, tipo de vehículo y cantidad; caso de estudio Transmilenio, no es un piloto firmado; no optimiza toda la red ni predice histórico, cuenta personas y aplica una regla. Abajo, grande: ¿Preguntas? Los tres nombres, pequeños.

**Qué se dice.** Johel baja la velocidad. Frases cortas. Los tres de pie:

> Entonces, para dejarlo quieto.
>
> Medimos quién está en estación. Recomendamos qué vehículo mandar y cuántos. Trabajamos con Transmilenio como caso, no como piloto firmado. No estamos optimizando las rutas de la ciudad. No estamos prediciendo el histórico. Contamos personas. Dimensionamos capacidad. El operador decide.
>
> ¿Preguntas?

Los tres agradecen juntos.

Si preguntan por la encuesta, la entrevista o si hay cliente, responde Rebeca: caso de estudio, veinte personas, sin piloto firmado. 

Si preguntan para quién es, cómo se acumula la gente o por qué el vehículo más pequeño que cubre, responde Hanna. 

Si preguntan por la detección, las cifras del modelo, la regla del techo o lo que se vio en vivo, responde Johel.