// server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

// importar rutas
import userRouter from "./api/users.js";
import eventApi from "./api/events.js";
import event_participantsApi from "./api/event_participant.js";
import course_blogsApi from "./api/course_blogs.js";
import publicacionApi from "./api/publicacion.js";
import metasApi from "./api/metas.js";
import objetivesApi from "./api/objetivos.js";
import supportApi from "./api/support.js";


const app = express();
app.use(cors());
app.use(bodyParser.json());

// rutas
app.use("/users", userRouter);
app.use("/events", eventApi);
app.use("/event_participants", event_participantsApi);
app.use("/course-blogs", course_blogsApi);
app.use("/publicaciones", publicacionApi);
app.use("/metas", metasApi);
app.use("/objetivos", objetivesApi);
app.use("/support", supportApi);

app.get("/", (req, res) => res.send("API Artemisa funcionando 🚀"));

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
