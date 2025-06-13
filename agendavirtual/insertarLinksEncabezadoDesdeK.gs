function insertarLinksEncabezadoDesdeK() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hojaVista = ss.getSheetByName("VistaAgenda");
  if (!hojaVista) return Logger.log("❌ No se encontró VistaAgenda");

  const filaFechas = hojaVista.getRange("A1:E1").getValues()[0];
  const mesesAbreviados = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

  for (let col = 1; col <= 4; col++) { // B–E
    const fecha = filaFechas[col];
    if (!(fecha instanceof Date)) continue;

    const dia = fecha.getDate();
    const mes = mesesAbreviados[fecha.getMonth()];
    const hojaMes = ss.getSheetByName(mes);
    if (!hojaMes) {
      Logger.log(`❌ No se encontró hoja de mes ${mes}`);
      continue;
    }

    const gid = hojaMes.getSheetId();
    const colLetra = columnToLetter(11 + (dia - 1)); // 11 = columna K para día 1
    const texto = Utilities.formatDate(fecha, "America/Mexico_City", "d/M/yyyy");
    const formula = `=HYPERLINK("#gid=${gid}&range=${colLetra}1", "${texto}")`;

    hojaVista.getRange(1, col + 1).setFormula(formula); // B1:E1
  }

  Logger.log("✅ Hipervínculos agregados desde columna K en adelante.");
}

// Utilidad: convierte número de columna a letra
function columnToLetter(col) {
  let letter = "";
  while (col > 0) {
    let rem = (col - 1) % 26;
    letter = String.fromCharCode(65 + rem) + letter;
    col = Math.floor((col - 1) / 26);
  }
  return letter;
}
