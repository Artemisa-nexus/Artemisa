// server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

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

const app = express();

// Configuración de CORS (solo Vercel)
app.use(cors({
  origin: "https://artemisa-one.vercel.app", // frontend en producción
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

// Preflight para OPTIONS
app.options("*", cors());

// Middlewares
app.use(bodyParser.json());

// Rutas
app.use("/users", userRouter);
app.use("/events", eventApi);
app.use("/event_participants", event_participantsApi);
app.use("/course-blogs", course_blogsApi);
app.use("/publications", publicationsApi);
app.use("/metas", metasApi);
app.use("/objetivos", objetivesApi);
app.use("/support", supportApi);
app.use("/volunteers", volunteerApi);

// Ruta raíz
app.get("/", (req, res) => res.send("API Artemisa funcionando 🚀"));

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));


