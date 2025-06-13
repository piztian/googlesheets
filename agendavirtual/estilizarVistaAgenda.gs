function estilizarVistaAgenda() {
  const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("VistaAgenda");
  const coloresColumnas = ["#fdecea", "#fff9c4", "#e8f5e9", "#e3f2fd","#f3e5f5"]; // B-F

  // Encabezado
  hoja.getRange("A1:F1").setFontWeight("bold").setFontSize(14).setFontColor("white")
    .setBackground("#1565c0").setHorizontalAlignment("center").setVerticalAlignment("middle")
    .setWrap(true).setBorder(true, true, true, true, true, true);

  // Columna de horarios
  hoja.getRange("A4:A49")
    .setBackground("#f1f1f1").setFontColor("#444").setFontSize(11)
    .setHorizontalAlignment("right").setVerticalAlignment("middle").setWrap(false);
  hoja.setColumnWidth(1, 70);

  // Columnas B-E con color por día
  for (let i = 0; i < coloresColumnas.length; i++) {
    const col = i + 2;
    hoja.getRange(4, col, 46, 1)
      .setBackground(coloresColumnas[i])
      .setFontSize(11).setHorizontalAlignment("center")
      .setVerticalAlignment("middle").setWrap(true)
      .setBorder(true, true, true, true, true, true);
    hoja.setColumnWidth(col, 150);
  }

  // Altura estándar
  for (let fila = 4; fila <= 49; fila++) {
    hoja.setRowHeight(fila, 32);
  }

  // Ocultar columnas y filas innecesarias
  hoja.getMaxColumns() > 5 && hoja.hideColumns(6, hoja.getMaxColumns() - 5);
  hoja.getMaxRows() > 49 && hoja.hideRows(50, hoja.getMaxRows() - 49);

  // Ocultar filas de media hora (filas impares entre la 5 y la 31)
  const filasMediaHora = [];
  for (let f = 5; f <= 31; f += 2) {
    filasMediaHora.push(f);
  }
  filasMediaHora.forEach(f => hoja.hideRows(f));

  Logger.log("🎨 Vista estilizada y filas de media hora ocultas.");
}
