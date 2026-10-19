/* Cursor glow follower, Ink blob background simulation. Theme-aware glow (Tron mode) */

/* ======================================
   Cursor Glow + Ink Blob Background
====================================== */

// ✅ Cursor glow follower
const glow = document.createElement("div");
glow.className = "cursor-glow";
document.body.appendChild(glow);

document.addEventListener("mousemove", e => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

// ✅ Canvas setup
const canvas = document.getElementById("inkCanvas");
const ctx = canvas?.getContext("2d");

function resizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// ✅ Blob particles
// Blobs drift slowly, get nudged by the cursor, and wrap around the screen
// edges so they never get lost off-screen.
let blobs = [];
const MAX_SPEED = 2.5;   // cap so a fast mouse can't fling them away
const DRIFT = 0.25;      // the calm speed they settle back to

function makeBlobs() {
  const count = Math.round(Math.min(28, Math.max(12, window.innerWidth / 55)));
  blobs = [];
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    blobs.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 90 + 50,
      // each blob keeps its own gentle drift direction
      dx: Math.cos(angle) * DRIFT,
      dy: Math.sin(angle) * DRIFT,
      vx: 0,
      vy: 0,
      tint: i % 2
    });
  }
}
makeBlobs();
window.addEventListener("resize", makeBlobs);

// ✅ Mouse tracking
let mouse = { x: -9999, y: -9999, down: false };

document.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});
document.addEventListener("mouseleave", () => { mouse.x = mouse.y = -9999; });
document.addEventListener("mousedown", () => (mouse.down = true));
document.addEventListener("mouseup", () => (mouse.down = false));

const COLORS = {
  modern: ["rgba(97,0,253,0.07)", "rgba(14,165,233,0.08)"],
  arcade: ["rgba(0,255,255,0.11)", "rgba(255,0,200,0.10)"]
};

function draw() {
  if (!ctx || !canvas) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const theme = document.documentElement.getAttribute("data-theme") === "arcade" ? "arcade" : "modern";
  const w = canvas.width, h = canvas.height;

  ctx.globalCompositeOperation = theme === "arcade" ? "lighter" : "source-over";
  ctx.shadowBlur = theme === "arcade" ? 24 : 0;

  blobs.forEach(b => {
    // ✅ Gentle push when the cursor is near
    const mx = b.x - mouse.x;
    const my = b.y - mouse.y;
    const dist = Math.hypot(mx, my);
    if (dist < 180 && dist > 0) {
      const force = (180 - dist) / 180 * (mouse.down ? 0.6 : 0.25);
      b.vx += (mx / dist) * force;
      b.vy += (my / dist) * force;
    }

    // ✅ Push fades out, drift stays
    b.vx *= 0.94;
    b.vy *= 0.94;
    const speed = Math.hypot(b.vx, b.vy);
    if (speed > MAX_SPEED) {
      b.vx = (b.vx / speed) * MAX_SPEED;
      b.vy = (b.vy / speed) * MAX_SPEED;
    }

    b.x += b.dx + b.vx;
    b.y += b.dy + b.vy;

    // ✅ Wrap around the edges so nothing is ever lost
    if (b.x < -b.r) b.x = w + b.r;
    if (b.x > w + b.r) b.x = -b.r;
    if (b.y < -b.r) b.y = h + b.r;
    if (b.y > h + b.r) b.y = -b.r;

    ctx.shadowColor = theme === "arcade" ? (b.tint ? "magenta" : "cyan") : "transparent";
    ctx.beginPath();
    ctx.fillStyle = COLORS[theme][b.tint];
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(draw);
}

draw();
