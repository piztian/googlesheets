function copiarFormatoCondicionalDesdeColumnaB() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hoja = ss.getActiveSheet();

  // Solicita al usuario el rango de filas a copiar desde la columna B
  const filaInicio = parseInt(
    Browser.inputBox("🔷 Ingresa la fila de inicio del rango de referencia (ejemplo: 18)"),
    10
  );
  const filaFin = parseInt(
    Browser.inputBox("🔷 Ingresa la fila de fin del rango de referencia (ejemplo: 30)"),
    10
  );

  // Validación de entradas
  if (isNaN(filaInicio) || isNaN(filaFin) || filaFin < filaInicio) {
    Browser.msgBox("⚠️ Error: Fila inicio y fin deben ser números válidos y fila fin ≥ fila inicio.");
    Logger.log("❌ Entrada inválida: filaInicio=" + filaInicio + ", filaFin=" + filaFin);
    return;
  }

  // Define columna base de la cual se copiarán las reglas (columna B)
  const columnaBase = "B";
  const rangoBase = hoja.getRange(`${columnaBase}${filaInicio}:${columnaBase}${filaFin}`);
  Logger.log(`📌 Rango base: ${rangoBase.getA1Notation()}`);

  // Columnas destino: desde C hasta Z
  const columnaInicio = "C";
  const columnaFin = "Z";
  const colInicioIdx = columnaInicio.charCodeAt(0);
  const colFinIdx = columnaFin.charCodeAt(0);

  // Obtiene todas las reglas condicionales de la hoja
  const reglasExistentes = hoja.getConditionalFormatRules();

  // Filtra solo aquellas reglas que están exactamente en el rango base
  const reglasBase = reglasExistentes.filter(rule =>
    rule.getRanges().some(range =>
      range.getA1Notation() === rangoBase.getA1Notation()
    )
  );

  if (reglasBase.length === 0) {
    Browser.msgBox(`⚠️ No se encontraron reglas en el rango ${rangoBase.getA1Notation()}`);
    Logger.log("⚠️ No se encontraron reglas en " + rangoBase.getA1Notation());
    return;
  }

  Logger.log(`🔍 Se encontraron ${reglasBase.length} regla(s) en el rango base para copiar.`);

  let reglasAplicadas = 0;

  // Recorre de C a Z aplicando la(s) regla(s) de formato condicional
  for (let i = colInicioIdx; i <= colFinIdx; i++) {
    const letraCol = String.fromCharCode(i);
    const rangoDestino = hoja.getRange(`${letraCol}${filaInicio}:${letraCol}${filaFin}`);
    Logger.log(`➡️ Copiando a ${rangoDestino.getA1Notation()}`);

    reglasBase.forEach(rule => {
      const nuevaRegla = rule.copy().setRanges([rangoDestino]).build();
      reglasExistentes.push(nuevaRegla);
      reglasAplicadas++;
    });
  }

  // Establece las nuevas reglas en la hoja
  hoja.setConditionalFormatRules(reglasExistentes);

  const mensaje = `✅ ${reglasAplicadas} regla(s) copiadas de ${columnaBase}${filaInicio}:${columnaBase}${filaFin} a ${columnaInicio}${filaInicio}:${columnaFin}${filaFin}`;
  Browser.msgBox(mensaje);
  Logger.log("🏁 Finalizado: " + mensaje);
}
