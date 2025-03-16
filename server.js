const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
const { body, validationResult } = require("express-validator");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = "mongodb://localhost:27017/restaurante";

// Conectar a MongoDB antes de iniciar el servidor
mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("Conexión con MongoDB establecida correctamente en 'restaurante'");

        // Middleware de seguridad global
        app.use(
            helmet.contentSecurityPolicy({
                directives: {
                    defaultSrc: ["'self'"],
                    scriptSrc: ["'self'", "https://cdn.jsdelivr.net"],
                    styleSrc: ["'self'", "https://cdn.jsdelivr.net"],
                    connectSrc: ["'self'", "data:"], 
                },
            })
        ); // Protege contra ataques HTTP comunes
        app.use(mongoSanitize()); // Evita inyección de MongoDB (NoSQL)
        app.use(express.json()); // Habilita JSON en las solicitudes
        app.use(cors({ origin: "http://localhost:3000" })); // Permite CORS solo para este dominio

        // Configurar límite de solicitudes (Protege contra ataques de fuerza bruta)
        const limiter = rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutos
            max: 50, // Máximo 50 solicitudes por IP
            message: "Has realizado demasiadas solicitudes, intenta de nuevo más tarde."
        });
        app.use(limiter);

        //Servir archivos estáticos desde "public"
        const publicPath = path.join(__dirname, "public");
        app.use(express.static(publicPath));
        console.log(`Sirviendo archivos estáticos desde: ${publicPath}`);

        //Ruta principal
        app.get("/", (req, res) => {
            res.sendFile(path.join(publicPath, "formulario.html"));
        });

        //Rutas de la API
        try {
            app.use("/api/reservaciones", require("./routes/reservaciones"));
            app.use("/api/mesas", require("./routes/mesas"));
            app.use("/api/horarios", require("./routes/horarios"));
            console.log("Rutas de API cargadas correctamente");
        } catch (error) {
            console.error("Error cargando rutas de API:", error);
        }

        //Middleware para manejar rutas no encontradas (404)
        app.use((req, res) => {
            console.warn(`⚠️ Ruta no encontrada: ${req.originalUrl}`);
            res.status(404).json({ error: "Ruta no encontrada. Verifica la URL." });
        });

        //Iniciar el servidor
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en: http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("No se pudo conectar a MongoDB:", error);
        process.exit(1);
    });
