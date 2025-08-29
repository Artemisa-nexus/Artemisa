const API_URL = "https://artemisa-production.up.railway.app";

export async function addUser(user) {
  try {
    const res = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Error en el registro");
    }

    return await res.json();
  } catch (error) {
    console.error("Error en addUser:", error.message);
    alert("No se pudo registrar el usuario. Intenta nuevamente.");
  }
}