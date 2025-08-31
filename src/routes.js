// Import all the page rendering functions
import { renderLanding } from "./pages/landing";
import { loginPage } from "./pages/login";
import renderRegister from "./pages/register";
import { renderDashboard } from "./pages/dashboard";
import { renderDashboardEvents } from "./pages/dashboardEvents";
import { renderDashboardSupport } from "./pages/dashboardApoyo";
import { renderDashboardProfile } from "./pages/dashboardProfile";
import renderForm from "./pages/formularioOng";
import { renderDashboardEventsVolunteer } from "./pages/dashboardEventsVolunteer";
import { renderDashboardSupportVolunteer } from "./pages/dashboardApoyoVolunteer";
import { renderDashboardProfileAdmi } from "./pages/dashboardProfileAdmi";
import { renderDashboardProfileVolunteer } from "./pages/dashboardProfileVolunteer";
import { authGuard, RoleGuard, UserGuard } from "./utils/guard";


// Reference to the main container where pages will be rendered
let app = document.getElementById("app");

// Define routes: each path points to a function that renders the corresponding page
let routes = {
  "/artemisa/landing": { render: () => renderLanding(app) },
  "/artemisa/login": { render: () => loginPage(app) },
  "/artemisa/register": { render: () => renderRegister(app) },

  //Routes protected of the principal dashboard
  "/artemisa/dashboard": { 
    render: () => renderDashboard(app),
    guard: [authGuard, UserGuard] 
  },

  "/artemisa/dashboard/events": { render: () => renderDashboardEvents(app) },
  "/artemisa/dashboard/support": { render: () => renderDashboardSupport(app) },
  "/artemisa/dashboard/profile": { render: () => renderDashboardProfile(app) },
  "/artemisa/formularioOng": { render: () => renderForm(app) },
  "/artemisa/dashboard/events/volunteer": { render: () => renderDashboardEventsVolunteer(app) },
  "/artemisa/dashboard/apoyo/volunteer": { render: () => renderDashboardSupportVolunteer(app) },


  // Route protected only for admins
  "/artemisa/dashboard/profile/administrador": {
    render: () => renderDashboardProfileAdmi(app),
    guard: [authGuard, UserGuard, () => RoleGuard("admin")] 
  },


  // Route protected only for volunteers
  "/artemisa/dashboard/profile/voluntario": {
    render: () => renderDashboardProfileVolunteer(app),
    guard: [authGuard, UserGuard, () => RoleGuard("volunteer")]
  },
};

//Function to render the router
export let renderRouter = async () => {
  let path = window.location.pathname;

  // Redirect if root
  if (path === "/" || !path) {
    history.pushState(null, null, "/artemisa/landing");
    path = "/artemisa/landing";
  }

// Find route
  const route = routes[path];

  if (route) {
    // If it has guards, execute them in order
    if (route.guard) {
      for (const guard of route.guard) {
            const result = await guard();
            if (!result) return; // si un guard falla, ya se redirigió
      }
    }

   
    // Render if all guards passed
    route.render();
  } else {
    // 404
    app.innerHTML = `
      <div class="min-h-screen bg-gradient-to-br from-[#f56d95] to-[#f9c74f] font-sans">
        <main class="min-h-screen flex items-center justify-center px-4">
          <section class="text-center max-w-2xl mx-auto">
            <article class="mb-8">
              <h1 class="text-9xl md:text-[12rem] font-bold text-white drop-shadow-lg leading-none">404</h1>
              <div class="w-32 h-2 bg-custom-coral mx-auto rounded-full shadow-lg"></div>
            </article>
            <article class="mb-12 space-y-4">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-800">¡Oops! Página no encontrada</h2>
              <p class="text-lg md:text-xl text-gray-700">La página que buscas parece haber desaparecido en el espacio digital.</p>
            </article>
          </section>
        </main>
        <footer>
          <p class="text-center text-gray-600">© 2023 Artemisa. Todos los derechos reservados.</p>
        </footer>
      </div>
    `;
  }
};
