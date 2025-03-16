document.addEventListener("DOMContentLoaded", function () {
    function cambiarSeccion(seccion) {
        document.querySelectorAll(".seccion").forEach(sec => sec.classList.add("oculto"));
        const seccionActiva = document.getElementById(seccion);
        if (seccionActiva) {
            seccionActiva.classList.remove("oculto");
        } else {
            console.error(`La sección ${seccion} no existe en el DOM.`);
        }
    }

    // Hacer accesible la función globalmente
    window.cambiarSeccion = cambiarSeccion;

    // Mostrar la primera sección
    cambiarSeccion("inicio");

    // Eventos para botones
    document.getElementById("btn-iniciar").addEventListener("click", () => cambiarSeccion("formulario"));
    document.getElementById("btn-reservar").addEventListener("click", () => validarYEnviar());

    // Evento para redirigir al menú
    const btnMenu = document.getElementById("btn-menu");
    if (btnMenu) {
        btnMenu.addEventListener("click", () => {
            window.location.href = "menu.html";
        });
    }
});
