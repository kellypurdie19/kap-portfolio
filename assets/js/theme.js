/* ======================================
   Theme Switch
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
