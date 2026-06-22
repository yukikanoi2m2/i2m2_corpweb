/* ============================================================
   i2m2 — donuts.ne.jp Style Interaction System
   Canvas noise, card slider, section nav, text reveal,
   smooth cursor, counters
   ============================================================ */

;(function() {
  'use strict';

  // ============================================================
  // BACKGROUND NOISE CANVAS (donuts.ne.jp texture effect)
  // ============================================================
  class NoiseCanvas {
    constructor() {
      const canvas = document.querySelector('.c-background-noise');
      if (!canvas || !(canvas instanceof HTMLCanvasElement)) return;
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.resize();
      this.render();
      window.addEventListener('resize', () => this.resize());
    }
    resize() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
    render() {
      const w = this.canvas.width;
      const h = this.canvas.height;
      const imageData = this.ctx.createImageData(w, h);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = v; data[i+1] = v; data[i+2] = v; data[i+3] = 12;
      }
      this.ctx.putImageData(imageData, 0, 0);
    }
  }

  // ============================================================
  // CUSTOM CURSOR (gold luxury, desktop only)
  // ============================================================
  class SmoothCursor {
    constructor() {
      if (window.innerWidth <= 768) return;
      this.dot = document.createElement('div');
      this.ring = document.createElement('div');
      this.dot.className = 'cursor-dot';
      this.ring.className = 'cursor-ring';
      document.body.appendChild(this.dot);
      document.body.appendChild(this.ring);
      this.pos = { x: 0, y: 0 };
      this.target = { x: 0, y: 0 };
      document.addEventListener('mousemove', (e) => {
        this.target.x = e.clientX;
        this.target.y = e.clientY;
      });
      const hoverEls = 'a, button, .c-card, .c-btn, .c-pager-btn, .ir-card, .why-card, .service-card';
      document.addEventListener('mouseover', (e) => {
        if (e.target.closest(hoverEls)) this.ring.classList.add('hover');
      });
      document.addEventListener('mouseout', (e) => {
        if (e.target.closest(hoverEls)) this.ring.classList.remove('hover');
      });
      this.render();
    }
    render() {
      this.pos.x += (this.target.x - this.pos.x) * 0.15;
      this.pos.y += (this.target.y - this.pos.y) * 0.15;
      this.dot.style.transform = `translate(${this.target.x - 3}px, ${this.target.y - 3}px)`;
      this.ring.style.left = `${this.pos.x}px`;
      this.ring.style.top = `${this.pos.y}px`;
      requestAnimationFrame(() => this.render());
    }
  }

  // ============================================================
  // TEXT LETTER ANIMATION (donuts.ne.jp style — char by char)
  // ============================================================
  class TextLetterReveal {
    constructor() {
      this.elements = document.querySelectorAll('.js-text-letters');
      this.elements.forEach(el => this.split(el));
      this.observe();
    }
    split(el) {
      const text = el.textContent.trim();
      el.innerHTML = '';
      el.classList.add('c-text-letters');
      for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = text[i] === ' ' ? '\u00A0' : text[i];
        span.style.transitionDelay = `${i * 0.04}s`;
        el.appendChild(span);
      }
    }
    observe() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      }, { threshold: 0.3 });
      this.elements.forEach(el => observer.observe(el));
    }
  }

  // ============================================================
  // CARD SLIDER (donuts.ne.jp style — horizontal scroll with arrows)
  // ============================================================
  class CardSlider {
    constructor() {
      this.track = document.querySelector('.js-card-track');
      this.prevBtn = document.querySelector('.js-slider-prev');
      this.nextBtn = document.querySelector('.js-slider-next');
      if (!this.track) return;

      this.cards = this.track.querySelectorAll('.c-card');
      this.currentIndex = 0;
      this.cardWidth = 0;
      this.gap = 20;
      this.visibleCards = 3;

      this.calculate();
      window.addEventListener('resize', () => this.calculate());

      if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
      if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());

      // Touch/swipe support
      this.setupTouch();
    }

    calculate() {
      if (this.cards.length === 0) return;
      const card = this.cards[0];
      this.cardWidth = card.offsetWidth;
      const container = this.track.parentElement;
      this.visibleCards = Math.floor(container.offsetWidth / (this.cardWidth + this.gap));
      this.maxIndex = Math.max(0, this.cards.length - this.visibleCards);
      this.currentIndex = Math.min(this.currentIndex, this.maxIndex);
      this.updatePosition();
    }

    prev() {
      this.currentIndex = Math.max(0, this.currentIndex - 1);
      this.updatePosition();
    }

    next() {
      this.currentIndex = Math.min(this.maxIndex, this.currentIndex + 1);
      this.updatePosition();
    }

    updatePosition() {
      const offset = this.currentIndex * (this.cardWidth + this.gap);
      this.track.style.transform = `translateX(-${offset}px)`;
    }

    setupTouch() {
      let startX = 0, startY = 0, moved = false;
      this.track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        moved = false;
      }, { passive: true });
      this.track.addEventListener('touchmove', (e) => {
        const dx = e.touches[0].clientX - startX;
        const dy = e.touches[0].clientY - startY;
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 20) moved = true;
      }, { passive: true });
      this.track.addEventListener('touchend', (e) => {
        if (!moved) return;
        const dx = e.changedTouches[0].clientX - startX;
        if (dx < -40) this.next();
        else if (dx > 40) this.prev();
      });
    }
  }

  // ============================================================
  // SIDE NAVIGATION — highlight current section on scroll
  // ============================================================
  class SideNavigation {
    constructor() {
      this.nav = document.querySelector('.l-nav');
      this.items = document.querySelectorAll('.l-nav__item');
      this.sections = document.querySelectorAll('.p-snap-section');
      if (!this.nav || this.sections.length === 0) return;

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            this.setActive(id);
          }
        });
      }, { threshold: 0.4 });

      this.sections.forEach(section => this.observer.observe(section));
    }

    setActive(id) {
      this.items.forEach(item => {
        const link = item.querySelector('.l-nav__link');
        if (link && link.getAttribute('href') === '#' + id) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }
  }

  // ============================================================
  // COUNTER ANIMATION (numbers count up on scroll)
  // ============================================================
  class CountUp {
    constructor() {
      const counters = document.querySelectorAll('[data-target]');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = +el.getAttribute('data-target');
            const duration = 1500;
            const step = target / (duration / 16);
            let current = 0;
            const timer = setInterval(() => {
              current += step;
              if (current >= target) {
                el.textContent = target.toLocaleString();
                clearInterval(timer);
              } else {
                el.textContent = Math.floor(current).toLocaleString();
              }
            }, 16);
            observer.unobserve(el);
          }
        });
      }, { threshold: 0.3 });
      counters.forEach(c => observer.observe(c));
    }
  }

  // ============================================================
  // HEADER SCROLL EFFECT
  // ============================================================
  class Header {
    constructor() {
      this.header = document.getElementById('siteHeader');
      if (!this.header) return;
      window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
          this.header.classList.add('scrolled');
        } else {
          this.header.classList.remove('scrolled');
        }
      }, { passive: true });
    }
  }

  // ============================================================
  // MOBILE NAVIGATION
  // ============================================================
  class MobileNav {
    constructor() {
      this.btn = document.getElementById('hamburger');
      this.nav = document.getElementById('mobileNav');
      if (!this.btn || !this.nav) return;
      this.btn.addEventListener('click', () => this.toggle());
      this.nav.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => this.close());
      });
    }
    toggle() {
      this.btn.classList.toggle('active');
      this.nav.classList.toggle('active');
      document.body.style.overflow = this.nav.classList.contains('active') ? 'hidden' : '';
    }
    close() {
      this.btn.classList.remove('active');
      this.nav.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // ============================================================
  // SCROLL REVEAL (IntersectionObserver for subpages)
  // ============================================================
  class ScrollReveal {
    constructor() {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('revealed');
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

      document.querySelectorAll('[data-reveal]').forEach(el => this.observer.observe(el));

      // Auto-add reveal to common elements
      const selectors = [
        '.why-card', '.service-card', '.ir-card', '.news-item',
        '.section-title', '.result-num-item'
      ];
      selectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
          if (!el.hasAttribute('data-reveal')) {
            el.setAttribute('data-reveal', '');
            this.observer.observe(el);
          }
        });
      });
    }
  }

  // ============================================================
  // OPENING ANIMATION
  // ============================================================
  class OpeningAnimation {
    constructor() {
      this.opening = document.getElementById('opening');
      if (!this.opening) return;
      if (sessionStorage.getItem('i2m2_opened')) {
        this.opening.remove();
        return;
      }
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        this.opening.classList.add('done');
        document.body.style.overflow = '';
        sessionStorage.setItem('i2m2_opened', '1');
        setTimeout(() => this.opening.remove(), 700);
      }, 2200);
    }
  }

  // ============================================================
  // SMOOTH SCROLL for anchor links
  // ============================================================
  class SmoothScroll {
    constructor() {
      document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
          const target = document.querySelector(link.getAttribute('href'));
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      });
    }
  }

  // ============================================================
  // PAGE TRANSITION (fade in)
  // ============================================================
  class PageTransition {
    constructor() {
      const main = document.getElementById('main');
      if (main) {
        main.style.opacity = '0';
        main.style.transition = 'opacity .6s ease';
        requestAnimationFrame(() => { main.style.opacity = '1'; });
      }
    }
  }

  // ============================================================
  // INIT
  // ============================================================
  document.addEventListener('DOMContentLoaded', () => {
    new OpeningAnimation();
    new PageTransition();
    new NoiseCanvas();
    new SmoothCursor();
    new Header();
    new MobileNav();
    new TextLetterReveal();
    new CardSlider();
    new SideNavigation();
    new CountUp();
    new ScrollReveal();
    new SmoothScroll();
  });

})();
