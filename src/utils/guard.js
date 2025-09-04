import { auth } from "./auth.js";

// Helper function to handle redirection to a given path
function redirect(path = "/artemisa/login") {
  history.replaceState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

// Guard that checks if the user is authenticated
export function authGuard() {
  if (!auth.isAuthenticated()) {
    redirect();
    return false;
  }
  return true;
}

// Guard that verifies if the user exists both locally and in the API
export async function UserGuard() {
  const localUser = auth.getCurrentUser();
  if (!localUser) {
    redirect();
    return false;
  }

  try {
    const result = await auth.api.get(
      `/users?email=${encodeURIComponent(localUser.email)}`
    );

    // Dependiendo de cómo responda tu API:
    const users = Array.isArray(result) ? result : result.data;

    // If the user does not exist in the API, clear local data and redirect
    if (!users || !users.length) {
      localStorage.removeItem("currentUser");
      redirect();
      return false;
    }

    // Update localStorage with the user info (including role_id and role_name)
    localStorage.setItem("currentUser", JSON.stringify(users[0]));

    return true;
  } catch (err) {
    console.error("Error validating user:", err);
    redirect();
    return false;
  }
}

// Guard that checks if the user has the required role
export function RoleGuard(roleParam) {
  const user = auth.getCurrentUser();
  if (!user) {
    redirect();
    return false;
  }

  // Case 1: Validate by role_id (number)
  if (typeof roleParam === "number") {
    if (user.role_id !== roleParam) {
      redirect();
      return false;
    }
    return true;
  }

  // If roleParam is neither a number nor a string, deny access
  return false;
}
