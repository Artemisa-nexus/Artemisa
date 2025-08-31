import { renderNav } from "../components/nav";
import { navEvents, renderSideBar } from "../components/siderBar";
import { GetAllRollUSer} from "../services/servicesUser.js";

// Render the volunteer dashboard
export function renderDashboardProfileVolunteer(app) {
  const user = JSON.parse(localStorage.getItem("user")) || { fullname: "Invitada" };
  if (!user.user_id) {
      alertError("Debes iniciar sesión para unirte a eventos");
    }
  app.innerHTML = `
      ${renderNav()}
      <div class="flex">
        ${renderSideBar(user)}
        <!-- Main Dashboard Content -->
        <main class="flex-1 p-8 space-y-8">
          <!-- User Profile Section -->
          <article class="flex items-center space-x-4 mb-6">
            <img src="../assets/profile_picture.svg" class="w-20 h-20">
            <h2 class="text-xl font-semibold text-artemisa-pink">${user.fullname}</h2>
          </article>

          <!-- Cards Section -->
          <section>
            <h3 class="text-2xl font-bold text-[#f56d95] mb-4">Usuarias</h3>
            <div id="users-container" class="grid grid-cols-2 gap-6"></div>
          </section>

        </main>
      </div>

  `;

  navEvents();
  
  // === render all the users that are registered ===
  const usersContainer = document.getElementById("users-container");

  GetAllRollUSer()
    .then(users => {
      usersContainer.innerHTML = "";
      users.forEach(u => {
        usersContainer.innerHTML += `
          <article class="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
            <h4 class="text-md font-semibold text-gray-800">${u.fullname}</h4>
            <p class="text-gray-500 text-sm">${u.email || "Sin correo"}</p>
          </article>`;
      });
    })
    .catch(error => {
      console.error("Error fetching users:", error);
      usersContainer.innerHTML = `<p class="text-red-500">Error cargando usuarias</p>`;
    });
}