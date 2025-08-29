import { renderNav } from "../components/nav";
import { navEvents, renderSideBar } from "../components/siderBar";
import { addUser } from "../services/registerService";
import { GetAllRollUSer, getAllRollVolunteers} from "../services/servicesUser";
import { getAllVolunteerOrgs, getVolunteerOrgById } from "../services/volunteerService";

export function renderDashboardProfileAdmi(app) {
  const user = JSON.parse(localStorage.getItem("user")) || { fullname: "Invitada" };

  app.innerHTML = `
      ${renderNav()}
      <div class="flex">
        ${renderSideBar(user)}
        <!-- Main Dashboard Content -->
        <main class="flex-1 p-8 space-y-8">
          <!-- User Profile Section -->
          <article class="flex items-center space-x-4 mb-6">
            <img src="/public/assets/profile_picture.svg" class="w-20 h-20">
            <h2 class="text-xl font-semibold text-artemisa-pink">${user.fullname}</h2>
          </article>

          <!-- Cards Section -->
          <section>
            <h3 class="text-2xl font-bold text-[#f56d95] mb-4">Usuarias</h3>
            <div id="users-container" class="grid grid-cols-2 gap-6"></div>
          </section>

          <section>
            <h3 class="text-2xl font-bold text-[#f56d95] mb-4">Voluntariados</h3>
            <div id="volunteers-container" class="grid grid-cols-2 gap-6"></div>
          </section>

          <section>
            <h3 class="text-2xl font-bold text-[#f56d95] mb-4">Organizaciones de Voluntariado por aceptar</h3>
            <div id="volunteers-container-to-accept" class="grid grid-cols-2 gap-6"></div>
          </section>
        </main>
      </div>

  `;

  navEvents();
  
  // === Renderizar todas las usuarias ===
  const usersContainer = document.getElementById("users-container");
  const addVolunteerBtn = document.getElementById("add-volunteer");
  const volunteersContainer = document.getElementById("volunteers-container");
  const volunteersContainerToAccept = document.getElementById("volunteers-container-to-accept");

  GetAllRollUSer()
    .then(users => {
      usersContainer.innerHTML = ""; // limpiar antes
      users.forEach(u => {
        usersContainer.innerHTML += `
          <article class="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
            <h4 class="text-md font-semibold text-gray-800">${u.fullname}</h4>
            <p class="text-gray-500 text-sm">${u.email || "Sin correo"}</p>
          </article>`;
      });
    })
    .catch(error => {
      console.error("Error fetching users:", error);
      usersContainer.innerHTML = `<p class="text-red-500">Error cargando usuarias</p>`;
    });

    getAllRollVolunteers().then(volunteers => {
      volunteersContainer.innerHTML = ""; // limpiar antes
      volunteers.forEach(v => {
        volunteersContainer.innerHTML += `
          <article class="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
            <h4 class="text-md font-semibold text-gray-800">${v.fullname}</h4>
            <p class="text-gray-500 text-sm">${v.email || "Sin correo"}</p>
          </article>`;
      });
    });

   getAllVolunteerOrgs().then(volunteers => {
  volunteersContainerToAccept.innerHTML = ""; // limpiar antes
  volunteers.forEach(v => {
    volunteersContainerToAccept.innerHTML += `
      <article class="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
        <h4 class="text-md font-semibold text-gray-800">${v.business_name}</h4>
        <p class="text-gray-500 text-sm">${v.email || "Sin correo"}</p>
        <button id="add-volunteer-${v.volunteer_org_id}" 
          class="bg-[#f56d95] text-white px-4 py-2 rounded-lg">
          Agregar
        </button>
      </article>`;
      if(addVolunteerBtn) {
        addVolunteerBtn.addEventListener("click", () => {
          
        });
      }
  });
})
.catch(error => {
  console.error("Error fetching volunteers:", error);
  volunteersContainer.innerHTML = `<p class="text-red-500">Error cargando voluntariados</p>`;
});


// === Delegación de eventos ===
volunteersContainerToAccept.addEventListener("click", async (e) => {
  if (e.target.id.startsWith("add-volunteer-")) {
    const volunteerId = e.target.id.split("-")[2]; // aquí ya tienes el ID correcto

    const selected = await getVolunteerOrgById(volunteerId);

    if (!selected) {
      alert("❌ Voluntariado no encontrado");
      return;
    }

    const newUserData = {
      fullname: selected.business_name,
      identification: selected.tax_id,
      email: selected.email,
      password_: "temporal123",
      role_id: 2
    };

    try {
      const created = await addUser(newUserData);
      alert(`✅ Usuario creado con éxito: ${created.fullname}`);
      // actualizar la lista de voluntariados sin recargar la página
      const newVolunteerArticle = document.createElement("article");
      newVolunteerArticle.className = "bg-white rounded-2xl shadow-sm border border-gray-200 p-4";
      newVolunteerArticle.innerHTML = `
        <h4 class="text-md font-semibold text-gray-800">${created.fullname}</h4>
        <p class="text-gray-500 text-sm">${created.email || "Sin correo"}</p>
      `;
      volunteersContainerToAccept.appendChild(newVolunteerArticle);

    } catch (err) {
      console.error(err);
      alert("❌ Error al crear usuario desde voluntariado");
    }
  }
});

}
