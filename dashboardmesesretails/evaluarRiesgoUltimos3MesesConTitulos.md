# 📋 Script: Evaluación de riesgo por tienda basado en desempeño de los últimos 3 meses

Este script analiza los datos de utilidad mensual por tienda y proyecta su rendimiento actual comparado con su promedio de los últimos tres meses. Evalúa el **nivel de riesgo** de cada tienda y genera un reporte listo para copiar y compartir.

---

## 🧩 ¿Qué hace?

1. Calcula el porcentaje de avance del mes actual (por ejemplo, si hoy es 11 de julio → 11/31 ≈ 35%).
2. Obtiene la utilidad acumulada actual de cada tienda.
3. Proyecta esa utilidad para el mes completo usando el avance.
4. Calcula el **promedio de los últimos 3 meses anteriores al mes actual**.
5. Compara el rendimiento actual proyectado con el promedio histórico.
6. Clasifica el riesgo por tienda según el siguiente criterio:

| Comparación proyectada vs promedio | Riesgo               |
|------------------------------------|----------------------|
| < 60%                              | 🟥 Riesgo alto        |
| 60% - 89%                          | 🟧 Riesgo medio       |
| 90% - 110%                         | 🟨 Leve o al día      |
| > 110%                             | 🟩 Supera expectativa |
| Promedio = 0                       | ⚠️ Sin historial      |

---

## 🛠 Cómo usar

1. Abre tu Google Sheets con la hoja `TotalMeses2025`.
2. Asegúrate que:
   - Fila 1 contiene los nombres de los meses (`Jan`, `Feb`, ..., `Dec`)
   - Fila 2 contiene los nombres de las tiendas (una por columna)
   - Filas 3 a 14 contienen las utilidades mensuales (una fila por mes)
3. Ve a `Extensiones > Apps Script`.
4. Pega el script en un nuevo archivo `.gs`.
5. Ejecuta `evaluarRiesgoUltimos3MesesConTitulos()`.

---

## 💬 Resultado

El reporte aparecerá en un **popup** con el siguiente formato:

