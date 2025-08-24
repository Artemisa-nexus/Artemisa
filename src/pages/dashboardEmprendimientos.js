import { renderNav } from "../components/nav";
import { navEvents, renderSideBar } from "../components/siderBar";

// Render dashboardEmprendimientos view
export function renderDashboardEmprendimientos(app) {
  const user = JSON.parse(localStorage.getItem("user")) || { fullname: "Invitada" };

  app.innerHTML = `
    ${renderNav()}
    <div class="flex">
      ${renderSideBar(user)}
      <main class="flex-1 p-8">
        <!-- Tus emprendimientos section -->
        <section class="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-gray-200">
          <div class="flex items-center justify-between">
            <h2 class="text-2xl font-semibold text-[#f56d95]">Tus emprendimientos</h2>
            <button id="add-emprendimiento" class="bg-[#f56d95] text-white px-4 py-2 rounded-lg hover:bg-[#f84e81] transition-colors">
              Add
            </button>
          </div>
        </section>
        
        <!-- Market Place section -->
        <div>
          <h2 class="text-3xl font-semibold text-[#f56d95] mb-6">Market Place</h2>
          <section class="grid grid-cols-3 gap-6">
            <article class="bg-white rounded-2xl h-64 shadow-sm border border-gray-200"></article>
            <article class="bg-white rounded-2xl h-64 shadow-sm border border-gray-200"></article>
            <article class="bg-white rounded-2xl h-64 shadow-sm border border-gray-200"></article>
            <article class="bg-white rounded-2xl h-64 shadow-sm border border-gray-200"></article>
            <article class="bg-white rounded-2xl h-64 shadow-sm border border-gray-200"></article>
            <article class="bg-white rounded-2xl h-64 shadow-sm border border-gray-200"></article>
          </section>
        </div>
      </main>
    </div>
  `;

  navEvents();

  // overlay ONCE and outside #app
  let overlay = document.getElementById("empOverlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "empOverlay";
    overlay.innerHTML = `
      <div class="emp-backdrop" style="position:absolute; inset:0;"></div>
      <div id="empModal" class="emp-modal">
        <h3 class="text-xl font-semibold mb-4">Agregar Producto</h3>
        <input type="text" placeholder="Nombre del producto" class="w-full mb-4 p-2 border rounded-lg"/>
        <textarea placeholder="Descripción" class="w-full mb-4 p-2 border rounded-lg"></textarea>
        <input type="text" placeholder="Precio del producto" class="w-full mb-4 p-2 border rounded-lg"/>
        <input type="text" placeholder="Cantidad" class="w-full mb-4 p-2 border rounded-lg"/>
        <div class="flex justify-end gap-2">
          <button id="empCancel" class="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400">Cancelar</button>
          <button id="empSave" class="px-4 py-2 rounded-lg bg-[#f56d95] text-white hover:bg-[#f84e81]">Guardar</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
  }

  // Wire events (once)
  if (!overlay.dataset.wired) {
    overlay.dataset.wired = "1";

    const backdrop = overlay.querySelector(".emp-backdrop");
    const cancelBtn = overlay.querySelector("#empCancel");

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

  // Open the overlay when clicking "Add"
  const addBtn = document.getElementById("add-emprendimiento");
  addBtn?.addEventListener("click", () => {
    overlay.classList.add("is-open");
  });
}
