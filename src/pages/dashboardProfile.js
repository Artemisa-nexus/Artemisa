import { renderNav } from "../components/nav";
import { navEvents, renderSideBar } from "../components/siderBar";

export function renderDashboardProfile(app) {
  const user = { name: "" }; // 🔹 prueba
  app.innerHTML = `
      ${renderNav()}
      <div class="flex">
      ${renderSideBar(user)}
      <!-- Main Dashboard Content -->
            <main class="flex-1 p-8 space-y-8">
                <!-- User Profile Section -->
                <section class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                    <article class="flex items-center space-x-4">
                        <div class="w-20 h-20 bg-gray-300 rounded-lg"></div>
                        <h2 class="text-xl font-semibold text-artemisa-pink">Nombre Usuario</h2>
                    </article>
                </section>

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
}