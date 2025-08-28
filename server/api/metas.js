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


// POST - guardar meta alcanzada
router.post("/achieved", async (req, res) => {
  try {
    const { user_id, goal_id} = req.body;

    // Verificar si ya existe
    const [existing] = await pool.query(
      "SELECT * FROM achieved_goals WHERE user_id=? AND goal_id=?",
      [user_id, goal_id]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "Meta ya alcanzada previamente." });
    }

    await pool.query(
      "INSERT INTO achieved_goals (user_id, goal_id) VALUES (?, ?);",
      [user_id, goal_id]
    );

    res.json({ message: "Meta alcanzada registrada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - obtener metas alcanzadas por usuario
router.get("/achieved/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const [results] = await pool.query(
      `SELECT ag.achieved_id, g.title, g.description, ag.achieved_date FROM achieved_goals ag
       JOIN goals g ON ag.goal_id = g.goal_id
       WHERE ag.user_id = ?`,
      [user_id]
    );

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export default router;
