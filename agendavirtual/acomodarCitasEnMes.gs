function acomodarCitasEnMes() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hojaAgenda = ss.getSheetByName("Agenda");
  if (!hojaAgenda) throw new Error("❌ No se encontró la hoja 'Agenda'");

  const datos = hojaAgenda.getDataRange().getValues();
  const encabezado = datos[0];
  const filas = datos.slice(1);

  const colFecha = encabezado.indexOf("Fecha de la cita");
  const colHora = encabezado.indexOf("Hora de la cita");
  const colPaciente = encabezado.indexOf("Nombre del paciente");
  const colMotivo = encabezado.indexOf("Motivo de la cita");

  const mesesAbreviados = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

  let totalCitas = 0;
  let citasExitosas = 0;
  let citasSinHoja = 0;
  let citasHoraInvalida = 0;

  filas.forEach((fila, index) => {
    const fecha = fila[colFecha];
    const hora = fila[colHora];
    const paciente = fila[colPaciente];
    const motivo = fila[colMotivo];

    if (!fecha || !hora || !paciente) {
      Logger.log(`⚠️ Fila ${index + 2}: Datos incompletos, se omite.`);
      return;
    }

    totalCitas++;

    const fechaObj = new Date(fecha);
    const mesNombre = mesesAbreviados[fechaObj.getMonth()];
    const hojaMes = ss.getSheetByName(mesNombre);
    if (!hojaMes) {
      Logger.log(`❌ Fila ${index + 2}: Hoja de mes '${mesNombre}' no encontrada.`);
      citasSinHoja++;
      return;
    }

    const dia = fechaObj.getDate();
    const colDia = 11 + (dia - 1); // Día 1 en columna K (11)

    // 🕒 Parseo de hora
    let horaMin = 0;
    if (hora instanceof Date) {
      horaMin = hora.getHours() * 60 + hora.getMinutes();
    } else {
      const str = hora.toString().toLowerCase().replace(/\s+/g, '');
      const match = str.match(/(\d{1,2}):(\d{2})(:\d{2})?(am|pm)?/);
      if (match) {
        let h = parseInt(match[1], 10);
        let m = parseInt(match[2], 10);
        const ap = match[4];

        if (ap === 'pm' && h < 12) h += 12;
        if (ap === 'am' && h === 12) h = 0;

        horaMin = h * 60 + m;
      } else {
        Logger.log(`❌ Fila ${index + 2}: Hora inválida "${hora}", se omite.`);
        citasHoraInvalida++;
        return;
      }
    }

    const filaHora = 5 + Math.floor(horaMin / 30); // Cada fila = 30 min desde fila 5
    const contenido = `${paciente} - ${motivo}`;

    hojaMes.getRange(filaHora, colDia).setValue(contenido);
    Logger.log(`✅ Fila ${index + 2}: Cita para '${paciente}' registrada en hoja '${mesNombre}' → celda (${filaHora}, ${colDia})`);
    citasExitosas++;
  });

  Logger.log("📋 Resumen:");
  Logger.log(`🔢 Total citas procesadas: ${totalCitas}`);
  Logger.log(`✅ Citas registradas con éxito: ${citasExitosas}`);
  Logger.log(`🚫 Citas con hoja faltante: ${citasSinHoja}`);
  Logger.log(`⏱️ Citas con hora inválida: ${citasHoraInvalida}`);
}
