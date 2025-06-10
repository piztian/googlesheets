# 📘 Agenda Psicológica Automatizada (Google Sheets + Forms)

Este sistema permite gestionar citas de forma automática desde un **formulario de Google**, registrarlas en una hoja `Agenda`, generar enlaces de WhatsApp, y mantener un historial completo.

---

## ✅ Funcionalidades

- Registro automático de citas desde Google Forms.
- Copiado inteligente a hoja `Agenda` con columnas organizadas.
- Generación automática de enlaces de WhatsApp para recordatorio.
- Registro de la cita en hoja `Historial` (evita duplicados).
- Compatible con colores, símbolos (📌) y estado `"Agendada"` por defecto.
- Activador que se ejecuta automáticamente con cada envío del formulario.

---

## 🗂 Estructura de hojas

### 1. Hoja: `Formulario de citas` (respuestas del form)
Debe tener estas columnas:

- `Marca temporal`
- `Nombre del paciente`
- `Teléfono`
- `Fecha de la cita`
- `Hora de la cita`
- `Motivo de la cita`
- `Duración`
- `importante`

### 2. Hoja: `Agenda`
Encabezados esperados:


### 3. Hoja: `Historial`
Encabezados esperados:


---

## 🧠 Script principal: `registrarCitaCompleta()`

Ubicado en Apps Script vinculado a la hoja. Esta función:

1. Toma nuevas entradas del formulario.
2. Las copia ordenadas en `Agenda`.
3. Genera enlace de WhatsApp en la última columna.
4. Registra la cita en `Historial` si no está repetida.

---

## ⚙️ Activador automático

### Cómo configurarlo:

1. Abre `Extensiones > Apps Script`
2. Crea el activador desde el icono de reloj 🕒
3. Configura así:

| Campo                     | Valor                         |
|--------------------------|-------------------------------|
| Función a ejecutar       | `registrarCitaCompleta`       |
| Fuente del evento        | `Formulario`                  |
| Tipo de evento           | `Al enviar formulario`        |

Esto permitirá que todo el flujo funcione automáticamente con cada nuevo envío del formulario.

---

## ✨ Recomendaciones

- Asegúrate de que los nombres de las hojas estén correctamente escritos.
- No borres columnas en `Agenda` o `Historial` sin revisar el script.
- Puedes personalizar mensajes de WhatsApp, agregar colores o alertas.

---

## 💬 ¿Mejoras futuras?

- Notificaciones por correo.
- Botón manual para actualizar Agenda desde la hoja.
- Dashboard resumen de citas por semana.

---
