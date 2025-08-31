import { renderRouter } from "../routes.js";
import { loginUser } from "../js/api.js";
import { alertError } from "../components/alerts.js";

export const auth = {
  login: async (email, password) => {
    const users = await loginUser();

    if (!users || users.length === 0) {
      throw new Error("There aren't users");
    }

    // Search for a user that matches
    const user = users.find(
      (element) => element.email === email && element.password_ === password
    );

    if (user) {
      // Save the user in localStorage
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect to the dashboard
      history.pushState({}, "", "/artemisa/dashboard");
      renderRouter(document.getElementById("app"));
    } else {
      alertError("Email or password incorrect");
      throw new Error("Email or password incorrect");
    }
  },

  isAuthenticated() {
    return !!localStorage.getItem("user");
  },

  logOut() {
    localStorage.removeItem("user");
    history.pushState({}, "", "/");
    renderRouter(document.getElementById("app"));
  }
};
