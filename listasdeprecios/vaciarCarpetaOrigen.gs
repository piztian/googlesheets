function vaciarCarpetaOrigen() {
  var folderId = "1ik1JRDuLwTmsCIRQaFBBerLBjXji977u"; // ID de la carpeta de Google Drive
  var folder = DriveApp.getFolderById(folderId);
  var files = folder.getFiles();
  var ui = SpreadsheetApp.getUi(); // Para mostrar mensajes al usuario

  var archivosAEliminar = [];

  // Recorremos todos los archivos y filtramos los que NO sean PDF
  while (files.hasNext()) {
    var file = files.next();
    if (file.getMimeType() !== MimeType.PDF) {
      archivosAEliminar.push(file);
    }
  }

  if (archivosAEliminar.length === 0) {
    ui.alert("No se encontraron archivos para eliminar. Solo hay archivos PDF o la carpeta está vacía.");
    return;
  }

  // Confirmar con el usuario antes de vaciar la carpeta
  var response = ui.prompt(
    "Vaciar carpeta de origen",
    "Se encontraron " + archivosAEliminar.length + " archivos que NO son PDF. ¿Deseas eliminarlos? (Escribe 'SI' para confirmar)",
    ui.ButtonSet.OK_CANCEL
  );

  if (response.getSelectedButton() === ui.Button.OK && response.getResponseText().toUpperCase() === "SI") {
    archivosAEliminar.forEach(function(file) {
      file.setTrashed(true); // Mover a la papelera
    });
    ui.alert("Los archivos no PDF han sido eliminados de la carpeta.");
  } else {
    ui.alert("No se eliminó ningún archivo.");
  }
}
