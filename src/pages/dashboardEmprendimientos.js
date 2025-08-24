import { renderNav } from "../components/nav";
import { navEvents, renderSideBar } from "../components/siderBar";

export function renderDashboardEmprendimientos(app) {
const user = JSON.parse(localStorage.getItem("user")) || { fullname: "Invitada" };
  app.innerHTML = `
      ${renderNav()}
      <div class="flex">
      ${renderSideBar(user)}
       <main class="flex-1 p-8">
                <!-- Tus emprendimientos section -->
                <section class="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-gray-200">
                    <div class="flex items-center justify-between">
                        <h2 class="text-2xl font-semibold text-[#f56d95]">Tus emprendimientos</h2>
                        <button class="bg-[#f56d95] text-white px-4 py-2 rounded-lg hover:bg-[#f84e81] transition-colors">
                            Add
                        </button>
                    </div>
                </section>
                
                <!-- Market Place section -->
                <div>
                    <h2 class="text-3xl font-semibold text-[#f56d95] mb-6">Market Place</h2>

                    <!-- Grid of cards -->
                    <section class="grid grid-cols-3 gap-6">
                        <!-- Row 1 -->
                        <article class="bg-white rounded-2xl h-64 shadow-sm border border-gray-200"></article>
                        <article class="bg-white rounded-2xl h-64 shadow-sm border border-gray-200"></article>
                        <article class="bg-white rounded-2xl h-64 shadow-sm border border-gray-200"></article>

                        <!-- Row 2 -->
                        <article class="bg-white rounded-2xl h-64 shadow-sm border border-gray-200"></article>
                        <article class="bg-white rounded-2xl h-64 shadow-sm border border-gray-200"></article>
                        <article class="bg-white rounded-2xl h-64 shadow-sm border border-gray-200"></article>

                    </section>
                </div>
            </main>
        </div>
  `;
  navEvents();
}