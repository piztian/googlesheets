function resumenPorCorreo() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  // 📌 1. Solicita al usuario el nombre de la pestaña de origen
  const respuesta = ui.prompt(
    "Resumen por correo",
    "¿De qué pestaña (mes) quieres extraer la información?",
    ui.ButtonSet.OK_CANCEL
  );
  if (respuesta.getSelectedButton() !== ui.Button.OK) return;

  const nombreHoja = respuesta.getResponseText().trim();
  const hojaOrigen = ss.getSheetByName(nombreHoja);
  const hojaDestino = ss.getSheetByName('Resumen');

  // ❌ 2. Validación de hojas requeridas
  if (!hojaOrigen || !hojaDestino) {
    ui.alert(`No se encontró la hoja "${nombreHoja}" o la hoja "Resumen".`);
    return;
  }

  // 📥 3. Obtiene los datos de la hoja origen y el encabezado
  const datos = hojaOrigen.getDataRange().getValues();
  const encabezado = datos[0];

  // 🧭 4. Detecta índices de columnas necesarias
  const idxMonto = encabezado.findIndex(col => col === 'MONTO_PAGADO_OW');
  const idxZona = encabezado.findIndex(col => col === 'CARGO_ZONAEXTENDIDA');
  const idxCorreo = encabezado.findIndex(col => col === 'CORREOS');

  // ❌ 5. Validación de columnas requeridas
  if (idxMonto === -1 || idxZona === -1 || idxCorreo === -1) {
    ui.alert(
      `Faltan columnas requeridas en "${nombreHoja}":\n` +
      (idxMonto === -1 ? '• MONTO_PAGADO_OW\n' : '') +
      (idxZona === -1 ? '• CARGO_ZONAEXTENDIDA\n' : '') +
      (idxCorreo === -1 ? '• CORREOS\n' : '')
    );
    return;
  }

  // 📊 6. Agrupa montos por correo (omitimos un correo específico)
  const resumen = {};
  for (let i = 1; i < datos.length; i++) {
    const correo = datos[i][idxCorreo];
    const monto = parseFloat(datos[i][idxMonto]) || 0;
    const zona = parseFloat(datos[i][idxZona]) || 0;

    if (!correo || correo === 'torresfregoso@gmail.com') continue;

    if (!resumen[correo]) {
      resumen[correo] = { monto: 0, zona: 0 };
    }

    resumen[correo].monto += monto;
    resumen[correo].zona += zona;
  }

  // 🧾 7. Prepara los resultados en arreglo para insertar (col K-N)
  const resultados = Object.entries(resumen).map(([correo, totales]) => [
    nombreHoja,            // K: hoja origen
    totales.monto,         // L: monto total
    totales.zona,          // M: cargos
    correo                 // N: correo
  ]);

  // 🧼 8. Limpia columnas K:O sin borrar encabezado
  hojaDestino.getRange("K1").setValue("Hoja origen");
  hojaDestino.getRange("L1").setValue("Monto total");
  hojaDestino.getRange("M1").setValue("Cargos totales");
  hojaDestino.getRange("N1").setValue("Correo");
  hojaDestino.getRange("O1").setValue("Fecha");
  hojaDestino.getRange("P1").setValue("Sucursal"); // 🆕 Encabezado nuevo

  const filasPrevias = hojaDestino.getRange("L2:L").getValues().filter(r => r[0] !== '').length;
  if (filasPrevias > 0) {
    hojaDestino.getRange(2, 11, filasPrevias, 6).clearContent(); // K:P (6 columnas)
  }

  // ✍️ 9. Escribe los resultados en columnas K-N
  if (resultados.length > 0) {
    hojaDestino.getRange(2, 11, resultados.length, 4).setValues(resultados); // K-N
  }

  // 🗓️ 10. Obtiene última fecha de la columna D y la escribe en O2
  const lastRow = hojaOrigen.getLastRow();
  const fechaRaw = hojaOrigen.getRange(lastRow, 4).getValue(); // D = col 4
  let fechaFinal = "Sin fechas";

  if (fechaRaw instanceof Date && !isNaN(fechaRaw.getTime())) {
    fechaFinal = Utilities.formatDate(fechaRaw, ss.getSpreadsheetTimeZone(), "dd/MM/yyyy");
  }

  hojaDestino.getRange("O2").setValue(fechaFinal);

  // 🧮 11. Inserta fórmula en P2:P para extraer nombre de sucursal desde el correo
  hojaDestino.getRange("P2").setFormula(`=ARRAYFORMULA(IF(N2:N<>"", LEFT(N2:N, FIND("@", N2:N)-1), ""))`);

  // ✅ 12. Mensaje final
  ui.alert(`Resumen por correo actualizado correctamente desde "${nombreHoja}".`);
}
