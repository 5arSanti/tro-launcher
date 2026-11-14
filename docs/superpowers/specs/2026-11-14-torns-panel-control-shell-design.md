# TORNS panel de control — shell, piel Operate y gestión de cámaras

Spec de diseño aprobada en brainstorming (2026-11-14). Superficie: `tro-frontend`. No se implementa hasta que esta spec se confirme.

## Intención

Quitar la piel de “IA slop” del prototipo operativo (navbar genérica, copy de sistema inteligente, cifras inventadas, temas claros y oscuros mezclados) y sustituirla por un **shell de centro de control**: barra lateral desplegable al patrón de `guia-construccion-barra-lateral.md`, piel oscura TORNS, y un inventario de cámaras que solo muestra datos reales.

LIRN es la firma. TORNS es el único producto. El usuario es personal de centro de control en un prototipo, no un piloto firmado.

## Decisiones cerradas

- Enfoque: Tailwind + primitivos de sidebar al patrón shadcn (`SidebarProvider`, `Inset`, `Sheet` móvil, cookie, `Ctrl/Cmd + B`).
- `/cameras` es inventario (opción A). Sin alta, edición ni baja. Sin persistencia nueva.
- Inicio se recorta a tablero corto (opción B de alcance). Fuera el bloque AI/RT/AN/SE.
- Piel oscura TORNS (opción B de piel): fondos night / deep, energía `#00A8FF`, Manrope.
- Pie de sidebar: identidad de **sistema** (opción B de footer), no una cuenta inventada.
- Monitoreo conserva un **CameraRail** interno (opción A de layout). La AppSidebar no lista cámaras.
- Backend sin cambios. Prefijo `/api/v1`. Sin auth, sin policies reales.
- Fuera de este ciclo: Buscar, Ajustes, campana, CRUD, E2E, Flask, otro peso que no sea `my_model.pt`, WebSocket de frames.

## Lo que no vuelve

- Identidad TRO / Sistema de Vigilancia / Transport Route Optimization.
- Copy de “detección inteligente”, “sistema inteligente”, “algoritmos avanzados”, “encriptación”.
- Cifras inventadas: resolución 1920×1080, 30 FPS, 99.9 % activo, badges “Activa” en todas las tarjetas.
- Navbar superior de `Navbar.tsx`.
- Gradientes de header, `text-shadow` de marketing, pills, cards de features con iconos AI/RT/AN/SE.
- `MOCK_DETECTIONS` (constante muerta en `src/utils/constants.ts`).
- Bloquear todo el shell si `GET /videos/list` falla.

## Arquitectura

```
SidebarProvider
 ├─ AppSidebar (variant=inset, collapsible=offcanvas)
 │   ├─ Header: wordmark TORNS → `/`, “Centro de control”
 │   ├─ Content: grupos de routeConfig
 │   └─ Footer: salud del sistema
 └─ SidebarInset
     ├─ SiteHeader (trigger, breadcrumbs)
     └─ página
```

Una sola fuente de verdad: `src/routes/index.ts` (`routeConfig`). React Router y la sidebar leen el mismo arreglo. Una ruta es navegable si tiene `title` e `icon` y no está `hidden`. `policies` no se evalúan: no hay usuario.

### Grupos

| Grupo | Matcher | Ítems |
|---|---|---|
| Visión general | `path === "/"` | Inicio |
| Operación | `/monitoring`, `/routing` | Monitoreo, Optimización |
| Administración | `/cameras` | Cámaras |

Orden de grupos estable. Ítems en el orden de `routeConfig`. No hay nav secundaria.

### Estado activo

- `/`: solo coincidencia exacta.
- Resto: `pathname === path` o `pathname` empieza por `path + "/"`, salvo que otra ruta visible más específica también coincida.

### Comportamiento del shell

- Desktop (`md+`): sidebar fija; colapso **offcanvas** (sale del viewport; no modo solo-iconos).
- Cookie `sidebar_state`, 7 días.
- Atajo `Ctrl/Cmd + B` → `toggleSidebar()`.
- Móvil: Sheet; se cierra al cambiar de ruta.
- `SidebarTrigger` en `SiteHeader` con texto sr-only “Toggle Sidebar”.
- Breadcrumbs: `TORNS / {título de la ruta}`. Sin acciones globales (búsqueda, campana).

### Pie de sistema

Datos de `useHealthCheck` / `healthService` (`GET /api/v1/health`):

- Punto de estado + “Sistema operativo” o “Sistema desconectado”.
- Versión y entorno (mismas etiquetas que Inicio: Desarrollo, Producción, etc.).
- Si el health falla: desconectado, versión/entorno `---`. El shell no se desmonta.

## Piel (tokens)

Modo Operate, no la landing comercial. El sitio `lirn-web-main` no se toca.

| Token | Valor | Uso |
|---|---|---|
| Canvas | `#070d14` | Fondo detrás del inset |
| Panel | `#0b1f3a` | Superficies de página, rail, tabla |
| Deep | `#0b4f78` | Sidebar (`--sidebar`) |
| Mid | `#1480b8` | Bordes / hover secundario |
| Energy | `#00A8FF` | Activo, focus, live, CTA |
| Ink on energy | `#07111a` | Texto sobre energy |
| Paper | `#f3f9fd` | Texto primario |
| Mute | `#8aa0b5` | Labels, meta |
| Ok / warn / fail | `#2f7d4a` / `#c4922a` / `#b33a32` | Semántica |
| Video | `#000000` | Lienzo MJPEG |

Variables de sidebar:

| Variable | Valor |
|---|---|
| `--sidebar` | `#0b4f78` |
| `--sidebar-foreground` | `#f3f9fd` |
| `--sidebar-primary` | `#00A8FF` |
| `--sidebar-primary-foreground` | `#07111a` |
| `--sidebar-accent` | `color-mix(in srgb, #00A8FF 16%, #0b4f78)` |
| `--sidebar-accent-foreground` | `#f3f9fd` |
| `--sidebar-border` | `color-mix(in srgb, #1480b8 45%, #0b4f78)` |
| `--sidebar-ring` | `#00A8FF` |
| `--sidebar-width` | `18rem` |
| `--header-height` | `3rem` |

- Tipo: Manrope 400–800, cargada como en `lirn-web-main` (Google Fonts). Números tabulares: `ui-monospace`.
- Controles de página: radio 2px o 0. Sin pills.
- Ítem activo de sidebar: fondo energy, texto ink, `shadow-sm`, transición 200 ms.
- Inset: radio 0.75rem y separación del canvas (cromo del shell). El video y los botones de dentro no heredan ese radio.

Schibsted Grotesk deja de ser la familia del panel.

## Páginas

Flujos actuales se conservan. Cambia jerarquía, cromo y copy.

### Inicio `/`

Tablero corto, no landing.

- Título: “Demanda y despacho”.
- Cuatro cifras reales: cámaras listadas (`videos.length`), versión, entorno, estado.
- Un CTA: “Ir a monitoreo” → `/monitoring`.
- Sin features, sin badge hero de marketing, sin subtítulo de plataforma inteligente.

### Monitoreo `/monitoring`

Elegir fuente → stream MJPEG + conteo → panel de estación.

- Strip superior: estado de conexión, última actualización, `person_count`, objetos totales, `1 / N` solo si hay selección. No duplica el pie de la AppSidebar.
- **CameraRail** (220 px) a la izquierda del inset: nombre + id. Seleccionado visualmente. No hay “Activa 99.9 %”. Badge EN VIVO solo si el MJPEG de la fuente seleccionada está mostrando frames (no en error). El strip usa el estado del WebSocket (idle / connecting / active / error).
- Centro: `VideoDisplay` (MJPEG en `<img>`).
- Abajo: `StationMonitoringPanel` existente, restyleado. Sigue resolviendo estación por `camera_id`.
- Vacío: “Elija una cámara del listado”.
- Query `?camera=<id>`: al montar, si el id existe en `videos`, se selecciona. Si no, vacío. Al elegir en el rail se actualiza la query (`replace`) para que un refresh conserve la fuente.

### Optimización `/routing`

Cuatro pestañas actuales: Vista general, Modelos de tren, Estaciones, Calculadora. Mismos hooks y endpoints.

- Título de página: “Optimización”. Subtítulo: “Oferta según demanda medida en estación”.
- Capacidades 5 / 10 / 15: regla `⌈N/C⌉`, no IA. El copy no lo presenta como modelo predictivo.
- Sin VRP, densidad, ocupación % ni bandas bajo/medio/alto.

### Cámaras `/cameras`

Inventario, no grilla de tarjetas.

Columnas de tabla:

| Columna | Origen |
|---|---|
| Nombre | `VideoInfo.name` |
| ID | `VideoInfo.id` |
| Fuente | `VideoInfo.filename` (archivo o etiqueta USB/RTSP) |
| Estación | `Station.name` donde `station.camera_id === video.id`; si no hay match: “Sin estación” |

Clic en fila: panel de detalle a la derecha (desktop) o Sheet (móvil) con los mismos campos y acción **Ver en monitoreo** → `/monitoring?camera=<id>`.

Si `GET /routing/stations` falla: la tabla se pinta igual; la columna estación muestra “No se pudo resolver” (distinto de “Sin estación”).

Sin resolución, FPS, uptime, ni estado Activa de adorno.

## Datos

Prefijo `API_BASE_URL` (`/api/v1`). Sin endpoints nuevos.

| Uso | Contrato |
|---|---|
| Listado de fuentes | `GET /videos/list` → `{ id, filename, name }` |
| Salud | `GET /health` |
| Estaciones (join en Cámaras) | `GET /routing/stations` — solo este, no el bundle de trenes+status |
| Stream | `GET /videos/{id}/stream` MJPEG |
| Métricas | `WS /videos/ws/{id}/detections` (`person_count`, `total_objects`, `label_counts`) |
| Optimización | `GET /routing/trains`, `/stations`, `/stations/status`; `POST /routing/dispatch` |

`VideosProvider` envuelve el layout y expone `{ videos, error, loading, refetch }`. Una sola petición `GET /videos/list`. El shell (sidebar + header) se monta aunque `loading` o `error` sean verdaderos. Inicio, Monitoreo y Cámaras leen el contexto y muestran empty / error / reintento. No se usa el `Loading` a pantalla completa que hoy bloquea `Navbar`.

Contratos que no se rompen: Ultralytics `results[0].boxes`, clase `"person"`, umbral 0,5; `person_count` alimenta despacho; abrir el stream dispara la inferencia; el frontend no envía frames de webcam.

## Errores y vacíos

| Caso | UI |
|---|---|
| Listado de videos falla | Mensaje + reintentar en Inicio / Monitoreo / Cámaras. Sidebar usable. |
| Lista vacía | Empty state. Cero tarjetas fantasma. |
| Health falla | Footer desconectado. Páginas siguen. |
| Estaciones fallan en Cámaras | Tabla ok; columna “No se pudo resolver”. |
| Cámara de query inexistente | Monitoreo vacío. |
| Stream error | Overlay en el video + reintentar. |
| WS connecting / error | Estado en el strip. El `<img>` puede seguir. |
| Estación no vinculada en Monitoreo | El panel actual de “no hay estación para esta cámara”, restyleado. |
| Dispatch error | Error del `DispatchPanel`, restyleado. |

## Componentes y archivos

En `tro-frontend`:

```
src/routes/index.ts
src/lib/get-navigable-routes.ts
src/context/VideosProvider.tsx
src/components/layout/PrivateLayout.tsx
src/components/ui/sidebar.tsx
src/components/ui/app-sidebar/app-sidebar.tsx
src/components/ui/app-sidebar/nav-groups.tsx
src/components/ui/app-sidebar/nav-system.tsx
src/components/ui/app-sidebar/site-header.tsx
```

- `App.tsx`: `BrowserRouter` + `PrivateLayout` + `Routes` desde `routeConfig`. Deja de renderizar `Navbar`.
- Páginas existentes se remaquetan con Tailwind; no se duplica la lógica de stream, WS ni despacho.
- CSS a retirar al migrar cada vista: `navbar.css`, `dashboard.css`, `cameras.css`, y el cromo suelto de `App.css` / `monitoring*.css` / `routing.css` que deje de usarse.
- `tokens.css` pasa a ser la fuente de canvas, sidebar y semántica; Tailwind lee esas CSS variables.

Dependencias nuevas: Tailwind CSS para Vite; primitivos de sidebar del kit (incluyen `@radix-ui/react-slot` y Sheet vía `@radix-ui/react-dialog`); `lucide-react` para un icono por ruta. No se introduce Next, Flask ni otro router.

## Copy y claims

- Marca en UI: TORNS (producto), LIRN solo como “Centro de control” / by LIRN.
- No afirmar cliente, contrato, piloto, alianza, KPI de impacto, ni que se optimizan todas las rutas de la ciudad.
- Transmilenio no aparece como cliente.
- Equipo: no inventar plantilla ni usuario operador.

## Pruebas

No hay suite de frontend hoy. Este ciclo no la crea.

- `npm run build` (`tsc -b` + `vite build`) en `tro-frontend`.
- Manual: cuatro rutas; colapso desktop; Sheet móvil y cierre al navegar; `Ctrl/B`; cookie; `?camera=`; join estación / “Sin estación” / “No se pudo resolver”; ningún FPS/uptime/99.9 %; Inicio sin features IA; stream y WS siguen funcionando.

## Fuera de alcance

`tro-backend`, `yolo-train-routes-optimization`, `lirn-web-main`, taller AE, autenticación, CRM, instalación física de cámaras, VRP, predicción histórica, densidad por m².
