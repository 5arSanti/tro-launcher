# Diseño: respuestas IA/ML de TORNS (preguntas 5, 6, 10 y 16)

Fecha: 2026-10-07  
Estado: aprobado (respuestas cortas, un párrafo por pregunta o subpregunta)

## Objetivo

Responder las preguntas de Johel sobre el uso aplicado de IA y ML en TORNS, verificadas contra `tro-backend` y `yolo-train-routes-optimization`.

Archivo: `docs/presentations/torns-respuestas-ia-ml.md`

## Decisiones

- Pregunta 5: backend 100 % Python (FastAPI + Ultralytics en el mismo proceso) y dos canales (MJPEG para video, WebSocket para métricas JSON).
- Pregunta 6: la capa de inferencia (modelo entrenado y su pipeline de datos, más la integración acoplada a Ultralytics que produce el conteo para el despacho).
- Pregunta 10: separar entrenamiento de inferencia. Entrada en operación = cuadros de video; salida = cajas de persona y conteo; datos = Roboflow coco-person + Label Studio (3.694 train / 1.000 val, YOLO11s, 60 épocas, 512 px); evaluación = métricas de validación reales y validación en estación como propuesta.
- Pregunta 16: entrada cuadro de video, salida conteo de personas; la recomendación de trenes es regla, no IA.

## Restricciones

- Usar "conteo de personas", no "densidad poblacional" (el código no calcula densidad por área).
- No afirmar validación en estación como hecho; presentarla como siguiente paso.
- Sin guiones largos (—) como conectores.
