#!/usr/bin/env python3
"""TORNS poster — plantilla IngApl: secciones numeradas, evidencias E1–E7."""

from __future__ import annotations

import csv
import shutil
from pathlib import Path

import matplotlib.pyplot as plt
from PIL import Image, ImageDraw, ImageFont
from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_CONNECTOR, MSO_SHAPE, MSO_SHAPE_TYPE
from pptx.enum.text import MSO_ANCHOR, PP_ALIGN
from pptx.oxml.ns import qn
from pptx.util import Pt

ROOT = Path("/home/personal/Projects/tro-launcher")
ASSETS = ROOT / "docs/presentations/poster-assets"
TEMPLATE = ROOT / "plantilla poster IngApl.pptx"
OUTPUTS = [
    ROOT / "docs/presentations/poster-TORNS-Ingenieria-Aplicada.pptx",
    ROOT / "poster TORNS IngApl.pptx",
]
CSV_PATH = ROOT / "yolo-train-routes-optimization/runs/detect/train/results.csv"
PREVIEW = ASSETS / "preview-poster.png"

NAVY = RGBColor(0x06, 0x3A, 0x5C)
DEEP = RGBColor(0x0B, 0x4F, 0x78)
MID = RGBColor(0x14, 0x80, 0xB8)
CYAN = RGBColor(0x3A, 0xA8, 0xDC)
ENERGY = RGBColor(0x00, 0xA8, 0xFF)
AIR = RGBColor(0xEA, 0xF4, 0xFA)
PAPER = RGBColor(0xFA, 0xFC, 0xFE)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
INK = RGBColor(0x1A, 0x23, 0x32)
MUTED = RGBColor(0x4A, 0x57, 0x68)
RED = RGBColor(0xC8, 0x10, 0x2E)
GRAY = RGBColor(0x8A, 0x96, 0xA3)
LINE = RGBColor(0xB9, 0xD3, 0xE3)

HEX = {
    "navy": "#063A5C",
    "deep": "#0B4F78",
    "mid": "#1480B8",
    "cyan": "#3AA8DC",
    "paper": "#FAFCFE",
    "red": "#C8102E",
    "ink": "#1A2332",
    "muted": "#4A5768",
    "frame": "#9CC3D8",
}

FONT_REG = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
FONT_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_IT = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Oblique.ttf"


def emu(inches: float) -> int:
    return int(round(inches * 914400))


def T(t, sz=16, b=False, c=INK, f="Calibri", a=PP_ALIGN.LEFT, sa=0, ls=1.15, i=False):
    return {"t": t, "sz": sz, "b": b, "c": c, "f": f, "a": a, "sa": sa, "ls": ls, "i": i}


# ── pptx primitives ───────────────────────────────────────


def set_font(run, name: str) -> None:
    rpr = run._r.get_or_add_rPr()
    latin = rpr.find(qn("a:latin"))
    if latin is None:
        latin = rpr.makeelement(qn("a:latin"), {})
        rpr.append(latin)
    latin.set("typeface", name)
    run.font.name = name


def write_tf(tf, items, anchor=MSO_ANCHOR.TOP, ml=0.0, mr=0.0, mt=0.0, mb=0.0):
    tf.clear()
    tf.word_wrap = True
    tf.auto_size = None
    tf.vertical_anchor = anchor
    tf.margin_left = emu(ml)
    tf.margin_right = emu(mr)
    tf.margin_top = emu(mt)
    tf.margin_bottom = emu(mb)
    for n, item in enumerate(items):
        p = tf.paragraphs[0] if n == 0 else tf.add_paragraph()
        p.alignment = item["a"]
        p.space_after = Pt(item["sa"])
        p.line_spacing = item["ls"]
        run = p.add_run()
        run.text = item["t"]
        run.font.size = Pt(item["sz"])
        run.font.bold = item["b"]
        run.font.italic = item["i"]
        run.font.color.rgb = item["c"]
        set_font(run, item["f"])


def shape(slide, kind, x, y, w, h, fill, line=None, adj=None):
    sh = slide.shapes.add_shape(kind, emu(x), emu(y), emu(w), emu(h))
    if adj is not None:
        try:
            sh.adjustments[0] = adj
        except Exception:
            pass
    sh.fill.solid()
    sh.fill.fore_color.rgb = fill
    if line is None:
        sh.line.fill.background()
    else:
        sh.line.color.rgb = line
        sh.line.width = Pt(1.5)
    sh.shadow.inherit = False
    return sh


def rect(slide, x, y, w, h, fill, line=None, adj=0.04):
    return shape(slide, MSO_SHAPE.ROUNDED_RECTANGLE, x, y, w, h, fill, line, adj)


def box(slide, x, y, w, h, fill, items, anchor=MSO_ANCHOR.MIDDLE, line=None, adj=0.08, pad=(0.1, 0.1, 0.06, 0.06), kind=MSO_SHAPE.ROUNDED_RECTANGLE):
    sh = shape(slide, kind, x, y, w, h, fill, line, adj)
    write_tf(sh.text_frame, items, anchor=anchor, ml=pad[0], mr=pad[1], mt=pad[2], mb=pad[3])
    return sh


def text(slide, x, y, w, h, items, anchor=MSO_ANCHOR.TOP):
    tb = slide.shapes.add_textbox(emu(x), emu(y), emu(w), emu(h))
    write_tf(tb.text_frame, items, anchor=anchor)
    return tb


def vline(slide, x, y0, y1, color, width_pt=3):
    ln = slide.shapes.add_connector(MSO_CONNECTOR.STRAIGHT, emu(x), emu(y0), emu(x), emu(y1))
    ln.line.color.rgb = color
    ln.line.width = Pt(width_pt)
    return ln


HEAD_H = 0.95


def measure(items, w_in, dpi=100) -> float:
    d = ImageDraw.Draw(Image.new("RGB", (8, 8)))
    width_px = w_in * dpi
    total = 0.0
    for it in items:
        f = _font(it["sz"] * dpi / 72 * SCALE.get(it["f"], 0.9), it["b"], it["i"])
        lh = it["sz"] * dpi / 72 * 1.2 * it["ls"]
        n = 0
        for hard in it["t"].split("\n"):
            cur = ""
            n += 1
            for wd in hard.split(" "):
                trial = (cur + " " + wd).strip()
                if d.textlength(trial, font=f) <= width_px or not cur:
                    cur = trial
                else:
                    n += 1
                    cur = wd
        total += n * lh + it["sa"] * dpi / 72
    return total / dpi * 1.07 + 0.04


def flow_text(slide, x, y, w, items) -> float:
    h = measure(items, w)
    text(slide, x, y, w, h, items)
    return y + h


class Card:
    def __init__(self, slide, x, y, w, num, title):
        self.x, self.y, self.w = x, y, w
        self.bg = rect(slide, x, y, w, 1.0, PAPER, line=LINE, adj=0.02)
        rect(slide, x, y, w, HEAD_H, NAVY, adj=0.12)
        box(slide, x + 0.17, y + 0.14, 0.67, 0.67, RED, [T(num, 17, True, WHITE, "Arial", PP_ALIGN.CENTER, ls=1.0)], kind=MSO_SHAPE.OVAL, pad=(0, 0, 0, 0))
        text(slide, x + 1.02, y, w - 1.2, HEAD_H, [T(title, 26, True, WHITE, "Arial", ls=1.0)], anchor=MSO_ANCHOR.MIDDLE)
        self.body = y + HEAD_H + 0.25

    def close(self, bottom: float) -> float:
        self.bg.height = emu(bottom - self.y)
        return bottom


def tag(slide, x, y, label, fill=MID):
    box(slide, x, y, 0.82, 0.46, fill, [T(label, 14, True, WHITE, "Arial", PP_ALIGN.CENTER, ls=1.0)], adj=0.3, pad=(0, 0, 0, 0))


def figure(slide, path, x, y, w, label, caption):
    with Image.open(path) as im:
        h = w * im.height / im.width
    slide.shapes.add_picture(str(path), emu(x), emu(y), width=emu(w), height=emu(h))
    tag(slide, x + w - 0.97, y + 0.15, label)
    return flow_text(slide, x, y + h + 0.08, w, [T(caption, 14.5, False, MUTED, i=True, ls=1.08)])


# ── raster assets ─────────────────────────────────────────


def finish(im: Image.Image, path: Path, frame: bool = True, radius_frac: float = 0.03) -> None:
    im = im.convert("RGBA")
    w, h = im.size
    r = int(min(w, h) * radius_frac)
    if frame:
        ImageDraw.Draw(im).rounded_rectangle((1, 1, w - 2, h - 2), r, outline=HEX["frame"], width=max(3, w // 400))
    mask = Image.new("L", (w, h), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, w - 1, h - 1), r, fill=255)
    im.putalpha(mask)
    im.save(path, "PNG")


def crop_to(src: Path, dst: Path, box_px, out_w=1800):
    im = Image.open(src).convert("RGB").crop(box_px)
    out_h = int(out_w * im.height / im.width)
    finish(im.resize((out_w, out_h), Image.Resampling.LANCZOS), dst)


def make_survey_chart(path: Path, w_in: float, h_in: float) -> None:
    labels = [
        "Dejó pasar un bus lleno · últimos 7 días",
        "Dejó pasar un bus lleno · último mes",
        "Le pasa varias veces por semana",
        "Pierde 15 min o más por evento",
        "Pierde más de 30 min por evento",
    ]
    vals = [55, 80, 65, 70, 35]
    cols = [HEX["deep"], HEX["deep"], HEX["mid"], HEX["cyan"], HEX["cyan"]]
    fig, ax = plt.subplots(figsize=(w_in, h_in), dpi=220)
    fig.patch.set_facecolor(HEX["paper"])
    ax.set_facecolor(HEX["paper"])
    ys = list(range(len(vals)))[::-1]
    ax.barh(ys, vals, color=cols, height=0.62, zorder=3)
    for y, v in zip(ys, vals):
        ax.text(v + 1.2, y, f"{v} %", va="center", fontsize=13, fontweight="bold", color=HEX["navy"], zorder=4)
    ax.set_yticks(ys)
    ax.set_yticklabels(labels, fontsize=12, color=HEX["ink"])
    ax.axvline(60, color=HEX["red"], lw=2.2, ls="--", zorder=2)
    ax.text(60.8, len(vals) - 0.42, "criterio 60 %", color=HEX["red"], fontsize=11, fontweight="bold", va="bottom")
    ax.set_xlim(0, 100)
    ax.set_ylim(-0.6, len(vals) - 0.1)
    ax.xaxis.set_visible(False)
    for sp in ("top", "right", "bottom"):
        ax.spines[sp].set_visible(False)
    ax.spines["left"].set_color(HEX["navy"])
    ax.tick_params(axis="y", length=0, pad=8)
    for y, name in ((3.5, "Existencia"), (2, "Recurrencia"), (0.5, "Costo")):
        ax.text(101, y, name, fontsize=11, color=HEX["muted"], va="center", ha="right", style="italic")
    fig.tight_layout(pad=0.4)
    fig.savefig(path, facecolor=fig.get_facecolor())
    plt.close(fig)
    finish(Image.open(path), path, frame=False)


def make_yolo_chart(path: Path, s_in: float) -> None:
    ep, p, r, m = [], [], [], []
    with CSV_PATH.open() as f:
        for row in csv.DictReader(f):
            ep.append(int(row["epoch"]))
            p.append(float(row["metrics/precision(B)"]))
            r.append(float(row["metrics/recall(B)"]))
            m.append(float(row["metrics/mAP50(B)"]))
    fig, ax = plt.subplots(figsize=(s_in, s_in), dpi=220)
    fig.patch.set_facecolor(HEX["paper"])
    ax.set_facecolor(HEX["paper"])
    for ys, col, lab in ((p, HEX["deep"], "Precisión"), (r, HEX["mid"], "Recall"), (m, HEX["cyan"], "mAP50")):
        ax.plot(ep, ys, color=col, lw=2.6, label=lab)
        ax.scatter([ep[-1]], [ys[-1]], color=col, s=36, zorder=5)
    ax.set_xlim(1, 61)
    ax.set_ylim(0, 1)
    ax.set_xlabel("Época", fontsize=11, color=HEX["navy"])
    ax.tick_params(colors=HEX["navy"], labelsize=10)
    ax.grid(True, axis="y", ls="--", alpha=0.35)
    for sp in ("top", "right"):
        ax.spines[sp].set_visible(False)
    for sp in ("left", "bottom"):
        ax.spines[sp].set_color(HEX["navy"])
    ax.legend(frameon=False, fontsize=10.5, loc="lower right")
    fig.tight_layout(pad=0.4)
    fig.savefig(path, facecolor=fig.get_facecolor())
    plt.close(fig)
    finish(Image.open(path), path, frame=False)


# ── preview with wrapping + overflow check ────────────────

SCALE = {"Calibri": 0.86, "Arial": 0.94}


def _font(sz_px, bold, italic):
    pathf = FONT_BOLD if bold else (FONT_IT if italic else FONT_REG)
    return ImageFont.truetype(pathf, max(6, int(sz_px)))


def _layout(tf, width_px, dpi, measure):
    lines = []
    for p in tf.paragraphs:
        if not p.runs:
            continue
        run = p.runs[0]
        sz = run.font.size.pt if run.font.size else 16
        fam = run.font.name or "Calibri"
        f = _font(sz * dpi / 72 * SCALE.get(fam, 0.9), bool(run.font.bold), bool(run.font.italic))
        lh = sz * dpi / 72 * 1.2 * (p.line_spacing or 1.0)
        color = run.font.color.rgb if run.font.color and run.font.color.type else RGBColor(0x1A, 0x23, 0x32)
        for hard in p.text.split("\n"):
            words = hard.split(" ")
            cur = ""
            for wd in words:
                trial = (cur + " " + wd).strip()
                if measure.textlength(trial, font=f) <= width_px or not cur:
                    cur = trial
                else:
                    lines.append((cur, f, lh, color, p.alignment))
                    cur = wd
            lines.append((cur, f, lh, color, p.alignment))
        sa = (p.space_after.pt if p.space_after is not None else 0) * dpi / 72
        if lines:
            t, f0, lh0, c0, a0 = lines[-1]
            lines[-1] = (t, f0, lh0 + sa, c0, a0)
    return lines


def preview(pptx_path: Path, out: Path, dpi: int = 40) -> list[str]:
    prs = Presentation(str(pptx_path))
    slide = prs.slides[0]
    W = int(prs.slide_width / 914400 * dpi)
    H = int(prs.slide_height / 914400 * dpi)
    canvas = Image.new("RGB", (W, H), "white")
    d = ImageDraw.Draw(canvas)
    d.rectangle((0, 0, W, int(7.87 * dpi)), fill=HEX["navy"])
    d.rectangle((0, int(52.64 * dpi), W, H), fill=HEX["navy"])
    warnings = []

    def px(v):
        return v / 914400 * dpi

    for sh in slide.shapes:
        x, y, w, h = px(sh.left), px(sh.top), px(sh.width), px(sh.height)
        if sh.shape_type == MSO_SHAPE_TYPE.PICTURE:
            tmp = ASSETS / "_pv.png"
            tmp.write_bytes(sh.image.blob)
            im = Image.open(tmp).convert("RGBA").resize((max(1, int(w)), max(1, int(h))), Image.Resampling.LANCZOS)
            canvas.paste(im, (int(x), int(y)), im)
            tmp.unlink(missing_ok=True)
            continue
        if sh.shape_type == MSO_SHAPE_TYPE.LINE:
            d.line((x, y, x + w, y + h), fill=HEX["cyan"], width=max(1, dpi // 14))
            continue
        if sh.shape_type == MSO_SHAPE_TYPE.AUTO_SHAPE:
            try:
                c = sh.fill.fore_color.rgb
                fill = f"#{c}"
            except Exception:
                fill = None
            outline = None
            try:
                if sh.line.fill.type is not None and sh.line.color.rgb is not None:
                    outline = f"#{sh.line.color.rgb}"
            except Exception:
                outline = None
            name = sh.auto_shape_type
            if name == MSO_SHAPE.OVAL:
                d.ellipse((x, y, x + w, y + h), fill=fill, outline=outline)
            elif name in (MSO_SHAPE.CHEVRON, MSO_SHAPE.PENTAGON):
                k = h * 0.35
                pts = [(x, y), (x + w - k, y), (x + w, y + h / 2), (x + w - k, y + h), (x, y + h)]
                if name == MSO_SHAPE.CHEVRON:
                    pts.append((x + k, y + h / 2))
                d.polygon(pts, fill=fill, outline=outline)
            else:
                d.rounded_rectangle((x, y, x + w, y + h), radius=max(2, min(w, h) * 0.08), fill=fill, outline=outline, width=1)
        if not sh.has_text_frame or not sh.text_frame.text.strip():
            continue
        tf = sh.text_frame
        ml, mr = px(tf.margin_left or 0), px(tf.margin_right or 0)
        mt, mb = px(tf.margin_top or 0), px(tf.margin_bottom or 0)
        inner_w = w - ml - mr
        lines = _layout(tf, inner_w, dpi, d)
        total = sum(l[2] for l in lines)
        avail = h - mt - mb
        if total > avail + 1:
            warnings.append(f"OVERFLOW {total / dpi:.2f}in > {avail / dpi:.2f}in :: {tf.text[:60]!r}")
        if tf.vertical_anchor == MSO_ANCHOR.MIDDLE:
            cy = y + mt + (avail - total) / 2
        elif tf.vertical_anchor == MSO_ANCHOR.BOTTOM:
            cy = y + h - mb - total
        else:
            cy = y + mt
        for t, f, lh, color, align in lines:
            tw = d.textlength(t, font=f)
            if align == PP_ALIGN.CENTER:
                tx = x + ml + (inner_w - tw) / 2
            else:
                tx = x + ml
            d.text((tx, cy), t, font=f, fill=f"#{color}")
            cy += lh
    canvas.save(out, "PNG")
    return warnings


# ── poster ────────────────────────────────────────────────


def delete_content_placeholders(slide) -> None:
    keep = {"CuadroTexto 1", "CuadroTexto 2", "CuadroTexto 21"}
    for sh in list(slide.shapes):
        if sh.name not in keep:
            sh._element.getparent().remove(sh._element)


def header(slide) -> None:
    title = next(s for s in slide.shapes if s.name == "CuadroTexto 1")
    authors = next(s for s in slide.shapes if s.name == "CuadroTexto 2")
    course = next(s for s in slide.shapes if s.name == "CuadroTexto 21")
    write_tf(title.text_frame, [T("TORNS: demanda real en estación, oferta al centro de control", 26, True, WHITE, "Arial", PP_ALIGN.CENTER, ls=1.0)], anchor=MSO_ANCHOR.MIDDLE, ml=0.1, mr=0.1)
    write_tf(
        authors.text_frame,
        [
            T("Rebeca Pedrozo Cueto  ·  Hanna Cerinza Contreras  ·  Johel Santiago Arias Becerra", 15, True, WHITE, "Arial", PP_ALIGN.CENTER, sa=4, ls=1.0),
            T("Prototipo aplicado  ·  caso de estudio Transmilenio, Bogotá", 13, False, WHITE, a=PP_ALIGN.CENTER, ls=1.0),
        ],
        anchor=MSO_ANCHOR.MIDDLE,
        ml=0.1,
        mr=0.1,
    )
    write_tf(
        course.text_frame,
        [
            T("Ingeniería Aplicada  ·  2026-2", 14, True, WHITE, "Arial", PP_ALIGN.CENTER, sa=2, ls=1.0),
            T("Prof. Javier Ríos Suarez", 14, False, WHITE, "Arial", PP_ALIGN.CENTER, ls=1.0),
        ],
        anchor=MSO_ANCHOR.MIDDLE,
        ml=0.1,
        mr=0.1,
    )


def chip(slide, x, y, w, h, value, label, fill, vsz=30):
    box(slide, x, y, w, h, fill, [T(value, vsz, True, WHITE, "Arial", PP_ALIGN.CENTER, sa=2, ls=1.0), T(label, 14, False, WHITE, a=PP_ALIGN.CENTER, ls=1.0)], adj=0.12)


def flow(slide, x, y, w, h, steps, sub=None):
    n = len(steps)
    k = h * 0.35
    sw = (w + (n - 1) * k * 0.55) / n
    for i, (label, fill) in enumerate(steps):
        kind = MSO_SHAPE.PENTAGON if i == 0 else MSO_SHAPE.CHEVRON
        sx = x + i * (sw - k * 0.55)
        box(slide, sx, y, sw, h, fill, [T(label, 16, True, WHITE, "Arial", PP_ALIGN.CENTER, ls=1.0)], kind=kind, adj=None, pad=(k * 0.9 if i else 0.08, k * 0.6, 0.02, 0.02))
        if sub:
            text(slide, sx + (k * 0.5 if i else 0), y + h + 0.06, sw - k, 0.5, [T(sub[i], 13.5, False, MUTED, a=PP_ALIGN.CENTER, ls=1.0)])


def main() -> None:
    ASSETS.mkdir(parents=True, exist_ok=True)

    L, C, R, W = 1.26, 13.84, 26.42, 11.42
    PADX = 0.28
    IW = W - 2 * PADX
    BODY, SUB, HEAD = 20, 18, 21

    e_det = ASSETS / "ev-deteccion.png"
    e_calc = ASSETS / "ev-calculadora.png"
    e_opt = ASSETS / "ev-optimizacion.png"
    e_cam = ASSETS / "ev-camaras.png"
    e_survey = ASSETS / "ev-encuesta.png"
    e_yolo = ASSETS / "ev-yolo.png"
    crop_to(ASSETS / "poster-monitoreo.png", e_det, (490, 92, 1114, 560))
    crop_to(ASSETS / "poster-calculadora.png", e_calc, (285, 222, 865, 657), 1400)
    crop_to(ASSETS / "poster-optimizacion.png", e_opt, (300, 200, 936, 678), 1400)
    crop_to(ASSETS / "poster-camaras.png", e_cam, (282, 60, 1008, 436), 1800)
    survey_h = 4.7
    make_survey_chart(e_survey, IW, survey_h)
    yolo_s = 6.7
    make_yolo_chart(e_yolo, yolo_s)

    shutil.copyfile(TEMPLATE, OUTPUTS[0])
    prs = Presentation(str(OUTPUTS[0]))
    slide = prs.slides[0]
    delete_content_placeholders(slide)
    header(slide)

    TOP = 8.55
    GAP = 0.32
    COL_BOT = 49.15
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
        T("«Dependemos totalmente del radio y de que nos reporten la TP 19. Mientras el operador del bus nos avisa y nosotros tomamos decisiones, la estación ya colapsó.»", 18.5, False, DEEP, i=True, sa=8, ls=1.15),
        T("La flota se nivela con códigos radiales (TP 69 agilice, TP 70 disminuya) «casi a ciegas». El reporte TP 29 llega cuando el problema ya ocurrió.", 16, False, MUTED, ls=1.12),
    ]
    qw = IW - 0.6
    qh = 0.85 + measure(quote, qw) + 0.25
    rect(slide, xi, y, IW, qh, WHITE, line=LINE, adj=0.05)
    shape(slide, MSO_SHAPE.RECTANGLE, xi, y, 0.13, qh, RED)
    tag(slide, xi + 0.32, y + 0.22, "E1", RED)
    text(slide, xi + 1.3, y + 0.2, IW - 1.5, 0.5, [T("Entrevista a un controlador SITP", 17, True, DEEP, "Arial", ls=1.0)], anchor=MSO_ANCHOR.MIDDLE)
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
        T("OBJETIVO GENERAL", 15, True, ENERGY, "Arial", sa=5, ls=1.0),
        T("Detectar y contar la demanda en estación y recomendar al centro de control el tipo de vehículo y la cantidad.", 19, False, WHITE, ls=1.15),
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
    hyp = [
        T("Hipótesis de validación · operador de transporte", 18, True, DEEP, "Arial", sa=8, ls=1.0),
        T("H1  Le afecta la congestión de pasajeros en horas de alta afluencia.", 17, sa=6, ls=1.12),
        T("H2  Le cuesta conocer la demanda real al planificar el servicio.", 17, sa=6, ls=1.12),
        T("H3  Asigna vehículos y frecuencias de forma ineficiente ante cambios de demanda.", 17, ls=1.12),
    ]
    hyp_h = measure(hyp, IW - 0.5) + 0.3
    rg = 0.12
    row = min(2.05, (COL_BOT - END_PAD - y - rg * 4 - hyp_h - 0.2) / 5)
    for n, (verb, rest) in enumerate(specifics):
        rect(slide, xi, y, IW, row, (WHITE, AIR)[n % 2], adj=0.12)
        box(slide, xi + 0.18, y + (row - 0.66) / 2, 0.66, 0.66, (MID, DEEP)[n % 2], [T(str(n + 1), 17, True, WHITE, "Arial", PP_ALIGN.CENTER, ls=1.0)], kind=MSO_SHAPE.OVAL, pad=(0, 0, 0, 0))
        text(slide, xi + 1.05, y, IW - 1.2, row, [T(verb, 19, True, DEEP, "Arial", sa=3, ls=1.0), T(rest, 18, ls=1.12)], anchor=MSO_ANCHOR.MIDDLE)
        y += row + rg
    y += 0.08
    hyp_h = COL_BOT - END_PAD - y
    box(slide, xi, y, IW, hyp_h, WHITE, hyp, anchor=MSO_ANCHOR.MIDDLE, line=LINE, adj=0.08, pad=(0.25, 0.25, 0.12, 0.12))
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
        items = [T(name, HEAD, True, DEEP, "Arial", sa=4, ls=1.0), T(desc, 17.5, sa=5, ls=1.14), T(tools, 14, True, MID, "Arial", ls=1.0)]
        sh_h = measure(items, tw - 0.4) + 0.32
        tops.append((y, sh_h, items))
        y += sh_h + 0.28
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
        T("API /api/v1 con routers /health, /videos y /routing. Abrir el stream dispara la inferencia; el WebSocket publica person_count, total_objects, label_counts y timestamp, nunca frames.", 16, False, MUTED, ls=1.15),
    ])
    bottom = c.close(y + END_PAD)

    # ── 05 Resultados ─────────────────────────────────────
    c = Card(slide, C, bottom + GAP, W, "05", "Resultados")
    y = c.body
    cw = (IW - 0.3) / 3
    for n, (v, lab, fill) in enumerate((("0,73", "Precisión", DEEP), ("0,55", "Recall", MID), ("0,64", "mAP50", CYAN))):
        chip(slide, xi + n * (cw + 0.15), y, cw, 2.0, v, lab, fill, vsz=38)
    y += 2.0 + 0.3
    slide.shapes.add_picture(str(e_yolo), emu(xi), emu(y), width=emu(yolo_s), height=emu(yolo_s))
    tag(slide, xi + yolo_s - 0.97, y + 0.15, "E3")
    lect = [
        T("Lectura", HEAD - 1, True, DEEP, "Arial", sa=6, ls=1.0),
        T("Precisión 0,73: cuando detecta, suele acertar.", 16, sa=7, ls=1.12),
        T("Recall 0,55: en aglomeración omite personas; el conteo tiende a la baja.", 16, sa=7, ls=1.12),
        T("mAP50 0,64: desempeño moderado para una sola clase.", 16, sa=7, ls=1.12),
        T("Es un límite técnico del modelo, no un indicador de impacto en campo.", 15.5, True, MID, ls=1.12),
    ]
    text(slide, xi + yolo_s + 0.25, y, IW - yolo_s - 0.25, yolo_s, lect, anchor=MSO_ANCHOR.MIDDLE)
    y += yolo_s + 0.08
    y = flow_text(slide, xi, y, IW, [T("E3 · Curvas de validación por época del entrenamiento (results.csv).", 14.5, False, MUTED, i=True, ls=1.0)])
    y += 0.25
    dw = (IW - 3 * 0.12) / 4
    for n, (v, lab, fill) in enumerate((("3.694", "imágenes de\nentrenamiento", NAVY), ("1.000", "imágenes de\nvalidación", DEEP), ("60", "épocas", MID), ("512 px", "resolución de\nentrada", CYAN))):
        chip(slide, xi + n * (dw + 0.12), y, dw, 1.8, v, lab, fill, vsz=24)
    y += 1.8 + 0.45
    y = flow_text(slide, xi, y, IW, [T("Modelos de vehículo del prototipo", HEAD - 1, True, DEEP, "Arial", ls=1.05)])
    y += 0.1
    rows_tv = [("Modelo", "Vagones", "Capacidad C"), ("Tren Ligero", "1", "5"), ("Tren Medio", "2", "10"), ("Tren Pesado", "3", "15")]
    colw = (IW * 0.46, IW * 0.24, IW * 0.30)
    rh = 0.64
    for n, cells in enumerate(rows_tv):
        fill = NAVY if n == 0 else (WHITE, AIR)[n % 2]
        rect(slide, xi, y, IW, rh, fill, adj=0.15)
        cx = xi
        for k, cell in enumerate(cells):
            color = WHITE if n == 0 else (DEEP if k == 0 else INK)
            text(slide, cx + 0.2, y, colw[k] - 0.25, rh, [T(cell, 15.5, n == 0 or k == 0, color, "Arial" if n == 0 else "Calibri", ls=1.0)], anchor=MSO_ANCHOR.MIDDLE)
            cx += colw[k]
        y += rh + 0.06
    y = flow_text(slide, xi, y + 0.05, IW, [T("Capacidad por vagón: 5 personas. Valores del servicio de despacho del backend.", 14.5, False, MUTED, i=True, ls=1.05)])
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
    bh = 2.1
    for n, (v, lab, fill) in enumerate(steps):
        chip(slide, xi + n * (bw + 0.12), y, bw, bh, v, lab, fill, vsz=26)
    y += bh + 0.2
    rest = COL_BOT - END_PAD - y
    box(slide, xi, y, IW, rest, AIR, [
        T("Lectura en vivo", 18, True, DEEP, "Arial", sa=6, ls=1.0),
        T("Estación Central, Línea 1, viaje de 180 s. Plan: 1 Tren Medio, ciclo de 3 min, capacidad 10.", 17.5, False, INK, sa=6, ls=1.15),
        T("Si N = 23, el mayor es Pesado (C = 15) y se recomiendan ⌈23/15⌉ = 2 unidades. El operador confirma o descarta.", 17.5, False, INK, ls=1.15),
    ], anchor=MSO_ANCHOR.MIDDLE, line=LINE, adj=0.08, pad=(0.25, 0.25, 0.12, 0.12))
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
        ("Es un prototipo aplicado.", "Transmilenio es el caso de estudio. Falta integración con el control real de un operador y cámaras instaladas en campo."),
    ]
    fills = (DEEP, MID, CYAN, NAVY)
    blocks = [[T(h, 21, True, DEEP, "Arial", sa=6, ls=1.05), T(b, 18.5, ls=1.15)] for h, b in concl]
    paso = [
        T("SIGUIENTE PASO", 16, True, ENERGY, "Arial", sa=5, ls=1.0),
        T("Comparar el conteo con un conteo manual en clips de andén y aceptar el modelo si el error no cambia la recomendación de vehículo.", 20, False, WHITE, ls=1.15),
    ]
    need = [measure(b, IW - 0.65) + 0.35 for b in blocks] + [measure(paso, IW - 0.5) + 0.35]
    cg = 0.16
    avail = COL_BOT - END_PAD - c.body - cg * 4
    extra = max(0.0, (avail - sum(need)) / 5)
    print(f"Conclusiones extra per block {extra:.2f}")
    y = c.body
    for n, blk in enumerate(blocks):
        h = need[n] + extra
        rect(slide, xi, y, IW, h, WHITE, line=LINE, adj=0.08)
        shape(slide, MSO_SHAPE.RECTANGLE, xi, y, 0.15, h, fills[n])
        text(slide, xi + 0.4, y, IW - 0.6, h, blk, anchor=MSO_ANCHOR.MIDDLE)
        y += h + cg
    box(slide, xi, y, IW, need[-1] + extra, RGBColor(0x04, 0x2B, 0x45), paso, anchor=MSO_ANCHOR.MIDDLE, adj=0.08, pad=(0.25, 0.25, 0.12, 0.12))
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
    ya = flow_text(slide, L + PADX, c.body - 0.05, half, [T(r, 15, False, INK, sa=4, ls=1.1) for r in refs_a])
    yb = flow_text(slide, L + PADX + half + 0.6, c.body - 0.05, half, [T(r, 15, False, INK, sa=4, ls=1.1) for r in refs_b])
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


if __name__ == "__main__":
    main()
