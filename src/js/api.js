// API for users and events
const BASE_URL = "https://artemisa-production.up.railway.app";

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
