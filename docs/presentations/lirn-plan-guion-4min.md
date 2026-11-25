# Guion oral: Plan de LIRN

Tono: formal, directo, una sola voz. Analogía: planos de una obra.
Los códigos del taller no se dicen; van al margen.

Una sola pieza para `/plan`: firma, producto y taller (AS-IS, TO-BE, cinco puntos) en nueve escenas. Reloj total **5:14**. Ritmo guía: ~140 palabras por minuto.

| Escena | Reloj | Riel |
|--------|-------|------|
| Firma | 0:00–0:28 | Firma |
| Desajuste | 0:28–1:00 | Desajuste |
| Qué hace | 1:00–1:42 | Producto |
| Qué no es | 1:42–2:10 | Límite |
| El taller | 2:10–2:39 | Taller |
| Qué hay hoy | 2:39–3:19 | Hoy |
| Los cinco puntos | 3:19–4:20 | Puntos |
| Cinco años | 4:20–4:52 | Ruta |
| Cierre | 4:52–5:14 | Cierre |

Fuente de pantalla: `PLAN_BEATS` en `lirn-web-main/src/content/plan.ts`. Si divergen, manda ese arreglo.

## 1. Firma (0:00–0:28)

LIRN es una firma de movilidad. Aún no está constituida: hoy la conforma una sola persona, su fundador, y ofrece un único producto, TORNS. Por eso la misión es que el transporte masivo ajuste su oferta a quien espera ahora, no solo a lo que el horario predijo. En la misma línea, la visión es que cada estación opere con la demanda que ocurre, no con la que se supuso.

Margen: OE-01 Producto demostrable; OE-04 Demanda y oferta.

## 2. Desajuste (0:28–1:00)

En un sistema masivo la oferta se fija por horario y por histórico; el andén, en cambio, cambia a cada minuto. Esa diferencia no es menor: quien espera paga el desajuste con vehículos llenos, estaciones desiguales y una espera que el horario no vio. TransMilenio y el SITP de Bogotá sirven aquí como caso de estudio, no como cliente. Por la misma razón, el desajuste aparece también en metro, BRT o tren.

Margen: Caso de estudio.

## 3. Qué hace (1:00–1:42)

TORNS toma el video de una estación, cuenta a las personas que esperan y, con ese número, recomienda al centro de control el tipo de vehículo y cuántas unidades despachar. En concreto, cuenta personas; no calcula densidad por metro cuadrado. La decisión de despacho, además, sigue siendo humana. Así, la herramienta en el terreno se limita a medir y proponer. El edificio de la empresa, por su parte, viene después.

Margen: CAP-04 Detección y conteo; CAP-05 Recomendación de despacho.

## 4. Qué no es (1:42–2:10)

Conviene decir, entonces, lo que no es. No es un piloto firmado ni hay clientes. Tampoco optimiza todas las rutas de la ciudad ni predice la demanda histórica: cuenta personas y aplica una regla de despacho. Aun así, el prototipo existe y se puede consultar, porque el sitio, la página del producto y el código están publicados.

Margen: Prototipo, no piloto.

## 5. El taller (2:10–2:39)

El taller pidió aplicar TOGAF a una organización real y diseñar una arquitectura que apoye sus objetivos. La organización es LIRN; el único producto es TORNS. El método es como los planos de una obra: primero el AS-IS, lo que existe; después el TO-BE, lo que se quiere levantar; y al final el orden de la obra. El resultado es un informe único: el Plan de Transformación Empresarial.

Margen: ADM de TOGAF; Puntos 1 a 5.

## 6. Qué hay hoy (2:39–3:19)

Hoy el terreno es estrecho. LIRN aún no está constituida y la conforma una sola persona, su fundador. TORNS es un prototipo aplicado: toma video, cuenta personas y recomienda despacho. No es un piloto firmado y no hay clientes. TransMilenio y el SITP sirven como caso de estudio. Cinco procesos cubren dirección, contacto, producto, acompañamiento y evidencia. El software, además, vive en cuatro superficies, en un solo computador. El conteo se pierde al apagar. No hay respaldo. El video puede incluir imagen de personas y todavía no hay una política de datos publicada.

Margen: Observado; P-01 a P-05.

## 7. Los cinco puntos (3:19–4:20)

Con ese terreno se recorrieron los cinco puntos del taller. En negocio se fijaron misión, visión y cinco objetivos, un organigrama de una persona, el mapa de procesos y las capacidades que existen y las que faltan. En datos se inventarió lo que circula: leads, encuesta, video, conteos y código; y se vio el problema: memoria volátil y una hoja de cálculo suelta. En aplicaciones se describieron las cuatro superficies y se constató que no hay CRM ni ERP, y que abrir el video dispara la inferencia. En tecnología se documentó la estación de trabajo, las páginas públicas, una GPU obsoleta y un disco cerca de su capacidad; la nube quedó como alternativa, no como decisión tomada. En transformación se cruzó el AS-IS con el TO-BE, se nombraron veintiséis brechas y se armó el portafolio y la hoja de ruta a cinco años.

Margen: Punto 1 Negocio; Punto 2 Datos; Punto 3 Aplicaciones; Punto 4 Tecnología; Punto 5 Roadmap.

## 8. Cinco años (4:20–4:52)

El edificio que se quiere no es una empresa grande. Es una firma pequeña que ya no dependa de un solo computador ni de una sola persona. Por eso el orden es estricto. En el primer año: formalizar, abrir un canal honesto y respaldar lo crítico. Entre el primero y el tercero: video real de estación y un primer piloto pagado. Entre el tercero y el quinto: llevar la recomendación al operador, con decisión humana.

Margen: PY-01 Formalización legal; PY-03 Canal comercial; PY-07 Seguridad y respaldo; PY-05 Video de estación; PY-08 Primer piloto pagado; PY-06 Integración con el centro de control.

## 9. Cierre (4:52–5:14)

Así, la arquitectura ayuda porque cada objetivo tiene un proyecto y un horizonte. No hay un impacto comercial que afirmar. Hay un camino: mostrar, cobrar y, solo al final, conectar. LIRN seguirá siendo una empresa pequeña; no debería, sin embargo, depender de un solo computador ni de una sola persona.

Margen: Pregunta del taller; OE-01 a OE-05 Objetivos estratégicos.
