/**
 * WOW Chocolate — global behaviors
 * Runs on every page (loaded from master.twig).
 * The Twilight JS SDK is available globally as `salla`.
 */
(function () {
  'use strict';

  /* ---- Mobile menu drawer ---- */
  var toggle = document.getElementById('mobile-menu-toggle');
  var menu = document.getElementById('mobile-menu');
  if (toggle && menu) {
    var setOpen = function (open) {
      menu.hidden = !open;
      menu.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    };
    toggle.addEventListener('click', function () { setOpen(menu.hidden); });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('[data-close-menu]') || e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !menu.hidden) setOpen(false);
    });
  }

  /* ---- Active world tab: highlight the tab whose URL matches ---- */
  document.querySelectorAll('.world-tab[data-world-tab]').forEach(function (tab) {
    try {
      var url = new URL(tab.href, window.location.origin);
      if (window.location.pathname.indexOf(url.pathname) === 0 && url.pathname !== '/') {
        tab.classList.add('is-active');
      }
    } catch (e) { /* invalid href — skip */ }
  });

  /* ---- Listing sort select → navigate ---- */
  var sortSelect = document.getElementById('product-filter');
  if (sortSelect) {
    sortSelect.addEventListener('change', function () {
      var url = new URL(window.location.href);
      url.searchParams.set('by', sortSelect.value);
      window.location.href = url.toString();
    });
  }

  /* ---- Twilight SDK events: keep the vibe, log the moments ---- */
  if (window.salla) {
    salla.onReady(function () {
      document.documentElement.classList.add('salla-ready');
    });
    salla.event.on('cart::add-item', function () {
      /* the toast component handles the UI; hook kept for pixels/analytics */
    });
  }
})();
