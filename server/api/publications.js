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
// CREATE publication
router.post("/publications", async (req, res) => {
  try {
    const { user_id, content, publication_date, reference_id } = req.body;

    // Validate required fields
    if (!user_id || !content) {
      return res.status(400).json({
        status: "error",
        message: "Missing required fields: user_id and content are mandatory"
      });
    }

    // If no date is provided, use current timestamp
    const pubDate = publication_date || new Date();

    // Insert publication into database
    const [result] = await pool.query(
      `INSERT INTO publications 
        (user_id, content, publication_date, reference_id) 
       VALUES (?, ?, ?, ?)`,
      [user_id, content, pubDate, reference_id || null]
    );

    // Fetch the newly created publication
    const [newPub] = await pool.query(
      "SELECT * FROM publications WHERE publication_id = ?",
      [result.insertId]
    );

    // Respond with success
    res.status(201).json({
      status: "ok",
      message: "Publication created successfully",
      publication: newPub[0],
    });
  } catch (error) {
    // Handle server/database errors
    res.status(500).json({
      status: "error",
      endpoint: req.originalUrl,
      method: req.method,
      message: error.message
    });
  }
});

// GET publication by ID
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
    const { user_id, content, publication_type, reference_id } = req.body;

    const [result] = await pool.query(
      "UPDATE publications SET user_id=?, content=?, publication_type=?, reference_id=? WHERE publication_id=?",
      [user_id, content, publication_type, reference_id, id]
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
