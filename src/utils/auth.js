import { renderRouter } from "../routes.js";
import { loginUser } from "../js/api.js";
import { alertError } from "../components/alerts.js";

export const auth = {
  // Login: validate credentials and save user in localStorage
  login: async (email, password) => {
    const users = await loginUser();

    if (!users || users.length === 0) {
      throw new Error("No users found");
    }

    // Find user that matches email and password
    const user = users.find(
      (element) => element.email === email && element.password_ === password
    );

    if (user) {
      // Save user info in localStorage
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect to dashboard
      history.pushState({}, "", "/artemisa/dashboard");
      renderRouter(document.getElementById("app"));
    } else {
      alertError("Email or password incorrect");
      throw new Error("Email or password incorrect");
    }
  },

  // Check if a user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem("user");
  },

  // Get the current logged-in user from localStorage
  getCurrentUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  // Log out user and clear localStorage
  logOut() {
    localStorage.removeItem("user");
    history.pushState({}, "", "/");
    renderRouter(document.getElementById("app"));
  },

  // Add API reference for guards
  api: {
    async get(url) {
      const res = await fetch(
        `https://artemisa-production.up.railway.app/api${url}`
      );
      if (!res.ok) throw new Error("Error fetching data from API");
      return res.json();
    },
  },
};
