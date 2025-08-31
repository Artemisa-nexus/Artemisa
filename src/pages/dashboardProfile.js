import { alertError } from "../components/alerts";
import { renderNav } from "../components/nav";
import { navEvents, renderSideBar } from "../components/siderBar";
import { deleteUser, updateUser } from "../services/servicesUser.js";
import { getGoals, showAchievedGoal } from "../services/usersGoalsService.js";
import { auth } from "../utils/auth.js";

// Render dashboardProfile view
export function renderDashboardProfile(app) {
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
            <img src=/assets/profile_picture.svg class="w-20 h-20">
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
                <div id="goals-achived-container" class="h-64 rounded-lg"></div>
              </div>
            </article>

            <!-- Metas Card -->
            <article class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div class="p-6">
                <h3 class="text-lg font-semibold text-artemisa-pink mb-4">Metas</h3>
                <div id="goals-container" class=" rounded-lg p-2 space-y-3 max-h-64 overflow-y-auto"></div>
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

  // References to buttons
  const editBtn = document.getElementById("editBtn");
  const deleteBtn = document.getElementById("deleteBtn");
  const overlay = document.getElementById("editOverlay");
  const cancelBtn = document.getElementById("cancelEdit");
  const editForm = document.getElementById("editForm");

  //show the overlay
  editBtn.addEventListener("click", () => {
    overlay.classList.remove("hidden");
  });

  // Close overlay
  cancelBtn.addEventListener("click", () => {
    overlay.classList.add("hidden");
  });

  // Save changes
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

      // Save changes to localStorage
      localStorage.setItem("user", JSON.stringify({ ...user, ...updatedData }));
      overlay.classList.add("hidden");
      renderDashboardProfile(app);
    } catch (err) {
      alertError("Error al actualizar usuario: " + err.message);
    }
  });

  // Delete user
  deleteBtn.addEventListener("click", async () => {
    const confirmation = confirm("¿Seguro que quieres eliminar tu cuenta? Esta acción no se puede deshacer.");
    if (confirmation) {
      try {
        await deleteUser(user.user_id);
        auth.logOut();
      } catch (err) {
        alertError("No se pudo eliminar el usuario: " + err.message);
      }
    }
  });

//Goals container that show all the goals and the goals achived
  const goalsContainer = document.getElementById("goals-container");
  const goalsAchivedContainer = document.getElementById("goals-achived-container");

  async function renderGoalsAchived(user_id) {
  goalsAchivedContainer.innerHTML = `<p class="text-gray-500 text-center">Cargando...</p>`;

  try {
    const goalsAchived = await showAchievedGoal(JSON.parse(localStorage.getItem("user")).user_id);
    console.table(goalsAchived);

    goalsAchivedContainer.innerHTML = "";
    // Check if there are any achieved goals
    if (goalsAchived.length === 0) {
      const msg = document.createElement("p");
      msg.className = "text-gray-500 text-center";
      msg.textContent = "Todavía no has logrado ninguna meta.";
      goalsAchivedContainer.appendChild(msg);
      return;
    }
//
    goalsAchived.forEach((goal) => {
      const article = document.createElement("article");
      article.className =
        "space-y-1 bg-white rounded-2xl border-l-4 border-[#f56d95] shadow-sm pl-2 pr-4 py-3 mb-2";

      article.innerHTML = `
        <div class="flex items-center space-x-2">
          <img src="/assets/goal_icon.svg" class="w-10 h-10 inline-block">
          <div>
            <h4 class="text-sm font-semibold text-artemisa-pink">${goal.title}</h4>
            <p class="text-gray-600 text-sm">${goal.description}</p>
            <p class="text-xs text-gray-400">Lograda el: ${new Date(goal.achieved_date).toLocaleDateString()}</p>
          </div>
        </div>
      `;

      goalsAchivedContainer.appendChild(article);
    });
  } catch (err) {
    console.error(err);
    goalsAchivedContainer.innerHTML =
      `<p class="text-red-500 text-center">Error al cargar metas alcanzadas</p>`;
  }
}

async function renderGoals() {
  goalsContainer.innerHTML = `<p class="text-gray-500 text-center">Cargando metas...</p>`;

  try {
    const goals = await getGoals();

    if (goals.length === 0) {
      goalsContainer.innerHTML = `<p class="text-gray-500 text-center">No hay metas disponibles en este momento.</p>`;
      return;
    }

    goalsContainer.innerHTML = ""; 

    goals.forEach((goal) => {
      goalsContainer.innerHTML += `
        <article class="space-y-1 bg-white rounded-2xl border-l-4 border-[#f56d95] shadow-sm pl-2 pr-4 py-3 mb-2">
        <div class="flex items-center space-x-2">
          <img src="/assets/goal_icon.svg" class="w-10 h-10 inline-block">
          <div>
           <h4 class=" text-sm font-semibold text-artemisa-pink">${goal.title}</h4>
          <p class=" text-gray-600 text-sm">${goal.description}</p>
          </div>
          </div>
        </article>
      `;
    });
  } catch (err) {
    console.error(err);
    goalsContainer.innerHTML = `<p class="text-red-500 text-center">Error al cargar metas.</p>`;
  }
}

// Goals container that show all the goals and the goals achieved
  renderGoals();
  renderGoalsAchived();
}


