const mongoose = require("mongoose");

const ReservacionSchema = new mongoose.Schema({
    codigo_reservacion: { type: String, unique: true, required: true },
    estatus: { type: String, enum: ["ACTIVA", "CANCELADA", "COMPLETADA"], default: "ACTIVA" },
    fecha: { type: String, required: true },
    hora: { type: String, required: true },
    mesa_asignada: { type: mongoose.Schema.Types.ObjectId, ref: "Mesa" }, // Relación con la mesa asignada
    numero_personas: { type: Number, required: true },
    nombre_cliente: { type: String, required: true },
    email: { type: String, required: true },
    telefono: { type: String },
    notas_adicionales: { type: String }
});

module.exports = mongoose.model("Reservacion", ReservacionSchema);
