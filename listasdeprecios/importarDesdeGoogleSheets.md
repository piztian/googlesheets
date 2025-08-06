# **Manual para Script de Importación de Archivos Google Sheets**

Este script se utiliza para importar archivos desde una carpeta de Google Drive a un archivo central de Google Sheets. Está diseñado para importar datos desde hojas específicas según el nombre del archivo. Los archivos que contienen **"BM"**, **"PROECOM"**, o **"TODOS"** en el nombre se asignan a sus respectivas hojas de destino en el archivo central.

## **Requisitos**
- Un archivo de Google Sheets central donde se pegarán los datos importados.
- Archivos en formato **Google Sheets** dentro de una carpeta de Google Drive.
- El script debe tener acceso a la carpeta de Google Drive y al archivo de Google Sheets de destino.

## **Pasos para usarlo**

### 1. **Configuración Inicial**
Antes de ejecutar el script, necesitas configurar los siguientes parámetros:

- **folderId**: ID de la carpeta donde están los archivos de Google Sheets que deseas importar.
- **spreadsheetId**: ID del archivo de Google Sheets donde se pegarán los datos.
- **folderProcesadosId**: ID de la subcarpeta donde se moverán los archivos una vez procesados.

```javascript
var folderId = "ID_DE_TU_CARPETA";  // Reemplaza con el ID de tu carpeta
var spreadsheetId = "ID_DE_TU_HOJA_DE_DESTINO";  // Reemplaza con el ID de tu archivo central
var folderProcesadosId = "ID_DE_CARPETA_PROCESADOS";  // Reemplaza con el ID de tu carpeta de archivos procesados

2. Descripción del Script
El script hace lo siguiente:

Obtiene todos los archivos en la carpeta de origen que sean de tipo Google Sheets.

Verifica si el nombre del archivo contiene alguna de las siguientes palabras:

"bm" → Asigna los datos a la hoja "Lista General BM".

"proecom" → Asigna los datos a la hoja "Lista General Ecom".

"todos" → Asigna los datos a la hoja "Todo".

Abre cada archivo y copia los datos a la hoja correspondiente en el archivo de Google Sheets central.

Elimina las dos primeras filas de los datos importados (normalmente encabezados o filas innecesarias).

Mueve el archivo procesado a la subcarpeta "procesados".

Muestra un mensaje de éxito o error.

3. Implementación y Ejecución
Para ejecutar el script, sigue estos pasos:

Abre el archivo Google Sheets donde está el script.

Ve a Extensiones > Apps Script.

Pega el código del script en el editor de Apps Script.

Guarda el script con un nombre (ej. "Importación Automática").

Ejecuta el script desde el editor de Apps Script o configura un desencadenador (trigger) para que se ejecute automáticamente.

4. Código Completo
javascript
Copy

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
5. Verificación y Solución de Errores
Si el script no está copiando correctamente los datos, verifica que las hojas de destino (Lista General BM, Lista General Ecom, Todo) existen y tienen el mismo nombre que el especificado en el código.

Si el archivo tiene un formato distinto o no puede ser abierto, revisa que todos los archivos en la carpeta sean archivos de Google Sheets.

6. Automatización (Opcional)
Si deseas que el script se ejecute automáticamente, sigue estos pasos:

En el editor de Apps Script, ve a Desplegar > Nueva implementación.

Configura un desencadenador en Desencadenadores > Añadir un desencadenador.

Elige que el script se ejecute de forma programada o basado en otros eventos, como la modificación de la hoja.

Conclusión
Este script te permitirá importar y organizar automáticamente los datos de los archivos BM, PROECOM y TODOS en tu archivo central. Puedes usarlo para gestionar de manera eficiente la importación de datos sin necesidad de intervención manual.


---

Puedes copiar y pegar este archivo `.md` en tu repositorio de GitHub. ¿Hay algo más que te gustaría agregar al manual o alguna duda sobre la implementación?
