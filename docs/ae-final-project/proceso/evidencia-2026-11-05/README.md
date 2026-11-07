# Evidencia aportada el 5 de noviembre de 2026

No forma parte del informe único. Control de calidad del taller.

## 1. URL del formulario de encuesta (AP-13)

- URL: https://forms.gle/uEEiodW6xn7VL5K69
- Título verificado el 5 de noviembre de 2026: «Tu experiencia diaria en el transporte masivo de Bogotá».
- La página pública se presenta como anónima y no muestra, en esa vista, aviso de tratamiento ni casilla de autorización Ley 1581.
- Siguen NO CONFIRMADO las respuestas individuales.

## 2. Apps Script de la hoja de leads (AP-06)

Código aportado por el dueño el 5 de noviembre de 2026: `apps-script-contactos.gs`.

Receptor declarado: Apps Script configurado en `VITE_CONTACT_ENDPOINT`. La dirección del despliegue no se reproduce. Marca: Observado por declaración del dueño (5 de noviembre de 2026).

Cotejo con `lirn-web-main/src/lib/submitContact.ts`: el cliente envía JSON en texto plano con `nombre`, `email`, `organizacion`, `mensaje` y `origen`; el script escribe las mismas columnas más `timestamp` en la hoja `Contactos`. El cliente trata HTTP 200 como éxito y no lee el cuerpo JSON.

Hallazgos del código aportado (Observado):

- `ALLOWED_ORIGIN` vale `"*"` y no se usa en `doPost` ni en `json_`.
- `doPost` pasa un código HTTP a `json_`, pero `json_` no lo aplica.
- Una consulta GET al endpoint responde que no existe `doGet`. Eso es coherente con un despliegue solo para POST.

El contrato de encargo con Google sigue NO CONFIRMADO.

## 3. Notas de la entrevista (F-15)

El autor señaló el 5 de noviembre de 2026 que las notas y resultados están al final de «Guía Actividad 2, Ingeniería Aplicada» (Equipo TORNS, 2026). Extracto por rol: `notas-entrevista-controlador-sitp.md`. El entrevistado es un controlador del SITP. No se transcribe el nombre.

## 4. Fotografías de tarjeta de códigos de radio

Dos fotografías. Coinciden con el relato de la entrevista: el controlador facilitó las tablas de códigos radiales. Transmilenio es caso de estudio. Los identificadores personales visibles no se transcriben a entregables.

## 5. TOGAF

El autor confirmó el 5 de noviembre de 2026 que el curso usa TOGAF Standard, 10th Edition.

## 6. Cámaras USB

El autor confirmó el 5 de noviembre de 2026 que no hay resultados documentados de las pruebas usb0 y usb1 de noviembre de 2025. Las fechas de prueba siguen Observadas por declaración del 2 de noviembre de 2026. No se afirma éxito ni fallo de detección.

## 7. Estado integrado del 6 de noviembre de 2026

- Foto de tarjeta de códigos: versión actual anonimizada mediante bloque opaco, integrada en el PR #30. Marca: Observado (archivo vigente).
- Historial de Git: la foto original permanece accesible en revisiones anteriores. Santiago decidió expresamente conservar el historial el 6 de noviembre de 2026. Estado: riesgo aceptado por el dueño, no eliminado; no se reescribe Git. Marca: Observado por declaración del dueño (aceptación).
- Apps Script: los controles del despliegue contra envíos indebidos, incluida la restricción de acceso, la limitación de frecuencia y la protección contra automatización, quedan NO CONFIRMADO. Retirar la dirección de la documentación no mitiga por sí solo el riesgo. En esta revisión no se hacen peticiones al receptor ni se cambian sus controles o despliegues.
