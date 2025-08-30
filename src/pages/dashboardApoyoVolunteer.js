import { renderNav } from "../components/nav";
import { navEvents, renderSideBar } from "../components/siderBar";

// Render dashboardSupport view
export function renderDashboardSupportVolunteer(app) {
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
                <section id=event-card class="space-y-6">
                    <!-- First Event Card -->
                </section>
            </div> 
        </main>
        </div>
  `;
  navEvents();

  const container = document.getElementById("event-card");

  let citas = JSON.parse(localStorage.getItem("citas")) || [];

  function renderCitas() {
    container.innerHTML = "";
    if (citas.length === 0) {
      container.innerHTML = `<p class="text-gray-500 text-center">No hay ningun formulario recibido</p>`;
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

}