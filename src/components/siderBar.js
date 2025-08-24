import { auth } from "../utils/auth";

// Render navigation bar in the dashboard
export function renderSideBar(user = { name: "Usuaria" }) {

   const currentHash = window.location.hash || "#inicio";

  // helper para aplicar estilos activos
  const getBtnClass = (hash) => {
    return currentHash === hash
      ? "w-full bg-white text-black font-medium rounded-full px-6 py-3 cursor-pointer hover:bg-opacity-90 transition"
      : "w-full text-white font-medium py-3 px-6 rounded-full hover:bg-white hover:bg-opacity-10 transition";
  };

  return `
           <!-- Left Sidebar -->
<aside class="w-64 bg-[#f56d95] min-h-screen p-6 relative flex flex-col justify-between">
  <!-- Menú de navegación -->
  <nav class="space-y-4">
    <button id="comunidadBtn"
      class="${getBtnClass("#comunidad")} w-full hover:text-black text-white font-medium rounded-full px-6 py-3 cursor-pointer hover:bg-opacity-90 transition"
    >
      Comunidad
    </button>

    <button id="eventsBtn"
      class="${getBtnClass("#eventos")} w-full  hover:text-black text-white font-medium py-3 px-6 rounded-full hover:bg-white hover:bg-opacity-10 transition"
    >
      Eventos
    </button>

    <button id="supportBtn"
      class="${getBtnClass("#apoyo")} w-full  hover:text-black text-white font-medium py-3 px-6 rounded-full hover:bg-white hover:bg-opacity-10 transition"
    >
      Apoyo
    </button>

    <button id="friendsBtn"
      class="${getBtnClass("#amigas")} w-full  hover:text-black text-white font-medium py-3 px-6 rounded-full hover:bg-white hover:bg-opacity-10 transition"
    >
      Amigas
    </button>

    <button id="emprendimientosBtn"
      class="${getBtnClass("#emprendimientos")} w-full  hover:text-black text-white font-medium py-3 px-6 rounded-full hover:bg-white hover:bg-opacity-10 transition"
    >
      Emprendimientos
    </button>
  </nav>

  <!-- Usuario y botón de cerrar sesión -->
  <div class="mt-8">
    <button id="profileBtn"
        class="flex items-center gap-3 mb-4">
      <div class="w-8 h-8 bg-[#d9d9d9] rounded-lg"></div>
      <span class="text-white font-medium">${user?.name || "Usuaria"}</span>
    </button>

    <button id="logoutBtn"
      class="w-full px-4 py-2 bg-white hover:bg-red text-gray-600 font-semibold rounded-lg shadow-md transition duration-200 ease-in-out">
      Cerrar sesión
    </button>
  </div>
</aside>
  `;
}


export function navEvents() {
  const logoutBtn = document.getElementById("logoutBtn");
  const eventsBtn = document.getElementById("eventsBtn");
  const supportBtn = document.getElementById("supportBtn");
  const friendsBtn = document.getElementById("friendsBtn");
  const emprendimientosBtn = document.getElementById("emprendimientosBtn");
  const profileBtn = document.getElementById("profileBtn");

   if (logoutBtn) {
    logoutBtn.addEventListener("click", () => auth.logOut());  // ✅ corregido
  }
  if (comunidadBtn) {
    comunidadBtn.addEventListener("click", (e) => {
      e.preventDefault();
      history.pushState(null, null, '/artemisa/dashboard');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
  }


  if (eventsBtn) {
    eventsBtn.addEventListener("click", (e) => {
      e.preventDefault();
      history.pushState(null, null, '/artemisa/dashboard/events');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
  }

  if (supportBtn) {
    supportBtn.addEventListener("click", (e) => {
      e.preventDefault();
      history.pushState(null, null, '/artemisa/dashboard/support');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
  }
  if (friendsBtn) {
    friendsBtn.addEventListener("click", (e) => {
      e.preventDefault();
      history.pushState(null, null, '/artemisa/dashboard/amigas');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
  }
  if (emprendimientosBtn) {
    emprendimientosBtn.addEventListener("click", (e) => {
      e.preventDefault();
      history.pushState(null, null, '/artemisa/dashboard/emprendimientos');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
  }
  if (profileBtn) {
    profileBtn.addEventListener("click", (e) => {
      e.preventDefault();
      history.pushState(null, null, '/artemisa/dashboard/profile');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
  }
}

