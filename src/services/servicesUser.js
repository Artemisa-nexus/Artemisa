const API_URL = "http://localhost:3000/users"; // Ajusta si es otro puerto

// Obtener usuario por id
export async function getUser(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
}

// Actualizar usuario
export async function updateUser(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// Eliminar usuario
export async function deleteUser(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}
