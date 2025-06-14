function cargarCitasHoyYProximosDias() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hojaHoy = ss.getSheetByName("HOY");
  if (!hojaHoy) {
    Logger.log("❌ No se encontró la hoja 'HOY'");
    return;
  }

  const hojaMesNombre = hojaHoy.getRange("D2").getValue(); // Obtener nombre del mes (ej: "Jun")
  const hojaMes = ss.getSheetByName(hojaMesNombre);
  if (!hojaMes) {
    Logger.log(`❌ No se encontró la hoja del mes '${hojaMesNombre}'`);
    return;
  }

  const filaFechas = hojaMes.getRange("A1:ZZ1").getValues()[0]; // Traer fila 1 para ubicar fechas
  const columnas = [
    { letra: "K", num: 11 },
    { letra: "L", num: 12 },
    { letra: "M", num: 13 },
    { letra: "N", num: 14 },
    { letra: "O", num: 15 }
  ];

  let totalCargadas = 0;
  let erroresFecha = 0;

  columnas.forEach(col => {
    const fecha = hojaHoy.getRange(`${col.letra}1`).getValue(); // Obtener la fecha de la cabecera de cada columna en "HOY"
    if (!(fecha instanceof Date)) {
      Logger.log(`⚠️ Celda ${col.letra}1 no contiene una fecha válida.`);
      erroresFecha++;
      return;
    }

    let colIndex = -1;
    for (let i = 0; i < filaFechas.length; i++) {
      const valor = filaFechas[i];
      if (valor instanceof Date && valor.toDateString() === fecha.toDateString()) {
        colIndex = i + 1; // Convertir índice base 0 a base 1
        break;
      }
    }

    if (colIndex === -1) {
      Logger.log(`❌ No se encontró la fecha ${fecha.toDateString()} en la hoja '${hojaMesNombre}'`);
      erroresFecha++;
      return;
    }

    const datos = hojaMes.getRange(5, colIndex, 48, 1).getValues(); // Traer 48 renglones de citas (de 7:00 a 18:30)
    const datosLimpiados = datos.map(fila => {
      const val = fila[0];
      return [(val === 0 || val === "0") ? "" : val];
    });

    hojaHoy.getRange(5, col.num, 48, 1).setValues(datosLimpiados); // Escribir citas en hoja "HOY"

    Logger.log(`✅ Cargadas citas del ${fecha.toDateString()} desde hoja '${hojaMesNombre}' → columna '${col.letra}'`);
    datosLimpiados.forEach((fila, i) => {
      if (fila[0]) {
        const hora = 7 + i * 0.5;
        Logger.log(`   🕒 ${hora.toFixed(2).replace('.00', ':00').replace('.50', ':30')} → ${fila[0]}`);
      }
    });

    totalCargadas++;
  });

  // 🔽 Cargar también las notas generales de junio (B30:B)
  const notas = hojaMes.getRange("B30:B").getValues().flat().filter(v => v !== "");
  hojaHoy.getRange("B30").offset(0, 0, notas.length, 1).setValues(notas.map(n => [n]));

  Logger.log(`🗒️ Notas generales cargadas desde hoja '${hojaMesNombre}':`);
  notas.forEach((n, i) => Logger.log(`   📌 ${i + 1}: ${n}`));

  Logger.log("📋 Resumen final:");
  Logger.log(`✅ Total días cargados: ${totalCargadas}`);
  Logger.log(`⚠️ Columnas con error de fecha o sin coincidencia: ${erroresFecha}`);
  Logger.log(`📝 Total de notas generales cargadas: ${notas.length}`);
}
