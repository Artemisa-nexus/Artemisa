const API_URL = "http://localhost:3000/event_participants";

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
      body: JSON.stringify(participantData),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Error al crear participante del evento");

    return data; // participante creado
  } catch (error) {
    console.error("Error creating event participant:", error);
    throw error;
  }
}
