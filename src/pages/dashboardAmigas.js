import { renderNav } from "../components/nav";
import { navEvents, renderSideBar } from "../components/siderBar";

export function renderDashboardAmigas(app) {
const user = JSON.parse(localStorage.getItem("user")) || { fullname: "Invitada" };

  app.innerHTML = `
      ${renderNav()}
      <div class="flex">
      ${renderSideBar(user)}
        <div class="flex-1 p-8">
            <section class="max-w-6xl mx-auto">
                <!-- Page Title -->
                <h2 class="text-3xl font-light text-[#f56d95] mb-8">Buscar amigas</h2>
                
                <!-- Search Input -->
                <div class="mb-8">
                    <input 
                        type="text" 
                        placeholder="Buscar amigas..." 
                        class="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#f56d95] focus:border-transparent text-lg"
                    >
                </div>
                
                <!-- Friends Grid -->
                <section class="grid grid-cols-3 gap-6">
                    <!-- Friend Card 1 -->
                    <article class="bg-white rounded-2xl shadow-sm border border-gray-100 h-64 hover:shadow-md transition-shadow"></article>
                    
                    <!-- Friend Card 2 -->
                    <article class="bg-white rounded-2xl shadow-sm border border-gray-100 h-64 hover:shadow-md transition-shadow"></article>
                    
                    <!-- Friend Card 3 -->
                    <article class="bg-white rounded-2xl shadow-sm border border-gray-100 h-64 hover:shadow-md transition-shadow"></article>
                    
                    <!-- Friend Card 4 -->
                    <article class="bg-white rounded-2xl shadow-sm border border-gray-100 h-64 hover:shadow-md transition-shadow"></article>
                    
                    <!-- Friend Card 5 -->
                    <article class="bg-white rounded-2xl shadow-sm border border-gray-100 h-64 hover:shadow-md transition-shadow"></article>
                    
                    <!-- Friend Card 6 -->
                    <article class="bg-white rounded-2xl shadow-sm border border-gray-100 h-64 hover:shadow-md transition-shadow"></article>
                </section>
            </section>
        </div>
  `;
  navEvents();
}