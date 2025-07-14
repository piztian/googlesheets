# 🔄 Script: Corregir gráficos que hacen referencia a la hoja "Dashboard"

Este script revisa todos los gráficos en las hojas de tienda y **reemplaza las referencias que apuntan a la hoja "Dashboard"** con referencias **locales (de la misma hoja)**. Esto es necesario cuando se duplican dashboards y los gráficos siguen apuntando a la hoja original.

---

## 🧩 ¿Qué hace?

1. Recorre todas las hojas del archivo, **excepto**:
   - `Dashboard`
   - `Tiendas`
   - `TotalMeses2025`
2. Detecta gráficos que tienen rangos vinculados a `Dashboard`.
3. Cambia esos rangos por el mismo rango (misma celda) pero **en la hoja actual**.
4. Aplica el cambio al gráfico.
5. Si una hoja está oculta, la muestra temporalmente para poder acceder a los gráficos.
6. Al finalizar, muestra un **resumen emergente (popup)** con las hojas donde se realizaron correcciones.

---

## 🧪 Cómo usar

1. Asegúrate de tener hojas como `ATEQUIZA`, `ATOYAC`, etc., copiadas desde `Dashboard`.
2. En `Extensiones > Apps Script`, pega este script.
3. Ejecuta la función `corregirGraficosReferenciasLocales()`.
4. El sistema revisará y corregirá cualquier referencia errónea en los gráficos.

---

## 🧠 Ejemplo típico

Si un gráfico en la hoja `ATEQUIZA` apunta a `Dashboard!B4:M30`, el script lo cambia por `ATEQUIZA!B4:M30`, manteniendo el diseño local.

---

## 🛡️ Hojas ignoradas

Estas hojas **no se revisan**:

- `Dashboard`
- `Tiendas`
- `TotalMeses2025`

Puedes modificar esta línea si necesitas incluir otras:

```javascript
const hojasIgnoradas = ["Dashboard", "Tiendas", "TotalMeses2025"];
