const express = require("express");
const router = express.Router();
const Horario = require("../models/Horario");

// Obtener todos los horarios desde la BD
router.get("/", async (req, res) => {
    try {
        const horarios = await Horario.find();
        res.json(horarios);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los horarios." });
    }
});

module.exports = router;
