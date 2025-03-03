async function enviarReserva() {
    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;
    const numero_personas = document.getElementById("personas").value;
    const nombre_cliente = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const telefono = document.getElementById("telefono").value;
    const notas_adicionales = document.getElementById("notas").value;

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

    try {
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
            alert("Error: " + errorData.error || "No se pudo completar la reservación.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Hubo un problema al hacer la reservación.");
    }
}
