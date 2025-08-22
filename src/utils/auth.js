import { renderRouter } from "../routes.js";
import { loginUser } from "../js/api.js";


export const auth = {
  login: async (email, password) => {
    const users = await loginUser(email, password);
    if (users.length === 0 || users[0].password !== password) {
      throw new Error("Invalid credentials");
    }
    else{
    const user = users[0];
    localStorage.setItem("user", JSON.stringify(user));
    // Redirigir al dashboard después de login
    history.pushState({}, "", "/artemisa/dashboard");
    renderRouter(document.getElementById("app"));
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
