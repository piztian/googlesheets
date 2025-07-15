function limpiarExisKits() {
  // 🔧 1. Obtener la hoja llamada "Exis Kits"
  const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Exis Kits");
  if (!hoja) {
    Logger.log("❌ La hoja 'Exis Kits' no existe.");
    SpreadsheetApp.getUi().alert("❌ La hoja 'Exis Kits' no existe.");
    return;
  }

  // 📏 2. Obtener la última fila con datos
  const ultimaFila = hoja.getLastRow();
  Logger.log("🔢 Última fila con datos: " + ultimaFila);

  // 👁️ 3. Mostrar todas las filas (en caso de que haya ocultas)
  hoja.showRows(1, ultimaFila);
  Logger.log("👁️ Filas mostradas desde la 1 hasta la " + ultimaFila);

  // 🧽 4. Limpiar contenido y color de fondo del rango A2:W
  const rangoAW = hoja.getRange(2, 1, ultimaFila - 1, 23); // Columnas A-W = 1-23
  rangoAW.clearContent();
  rangoAW.setBackground(null);
  Logger.log("🧼 Limpieza realizada en rango A2:W" + ultimaFila);

  // 🧽 5. Limpiar contenido de columnas Y y Z (columnas 25 y 26), desde la fila 2
  const rangoYZ = hoja.getRange(2, 25, ultimaFila - 1, 2); // Columnas Y-Z = 25-26
  rangoYZ.clearContent();
  Logger.log("🧼 Limpieza realizada en rango Y2:Z" + ultimaFila);

  // ✅ 6. Confirmar finalización
  const mensajeFinal = `✅ Limpieza completada correctamente.

🧽 Rangos limpiados:
- A2:W${ultimaFila} (contenido y color de fondo)
- Y2:Z${ultimaFila} (contenido)

📌 Todas las filas fueron mostradas para asegurar limpieza total.`;

  Logger.log("✅ Script finalizado exitosamente.");
  SpreadsheetApp.getUi().alert(mensajeFinal);
}
