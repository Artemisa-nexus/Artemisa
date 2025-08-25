// routes/users.routes.js
import { Api } from "express";
import db from "../db.js";

const api = Api();

// GET all
api.get("/", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET by id
api.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM users WHERE user_id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result[0]);
  });
});

// CREATE
api.post("/", (req, res) => {
  const { name, identification, email, password } = req.body;
  db.query(
    "INSERT INTO users (name, identification, email, password) VALUES (?, ?, ?, ?)",
    [name, identification, email, password],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Usuario creado", id: result.insertId });
    }
  );
});

// UPDATE
api.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, identification, email, password } = req.body;
  db.query(
    "UPDATE users SET name=?, identification=?, email=?, password=? WHERE user_id=?",
    [name, identification, email, password, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Usuario actualizado" });
    }
  );
});

// DELETE
api.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM users WHERE user_id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Usuario eliminado" });
  });
});

export default api;
