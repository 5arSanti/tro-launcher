# Cadena de valor de LIRN (borrador de apoyo, AS-IS con proyección TO-BE)

Actividades primarias tomadas de los tres procesos misionales (P-02, P-03, P-04) y de apoyo de P-01, P-05 y de la infraestructura observada. Lo que no existe hoy se marca como brecha.

```mermaid
flowchart TB
    subgraph APOYO["Actividades de apoyo"]
        direction LR
        A1["Dirección estratégica y control de claims (P-01)<br/>Observado"]
        A2["Evidencia, calidad y mejora (P-05)<br/>Observado"]
        A3["Infraestructura: estación de trabajo, repositorio, sitio estático<br/>Observado"]
        A4["Desarrollo tecnológico: entrenamiento y versionado del modelo<br/>Observado"]
        A5["Finanzas y facturación (CAP-09)<br/>Ausente, brecha"]
        A6["Talento humano (CAP-10)<br/>Ausente, brecha"]
    end
    subgraph PRIM["Actividades primarias"]
        direction LR
        B1["Captación de interés<br/>P-02, SN-01<br/>Diseñado AS-IS"]
        B2["Realización del producto TORNS<br/>P-03, SN-02<br/>Observado"]
        B3["Acompañamiento y demostración<br/>P-04, SN-02<br/>Observado"]
        B4["Propuesta, contrato y piloto pagado<br/>Sin proceso hoy<br/>Objetivo TO-BE"]
        B5["Soporte técnico y mejora con el operador<br/>Sin proceso hoy<br/>Objetivo TO-BE"]
        B1 --> B2 --> B3 --> B4 --> B5
    end
    APOYO ~~~ PRIM
```

Disposición: dos bloques apilados, apoyo arriba y primarias abajo. El resultado final (valor entregado, Objetivo TO-BE) se describe en la lectura, no como nodo, para reducir el ancho de la imagen.

## Lectura
- Resultado declarado: oferta ajustada a la demanda medida en estación (Objetivo TO-BE, no entregado hoy).
- B1 a B3 existen como proceso documentado (Observado o Diseñado AS-IS). B4 y B5 no existen: LIRN no tiene clientes ni pilotos (Observado) y se proyectan solo como TO-BE.
- El valor que se declara como resultado final es objetivo. No se afirma como entregado hoy.
- A5 y A6 son brechas confirmadas por el mapa de capacidades.
- No hay cifras ni costos por actividad. Si el docente exige análisis de margen, queda NO CONFIRMADO.

## Pendiente para Santiago
Decidir si presentar la cadena como modelo de Porter (actividades primarias y de apoyo, como arriba) o como cadena de valor de los servicios SN-01 a SN-03. Propongo la primera porque el mapa de procesos ya tiene tipo estratégico, misional y de apoyo.
