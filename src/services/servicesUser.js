const API_URL = "http://localhost:3000/users"; 

// Obtain user by id
export async function getUser(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
}

// Update the user
export async function updateUser(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// Delete the user
export async function deleteUser(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}
