# TORNS panel de control — shell e inventario Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reemplazar la navbar y la piel de slop de `tro-frontend` por un shell inset con sidebar colapsable, piel oscura TORNS, Inicio corto, Monitoreo con CameraRail, Optimización restyleada e inventario real en `/cameras`.

**Architecture:** Tailwind v4 en Vite. Primitivos locales de sidebar (Provider, Inset, Sheet móvil, cookie, `Ctrl/B`) al patrón de la guía. `routeConfig` único. `VideosProvider` para que el shell no espere al listado. Páginas leen contexto y se remaquetan; stream MJPEG, WS y despacho no se reescriben.

**Tech Stack:** React 19, React Router 7, Vite 7, Tailwind CSS 4 (`@tailwindcss/vite`), `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`, `@radix-ui/react-slot`, `@radix-ui/react-dialog`, `@radix-ui/react-separator`.

## Global Constraints

- Spec: `docs/superpowers/specs/2026-11-14-torns-panel-control-shell-design.md`.
- Trabajo solo en `tro-frontend`. No tocar `tro-backend`, YOLO, `lirn-web-main` ni el taller AE.
- LIRN es la firma. TORNS es el único producto. No TRO, Sistema de Vigilancia ni Transport Route Optimization.
- No inventar resolución, FPS, uptime, badges Activa, cliente, piloto, plantilla ni usuario operador.
- No Buscar, Ajustes, campana, CRUD de cámaras, auth, Flask, WebSocket de frames, ni suite de tests nueva.
- Verificación por tarea: `npm run build` en `tro-frontend` (incluye `tsc -b`) más el check manual listado. Expected: exit 0.
- No pills. Radio de controles 2px. Inset 0.75rem. Energía `#00A8FF`. Manrope.
- Abrir el stream sigue disparando la inferencia. Clase `"person"`. MJPEG en `<img>`. WS solo métricas.
- No hacer `git commit` salvo que el usuario lo pida. Si un paso dice Commit y no lo pidió, saltarlo.

## File Map

| File | Responsibility |
| --- | --- |
| `tro-frontend/vite.config.ts` | Plugin Tailwind + alias `@/` |
| `tro-frontend/tsconfig.app.json` | `paths` `@/*` |
| `tro-frontend/index.html` | Manrope, no Schibsted |
| `tro-frontend/src/index.css` | `@import "tailwindcss"` + `@theme` |
| `tro-frontend/src/styles/tokens.css` | Canvas, sidebar, semántica |
| `tro-frontend/src/lib/utils.ts` | `cn()` |
| `tro-frontend/src/lib/environment.ts` | `formatEnvironment` |
| `tro-frontend/src/lib/navigation.ts` | `isRouteActive`, `groupNavigableRoutes` |
| `tro-frontend/src/lib/station-join.ts` | Join cámara → estación |
| `tro-frontend/src/lib/get-navigable-routes.ts` | Filtro title+icon+!hidden |
| `tro-frontend/src/routes/index.ts` | `routeConfig` + iconos |
| `tro-frontend/src/context/VideosProvider.tsx` | `{ videos, error, loading, refetch }` |
| `tro-frontend/src/hooks/use-mobile.ts` | `md` = 768 |
| `tro-frontend/src/components/ui/{button,separator,sheet,sidebar}.tsx` | Primitivos |
| `tro-frontend/src/components/ui/app-sidebar/*` | Composición de producto |
| `tro-frontend/src/components/layout/PrivateLayout.tsx` | Provider + Sidebar + Inset |
| `tro-frontend/src/components/camera/CameraRail.tsx` | Lista interna de Monitoreo |
| `tro-frontend/src/App.tsx` | Router + layout + Routes |
| Páginas y cards existentes | Tailwind + copy operativo |
| CSS de navbar/dashboard/cameras | Dejar de importar; borrar si nadie los usa |

**Interfaces (locked, used by later tasks):**

```ts
// src/lib/utils.ts
export function cn(...inputs: Array<string | false | null | undefined>): string

// src/lib/environment.ts
export function formatEnvironment(env: string): string

// src/routes/index.ts
export interface AppRoute {
  path: string;
  title: string;
  icon: LucideIcon;
  element: ReactNode;
  hidden?: boolean;
}
export const routeConfig: AppRoute[] // Task 5, `src/routes/index.ts`

// src/lib/get-navigable-routes.ts
export function getNavigableRoutes(routes: AppRoute[]): AppRoute[]

// src/lib/navigation.ts
export const ROUTE_GROUP_DEFINITIONS: ReadonlyArray<{
  label: string;
  matcher: (route: AppRoute) => boolean;
}>
export function isRouteActive(
  pathname: string,
  route: Pick<AppRoute, "path">,
  visibleRoutes: Array<Pick<AppRoute, "path">>,
): boolean
export function groupNavigableRoutes(
  routes: AppRoute[],
): Array<{ label: string; routes: AppRoute[] }>

// src/lib/station-join.ts
export type StationResolution =
  | { kind: "linked"; name: string }
  | { kind: "unlinked" }
  | { kind: "unresolved" }
export function resolveStationLabel(
  cameraId: string,
  stations: Station[] | null,
): StationResolution
export function stationResolutionText(resolution: StationResolution): string

// src/context/VideosProvider.tsx
export type VideosContextValue = {
  videos: VideoInfo[];
  error: string | null;
  loading: boolean;
  refetch: () => Promise<void>;
}
export function VideosProvider({ children }: { children: React.ReactNode }): JSX.Element
export function useVideos(): VideosContextValue

// src/hooks/use-mobile.ts
export function useIsMobile(): boolean

// CameraRail
export function CameraRail(props: {
  videos: VideoInfo[];
  selectedId: string | null;
  onSelect: (video: VideoInfo) => void;
}): JSX.Element
```

---

### Task 1: Tailwind, alias, tokens, Manrope

**Files:**
- Modify: `tro-frontend/package.json` (vía npm)
- Modify: `tro-frontend/vite.config.ts`
- Modify: `tro-frontend/tsconfig.app.json`
- Modify: `tro-frontend/tsconfig.json`
- Modify: `tro-frontend/index.html`
- Modify: `tro-frontend/src/index.css`
- Modify: `tro-frontend/src/styles/tokens.css`
- Modify: `tro-frontend/src/main.tsx`
- Create: `tro-frontend/src/lib/utils.ts`

**Interfaces:**
- Consumes: nada
- Produces: `cn()`, CSS variables de la spec, alias `@/`

- [ ] **Step 1: Instalar dependencias de layout**

```bash
cd tro-frontend
npm install tailwindcss @tailwindcss/vite class-variance-authority clsx tailwind-merge lucide-react @radix-ui/react-slot @radix-ui/react-dialog @radix-ui/react-separator
```

Expected: exit 0. `package.json` lista esos paquetes.

- [ ] **Step 2: Alias y plugin Vite**

Reemplazar `tro-frontend/vite.config.ts` por:

```ts
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

Añadir en `tro-frontend/tsconfig.app.json` dentro de `compilerOptions`:

```json
"baseUrl": ".",
"paths": {
  "@/*": ["./src/*"]
}
```

Añadir en `tro-frontend/tsconfig.json`:

```json
"compilerOptions": {
  "baseUrl": ".",
  "paths": {
    "@/*": ["./src/*"]
  }
}
```

(si `compilerOptions` no existe en el root, créalo junto a `files`/`references`.)

- [ ] **Step 3: `cn()`**

Crear `tro-frontend/src/lib/utils.ts`:

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 4: Tokens**

Reemplazar `tro-frontend/src/styles/tokens.css` por:

```css
:root {
  --canvas: #070d14;
  --panel: #0b1f3a;
  --deep: #0b4f78;
  --mid: #1480b8;
  --energy: #00a8ff;
  --ink: #07111a;
  --paper: #f3f9fd;
  --mute: #8aa0b5;
  --ok: #2f7d4a;
  --warn: #c4922a;
  --fail: #b33a32;
  --video: #000000;
  --font-num: ui-monospace, "Fragment Mono", monospace;

  --sidebar: #0b4f78;
  --sidebar-foreground: #f3f9fd;
  --sidebar-primary: #00a8ff;
  --sidebar-primary-foreground: #07111a;
  --sidebar-accent: color-mix(in srgb, #00a8ff 16%, #0b4f78);
  --sidebar-accent-foreground: #f3f9fd;
  --sidebar-border: color-mix(in srgb, #1480b8 45%, #0b4f78);
  --sidebar-ring: #00a8ff;
  --sidebar-width: 18rem;
  --header-height: 3rem;
}
```

- [ ] **Step 5: `index.css` y fuente**

Reemplazar `tro-frontend/src/index.css` por:

```css
@import "tailwindcss";
@import "./styles/tokens.css";

@theme inline {
  --font-sans: "Manrope", ui-sans-serif, system-ui, sans-serif;
  --color-canvas: var(--canvas);
  --color-panel: var(--panel);
  --color-deep: var(--deep);
  --color-mid: var(--mid);
  --color-energy: var(--energy);
  --color-ink: var(--ink);
  --color-paper: var(--paper);
  --color-mute: var(--mute);
  --color-ok: var(--ok);
  --color-warn: var(--warn);
  --color-fail: var(--fail);
  --color-video: var(--video);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
  --radius-sm: 2px;
  --radius-md: 2px;
  --radius-lg: 0.75rem;
}

html,
body,
#root {
  min-height: 100%;
}

body {
  margin: 0;
  font-family: var(--font-sans);
  background: var(--canvas);
  color: var(--paper);
}
```

En `tro-frontend/index.html` sustituir el link de Schibsted por:

```html
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
```

`tro-frontend/src/main.tsx` debe importar `./index.css` (ya lo hace) y `./styles/tokens.css` puede quedar solo vía `index.css` (quitar el import duplicado de tokens en `main.tsx` si queda).

- [ ] **Step 6: Build**

```bash
cd tro-frontend && npm run build
```

Expected: exit 0.

- [ ] **Step 7: Commit** (solo si el usuario lo pidió)

```bash
git add tro-frontend/package.json tro-frontend/package-lock.json tro-frontend/vite.config.ts tro-frontend/tsconfig.json tro-frontend/tsconfig.app.json tro-frontend/index.html tro-frontend/src/index.css tro-frontend/src/styles/tokens.css tro-frontend/src/lib/utils.ts tro-frontend/src/main.tsx
git commit -m "Add Tailwind tokens and Manrope for the TORNS control shell."
```

---

### Task 2: Primitivos Button, Separator, Sheet, Sidebar

**Files:**
- Create: `tro-frontend/src/hooks/use-mobile.ts`
- Create: `tro-frontend/src/components/ui/button.tsx`
- Create: `tro-frontend/src/components/ui/separator.tsx`
- Create: `tro-frontend/src/components/ui/sheet.tsx`
- Create: `tro-frontend/src/components/ui/sidebar.tsx`

**Interfaces:**
- Consumes: `cn()`, tokens `--sidebar-*`, `--sidebar-width`, `--header-height`
- Produces: `SidebarProvider`, `Sidebar`, `SidebarInset`, `SidebarTrigger`, `SidebarHeader`, `SidebarContent`, `SidebarFooter`, `SidebarGroup`, `SidebarGroupLabel`, `SidebarGroupContent`, `SidebarMenu`, `SidebarMenuItem`, `SidebarMenuButton`, `useSidebar()`, `Sheet`, `SheetContent`, `Button`, `Separator`, `useIsMobile()`

- [ ] **Step 1: `useIsMobile`**

Crear `tro-frontend/src/hooks/use-mobile.ts`:

```ts
import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}
```

- [ ] **Step 2: Button y Separator**

Crear `tro-frontend/src/components/ui/button.tsx`:

```tsx
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-[2px] text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sidebar-ring)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-energy text-ink hover:bg-energy/90",
        ghost: "text-paper hover:bg-white/10",
        outline: "border border-white/15 bg-transparent text-paper hover:bg-white/10",
      },
      size: {
        default: "h-9 px-3",
        icon: "size-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
```

Crear `tro-frontend/src/components/ui/separator.tsx`:

```tsx
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "@/lib/utils";

function Separator({
  className,
  orientation = "vertical",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-white/15",
        orientation === "vertical" ? "h-4 w-px" : "h-px w-full",
        className,
      )}
      {...props}
    />
  );
}

export { Separator };
```

Añadir `import type * as React from "react"` o `import type { ComponentProps } from "react"` si `erasableSyntaxOnly` se queja del namespace. Preferir:

```tsx
import type { ComponentProps } from "react";
```

y `ComponentProps<typeof SeparatorPrimitive.Root>`.

- [ ] **Step 3: Sheet (Dialog)**

Crear `tro-frontend/src/components/ui/sheet.tsx`:

```tsx
import * as DialogPrimitive from "@radix-ui/react-dialog";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

function Sheet(props: ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger(props: ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose(props: ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal(props: ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal {...props} />;
}

function SheetOverlay({ className, ...props }: ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      className={cn("fixed inset-0 z-50 bg-black/60", className)}
      {...props}
    />
  );
}

function SheetContent({
  className,
  children,
  side = "left",
  ...props
}: ComponentProps<typeof DialogPrimitive.Content> & { side?: "left" | "right" }) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <DialogPrimitive.Content
        className={cn(
          "fixed z-50 flex h-full w-3/4 max-w-sm flex-col bg-sidebar text-sidebar-foreground shadow-lg",
          side === "left" ? "inset-y-0 left-0" : "inset-y-0 right-0",
          className,
        )}
        {...props}
      >
        <DialogPrimitive.Title className="sr-only">Panel</DialogPrimitive.Title>
        {children}
      </DialogPrimitive.Content>
    </SheetPortal>
  );
}

export { Sheet, SheetTrigger, SheetClose, SheetContent };
```

- [ ] **Step 4: Sidebar primitivos**

Crear `tro-frontend/src/components/ui/sidebar.tsx` con este contrato (implementación completa, no un stub):

```tsx
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { PanelLeft } from "lucide-react";
import * as React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

type SidebarContextValue = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

function useSidebar() {
  const ctx = React.useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider");
  return ctx;
}

function readSidebarCookie() {
  if (typeof document === "undefined") return true;
  const match = document.cookie.match(/(?:^|; )sidebar_state=(true|false)/);
  return match ? match[1] === "true" : true;
}

function SidebarProvider({
  defaultOpen,
  children,
  style,
  className,
}: React.ComponentProps<"div"> & { defaultOpen?: boolean }) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);
  const [open, setOpenState] = React.useState(defaultOpen ?? readSidebarCookie);

  const setOpen = React.useCallback((value: boolean) => {
    setOpenState(value);
    document.cookie = `${SIDEBAR_COOKIE_NAME}=${value}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
  }, []);

  const toggleSidebar = React.useCallback(() => {
    if (isMobile) setOpenMobile((current) => !current);
    else setOpen(!open);
  }, [isMobile, open, setOpen]);

  React.useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === SIDEBAR_KEYBOARD_SHORTCUT) {
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggleSidebar]);

  const value: SidebarContextValue = {
    state: open ? "expanded" : "collapsed",
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  };

  return (
    <SidebarContext.Provider value={value}>
      <div
        data-slot="sidebar-wrapper"
        style={
          {
            "--sidebar-width": "18rem",
            "--header-height": "3rem",
            ...style,
          } as React.CSSProperties
        }
        className={cn("flex min-h-svh w-full bg-canvas", className)}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

function Sidebar({
  className,
  children,
  variant = "inset",
  collapsible = "offcanvas",
}: React.ComponentProps<"div"> & {
  variant?: "inset";
  collapsible?: "offcanvas";
}) {
  const { isMobile, open, openMobile, setOpenMobile, state } = useSidebar();
  void variant;
  void collapsible;

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent side="left" className="w-[18rem] p-0">
          <div className="flex h-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      data-state={state}
      data-collapsible="offcanvas"
      className={cn(
        "group hidden text-sidebar-foreground md:block",
        state === "collapsed" ? "w-0" : "w-[var(--sidebar-width)]",
        "shrink-0 transition-[width] duration-200",
        className,
      )}
    >
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-20 flex h-svh w-[var(--sidebar-width)] flex-col bg-sidebar",
          state === "collapsed" && "-translate-x-full",
          "transition-transform duration-200",
        )}
      >
        {children}
      </div>
    </div>
  );
}

function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      className={cn(
        "flex min-h-svh min-w-0 flex-1 flex-col bg-canvas p-2 md:peer-data-[state=collapsed]:ml-0",
        className,
      )}
      {...props}
    >
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg bg-panel text-paper shadow-sm">
        {props.children}
      </div>
    </main>
  );
}

function SidebarTrigger({ className, ...props }: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar();
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(className)}
      onClick={toggleSidebar}
      {...props}
    >
      <PanelLeft className="size-4" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-2 p-3", className)} {...props} />;
}
function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex min-h-0 flex-1 flex-col overflow-auto", className)} {...props} />;
}
function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("p-3", className)} {...props} />;
}
function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("p-2", className)} {...props} />;
}
function SidebarGroupLabel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("px-2 py-1.5 text-xs font-medium text-sidebar-foreground/70", className)}
      {...props}
    />
  );
}
function SidebarGroupContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn(className)} {...props} />;
}
function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return <ul className={cn("flex flex-col gap-1", className)} {...props} />;
}
function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li className={cn(className)} {...props} />;
}

const sidebarMenuButtonVariants = cva(
  "flex w-full items-center gap-2 rounded-[2px] px-2 py-2 text-sm transition-colors duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
  {
    variants: {
      isActive: {
        true: "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm hover:bg-sidebar-primary hover:text-sidebar-primary-foreground",
        false: "text-sidebar-foreground",
      },
    },
    defaultVariants: { isActive: false },
  },
);

function SidebarMenuButton({
  className,
  isActive = false,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof sidebarMenuButtonVariants> & { asChild?: boolean; isActive?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(sidebarMenuButtonVariants({ isActive }), className)}
      {...props}
    />
  );
}

export {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarTrigger,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
};
```

Corregir `SidebarInset`: no anides `{props.children}` dos veces. Firma:

```tsx
function SidebarInset({ className, children, ...props }: React.ComponentProps<"main">) {
  return (
    <main className={cn("flex min-h-svh min-w-0 flex-1 flex-col bg-canvas p-2", className)} {...props}>
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg bg-panel text-paper shadow-sm">
        {children}
      </div>
    </main>
  );
}
```

- [ ] **Step 5: Cerrar Sheet al navegar**

No va en el primitivo. Lo hace `PrivateLayout` en Task 5 escuchando `useLocation()`.

- [ ] **Step 6: Build**

```bash
cd tro-frontend && npm run build
```

Expected: exit 0. Si `SidebarInset` o `separator` fallan por imports de tipo, arreglar `import type` / `verbatimModuleSyntax` antes de seguir.

- [ ] **Step 7: Commit** (solo si el usuario lo pidió)

```bash
git add tro-frontend/src/hooks/use-mobile.ts tro-frontend/src/components/ui
git commit -m "Add sidebar primitives for the TORNS app shell."
```

---

### Task 3: Rutas, grupos y estado activo

**Files:**
- Create: `tro-frontend/src/lib/environment.ts`
- Create: `tro-frontend/src/lib/navigation.ts`
- Create: `tro-frontend/src/lib/get-navigable-routes.ts`
- Create: `tro-frontend/src/lib/station-join.ts`
- Create: `tro-frontend/src/routes/types.ts`

**Interfaces:**
- Consumes: `AppRoute` (se define aquí)
- Produces: funciones locked en el File Map

- [ ] **Step 1: `formatEnvironment`**

Crear `tro-frontend/src/lib/environment.ts`:

```ts
const ENVIRONMENT_LABELS: Record<string, string> = {
  development: "Desarrollo",
  production: "Producción",
  staging: "Pruebas",
  testing: "Testing",
  local: "Local",
  "---": "---",
};

export function formatEnvironment(env: string): string {
  return ENVIRONMENT_LABELS[env.toLowerCase()] ?? env;
}
```

- [ ] **Step 2: Join estación**

Crear `tro-frontend/src/lib/station-join.ts`:

```ts
import type { Station } from "@/types/routing.types";

export type StationResolution =
  | { kind: "linked"; name: string }
  | { kind: "unlinked" }
  | { kind: "unresolved" };

export function resolveStationLabel(
  cameraId: string,
  stations: Station[] | null,
): StationResolution {
  if (stations === null) return { kind: "unresolved" };
  const station = stations.find((item) => item.camera_id === cameraId);
  if (!station) return { kind: "unlinked" };
  return { kind: "linked", name: station.name };
}

export function stationResolutionText(resolution: StationResolution): string {
  if (resolution.kind === "linked") return resolution.name;
  if (resolution.kind === "unlinked") return "Sin estación";
  return "No se pudo resolver";
}
```

- [ ] **Step 3: Navegación**

Crear `tro-frontend/src/routes/types.ts`:

```ts
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export interface AppRoute {
  path: string;
  title: string;
  icon: LucideIcon;
  element: ReactNode;
  hidden?: boolean;
}
```

Crear `tro-frontend/src/lib/get-navigable-routes.ts`:

```ts
import type { AppRoute } from "@/routes/types";

export function getNavigableRoutes(routes: AppRoute[]): AppRoute[] {
  return routes.filter((route) => Boolean(route.title) && Boolean(route.icon) && !route.hidden);
}
```

Crear `tro-frontend/src/lib/navigation.ts`:

```ts
import type { AppRoute } from "@/routes/types";

export const ROUTE_GROUP_DEFINITIONS = [
  {
    label: "Visión general",
    matcher: (route: AppRoute) => route.path === "/",
  },
  {
    label: "Operación",
    matcher: (route: AppRoute) =>
      route.path === "/monitoring" || route.path === "/routing",
  },
  {
    label: "Administración",
    matcher: (route: AppRoute) => route.path === "/cameras",
  },
] as const;

export function isRouteActive(
  pathname: string,
  route: Pick<AppRoute, "path">,
  visibleRoutes: Array<Pick<AppRoute, "path">>,
): boolean {
  if (route.path === "/") return pathname === "/";
  const matches = pathname === route.path || pathname.startsWith(`${route.path}/`);
  if (!matches) return false;
  return !visibleRoutes.some(
    (other) =>
      other.path !== route.path &&
      other.path.startsWith(`${route.path}/`) &&
      pathname.startsWith(other.path),
  );
}

export function groupNavigableRoutes(routes: AppRoute[]) {
  const used = new Set<string>();
  const groups: Array<{ label: string; routes: AppRoute[] }> = [];
  for (const definition of ROUTE_GROUP_DEFINITIONS) {
    const items = routes.filter((route) => definition.matcher(route));
    if (items.length === 0) continue;
    items.forEach((route) => used.add(route.path));
    groups.push({ label: definition.label, routes: items });
  }
  const leftover = routes.filter((route) => !used.has(route.path));
  if (leftover.length > 0) groups.push({ label: "Otros", routes: leftover });
  return groups;
}
```

Comprobar a mano (no hay suite): `isRouteActive("/", { path: "/" }, []) === true`; `isRouteActive("/monitoring", { path: "/" }, []) === false`; `resolveStationLabel("x", null)` → unresolved; `resolveStationLabel("x", [])` → unlinked.

- [ ] **Step 4: Build**

```bash
cd tro-frontend && npm run build
```

Expected: exit 0. `routeConfig` se crea en Task 5, cuando las páginas ya usan `useVideos()`.

---

### Task 4: VideosProvider

**Files:**
- Create: `tro-frontend/src/context/VideosProvider.tsx`

**Interfaces:**
- Consumes: `API_BASE_URL`, `VideoInfo`, `VideoListResponse`
- Produces: `VideosProvider`, `useVideos`

- [ ] **Step 1: Provider**

Crear `tro-frontend/src/context/VideosProvider.tsx`:

```tsx
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { VideoInfo, VideoListResponse } from "@/types/video.types";
import { API_BASE_URL } from "@/utils/constants";

export type VideosContextValue = {
  videos: VideoInfo[];
  error: string | null;
  loading: boolean;
  refetch: () => Promise<void>;
};

const VideosContext = createContext<VideosContextValue | null>(null);

export function VideosProvider({ children }: { children: React.ReactNode }) {
  const [videos, setVideos] = useState<VideoInfo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/videos/list`);
      if (!response.ok) throw new Error("Failed to fetch videos");
      const data: VideoListResponse = await response.json();
      setVideos(data.videos);
    } catch (err) {
      setVideos([]);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refetch();
  }, [refetch]);

  const value = useMemo(
    () => ({ videos, error, loading, refetch }),
    [videos, error, loading, refetch],
  );

  return <VideosContext.Provider value={value}>{children}</VideosContext.Provider>;
}

export function useVideos(): VideosContextValue {
  const ctx = useContext(VideosContext);
  if (!ctx) throw new Error("useVideos must be used within VideosProvider");
  return ctx;
}
```

Firma de children: `import type { ReactNode } from "react"` y `{ children: ReactNode }`.

- [ ] **Step 2: Build**

```bash
cd tro-frontend && npm run build
```

Expected: exit 0. El provider aún no está montado; App.tsx sigue fetch-eando. El cableado es Task 5.

---

### Task 5: Shell de producto y App.tsx

**Files:**
- Create: `tro-frontend/src/components/ui/app-sidebar/nav-groups.tsx`
- Create: `tro-frontend/src/components/ui/app-sidebar/nav-system.tsx`
- Create: `tro-frontend/src/components/ui/app-sidebar/app-sidebar.tsx`
- Create: `tro-frontend/src/components/ui/app-sidebar/site-header.tsx`
- Create: `tro-frontend/src/components/layout/PrivateLayout.tsx`
- Create: `tro-frontend/src/routes/index.ts`
- Modify: `tro-frontend/src/App.tsx`
- Modify: `tro-frontend/src/pages/HomePage.tsx` (quitar prop `videos`, usar `useVideos`)
- Modify: `tro-frontend/src/pages/MonitoringPage.tsx` (quitar prop `videos`, usar `useVideos`; restyle es Task 7)
- Modify: `tro-frontend/src/pages/CamerasPage.tsx` (quitar prop `videos`, usar `useVideos`; inventario es Task 8)

**Interfaces:**
- Consumes: `routeConfig`, `getNavigableRoutes`, `groupNavigableRoutes`, `isRouteActive`, `useHealthCheck`, `formatEnvironment`, primitivos Task 2, `VideosProvider`
- Produces: app usable con sidebar; páginas aún con cromo viejo pero dentro del inset

- [ ] **Step 1: Nav groups**

`tro-frontend/src/components/ui/app-sidebar/nav-groups.tsx`:

```tsx
import { NavLink, useLocation } from "react-router-dom";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getNavigableRoutes } from "@/lib/get-navigable-routes";
import { groupNavigableRoutes, isRouteActive } from "@/lib/navigation";
import { routeConfig } from "@/routes";

export function NavGroups() {
  const location = useLocation();
  const visible = getNavigableRoutes(routeConfig);
  const groups = groupNavigableRoutes(visible);

  return (
    <>
      {groups.map((group) => (
        <SidebarGroup key={group.label}>
          <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {group.routes.map((route) => {
                const Icon = route.icon;
                const active = isRouteActive(location.pathname, route, visible);
                return (
                  <SidebarMenuItem key={route.path}>
                    <SidebarMenuButton asChild isActive={active}>
                      <NavLink to={route.path} end={route.path === "/"}>
                        <Icon className="size-4 shrink-0" />
                        <span className="truncate">{route.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
}
```

- [ ] **Step 2: Pie de sistema**

`tro-frontend/src/components/ui/app-sidebar/nav-system.tsx`:

```tsx
import { useHealthCheck } from "@/hooks/useHealthCheck";
import { formatEnvironment } from "@/lib/environment";
import { cn } from "@/lib/utils";

export function NavSystem() {
  const health = useHealthCheck();
  return (
    <div className="flex items-start gap-2 rounded-[2px] border border-sidebar-border px-2 py-2 text-xs">
      <span
        className={cn(
          "mt-1 size-2 shrink-0 rounded-full",
          health.isOnline ? "bg-ok" : "bg-fail",
        )}
      />
      <div className="min-w-0">
        <p className="font-medium text-sidebar-foreground">
          {health.isOnline ? "Sistema operativo" : "Sistema desconectado"}
        </p>
        <p className="truncate text-sidebar-foreground/70">
          {health.version} · {formatEnvironment(health.environment)}
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: AppSidebar y SiteHeader**

`tro-frontend/src/components/ui/app-sidebar/app-sidebar.tsx`:

```tsx
import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { NavGroups } from "@/components/ui/app-sidebar/nav-groups";
import { NavSystem } from "@/components/ui/app-sidebar/nav-system";

export function AppSidebar() {
  return (
    <Sidebar variant="inset" collapsible="offcanvas">
      <SidebarHeader>
        <Link to="/" className="flex flex-col gap-0.5 px-2 py-1 text-sidebar-foreground">
          <span className="text-sm font-extrabold tracking-tight">TORNS</span>
          <span className="text-xs text-sidebar-foreground/70">Centro de control · LIRN</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavGroups />
      </SidebarContent>
      <SidebarFooter>
        <NavSystem />
      </SidebarFooter>
    </Sidebar>
  );
}
```

`tro-frontend/src/components/ui/app-sidebar/site-header.tsx`:

```tsx
import { useLocation } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getNavigableRoutes } from "@/lib/get-navigable-routes";
import { isRouteActive } from "@/lib/navigation";
import { routeConfig } from "@/routes";

export function SiteHeader() {
  const location = useLocation();
  const visible = getNavigableRoutes(routeConfig);
  const current = visible.find((route) => isRouteActive(location.pathname, route, visible));
  return (
    <header className="flex h-[var(--header-height)] shrink-0 items-center gap-2 border-b border-white/10 px-3">
      <SidebarTrigger />
      <Separator orientation="vertical" />
      <nav className="text-sm text-mute">
        <span>TORNS</span>
        <span className="px-1.5">/</span>
        <span className="text-paper">{current?.title ?? ""}</span>
      </nav>
    </header>
  );
}
```

- [ ] **Step 4: PrivateLayout**

`tro-frontend/src/components/layout/PrivateLayout.tsx`:

```tsx
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AppSidebar } from "@/components/ui/app-sidebar/app-sidebar";
import { SiteHeader } from "@/components/ui/app-sidebar/site-header";
import { SidebarProvider, SidebarInset, useSidebar } from "@/components/ui/sidebar";
import { VideosProvider } from "@/context/VideosProvider";

function CloseMobileOnNavigate() {
  const location = useLocation();
  const { isMobile, setOpenMobile } = useSidebar();
  useEffect(() => {
    if (isMobile) setOpenMobile(false);
  }, [location.pathname, isMobile, setOpenMobile]);
  return null;
}

export function PrivateLayout() {
  return (
    <VideosProvider>
      <SidebarProvider>
        <CloseMobileOnNavigate />
        <AppSidebar />
        <SidebarInset>
          <SiteHeader />
          <div className="flex min-h-0 flex-1 flex-col overflow-auto">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </VideosProvider>
  );
}
```

`CloseMobileOnNavigate` usa `useSidebar`, así que **debe** vivir como hijo de `SidebarProvider`. El snippet de arriba lo pone como hermano de `AppSidebar` — correcto, ambos dentro del provider.

- [ ] **Step 5: Páginas leen `useVideos`, `routeConfig` y App.tsx**

En `HomePage`, `MonitoringPage` y `CamerasPage`: borrar `*PageProps` y el argumento `videos`. Primera línea de cada componente:

```tsx
const { videos, error, loading, refetch } = useVideos();
```

Si `error`, un párrafo y un `<button type="button" onClick={() => void refetch()}>Reintentar</button>`. Si `loading` y `videos.length === 0`, texto “Cargando fuentes…”. No uses `Loading` ni `ErrorDisplay` a pantalla completa. No rediseñes Inicio/Monitoreo/Cámaras todavía.

`routeConfig` y App.tsx:

Crear `tro-frontend/src/routes/index.ts`:

```tsx
import { Camera, House, MonitorPlay, TrainFront } from "lucide-react";
import { CamerasPage } from "@/pages/CamerasPage";
import { HomePage } from "@/pages/HomePage";
import { MonitoringPage } from "@/pages/MonitoringPage";
import { RoutingPage } from "@/pages/RoutingPage";
import type { AppRoute } from "@/routes/types";

export type { AppRoute };

export const routeConfig: AppRoute[] = [
  { path: "/", title: "Inicio", icon: House, element: <HomePage /> },
  { path: "/monitoring", title: "Monitoreo", icon: MonitorPlay, element: <MonitoringPage /> },
  { path: "/cameras", title: "Cámaras", icon: Camera, element: <CamerasPage /> },
  { path: "/routing", title: "Optimización", icon: TrainFront, element: <RoutingPage /> },
];
```

Reemplazar `tro-frontend/src/App.tsx`:

```tsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrivateLayout } from "@/components/layout/PrivateLayout";
import { routeConfig } from "@/routes";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateLayout />}>
          {routeConfig.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

Quitar imports de `./App.css`, `navbar.css`, `Navbar`, `Loading`, `ErrorDisplay`. Dejar de fetch-ear videos aquí.

Si `main.tsx` o páginas importan CSS global, no pasa nada aún; se limpia en Task 10.

- [ ] **Step 6: Verificar shell**

```bash
cd tro-frontend && npm run build
```

Expected: exit 0.

Manual: `npm run dev`. Debe verse sidebar TORNS (grupos Visión general / Operación / Administración), pie con salud, header con trigger y `TORNS / Inicio`. `Ctrl/B` colapsa. En ancho &lt; 768 el menú es sheet. Fallo de API: shell sigue, páginas muestran error + reintentar. **No** debe verse la navbar superior.

- [ ] **Step 7: Commit** (solo si el usuario lo pidió)

```bash
git add tro-frontend/src
git commit -m "Replace the top navbar with a collapsible TORNS app shell."
```

---

### Task 6: Inicio corto

**Files:**
- Modify: `tro-frontend/src/pages/HomePage.tsx`

**Interfaces:**
- Consumes: `useVideos()`, `useHealthCheck()`, `formatEnvironment`
- Produces: tablero de cuatro cifras + CTA, sin features

- [ ] **Step 1: Reescribir HomePage**

```tsx
import { useNavigate } from "react-router-dom";
import { useVideos } from "@/context/VideosProvider";
import { useHealthCheck } from "@/hooks/useHealthCheck";
import { formatEnvironment } from "@/lib/environment";
import { Button } from "@/components/ui/button";

export function HomePage() {
  const navigate = useNavigate();
  const { videos, error, loading, refetch } = useVideos();
  const health = useHealthCheck();

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 p-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Demanda y despacho</h1>
      </div>

      {error ? (
        <div className="flex items-center justify-between gap-3 rounded-[2px] border border-fail/40 bg-fail/10 px-3 py-2 text-sm">
          <p>No se pudieron cargar las fuentes de video.</p>
          <Button variant="outline" onClick={() => void refetch()}>
            Reintentar
          </Button>
        </div>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-[2px] border border-white/10 bg-canvas/40 p-4">
          <p className="text-xs uppercase tracking-wide text-mute">Cámaras listadas</p>
          <p className="mt-2 font-mono text-3xl tabular-nums">
            {loading ? "—" : videos.length}
          </p>
        </div>
        <div className="rounded-[2px] border border-white/10 bg-canvas/40 p-4">
          <p className="text-xs uppercase tracking-wide text-mute">Versión</p>
          <p className="mt-2 font-mono text-3xl tabular-nums">{health.version}</p>
        </div>
        <div className="rounded-[2px] border border-white/10 bg-canvas/40 p-4">
          <p className="text-xs uppercase tracking-wide text-mute">Entorno</p>
          <p className="mt-2 text-2xl font-semibold">{formatEnvironment(health.environment)}</p>
        </div>
        <div className="rounded-[2px] border border-white/10 bg-canvas/40 p-4">
          <p className="text-xs uppercase tracking-wide text-mute">Estado</p>
          <p className="mt-2 text-2xl font-semibold">
            {health.isOnline ? "Operativo" : "Desconectado"}
          </p>
        </div>
      </div>

      <div>
        <Button onClick={() => navigate("/monitoring")}>Ir a monitoreo</Button>
      </div>
    </div>
  );
}
```

No hay badge TORNS de hero, ni subtítulo de plataforma inteligente, ni bloque AI/RT/AN/SE.

- [ ] **Step 2: Build + manual**

```bash
cd tro-frontend && npm run build
```

Manual: `/` muestra las cuatro cifras y un botón. Buscar en el DOM: cero “Detección Inteligente”, cero “RT”, cero “Sistema Seguro”.

- [ ] **Step 3: Commit** (solo si el usuario lo pidió)

```bash
git add tro-frontend/src/pages/HomePage.tsx
git commit -m "Cut the home screen down to live control-room stats."
```

---

### Task 7: Monitoreo (CameraRail, query, live, estación)

**Files:**
- Create: `tro-frontend/src/components/camera/CameraRail.tsx`
- Modify: `tro-frontend/src/pages/MonitoringPage.tsx`
- Modify: `tro-frontend/src/components/layout/Header.tsx`
- Modify: `tro-frontend/src/components/video/VideoDisplay.tsx`
- Modify: `tro-frontend/src/components/video/VideoStream.tsx`
- Modify: `tro-frontend/src/components/detection/DetectionPanel.tsx`
- Modify: `tro-frontend/src/components/detection/DetectionStats.tsx`
- Modify: `tro-frontend/src/components/monitoring/StationMonitoringPanel.tsx`

**Interfaces:**
- Consumes: `useVideos()`, `useSearchParams`, `VideoStream` MJPEG, WS de `DetectionPanel`
- Produces: `CameraRail`; `?camera=<id>` con `replace`; EN VIVO solo si el `<img>` no está en error

- [ ] **Step 1: CameraRail**

```tsx
import type { VideoInfo } from "@/types/video.types";
import { cn } from "@/lib/utils";

export function CameraRail({
  videos,
  selectedId,
  onSelect,
}: {
  videos: VideoInfo[];
  selectedId: string | null;
  onSelect: (video: VideoInfo) => void;
}) {
  return (
    <aside className="flex w-[220px] shrink-0 flex-col border-r border-white/10 bg-canvas/40">
      <div className="flex items-center justify-between px-3 py-3 text-xs font-medium text-mute">
        <span>Cámaras</span>
        <span className="font-mono tabular-nums">{videos.length}</span>
      </div>
      <div className="flex flex-col gap-1 overflow-auto p-2">
        {videos.map((video) => {
          const selected = selectedId === video.id;
          return (
            <button
              key={video.id}
              type="button"
              onClick={() => onSelect(video)}
              className={cn(
                "rounded-[2px] px-2 py-2 text-left transition-colors duration-200",
                selected ? "bg-energy text-ink" : "text-paper hover:bg-white/10",
              )}
            >
              <p className="truncate text-sm font-medium">{video.name}</p>
              <p className={cn("truncate font-mono text-[11px]", selected ? "text-ink/70" : "text-mute")}>
                {video.id}
              </p>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
```

Cero “Activa”, cero 99.9 %, cero punto verde de adorno.

- [ ] **Step 2: VideoStream — EN VIVO real**

En `VideoStream`, el overlay `EN VIVO` solo se renderiza si `!streamError`. Añadir callback opcional:

```tsx
interface VideoStreamProps {
  video: VideoInfo;
  onPlayingChange?: (playing: boolean) => void;
}
```

Tras `onError` → `onPlayingChange?.(false)`. Cuando `streamError` es false (incluido reset por `video.id` o Reintentar) → `onPlayingChange?.(true)`.

El botón de reintento usa clases Tailwind (`border border-energy px-3 py-2 text-sm`), no `.retry-btn`.

- [ ] **Step 3: VideoDisplay**

Si no hay selección, no pintes un empty duplicado (lo pinta la página). `VideoDisplay` exige `selectedVideo: VideoInfo` (no null). Quita el `view-header` duplicado (nombre y live van al strip de la página). El componente queda: contenedor negro + `VideoStream`.

```tsx
export function VideoDisplay({
  selectedVideo,
  onPlayingChange,
}: {
  selectedVideo: VideoInfo;
  onPlayingChange?: (playing: boolean) => void;
}) {
  return (
    <div className="flex min-h-[240px] flex-1 items-center justify-center bg-video">
      <VideoStream video={selectedVideo} onPlayingChange={onPlayingChange} />
    </div>
  );
}
```

`VideoStream` img: `className="max-h-full w-full object-contain"`.

- [ ] **Step 4: Header → strip Tailwind**

Reescribir `Header.tsx` con las mismas props (`overview`, `totalCameras`, `activeCameras`) y clases Tailwind: fila de métricas, `font-mono tabular-nums` en personas/objetos. Labels: “Estado”, “Última actualización”, “Personas”, “Objetos”, “Fuentes”. `activeCameras/totalCameras` solo tiene sentido con selección; la página pasa `selectedVideo ? 1 : 0`.

Mapa de estado (ya existente): idle “En espera”, connecting “Conectando”, active “Activo”, error “Error”.

- [ ] **Step 5: DetectionPanel / DetectionStats**

Sustituir clases `.detection-*` por Tailwind compacto (el strip de la página ya muestra números; si DetectionPanel duplica, deja solo el indicador de WS y deja que `Header` lleve los conteos). No cambies la lógica del WebSocket.

Copy: “Detections en vivo” → “Detecciones”. `connectionLabel("open")` queda “Conectado” (el EN VIVO es del MJPEG, no del WS).

- [ ] **Step 6: StationMonitoringPanel**

Reemplazar classNames metro por Tailwind (`border-white/10`, `bg-canvas/40`, `text-mute`). Títulos en frase, no caps: “Detección actual”, “Plan de despacho”, “Configuración”, “Trenes disponibles”. Quitar “óptimo”. Misma data y mismos fetch por `camera_id`.

- [ ] **Step 7: MonitoringPage**

```tsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CameraRail } from "@/components/camera/CameraRail";
import { DetectionPanel } from "@/components/detection/DetectionPanel";
import { Header } from "@/components/layout/Header";
import { StationMonitoringPanel } from "@/components/monitoring/StationMonitoringPanel";
import { VideoDisplay } from "@/components/video/VideoDisplay";
import { useVideos } from "@/context/VideosProvider";
import type {
  DetectionConnectionState,
  DetectionMetricsMessage,
  DetectionOverview,
  VideoInfo,
} from "@/types/video.types";
import { Button } from "@/components/ui/button";

const INITIAL_OVERVIEW: DetectionOverview = {
  status: "idle",
  lastUpdate: null,
  personCount: 0,
  totalObjects: 0,
};

export function MonitoringPage() {
  const { videos, error, loading, refetch } = useVideos();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedVideo, setSelectedVideo] = useState<VideoInfo | null>(null);
  const [overview, setOverview] = useState<DetectionOverview>(INITIAL_OVERVIEW);
  const [latestMetrics, setLatestMetrics] = useState<DetectionMetricsMessage | null>(null);
  const [streamPlaying, setStreamPlaying] = useState(false);

  useEffect(() => {
    const cameraId = searchParams.get("camera");
    if (!cameraId) {
      setSelectedVideo(null);
      return;
    }
    setSelectedVideo(videos.find((video) => video.id === cameraId) ?? null);
  }, [searchParams, videos]);

  useEffect(() => {
    if (!selectedVideo) {
      setOverview(INITIAL_OVERVIEW);
      setLatestMetrics(null);
      setStreamPlaying(false);
    }
  }, [selectedVideo]);

  function selectVideo(video: VideoInfo) {
    setSearchParams({ camera: video.id }, { replace: true });
  }

  const handleMetricsUpdate = (metrics: DetectionMetricsMessage) => {
    setLatestMetrics(metrics);
    setOverview({
      status: "active",
      lastUpdate: new Date(metrics.timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      personCount: metrics.personCount ?? metrics.person_count ?? 0,
      totalObjects: metrics.totalObjects ?? metrics.total_objects ?? 0,
    });
  };

  const handleConnectionChange = (state: DetectionConnectionState) => {
    setOverview((previous) => {
      if (!selectedVideo) return INITIAL_OVERVIEW;
      switch (state) {
        case "connecting":
          return { status: "connecting", lastUpdate: null, personCount: 0, totalObjects: 0 };
        case "open":
          if (previous.status === "active") return previous;
          return { ...previous, status: "connecting" };
        case "error":
          return { ...previous, status: "error" };
        case "closed":
        case "idle":
        default:
          return INITIAL_OVERVIEW;
      }
    });
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {error ? (
        <div className="flex items-center justify-between gap-3 border-b border-fail/40 bg-fail/10 px-3 py-2 text-sm">
          <p>No se pudieron cargar las fuentes de video.</p>
          <Button variant="outline" onClick={() => void refetch()}>Reintentar</Button>
        </div>
      ) : null}

      <Header
        overview={overview}
        totalCameras={videos.length}
        activeCameras={selectedVideo ? 1 : 0}
      />

      <div className="flex min-h-0 flex-1">
        <CameraRail
          videos={videos}
          selectedId={selectedVideo?.id ?? null}
          onSelect={selectVideo}
        />
        <div className="flex min-w-0 flex-1 flex-col">
          {selectedVideo ? (
            <>
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2">
                <h2 className="text-sm font-medium">{selectedVideo.name}</h2>
                {streamPlaying ? (
                  <span className="rounded-[2px] bg-fail px-2 py-0.5 text-[10px] font-semibold tracking-wide text-white">
                    EN VIVO
                  </span>
                ) : null}
                <div className="ml-auto">
                  <DetectionPanel
                    video={selectedVideo}
                    onMetricsUpdate={handleMetricsUpdate}
                    onConnectionChange={handleConnectionChange}
                  />
                </div>
              </div>
              <VideoDisplay selectedVideo={selectedVideo} onPlayingChange={setStreamPlaying} />
              <div className="border-t border-white/10 p-4">
                <h3 className="mb-3 text-xs font-medium uppercase tracking-wide text-mute">
                  Estación y despacho
                </h3>
                <StationMonitoringPanel
                  cameraId={selectedVideo.id}
                  latestMetrics={latestMetrics}
                />
              </div>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-2 text-mute">
              <p className="text-lg text-paper">Elija una cámara del listado</p>
              {loading ? <p className="text-sm">Cargando fuentes…</p> : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

No reescribir el WebSocket de `DetectionPanel`. Quitar imports de `monitoring.css` y `monitoring-layout.css`.

- [ ] **Step 8: Build + manual**

```bash
cd tro-frontend && npm run build
```

Manual: `/monitoring` rail 220px; clic actualiza `?camera=`; refresh conserva; id inexistente → empty; EN VIVO ausente si el stream falla; WS connecting/error en el strip; sin 99.9 %.

- [ ] **Step 9: Commit** (solo si el usuario lo pidió)

```bash
git add tro-frontend/src/pages/MonitoringPage.tsx tro-frontend/src/components/camera/CameraRail.tsx tro-frontend/src/components/layout/Header.tsx tro-frontend/src/components/video tro-frontend/src/components/detection tro-frontend/src/components/monitoring
git commit -m "Rebuild monitoring around a camera rail and real live state."
```

---

### Task 8: Inventario de cámaras

**Files:**
- Modify: `tro-frontend/src/pages/CamerasPage.tsx`

**Interfaces:**
- Consumes: `useVideos()`, `routingService.getStations()`, `resolveStationLabel`, `stationResolutionText`, `Sheet` para móvil
- Produces: tabla + detalle; **Ver en monitoreo** → `/monitoring?camera=<id>`

- [ ] **Step 1: Página**

Reemplazar `CamerasPage.tsx` por:

```tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useVideos } from "@/context/VideosProvider";
import { resolveStationLabel, stationResolutionText } from "@/lib/station-join";
import { cn } from "@/lib/utils";
import { routingService } from "@/services/routingService";
import type { Station } from "@/types/routing.types";
import type { VideoInfo } from "@/types/video.types";
import { useIsMobile } from "@/hooks/use-mobile";

function CameraDetail({
  video,
  stationLabel,
}: {
  video: VideoInfo;
  stationLabel: string;
}) {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-lg font-semibold">{video.name}</h2>
      <dl className="grid gap-2 text-sm">
        <div className="flex justify-between gap-4 border-b border-white/10 py-2">
          <dt className="text-mute">ID</dt>
          <dd className="font-mono">{video.id}</dd>
        </div>
        <div className="flex justify-between gap-4 border-b border-white/10 py-2">
          <dt className="text-mute">Fuente</dt>
          <dd className="font-mono">{video.filename}</dd>
        </div>
        <div className="flex justify-between gap-4 py-2">
          <dt className="text-mute">Estación</dt>
          <dd>{stationLabel}</dd>
        </div>
      </dl>
      <Button asChild>
        <Link to={`/monitoring?camera=${video.id}`}>Ver en monitoreo</Link>
      </Button>
    </div>
  );
}

export function CamerasPage() {
  const { videos, error, loading, refetch } = useVideos();
  const isMobile = useIsMobile();
  const [stations, setStations] = useState<Station[] | null>([]);
  const [selected, setSelected] = useState<VideoInfo | null>(null);

  useEffect(() => {
    let cancelled = false;
    routingService
      .getStations()
      .then((response) => {
        if (!cancelled) setStations(response.stations);
      })
      .catch(() => {
        if (!cancelled) setStations(null);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const labelFor = (id: string) =>
    stationResolutionText(resolveStationLabel(id, stations));

  return (
    <div className="flex min-h-0 flex-1">
      <div className="min-w-0 flex-1 overflow-auto p-6">
        <h1 className="text-2xl font-extrabold tracking-tight">Cámaras</h1>
        <p className="mt-1 text-sm text-mute">Fuentes listadas por el prototipo.</p>

        {error ? (
          <div className="mt-4 flex items-center justify-between gap-3 rounded-[2px] border border-fail/40 bg-fail/10 px-3 py-2 text-sm">
            <p>No se pudieron cargar las fuentes de video.</p>
            <Button variant="outline" onClick={() => void refetch()}>Reintentar</Button>
          </div>
        ) : null}

        {!loading && videos.length === 0 && !error ? (
          <p className="mt-8 text-mute">No hay fuentes listadas.</p>
        ) : (
          <table className="mt-6 w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-mute">
              <tr>
                <th className="px-2 py-2 font-medium">Nombre</th>
                <th className="px-2 py-2 font-medium">ID</th>
                <th className="px-2 py-2 font-medium">Fuente</th>
                <th className="px-2 py-2 font-medium">Estación</th>
              </tr>
            </thead>
            <tbody>
              {videos.map((video) => (
                <tr
                  key={video.id}
                  onClick={() => setSelected(video)}
                  className={cn(
                    "cursor-pointer border-t border-white/10 hover:bg-white/5",
                    selected?.id === video.id && "bg-energy/10",
                  )}
                >
                  <td className="px-2 py-3">{video.name}</td>
                  <td className="px-2 py-3 font-mono">{video.id}</td>
                  <td className="px-2 py-3 font-mono">{video.filename}</td>
                  <td className="px-2 py-3">{labelFor(video.id)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {isMobile ? (
        <Sheet open={selected !== null} onOpenChange={(open) => !open && setSelected(null)}>
          <SheetContent side="right" className="bg-panel text-paper">
            {selected ? (
              <CameraDetail video={selected} stationLabel={labelFor(selected.id)} />
            ) : null}
          </SheetContent>
        </Sheet>
      ) : selected ? (
        <aside className="w-[320px] shrink-0 border-l border-white/10">
          <CameraDetail video={selected} stationLabel={labelFor(selected.id)} />
        </aside>
      ) : (
        <aside className="hidden w-[320px] shrink-0 border-l border-white/10 lg:block">
          <p className="p-4 text-sm text-mute">Seleccione una fila.</p>
        </aside>
      )}
    </div>
  );
}
```

Inicializar `stations` en `[]` (unlinked) hasta que llegue la respuesta; `null` solo en catch. No pintar 1920x1080, 30 FPS, 99.9 %, ni “Activa”.

`Button asChild` + `Link` requiere que `Button` soporte `asChild` (Task 2).

- [ ] **Step 2: Build + manual**

```bash
cd tro-frontend && npm run build
```

Manual: tabla con nombre/id/filename; estación real o “Sin estación”; apagar backend de routing → “No se pudo resolver”; Ver en monitoreo abre la fuente; grep del archivo: no `1920`, no `99.9`, no `FPS`.

- [ ] **Step 3: Commit** (solo si el usuario lo pidió)

```bash
git add tro-frontend/src/pages/CamerasPage.tsx
git commit -m "Replace the camera grid with an inventory of real sources."
```

---

### Task 9: Optimización restyle

**Files:**
- Modify: `tro-frontend/src/pages/RoutingPage.tsx`
- Modify: `tro-frontend/src/components/routing/TrainModelCard.tsx`
- Modify: `tro-frontend/src/components/routing/StationCard.tsx`
- Modify: `tro-frontend/src/components/routing/StationStatusCard.tsx`
- Modify: `tro-frontend/src/components/routing/DispatchPanel.tsx`
- Modify: `tro-frontend/src/components/common/Loading.tsx`
- Modify: `tro-frontend/src/components/common/ErrorDisplay.tsx`

**Interfaces:**
- Consumes: `useRoutingData(10000)`, mismos endpoints
- Produces: mismas cuatro pestañas, copy operativo, piel panel

- [ ] **Step 1: Loading y ErrorDisplay**

`Loading.tsx`:

```tsx
export function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center p-8 text-sm text-mute">
      Cargando despacho…
    </div>
  );
}
```

`ErrorDisplay.tsx`:

```tsx
import { Button } from "@/components/ui/button";

export function ErrorDisplay({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <div className="m-6 rounded-[2px] border border-fail/40 bg-fail/10 p-4 text-sm">
      <p className="font-medium">No se pudo cargar el despacho.</p>
      <p className="mt-1 text-mute">{error}</p>
      <Button className="mt-3" variant="outline" onClick={onRetry}>
        Reintentar
      </Button>
    </div>
  );
}
```

En `RoutingPage`, cuando `error` sea truthy:

```tsx
if (error) return <ErrorDisplay error={error} onRetry={() => void refetch()} />;
```

- [ ] **Step 2: RoutingPage chrome**

Cabecera:

```tsx
<h1 className="text-2xl font-extrabold tracking-tight">Optimización</h1>
<p className="text-sm text-mute">Oferta según demanda medida en estación</p>
```

Botón Actualizar: `Button variant="outline"` con el mismo `onClick={refetch}`.

Tabs: botones `rounded-[2px]` ; activo `bg-energy text-ink`; inactivo `text-mute hover:bg-white/10`. Labels: Vista general, Modelos de tren, Estaciones, Calculadora. Sin “Sistema Inteligente de Gestión y Despacho de Trenes”.

Resumen: tres cifras (modelos, estaciones configuradas, estaciones con `last_passenger_count !== null`) en cards `border-white/10 bg-canvas/40`.

Quitar import de `routing.css`.

- [ ] **Step 3: Cards**

`TrainModelCard`: contenedor `rounded-[2px] border border-white/10 p-4`; mostrar `name`, `id`, `wagon_count`, `capacity_per_wagon`, `total_capacity`. Sin iconos decorativos grandes.

`StationCard`: `name`, `line`, `id`, `camera_id`, `travel_time_seconds`, lista de `supported_trains` por nombre (no badge “3V” mágico).

`StationStatusCard`: pasajeros, trenes requeridos, modelo, timestamp. Estado “Con datos” / “Sin datos” (no “Activo” de hardware). Misma condición `last_passenger_count !== null`.

`DispatchPanel`: título “Calculadora de despacho”. Subtítulo “Elige el tren más pequeño que cubre N. Capacidades 5, 10 y 15. Regla ⌈N/C⌉.” Quitar “plan de despacho óptimo” y “simule”. Conservar form, `persist`, errores y result grid. Select/input: `bg-canvas border border-white/15 rounded-[2px]`.

- [ ] **Step 4: Build + manual**

```bash
cd tro-frontend && npm run build
```

Manual: cuatro tabs funcionan; dispatch POST sigue; grep `RoutingPage.tsx` y `DispatchPanel.tsx`: no “inteligente”, no “óptimo”.

- [ ] **Step 5: Commit** (solo si el usuario lo pidió)

```bash
git add tro-frontend/src/pages/RoutingPage.tsx tro-frontend/src/components/routing tro-frontend/src/components/common
git commit -m "Restyle dispatch as an operate view with honest copy."
```

---

### Task 10: Limpieza CSS e identidad

**Files:**
- Modify: `tro-frontend/src/utils/constants.ts` (borrar `MOCK_DETECTIONS`)
- Modify: `tro-frontend/src/App.css` (vaciar o borrar import)
- Delete if unused: `tro-frontend/src/components/layout/Navbar.tsx`
- Delete if unused: `tro-frontend/src/components/camera/CameraPanel.tsx`, `CameraCard.tsx`
- Delete if unused: `tro-frontend/src/styles/navbar.css`, `dashboard.css`, `cameras.css`, `monitoring.css`, `monitoring-layout.css`, `routing.css`
- Modify: cualquier archivo que aún importe esos CSS

**Interfaces:**
- Consumes: nada nuevo
- Produces: `npm run build` limpio; grep sin slop

- [ ] **Step 1: Borrar `MOCK_DETECTIONS`**

Dejar en `constants.ts` solo `API_BASE_URL` y `WS_BASE_URL`. Grep `REFRESH_INTERVAL` y `STATS_UPDATE_INTERVAL` en `tro-frontend/src`; si nadie los importa, bórralos en este paso. Si alguien los importa, déjalos.

- [ ] **Step 2: Quitar CSS e imports muertos**

Grep `navbar.css|dashboard.css|cameras.css|monitoring.css|monitoring-layout.css|routing.css|App.css` en `tro-frontend/src`. Eliminar imports. Borrar archivos huérfanos. Borrar `Navbar.tsx`, `CameraPanel.tsx`, `CameraCard.tsx` si ningún import queda.

Vaciar `App.css` o eliminarlo. `body` ya está en `index.css`.

- [ ] **Step 3: Grep de claims**

```bash
cd tro-frontend
rg -n "99\\.9|1920x1080|Detección Inteligente|Sistema Inteligente|Transport Route|Sistema de Vigilancia|\\bTRO\\b|Schibsted|MOCK_DETECTIONS" src
```

Expected: sin matches (salvo comentarios de esta limpieza si los hubiera: no dejes comentarios).

- [ ] **Step 4: Build final y pase manual de la spec**

```bash
cd tro-frontend && npm run build
```

Expected: exit 0.

Manual (spec):

1. Cuatro rutas en sidebar, activo correcto, grupos correctos.
2. Colapso desktop offcanvas, cookie `sidebar_state`, `Ctrl/B`.
3. Móvil: sheet, se cierra al navegar.
4. Pie: operativo/desconectado + versión + entorno. Sin avatar.
5. Inicio: cuatro cifras reales, CTA, sin features IA.
6. Monitoreo: rail, query `camera`, MJPEG, WS, estación, empty.
7. Cámaras: tabla real, Sin estación / No se pudo resolver, Ver en monitoreo.
8. Optimización: tabs y dispatch.
9. Cero FPS/uptime/99.9 %.
10. Stream y WS siguen vivos contra el backend local.

- [ ] **Step 5: Commit** (solo si el usuario lo pidió)

```bash
git add -u tro-frontend
git commit -m "Remove leftover surveillance CSS and invented camera stats."
```

---

## Self-review (spec coverage)

| Spec | Task |
| --- | --- |
| Sidebar inset + offcanvas + cookie + Ctrl/B + sheet móvil | 2, 5 |
| routeConfig + grupos + activo específico | 3, 5 |
| Pie sistema, no usuario | 5 |
| Tokens oscuros TORNS + Manrope + radio 2px | 1, 2 |
| VideosProvider, shell no bloquea | 4, 5 |
| Inicio corto | 6 |
| CameraRail 220px, query camera, EN VIVO MJPEG | 7 |
| Inventario columnas reales, sheet móvil, join estación | 8 |
| Optimización copy + tabs | 9 |
| Sin CRUD/auth/buscar/ajustes/E2E/backend | — fuera, no hay task |
| MOCK_DETECTIONS y CSS muerto | 10 |
| `npm run build` | cada task |
