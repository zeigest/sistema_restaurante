const express = require("express");
const router = express.Router();
const Horario = require("../models/Horario");

//  Obtener todos los horarios
router.get("/", async (req, res) => {
    try {
        const horarios = await Horario.find();
        res.json(horarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//  Crear un nuevo horario
router.post("/", async (req, res) => {
    try {
        const nuevoHorario = new Horario(req.body);
        await nuevoHorario.save();
        res.status(201).json(nuevoHorario);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
