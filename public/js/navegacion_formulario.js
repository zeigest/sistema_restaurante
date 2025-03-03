document.addEventListener("DOMContentLoaded", function () {
    function cambiarSeccion(seccion) {
        // Ocultar todas las secciones
        document.querySelectorAll(".seccion").forEach(sec => sec.classList.add("oculto"));

        // Mostrar la sección seleccionada
        document.getElementById(seccion).classList.remove("oculto");
    }

    // Asegurar que la primera sección sea visible al cargar la página
    cambiarSeccion("inicio");

    // Hacer la función accesible globalmente
    window.cambiarSeccion = cambiarSeccion;
});
