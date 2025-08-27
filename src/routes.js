// Import all the page rendering functions
import { renderLanding } from "./pages/landing";
import { loginPage } from "./pages/login";
import renderRegister from "./pages/register";
import { renderDashboard } from "./pages/dashboard";
import { renderDashboardEvents } from "./pages/dashboardEvents";
import { renderDashboardSupport } from "./pages/dashboardApoyo";
import { renderDashboardProfile } from "./pages/dashboardProfile";
import renderForm from "./pages/formularioOng";

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
    '/artemisa/formularioOng': () => renderForm(app)
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
        <header>
            <nav>
                <a href="/artemisa/home" data-link>Home</a>
                <a href="/artemisa/login" data-link>Log in</a>
                <a href="/artemisa/register" data-link>Sign up</a>
            </nav>
        </header>

        <main>
            <h1>HTTP NOT FOUND</h1>

        </main>
        
        `

    }

}