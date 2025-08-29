import { Router } from "express";
import { pool } from "../db.js";

const api = Router();

// GET all event participants
api.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM event_participants");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new event participant
api.post("/", async (req, res) => {
  const { user_id, event_id } = req.body;
  try {
    // verificar duplicado
    const [existing] = await pool.query(
      "SELECT * FROM event_participants WHERE user_id = ? AND event_id = ?",
      [user_id, event_id]
    );
    if (existing.length > 0) {
      return res.status(400).json({ error: "Ya estás inscrito en este evento" });
    }

    const [result] = await pool.query(
      "INSERT INTO event_participants (user_id, event_id) VALUES (?, ?)",
      [user_id, event_id]
    );
    res.status(201).json({ id: result.insertId, user_id, event_id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



export default api;
