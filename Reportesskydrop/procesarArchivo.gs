function procesarArchivo(fileId) {
  try {
    const ss = SpreadsheetApp.openById(fileId);
    const sheet = ss.getSheets()[0];
    sheet.getRange("A1").setValue("✅ Procesado desde Make");
    return ContentService.createTextOutput("Proceso exitoso");
  } catch (error) {
    return ContentService.createTextOutput("Error: " + error.message);
  }
}
