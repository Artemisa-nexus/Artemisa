import express from "express";
import cors from "cors";

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

const allowedOrigins = [
  "https://artemisa-one.vercel.app", // tu front en producción
  "http://localhost:5173"            // tu front en local
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS no permitido"));
    }
  }
}));

// Test DB connection
probarConexionBaseDatos();

// ✅ Rutas con prefijo /api
app.use("/api", userRouter);
app.use("/api", eventApi);
app.use("/api", event_participantsApi);
app.use("/api", course_blogsApi);
app.use("/api", publicationsApi);
app.use("/api", metasApi);
app.use("/api", objetivesApi);
app.use("/api", supportApi);
app.use("/api", volunteerApi);

app.use((req, res) => {
  res.status(404).json({ error: "Endpoint no encontrado" });
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});

