async function enviarReserva() {
    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;
    const numero_personas = document.getElementById("personas").value;
    const nombre_cliente = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const notas_adicionales = document.getElementById("notas").value.trim();

    // Validación básica antes de proceder con la reserva
    if (!fecha || !hora || !numero_personas || !nombre_cliente || !email || !telefono) {
        alert("Por favor, completa todos los campos obligatorios.");
        return;
    }

    try {
        // Verificar si ya existe una reservación en ese horario antes de enviarla
        const checkResponse = await fetch(`http://localhost:3000/api/reservaciones?fecha=${fecha}`);
        if (!checkResponse.ok) throw new Error("Error al verificar disponibilidad.");

        const reservaciones = await checkResponse.json();
        const horarioOcupado = reservaciones.some(res => res.hora === hora);

        if (horarioOcupado) {
            alert("Este horario ya está reservado. Por favor, elige otro.");
            return;
        }

        // Construir el objeto de la reservación
        const reservacion = {
            fecha,
            hora,
            numero_personas,
            nombre_cliente,
            email,
            telefono,
            notas_adicionales
        };

        // Enviar la nueva reservación
        const response = await fetch("http://localhost:3000/api/reservaciones", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(reservacion)
        });

        if (response.ok) {
            const data = await response.json();
            document.getElementById("codigo-reserva").textContent = data.codigo_reservacion;
            cambiarSeccion("confirmacion");
        } else {
            const errorData = await response.json();
            alert("Error: " + (errorData.error || "No se pudo completar la reservación."));
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Hubo un problema al hacer la reservación.");
    }
}
