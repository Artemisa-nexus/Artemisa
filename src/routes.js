import { auth } from "./utils/auth.js";
import { renderLanding } from "./pages/landing.js";
import { loginPage } from "./pages/login.js";

// Router principal
export function router(div) {
  const path = window.location.pathname;

  // Guard de autenticación
  if (!auth.isAuthenticated() && path === "/dashboard") {
    history.replaceState({}, "", "/");
    return renderLanding(div);
  }

  if (auth.isAuthenticated() && (path === "/login" || path === "/register")) {
    history.replaceState({}, "", "/dashboard");
    return renderDashboard(div);
  }

  switch (path) {
    case "/":
      return renderLanding(div);
    case "/login":
      return loginPage(div);
    case "/register":
      return register(div);
    case "/dashboard":
      return renderDashboard(div);
    default:
      div.innerHTML = "<h1>404 - Página no encontrada</h1>";
  }
}

// 👇 importante para que al usar el navegador SPA siga funcionando
window.onpopstate = () => {
  router(document.getElementById("app"));
};
