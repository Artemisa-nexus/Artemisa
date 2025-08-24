import { renderNav } from "../components/nav";
import { navEvents, renderSideBar } from "../components/siderBar";

export function renderDashboard(app) {
  const user = JSON.parse(localStorage.getItem("user")) || { fullname: "Invitada" };
  app.innerHTML = `
      ${renderNav()}
      <div class="flex">
      ${renderSideBar(user)}
       <main class="flex-1 p-6">
            <div class="max-w-2xl mx-auto space-y-6">
                <!-- Post Creation -->
                <section class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <article class="flex items-start gap-4">
                        <div class="w-12 h-12 bg-artemisa-gray rounded-full flex-shrink-0"></div>

                        <div class="flex-1">
                            <textarea
                                id="post-textarea"
                                class="w-full resize-none border-none outline-none text-gray-500 placeholder-gray-400 text-lg"
                                placeholder="Comparte algo con la comunidad..."
                                rows="3"
                            ></textarea>

                            <div class="flex items-center justify-between mt-4">
                                <div class="flex gap-4">
                                    <button class="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors" onclick="handlePhotoClick()">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        </svg>
                                        <span class="text-sm">Foto</span>
                                    </button>

                                    <button class="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors" onclick="handleLocationClick()">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        </svg>
                                        <span class="text-sm">Ubicación</span>
                                    </button>
                                </div>

                                <button class="px-6 py-2 bg-[#f56d95] text-white rounded-full hover:bg-[#fa5587] transition-colors" onclick="handlePublish()">
                                    Publicar
                                </button>
                            </div>
                        </div>
                    </article>
                </section>

                <!-- Empty Post Cards -->
                <section class="bg-white rounded-2xl h-32 shadow-sm border border-gray-100"></section>
                <section class="bg-white rounded-2xl h-32 shadow-sm border border-gray-100"></section>
            </div>
        </main>
  `;
  navEvents();
}