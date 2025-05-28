function actualizarResumen() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hojaResumen = ss.getSheetByName('Resumen');
  const ui = SpreadsheetApp.getUi();

  const respuesta = ui.prompt(
    'Actualizar resumen',
    '¿De qué pestaña (mes) quieres extraer la información?',
    ui.ButtonSet.OK_CANCEL
  );

  if (respuesta.getSelectedButton() !== ui.Button.OK) {
    ui.alert('Operación cancelada');
    return;
  }

  const nombrePestañaOrigen = respuesta.getResponseText().trim();
  const hojaOrigen = ss.getSheetByName(nombrePestañaOrigen);

  if (!hojaOrigen) {
    ui.alert(`No se encontró la pestaña: "${nombrePestañaOrigen}"`);
    return;
  }

  const datosOrigen = hojaOrigen.getDataRange().getValues();

  if (datosOrigen.length < 2) {
    ui.alert("La pestaña no contiene datos suficientes.");
    return;
  }

  const columnasDeseadas = [0, 1, 2, 3, 13, 18, 23, 24, 30];
  const encabezado = columnasDeseadas.map(idx => datosOrigen[0][idx]);
  const datosFiltrados = [];

  for (let i = 1; i < datosOrigen.length; i++) {
    const fila = columnasDeseadas.map(idx => datosOrigen[i][idx]);
    datosFiltrados.push(fila);
  }

    hojaResumen.clearContents();
  hojaResumen.getRange(1, 1, 1, columnasDeseadas.length).setValues([encabezado]);
  hojaResumen.getRange(2, 1, datosFiltrados.length, columnasDeseadas.length).setValues(datosFiltrados);

  hojaResumen.getRange("K2").setValue(nombrePestañaOrigen); // 👈 Agrega nombre de pestaña de origen

  ui.alert(`Resumen actualizado desde la pestaña "${nombrePestañaOrigen}".\nFilas copiadas: ${datosFiltrados.length}`);

  resumenPorCorreo(); // Ejecuta el resumen agrupado por correo
}
