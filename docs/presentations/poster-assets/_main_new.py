def main() -> None:
    ASSETS.mkdir(parents=True, exist_ok=True)

    L, C, R, W = 1.26, 13.84, 26.42, 11.42
    PADX = 0.28
    IW = W - 2 * PADX
    BODY, SUB, HEAD = 18, 16, 19

    e_det = ASSETS / "ev-deteccion.png"
    e_calc = ASSETS / "ev-calculadora.png"
    e_opt = ASSETS / "ev-optimizacion.png"
    e_cam = ASSETS / "ev-camaras.png"
    e_survey = ASSETS / "ev-encuesta.png"
    e_yolo = ASSETS / "ev-yolo.png"
    crop_to(ASSETS / "poster-monitoreo.png", e_det, (474, 92, 1114, 572))
    crop_to(ASSETS / "poster-calculadora.png", e_calc, (285, 222, 865, 657), 1400)
    crop_to(ASSETS / "poster-optimizacion.png", e_opt, (290, 214, 914, 682 if False else 678), 1400)
    crop_to(ASSETS / "poster-camaras.png", e_cam, (282, 66, 1008, 410), 1800)
    survey_h = 4.7
    make_survey_chart(e_survey, IW, survey_h)
    yolo_s = 5.6
    make_yolo_chart(e_yolo, yolo_s)

    shutil.copyfile(TEMPLATE, OUTPUTS[0])
    prs = Presentation(str(OUTPUTS[0]))
    slide = prs.slides[0]
    delete_content_placeholders(slide)
    header(slide)

    TOP = 8.55
    GAP = 0.32
    COL_BOT = 48.55
    END_PAD = 0.3

    # ── 01 Introducción ───────────────────────────────────
    xi = L + PADX
    c = Card(slide, L, TOP, W, "01", "Introducción")
    y = flow_text(slide, xi, c.body, IW, [
        T("TORNS es el producto de LIRN para sistemas masivos con estaciones. Mide quién espera ahora en el andén con visión por computadora y recomienda al centro de control qué tipo de vehículo enviar y cuántos.", BODY, ls=1.18),
    ])
    y += 0.25
    flow(slide, xi, y, IW, 1.1, [("Detecta", DEEP), ("Cuenta", MID), ("Recomienda", CYAN)], ["personas en video", "N por cuadro", "vehículo y cantidad"])
    y += 1.1 + 0.75
    y = flow_text(slide, xi, y, IW, [
        T("Caso de estudio", HEAD, True, DEEP, "Arial", sa=4, ls=1.0),
        T("Transmilenio, Bogotá. Es el marco del problema, no un cliente ni un piloto firmado. Se presenta un prototipo aplicado que corre en laboratorio.", SUB, sa=10, ls=1.15),
        T("Alcance", HEAD, True, DEEP, "Arial", sa=4, ls=1.0),
        T("No optimiza la red completa, no predice demanda histórica y no calcula densidad por m². Cuenta personas y dimensiona vehículos.", SUB, ls=1.15),
    ])
    bottom = c.close(y + END_PAD)

    # ── 02 Descripción del problema ───────────────────────
    c = Card(slide, L, bottom + GAP, W, "02", "Descripción del problema")
    y = flow_text(slide, xi, c.body, IW, [
        T("En Bogotá la cantidad y la frecuencia de vehículos no siempre coinciden con la demanda real de cada estación. El horario reparte una oferta fija a partir del histórico; en el andén la gente llega ahora.", BODY, ls=1.18),
    ])
    y += 0.25
    quote = [
        T("«Dependemos totalmente del radio y de que nos reporten la TP 19. Mientras el operador del bus nos avisa y nosotros tomamos decisiones, la estación ya colapsó.»", 17, False, DEEP, i=True, sa=8, ls=1.15),
        T("La flota se nivela con códigos radiales (TP 69 agilice, TP 70 disminuya) «casi a ciegas». El reporte TP 29 llega cuando el problema ya ocurrió.", 15, False, MUTED, ls=1.12),
    ]
    qw = IW - 0.6
    qh = 0.85 + measure(quote, qw) + 0.25
    rect(slide, xi, y, IW, qh, WHITE, line=LINE, adj=0.05)
    shape(slide, MSO_SHAPE.RECTANGLE, xi, y, 0.13, qh, RED)
    tag(slide, xi + 0.32, y + 0.22, "E1", RED)
    text(slide, xi + 1.3, y + 0.2, IW - 1.5, 0.5, [T("Entrevista a un controlador SITP", 16, True, DEEP, "Arial", ls=1.0)], anchor=MSO_ANCHOR.MIDDLE)
    text(slide, xi + 0.35, y + 0.85, qw, qh - 0.9, quote)
    y += qh + 0.3
    y = figure(slide, e_survey, xi, y, IW, "E2", "E2 · Encuesta del equipo a usuarios de transporte masivo (Google Forms, 17 de agosto de 2026, n = 20). La línea roja es el criterio de validación.")
    y += 0.2
    y = flow_text(slide, xi, y, IW, [
        T("Las tres dimensiones superan el criterio: existencia (80 % en el último mes), recurrencia (65 % varias veces por semana) y costo (70 % pierde 15 min o más; unas 3 h al mes por persona).", SUB, sa=8, ls=1.15),
        T("El problema no es solo la congestión: se despacha sin una señal de quién espera ahora.", SUB + 1, True, DEEP, ls=1.15),
    ])
    bottom = c.close(y + END_PAD)

    # ── 03 Objetivos ──────────────────────────────────────
    c = Card(slide, L, bottom + GAP, W, "03", "Objetivos")
    gen = [
        T("OBJETIVO GENERAL", 14, True, ENERGY, "Arial", sa=5, ls=1.0),
        T("Detectar y contar la demanda en estación y recomendar al centro de control el tipo de vehículo y la cantidad.", 17, False, WHITE, ls=1.15),
    ]
    gh = measure(gen, IW - 0.5) + 0.35
    y = c.body
    box(slide, xi, y, IW, gh, DEEP, gen, anchor=MSO_ANCHOR.MIDDLE, adj=0.08, pad=(0.25, 0.25, 0.12, 0.12))
    y += gh + 0.22
    specifics = [
        ("Validar", "el problema con una entrevista SITP y una encuesta n = 20, con criterio de 60 %."),
        ("Entrenar", "YOLO11s en la clase persona y reportar precisión, recall y mAP50."),
        ("Inferir", "un conteo N en vivo desde video: MJPEG anotado y WebSocket de métricas."),
        ("Dimensionar", "la oferta con el vehículo más pequeño que cubre N y la regla ⌈N/C⌉."),
        ("Exponer", "el lazo en una interfaz de control: Inicio, Monitoreo, Cámaras y Optimización."),
    ]
    rg = 0.12
    row = (COL_BOT - END_PAD - y - rg * 4) / 5
    for n, (verb, rest) in enumerate(specifics):
        rect(slide, xi, y, IW, row, (WHITE, AIR)[n % 2], adj=0.12)
        box(slide, xi + 0.18, y + (row - 0.66) / 2, 0.66, 0.66, (MID, DEEP)[n % 2], [T(str(n + 1), 17, True, WHITE, "Arial", PP_ALIGN.CENTER, ls=1.0)], kind=MSO_SHAPE.OVAL, pad=(0, 0, 0, 0))
        text(slide, xi + 1.05, y, IW - 1.2, row, [T(verb, 16.5, True, DEEP, "Arial", sa=2, ls=1.0), T(rest, 15.5, ls=1.1)], anchor=MSO_ANCHOR.MIDDLE)
        y += row + rg
    c.close(COL_BOT)
    print(f"Objetivos row height {row:.2f}")

    # ── 04 Metodología ────────────────────────────────────
    xi = C + PADX
    c = Card(slide, C, TOP, W, "04", "Metodología")
    y = flow_text(slide, xi, c.body, IW, [
        T("Cinco fases, de la evidencia al centro de control. La visión por computadora es el único componente de aprendizaje automático; el despacho es una regla de capacidad.", BODY, ls=1.18),
    ])
    y += 0.3
    phases = [
        ("Descubrir", "Entrevista a un controlador SITP y encuesta a 20 usuarios. Una hipótesis se valida si al menos el 60 % confirma el problema.", "Entrevista · Google Forms  →  E1, E2"),
        ("Entrenar", "Dataset coco-person más imágenes propias etiquetadas en Label Studio: 3.694 de entrenamiento y 1.000 de validación. YOLO11s, 60 épocas, 512 px.", "Ultralytics · Label Studio  →  E3"),
        ("Inferir", "El backend abre el video con OpenCV, corre el modelo y dibuja las cajas. El conteo sale por WebSocket; el video anotado viaja como MJPEG.", "Python · FastAPI · OpenCV  →  E4"),
        ("Dimensionar", "Se elige el vehículo más pequeño cuya capacidad C cubre N (5, 10 o 15) y se calculan ⌈N/C⌉ unidades. Es una regla, no IA.", "Servicio de despacho  →  E5"),
        ("Mostrar", "La aplicación operativa expone Inicio, Monitoreo, Cámaras y Optimización para quien despacha. El operador decide.", "React 19 · Vite  →  E6, E7"),
    ]
    dot = 0.82
    tx = xi + dot + 0.25
    tw = IW - dot - 0.25
    tops = []
    for n, (name, desc, tools) in enumerate(phases):
        items = [T(name, HEAD, True, DEEP, "Arial", sa=4, ls=1.0), T(desc, 15.5, sa=5, ls=1.12), T(tools, 13, True, MID, "Arial", ls=1.0)]
        sh_h = measure(items, tw - 0.4) + 0.32
        tops.append((y, sh_h, items))
        y += sh_h + 0.2
    vline(slide, xi + dot / 2, tops[0][0] + 0.3, tops[-1][0] + 0.3, CYAN, 4)
    for n, (ty, sh_h, items) in enumerate(tops):
        box(slide, tx, ty, tw, sh_h, (WHITE, AIR)[n % 2], items, anchor=MSO_ANCHOR.MIDDLE, line=LINE, adj=0.08, pad=(0.2, 0.2, 0.12, 0.12))
        box(slide, xi, ty + 0.3 - dot / 2 + 0.1, dot, dot, (DEEP, MID, CYAN, DEEP, MID)[n], [T(str(n + 1), 20, True, WHITE, "Arial", PP_ALIGN.CENTER, ls=1.0)], kind=MSO_SHAPE.OVAL, line=WHITE, pad=(0, 0, 0, 0))
    y += 0.1
    y = flow_text(slide, xi, y, IW, [T("Cadena técnica implementada", HEAD - 1, True, DEEP, "Arial", ls=1.0)])
    y += 0.12
    flow(slide, xi, y, IW, 1.1, [("Video", NAVY), ("YOLO11s", DEEP), ("Conteo N", MID), ("⌈N/C⌉", CYAN), ("Control", ENERGY)], ["archivo · USB · RTSP", "person ≥ 0,5", "WebSocket", "5 · 10 · 15", "React"])
    y += 1.1 + 0.72
    y = flow_text(slide, xi, y, IW, [
        T("API /api/v1 con routers /health, /videos y /routing. Abrir el stream dispara la inferencia; el WebSocket publica person_count, total_objects, label_counts y timestamp, nunca frames.", 14.5, False, MUTED, ls=1.15),
    ])
    bottom = c.close(y + END_PAD)

    # ── 05 Resultados ─────────────────────────────────────
    c = Card(slide, C, bottom + GAP, W, "05", "Resultados")
    y = c.body
    cw = (IW - 0.3) / 3
    for n, (v, lab, fill) in enumerate((("0,73", "Precisión", DEEP), ("0,55", "Recall", MID), ("0,64", "mAP50", CYAN))):
        chip(slide, xi + n * (cw + 0.15), y, cw, 1.75, v, lab, fill, vsz=36)
    y += 1.75 + 0.25
    slide.shapes.add_picture(str(e_yolo), emu(xi), emu(y), width=emu(yolo_s), height=emu(yolo_s))
    tag(slide, xi + 0.15, y + 0.15, "E3")
    lect = [
        T("Lectura", HEAD - 1, True, DEEP, "Arial", sa=6, ls=1.0),
        T("Precisión 0,73: cuando detecta, suele acertar.", 15, sa=7, ls=1.12),
        T("Recall 0,55: en aglomeración omite personas; el conteo tiende a la baja.", 15, sa=7, ls=1.12),
        T("mAP50 0,64: desempeño moderado para una sola clase.", 15, sa=7, ls=1.12),
        T("Es un límite técnico del modelo, no un indicador de impacto en campo.", 14.5, True, MID, ls=1.12),
    ]
    text(slide, xi + yolo_s + 0.25, y, IW - yolo_s - 0.25, yolo_s, lect, anchor=MSO_ANCHOR.MIDDLE)
    y += yolo_s + 0.08
    y = flow_text(slide, xi, y, IW, [T("E3 · Curvas de validación por época del entrenamiento (results.csv).", 13.5, False, MUTED, i=True, ls=1.0)])
    y += 0.3
    y = flow_text(slide, xi, y, IW, [T("Del conteo al despacho · ejemplo observado en Monitoreo", HEAD - 1, True, DEEP, "Arial", ls=1.05)])
    y += 0.12
    bw = (IW - 3 * 0.12) / 4
    steps = [
        ("N = 8", "personas en\nEstación Central", NAVY),
        ("C = 5", "Ligero\nno cubre", GRAY),
        ("C = 10", "Medio\nsí cubre", MID),
        ("1", "⌈8/10⌉ unidad\nrecomendada", CYAN),
    ]
    bh = 1.8
    for n, (v, lab, fill) in enumerate(steps):
        chip(slide, xi + n * (bw + 0.12), y, bw, bh, v, lab, fill, vsz=26)
    y += bh + 0.2
    rest = COL_BOT - END_PAD - y
    text(slide, xi, y, IW, rest, [
        T("Si N = 23 y el mayor es Pesado (C = 15), se recomiendan ⌈23/15⌉ = 2 unidades. El operador confirma o descarta la recomendación.", 15, False, MUTED, ls=1.15),
    ])
    c.close(COL_BOT)
    print(f"Resultados leftover {rest - measure([T('x' * 120, 15)], IW):.2f}")

    # ── 06 Continuación de resultados ─────────────────────
    xi = R + PADX
    c = Card(slide, R, TOP, W, "06", "Continuación de resultados")
    y = flow_text(slide, xi, c.body, IW, [T("Evidencias del prototipo funcionando en laboratorio: capturas reales de la aplicación operativa de TORNS.", SUB + 1, ls=1.15)])
    y += 0.2
    y = figure(slide, e_det, xi, y, IW, "E4", "E4 · Monitoreo: detección en vivo sobre el stream MJPEG (clase person, umbral 0,5).")
    y += 0.25
    hw = (IW - 0.25) / 2
    y1 = figure(slide, e_calc, xi, y, hw, "E5", "E5 · Calculadora: tren mínimo y ⌈N/C⌉.")
    y2 = figure(slide, e_opt, xi + hw + 0.25, y, hw, "E6", "E6 · Optimización: estado por estación.")
    y = max(y1, y2) + 0.25
    y = figure(slide, e_cam, xi, y, IW, "E7", "E7 · Cámaras: cinco fuentes, cada una asociada a una estación.")
    bottom = c.close(y + END_PAD)

    # ── 07 Conclusiones ───────────────────────────────────
    c = Card(slide, R, bottom + GAP, W, "07", "Conclusiones")
    concl = [
        ("El problema existe y se repite.", "Operación (SITP) y usuarios (n = 20) coinciden: la señal de despacho llega tarde si no se mide quién espera ahora."),
        ("El lazo funciona.", "Video, conteo N y vehículo suficiente corren de punta a punta en el prototipo. La recomendación es una regla de capacidad."),
        ("El conteo se lee con reserva.", "Con recall 0,55 el modelo cuenta de menos en aglomeración. No se afirma impacto comercial ni mejora de flota."),
    ]
    fills = (DEEP, MID, CYAN)
    blocks = [[T(h, 17, True, DEEP, "Arial", sa=4, ls=1.05), T(b, 15.5, ls=1.12)] for h, b in concl]
    paso = [
        T("SIGUIENTE PASO", 14, True, ENERGY, "Arial", sa=5, ls=1.0),
        T("Comparar el conteo con un conteo manual en clips de andén y aceptar el modelo si el error no cambia la recomendación de vehículo.", 16, False, WHITE, ls=1.15),
    ]
    need = [measure(b, IW - 0.65) + 0.35 for b in blocks] + [measure(paso, IW - 0.5) + 0.35]
    cg = 0.16
    avail = COL_BOT - END_PAD - c.body - cg * 3
    extra = max(0.0, (avail - sum(need)) / 4)
    print(f"Conclusiones extra per block {extra:.2f}")
    y = c.body
    for n, blk in enumerate(blocks):
        h = need[n] + extra
        rect(slide, xi, y, IW, h, WHITE, line=LINE, adj=0.08)
        shape(slide, MSO_SHAPE.RECTANGLE, xi, y, 0.15, h, fills[n])
        text(slide, xi + 0.4, y, IW - 0.6, h, blk, anchor=MSO_ANCHOR.MIDDLE)
        y += h + cg
    box(slide, xi, y, IW, need[3] + extra, NAVY, paso, anchor=MSO_ANCHOR.MIDDLE, adj=0.08, pad=(0.25, 0.25, 0.12, 0.12))
    c.close(COL_BOT)

    # ── 08 Referencias ────────────────────────────────────
    rt = COL_BOT + GAP
    rw = R + W - L
    c = Card(slide, L, rt, rw, "08", "Referencias")
    refs_a = [
        "[1] Ultralytics. YOLO11, documentación oficial, 2024.",
        "[2] Roboflow Universe. Dataset coco-person (clase person).",
        "[3] Redmon, J., Divvala, S., Girshick, R. y Farhadi, A. You Only Look Once: Unified, Real-Time Object Detection. CVPR, 2016.",
    ]
    refs_b = [
        "[4] Lin, T.-Y. et al. Microsoft COCO: Common Objects in Context. ECCV, 2014.",
        "[5] Equipo TORNS. Encuesta sobre congestión en transporte masivo, Bogotá, 17 de agosto de 2026 (n = 20).",
        "[6] Equipo TORNS. Entrevista de descubrimiento a un controlador SITP, 2026.",
    ]
    half = (rw - 2 * PADX - 0.6) / 2
    ya = flow_text(slide, L + PADX, c.body - 0.05, half, [T(r, 14, False, INK, sa=4, ls=1.1) for r in refs_a])
    yb = flow_text(slide, L + PADX + half + 0.6, c.body - 0.05, half, [T(r, 14, False, INK, sa=4, ls=1.1) for r in refs_b])
    end = c.close(max(ya, yb) + 0.2)
    print(f"Referencias end {end:.2f} (footer 52.64)")

    prs.save(str(OUTPUTS[0]))
    shutil.copyfile(OUTPUTS[0], OUTPUTS[1])
    print("Wrote", OUTPUTS[0])
    print("Wrote", OUTPUTS[1])
    warns = preview(OUTPUTS[0], PREVIEW)
    for w in warns:
        print(w)
    print("Preview", PREVIEW, "warnings:", len(warns))


