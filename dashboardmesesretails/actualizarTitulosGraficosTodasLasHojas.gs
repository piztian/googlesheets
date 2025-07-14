function actualizarTitulosGraficosTodasLasHojas() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Lista de hojas que no se deben modificar (protegidas)
  const hojasProtegidas = ["Dashboard", "Tiendas", "TotalMeses2025"];

  // Colores personalizados para los gráficos: 
  // Índice 0 → gráfico de utilidad mensual, Índice 1 → gráfico de porcentaje mensual
  const coloresPersonalizados = [
    ['#4a90e2'],  // Azul para utilidad
    ['#f5a623']   // Naranja para % frente a mes anterior
  ];

  // Filtrar todas las hojas del archivo excluyendo las protegidas
  const hojas = ss.getSheets().filter(
    hoja => !hojasProtegidas.includes(hoja.getName())
  );

  let hojasModificadas = [];

  Logger.log("🔎 Iniciando actualización de gráficos en hojas de tiendas...");
  Logger.log(`Total de hojas a revisar: ${hojas.length}`);

  hojas.forEach(hoja => {
    const nombreHoja = hoja.getName();
    const sucursal = hoja.getRange("A1").getValue(); // Se asume que A1 contiene el nombre de la tienda

    Logger.log(`📄 Procesando hoja: ${nombreHoja} (Sucursal: ${sucursal})`);

    const charts = hoja.getCharts();

    if (charts.length === 0) {
      Logger.log(`⚠️ No se encontraron gráficos en la hoja: ${nombreHoja}`);
      return;
    }

    charts.forEach((chart, index) => {
      const builder = chart.modify();

      // Establecer el título dinámico basado en el índice del gráfico
      const nuevoTitulo = (index === 0)
        ? `📊 Utilidad Mensual frente a ${sucursal}`
        : `% frente mes pasado frente a ${sucursal}`;

      builder.setOption('title', nuevoTitulo);

      // Aplicar color personalizado según el tipo de gráfico
      builder.setOption('colors', coloresPersonalizados[index]);

      // Actualizar el gráfico con las nuevas configuraciones
      hoja.updateChart(builder.build());

      Logger.log(`✅ Gráfico ${index + 1} actualizado en hoja ${nombreHoja}: ${nuevoTitulo}`);
    });

    hojasModificadas.push(`✅ ${nombreHoja}`);
  });

  // Generar resumen de actualización
  const resumen = hojasModificadas.length
    ? `🏁 Gráficos actualizados en:\n\n${hojasModificadas.join("\n")}`
    : "🎯 No se encontraron gráficos para actualizar.";

  Logger.log("📝 Resumen final de hojas modificadas:");
  Logger.log(resumen);

  // Mostrar resultado al usuario
  SpreadsheetApp.getUi().alert("Actualización completada", resumen, SpreadsheetApp.getUi().ButtonSet.OK);
}
