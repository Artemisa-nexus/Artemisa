// Navigation bar rendering and events
import { logoutUser, getCurrentUser } from '../utils/auth.js';

// Render navigation bar based on user role
export function renderNav() {
  const user = getCurrentUser();

  return `
    <nav>
      <h2>Eventos</h2>
      <ul>
        <li><a href="/" data-link>Inicio</a></li>
        ${user && user.role === "admin" ? `
          <li><a href="/dashboard" data-link>Dashboard Admin</a></li>
        ` : user && user.role === "user" ? `
          <li><a href="/dashboard" data-link>Mis Cursos</a></li>
        ` : ""}
        ${user ? `
          <li><button id="logoutBtn">Cerrar sesión</button></li>
        ` : ""}
      </ul>
    </nav>
  `;
}

// Attach logout event to button
export function navEvents() {
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    // Logout on button click
    logoutBtn.addEventListener("click", () => {
      logoutUser();
    });
  }
}
