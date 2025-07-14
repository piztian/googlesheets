function evaluarRiesgoUltimos3MesesConTitulos() {
  // Acceder a la hoja donde están los datos de utilidad mensual por tienda
  const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("TotalMeses2025");

  // Estructura de filas/columnas donde se encuentran los datos
  const filaMeses = 1;         // Fila con nombres de meses (ej. Jan, Feb, ...)
  const filaTitulos = 2;       // Fila con nombres de las sucursales
  const filaUtilidades = 3;    // Fila base donde inician las utilidades por mes
  const colInicio = 2;         // Columna B
  const colFin = hoja.getLastColumn(); // Última columna con datos

  // Obtener fecha actual y calcular el avance del mes en curso
  const hoy = new Date();
  const mesActual = hoy.getMonth(); // 0 = enero, 6 = julio
  const totalDiasMes = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
  const diaHoy = hoy.getDate();
  const avanceMes = diaHoy / totalDiasMes;

  Logger.log(`🗓 Hoy es ${hoy.toDateString()} — mes actual: ${mesActual} — avance: ${Math.round(avanceMes * 100)}%`);

  // Leer nombres de sucursales desde fila 2
  const nombresSucursales = hoja.getRange(filaTitulos, colInicio, 1, colFin - 1).getValues()[0];

  // Leer utilidades de las 12 filas (meses) para todas las tiendas
  const datosMeses = hoja.getRange(filaUtilidades, colInicio, 12, colFin - 1).getValues();

  // Encabezado del reporte
  let reporte = `📊 Evaluación de riesgo con base en promedio de los últimos 3 meses y avance actual (${Math.round(avanceMes * 100)}% del mes):\n\n`;

  for (let c = 0; c < nombresSucursales.length; c++) {
    const nombreTienda = nombresSucursales[c] || `Col ${String.fromCharCode(66 + c)}`;
    const colData = datosMeses.map(row => row[c]);

    // Determinar qué meses evaluar (mes actual y 3 anteriores)
    const mes1 = mesActual - 1;
    const mes2 = mesActual - 2;
    const mes3 = mesActual - 3;

    // Si no hay suficiente historial, saltar
    if (mes3 < 0) {
      reporte += `⚠️ ${nombreTienda}: No hay suficientes datos para evaluar\n`;
      Logger.log(`⏭ ${nombreTienda}: Insuficientes datos (mes3=${mes3})`);
      continue;
    }

    // Obtener utilidades de los últimos 3 meses
    const utilMes1 = parseFloat(colData[mes1]) || 0;
    const utilMes2 = parseFloat(colData[mes2]) || 0;
    const utilMes3 = parseFloat(colData[mes3]) || 0;
    const promedio = (utilMes1 + utilMes2 + utilMes3) / 3;

    // Obtener utilidad del mes actual y proyectar al mes completo
    const utilActual = parseFloat(colData[mesActual]) || 0;
    const proyeccion = promedio > 0 ? utilActual / avanceMes : 0;
    const comparacion = promedio > 0 ? proyeccion / promedio : 0;

    // Evaluar nivel de riesgo basado en el avance vs promedio
    let nivel = "";
    if (promedio === 0) {
      nivel = "⚠️ Sin historial";
    } else if (comparacion < 0.6) {
      nivel = "🟥 Riesgo alto";
    } else if (comparacion < 0.9) {
      nivel = "🟧 Riesgo medio";
    } else if (comparacion < 1.1) {
      nivel = "🟨 Leve o al día";
    } else {
      nivel = "🟩 Supera expectativa";
    }

    reporte += `${nombreTienda}: ${nivel} — Actual proyectado: $${Math.round(proyeccion)} vs Promedio: $${Math.round(promedio)}\n`;
    Logger.log(`✅ ${nombreTienda}: ${nivel} — Proy: ${Math.round(proyeccion)}, Prom: ${Math.round(promedio)}, Comp: ${comparacion.toFixed(2)}`);
  }

  // Mostrar el reporte en una ventana emergente lista para copiar
  SpreadsheetApp.getUi().showModalDialog(
    HtmlService.createHtmlOutput(`<pre style="font-size:13px">${reporte}</pre>`).setWidth(550).setHeight(600),
    "📋 Evaluación de riesgo por tienda"
  );

  Logger.log("📤 Reporte generado y mostrado al usuario.");
}
