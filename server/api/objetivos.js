import { Api } from "express";
import db from "../db.js";

const api = Api();

// GET all objetivos
api.get("/", (req, res) => {
  db.query("SELECT * FROM objetivos", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET all objetivos for a specific meta
api.get("/meta/:meta_id", (req, res) => {
    const { meta_id } = req.params;
    db.query("SELECT * FROM objetivos WHERE meta_id = ?", [meta_id], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  });

// GET objetivo by ID
api.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM objetivos WHERE objetivo_id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ message: "Objetivo no encontrado" });
    res.json(result[0]);
  });
});

// CREATE objetivo
api.post("/", (req, res) => {
  const { meta_id, title, description, due_date, status } = req.body;
  db.query(
    "INSERT INTO objetivos (meta_id, title, description, due_date, status) VALUES (?, ?, ?, ?, ?)",
    [meta_id, title, description, due_date, status || 'pending'],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Objetivo creado", id: result.insertId });
    }
  );
});

// UPDATE objetivo
api.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, due_date, status } = req.body;
  db.query(
    "UPDATE objetivos SET title = ?, description = ?, due_date = ?, status = ? WHERE objetivo_id = ?",
    [title, description, due_date, status, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ message: "Objetivo no encontrado" });
      res.json({ message: "Objetivo actualizado" });
    }
  );
});

// DELETE objetivo
api.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM objetivos WHERE objetivo_id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Objetivo no encontrado" });
    res.json({ message: "Objetivo eliminado" });
  });
});

export default api;