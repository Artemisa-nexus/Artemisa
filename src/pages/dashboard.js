import { renderNav } from "../components/nav";
import { navEvents, renderSideBar } from "../components/siderBar";
import { getPublicationById} from "../services/publicationServices";

// Tarjeta de publicación
function renderPublicationCard(publication) {
  return `
    <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <p class="text-gray-700">${publication.content}</p>
    </div>
  `;
}

// Dashboard para usuarios
export async function renderDashboard(app) {
  const user = JSON.parse(localStorage.getItem("user")) || { fullname: "Invitada" };

  // Obtener publicaciones
  const publications = await getPublicationById();

  const postsHtml = publications.length > 0
    ? publications.map(renderPublicationCard).join("")
    : `
      <section class="bg-white rounded-2xl h-32 shadow-sm border border-gray-100 flex items-center justify-center text-gray-400">
        No hay publicaciones aún.
      </section>
    `;

  app.innerHTML = `
    ${renderNav()}
    <div class="flex">
      ${renderSideBar(user)}
      <main class="flex-1 p-6">
        <div class="max-w-2xl mx-auto space-y-6">
          ${postsHtml}
        </div>
      </main>
    </div>
  `;

  navEvents();
}
