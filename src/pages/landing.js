// Render landing view
export function renderLanding(app) {
   app.innerHTML = `
  <div class="bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm px-6 py-4">
      <article class="max-w-7xl h-20 mx-auto flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <article class="w-20 h-20 m-4 relative cursor-pointer">
            <img src="/public/assets/Icono.svg" class="w-full h-full">
          </article>
          <img src="/public/assets/logo_color.svg" class="w-35 h-40 m-4">
        </div>
        <button id="btn-login" class="bg-[#f56d95] text-white px-6 py-2 rounded-full hover:bg-[#f84e81] transition-colors">
          Iniciar sesión
        </button>
      </article>
    </header>
<main>

<body class="bg-gray-50">

  <!-- Hero Section -->
   <div class="flex items-center justify-center"></div>
  <section class="py-16 px-6 bg-[#fdf9fb]">
    <div class="max-w-5xl mx-auto text-center">
      <!-- Flor central -->
        <article id="logoHero" class=""w-40 h-40 mx-auto mb-6 logo-animate cursor-pointer">
            <img src="/public/assets/Icono.svg" alt="logo artemisa" class="w-40 h-40 mx-auto mb-6">
        </article>

      <!-- Título con Ole en 'Bienvenida' -->
      <div class="flex items-center justify-center">
                    <h2 class="text-8xl md:text-10xl font-ole mb-4  text-center">Bienvenida a</h2> 
                    <div class="w-50 ml-1.5">

                        <img src="/public/assets/logo_color.svg" alt="logo de artemisa " class="w-full" >
                    </div>
                </div>
     
                
      <!-- Descripción -->
      <p class="text-gray-600 text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
        La red social que conecta mujeres para crear comunidad, participar en voluntariados,
        asistir a eventos y brindarse apoyo mutuo.
      </p>

      <!-- Botones -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button  id="btn-join" class="bg-[#f56d95] text-white px-10 py-4 rounded-full hover:bg-[#f84e81] transition font-medium shadow-lg text-lg">
          Únete Ahora
        </button>
        <button  id="btn-conoce" class="bg-[#f9a825] text-white px-10 py-4 rounded-full hover:bg-[#ff9f05] transition font-medium shadow-lg text-lg">
          Conoce más
        </button>
      </div>
    </div>
  </section>

    <!-- Features Section -->
    <section class="py-16 px-6 bg-[#fdf9fb]">
        <div class="max-w-6xl mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-5 gap-8">
                <!-- Comunidad -->
                <article class="w-50 rounded-lg shadow-md p-4 bg-white ">
                    <div class="w-16 h-16  mx-auto mb-4   flex items-center ">
                        <img src="/public/assets/comunidad.png" alt="icono de comunidad" class="w-15 h-20" >
                    </div>
                    <h3 class="text-lg font-bold mb-2">Comunidad</h3>
                    <p class="text-sm text-gray-600 tex-center">Conecta con otras mujeres</p>
                </article>
         

                <!-- Voluntariados -->
                <article class="w-50 rounded-lg shadow-md p-4 bg-white ">
                    <article class="w-16 h-16 mx-auto mb-4  flex items-center justify-center">
                    
                    <img src="/public/assets/icono_voluntariado.svg" alt="icono voluntariado" class="w-40 h-40" >
                        
                    </article>
                    <h3 class="font-bold text-gray-800 mb-2">Voluntariados</h3>
                    <p class="text-sm text-gray-600">Participa en causas importantes</p>
                </article>

                <!-- Eventos -->
                <article class="w-50 rounded-lg shadow-md p-4 bg-white ">
                    <article class="w-16 h-16 mx-auto mb-4  flex items-center justify-center">
                        <img src="/public/assets/icono_eventos.svg" alt="icono de eventos" class="w-40 h-40" >
                
                    </article>
                    <h3 class="font-bold text-gray-800 mb-2">Eventos</h3>
                    <p class="text-sm text-gray-600">Descubre eventos únicos</p>
                </article>

                <!-- Apoyo -->
                <article  class="w-50 rounded-lg shadow-md p-4 bg-white ">
                    <article class="w-16 h-16 mx-auto mb-4  flex items-center justify-center">
                        <img src="/public/assets/icono_apoyo.svg" alt="icono de apoyo"  class="w-40 h-40" >
            
                    </article>
                    <h3 class="font-bold text-gray-800 mb-2">Apoyo</h3>
                    <p class="text-sm text-gray-600">Encuentra y brinda apoyo</p>
                </article>

                <!-- Chat -->
                <article class="w-50 rounded-lg shadow-md p-4 bg-white ">
                    <article class="w-16 h-16 mx-auto mb-4  flex items-center justify-center">
                        <img src="/public/assets/icono_msj.svg" alt="icono e mensajes" class="w-40 h-40" >
                
                    </article>
                    <h3 class="font-bold text-gray-800 mb-2">Chat</h3>
                    <p class="text-sm text-gray-600">Comunícate de forma segura</p>
                </article>
            </div>
        </div>
    </section>

    <!-- About Us Section -->
    <section id="about-us" class="py-16 px-6">
        <article class="max-w-6xl mx-auto">
            <h2 class="text-4xl font-bold text-[#f56d95] text-center mb-12">ABOUT US</h2>
            
            <article class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div class="relative">
                    <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Artemisa-Fz692bLn7i6n8BDJ54SB8QQrGHjuue.png" alt="About Us" class="w-full h-80 object-cover rounded-lg shadow-lg">
                </div>
                
                <article>
                    <h3 class="text-2xl font-bold text-gray-800 mb-4">
                        Choosing The Best Audio Player Software For Your Computer
                    </h3>
                    <p class="text-gray-600 leading-relaxed mb-6">
                        Your cheap internet-based banner advertising will become one of the sought for ads there are. Today, the world of Internet advertising is rapidly evolving beyond banner ads and intrusive pop-ups. Bayles A. Sommers medium for advertising on the Internet is the use of banner ads.
                    </p>
                    <div class="flex items-center text-sm text-gray-500">
                        <span>11 March</span>
                        <span class="mx-2">•</span>
                        <span>5 Comments</span>
                    </div>
                </article>
            </article>
        </article>
    </section>

    <!-- Emprendimientos Section -->
    <section class="py-16 px-6 bg-white">
        <article class="max-w-6xl mx-auto">
            <h2 class="text-4xl font-bold text-[#f56d95] text-center mb-12">Emprendimientos</h2>
            
            <article class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="bg-gray-100 rounded-lg h-80 shadow-lg"></div>
                <div class="bg-gray-100 rounded-lg h-80 shadow-lg"></div>
                <div class="bg-gray-100 rounded-lg h-80 shadow-lg"></div>
            </aticle>
        </article>
    </section>
</main>
    <!-- Footer -->
    <footer class="bg-[#f56d95] py-12 px-6">
        <div class="max-w-4xl mx-auto text-center">
            <img src="/public/assets/logo_blanco.svg" alt="logo artemisa blanco" class="w-100 h-100 mx-auto">
            <div class="border-t border-white/30 pt-8">
                <div class="flex justify-center space-x-6">
                    <a href="#" class="text-white hover:text-pink-200 transition-colors">
                        <img src="/public/assets/icono_linkedin.svg" alt="LinkedIn" class="w-12 h-12">
                    </a>
                    <a href="#" class="text-white hover:text-pink-200 transition-colors">
                        <img src="/public/assets/icono_ig.svg" alt="Instagram" class="w-12 h-12">
                    </a>
                </div>
            </div>
        </div>
    </footer>
  `;
 
const logoHero = document.getElementById("logoHero");
const loginBtn = document.getElementById("btn-login");

// Login button → logo becomes small and redirects to /login
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  logoHero.classList.add("logo-shrink"); // animation to shrink
  setTimeout(() => {
    history.pushState(null, null, "/artemisa/login");
    window.dispatchEvent(new PopStateEvent("popstate"));
    logoHero.classList.remove("logo-shrink"); // clean up in case they come back
  }, 800);
});

  // Join now/register
  document.getElementById("btn-join").addEventListener("click", (e) => {
    e.preventDefault();
    history.pushState(null, null, "/artemisa/register");
    window.dispatchEvent(new PopStateEvent("popstate"));
  });

  // Scroll to the about us section
  document.getElementById("btn-conoce").addEventListener("click", () => {
    document.querySelector("#about-us").scrollIntoView({ behavior: "smooth" });
  });
}