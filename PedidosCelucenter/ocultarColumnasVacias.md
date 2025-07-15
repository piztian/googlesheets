# 📑 Script: ocultarColumnasVacias()

## 🎯 Propósito
Este script revisa una hoja de Google Sheets (en este caso, "Exis Kits") y **oculta las columnas** que no contienen información desde la **fila 3 en adelante**, lo que indica que ninguna sucursal hizo pedidos en esa columna. Además, muestra un resumen visual al usuario con las sucursales sin pedidos.

---

## 🛠️ Lógica paso a paso

1. Obtiene la hoja activa llamada `"Exis Kits"`.
2. Lee todos los datos usando `getDataRange().getValues()`.
3. Asume que:
   - Fila 1 = Nombre de la sucursal (cabecera de cada columna).
   - Fila 2 = Estado (por ejemplo, "Terminado").
   - Fila 3 en adelante = Pedidos o cantidades.
4. Recorre las columnas desde la columna 2 (índice 1), ya que la primera columna suele ser el código o nombre del producto.
5. Por cada columna, revisa si **todas las celdas desde fila 3 en adelante están vacías**:
   - Si es así, **oculta la columna completa**.
   - Agrega el nombre de la sucursal (fila 1 de esa columna) a una lista.
6. Al finalizar:
   - Muestra un `alert` con la cantidad de columnas ocultas.
   - Lista los nombres de las sucursales sin pedidos.
   - Registra los eventos en el `Logger`.

---

## 🧪 Requisitos de estructura de la hoja

| Fila | Descripción                          |
|------|--------------------------------------|
| 1    | Nombres de sucursales (ej. ATEQUIZA) |
| 2    | Estado o subtítulo (ej. "Terminado") |
| 3+   | Cantidades solicitadas               |

---

## 📤 Salida esperada

- ✅ Pop-up con mensaje como:



- 📋 Logs accesibles desde:
  `Ver > Registro` en el editor de Apps Script.

---

## 🔄 Mejoras sugeridas

- Agregar botón para mostrar todas las columnas ocultas.
- Agregar opción de exportar la lista de sucursales sin pedidos a una hoja nueva.

---

## 🔒 Seguridad

No modifica contenido, solo oculta visualmente columnas. Totalmente reversible.

---

## 📎 Uso

Puedes conectar este script a un botón en tu hoja con un dibujo de Google o desde el menú personalizado.
