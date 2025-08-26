import { Router } from "express";
import { pool } from "../db.js";

const api = Router();

// GET all events
api.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM events");
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

// GET event by ID
api.get("/:id", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM events WHERE event_id = ?", [
      req.params.id,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Evento no encontrado" });
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

// CREATE event
api.post("/", async (req, res) => {
  try {
    const {
      event_name,
      description,
      category,
      event_date,
      city,
      organizer_id,
    } = req.body;

    if (
      !event_name ||
      !description ||
      !category ||
      !event_date ||
      !city ||
      !organizer_id
    ) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const [result] = await pool.query(
      "INSERT INTO events (event_name, description, category, event_date, city, organizer_id) VALUES (?, ?, ?, ?, ?, ?)",
      [event_name, description, category, event_date, city, organizer_id]
    );

    res.status(201).json({ message: "Evento creado", id: result.insertId });
  } catch (error) {
    res.status(500).json({
      status: "error",
      endpoint: req.originalUrl,
      method: req.method,
      message: error.message,
    });
  }
});

// UPDATE event
api.put("/:id", async (req, res) => {
  try {
    const {
      event_name,
      description,
      category,
      event_date,
      city,
      organizer_id,
    } = req.body;

    const [result] = await pool.query(
      "UPDATE events SET event_name=?, description=?, category=?, event_date=?, city=?, organizer_id=? WHERE event_id=?",
      [event_name, description, category, event_date, city, organizer_id, req.params.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Evento no encontrado" });

    res.json({ message: "Evento actualizado" });
  } catch (error) {
    res.status(500).json({
      status: "error",
      endpoint: req.originalUrl,
      method: req.method,
      message: error.message,
    });
  }
});

// DELETE event
api.delete("/:id", async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM events WHERE event_id = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Evento no encontrado" });

    res.json({ message: "Evento eliminado" });
  } catch (error) {
    res.status(500).json({
      status: "error",
      endpoint: req.originalUrl,
      method: req.method,
      message: error.message,
    });
  }
});

export default api;
