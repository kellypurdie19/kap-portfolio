/*The "Hello. I am Kelly" typing + deleting, Modern mode hero only (arcade has static text), Running animation once on load*/

/* ======================================
   Hero Typing Effect (Modern Mode Only)
====================================== */

const aboutEl = document.querySelector('.about-type');
const isModern = () => document.documentElement.getAttribute("data-theme") === "modern";

const textOriginal = "Hello. I am Kelly Ahola-Purdie";
const textReplace  = "Hello. I am —";

function typeSequence() {
  if (!aboutEl || !isModern()) return;

  let i = textOriginal.length;
  aboutEl.textContent = textOriginal;

  function deleteLetters() {
    if (!isModern()) return;
    if (i >= 0) {
      aboutEl.textContent = textOriginal.slice(0, i);
      i--;
      setTimeout(deleteLetters, 60);
    } else {
      typeNew(0);
    }
  }

  function typeNew(j) {
    if (!isModern()) return;
    if (j < textReplace.length) {
      aboutEl.textContent += textReplace.charAt(j);
      setTimeout(() => typeNew(j + 1), 50);
    }
  }

  deleteLetters();
}

window.addEventListener("DOMContentLoaded", () => {
  if (aboutEl) setTimeout(typeSequence, 400);
});

document.getElementById("themeToggle")?.addEventListener("click", () => {
  if (isModern()) setTimeout(typeSequence, 400);
});
