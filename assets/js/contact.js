/* kelly.ahola — contact pop-up: lets visitors pick how to email */
(function () {
  var EMAIL = 'me@kellyahola.com';
  var modal = document.getElementById('contactModal');
  if (!modal) return;
  var status = document.getElementById('contactStatus');
  var copyBtn = document.getElementById('copyEmail');
  var copyLabel = document.getElementById('copyLabel');
  var lastFocus = null;

  function open(e) {
    if (e) e.preventDefault();
    lastFocus = document.activeElement;
    status.textContent = '';
    copyLabel.textContent = 'Copy address';
    modal.hidden = false;
    document.body.classList.add('modal-open');
    setTimeout(function () { var f = modal.querySelector('.contact-option'); if (f) f.focus(); }, 30);
  }
  function close() {
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    if (lastFocus) lastFocus.focus();
  }

  document.querySelectorAll('[data-contact]').forEach(function (el) { el.addEventListener('click', open); });
  modal.querySelectorAll('[data-close]').forEach(function (b) { b.addEventListener('click', close); });
  document.addEventListener('keydown', function (e) { if (!modal.hidden && e.key === 'Escape') close(); });

  function copied() {
    copyLabel.textContent = 'Copied!';
    status.textContent = EMAIL + ' is copied. Paste it into any email.';
  }
  function fallbackCopy() {
    var t = document.createElement('textarea');
    t.value = EMAIL; t.setAttribute('readonly', ''); t.style.position = 'absolute'; t.style.left = '-9999px';
    document.body.appendChild(t); t.select();
    try { document.execCommand('copy'); copied(); } catch (err) { status.textContent = 'My address is ' + EMAIL; }
    document.body.removeChild(t);
  }
  copyBtn.addEventListener('click', function () {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(EMAIL).then(copied, fallbackCopy);
    } else {
      fallbackCopy();
    }
  });
})();
