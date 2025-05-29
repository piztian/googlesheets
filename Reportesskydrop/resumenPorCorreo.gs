function resumenPorCorreo() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  // 🔄 Preguntar al usuario de qué hoja (mes) desea extraer la información
  const respuesta = ui.prompt("Resumen por correo", "¿De qué pestaña (mes) quieres extraer la información?", ui.ButtonSet.OK_CANCEL);

  if (respuesta.getSelectedButton() !== ui.Button.OK) return;

  const nombreHoja = respuesta.getResponseText().trim();
  const hojaOrigen = ss.getSheetByName(nombreHoja);
  const hojaDestino = ss.getSheetByName('Resumen');

  if (!hojaOrigen || !hojaDestino) {
    ui.alert(`No se encontró la hoja "${nombreHoja}" o la hoja "Resumen".`);
    return;
  }

  const datos = hojaOrigen.getDataRange().getValues();
  const encabezado = datos[0];

  const idxMonto = encabezado.findIndex(col => col === 'MONTO_PAGADO_OW');
  const idxZona = encabezado.findIndex(col => col === 'CARGO_ZONAEXTENDIDA');
  const idxCorreo = encabezado.findIndex(col => col === 'CORREOS');

  if (idxMonto === -1 || idxZona === -1 || idxCorreo === -1) {
    ui.alert(
      `Faltan columnas requeridas en "${nombreHoja}":\n` +
      (idxMonto === -1 ? '• MONTO_PAGADO_OW\n' : '') +
      (idxZona === -1 ? '• CARGO_ZONAEXTENDIDA\n' : '') +
      (idxCorreo === -1 ? '• CORREOS\n' : '')
    );
    return;
  }

  const resumen = {};

  for (let i = 1; i < datos.length; i++) {
    const correo = datos[i][idxCorreo];
    const monto = parseFloat(datos[i][idxMonto]) || 0;
    const zona = parseFloat(datos[i][idxZona]) || 0;

    if (!correo) continue;

    if (!resumen[correo]) {
      resumen[correo] = { monto: 0, zona: 0 };
    }

    resumen[correo].monto += monto;
    resumen[correo].zona += zona;
  }

  const resultados = Object.entries(resumen).map(([correo, totales]) => [
    nombreHoja,
    totales.monto,
    totales.zona,
    correo
  ]);

  // 🔄 Escribir encabezados en Resumen
  hojaDestino.getRange("K1").setValue("Hoja origen");
  hojaDestino.getRange("L1").setValue("Monto total");
  hojaDestino.getRange("M1").setValue("Cargos totales");
  hojaDestino.getRange("N1").setValue("Correo");
  hojaDestino.getRange("O1").setValue("Fecha");

  // 🔄 Borrar previos sin tocar encabezado
  const filasPrevias = hojaDestino.getRange("L2:L").getValues().filter(r => r[0] !== '').length;
  if (filasPrevias > 0) {
    hojaDestino.getRange(2, 11, filasPrevias, 5).clearContent(); // K:O
  }

  // 📝 Insertar nuevos resultados
  if (resultados.length > 0) {
    hojaDestino.getRange(2, 11, resultados.length, 4).setValues(resultados);
  }

  // 🗓️ Buscar última fecha desde columna D (idxFecha = 3)
  const idxFecha = encabezado.findIndex(col => col === 'FECHA');
  let fechaMax = "Sin fechas";

  if (idxFecha !== -1) {
    const fechas = datos.slice(1).map(r => r[idxFecha]).filter(v => v instanceof Date);
    if (fechas.length > 0) {
      const maxDate = new Date(Math.max(...fechas.map(f => f.getTime())));
      fechaMax = Utilities.formatDate(maxDate, ss.getSpreadsheetTimeZone(), "dd/MM/yyyy");
    }
  }

  hojaDestino.getRange("O2").setValue(fechaMax);

  ui.alert(`Resumen por correo actualizado correctamente desde "${nombreHoja}".`);
}
