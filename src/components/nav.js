// Render navigation bar in the dashboard
export function renderNav() {
  return `
    <header
      class="bg-white px-4 py-0 flex items-center justify-between border-b border-gray-100"
    >
      <img
        src="/public/assets/logo_color-recortado.svg"
        alt="logo-letras"
        class="h-25 w-25 overflow-hidden"
      />

      <div class="flex-1 max-w-md mx-8">
        <section class="relative">
          <img src="/public/assets/icono_buscar.svg" alt="icono-buscar" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            class="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#f56d95] focus:border-transparent"
            placeholder=""
          />
        </section>
      </div>

      <section class="flex items-center gap-4">
        <img
          src="/public/assets/icono_msj.svg"
          alt="icono-msj"
          class="w-10 h-10"
        />
        <img
          src="/public/assets/icono_noti.svg"
          alt="icono-notif"
          class="w-9 h-9"
        />
      </section>
    </header>
  `;
}