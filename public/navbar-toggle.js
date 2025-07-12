document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("menu-toggle");
  const navbar = document.getElementById("mobile-navbar");

  if (toggleBtn && navbar) {
    toggleBtn.addEventListener("click", () => {
      // LA CORRECTION EST ICI :
      // On utilise 'is-open' pour déclencher l'animation de glissement, pas 'hidden'.
      navbar.classList.toggle("is-open");
    });
  }
});