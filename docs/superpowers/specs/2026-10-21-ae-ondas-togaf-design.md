# Diseño: ondas TOGAF del taller de Arquitectura Empresarial

Fecha: 2026-10-21  
Estado: pendiente de revisión del usuario  
Alcance: sistema de trabajo M1 a M5, Registro de Empresa y reglas de coherencia. No redacta el informe único ni los puntos del taller.

## Objetivo

Estructurar el taller TOGAF como cinco ondas secuenciales que construyen a LIRN como empresa real y productiva, con base en el prototipo TORNS. Cada punto del enunciado se alimenta, justifica y diseña por completo. No quedan huecos sin clasificar. No hay contradicciones entre ondas.

## Decisiones aprobadas

- Doble registro: AS-IS (hoy) y TO-BE (objetivo a 5 años).
- Marco: Colombia, SAS, microempresa unipersonal, sede Bogotá. Mercado B2B y B2G de operadores de transporte masivo. Datos personales bajo Ley 1581 de 2012.
- Ondas secuenciales. Cada una entrega su punto TOGAF y actualiza `registro-empresa.md`. Un hecho bloqueado no se contradice.
- Equipo actual: Johel Arias. Una persona.
- Transmilenio es caso de estudio, no cliente. No hay contrato ni piloto firmado.

## Política de hechos

Cada afirmación del taller lleva una de estas marcas:

| Marca | Significa | Ejemplo |
|-------|-----------|---------|
| Observado | Existe en código, landing, encuesta o proceso publicado | Conteo `person_count`, formularios, P-01 a P-05 |
| Diseñado AS-IS | Decisión de empresa para completar el presente sin fingir escala | LIRN como SAS en Bogotá, fundador único, Sheets como canal de contacto |
| Objetivo TO-BE | Estado futuro. No se afirma como hecho de hoy | CRM, primer piloto pagado, áreas ocupadas |

Prohibido: afirmar un Objetivo como Observado. Prohibido: dejar un requisito del enunciado sin respuesta. Si falta evidencia, se diseña el AS-IS mínimo realista o se declara el vacío como brecha y se resuelve en TO-BE.

## Registro de Empresa

Archivo: `docs/ae-final-project/registro-empresa.md`

Es el tablero de coherencia. Crece por ondas. Secciones fijas:

1. Identidad legal y de mercado
2. Equipo y organigrama (AS-IS y funcional)
3. Misión, visión, objetivos estratégicos
4. Producto y oferta
5. Clientes, segmentos y partes interesadas
6. Procesos y capacidades
7. Activos de información y datos
8. Aplicaciones
9. Tecnología
10. Brechas y proyectos (se llena en M5, se anotan candidatos desde M1)
11. Glosario de términos bloqueados

Regla de bloqueo: al cerrar una onda, los hechos nuevos de esa onda quedan bloqueados. La onda siguiente puede añadir, no reemplazar. Si hay que corregir, se registra el cambio y se actualizan todos los textos ya escritos de esa clave.

## Árbol de trabajo

```
docs/ae-final-project/
  README.md
  registro-empresa.md
  docs/definicion-taller-final.md
  procesos/
  ondas/
    M1-negocio/
    M2-datos/
    M3-aplicaciones/
    M4-tecnologia/
    M5-roadmap/
  informe/          # solo se crea en M5
```

Cada carpeta de onda contiene los entregables de ese punto, justificación y diagramas de esa onda. El informe único se ensambla en M5. No se citan rutas `.md` dentro del informe.

## Claves que nunca cambian

Estas frases deben ser idénticas en registro, ondas e informe:

- LIRN es la firma. TORNS es el único producto.
- Equipo actual: Johel Arias.
- TORNS es prototipo aplicado. No es piloto firmado.
- Transmilenio es caso de estudio, no cliente.
- El prototipo cuenta personas. No calcula densidad por área.
- Capacidades de tren del prototipo: 5, 10 y 15. Regla `⌈N/C⌉` y tren más pequeño suficiente.
- Procesos: P-01 a P-05.
- Superficies de software: `lirn-web-main`, `tro-frontend`, `tro-backend`, `yolo-train-routes-optimization`.
- Encuesta 17 de agosto de 2026, n=20. Entrevista a controlador SITP (rol, no nombre).
- Identidad TRO prohibida en entregables nuevos.

## Objetivos estratégicos (Diseñado AS-IS)

Quedan bloqueados en M1. Pueden precisarse en redacción, no sustituirse:

1. Convertir el prototipo TORNS en un producto demostrable y controlado para un centro de control.
2. Abrir un canal comercial honesto hacia operadores B2B y B2G, sin afirmar cliente.
3. Proteger datos personales y evidencia según Ley 1581 y el mapa de procesos.
4. Cerrar la brecha entre demanda medida y oferta recomendada como propuesta de valor única.
5. Preparar la firma para un primer piloto pagado en el horizonte TO-BE, no como hecho actual.

## Onda M1. Arquitectura de Negocio

**Entrega el Punto 1 completo.**

| Artefacto del enunciado | Contenido bloqueado |
|-------------------------|---------------------|
| Descripción de la organización | LIRN SAS, software e ITS para movilidad, microempresa unipersonal, Bogotá, un producto (TORNS). Clientes principales: ninguno firmado. Mercado objetivo: operadores de sistemas masivos con estaciones. |
| Misión y visión | Texto de `PRODUCT.md`. Objetivos: los cinco de arriba. |
| Organigrama | AS-IS: un recuadro, Johel Arias, Dirección General. Vista funcional: Dirección, Comercial, Producto / Ingeniería, Operación, Calidad, con el fundador como responsable actual de todas. Relaciones: P-01 dirige; P-02, P-03 y P-04 ejecutan; P-05 apoya. |
| Activos de información (≥5) | 1) Leads del formulario (datos personales, Ley 1581). 2) Encuesta n=20 (investigación). 3) Video y conteos del prototipo. 4) Pesos del modelo. 5) Fichas y diagramas de proceso. 6) Código fuente. Clasificar público / interno / personal / reservado. |
| Mapa de procesos | P-01 estratégico, P-02 a P-04 misionales, P-05 apoyo. Usar fichas e imágenes ya publicadas. |
| Capacidades | Presentes: dirección de producto único, captura de interés, detección y conteo, recomendación de oferta, evidencia. Ausentes o débiles: facturación, CRM, talento humano, inventario físico, despacho real del operador. Las ausentes son brecha, no se fingen. |
| Partes interesadas | Fundador (alta influencia). Academia / Universidad Libre (alta en el taller). Visitantes del sitio. Operadores como interesados, no clientes. Entes de movilidad como contexto. Proveedores técnicos (GitHub, Roboflow, Google). Influencia alta / media / baja. |
| Documento AS-IS de negocio | Cómo opera hoy: un fundador, cinco procesos, prototipo, landing, Sheets. Cómo eso sostiene misión y visión. Cruce breve a datos, aplicaciones y tecnología, sin adelantar el diseño de M2 a M4. |

Justificación obligatoria: por qué una SAS unipersonal es el AS-IS creíble; por qué el organigrama funcional no implica gerencias ocupadas; por qué el mercado se describe sin cliente.

## Onda M2. Arquitectura de Datos

**Entrega el Punto 2 completo.** Debe leer el registro de M1.

| Artefacto | Contenido |
|-----------|-----------|
| Inventario de datos | Leads (no clientes). Producto TORNS. Proveedores técnicos (hosting, dataset, correo). Facturación: no existe; brecha. Empleado: el fundador. Contratos: no hay; brecha. Además: estación, cámara, conteo, modelo de tren, plan de despacho, evidencia n=20. |
| Modelo de datos | Relaciones: Lead llega por Contacto; Estación tiene Cámara; Cámara produce Conteo; Conteo alimenta PlanDeDespacho; PlanDeDespacho usa ModeloDeTren; Producto TORNS se ofrece a Segmento, no a Cliente firmado. |
| Flujo de información | Andén → cámara → YOLO → conteo → WebSocket / despacho → operador humano. Visitante → formulario → Sheets → P-02. Encuesta y entrevista → P-05. |
| Problemas | Hojas aisladas, conteos no persistidos como histórico de negocio, sin CRM, sin facturación, etiquetas de landing desalineadas con el equipo actual, riesgo de tratar un lead como cliente. |

## Onda M3. Arquitectura de Aplicaciones

**Entrega el Punto 3 completo.**

| Artefacto | Contenido |
|-----------|-----------|
| Inventario | Sitio LIRN, aplicación TORNS, API FastAPI, entrenamiento YOLO, Google Sheets, GitHub, Lucidchart, SharePoint, correo. Área usuaria: el fundador en el rol correspondiente. |
| Integraciones | Frontend ← MJPEG y WS ← backend. Backend → YOLO. Sitio → Apps Script → Sheets. Sin integración al control del operador. |
| Problemas | Sheets como CRM, sin autenticación de operador, inferencia atada al stream, sin ERP, dependencia de herramientas personales. |
| Interoperabilidad (TO-BE) | CRM o cola de leads, persistencia de conteos, identidad, API de recomendación desacoplada del MJPEG, retiro de la identidad TRO residual. No se afirma que esas apps existan hoy. |

## Onda M4. Arquitectura Tecnológica

**Entrega el Punto 4 completo.**

| Artefacto | Contenido |
|-----------|-----------|
| Inventario | Estación de trabajo del fundador, Docker local, GitHub Pages, repositorio Git, pesos `.pt`, OpenCV (archivo / USB / RTSP), sin granja GPU de producción. |
| Diagrama | Usuario (fundador u operador acompañado) → sitio o dashboard → API → modelo → fuente de video. Nube actual: Pages y Sheets. |
| Riesgos | Persona única, sin política formal de respaldo, pesos y dataset fuera de un ciclo de evaluación productiva, dependencia de GitHub y Google, umbral 0,5 y recall 0,55 (conteo a la baja), cámara USB no es campo del operador. |
| Propuesta TO-BE | Alojamiento con respaldo, secretos, observabilidad, GPU o inferencia gestionada, copias del modelo, separación demo / laboratorio. |

## Onda M5. Roadmap e informe

**Entrega el Punto 5 y el documento único.**

| Artefacto | Contenido |
|-----------|-----------|
| TO-BE de negocio | Firma SAS con roles cubiertos o contratados, un producto, canal comercial, evidencia, y TORNS como oferta demostrable lista para un primer piloto pagado. |
| Brechas | Tabla hoy / falta / debe cambiar, cruzada con M1 a M4. |
| Portafolio | Iniciativas que cierran esas brechas (producto, datos, aplicaciones, tecnología, comercial, cumplimiento). |
| Priorización | Impacto, complejidad, costo. Primero lo que profesionaliza el prototipo y el canal; después el piloto; después la escala. |
| Hoja de ruta | 0-1 año, 1-3 años, 3-5 años. |
| Indicadores | Medibles sin fingir impacto actual. Ejemplos: leads calificados, no conformidades cerradas, error de conteo vs conteo manual, tiempo de una demo. Ventas e impacto en estación solo en TO-BE. |
| Informe único | Portada, introducción, organización, las cuatro arquitecturas, roadmap, conclusiones, recomendaciones, bibliografía, pregunta final. |
| Pregunta final | Cómo la AE propuesta ayuda a LIRN a cumplir los cinco objetivos en cinco años. Se responde con brechas, portafolio y roadmap, no con claims de piloto. |

## Redacción

Vale la rule `ae-togaf-redaccion.mdc`. Tono formal, empresarial, lector decisor. Vocabulario TOGAF. Sin raya como conector. El informe cita entregables con URL (sitio, Lucid, Roboflow, repositorio público). Nunca una ruta `.md`.

## Fuera de alcance de este spec

- Redactar M1 a M5.
- Cambiar código del prototipo.
- Actualizar la landing de tres nombres (queda registrada como desalineación y brecha).
- Inventar cliente, contrato, NIT real no verificado o alianza.

El NIT, la matrícula y las cifras financieras no se inventan como Observado. En M1 se declara el marco SAS y se deja el número registral como pendiente de formalización (brecha de constitución), salvo que el fundador aporte el dato real.

## Verificación de este spec (cuando se implemente el sistema de ondas, no los puntos)

1. Existe `docs/ae-final-project/registro-empresa.md` con las 11 secciones.
2. El README del taller describe las cinco ondas y la política de hechos.
3. `AGENTS.md` apunta al registro y a la política Observado / Diseñado / Objetivo.
4. No existe `informe/` todavía.
5. Las claves que nunca cambian aparecen en el registro.
