function resumenPorCorreoDesde(nombreHoja) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hojaOrigen = ss.getSheetByName(nombreHoja);
  const hojaDestino = ss.getSheetByName('Resumen');

  if (!hojaOrigen || !hojaDestino) {
    SpreadsheetApp.getUi().alert(`No se encontró la hoja "${nombreHoja}" o la hoja "Resumen".`);
    return;
  }

  const datos = hojaOrigen.getDataRange().getValues();
  const encabezado = datos[0];

  const idxMonto = encabezado.findIndex(col => col === 'MONTO_PAGADO_OW');
  const idxZona = encabezado.findIndex(col => col === 'CARGO_ZONAEXTENDIDA');
  const idxCorreo = encabezado.findIndex(col => col === 'CORREOS');
  const idxFecha = encabezado.findIndex(col => col === 'FECHA'); // Fecha para la columna O

  if (idxMonto === -1 || idxZona === -1 || idxCorreo === -1) {
    SpreadsheetApp.getUi().alert(
      `Faltan columnas requeridas en "${nombreHoja}":\n` +
      (idxMonto === -1 ? '• MONTO_PAGADO_OW\n' : '') +
      (idxZona === -1 ? '• CARGO_ZONAEXTENDIDA\n' : '') +
      (idxCorreo === -1 ? '• CORREOS\n' : '')
    );
    return;
  }

  const resumen = {};
  let fechaMax = null;

  for (let i = 1; i < datos.length; i++) {
    const fila = datos[i];
    const correo = fila[idxCorreo];
    const monto = parseFloat(fila[idxMonto]) || 0;
    const zona = parseFloat(fila[idxZona]) || 0;
    const fecha = idxFecha !== -1 ? fila[idxFecha] : null;

    if (!correo) continue;

    if (!resumen[correo]) {
      resumen[correo] = { monto: 0, zona: 0 };
    }

    resumen[correo].monto += monto;
    resumen[correo].zona += zona;

    if (fecha instanceof Date && (!fechaMax || fecha > fechaMax)) {
      fechaMax = fecha;
    }
  }

  const resultados = Object.entries(resumen).map(([correo, totales]) => [
    nombreHoja,
    totales.monto,
    totales.zona,
    correo
  ]);

  // Escribir encabezados
  hojaDestino.getRange("K1").setValue("Hoja origen");
  hojaDestino.getRange("L1").setValue("Monto total");
  hojaDestino.getRange("M1").setValue("Cargos totales");
  hojaDestino.getRange("N1").setValue("Correo");
  hojaDestino.getRange("O1").setValue("Fecha");

  // Limpiar contenido anterior
  const filasPrevias = hojaDestino.getRange("L2:L").getValues().filter(r => r[0] !== '').length;
  if (filasPrevias > 0) {
    hojaDestino.getRange(2, 11, filasPrevias, 5).clearContent(); // K-O
  }

  // Insertar nuevos datos
  if (resultados.length > 0) {
    hojaDestino.getRange(2, 11, resultados.length, 4).setValues(resultados);
  }

  // Insertar fecha máxima en O2
  hojaDestino.getRange("O2").setValue(
    fechaMax instanceof Date
      ? Utilities.formatDate(fechaMax, ss.getSpreadsheetTimeZone(), "dd/MM/yyyy")
      : "Sin fechas"
  );

  SpreadsheetApp.getUi().alert(`Resumen generado desde la hoja "${nombreHoja}" correctamente.`);
}
