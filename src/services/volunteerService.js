const API_URL = "https://artemisa-production.up.railway.app/api/volunteers"; 

// Obtain all organizations
export async function getAllVolunteerOrgs() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener organizaciones");
  return await res.json();
}
// Obtain a volunteer organization by ID
export async function getVolunteerOrgById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Organización no encontrada");
  return await res.json();
}

  // Create a new organization
export async function createVolunteerOrg(orgData) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orgData),
  });

  if (!res.ok) throw new Error("Error al crear organización");
  return await res.json();
}

// Update a volunteer organization
export async function updateVolunteerOrg(id, orgData) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orgData),
  });

  if (!res.ok) throw new Error("Error al actualizar organización");
  return await res.json();
}

// Delete a volunteer organization
export async function deleteVolunteerOrg(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Error al eliminar organización");
  return await res.json();
}
