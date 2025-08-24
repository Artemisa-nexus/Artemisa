//Login view with its functionality.
import { auth } from '../utils/auth.js'; // Importing the authentication logic.
//Exported function where the HTML is with its styles and dynamics.
export function loginPage () {
    document.getElementById('app').innerHTML = `
    <main class="min-h-screen bg-[#fbf7fc] p-6">
        <!-- Back Button -->
        <button id="btn-back" class="bg-[#f56d95] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-[#e55a87] transition-colors">
            Regresar
        </button>


        <article class="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] max-w-md mx-auto">
            <!-- Flower Illustration -->
            <div class="mb-16">
            <img id="logoLogin" src="/public/assets/Icono.svg" alt="Decorative lily flower" class="w-32 h-32">
            </div>

            <!-- Login Form -->
            <form id='loginForm' class="w-full space-y-8">
                <!-- Email Field -->
                <section class="space-y-3">
                    <label for="email" class="block text-[#f56d95] text-base font-medium">Correo</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        class="w-full px-4 py-4 bg-white border border-[#cbcbcb] rounded-lg focus:outline-none focus:border-[#f56d95] focus:ring-1 focus:ring-[#f56d95] transition-colors"
                        required
                    >
                </section>

                <!-- Password Field -->
                <section class="space-y-3">
                    <label for="password" class="block text-[#f56d95] text-base font-medium">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        class="w-full px-4 py-4 bg-white border border-[#cbcbcb] rounded-lg focus:outline-none focus:border-[#f56d95] focus:ring-1 focus:ring-[#f56d95] transition-colors"
                        required
                    >
                </section>

                <!-- Sign In Button -->
                <button 
                    type="submit"
                    class="w-full bg-[#f56d95] text-white py-4 rounded-full text-base font-medium hover:bg-[#e55a87] transition-colors mt-16"
                >
                    Iniciar Sesión
                </button>
            </form>
        </article>
    </main>`;

        // Animation to refresh when loading the view
    const logo = document.getElementById("logoLogin");
    setTimeout(() => {
    logo.classList.add("logo-spin");
    }, 100); // small delay to notice the entry

    window.addEventListener("DOMContentLoaded", () => {
    const loginFlower = document.querySelector(".flower-login");

    setTimeout(() => {
        loginFlower.classList.add("shrink");
    }, 100); // small delay to notice the transition
    });

// Handle login form submission
    document.getElementById("loginForm").onsubmit = async (e) => {
      e.preventDefault();
      try {
        await auth.login(e.target.email.value, e.target.password.value);
        history.pushState(null, null, '/artemisa/dashboard')
        window.dispatchEvent(new PopStateEvent('popstate'));
      } catch (err) {
        alert(err.message || "Credenciales inválidas");
      };
    };

// Handle back button click
  document.getElementById('btn-back').addEventListener('click', (e) => {
        e.preventDefault();
        history.pushState(null, null, '/artemisa/landing')
        window.dispatchEvent(new PopStateEvent('popstate'));
    })
}