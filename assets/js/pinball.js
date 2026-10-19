/* ================================
   🎱 Pinball Scroll + Click
================================ */

const ball = document.getElementById("pinball");

window.addEventListener("scroll", () => {
  const velocity = Math.abs(window.scrollY - (ball._lastY || 0));
  ball.style.transform = `translateY(${velocity / 2}px)`;
  ball._lastY = window.scrollY;
});

ball.onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Only show the back-to-top ball once you've scrolled past the hero
function toggleBall() {
  ball.classList.toggle("is-visible", window.scrollY > window.innerHeight * 0.6);
}
window.addEventListener("scroll", toggleBall);
toggleBall();
