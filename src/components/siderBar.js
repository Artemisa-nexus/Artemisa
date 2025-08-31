import { auth } from "../utils/auth";
import profilePicture from "../assets/profile_picture.svg";

// Render navigation bar in the dashboard
export function renderSideBar(user = { fullname: "Usuaria" }) {
  const currentHash = window.location.hash || "#inicio";

  // helper para aplicar estilos activos
  const getBtnClass = (hash) => {
    return currentHash === hash
      ? "w-full bg-white text-black font-medium rounded-full px-6 py-3 cursor-pointer hover:bg-opacity-90 transition"
      : "w-full text-white font-medium py-3 px-6 rounded-full hover:bg-white hover:text-black hover:bg-opacity-10 transition";
  };

  return `
  <!-- Responsive Sidebar -->
  <div class="flex">
    <!-- Botón hamburguesa (solo en pantallas pequeñas) -->
    <button id="toggleSidebar"
      class="md:hidden fixed top-4 left-4 z-50 bg-[#f56d95] text-white p-2 rounded-lg shadow-lg">

    </button>

    <!-- Sidebar -->
    <aside id="sidebar"
      class="fixed md:relative transform -translate-x-full md:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-[#f56d95] min-h-screen p-6 flex flex-col justify-between z-40">

      <!-- Menú de navegación -->
      <nav class="space-y-4">
        <button id="comunidadBtn"
          class="${getBtnClass("#comunidad")}">
          Comunidad
        </button>

        <button id="eventsBtn"
          class="${getBtnClass("#eventos")}">
          Eventos
        </button>

        <button id="supportBtn"
          class="${getBtnClass("#apoyo")}">
          Apoyo
        </button>
      </nav>

      <!-- Usuario y botón de cerrar sesión -->
      <div class="mt-8">
        <button id="profileBtn"
          class="flex items-center gap-3 mb-4">
          <img src=${profilePicture} class="w-10 h-10">
          <span class="text-white font-medium">${user.fullname}</span>
        </button>

        <button id="logoutBtn"
          class="w-full px-4 py-2 bg-white hover:bg-red text-gray-600 font-semibold rounded-lg shadow-md transition duration-200 ease-in-out">
          Cerrar sesión
        </button>
      </div>
    </aside>
  </div>
  `;
}

export function navEvents() {
  const logoutBtn = document.getElementById("logoutBtn");
  const eventsBtn = document.getElementById("eventsBtn");
  const supportBtn = document.getElementById("supportBtn");
  const profileBtn = document.getElementById("profileBtn");
  const comunidadBtn = document.getElementById("comunidadBtn");

  const user = JSON.parse(localStorage.getItem("user")) || {};

  // Event: log out user
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => auth.logOut());
  }
  // Event: navigate to community view
  if (comunidadBtn) {
    comunidadBtn.addEventListener("click", (e) => {
      e.preventDefault();
      history.pushState(null, null, "/artemisa/dashboard");
      window.dispatchEvent(new PopStateEvent("popstate"));
    });
  }

  // Event: navigate to events view
  if (eventsBtn) {
    eventsBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (user.role_id === 2 || user.role_id === 3) {
        history.pushState(null, null, "/artemisa/dashboard/events/volunteer");
      } else {
        history.pushState(null, null, "/artemisa/dashboard/events");
      }
      window.dispatchEvent(new PopStateEvent("popstate"));
    });
  }

  // Event: navigate to support view
  if (supportBtn) {
    supportBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (user.role_id === 2 || user.role_id === 3) {
        history.pushState(null, null, "/artemisa/dashboard/apoyo/volunteer");
      } else {
        history.pushState(null, null, "/artemisa/dashboard/support");
      }
      window.dispatchEvent(new PopStateEvent("popstate"));
    });
  }

  // Event: navigate to profile view
  if (profileBtn) {
    profileBtn.addEventListener("click", (e) => {
      e.preventDefault();

      if (user.role_id == 3) {
        history.pushState(
          null,
          null,
          "/artemisa/dashboard/profile/administrador"
        );
      } else if (user.role_id == 2) {
        history.pushState(null, null, "/artemisa/dashboard/profile/voluntario");
      } else {
        history.pushState(null, null, "/artemisa/dashboard/profile");
      }
      window.dispatchEvent(new PopStateEvent("popstate"));
    });
  }
}
