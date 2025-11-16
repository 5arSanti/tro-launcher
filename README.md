# tro-launcher
Launcher for Train Routes Optimization Repos


git submodule add -b main https://github.com/5arSanti/yolo-train-routes-optimization.git yolo-train-routes-optimization
git submodule add -b main https://github.com/5arSanti/tro-frontend.git tro-frontend
git submodule add -b main https://github.com/5arSanti/tro-backend.git tro-backend

### 1. Configurar Submódulos

**Inicializar submódulos:**

```bash
git submodule update --init --recursive
```

**Actualizar referencias a los submódulos:**

```bash
git submodule update --remote
```

source .venv/Scripts/activate
python -m uvicorn src.main:app --host 0.0.0.0 --port 8000 --reload