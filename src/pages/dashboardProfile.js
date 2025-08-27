import { renderNav } from "../components/nav";
import { navEvents, renderSideBar } from "../components/siderBar";
import { deleteUser, updateUser } from "../js/api";

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
    </div>
  `;
  navEvents();
  //Buttons edit and delete
   const editBtn = document.getElementById("editBtn");
  const deleteBtn = document.getElementById("deleteBtn");

  // Event listener for edit the user
  editBtn.addEventListener("click", async () => {
    const newName = prompt("Nuevo nombre:", user.fullname);
    if (newName) {
      user.fullname = newName;
      await updateUser(user.id, user);
      localStorage.setItem("user", JSON.stringify(user));
      renderDashboardProfile(app); 
    }
  });

  // Event listener for delete the user
  deleteBtn.addEventListener("click", async () => {
    if (confirm("¿Seguro que quieres eliminar tu cuenta? Esta acción no se puede deshacer.")) {
      await deleteUser(user.id);
      auth.logOut();
    }
  });

}

