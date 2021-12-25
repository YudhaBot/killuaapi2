
const menuIcon = document.querySelector(".hamburger-menu");
const navbar = document.querySelector(".navbaro");

menuIcon.addEventListener("click", () => {
  navbar.classList.toggle("change");
});