# 📄 enviarDashboardsPDFdesdeCarpetaPrincipal.gs

Este script exporta cada hoja de sucursal como PDF, la guarda en una carpeta de Google Drive, genera un enlace de solo lectura y lo envía por correo al responsable de cada tienda. Al finalizar, muestra un resumen con los links enviados.

---

## ✅ ¿Qué hace este script?

1. Lee nombres de sucursal y correos desde la hoja `Tiendas` (columnas A y B).
2. Para cada sucursal:
   - Muestra temporalmente la hoja si está oculta.
   - Exporta la hoja como PDF.
   - Asigna nombre al archivo tipo: `Sucursal_Dashboard_14 Julio.pdf`.
   - Guarda el archivo en la carpeta `DashboardsPDF`.
   - Configura el archivo como visible con enlace (sólo lectura).
   - Envía un correo al gerente con el link.
   - Oculta de nuevo la hoja si era necesario.
3. Muestra un resumen en un modal con los links enviados.
4. Escribe logs detallados en el registro de ejecución.

---

## 📂 Requisitos

- Hoja `Tiendas` con esta estructura:

| A           | B                     |
|-------------|------------------------|
| ATEQUIZA    | ventas@atequiza.com    |
| CIUDAD GUZMAN | gerente@guzman.mx    |

- Carpeta en Google Drive con nombre: `DashboardsPDF`  
  ID esperada: `16E5mVX4S-X981epzO6fHCrRn3pE8-xcd`

---

## 🛡️ Permisos requeridos

Este script requiere permisos para:
- Leer y exportar hojas de cálculo (`SpreadsheetApp`)
- Acceder a archivos en Drive (`DriveApp`)
- Realizar peticiones externas (`UrlFetchApp`)
- Enviar correos (`GmailApp`)

---

## 📤 Ejemplo de correo enviado

