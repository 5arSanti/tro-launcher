# tro-launcher
Launcher for Train Routes Optimization Repos

### 1. Añadir repositorios
Solo se realiza cuando se esta creando el launcher

```bash
git submodule add -b main https://github.com/5arSanti/yolo-train-routes-optimization.git yolo-train-routes-optimization
git submodule add -b main https://github.com/5arSanti/tro-frontend.git tro-frontend
git submodule add -b main https://github.com/5arSanti/tro-backend.git tro-backend
```

### 2. Configurar Submódulos
Se realiza cuando recien se clona el launcher por primera vez

**Inicializar submódulos:**

```bash
git submodule update --init --recursive
```

**Actualizar referencias a los submódulos:**

```bash
git submodule update --remote
```

### 3. Levantar Backend
Dentro de tro-backend ejecutar:

```bash
source .venv/Scripts/activate
python -m uvicorn src.main:app --host 0.0.0.0 --port 8000 --reload
```

### 4. Levantar Frontend
Dentro de tro-frontend ejecutar:

```bash
npm i
npm run dev
```