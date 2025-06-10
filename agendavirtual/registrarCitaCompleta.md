¡Claro! Aquí tienes un archivo `README.md` actualizado que describe todo lo que hace la nueva función `registrarCitaCompleta()`:

---

```markdown
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

```

Fecha	Hora	Paciente	Motivo	Duración	Estado	Importante	Color	Teléfono	(WhatsApp)

```

La columna WhatsApp se llena automáticamente con un `HYPERLINK` para enviar el recordatorio.

### Hoja: `Historial`

Encabezado sugerido:

```

Fecha	Hora	Paciente	Motivo	Estado	Notas

```

---

## ⚙️ Activador Automático

### Cómo configurarlo:

1. Abre `Extensiones > Apps Script`
2. Asegúrate de tener la función `registrarCitaCompleta()`
3. Abre el ícono del reloj 🕒 (activadores)
4. Crea uno nuevo con estas opciones:

| Campo                            | Selección                         |
|----------------------------------|------------------------------------|
| ¿Qué función ejecutar?           | `registrarCitaCompleta`            |
| ¿Fuente del evento?              | `Formulario`                       |
| ¿Tipo de evento?                 | `Al enviar formulario`             |

Esto hará que cada vez que alguien envíe el formulario, el sistema:
- Genere la cita en la Agenda
- Cree el enlace de WhatsApp
- Y registre en el Historial

---

## 💡 Beneficios

- Evita duplicados automáticamente
- No requiere intervención manual
- Funciona desde celular o computadora
- Totalmente adaptable a más campos, colores o símbolos

---

## 📦 Mejoras futuras opcionales

- Dashboard con citas del día o la semana
- Notificación por correo al recibir nueva cita
- Botón visual para registrar citas manualmente
- Exportación mensual del historial
```

---
