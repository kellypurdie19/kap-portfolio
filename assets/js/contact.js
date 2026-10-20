/* kelly.ahola — contact pop-up form
   Sends messages through Web3Forms (https://web3forms.com).
   Paste your access key below. It is safe to keep in the page: it only
   lets people send messages to your inbox, nothing else. */
(function () {
  var ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY';
  var FALLBACK_EMAIL = 'me@kellyahola.com';

  var modal = document.getElementById('contactModal');
  if (!modal) return;
  var form = document.getElementById('contactForm');
  var status = document.getElementById('contactStatus');
  var submitBtn = document.getElementById('contactSubmit');
  var closeBtns = modal.querySelectorAll('[data-close]');
  var lastFocus = null;

  function open(e) {
    if (e) e.preventDefault();
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.classList.add('modal-open');
    setTimeout(function () { var f = form.querySelector('input'); if (f) f.focus(); }, 30);
  }
  function close() {
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    if (lastFocus) lastFocus.focus();
  }

  document.querySelectorAll('[data-contact]').forEach(function (el) {
    el.addEventListener('click', open);
  });
  closeBtns.forEach(function (b) { b.addEventListener('click', close); });
  document.addEventListener('keydown', function (e) {
    if (!modal.hidden && e.key === 'Escape') close();
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (form.botcheck && form.botcheck.checked) return; // spam bot

    if (ACCESS_KEY.indexOf('YOUR_') === 0) {
      status.className = 'contact-status is-error';
      status.textContent = 'The form isn\'t connected yet. Please email ' + FALLBACK_EMAIL + ' for now.';
      return;
    }

    var data = new FormData(form);
    data.append('access_key', ACCESS_KEY);
    data.append('subject', 'New message from kellyahola.com');
    data.append('from_name', 'kellyahola.com');

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    status.className = 'contact-status';
    status.textContent = '';

    fetch('https://api.web3forms.com/submit', { method: 'POST', body: data })
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (res && res.success) {
          form.reset();
          status.className = 'contact-status is-success';
          status.textContent = 'Thank you! Your message is on its way. I\'ll reply within two business days.';
        } else {
          throw new Error((res && res.message) || 'Send failed');
        }
      })
      .catch(function () {
        status.className = 'contact-status is-error';
        status.textContent = 'Sorry, something went wrong. Please try again, or email ' + FALLBACK_EMAIL + '.';
      })
      .then(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send';
      });
  });
})();
