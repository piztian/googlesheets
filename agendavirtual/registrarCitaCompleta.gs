function registrarCitaCompleta() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hojaForm = ss.getSheetByName("Formulario de citas");
  const hojaAgenda = ss.getSheetByName("Agenda");
  const hojaHistorial = ss.getSheetByName("Historial");
  if (!hojaForm || !hojaAgenda || !hojaHistorial) return Logger.log("❌ Faltan hojas!");

  const datosForm = hojaForm.getDataRange().getValues();
  if (datosForm.length < 2) return Logger.log("❌ No hay citas nuevas.");

  // 🧠 Posiciones de columnas (empezando desde 0)
  const idxNombre = 1;  // Columna B: Nombre del paciente
  const idxFecha = 3;   // Columna D: Fecha de la cita
  const idxHora = 9;    // Columna J: Hora de la cita (hora real)
  const idxTel = 2;     // Columna C: Teléfono
  const idxMotivo = 5;  // Columna F: Motivo de la cita
  const idxDuracion = 6;// Columna G: Duración
  const idxImportante = 7; // Columna H
  const idxNotas = 8;   // Columna I

  function normalizar(valor) {
    return valor ? valor.toString().trim().toLowerCase() : "";
  }

  function clave(row) {
    const nombre = normalizar(row[idxNombre]);
    const fecha = Utilities.formatDate(new Date(row[idxFecha]), "America/Mexico_City", "yyyy-MM-dd");
    const hora = Utilities.formatDate(new Date(row[idxHora]), "America/Mexico_City", "HH:mm");
    return [nombre, fecha, hora].join("|");
  }

  function clavesExistentes(hoja, colFecha, colHora, colNombre) {
    const datos = hoja.getDataRange().getValues().slice(1);
    return new Set(datos.map(row => {
      try {
        const nombre = normalizar(row[colNombre]);
        const fecha = Utilities.formatDate(new Date(row[colFecha]), "America/Mexico_City", "yyyy-MM-dd");
        const hora = Utilities.formatDate(new Date(row[colHora]), "America/Mexico_City", "HH:mm");
        return [nombre, fecha, hora].join("|");
      } catch (e) {
        return "error";
      }
    }));
  }

  const headersAgenda = hojaAgenda.getRange(1, 1, 1, hojaAgenda.getLastColumn()).getValues()[0];
  const headersHistorial = hojaHistorial.getRange(1, 1, 1, hojaHistorial.getLastColumn()).getValues()[0];

  const clavesAgenda = clavesExistentes(
    hojaAgenda,
    headersAgenda.indexOf("Fecha de la cita"),
    headersAgenda.indexOf("Hora de la cita"),
    headersAgenda.indexOf("Nombre del paciente")
  );

  const clavesHistorial = clavesExistentes(
    hojaHistorial,
    headersHistorial.indexOf("Fecha de la cita"),
    headersHistorial.indexOf("Hora de la cita"),
    headersHistorial.indexOf("Nombre del paciente")
  );

  let nuevasAgenda = 0;
  let nuevasHistorial = 0;

  for (let i = 1; i < datosForm.length; i++) {
    const row = datosForm[i];
    if (!row[idxNombre] || !row[idxFecha] || !row[idxHora]) continue;

    const claveFila = clave(row);
    const nombre = row[idxNombre];
    const fecha = row[idxFecha];
    const hora = row[idxHora];
    const telefono = row[idxTel]?.toString().replace(/\D/g, "").slice(-10) || "";
    const motivo = row[idxMotivo];
    const duracion = row[idxDuracion];
    const importante = row[idxImportante];
    const notas = row[idxNotas];

    const fechaTexto = Utilities.formatDate(new Date(fecha), "America/Mexico_City", "EEEE d 'de' MMMM");
    const horaTexto = Utilities.formatDate(new Date(hora), "America/Mexico_City", "HH:mm");
    const mensaje = `Hola ${nombre}, te recordamos tu cita para el día ${fechaTexto} a la hora ${horaTexto} hrs. Motivo: ${motivo}. ¡Gracias por confiar en nosotros!`;
    const linkWA = telefono.length === 10
      ? `=HYPERLINK("https://wa.me/52${telefono}?text=${encodeURIComponent(mensaje)}", "Mensaje WhatsApp")`
      : "";

    // 👉 Insertar en Agenda
    if (!clavesAgenda.has(claveFila)) {
      hojaAgenda.appendRow([
        fecha,
        hora,
        nombre,
        motivo,
        duracion,
        "Agendada",
        importante,
        notas,
        telefono,
        linkWA
      ]);
      nuevasAgenda++;
    }

    // 👉 Insertar en Historial
    if (!clavesHistorial.has(claveFila)) {
      hojaHistorial.appendRow([
        fecha,
        hora,
        nombre,
        motivo,
        "Pendiente",
        notas,
        linkWA
      ]);
      nuevasHistorial++;
    }
  }

  Logger.log(`🎯 Resultado final: ${nuevasAgenda} nuevas en Agenda, ${nuevasHistorial} en Historial.`);
}
