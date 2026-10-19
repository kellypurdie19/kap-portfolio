/* kelly.ahola — site interactions */
(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Scroll: glowing path, side index, process steps, corner ball ---------- */
  var line = document.getElementById('glowLine');
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.side-index a'));
  var sectionIds = navLinks.map(function (a) { return a.dataset.section; });
  var steps = document.getElementById('steps');
  var ball = document.getElementById('topBall');
  var ballBounce = document.getElementById('topBallBounce');
  var lastY = window.scrollY;
  var lastBounce = 0;
  var ticking = false;

  function update() {
    ticking = false;
    var y = window.scrollY;
    var max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    var progress = Math.min(1, Math.max(0, y / max));
    if (line) line.style.strokeDashoffset = String(1 - progress);

    // Which section is in view
    var activeIdx = 0;
    for (var i = 0; i < sectionIds.length; i++) {
      var el = document.getElementById(sectionIds[i]);
      if (el && el.getBoundingClientRect().top < window.innerHeight * 0.5) activeIdx = i;
    }
    navLinks.forEach(function (a, i) {
      a.classList.toggle('is-active', i === activeIdx);
      a.classList.toggle('is-lit', i < activeIdx);
    });

    // Light up the process steps once you reach them
    if (steps && steps.getBoundingClientRect().top < window.innerHeight * 0.7) {
      steps.classList.add('is-lit');
    }

    // Corner ball: show after the hero, bounce when scrolling
    if (ball) ball.classList.toggle('is-visible', y > window.innerHeight * 0.4);
    var now = Date.now();
    if (!reduceMotion && ballBounce && Math.abs(y - lastY) > 4 && now - lastBounce > 650) {
      lastBounce = now;
      ballBounce.classList.remove('bounce');
      void ballBounce.offsetWidth; // restart the animation
      ballBounce.classList.add('bounce');
    }
    lastY = y;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('resize', update);
  update();

  /* ---------- Hero bubbles follow the mouse ---------- */
  var heroArt = document.getElementById('heroArt');
  var glint = document.getElementById('glint');
  if (heroArt && !reduceMotion) {
    var blobs = Array.prototype.slice.call(heroArt.querySelectorAll('.blob-wrap'));
    var pending = null;
    heroArt.addEventListener('mousemove', function (e) {
      var r = heroArt.getBoundingClientRect();
      pending = { px: (e.clientX - r.left) / r.width, py: (e.clientY - r.top) / r.height };
      if (heroArt._raf) return;
      heroArt._raf = requestAnimationFrame(function () {
        heroArt._raf = null;
        var nx = pending.px * 2 - 1, ny = pending.py * 2 - 1;
        blobs.forEach(function (b, i) {
          var d = Number(b.dataset.depth) || 0;
          var scale = i === 0 ? ' scale(1.03)' : '';
          b.style.transform = 'translate(' + (nx * d) + 'px,' + (ny * d * 0.8) + 'px)' + scale;
        });
        if (glint) {
          glint.style.left = Math.round(pending.px * 100) + '%';
          glint.style.top = Math.round(pending.py * 100) + '%';
          glint.style.opacity = '1';
        }
      });
    });
    heroArt.addEventListener('mouseleave', function () {
      blobs.forEach(function (b) { b.style.transform = ''; });
      if (glint) glint.style.opacity = '0';
    });
  }

  /* ---------- Guess the Number ---------- */
  var form = document.getElementById('guessForm');
  var input = document.getElementById('guess');
  var btn = document.getElementById('guessBtn');
  var msg = document.getElementById('gameMessage');
  var correctSound = document.getElementById('correctSound');
  var wrongSound = document.getElementById('wrongSound');
  var target, tries, over;

  function newGame() {
    target = 1 + Math.floor(Math.random() * 100);
    tries = 0;
    over = false;
    btn.textContent = 'Guess';
    input.disabled = false;
    input.value = '';
  }

  function play(sound) {
    if (!sound) return;
    try { sound.currentTime = 0; var p = sound.play(); if (p && p.catch) p.catch(function () {}); } catch (e) {}
  }

  if (form) {
    newGame();
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (over) { newGame(); msg.textContent = 'New number. Go!'; input.focus(); return; }
      var g = parseInt(input.value, 10);
      if (!g || g < 1 || g > 100) { msg.textContent = 'Pick a number from 1 to 100.'; return; }
      tries++;
      if (g === target) {
        over = true;
        msg.textContent = 'You got it in ' + tries + (tries === 1 ? ' try!' : ' tries!');
        play(correctSound);
        if (window.confetti && !reduceMotion) {
          window.confetti({ particleCount: 90, spread: 70, origin: { y: 0.7 }, colors: ['#6100FD', '#F2479B', '#14B8B0', '#FFD23F'] });
        }
      } else if (tries >= 10) {
        over = true;
        msg.textContent = 'Out of tries. It was ' + target + '.';
        play(wrongSound);
      } else {
        msg.textContent = (g > target ? 'Too high. ' : 'Too low. ') + (10 - tries) + ' tries left.';
        play(wrongSound);
        input.value = '';
      }
      if (over) { btn.textContent = 'Play again'; input.disabled = true; btn.focus(); }
      else input.focus();
    });
  }

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
