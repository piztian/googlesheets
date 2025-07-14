function actualizarGraficosDashboardSucursal() {
  // Obtiene la hoja principal donde se encuentran los gráficos
  const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Dashboard");

  // Extrae el nombre de la sucursal desde la celda A1
  const sucursal = hoja.getRange("A1").getValue();
  Logger.log(`🏪 Sucursal seleccionada: ${sucursal}`);

  // Obtiene todos los gráficos embebidos en la hoja
  const charts = hoja.getCharts();

  // Define los colores personalizados a aplicar en los gráficos
  const coloresPersonalizados = [
    ['#4a90e2'], // Azul para gráfico de utilidad mensual (gráfico 0)
    ['#f5a623']  // Naranja para gráfico de porcentaje mensual (gráfico 1)
  ];

  Logger.log(`📈 Total de gráficos encontrados: ${charts.length}`);

  charts.forEach((chart, index) => {
    const builder = chart.modify();

    // Define título dinámico según el índice del gráfico
    const nuevoTitulo = index === 0
      ? `📊 Utilidad Mensual frente a ${sucursal}`
      : `% frente mes pasado frente a ${sucursal}`;

    builder.setOption('title', nuevoTitulo);

    // Aplica color personalizado definido para cada gráfico
    builder.setOption('colors', coloresPersonalizados[index]);

    // Reemplaza el gráfico con la nueva configuración
    hoja.updateChart(builder.build());

    Logger.log(`✅ Gráfico ${index + 1} actualizado: ${nuevoTitulo}`);
  });

  Logger.log("🎯 Finalizado: Todos los títulos y colores han sido actualizados.");
}
