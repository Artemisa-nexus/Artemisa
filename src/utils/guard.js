import { auth } from './auth.js';

function redirectNotFound() {
  history.replaceState({}, '', '/not-found');
  location.reload();
}

// Solo bloquea si no hay usuario en localStorage
export function authGuard() {
  if (!auth.isAuthenticated()) redirectNotFound();
}

// Bloquea si el usuario no existe ni en localStorage ni en la “BD”
export async function UserGuard() {
  const localUser = auth.getCurrentUser();
  if (!localUser) return redirectNotFound();

  try {
    // validar contra la API que realmente existe
    const result = await auth.api.get(`/users?email=${encodeURIComponent(localUser.email)}`);

    if (!result.length) {
      // usuario ya no existe en la base → limpiar localStorage y bloquear
      localStorage.removeItem('user');
      return redirectNotFound();
    }
  } catch (err) {
    console.error("Error validando usuario:", err);
    return redirectNotFound();
  }
}
