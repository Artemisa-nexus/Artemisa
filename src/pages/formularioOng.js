
export default function renderForm(div) {
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
            <img src="/public/assets/Icono.svg" alt="Decorative lily flower" class="w-32 h-32 object-contain" />
        </section>

        <!-- Registration form -->
        <form id="registrationForm" class="space-y-6">
            <!-- Full Name field -->
            <section>
                <label for="razonSocial" class="block text-[#f56d95] text-sm font-medium mb-2">Razon Social:</label>
                <input
                    type="text"
                    id="razonSocial"
                    name="razonSocial"
                    required
                    class="w-full px-4 py-3 bg-white border border-[#cbcbcb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f56d95] focus:border-transparent"
                />
            </section>

            <!-- NIT field -->
            <section>
                <label for="nit" class="block text-[#f56d95] text-sm font-medium mb-2">NIT:</label>
                <input
                    type="text"
                    id="nit"
                    name="nit"
                    required
                    class="w-full px-4 py-3 bg-white border border-[#cbcbcb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f56d95] focus:border-transparent"
                />
            </section>

             <!-- NAME LEGAL REPRESENTANTIVE field -->
            <section>
            <label for="name" class="block text-[#f56d95] text-sm font-medium mb-2">
             Nombre representante legal:
            </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    class="w-full px-4 py-3 bg-white border border-[#cbcbcb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f56d95] focus:border-transparent"
                />
            </section>

            <!-- identification legal representativo field -->
            <section>
                <label for="identification" class="block text-[#f56d95] text-sm font-medium mb-2">Identificacion representante legal:</label>
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

            <!-- Telefono field -->
            <section>
                <label for="telefono" class="block text-[#f56d95] text-sm font-medium mb-2">Telefono:</label>
                <input
                    type="text"
                    id="telefono"
                    name="telefono"
                    required
                    class="w-full px-4 py-3 bg-white border border-[#cbcbcb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f56d95] focus:border-transparent"
                />
            </section>

            <!-- Ciudad field -->
            <section>
                <label for="ciudad" class="block text-[#f56d95] text-sm font-medium mb-2">Ciudad:</label>
                <input
                    type="text"
                    id="ciudad"
                    name="ciudad"
                    required
                    class="w-full px-4 py-3 bg-white border border-[#cbcbcb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f56d95] focus:border-transparent"
                />
            </section>

            <!-- Submit button -->
            <section class="pt-4">
                <button 
                    type="submit"
                    class="w-full bg-[#f56d95] text-white py-3 rounded-full text-sm font-medium hover:bg-[#e55a87] transition-colors"
                >
                    Enviar
                </button>
            </section>
        </form>

    </div>
    </main>
  `;

  document.getElementById("backBtn").addEventListener("click", (e) => {
    e.preventDefault();
    history.pushState(null, null, "/artemisa/landing");
    window.dispatchEvent(new PopStateEvent("popstate"));
  });

}
