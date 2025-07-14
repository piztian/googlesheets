# 🧱 Script: Generar dashboards por tienda a partir de plantilla

Este script automatiza la creación, actualización y mantenimiento de hojas individuales por tienda a partir de una plantilla central (`Dashboard`). Además, permite **actualizar títulos y colores de gráficos** tras finalizar el proceso.

---

## 🧩 ¿Qué hace?

1. ✅ **Crea una hoja por tienda** con base en los nombres listados en la hoja `Tiendas!A2:A`.
2. ♻️ **Actualiza** las hojas ya existentes (las limpia y reconstruye).
3. 🗑️ **Elimina** hojas que no sean parte de:
   - La plantilla (`Dashboard`)
   - La hoja de tiendas (`Tiendas`)
   - La hoja de datos base (`TotalMeses2025`)
   - La lista de tiendas activas
4. 📋 **Copia encabezados**, fórmulas, KPIs y diseño desde la plantilla (`Dashboard`).
5. 📈 **Copia los gráficos** desde la hoja `Dashboard` hacia cada hoja de tienda.
6. ❓ **Pregunta al final** si deseas ejecutar el script adicional `actualizarTitulosGraficosTodasLasHojas()` para ajustar automáticamente los títulos y colores de gráficos en todas las hojas.

---

## 🧪 Cómo usar

1. Asegúrate de tener estas hojas:
   - `Dashboard` → plantilla visual (gráficos, layout, KPIs)
   - `Tiendas` → nombres de sucursales en `A2:A`
   - `TotalMeses2025` → datos de utilidad mensual
2. En `Extensiones > Apps Script`, agrega el script.
3. Ejecuta `generarDashboardsDesdePlantilla()`.
4. Confirma si deseas actualizar los gráficos automáticamente cuando se te pregunte.

---

## 📌 Estructura mínima esperada

| Hoja           | Contenido                                                                 |
|----------------|--------------------------------------------------------------------------|
| `Tiendas`      | Nombres de sucursal (`A2:A`)                                              |
| `Dashboard`    | Layout, KPIs, y gráficos de ejemplo (en `A4:M30`)                         |
| `TotalMeses2025`| Datos de utilidad mensual (col B-Z), meses en fila 1, tiendas en fila 2 |

---

## 💬 Resultado visual

Al finalizar:

- Se crean o actualizan hojas como `ATEQUIZA`, `ATOYAC`, `ZAPOTILTIC`, etc.
- Cada hoja contiene:
  - Encabezado de meses (B1:M1)
  - Nombre de sucursal (A1)
  - Fórmulas para utilidad y porcentaje (%)
  - Layout visual de la plantilla
  - KPIs dinámicos (B10:B16)
  - Gráficos (copiados desde Dashboard)

---

## ❓ Pregunta adicional

Al final, se muestra:

