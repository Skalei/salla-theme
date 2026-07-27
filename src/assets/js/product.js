/**
 * WOW Chocolate — product page behaviors
 * Sticky mobile buy bar + copy-link shareability.
 */
(function () {
  'use strict';

  /* ---- Sticky mobile buy bar: appears once the buy box scrolls away ---- */
  var bar = document.getElementById('sticky-buy-bar');
  var buyBox = document.querySelector('.product-buy');
  if (bar && buyBox && window.sticky_add_to_cart !== false && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      var visible = !entries[0].isIntersecting;
      bar.classList.toggle('is-visible', visible);
      bar.setAttribute('aria-hidden', String(!visible));
    }, { threshold: 0 }).observe(buyBox);

    var scrollBtn = bar.querySelector('[data-scroll-to-buy]');
    if (scrollBtn) {
      scrollBtn.addEventListener('click', function () {
        buyBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    }
  }

  /* ---- Copy link: لا تخليها لك بس ---- */
  var copyBtn = document.querySelector('[data-copy-link]');
  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var original = copyBtn.textContent;
      navigator.clipboard.writeText(window.location.href).then(function () {
        copyBtn.textContent = copyBtn.dataset.copiedLabel || original;
        setTimeout(function () { copyBtn.textContent = original; }, 2000);
      });
    });
  }
})();
