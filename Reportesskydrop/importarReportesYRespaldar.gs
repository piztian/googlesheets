function importarReportesYRespaldar() {
  const carpetaOrigenId = '1V0vXVF29Ixa62tKHKZ5UIXu9QXqJYkM9';
  const carpetaDestinoId = '1DRdduY7hStZNSPq3FmEGJmcYGqoFG_Ct';
  const sheetId = '1IPwn-8bb5jXIc0u2ZYp52RTelrVtEfwUaB2LrefzI0I';
  const hojaDestinoNombre = 'Mayo25';

  const carpetaOrigen = DriveApp.getFolderById(carpetaOrigenId);
  const carpetaDestino = DriveApp.getFolderById(carpetaDestinoId);
  const hojaDestino = SpreadsheetApp.openById(sheetId).getSheetByName(hojaDestinoNombre);
  const ui = SpreadsheetApp.getUi();

  const archivosProcesables = [];
  const archivosNoProcesados = [];

  const archivos = carpetaOrigen.getFiles();

  // Clasificar archivos
  while (archivos.hasNext()) {
    const archivo = archivos.next();
    const nombre = archivo.getName();
    const tipo = archivo.getMimeType();

    if (tipo === MimeType.GOOGLE_SHEETS && nombre.includes("Reporte")) {
      const match = nombre.match(/(\d{1,2})/); // extrae el número del día
      const dia = match ? parseInt(match[1]) : 0;
      archivosProcesables.push({ archivo, dia });
    } else if (nombre.endsWith(".xlsx")) {
      archivosNoProcesados.push(archivo);
    }
  }

  // Ordenar por número de día ascendente
  archivosProcesables.sort((a, b) => a.dia - b.dia);

  let procesados = 0;

  // Procesar y mover
  for (const { archivo } of archivosProcesables) {
    const archivoSpreadsheet = SpreadsheetApp.open(archivo);
    const hojaOrigen = archivoSpreadsheet.getSheets()[0];
    let datos = hojaOrigen.getDataRange().getValues();

    if (datos.length > 1) {
      datos = datos.slice(1); // Omitir encabezado
      hojaDestino.getRange(hojaDestino.getLastRow() + 1, 1, datos.length, datos[0].length).setValues(datos);
      procesados++;
      carpetaDestino.addFile(archivo);
      carpetaOrigen.removeFile(archivo);
    }
  }

  // Preguntar si eliminar archivos .xlsx
   if (archivosNoProcesados.length > 0) {
    const respuesta = ui.alert(
      `Se encontraron ${archivosNoProcesados.length} archivos .xlsx que no se procesaron.\n¿Deseas eliminarlos de la carpeta?`,
      ui.ButtonSet.YES_NO
    );

    if (respuesta === ui.Button.YES) {
      archivosNoProcesados.forEach(f => f.setTrashed(true));
    }
  }

  // Ejecutar actualización de resumen después de importar
  actualizarResumen();

  ui.alert(`Importación completada.\nArchivos procesados: ${procesados}`);
}
