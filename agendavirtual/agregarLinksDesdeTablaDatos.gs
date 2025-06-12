function agregarLinksDesdeTablaDatos() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hojaLineal = ss.getSheetByName("Lineal");
  const hojaDatos = ss.getSheetByName("Datos");
  if (!hojaLineal || !hojaDatos) return Logger.log("❌ Faltan hojas necesarias");

  // Obtener tabla Día → Columna desde "Datos"
  const tablaDatos = hojaDatos.getRange("A2:B32").getValues(); // A2:B32
  const mapaDiaColumna = {};
  tablaDatos.forEach(([dia, col]) => {
    mapaDiaColumna[dia] = col;
  });

  const mesesAbreviados = {
    "Enero": "Ene", "Febrero": "Feb", "Marzo": "Mar", "Abril": "Abr",
    "Mayo": "May", "Junio": "Jun", "Julio": "Jul", "Agosto": "Ago",
    "Septiembre": "Sep", "Octubre": "Oct", "Noviembre": "Nov", "Diciembre": "Dic"
  };

  const primeraFila = 2; // Desde fila 2 visual (Enero)
  const ultimaFila = hojaLineal.getLastRow();
  const primeraCol = 3; // Columna C
  const ultimaCol = hojaLineal.getLastColumn();

  let total = 0;

  for (let fila = primeraFila; fila <= ultimaFila; fila++) {
    const nombreMes = hojaLineal.getRange(fila, 1).getValue(); // Columna A
    const mesAbreviado = mesesAbreviados[nombreMes];

    if (!mesAbreviado) continue;

    const hojaMes = ss.getSheetByName(mesAbreviado);
    if (!hojaMes) continue;

    const gid = hojaMes.getSheetId();

    for (let col = primeraCol; col <= ultimaCol; col++) {
      const dia = hojaLineal.getRange(fila, col).getValue();
      if (typeof dia === "number" && mapaDiaColumna[dia]) {
        const letra = mapaDiaColumna[dia];
        const celda = hojaLineal.getRange(fila, col);
        const formula = `=HYPERLINK("#gid=${gid}&range=${letra}1", "${dia}")`;
        celda.setFormula(formula);
        celda.setBackground("#e6ffe6");
        celda.setNote(`Ir a ${mesAbreviado} día ${dia}`);
        total++;
      }
    }
  }

  Logger.log(`✅ ${total} hipervínculos generados desde la tabla 'Datos'`);
}
