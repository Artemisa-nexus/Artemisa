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
                    <button id="photo-btn" class="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      </svg>
                    </button>
                    <input type="file" id="photo-input" accept="image/*" style="display:none" />
                  </div>
                  <button id="publish-btn" class="px-6 py-2 bg-[#f56d95] text-white rounded-full hover:bg-[#fa5587] transition-colors">
                    Publicar
                  </button>
                </div>
                <div id="photo-preview" class="mt-2"></div>
              </div>
            </article>
          </section>
        </div>
      </main>
    </div>
  `;

  navEvents();

  // Handler para adjuntar foto
  const photoBtn = document.getElementById("photo-btn");
  const photoInput = document.getElementById("photo-input");
  const photoPreview = document.getElementById("photo-preview");
  let photoFile = null;

  photoBtn.addEventListener("click", () => {
    photoInput.click();
  });

  photoInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      photoFile = file;
      const reader = new FileReader();
      reader.onload = function (ev) {
        photoPreview.innerHTML = `<img src="${ev.target.result}" alt="preview" class="w-24 h-24 object-cover rounded-xl" />`;
      };
      reader.readAsDataURL(file);
    } else {
      photoPreview.innerHTML = "";
      photoFile = null;
    }
  });

  // Handler para publicar texto y foto
  const publishBtn = document.getElementById("publish-btn");
  const postTextarea = document.getElementById("post-textarea");

  publishBtn.addEventListener("click", async () => {
    const text = postTextarea.value.trim();
    if (!text && !photoFile) {
      alert("Escribe algo o adjunta una foto para publicar.");
      return;
    }

    let imageBase64 = null;
    if (photoFile) {
      // Convertir la imagen a base64
      imageBase64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function (ev) {
          resolve(ev.target.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(photoFile);
      });
    }

    // Crear objeto publicación
    const publication = {
      user_id: user.user_id,
      content: text,
      image: imageBase64, 
      reference_id: null  
    };

    // Enviar al backend
    try {
      const result = await addPublication(publication);

      // Accedemos al objeto devuelto
      const pub = result.publication;
      console.log(pub);

      let postHtml = `
        <div class='bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mt-4'>
          <p class='text-gray-700'>${pub.content}</p>
      `;
      if (pub.image) {
        postHtml += `<img src='${pub.image}' alt='preview' class='w-24 h-24 object-cover rounded-xl mt-2' />`;
      }
      postHtml += `</div>`;

      const postSection = document.getElementById("post-section");
      console.log(postSection);
      postSection.insertAdjacentHTML("beforeend", postHtml);

      // Limpiar campos
      postTextarea.value = "";
      photoPreview.innerHTML = "";
      photoFile = null;
      photoInput.value = "";
    } catch (error) {
      console.error("Error al publicar:", error);
    }
  });
}
