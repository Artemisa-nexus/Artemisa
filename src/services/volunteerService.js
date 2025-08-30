// src/services/servicesVolunteerOrgs.js

const API_URL = "https://artemisa-production.up.railway.app/api/volunteers"; 
// 👆 cambia el puerto si tu backend corre en otro

// Obtener todas las organizaciones
export async function getAllVolunteerOrgs() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener organizaciones");
  return await res.json();
}

// Obtener una organización por ID
export async function getVolunteerOrgById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Organización no encontrada");
  return await res.json();
}

// Crear una nueva organización
export async function createVolunteerOrg(orgData) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orgData),
  });

  if (!res.ok) throw new Error("Error al crear organización");
  return await res.json();
}

// Actualizar una organización
export async function updateVolunteerOrg(id, orgData) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orgData),
  });

  if (!res.ok) throw new Error("Error al actualizar organización");
  return await res.json();
}

// Eliminar una organización
export async function deleteVolunteerOrg(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Error al eliminar organización");
  return await res.json();
}
