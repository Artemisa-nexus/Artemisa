const API_URL = "http://localhost:3000/events";

export async function fetchEvents() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error fetching events");
  return res.json();
}

export async function createEvent(eventData) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData)
    });

    if (!res.ok) throw new Error("Error al crear evento");
    return res.json(); // 👈 retorna el evento creado
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
}
