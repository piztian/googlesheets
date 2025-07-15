function ocultarColumnasVacias() {
  // Obtener la hoja "Exis Kits"
  const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Exis Kits");
  if (!hoja) {
    SpreadsheetApp.getUi().alert("❌ No se encontró la pestaña llamada 'Exis Kits'.");
    return;
  }

  // Obtener todos los datos de la hoja
  const rangoDatos = hoja.getDataRange();
  const datos = rangoDatos.getValues();
  const numFilas = datos.length;
  const numColumnas = datos[0].length;

  const sucursalesSinDatos = [];  // Lista para mostrar al final
  let columnasOcultas = 0;

  Logger.log("📊 Iniciando revisión de columnas desde fila 3 (índice 2)");

  // Recorrer columnas desde la segunda (col=1)
  for (let col = 1; col < numColumnas; col++) {
    let estaVacia = true;

    // Revisar desde la fila 3 (índice 2) hacia abajo
    for (let fila = 2; fila < numFilas; fila++) {
      const valor = datos[fila][col];
      if (valor !== null && valor !== "" && String(valor).trim() !== "") {
        estaVacia = false;
        break;
      }
    }

    // Si está vacía, ocultar y registrar
    if (estaVacia) {
      hoja.hideColumns(col + 1); // Convertimos de índice a columna 1-based
      const sucursal = datos[0][col]; // ✅ Nombre de sucursal correcto en fila 1
      sucursalesSinDatos.push(sucursal || `Columna ${col + 1}`);
      Logger.log(`🚫 Ocultada columna: ${sucursal}`);
      columnasOcultas++;
    }
  }

  // Mostrar resultados al usuario
  let mensajeFinal = "";
  if (sucursalesSinDatos.length > 0) {
    mensajeFinal += `✅ Se ocultaron ${columnasOcultas} columnas vacías.\n\n📍 Sucursales sin pedidos:\n- ${sucursalesSinDatos.join("\n- ")}`;
  } else {
    mensajeFinal += "✅ Todas las sucursales tienen datos. No se ocultó ninguna columna.";
  }

  Logger.log("✅ Script finalizado.");
  SpreadsheetApp.getUi().alert(mensajeFinal);
}
