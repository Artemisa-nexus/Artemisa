import { renderNav } from "../components/nav";
import { navEvents, renderSideBar } from "../components/siderBar";
import { 
  getAllPublications, 
  createPublication, 
  updatePublication, 
  deletePublication 
} from "../services/publicationServices.js";

// CARD OF PUBLICATION WITH BUTTONS
function renderPublicationCard(publication) {
  return `
    <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-2" data-id="${publication.publication_id}">
      <p class="text-gray-700">${publication.content}</p>
      <div class="flex justify-end space-x-2 text-sm">
        <button class="edit-btn text-[#d08306] hover:underline">Editar</button>
        <button class="delete-btn text-[#ef366d] hover:underline">Eliminar</button>
      </div>
    </div>
  `;
}

// Dashboard for the users and admi
export async function renderDashboard(app) {
  const user = JSON.parse(localStorage.getItem("user")) || { fullname: "Invitada", user_id: 1 };
  if (!user.user_id) {
      alertError("Debes iniciar sesión para unirte a eventos");
    }
  // show publications
  let publications = [];
  try {
    publications = await getAllPublications();
  } catch (err) {
    console.error("Error cargando publicaciones:", err.message);
  }

  const postsHtml = publications.length > 0
    ? publications.map(renderPublicationCard).join("")
    : `
      <section class="bg-white rounded-2xl h-32 shadow-sm border border-gray-100 flex items-center justify-center text-gray-400">
        No hay publicaciones aún.
      </section>
    `;
//render all the dashboard
  app.innerHTML = `
    ${renderNav()}
    <div class="flex">
      ${renderSideBar(user)}
      <main class="flex-1 p-6">
        <div class="max-w-2xl mx-auto space-y-6">
          <!-- Bienvenida -->
          <h2 class="text-xl font-semibold text-gray-800">
            Bienvenida nuevamente, <span class="text-[#f56d95]">${user.fullname}</span>
          </h2>

          <!-- Formulario de nueva publicación -->
          <form id="new-publication-form" class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-3">
            <textarea 
              id="publication-content" 
              class="w-full border rounded-lg p-2" 
              rows="3" 
              placeholder="¿Qué estás pensando hoy, ${user.fullname}?">
            </textarea>
            <button type="submit" class="px-4 py-2 bg-[#f56d95] text-white rounded-lg hover:bg-[#ef366d]/80">
              Publicar
            </button>
          </form>

          <!-- Lista de publicaciones -->
          <div id="posts-container" class="space-y-4">
            ${postsHtml}
          </div>
        </div>
      </main>
    </div>
  `;

  navEvents();

  // ===== EVENTOS =====
  const form = document.getElementById("new-publication-form");
  const textarea = document.getElementById("publication-content");
  const postsContainer = document.getElementById("posts-container");

  // Create publication
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const content = textarea.value.trim();
    if (!content) return;

    try {
      const newPub = await createPublication({ user_id: user.user_id, content });
      postsContainer.innerHTML = renderPublicationCard(newPub.publication) + postsContainer.innerHTML;
      textarea.value = "";
    } catch (err) {
      console.error("Error creando publicación:", err.message);
    }
  });

  // delete or update element
  postsContainer.addEventListener("click", async (e) => {
    const card = e.target.closest("[data-id]");
    if (!card) return;
    const pubId = card.dataset.id;

    // Delete
    if (e.target.classList.contains("delete-btn")) {
      try {
        await deletePublication(pubId);
        card.remove();
      } catch (err) {
        console.error("Error eliminando publicación:", err.message);
      }
    }

    // Update
    if (e.target.classList.contains("edit-btn")) {
      const contentEl = card.querySelector("p");
      const oldContent = contentEl.textContent;
      const newContent = prompt("Editar publicación:", oldContent);

      if (newContent && newContent !== oldContent) {
        try {
          await updatePublication(pubId, { user_id: user.user_id, content: newContent });
          contentEl.textContent = newContent;
        } catch (err) {
          console.error("Error actualizando publicación:", err.message);
        }
      }
    }
  });
}
