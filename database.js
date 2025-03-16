const mongoose = require("mongoose");
require("dotenv").config(); // Cargar variables de entorno

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Conectado a MongoDB");

        // Importar modelos
        require("./models/Reservacion");
        require("./models/Mesa");
        require("./models/Horario");

        // Manejo de eventos de Mongoose
        mongoose.connection.on("disconnected", () => {
            console.warn("Conexión con MongoDB perdida. Intentando reconectar...");
        });

        mongoose.connection.on("reconnected", () => {
            console.log("Reconexion con MongoDB exitosa.");
        });

    } catch (error) {
        console.error("Error al conectar a MongoDB:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
