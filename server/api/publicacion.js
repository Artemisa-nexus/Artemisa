import express from "express";
import db from "../db.js";

const api = express.Api();


// GET all publicaciones
api.get("/", (req, res) => {
  db.query("SELECT * FROM publicacion", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});


// GET publicación by ID
api.get("/:id", (req, res) => {
  db.query(
    "SELECT * FROM publicacion WHERE publication_id=?",
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(404).json({ message: "No encontrada" });
      res.json(results[0]);
    }
  );
});


// CREATE publicación
api.post("/", (req, res) => {
  const { user_id, content, publication_type, reference_id } = req.body;
  db.query(
    "INSERT INTO publicacion (user_id, content, publication_type, reference_id) VALUES (?, ?, ?, ?)",
    [user_id, content, publication_type, reference_id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Publicación creada", id: result.insertId });
    }
  );
});


// UPDATE publicación
api.put("/:id", (req, res) => {
  const { user_id, content, publication_type, reference_id } = req.body;
  db.query(
    "UPDATE publicacion SET user_id=?, content=?, publication_type=?, reference_id=? WHERE publication_id=?",
    [user_id, content, publication_type, reference_id, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Publicación actualizada correctamente" });
    }
  );
});


// DELETE publicación
api.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM publicacion WHERE publication_id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Publicación eliminada" });
    }
  );
});

export default api;