import express from "express";
import cors from "cors";

// Import routes
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

// Middleware to parse JSON request body
app.use(express.json());
// Define allowed origins for CORS
const allowedOrigins = [
  "https://artemisa-one.vercel.app", 
  "http://localhost:5173"            
];

// CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS no permitido"));
    }
  }
}));

// Test database connection when server starts
probarConexionBaseDatos();

//  Routes with "/api" prefix
app.use("/api", userRouter);
app.use("/api", eventApi);
app.use("/api", event_participantsApi);
app.use("/api", course_blogsApi);
app.use("/api", publicationsApi);
app.use("/api", metasApi);
app.use("/api", objetivesApi);
app.use("/api", supportApi);
app.use("/api", volunteerApi);

// Middleware for handling 404 errors (non-existent endpoints)
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Start server on port 3000
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});

