const mongoose = require("mongoose");
require("dotenv").config(); // Cargar variables de entorno

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("🟢 Conectado a MongoDB");

        // Importar modelos para que se creen en la base de datos si no existen
        require("./models/Reservacion");
        require("./models/Mesa");
        require("./models/Horario");

    } catch (error) {
        console.error("🔴 Error al conectar a MongoDB:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
