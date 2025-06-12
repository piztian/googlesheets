Claro, aquí tienes una explicación clara y bien estructurada del script `agregarLinksDesdeTablaDatos()` lista para documentarse en un archivo `.md`:

---

```markdown
# 📌 Script: `agregarLinksDesdeTablaDatos`

Este script genera automáticamente hipervínculos en una hoja de calendario tipo "lineal" en Google Sheets, enlazando cada día numérico con la hoja correspondiente al mes (por ejemplo, `Jun`, `Jul`, etc.), posicionando la vista en la columna del día correspondiente.

---

## 🧠 ¿Para qué sirve?

Cuando tienes un calendario como el siguiente:

```

A         | B | C | D | E | F | ...
\----------|---|---|---|---|---
Enero     | D | L | M | M | J | ...
Febrero   | 1 | 2 | 3 | 4 | 5 | ...
...

```

El script busca en cada celda numérica (1–31), identifica:

- A qué mes corresponde (columna A)
- Qué día del mes es (valor numérico)
- La **letra de columna** en la hoja destino (por ejemplo, `1 → K`, `2 → L`...)

Todo esto lo hace usando una **tabla auxiliar** en la hoja `Datos`.

---

## 📋 Requisitos

- Una hoja llamada `Lineal` con el calendario.
- Una hoja llamada `Datos` con dos columnas:

| Día | Columna |
|-----|---------|
| 1   | K       |
| 2   | L       |
| ... | ...     |
| 31  | AO      |

- Hojas con nombres abreviados de meses (`Ene`, `Feb`, `Mar`, ..., `Dic`) que serán el destino del hipervínculo.

---

## 🔧 ¿Qué hace el script?

1. Lee la tabla de equivalencia Día → Columna desde la hoja `Datos`.
2. Recorre cada fila de la hoja `Lineal` (Enero a Diciembre).
3. Si encuentra un número del 1 al 31:
   - Busca el nombre del mes en la columna A.
   - Usa la tabla `Datos` para saber a qué letra de columna corresponde ese día.
   - Obtiene el `gid` (ID interno) de la hoja del mes.
   - Crea un hipervínculo usando `=HYPERLINK("#gid=...&range=Letra1", "día")`.
   - Aplica el fondo verde y una nota (tooltip) para mayor visibilidad.

---

## 🧪 Resultado

Al ejecutar el script, todas las celdas numéricas se convierten en enlaces que llevan directamente a:

- La hoja del mes
- La columna del día correspondiente (ej. `Jun!K1` para día 1)

---

## 🛡 Consideraciones

- Funciona incluso si los días están como texto (ej. `"5"`), gracias al uso de `parseInt()`.
- Si el valor no es numérico, se ignora.
- Si no hay coincidencia en la hoja `Datos`, también se ignora.

---

## ▶️ Ejecución

Desde el editor de Apps Script, selecciona:

```

agregarLinksDesdeTablaDatos

```

Y haz clic en **"Ejecutar"**.

---

## ✅ Recomendación

Ejecutar este script **después de insertar o actualizar el calendario**, para regenerar los hipervínculos actualizados.

```

---

¿Quieres que lo incluya en el archivo `.md` completo con título, autor y versión también?
