---
name: ae-taller
description: >-
  Contextualiza un agente en el taller TOGAF de LIRN y TORNS, resume el estado
  de las ondas y pregunta si se empieza, se continúa o se ajusta. Usar solo
  cuando se invoque ae-taller, el taller de arquitectura empresarial, una onda
  M1 a M5, el registro de empresa, o se pida continuar o ajustar el proyecto final.
disable-model-invocation: true
---

# Taller AE

Convierte al agente en operador del taller. No copies hechos de empresa dentro de esta skill. Léelos de las fuentes.

## 1. Leer

En este orden, antes de proponer trabajo:

1. `AGENTS.md`
2. `docs/ae-final-project/registro-empresa.md`
3. `docs/ae-final-project/README.md`
4. El README de cada carpeta en `docs/ae-final-project/ondas/`

Una onda está **sin empezar** si su carpeta solo tiene `README.md`. Está **en curso** si hay más archivos.

No leas `docs/_archive/`. No afirmes un Objetivo TO-BE como hecho de hoy.

## 2. Recitar

Antes de preguntar, di en pocas líneas:

- LIRN es la firma. TORNS es el único producto.
- Equipo actual y si hay piloto o cliente firmado, según el registro.
- Marcas vigentes: Observado, Diseñado AS-IS, Objetivo TO-BE.
- Qué ondas están sin empezar y cuáles en curso.

Si un dato no está en `AGENTS.md` ni en el registro, di `NO CONFIRMADO`.

## 3. Preguntar

Una sola pregunta. Opciones:

- Empezar M1, M2, M3, M4 o M5
- Continuar la onda en curso
- Ajustar un hecho ya bloqueado
- Solo este briefing

No redactes hasta que el usuario elija.

## 4. Continuar

**Empezar.** Lee el playbook de esa onda y el enunciado `docs/ae-final-project/docs/definicion-taller-final.md`. Si no hay spec y plan de esa onda, hazlos antes de redactar el punto. No crees `informe/` antes de M5.

**Continuar.** Lee los archivos ya escritos de esa carpeta. Sigue sin contradecir el glosario del registro.

**Ajustar.** Cambia el hecho en `registro-empresa.md` y en todo texto del taller que use esa clave. Deja constancia del cambio. No dejes dos versiones.

**Briefing.** Detente después de la recitación.

## Reglas de trabajo

- Entregables del taller: tono formal, lector de negocio, vocabulario TOGAF.
- El informe no cita archivos `.md`. Cita el entregable y su URL.
- Lead no es cliente. Transmilenio es caso de estudio.
- Identidad TRO prohibida en entregables nuevos.
- Hecho ausente: `NO CONFIRMADO`.
