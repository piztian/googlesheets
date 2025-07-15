function eliminarFilasExisKits() {
  const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Exis Kits");

  if (!hoja) {
    SpreadsheetApp.getUi().alert("❌ No se encontró la pestaña 'Exis Kits'.");
    return;
  }

  const datos = hoja.getDataRange().getValues();
  const numColumnasOriginal = datos[0].length;

  // 🧠 Filtrar las filas: mantener encabezado + productos válidos
  const filasMantener = datos.filter(function(fila, indice) {
    if (indice === 0) return true; // Mantener encabezado
    const cantidad = fila[2]; // Columna C
    const producto = (fila[1] || "").toString().toLowerCase(); // Columna B
    return cantidad >= 10 && (producto.endsWith("kit") || producto.endsWith("iu"));
  });

  Logger.log(`🧮 Filas originales: ${datos.length}`);
  Logger.log(`✅ Filas que se mantendrán: ${filasMantener.length}`);

  // 🧱 Rellenar filas con celdas vacías si tienen menos columnas que el total
  const filasConFormato = filasMantener.map(fila => {
    const nuevaFila = Array(numColumnasOriginal).fill("");
    for (let i = 0; i < Math.min(fila.length, numColumnasOriginal); i++) {
      nuevaFila[i] = fila[i];
    }
    return nuevaFila;
  });

  // 🧽 Limpiar solo el contenido del área original (sin borrar estructuras, anchos, etc.)
  hoja.getRange(2, 1, hoja.getLastRow() - 1, numColumnasOriginal).clearContent();

  // ✍️ Escribir las filas filtradas desde la fila 1
  hoja.getRange(1, 1, filasConFormato.length, numColumnasOriginal).setValues(filasConFormato);

  // 📢 Mostrar resumen
  const mensaje = `✅ Se eliminaron ${datos.length - filasMantener.length} filas que no cumplían los criterios.
  
🧾 Criterios aplicados:
- Columna C (cantidad) ≥ 10
- Columna B (producto) termina en "kit" o "iu"

🔢 Filas resultantes: ${filasMantener.length} (incluye encabezado)`;

  Logger.log("✅ Limpieza finalizada.");
  SpreadsheetApp.getUi().alert(mensaje);
}
