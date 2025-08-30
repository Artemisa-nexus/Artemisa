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
            <img src="../public/assets/Icono.svg" alt="logo artemisa" class="w-40 h-40 mx-auto mb-6">
        </article>

      <!-- Título con Ole en 'Bienvenida' -->
      <div class="flex items-center justify-center">
                    <h2 class="text-8xl md:text-10xl font-ole mb-4  text-center">Bienvenida a</h2> 
                    <div class="w-50 ml-1.5">

                        <img src="../public/assets/logo_color.svg" alt="logo de artemisa " class="w-full" >
                    </div>
                </div>
     
                
      <!-- Descripción -->
      <p class="text-gray-600 text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
        La plataforma que conecta mujeres con fundaciones para participar en voluntariados, transformar comunidades y generar impacto social.
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
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">

      <!-- Voluntariados (principal) -->
      <article class="w-50 rounded-lg shadow-lg p-6 bg-white border-t-4 border-[#f56d95]">
        <div class="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <img src="../public/assets/icono_voluntariado.svg" alt="icono voluntariado" class="w-40 h-40">
        </div>
        <h3 class="font-bold text-[#f56d95] text-lg mb-2 text-center">Voluntariados</h3>
        <p class="text-sm text-gray-600 text-center">
          Conéctate con fundaciones y participa en causas que transforman comunidades.
        </p>
      </article>

      <!-- Comunidad -->
      <article class="w-50 rounded-lg shadow-lg p-6 bg-white border-t-4 border-[#f6c6fa]">
        <div class="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <img src="../public/assets/comunidad.png" alt="icono de comunidad" class="w-15 h-20">
        </div>
        <h3 class="text-lg font-bold text-[#8a518f] mb-2 text-center">Comunidad</h3>
        <p class="text-sm text-gray-600 text-center">
          Conoce mujeres con tu misma pasión por generar impacto social.
        </p>
      </article>

      <!-- Eventos -->
      <article class="w-50 rounded-lg shadow-md p-6 bg-white border-t-4 border-[#f56d95]">
        <div class="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <img src="../public/assets/icono_eventos.svg" alt="icono de eventos" class="w-40 h-40">
        </div>
        <h3 class="font-bold text-[#f56d95] text-lg mb-2 text-center">Eventos</h3>
        <p class="text-sm text-gray-600 text-center">
          Descubre talleres, charlas y actividades solidarias cerca de ti.
        </p>
      </article>

      <!-- Apoyo -->
      <article class="w-50 rounded-lg shadow-md p-6 bg-white border-t-4 border-[#f6c6fa]">
        <div class="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <img src="../public/assets/icono_apoyo.svg" alt="icono de apoyo" class="w-40 h-40">
        </div>
        <h3 class="font-bold text-[#8a518f] text-lg mb-2 text-center">Apoyo</h3>
        <p class="text-sm text-gray-600 text-center">
          Comparte experiencias, recibe orientación y brinda ayuda a otras voluntarias.
        </p>
      </article>

    </div>
  </div>
</section>

<!-- About Us Section -->
<section id="about-us" class="py-16 px-6">
  <article class="max-w-6xl mx-auto">
    <h2 class="text-4xl font-bold text-[#f56d95] text-center mb-12">Acerca de nosotros</h2>
    
    <article class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      
      <!-- Imagen -->
      <div class="relative">
        <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Artemisa-Fz692bLn7i6n8BDJ54SB8QQrGHjuue.png" 
             alt="About Us" 
             class="w-full h-80 object-cover rounded-lg shadow-lg">
      </div>
      
      <!-- Texto -->
      <article>
        <h3 class="text-2xl font-bold text-gray-800 mb-4">
          Conectamos Voluntarios y Fundaciones
        </h3>
        <p class="text-gray-600 leading-relaxed mb-6">
          En <span class="font-semibold">Artemisa</span> creemos en el poder de la solidaridad. 
          Nuestra misión es ser el puente entre personas con ganas de ayudar y 
          organizaciones que necesitan apoyo. 
        </p>
        <p class="text-gray-600 leading-relaxed mb-6">
          No solo creamos oportunidades para los voluntarios, también brindamos a las 
          <span class="font-semibold">fundaciones y organizaciones sociales</span> la posibilidad 
          de unirse a nuestra red y encontrar manos dispuestas a colaborar. 
        </p>
        
      <!-- Botón de acción -->
      <a href="/artemisa/formularioOng"
         class="inline-block bg-[#f9a825] text-white px-6 py-3 rounded-lg shadow-md 
                hover:bg-[#f09503] transition-colors duration-300 font-semibold">
        Únete como Fundación
      </a>

      </article>
    </article>
  </article>
</section>

<!-- Lineas de apoyo -->
<section class="py-16 px-6 bg-white">
  <article class="max-w-6xl mx-auto">
    <h2 class="text-4xl font-bold text-[#f56d95] text-center mb-12">Líneas de apoyo</h2>

    <article class="grid grid-cols-1 md:grid-cols-3 gap-8">
      
      <!-- Línea Morada -->
      <div class="bg-[#f5e0f7] rounded-lg h-80 shadow-lg p-6 flex flex-col justify-between">
        <div>
          <h3 class="text-2xl font-semibold text-[#f56d95] mb-4">Línea Morada</h3>
          <p class="text-gray-700 mb-4">
            Atención a mujeres víctimas de violencias basadas en género. 
            Orientación psicológica y jurídica gratuita.
          </p>
        </div>
        <div>
          <p class="text-lg font-bold text-gray-800">Teléfono: 018000-112-137</p>
          <p class="text-lg font-bold text-gray-800">WhatsApp: 300 755 1846</p>
          <p class="text-sm text-gray-600 mt-2">Disponible 24/7</p>
        </div>
      </div>

      <!-- Línea de la Alcaldía de Barranquilla -->
      <div class="bg-[#fcf0d4] rounded-lg h-80 shadow-lg p-6 flex flex-col justify-between">
        <div>
          <h3 class="text-2xl font-semibold text-[#f56d95] mb-4">Alcaldía de Barranquilla</h3>
          <p class="text-gray-700 mb-4">
            Línea única de atención ciudadana para orientación en casos de violencia, emergencias 
            y servicios de apoyo institucional.
          </p>
        </div>
        <div>
          <p class="text-lg font-bold text-gray-800">Teléfono: 195</p>
          <p class="text-sm text-gray-600 mt-2">Disponible 24/7</p>
        </div>
      </div>

      <!-- CAI Policía Nacional -->
      <div class="bg-[#f5e0f7] rounded-lg h-80 shadow-lg p-6 flex flex-col justify-between">
        <div>
          <h3 class="text-2xl font-semibold text-[#f56d95] mb-4">CAI - Policía Nacional</h3>
          <p class="text-gray-700 mb-4">
            Centros de Atención Inmediata (CAI) de la Policía para reportar delitos, 
            violencia intrafamiliar y solicitar apoyo en emergencias.
          </p>
        </div>
        <div>
          <p class="text-lg font-bold text-gray-800">Teléfono: 123</p>
          <p class="text-sm text-gray-600 mt-2">Acércate al CAI más cercano o llama en caso de emergencia.</p>
        </div>
      </div>

    </article>
  </article>
</section>

</main>
   <!-- Footer -->
<footer class="bg-[#f56d95] py-6 px-4">
  <div class="max-w-3xl mx-auto text-center">
    <img src="../public/assets/logo_blanco.svg" alt="logo artemisa blanco" class="w-28 h-auto mx-auto">
    <div class="border-t border-white/30 pt-4 mt-4">
      <div class="flex justify-center space-x-4">
        <a href="#" class="text-white hover:text-pink-200 transition-colors">
          <img src="../public/assets/icono_linkedin.svg" alt="LinkedIn" class="w-8 h-8">
        </a>
        <a href="#" class="text-white hover:text-pink-200 transition-colors">
          <img src="../public/assets/icono_ig.svg" alt="Instagram" class="w-8 h-8">
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