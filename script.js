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
const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");

function playCorrect() {
  correctSound.currentTime = 0;
  correctSound.play();
}

function playWrong() {
  wrongSound.currentTime = 0;
  wrongSound.play();
}

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
    playCorrect();
    result.innerHTML = `🎉 Correct! The number was <b>${randomNumber}</b>.<br>You won in ${guesses.length} tries!<br><button id="playAgain" class="btn btn-success mt-2">Play Again</button>`;
    guessInput.disabled = true;
  } else if (guesses.length >= maxGuesses) {
    playWrong();
    result.innerHTML = `😵 Out of turns! The number was <b>${randomNumber}</b>.<br><button id="playAgain" class="btn btn-danger mt-2">Play Again</button>`;
    guessInput.disabled = true;
  } else {
    playWrong();

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
// Allow Enter key to submit guess
guessInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    guessBtn.click(); // triggers the same logic as clicking the button
  }
});

// Auto-focus the input when modal opens (Bootstrap event)
document.addEventListener("DOMContentLoaded", () => {
  const gameModal = document.getElementById("gameModal");
  if (gameModal) {
    gameModal.addEventListener("shown.bs.modal", () => {
      guessInput.focus();
    });
  }
});


// Refocus input after each guess
// (small delay so it feels natural, not abrupt)
function refocusInput() {
  if (!guessInput.disabled) {
    setTimeout(() => guessInput.focus(), 150);
  }
}

// Modify guessBtn.onclick to call refocusInput after logic
guessBtn.onclick = () => {
  let userGuess = Number(guessInput.value);
  if (!userGuess) return;
    
  guesses.push(userGuess);

  if (userGuess === randomNumber) {
    playCorrect();
    result.innerHTML = `🎉 Correct! The number was <b>${randomNumber}</b>.<br>You won in ${guesses.length} tries!<br><button id="playAgain" class="btn btn-success mt-2">Play Again</button>`;
    guessInput.disabled = true;
  } else if (guesses.length >= maxGuesses) {
    playWrong();
    result.innerHTML = `😵 Out of turns! The number was <b>${randomNumber}</b>.<br><button id="playAgain" class="btn btn-danger mt-2">Play Again</button>`;
    guessInput.disabled = true;
  } else {
    playWrong();
    result.innerHTML = `
      <div>${userGuess > randomNumber ? "📉 Too high!" : "📈 Too low!"}</div>
      <div>Guesses: ${guesses.join(", ")}</div>
      <div>Tries left: ${maxGuesses - guesses.length}</div>
    `;
  }

  // Reset button behavior
  if (guessInput.disabled) {
    document.getElementById("playAgain").onclick = () => {
      resetGame();
      setTimeout(() => guessInput.focus(), 200);
    };
    guessBtn.textContent = "Done";
  }

  refocusInput(); // keep guessing smoothly
};
/* Animated placeholder hint */
function animatePlaceholder() {
  const hints = [
    "Try a number...",
    "Maybe 42? 🤔",
    "Press Enter to submit 👀",
    "You got this!",
    "High or low? 🕹️",
  ];

  let i = 0;
  setInterval(() => {
    guessInput.setAttribute("placeholder", hints[i]);
    i = (i + 1) % hints.length;
  }, 2000);
}

// Start the animation when page loads
animatePlaceholder();
