# 📥 Script: importarReportesYRespaldar()

Este script está diseñado para importar reportes en formato Google Sheets desde una carpeta de Drive, consolidarlos en una hoja mensual (ej. `Agosto25`), y luego mover los archivos procesados a una carpeta de respaldo. Al finalizar, ejecuta automáticamente la función `actualizarResumen()`.

---

## 🔧 ¿Qué hace?

1. Limpia completamente la hoja de destino antes de comenzar (`Agosto25`).
2. Procesa todos los archivos tipo **Google Sheets** que tengan la palabra `"Reporte"` en su nombre dentro de la carpeta de origen.
3. Inserta los datos de cada archivo en la hoja destino, omitiendo encabezados si ya hay contenido previo.
4. Mueve los archivos procesados a la carpeta de respaldo.
5. Pregunta si deseas eliminar los archivos `.xlsx` que no se procesaron.
6. Ejecuta automáticamente `actualizarResumen()` para actualizar la hoja `Resumen`.

---

## 📁 Configuración de carpetas

- **carpetaOrigenId**: contiene los archivos nuevos (Google Sheets).
- **carpetaDestinoId**: recibe los archivos procesados como respaldo.
- **sheetId**: ID del archivo principal de Google Sheets donde se consolidan los datos.

---

## 📄 Hoja de destino

- La variable `hojaDestinoNombre` debe contener el nombre de la pestaña donde se consolidarán los datos del mes (ej. `Agosto25`).
- Se limpia completamente antes de comenzar (`clearContents()`), incluyendo encabezados.

---

## 📌 Notas adicionales

- Solo procesa archivos tipo Google Sheets. Los `.xlsx` no se procesan, pero puede eliminarlos si se autoriza.
- Se ordenan los archivos por número de día ascendente (extraído del nombre del archivo).
- Llama a `actualizarResumen()` automáticamente al final.
- Muestra una alerta al usuario con la cantidad de archivos procesados.

---

## 🧪 Requisitos

- Los archivos a procesar deben tener `"Reporte"` en su nombre.
- Deben contener una hoja con datos comenzando en la fila 1 (encabezados incluidos).
- La hoja `actualizarResumen()` debe existir y estar correctamente definida para continuar el flujo.

---

## 📝 Última modificación

- Limpieza de hoja destino antes de importar datos.
- Validación y eliminación opcional de archivos `.xlsx` no compatibles.
- Ejecución automática de `actualizarResumen()` al finalizar.
