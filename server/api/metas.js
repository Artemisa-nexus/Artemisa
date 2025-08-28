import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

// GET all metas
router.get("/", async (req, res) => {
  try {
    const [results] = await pool.query("SELECT * FROM goals");
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET meta by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("SELECT * FROM goals WHERE meta_id = ?", [id]);

    if (result.length === 0) {
      return res.status(404).json({ message: "Meta no encontrada" });
    }

    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE meta
router.post("/", async (req, res) => {
  try {
    const { user_id, title, description, due_date, status } = req.body;

    const [result] = await pool.query(
      "INSERT INTO metas (user_id, title, description, due_date, status) VALUES (?, ?, ?, ?, ?)",
      [user_id, title, description, due_date, status || 'not_started']
    );

    res.status(201).json({ message: "Meta creada", id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE meta
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, due_date, status } = req.body;

    const [result] = await pool.query(
      "UPDATE metas SET title = ?, description = ?, due_date = ?, status = ? WHERE meta_id = ?",
      [title, description, due_date, status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Meta no encontrada" });
    }

    res.json({ message: "Meta actualizada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE meta
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query("DELETE FROM metas WHERE meta_id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Meta no encontrada" });
    }

    res.json({ message: "Meta eliminada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
