# Video motion v3 — Wang et al., ICCMS 2022

Fondo animado (sin audio) de 6:00 para la sustentación. Papel y
señalética, cuadro completo. Santiago graba voz y cámara aparte.

## Requisitos

- Node 18+
- ffmpeg / ffprobe
- ~4 GB libres para Chromium de Remotion

```
npm install
```

## Vista previa

```
npm run studio
```

## Contrato de duraciones

```
bash scripts/check-compositions.sh
```

Escenas (s): 35, 20, 35, 35, 30, 35, 75, 35, 30, 30. Total: 360 s.

## Stills y render

```
bash scripts/stills-all.sh
bash scripts/render-all.sh
```

Salidas en `out/`: `escena01.mp4` … `escena10.mp4`, `video-motion-v3.mp4`.

Dirección: `docs/superpowers/specs/2026-11-01-video-motion-v3-design.md`.
Números con coma decimal. Lo ilustrativo va rotulado. Sin audio.
