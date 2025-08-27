import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

/**
 * GET all achieved_goals
 */
router.get("/", async (req, res) => {
  try {
    const [results] = await pool.query(`
      SELECT ag.achieved_id, ag.user_id, u.fullname, ag.goal_id, g.title AS goal_title, ag.achieved_date, ag.reward
      FROM achieved_goals ag
      JOIN users u ON ag.user_id = u.user_id
      JOIN goals g ON ag.goal_id = g.goal_id
    `);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET all achieved_goals for a specific user
 */
router.get("/user/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const [results] = await pool.query(
      `
      SELECT ag.achieved_id, ag.user_id, u.fullname, ag.goal_id, g.title AS goal_title, ag.achieved_date, ag.reward
      FROM achieved_goals ag
      JOIN users u ON ag.user_id = u.user_id
      JOIN goals g ON ag.goal_id = g.goal_id
      WHERE ag.user_id = ?
      `,
      [user_id]
    );
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET achieved_goal by ID
 */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query(
      `
      SELECT ag.achieved_id, ag.user_id, u.fullname, ag.goal_id, g.title AS goal_title, ag.achieved_date, ag.reward
      FROM achieved_goals ag
      JOIN users u ON ag.user_id = u.user_id
      JOIN goals g ON ag.goal_id = g.goal_id
      WHERE ag.achieved_id = ?
      `,
      [id]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "Logro no encontrado" });
    }

    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * CREATE achieved_goal
 */
router.post("/", async (req, res) => {
  try {
    const { user_id, goal_id, reward } = req.body;

    const [result] = await pool.query(
      "INSERT INTO achieved_goals (user_id, goal_id, reward) VALUES (?, ?, ?)",
      [user_id, goal_id, reward || "star"]
    );

    res.status(201).json({ message: "Logro registrado", id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * UPDATE achieved_goal
 */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { reward } = req.body;

    const [result] = await pool.query(
      "UPDATE achieved_goals SET reward = ? WHERE achieved_id = ?",
      [reward, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Logro no encontrado" });
    }

    res.json({ message: "Logro actualizado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * DELETE achieved_goal
 */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      "DELETE FROM achieved_goals WHERE achieved_id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Logro no encontrado" });
    }

    res.json({ message: "Logro eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
