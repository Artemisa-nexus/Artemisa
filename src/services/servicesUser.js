const API_URL = "https://artemisa-production.up.railway.app/api/users"; 

// Obtain all users
export async function getAllUsers(){
  const res = await fetch(API_URL);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error al obtener usuarios");
  }
  return res.json();
}

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
    const errorData = await res.json();
    throw new Error(errorData.message || "Error al actualizar usuario");
  }

  return res.json(); 
}


//delete User
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

// Obtain all the users with the role of user

export async function GetAllRollUSer() {
  const res = await fetch(`${API_URL}/role/1`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("Error al obtener usuarios");
  return await res.json();
}

//Obtain all the users with the rol of volunteer

export async function getAllRollVolunteers() {
  const res = await fetch(`${API_URL}/role/2`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("Error al obtener usuarios");
  return await res.json();
}