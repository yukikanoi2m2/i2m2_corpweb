// ============================================================
// CORPORATE SITE — Premium Interactions
// ============================================================

(function() {
  'use strict';

  // ============================================================
  // CUSTOM CURSOR (desktop)
  // ============================================================
  const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent) || window.innerWidth < 1024;

  if (!isMobile) {
    const dot = document.createElement('div');
    const ring = document.createElement('div');
    dot.className = 'cursor-dot';
    ring.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mx = -100, my = -100;
    let rx = -100, ry = -100;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
    });

    // Smooth follow for ring
    function animateRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover effect on interactive elements
    document.querySelectorAll('a, button, .service-card, .why-card, .result-card, .sd-card').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });
  }

  // ============================================================
  // HEADER
  // ============================================================
  const header = document.getElementById('siteHeader');
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  if (header) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const sy = window.scrollY;
      header.classList.toggle('scrolled', sy > 60);
      // Hide on scroll down, show on scroll up (optional — disabled for now)
      lastScroll = sy;
    }, { passive: true });

    // Initial check
    if (window.scrollY > 60) header.classList.add('scrolled');
  }

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('active');
      document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ============================================================
  // SCROLL REVEAL (IntersectionObserver)
  // ============================================================
  const revealEls = document.querySelectorAll('[data-reveal]');
  const staggerEls = document.querySelectorAll('[data-stagger]');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));
  staggerEls.forEach(el => revealObserver.observe(el));

  // Also reveal sections/cards that don't have data-reveal
  const autoRevealEls = document.querySelectorAll(
    '.section-title, .why-card, .service-card, .result-card, .sd-card, .flow-step, .pain-item, .so-card, .column-item, .recruit-card, .resource-card, .case-card, .col-card, .strength-item, .domain-item'
  );
  const autoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        autoObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  autoRevealEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity .6s cubic-bezier(.22,1,.36,1) ${(i % 6) * 0.07}s, transform .6s cubic-bezier(.22,1,.36,1) ${(i % 6) * 0.07}s`;
    autoObserver.observe(el);
  });

  // ============================================================
  // COUNT UP ANIMATION
  // ============================================================
  const countEls = document.querySelectorAll('.hero-stat strong');
  let countDone = false;

  function animateCount(el) {
    const text = el.textContent || '';
    const match = text.match(/^(\d+)/);
    if (!match) return;
    const target = parseInt(match[1], 10);
    const suffix = text.replace(/^\d+/, '');
    const duration = 2000;
    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);
      el.innerHTML = current + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countDone) {
          countDone = true;
          countEls.forEach(el => animateCount(el));
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    countObserver.observe(heroStats);
  }

  // ============================================================
  // SMOOTH ANCHOR SCROLL
  // ============================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href && href !== '#') {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const top = target.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });

  // ============================================================
  // PARALLAX (subtle on hero)
  // ============================================================
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg && !isMobile) {
    window.addEventListener('scroll', () => {
      const sy = window.scrollY;
      if (sy < window.innerHeight) {
        heroBg.style.transform = `translateY(${sy * 0.3}px)`;
      }
    }, { passive: true });
  }

  // ============================================================
  // MAGNETIC BUTTONS (subtle)
  // ============================================================
  if (!isMobile) {
    document.querySelectorAll('.btn-primary, .header-cta').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  // ============================================================
  // TICKER / MARQUEE - Pause on hover
  // ============================================================
  const ticker = document.querySelector('.ticker-track');
  if (ticker) {
    const tickerWrap = ticker.parentElement;
    if (tickerWrap) {
      tickerWrap.addEventListener('mouseenter', () => { ticker.style.animationPlayState = 'paused'; });
      tickerWrap.addEventListener('mouseleave', () => { ticker.style.animationPlayState = 'running'; });
    }
  }

  // ============================================================
  // PAGE TRANSITION (simple fade for links)
  // ============================================================
  const main = document.getElementById('main');
  if (main) {
    main.style.opacity = '0';
    main.style.transition = 'opacity .4s ease';
    requestAnimationFrame(() => { main.style.opacity = '1'; });
  }

})();
