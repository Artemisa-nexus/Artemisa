// auth.js
export const auth = {
  login(user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
  },

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
  },

  isAuthenticated() {
    return !!localStorage.getItem("currentUser");
  },

  logout() {
    localStorage.removeItem("currentUser");
    history.pushState({}, "", "/");
    router(document.getElementById("app"));
  }
};
