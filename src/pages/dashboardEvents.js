import { renderNav } from "../components/nav";
import { navEvents, renderSideBar } from "../components/siderBar";

// Render dashboardEvents view
export function renderDashboardEvents(app) {
  const user = JSON.parse(localStorage.getItem("user")) || { fullname: "Invitada" };

  app.innerHTML = `
    ${renderNav()}
    <div class="flex">
      ${renderSideBar(user)}
      <main class="flex-1 p-6">
        <div class="flex-1 p-6">
          <!-- Page Header -->
          <section class="flex items-center justify-between mb-6">
            <h1 class="text-3xl font-semibold text-[#f56d95]">Próximos eventos</h1>
            <button id="add-event" class="bg-[#f56d95] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#f84e81] transition-colors">
              Add Events
            </button>
          </section>
          
          <!-- Event Cards Container -->
          <section class="space-y-6">
            <article class="bg-white rounded-2xl border border-gray-200 h-48 shadow-sm"></article>
            <article class="bg-white rounded-2xl border border-gray-200 h-48 shadow-sm"></article>
          </section>
        </div> 
      </main>
    </div>
  `;

  navEvents();

  // overlay ONCE and outside #app
  let overlay = document.getElementById("evtOverlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "evtOverlay";
    overlay.innerHTML = `
      <style>
        #evtOverlay {
          position: fixed; inset: 0; display: none;
          align-items: center; justify-content: center;
          background: rgba(0,0,0,.5);
          z-index: 9999;
        }
        #evtOverlay.is-open { display: flex; }
        #evtOverlay .evt-modal {
          width: min(680px, 92vw);
          background: #fff; border-radius: 16px; padding: 24px;
          box-shadow: 0 10px 30px rgba(0,0,0,.2);
          transform: translateY(-16px); opacity: 0;
          transition: transform .2s ease, opacity .2s ease;
        }
        #evtOverlay.is-open .evt-modal {
          transform: translateY(0); opacity: 1;
        }
      </style>
      <div class="evt-backdrop" style="position:absolute; inset:0;"></div>
      <div id="evtModal" class="evt-modal">
        <h3 class="text-xl font-semibold mb-4">Agregar Evento</h3>
        <input type="text" placeholder="Nombre del evento" class="w-full mb-4 p-2 border rounded-lg"/>
        <textarea placeholder="Descripción" class="w-full mb-4 p-2 border rounded-lg"></textarea>
        <input type="text" placeholder="Categoría" class="w-full mb-4 p-2 border rounded-lg"/>
        <input type="date" placeholder="Fecha del evento" class="w-full mb-4 p-2 border rounded-lg"/>
        <input type="text" placeholder="Ciudad" class="w-full mb-4 p-2 border rounded-lg"/>
        <div class="flex justify-end gap-2">
          <button id="evtCancel" class="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400">Cancelar</button>
          <button id="evtSave" class="px-4 py-2 rounded-lg bg-[#f56d95] text-white hover:bg-[#f84e81]">Guardar</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
  }

  // 3) Wire events (once)
  if (!overlay.dataset.wired) {
    overlay.dataset.wired = "1";

    const backdrop = overlay.querySelector(".evt-backdrop");
    const cancelBtn = overlay.querySelector("#evtCancel");

    const close = () => {
      overlay.classList.remove("is-open");
    };

    backdrop.addEventListener("click", close);
    cancelBtn.addEventListener("click", close);

    // Close with Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && overlay.classList.contains("is-open")) close();
    });
  }

  // Open the overlay when clicking "Add Events"
  const addBtn = document.getElementById("add-event");
  addBtn?.addEventListener("click", () => {
    overlay.classList.add("is-open");
  });
}
