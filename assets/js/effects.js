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
let blobs = [];
for (let i = 0; i < 30; i++) {
  blobs.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 120 + 60,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3
  });
}

// ✅ Mouse tracking
let mouse = { x: -9999, y: -9999, down: false };

document.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

document.addEventListener("mousedown", () => (mouse.down = true));
document.addEventListener("mouseup", () => (mouse.down = false));

function draw() {
  if (!ctx || !canvas) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const theme = document.documentElement.getAttribute("data-theme");

  blobs.forEach(b => {
    let dx = b.x - mouse.x;
    let dy = b.y - mouse.y;
    let dist = Math.sqrt(dx * dx + dy * dy);

    // ✅ Push blobs when mouse near
    if (dist < 200) {
      let force = (200 - dist) / 200;
      let push = mouse.down ? 0.12 : 0.04;
      b.vx += dx * force * push;
      b.vy += dy * force * push;
    }

    // ✅ Move blobs
    b.x += b.vx;
    b.y += b.vy;
    b.vx *= mouse.down ? 0.92 : 0.96;
    b.vy *= mouse.down ? 0.92 : 0.96;

    // ✅ Tron glow mode if arcade
    ctx.globalCompositeOperation = "lighter";
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
