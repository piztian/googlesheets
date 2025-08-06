function importarDesdeGoogleSheets() {
  // 📁 1. ID de la carpeta donde están los archivos a procesar
  var folderId = "1ik1JRDuLwTmsCIRQaFBBerLBjXji977u";

  // 📄 2. ID del archivo de Google Sheets donde se pegarán los datos
  var spreadsheetId = "1dN0Z8RER0i1bWwWvy6uHz2A_A7dg7mI1KzWTEzSnrdY";

  // 🗂️ 3. ID de la subcarpeta "procesados" donde se moverán los archivos ya utilizados
  var folderProcesadosId = "159Yt1tFRs2mnuIn1LIWowISbby-Vp3gB";

  // 💬 4. Obtener la interfaz de usuario para mostrar alertas
  var ui = SpreadsheetApp.getUi();

  try {
    // 🔄 5. Abrir carpetas necesarias
    var folder = DriveApp.getFolderById(folderId);
    var folderProcesados = DriveApp.getFolderById(folderProcesadosId);

    // 📑 6. Obtener todos los archivos tipo Google Sheets en la carpeta de origen
    var files = folder.getFilesByType(MimeType.GOOGLE_SHEETS);
    var procesados = 0; // Contador de archivos procesados

    // 🔁 7. Iterar por cada archivo encontrado
    while (files.hasNext()) {
      var file = files.next();
      var fileName = file.getName().toLowerCase(); // Nombre en minúsculas para comparación
      var sheetNameDestino = "";

      // 🧠 8. Determinar hoja destino según nombre del archivo
      if (fileName.includes("bm")) {
        sheetNameDestino = "Lista General BM";
      } else if (fileName.includes("proecom")) {
        sheetNameDestino = "Lista General Ecom";
      } else if (fileName.includes("todos")) {
        sheetNameDestino = "Todo";
      } else {
        continue; // ⏭️ Si no contiene BM, PROECOM o TODOS, se salta este archivo
      }

      // 📄 9. Acceder a la hoja destino en el archivo central
      var spreadsheetDestino = SpreadsheetApp.openById(spreadsheetId);
      var sheetDestino = spreadsheetDestino.getSheetByName(sheetNameDestino);

      // ❌ 10. Si no existe la hoja destino, mostrar alerta y saltar archivo
      if (!sheetDestino) {
        ui.alert("No se encontró la hoja '" + sheetNameDestino + "' para el archivo: " + file.getName());
        continue;
      }

      // 📋 11. Abrir el archivo origen y obtener su primera hoja
      var ssOrigen = SpreadsheetApp.open(file);
      var sheetOrigen = ssOrigen.getSheets()[0];

      // 📥 12. Definir cuántas columnas leer según tipo de archivo
      var numCols = fileName.includes("proecom") || fileName.includes("todos") ? 12 : 9;
      var numRows = sheetOrigen.getLastRow();
      var data = sheetOrigen.getRange(1, 1, numRows, numCols).getValues();

      // 🧹 13. Limpiar contenido actual de la hoja destino (sin borrar formato)
      sheetDestino.clearContents();

      // 📊 14. Pegar los datos importados desde la primera celda
      sheetDestino.getRange(1, 1, data.length, data[0].length).setValues(data);

      // ✂️ 15. Eliminar las primeras dos filas (generalmente encabezados no necesarios)
      sheetDestino.deleteRows(1, 2);

      // ✅ 16. Confirmación visual de éxito al usuario
      ui.alert("✅ Archivo importado:\n\n📄 " + file.getName() + "\n📌 Hoja: " + sheetNameDestino);

      // 📁 17. Mover el archivo procesado a la subcarpeta "procesados"
      folderProcesados.addFile(file);   // Agrega el archivo a la carpeta destino
      folder.removeFile(file);          // Lo remueve de la carpeta de origen (sin eliminarlo de Drive)
      ui.alert("📁 Archivo movido a la carpeta 'procesados'.");

      // ➕ 18. Aumentar contador de archivos procesados
      procesados++;
    }

    // 📭 19. Si no se procesó ningún archivo, notificar al usuario
    if (procesados === 0) {
      ui.alert("No se encontró ningún archivo que contenga 'BM', 'PROECOM' o 'TODOS' en el nombre.");
    }

  } catch (error) {
    // ⚠️ 20. Capturar y mostrar cualquier error ocurrido
    ui.alert("❌ Error: " + error.message);
  }
}
