const BASE_URL = "http://localhost:3000";

// Register new user in API
export async function registerUser(fullName, email, identification, password) {
  // Check if email or fullName are already registered
  const users = await getUserCount();

  if (
    users.some(
      (user) =>
        user.identification === identification
    )
  ) {
    alert("La identificación ya está registrada. Intenta con otra.");
    return;
  }

  if (users.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
    alert("El email ya está registrado. Intenta con otro.");
    return;
  }

  //Build new user info
  const newUser = {
    fullname: fullName,
    email: email,
    identification: identification,
    password: password,
    roleId: "0",
  };

  //Send request
  try {
    const res = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    if (!res.ok) {
      alert("Ups, algo salio mal. Intentalo mas tarde");
      return;
    }

    alert("Usuario creado correctamente!");


  } catch (error) {
    alert(`Error ${error}, por favor intentelo mas tarde`);
  }
}

// Get all users from API
export async function getUserCount() {
  try {
    const res = await fetch(`${BASE_URL}/users`);
    const data = await res.json();
    return data;
  } catch (error) {
    Alert.error("Error al obtener usuarios");
    return [];
  }
}