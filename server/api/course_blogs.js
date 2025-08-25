import { Api } from "express";
import db from "../db.js";

const api = Api ();

// GET all
api.get("/", (req, res) => {
  db.query("SELECT * FROM course_blogs", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// CREATE
api.post("/", (req, res) => {
  const { type, title, content, user_id } = req.body;
  db.query(
    "INSERT INTO course_blogs (type, title, content, user_id) VALUES (?, ?, ?, ?)",
    [type, title, content, user_id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Entrada creada", id: result.insertId });
    }
  );
});

export default api;