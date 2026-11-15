# Guía: construir una barra lateral de aplicación

Documento de referencia para replicar, en cualquier proyecto, una barra lateral con el mismo enfoque visual y funcional de un portal web moderno basado en layout + navegación por rutas + permisos.

Stack de referencia típico: React, React Router, Tailwind CSS y un kit de UI tipo shadcn/ui (Sidebar). Los conceptos aplican a otros stacks con los mismos roles de componentes.

---

## 1. Objetivo del patrón

La barra lateral no es solo un menú estático. Es un **shell de navegación** que:

1. Expone solo las secciones a las que el usuario puede entrar.
2. Agrupa rutas por dominio funcional.
3. Marca la ruta activa de forma precisa (incluyendo rutas anidadas).
4. Se adapta a desktop (fija / colapsable) y mobile (drawer / sheet).
5. Integra acciones secundarias (buscar, ajustes) y el menú de identidad del usuario.
6. Convive con un header de contenido (`trigger`, breadcrumbs, acciones globales).

---

## 2. Anatomía visual

```
┌─────────────────────────────────────────────────────────────┐
│ SidebarProvider (contexto + variables CSS)                  │
│ ┌──────────────┐  ┌───────────────────────────────────────┐ │
│ │ Sidebar      │  │ SidebarInset (área principal)         │ │
│ │              │  │ ┌───────────────────────────────────┐ │ │
│ │ Header       │  │ │ SiteHeader                        │ │ │
│ │  · Logo      │  │ │  · Trigger  · Breadcrumb  · Acciones│ │ │
│ │              │  │ └───────────────────────────────────┘ │ │
│ │ Content      │  │ ┌───────────────────────────────────┐ │ │
│ │  · Grupo A   │  │ │ Página / children                 │ │ │
│ │  · Grupo B   │  │ │                                   │ │ │
│ │  · …         │  │ │                                   │ │ │
│ │  · Nav sec.  │  │ │                                   │ │ │
│ │              │  │ └───────────────────────────────────┘ │ │
│ │ Footer       │  │                                       │ │
│ │  · Usuario   │  │                                       │ │
│ └──────────────┘  └───────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Zonas de la sidebar

| Zona | Contenido | Rol visual |
|------|-----------|------------|
| **Header** | Logo / marca (enlace a home) | Identidad del producto |
| **Content** | Grupos de navegación + menú secundario al fondo | Navegación principal |
| **Footer** | Avatar, nombre, rol, menú de cuenta | Identidad del usuario |

### Variantes recomendadas

- **`variant="inset"`**: la sidebar “flota” ligeramente y el contenido principal tiene margen, bordes redondeados y sombra suave. Es el look más “app shell”.
- **`collapsible="offcanvas"`**: al colapsar, la sidebar sale completamente del viewport (no modo solo-iconos). En mobile se renderiza como **Sheet** a pantalla parcial.

### Tokens de diseño

Define variables dedicadas (light/dark) para no acoplar la sidebar al color genérico del fondo:

- `--sidebar`
- `--sidebar-foreground`
- `--sidebar-primary` / `--sidebar-primary-foreground`
- `--sidebar-accent` / `--sidebar-accent-foreground`
- `--sidebar-border`
- `--sidebar-ring`
- `--sidebar-width` (ej. `16rem` o `calc(var(--spacing) * 72)`)
- `--header-height`

### Estado activo (look & feel)

El ítem activo debe contrastar claramente con el resto:

- Fondo `primary` + texto `primary-foreground`
- Sombra suave (`shadow-sm`)
- Icono y tipografía con el mismo color de contraste
- Transición corta (`~200ms`) en hover y cambio de estado
- Ítems inactivos: texto `foreground`, hover con `sidebar-accent`

### Tipografía e iconografía

- Labels de grupo: texto pequeño (`text-xs`), peso medio, opacidad reducida (`foreground/70`)
- Ítems: `text-sm`, icono 16px a la izquierda, label truncable
- Un icono por ruta (obligatorio para que el ítem sea navegable en el menú)

---

## 3. Composición de componentes

Separar **primitivos de UI** (reutilizables) de **composición de producto** (específica de la app).

### Primitivos (kit de sidebar)

| Componente | Responsabilidad |
|------------|-----------------|
| `SidebarProvider` | Estado open/collapsed, mobile sheet, cookie, atajo de teclado, CSS vars |
| `Sidebar` | Contenedor visual (desktop fixed / mobile sheet) |
| `SidebarHeader` / `SidebarContent` / `SidebarFooter` | Regiones layout |
| `SidebarGroup` + `SidebarGroupLabel` + `SidebarGroupContent` | Agrupación semántica |
| `SidebarMenu` / `SidebarMenuItem` / `SidebarMenuButton` | Lista de ítems |
| `SidebarInset` | Contenedor del contenido principal |
| `SidebarTrigger` | Botón hamburguesa / panel |
| `useSidebar()` | Hook de contexto (`toggleSidebar`, `isMobile`, etc.) |

### Composición de producto

| Componente | Responsabilidad |
|------------|-----------------|
| `AppSidebar` | Orquesta logo, grupos de rutas, nav secundaria y footer |
| `NavSecondary` | Acciones auxiliares (ajustes, buscar…) ancladas al fondo del content |
| `NavUser` | Menú de usuario en el footer |
| `SiteHeader` | Trigger + breadcrumb + acciones globales del área principal |
| `PrivateLayout` (o equivalente) | Envuelve páginas autenticadas con Provider + Sidebar + Inset |

### Layout mínimo

```tsx
<SidebarProvider
  style={{
    "--sidebar-width": "calc(var(--spacing) * 72)",
    "--header-height": "calc(var(--spacing) * 12)",
  }}
>
  <AppSidebar variant="inset" />
  <SidebarInset>
    <SiteHeader />
    <div className="flex flex-1 flex-col">{children}</div>
  </SidebarInset>
</SidebarProvider>
```

---

## 4. Modelo de datos de navegación

La sidebar debe alimentarse de la **misma fuente de verdad que el router**, no de un menú duplicado a mano.

### Contrato de ruta (ejemplo)

```ts
interface RouteConfig {
  path: string;
  element: React.JSX.Element;
  title?: string;          // visible en el menú
  icon?: IconComponent;    // visible en el menú
  hidden?: boolean;        // existe en router pero no en menú
  policies?: Array<{       // permisos requeridos (OR)
    action: string;
    resource: string;
  }>;
  children?: RouteConfig[];
}
```

### Reglas para que una ruta aparezca en el menú

Una ruta es navegable en la sidebar si:

1. Tiene `title` e `icon`.
2. No está marcada como `hidden`.
3. No es una ruta especial excluida del menú principal (ej. `/settings` si vive en nav secundaria).
4. El usuario cumple al menos una de las `policies` requeridas (si la lista está vacía, es pública para usuarios autenticados).
5. Pasa cualquier feature flag de visibilidad de módulos (opcional).

---

## 5. Agrupación funcional

No listar todas las rutas en un único bloque. Definir **grupos ordenados** con un matcher por path:

```ts
const ROUTE_GROUP_DEFINITIONS = [
  {
    label: "Visión general",
    matcher: (route) => route.path === "/" || route.path.startsWith("/dashboard"),
  },
  {
    label: "Operaciones",
    matcher: (route) => route.path.startsWith("/operations"),
  },
  {
    label: "Administración",
    matcher: (route) => route.path.startsWith("/admin"),
  },
];
```

### Algoritmo

1. Filtrar rutas visibles (permisos + flags).
2. Asignar cada ruta al primer grupo cuyo `matcher` coincida.
3. Omitir grupos vacíos.
4. Empujar rutas sin grupo a un bloque final tipo `"Otros"`.

Así el orden de los grupos es estable y el orden de ítems dentro del grupo respeta el orden del `routeConfig`.

---

## 6. Detección de ruta activa

Evitar el error clásico de marcar como activo un padre cuando hay un hijo más específico visible.

### Reglas

1. Home (`/`): activo solo con coincidencia exacta.
2. Resto: activo si `pathname === path` **o** `pathname` empieza por `path + "/"`.
3. Si existe otra ruta visible más específica que también matchea el pathname actual, **no** marcar la ruta corta como activa.

```ts
const hasMoreSpecificRoute = visibleRoutes.some(
  (other) =>
    other.path !== route.path &&
    other.path.startsWith(route.path + "/") &&
    location.pathname.startsWith(other.path)
);

const isActive =
  location.pathname === route.path ||
  (location.pathname.startsWith(route.path + "/") &&
    route.path !== "/" &&
    !hasMoreSpecificRoute);
```

Aplicar las mismas clases de “activo” a la nav secundaria cuando corresponda.

---

## 7. Comportamiento funcional del shell

### Estado y persistencia

- Estado controlado o no controlado (`open` / `defaultOpen`).
- Persistir preferencia en cookie (ej. `sidebar_state`, 7 días).
- Exponer `state: "expanded" | "collapsed"` vía `data-state` para estilos.

### Responsive

| Viewport | Comportamiento |
|----------|----------------|
| Desktop (`md+`) | Sidebar fija; colapsa con offcanvas/icon según variante |
| Mobile | `Sheet` overlay; se cierra al cambiar de ruta |

### Atajos y controles

- `Ctrl/Cmd + B` → `toggleSidebar()`
- `SidebarTrigger` en el header
- Opcional: `SidebarRail` en el borde para toggle por hover/click

### Nav secundaria (`mt-auto`)

Al final del `SidebarContent`, no del footer:

- **Ajustes**: enlace condicionado a permiso de administración de la app.
- **Buscar**: puede abrir un diálogo/modal en lugar de navegar a una URL.

### Footer de usuario

- Trigger: avatar + nombre + email/rol + icono de menú.
- Dropdown (lado derecho en desktop, abajo en mobile):
  - Estado de sesión (opcional)
  - Cuenta
  - Notificaciones
  - Cerrar sesión

### Header del contenido

- `SidebarTrigger`
- Separador vertical
- Breadcrumbs derivados de la ruta
- Acciones globales (búsqueda rápida, campana de notificaciones con badge)

---

## 8. Checklist de implementación

### Visual

- [ ] Tokens `--sidebar-*` en tema claro y oscuro
- [ ] Header con logo centrado/alineado y enlace a home
- [ ] Grupos con labels discretos e ítems con icono + texto
- [ ] Estado activo con color primary y transición
- [ ] Nav secundaria pegada al fondo del content
- [ ] Footer con identidad de usuario
- [ ] Variante inset: contenido principal redondeado y con sombra
- [ ] Mobile: sheet a pantalla parcial, sin “X” duplicada si el kit ya la oculta

### Funcional

- [ ] Menú generado desde `routeConfig` (una sola fuente de verdad)
- [ ] Filtro por permisos (policies) y feature flags
- [ ] Agrupación por matchers ordenados
- [ ] Active state con preferencia por ruta más específica
- [ ] Provider con cookie + atajo de teclado
- [ ] Cierre automático en mobile al navegar
- [ ] Layout autenticado: Provider → Sidebar → Inset → Header + página
- [ ] Acciones secundarias y menú de usuario desacoplados en componentes propios

### Accesibilidad

- [ ] Títulos/descripciones `sr-only` en el sheet mobile
- [ ] `SidebarTrigger` con texto oculto (“Toggle Sidebar”)
- [ ] Focus ring visible (`sidebar-ring`)
- [ ] Menús con teclado (dropdown / sheet del kit de UI)

---

## 9. Estructura de archivos sugerida

```
components/
  layout/
    PrivateLayout.tsx
  ui/
    sidebar.tsx                 # primitivos del kit
    app-sidebar/
      app-sidebar.tsx           # composición principal
      nav-secondary.tsx
      nav-user.tsx
      site-header.tsx
      user-identity-display.tsx
routes/
  index.ts                      # routeConfig
lib/
  get-navigable-routes.ts       # filtro por permisos / flags
```

---

## 10. Anti-patrones a evitar

1. **Duplicar el menú** en un array aparte del router: se desincroniza títulos, iconos y permisos.
2. **Marcar activo solo con `startsWith`** sin resolver rutas más específicas.
3. **Meter ajustes/buscar en el footer**: el footer es para identidad; las acciones de app van en nav secundaria.
4. **Hardcodear ítems sin policies**: cualquier usuario vería módulos que luego el router le bloquea.
5. **Olvidar el mobile sheet**: un `div` fixed en mobile rompe el patrón offcanvas.
6. **Acoplar copy o nombres de dominio del negocio** dentro de los primitivos de UI: los labels de grupo viven en la composición de producto, no en el kit.

---

## 11. Resumen ejecutivo

Para obtener el mismo resultado visual y funcional:

1. Usa un **Provider + Sidebar + Inset + Header**.
2. Compón **Header (marca) → Content (grupos + secundaria) → Footer (usuario)**.
3. Genera el menú desde **rutas + permisos + grupos**.
4. Resuelve el **activo** con prioridad a la ruta más específica.
5. En mobile, **sheet + cierre al navegar**; en desktop, **offcanvas + cookie + atajo**.

Con eso la barra lateral queda portable a cualquier proyecto: solo cambian el `routeConfig`, los matchers de grupo, el logo y las policies.
`)