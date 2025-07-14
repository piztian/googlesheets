# 🎨 Script: Copiar formato condicional desde columna B a otras columnas

Este script permite copiar las **reglas de formato condicional** aplicadas a un rango de celdas en la columna **B** hacia otras columnas (por defecto de **C a Z**), manteniendo el rango de filas definido por el usuario.

---

## 🧩 ¿Qué hace?

1. Solicita al usuario dos inputs:
   - Fila de inicio del rango de referencia
   - Fila de fin del rango de referencia
2. Busca reglas de formato condicional aplicadas a la columna **B** en ese rango (por ejemplo, `B18:B30`).
3. Copia esas mismas reglas a cada columna desde **C hasta Z**, manteniendo el rango de filas (ej. `C18:C30`, `D18:D30`, ...).
4. Muestra un resumen en pantalla al finalizar.
5. Registra todo el proceso en el `Logger` para facilitar la depuración.

---

## ✏️ Ejemplo de uso

Supón que tienes una regla condicional en `B18:B30` para resaltar celdas menores a cierto valor.

Al correr el script y elegir:
- Fila de inicio: `18`
- Fila de fin: `30`

El script copiará esa regla a:

