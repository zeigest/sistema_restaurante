const express = require("express");
const path = require("path");
const connectDB = require("./database");

const app = express();
const PORT = 3000;

// Conectar a MongoDB
connectDB();

// Middleware para interpretar JSON en las solicitudes
app.use(express.json());

// Servir archivos estáticos desde la carpeta "public"
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

console.log(`Sirviendo archivos estáticos desde: ${publicPath}`);

app.get("/", (req, res) => {
    res.sendFile(path.join(publicPath, "formulario.html"));
});

// Rutas de la API
app.use("/api/reservaciones", require("./routes/reservaciones"));
app.use("/api/mesas", require("./routes/mesas"));
app.use("/api/horarios", require("./routes/horarios"));

// Middleware para manejar archivos no encontrados (404)
app.use((req, res, next) => {
    res.status(404).send("Archivo no encontrado. Verifica la ruta.");
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`);
});
