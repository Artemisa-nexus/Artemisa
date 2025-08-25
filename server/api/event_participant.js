import { Api } from "express";
import db from "../db.js";

const api = Api ();

// GET all
api.get("/", (req, res) => {
  db.query("SELECT * FROM event_participant", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// CREATE
api.post("/", (req, res) => {
  const { user_id, event_id } = req.body;
  db.query(
    "INSERT INTO event_participant (user_id, event_id) VALUES (?, ?)",
    [user_id, event_id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Participante registrado", id: result.insertId });
    }
  );
});

// DELETE
api.delete("/:id", (req, res) => {
  db.query("DELETE FROM event_participant WHERE event_participant_id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Participante eliminado" });
  });
});

export default api;
