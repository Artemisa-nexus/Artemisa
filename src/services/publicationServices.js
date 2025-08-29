const API_URL = "http://localhost:3000/publications";

// Crear una nueva publicaciÃ³n
export async function addPublication(publication) {
  if (!publication.user_id || !publication.content) {
    console.error("FALTAN CAMPOS");
    return;
  }
  try {
    const res = await fetch(`${API_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(publication),
    });

    // Validar respuesta HTTP
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Error al crear la publicaciÃ³n");
    }

    // âœ… AquÃ­ siempre devolverÃ¡ el JSON completo (incluyendo `publication`)
    console.log("LO MANDÓ")
    return data;
  } catch (error) {
    console.error("Error en addPublication:", error.message);

    // Opcional: puedes lanzar el error para que lo maneje el frontend
    throw error;
  }
}

//  Obtener una publicaciÃ³n 
export async function getPublicationById(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "PublicaciÃ³n no encontrada");
    }

    return await res.json();
  } catch (error) {
    console.error("Error en getPublicationById:", error.message);
    alert("No se pudo cargar la publicaciÃ³n.");
  }
}

//  Actualizar una poblicacion 

export async function updatePublication(id, publication) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(publication),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Error al actualizar la publicaciÃ³n");
    }

    return await res.json();
  } catch (error) {
    console.error("Error en updatePublication:", error.message);
    alert("No se pudo actualizar la publicaciÃ³n.");
  }
}

// Delete a publication

export async function deletePublication(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Error al eliminar la publicaciÃ³n");
    }

    return await res.json();
  } catch (error) {
    console.error("Error en deletePublication:", error.message);
    alert("No se pudo eliminar la publicaciÃ³n.");
  }
}