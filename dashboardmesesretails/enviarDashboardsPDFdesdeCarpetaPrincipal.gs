function enviarDashboardsPDFdesdeCarpetaPrincipal() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hojaTiendas = ss.getSheetByName("Tiendas");

  // 📁 Carpeta destino donde se guardarán los PDFs
  const carpetaID = "16E5mVX4S-X981epzO6fHCrRn3pE8-xcd";
  const carpeta = DriveApp.getFolderById(carpetaID);

  // 📋 Leer nombres de sucursal y correos
  const datos = hojaTiendas.getRange("A2:B").getValues().filter(fila => fila[0] && fila[1]);

  // 🔐 Token de autenticación para UrlFetchApp
  const token = ScriptApp.getOAuthToken();

  // 📅 Preparar fecha en formato "14 Julio"
  const hoy = new Date();
  const meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio",
                 "Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  const fechaFormateada = `${hoy.getDate()} ${meses[hoy.getMonth()]}`;

  let enviados = [];

  Logger.log("📤 Iniciando exportación y envío de dashboards...");

  datos.forEach(([sucursal, correo]) => {
    const hoja = ss.getSheetByName(sucursal);

    if (!hoja) {
      Logger.log(`⚠️ Hoja no encontrada: ${sucursal}`);
      return;
    }

    // 🕵️ Verificar si estaba oculta
    const estabaOculta = hoja.isSheetHidden();
    if (estabaOculta) hoja.showSheet(); // Mostrar temporalmente

    try {
      // 🔗 Construir URL de exportación
      const gid = hoja.getSheetId();
      const pdfUrl = `https://docs.google.com/spreadsheets/d/${ss.getId()}/export?` +
        `exportFormat=pdf&format=pdf&size=A4&portrait=true&fitw=true` +
        `&sheetnames=false&printtitle=false&pagenumbers=false&gridlines=false&fzr=false` +
        `&top_margin=0.5&bottom_margin=0.5&left_margin=0.5&right_margin=0.5&gid=${gid}`;

      // 🌐 Obtener el PDF como blob
      const response = UrlFetchApp.fetch(pdfUrl, {
        headers: { Authorization: "Bearer " + token }
      });

      // 🏷️ Nombre del archivo con fecha
      const nombreArchivo = `${sucursal}_Dashboard_${fechaFormateada}.pdf`;

      const blob = response.getBlob().setName(nombreArchivo);

      // 💾 Guardar en carpeta destino
      const archivo = carpeta.createFile(blob);

      // 🔓 Compartir con enlace (sólo lectura)
      archivo.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      const link = archivo.getUrl();

      // 📧 Enviar correo
      GmailApp.sendEmail(
        correo,
        `📊 Dashboard mensual - ${sucursal}`,
        `Hola,\n\nAquí tienes el dashboard de la sucursal ${sucursal} correspondiente al ${fechaFormateada}:\n\n${link}\n\nSaludos,\nEquipo Celucenter`
      );

      enviados.push(`✅ ${sucursal} → ${correo}\n🔗 ${link}`);
      Logger.log(`📧 Enviado: ${sucursal} → ${correo}`);

    } catch (e) {
      Logger.log(`❌ Error al procesar ${sucursal}: ${e.message}`);
    } finally {
      // 🔙 Restaurar visibilidad si estaba oculta
      if (estabaOculta) hoja.hideSheet();
    }
  });

  // 📝 Resumen final en pop-up
  const resumen = `🏁 Dashboards enviados: ${enviados.length}\n\n` + enviados.join("\n\n");

  SpreadsheetApp.getUi().showModalDialog(
    HtmlService.createHtmlOutput(`<pre style="font-size:13px">${resumen}</pre>`)
      .setWidth(650)
      .setHeight(600),
    "📨 Resumen de Envío"
  );

  Logger.log("✅ Proceso completado.");
}
