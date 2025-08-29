import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

// ======================
// GET all volunteer_orgs
// ======================
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM volunteer_orgs");
    res.json(rows);
  } catch (error) {
    res.status(500).json({
      status: "error",
      endpoint: req.originalUrl,
      method: req.method,
      message: error.message,
    });
  }
});

// ======================
// GET volunteer_org by ID
// ======================
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      "SELECT * FROM volunteer_orgs WHERE volunteer_org_id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Organización no encontrada",
      });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({
      status: "error",
      endpoint: req.originalUrl,
      method: req.method,
      message: error.message,
    });
  }
});

// ======================
// POST create volunteer_org
// ======================
router.post("/", async (req, res) => {
  try {
    const {
      business_name,
      tax_id,
      legal_representative_name,
      legal_representative_id,
      email,
      phone,
      city,
    } = req.body;

    if (
      !business_name ||
      !tax_id ||
      !legal_representative_name ||
      !legal_representative_id ||
      !email ||
      !phone ||
      !city
    ) {
      return res.status(400).json({ message: "Faltan datos obligatorios" });
    }

    const [result] = await pool.query(
      `INSERT INTO volunteer_orgs 
      (business_name, tax_id, legal_representative_name, legal_representative_id, email, phone, city) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        business_name,
        tax_id,
        legal_representative_name,
        legal_representative_id,
        email,
        phone,
        city,
      ]
    );

    res.status(201).json({
      volunteer_org_id: result.insertId,
      business_name,
      tax_id,
      legal_representative_name,
      legal_representative_id,
      email,
      phone,
      city,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

// ======================
// PUT update volunteer_org
// ======================
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      business_name,
      tax_id,
      legal_representative_name,
      legal_representative_id,
      email,
      phone,
      city,
    } = req.body;

    const [result] = await pool.query(
      `UPDATE volunteer_orgs 
       SET business_name = ?, tax_id = ?, legal_representative_name = ?, legal_representative_id = ?, 
           email = ?, phone = ?, city = ?
       WHERE volunteer_org_id = ?`,
      [
        business_name,
        tax_id,
        legal_representative_name,
        legal_representative_id,
        email,
        phone,
        city,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "error",
        message: "Organización no encontrada",
      });
    }

    res.json({
      volunteer_org_id: id,
      business_name,
      tax_id,
      legal_representative_name,
      legal_representative_id,
      email,
      phone,
      city,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      endpoint: req.originalUrl,
      method: req.method,
      message: error.message,
    });
  }
});

// ======================
// DELETE volunteer_org
// ======================
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      "DELETE FROM volunteer_orgs WHERE volunteer_org_id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "error",
        message: "Organización no encontrada",
      });
    }

    res.json({
      status: "ok",
      message: "Organización eliminada",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      endpoint: req.originalUrl,
      method: req.method,
      message: error.message,
    });
  }
});

export default router;
