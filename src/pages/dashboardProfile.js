import { renderNav } from "../components/nav";
import { navEvents, renderSideBar } from "../components/siderBar";
import { deleteUser, updateUser } from "../services/servicesUser";
import { auth } from "../utils/auth";

// Render dashboardProfile view
export function renderDashboardProfile(app) {
  const user = JSON.parse(localStorage.getItem("user")) || { fullname: "Invitada" };

  app.innerHTML = `
      ${renderNav()}
      <div class="flex">
        ${renderSideBar(user)}
        <!-- Main Dashboard Content -->
        <main class="flex-1 p-8 space-y-8">
          <!-- User Profile Section -->
          <article class="flex items-center space-x-4 mb-6">
            <img src="/public/assets/profile_picture.svg" class="w-20 h-20">
            <h2 class="text-xl font-semibold text-artemisa-pink">${user.fullname}</h2>
          </article>

          <div class="mt-4 flex space-x-4 ml-160">
            <button id="editBtn" class="bg-[#f56d95] text-white px-4 py-2 rounded-lg hover:bg-[#f84e81]"> Editar </button>
            <button id="deleteBtn" class="bg-[#f9a825] text-white px-4 py-2 rounded-lg hover:bg-[#ff9f05]"> Eliminar cuenta </button>
          </div>

          <!-- Cards Section -->
          <section class="grid grid-cols-2 gap-6">
            <!-- Logros Card -->
            <article class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div class="p-6">
                <h3 class="text-lg font-semibold text-artemisa-pink mb-4">Logros</h3>
                <div class="h-64 bg-gray-50 rounded-lg"></div>
              </div>
            </article>

            <!-- Metas Card -->
            <article class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div class="p-6">
                <h3 class="text-lg font-semibold text-artemisa-pink mb-4">Metas</h3>
                <div class="h-64 bg-gray-50 rounded-lg"></div>
              </div>
            </article>
          </section>
        </main>
      </div>

      <!-- Overlay para editar usuario -->
      <div id="editOverlay" class="fixed inset-0 hidden bg-[#fdf9fb] bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-2xl p-8 w-96 shadow-lg relative">
          <h3 class="text-lg font-semibold mb-4">Editar Perfil</h3>
          <form id="editForm" class="space-y-4">
            <input type="text" id="editFullname" class="w-full border rounded p-2" placeholder="Nombre completo" value="${user.fullname}" />
            <input type="text" id="editIdentification" class="w-full border rounded p-2" placeholder="Identificación" value="${user.identification}" />
            <input type="email" id="editEmail" class="w-full border rounded p-2" placeholder="Correo electrónico" value="${user.email}" />
            <input type="password" id="editPassword" class="w-full border rounded p-2" placeholder="Contraseña" value="${user.password_}" disabled />
            <div class="flex justify-end space-x-2 mt-4">
              <button type="button" id="cancelEdit" class="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">Cancelar</button>
              <button type="submit" class="px-4 py-2 rounded bg-[#f56d95] text-white hover:bg-[#f84e81]">Guardar</button>
            </div>
          </form>
        </div>
      </div>
  `;

  navEvents();

  // Referencias a botones
  const editBtn = document.getElementById("editBtn");
  const deleteBtn = document.getElementById("deleteBtn");
  const overlay = document.getElementById("editOverlay");
  const cancelBtn = document.getElementById("cancelEdit");
  const editForm = document.getElementById("editForm");

  //Mostrar overlay
  editBtn.addEventListener("click", () => {
    overlay.classList.remove("hidden");
  });

  // Cerrar overlay
  cancelBtn.addEventListener("click", () => {
    overlay.classList.add("hidden");
  });

  // Guardar cambios
  editForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const updatedData = {
      fullname: document.getElementById("editFullname").value,
      identification: document.getElementById("editIdentification").value,
      email: document.getElementById("editEmail").value,
      password_: user.password_ 
    };

    try {
      await updateUser(user.user_id, updatedData);

      // Guardar cambios en localStorage
      localStorage.setItem("user", JSON.stringify({ ...user, ...updatedData }));
      overlay.classList.add("hidden");
      renderDashboardProfile(app);
    } catch (err) {
      alert("Error al actualizar usuario: " + err.message);
    }
  });

  // 👉 Eliminar usuario
  deleteBtn.addEventListener("click", async () => {
    const confirmation = confirm("¿Seguro que quieres eliminar tu cuenta? Esta acción no se puede deshacer.");
    if (confirmation) {
      try {
        await deleteUser(user.user_id);
        auth.logOut();
      } catch (err) {
        alert("No se pudo eliminar el usuario: " + err.message);
      }
    }
  });
}


