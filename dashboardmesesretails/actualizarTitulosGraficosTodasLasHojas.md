# 📊 Script: Actualización de títulos y colores en gráficos de todas las hojas de tienda

Este script en Google Apps Script actualiza automáticamente los **títulos** y **colores personalizados** de los gráficos en cada hoja de tienda de un archivo de Google Sheets.

## 🧩 ¿Qué hace exactamente?

- Recorre todas las hojas de la hoja de cálculo, **excepto** las hojas protegidas (`Dashboard`, `Tiendas`, `TotalMeses2025`).
- Para cada hoja (una por sucursal), busca los gráficos existentes.
- Modifica el **título del gráfico** con el nombre de la sucursal (obtenido desde la celda `A1`).
- Asigna colores personalizados a los gráficos:
  - Gráfico 1: `📊 Utilidad mensual` → Azul (`#4a90e2`)
  - Gráfico 2: `% frente mes pasado` → Naranja (`#f5a623`)
- Muestra un resumen en forma de alerta (popup) con las hojas en las que se hicieron cambios.
- Registra todos los pasos detalladamente en el `Logger` para fines de depuración.

---

## 🛠 Cómo usar

1. Abre tu Google Sheets con las hojas de tienda.
2. Ve a `Extensiones > Apps Script`.
3. Crea una nueva función y pega el contenido del script.
4. Ejecuta `actualizarTitulosGraficosTodasLasHojas()` desde el editor o asigna un botón si lo deseas.
5. Verifica el resumen en pantalla y revisa los `Logs` desde `Ver > Registro`.

---

## 📌 Requisitos

- Cada hoja de tienda debe tener el **nombre de la sucursal en la celda A1**.
- Cada hoja debe contener exactamente **2 gráficos**:
  1. Gráfico de utilidad mensual.
  2. Gráfico de porcentaje mensual.
- Solo se modifican hojas que **no estén en la lista de protegidas**:
  - `Dashboard`
  - `Tiendas`
  - `TotalMeses2025`

---

## 🧪 Ejemplo de resumen generado

