import { alertError, alertSuccess } from "../components/alerts";
import { renderNav } from "../components/nav";
import { navEvents, renderSideBar } from "../components/siderBar";
import { fetchEvents } from "../services/enventsVolunteerService.js";

export function renderDashboardEventsVolunteer(app) {
  const user = JSON.parse(localStorage.getItem("user")) || { fullname: "Invitada", user_id: 1 };

  app.innerHTML = `
    ${renderNav()}
    <div class="flex">
      ${renderSideBar(user)}
      <main class="flex-1 p-6">
        <section class="flex items-center justify-between mb-6">
          <h1 class="text-3xl font-semibold text-[#f56d95]">Eventos</h1>
          <button id="add-event" class="bg-[#f56d95] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#f84e81] transition-colors">
            Agregar Evento
          </button>
        </section>
        <section id="events-container" class="space-y-6"></section>
      </main>
    </div>
  `;

  navEvents();

  // ===== Modal Reutilizable (Crear/Editar) =====
  let overlay = document.getElementById("evtOverlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "evtOverlay";
    overlay.innerHTML = `
      <div class="evt-backdrop absolute inset-0 bg-black bg-opacity-50"></div>
      <div id="evtModal" class="bg-white p-6 rounded-2xl shadow-lg max-w-lg mx-auto mt-20 relative z-10">
        <h3 id="evtModalTitle" class="text-xl font-semibold mb-4">Agregar Evento</h3>
        <form id="evtForm" class="space-y-4">
          <input id="name" name="event_name" type="text" placeholder="Nombre del evento" class="w-full p-2 border rounded-lg" required/>
          <textarea id="description" name="description" placeholder="Descripción" class="w-full p-2 border rounded-lg"></textarea>
          <input id="categoria" name="category" type="text" placeholder="Categoría" class="w-full p-2 border rounded-lg"/>
          <input id="registration" name="event_date" type="datetime-local" class="w-full p-2 border rounded-lg" required/>
          <input id="ciudad" name="city" type="text" placeholder="Ciudad" class="w-full p-2 border rounded-lg"/>
          <input id="max_capacity" name="max_capacity" type="number" min="1" placeholder="Cupos máximos" class="w-full p-2 border rounded-lg" required/>
          <input id="image" name="image" type="file" accept="image/*" class="w-full p-2 border rounded-lg"/>
          <input type="hidden" id="eventId" name="event_id"/>
          <div class="flex justify-end gap-2">
            <button type="button" id="evtCancel" class="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400">Cancelar</button>
            <button type="submit" id="evtSave" class="px-4 py-2 rounded-lg bg-[#f56d95] text-white hover:bg-[#f84e81]">Guardar</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(overlay);
  }

  const closeModal = () => overlay.classList.remove("is-open");
  const openModal = (title = "Agregar Evento") => {
    document.getElementById("evtModalTitle").textContent = title;
    overlay.classList.add("is-open");
  };

  overlay.querySelector(".evt-backdrop").addEventListener("click", closeModal);
  overlay.querySelector("#evtCancel").addEventListener("click", closeModal);

  document.getElementById("add-event").addEventListener("click", () => {
    document.getElementById("evtForm").reset();
    document.getElementById("eventId").value = "";
    openModal("Agregar Evento");
  });

  // ===== Renderizar Tarjeta =====
  function renderEventCard(evt) {
    const container = document.getElementById("events-container");
    const card = document.createElement("article");
    card.className = "bg-white rounded-2xl border border-gray-200 shadow-sm p-4 flex gap-4";

    const imgSrc = evt.image ? `http://localhost:3000/api${evt.image}` : "/uploads/default.jpg";

    card.innerHTML = `
      <img src="${imgSrc}" alt="event" class="w-32 h-32 object-cover rounded-lg"/>
      <div class="flex-1">
        <h2 class="text-xl font-semibold text-[#f56d95]">${evt.event_name}</h2>
        <p class="text-gray-600">${evt.description || ""}</p>
        <p><span class="font-medium">Categoría:</span> ${evt.category || "-"}</p>
        <p><span class="font-medium">Fecha:</span> ${new Date(evt.event_date).toLocaleString()}</p>
        <p><span class="font-medium">Ciudad:</span> ${evt.city}</p>
        <p><span class="font-medium">Cupos totales:</span> ${evt.max_capacity}</p>
        <p><span class="font-medium">Cupos disponibles:</span> ${evt.available_capacity}</p>
      </div>
      <div class="flex flex-col gap-2">
        <button data-id="${evt.event_id}" class="edit-btn px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Editar</button>
        <button data-id="${evt.event_id}" class="delete-btn px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Eliminar</button>
      </div>
    `;

    // Botón Editar
    card.querySelector(".edit-btn").addEventListener("click", () => {
      document.getElementById("eventId").value = evt.event_id;
      document.getElementById("name").value = evt.event_name;
      document.getElementById("description").value = evt.description || "";
      document.getElementById("categoria").value = evt.category || "";
      document.getElementById("registration").value = evt.event_date.slice(0, 16);
      document.getElementById("ciudad").value = evt.city || "";
      document.getElementById("max_capacity").value = evt.max_capacity || 0;
      openModal("Editar Evento");
    });

    // Botón Eliminar
    card.querySelector(".delete-btn").addEventListener("click", async () => {
      if (!confirm("¿Seguro que deseas eliminar este evento?")) return;
      try {
        const res = await fetch(`http://localhost:3000/api/events/${evt.event_id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Error al eliminar");
        card.remove();
        alertSuccess("Evento eliminado con éxito");
      } catch (err) {
        console.error(err);
        alertError("Error al eliminar evento");
      }
    });

    container.appendChild(card);
  }

  // ===== Cargar eventos existentes =====
  async function loadEvents() {
    try {
      const events = await fetchEvents();
      const container = document.getElementById("events-container");
      container.innerHTML = "";
      events.forEach(renderEventCard);
    } catch (err) {
      console.error("Error al cargar eventos:", err);
    }
  }

  // ===== Guardar/Editar evento =====
  document.getElementById("evtForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const eventId = document.getElementById("eventId").value;
    const formData = new FormData();
    formData.append("event_name", document.getElementById("name").value.trim());
    formData.append("description", document.getElementById("description").value.trim());
    formData.append("category", document.getElementById("categoria").value.trim());
    formData.append("event_date", document.getElementById("registration").value);
    formData.append("city", document.getElementById("ciudad").value.trim());
    formData.append("organizer_id", user.user_id);
    formData.append("max_capacity", document.getElementById("max_capacity").value);

    // si es nuevo, que los cupos disponibles arranquen igual
    if (!eventId) {
      formData.append("available_capacity", document.getElementById("max_capacity").value);
    }

    const fileInput = document.getElementById("image");
    if (fileInput.files[0]) {
      formData.append("image", fileInput.files[0]);
    }

    try {
      let url = "http://localhost:3000/api/events";
      let method = "POST";
      if (eventId) {
        url = `http://localhost:3000/api/events/${eventId}`;
        method = "PUT";
      }

      const res = await fetch(url, { method, body: formData });
      if (!res.ok) throw new Error("Error en la petición");
      await res.json();

      closeModal();
      document.getElementById("evtForm").reset();
      loadEvents(); 
      alertSuccess(eventId ? "Evento actualizado con éxito" : "Evento creado con éxito");
    } catch (err) {
      console.error(err);
      alertError("Error al guardar evento");
    }
  });

  // Primera carga
  loadEvents();
}
