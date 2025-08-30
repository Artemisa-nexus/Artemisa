const API_URL = "https://artemisa-production.up.railway.app/api/events";

// Obtain all events
export async function fetchEvents() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error fetching events");
  return res.json();
}

// Create a new event
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
