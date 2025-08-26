import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

// GET all products
router.get("/", async (req, res) => {
  try {
    const [results] = await pool.query("SELECT * FROM products");
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE product
router.post("/", async (req, res) => {
  try {
    const { marketplace_id, product_name, description, price, stock } = req.body;

    const [result] = await pool.query(
      "INSERT INTO products (marketplace_id, product_name, description, price, stock) VALUES (?, ?, ?, ?, ?)",
      [marketplace_id, product_name, description, price, stock]
    );

    res.status(201).json({ message: "Producto creado", id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
