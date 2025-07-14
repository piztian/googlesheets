# 🔗 Script: Generar links a hojas y ocultar pestañas no protegidas

Este script automatiza dos tareas clave para el mantenimiento de tu archivo de Google Sheets:

1. **Genera una tabla de hipervínculos en la hoja "Dashboard"** con accesos rápidos a cada hoja (excepto las protegidas).
2. **Oculta todas las hojas** no protegidas del usuario, para mantener limpio y enfocado el entorno de trabajo.

---

## 🧩 ¿Qué hace exactamente?

- Limpia el área `A19:B` en la hoja `Dashboard`.
- Recorre todas las hojas del archivo.
- Si la hoja **no** está en la lista de hojas protegidas:
  - Inserta su nombre en la columna A.
  - Inserta un hipervínculo (`HYPERLINK`) en la columna B que apunta a esa hoja.
  - La oculta para evitar que aparezca en las pestañas inferiores.
- Si la hoja **sí** está protegida (`Dashboard`, `Tiendas`, `TotalMeses2025`), se asegura de que permanezca **visible**.

---

## ✏️ Estructura de tabla generada

| A (Hoja)   | B (Link)             |
|-----------|----------------------|
| Tuxpan    | `Ir a Tuxpan` (clic) |
| Atoyac    | `Ir a Atoyac`        |
| Zapotiltic| `Ir a Zapotiltic`    |
| ...       | ...                  |

---

## 🧪 Cómo usar

1. Abre tu archivo de Google Sheets.
2. Ve a `Extensiones > Apps Script`.
3. Crea un nuevo archivo `.gs` y pega el script.
4. Ejecuta la función `generarLinksAHojasYOcultar()` desde el editor.
5. Verifica:
   - En `Dashboard` los links nuevos.
   - Las demás hojas ocultas.
   - Logs detallados en `Ver > Registro` (opcional).

---

## 📌 Requisitos

- Debe existir una hoja llamada `Dashboard`.
- La celda de inicio para la tabla es la fila **19** (`A19:B`).
- El nombre de cada hoja se usará como identificador visible.
- El script usa el método `sheet.getSheetId()` para vincular de forma precisa a cada pestaña.

---

## 🛑 Hojas protegidas por defecto

Estas no se ocultan y se mantienen visibles:

- `Dashboard`
- `Tiendas`
- `TotalMeses2025`

Puedes modificar la lista en la línea:

```javascript
const hojasProtegidas = ["Dashboard", "Tiendas", "TotalMeses2025"];


🔄 Iniciando generación de links y ocultamiento de hojas no protegidas...
📄 Total de hojas encontradas: 27
✅ Link generado para hoja 'ATEQUIZA' en fila 20.
🙈 Hoja 'ATEQUIZA' oculta del usuario.
...

