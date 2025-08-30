import { pool } from "../db.js";
import { Router } from 'express';

const api = Router();

// GET all course blogs
api.get('/course-blogs', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM course_blogs');
    res.json(rows);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      endpoint: req.originalUrl,
      method: req.method,
      message: error.message
    });
  }
});

// CREATE a course blog
api.post('/course-blogs', async (req, res) => {
  try {
    const { type, title, content, user_id } = req.body;

    if (!type || !title || !content || !user_id) {
      return res.status(400).json({ status: 'error', message: 'Faltan campos obligatorios' });
    }

    const [result] = await pool.query(
      'INSERT INTO course_blogs (type, title, content, user_id) VALUES (?, ?, ?, ?)',
      [type, title, content, user_id]
    );

    res.status(201).json({
      status: 'ok',
      course_blog_id: result.insertId
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      endpoint: req.originalUrl,
      method: req.method,
      message: error.message
    });
  }
});

export default api;
