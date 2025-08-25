import { Api } from "express";
import db from "../db.js";

const api = Api();

// GET all metas
api.get("/", (req, res) => {
  db.query("SELECT * FROM metas", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET meta by ID
api.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM metas WHERE meta_id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ message: "Meta no encontrada" });
    res.json(result[0]);
  });
});

// CREATE meta
api.post("/", (req, res) => {
  const { user_id, title, description, due_date, status } = req.body;
  db.query(
    "INSERT INTO metas (user_id, title, description, due_date, status) VALUES (?, ?, ?, ?, ?)",
    [user_id, title, description, due_date, status || 'not_started'],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Meta creada", id: result.insertId });
    }
  );
});

// UPDATE meta
api.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, due_date, status } = req.body;
  db.query(
    "UPDATE metas SET title = ?, description = ?, due_date = ?, status = ? WHERE meta_id = ?",
    [title, description, due_date, status, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ message: "Meta no encontrada" });
      res.json({ message: "Meta actualizada" });
    }
  );
});

// DELETE meta
api.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM metas WHERE meta_id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Meta no encontrada" });
    res.json({ message: "Meta eliminada" });
  });
});

export default api;