fetch("/banner_elsazon.html")
.then(response => response.text())
.then(html => {
    document.getElementById("banner-container").innerHTML = html;
})
.catch(error => console.error("Error al cargar el banner:", error));