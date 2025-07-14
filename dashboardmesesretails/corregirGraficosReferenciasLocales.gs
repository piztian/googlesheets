function corregirGraficosReferenciasLocales() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // 🛡️ Lista de hojas que no se deben procesar
  const hojasIgnoradas = ["Dashboard", "Tiendas", "TotalMeses2025"];

  // 📋 Filtrar todas las hojas que sí se deben procesar
  const hojas = ss.getSheets().filter(s =>
    !hojasIgnoradas.includes(s.getName())
  );

  let corregidos = [];

  Logger.log("🔍 Iniciando revisión de referencias de gráficos...");

  hojas.forEach(hoja => {
    const nombreHoja = hoja.getName();

    // 🔍 Determinar si la hoja estaba oculta
    const estabaVisible = !hoja.isSheetHidden(); // true si estaba visible
    Logger.log(`📄 Analizando hoja: ${nombreHoja} (oculta: ${!estabaVisible})`);

    // 👁️ Mostrar la hoja si estaba oculta (necesario para que getCharts funcione correctamente)
    if (!estabaVisible) hoja.showSheet();

    // 📈 Obtener gráficos de la hoja
    const charts = hoja.getCharts();
    if (charts.length === 0) {
      Logger.log(`ℹ️ ${nombreHoja}: Sin gráficos`);
      if (!estabaVisible) hoja.hideSheet(); // volver a ocultar
      return;
    }

    Logger.log(`📊 ${nombreHoja}: ${charts.length} gráfico(s) detectado(s)`);
    let algunoCorregido = false;

    charts.forEach(original => {
      const builder = original.modify(); // iniciar modificación del gráfico
      const ranges = original.getRanges(); // obtener los rangos del gráfico original
      const nuevosRangos = [];

      ranges.forEach(r => {
        const hojaOrigen = r.getSheet().getName();

        // 🔁 Si el gráfico apunta a la hoja "Dashboard", corregirlo
        if (hojaOrigen === "Dashboard") {
          const nuevoRango = hoja.getRange(r.getA1Notation()); // mismo rango pero en hoja actual
          nuevosRangos.push(nuevoRango);
          algunoCorregido = true;
          Logger.log(`🔁 Reemplazado rango de Dashboard → ${r.getA1Notation()} en ${nombreHoja}`);
        } else {
          nuevosRangos.push(r); // mantener rango original si no es de Dashboard
        }
      });

      // 🛠️ Aplicar los cambios al gráfico si hubo ajustes
      if (algunoCorregido) {
        builder.clearRanges(); // limpiar rangos antiguos
        nuevosRangos.forEach(r => builder.addRange(r)); // asignar nuevos rangos
        hoja.updateChart(builder.build()); // actualizar gráfico en hoja
        Logger.log(`✅ Gráfico corregido en hoja ${nombreHoja}`);
      }
    });

    // Agregar al resumen si al menos un gráfico fue corregido
    if (algunoCorregido) {
      corregidos.push(`📊 Corrigidos en: ${nombreHoja}`);
    }

    // 🙈 Volver a ocultar la hoja si estaba oculta originalmente
    if (!estabaVisible) hoja.hideSheet();
  });

  // 📋 Resumen final del proceso
  const resumen = corregidos.length
    ? `✅ Gráficos actualizados:\n\n${corregidos.join("\n")}`
    : "🎯 No había referencias externas a 'Dashboard' que corregir.";

  Logger.log("🏁 Revisión de gráficos finalizada.");
  Logger.log(resumen);

  // 🪧 Mostrar resultado final al usuario
  SpreadsheetApp.getUi().alert("🏁 Revisión completada", resumen, SpreadsheetApp.getUi().ButtonSet.OK);
}
