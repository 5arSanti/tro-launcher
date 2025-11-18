# Sistema TRO (Train Routes Optimization)

## Descripción General

**TRO-Launcher** es un sistema integral de optimización de rutas de trenes basado en **reconocimiento de personas mediante visión por computadora**. El objetivo principal es detectar y contabilizar la cantidad de usuarios que demandan el servicio de transporte metro para **optimizar la asignación de recursos** (número de vagones, frecuencia de trenes) en tiempo real.

### Objetivo Principal

Implementar un sistema de **detección automática de demanda de pasajeros** utilizando técnicas de **Machine Learning (YOLO)** para:

- Contabilizar personas en estaciones de metro en tiempo real
- Transmitir video procesado mediante WebSockets
- Predecir la demanda de transporte
- Optimizar rutas y asignación de recursos
- Mejorar la eficiencia operativa del sistema de transporte

---

## Arquitectura del Sistema

El sistema implementa una **arquitectura de microservicios distribuida** con comunicación en tiempo real mediante **WebSockets** para streaming de video y datos:

```
┌─────────────────────────────────────────────────────────┐
│                    TRO-LAUNCHER                         │
│              (Repositorio Principal)                    │
└─────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│ YOLO-TRAIN   │   │ TRO-BACKEND  │   │ TRO-FRONTEND │
│   ROUTES     │   │              │   │              │
│ OPTIMIZATION │◄──┤  (FastAPI)   │◄──┤   (React)    │
│              │   │              │   │              │
│ (Detección)  │   │ WebSocket    │   │  WebSocket   │
│              │   │   Server     │   │   Client     │
└──────────────┘   └──────────────┘   └──────────────┘
      │                    │                   │
      │  Video Stream      │  Real-time Data   │
      └────────WebSocket───┴───────WebSocket───┘
```

### 1. **Arquitectura de 3 Capas con Comunicación en Tiempo Real**

#### **Capa de Presentación** - tro-frontend
- **Tecnología**: React.js + WebSocket Client
- **Función**: Interfaz de usuario con streaming de video en tiempo real
- **Responsabilidades**:
  - Dashboard de visualización en tiempo real
  - **Cliente WebSocket para recibir video procesado**
  - **Visualización de detecciones en vivo**
  - Gráficos de demanda de pasajeros
  - Control de cámaras y estaciones
  - Reportes y análisis

#### **Capa de Lógica de Negocio** - tro-backend
- **Tecnología**: FastAPI + WebSocket Server
- **Función**: API REST y servidor WebSocket para comunicación bidireccional
- **Responsabilidades**:
  - Endpoints REST para consultas de datos
  - **Servidor WebSocket para streaming de video**
  - **Manejo de conexiones persistentes en tiempo real**
  - Procesamiento de información de detección
  - Algoritmos de optimización de rutas
  - Gestión de base de datos
  - Coordinación con el módulo de detección

#### **Capa de Detección** - yolo-train-routes-optimization
- **Tecnología**: YOLO + OpenCV + WebSocket Client
- **Función**: Modelo de ML para detección y streaming de video procesado
- **Responsabilidades**:
  - Procesamiento de video en tiempo real
  - Detección y conteo de personas
  - **Streaming de frames procesados vía WebSocket**
  - Tracking de movimientos
  - Generación de métricas de afluencia

---

## Comunicación en Tiempo Real (WebSockets)

### ¿Por qué WebSockets?

Los **WebSockets** son esenciales en este sistema porque permiten:

- **Comunicación bidireccional** entre cliente y servidor
- **Baja latencia** (<50ms) para streaming de video
- **Conexión persistente** sin overhead de HTTP
- **Transmisión continua** de frames de video
- **Actualizaciones en tiempo real** de detecciones

### Arquitectura de WebSockets

```
┌────────────────────────────────────────────────────────────┐
│                  FLUJO DE VIDEO EN TIEMPO REAL             │
└────────────────────────────────────────────────────────────┘

┌─────────────┐
│   Cámara    │
│  Estación   │
└──────┬──────┘
       │ RTSP/HTTP Stream
       ▼
┌─────────────────────┐
│  YOLO Processor     │
│                     │
│  1. Captura frame   │
│  2. Detección YOLO  │
│  3. Draw bboxes     │
│  4. Encode JPEG     │
└──────┬──────────────┘
       │ WebSocket Client
       │ ws://backend:8000/ws/video
       ▼
┌─────────────────────┐
│  FastAPI Backend    │
│  WebSocket Server   │
│                     │
│  - Recibe frames    │
│  - Broadcast        │
│  - Gestiona         │
│    conexiones       │
└──────┬──────────────┘
       │ WebSocket Broadcast
       │ ws://backend:8000/ws/stream
       ▼
┌─────────────────────┐
│  React Frontend     │
│  WebSocket Client   │
│                     │
│  - Conexión WS      │
│  - Recibe frames    │
│  - Decode & Display │
│  - <video> element  │
└─────────────────────┘
       │
       ▼
┌─────────────────────┐
│  Usuario Final      │
│  Ve video en vivo   │
│  con detecciones    │
└─────────────────────┘
```

### Características del Sistema WebSocket

#### **1. Baja Latencia**

```python
# Optimización de latencia
- Compresión JPEG: Calidad 85%
- Resolución adaptativa: 1280x720 o menor
- Buffer pequeño: 1 frame
- FPS dinámico: Ajustable según ancho de banda
```

#### **2. Gestión de Múltiples Cámaras**

```python
# Estructura de canales por estación
websocket_channels = {
    "station_01": {
        "camera_01": ws_connection_1,
        "camera_02": ws_connection_2
    },
    "station_02": {
        "camera_01": ws_connection_3
    }
}
```

## Componentes Principales

### 1. YOLO Train Routes Optimization

**Propósito**: Módulo de visión por computadora con streaming WebSocket.

**Tecnologías**:
- **YOLO v8/v11**: Detección de objetos
- **OpenCV**: Procesamiento de video
- **WebSockets**: Transmisión en tiempo real
- **PyTorch**: Framework de Deep Learning

**Funcionalidades**:

1. **Captura de Video Multi-fuente**
   ```python
   # Soporta múltiples fuentes
   sources = [
       "rtsp://camera1/stream",    # Cámara IP
       "http://camera2/mjpeg",     # MJPEG stream
       0,                           # Webcam local
       "video.mp4"                  # Archivo de video
   ]
   ```

2. **Procesamiento YOLO en Tiempo Real**
   - Detección de personas (clase 0 en COCO)
   - Bounding boxes con confianza
   - Tracking multi-objeto (DeepSORT)

3. **Streaming WebSocket**
   - Codificación JPEG optimizada
   - Transmisión asíncrona
   - Metadata adjunta (conteo, timestamps)

4. **Métricas de Afluencia**
   - Conteo por frame
   - Densidad de ocupación
   - Patrones de flujo

### 2. TRO Backend

**Propósito**: API REST + Servidor WebSocket.

**Funcionalidades WebSocket**: Hacer un puente bidireccional entre el frontend, el backend y el modelo de visión artificial para que la transmisión se realice en tiempo real a las camaras y servidores de cada una de las estaciones reduciendo la latencia y la obtención de resultados.

### 3. TRO Frontend

**Propósito**: Visualización de video en tiempo real.

---

## Flujo de Datos Completo con WebSockets

```
┌────────────────────────────────────────────────────────────┐
│              FLUJO COMPLETO DEL SISTEMA                    │
└────────────────────────────────────────────────────────────┘

1. CAPTURA
      Cámara → RTSP Stream
                    ↓

2. PROCESAMIENTO
   YOLO Module
      - Captura frame
      - Detección YOLO
      - Draw bboxes
      - Conteo personas
                    ↓
      WebSocket Client
      ws.send(frame_bytes)
      ws.send(metadata)
                    ↓

3. DISTRIBUCIÓN
   FastAPI Backend
      - WebSocket Server
      - Recibe frames
      - Broadcast a clientes
      - Guarda métricas en DB
                    ↓

4. VISUALIZACIÓN
   React Frontend
      - WebSocket Client
      - Recibe frames
      - Renderiza
      - Muestra estadísticas
                    ↓

5. USUARIO
   Operador
      - Ve video en vivo
      - Monitorea conteos
      - Recibe alertas
```

### Latencia Total del Sistema

```
Component                    | Latency
-----------------------------|----------
Cámara → YOLO Capture        | ~30ms
YOLO Inference               | ~40ms
Frame Encoding (JPEG)        | ~10ms
WebSocket Transmission       | ~20ms
Frontend Decode & Render     | ~15ms
-----------------------------|----------
TOTAL END-TO-END             | ~115ms
```

---

## Ventajas del Sistema WebSocket

| Ventaja | Descripción |
|---------|-------------|
| **Baja Latencia** | <120ms end-to-end |
| **Bidireccional** | Cliente y servidor pueden enviar datos |
| **Eficiente** | Sin overhead de HTTP requests |
| **Persistente** | Conexión mantenida abierta |
| **Escalable** | Múltiples cámaras y clientes |
| **Ligero** | Menor consumo de ancho de banda que polling |

---

## Configuración e Instalación

### 1. Clonar el Repositorio Principal

```bash
git clone https://github.com/usuario/tro-launcher.git
cd tro-launcher
```

### 2. Inicializar Submódulos

```bash
git submodule update --init --recursive
git submodule update --remote
```

### 3. Configurar Backend con WebSocket

```bash
cd tro-backend
source .venv/Scripts/activate  # Windows
# source .venv/bin/activate    # Linux/Mac

# Instalar las dependencias
python -m pip install --upgrade pip
python -m pip install -e ".[dev]"
# Levantar servidor
python -m uvicorn src.main:app --host 0.0.0.0 --port 8000 --reload
```

### 4. Configurar Frontend con WebSocket Client

```bash
cd tro-frontend

npm install

npm run dev
```

---

## Diagrama de Arquitectura Completo con WebSockets

```
┌──────────────────────────────────────────────────────────────┐
│                 SISTEMA TRO CON WEBSOCKETS                   │
└──────────────────────────────────────────────────────────────┘

┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Estación A    │    │   Estación B    │    │   Estación C    │
│     Cámara 1    │    │     Cámara 1    │    │     Cámara 1    │
│     Cámara 2    │    │     Cámara 2    │    │     Cámara 2    │
└────────┬────────┘    └────────┬────────┘    └────────┬────────┘
         │ RTSP Stream         │                       │
         └──────────────────────┼───────────────────────┘
                                │
                                ▼
                   ┌─────────────────────────┐
                   │   YOLO Detection +      │
                   │   WebSocket Client      │
                   │                         │
                   │  • Detección personas   │
                   │  • Procesamiento frames │
                   │  • ws.send(frames)      │
                   └───────────┬─────────────┘
                               │ WebSocket
                               │ ws://backend:8000/ws/video/input
                               ▼
                   ┌─────────────────────────┐
                   │  FastAPI Backend +      │
                   │  WebSocket Server       │
                   │                         │
                   │  • Recibe frames        │
                   │  • Broadcast clientes   │
                   │  • Gestión conexiones   │
                   │  • DB persistence       │
                   └───────────┬─────────────┘
                               │ WebSocket
                               │ ws://backend:8000/ws/video/stream
                               ▼
                   ┌─────────────────────────┐
                   │  React Frontend +       │
                   │  WebSocket Client       │
                   │                         │
                   │  • Conexión WS          │
                   │  • Recibe frames        │
                   │  • Renderiza <canvas>   │
                   │  • Actualiza métricas   │
                   └───────────┬─────────────┘
                               │
                               ▼
                   ┌─────────────────────────┐
                   │   Operadores / Users    │
                   │                         │
                   │  • Video en vivo        │
                   │  • Conteo en tiempo real│
                   │  • Alertas instantáneas │
                   └─────────────────────────┘
```

---

## Conclusión

El sistema **TRO** implementa una arquitectura robusta de **streaming de video en tiempo real** mediante **WebSockets**, permitiendo:

1. **Transmisión de video con baja latencia** (<120ms)
2. **Detección de personas en tiempo real** con YOLO
3. **Comunicación bidireccional eficiente** entre componentes
4. **Escalabilidad** para múltiples cámaras y clientes
5. **Optimización dinámica** de recursos de transporte

La combinación de **YOLO + WebSockets + FastAPI + React** crea un sistema completo para monitoreo y optimización de sistemas de transporte masivo basado en demanda real de pasajeros.