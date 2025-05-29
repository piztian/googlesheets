function importarReportesYRespaldar() {
  // 🗂️ IDs de carpetas y hoja de destino
  const carpetaOrigenId = '1V0vXVF29Ixa62tKHKZ5UIXu9QXqJYkM9';
  const carpetaDestinoId = '1DRdduY7hStZNSPq3FmEGJmcYGqoFG_Ct';
  const sheetId = '1GFXbZ4IwEVaekpk_guaYORFyz0O07JPsE-Hp1AyxUrk'; // NUEVA hoja
  const hojaDestinoNombre = 'Mayo25';

  const carpetaOrigen = DriveApp.getFolderById(carpetaOrigenId);
  const carpetaDestino = DriveApp.getFolderById(carpetaDestinoId);
  const hojaDestino = SpreadsheetApp.openById(sheetId).getSheetByName(hojaDestinoNombre);
  const ui = SpreadsheetApp.getUi();

  const archivosProcesables = [];
  const archivosNoProcesados = [];

  const archivos = carpetaOrigen.getFiles();

  // 🔎 Clasificar archivos
  while (archivos.hasNext()) {
    const archivo = archivos.next();
    const nombre = archivo.getName();
    const tipo = archivo.getMimeType();

    // ✅ Solo procesar archivos Google Sheets que contengan "Reporte"
    if (tipo === MimeType.GOOGLE_SHEETS && nombre.includes("Reporte")) {
      const match = nombre.match(/(\d{1,2})/); // Extrae número de día del nombre
      const dia = match ? parseInt(match[1]) : 0;
      archivosProcesables.push({ archivo, dia });
    } else if (nombre.endsWith(".xlsx")) {
      archivosNoProcesados.push(archivo); // Archivos Excel no se procesan
    }
  }

  // 📅 Ordenar archivos por número de día ascendente
  archivosProcesables.sort((a, b) => a.dia - b.dia);

  let procesados = 0;

  // 🔄 Procesar archivos uno por uno
  for (const { archivo } of archivosProcesables) {
    const archivoSpreadsheet = SpreadsheetApp.open(archivo);
    const hojaOrigen = archivoSpreadsheet.getSheets()[0];
    let datos = hojaOrigen.getDataRange().getValues();

    if (datos.length > 1) {
      datos = datos.slice(1); // ❌ Elimina encabezado
      hojaDestino.getRange(hojaDestino.getLastRow() + 1, 1, datos.length, datos[0].length).setValues(datos);
      procesados++;

      // 📁 Mover archivo procesado a carpeta de respaldo
      carpetaDestino.addFile(archivo);
      carpetaOrigen.removeFile(archivo);
    }
  }

  // ❓ Preguntar si deseas eliminar archivos .xlsx
  if (archivosNoProcesados.length > 0) {
    const respuesta = ui.alert(
      `Se encontraron ${archivosNoProcesados.length} archivos .xlsx que no se procesaron.\n¿Deseas eliminarlos de la carpeta?`,
      ui.ButtonSet.YES_NO
    );

    if (respuesta === ui.Button.YES) {
      archivosNoProcesados.forEach(f => f.setTrashed(true));
    }
  }

  // 📊 Ejecutar actualización de resumen y totales
  actualizarResumen();

  // ✅ Mensaje final
  ui.alert(`Importación completada.\nArchivos procesados: ${procesados}`);
}
