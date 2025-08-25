import { Api } from "express";
import db from "../db.js";

const api = Api();

// GET all
api.get("/", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// CREATE
api.post("/", (req, res) => {
  const { marketplace_id, product_name, description, price, stock } = req.body;
  db.query(
    "INSERT INTO products (marketplace_id, product_name, description, price, stock) VALUES (?, ?, ?, ?, ?)",
    [marketplace_id, product_name, description, price, stock],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Producto creado", id: result.insertId });
    }
  );
});

export default api;
