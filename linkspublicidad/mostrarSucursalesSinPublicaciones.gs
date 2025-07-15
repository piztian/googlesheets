function mostrarSucursalesSinPublicaciones() {
  // Lista de todas las sucursales que deben publicar
  const SUCURSALES = [
    "Atequiza", "Atoyac", "Cotija", "El Colomo", "Gomez Farias",
    "Huescalapa", "Jiquilpan", "Jocotepec", "Matriz", "Poncitlan", "Santa Cruz",
    "San Gabriel", "Tamazula CH", "Tamazula RC", "Tecalitlan", "Teocuitatlan",
    "Tizapan", "Tonaya", "Tuxpan", "Usmajac", "Zapotiltic"
  ];

  // Obtiene la hoja con las respuestas y la hoja activa donde están las fechas
  const hojaRespuestas = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Repuestas");
  const hojaActiva = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Obtiene la fecha de inicio y fin desde celdas H2 e I2
  const inicio = hojaActiva.getRange("H2").getValue();
  const fin = hojaActiva.getRange("I2").getValue();

  // Formatea las fechas para comparación (aaaa-mm-dd)
  const fechaInicio = Utilities.formatDate(new Date(inicio), Session.getScriptTimeZone(), "yyyy-MM-dd");
  const fechaFin = Utilities.formatDate(new Date(fin), Session.getScriptTimeZone(), "yyyy-MM-dd");

  // Obtiene todos los datos de la hoja "Repuestas"
  const data = hojaRespuestas.getDataRange().getValues();
  const encabezados = data[0];

  // Identifica las columnas de fecha y sucursal
  const idxFecha = encabezados.indexOf("Timestamp");
  const idxSucursal = encabezados.indexOf("Sucursal");

  // Log de depuración
  Logger.log("📌 Fecha inicio (H2): %s", fechaInicio);
  Logger.log("📌 Fecha fin (I2): %s", fechaFin);
  Logger.log("📌 Columnas encontradas → Timestamp: %d, Sucursal: %d", idxFecha, idxSucursal);
  Logger.log("📌 Rango leído en 'Repuestas': %d filas x %d columnas", data.length, encabezados.length);

  // Verifica que se hayan encontrado las columnas necesarias
  if (idxFecha === -1 || idxSucursal === -1) {
    Logger.log("❌ ERROR: No se encontraron las columnas necesarias.");
    SpreadsheetApp.getUi().alert("❌ No se encontraron las columnas 'Timestamp' o 'Sucursal'.");
    return;
  }

  // Conjunto para guardar sucursales que sí tienen publicaciones
  const sucursalesConPublicaciones = new Set();

  // Recorre los datos desde la segunda fila
  for (let i = 1; i < data.length; i++) {
    const fecha = data[i][idxFecha];
    const sucursal = data[i][idxSucursal];

    // Ignora filas vacías
    if (!fecha || !sucursal) continue;

    // Formatea la fecha actual
    const fechaActual = Utilities.formatDate(new Date(fecha), Session.getScriptTimeZone(), "yyyy-MM-dd");

    // Si está dentro del rango, se considera como publicada
    if (fechaActual >= fechaInicio && fechaActual <= fechaFin) {
      sucursalesConPublicaciones.add(sucursal.trim());
    }
  }

  // Log de sucursales con publicaciones
  Logger.log("📌 Sucursales con publicaciones en el rango:");
  [...sucursalesConPublicaciones].forEach(s => Logger.log("✅ %s", s));

  // Detecta sucursales sin publicaciones
  const sinPublicaciones = SUCURSALES.filter(s => !sucursalesConPublicaciones.has(s));

  // Log de sucursales sin publicaciones
  Logger.log("📌 Sucursales SIN publicaciones:");
  if (sinPublicaciones.length > 0) {
    sinPublicaciones.forEach(s => Logger.log("🚫 %s", s));
  } else {
    Logger.log("✅ Todas las sucursales publicaron al menos una vez.");
  }

  // Encabezado del mensaje según si es un solo día o un rango
  let encabezado = "";
  if (fechaInicio === fechaFin) {
    encabezado = `📅 Sucursales SIN publicaciones el día *${fechaInicio}*:\n\n`;
  } else {
    encabezado = `📅 Sucursales SIN publicaciones entre *${fechaInicio}* y *${fechaFin}*:\n\n`;
  }

  // Cuerpo del mensaje
  const cuerpo = sinPublicaciones.length
    ? sinPublicaciones.join(", ")
    : "✅ Todas las sucursales publicaron al menos una vez.";

  // Mensaje final a mostrar
  const mensaje = encabezado + cuerpo;

  // Muestra el resultado en un modal con textarea para copiar
  SpreadsheetApp.getUi().showModalDialog(
    HtmlService.createHtmlOutput(
      `<textarea style="width:100%; height:300px;">${mensaje}</textarea>`
    ).setWidth(600).setHeight(350),
    "📢 Sucursales sin publicaciones"
  );
}
