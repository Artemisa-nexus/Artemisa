const API_URL = "https://artemisa-production.up.railway.app/metas"; 

// Obtain all goals

export async function getGoals() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener metas");
  return await res.json();
}

// Guardar meta alcanzada
export async function saveAchievedGoal({ user_id, goal_id }) {
  const res = await fetch(`${API_URL}/achieved`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id, goal_id }),
  });

  if (!res.ok) throw new Error("Error al guardar meta alcanzada");
  return await res.json();
}

// Mostrar metas alcanzadas por usuario
export async function showAchievedGoal(user_id) {
  const res = await fetch(`${API_URL}/achieved/${user_id}`);
  if (!res.ok) throw new Error("Error al obtener metas alcanzadas");
  return await res.json();
}

