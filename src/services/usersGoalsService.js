const API_URL = "http://localhost:3000/metas"; 

// Obtain all goals
export async function getGoals() {
  const res = await fetch(`${API_URL}`);
  return res.json();
}


// POST registrar meta alcanzada
export async function saveAchievedGoal(userId, goalId) {
  const res = await fetch(`${API_URL}/goals/achieved`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId, goal_id: goalId })
  });

  return res.json();
}

//mostrar metas alcanzada por usuario

export async function showAchievedGoal(user_id) {
  const res = await fetch(`${API_URL}/achieved/${user_id}`);
  if (!res.ok) {
    throw new Error("Error al obtener metas alcanzadas");
  }
  return res.json();
}
