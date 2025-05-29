function importarReportesYRespaldar() {
  const carpetaOrigenId = '1V0vXVF29Ixa62tKHKZ5UIXu9QXqJYkM9';
  const carpetaDestinoId = '1DRdduY7hStZNSPq3FmEGJmcYGqoFG_Ct';
  const sheetId = '1GFXbZ4IwEVaekpk_guaYORFyz0O07JPsE-Hp1AyxUrk'; // Hoja de Google principal

  const carpetaOrigen = DriveApp.getFolderById(carpetaOrigenId);
  const carpetaDestino = DriveApp.getFolderById(carpetaDestinoId);
  const archivoDestino = SpreadsheetApp.openById(sheetId);
  const ui = SpreadsheetApp.getUi();

  const archivos = carpetaOrigen.getFiles();
  const archivosProcesados = [];
  const archivosNoProcesados = [];

  while (archivos.hasNext()) {
    const archivo = archivos.next();
    const nombre = archivo.getName();
    const tipo = archivo.getMimeType();

    if (tipo === MimeType.GOOGLE_SHEETS && nombre.includes("Reporte")) {
      archivosProcesados.push(archivo);
    } else if (nombre.endsWith(".xlsx")) {
      archivosNoProcesados.push(archivo);
    }
  }

  // Procesar cada archivo
  for (const archivo of archivosProcesados) {
    const libro = SpreadsheetApp.open(archivo);
    const hojaOrigen = libro.getSheets()[0];
    const datos = hojaOrigen.getDataRange().getValues();

    if (datos.length < 2) continue;

    const encabezado = datos[0];

    // Recorrer filas (desde fila 1 porque fila 0 es encabezado)
    for (let i = 1; i < datos.length; i++) {
      const fila = datos[i];
      const fecha = fila[3]; // Columna D

      if (!(fecha instanceof Date)) continue;

      const mes = Utilities.formatDate(fecha, "GMT-6", "MMMM"); // ejemplo: "Enero"
      const anio = Utilities.formatDate(fecha, "GMT-6", "yy");   // ejemplo: "25"
      const nombreHoja = `${capitalize(mes)}${anio}`;

      let hojaDestino = archivoDestino.getSheetByName(nombreHoja);

      // Crear hoja si no existe
      if (!hojaDestino) {
        hojaDestino = archivoDestino.insertSheet(nombreHoja);
        hojaDestino.appendRow(encabezado); // agregar encabezados
      }

      // Agregar fila de datos
      hojaDestino.appendRow(fila);
    }

    // Mover archivo procesado
    carpetaDestino.addFile(archivo);
    carpetaOrigen.removeFile(archivo);
  }

  // Preguntar si eliminar archivos .xlsx no procesados
  if (archivosNoProcesados.length > 0) {
    const respuesta = ui.alert(
      `Se encontraron ${archivosNoProcesados.length} archivos .xlsx que no se procesaron.\n¿Deseas eliminarlos?`,
      ui.ButtonSet.YES_NO
    );
    if (respuesta === ui.Button.YES) {
      archivosNoProcesados.forEach(f => f.setTrashed(true));
    }
  }

  ui.alert("Importación finalizada con éxito. Las filas se distribuyeron por pestaña según su mes.");
}

// Capitaliza primera letra
function capitalize(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}
