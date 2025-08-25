import { Api } from "express";
import db from "../db.js";

const api = Api();

// GET all
api.get("/", (req, res) => {
  db.query("SELECT * FROM marketplace", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// CREATE
api.post("/", (req, res) => {
  const { user_id, business_name, description, category } = req.body;
  db.query(
    "INSERT INTO marketplace (user_id, business_name, description, category) VALUES (?, ?, ?, ?)",
    [user_id, business_name, description, category],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Marketplace creado", id: result.insertId });
    }
  );
});

export default api;