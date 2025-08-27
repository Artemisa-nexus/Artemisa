import { renderRouter } from "../routes.js";
import { loginUser } from "../js/api.js";

export const auth = {
  login: async (email, password) => {
    const users = await loginUser();

    if (!users || users.length === 0) {
      throw new Error("There aren't users");
    }

    // Buscar un usuario que coincida
    const user = users.find(
      (element) => element.email === email && element.password_ === password
    );

    if (user) {
      // Guardar el usuario en localStorage
      localStorage.setItem("user", JSON.stringify(user));

      // Redirigir al dashboard
      if(user.role_id === 2)
      history.pushState({}, "", "/artemisa/dashboard/volunteer");
      else
      history.pushState({}, "", "/artemisa/dashboard");
      renderRouter(document.getElementById("app"));
    } else {
      alert("Email or password incorrect");
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
