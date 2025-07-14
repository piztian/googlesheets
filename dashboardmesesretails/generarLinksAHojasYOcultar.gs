function generarLinksAHojasYOcultar() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Obtener la hoja "Dashboard" donde se insertarán los links
  const hojaDashboard = ss.getSheetByName("Dashboard");

  // Lista de hojas que no se deben ocultar ni modificar
  const hojasProtegidas = ["Dashboard", "Tiendas", "TotalMeses2025"];

  // Obtener todas las hojas del archivo
  const hojas = ss.getSheets();

  Logger.log("🔄 Iniciando generación de links y ocultamiento de hojas no protegidas...");
  Logger.log(`📄 Total de hojas encontradas: ${hojas.length}`);

  // Limpiar cualquier contenido anterior en el bloque A19:B (donde se colocarán los links)
  hojaDashboard.getRange("A19:B").clearContent();
  Logger.log("🧹 Limpieza realizada en el rango A19:B del Dashboard.");

  let fila = 20; // Fila donde comienzan a insertarse los nuevos links

  hojas.forEach(sheet => {
    const nombre = sheet.getName();

    if (!hojasProtegidas.includes(nombre)) {
      // 📝 Insertar nombre de la hoja
      hojaDashboard.getRange(`A${fila}`).setValue(nombre);

      // 🔗 Insertar hipervínculo que lleva directamente a la hoja (usando su gid)
      hojaDashboard.getRange(`B${fila}`).setFormula(
        `=HYPERLINK("#gid=${sheet.getSheetId()}", "Ir a ${nombre}")`
      );

      Logger.log(`✅ Link generado para hoja '${nombre}' en fila ${fila}.`);

      fila++;

      // 🫥 Ocultar hoja de la vista del usuario
      sheet.hideSheet();
      Logger.log(`🙈 Hoja '${nombre}' oculta del usuario.`);
    } else {
      // 🔓 Asegurar que las hojas protegidas estén visibles
      sheet.showSheet();
      Logger.log(`🔒 Hoja protegida '${nombre}' dejada visible.`);
    }
  });

  Logger.log("🏁 Proceso finalizado. Total de hojas con link ocultadas: " + (fila - 20));
  SpreadsheetApp.getUi().alert("✅ Tabla de hojas generada y hojas ocultas.");
}
