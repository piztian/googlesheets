ejecutarProcesoVistaAgendaCompleta() – Generación integral de la vista pública de agenda
Este script ejecuta todo el flujo necesario para construir la hoja VistaAgenda a partir de los datos de la pestaña HOY, aplicando formato visual, anonimizando datos sensibles y generando enlaces útiles.

Pasos ejecutados:
Limpieza del contenido
Borra todo el contenido previo (sin afectar estilos ni dimensiones) de la hoja VistaAgenda.

Inserción de fórmulas temporales
Carga desde la hoja HOY los datos de encabezados, fechas, horarios y contenido de citas usando ARRAYFORMULA.

Conversión de fórmulas a texto
Convierte los valores obtenidos por fórmula a texto plano mediante .getDisplayValues() para permitir manipulación posterior sin perder datos.

Estilizado visual
Llama a estilizarVistaAgenda() para aplicar color de fondo, bordes, alineación, altura de filas y ocultar columnas innecesarias.

Hipervínculos en encabezado
Llama a insertarLinksEncabezadoDesdeK() para insertar hipervínculos en las celdas B1:E1 hacia las hojas mensuales correspondientes.

Anonimización de contenido
Llama a anonimizarVistaAgenda() para reemplazar cualquier texto en la agenda por la palabra "Ocupado", conservando formato y ubicación.

Compactar vista ocultando medias horas
Oculta filas impares entre la 5 y la 49 (ej. 5, 7, 9, ..., 49) para mostrar únicamente horarios en horas cerradas, haciendo la vista más compacta.

anonimizarVistaAgenda() – Reemplazo de datos sensibles
Esta función toma el bloque principal de contenido (B4:E49) y reemplaza cualquier celda no vacía con la palabra "Ocupado", con el objetivo de mostrar disponibilidad sin revelar detalles personales.
