const SHEET_NAME = "Contactos";
const ALLOWED_ORIGIN = "*"; // más adelante puedes fijarlo a tu dominio

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
