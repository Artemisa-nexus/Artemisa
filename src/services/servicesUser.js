const API_URL = "http://localhost:3000/users"; 

// Obtain user by id
export async function getUser(user_id) {
  const res = await fetch(`${API_URL}/${user_id}`);
  return res.json();
}

  // Update the user
export async function updateUser(user_id, data) {
  const res = await fetch(`${API_URL}/${user_id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    // Si falla, lanza el error con el mensaje que devuelve el backend
    const errorData = await res.json();
    throw new Error(errorData.message || "Error al actualizar usuario");
  }

  return res.json(); // Usuario actualizado (lo que mandamos desde el backend)
}


//delete
export async function deleteUser(user_id) {
  const res = await fetch(`${API_URL}/${user_id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error al eliminar usuario");
  }

  return res.json();
}
