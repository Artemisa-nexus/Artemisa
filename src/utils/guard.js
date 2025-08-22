import { auth } from './auth.js';

function redirectNotFound() {
  history.replaceState({}, '', '/not-found');
  location.reload();
}

// Bloquea si no hay usuario logeado
export function authGuard() {
  if (!auth.isAuthenticated()) redirectNotFound();
}

// Bloquea si el usuario no existe en localStorage ni en la API
export async function UserGuard() {
  const localUser = auth.getCurrentUser();
  if (!localUser) return redirectNotFound();

  try {
    // Validar contra la API que realmente existe
    const result = await auth.api.get(`/users?email=${encodeURIComponent(localUser.email)}`);

    if (!result.length) {
      // Usuario ya no existe en la base → limpiar localStorage y bloquear
      localStorage.removeItem('currentUser');  // ✅ corregido
      return redirectNotFound();
    }
  } catch (err) {
    console.error("Error validando usuario:", err);
    return redirectNotFound();
  }
}
