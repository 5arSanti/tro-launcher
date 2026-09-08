# TORNS contact form — Google Apps Script ops guide

The `/torns#contacto` form posts JSON to a Google Apps Script Web App, which appends a row to a Sheet tab named **Contactos**.

## Sheet schema

Create a Google Sheet and name the tab `Contactos`. Row 1 headers (the script creates them if missing):

| timestamp | nombre | email | organizacion | mensaje | origen |
|-----------|--------|-------|--------------|---------|--------|

## Apps Script source

In the same spreadsheet: **Extensions → Apps Script**. Paste and save:

```javascript
const SHEET_NAME = "Contactos";
const ALLOWED_ORIGIN = "*"; // tighten to your domain later if needed

function doPost(e) {
  try {
    const raw = e.postData && e.postData.contents ? e.postData.contents : "{}";
    const data = JSON.parse(raw);

    const nombre = String(data.nombre || "").trim();
    const email = String(data.email || "").trim();
    const organizacion = String(data.organizacion || "").trim();
    const mensaje = String(data.mensaje || "").trim();
    const origen = String(data.origen || "torns").trim();

    if (!nombre || !email || !mensaje) {
      return json_({ ok: false, error: "campos_requeridos" }, 400);
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json_({ ok: false, error: "email_invalido" }, 400);
    }

    const sheet =
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME) ||
      SpreadsheetApp.getActiveSpreadsheet().insertSheet(SHEET_NAME);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "timestamp",
        "nombre",
        "email",
        "organizacion",
        "mensaje",
        "origen",
      ]);
    }

    sheet.appendRow([
      new Date().toISOString(),
      nombre,
      email,
      organizacion,
      mensaje,
      origen,
    ]);

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: "server_error" }, 500);
  }
}

function doOptions() {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT);
}

function json_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
```

## Deploy as Web App

1. **Deploy → New deployment → Type: Web app**
2. Description: `TORNS contacto`
3. Execute as: **Me**
4. Who has access: **Anyone** (required for browser POST from the landing)
5. **Deploy** → copy the URL ending in `/exec` (not `/dev`)

## Wire the landing

Set the deploy URL in `lirn-web-main/.env.local` (never commit secrets):

```bash
VITE_CONTACT_ENDPOINT=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

Rebuild or restart the dev server after changing env. The client helper `submitContact` sends:

- Method: `POST`
- Header: `Content-Type: text/plain;charset=utf-8` (avoids CORS preflight with Apps Script)
- Body: JSON string, e.g. `{ "nombre", "email", "organizacion", "mensaje", "origen": "torns" }`
- `redirect: "follow"`

### Success rule (production-tolerant)

The site treats **HTTP 200 after `redirect: "follow"`** as success. It does **not** parse a JSON body. Apps Script often returns an HTML redirect page instead of `{ ok: true }`; that is expected and still counts as success when the status is 200.

If the endpoint is unset, the form shows a configuration error and never fakes success.

## Manual test (curl)

Replace `$URL` with your `/exec` URL:

```bash
curl -L -X POST "$URL" \
  -H "Content-Type: text/plain;charset=utf-8" \
  -d '{"nombre":"Prueba","email":"a@b.com","organizacion":"LIRN","mensaje":"Hola","origen":"torns"}'
```

`-L` follows redirects like the browser client. A 200 response and a new row in `Contactos` confirm the pipeline. You do not need to see JSON in the curl output.

## Troubleshooting

| Symptom | Check |
|---------|--------|
| No row in sheet | Web App access is **Anyone**; redeploy after script edits |
| CORS / blocked request | Client must use `text/plain`, not `application/json` |
| Form says canal no configurado | `VITE_CONTACT_ENDPOINT` missing or empty at build time |
| 200 but wrong data | Inspect Sheet tab name (`Contactos`) and header row |
