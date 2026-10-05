/*
  ABU SHUJAA PHARMACY — INVENTORY SCANNER BACKEND
  -------------------------------------------------
  This is a Google Apps Script. It turns a Google Sheet into a simple
  free database that scan.html (the phone scanner page) talks to.

  SETUP (one-time, ~5 minutes):
  1. Go to sheets.google.com, create a new blank spreadsheet.
  2. Rename "Sheet1" to "Inventory" (bottom tab).
  3. In row 1, add these exact column headers, one per cell:
     A1: Barcode   B1: Name   C1: Category   D1: Price
     E1: Discount  F1: Qty    G1: UpdatedAt
  4. In the Sheet menu: Extensions -> Apps Script.
  5. Delete any starter code in the editor, paste this entire file instead.
  6. Change SECRET_KEY below to your own private word/phrase (not "changeme").
  7. Click Deploy -> New deployment -> gear icon -> Web app.
     - Execute as: Me
     - Who has access: Anyone
  8. Click Deploy, authorize when asked, then copy the Web App URL.
  9. Paste that URL into scan.html where it says SCRIPT_URL = "...".
     Also put the same SECRET_KEY into scan.html's SECRET_KEY constant.

  That's it — scan.html can now read and write to this sheet.
*/

const SECRET_KEY = "changeme"; // change this to your own secret before deploying
const SHEET_NAME = "Inventory";

function getSheet() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function findRowByBarcode(sheet, barcode) {
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][0]).trim() === String(barcode).trim()) {
      return { rowIndex: i + 1, row: data[i] };
    }
  }
  return null;
}

// GET ?action=lookup&barcode=XXXX&key=SECRET
function doGet(e) {
  const key = e.parameter.key;
  if (key !== SECRET_KEY) {
    return jsonResponse({ ok: false, error: "unauthorized" });
  }

  const action = e.parameter.action;
  const sheet = getSheet();

  if (action === "lookup") {
    const barcode = e.parameter.barcode;
    const found = findRowByBarcode(sheet, barcode);
    if (!found) return jsonResponse({ ok: true, found: false });

    const [Barcode, Name, Category, Price, Discount, Qty, UpdatedAt] = found.row;
    return jsonResponse({
      ok: true,
      found: true,
      product: { barcode: Barcode, name: Name, category: Category, price: Price, discount: Discount, qty: Qty, updatedAt: UpdatedAt }
    });
  }

  return jsonResponse({ ok: false, error: "unknown action" });
}

// POST body (plain text, JSON-encoded): { key, action: "update"|"add", barcode, name, category, price, discount, qty }
function doPost(e) {
  let payload;
  try {
    payload = JSON.parse(e.postData.contents);
  } catch (err) {
    return jsonResponse({ ok: false, error: "bad request" });
  }

  if (payload.key !== SECRET_KEY) {
    return jsonResponse({ ok: false, error: "unauthorized" });
  }

  const sheet = getSheet();
  const now = new Date().toISOString();

  if (payload.action === "update") {
    const found = findRowByBarcode(sheet, payload.barcode);
    if (!found) return jsonResponse({ ok: false, error: "not found" });

    sheet.getRange(found.rowIndex, 4).setValue(payload.price);     // D: Price
    sheet.getRange(found.rowIndex, 5).setValue(payload.discount);  // E: Discount
    sheet.getRange(found.rowIndex, 6).setValue(payload.qty);       // F: Qty
    sheet.getRange(found.rowIndex, 7).setValue(now);               // G: UpdatedAt

    return jsonResponse({ ok: true, updated: true });
  }

  if (payload.action === "add") {
    const existing = findRowByBarcode(sheet, payload.barcode);
    if (existing) return jsonResponse({ ok: false, error: "barcode already exists" });

    sheet.appendRow([
      payload.barcode,
      payload.name,
      payload.category,
      payload.price,
      payload.discount || 0,
      payload.qty,
      now
    ]);

    return jsonResponse({ ok: true, added: true });
  }

  return jsonResponse({ ok: false, error: "unknown action" });
}
