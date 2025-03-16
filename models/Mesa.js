const mongoose = require("mongoose");

const MesaSchema = new mongoose.Schema({
    nombre_mesa: { type: String, required: true },
    estatus: { type: String, enum: ["ACTIVA", "INACTIVA"], default: "ACTIVA" },
    numero_comensales: { type: Number, required: true },
    reservaciones: [{
        fecha: String,
        hora: String,
        estatus: { type: String, enum: ["RESERVADA", "DISPONIBLE"], default: "DISPONIBLE" }
    }]
});

module.exports = mongoose.model("Mesa", MesaSchema);
