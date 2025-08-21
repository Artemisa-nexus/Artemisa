// Render navigation bar in the dashboard
export function renderSideBar() {
  return `
           <!-- Left Sidebar -->
<aside class="w-64 bg-[#f56d95] min-h-screen p-6 relative flex flex-col justify-between">
  <!-- Menú de navegación -->
  <nav class="space-y-4">
    <button id="comunidadBtn"
      class="w-full bg-white text-black font-medium rounded-full px-6 py-3 cursor-pointer hover:bg-opacity-90 transition"
    >
      Comunidad
    </button>

    <button id="voluntariadosBtn"
      class="w-full text-white font-medium py-3 px-6 rounded-full hover:bg-white hover:bg-opacity-10 transition"
    >
      Voluntariados
    </button>

    <button id="eventsBtn"
      class="w-full text-white font-medium py-3 px-6 rounded-full hover:bg-white hover:bg-opacity-10 transition"
    >
      Eventos
    </button>

    <button id="supportBtn"
      class="w-full text-white font-medium py-3 px-6 rounded-full hover:bg-white hover:bg-opacity-10 transition"
    >
      Apoyo
    </button>

    <button id="friendsBtn"
      class="w-full text-white font-medium py-3 px-6 rounded-full hover:bg-white hover:bg-opacity-10 transition"
    >
      Amigas
    </button>

    <button id="emprendimientosBtn"
      class="w-full text-white font-medium py-3 px-6 rounded-full hover:bg-white hover:bg-opacity-10 transition"
    >
      Emprendimientos
    </button>
  </nav>

  <!-- Usuario y botón de cerrar sesión -->
  <div class="mt-8">
    <button id="userBtn"
        class="flex items-center gap-3 mb-4">
      <div class="w-8 h-8 bg-[#d9d9d9] rounded-lg"></div>
      <span class="text-white font-medium">${user?.name || "Usuaria"}</span>
    </button>

    <button id="logoutBtn"
      class="w-full px-4 py-2 bg-[#ff6b6b] hover:bg-[#ff5252] text-white font-semibold rounded-lg shadow-md transition duration-200 ease-in-out">
      Cerrar sesión
    </button>
  </div>
</aside>
  `;
}


export function navEvents() {
  const logoutBtn = document.getElementById("logoutBtn");
  const voluntariadosBtn = document.getElementById("voluntariadosBtn");
  const eventsBtn = document.getElementById("eventsBtn");
  const supportBtn = document.getElementById("supportBtn");
  const friendsBtn = document.getElementById("friendsBtn");
  const emprendimientosBtn = document.getElementById("emprendimientosBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => logoutUser());
  }

  if (voluntariadosBtn) {
    voluntariadosBtn.addEventListener("click", () => {
      window.location.hash = "voluntariados";
    });
  }

  if (eventsBtn) {
    eventsBtn.addEventListener("click", () => {
      window.location.hash = "eventos";
    });
  }

  if (supportBtn) {
    supportBtn.addEventListener("click", () => {
      window.location.hash = "apoyo";
    });
  }
  if (friendsBtn) {
    friendsBtn.addEventListener("click", () => {
      window.location.hash = "amigas";
    });
  }
  if (emprendimientosBtn) {
    emprendimientosBtn.addEventListener("click", () => {
      window.location.hash = "emprendimientos";
    });
  }
}

