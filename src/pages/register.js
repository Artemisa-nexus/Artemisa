import { registerUser } from "./services/registerService";

document.getElementById("registrationForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const fullName = document.getElementById("fullName").value.trim();
  const identification = document.getElementById("identification").value.trim();
  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (!fullName || !identification || !email || !password || !confirmPassword) {
    alert("Debes rellenar todos los campos!");
    return;
  }

  // Validar formato de nombre (solo letras y espacios, mínimo 2 palabras)
  const fullNameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,}$/;
  if (!fullNameRegex.test(fullName)) {
    alert("Nombre de usuario inválido");
    return;
  }

  // Validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Correo Electrónico inválido");
    return;
  }

  // Validar contraseñas
  if (password !== confirmPassword) {
    document.getElementById("passwordError").classList.remove("hidden");
    return;
  } else {
    document.getElementById("passwordError").classList.add("hidden");
  }

  // Llamar servicio
  await registerUser(fullName, email, identification, password);
});         