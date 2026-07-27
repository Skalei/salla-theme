/**
 * WOW Chocolate — home page behaviors
 * UGC strip: lazy-load and play the vertical clips on hover/visibility.
 */
(function () {
  'use strict';

  var videos = document.querySelectorAll('[data-ugc-video]');
  if (!videos.length) return;

  var load = function (video) {
    if (video.dataset.loaded) return;
    video.querySelectorAll('source[data-src]').forEach(function (source) {
      source.src = source.dataset.src;
    });
    video.load();
    video.dataset.loaded = '1';
  };

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var video = entry.target;
        if (entry.isIntersecting) {
          load(video);
          video.play().catch(function () { /* autoplay blocked — poster stays */ });
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.6 });
    videos.forEach(function (video) { observer.observe(video); });
  }

  videos.forEach(function (video) {
    video.closest('.ugc-card').addEventListener('mouseenter', function () {
      load(video);
      video.play().catch(function () {});
    });
  });
})();
