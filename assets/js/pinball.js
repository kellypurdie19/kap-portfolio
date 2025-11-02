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
