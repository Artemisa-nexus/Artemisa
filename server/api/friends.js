import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

// GET all friends
router.get("/", async (req, res) => {
  try {
    const [results] = await pool.query("SELECT * FROM friends");
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE (enviar solicitud)
router.post("/", async (req, res) => {
  try {
    const { user_id, friend_id } = req.body;
    const [result] = await pool.query(
      "INSERT INTO friends (user_id, friend_id) VALUES (?, ?)",
      [user_id, friend_id]
    );
    res.status(201).json({ message: "Solicitud enviada", id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE (aceptar/rechazar)
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const [result] = await pool.query(
      "UPDATE friends SET status=?, accepted_date=IF(?='accepted', NOW(), NULL) WHERE friendship_id=?",
      [status, status, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Amistad no encontrada" });
    }

    res.json({ message: "Estado actualizado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM friends WHERE friendship_id=?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Amistad no encontrada" });
    }

    res.json({ message: "Amistad eliminada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

