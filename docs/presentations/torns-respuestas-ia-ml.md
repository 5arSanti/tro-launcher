# TORNS: respuestas sobre IA y ML aplicado

Responsable: Johel

---

## 5. ¿Cuál ha sido hasta ahora la principal decisión técnica que han tenido que tomar? ¿Por qué tomaron esa decisión?

La principal decisión técnica fue construir el backend completamente en Python, con FastAPI y Ultralytics YOLO en el mismo proceso, para ejecutar la inferencia del modelo de visión en el servidor y en tiempo real. Python concentra el ecosistema de visión artificial (Ultralytics, OpenCV y NumPy), lo que nos permitió entrenar y servir el modelo con las mismas herramientas. Además, separamos la comunicación en dos canales: el video anotado viaja como stream MJPEG por HTTP y las métricas de detección se envían por WebSocket en JSON, de modo que el cliente recibe los datos al instante sin consultar al servidor y sin transportar imágenes por ese canal.

## 6. ¿Qué parte de la aplicación sería más difícil de reemplazar si mañana cambiaran de tecnología?

Sería la capa de inferencia, es decir, el modelo entrenado y su integración con el backend. El modelo es fruto de un proceso propio (dataset coco-person más imágenes etiquetadas en Label Studio, preprocesamiento y entrenamiento de YOLO11s a 512 px), así que cambiar de tecnología obliga a reentrenarlo y validarlo de nuevo. Además, el servicio de detección depende del formato de resultados de Ultralytics para convertir cada cuadro en un conteo de personas, y ese conteo alimenta directamente la recomendación de trenes.

## 10. Para visión artificial

**¿Qué recibe el modelo?**  
En operación recibe cuadros de video que el backend lee con OpenCV desde archivos de video de la estación o desde una cámara USB o RTSP. Las imágenes etiquetadas solo se usaron para entrenar.

**¿Qué resultado produce?**  
Produce cajas delimitadoras de la clase persona con su nivel de confianza (umbral 0,5). El backend las dibuja sobre el video y las suma en un conteo de personas, que alimenta la recomendación de trenes. Es un conteo, no una densidad por área.

**¿Qué datos utilizaron?**  
Usamos el dataset público [coco-person de Roboflow Universe](https://universe.roboflow.com/neens/coco-person-kgihg), con una sola clase (persona), complementado con imágenes propias etiquetadas en Label Studio. Tras limpiar y preprocesar los datos quedaron 3.694 imágenes de entrenamiento y 1.000 de validación, con las que ajustamos YOLO11s durante 60 épocas.

**¿Cómo determinarían si el modelo está funcionando correctamente?**  
En validación obtuvo precisión 0,73, recall 0,55 y mAP50 0,64. Esto indica que suele acertar cuando detecta, pero omite casi la mitad de las personas en aglomeraciones, por lo que tiende a contar de menos. Como siguiente paso proponemos comparar su conteo con un conteo manual en clips del andén y aceptar el modelo si el error no cambia la recomendación de trenes.

## 16. ¿Cuál es la entrada y cuál es la salida de su componente de IA?

La entrada es un cuadro de video capturado por la cámara de la estación. La salida son las personas detectadas, cada una con su caja y su confianza, que el backend resume en un conteo por cuadro y publica por WebSocket en JSON (`person_count`, `total_objects` y `timestamp`). Luego una regla de despacho, que no es IA, usa ese conteo para recomendar el tipo y la cantidad de trenes.
