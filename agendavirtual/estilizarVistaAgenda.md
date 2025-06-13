📄 estilizarVistaAgenda() – Estilizado visual para hoja VistaAgenda
Esta función aplica formato visual a la hoja VistaAgenda para mostrar una agenda tipo calendario, clara y responsiva. Incluye colores por día, ajuste de columnas, ocultamiento de filas de media hora, y estilo de encabezados.

🧩 ¿Qué hace?
Estiliza el encabezado (A1:E1):

Texto blanco, fondo azul, centrado, en negritas y con borde.

Estiliza la columna de horarios (A4:A49):

Fondo gris claro, texto alineado a la derecha, tamaño de fuente estándar.

Aplica colores personalizados por columna de día (B-E):

B = rojo bajito

C = amarillo

D = verde claro

E = azul claro

Ajusta tamaño de columnas y altura de filas:

Columnas B-E: 150px

Columna A: 70px

Filas 4 a 49: 32px alto

Oculta columnas sobrantes (F en adelante) y filas > 49

Oculta filas de media hora:

Oculta las filas impares de la 5 a la 31 (8:30, 9:30, ..., 22:30), dejando visibles solo las horas completas.

🛠️ Uso
Se invoca automáticamente desde la función principal ejecutarProcesoVistaAgendaCompleta(), pero también puede ejecutarse manualmente para volver a aplicar el formato.

🧠 Tips
El diseño está pensado para una hoja embebida en web pública.

Las filas ocultas se basan en que las horas completas comienzan desde la fila 4, con pasos de media hora.

El rango de fechas visible se ajusta con setColumnWidth y setRowHeight para buena compatibilidad móvil.
