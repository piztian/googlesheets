# **Manual para Importación de Archivos de Excel y Google Sheets**

Este manual explica los pasos para **descargar**, **descomprimir** y **subir los archivos de Excel** desde dos fuentes:  
1. El canal de **Telegram "Listas en Excel Vendedores Existencias"**  
2. El **ERP Celucenter** para el archivo **INVENTARIO ACTUAL - DATOS - PROECOM**

Una vez subidos, los archivos se convertirán en **Google Sheets** y luego se procesarán automáticamente a través del **script de importación**.

---

## **Requisitos**

1. Acceso al canal de Telegram **Listas en Excel Vendedores Existencias** para descargar los archivos.
2. Acceso al ERP Celucenter para generar el archivo **INVENTARIO ACTUAL - DATOS - PROECOM**.
3. Cuenta de Google Drive para subir los archivos descomprimidos.
4. Habilitar el script en Google Apps Script para importar y organizar los datos.

---

## **Pasos para Obtener los Archivos desde Telegram**

1. **Accede al Canal de Telegram**:  
   [Listas en Excel Vendedores Existencias](https://web.telegram.org/a/#-1001619365335)

2. **Busca el archivo más reciente**:  
   El archivo que contiene todos los datos se llama **`DATOS XLSYYYYMMDD.xls.zip`**.

3. **Descargar y Descomprimir**:  
   - **Descarga** el archivo comprimido `DATOS XLSYYYYMMDD.xls.zip`.
   - **Descomprime** el archivo en tu computadora.

4. **Subir a Google Drive**:
   - Una vez descomprimido, **sube el archivo Excel** a tu cuenta de **Google Drive**.
   - **Cambia el nombre del archivo** a algo como `DATOS XLSYYYYMMDD` para facilitar la identificación.

5. **Convertir a Google Sheets**:
   - Abre el archivo de Excel en Google Drive.
   - Ve a **Archivo > Guardar como Google Sheets** para convertirlo.

---

## **Pasos para Obtener el Archivo de LAFT desde el ERP**

1. **Accede al ERP Celucenter**:  
   Dirígete a [http://erp.celucenter.com/](http://erp.celucenter.com/).

2. **Generar el Reporte**:
   - Ve a **Reportes > Inventario > Actual**.
   - Genera el archivo **INVENTARIO ACTUAL - DATOS - PROECOM** en formato **XLS**.

3. **Subir a Google Drive**:
   - **Sube** el archivo **XLS** generado a tu Google Drive.
   - **Abre el archivo** y luego ve a **Archivo > Guardar como Google Sheets** para convertirlo.

4. **Renombrar el Archivo**:  
   Renombra la hoja a **`Lista General LAFT`** o el nombre que prefieras.

---

## **Proceso de Ejecución del Script**

Una vez que los archivos estén convertidos en Google Sheets y subidos a Google Drive, puedes proceder con el **script de importación**. Este script realizará lo siguiente:

- Importará los datos de las hojas **`BM`**, **`PROECOM`** y **`TODO`**.
- Procesará los archivos de acuerdo al nombre del archivo: si contiene **"bm"**, **"proecom"**, o **"todos"**, se asignarán a las hojas correspondientes del archivo principal.

---

### **Ejecutar el Script de Importación**

1. **Abre Google Sheets** donde has subido los archivos y habilita el editor de **Apps Script**.
2. Pega el siguiente código en el editor de Apps Script:

```javascript
function importarDesdeGoogleSheets() {
  var folderId = "ID_DE_TU_CARPETA";  // Reemplaza con el ID de tu carpeta
  var spreadsheetId = "ID_DE_TU_HOJA_DE_DESTINO";  // Reemplaza con el ID de tu archivo central
  var folderProcesadosId = "ID_DE_CARPETA_PROCESADOS";  // Reemplaza con el ID de tu carpeta de archivos procesados
  var ui = SpreadsheetApp.getUi();

  try {
    var folder = DriveApp.getFolderById(folderId);
    var folderProcesados = DriveApp.getFolderById(folderProcesadosId);
    var files = folder.getFilesByType(MimeType.GOOGLE_SHEETS);
    var procesados = 0;

    while (files.hasNext()) {
      var file = files.next();
      var fileName = file.getName().toLowerCase();
      var sheetNameDestino = "";

      // Determina a qué hoja de destino se asignará el archivo
      if (fileName.includes("bm")) {
        sheetNameDestino = "Lista General BM";
      } else if (fileName.includes("proecom")) {
        sheetNameDestino = "Lista General Ecom";
      } else if (fileName.includes("todos")) {
        sheetNameDestino = "Todo";
      } else {
        continue;
      }

      // Accede a la hoja de destino en el archivo central
      var spreadsheetDestino = SpreadsheetApp.openById(spreadsheetId);
      var sheetDestino = spreadsheetDestino.getSheetByName(sheetNameDestino);

      if (!sheetDestino) {
        ui.alert("No se encontró la hoja '" + sheetNameDestino + "' para el archivo: " + file.getName());
        continue;
      }

      // Abre el archivo origen y obtiene su primera hoja
      var ssOrigen = SpreadsheetApp.open(file);
      var sheetOrigen = ssOrigen.getSheets()[0];

      var numCols = fileName.includes("proecom") || fileName.includes("todos") ? 12 : 9;
      var numRows = sheetOrigen.getLastRow();
      var data = sheetOrigen.getRange(1, 1, numRows, numCols).getValues();

      // Limpia los contenidos actuales de la hoja de destino
      sheetDestino.clearContents();

      // Pega los datos importados desde la primera celda
      sheetDestino.getRange(1, 1, data.length, data[0].length).setValues(data);

      // Elimina las primeras dos filas (generalmente encabezados no necesarios)
      sheetDestino.deleteRows(1, 2);

      ui.alert("✅ Archivo importado:\n\n📄 " + file.getName() + "\n📌 Hoja: " + sheetNameDestino);

      // Mueve el archivo procesado a la subcarpeta "procesados"
      folderProcesados.addFile(file);
      folder.removeFile(file);
      ui.alert("📁 Archivo movido a la carpeta 'procesados'.");

      procesados++;
    }

    if (procesados === 0) {
      ui.alert("No se encontró ningún archivo que contenga 'BM', 'PROECOM' o 'TODOS' en el nombre.");
    }

  } catch (error) {
    ui.alert("❌ Error: " + error.message);
  }
}


Ejecuta el Script:

Puedes ejecutarlo manualmente desde el editor de Apps Script o configurar un desencadenador automático para que lo haga a intervalos regulares.

Verificación:

Después de la ejecución, los archivos serán importados y los datos se copiarán a las hojas correspondientes (BM, PROECOM, TODO).

Automatización (Opcional)
Si deseas que el script se ejecute automáticamente, sigue estos pasos:

En el editor de Apps Script, ve a Desplegar > Nueva implementación.

Configura un desencadenador en Desencadenadores > Añadir un desencadenador.

Elige que el script se ejecute de forma programada o basado en otros eventos, como la modificación de la hoja.

Conclusión
Este script permite importar de manera eficiente y automática los datos de BM, PROECOM y TODOS desde los archivos de Google Sheets a tu archivo central. También te permite gestionar los archivos descargados desde Telegram o el ERP Celucenter, asegurando que los datos se mantengan actualizados y organizados.
