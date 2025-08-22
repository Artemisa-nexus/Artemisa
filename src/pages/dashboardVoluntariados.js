import { renderNav } from "../components/nav";
import { navEvents, renderSideBar } from "../components/siderBar";

export function renderDashboardVoluntariado(app) {
  const user = { name: "" }; // 🔹 prueba
  app.innerHTML = `
      ${renderNav()}
      <div class="flex">
      ${renderSideBar(user)}
       <main class="flex-1 p-6">
       <!-- Page Header -->
                <section class="flex items-center justify-between mb-8">
                    <h1 class="text-3xl font-semibold text-[#f56d95]">Voluntariados</h1>
                    <button id="add-voluntariado-btn" class="bg-[#f56d95] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#fa5587] transition-colors">
                        Add Voluntariados
                    </button>
                </section>
                
                <!-- Cards Grid -->
                <div class="grid grid-cols-3 gap-6">
                    <!-- Card 1 -->
                    <article class="bg-white rounded-2xl shadow-sm border border-gray-100 h-64"></article>
                    
                    <!-- Card 2 -->
                    <article class="bg-white rounded-2xl shadow-sm border border-gray-100 h-64"></article>
                    
                    <!-- Card 3 -->
                    <article class="bg-white rounded-2xl shadow-sm border border-gray-100 h-64"></article>
                    
                    <!-- Card 4 -->
                    <article class="bg-white rounded-2xl shadow-sm border border-gray-100 h-64"></article>
                    
                    <!-- Card 5 -->
                    <article class="bg-white rounded-2xl shadow-sm border border-gray-100 h-64"></article>
                    
                    <!-- Card 6 -->
                    <article class="bg-white rounded-2xl shadow-sm border border-gray-100 h-64"></article>
                </div>
            <!-- Modal -->
          <div id="modal" class="fixed inset-0  flex items-center justify-center hidden">
              <div class="bg-white rounded-lg w-96 p-6 relative">
                  <h2 class="text-xl font-semibold mb-4">Agregar Voluntariado</h2>
                  <input type="text" placeholder="Nombre del voluntariado" class="border w-full p-2 rounded mb-4">
                  <textarea placeholder="Descripción" class="border w-full p-2 rounded mb-4"></textarea>
                  <div class="flex justify-end gap-2">
                      <button id="close-modal" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancelar</button>
                      <button class="px-4 py-2 bg-[#f56d95] text-white rounded hover:bg-[#fa5587]">Guardar</button>
                  </div>
              </div>
          </div>
            
        </main>
  `;
  navEvents();
    // 🔹 Agregar evento al botón
  const addBtn = document.getElementById("add-voluntariado-btn");
  const modal = document.getElementById("modal");
  const closeModal = document.getElementById("close-modal");

  addBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden"; // Desactiva scroll
});

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
  document.body.style.overflow = "auto"; // Reactiva scroll
});

  addBtn.addEventListener("click", () => {
    modal.classList.remove("hidden"); // Mostrar modal
  });

  closeModal.addEventListener("click", () => {
    modal.classList.add("hidden"); // Ocultar modal
  });

  // Cerrar modal al dar click fuera del contenido
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
  });
}