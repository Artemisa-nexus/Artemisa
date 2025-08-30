import { alertError, alertSuccess } from "../components/alerts";
import { addUser } from "../services/registerService.js";


export default function renderRegister(div) {
  div.innerHTML = `
     <main class="min-h-screen p-6 bg-[#FBF7FC]">
    <!-- Back button -->
    <button id="backBtn" class="bg-[#f56d95] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-[#e55a87] transition-colors">
        Regresar
    </button>

    <!-- Main form container -->
    <div class="max-w-md mx-auto mt-8 bg-white p-8 rounded-2xl ">
        <!-- Lily flower illustration -->
        <section class="flex justify-center mb-8">
            <img src="../public/assets/Icono.svg" alt="Decorative lily flower" class="w-32 h-32 object-contain" />
        </section>

        <!-- Registration form -->
        <form id="registrationForm" class="space-y-6">
            <!-- Full Name field -->
            <section>
                <label for="fullName" class="block text-[#f56d95] text-sm font-medium mb-2">Nombre Completo:</label>
                <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    class="w-full px-4 py-3 bg-white border border-[#cbcbcb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f56d95] focus:border-transparent"
                />
            </section>

            <!-- Identification field -->
            <section>
                <label for="identification" class="block text-[#f56d95] text-sm font-medium mb-2">Identificación:</label>
                <input
                    type="text"
                    id="identification"
                    name="identification"
                    required
                    class="w-full px-4 py-3 bg-white border border-[#cbcbcb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f56d95] focus:border-transparent"
                />
            </section>

            <!-- Email field -->
            <section>
                <label for="email" class="block text-[#f56d95] text-sm font-medium mb-2">Correo Electronico:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    class="w-full px-4 py-3 bg-white border border-[#cbcbcb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f56d95] focus:border-transparent"
                />
            </section>

            <!-- Password field -->
            <section>
                <label for="password" class="block text-[#f56d95] text-sm font-medium mb-2">Contraseña:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    minlength="6"
                    class="w-full px-4 py-3 bg-white border border-[#cbcbcb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f56d95] focus:border-transparent"
                />
            </section>

            <!-- Confirm Password field -->
            <section>
                <label for="confirmPassword" class="block text-[#f56d95] text-sm font-medium mb-2">Confirmar contraseña:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    required
                    minlength="6"
                    class="w-full px-4 py-3 bg-white border border-[#cbcbcb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f56d95] focus:border-transparent"
                />
                <div id="passwordError" class="text-red-500 text-xs mt-1 hidden">Las contraseñas no coinciden</div>
            </section>

            <!-- Register button -->
            <section class="pt-4">
                <button 
                    type="submit"
                    class="w-full bg-[#f56d95] text-white py-3 rounded-full text-sm font-medium hover:bg-[#e55a87] transition-colors"
                >
                    Registrarse
                </button>
            </section>
        </form>

    </div>
    </main>
  `;

  // Handle registration form submission
  document.getElementById("registrationForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      const fullName = document.getElementById("fullName").value.trim();
      const identification = document.getElementById("identification").value.trim();
      const email = document.getElementById("email").value.trim().toLowerCase();
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      if (!fullName || !identification || !email || !password || !confirmPassword) {
      alertError("Debes rellenar todos los campos!");
      return;
    }

    // Validate name format (only letters and spaces, at least 3 characters)
    const fullNameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,}$/;
    if (!fullNameRegex.test(fullName)) {
      alertError("Nombre de usuario inválido");
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alertError("Correo Electrónico inválido");
      return;
    }

    // Validate passwords
    if (password !== confirmPassword) {
      document.getElementById("passwordError").classList.remove("hidden");
      return;
    } else {
      document.getElementById("passwordError").classList.add("hidden");
    }

    const newUser = await addUser({
      fullname: fullName,
      identification,
      email,
      password_:password,
      role_id: 1
    });
    if (newUser) {
      alertSuccess("Usuario creado con éxito");
      history.pushState({}, "", "/artemisa/login");
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
  });

  document.getElementById("backBtn").addEventListener("click", (e) => {
    e.preventDefault();
    history.pushState(null, null, "/artemisa/landing");
    window.dispatchEvent(new PopStateEvent("popstate"));
  });
}
