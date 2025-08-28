const API_URL = "http://localhost:3000/metas"; 

// Obtain all goals
export async function getGoals() {
  const res = await fetch(`${API_URL}`);
  return res.json();
}
