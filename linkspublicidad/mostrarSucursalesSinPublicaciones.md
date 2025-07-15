# 📢 Script: mostrarSucursalesSinPublicaciones

Este script analiza los registros de publicaciones por tienda en una hoja de respuestas (`Repuestas`) y muestra cuáles sucursales **no han publicado** en un rango de fechas definido en celdas `H2` (inicio) e `I2` (fin).

---

## 🧩 Funcionalidad

- Lee el listado completo de sucursales predefinidas.
- Lee los registros de publicaciones realizados por tienda.
- Filtra los que caen en el rango definido por el usuario.
- Identifica qué sucursales **no han hecho publicaciones** en ese periodo.
- Muestra un mensaje en un `modal` con los nombres de dichas sucursales.
- También registra en `Logger` información útil para depuración o auditoría.

---

## 🗂️ Requisitos

- Hoja llamada **"Repuestas"** con al menos las columnas:  
  - `Timestamp` (fecha de publicación)  
  - `Sucursal` (nombre de la sucursal que publicó)

- Hoja activa con fechas en:
  - `H2`: Fecha de inicio del filtro
  - `I2`: Fecha de fin del filtro

---

## 📦 Variables clave

| Variable                   | Propósito                                                        |
|---------------------------|------------------------------------------------------------------|
| `SUCURSALES`              | Lista estática de todas las sucursales esperadas                |
| `hojaRespuestas`          | Referencia a la hoja "Repuestas"                                |
| `inicio` / `fin`          | Fechas obtenidas de `H2` e `I2`                                 |
| `fechaInicio` / `fechaFin`| Fechas formateadas en `yyyy-MM-dd` para comparación             |
| `data`                    | Todos los datos de la hoja "Repuestas"                          |
| `idxFecha` / `idxSucursal`| Índices de columnas `Timestamp` y `Sucursal`                    |
| `sucursalesConPublicaciones` | `Set` de sucursales que sí tienen publicaciones en ese rango |
| `sinPublicaciones`        | Array con las sucursales que **no aparecen** en los registros   |

---

## 🧠 Lógica paso a paso

1. Se define la lista completa de sucursales.
2. Se obtienen las fechas ingresadas por el usuario (`H2` e `I2`).
3. Se lee la hoja "Repuestas" para obtener datos de publicaciones.
4. Se verifica que las columnas `Timestamp` y `Sucursal` existan.
5. Se recorre cada fila, validando si la fecha cae dentro del rango.
6. Se construye un `Set` con las sucursales que sí tienen publicaciones.
7. Se compara con la lista total de sucursales y se identifican las que faltan.
8. Se genera un mensaje claro y se muestra en un `modal` con `textarea`.
9. Toda la información también se registra en el `Logger`.

---

## 🧪 Ejemplo de salida (modal)



---

## 🧰 Uso del script

Este script puede ejecutarse desde el editor de Apps Script o vincularse a un botón en la hoja activa. Ideal para monitorear campañas, cumplimiento por tienda o rendimiento publicitario.

---

## 🔍 Depuración

El script incluye múltiples `Logger.log()` con:
- Fechas de filtro
- Columnas detectadas
- Cantidad de filas leídas
- Sucursales con y sin publicaciones

Puedes ver estos logs en:  
📁 **Ver → Registro (Logs)** desde el editor de Google Apps Script.

---

## ✅ Autoría y mejoras

Este script puede ampliarse para:
- Enviar notificaciones por correo o WhatsApp
- Aplicar formato condicional en otra hoja
- Registrar histórico de sucursales inactivas

