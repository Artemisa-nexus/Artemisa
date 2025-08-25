import { Api } from "express";
import db from "../db.js";

const api = Api();

// GET all
api.get("/", (req, res) => {
  db.query("SELECT * FROM eventss", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET by id
api.get("/:id", (req, res) => {
  db.query("SELECT * FROM eventss WHERE event_id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result[0]);
  });
});

// CREATE
api.post("/", (req, res) => {
  const { event_name, description, category, event_date, city, organizer_id } = req.body;
  db.query(
    "INSERT INTO eventss (event_name, description, category, event_date, city, organizer_id) VALUES (?, ?, ?, ?, ?, ?)",
    [event_name, description, category, event_date, city, organizer_id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Evento creado", id: result.insertId });
    }
  );
});

// UPDATE
api.put("/:id", (req, res) => {
  const { event_name, description, category, event_date, city, organizer_id } = req.body;
  db.query(
    "UPDATE eventss SET event_name=?, description=?, category=?, event_date=?, city=?, organizer_id=? WHERE event_id=?",
    [event_name, description, category, event_date, city, organizer_id, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Evento actualizado" });
    }
  );
});

// DELETE
api.delete("/:id", (req, res) => {
  db.query("DELETE FROM eventss WHERE event_id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Evento eliminado" });
  });
});

export default api;