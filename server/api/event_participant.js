import { Router } from "express";
import { pool } from "../db.js";

const api = Router();

// GET all event participants
api.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM event_participant");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE a new participant
api.post("/", async (req, res) => {
  try {
    const { user_id, event_id } = req.body;

    if (!user_id || !event_id) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const [result] = await pool.query(
      "INSERT INTO event_participant (user_id, event_id) VALUES (?, ?)",
      [user_id, event_id]
    );

    res.status(201).json({ message: "Participante registrado", id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a participant by ID
api.delete("/:id", async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM event_participant WHERE event_participant_id = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Participante no encontrado" });
    }

    res.json({ message: "Participante eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default api;

