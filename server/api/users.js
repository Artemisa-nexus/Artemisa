import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

// GET all users
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
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

// GET user by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM users WHERE user_id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ status: "error", message: "Usuario no encontrado" });
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


// POST crear usuario
router.post("/", async (req, res) => {
  try {
    const { fullname, identification, email, password_ } = req.body;

    if (!fullname || !identification || !email || !password_) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    const [result] = await pool.query(
      "INSERT INTO users (fullname, identification, email, password_, role_id ) VALUES (?, ?, ?, ?, ?)",
      [fullname, identification, email, password_, 1]
    );

    res.status(201).json({      fullname,
      identification,
      email,
      password_,
      role_id: 1
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});


// UPDATE user
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { fullname, identification, email, password } = req.body;

    const [result] = await pool.query(
      "UPDATE users SET fullname=?, identification=?, email=?, password=? WHERE user_id=?",
      [fullname, identification, email, password, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ status: "error", message: "Usuario no encontrado" });
    }

    res.json({ status: "ok", message: "Usuario actualizado" });
  } catch (error) {
    res.status(500).json({
      status: "error",
      endpoint: req.originalUrl,
      method: req.method,
      message: error.message
    });
  }
});

// DELETE user
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query("DELETE FROM users WHERE user_id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ status: "error", message: "Usuario no encontrado" });
    }

    res.json({ status: "ok", message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({
      status: "error",
      endpoint: req.originalUrl,
      method: req.method,
      message: error.message
    });
  }
});

export default router;
