// src/services/servicesPublications.js
import { alertError } from "../components/alerts.js";

const API_URL = "http://localhost:3000/api/publications"; 
// 👆 cambia el puerto si tu backend corre en otro

// Obtener todas las publicaciones
export async function getAllPublications() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener publicaciones");
  return await res.json();
}

// Obtener una publicación por ID
export async function getPublicationById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Publicación no encontrada");
  return await res.json();
}

// Crear una nueva publicación
export async function createPublication(pubData) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pubData),
  });

  if (!res.ok) {
    const error = await res.json();
    alertError(error.message || "Error al crear publicación");
    throw new Error(error.message);
  }

  return await res.json();
}

// Actualizar una publicación
export async function updatePublication(id, pubData) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pubData),
  });

  if (!res.ok) throw new Error("Error al actualizar publicación");
  return await res.json();
}

// Eliminar una publicación
export async function deletePublication(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Error al eliminar publicación");
  return await res.json();
}
