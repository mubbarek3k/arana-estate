(function () {
  'use strict';

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

  document.addEventListener('click', function (e) {
    var a = e.target.closest('a');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (typeof fbq !== 'function') return;
    if (href.indexOf('wa.me') !== -1 || href.indexOf('api.whatsapp.com') !== -1) {
      fbq('track', 'Lead', { method: 'whatsapp' });
    } else if (href.indexOf('tel:') === 0) {
      fbq('track', 'Lead', { method: 'phone' });
    }
  });

  document.querySelectorAll('[data-hero-slider]').forEach(function (slider) {
    var slides = slider.querySelectorAll('.hero-slide');
    var prevBtn = slider.querySelector('.hero-prev');
    var nextBtn = slider.querySelector('.hero-next');
    var dotsContainer = slider.querySelector('.hero-dots');
    if (slides.length < 2) return;

    var current = 0;
    var timer = null;
    var INTERVAL = 4500;

    slides.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', 'Фото ' + (i + 1));
      if (i === 0) dot.classList.add('is-active');
      dot.addEventListener('click', function () { go(i); restart(); });
      dotsContainer.appendChild(dot);
    });
    var dots = dotsContainer.querySelectorAll('button');

    function go(i) {
      slides[current].classList.remove('is-active');
      dots[current].classList.remove('is-active');
      current = (i + slides.length) % slides.length;
      slides[current].classList.add('is-active');
      dots[current].classList.add('is-active');
    }
    function next() { go(current + 1); }
    function prev() { go(current - 1); }
    function start() { stop(); timer = setInterval(next, INTERVAL); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function restart() { start(); }

    if (prevBtn) prevBtn.addEventListener('click', function () { prev(); restart(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { next(); restart(); });
    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', start);

    start();
  });
})();
