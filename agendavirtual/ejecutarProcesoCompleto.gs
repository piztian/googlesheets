function ejecutarProcesoCompleto() {
  Logger.log("🚀 Iniciando proceso completo de agenda...");

  registrarCitaCompleta();               // 1. Citas nuevas a Agenda + Historial
  acomodarCitasEnMes();                  // 2. Acomoda en hoja del mes
  cargarCitasHoyYProximosDias();         // 3. Carga HOY y siguientes días

  Logger.log("✅ Proceso completo ejecutado satisfactoriamente.");
}
