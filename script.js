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

// Declare variables (we will assign them after page loads)
let correctSound, wrongSound;

document.addEventListener("DOMContentLoaded", () => {
  correctSound = document.getElementById("correctSound");
  wrongSound = document.getElementById("wrongSound");
  console.log("Sounds ready:", correctSound, wrongSound);
});

function playCorrect() {
  if (!correctSound) return;
  correctSound.currentTime = 0;
  correctSound.play();
}

function playWrong() {
  if (!wrongSound) return;
  wrongSound.currentTime = 0;
  wrongSound.play();
}

function celebrate() {
  confetti({
    particleCount: 80,
    spread: 65,
    origin: { y: 0.6 }
  });
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
  guessBtn.style.display = "block"; // ✅ bring it back
}

guessBtn.onclick = () => {
  let userGuess = Number(guessInput.value);
  if (!userGuess) return;
    
  guesses.push(userGuess);

  if (userGuess === randomNumber) {
    playCorrect();
    celebrate();
    result.innerHTML = `🎉 Correct! The number was <b>${randomNumber}</b>.<br>You won in ${guesses.length} tries!<br><button id="playAgain" class="btn btn-success mt-2">Play Again</button>`;
    guessInput.disabled = true;
    guessBtn.style.display = "none";

  } else if (guesses.length >= maxGuesses) {
    playWrong();
    result.innerHTML = `😵 Out of turns! The number was <b>${randomNumber}</b>.<br><button id="playAgain" class="btn btn-danger mt-2">Play Again</button>`;
    guessInput.disabled = true;
   guessBtn.style.display = "none";

  } else {
    playWrong();
    result.innerHTML = `
      <div>${userGuess > randomNumber ? "📉 Too high!" : "📈 Too low!"}</div>
      <div>Guesses: ${guesses.join(", ")}</div>
      <div>Tries left: ${maxGuesses - guesses.length}</div>
    `;
  }

  // Hook reset when game ends
  if (guessInput.disabled) {
    document.getElementById("playAgain").onclick = () => {
      resetGame();
      guessBtn.textContent = "Guess";
      result.innerHTML = ""; 
      guessInput.focus();
    };
  } else {
    setTimeout(() => guessInput.focus(), 150);
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
window.addEventListener("load", () => {
  // blobs + glow + draw loop here


/* ============================
   Ink Blob Cursor Interaction
============================ */
/* =====================================================
   INK BLOBS + CURSOR GLOW (Calm Mode + Deep Effect)
===================================================== */

// Create cursor glow follower
const glow = document.createElement("div");
glow.className = "cursor-glow";
document.body.appendChild(glow);

document.addEventListener("mousemove", e => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});


const canvas = document.getElementById("inkCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let blobs = [];
for (let i = 0; i < 30; i++) {
  blobs.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 120 + 60,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3
  });
}

let mouse = { x: -9999, y: -9999, down: false };

document.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

canvas.addEventListener("mousedown", () => (mouse.down = true));
canvas.addEventListener("mouseup", () => (mouse.down = false));

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  blobs.forEach(b => {
    let dx = b.x - mouse.x;
    let dy = b.y - mouse.y;
    let dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 200) {
      let force = (200 - dist) / 200;
      let push = mouse.down ? 0.12 : 0.04;
      b.vx += dx * force * push;
      b.vy += dy * force * push;
    }

    b.x += b.vx;
    b.y += b.vy;

    b.vx *= mouse.down ? 0.92 : 0.96;
    b.vy *= mouse.down ? 0.92 : 0.96;

    // ✅ TRON glowing plasma mode
    ctx.globalCompositeOperation = "lighter";
    const theme = document.documentElement.getAttribute("data-theme");
    ctx.shadowBlur = theme === "arcade" ? 30 : 0;
    ctx.shadowColor = theme === "arcade" ? "cyan" : "transparent";

    ctx.beginPath();
    ctx.fillStyle =
    theme === "arcade"
        ? "rgba(0,255,255,0.28)"
        : "rgba(0,0,0,0.08)";
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(draw);
}

draw();

});

const aboutEl = document.querySelector('.about-type');

const original = "Kelly Ahola";
const replaceWith = "Hello. I am —";

function typeDeleteReplace() {
  aboutEl.textContent = original;
  let i = original.length;

  function deleteLetters() {
    if (i >= 0) {
      aboutEl.textContent = original.slice(0, i);
      i--;
      setTimeout(deleteLetters, 60);
    } else {
      typeNew();
    }
  }

  function typeNew(j = 0) {
    if (j < replaceWith.length) {
      aboutEl.textContent += replaceWith.charAt(j);
      setTimeout(() => typeNew(j + 1), 50);
    }
  }

  deleteLetters();
}

if (aboutEl) setTimeout(typeDeleteReplace, 600);
