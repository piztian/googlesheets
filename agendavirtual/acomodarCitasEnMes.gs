function acomodarCitasEnMes() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hojaAgenda = ss.getSheetByName("Agenda");
  if (!hojaAgenda) throw new Error("No se encontró la hoja 'Agenda'");

  const datos = hojaAgenda.getDataRange().getValues();
  const encabezado = datos[0];
  const filas = datos.slice(1);

  // ✅ Nuevos encabezados exactos de tu hoja "Agenda"
  const colFecha = encabezado.indexOf("Fecha de la cita");
  const colHora = encabezado.indexOf("Hora de la cita");
  const colPaciente = encabezado.indexOf("Nombre del paciente");
  const colMotivo = encabezado.indexOf("Motivo de la cita");

  const mesesAbreviados = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

  filas.forEach(fila => {
    const fecha = fila[colFecha];
    const hora = fila[colHora];
    const paciente = fila[colPaciente];
    const motivo = fila[colMotivo];

    if (!fecha || !hora || !paciente) return;

    const fechaObj = new Date(fecha);
    const mesNombre = mesesAbreviados[fechaObj.getMonth()];
    const hojaMes = ss.getSheetByName(mesNombre);
    if (!hojaMes) {
      Logger.log("❌ Hoja de mes no encontrada: " + mesNombre);
      return;
    }

    const dia = fechaObj.getDate(); // día del mes
    const colDia = 11 + (dia - 1); // K = 11 para día 1

    // 🔄 Parsear hora robustamente
    let horaMin = 0;
    if (hora instanceof Date) {
      horaMin = hora.getHours() * 60 + hora.getMinutes();
    } else {
      const str = hora.toString().toLowerCase().replace(/\s+/g, '');
      let match = str.match(/(\d{1,2}):(\d{2})(:\d{2})?(am|pm)?/);
      if (match) {
        let h = parseInt(match[1], 10);
        let m = parseInt(match[2], 10);
        let ap = match[4];

        if (ap === 'pm' && h < 12) h += 12;
        if (ap === 'am' && h === 12) h = 0;

        horaMin = h * 60 + m;
      } else {
        Logger.log("❌ Hora inválida: " + hora);
        return;
      }
    }

    const filaHora = 5 + Math.floor(horaMin / 30); // cada 30 min desde la fila 5
    const contenido = `${paciente} - ${motivo}`;
    hojaMes.getRange(filaHora, colDia).setValue(contenido);
  });

  Logger.log("✅ Todas las citas fueron acomodadas correctamente.");
}
