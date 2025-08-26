import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

// GET all objetivos
router.get("/", async (req, res) => {
  try {
    const [results] = await pool.query("SELECT * FROM objetivos");
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all objetivos for a specific meta
router.get("/meta/:meta_id", async (req, res) => {
  try {
    const { meta_id } = req.params;
    const [results] = await pool.query("SELECT * FROM objetivos WHERE meta_id = ?", [meta_id]);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET objetivo by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("SELECT * FROM objetivos WHERE objetivo_id = ?", [id]);

    if (result.length === 0) {
      return res.status(404).json({ message: "Objetivo no encontrado" });
    }

    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE objetivo
router.post("/", async (req, res) => {
  try {
    const { meta_id, title, description, due_date, status } = req.body;

    const [result] = await pool.query(
      "INSERT INTO objetivos (meta_id, title, description, due_date, status) VALUES (?, ?, ?, ?, ?)",
      [meta_id, title, description, due_date, status || "pending"]
    );

    res.status(201).json({ message: "Objetivo creado", id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE objetivo
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, due_date, status } = req.body;

    const [result] = await pool.query(
      "UPDATE objetivos SET title = ?, description = ?, due_date = ?, status = ? WHERE objetivo_id = ?",
      [title, description, due_date, status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Objetivo no encontrado" });
    }

    res.json({ message: "Objetivo actualizado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE objetivo
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query("DELETE FROM objetivos WHERE objetivo_id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Objetivo no encontrado" });
    }

    res.json({ message: "Objetivo eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
