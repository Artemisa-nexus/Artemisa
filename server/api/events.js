// routes/events.js
import { Router } from "express";
import { pool } from "../db.js";
import multer from "multer";

const api = Router();

// Multer en memoria (guardamos buffer para LONGBLOB)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ---- Helpers ----
const toIntOrDefault = (v, d = 0) => {
  if (v === undefined || v === null) return d;
  const n = parseInt(v, 10);
  return Number.isNaN(n) ? d : n;
};

// ========================
// GET all events
// ========================
api.get("/events", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT event_id, event_name, description, category, event_date, city, organizer_id,
              max_capacity, available_capacity,
              image IS NOT NULL AS has_image
       FROM events`
    );
    const events = rows.map(evt => ({
      ...evt,
      image: evt.has_image ? `/events/${evt.event_id}/image` : null
    }));
    res.json(events);
  } catch (error) {
    console.error("GET /events error:", error);
    res.status(500).json({ message: error.message });
  }
});

// ========================
// GET event by ID
// ========================
api.get("/events/:id", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT event_id, event_name, description, category, event_date, city, organizer_id,
              max_capacity, available_capacity,
              image IS NOT NULL AS has_image
       FROM events WHERE event_id = ?`,
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ message: "Evento no encontrado" });

    const evt = rows[0];
    evt.image = evt.has_image ? `/events/${evt.event_id}/image` : null;
    delete evt.has_image;
    res.json(evt);
  } catch (error) {
    console.error(`GET /events/${req.params.id} error:`, error);
    res.status(500).json({ message: error.message });
  }
});

// ========================
// GET event image
// ========================
api.get("/events/:id/image", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT image FROM events WHERE event_id = ?", [req.params.id]);
    if (rows.length === 0 || !rows[0].image) return res.status(404).send("Imagen no encontrada");

    // Nota: si permites png/jpg distintos, podrías guardar content-type en DB o detectarlo. Aquí asumimos jpeg.
    res.setHeader("Content-Type", "image/jpeg");
    res.send(rows[0].image);
  } catch (error) {
    console.error(`GET /events/${req.params.id}/image error:`, error);
    res.status(500).json({ message: error.message });
  }
});

// ========================
// CREATE event (con cupos + imagen)
// ========================
api.post("/events", upload.single("image"), async (req, res) => {
  try {
    // Log para depuración (borra en producción si quieres)
    console.log("POST /events req.body =", req.body);
    console.log("POST /events req.file =", !!req.file ? { size: req.file.size, mimetype: req.file.mimetype } : null);

    // Extraer campos (vienen como strings desde FormData)
    const {
      event_name,
      description = null,
      category = null,
      event_date,
      city,
      organizer_id
    } = req.body;

    // convertir los cupos a enteros de forma segura
    const max_capacity = toIntOrDefault(req.body.max_capacity, 0);
    // si no se envía available_capacity, arrancará igual a max_capacity
    const available_capacity = req.body.available_capacity !== undefined
      ? toIntOrDefault(req.body.available_capacity, max_capacity)
      : max_capacity;

    const image = req.file ? req.file.buffer : null;

    // Validaciones básicas
    if (!event_name || !event_date || !city) {
      return res.status(400).json({ message: "Faltan campos obligatorios: event_name, event_date o city" });
    }
    if (max_capacity < 0) return res.status(400).json({ message: "max_capacity inválido" });
    if (available_capacity < 0) return res.status(400).json({ message: "available_capacity inválido" });
    if (available_capacity > max_capacity) {
      // opcional: ajustar available_capacity a max_capacity
      // return res.status(400).json({ message: "available_capacity no puede ser mayor que max_capacity" });
      // en lugar de error, lo corregimos automáticamente:
      console.warn("available_capacity > max_capacity, ajustando available_capacity = max_capacity");
    }

    const orgId = organizer_id ? toIntOrDefault(organizer_id, null) : null;

    const [result] = await pool.query(
      `INSERT INTO events (event_name, description, category, event_date, city, organizer_id, max_capacity, available_capacity, image)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [event_name, description, category, event_date, city, orgId, max_capacity, Math.min(available_capacity, max_capacity), image]
    );

    const [rows] = await pool.query(
      `SELECT event_id, event_name, description, category, event_date, city, organizer_id, max_capacity, available_capacity, image IS NOT NULL AS has_image
       FROM events WHERE event_id = ?`,
      [result.insertId]
    );

    const newEvent = rows[0];
    newEvent.image = newEvent.has_image ? `/events/${newEvent.event_id}/image` : null;
    delete newEvent.has_image;

    res.status(201).json(newEvent);
  } catch (error) {
    console.error("Error al crear evento:", error);
    // Mostrar error concreto para debugging (puedes ocultar detalles en producción)
    res.status(500).json({ message: error.message });
  }
});

// ========================
// UPDATE event (con imagen opcional)
// ========================
api.put("/events/:id", upload.single("image"), async (req, res) => {
  try {
    console.log(`PUT /events/${req.params.id} req.body =`, req.body);
    console.log(`PUT /events/${req.params.id} req.file =`, !!req.file ? { size: req.file.size, mimetype: req.file.mimetype } : null);

    const { event_name, description = null, category = null, event_date, city } = req.body;
    let max_capacity = req.body.max_capacity !== undefined ? toIntOrDefault(req.body.max_capacity) : undefined;
    let available_capacity = req.body.available_capacity !== undefined ? toIntOrDefault(req.body.available_capacity) : undefined;
    const organizer_id = req.body.organizer_id ? toIntOrDefault(req.body.organizer_id) : null;
    const image = req.file ? req.file.buffer : null;

    // Obtener estado actual del evento para ajustes de available_capacity si hace falta
    const [currentRows] = await pool.query("SELECT max_capacity, available_capacity FROM events WHERE event_id = ?", [req.params.id]);
    if (currentRows.length === 0) return res.status(404).json({ message: "Evento no encontrado" });
    const current = currentRows[0];

    // Si no mandaron max_capacity, mantener el anterior
    if (max_capacity === undefined) max_capacity = current.max_capacity;
    if (available_capacity === undefined) {
      // ajustar available_capacity proporcionalmente al cambio de max_capacity
      const diff = max_capacity - current.max_capacity;
      let newAvailable = current.available_capacity + diff;
      if (newAvailable < 0) newAvailable = 0;
      if (newAvailable > max_capacity) newAvailable = max_capacity;
      available_capacity = newAvailable;
    } else {
      // si mandaron available, asegurar límites
      if (available_capacity < 0) available_capacity = 0;
      if (available_capacity > max_capacity) available_capacity = max_capacity;
    }

    // Construir query dinámicamente (si image presente lo añadimos)
    let query = `UPDATE events SET event_name=?, description=?, category=?, event_date=?, city=?, organizer_id=?, max_capacity=?, available_capacity=?`;
    const values = [event_name, description, category, event_date, city, organizer_id, max_capacity, available_capacity];

    if (image) {
      query += ", image=?";
      values.push(image);
    }

    query += " WHERE event_id=?";
    values.push(req.params.id);

    const [result] = await pool.query(query, values);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Evento no encontrado" });

    // devolver evento actualizado
    const [rows] = await pool.query(
      `SELECT event_id, event_name, description, category, event_date, city, organizer_id, max_capacity, available_capacity, image IS NOT NULL AS has_image
       FROM events WHERE event_id = ?`,
      [req.params.id]
    );
    const updatedEvent = rows[0];
    updatedEvent.image = updatedEvent.has_image ? `/events/${updatedEvent.event_id}/image` : null;
    delete updatedEvent.has_image;

    res.json(updatedEvent);
  } catch (error) {
    console.error("Error al actualizar evento:", error);
    res.status(500).json({ message: error.message });
  }
});

// ========================
// DELETE event
// ========================
api.delete("/events/:id", async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM events WHERE event_id = ?", [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Evento no encontrado" });
    res.json({ message: "Evento eliminado" });
  } catch (error) {
    console.error("Error al eliminar evento:", error);
    res.status(500).json({ message: error.message });
  }
});

// ========================
// REGISTER to event (reduce cupos)
// ========================
api.post("/events/:id/register", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT available_capacity FROM events WHERE event_id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: "Evento no encontrado" });

    const available = rows[0].available_capacity;
    if (available <= 0) return res.status(400).json({ message: "No hay cupos disponibles" });

    await pool.query("UPDATE events SET available_capacity = available_capacity - 1 WHERE event_id = ?", [req.params.id]);
    res.json({ message: "Inscripción exitosa", remaining: available - 1 });
  } catch (error) {
    console.error("Error en inscripción:", error);
    res.status(500).json({ message: error.message });
  }
});

export default api;