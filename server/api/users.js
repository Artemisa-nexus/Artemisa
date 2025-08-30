import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

// =============================
// GET all users
// =============================
router.get("/users", async (req, res) => {
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

// =============================
// GET users by role (role_id = 1)
// =============================
router.get("/users/role/1", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE role_id = 1");

    if (rows.length === 0) {
      return res.status(404).json({ status: "error", message: "No se encontraron usuarios" });
    }

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

// =============================
// GET users by role (role_id = 2)
// =============================
router.get("/users/role/2", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE role_id = 2");
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

// =============================
// GET user by ID (ESTE VA AL FINAL)
// =============================
router.get("/users/:id", async (req, res) => {
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

// =============================
// POST - Crear usuario
// =============================
router.post("/users", async (req, res) => {
  try {
    const { fullname, identification, email, password_, role_id } = req.body;

    if (!fullname || !identification || !email || !password_ || !role_id) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    const [result] = await pool.query(
      "INSERT INTO users (fullname, identification, email, password_, role_id) VALUES (?, ?, ?, ?, ?)",
      [fullname, identification, email, password_, role_id]
    );

    res.status(201).json({
      user_id: result.insertId,
      fullname,
      identification,
      email,
      role_id
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

// =============================
// PUT - Actualizar usuario
// =============================
router.put("/users/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const { fullname, identification, email, password_ } = req.body;

    const [result] = await pool.query(
      "UPDATE users SET fullname = ?, identification = ?, email = ?, password_ = ? WHERE user_id = ?",
      [fullname, identification, email, password_, user_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "error",
        message: "Usuario no encontrado",
      });
    }

    res.json({
      user_id,
      fullname,
      identification,
      email
    });
  } catch (error) {
    console.error("Error en UPDATE:", error.message);
    res.status(500).json({
      status: "error",
      endpoint: req.originalUrl,
      method: req.method,
      message: error.message,
    });
  }
});

// =============================
// DELETE - Eliminar usuario
// =============================
router.delete("/users/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;

    const [result] = await pool.query(
      "DELETE FROM users WHERE user_id = ?",
      [user_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "error",
        message: "Usuario no encontrado",
      });
    }

    res.json({
      status: "ok",
      message: "Usuario eliminado",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      endpoint: req.originalUrl,
      method: req.method,
      message: error.message,
    });
  }
});

export default router;

