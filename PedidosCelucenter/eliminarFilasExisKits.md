# 🧹 Script: eliminarFilasExisKits()

## 🎯 Propósito

Este script filtra la hoja `"Exis Kits"` para conservar únicamente los productos relevantes y eliminar las filas que no cumplen ciertos criterios, sin afectar la estructura completa de la hoja.

Está diseñado para limpiar productos no deseados y preparar un reporte más claro, **manteniendo la cantidad de columnas y formato original de la hoja**.

---

## ✅ ¿Qué hace?

1. Verifica que exista la hoja `"Exis Kits"`.
2. Lee todos los datos actuales con `getDataRange().getValues()`.
3. Detecta el total de columnas actuales para evitar pérdida de estructura.
4. Filtra las filas de acuerdo a los siguientes criterios:
   - Mantiene la **fila 1** (encabezados).
   - Mantiene **solo las filas** que:
     - Tienen una **cantidad (columna C)** de `10 o más`.
     - El **nombre del producto (columna B)** termina en `"kit"` o `"iu"` (ignorando mayúsculas).
5. Rellena las filas filtradas con columnas vacías para igualar el ancho original.
6. Limpia solo el contenido (no fórmulas ni estructura) de la hoja desde la fila 2 hacia abajo.
7. Escribe las filas filtradas desde la fila 1 hacia abajo.
8. Muestra un resumen al usuario con los resultados.

---

## 📌 Criterios de filtrado

- `Cantidad (columna C)` debe ser mayor o igual a **10**
- `Producto (columna B)` debe terminar en:
  - `"kit"` o
  - `"iu"`

---

## 📁 Estructura asumida

| Columna | Contenido esperado             |
|---------|--------------------------------|
| A       | ID o código interno            |
| B       | Nombre del producto (kit/iu)   |
| C       | Cantidad solicitada            |
| D–Z     | Cualquier otro dato adicional  |

> ❗ Las columnas adicionales **no se eliminan ni se modifican**.

---

## 🧪 Salida esperada

- Hoja con solo productos relevantes visibles.
- Columnas completas preservadas.
- Filas eliminadas: todas las que no cumplan los criterios.
- Pop-up con el siguiente mensaje:

