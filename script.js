/* ================================
   Theme Toggle
================================ */

const body = document.documentElement;
const toggleBtn = document.getElementById("themeToggle");
toggleBtn.onclick = () => {
  const current = body.getAttribute("data-theme");
  const next = current === "modern" ? "arcade" : "modern";
  body.setAttribute("data-theme", next);
  toggleBtn.textContent = next === "modern" ? "Arcade Mode" : "Modern Mode";
};

/* ================================
   Pinball Scroll Ball
================================ */

const ball = document.getElementById("pinball");
window.addEventListener("scroll", () => {
  const velocity = Math.abs(window.scrollY - (ball._lastY || 0));
  ball.style.transform = `translateY(${velocity / 2}px)`;
  ball._lastY = window.scrollY;
});
ball.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });

/* ================================
   Dot Navigation
================================ */

const dots = document.querySelectorAll(".dot");
const sections = document.querySelectorAll(".section");
window.addEventListener("scroll", () => {
  let index = [...sections].findIndex(sec =>
    window.scrollY >= sec.offsetTop - 150
  );
  dots.forEach(d => d.classList.remove("active"));
  dots[index]?.classList.add("active");
});

/* ================================
   Guess the Number — Full Game
================================ */

let randomNumber = Math.floor(Math.random() * 100) + 1;
let guesses = [];
let maxGuesses = 10;

const guessBtn = document.getElementById("guessBtn");
const guessInput = document.getElementById("guessInput");
const result = document.getElementById("result");

function resetGame() {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  guesses = [];
  result.innerHTML = "";
  guessInput.value = "";
  guessInput.disabled = false;
  guessBtn.textContent = "Guess";
}

guessBtn.onclick = () => {
  let userGuess = Number(guessInput.value);
  if (!userGuess) return;

  guesses.push(userGuess);

  if (userGuess === randomNumber) {
    result.innerHTML = `🎉 Correct! The number was <b>${randomNumber}</b>.<br>You won in ${guesses.length} tries!<br><button id="playAgain" class="btn btn-success mt-2">Play Again</button>`;
    guessInput.disabled = true;
  } else if (guesses.length >= maxGuesses) {
    result.innerHTML = `😵 Out of turns! The number was <b>${randomNumber}</b>.<br><button id="playAgain" class="btn btn-danger mt-2">Play Again</button>`;
    guessInput.disabled = true;
  } else {
    result.innerHTML = `
      <div>${userGuess > randomNumber ? "📉 Too high!" : "📈 Too low!"}</div>
      <div>Guesses: ${guesses.join(", ")}</div>
      <div>Tries left: ${maxGuesses - guesses.length}</div>
    `;
  }

  // Reset button
  if (guessInput.disabled) {
    document.getElementById("playAgain").onclick = resetGame;
    guessBtn.textContent = "Done";
  }
};

