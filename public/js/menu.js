document.addEventListener("DOMContentLoaded", function () {
    const btnFormulario = document.getElementById("btn-formulario");
    if (btnFormulario) {
        btnFormulario.addEventListener("click", function () {
            window.location.href = "formulario.html";
        });
    }
});
