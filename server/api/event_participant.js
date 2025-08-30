import { Router } from "express";
import { pool } from "../db.js";

const api = Router();

// GET all event participants
api.get("/event_participants", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM event_participants");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new event participant
api.post("/event_participants", async (req, res) => {
  const { user_id, event_id } = req.body;

  if (!user_id || !event_id) {
    return res.status(400).json({ error: "user_id y event_id son requeridos" });
  }

  try {
    // verify if user is already registered for the event
    const [existing] = await pool.query(
      "SELECT * FROM event_participants WHERE user_id = ? AND event_id = ?",
      [user_id, event_id]
    );
    if (existing.length > 0) {
      return res.status(400).json({ error: "Ya estás inscrito en este evento" });
    }

    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      const [result] = await conn.query(
        "INSERT INTO event_participants (user_id, event_id) VALUES (?, ?)",
        [user_id, event_id]
      );

      // substract the availability of the event
      const [update] = await conn.query(
        "UPDATE events SET available_capacity = available_capacity - 1 WHERE event_id = ? AND available_capacity > 0",
        [event_id]
      );

      if (update.affectedRows === 0) {
        await conn.rollback();
        return res.status(400).json({ error: "No hay cupos disponibles" });
      }

      await conn.commit();
      res.status(201).json({ id: result.insertId, user_id, event_id });
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default api;

