function ejecutarProcesoVistaAgendaCompleta() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hojaVista = ss.getSheetByName("VistaAgenda");
  if (!hojaVista) return Logger.log("❌ No se encontró VistaAgenda");

  Logger.log("🚀 Iniciando proceso completo de VistaAgenda...");

  // 1. Limpiar contenido (no estilos)
  hojaVista.clear({ contentsOnly: true });

  // 2. Insertar fórmulas temporales
  hojaVista.getRange("B1").setFormula("=ARRAYFORMULA(HOY!K1:N1)");
  hojaVista.getRange("B2").setFormula("=ARRAYFORMULA(HOY!K2:N3)");
  hojaVista.getRange("A4").setFormula("=ARRAYFORMULA(HOY!J21:J49)");
  hojaVista.getRange("B4").setFormula("=ARRAYFORMULA(HOY!K21:N49)");
  SpreadsheetApp.flush();

  // 3. Convertir valores a texto
  const encabezados = hojaVista.getRange("B1:E1").getDisplayValues();
  const subEncabezados = hojaVista.getRange("B2:E3").getDisplayValues();
  const horas = hojaVista.getRange("A4:A49").getDisplayValues();
  const contenido = hojaVista.getRange("B4:E49").getDisplayValues();
  hojaVista.getRange("B1:E1").setValues(encabezados);
  hojaVista.getRange("B2:E3").setValues(subEncabezados);
  hojaVista.getRange("A4:A49").setValues(horas);
  hojaVista.getRange("B4:E49").setValues(contenido);

  // 4. Aplicar estilos
  estilizarVistaAgenda();

  // 5. Insertar hipervínculos en encabezados
  insertarLinksEncabezadoDesdeK();

  // 6. Anonimizar contenido
  anonimizarVistaAgenda();

  // 7. Ocultar filas de media hora (impares entre 5 y 49)
  const filasMediaHora = [];
  for (let f = 5; f <= 49; f += 2) filasMediaHora.push(f);
  filasMediaHora.forEach(f => hojaVista.hideRows(f));

  Logger.log("✅ VistaAgenda lista para publicación.");
}

function anonimizarVistaAgenda() {
  const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("VistaAgenda");
  if (!hoja) return Logger.log("❌ Hoja VistaAgenda no encontrada");

  const rango = hoja.getRange("B4:E49");
  const valores = rango.getValues();

  const anonimizados = valores.map(fila =>
    fila.map(celda => (celda && celda.toString().trim() !== "" ? "Ocupado" : ""))
  );

  rango.setValues(anonimizados);
  Logger.log("🔒 Datos anonimizados (se reemplazaron con 'Ocupado').");
}
