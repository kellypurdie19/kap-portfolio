/* Light ↔ arcade toggle, pinball scroll-to-top*/

/* ======================================
   Theme Switch & Pinball Scroll
====================================== */

const body = document.documentElement;
const toggleBtn = document.getElementById("themeToggle");

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    const current = body.getAttribute("data-theme");
    const next = current === "modern" ? "arcade" : "modern";
    body.setAttribute("data-theme", next);
    toggleBtn.textContent = next === "modern" ? "Arcade Mode" : "Modern Mode";
  });
}

/* Scroll pinball */
const ball = document.getElementById("pinball");

if (ball) {
  window.addEventListener("scroll", () => {
    const velocity = Math.abs(window.scrollY - (ball._lastY || 0));
    ball.style.transform = `translateY(${velocity / 2}px)`;
    ball._lastY = window.scrollY;
  });

  ball.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
