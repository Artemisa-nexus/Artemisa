import { renderNav } from "../components/nav";
import { navEvents, renderSideBar } from "../components/siderBar";
import { fetchEvents } from "../services/enventsVolunteerService";
import { createEventParticipant } from "../services/eventsService";

// Render dashboardEvents view
export function renderDashboardEvents(app) {
  const user = JSON.parse(localStorage.getItem("user")) || { fullname: "Invitada" };

  if (!user.user_id) {
    alert("Debes iniciar sesión para unirte a eventos");
  }

  app.innerHTML = `
    ${renderNav()}
    <div class="flex">
      ${renderSideBar(user)}
      <main class="flex-1 p-6">
        <div class="flex-1 p-6">
          <!-- Page Header -->
          <section class="flex items-center justify-between mb-6">
            <h1 class="text-3xl font-semibold text-[#f56d95]">Eventos</h1>
          </section>
          
          <!-- Event Cards Container -->
          <section id="events-container" class="grid grid-cols-3 gap-6"></section>
        </div> 
      </main>
    </div>
  `;

  const container = document.getElementById("events-container");

  // Renderiza una card individual
  function renderEventCard(evt) {
    const card = document.createElement("article");
    card.className =
      "bg-white rounded-2xl border border-gray-200 shadow-md p-6 flex flex-col items-center text-center transition transform hover:-translate-y-1 hover:shadow-xl hover:border-4 hover:border-[#f56d95]";

    card.innerHTML = `
      <img src="http://localhost:3000${evt.image || "/uploads/default.jpg"}" 
           alt="event" 
           class="w-72 h-72 object-cover rounded-xl shadow-md mb-4"/>

      <h2 class="text-2xl font-semibold text-[#f56d95] mb-2">${evt.event_name}</h2>
      <p class="text-gray-600">${evt.description || ""}</p>
      <p><span class="font-medium">Categoría:</span> ${evt.category || "-"}</p>
      <p><span class="font-medium">Fecha:</span> ${new Date(evt.event_date).toLocaleDateString()}</p>
      <p><span class="font-medium">Ciudad:</span> ${evt.city}</p>
      <p class="capacity"><span class="font-medium">Cupos disponibles:</span> ${evt.available_capacity}</p>

      <button class="join-btn mt-4 px-4 py-2 bg-[#f56d95] text-white rounded-lg shadow hover:bg-[#e05580] transition">
        Unirse
      </button>
    `;

    // Botón unirse — ¡debe ir DENTRO de renderEventCard!
    const joinBtn = card.querySelector(".join-btn");
    joinBtn.addEventListener("click", async () => {
      if (!user.user_id) {
        alert("Debes iniciar sesión para unirte a un evento.");
        return;
      }

      if (evt.available_capacity <= 0) {
        alert("Lo sentimos, no hay cupos disponibles para este evento.");
        return;
      }

      try {
        await createEventParticipant({
          event_id: evt.event_id,
          user_id: user.user_id,
        });
        alert(`Te has unido al evento: ${evt.event_name}`);
        // Disminuir cupo disponible en la UI
        evt.available_capacity = Math.max(0, evt.available_capacity - 1);
        card.querySelector(".capacity").innerHTML = `<span class="font-medium">Cupos disponibles:</span> ${evt.available_capacity}`;
      } catch (err) {
        console.error("Error al unirse al evento:", err);
        alert(err.message || "No se pudo unir al evento. Intenta nuevamente.");
      }
    });

    container.appendChild(card);
  }

  // Cargar lista de eventos
  async function loadEvents() {
    try {
      const events = await fetchEvents();
      container.innerHTML = "";
      events.forEach(evt => renderEventCard(evt));
    } catch (err) {
      console.error("Error al cargar eventos:", err);
    }
  }

  // Ejecutar funciones iniciales
  loadEvents();
  navEvents();
}
