/* Dot navigation scroll spying */
/* =========================
   Dot Navigation Highlighter
========================= */

const dots = document.querySelectorAll(".dot");
const sections = document.querySelectorAll(".section");

window.addEventListener("scroll", () => {
  let index = [...sections].findIndex(
    sec => window.scrollY >= sec.offsetTop - 150
  );

  dots.forEach(d => d.classList.remove("active"));
  dots[index]?.classList.add("active");
});
