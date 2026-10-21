# Diseño: fundación documental del taller de Arquitectura Empresarial

Fecha: 2026-10-21  
Estado: pendiente de revisión del usuario  
Alcance: organización de documentación, AGENTS.md, rules y archivo de fuentes superadas. No escribe los puntos TOGAF ni el informe único.

## Objetivo

Dejar el repositorio listo para desarrollo dirigido por especificación del taller TOGAF de Arquitectura Empresarial, usando a LIRN como organización y a TORNS como único producto. Esta fundación es el hito M0. Los hitos M1 a M5 se declaran aquí y se ejecutan después.

## Decisiones aprobadas

- Archivar lo superado en `docs/_archive/`. No borrar.
- El taller vive solo en `docs/ae-final-project/`.
- Traer las fichas y guías P-01 a P-05 desde el worktree `feat-lirn-procesos-fichas` hacia ese árbol, junto a los JPEG BPMN ya existentes.
- Fundación ligera: índice, mapa de hitos, AGENTS.md y rules. Sin borradores vacíos del informe ni de los puntos 1 a 5.
- La redacción de entregables AE sigue el vocabulario TOGAF, tono formal empresarial y orientación a un lector final de negocio. El informe único no cita archivos `.md`. Si hace falta una fuente, se cita el entregable con su URL.

## Fuera de alcance (M0)

- Redactar Arquitectura de Negocio, Datos, Aplicaciones, Tecnología o Roadmap.
- Redactar el informe único.
- Cambiar código de `lirn-web-main`, `tro-frontend`, `tro-backend` o `yolo-train-routes-optimization`.
- Inventar organigrama actual con gerencias ocupadas, clientes, contratos, piloto firmado o alianzas.

## Fuentes canónicas (siguen en su sitio)

Estas fuentes no se mueven. El README del taller las lista como autoridad.

| Fuente | Qué autoriza |
|--------|----------------|
| `PRODUCT.md` | Misión, visión, separación LIRN/TORNS, capacidades del prototipo, restricciones y claims prohibidos |
| `DESIGN.md` | Identidad visual. No es fuente de arquitectura empresarial |
| `docs/ae-final-project/docs/definicion-taller-final.md` | Enunciado académico y estructura de la entrega |
| `docs/ae-final-project/procesos/` (tras M0) | Mapa, fichas ISO, guías BPMN y JPEG de los cinco procesos |
| `docs/torns-project-structure.md` | Descubrimiento, segmentos, entrevista SITP y encuesta n=20 |
| `docs/presentations/torns-respuestas-ia-ml.md` | Inferencia, datos de entrenamiento y contratos reales de IA |
| `docs/presentations/torns-core-guion-5min.md` | Principios del núcleo técnico ya contrastados con código |
| Código de `tro-backend`, `tro-frontend`, `lirn-web-main` y YOLO | AS-IS de aplicaciones y tecnología. Manda sobre cualquier prosa previa |

Si un hecho no está en esta tabla, el texto usa `NO CONFIRMADO`. No se inventa.

## Archivo (`docs/_archive/`)

Mover, no copiar. Añadir `docs/_archive/README.md` que explique que estos archivos no son autoridad para el taller.

| Origen | Motivo |
|--------|--------|
| `docs/torns-doc.md` | Recorte Metro/APCA superado por `PRODUCT.md` |
| `docs/lirn-agent-procesos.md` | Pack de encargo. Tras promover fichas, las reglas viven en AGENTS.md y en `procesos/` |
| `docs/landing-instructions.md` | Instrucción de landing ya ejecutada |
| `docs/contact-apps-script.md` | Operativa de Apps Script, no es AE |
| `docs/brand/` | Prompts de marca, no son AE |
| `docs/presentations/torns-landing-guion.md` | Guion comercial de landing |
| Specs ejecutadas de sitio: `2026-09-05-lirn-torns-brand-design.md`, `2026-09-05-lirn-corporate-vibrant-redesign.md`, `2026-09-06-lirn-architectural-tech-landing-design.md`, `2026-09-06-torns-chapter-film-design.md`, `2026-09-07-torns-harmony-team-contact-design.md` | Trabajo de sitio ya ejecutado |
| Planes de esas mismas specs más `2026-09-13-lirn-procesos-fichas.md` | Planes ya ejecutados o sustituidos por `procesos/` |
| Texto actual del `README.md` raíz (identidad TRO) | Se guarda como `docs/_archive/readme-tro.md` |

No archivar: `PRODUCT.md`, `DESIGN.md`, las dos presentaciones de IA/principios, `docs/torns-project-structure.md`, ni las specs `2026-10-07-torns-respuestas-ia-ml-design.md` y `2026-09-19-torns-core-guion-5min-design.md`.

## Árbol objetivo de `docs/ae-final-project/`

```
docs/ae-final-project/
  README.md
  docs/
    definicion-taller-final.md
  procesos/
    README.md
    P-01-ficha.md
    P-01-guia-bpmn.md
    P-02-ficha.md
    P-02-guia-bpmn.md
    P-03-ficha.md
    P-03-guia-bpmn.md
    P-04-ficha.md
    P-04-guia-bpmn.md
    P-05-ficha.md
    P-05-guia-bpmn.md
    imagenes/
      1. Proceso 1 - Apoyo Estrategico.jpeg
      2. Proceso 2 - Misional.jpeg
      3. Proceso 3 - Misional.jpeg
      4. Proceso 4 - Misional.jpeg
      5. Proceso 5 - Apoyo.jpeg
```

Los JPEG se mueven desde `docs/ae-final-project/docs/` hacia `procesos/imagenes/`. La definición del taller se queda en `docs/`.

No crear en M0 la carpeta `informe/` ni archivos vacíos de los puntos 1 a 5. El README reserva la ruta futura `docs/ae-final-project/informe/plan-transformacion-empresarial.md`.

## Contenido del README del taller

`docs/ae-final-project/README.md` es el índice SDD. Incluye:

1. Empresa LIRN, producto TORNS, prototipo frente a piloto.
2. Tabla de fuentes canónicas (rutas internas para agentes; no se copian al informe).
3. Mapa de hitos M0 a M5.
4. Estructura del informe único (las 11 secciones del enunciado más la pregunta final).
5. Regla de citas del informe: entregable más URL, nunca un `.md`.
6. Claims prohibidos.

## Mapa de hitos

| Hito | Punto del taller | Resultado |
|------|------------------|-----------|
| M0 | Fundación | Este spec ejecutado: árbol, archivo, AGENTS.md, rules |
| M1 | Punto 1. Arquitectura de Negocio | Organización, misión/visión, organigrama de roles futuros, activos, mapa BPM, capacidades, stakeholders, documento AS-IS |
| M2 | Punto 2. Arquitectura de Datos | Inventario, modelo, flujo y problemas de información |
| M3 | Punto 3. Arquitectura de Aplicaciones | Inventario, integraciones, problemas y propuesta de interoperabilidad |
| M4 | Punto 4. Arquitectura Tecnológica | Inventario, diagrama, riesgos y propuesta |
| M5 | Punto 5 y entrega | TO-BE, brechas, portafolio, priorización, roadmap, indicadores, informe único y respuesta a la pregunta final |

Cada hito M1 a M5 tendrá su propio spec y plan antes de redactar. M0 no los escribe.

## AGENTS.md (raíz)

Documento corto para cualquier agente del repo. Secciones:

1. LIRN es la firma. TORNS es el único producto.
2. El prototipo no es piloto firmado. Transmilenio es caso de estudio, no cliente.
3. Claims prohibidos: clientes, contratos, alianzas, KPIs de impacto, TRO como identidad.
4. Equipo actual: Johel Santiago Arias, Rebeca Pedrozo, Hanna Cerinza. Dueños de proceso: roles futuros, no gerencias ocupadas.
5. Puntero a `PRODUCT.md` y a `docs/ae-final-project/README.md`.
6. Trabajo AE: leer el spec del hito antes de redactar. Hecho ausente = `NO CONFIRMADO`.

## Rules

Tres archivos en `.cursor/rules/`, cada uno bajo 50 líneas.

### 1. `lirn-torns-identity.mdc`

`alwaysApply: true`

Separa empresa y producto. Prohíbe TRO, piloto firmado, clientes inventados y organigrama actual con gerencias. Remite a `PRODUCT.md`.

### 2. `ae-final-project.mdc`

`globs: docs/ae-final-project/**`

El taller vive solo en ese árbol. Seguir el enunciado y los hitos. No crear el informe en M0. Al redactar puntos, contrastar con código y con las fuentes canónicas.

### 3. `ae-togaf-redaccion.mdc`

`globs: docs/ae-final-project/**`

Aplica cuando se redacten textos del taller o del informe:

- Vocabulario TOGAF: AS-IS, TO-BE, capacidades de negocio, partes interesadas, arquitectura de datos, aplicaciones, tecnología, brechas, portafolio y hoja de ruta.
- Tono formal y empresarial. El lector es un decisor o evaluador de negocio, no un desarrollador.
- El informe único no menciona rutas de repositorio ni archivos `.md`.
- Si se cita un entregable (sitio LIRN, landing TORNS, diagrama de proceso publicado, dataset, repositorio público), se usa el nombre del entregable y su URL.
- No se usan conectores de raya. Frases cortas. Sin marketing vacío.

## README raíz

Reescribir `README.md` como índice corto de LIRN/TORNS: qué es el launcher, enlaces a `PRODUCT.md`, al prototipo y a `docs/ae-final-project/README.md`. El texto TRO actual pasa a archivo.

## Promoción de procesos

Copiar desde `.worktrees/feat-lirn-procesos-fichas/docs/procesos/` las fichas, guías y el README de mapa hacia `docs/ae-final-project/procesos/`. Ajustar rutas internas para que apunten a `imagenes/`. No redibujar BPMN. No reescribir el contenido de las fichas en M0 salvo referencias rotas.

## Criterio de hecho

Manda el código y `PRODUCT.md` sobre README antiguos, `docs/torns-doc.md` y cualquier claim de “microservicios”, “predicción histórica” o “optimizador de rutas de la ciudad” que el prototipo no implemente.

## Verificación de M0

1. Existen `AGENTS.md` y las tres rules.
2. Existe `docs/ae-final-project/README.md` con hitos y fuentes.
3. Existen las cinco fichas, cinco guías y cinco JPEG en `procesos/`.
4. `docs/_archive/README.md` lista lo movido.
5. No quedan JPEG de proceso en `docs/ae-final-project/docs/`.
6. El README raíz ya no se presenta como Sistema TRO.
7. No existe el informe único ni borradores de los puntos 1 a 5.
