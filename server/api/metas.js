import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

// =============================
// GET todas las metas
// =============================
router.get("/", async (req, res) => {
  try {
    const [results] = await pool.query("SELECT * FROM goals");
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// =============================
// POST - registrar meta alcanzada
// =============================
router.post("/achieved", async (req, res) => {
  try {
    const { user_id, goal_id } = req.body;

    // Verificar si ya existe (evitar duplicados)
    const [existing] = await pool.query(
      "SELECT * FROM achieved_goals WHERE user_id=? AND goal_id=?",
      [user_id, goal_id]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "Meta ya alcanzada previamente." });
    }

    await pool.query(
      "INSERT INTO achieved_goals (user_id, goal_id) VALUES (?, ?)",
      [user_id, goal_id]
    );

    res.json({ message: "Meta alcanzada registrada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// =============================
// GET metas alcanzadas de un usuario
// =============================
router.get("/achieved/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const [results] = await pool.query(
      `SELECT ag.achieved_id, g.title, g.description, ag.achieved_date
       FROM achieved_goals ag
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
