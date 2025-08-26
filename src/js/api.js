// API for users and events
const BASE_URL = "http://localhost:3000";

// USERS API

// Login user by email and password
export async function loginUser() {
  const res = await fetch(`${BASE_URL}/users`);
  return await res.json();
}

// Register new user
export async function registerUser(user) {
  const res = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return await res.json();
}

// Get user by ID
export async function getUserById(id) {
  const res = await fetch(`${BASE_URL}/users/${id}`);
  return await res.json();
}

// Update user by ID
export async function updateUser(id, updatedUser) {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedUser),
  });
  return await res.json();
}

// Delete user by ID
export async function deleteUser(id) {
  await fetch(`${BASE_URL}/users/${id}`, {
    method: "DELETE",
  });
}

