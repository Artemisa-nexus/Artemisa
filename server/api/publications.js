import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

// GET all publicaciones
router.get("/publications", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM publications");
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



// CREATE publicacion
router.post("/publications", async (req, res) => {
  try {
    const { user_id, content, image, publication_date, reference_id } = req.body;

    if (!user_id || !content) {
      return res.status(400).json({
        status: "error",
        message: "Faltan campos obligatorios: user_id y content son requeridos"
      });
    }

    const pubDate = publication_date || new Date();

    const [result] = await pool.query(
      `INSERT INTO publications 
        (user_id, content, image, publication_date, reference_id) 
       VALUES (?, ?, ?, ?, ?)`,
      [user_id, content, image || null, pubDate, reference_id || null]
    );

    const [newPub] = await pool.query(
      "SELECT * FROM publications WHERE publication_id = ?",
      [result.insertId]
    );

    res.status(201).json({
      status: "ok",
      message: "Publicacion creada",
      publication: newPub[0]
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


// GET publicacion por ID
router.get("/publications/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [publication] = await pool.query(
      "SELECT * FROM publications WHERE publication_id = ?",
      [id]
    );

    if (publication.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Publicacion no encontrada"
      });
    }

    res.status(200).json({
      status: "ok",
      publication: publication[0]
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



// UPDATE publicacion
router.put("/publications/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, content, image, publication_type, reference_id } = req.body;

    const [result] = await pool.query(
      "UPDATE publications SET user_id=?, content=?, image=?, publication_type=?, reference_id=? WHERE publication_id=?",
      [user_id, content, image, publication_type, reference_id, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "error",
        message: "Publicacion no encontrada"
      });
    }

    res.json({
      status: "ok",
      message: "Publicacion actualizada correctamente"
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

// DELETE publicacion
router.delete("/publications/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query("DELETE FROM publications WHERE publication_id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "error",
        message: "Publicacion no encontrada"
      });
    }

    res.json({
      status: "ok",
      message: "Publicacion eliminada"
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