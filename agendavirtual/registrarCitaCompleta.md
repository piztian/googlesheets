# 📘 Agenda Psicológica Automatizada (Google Sheets + Forms + WhatsApp)

Este sistema permite automatizar completamente la gestión de citas desde un **formulario de Google**, registrarlas en una hoja `Agenda`, generar enlaces de WhatsApp, y mantener un historial de seguimiento.

---

## ✅ Función principal: `registrarCitaCompleta()`

### ¿Qué hace esta función?

1. Lee las respuestas de la hoja del formulario (por ejemplo, `"Formulario de citas"`).
2. **Copia los datos relevantes** a la hoja `Agenda`, reorganizados y sin duplicados.
3. Marca la cita como **Agendada**.
4. Si el paciente marcó `"importante"` = `"sí"`, agrega un **📌**.
5. Genera automáticamente un **enlace de WhatsApp** para recordatorio.
6. Agrega la cita a la hoja `Historial`, evitando duplicados.

---

## 🗂 Requisitos de hojas

### Hoja: `Formulario de citas` (respuestas automáticas)

Columnas esperadas:

- `Marca temporal`
- `Nombre del paciente`
- `Teléfono`
- `Fecha de la cita`
- `Hora de la cita`
- `Motivo de la cita`
- `Duración`
- `importante`

### Hoja: `Agenda` (estructura final)

Encabezado esperado:

