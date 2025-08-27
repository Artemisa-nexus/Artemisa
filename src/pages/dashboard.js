import { renderNav } from "../components/nav";
import { navEvents, renderSideBar } from "../components/siderBar";

// Render navigation dashboard view
export function renderDashboard(app) {
  const user = JSON.parse(localStorage.getItem("user")) || { fullname: "Invitada" };
  app.innerHTML = `
      ${renderNav()}
      <div class="flex">
      ${renderSideBar(user)}
       <main class="flex-1 p-6">
            <div class="max-w-2xl mx-auto space-y-6">
                <!-- Empty Post Cards -->
                <section class="bg-white rounded-2xl h-32 shadow-sm border border-gray-100"></section>
                <section class="bg-white rounded-2xl h-32 shadow-sm border border-gray-100"></section>
            </div>
        </main>
  `;
  navEvents();
}