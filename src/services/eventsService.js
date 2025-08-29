const API_URL = "http://localhost:3000/events_participants";

export async function fetchEventParticipants() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error fetching event participants");
  return res.json();
}

export async function createEventParticipant(participantData) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(participantData)
    });

    if (!res.ok) throw new Error("Error al crear participante del evento");
    return res.json(); // 👈 retorna el participante creado
  } catch (error) {
    console.error("Error creating event participant:", error);
    throw error;
  }
}