# 🧼 Script: limpiarExisKits()

## 🎯 Propósito

Este script deja limpia y lista la hoja `"Exis Kits"` para una nueva carga de datos, eliminando tanto contenido como colores de fondo en rangos definidos. También se asegura de mostrar todas las filas ocultas para evitar que se quede información sin limpiar.

---

## 📋 Qué hace

1. Verifica que exista la hoja `"Exis Kits"`.
2. Obtiene la última fila con datos (`getLastRow()`).
3. Muestra todas las filas ocultas para garantizar una limpieza total.
4. Limpia contenido y colores de fondo en el rango:
   - `A2:W` (columnas 1–23)
5. Limpia contenido (sin tocar colores) en:
   - `Y2:Z` (columnas 25–26)
6. Muestra un `alert` con resumen del proceso.
7. Registra cada paso con `Logger.log()` para su revisión en el editor de Apps Script.

---

## 📁 Estructura esperada de la hoja

| Columna | Uso común             |
|---------|------------------------|
| A       | Código de producto     |
| B       | Nombre del producto    |
| C–W     | Cantidades por sucursal |
| X       | (Ignorada por el script) |
| Y–Z     | Totales u otros datos |

---

## 🧪 Consideraciones

- **Fila 1** suele contener encabezados.
- **Fila 2** contiene títulos secundarios o datos estáticos no eliminables.
- El script limpia desde **fila 2 hacia abajo**.

---

## 🧾 Resultados esperados

- Contenido y colores borrados desde `A2:W`.
- Contenido borrado desde `Y2:Z`.
- Todas las filas visibles.
- Se muestra un resumen como este:


---

## 🛡️ Seguridad

Este script **no elimina fórmulas fuera de los rangos mencionados**, ni afecta filas ocultas permanentemente. Su operación es reversible mediante `CTRL+Z` inmediatamente después de ejecutarlo si fue lanzado manualmente.

---

## 🚀 Uso sugerido

Este script es ideal como paso previo a importar nuevos pedidos, resúmenes o reportes por sucursal, para evitar datos mezclados de semanas anteriores.

Puede conectarse fácilmente a:
- Botón de dibujo en la hoja
- Menú personalizado de Apps Script
- Automatización semanal vía trigger
