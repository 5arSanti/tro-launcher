"""Genera el Word del informe sobre la plantilla de la Universidad Libre.

Uso, desde docs/ae-final-project/informe/:
    python3 generar-docx-plantilla.py [ruta-a-pandoc]

Requiere pandoc 3 y python-docx. Al abrir el Word, aceptar la actualización
de campos para llenar la tabla de contenido y las listas de tablas e ilustraciones.
"""
import copy
import re
import subprocess
import sys
import tempfile
from pathlib import Path

import docx
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.shared import Emu, Inches, Pt

AQUI = Path(__file__).resolve().parent
FUENTE = AQUI / 'plan-transformacion-empresarial.md'
PLANTILLA = AQUI / 'plantilla-proyecto-final.docx'
SALIDA = AQUI / 'plan-transformacion-empresarial-plantilla.docx'
PANDOC = sys.argv[1] if len(sys.argv) > 1 else 'pandoc'
SALTO = '```{=openxml}\n<w:p><w:r><w:br w:type="page"/></w:r></w:p>\n```'
SIN_NUMERO = ('Glosario', 'Referencias', 'Anexos')
ANCHO_TEXTO = Emu(5943600)
ORDEN_TRAS_UPDATE = ('hdrShapeDefaults', 'footnotePr', 'endnotePr', 'compat', 'docVars', 'rsids',
                     'mathPr', 'attachedSchema', 'themeFontLang', 'clrSchemeMapping', 'doNotIncludeSubdocsInStats',
                     'doNotAutoCompressPictures', 'forceUpgrade', 'captions', 'readModeInkLockDown', 'smartTagType',
                     'schemaLibrary', 'shapeDefaults', 'doNotEmbedSmartTags', 'decimalSymbol', 'listSeparator')


def preparar_markdown(md):
    md = re.sub(r'\A---\n.*?\n---\n', '', md, flags=re.S).lstrip()
    if md.startswith(SALTO):
        md = md[len(SALTO):].lstrip()
    md = re.sub(r'^# Capítulo \d+\. ', '# ', md, flags=re.M)
    md = re.sub(r'^## \d+\.\d+ ', '## ', md, flags=re.M)
    md = re.sub(r'^### \d+\.\d+\.\d+ ', '### ', md, flags=re.M)
    md = re.sub(r'^# Bibliografía$', '# Referencias', md, flags=re.M)
    md = re.sub(r'^\*\*(Tabla|Ilustración) \d+\*\*(?:\\| +)\n\*(.+?)\*[ \t]*$',
                r'CAPTION::\1::\2', md, flags=re.M)
    return md


def run(texto=None, fld=None, instr=None):
    r = OxmlElement('w:r')
    if fld:
        c = OxmlElement('w:fldChar'); c.set(qn('w:fldCharType'), fld); r.append(c)
    elif instr:
        t = OxmlElement('w:instrText'); t.set(qn('xml:space'), 'preserve'); t.text = instr; r.append(t)
    else:
        t = OxmlElement('w:t'); t.set(qn('xml:space'), 'preserve'); t.text = texto; r.append(t)
    return r


def parrafo_campo(instr, estilo):
    p = OxmlElement('w:p')
    ppr = OxmlElement('w:pPr'); ps = OxmlElement('w:pStyle'); ps.set(qn('w:val'), estilo); ppr.append(ps); p.append(ppr)
    for r in (run(fld='begin'), run(instr=instr), run(fld='separate'),
              run('Clic derecho y «Actualizar campo» para generar esta lista.'), run(fld='end')):
        p.append(r)
    return p


def portada(plantilla):
    cuerpo = list(docx.Document(plantilla).element.body)
    texto = lambda el: ''.join(t.text or '' for t in el.iter(qn('w:t')))
    fin = next(i for i, el in enumerate(cuerpo) if texto(el).startswith('Tabla de Contenido'))
    salto = next(el for el in cuerpo[fin:] if any(b.get(qn('w:type')) == 'page' for b in el.iter(qn('w:br'))))
    titulo = lambda t: next(el for el in cuerpo if el.tag == qn('w:p') and texto(el) == t)
    nuevos = [copy.deepcopy(el) for el in cuerpo[:fin + 1]]
    nuevos.append(parrafo_campo(' TOC \\o "1-3" \\h \\z \\u ', 'TDC1'))
    for t, campo in (('Tabla de tablas', ' TOC \\h \\z \\c "Tabla" '),
                     ('Tabla de Ilustraciones', ' TOC \\h \\z \\c "Ilustración" ')):
        nuevos += [copy.deepcopy(salto), copy.deepcopy(titulo(t)), parrafo_campo(campo, 'Tabladeilustraciones')]
    nuevos.append(copy.deepcopy(salto))
    return nuevos


def fijar_estilo(p, estilo=None):
    ppr = p.get_or_add_pPr()
    for ps in ppr.findall(qn('w:pStyle')):
        ppr.remove(ps)
    if estilo:
        ppr.get_or_add_pStyle().val = estilo
    return ppr


def leyenda(par, tipo, titulo):
    p = par._p
    for r in list(p):
        if r.tag != qn('w:pPr'):
            p.remove(r)
    fijar_estilo(p, 'Descripcin')
    par.paragraph_format.keep_with_next = True
    fs = OxmlElement('w:fldSimple'); fs.set(qn('w:instr'), f' SEQ {tipo} \\* ARABIC ')
    fs.append(run('1'))
    for el in (run(f'{tipo} '), fs, run(f'. {titulo}')):
        p.append(el)


SUCESORES_TBLPR = ('shd', 'tblLayout', 'tblCellMar', 'tblLook', 'tblCaption', 'tblDescription')


def bordes(tabla):
    tblpr = tabla._tbl.tblPr
    w = tblpr.find(qn('w:tblW'))
    if w is not None:
        w.set(qn('w:type'), 'pct'); w.set(qn('w:w'), '5000')
    b = OxmlElement('w:tblBorders')
    for lado in ('top', 'left', 'bottom', 'right', 'insideH', 'insideV'):
        e = OxmlElement(f'w:{lado}')
        e.set(qn('w:val'), 'single'); e.set(qn('w:sz'), '4'); e.set(qn('w:space'), '0'); e.set(qn('w:color'), 'A6A6A6')
        b.append(e)
    sucesor = next((c for c in tblpr if c.tag in {qn(f'w:{x}') for x in SUCESORES_TBLPR}), None)
    if sucesor is not None:
        sucesor.addprevious(b)
    else:
        tblpr.append(b)
    tabla.rows[0]._tr.get_or_add_trPr().append(OxmlElement('w:tblHeader'))
    for fila in tabla.rows:
        for celda in fila.cells:
            for par in celda.paragraphs:
                fijar_estilo(par._p)
                f = par.paragraph_format
                f.space_before = Pt(0); f.space_after = Pt(0); f.line_spacing = 1.0; f.first_line_indent = Pt(0)
                for r in par.runs:
                    r.font.size = Pt(10)


def main():
    md = preparar_markdown(FUENTE.read_text(encoding='utf-8'))
    with tempfile.TemporaryDirectory() as tmp:
        fuente = Path(tmp) / 'informe.md'
        fuente.write_text(md, encoding='utf-8')
        subprocess.run([PANDOC, str(fuente), f'--resource-path={AQUI}:{AQUI.parent}',
                        f'--reference-doc={PLANTILLA}', '-o', str(SALIDA)], check=True)

    d = docx.Document(SALIDA)
    cuerpo = d.element.body
    for i, el in enumerate(portada(PLANTILLA)):
        cuerpo.insert(i, el)

    for t in d.tables:
        bordes(t)

    seccion = None
    for p in d.paragraphs:
        estilo = p.style.name
        texto = p.text
        ps = p._p.find('./' + qn('w:pPr') + '/' + qn('w:pStyle'))
        id_estilo = ps.get(qn('w:val')) if ps is not None else ''
        if estilo == 'Heading 1':
            seccion = texto
            if texto in SIN_NUMERO:
                num = p._p.get_or_add_pPr().get_or_add_numPr()
                num.get_or_add_ilvl().val = 0
                num.get_or_add_numId().val = 0
            continue
        if texto.startswith('CAPTION::'):
            _, tipo, titulo = texto.split('::', 2)
            leyenda(p, tipo, titulo)
            continue
        if id_estilo not in ('FirstParagraph', 'BodyText', 'Textoindependiente', 'Compact', ''):
            continue
        ppr = fijar_estilo(p._p)
        f = p.paragraph_format
        if p._p.findall('.//' + qn('w:drawing')):
            f.alignment = WD_ALIGN_PARAGRAPH.CENTER
        elif seccion == 'Referencias':
            f.left_indent = Inches(0.5); f.first_line_indent = Inches(-0.5)
        elif not texto.startswith('Nota.') and ppr.find(qn('w:numPr')) is None:
            f.first_line_indent = Inches(0.5)

    for forma in d.inline_shapes:
        if forma.width > ANCHO_TEXTO:
            forma.height = int(forma.height * ANCHO_TEXTO / forma.width)
            forma.width = ANCHO_TEXTO

    for lvl in d.part.numbering_part.element.iter(qn('w:lvlText')):
        if lvl.get(qn('w:val')) == 'Capitulo %1.':
            lvl.set(qn('w:val'), 'Capítulo %1.')

    ajustes = d.settings.element
    if ajustes.find(qn('w:updateFields')) is None:
        act = OxmlElement('w:updateFields'); act.set(qn('w:val'), 'true')
        sucesor = next((c for c in ajustes if c.tag in {qn(f'w:{x}') for x in ORDEN_TRAS_UPDATE}), None)
        sucesor.addprevious(act) if sucesor is not None else ajustes.append(act)
    d.core_properties.author = 'Johel Santiago Arias'
    d.core_properties.title = 'Plan de Transformación Empresarial de LIRN'
    d.save(SALIDA)
    print(SALIDA)


if __name__ == '__main__':
    main()
