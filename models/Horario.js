const mongoose = require("mongoose");

const HorarioSchema = new mongoose.Schema({
    dia: { type: String, enum: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"], required: true },
    hora_inicio: { type: String, required: true },
    hora_fin: { type: String, required: true },
    estatus: { type: String, enum: ["ABIERTO", "CERRADO"], default: "ABIERTO" }
});

module.exports = mongoose.model("Horario", HorarioSchema);
