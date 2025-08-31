import iconoSvg from "../assets/Icono.svg";
import logo from "../assets/logo_color-recortado.svg";
// Render navigation bar in the dashboard
export function renderNav() {
  return `
  <header
  class="bg-white px-4 py-0 flex items-center justify-center border-b border-gray-100"
>
<img
    src=${iconoSvg}
    alt="logo-letras"
    class="h-15 w-15 overflow-hidden"
  />

  <img
    src=${logo}
    alt="logo-letras"
    class="h-24 w-24 overflow-hidden"
  />
</header>
  `;
}