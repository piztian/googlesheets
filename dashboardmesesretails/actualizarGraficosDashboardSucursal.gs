function actualizarGraficosDashboardSucursal() {
  // Accede a la hoja "Dashboard"
  const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Dashboard");

  // Obtiene el nombre de la sucursal desde A1
  const sucursal = hoja.getRange("A1").getValue();
  Logger.log(`🏪 Sucursal en Dashboard: ${sucursal}`);

  // Obtiene todos los gráficos incrustados en la hoja
  const charts = hoja.getCharts();
  Logger.log(`📊 Total de gráficos encontrados: ${charts.length}`);

  // Colores definidos manualmente para cada gráfico
  const coloresPersonalizados = [
    ['#4a90e2'], // Gráfico 0 → utilidad mensual
    ['#f5a623']  // Gráfico 1 → % frente mes pasado
  ];

  charts.forEach((chart, index) => {
    const builder = chart.modify();

    // Define título dinámico según el índice
    const nuevoTitulo = index === 0
      ? `📊 Utilidad Mensual frente a ${sucursal}`
      : `% frente mes pasado frente a ${sucursal}`;

    // Asigna título y color
    builder.setOption('title', nuevoTitulo);
    builder.setOption('colors', coloresPersonalizados[index]);

    // Aplica la actualización al gráfico
    hoja.updateChart(builder.build());
    Logger.log(`✅ Gráfico ${index + 1} actualizado: ${nuevoTitulo}`);
  });

  // Mensaje final
  const mensaje = `✅ Gráficos actualizados correctamente para la sucursal: ${sucursal} en la pestaña "Dashboard".`;
  Logger.log(mensaje);

  // Mostrar mensaje emergente al usuario
  SpreadsheetApp.getUi().alert("Actualización completada", mensaje, SpreadsheetApp.getUi().ButtonSet.OK);
}
