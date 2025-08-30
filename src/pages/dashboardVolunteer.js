import { alertError } from "../components/alerts";
import { renderNav } from "../components/nav";
import { navEvents, renderSideBar } from "../components/siderBar";
import { addPublication } from "../services/publicationServices";

// Render navigation dashboard view
export function renderDashboardVolunteer(app) {
  const user = JSON.parse(localStorage.getItem("user")) || { fullname: "Volunteer" };

  app.innerHTML = `
    ${renderNav()}
    <div class="flex">
      ${renderSideBar(user)}
      <main class="flex-1 p-6">
        <div id="post-section" class="max-w-2xl mx-auto space-y-6">
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

                  </div>
                  <button id="publish-btn" class="px-6 py-2 bg-[#f56d95] text-white rounded-full hover:bg-[#fa5587] transition-colors">
                    Publicar
                  </button>
                </div>
                <div id="photo-preview" class="mt-2"></div>
              </div>
            </article>
          </section>

          <!-- Empty Post Cards -->
          <section class="bg-white rounded-2xl h-32 shadow-sm border border-gray-100"></section>
          <section class="bg-white rounded-2xl h-32 shadow-sm border border-gray-100"></section>
        </div>
      </main>
    </div>
  `;

  navEvents();
/*
  // Handler para publicar texto y foto
  const publishBtn = document.getElementById("publish-btn");
  const postTextarea = document.getElementById("post-textarea");

  publishBtn.addEventListener("click", async () => {
    const text = postTextarea.value.trim();
    if (!text) {
      alertError("Escribe algo para publicar.");
      return;
    }
    // Crear objeto publicación
    const publication = {
      user_id: user.user_id,
      content: text,
      reference_id: null
    };
    try {
      const result = await addPublication(publication);
      const pub = result.publication;
      console.log(pub);

      let postHtml = `
        <div class='bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mt-4'>
          <p class='text-gray-700'>${pub.content}</p>
      `;
      postHtml += `</div>`;

      const postSection = document.getElementById("post-section");
      console.log(postSection);
      postSection.insertAdjacentHTML("beforeend", postHtml);


      postTextarea.value = "";
    } catch (error) {
      console.error("Error al publicar:", error);
    }
  });
  */
}
