// server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

// importar rutas
import userApi from "./api/users.js";
import eventApi from "./api/events.js";
import event_participantsApi from "./api/event_participant.js";
import marketplaceApi from "./api/marketplace.js";
import productsApi from "./api/products.js";
import course_blogsApi from "./api/course_blogs.js";
import friendsApi from "./api/friends.js";
import publicacionApi from "./api/publicacion.js";
import metasApi from "./api/metas.js";
import objetivesApi from "./api/objetivos.js";


const app = express();
app.use(cors());
app.use(bodyParser.json());

// rutas
app.use("/users", userApi);
app.use("/events", eventApi);
app.use("/event-participants", event_participantsApi);
app.use("/marketplaces", marketplaceApi);
app.use("/products", productsApi);
app.use("/course-blogs", course_blogsApi);
app.use("/friends", friendsApi);
app.use("/publicaciones", publicacionApi);
app.use("/metas", metasApi);
app.use("/objetivos", objetivesApi);

app.get("/", (req, res) => res.send("API Artemisa funcionando 🚀"));

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
