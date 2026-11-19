(function () {
  var cfg = window.SITE_CONFIG || {};

  /* Google Drive buttons: shown only when a link exists */
  document.querySelectorAll('[data-drive]').forEach(function (el) {
    var url = (cfg.driveLinks || {})[el.dataset.drive];
    if (url) {
      el.href = url;
      el.target = '_blank';
      el.rel = 'noopener';
      el.hidden = false;
    }
  });

  /* Optional content-plan pictures */
  document.querySelectorAll('[data-plan]').forEach(function (box) {
    var src = (cfg.planImages || {})[box.dataset.plan];
    if (!src) return;
    var fig = document.createElement('figure');
    var btn = document.createElement('button');
    var img = document.createElement('img');
    var cap = document.createElement('figcaption');
    btn.type = 'button'; btn.className = 'zoom';
    img.src = src; img.alt = 'Content plan sample'; img.loading = 'lazy';
    cap.textContent = 'Content plan';
    btn.appendChild(img); fig.appendChild(btn); fig.appendChild(cap);
    box.appendChild(fig);
    box.hidden = false;
  });

  /* Contact */
  document.querySelectorAll('[data-email]').forEach(function (a) {
    if (!cfg.email) return;
    a.href = 'mailto:' + cfg.email;
    if (a.textContent.indexOf('@') > -1) a.textContent = cfg.email;
  });
  document.querySelectorAll('[data-whatsapp]').forEach(function (a) {
    if (cfg.whatsapp) a.href = 'https://wa.me/' + String(cfg.whatsapp).replace(/\D/g, '');
  });
  document.querySelectorAll('[data-social]').forEach(function (a) {
    var url = (cfg.social || {})[a.dataset.social];
    if (url) { a.href = url; a.target = '_blank'; a.rel = 'noopener'; a.hidden = false; }
  });

  /* Image preview */
  var box = document.getElementById('lightbox');
  if (box && box.showModal) {
    var big = box.querySelector('img');
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.zoom');
      if (btn) {
        var img = btn.querySelector('img');
        big.src = img.currentSrc || img.src;
        big.alt = img.alt;
        box.showModal();
      } else if (e.target === box) {
        box.close();
      }
    });
  }
})();
