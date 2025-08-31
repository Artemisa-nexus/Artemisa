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
// Reference to the main container where pages will be rendered
let app = document.getElementById('app')

// Define routes: each path points to a function that renders the corresponding page
let routes = {
    '/artemisa/landing': () => renderLanding(app),
    '/artemisa/login': () => loginPage(app),
    '/artemisa/register': () => renderRegister(app),
    '/artemisa/dashboard': () => renderDashboard(app),
    '/artemisa/dashboard/events': () => renderDashboardEvents(app),
    '/artemisa/dashboard/support': () => renderDashboardSupport(app),
    '/artemisa/dashboard/profile': () => renderDashboardProfile(app),
    '/artemisa/formularioOng': () => renderForm(app),
    '/artemisa/dashboard/events/volunteer': () => renderDashboardEventsVolunteer(app),
    '/artemisa/dashboard/apoyo/volunteer': () => renderDashboardSupportVolunteer(app),
    '/artemisa/dashboard/profile/administrador': () => renderDashboardProfileAdmi(app),
    '/artemisa/dashboard/profile/voluntario': () => renderDashboardProfileVolunteer(app)
}

// Main router function → decides which page to render based on the URL
export let renderRouter = () => {
  // Get current path from browser
    let path = window.location.pathname;

      // If user is at root "/" or no path → redirect to landing page
    if (path === '/' || !path) {
        history.pushState(null, null, '/artemisa/landing');
        path = '/artemisa/landing';
    }

    // Update path after potential redirect
    path = window.location.pathname;

    // If the route exists in the "routes" object → render the correct page
    if (routes[path]) {
        routes[path]();
    }
    
     // If the route does NOT exist → render a 404 page
    else {
        app.innerHTML = `
        <div class="min-h-screen bg-gradient-to-br from-custom-pink to-custom-yellow font-sans">
             <main class="min-h-screen flex items-center justify-center px-4">
                 <section class="text-center max-w-2xl mx-auto">
                    <!-- Número 404 grande -->
                    <article class="mb-8">
                     <h1 class="text-9xl md:text-[12rem] font-bold text-white drop-shadow-lg leading-none">
                     404
                     </h1>
                     <div class="w-32 h-2 bg-custom-coral mx-auto rounded-full shadow-lg"></div>
                     </article>

                <!-- Mensaje principal -->
                <article class="mb-12 space-y-4">
                    <h2 class="text-3xl md:text-4xl font-bold text-gray-800 text-balance">
                        ¡Oops! Página no encontrada
                    </h2>
                    <p class="text-lg md:text-xl text-gray-700 max-w-md mx-auto text-pretty">
                        La página que buscas parece haber desaparecido en el espacio digital.
                    </p>
                </article>

                <!-- Elementos decorativos -->
                <article class="relative">
                    <div class="absolute -top-20 -left-10 w-20 h-20 bg-custom-orange rounded-full opacity-60 animate-pulse"></div>
                    <div class="absolute -top-32 -right-16 w-16 h-16 bg-custom-pink rounded-full opacity-40 animate-pulse delay-1000"></div>
                    <div class="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-custom-yellow rounded-full opacity-50 animate-pulse delay-500"></div>
                </article>
                </section>
            </main>
        </div>
        
        `
    }

}