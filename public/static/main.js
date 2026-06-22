/* ============================================================
   i2m2 — Advanced Interaction System
   Canvas particles, scroll reveals, magnetic effects, 
   smooth cursor, text animations
   ============================================================ */

;(function() {
  'use strict';

  // ============================================================
  // PARTICLE SYSTEM (Canvas-based neural network visualization)
  // ============================================================
  class ParticleNetwork {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.particles = [];
      this.mouse = { x: -1000, y: -1000 };
      this.animId = null;
      this.resize();
      this.init();
      this.animate();
      window.addEventListener('resize', () => this.resize());
      canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;
      });
      canvas.addEventListener('mouseleave', () => {
        this.mouse.x = -1000;
        this.mouse.y = -1000;
      });
    }

    resize() {
      const dpr = window.devicePixelRatio || 1;
      const rect = this.canvas.parentElement.getBoundingClientRect();
      this.width = rect.width;
      this.height = rect.height;
      this.canvas.width = this.width * dpr;
      this.canvas.height = this.height * dpr;
      this.canvas.style.width = this.width + 'px';
      this.canvas.style.height = this.height + 'px';
      this.ctx.scale(dpr, dpr);
    }

    init() {
      const count = Math.min(Math.floor((this.width * this.height) / 12000), 80);
      this.particles = [];
      for (let i = 0; i < count; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    }

    animate() {
      this.ctx.clearRect(0, 0, this.width, this.height);
      const connectionDist = 150;
      const mouseDist = 200;

      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];
        
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce
        if (p.x < 0 || p.x > this.width) p.vx *= -1;
        if (p.y < 0 || p.y > this.height) p.vy *= -1;

        // Mouse interaction - gentle attraction
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouseDist) {
          const force = (mouseDist - dist) / mouseDist * 0.01;
          p.vx += dx * force;
          p.vy += dy * force;
        }

        // Damping
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Draw particle
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(26, 107, 204, ${p.opacity * 0.6})`;
        this.ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < this.particles.length; j++) {
          const p2 = this.particles[j];
          const cdx = p.x - p2.x;
          const cdy = p.y - p2.y;
          const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
          if (cdist < connectionDist) {
            const alpha = (1 - cdist / connectionDist) * 0.15;
            this.ctx.beginPath();
            this.ctx.moveTo(p.x, p.y);
            this.ctx.lineTo(p2.x, p2.y);
            this.ctx.strokeStyle = `rgba(26, 107, 204, ${alpha * 0.5})`;
            this.ctx.lineWidth = 0.5;
            this.ctx.stroke();
          }
        }
      }

      this.animId = requestAnimationFrame(() => this.animate());
    }

    destroy() {
      if (this.animId) cancelAnimationFrame(this.animId);
    }
  }

  // ============================================================
  // CUSTOM CURSOR
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

      // Hover detection
      const hoverEls = 'a, button, .service-card, .why-card, .result-card, .btn, .recruit-card, .additional-item, .domain-item, .lp-feature';
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
  // SCROLL REVEAL (IntersectionObserver)
  // ============================================================
  class ScrollReveal {
    constructor() {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            // Don't unobserve to allow re-animation if needed
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

      this.observe();
    }

    observe() {
      // Auto-add data-reveal to common elements
      const selectors = [
        '.why-card', '.service-card', '.result-card', '.domain-item',
        '.additional-item', '.lp-feature', '.lp-flow-step', '.news-item',
        '.access-card', '.recruit-card', '.result-num-item',
        '.service-detail-card', '.philosophy-value', '.history-item'
      ];
      
      selectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
          if (!el.hasAttribute('data-reveal')) el.setAttribute('data-reveal', '');
        });
      });

      // Add stagger to grids
      const staggerSelectors = [
        '.why-grid', '.services-grid', '.results-grid', '.domain-grid',
        '.additional-grid', '.lp-features', '.lp-flow',
        '.results-numbers', '.recruit-positions', '.services-detail-grid'
      ];
      staggerSelectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
          if (!el.hasAttribute('data-stagger')) el.setAttribute('data-stagger', '');
        });
      });

      // Observe all [data-reveal] and [data-stagger]
      document.querySelectorAll('[data-reveal], [data-stagger]').forEach(el => {
        this.observer.observe(el);
      });

      // Also observe sections for title animations
      document.querySelectorAll('.section-title, .section-lead, .mission-block, .message-wrap, .about-lead').forEach(el => {
        el.setAttribute('data-reveal', '');
        this.observer.observe(el);
      });
    }
  }

  // ============================================================
  // COUNTER ANIMATION
  // ============================================================
  class CountUp {
    constructor() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !entry.target.dataset.counted) {
            entry.target.dataset.counted = 'true';
            this.animate(entry.target);
          }
        });
      }, { threshold: 0.5 });

      document.querySelectorAll('.hero-stat strong, .result-num-item strong').forEach(el => {
        observer.observe(el);
      });
    }

    animate(el) {
      const text = el.textContent;
      const match = text.match(/^(\d+)/);
      if (!match) return;
      const target = parseInt(match[1]);
      const suffix = text.replace(/^\d+/, '');
      const duration = 2000;
      const start = performance.now();

      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const current = Math.floor(target * eased);
        el.innerHTML = current + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
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
        if (window.scrollY > 60) {
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
  // MAGNETIC BUTTONS
  // ============================================================
  class MagneticButtons {
    constructor() {
      if (window.innerWidth <= 768) return;
      document.querySelectorAll('.btn-primary, .header-cta').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        btn.addEventListener('mouseleave', () => {
          btn.style.transform = '';
        });
      });
    }
  }

  // ============================================================
  // PARALLAX (subtle)
  // ============================================================
  class Parallax {
    constructor() {
      this.hero = document.querySelector('.hero');
      if (!this.hero) return;
      window.addEventListener('scroll', () => {
        const y = window.scrollY;
        if (y < window.innerHeight) {
          const canvas = this.hero.querySelector('.hero-canvas');
          if (canvas) canvas.style.transform = `translateY(${y * 0.3}px)`;
        }
      }, { passive: true });
    }
  }

  // ============================================================
  // SMOOTH PAGE TRANSITION (fade-in)
  // ============================================================
  class PageTransition {
    constructor() {
      const main = document.getElementById('main');
      if (main) {
        main.style.opacity = '0';
        main.style.transition = 'opacity .6s ease';
        requestAnimationFrame(() => {
          main.style.opacity = '1';
        });
      }
    }
  }

  // ============================================================
  // TILT EFFECT on cards
  // ============================================================
  class TiltCards {
    constructor() {
      if (window.innerWidth <= 768) return;
      document.querySelectorAll('.service-card, .service-detail-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          card.style.transform = `translateY(-6px) perspective(800px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
        });
        card.addEventListener('mouseleave', () => {
          card.style.transform = '';
          card.style.transition = 'all .4s cubic-bezier(.22,1,.36,1)';
        });
        card.addEventListener('mouseenter', () => {
          card.style.transition = 'none';
        });
      });
    }
  }

  // ============================================================
  // INIT
  // ============================================================
  document.addEventListener('DOMContentLoaded', () => {
    new PageTransition();
    new SmoothCursor();
    new Header();
    new MobileNav();
    new ScrollReveal();
    new CountUp();
    new MagneticButtons();
    new Parallax();
    new TiltCards();

    // Init particle canvas if hero exists
    const heroCanvas = document.querySelector('.hero-canvas canvas');
    if (heroCanvas) {
      new ParticleNetwork(heroCanvas);
    }

    // Stagger mobile nav items delay
    const mobileItems = document.querySelectorAll('.mobile-nav li');
    mobileItems.forEach((li, i) => {
      li.style.transitionDelay = `${i * 0.05}s`;
    });
  });

})();
