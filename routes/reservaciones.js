const express = require("express");
const router = express.Router();
const Reservacion = require("../models/Reservacion");
const Mesa = require("../models/Mesa");

// Obtener todas las reservaciones de una fecha específica
router.get("/", async (req, res) => {
    try {
        const { fecha } = req.query;

        if (!fecha) {
            return res.status(400).json({ error: "Se requiere una fecha para filtrar las reservaciones." });
        }

        const reservaciones = await Reservacion.find({ fecha });
        res.json(reservaciones);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las reservaciones." });
    }
});

// Crear una nueva reservación con asignación automática de mesa
router.post("/", async (req, res) => {
    try {
        const { fecha, hora, numero_personas, nombre_cliente, email, telefono, notas_adicionales } = req.body;

        // Buscar una mesa disponible que no esté reservada en esa fecha y hora
        const mesaDisponible = await Mesa.findOne({
            numero_comensales: { $gte: numero_personas },
            estatus: "ACTIVA",
            reservaciones: {
                $not: { $elemMatch: { fecha, hora, estatus: "RESERVADA" } }
            }
        });

        if (!mesaDisponible) {
            return res.status(400).json({ error: "No hay mesas disponibles para ese horario." });
        }

        // Contar las reservaciones existentes para generar un código único
        const totalReservaciones = await Reservacion.countDocuments();
        const codigo_reservacion = `RESERV${String(totalReservaciones + 1).padStart(2, "0")}`;

        // Crear la nueva reservación
        const nuevaReservacion = new Reservacion({
            codigo_reservacion,
            fecha,
            hora,
            mesa_asignada: mesaDisponible._id,
            numero_personas,
            nombre_cliente,
            email,
            telefono,
            notas_adicionales
        });

        await nuevaReservacion.save();

        // Actualizar la mesa y marcarla como reservada en ese horario
        mesaDisponible.reservaciones.push({ fecha, hora, estatus: "RESERVADA" });
        await mesaDisponible.save();

        // Responder con el código de reservación generado
        res.status(201).json({ mensaje: "Reservación creada con éxito", codigo_reservacion });
    } catch (error) {
        console.error("Error en la reservación:", error);
        res.status(500).json({ error: "Hubo un problema al registrar la reservación." });
    }
});

module.exports = router;
