function mostrarPublicacionesEntreFechas() {
  // Obtiene la hoja de respuestas y la hoja activa (donde están las fechas H2/I2)
  const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Repuestas");
  const hojaActiva = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Extrae fechas desde H2 e I2
  const inicio = hojaActiva.getRange("H2").getValue();
  const fin = hojaActiva.getRange("I2").getValue();

  // Formatea fechas en formato yyyy-MM-dd
  const fechaInicio = Utilities.formatDate(new Date(inicio), Session.getScriptTimeZone(), "yyyy-MM-dd");
  const fechaFin = Utilities.formatDate(new Date(fin), Session.getScriptTimeZone(), "yyyy-MM-dd");

  // Lee los datos de la hoja y sus encabezados
  const data = hoja.getDataRange().getValues();
  const encabezados = data[0];

  // Detecta los índices de las columnas relevantes
  const idxFecha = encabezados.indexOf("Timestamp");
  const idxSucursal = encabezados.indexOf("Sucursal");
  const idxTipo = encabezados.indexOf("Tipo de Publicación");
  const idxLink = encabezados.indexOf("Link de Publicación");

  // Valida que existan todas las columnas necesarias
  if ([idxFecha, idxSucursal, idxTipo, idxLink].includes(-1)) {
    SpreadsheetApp.getUi().alert("❌ No se encontraron las columnas necesarias.");
    return;
  }

  // Arreglos para resultados y agrupación por sucursal
  let resultados = [];
  const resumenPorSucursal = {};

  // Recorre los datos desde la segunda fila
  for (let i = 1; i < data.length; i++) {
    const celdaFecha = data[i][idxFecha];
    if (!celdaFecha) continue;

    const fechaActual = Utilities.formatDate(new Date(celdaFecha), Session.getScriptTimeZone(), "yyyy-MM-dd");

    // Solo toma las publicaciones dentro del rango
    if (fechaActual >= fechaInicio && fechaActual <= fechaFin) {
      const sucursal = (data[i][idxSucursal] || "-").trim();
      const tipo = data[i][idxTipo] || "-";
      const link = data[i][idxLink] || "-";

      // Guarda el detalle formateado
      resultados.push(`📍 *${sucursal}*\n🗂 ${tipo}\n🔗 ${link}\n`);

      // Agrupa links por sucursal (solo cuenta, no guarda los links)
      if (!resumenPorSucursal[sucursal]) resumenPorSucursal[sucursal] = 0;
      resumenPorSucursal[sucursal]++;
    }
  }

  // Define el encabezado del mensaje según sea 1 día o rango
  let encabezado = fechaInicio === fechaFin
    ? `Hola, les paso el link del día *${fechaInicio}*:\n\n`
    : `Hola, les paso el link del día *${fechaInicio}* al día *${fechaFin}*:\n\n`;

  // Título del modal
  let titulo = fechaInicio === fechaFin
    ? `Publicaciones del día ${fechaInicio}`
    : `Publicaciones del ${fechaInicio} al ${fechaFin}`;

  // Cuerpo principal del mensaje
  const cuerpo = resultados.length
    ? resultados.join("\n")
    : "ℹ️ No se encontraron publicaciones en el rango de fechas.";

  // Construye resumen final por sucursal (compacto)
  let resumen = "\n\n---\n📊 *Resumen por sucursal:*\n\n";
  if (Object.keys(resumenPorSucursal).length > 0) {
    for (const [sucursal, count] of Object.entries(resumenPorSucursal)) {
      resumen += `📍 *${sucursal}* = ${count} links registrados\n`;
    }
  } else {
    resumen += "ℹ️ Sin publicaciones por sucursal.";
  }

  // Mensaje completo a mostrar
  const mensajeFinal = encabezado + cuerpo + resumen;

  // Muestra modal con textarea y botones
  const htmlOutput = HtmlService.createHtmlOutput(`
    <div style="font-family:sans-serif">
      <p><b>${titulo}</b></p>
      <textarea style="width:100%; height:250px;">${mensajeFinal}</textarea><br><br>
      <button onclick="google.script.run.mostrarSucursalesSinPublicaciones();google.script.host.close();">Ver sucursales sin publicaciones</button>
      <button onclick="google.script.host.close()">Cerrar</button>
    </div>
  `)
  .setWidth(600)
  .setHeight(420);

  SpreadsheetApp.getUi().showModalDialog(htmlOutput, "📢 Resultados de Publicaciones");

  // Logger de control
  Logger.log("📌 Fechas seleccionadas: %s - %s", fechaInicio, fechaFin);
  Logger.log("📌 Total de publicaciones encontradas: %d", resultados.length);
  if (resultados.length > 0) {
    resultados.forEach((r, i) => Logger.log("📄 Registro %d:\n%s", i + 1, r));
  } else {
    Logger.log("ℹ️ No se encontraron publicaciones en el rango.");
  }

  Logger.log("📊 Resumen por sucursal:");
  for (const [sucursal, count] of Object.entries(resumenPorSucursal)) {
    Logger.log("📍 %s = %d links registrados", sucursal, count);
  }

  Logger.log("✅ Modal mostrado con resumen compacto.");
}
