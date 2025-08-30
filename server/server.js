// server.js
import 'dotenv/config';
import express from "express";
import cors from "cors";
import morgan from 'morgan';

// importar rutas
import userRouter from "./api/users.js";
import eventApi from "./api/events.js";
import event_participantsApi from "./api/event_participant.js";
import course_blogsApi from "./api/course_blogs.js";
import publicationsApi from "./api/publications.js";
import metasApi from "./api/metas.js";
import objetivesApi from "./api/objetivos.js";
import supportApi from "./api/support.js";
import volunteerApi from "./api/volunteer.js";
import { probarConexionBaseDatos } from './db.js';

const app = express();

// Middlewares
app.use(cors({
  origin: 'https://artemisa-one.vercel.app', // solo permite tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// Healthcheck endpoint
app.get('/health', (_req, res) => res.json({ ok: true }));

// Test DB connection
probarConexionBaseDatos();

// ✅ Rutas con prefijo /api
app.use("/api/users", userRouter);
app.use("/api/events", eventApi);
app.use("/api/event_participants", event_participantsApi);
app.use("/api/course-blogs", course_blogsApi);
app.use("/api/publications", publicationsApi);
app.use("/api/metas", metasApi);
app.use("/api/objetivos", objetivesApi);
app.use("/api/support", supportApi);
app.use("/api/volunteers", volunteerApi);

// Handle 404 - Not Found
app.use((_req, res) => {
  res.status(404).json({ error: 'Endpoint no encontrado' });
});

// Global error handler middleware
app.use((err, _req, res, _next) => {
  console.error('Error inesperado:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});

