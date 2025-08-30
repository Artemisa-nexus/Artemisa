const API_URL = "http://localhost:3000/api";

//Obtain support by id
export async function getSupport(id) {
    const res = await fetch(`${API_URL}/support/${id}`);
    return res.json();
}

// Create a new support
export async function addSupport(support) {
    try {
        const res = await fetch(`${API_URL}/support`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(support),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Error al crear el soporte");
        }

        return await res.json();
    } catch (error) {
        console.error("Error en addSupport:", error.message);
        alert("No se pudo crear el soporte. Intenta nuevamente.");
    }
}