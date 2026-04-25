(function () {
  'use strict';

  var WHATSAPP_NUMBER = '77011113309';

  document.querySelectorAll('[data-gallery]').forEach(function (g) {
    var main = g.querySelector('.gallery-main');
    var thumbs = g.querySelectorAll('.gallery-thumb');
    if (!main || !thumbs.length) return;
    thumbs.forEach(function (t) {
      t.addEventListener('click', function () {
        var src = t.getAttribute('data-src');
        if (!src) return;
        main.src = src;
        thumbs.forEach(function (x) { x.classList.remove('is-active'); });
        t.classList.add('is-active');
      });
    });
  });

  var form = document.getElementById('lead-form');
  if (!form) return;

  var msgEl = document.getElementById('form-msg');

  function showMsg(type, text) {
    msgEl.className = 'form-msg ' + type;
    msgEl.textContent = text;
  }

  function clearMsg() {
    msgEl.className = 'form-msg';
    msgEl.textContent = '';
  }

  function normalizePhone(value) {
    return (value || '').replace(/[^\d+]/g, '');
  }

  function validate(name, phone) {
    if (!name || name.trim().length < 2) {
      return 'Укажи, пожалуйста, имя.';
    }
    var clean = normalizePhone(phone);
    if (clean.replace(/\D/g, '').length < 10) {
      return 'Проверь номер телефона.';
    }
    return null;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearMsg();

    var name = form.elements.name.value.trim();
    var phone = form.elements.phone.value.trim();
    var message = (form.elements.message.value || '').trim();

    var err = validate(name, phone);
    if (err) {
      showMsg('error', err);
      return;
    }

    var lines = [
      'Заявка с сайта arana.estate',
      'Имя: ' + name,
      'Телефон: ' + phone
    ];
    if (message) lines.push('Сообщение: ' + message);

    var text = encodeURIComponent(lines.join('\n'));
    var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + text;

    showMsg('success', 'Открываем WhatsApp…');
    window.open(url, '_blank', 'noopener');

    setTimeout(function () {
      form.reset();
      clearMsg();
    }, 2500);
  });
})();
