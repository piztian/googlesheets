function cargarCitasHoyYProximosDias() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hojaHoy = ss.getSheetByName("HOY");
  if (!hojaHoy) {
    Logger.log("❌ No se encontró la hoja 'HOY'");
    return;
  }

  const hojaMesNombre = hojaHoy.getRange("D2").getValue(); // Por ejemplo "Jun"
  const hojaMes = ss.getSheetByName(hojaMesNombre);
  if (!hojaMes) {
    Logger.log(`❌ No se encontró la hoja del mes '${hojaMesNombre}'`);
    return;
  }

  const filaFechas = hojaMes.getRange("A1:ZZ1").getValues()[0];

  const columnas = [
    { letra: "K", num: 11 },
    { letra: "L", num: 12 },
    { letra: "M", num: 13 },
    { letra: "N", num: 14 }
  ];

  let totalCargadas = 0;
  let erroresFecha = 0;

  columnas.forEach(col => {
    const fecha = hojaHoy.getRange(`${col.letra}1`).getValue();
    if (!(fecha instanceof Date)) {
      Logger.log(`⚠️ Celda ${col.letra}1 no contiene una fecha válida.`);
      erroresFecha++;
      return;
    }

    let colIndex = -1;
    for (let i = 0; i < filaFechas.length; i++) {
      const valor = filaFechas[i];
      if (valor instanceof Date && valor.toDateString() === fecha.toDateString()) {
        colIndex = i + 1; // porque getRange usa índices desde 1
        break;
      }
    }

    if (colIndex === -1) {
      Logger.log(`❌ No se encontró la fecha ${fecha.toDateString()} en la hoja '${hojaMesNombre}'`);
      erroresFecha++;
      return;
    }

    const datos = hojaMes.getRange(5, colIndex, 48, 1).getValues();
    const datosLimpiados = datos.map(fila => {
      const val = fila[0];
      return [(val === 0 || val === "0") ? "" : val];
    });

    hojaHoy.getRange(5, col.num, 48, 1).setValues(datosLimpiados);
    Logger.log(`✅ Cargadas citas del ${fecha.toDateString()} desde hoja '${hojaMesNombre}' → columna '${col.letra}'`);
    totalCargadas++;
  });

  Logger.log("📋 Resumen:");
  Logger.log(`✅ Total días cargados: ${totalCargadas}`);
  Logger.log(`⚠️ Columnas con error de fecha o sin coincidencia: ${erroresFecha}`);
}
