import { Api } from "express";
import db from "../db.js";

const api = Api();

// GET all
api.get("/", (req, res) => {
  db.query("SELECT * FROM friends", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// CREATE (enviar solicitud)
api.post("/", (req, res) => {
  const { user_id, friend_id } = req.body;
  db.query(
    "INSERT INTO friends (user_id, friend_id) VALUES (?, ?)",
    [user_id, friend_id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Solicitud enviada", id: result.insertId });
    }
  );
});

// UPDATE (aceptar/rechazar)
api.put("/:id", (req, res) => {
  const { status } = req.body;
  db.query(
    "UPDATE friends SET status=?, accepted_date=IF(?='accepted', NOW(), NULL) WHERE friendship_id=?",
    [status, status, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Estado actualizado" });
    }
  );
});

// DELETE
api.delete("/:id", (req, res) => {
  db.query("DELETE FROM friends WHERE friendship_id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Amistad eliminada" });
  });
});

export default api;
