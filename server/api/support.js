import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

//GET all supports
router.get("/", async (req, res) => {
    try{
        const [rows] = await pool.query("SELECT * FROM support");
        res.json(rows); 
    } catch (error) {
        res.status(500).json({
            status: "error",
            endpoint: req.originalUrl,
            method: req.method,
            message: error.message
        });
    }
});

//GET support by ID
router.get("/:id", async (req, res) => {
    try{
        const { id } = req.params;
        const [rows] = await pool.query("SELECT * FROM support WHERE support_id = ?", [id]);

        if (rows.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "Support no encontrado"
            });
        }

        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({
            status: "error",
            endpoint: req.originalUrl,
            method: req.method,
            message: error.message
        });
    }
});

//CREATE support
router.post("/", async (req, res) => {
    try{
        const {support_name, description, email} = req.body;

        if (!support_name || !description || !email) {
            return res.status(400).json({
                status: "error",
                message: "Faltan campos obligatorios"
            });
        }

        const [result] = await pool.query(
            "INSERT INTO support (support_name, description, email) VALUES (?, ?, ?)",
            [support_name, description, email]
        );

        res.status(201).json({
            status: "ok",
            message: "Support creado",
            support_id: result.insertId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            endpoint: req.originalUrl,
            method: req.method,
            message: error.message
        });
    }
});

export default router;