document.addEventListener("DOMContentLoaded", () => {
    setMinFecha();
    document.getElementById("fecha").addEventListener("change", generarOpcionesHoras);
    document.getElementById("hora").addEventListener("change", verificarHabilitacion);
    document.getElementById("personas").addEventListener("change", verificarHabilitacion);
    verificarHabilitacion();
});

function setMinFecha() {
    const hoy = new Date().toISOString().split("T")[0];
    const fechaInput = document.getElementById("fecha");
    
    fechaInput.setAttribute("min", hoy);
    fechaInput.value = hoy;
    generarOpcionesHoras();
}

async function generarOpcionesHoras() {
    const fechaSeleccionada = document.getElementById("fecha").value;
    if (!fechaSeleccionada) return;

    const diaSemana = obtenerDiaSemana(fechaSeleccionada);
    const selectHora = document.getElementById("hora");
    selectHora.innerHTML = "";
    try {
        //Obtener los horarios disponibles según el día de la semana
        const responseHorarios = await fetch("/api/horarios");
        if (!responseHorarios.ok) throw new Error("Error al obtener horarios");

        const horarios = await responseHorarios.json();
        const horarioDia = horarios.find(h => h.dia === diaSemana);

        //Si el restaurante está cerrado, bloquear todo y mostrar "CERRADO"
        if (!horarioDia || horarioDia.estatus === "CERRADO") {
            selectHora.innerHTML = `<option value="CERRADO">CERRADO</option>`;
            selectHora.style.backgroundColor = "#8B0000";
            selectHora.style.color = "white";
            selectHora.style.fontWeight = "bold";
            verificarHabilitacion(false, false);
            return;
        }


        const responseReservaciones = await fetch(`/api/reservaciones?fecha=${fechaSeleccionada}`);
        if (!responseReservaciones.ok) throw new Error("Error al obtener reservaciones");

        const reservaciones = await responseReservaciones.json();
        const horasReservadas = reservaciones.map(res => res.hora); // Extraer solo las horas reservadas

        // Obtener horarios disponibles
        const hoy = new Date();
        const fechaReserva = new Date(fechaSeleccionada + "T00:00:00");
        let horaActual = hoy.getHours();

        let horaInicio = parseInt(horarioDia.hora_inicio.split(":")[0]);
        let horaFin = parseInt(horarioDia.hora_fin.split(":")[0]);

        // Si la fecha es hoy, limitar horarios a partir de la siguiente hora disponible
        if (hoy.toISOString().split("T")[0] === fechaReserva.toISOString().split("T")[0]) {
            horaInicio = Math.max(horaInicio, horaActual + 1);
        }

        // Generar opciones de hora en formato "HH:00"
        const opciones = generarIntervalosHorario(
            horaInicio.toString().padStart(2, "0") + ":00",
            horaFin.toString().padStart(2, "0") + ":00"
        ).filter(hora => !horasReservadas.includes(hora));

        if (opciones.length === 0) {
            selectHora.innerHTML = `<option value="NO DISPONIBLE">NO DISPONIBLE</option>`;
            verificarHabilitacion(false, false);
        } else {
            opciones.forEach(hora => {
                let option = document.createElement("option");
                option.value = hora;
                option.textContent = hora;
                selectHora.appendChild(option);
            });
            verificarHabilitacion(true, false);
        }

        selectHora.style.backgroundColor = "";
        selectHora.style.color = "";
        selectHora.style.fontWeight = "normal";


    } catch (error) {
        console.error("Error obteniendo horarios:", error);
    }
}

// Función para habilitar/deshabilitar campos según las condiciones
function verificarHabilitacion(horaHabilitada = false, datosHabilitados = false) {
    const horaSeleccionada = document.getElementById("hora").value;
    const personas = document.getElementById("personas").value;
    const habilitarDatos = personas > 0 && horaSeleccionada !== "CERRADO" && horaSeleccionada !== "NO DISPONIBLE";

    document.getElementById("hora").disabled = !horaHabilitada;
    document.getElementById("personas").disabled = !horaHabilitada; 
    document.getElementById("nombre").disabled = !habilitarDatos;
    document.getElementById("email").disabled = !habilitarDatos;
    document.getElementById("telefono").disabled = !habilitarDatos;
    document.getElementById("notas").disabled = !habilitarDatos;

    const btnReservar = document.getElementById("btn-reservar") || document.getElementById("btn-disabled");
    btnReservar.disabled = !habilitarDatos;
    
    // Cambiar el ID para modificar la apariencia según el estado
    if (!habilitarDatos) {
        btnReservar.id = "btn-disabled";
    } else {
        btnReservar.id = "btn-reservar";
    }
}

document.getElementById("hora").addEventListener("change", () => {
    const horaSeleccionada = document.getElementById("hora").value;
    verificarHabilitacion(true, horaSeleccionada !== "");
});


function obtenerDiaSemana(fecha) {
    const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    return dias[(new Date(fecha).getDay() + 1) % 7];
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
 //Validaciones previas al envio
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