const API_URL = "https://artemisa-production.up.railway.app/api/publications"; 

// Obtain all publications
export async function getAllPublications() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener publicaciones");
  return await res.json();
}

// Obtain a publication by ID
export async function getPublicationById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Publicación no encontrada");
  return await res.json();
}

// Create a new publication
export async function createPublication(data) {
  try {
    const res = await fetch("https://artemisa-production.up.railway.app/api/publications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",  // Important
      },
      body: JSON.stringify(data),  // Send JSON
    });

    if (!res.ok) throw new Error("Error creating publication");
    return await res.json();
  } catch (error) {
    console.error("Error creando publicación:", error.message);
    throw error;
  }
}

// Update a publication
export async function updatePublication(id, pubData) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pubData),
  });

  if (!res.ok) throw new Error("Error al actualizar publicación");
  return await res.json();
}

// Delete a publication
export async function deletePublication(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Error al eliminar publicación");
  return await res.json();
}
