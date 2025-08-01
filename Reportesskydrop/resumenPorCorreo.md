# 📊 Script: resumenPorCorreo()

Este script está diseñado para generar un resumen agrupado por correo electrónico a partir de una hoja mensual (ej. `Junio25`) y colocarlo en la hoja llamada `Resumen`.

---

## 🚀 ¿Qué hace?

1. Solicita al usuario el nombre de la hoja origen (ej. `Junio25`).
2. Agrupa los datos por correo (`CORREOS`) y suma:
   - `MONTO_PAGADO_OW`
   - `CARGO_ZONAEXTENDIDA`
3. Omitirá cualquier registro con el correo `torresfregoso@gmail.com`.
4. Escribe el resumen en las columnas:
   - **K**: Hoja origen
   - **L**: Monto total
   - **M**: Cargos totales
   - **N**: Correo
   - **O**: Fecha más reciente (de columna D)
   - **P**: Sucursal (extraída del nombre de correo)

---

## 🧠 Lógica de Sucursal

La columna `P` aplica esta fórmula automáticamente:

```excel
=ARRAYFORMULA(IF(N2:N<>"", LEFT(N2:N, FIND("@", N2:N)-1), ""))
