function resumenPorCorreo() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hoja = ss.getSheetByName('Resumen');

  const datos = hoja.getDataRange().getValues();
  const encabezado = datos[0];

  const idxMonto = encabezado.findIndex(col => col === 'MONTO_PAGADO_OW');
  const idxZona = encabezado.findIndex(col => col === 'CARGO_ZONAEXTENDIDA');
  const idxCorreo = encabezado.findIndex(col => col === 'CORREOS');

  if (idxMonto === -1 || idxZona === -1 || idxCorreo === -1) {
    SpreadsheetApp.getUi().alert(
      'Faltan columnas requeridas:\n' +
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
    totales.monto,
    totales.zona,
    correo
  ]);

  // ✅ Escribir encabezados en K1:N1
  hoja.getRange("K1").setValue("Hoja origen");
  hoja.getRange("L1").setValue("Monto total");
  hoja.getRange("M1").setValue("Cargos totales");
  hoja.getRange("N1").setValue("Correo");

  // ✅ Limpiar filas anteriores desde L2:N
  const filasPrevias = hoja.getRange("L2:L").getValues().filter(r => r[0] !== '').length;
  if (filasPrevias > 0) {
    hoja.getRange(2, 12, filasPrevias, 3).clearContent();
  }

  // ✅ Pegar resultados desde L2:N
  if (resultados.length > 0) {
    hoja.getRange(2, 12, resultados.length, 3).setValues(resultados);
  }

  SpreadsheetApp.getUi().alert('Totales por correo actualizados con encabezados.');
}
