# Simulador de arquitecturas TORNS Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Entregar un aplicativo web de simulación que compare las tres arquitecturas de despliegue de TORNS con el modelo analítico del spec, de modo que otro integrante pueda ejecutarlo, probarlo y sustentarlo.

**Architecture:** Motor puro en Python (`torns_sim.model.simulate`) sin YOLO, sin FastAPI de `tro-backend` y sin cámaras. Una capa web FastAPI aparte lee `K`, `E` y `F`, llama al motor y pinta ficha, tabla, tres escenarios y la recomendación en español. Los resultados se etiquetan como estimaciones.

**Tech Stack:** Python ≥ 3.11, pytest, FastAPI, Jinja2, uvicorn.

## Global Constraints

- Spec: `docs/superpowers/specs/2026-10-23-torns-simulador-arquitectura-design.md` (aprobado)
- LIRN es la firma. TORNS es el único producto. Equipo actual: Johel Arias. Transmilenio es caso de estudio, no cliente. TORNS es prototipo aplicado, no piloto firmado
- No usar TRO / Sistema de Vigilancia / Transport Route Optimization
- El motor no llama a YOLO, ni a `tro-backend`, ni a cámaras
- Toda etiqueta visible se explica en lenguaje natural
- Toda salida se etiqueta como estimación del modelo, no medición real
- `K` entero 1–20, `F` entero 1–15, `E` sí/no
- `L_max = 1000` ms. Redondeo de pantalla: `round` de Python
- No modificar `tro-backend`, `tro-frontend`, `lirn-web-main` ni `yolo-train-routes-optimization`

## File Map

| File | Responsibility |
| --- | --- |
| `torns-sim-arquitectura/pytest.ini` | `pythonpath` para importar `torns_sim` |
| `torns-sim-arquitectura/requirements.txt` | pytest, fastapi, uvicorn, jinja2, python-multipart |
| `torns-sim-arquitectura/torns_sim/__init__.py` | Exporta `InputError`, `parse_inputs`, `simulate`, `explain`, `PROJECT` |
| `torns-sim-arquitectura/torns_sim/model.py` | Validación, fórmulas, puntaje, recomendación |
| `torns-sim-arquitectura/torns_sim/project.py` | Ficha del proyecto y textos de alternativas |
| `torns-sim-arquitectura/torns_sim/explain.py` | Recomendación en español |
| `torns-sim-arquitectura/tests/test_validate.py` | Entradas inválidas (prueba 1 del spec) |
| `torns-sim-arquitectura/tests/test_model.py` | Oráculos 2 a 5 del spec |
| `torns-sim-arquitectura/tests/test_explain.py` | Texto de recomendación y de ninguna elegible |
| `torns-sim-arquitectura/tests/test_app.py` | POST de escenario de referencia en la web |
| `torns-sim-arquitectura/app.py` | FastAPI: ficha, formulario, tabla, escenarios |
| `torns-sim-arquitectura/templates/index.html` | Interfaz adaptable a celular |
| `torns-sim-arquitectura/static/app.css` | Estilos simples, tabla con scroll horizontal |
| `torns-sim-arquitectura/README.md` | Modelo, variables, fórmulas, uso, limitaciones, enlace local |

---

### Task 1: Validación de entradas

**Files:**
- Create: `torns-sim-arquitectura/pytest.ini`
- Create: `torns-sim-arquitectura/requirements.txt`
- Create: `torns-sim-arquitectura/torns_sim/__init__.py`
- Create: `torns-sim-arquitectura/torns_sim/model.py`
- Create: `torns-sim-arquitectura/tests/test_validate.py`

**Interfaces:**
- Consumes: nothing
- Produces: `class InputError(ValueError)` with `field: str`; `parse_inputs(k_raw: object, e_raw: object, f_raw: object) -> tuple[int, bool, int]` raises `InputError` with a Spanish message that names the field and the valid range

- [ ] **Step 1: Write the failing tests**

Create `torns-sim-arquitectura/tests/test_validate.py`:

```python
import pytest

from torns_sim.model import InputError, parse_inputs


def test_k_zero_raises_and_mentions_range():
    with pytest.raises(InputError) as exc:
        parse_inputs(0, False, 5)
    assert exc.value.field == "K"
    assert "1" in str(exc.value) and "20" in str(exc.value)
    assert "cámaras" in str(exc.value).lower()


def test_k_float_string_rejected():
    with pytest.raises(InputError) as exc:
        parse_inputs("2.5", "no", "5")
    assert exc.value.field == "K"


def test_f_out_of_range():
    with pytest.raises(InputError) as exc:
        parse_inputs(1, False, 16)
    assert exc.value.field == "F"
    assert "15" in str(exc.value)


def test_e_invalid():
    with pytest.raises(InputError) as exc:
        parse_inputs(1, "tal vez", 5)
    assert exc.value.field == "E"
    assert "sí" in str(exc.value).lower() or "si" in str(exc.value).lower()


def test_parse_happy_path_spanish():
    assert parse_inputs("2", "no", "5") == (2, False, 5)
    assert parse_inputs(1, "sí", 5) == (1, True, 5)
    assert parse_inputs(1, True, 5) == (1, True, 5)


def test_bool_is_not_int_for_k():
    with pytest.raises(InputError) as exc:
        parse_inputs(True, False, 5)
    assert exc.value.field == "K"
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd torns-sim-arquitectura
python3 -m pip install pytest
python3 -m pytest tests/test_validate.py -v
```

Expected: FAIL with `ModuleNotFoundError: No module named 'torns_sim'` (or import error of `parse_inputs`).

- [ ] **Step 3: Write minimal implementation**

Create `torns-sim-arquitectura/pytest.ini`:

```ini
[pytest]
pythonpath = .
testpaths = tests
```

Create `torns-sim-arquitectura/requirements.txt`:

```
pytest>=8.0
fastapi>=0.115
uvicorn>=0.30
jinja2>=3.1
python-multipart>=0.0.9
httpx>=0.27
```

Create `torns-sim-arquitectura/torns_sim/__init__.py`:

```python
from torns_sim.model import InputError, parse_inputs, simulate

__all__ = ["InputError", "parse_inputs", "simulate"]
```

Create `torns-sim-arquitectura/torns_sim/model.py`:

```python
from __future__ import annotations


class InputError(ValueError):
    def __init__(self, field: str, message: str) -> None:
        self.field = field
        super().__init__(message)


def _parse_int(raw: object, field: str, message: str) -> int:
    if type(raw) is int:
        return raw
    if isinstance(raw, str):
        text = raw.strip()
        if text.lstrip("-").isdigit() and "." not in text and "," not in text:
            return int(text)
    raise InputError(field, message)


def _parse_e(raw: object) -> bool:
    if type(raw) is bool:
        return raw
    if isinstance(raw, str):
        value = raw.strip().lower()
        if value in {"sí", "si"}:
            return True
        if value == "no":
            return False
    raise InputError(
        "E",
        "E debe ser sí o no (¿hay que cifrar el video de personas?).",
    )


def parse_inputs(k_raw: object, e_raw: object, f_raw: object) -> tuple[int, bool, int]:
    k = _parse_int(
        k_raw,
        "K",
        "K debe ser un entero entre 1 y 20 (cámaras al mismo tiempo).",
    )
    f = _parse_int(
        f_raw,
        "F",
        "F debe ser un entero entre 1 y 15 (cuadros por segundo que se analizan).",
    )
    e = _parse_e(e_raw)
    if k < 1 or k > 20:
        raise InputError(
            "K",
            "K debe ser un entero entre 1 y 20 (cámaras al mismo tiempo).",
        )
    if f < 1 or f > 15:
        raise InputError(
            "F",
            "F debe ser un entero entre 1 y 15 (cuadros por segundo que se analizan).",
        )
    return k, e, f
```

Temporarily comment or remove the `simulate` import from `__init__.py` until Task 3, **or** add a stub:

```python
def simulate(K: int, E: bool, F: int):
    raise NotImplementedError
```

Keep the stub so `__init__.py` imports do not break.

- [ ] **Step 4: Run the tests and make sure they pass**

```bash
cd torns-sim-arquitectura
python3 -m pytest tests/test_validate.py -v
```

Expected: PASS (6 tests).

- [ ] **Step 5: Commit**

```bash
git add torns-sim-arquitectura/pytest.ini torns-sim-arquitectura/requirements.txt \
  torns-sim-arquitectura/torns_sim/__init__.py torns-sim-arquitectura/torns_sim/model.py \
  torns-sim-arquitectura/tests/test_validate.py
git commit -m "feat: validate TORNS architecture simulator inputs"
```

---

### Task 2: Tests oráculo del modelo

**Files:**
- Create: `torns-sim-arquitectura/tests/test_model.py`

**Interfaces:**
- Consumes: `parse_inputs` (already exists)
- Produces: tests that call `simulate(K: int, E: bool, F: int) -> SimulationResult` with attributes defined in Task 3. The tests fail until Task 3 lands

- [ ] **Step 1: Write the failing tests**

Create `torns-sim-arquitectura/tests/test_model.py`:

```python
from math import isclose

import pytest

from torns_sim.model import simulate


def _by_alt(result):
    return {row.alt: row for row in result.alternatives}


def test_reference_k2_e_no_f5():
    result = simulate(2, False, 5)
    rows = _by_alt(result)
    assert result.recommended_alt == 2

    a1, a2, a3 = rows[1], rows[2], rows[3]
    assert a1.C == pytest.approx(12.5)
    assert a1.rho == pytest.approx(0.8)
    assert a1.L == 180
    assert a1.S == 2
    assert a1.A == pytest.approx(91.0)
    assert a1.encryption_ok is True
    assert a1.uses_containers is False
    assert a1.eligible is True
    assert round(a1.score, 4) == 0.5720

    assert a2.C == pytest.approx(25.0)
    assert a2.rho == pytest.approx(0.4)
    assert a2.L == 130
    assert a2.S == 5
    assert a2.A == pytest.approx(97.0)
    assert a2.uses_containers is True
    assert a2.eligible is True
    assert round(a2.score, 4) == 0.6420

    assert a3.C == pytest.approx(2000 / 110)
    assert a3.rho == pytest.approx(0.55)
    assert a3.L == 122
    assert a3.S == 3
    assert a3.A == pytest.approx(94.0)
    assert a3.uses_containers is False
    assert a3.eligible is True
    assert round(a3.score, 4) == 0.6068


def test_k1_no_encryption_recommends_alt1():
    result = simulate(1, False, 5)
    rows = _by_alt(result)
    assert result.recommended_alt == 1
    assert rows[1].L == 100
    assert round(rows[1].score, 4) == 0.6050
    assert round(rows[2].score, 4) == 0.5745
    assert round(rows[3].score, 4) == 0.5596


def test_k1_encryption_disqualifies_alt1():
    result = simulate(1, True, 5)
    rows = _by_alt(result)
    assert rows[1].encryption_ok is False
    assert rows[1].eligible is False
    assert rows[1].score is None
    assert rows[1].L == 100
    assert rows[1].fail_encryption is True
    assert rows[1].fail_latency is False
    assert result.recommended_alt == 2
    assert rows[2].L == 155
    assert round(rows[2].score, 4) == 0.5657
    assert rows[3].L == 126
    assert round(rows[3].score, 4) == 0.5582


def test_k8_encryption_recommends_edge():
    result = simulate(8, True, 5)
    rows = _by_alt(result)
    assert rows[1].eligible is False
    assert rows[1].fail_encryption is True
    assert rows[1].fail_latency is True
    assert rows[1].L == 10000
    assert rows[1].rho == pytest.approx(3.2)
    assert rows[2].L == 235
    assert rows[2].S == 10
    assert rows[2].A == pytest.approx(95.0)
    assert round(rows[2].score, 4) == 0.7252
    assert result.recommended_alt == 3
    assert rows[3].L == 126
    assert rows[3].S == 14
    assert isclose(rows[3].C, 8 * 1000 / 110)
    assert round(rows[3].score, 4) == 0.8109


def test_f15_none_eligible():
    result = simulate(1, False, 15)
    assert result.recommended_alt is None
    for row in result.alternatives:
        assert row.L == 10000
        assert row.eligible is False
        assert row.fail_latency is True
        assert row.score is None
        assert row.S == 0
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd torns-sim-arquitectura
python3 -m pytest tests/test_model.py -v
```

Expected: FAIL (`NotImplementedError` or `simulate` missing attributes).

- [ ] **Step 3: Do not implement yet**

Stop here. Implementation is Task 3. If an agent is executing this plan, commit the failing tests only if the repo allows red tests; otherwise keep them uncommitted until Task 3. Preferred: leave the working tree with failing tests and continue to Task 3 in the same session.

- [ ] **Step 4: Skip passing tests in this task**

This task's deliverable is the oracle file. Do not weaken assertions.

- [ ] **Step 5: Do not commit a broken `simulate` stub as success**

If you commit, message must not claim the model works:

```bash
git add torns-sim-arquitectura/tests/test_model.py
git commit -m "test: add architecture simulator oracle cases"
```

---

### Task 3: Motor analítico

**Files:**
- Modify: `torns-sim-arquitectura/torns_sim/model.py`
- Modify: `torns-sim-arquitectura/torns_sim/__init__.py`

**Interfaces:**
- Consumes: `parse_inputs` from Task 1
- Produces:

```python
@dataclass(frozen=True)
class AlternativeResult:
    alt: int
    name: str
    C: float
    rho: float
    L: float
    S: int
    A: float
    encryption_ok: bool
    uses_containers: bool
    eligible: bool
    score: float | None
    fail_latency: bool
    fail_encryption: bool

@dataclass(frozen=True)
class SimulationResult:
    K: int
    E: bool
    F: int
    alternatives: tuple[AlternativeResult, ...]
    recommended_alt: int | None

def simulate(K: int, E: bool, F: int) -> SimulationResult: ...
```

Callers that still have raw form values must run `parse_inputs` first. `simulate` assumes already-valid `int`/`bool`/`int` (the tests pass ints). Inside `simulate`, still reject invalid values by calling `parse_inputs(K, E, F)` so a bad direct call fails the same way.

- [ ] **Step 1: The failing tests already exist** (`tests/test_model.py`). Re-run to confirm red.

```bash
cd torns-sim-arquitectura
python3 -m pytest tests/test_model.py -v
```

Expected: FAIL.

- [ ] **Step 2: Replace `torns_sim/model.py` with the full engine** (keep `InputError` and `parse_inputs` from Task 1; do not drop them).

The complete file:

```python
from __future__ import annotations

from dataclasses import dataclass
from math import ceil, floor


T_CPU = 80.0
T_EDGE = 110.0
NET_1 = 20.0
NET_2 = 50.0
NET_3 = 12.0
TLS_VIDEO = 25.0
TLS_JSON = 4.0
R_MAX = 4
A_BASE = {1: 93.0, 2: 97.0, 3: 94.0}
L_SAT = 10000.0
L_MAX = 1000.0
A_PISO = 50.0
C_CPU = 1000.0 / T_CPU
COMPLEXITY = {1: 0.0, 2: 0.03, 3: 0.02}
ALT_NAMES = {
    1: "Proceso único local",
    2: "Servicios en contenedores",
    3: "Inferencia en el borde",
}


class InputError(ValueError):
    def __init__(self, field: str, message: str) -> None:
        self.field = field
        super().__init__(message)


def _parse_int(raw: object, field: str, message: str) -> int:
    if type(raw) is int:
        return raw
    if isinstance(raw, str):
        text = raw.strip()
        if text.lstrip("-").isdigit() and "." not in text and "," not in text:
            return int(text)
    raise InputError(field, message)


def _parse_e(raw: object) -> bool:
    if type(raw) is bool:
        return raw
    if isinstance(raw, str):
        value = raw.strip().lower()
        if value in {"sí", "si"}:
            return True
        if value == "no":
            return False
    raise InputError(
        "E",
        "E debe ser sí o no (¿hay que cifrar el video de personas?).",
    )


def parse_inputs(k_raw: object, e_raw: object, f_raw: object) -> tuple[int, bool, int]:
    k = _parse_int(
        k_raw,
        "K",
        "K debe ser un entero entre 1 y 20 (cámaras al mismo tiempo).",
    )
    f = _parse_int(
        f_raw,
        "F",
        "F debe ser un entero entre 1 y 15 (cuadros por segundo que se analizan).",
    )
    e = _parse_e(e_raw)
    if k < 1 or k > 20:
        raise InputError(
            "K",
            "K debe ser un entero entre 1 y 20 (cámaras al mismo tiempo).",
        )
    if f < 1 or f > 15:
        raise InputError(
            "F",
            "F debe ser un entero entre 1 y 15 (cuadros por segundo que se analizan).",
        )
    return k, e, f


@dataclass(frozen=True)
class AlternativeResult:
    alt: int
    name: str
    C: float
    rho: float
    L: float
    S: int
    A: float
    encryption_ok: bool
    uses_containers: bool
    eligible: bool
    score: float | None
    fail_latency: bool
    fail_encryption: bool


@dataclass(frozen=True)
class SimulationResult:
    K: int
    E: bool
    F: int
    alternatives: tuple[AlternativeResult, ...]
    recommended_alt: int | None


def _capacity_and_rho(alt: int, K: int, F: int) -> tuple[float, float]:
    if alt == 1:
        C = C_CPU
        rho = (K * F) / C
    elif alt == 2:
        replicas = min(K, R_MAX)
        C = replicas * C_CPU
        rho = (K * F) / C
    else:
        C = K * (1000.0 / T_EDGE)
        rho = F * T_EDGE / 1000.0
    return C, rho


def _latency(alt: int, K: int, E: bool, rho: float) -> float:
    if rho >= 1:
        return L_SAT
    if alt == 1:
        return T_CPU * K + NET_1
    if alt == 2:
        replicas = min(K, R_MAX)
        analysis = T_CPU * ceil(K / replicas)
        surcharge = TLS_VIDEO if E else 0.0
        return analysis + NET_2 + surcharge
    surcharge = TLS_JSON if E else 0.0
    return T_EDGE + NET_3 + surcharge


def _availability(alt: int, rho: float) -> float:
    base = A_BASE[alt]
    if rho >= 1:
        value = base - 15.0
    else:
        value = base - 20.0 * max(0.0, rho - 0.7)
    return max(A_PISO, value)


def _score(alt: int, L: float, A: float, S: int, C: float) -> float:
    n_l = max(0.0, (L_MAX - L) / L_MAX)
    n_a = A / 100.0
    n_s = min(1.0, S / 20.0)
    n_c = min(1.0, C / 50.0)
    return 0.35 * n_l + 0.25 * n_a + 0.20 * n_s + 0.15 * n_c - COMPLEXITY[alt]


def _evaluate_alt(alt: int, K: int, E: bool, F: int) -> AlternativeResult:
    C, rho = _capacity_and_rho(alt, K, F)
    L = _latency(alt, K, E, rho)
    A = _availability(alt, rho)
    S = floor(C / F)
    encryption_ok = True if not E else alt != 1
    uses_containers = alt == 2
    fail_latency = L > L_MAX
    fail_encryption = not encryption_ok
    eligible = (not fail_latency) and encryption_ok
    score = _score(alt, L, A, S, C) if eligible else None
    return AlternativeResult(
        alt=alt,
        name=ALT_NAMES[alt],
        C=C,
        rho=rho,
        L=L,
        S=S,
        A=A,
        encryption_ok=encryption_ok,
        uses_containers=uses_containers,
        eligible=eligible,
        score=score,
        fail_latency=fail_latency,
        fail_encryption=fail_encryption,
    )


def _recommend(rows: tuple[AlternativeResult, ...]) -> int | None:
    eligible = [row for row in rows if row.eligible and row.score is not None]
    if not eligible:
        return None
    eligible.sort(key=lambda row: (-row.score, row.L, row.alt))
    return eligible[0].alt


def simulate(K: int, E: bool, F: int) -> SimulationResult:
    K, E, F = parse_inputs(K, E, F)
    rows = tuple(_evaluate_alt(alt, K, E, F) for alt in (1, 2, 3))
    return SimulationResult(
        K=K,
        E=E,
        F=F,
        alternatives=rows,
        recommended_alt=_recommend(rows),
    )
```

Update `torns-sim-arquitectura/torns_sim/__init__.py`:

```python
from torns_sim.model import (
    AlternativeResult,
    InputError,
    SimulationResult,
    parse_inputs,
    simulate,
)

__all__ = [
    "AlternativeResult",
    "InputError",
    "SimulationResult",
    "parse_inputs",
    "simulate",
]
```

- [ ] **Step 3: Run tests**

```bash
cd torns-sim-arquitectura
python3 -m pytest tests/test_validate.py tests/test_model.py -v
```

Expected: PASS, 11 tests. If a `round(..., 4)` fails by 0.0001, do not change the oracle; fix the formula. Winner uses unrounded `score`.

- [ ] **Step 4: Commit**

```bash
git add torns-sim-arquitectura/torns_sim/model.py torns-sim-arquitectura/torns_sim/__init__.py \
  torns-sim-arquitectura/tests/test_model.py
git commit -m "feat: compute TORNS architecture simulation scores"
```

---

### Task 4: Ficha del proyecto y recomendación en español

**Files:**
- Create: `torns-sim-arquitectura/torns_sim/project.py`
- Create: `torns-sim-arquitectura/torns_sim/explain.py`
- Create: `torns-sim-arquitectura/tests/test_explain.py`
- Modify: `torns-sim-arquitectura/torns_sim/__init__.py`

**Interfaces:**
- Consumes: `SimulationResult`, `AlternativeResult` from `torns_sim.model`
- Produces: `PROJECT: dict` (ficha); `ALTERNATIVES: dict[int, dict]`; `explain(result: SimulationResult) -> str`; `GLOSSARY: list[tuple[str, str]]`

- [ ] **Step 1: Write the failing tests**

Create `torns-sim-arquitectura/tests/test_explain.py`:

```python
from torns_sim.explain import explain
from torns_sim.model import simulate
from torns_sim.project import PROJECT


def test_project_fiche_identity():
    assert PROJECT["firma"] == "LIRN"
    assert PROJECT["producto"] == "TORNS"
    assert "Johel Arias" in PROJECT["equipo"]
    assert "no cliente" in PROJECT["caso_estudio"].lower()
    assert "estimación" in PROJECT["aviso_resultados"].lower()


def test_explain_reference_names_alt2_and_disclaimer():
    text = explain(simulate(2, False, 5))
    assert "alternativa 2" in text.lower()
    assert "contenedores" in text.lower()
    assert "estimaciones del modelo" in text.lower()
    assert "1000" in text


def test_explain_none_eligible_lists_latency():
    text = explain(simulate(1, False, 15))
    assert "ninguna alternativa es elegible" in text.lower()
    assert "latencia" in text.lower()
    assert "estimaciones del modelo" in text.lower()


def test_explain_encryption_failure_for_alt1():
    text = explain(simulate(1, True, 5))
    assert "alternativa 2" in text.lower()
    assert "en claro" in text.lower() or "cifrar" in text.lower()
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd torns-sim-arquitectura
python3 -m pytest tests/test_explain.py -v
```

Expected: FAIL (`No module named 'torns_sim.explain'`).

- [ ] **Step 3: Write `project.py` and `explain.py`**

`torns-sim-arquitectura/torns_sim/project.py`:

```python
PROJECT = {
    "firma": "LIRN",
    "producto": "TORNS",
    "funcion": (
        "Detectar demanda en estación con visión por computadora "
        "y recomendar oferta al centro de control."
    ),
    "as_is": (
        "Hoy FastAPI y el detector YOLO11s corren en el mismo proceso. "
        "El video anotado viaja como una secuencia de imágenes. "
        "Las métricas van en un mensaje corto. "
        "La regla de trenes no es el objeto de esta simulación."
    ),
    "caso_estudio": "Transmilenio es caso de estudio, no cliente ni piloto firmado.",
    "equipo": "Johel Arias, una persona. Sin granja de procesadores gráficos de producción.",
    "usuarios_producto": (
        "Usuario primario: personal de centro de control o despacho. "
        "Usuario secundario: evaluador académico en una demostración. "
        "Quien usa este simulador configura escenarios; no opera trenes."
    ),
    "calidad": [
        "Obligatorio: la latencia estimada no debe superar 1000 ms "
        "(el operador debe ver el conteo a tiempo).",
        "Obligatorio: si se pide cifrar, el video de personas no viaja en claro "
        "(legible por la red).",
        "Puntuado: escalabilidad con varias cámaras, capacidad de análisis, "
        "disponibilidad estimada y uso de contenedores.",
    ],
    "restricciones": [
        "Sin integración al control real de un operador.",
        "La imagen de personas se trata bajo la Ley 1581 de 2012; no hay identificación.",
        "Estos números son estimaciones del modelo, no mediciones de laboratorio.",
    ],
    "aviso_resultados": (
        "Estos resultados son estimaciones del modelo, no mediciones reales de rendimiento."
    ),
    "l_max_ms": 1000,
}

ALTERNATIVES = {
    1: {
        "nombre": "Proceso único local",
        "resumen": (
            "Todo corre en un solo computador: detector, servicio y pantalla. "
            "No cifra el video. Si ese computador se apaga, no hay conteo."
        ),
    },
    2: {
        "nombre": "Servicios en contenedores",
        "resumen": (
            "El detector va en una caja de software y el servicio en otra. "
            "Se pueden copiar hasta cuatro detectores. El video puede ir cifrado."
        ),
    },
    3: {
        "nombre": "Inferencia en el borde",
        "resumen": (
            "El detector corre junto a la cámara, en la estación. "
            "Al centro de control solo llega el número de personas. "
            "El video de personas no cruza esa red."
        ),
    },
}

GLOSSARY = [
    ("K, cámaras al mismo tiempo", "Cuántas fuentes de video hay que analizar a la vez."),
    ("E, cifrar el video de personas", "Si el video no puede viajar legible por la red."),
    ("F, cuadros por segundo", "Cuántas veces por segundo se mira el video."),
    ("Latencia", "Milisegundos estimados hasta que el operador ve el conteo."),
    ("Capacidad", "Cuadros por segundo que esa arquitectura puede analizar."),
    ("Escalabilidad", "Cuántas cámaras aguantaría a este ritmo, sin saturarse."),
    ("Disponibilidad", "Porcentaje estimado de tiempo en que el conteo sigue saliendo."),
    ("Ocupación", "Qué tan llena está la máquina. Si llega a 1, no da abasto."),
    ("Contenedor", "Caja de software que aísla un programa para copiarlo o arrancarlo aparte."),
    ("Borde", "Un equipo junto a la cámara, en la estación."),
]

INPUT_HELP = {
    "K": "Número entero de 1 a 20. Cámaras que TORNS debe analizar al mismo tiempo.",
    "E": "Sí o no. Sí significa que el video de personas no puede viajar en claro.",
    "F": "Número entero de 1 a 15. Cuadros de video analizados cada segundo.",
}

SCENARIOS = [
    {"id": "referencia", "label": "Escenario de referencia", "K": 2, "E": False, "F": 5},
    {"id": "minimo", "label": "Una cámara, sin cifrado", "K": 1, "E": False, "F": 5},
    {"id": "carga", "label": "Ocho cámaras, con cifrado", "K": 8, "E": True, "F": 5},
]
```

`torns-sim-arquitectura/torns_sim/explain.py`:

```python
from torns_sim.model import AlternativeResult, SimulationResult
from torns_sim.project import PROJECT


def _failure_clause(row: AlternativeResult) -> str:
    parts: list[str] = []
    if row.fail_latency:
        parts.append(
            "la latencia estimada supera 1000 ms "
            "(el operador no vería el conteo a tiempo)"
        )
    if row.fail_encryption:
        parts.append(
            "el video de personas viajaría en claro y el escenario pide cifrarlo"
        )
    if not parts:
        return "no tiene un fallo obligatorio listado"
    return " y ".join(parts)


def _advantage(row: AlternativeResult) -> str:
    if row.alt == 1:
        return (
            "Ventaja: menos piezas; un solo computador basta para esta carga. "
            "Límite: no cifra el video y no copia el detector."
        )
    if row.alt == 2:
        return (
            "Ventaja: se pueden copiar detectores y el video puede ir cifrado. "
            "Límite: el video anotado sigue viajando al centro de control; hay más piezas que operar."
        )
    return (
        "Ventaja: el video de personas no sale de la estación y cada cámara carga la suya. "
        "Límite: el equipo de estación es más lento por cuadro que un computador de escritorio."
    )


def explain(result: SimulationResult) -> str:
    aviso = PROJECT["aviso_resultados"]
    if result.recommended_alt is None:
        lines = [
            "Ninguna alternativa es elegible bajo los requisitos obligatorios.",
            aviso,
        ]
        for row in result.alternatives:
            lines.append(
                f"Alternativa {row.alt} ({row.name}): {_failure_clause(row)}."
            )
        return " ".join(lines)

    winner = next(row for row in result.alternatives if row.alt == result.recommended_alt)
    score_txt = round(winner.score, 4) if winner.score is not None else "n/d"
    return (
        f"Recomendación: alternativa {winner.alt} ({winner.name}). "
        f"Pasa los dos requisitos obligatorios: latencia estimada {round(winner.L)} ms "
        f"(tope {PROJECT['l_max_ms']} ms) y la regla de cifrado de este escenario. "
        f"Obtiene el mayor puntaje ({score_txt}) entre las elegibles. "
        f"{_advantage(winner)} "
        f"Supuesto: los milisegundos son parámetros del taller, no una medición de campo. "
        f"{aviso}"
    )
```

Update `__init__.py` to also export `PROJECT`, `explain`, `GLOSSARY`, `ALTERNATIVES`, `SCENARIOS`, `INPUT_HELP`.

- [ ] **Step 4: Run tests**

```bash
cd torns-sim-arquitectura
python3 -m pytest tests -v
```

Expected: PASS, including `tests/test_explain.py`.

- [ ] **Step 5: Commit**

```bash
git add torns-sim-arquitectura/torns_sim/project.py torns-sim-arquitectura/torns_sim/explain.py \
  torns-sim-arquitectura/torns_sim/__init__.py torns-sim-arquitectura/tests/test_explain.py
git commit -m "feat: explain TORNS architecture recommendation in Spanish"
```

---

### Task 5: Aplicativo web

**Files:**
- Create: `torns-sim-arquitectura/app.py`
- Create: `torns-sim-arquitectura/templates/index.html`
- Create: `torns-sim-arquitectura/static/app.css`
- Create: `torns-sim-arquitectura/tests/test_app.py`

**Interfaces:**
- Consumes: `parse_inputs`, `simulate`, `explain`, `PROJECT`, `ALTERNATIVES`, `GLOSSARY`, `SCENARIOS`, `INPUT_HELP`
- Produces: `GET /` form; `POST /` with fields `K`, `E`, `F`; query `?escenario=referencia|minimo|carga` loads a preset; HTML table of the three alternatives; recommendation paragraph; invalid input shows the `InputError` message without a fake table

- [ ] **Step 1: Write the failing tests**

Create `torns-sim-arquitectura/tests/test_app.py`:

```python
from fastapi.testclient import TestClient

from app import app

client = TestClient(app)


def test_get_shows_fiche_and_inputs():
    response = client.get("/")
    assert response.status_code == 200
    text = response.text
    assert "LIRN" in text
    assert "TORNS" in text
    assert "Johel Arias" in text
    assert "cámaras al mismo tiempo" in text.lower()
    assert "estimaciones del modelo" in text.lower()
    assert "Escenario de referencia" in text


def test_post_reference_recommends_alt2():
    response = client.post("/", data={"K": "2", "E": "no", "F": "5"})
    assert response.status_code == 200
    text = response.text.lower()
    assert "alternativa 2" in text
    assert "180" in response.text
    assert "130" in response.text
    assert "122" in response.text
    assert "estimaciones del modelo" in text


def test_post_invalid_k_shows_message():
    response = client.post("/", data={"K": "0", "E": "no", "F": "5"})
    assert response.status_code == 200
    assert "1" in response.text and "20" in response.text
    assert "alternativa 2" not in response.text.lower() or "puntaje" not in response.text.lower()


def test_preset_carga_recommends_alt3():
    response = client.get("/?escenario=carga")
    assert response.status_code == 200
    assert "alternativa 3" in response.text.lower()
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd torns-sim-arquitectura
python3 -m pip install -r requirements.txt
python3 -m pytest tests/test_app.py -v
```

Expected: FAIL (`No module named 'app'`).

- [ ] **Step 3: Write the app**

`torns-sim-arquitectura/app.py`:

```python
from pathlib import Path

from fastapi import FastAPI, Form, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from torns_sim.explain import explain
from torns_sim.model import InputError, parse_inputs, simulate
from torns_sim.project import (
    ALTERNATIVES,
    GLOSSARY,
    INPUT_HELP,
    PROJECT,
    SCENARIOS,
)

ROOT = Path(__file__).resolve().parent
app = FastAPI(title="Simulador de arquitecturas TORNS")
app.mount("/static", StaticFiles(directory=ROOT / "static"), name="static")
templates = Jinja2Templates(directory=str(ROOT / "templates"))


def _e_to_form(value: bool) -> str:
    return "sí" if value else "no"


def _context(
    request: Request,
    K: str = "2",
    E: str = "no",
    F: str = "5",
    error: str | None = None,
    result=None,
    explanation: str | None = None,
):
    return {
        "request": request,
        "project": PROJECT,
        "alternatives": ALTERNATIVES,
        "glossary": GLOSSARY,
        "input_help": INPUT_HELP,
        "scenarios": SCENARIOS,
        "K": K,
        "E": E,
        "F": F,
        "error": error,
        "result": result,
        "explanation": explanation,
        "round": round,
    }


@app.get("/", response_class=HTMLResponse)
def get_index(request: Request, escenario: str | None = None):
    preset = next((item for item in SCENARIOS if item["id"] == escenario), None)
    if preset is None:
        return templates.TemplateResponse(request, "index.html", _context(request))
    result = simulate(preset["K"], preset["E"], preset["F"])
    return templates.TemplateResponse(
        request,
        "index.html",
        _context(
            request,
            K=str(preset["K"]),
            E=_e_to_form(preset["E"]),
            F=str(preset["F"]),
            result=result,
            explanation=explain(result),
        ),
    )


@app.post("/", response_class=HTMLResponse)
def post_index(
    request: Request,
    K: str = Form(...),
    E: str = Form(...),
    F: str = Form(...),
):
    try:
        k, e, f = parse_inputs(K, E, F)
    except InputError as err:
        return templates.TemplateResponse(
            request,
            "index.html",
            _context(request, K=K, E=E, F=F, error=str(err)),
        )
    result = simulate(k, e, f)
    return templates.TemplateResponse(
        request,
        "index.html",
        _context(
            request,
            K=str(k),
            E=_e_to_form(e),
            F=str(f),
            result=result,
            explanation=explain(result),
        ),
    )
```

`torns-sim-arquitectura/templates/index.html`:

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Simulador de arquitecturas TORNS</title>
    <link rel="stylesheet" href="/static/app.css" />
  </head>
  <body>
    <header>
      <p class="kicker">LIRN · producto TORNS</p>
      <h1>Simulador de arquitecturas TORNS</h1>
      <p class="notice">{{ project.aviso_resultados }}</p>
    </header>

    <section>
      <h2>Ficha del proyecto</h2>
      <p><strong>Función:</strong> {{ project.funcion }}</p>
      <p>{{ project.as_is }}</p>
      <p>{{ project.caso_estudio }}</p>
      <p>{{ project.equipo }}</p>
      <p>{{ project.usuarios_producto }}</p>
      <h3>Calidad</h3>
      <ul>
        {% for item in project.calidad %}<li>{{ item }}</li>{% endfor %}
      </ul>
      <h3>Restricciones</h3>
      <ul>
        {% for item in project.restricciones %}<li>{{ item }}</li>{% endfor %}
      </ul>
    </section>

    <section>
      <h2>Tres alternativas (el mismo TORNS)</h2>
      {% for num, alt in alternatives.items() %}
      <article>
        <h3>Alternativa {{ num }} · {{ alt.nombre }}</h3>
        <p>{{ alt.resumen }}</p>
      </article>
      {% endfor %}
    </section>

    <section>
      <h2>Variables de entrada</h2>
      <p>{{ input_help.K }}</p>
      <p>{{ input_help.E }}</p>
      <p>{{ input_help.F }}</p>
      <p>Escenarios listos (mismas reglas, distintas entradas):</p>
      <p>
        {% for item in scenarios %}
        <a class="btn" href="/?escenario={{ item.id }}">{{ item.label }}</a>
        {% endfor %}
      </p>
      <form method="post" action="/">
        <label>
          K, cámaras al mismo tiempo
          <input type="number" name="K" min="1" max="20" step="1" value="{{ K }}" required />
        </label>
        <label>
          E, ¿hay que cifrar el video de personas?
          <select name="E">
            <option value="no" {% if E == "no" %}selected{% endif %}>no</option>
            <option value="sí" {% if E == "sí" %}selected{% endif %}>sí</option>
          </select>
        </label>
        <label>
          F, cuadros por segundo que se analizan
          <input type="number" name="F" min="1" max="15" step="1" value="{{ F }}" required />
        </label>
        <button type="submit">Ejecutar simulación</button>
      </form>
      {% if error %}<p class="error" role="alert">{{ error }}</p>{% endif %}
    </section>

    {% if result %}
    <section>
      <h2>Resultados comparables</h2>
      <p>
        Entradas usadas: K = {{ result.K }} cámaras,
        E = {% if result.E %}sí{% else %}no{% endif %},
        F = {{ result.F }} cuadros/s.
        {{ project.aviso_resultados }}
      </p>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Indicador</th>
              <th>Alt. 1 proceso único</th>
              <th>Alt. 2 contenedores</th>
              <th>Alt. 3 borde</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Capacidad C (cuadros/s que puede analizar)</td>
              {% for row in result.alternatives %}<td>{{ "%.2f"|format(row.C) }}</td>{% endfor %}
            </tr>
            <tr>
              <td>Ocupación (qué tan llena está la máquina)</td>
              {% for row in result.alternatives %}<td>{{ "%.4f"|format(row.rho) }}</td>{% endfor %}
            </tr>
            <tr>
              <td>Latencia L (ms hasta ver el conteo)</td>
              {% for row in result.alternatives %}<td>{{ round(row.L) }}</td>{% endfor %}
            </tr>
            <tr>
              <td>Escalabilidad S (cámaras que aguantaría a este F)</td>
              {% for row in result.alternatives %}<td>{{ row.S }}</td>{% endfor %}
            </tr>
            <tr>
              <td>Disponibilidad A (%)</td>
              {% for row in result.alternatives %}<td>{{ "%.1f"|format(row.A) }}</td>{% endfor %}
            </tr>
            <tr>
              <td>¿Cumple cifrado?</td>
              {% for row in result.alternatives %}<td>{{ "sí" if row.encryption_ok else "no" }}</td>{% endfor %}
            </tr>
            <tr>
              <td>¿Usa contenedores?</td>
              {% for row in result.alternatives %}<td>{{ "sí" if row.uses_containers else "no" }}</td>{% endfor %}
            </tr>
            <tr>
              <td>¿Elegible?</td>
              {% for row in result.alternatives %}<td>{{ "sí" if row.eligible else "no" }}</td>{% endfor %}
            </tr>
            <tr>
              <td>Puntaje</td>
              {% for row in result.alternatives %}
              <td>{% if row.score is not none %}{{ "%.4f"|format(row.score) }}{% else %}n/d{% endif %}</td>
              {% endfor %}
            </tr>
          </tbody>
        </table>
      </div>
      <p><strong>{{ explanation }}</strong></p>
    </section>
    {% endif %}

    <section>
      <h2>Glosario</h2>
      <dl>
        {% for term, meaning in glossary %}
        <dt>{{ term }}</dt>
        <dd>{{ meaning }}</dd>
        {% endfor %}
      </dl>
    </section>
  </body>
</html>
```

`torns-sim-arquitectura/static/app.css`:

```css
:root {
  color-scheme: light;
  font-family: sans-serif;
  line-height: 1.45;
}
body {
  margin: 0 auto;
  max-width: 72rem;
  padding: 1rem;
}
.kicker { letter-spacing: 0.04em; text-transform: uppercase; font-size: 0.8rem; }
.notice, .error { padding: 0.75rem; border: 1px solid #333; }
.error { font-weight: 700; }
label { display: block; margin: 0.75rem 0; }
input, select, button { font: inherit; padding: 0.4rem; }
.btn { display: inline-block; margin: 0.25rem 0.25rem 0.25rem 0; padding: 0.4rem 0.7rem; border: 1px solid #333; text-decoration: none; color: inherit; }
.table-wrap { overflow-x: auto; }
table { border-collapse: collapse; width: 100%; min-width: 40rem; }
th, td { border: 1px solid #333; padding: 0.4rem; text-align: left; vertical-align: top; }
@media (max-width: 40rem) {
  body { padding: 0.75rem; }
  h1 { font-size: 1.4rem; }
}
```

- [ ] **Step 4: Run tests**

```bash
cd torns-sim-arquitectura
python3 -m pytest tests -v
```

Expected: PASS, including `tests/test_app.py`.

Manual check:

```bash
cd torns-sim-arquitectura
python3 -m uvicorn app:app --reload --port 8765
```

Open `http://127.0.0.1:8765`. Load the three scenario links. Submit `K=0` and confirm the error. Narrow the viewport (or DevTools mobile) and confirm the table scrolls instead of overflowing the page.

- [ ] **Step 5: Commit**

```bash
git add torns-sim-arquitectura/app.py torns-sim-arquitectura/templates/index.html \
  torns-sim-arquitectura/static/app.css torns-sim-arquitectura/tests/test_app.py
git commit -m "feat: serve TORNS architecture simulator web UI"
```

---

### Task 6: README de entrega (requisito 11 de la guía)

**Files:**
- Create: `torns-sim-arquitectura/README.md`

**Interfaces:**
- Consumes: spec + running app
- Produces: description of the model, variables, formulas, decision criteria, usage, limitations, local URL

- [ ] **Step 1: Write README.md** (no test file; verify by reading)

Create `torns-sim-arquitectura/README.md` with exactly these sections, in Spanish:

1. Qué es (simulador de despliegue de TORNS, no el dashboard operativo; estimaciones)
2. Identidad (LIRN / TORNS / Johel Arias / Transmilenio caso de estudio)
3. Cómo ejecutar: `pip install -r requirements.txt`, `pytest`, `uvicorn app:app --port 8765`, URL `http://127.0.0.1:8765`
4. Variables `K`, `E`, `F` y rangos
5. Alternativas 1–3 en un párrafo cada una
6. Fórmulas (copiar las de la sección 7 del spec, without claiming they are lab measurements)
7. Criterios de decisión (RQ-01, RQ-02, puntaje)
8. Cinco pruebas: `python3 -m pytest tests -v` covers invalid `K`, reference, `K=1` no cifrado, `K=1` cifrado, `F=15`
9. Cómo sustentar: abrir referencia, cambiar a ocho cámaras con cifrado, leer la recomendación
10. Limitaciones and what would be needed to validate in a real system (spec section 8)
11. Enlace al simulador: local `http://127.0.0.1:8765` until a public host exists. Do not invent a production URL

- [ ] **Step 2: Run the full suite once more**

```bash
cd torns-sim-arquitectura
python3 -m pytest tests -v
```

Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add torns-sim-arquitectura/README.md
git commit -m "docs: describe TORNS architecture simulator for the course handoff"
```

---

## Self-review (plan vs spec)

| Spec section | Task |
| --- | --- |
| Req 1 ficha, usuarios, calidad, restricciones | Task 4 `PROJECT` + Task 5 HTML |
| Req 2 tres alternativas | Task 4 `ALTERNATIVES` + Task 5 HTML |
| Req 3 `K`,`E`,`F` + referencia | Task 1 parse, Task 5 form and `SCENARIOS` |
| Req 4 fórmulas, puntaje, oráculos | Task 2–3 |
| Lenguaje natural | Task 4 glossary + Task 5 labels |
| Cinco pruebas | Tasks 1–3 and 5 |
| Req 5–12 UI/docs | Tasks 5–6 (minimal web + README; table instead of charts) |
| No `tro-backend` / YOLO | engine is pure Python |

No TBD. Types `AlternativeResult` / `SimulationResult` / `parse_inputs` / `simulate` / `explain` are named the same in every task.
