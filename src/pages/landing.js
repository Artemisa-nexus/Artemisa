document.getElementById("btn-login").addEventListener("click", () => {
    window.location.href = "/src/views/login.html";
  });
  
  document.getElementById("btn-unete").addEventListener("click", () => {
    window.location.href = "/src/views/register.html";
  });
  
  document.getElementById("btn-conoce").addEventListener("click", () => {
    document.querySelector("#about-us").scrollIntoView({ behavior: "smooth" });
  });
  