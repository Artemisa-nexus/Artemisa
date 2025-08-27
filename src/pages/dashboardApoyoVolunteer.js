import { renderNav } from "../components/nav";
import { navEvents, renderSideBar } from "../components/siderBar";

// Render dashboardSupport view
export function renderDashboardSupportVolunteer(app) {
const user = JSON.parse(localStorage.getItem("user")) || { fullname: "Invitada" };
  app.innerHTML = `
      ${renderNav()}
      <div class="flex">
      ${renderSideBar(user)}
       <main class="flex-1 p-6">
            <div class="flex-1 p-6">
                <!-- Page Header -->
                <section class="flex items-center justify-between mb-6">
                    <h1 class="text-3xl font-semibold text-[#f56d95]">APOYO</h1>
                </section>
                
                <!-- Event Cards Container -->
                <section class="space-y-6">
                    <!-- First Event Card -->
                    <article class="bg-white rounded-2xl border border-gray-200 h-48 shadow-sm"></article>
                    
                    <!-- Second Event Card -->
                    <article class="bg-white rounded-2xl border border-gray-200 h-48 shadow-sm"></article>
                </section>
            </div> 
        </main>
        </div>
  `;
  navEvents();
}