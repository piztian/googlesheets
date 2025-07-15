# 📢 Script: mostrarPublicacionesEntreFechas

Este script recopila y muestra las publicaciones realizadas por sucursal dentro de un rango de fechas definido. Se utiliza para monitorear campañas o difusión de contenido desde una hoja llamada **"Repuestas"**.

---

## 🧩 Funcionalidad

- Toma fechas de inicio y fin desde las celdas `H2` e `I2` de la hoja activa.
- Lee los registros de publicaciones en la hoja **"Repuestas"**.
- Filtra las publicaciones dentro del rango especificado.
- Muestra los resultados en un `modal` con:
  - Detalle por publicación (Sucursal, Tipo, Link).
  - Resumen final indicando cuántas publicaciones hizo cada sucursal.
- Usa `Logger.log()` para registrar la actividad y depurar.

---

## 🗂️ Requisitos

- Hoja llamada **"Repuestas"** con al menos estas columnas:
  - `Timestamp` (fecha)
  - `Sucursal`
  - `Tipo de Publicación`
  - `Link de Publicación`

- Fechas de rango definidas en:
  - `H2`: Fecha inicio
  - `I2`: Fecha fin

---

## 🧠 Lógica del script

1. Lee las fechas de filtro (inicio y fin).
2. Convierte las fechas al formato `"yyyy-MM-dd"` para comparación.
3. Recorre todos los registros de la hoja "Repuestas".
4. Compara cada fecha con el rango solicitado.
5. Si está dentro del rango:
   - Agrega la publicación al listado general.
   - Suma +1 al contador de publicaciones por sucursal.
6. Muestra en pantalla:
   - Listado detallado por publicación.
   - Resumen compacto al final por sucursal.

---

## 🧾 Ejemplo de salida en el modal

```text
Hola, les paso el link del día *2025-07-15*:

📍 *Matriz*
🗂 Historia
🔗 https://instagram.com/p/ABC123

📍 *Tizapan*
🗂 Feed
🔗 https://facebook.com/post/XYZ789

---

📊 Resumen por sucursal:

📍 *Matriz* = 1 links registrados  
📍 *Tizapan* = 1 links registrados
