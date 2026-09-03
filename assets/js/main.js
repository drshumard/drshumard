/* Taylaz Health — site behaviour: mobile nav, FAQ accordion, sticky header */
(function () {
  'use strict';

  /* Mobile navigation toggle */
  var nav = document.querySelector('.site-nav');
  var toggle = document.querySelector('.site-nav__toggle');
  if (nav && toggle) {
    var setOpen = function (open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.classList.toggle('no-scroll', open);
    };
    toggle.addEventListener('click', function () {
      setOpen(!nav.classList.contains('is-open'));
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) setOpen(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 991 && nav.classList.contains('is-open')) setOpen(false);
    });
  }

  /* FAQ accordions: one item open at a time per accordion */
  document.querySelectorAll('.faq-accordion').forEach(function (accordion) {
    var triggers = accordion.querySelectorAll('.faq-accordion__trigger');
    triggers.forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        var expanded = trigger.getAttribute('aria-expanded') === 'true';
        triggers.forEach(function (other) {
          other.setAttribute('aria-expanded', 'false');
          document.getElementById(other.getAttribute('aria-controls')).hidden = true;
        });
        if (!expanded) {
          trigger.setAttribute('aria-expanded', 'true');
          document.getElementById(trigger.getAttribute('aria-controls')).hidden = false;
        }
      });
    });
  });

  /* Sticky header: on wide screens, fix the header after scrolling 400px */
  var header = document.querySelector('.site-header');
  if (header) {
    var STICKY_MIN_WIDTH = 1280;
    var STICKY_SCROLL = 400;
    var update = function () {
      var shouldStick = window.innerWidth >= STICKY_MIN_WIDTH && window.pageYOffset > STICKY_SCROLL;
      if (shouldStick && !header.classList.contains('is-sticky')) {
        document.body.style.marginTop = header.offsetHeight + 'px';
        header.classList.add('is-sticky');
      } else if (!shouldStick && header.classList.contains('is-sticky')) {
        header.classList.remove('is-sticky');
        document.body.style.marginTop = '0';
      }
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }
})();

// Size the hero so the first screen ends exactly at the bottom of the advantage strip.
(function () {
  var hero = document.querySelector('.hero-dark');
  var header = document.querySelector('.site-header');
  var strip = document.querySelector('.advantage-section');
  if (!hero || !header || !strip) return;
  function fit() {
    hero.style.minHeight = Math.max(0, window.innerHeight - header.offsetHeight - strip.offsetHeight) + 'px';
  }
  fit();
  window.addEventListener('resize', fit);
})();
