function generarDashboardsDesdePlantilla() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // 📄 Hojas importantes
  const hojaTiendas = ss.getSheetByName("Tiendas");
  const hojaBase = ss.getSheetByName("Dashboard");

  // 🛡️ Estas no se deben tocar
  const hojasProtegidas = ["Tiendas", "Dashboard", "TotalMeses2025"];

  // 📋 Lista de nombres de tiendas desde la hoja Tiendas
  const tiendas = hojaTiendas.getRange("A2:A").getValues().flat().filter(Boolean);
  Logger.log(`🏬 Total de tiendas detectadas: ${tiendas.length}`);

  // 📑 Obtener todas las hojas actuales
  const hojasActuales = ss.getSheets().map(s => s.getName());

  // 🗑️ Detectar hojas que deben eliminarse (no están protegidas ni en la lista de tiendas)
  const hojasAEliminar = hojasActuales.filter(nombre =>
    !hojasProtegidas.includes(nombre) && !tiendas.includes(nombre)
  );

  let logCreado = [], logActualizado = [], logEliminado = [];

  Logger.log(`🗑️ Hojas a eliminar: ${hojasAEliminar.join(", ") || "ninguna"}`);

  // Eliminar hojas no válidas
  hojasAEliminar.forEach(nombre => {
    ss.deleteSheet(ss.getSheetByName(nombre));
    logEliminado.push(`🗑️ ${nombre}`);
  });

  // 🗂️ Encabezados de meses
  const encabezados = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

  tiendas.forEach(nombre => {
    let hoja = ss.getSheetByName(nombre);

    if (!hoja) {
      hoja = ss.insertSheet(nombre);
      logCreado.push(`✅ Creada: ${nombre}`);
    } else {
      hoja.clear();
      logActualizado.push(`♻️ Actualizada: ${nombre}`);
    }

    Logger.log(`📄 Configurando hoja: ${nombre}`);

    // A1: nombre de sucursal
    hoja.getRange("A1").setValue(nombre);

    // B1:M1 = meses
    hoja.getRange("B1:M1").setValues([encabezados]);

    // A2, A3: descripciones
    hoja.getRange("A2").setValue("Utilidad Mensual");
    hoja.getRange("A3").setValue("% frente mes pasado");

    // B2: fórmula de utilidad
    hoja.getRange("B2").setFormula(`=TRANSPOSE(FILTER(TotalMeses2025!B3:Z9, TotalMeses2025!B2:Z2=A$1))`);

    // B3: fórmula de porcentaje
    hoja.getRange("B3").setFormula(`=TRANSPOSE(FILTER(TotalMeses2025!B17:Z30, TotalMeses2025!B2:Z2=A$1))`);

    // Copiar layout visual desde Dashboard (A4:M30)
    const layout = hojaBase.getRange("A4:M30").getValues();
    const formatos = hojaBase.getRange("A4:M30").getNumberFormats();
    hoja.getRange("A4:M30").setValues(layout);
    hoja.getRange("A4:M30").setNumberFormats(formatos);

    // KPIs en fila 10–16
    hoja.getRange("B10").setFormula(`=SUM(B2:M2)`);
    hoja.getRange("B11").setFormula(`=AVERAGE(B2:M2)`);
    hoja.getRange("B12").setFormula(`=MAX(B2:M2)`);
    hoja.getRange("B13").setFormula(`=INDEX(B1:M1, MATCH(MAX(B2:M2), B2:M2, 0))`);
    hoja.getRange("B14").setFormula(`=MIN(B2:M2)`);
    hoja.getRange("B15").setFormula(`=INDEX(B1:M1, MATCH(MIN(B2:M2), B2:M2, 0))`);
    hoja.getRange("B16").setFormula(`=IFERROR(INDEX(B2:M2, MATCH(TEXT(TODAY(),"mmm"), B1:M1, 0)) / DAY(TODAY()) * DAY(EOMONTH(TODAY(),0)), "")`);

    // Reemplazar gráficos desde Dashboard
    hoja.getCharts().forEach(c => hoja.removeChart(c));
    hojaBase.getCharts().forEach(chart => hoja.insertChart(chart));

    Logger.log(`✅ Hoja '${nombre}' lista con layout, fórmulas y gráficos.`);
  });

  // 📝 Resumen final
  const resumen = `🏁 Proceso finalizado

📄 Hojas creadas:
${logCreado.join("\n") || "—"}

🔄 Hojas actualizadas:
${logActualizado.join("\n") || "—"}

🗑️ Hojas eliminadas:
${logEliminado.join("\n") || "—"}
`;

  Logger.log(resumen);
  SpreadsheetApp.getUi().alert("Actualización de Dashboards por tienda", resumen, SpreadsheetApp.getUi().ButtonSet.OK);
}
