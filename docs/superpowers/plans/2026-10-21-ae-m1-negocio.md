# AE Onda M1 (Arquitectura de Negocio) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver the complete TOGAF Punto 1 (Arquitectura de Negocio) inside `docs/ae-final-project/ondas/M1-negocio/`, update `docs/ae-final-project/registro-empresa.md` with M1 locked details, and verify with `scripts/assert-ae-m1.mjs`.

**Architecture:** Modular Markdown deliverables inside `docs/ae-final-project/ondas/M1-negocio/` (`01-organizacion-y-estrategia.md`, `02-organigrama-y-stakeholders.md`, `03-activos-procesos-capacidades.md`, `04-arquitectura-negocio-as-is.md`, plus updated `README.md`), backed by a Node assertion script (`scripts/assert-ae-m1.mjs`) that enforces required keys, prohibited claims, no em-dash/en-dash connectors, and absence of `informe/`.

**Tech Stack:** Markdown, Mermaid diagrams, and Node.js (`node:fs`, `node:path`, `node:url`).

## Global Constraints

- Spec authority: `docs/superpowers/specs/2026-10-21-ae-m1-negocio-design.md`
- Register authority: `docs/ae-final-project/registro-empresa.md`
- Do not create `docs/ae-final-project/informe/`
- Do not write Puntos 2, 3, 4, or 5
- Formal TOGAF business tone; short sentences; zero `—` or `–` characters in `docs/ae-final-project/ondas/M1-negocio/` and `docs/ae-final-project/registro-empresa.md`
- Fact markers required: `Observado`, `Diseñado AS-IS`, `Objetivo TO-BE`, and `NO CONFIRMADO` where applicable

## File Map

| File | Responsibility |
| --- | --- |
| `scripts/assert-ae-m1.mjs` | Automated contract verification for Onda M1 |
| `docs/ae-final-project/ondas/M1-negocio/01-organizacion-y-estrategia.md` | Subpoints 1 (Descripción de la organización), 2 (Misión, Visión y Objetivos estratégicos) and Justificación AS-IS |
| `docs/ae-final-project/ondas/M1-negocio/02-organigrama-y-stakeholders.md` | Subpoints 3 (Organigrama AS-IS y vista funcional + relaciones) and 7 (Stakeholders con nivel de influencia) |
| `docs/ae-final-project/ondas/M1-negocio/03-activos-procesos-capacidades.md` | Subpoints 4 (Activos de información + Ley 1581), 5 (Mapa de Procesos BPM P-01 a P-05) and 6 (Mapa de Capacidades) |
| `docs/ae-final-project/ondas/M1-negocio/04-arquitectura-negocio-as-is.md` | Subpoint 8 (Documento Arquitectura de Negocio AS-IS) |
| `docs/ae-final-project/ondas/M1-negocio/README.md` | Wave M1 index and status (`completada`) |
| `docs/ae-final-project/registro-empresa.md` | Updated coherence register locking M1 deliverables and gap candidates |

---

### Task 1: Create failing M1 assertion script (`scripts/assert-ae-m1.mjs`)

- [x] Write `scripts/assert-ae-m1.mjs` checking all 5 files in `ondas/M1-negocio/`, required tokens, zero `—`/`–`, and no `informe/`.
- [x] Run `node scripts/assert-ae-m1.mjs` to confirm it fails before M1 files exist.

### Task 2: Draft `01-organizacion-y-estrategia.md` and `02-organigrama-y-stakeholders.md`

- [x] Create `docs/ae-final-project/ondas/M1-negocio/01-organizacion-y-estrategia.md` covering organization profile, mission, vision, 5 strategic objectives, and the 3 mandatory business justifications.
- [x] Create `docs/ae-final-project/ondas/M1-negocio/02-organigrama-y-stakeholders.md` covering the dual AS-IS/functional org chart in Mermaid, inter-area relationships, and the stakeholder matrix with influence levels.

### Task 3: Draft `03-activos-procesos-capacidades.md` and `04-arquitectura-negocio-as-is.md`

- [x] Create `docs/ae-final-project/ondas/M1-negocio/03-activos-procesos-capacidades.md` covering 7 classified information assets (with Ley 1581 de 2012 analysis), BPM process map P-01 to P-05 with embedded BPMN images and Lucidchart URL, and business capabilities map (present and missing gaps).
- [x] Create `docs/ae-final-project/ondas/M1-negocio/04-arquitectura-negocio-as-is.md` covering the integrated Baseline Business Architecture document across business, data, applications, and technology.

### Task 4: Update `ondas/M1-negocio/README.md` and `registro-empresa.md`, and run all assertions

- [x] Update `docs/ae-final-project/ondas/M1-negocio/README.md` to index the completed deliverables.
- [x] Update `docs/ae-final-project/registro-empresa.md` to lock M1 references and gap candidates while preserving all required needles for `assert-ae-ondas.mjs`.
- [x] Run `node scripts/assert-ae-m0.mjs && node scripts/assert-ae-ondas.mjs && node scripts/assert-ae-m1.mjs`.
