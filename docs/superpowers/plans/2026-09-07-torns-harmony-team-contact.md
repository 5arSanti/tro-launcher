# TORNS Harmony: Team, Spacing, Contact, Script Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Quiénes somos (LIRN + three names) early on `/torns`, fix title/section spacing, ship a working contact form to Google Sheets via Apps Script, and deliver a ~6–8 min spoken presentation script.

**Architecture:** Harmony pass on the existing chapter film. New `TeamSection` and `ContactForm` (+ tiny `submitContact` helper). `ChapterRail` and page order gain `#empresa` and `#contacto`. Spacing uses `--torns-block-gap`. Ops docs live under `docs/`; site code commits in the `lirn-web-main` submodule.

**Tech Stack:** React 19, Vite 7, React Router 7, TypeScript, CSS variables, Vitest + Testing Library, Motion (existing). No new npm dependencies. Contact backend is external Google Apps Script.

## Global Constraints

- Spec authority: `docs/superpowers/specs/2026-09-07-torns-harmony-team-contact-design.md`.
- Language: Spanish. Mission and vision strings stay exact and stay **off** `/torns`.
- Team: names only — Johel Santiago Arias, Rebeca Pedrozo, Hanna Cerinza. No roles, bios, photos, years.
- Form fields: `nombre*`, `email*`, `organizacion` optional, `mensaje*`. Submit label **Enviar**.
- Endpoint: `VITE_CONTACT_ENDPOINT` only. Never hardcode the Apps Script URL. Never fake success if unset.
- POST JSON as `Content-Type: text/plain;charset=utf-8` with `origen: "torns"`.
- Live contact target: `/torns#contacto`. Home `#contacto` stays reserved (no working form).
- Evidence truth unchanged: no signed pilot, no invented clients/metrics; keep case-not-pilot + n=20 label.
- `prefers-reduced-motion` respected on form feedback and existing Reveals.
- `lirn-web-main` is a submodule — commit site work there; update parent pointer on the last site task.
- Vite base / router basename: `/lirn-web-main/`.
- Do not change `tro-frontend`. Do not relax token asserts.

## File map

| File | Responsibility |
| --- | --- |
| `lirn-web-main/src/content/copy.ts` | Team names, chapter labels, contact form strings |
| `lirn-web-main/src/content/copy.test.ts` | Lock new copy keys |
| `lirn-web-main/src/styles/tokens.css` | `--torns-block-gap` |
| `lirn-web-main/src/styles/site.css` | Stage→title gaps; team + contact layout |
| `lirn-web-main/src/components/TeamSection.tsx` | Quiénes somos band |
| `lirn-web-main/src/components/TeamSection.test.tsx` | Names + no mission |
| `lirn-web-main/src/lib/submitContact.ts` | POST helper |
| `lirn-web-main/src/lib/submitContact.test.ts` | Endpoint / payload / errors |
| `lirn-web-main/src/components/ContactForm.tsx` | Form UI + states |
| `lirn-web-main/src/components/ContactForm.test.tsx` | Validation + success/error |
| `lirn-web-main/src/components/ChapterRail.tsx` | Empresa + Contacto anchors |
| `lirn-web-main/src/components/ChapterRail.test.tsx` | New links |
| `lirn-web-main/src/pages/TornsPage.tsx` | Order: hero → team → … → close → contact |
| `lirn-web-main/src/pages/TornsPage.test.tsx` | Order + names + contact heading |
| `lirn-web-main/src/components/SiteNav.tsx` | Contact → `/torns#contacto` |
| `lirn-web-main/src/components/SiteFooter.tsx` | Hablemos → `/torns#contacto` |
| `lirn-web-main/src/components/SiteNav.test.tsx` | Updated hrefs |
| `lirn-web-main/src/App.test.tsx` | Hash scroll still works for live contact |
| `lirn-web-main/.env.example` | `VITE_CONTACT_ENDPOINT=` |
| `docs/contact-apps-script.md` | Apps Script source + setup |
| `docs/presentations/torns-landing-guion.md` | Spoken script |
| `PRODUCT.md` / `DESIGN.md` | Channel live on TORNS; team names authorized |

---

### Task 1: Copy keys for team, chapters, and contact form

**Files:**
- Modify: `lirn-web-main/src/content/copy.ts`
- Modify: `lirn-web-main/src/content/copy.test.ts`

**Interfaces:**
- Consumes: existing `copy` object
- Produces: `copy.chapterEmpresa`, `copy.chapterContact`, `copy.teamMembers` (readonly tuple of 3 strings), `copy.contactFormTitle`, `copy.contactFormBody`, `copy.contactNameLabel`, `copy.contactEmailLabel`, `copy.contactOrgLabel`, `copy.contactMessageLabel`, `copy.contactSubmit`, `copy.contactSending`, `copy.contactSuccess`, `copy.contactError`, `copy.contactMissingEndpoint`, `copy.contactRequired`, `copy.contactInvalidEmail`

- [ ] **Step 1: Write the failing copy test**

Add to `lirn-web-main/src/content/copy.test.ts`:

```ts
  it("names TORNS team, empresa chapter, and live contact form chrome", () => {
    expect(copy.chapterEmpresa).toBe("Empresa");
    expect(copy.chapterContact).toBe("Contacto");
    expect(copy.teamMembers).toEqual([
      "Johel Santiago Arias",
      "Rebeca Pedrozo",
      "Hanna Cerinza",
    ]);
    expect(copy.contactFormTitle).toBe("Contacto");
    expect(copy.contactFormBody).toMatch(/sistema masivo/i);
    expect(copy.contactNameLabel).toBe("Nombre");
    expect(copy.contactEmailLabel).toBe("Email");
    expect(copy.contactOrgLabel).toBe("Organización");
    expect(copy.contactMessageLabel).toBe("Mensaje");
    expect(copy.contactSubmit).toBe("Enviar");
    expect(copy.contactSending).toBe("Enviando…");
    expect(copy.contactSuccess).toMatch(/recibimos/i);
    expect(copy.contactError).toMatch(/reintentar/i);
    expect(copy.contactMissingEndpoint).toMatch(/no configurado/i);
    expect(copy.contactRequired).toMatch(/obligatorio/i);
    expect(copy.contactInvalidEmail).toMatch(/email/i);
  });
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd lirn-web-main && npm test -- src/content/copy.test.ts`

Expected: FAIL — missing keys on `copy`.

- [ ] **Step 3: Add the keys**

In `lirn-web-main/src/content/copy.ts`, before `notFound`, append (do not change mission/vision/case evidence strings):

```ts
  chapterEmpresa: "Empresa",
  chapterContact: "Contacto",
  teamMembers: [
    "Johel Santiago Arias",
    "Rebeca Pedrozo",
    "Hanna Cerinza",
  ] as const,
  contactFormTitle: "Contacto",
  contactFormBody:
    "Cuéntenos el sistema masivo y el rol de control. Le respondemos por este canal.",
  contactNameLabel: "Nombre",
  contactEmailLabel: "Email",
  contactOrgLabel: "Organización",
  contactMessageLabel: "Mensaje",
  contactSubmit: "Enviar",
  contactSending: "Enviando…",
  contactSuccess: "Recibimos su mensaje. Gracias.",
  contactError: "No pudimos enviar. Intente de nuevo.",
  contactMissingEndpoint: "Canal de envío no configurado.",
  contactRequired: "Campo obligatorio.",
  contactInvalidEmail: "Email no válido.",
```

Keep existing Home `contactTitle` / `contactBody` / `contactNote` for the reserved Home band.

- [ ] **Step 4: Run test to verify it passes**

Run: `cd lirn-web-main && npm test -- src/content/copy.test.ts`

Expected: PASS

- [ ] **Step 5: Commit in submodule**

```bash
cd lirn-web-main
git add src/content/copy.ts src/content/copy.test.ts
git commit -m "$(cat <<'EOF'
Add TORNS team and live contact form copy keys.

EOF
)"
```

---

### Task 2: Spacing rhythm token and sistema title gaps

**Files:**
- Modify: `lirn-web-main/src/styles/tokens.css`
- Modify: `lirn-web-main/src/styles/site.css`

**Interfaces:**
- Consumes: existing TORNS layout classes
- Produces: `--torns-block-gap`; CSS rules that separate ActStage from “Cómo funciona” and peer titles

- [ ] **Step 1: Add the token**

In `lirn-web-main/src/styles/tokens.css` `:root`, add:

```css
  --torns-block-gap: clamp(2.5rem, 6vw, 4.5rem);
```

- [ ] **Step 2: Add gap rules in site.css**

Near the existing `.torns-system > .display + .torns-act-stage` rules, add:

```css
.torns-system > .torns-act-stage + .display,
.torns-system > .torns-pipeline + .display,
.torns-system > .torns-pipeline + .system-grid,
.torns-system > .system-grid {
  margin-top: var(--torns-block-gap);
}

.page-torns .display:not(:first-child) {
  margin-top: var(--torns-block-gap);
}

/* First display inside a Reveal-wrapped section should not double-stack */
.page-torns section > .display:first-child,
.page-torns .torns-section-head .display {
  margin-top: 0;
}
```

If `.system-grid` already has margin, keep one clear `margin-top: var(--torns-block-gap)` and remove conflicting smaller values only where they fight this rhythm.

Also ensure `.torns-team` / `.torns-contact` (added in later tasks) inherit band `padding-block` consistent with other TORNS sections (`clamp(4.5rem, 11vw, 8.5rem)`).

- [ ] **Step 3: Visual smoke (dev server)**

Run: `cd lirn-web-main && npm run dev`  
Open `/lirn-web-main/torns`, scroll to Sistema: “Cómo funciona” must sit clearly below ActStage controls (not glued).

- [ ] **Step 4: Commit in submodule**

```bash
cd lirn-web-main
git add src/styles/tokens.css src/styles/site.css
git commit -m "$(cat <<'EOF'
Add TORNS block gap so system titles breathe.

EOF
)"
```

---

### Task 3: TeamSection

**Files:**
- Create: `lirn-web-main/src/components/TeamSection.tsx`
- Create: `lirn-web-main/src/components/TeamSection.test.tsx`
- Modify: `lirn-web-main/src/styles/site.css`

**Interfaces:**
- Consumes: `copy.companyTitle`, `copy.companyBody`, `copy.teamMembers`
- Produces: `<TeamSection />` rendering `<section id="empresa" className="band torns-team torns-on-white">`

- [ ] **Step 1: Write the failing test**

Create `lirn-web-main/src/components/TeamSection.test.tsx`:

```ts
import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { copy } from "../content/copy";
import { TeamSection } from "./TeamSection";

it("presents LIRN briefly and lists the three teammates by name only", () => {
  render(<TeamSection />);
  expect(screen.getByRole("heading", { level: 2, name: copy.companyTitle })).toBeInTheDocument();
  expect(screen.getByText(copy.companyBody)).toBeInTheDocument();
  for (const name of copy.teamMembers) {
    expect(screen.getByText(name)).toBeInTheDocument();
  }
  expect(screen.queryByText(copy.mission)).not.toBeInTheDocument();
  expect(screen.queryByText(copy.vision)).not.toBeInTheDocument();
  expect(document.getElementById("empresa")).not.toBeNull();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd lirn-web-main && npm test -- src/components/TeamSection.test.tsx`

Expected: FAIL — module not found.

- [ ] **Step 3: Implement TeamSection**

Create `lirn-web-main/src/components/TeamSection.tsx`:

```tsx
import { copy } from "../content/copy";
import { Reveal } from "./Reveal";

export function TeamSection() {
  return (
    <section
      id="empresa"
      className="band torns-team torns-on-white"
      aria-labelledby="team-title"
    >
      <Reveal className="torns-section-head">
        <div>
          <h2 id="team-title" className="display">
            {copy.companyTitle}
          </h2>
          <p className="lede">{copy.companyBody}</p>
        </div>
      </Reveal>
      <Reveal delay={0.06}>
        <ul className="torns-team-list">
          {copy.teamMembers.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
```

Add CSS (no card chrome):

```css
.torns-team {
  padding-block: clamp(4.5rem, 11vw, 8.5rem);
}

.torns-team-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(1rem, 3vw, 2rem);
  margin: var(--torns-block-gap) 0 0;
  padding: 0;
  list-style: none;
}

.torns-team-list li {
  font-size: clamp(1.1rem, 2vw, 1.45rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  padding-top: 1rem;
  border-top: 1px solid color-mix(in srgb, var(--activity-ink) 28%, transparent);
  color: var(--black);
}

@media (max-width: 52rem) {
  .torns-team-list {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd lirn-web-main && npm test -- src/components/TeamSection.test.tsx`

Expected: PASS

- [ ] **Step 5: Commit in submodule**

```bash
cd lirn-web-main
git add src/components/TeamSection.tsx src/components/TeamSection.test.tsx src/styles/site.css
git commit -m "$(cat <<'EOF'
Add TORNS Quiénes somos section with team names.

EOF
)"
```

---

### Task 4: submitContact helper + ContactForm

**Files:**
- Create: `lirn-web-main/src/lib/submitContact.ts`
- Create: `lirn-web-main/src/lib/submitContact.test.ts`
- Create: `lirn-web-main/src/components/ContactForm.tsx`
- Create: `lirn-web-main/src/components/ContactForm.test.tsx`
- Create: `lirn-web-main/.env.example`
- Modify: `lirn-web-main/src/styles/site.css`

**Interfaces:**
- Consumes: `copy.*` contact strings; `import.meta.env.VITE_CONTACT_ENDPOINT`
- Produces:
  - `export type ContactPayload = { nombre: string; email: string; organizacion: string; mensaje: string; origen: "torns" }`
  - `export type SubmitContactResult = { ok: true } | { ok: false; error: "missing_endpoint" | "network" | "server" }`
  - `export async function submitContact(payload: ContactPayload): Promise<SubmitContactResult>`
  - `<ContactForm />` section `id="contacto"` with form

- [ ] **Step 1: Write failing submitContact tests**

Create `lirn-web-main/src/lib/submitContact.test.ts`:

```ts
import { afterEach, describe, expect, it, vi } from "vitest";
import { submitContact } from "./submitContact";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("submitContact", () => {
  it("fails closed when the endpoint env is missing", async () => {
    vi.stubEnv("VITE_CONTACT_ENDPOINT", "");
    const result = await submitContact({
      nombre: "Ana",
      email: "ana@example.com",
      organizacion: "",
      mensaje: "Hola",
      origen: "torns",
    });
    expect(result).toEqual({ ok: false, error: "missing_endpoint" });
  });

  it("posts text/plain JSON to the endpoint", async () => {
    vi.stubEnv("VITE_CONTACT_ENDPOINT", "https://example.test/exec");
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const payload = {
      nombre: "Ana",
      email: "ana@example.com",
      organizacion: "LIRN",
      mensaje: "Hola",
      origen: "torns" as const,
    };
    const result = await submitContact(payload);
    expect(result).toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://example.test/exec",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      }),
    );
  });
});
```

- [ ] **Step 2: Run to verify fail**

Run: `cd lirn-web-main && npm test -- src/lib/submitContact.test.ts`

Expected: FAIL — module not found.

- [ ] **Step 3: Implement submitContact**

Create `lirn-web-main/src/lib/submitContact.ts`:

```ts
export type ContactPayload = {
  nombre: string;
  email: string;
  organizacion: string;
  mensaje: string;
  origen: "torns";
};

export type SubmitContactResult =
  | { ok: true }
  | { ok: false; error: "missing_endpoint" | "network" | "server" };

export async function submitContact(
  payload: ContactPayload,
): Promise<SubmitContactResult> {
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT?.trim();
  if (!endpoint) {
    return { ok: false, error: "missing_endpoint" };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      redirect: "follow",
    });
    if (!response.ok) {
      return { ok: false, error: "server" };
    }
    const data = (await response.json().catch(() => null)) as
      | { ok?: boolean }
      | null;
    if (!data || data.ok !== true) {
      return { ok: false, error: "server" };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "network" };
  }
}
```

Note: Apps Script often returns an HTML redirect body; if `response.json()` fails in production, adjust to treat HTTP 200 after `redirect: "follow"` as success when JSON parse fails **only if** brainstorm follow-up confirms — for this plan, prefer JSON `{ ok: true }` from the script. If real Apps Script returns empty/HTML, change helper to: `if (response.ok) return { ok: true }` after follow redirects, and update the test accordingly in the same task.

**Preferred production-tolerant variant** (use this if JSON is unreliable with Apps Script):

```ts
    if (!response.ok) {
      return { ok: false, error: "server" };
    }
    return { ok: true };
```

Update the mock test to not require `.json()` if you choose this variant. Document the choice in the commit message.

- [ ] **Step 4: Pass submitContact tests**

Run: `cd lirn-web-main && npm test -- src/lib/submitContact.test.ts`

Expected: PASS

- [ ] **Step 5: Write failing ContactForm tests**

Create `lirn-web-main/src/components/ContactForm.test.tsx`:

```ts
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, it, vi } from "vitest";
import { copy } from "../content/copy";
import { ContactForm } from "./ContactForm";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

it("blocks submit when required fields are empty", async () => {
  const user = userEvent.setup();
  render(<ContactForm />);
  await user.click(screen.getByRole("button", { name: copy.contactSubmit }));
  expect(screen.getAllByText(copy.contactRequired).length).toBeGreaterThan(0);
});

it("shows missing-endpoint error when env is empty", async () => {
  vi.stubEnv("VITE_CONTACT_ENDPOINT", "");
  const user = userEvent.setup();
  render(<ContactForm />);
  await user.type(screen.getByLabelText(copy.contactNameLabel), "Ana");
  await user.type(screen.getByLabelText(copy.contactEmailLabel), "ana@example.com");
  await user.type(screen.getByLabelText(copy.contactMessageLabel), "Hola");
  await user.click(screen.getByRole("button", { name: copy.contactSubmit }));
  expect(await screen.findByText(copy.contactMissingEndpoint)).toBeInTheDocument();
});

it("shows success when submitContact resolves ok", async () => {
  vi.stubEnv("VITE_CONTACT_ENDPOINT", "https://example.test/exec");
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: true }) }),
  );
  const user = userEvent.setup();
  render(<ContactForm />);
  await user.type(screen.getByLabelText(copy.contactNameLabel), "Ana");
  await user.type(screen.getByLabelText(copy.contactEmailLabel), "ana@example.com");
  await user.type(screen.getByLabelText(copy.contactMessageLabel), "Hola");
  await user.click(screen.getByRole("button", { name: copy.contactSubmit }));
  expect(await screen.findByText(copy.contactSuccess)).toBeInTheDocument();
});
```

- [ ] **Step 6: Run ContactForm test to verify fail**

Run: `cd lirn-web-main && npm test -- src/components/ContactForm.test.tsx`

Expected: FAIL — module not found.

- [ ] **Step 7: Implement ContactForm + styles + .env.example**

`ContactForm.tsx`:

```tsx
import { FormEvent, useState } from "react";
import { copy } from "../content/copy";
import { submitContact } from "../lib/submitContact";
import { Reveal } from "./Reveal";

type FieldErrors = Partial<Record<"nombre" | "email" | "mensaje", string>>;

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function ContactForm() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [organizacion, setOrganizacion] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [statusMessage, setStatusMessage] = useState("");

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const next: FieldErrors = {};
    if (!nombre.trim()) next.nombre = copy.contactRequired;
    if (!email.trim()) next.email = copy.contactRequired;
    else if (!isEmail(email.trim())) next.email = copy.contactInvalidEmail;
    if (!mensaje.trim()) next.mensaje = copy.contactRequired;
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus("sending");
    setStatusMessage("");
    const result = await submitContact({
      nombre: nombre.trim(),
      email: email.trim(),
      organizacion: organizacion.trim(),
      mensaje: mensaje.trim(),
      origen: "torns",
    });
    if (result.ok) {
      setStatus("success");
      setStatusMessage(copy.contactSuccess);
      setNombre("");
      setEmail("");
      setOrganizacion("");
      setMensaje("");
      return;
    }
    setStatus("error");
    setStatusMessage(
      result.error === "missing_endpoint"
        ? copy.contactMissingEndpoint
        : copy.contactError,
    );
  }

  return (
    <section
      id="contacto"
      className="band torns-contact torns-band-blue"
      aria-labelledby="contact-form-title"
    >
      <Reveal className="torns-section-head">
        <div>
          <h2 id="contact-form-title" className="display">
            {copy.contactFormTitle}
          </h2>
          <p className="lede">{copy.contactFormBody}</p>
        </div>
      </Reveal>
      <Reveal delay={0.06}>
        <form className="torns-contact-form" onSubmit={onSubmit} noValidate>
          <label>
            <span>{copy.contactNameLabel}</span>
            <input
              name="nombre"
              autoComplete="name"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            {errors.nombre ? <em>{errors.nombre}</em> : null}
          </label>
          <label>
            <span>{copy.contactEmailLabel}</span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email ? <em>{errors.email}</em> : null}
          </label>
          <label>
            <span>{copy.contactOrgLabel}</span>
            <input
              name="organizacion"
              autoComplete="organization"
              value={organizacion}
              onChange={(e) => setOrganizacion(e.target.value)}
            />
          </label>
          <label className="torns-contact-message">
            <span>{copy.contactMessageLabel}</span>
            <textarea
              name="mensaje"
              rows={5}
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
            />
            {errors.mensaje ? <em>{errors.mensaje}</em> : null}
          </label>
          <button
            type="submit"
            className="btn-primary"
            disabled={status === "sending"}
          >
            {status === "sending" ? copy.contactSending : copy.contactSubmit}
          </button>
          {statusMessage ? (
            <p
              className={
                status === "success" ? "torns-contact-ok" : "torns-contact-fail"
              }
              role="status"
            >
              {statusMessage}
            </p>
          ) : null}
        </form>
      </Reveal>
    </section>
  );
}
```

Add `.torns-contact` / `.torns-contact-form` styles: grid labels, readable inputs on blue band (white fields), max-width ~40rem, gap using `--torns-block-gap`.

Create `lirn-web-main/.env.example`:

```
VITE_CONTACT_ENDPOINT=
```

- [ ] **Step 8: Pass ContactForm tests**

Run: `cd lirn-web-main && npm test -- src/components/ContactForm.test.tsx src/lib/submitContact.test.ts`

Expected: PASS

- [ ] **Step 9: Commit in submodule**

```bash
cd lirn-web-main
git add src/lib/submitContact.ts src/lib/submitContact.test.ts \
  src/components/ContactForm.tsx src/components/ContactForm.test.tsx \
  src/styles/site.css .env.example
git commit -m "$(cat <<'EOF'
Add TORNS contact form posting to Apps Script endpoint.

EOF
)"
```

---

### Task 5: Wire ChapterRail + TornsPage order

**Files:**
- Modify: `lirn-web-main/src/components/ChapterRail.tsx`
- Modify: `lirn-web-main/src/components/ChapterRail.test.tsx`
- Modify: `lirn-web-main/src/pages/TornsPage.tsx`
- Modify: `lirn-web-main/src/pages/TornsPage.test.tsx`

**Interfaces:**
- Consumes: `TeamSection`, `ContactForm`, `copy.chapterEmpresa`, `copy.chapterContact`
- Produces: DOM order `producto` < `empresa` < `sistema` < … < `cierre` < `contacto`

- [ ] **Step 1: Update ChapterRail test (fail first)**

Replace assertions in `ChapterRail.test.tsx` so order/links include Empresa and Contacto:

```ts
it("links TORNS chapters including empresa and contact", () => {
  render(<ChapterRail />);
  const links = screen.getAllByRole("link");
  expect(links.map((l) => l.getAttribute("href"))).toEqual([
    "#producto",
    "#empresa",
    "#sistema",
    "#problema",
    "#caso",
    "#cierre",
    "#contacto",
  ]);
  expect(screen.getByRole("link", { name: copy.chapterEmpresa })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: copy.chapterContact })).toBeInTheDocument();
});
```

- [ ] **Step 2: Run — expect fail**

Run: `cd lirn-web-main && npm test -- src/components/ChapterRail.test.tsx`

Expected: FAIL — missing links.

- [ ] **Step 3: Update ChapterRail**

```ts
const CHAPTERS = [
  { id: "producto", label: copy.chapterProduct },
  { id: "empresa", label: copy.chapterEmpresa },
  { id: "sistema", label: copy.chapterSystem },
  { id: "problema", label: copy.problemTitle },
  { id: "caso", label: copy.chapterCase },
  { id: "cierre", label: copy.chapterClose },
  { id: "contacto", label: copy.chapterContact },
] as const;
```

- [ ] **Step 4: Update TornsPage test expectations**

In `TornsPage.test.tsx`, extend order checks:

```ts
  expect(html.indexOf('id="producto"')).toBeLessThan(html.indexOf('id="empresa"'));
  expect(html.indexOf('id="empresa"')).toBeLessThan(html.indexOf('id="sistema"'));
  // ... existing sistema < problema < caso ...
  expect(html.indexOf('id="cierre"')).toBeLessThan(html.indexOf('id="contacto"'));
  expect(screen.getByText(copy.companyBody)).toBeInTheDocument();
  for (const name of copy.teamMembers) {
    expect(screen.getByText(name)).toBeInTheDocument();
  }
  expect(screen.getByRole("heading", { name: copy.contactFormTitle })).toBeInTheDocument();
```

Keep `queryByText(copy.mission)` absent and no Hablemos **link** on page body if that assertion remains — nav/footer are outside `TornsPage`, so the existing `queryByRole("link", { name: copy.ctaTalk })` on `TornsPage` alone should still pass.

- [ ] **Step 5: Wire TornsPage**

Import `TeamSection` and `ContactForm`. After the hero (before the Sistema `Reveal`), render `<TeamSection />`. After the Cierre `Reveal`, render `<ContactForm />`.

Add `scroll-margin-top` for `#empresa` and `#contacto` beside existing hash targets in `site.css`.

- [ ] **Step 6: Run page + rail tests**

Run: `cd lirn-web-main && npm test -- src/components/ChapterRail.test.tsx src/pages/TornsPage.test.tsx`

Expected: PASS

- [ ] **Step 7: Commit in submodule**

```bash
cd lirn-web-main
git add src/components/ChapterRail.tsx src/components/ChapterRail.test.tsx \
  src/pages/TornsPage.tsx src/pages/TornsPage.test.tsx src/styles/site.css
git commit -m "$(cat <<'EOF'
Wire team and contact into TORNS page order and rail.

EOF
)"
```

---

### Task 6: Nav and footer point to live contact

**Files:**
- Modify: `lirn-web-main/src/components/SiteNav.tsx`
- Modify: `lirn-web-main/src/components/SiteFooter.tsx`
- Modify: `lirn-web-main/src/components/SiteNav.test.tsx`
- Modify: `lirn-web-main/src/App.test.tsx` (only if hash path expectations break)

**Interfaces:**
- Consumes: React Router `Link`
- Produces: Contacto + Hablemos → `/torns#contacto`; footer on TORNS → `/torns#contacto`

- [ ] **Step 1: Update SiteNav test**

In `SiteNav.test.tsx`, change expected contact hrefs from `/#contacto` to `/torns#contacto` for `navContacto` and `ctaTalk`.

- [ ] **Step 2: Run — expect fail**

Run: `cd lirn-web-main && npm test -- src/components/SiteNav.test.tsx`

Expected: FAIL — href mismatch.

- [ ] **Step 3: Implement nav/footer**

`SiteNav.tsx`:

```tsx
        <Link to="/torns#contacto">{copy.navContacto}</Link>
        <Link className="site-nav-cta" to="/torns#contacto">
          {copy.ctaTalk}
        </Link>
```

`SiteFooter.tsx`:

```tsx
      <Link to={torns ? "/torns#contacto" : "/torns"}>
        {torns ? copy.ctaTalk : copy.verTorns}
      </Link>
```

Home hero may keep `href="#contacto"` for the reserved Home band.

- [ ] **Step 4: Fix App hash test if needed**

`App.test.tsx` “navigating to contact from TORNS” should still call `scrollIntoView` once `#contacto` exists on TORNS. If the test loaded `/#contacto` on Home for the first case, leave it — Home reserved section still has `id="contacto"`.

Optionally add a third case: load `/lirn-web-main/torns#contacto` and expect scroll — recommended.

- [ ] **Step 5: Run nav + app tests**

Run: `cd lirn-web-main && npm test -- src/components/SiteNav.test.tsx src/App.test.tsx`

Expected: PASS

- [ ] **Step 6: Commit in submodule**

```bash
cd lirn-web-main
git add src/components/SiteNav.tsx src/components/SiteFooter.tsx \
  src/components/SiteNav.test.tsx src/App.test.tsx
git commit -m "$(cat <<'EOF'
Point Hablemos and Contacto to TORNS live form.

EOF
)"
```

---

### Task 7: Apps Script ops doc + presentation script

**Files:**
- Create: `docs/contact-apps-script.md` (parent repo)
- Create: `docs/presentations/torns-landing-guion.md` (parent repo)

**Interfaces:**
- Consumes: brainstorm Apps Script contract (Sheet `Contactos`, JSON fields)
- Produces: operator-ready script + ~6–8 min spoken guion

- [ ] **Step 1: Write `docs/contact-apps-script.md`**

Include the full Apps Script from the brainstorm (Sheet headers, `doPost`, deploy as Web App, curl test with `text/plain`, map URL to `VITE_CONTACT_ENDPOINT`). Match the production-tolerant success rule chosen in Task 4.

- [ ] **Step 2: Write `docs/presentations/torns-landing-guion.md`**

Create the file with this full spoken text (adjust lightly for voice, do not invent evidence):

```markdown
# Guion de presentación — Landing TORNS

Duración orientativa: 6–8 minutos. Tono conversacional. Producto primero.

---

Buenas. Esta es la landing de **TORNS**, el producto de LIRN para el centro de control.

La idea de fondo es simple: la demanda en estación ocurre ahora, no solo en el horario. TORNS mide esa demanda y propone oferta — frecuencia, capacidad, asignación — a quien opera. En el hero lo ven de golpe: nombre del producto, **by LIRN**, una foto de estación a sangre, y una entrada al sistema. No es un catálogo; es una película corta por capítulos.

Diseño, en una frase: tipografía Manrope, azules cívicos de TORNS sobre aire blanco, y un corte geométrico que recorta la foto. El negro de LIRN queda en la firma; aquí manda el producto.

---

Justo después del hero está **Quiénes somos**. No repetimos la home entera. Decimos quién fabrica TORNS: LIRN es una firma de movilidad; un producto; sistemas masivos con estaciones. Y nombramos al equipo: **Johel Santiago Arias**, **Rebeca Pedrozo** y **Hanna Cerinza**. Solo nombres — sin cargos ni biografías — porque en esta página el foco sigue siendo el sistema.

---

En **Sistema** contamos el arco *de la estación al despacho*. Cuatro actos — espera, ve, mide, actúa — con foto y texto, uno a la vez. Después, **Cómo funciona**: el pipeline hasta la recomendación. Luego el prototipo: cámaras, detección YOLOv11, métricas por WebSocket, recomendación de despacho.

Aquí el UX importa: no apilamos diez mensajes. El visitante avanza con Anterior y Siguiente. El aire entre títulos — por ejemplo entre el relato y “Cómo funciona” — evita que la página se sienta como un documento corrido.

---

**El problema** abre el caso Transmilenio con el párrafo real de congestión y desajuste oferta–demanda. El **caso** lo enmarca con claridad: es caso de estudio y prototipo aplicado. **No es un piloto firmado con el operador.** Esa frase no es letra chica; es honestidad de producto.

---

**Descubrimiento** trae la entrevista al controlador SITP — rol, no nombre personal — y **Validación** la encuesta del 17 de agosto de 2026, n=20, con la leyenda: investigación del equipo, no resultado de un operador. Cada pregunta de la encuesta es un momento: copy a un lado, gráfico al otro, y el gráfico cambia con la pregunta. Eso es deliberado: una pregunta importa más que una tabla.

---

Cerramos con la frase de alcance — cualquier sistema masivo con estaciones — y el puente a LIRN. Después, **Contacto**: nombre, email, organización opcional y mensaje. Ese formulario es el canal vivo; llega a nuestra hoja de seguimiento.

---

Si miran la página completa, la disposición cuenta una historia: producto, firma breve, sistema, problema, evidencia, cierre, conversación. El color alterna bandas para respirar. La forma geométrica da carácter sin adorno vacío. El motion explica cambio de estado — slide, revelado al scroll, barra que crece — y se apaga si la persona pide menos movimiento.

Eso es TORNS en esta landing: demanda real en estación, recomendación al control, presentada con evidencia que tenemos y sin inventar lo que no tenemos.
```

- [ ] **Step 3: Commit in parent repo**

```bash
cd /home/personal/Projects/tro-launcher
git add docs/contact-apps-script.md docs/presentations/torns-landing-guion.md
git commit -m "$(cat <<'EOF'
Add TORNS contact Apps Script guide and presentation script.

EOF
)"
```

---

### Task 8: PRODUCT/DESIGN truth + full test + submodule pointer

**Files:**
- Modify: `PRODUCT.md`
- Modify: `DESIGN.md`
- Submodule pointer: `lirn-web-main`

**Interfaces:**
- Consumes: shipped site commits from Tasks 1–6
- Produces: docs aligned with live `/torns#contacto` and named team on TORNS

- [ ] **Step 1: Update PRODUCT.md**

Replace the “ruta de contacto… reserva el CTA” success line with: live form on `/torns#contacto` posts to Google Sheets via Apps Script when `VITE_CONTACT_ENDPOINT` is set; Home `#contacto` remains a reserved note. Authorize publishing the three teammate names (names only) on `/torns`.

- [ ] **Step 2: Update DESIGN.md**

Note TORNS rhythm token `--torns-block-gap`, team band, contact band on civic blue, nav Hablemos → `/torns#contacto`.

- [ ] **Step 3: Run full site verification**

```bash
cd lirn-web-main && npm test && npm run build
cd .. && node scripts/assert-lirn-tokens.mjs && node scripts/assert-torns-tokens.mjs
```

Expected: all PASS / build OK.

- [ ] **Step 4: Commit docs + submodule pointer in parent**

```bash
cd /home/personal/Projects/tro-launcher
git add PRODUCT.md DESIGN.md lirn-web-main
git commit -m "$(cat <<'EOF'
Record TORNS team, live contact, and point lirn-web-main.

EOF
)"
```

---

## Spec coverage checklist

| Spec requirement | Task |
| --- | --- |
| Quiénes somos early + three names | 1, 3, 5 |
| Spacing / Cómo funciona gap | 2 |
| Contact form → Apps Script → Sheets | 4, 7 |
| Fields A + Enviar | 1, 4 |
| Order … Cierre → Contacto | 5 |
| Rail Empresa + Contacto | 5 |
| Nav live `/torns#contacto`; Home reserved | 6 |
| Guion ~6–8 min with UX woven | 7 |
| PRODUCT/DESIGN update | 8 |
| No mission on TORNS; no fake success | 3, 4, 5 |

## Self-review notes

- No TBD placeholders left in tasks.
- `submitContact` / `ContactForm` / copy key names are consistent across tasks.
- Apps Script JSON vs redirect tolerance is called out in Task 4 with an explicit allowed variant.
