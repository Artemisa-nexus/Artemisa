import { auth } from './auth.js';

function redirectNotFound() {
  history.replaceState({}, '', '/not-found');
  location.reload();
}

// Block access if no user in localStorage
export function authGuard() {
  if (!auth.isAuthenticated()) redirectNotFound();
}

// Block access if user does not exist in localStorage or API
export async function UserGuard() {
  const localUser = auth.getCurrentUser();
  if (!localUser) return redirectNotFound();

  try {
    // Validate against the API that it really exists
    const result = await auth.api.get(`/users?email=${encodeURIComponent(localUser.email)}`);

    if (!result.length) {
      // User no longer exists in the database → clear localStorage and block
      localStorage.removeItem('currentUser'); 
      return redirectNotFound();
    }
  } catch (err) {
    //console.error("Error validating user:", err);
    return redirectNotFound();
  }
}
