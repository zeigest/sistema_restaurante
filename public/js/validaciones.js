document.addEventListener("DOMContentLoaded", () => {
    setMinFecha();
    document.getElementById("fecha").addEventListener("change", generarOpcionesHoras);
});

function setMinFecha() {
    const hoy = new Date().toISOString().split("T")[0];
    document.getElementById("fecha").setAttribute("min", hoy);
}

async function generarOpcionesHoras() {
    const fechaSeleccionada = document.getElementById("fecha").value;
    if (!fechaSeleccionada) return;

    const diaSemana = obtenerDiaSemana(fechaSeleccionada);
    const selectHora = document.getElementById("hora");
    selectHora.innerHTML = ""; // Limpiar opciones previas

    try {
        const response = await fetch("/api/horarios");
        if (!response.ok) throw new Error("Error al obtener horarios");

        const horarios = await response.json();
        const horarioDia = horarios.find(h => h.dia === diaSemana && h.estatus === "ABIERTO");

        if (!horarioDia) {
            selectHora.innerHTML = `<option value="">CERRADO</option>`;
            return;
        }

        const opciones = generarIntervalosHorario(horarioDia.hora_inicio, horarioDia.hora_fin);
        opciones.forEach(hora => {
            let option = document.createElement("option");
            option.value = hora;
            option.textContent = hora;
            selectHora.appendChild(option);
        });

    } catch (error) {
        console.error("Error obteniendo horarios:", error);
    }
}

function obtenerDiaSemana(fecha) {
    const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    return dias[new Date(fecha).getDay()];
}

function generarIntervalosHorario(inicio, fin) {
    let horas = [];
    let [horaInicio] = inicio.split(":").map(Number);
    let [horaFin] = fin.split(":").map(Number);

    while (horaInicio < horaFin) {
        horas.push(`${horaInicio.toString().padStart(2, "0")}:00`);
        horaInicio++;
    }
    return horas;
}

function validarYEnviar() {
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefono = document.getElementById("telefono").value.trim();

    if (!validarNombre(nombre)) {
        alert("El nombre solo puede contener letras y espacios.");
        return;
    }
    if (!validarEmail(email)) {
        alert("Introduce un correo electrónico válido.");
        return;
    }
    if (!validarTelefono(telefono)) {
        alert("El teléfono debe contener 10 dígitos numéricos.");
        return;
    }

    enviarReserva();
}

function validarNombre(nombre) {
    return /^[a-zA-ZÀ-ÿ\s]+$/.test(nombre);
}

function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validarTelefono(telefono) {
    return /^\d{10}$/.test(telefono);
}
