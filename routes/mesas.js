const express = require("express");
const router = express.Router();
const Mesa = require("../models/Mesa");

//  Crear una nueva mesa
router.post("/", async (req, res) => {
    try {
        const nuevaMesa = new Mesa(req.body);
        await nuevaMesa.save();
        res.status(201).json(nuevaMesa);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//  Obtener todas las mesas
router.get("/", async (req, res) => {
    try {
        const mesas = await Mesa.find();
        res.json(mesas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//  Actualizar una mesa
router.put("/:id", async (req, res) => {
    try {
        const mesa = await Mesa.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(mesa);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//  Eliminar una mesa
router.delete("/:id", async (req, res) => {
    try {
        await Mesa.findByIdAndDelete(req.params.id);
        res.json({ message: "Mesa eliminada" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
