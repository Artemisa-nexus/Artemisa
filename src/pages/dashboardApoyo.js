import { renderNav } from "../components/nav";
import { navEvents, renderSideBar } from "../components/siderBar";
import { addSupport } from "../services/supportService";

// Render dashboardSupport view
export function renderDashboardSupport(app) {
const user = JSON.parse(localStorage.getItem("user")) || { fullname: "Invitada" };
  app.innerHTML = `
      ${renderNav()}
      <div class="flex">
      ${renderSideBar(user)}
      
        <main class="flex-1 p-6">
          <div class="flex-1 p-6">
            
            <!-- Page Header -->
            <section class="flex items-center justify-between mb-6">
              <h1 class="text-3xl font-semibold text-[#f56d95]">APOYO</h1>
            </section>
                
            <!-- Event Cards Container -->
            <section class="space-y-6">
              
              <!-- Card Línea Púrpura -->
              <article class="bg-white rounded-2xl border-l-4 border-[#f56d95] shadow-sm p-6">
                <h2 class="text-xl font-bold text-gray-800 mb-2">Línea Púrpura</h2>
                <p class="text-gray-600 mb-2">
                  La <span class="font-semibold text-[#f56d95]">Línea Púrpura</span> es un servicio de orientación
                  gratuito para mujeres víctimas de violencia de género, que ofrece apoyo psicosocial, 
                  orientación jurídica y información sobre sus derechos.
                </p>
                <p class="text-gray-500 text-sm mb-4">
                  📞 Teléfono: <span class="font-semibold">018000 112 137</span> <br>
                  📱 WhatsApp: <span class="font-semibold">300 755 1846</span> <br>
                  🕒 Disponible 24 horas al día, 7 días a la semana
                </p>
                <a href="https://www.sdmujer.gov.co/lineapurpura" target="_blank"
                 class="inline-block px-4 py-2 bg-[#f56d95] text-white rounded-lg shadow hover:bg-[#d94b73] transition">
                  Ir al sitio oficial
                </a>
              </article>
              
             <!-- Card Casa de la Mujer - Barranquilla -->
            <article class="bg-white rounded-2xl border-l-4 border-[#f56d95] shadow-sm p-6">
                <h2 class="text-xl font-bold text-gray-800 mb-2">Casa de la Mujer – Barranquilla</h2>
                <p class="text-gray-600 mb-2">
                La <span class="font-semibold text-[#f56d95]">Casa de la Mujer</span> es un espacio de la 
                <span class="font-semibold">Alcaldía de Barranquilla</span> que brinda atención integral a mujeres 
                víctimas de violencias de género. Ofrece orientación psicológica, asesoría jurídica 
                y acompañamiento social.
                </p>
                <p class="text-gray-500 text-sm mb-4">
                📍 Dirección: Carrera 43 #44-35, Barrio El Prado, Barranquilla <br>
                📞 Teléfono: <span class="font-semibold">(605) 379 1234</span> <br>
                🕒 Horario: Lunes a Viernes, 8:00 a.m. – 5:00 p.m.
                </p>
                <a href="https://www.barranquilla.gov.co/mujer" target="_blank"
                class="inline-block px-4 py-2 bg-[#f56d95] text-white rounded-lg shadow hover:bg-[#d94b73] transition">
                Ir al sitio oficial
                </a>
            </article>
                    
              <!-- Formulario para agendar cita -->
              <article class="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <h2 class="text-xl font-semibold text-[#f56d95] mb-4">Agendar una cita</h2>
                <form id="citaForm" class="space-y-4">
                  <div>
                    <label class="block text-gray-600 mb-1">Nombre</label>
                    <input type="text" id="nombre" required
                      class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f56d95]" />
                  </div>
                  <div>
                    <label class="block text-gray-600 mb-1">Descripción</label>
                    <textarea id="descripcion" rows="3" required
                      class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f56d95]"></textarea>
                  </div>
                  <div>
                    <label class="block text-gray-600 mb-1">Email o Teléfono</label>
                    <input type="text" id="contacto" required
                      class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#f56d95]" />
                  </div>
                  <button type="submit"
                    class="bg-[#f56d95] text-white px-6 py-2 rounded-lg shadow hover:bg-[#d94b73]">
                    Agendar
                  </button>
                </form>
              </article>

              <!-- Contenedor de citas -->
              <section id="citasContainer" class="space-y-6"></section>

            </section>
          </div> 
        </main>
      </div>
  `;

  navEvents();

  // --- Lógica para manejar formulario y citas ---
  const form = document.getElementById("citaForm");
  const container = document.getElementById("citasContainer");

  // Cargar citas guardadas
  let citas = JSON.parse(localStorage.getItem("citas")) || [];

  // Renderizar citas en cards
  function renderCitas() {
    container.innerHTML = "";
    if (citas.length === 0) {
      container.innerHTML = `<p class="text-gray-500 text-center">No hay citas agendadas todavía.</p>`;
    } else {
      citas.forEach((cita, index) => {
        container.innerHTML += `
          <article class="bg-white rounded-2xl border-l-4 border-[#f56d95] shadow-sm p-6">
            <h3 class="text-lg font-bold text-gray-800">${cita.support_name}</h3>
            <p class="text-gray-600 mb-2">${cita.description}</p>
            <p class="text-gray-500 text-sm">📞 ${cita.email}</p>
            <button data-index="${index}" class="deleteBtn mt-3 text-sm text-red-600 hover:underline">cancelar</button>
          </article>
        `;
      });
    }
  }

  renderCitas();

  // Evento submit del formulario
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nuevaCita = {
      support_name: document.getElementById("nombre").value,
      description: document.getElementById("descripcion").value,
      email: document.getElementById("contacto").value,
    };

    const response = await addSupport(nuevaCita);

    if (!response.status === 'ok') {
        console.error("Error al crear el soporte:", response.message);
        return;
    }

    citas.push(nuevaCita);
    localStorage.setItem("citas", JSON.stringify(citas));

    form.reset();
    renderCitas();
  });

// Delegar eventos para cancelar citas
  container.addEventListener("click", (e) => {
    if (e.target.classList.contains("deleteBtn")) {
      const index = e.target.dataset.index;
      citas.splice(index, 1);
      localStorage.setItem("citas", JSON.stringify(citas));
      renderCitas();
    }
  });
}