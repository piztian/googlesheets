Aquí tienes la documentación lista para tu archivo `.md`:

---

### `insertarLinksEncabezadoDesdeK()` – Hipervínculos dinámicos en encabezado de VistaAgenda

Esta función agrega hipervínculos automáticos en las celdas del encabezado de la hoja `VistaAgenda` (celdas `B1:E1`), permitiendo navegar rápidamente a la hoja del mes correspondiente y al día exacto.

#### Funcionalidades:

* Lee las fechas visibles en las celdas `B1:E1`.
* Para cada fecha:

  * Detecta el **día** y el **mes**.
  * Busca la hoja correspondiente (`Ene`, `Feb`, ..., `Dic`).
  * Calcula la columna del día dentro de la hoja mensual (`K` = día 1, `L` = día 2, ...).
  * Genera un `HYPERLINK()` con formato interno tipo:
    `=HYPERLINK("#gid=123456789&range=K1", "13/6/2025")`
  * Inserta la fórmula en el encabezado.

#### Requisitos:

* Las fechas deben estar convertidas a texto mediante `.setValues()` antes de ejecutar esta función.
* Las hojas mensuales deben estar nombradas con abreviaturas de 3 letras (`Ene`, `Feb`, etc.).
* Se asume que el **día 1 siempre inicia en la columna `K`** dentro de cada hoja mensual.

#### Utilidad:

* Mejora la navegación rápida para usuarios que consultan la agenda desde una vista pública o embed.
* Funciona como tabla de contenido automática para moverse entre fechas.

---

¿Te genero ahora la documentación para `anonimizarVistaAgenda()` también?
