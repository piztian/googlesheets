# 📊 Google Sheets: Dashboards por Mes para Tiendas Retail

Este proyecto automatiza la creación, mantenimiento y visualización de dashboards mensuales por sucursal, con KPIs, proyecciones, formato condicional y gráficos personalizados. Todo funciona sobre Google Sheets con Google Apps Script.

---

## 📁 Carpeta del repositorio

🔗 [Ver en GitHub → dashboardmesesretails](https://github.com/piztian/googlesheets/tree/main/dashboardmesesretails)

---

## ⚙️ Scripts disponibles

| Script                                                        | Descripción                                                                                     | Archivos relacionados                                                                 |
|---------------------------------------------------------------|--------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------|
| `actualizarGraficosDashboardSucursal.gs`                     | Actualiza títulos y colores en los gráficos de la hoja `Dashboard`                              | [🔧 Código](./actualizarGraficosDashboardSucursal.gs) · [📄 Doc](./actualizarGraficosDashboardSucursal.md) |
| `actualizarTitulosGraficosTodasLasHojas.gs`                  | Aplica títulos y colores personalizados a todos los dashboards generados                        | [🔧 Código](./actualizarTitulosGraficosTodasLasHojas.gs) · [📄 Doc](./actualizarTitulosGraficosTodasLasHojas.md) |
| `copiarFormatoCondicionalDesdeColumnaB.gs`                   | Copia las reglas de formato condicional desde `B` hacia otras columnas (C-Z)                    | [🔧 Código](./copiarFormatoCondicionalDesdeColumnaB.gs) · [📄 Doc](./copiarFormatoCondicionalDesdeColumnaB.md) |
| `corregirGraficosReferenciasLocales.gs`                      | Corrige gráficos que aún apuntan a la hoja `Dashboard`, incluso si las hojas están ocultas      | [🔧 Código](./corregirGraficosReferenciasLocales.gs) · [📄 Doc](./corregirGraficosReferenciasLocales.md) |
| `evaluarRiesgoUltimos3MesesConTitulos.gs`                    | Evalúa el riesgo de cada sucursal basado en proyección vs promedio de los últimos 3 meses       | [🔧 Código](./evaluarRiesgoUltimos3MesesConTitulos.gs) · [📄 Doc](./evaluarRiesgoUltimos3MesesConTitulos.md) |
| `generarDashboardsDesdePlantilla.gs`                         | Genera o actualiza dashboards por tienda, incluyendo layout, KPIs y gráficos                     | [🔧 Código](./generarDashboardsDesdePlantilla.gs) · [📄 Doc](./generarDashboardsDesdePlantilla.md) |
| `generarLinksAHojasYOcultar.gs`                              | Genera una tabla con hipervínculos hacia cada hoja y oculta las no esenciales                   | [🔧 Código](./generarLinksAHojasYOcultar.gs) · [📄 Doc](./generarLinksAHojasYOcultar.md) |
| `enviarDashboardsPDFdesdeCarpetaPrincipal.gs`                | Exporta cada hoja de sucursal como PDF, lo guarda en Drive y envía el link por correo           | [🔧 Código](./enviarDashboardsPDFdesdeCarpetaPrincipal.gs) · [📄 Doc](./enviarDashboardsPDFdesdeCarpetaPrincipal.md) |

---

## 🧾 Otras secciones

- [`Dashboardinfo.md`](./Dashboardinfo.md): información general sobre el uso del dashboard, recomendaciones y estructura.

---

## 🛠️ Requisitos de estructura en Google Sheets

- **Dashboard**: hoja plantilla con KPIs, layout, gráficos y fórmulas
- **Tiendas**: lista de sucursales en `A2:A`, correos en `B2:B`
- **TotalMeses2025**: contiene la matriz de datos reales por mes y sucursal

---

## 📄 Créditos

Este repositorio fue desarrollado por [@piztian](https://github.com/piztian) para automatizar dashboards mensuales de rendimiento por tienda, con asistencia de [ChatGPT](https://chat.openai.com/).
