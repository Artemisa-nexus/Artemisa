import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

// GET all publicaciones
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM publicacion");
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

// GET publicación by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM publicacion WHERE publication_id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Publicación no encontrada"
      });
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

// CREATE publicación
router.post("/", async (req, res) => {
  try {
    const { user_id, content, publication_type, reference_id } = req.body;

    if (!user_id || !content || !publication_type) {
      return res.status(400).json({
        status: "error",
        message: "Faltan campos obligatorios"
      });
    }

    const [result] = await pool.query(
      "INSERT INTO publicacion (user_id, content, publication_type, reference_id) VALUES (?, ?, ?, ?)",
      [user_id, content, publication_type, reference_id]
    );

    res.status(201).json({
      status: "ok",
      message: "Publicación creada",
      publication_id: result.insertId
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      endpoint: req.originalUrl,
      method: req.method,
      message: error.message
    });
  }
});

// UPDATE publicación
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, content, publication_type, reference_id } = req.body;

    const [result] = await pool.query(
      "UPDATE publicacion SET user_id=?, content=?, publication_type=?, reference_id=? WHERE publication_id=?",
      [user_id, content, publication_type, reference_id, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "error",
        message: "Publicación no encontrada"
      });
    }

    res.json({
      status: "ok",
      message: "Publicación actualizada correctamente"
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      endpoint: req.originalUrl,
      method: req.method,
      message: error.message
    });
  }
});

// DELETE publicación
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query("DELETE FROM publicacion WHERE publication_id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "error",
        message: "Publicación no encontrada"
      });
    }

    res.json({
      status: "ok",
      message: "Publicación eliminada"
    });
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
