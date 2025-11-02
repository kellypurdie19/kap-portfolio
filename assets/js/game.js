/* Guess-the-number modal game. */

/* ======================================
   Guess the Number — Game Logic
====================================== */

let correctSound, wrongSound;

document.addEventListener("DOMContentLoaded", () => {
  correctSound = document.getElementById("correctSound");
  wrongSound   = document.getElementById("wrongSound");
});

let randomNumber = Math.floor(Math.random() * 100) + 1;
let guesses = [];
const maxGuesses = 10;

const guessBtn  = document.getElementById("guessBtn");
const guessInput = document.getElementById("guessInput");
const result     = document.getElementById("result");

function resetGame() {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  guesses = [];
  result.innerHTML = "";
  guessInput.value = "";
  guessInput.disabled = false;
  guessBtn.style.display = "block";
  guessBtn.textContent = "Guess";
  guessInput.focus();
}

function playCorrect() {
  if (correctSound) {
    correctSound.currentTime = 0;
    correctSound.play();
  }
}

function playWrong() {
  if (wrongSound) {
    wrongSound.currentTime = 0;
    wrongSound.play();
  }
}

function celebrate() {
  confetti({
    particleCount: 80,
    spread: 65,
    origin: { y: 0.6 }
  });
}

guessBtn?.addEventListener("click", handleGuess);
guessInput?.addEventListener("keypress", e => {
  if (e.key === "Enter") handleGuess();
});

function handleGuess() {
  let userGuess = Number(guessInput.value);
  if (!userGuess) return;

  guesses.push(userGuess);

  if (userGuess === randomNumber) {
    playCorrect();
    celebrate();
    result.innerHTML = `🎉 Correct! The number was <b>${randomNumber}</b>.<br>
    You won in ${guesses.length} tries!
    <br><button id="playAgain" class="btn btn-success mt-2">Play Again</button>`;

    gameOver();
  }
  else if (guesses.length >= maxGuesses) {
    playWrong();
    result.innerHTML = `😵 Out of turns! The number was <b>${randomNumber}</b>.<br>
    <button id="playAgain" class="btn btn-danger mt-2">Play Again</button>`;

    gameOver();
  }
  else {
    playWrong();
    result.innerHTML = `
      <div>${userGuess > randomNumber ? "📉 Too high!" : "📈 Too low!"}</div>
      <div>Guesses: ${guesses.join(", ")}</div>
      <div>Tries left: ${maxGuesses - guesses.length}</div>
    `;
  }

  // Hook play again button
  const again = document.getElementById("playAgain");
  if (again) again.onclick = resetGame;

  guessInput.value = "";
  guessInput.focus();
}

function gameOver() {
  guessInput.disabled = true;
  guessBtn.style.display = "none";
}

/* Focus input when modal opens (Bootstrap) */
document.getElementById("gameModal")?.addEventListener("shown.bs.modal", () => {
  guessInput?.focus();
});
