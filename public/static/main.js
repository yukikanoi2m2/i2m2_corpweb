/* ================================================================
   i2m2 — main.js  soijeong.com faithful replica
   (Vanilla JS + GSAP 3 + ScrollTrigger)
   ================================================================ */
'use strict';

/* ── global flags ── */
let gsapReady = false;

/* ================================================================
   0.  UTILITIES
================================================================ */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, mn, mx) => Math.min(Math.max(v, mn), mx);

/* ================================================================
   1.  LOADING SCREEN
================================================================ */
function initLoading() {
  const el = $('#loading');
  const fill = el && el.querySelector('.ld-fill');
  if (!el) return;

  let prog = 0;
  const tick = () => {
    prog += (100 - prog) * 0.04 + 0.5;
    if (fill) fill.style.width = Math.min(prog, 100) + '%';
    if (prog < 100) requestAnimationFrame(tick);
  };
  tick();

  const done = () => {
    if (fill) fill.style.width = '100%';
    setTimeout(() => {
      el.classList.add('done');
      document.body.classList.add('loaded');
      setTimeout(() => { el.style.display = 'none'; }, 800);
      startHeroAnimations();
    }, 300);
  };

  if (document.readyState === 'complete') {
    done();
  } else {
    window.addEventListener('load', done);
    setTimeout(done, 1500); // フォールバック：1.5秒後に強制完了
  }
}

/* ================================================================
   2.  CUSTOM CURSOR
================================================================ */
function initCursor() {
  const dot  = $('#cur-dot');
  const ring = $('#cur-ring');
  if (!dot || !ring) return;
  if (window.matchMedia('(pointer:coarse)').matches) {
    dot.style.display = ring.style.display = 'none';
    return;
  }

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  document.addEventListener('mouseover', e => {
    const t = e.target.closest('a, button, [data-cur], .mag-btn, .pf-card, .view-hint');
    if (t) {
      ring.classList.add('hov');
      if (t.classList.contains('pf-card') || t.classList.contains('view-hint')) {
        ring.classList.add('view-mode');
      }
    }
  });
  document.addEventListener('mouseout', e => {
    const t = e.target.closest('a, button, [data-cur], .mag-btn, .pf-card, .view-hint');
    if (t) {
      ring.classList.remove('hov');
      ring.classList.remove('view-mode');
    }
  });

  document.addEventListener('mousedown', () => ring.classList.add('click'));
  document.addEventListener('mouseup',   () => ring.classList.remove('click'));

  const raf = () => {
    dot.style.transform  = `translate(${mx - 4}px,${my - 4}px)`;
    rx = lerp(rx, mx, 0.12);
    ry = lerp(ry, my, 0.12);
    ring.style.transform = `translate(${rx - 20}px,${ry - 20}px)`;
    requestAnimationFrame(raf);
  };
  raf();
}

/* ================================================================
   3.  HEADER SCROLL
================================================================ */
function initHeader() {
  const hdr = $('#hdr');
  if (!hdr) return;
  let last = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    hdr.classList.toggle('scrolled', y > 60);
    hdr.classList.toggle('hidden',   y > 200 && y > last);
    last = y;
  }, { passive: true });
}

/* ================================================================
   4.  FULLSCREEN MENU
================================================================ */
function initMenu() {
  const btn = $('#menuToggle');
  const ov  = $('#menuOverlay');
  if (!btn || !ov) return;

  let open = false;

  const toggle = () => {
    open = !open;
    btn.classList.toggle('active', open);
    ov.classList.toggle('open',   open);
    document.body.style.overflow = open ? 'hidden' : '';
  };

  btn.addEventListener('click', toggle);
  ov.addEventListener('click', e => { if (e.target === ov) toggle(); });

  $$('[data-mc]', ov).forEach(a => a.addEventListener('click', () => { if (open) toggle(); }));

  const links = $$('.menu-link', ov);
  const obs = new MutationObserver(() => {
    if (ov.classList.contains('open')) {
      links.forEach((l, i) => {
        l.style.transitionDelay = (i * 0.07) + 's';
        l.classList.add('visible');
      });
    } else {
      links.forEach(l => { l.style.transitionDelay = '0s'; l.classList.remove('visible'); });
    }
  });
  obs.observe(ov, { attributes: true, attributeFilter: ['class'] });
}

/* ================================================================
   5.  SMOOTH SCROLL
================================================================ */
function initSmoothScroll() {
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

/* ================================================================
   6.  HERO ANIMATIONS (fires after loading done)
================================================================ */
function startHeroAnimations() {
  // Hero tag pulse dot
  const tagDot = $('.hero-tag-dot');
  if (tagDot) tagDot.style.animationPlayState = 'running';

  // Hero tag fade in
  const heroTag = $('#heroTag');
  if (heroTag) {
    heroTag.style.opacity = '0';
    heroTag.style.transform = 'translateY(20px)';
    heroTag.style.transition = 'opacity 0.8s 0.2s, transform 0.8s 0.2s cubic-bezier(.16,1,.3,1)';
    requestAnimationFrame(() => {
      heroTag.style.opacity = '1';
      heroTag.style.transform = 'translateY(0)';
    });
  }

  // Hero title words — slide up reveal
  const words = $$('.hero-title .word');
  words.forEach((w, i) => {
    w.style.opacity   = '0';
    w.style.transform = 'translateY(80px)';
    w.style.transition = `opacity 1s ${0.4 + i * 0.2}s cubic-bezier(.16,1,.3,1), transform 1s ${0.4 + i * 0.2}s cubic-bezier(.16,1,.3,1)`;
    requestAnimationFrame(() => {
      w.style.opacity   = '1';
      w.style.transform = 'translateY(0)';
    });
  });

  // Hero meta + actions
  const metaEl = $('#heroMeta');
  const actEl  = $('#heroActions');
  const scrollEl = $('.hero-scroll');
  [metaEl, actEl, scrollEl].filter(Boolean).forEach((el, i) => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(30px)';
    el.style.transition = `opacity 0.9s ${0.9 + i * 0.15}s, transform 0.9s ${0.9 + i * 0.15}s cubic-bezier(.16,1,.3,1)`;
    requestAnimationFrame(() => {
      el.style.opacity   = '1';
      el.style.transform = 'translateY(0)';
    });
  });

  // Stats counter in hero-meta
  setTimeout(() => initAllCounters(), 1200);
}

/* ================================================================
   7.  HERO VIDEO / PLACEHOLDER LOGIC
================================================================ */
function initHeroVideo() {
  const vid  = $('#heroVid');
  const ph   = $('#heroPlaceholder');
  if (!ph) return;

  if (!vid) {
    ph.style.opacity = '1';
    return;
  }

  vid.addEventListener('loadeddata', () => {
    ph.style.transition = 'opacity 1s';
    ph.style.opacity = '0';
    setTimeout(() => { ph.style.display = 'none'; }, 1000);
  });

  vid.addEventListener('error', () => {
    ph.style.opacity = '1';
    vid.style.display = 'none';
  });

  if (vid.readyState >= 2) {
    ph.style.opacity = '0';
    setTimeout(() => { ph.style.display = 'none'; }, 1000);
  }
}

/* ================================================================
   8.  HERO PARTICLE CANVAS
================================================================ */
function initParticles() {
  const canvas = document.getElementById('heroParticles');
  if (!canvas) return;

  const ctx  = canvas.getContext('2d');
  const particles = [];
  const N = 60;
  let W, H;

  const resize = () => {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  };
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const GOLD_COLORS = ['rgba(200,160,40,', 'rgba(240,208,100,', 'rgba(184,134,11,', 'rgba(255,220,80,'];

  class Particle {
    constructor() { this.reset(true); }
    reset(init = false) {
      this.x  = Math.random() * W;
      this.y  = init ? Math.random() * H : H + 10;
      this.r  = Math.random() * 2 + 0.5;
      this.vy = -(Math.random() * 0.5 + 0.15);
      this.vx = (Math.random() - 0.5) * 0.25;
      this.a  = Math.random() * 0.6 + 0.2;
      this.da = (Math.random() - 0.5) * 0.003;
      this.col = GOLD_COLORS[Math.floor(Math.random() * GOLD_COLORS.length)];
      this.life = 0;
      this.maxLife = Math.random() * 500 + 200;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.a  += this.da;
      this.a   = clamp(this.a, 0.05, 0.85);
      this.life++;
      if (this.y < -10 || this.life > this.maxLife) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.col + this.a + ')';
      ctx.fill();
    }
  }

  for (let i = 0; i < N; i++) particles.push(new Particle());

  const raf = () => {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 90) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(200,160,40,${0.12 * (1 - dist/90)})`;
          ctx.lineWidth   = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(raf);
  };
  raf();
}

/* ================================================================
   9.  TICKER ANIMATIONS
================================================================ */
function initTickers() {
  /* ── White ticker (top) ── */
  const wTrack = $('#tickerTrack') || $('.ticker-track');
  if (wTrack && !gsapReady) {
    let pos = 0;
    const w = wTrack.scrollWidth / 2;
    const tick = () => {
      pos += 0.5;
      if (pos >= w) pos -= w;
      wTrack.style.transform = `translateX(-${pos}px)`;
      requestAnimationFrame(tick);
    };
    tick();
  }

  /* ── Dark ticker ── */
  const dTrack = $('.dark-ticker-track');
  if (dTrack && !gsapReady) {
    let pos = 0;
    const w = dTrack.scrollWidth / 2;
    const tick = () => {
      pos += 0.6;
      if (pos >= w) pos -= w;
      dTrack.style.transform = `translateX(-${pos}px)`;
      requestAnimationFrame(tick);
    };
    tick();
  }

  /* ── About marquee ── */
  const aTrack = $('.about-marquee-track');
  if (aTrack && !gsapReady) {
    let pos = 0;
    const w = aTrack.scrollWidth / 2;
    const tick = () => {
      pos += 0.7;
      if (pos >= w) pos -= w;
      aTrack.style.transform = `translateX(-${pos}px)`;
      requestAnimationFrame(tick);
    };
    tick();
  }

  /* ── About vertical ticker ── */
  const vTrack = $('.about-ticker-v-track');
  if (vTrack && !gsapReady) {
    let pos = 0;
    const h = vTrack.scrollHeight / 2;
    const tick = () => {
      pos += 0.4;
      if (pos >= h) pos -= h;
      vTrack.style.transform = `translateY(-${pos}px)`;
      requestAnimationFrame(tick);
    };
    tick();
  }
}

/* ================================================================
   10. GSAP SCROLL ANIMATIONS
================================================================ */
function initGSAP() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    initFallbackReveal();
    return;
  }
  gsapReady = true;
  gsap.registerPlugin(ScrollTrigger);

  const ease = 'power3.out';

  /* ── Generic fade up ── */
  $$('.gsap-fade').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
      y: 60, opacity: 0, duration: 1, ease
    });
  });

  /* ── Fade from left ── */
  $$('.gsap-fade-l').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
      x: -80, opacity: 0, duration: 1.1, ease
    });
  });

  /* ── Fade from right ── */
  $$('.gsap-fade-r').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
      x: 80, opacity: 0, duration: 1.1, ease
    });
  });

  /* ── Stagger cards ── */
  const cardGroups = {};
  $$('.gsap-card').forEach(el => {
    const p = el.parentElement;
    if (!cardGroups[p]) cardGroups[p] = [];
    cardGroups[p].push(el);
  });
  Object.values(cardGroups).forEach(group => {
    gsap.from(group, {
      scrollTrigger: { trigger: group[0], start: 'top 82%', toggleActions: 'play none none none' },
      y: 80, opacity: 0, duration: 0.9, stagger: 0.12, ease
    });
  });

  /* ── Number counters ── */
  $$('.num-cell, [data-count]').forEach(el => {
    const numEl = el.querySelector('[data-count]') || el;
    const target = parseInt(numEl.dataset.count || '0');
    const suffix = numEl.dataset.s || '';
    if (!target) return;
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2.2,
          ease: 'power2.out',
          onUpdate: function() {
            numEl.textContent = Math.round(obj.val) + suffix;
          }
        });
      }
    });
  });

  /* ── White ticker ── */
  const wTrack = $('.ticker-track');
  if (wTrack && wTrack.scrollWidth > 0) {
    const w = wTrack.scrollWidth / 2;
    if (w > 0) {
      gsap.to(wTrack, {
        x: -w, duration: 22, ease: 'none', repeat: -1,
        modifiers: { x: gsap.utils.unitize(v => parseFloat(v) % w) }
      });
    }
  }

  /* ── Dark ticker ── */
  const dTrack = $('.dark-ticker-track');
  if (dTrack && dTrack.scrollWidth > 0) {
    const w = dTrack.scrollWidth / 2;
    if (w > 0) {
      gsap.to(dTrack, {
        x: -w, duration: 18, ease: 'none', repeat: -1,
        modifiers: { x: gsap.utils.unitize(v => parseFloat(v) % w) }
      });
    }
  }

  /* ── About marquee ── */
  const aTrack = $('.about-marquee-track');
  if (aTrack && aTrack.scrollWidth > 0) {
    const w = aTrack.scrollWidth / 2;
    if (w > 0) {
      gsap.to(aTrack, {
        x: -w, duration: 20, ease: 'none', repeat: -1,
        modifiers: { x: gsap.utils.unitize(v => parseFloat(v) % w) }
      });
    }
  }

  /* ── About vertical ticker ── */
  const vTrack = $('.about-ticker-v-track');
  if (vTrack && vTrack.scrollHeight > 0) {
    const h = vTrack.scrollHeight / 2;
    if (h > 0) {
      gsap.to(vTrack, {
        y: -h, duration: 25, ease: 'none', repeat: -1,
        modifiers: { y: gsap.utils.unitize(v => parseFloat(v) % h) }
      });
    }
  }

  /* ── Hero parallax ── */
  const heroVidWrap = $('.hero-vid-wrap');
  if (heroVidWrap) {
    gsap.to(heroVidWrap, {
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.5 },
      yPercent: 20, ease: 'none'
    });
  }

  /* ── CTA rings continuous rotation ── */
  const rings = $$('.cta-ring');
  rings.forEach((r, i) => {
    gsap.to(r, {
      rotation: i % 2 === 0 ? 360 : -360,
      duration: 18 + i * 6,
      ease: 'none',
      repeat: -1
    });
  });

  /* ── Service items stagger ── */
  const svcItems = $$('.svc-item');
  if (svcItems.length) {
    gsap.from(svcItems, {
      scrollTrigger: { trigger: svcItems[0], start: 'top 82%', toggleActions: 'play none none none' },
      y: 40, opacity: 0, duration: 0.75, stagger: 0.1, ease
    });
  }

  /* ── Portfolio cards ── */
  const pfCards = $$('.pf-card');
  if (pfCards.length) {
    gsap.from(pfCards, {
      scrollTrigger: { trigger: pfCards[0].parentElement, start: 'top 78%' },
      y: 60, opacity: 0, scale: 0.95, duration: 0.85, stagger: 0.12, ease: 'power3.out'
    });
  }

  /* ── Numbers grid ── */
  const numCells = $$('.num-cell');
  if (numCells.length) {
    gsap.from(numCells, {
      scrollTrigger: { trigger: numCells[0].parentElement, start: 'top 80%' },
      y: 50, opacity: 0, duration: 0.9, stagger: 0.15, ease
    });
  }

  /* ── Team cards ── */
  const teamCards = $$('.team-card');
  if (teamCards.length) {
    gsap.from(teamCards, {
      scrollTrigger: { trigger: teamCards[0].parentElement, start: 'top 80%' },
      scale: 0.88, opacity: 0, duration: 0.85, stagger: 0.1, ease: 'back.out(1.4)'
    });
  }

  /* ── Awards list ── */
  $$('.aw-item').forEach((el, i) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
      x: -50, opacity: 0, duration: 0.7, delay: i * 0.05, ease
    });
  });

  /* ── About "Better" text parallax ── */
  const betterEl = $('.about-better');
  if (betterEl) {
    gsap.from(betterEl, {
      scrollTrigger: { trigger: '.about', start: 'top 70%', toggleActions: 'play none none none' },
      x: -100, opacity: 0, duration: 1.4, ease: 'power4.out'
    });
  }

  /* ── Menu cards stagger ── */
  const menuCards = $$('.menu-card');
  if (menuCards.length) {
    gsap.from(menuCards, {
      scrollTrigger: { trigger: menuCards[0].parentElement, start: 'top 78%' },
      y: 80, opacity: 0, duration: 0.9, stagger: 0.12, ease
    });
  }

  /* ── Split text ── */
  $$('.split-wrap[data-split]').forEach(el => {
    const text = el.dataset.split;
    if (!text) return;
    const chars = [...text].map(c =>
      `<span class="split-char" style="display:inline-block;overflow:hidden"><span class="split-inner">${c === ' ' ? '&nbsp;' : c}</span></span>`
    ).join('');
    el.innerHTML = chars;

    const inners = $$('.split-inner', el);
    if (!inners.length) return;
    gsap.from(inners, {
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
      yPercent: 110, duration: 0.9, stagger: 0.04, ease: 'power4.out'
    });
  });

  /* ── Section headings ── */
  $$('.sec-tag, .sec-heading, .pf-label, .aw-label, .tm-label, .nl-top-label').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
      y: 20, opacity: 0, duration: 0.7, ease
    });
  });

  /* ── Newsletter cards ── */
  const nlCards = $$('.nl-card');
  if (nlCards.length) {
    gsap.from(nlCards, {
      scrollTrigger: { trigger: nlCards[0].parentElement, start: 'top 82%' },
      y: 50, opacity: 0, duration: 0.8, stagger: 0.1, ease
    });
  }
}

/* Fallback reveal without GSAP */
function initFallbackReveal() {
  const targets = $$('[data-reveal], .gsap-fade, .gsap-fade-l, .gsap-fade-r, .gsap-card, .gsap-num, .gsap-svc-item');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = e.target.dataset.d ? parseFloat(e.target.dataset.d) * 0.1 : 0;
        setTimeout(() => {
          e.target.classList.add('io-visible');
        }, delay * 1000);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  targets.forEach(t => { t.classList.add('io-hidden'); io.observe(t); });
}

/* ================================================================
   11. MAGNETIC BUTTON EFFECT
================================================================ */
function initMagneticButtons() {
  $$('.mag-btn').forEach(btn => {
    let bx = 0, by = 0, ax = 0, ay = 0, raf_id = null;

    const animate = () => {
      ax = lerp(ax, bx, 0.12);
      ay = lerp(ay, by, 0.12);
      btn.style.transform = `translate(${ax}px,${ay}px)`;
      if (Math.abs(ax) > 0.05 || Math.abs(ay) > 0.05) raf_id = requestAnimationFrame(animate);
      else { btn.style.transform = ''; raf_id = null; }
    };

    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      bx = (e.clientX - r.left - r.width  / 2) * 0.35;
      by = (e.clientY - r.top  - r.height / 2) * 0.35;
      if (!raf_id) raf_id = requestAnimationFrame(animate);
    });

    btn.addEventListener('mouseleave', () => {
      bx = 0; by = 0;
      if (!raf_id) raf_id = requestAnimationFrame(animate);
    });
  });
}

/* ================================================================
   12. 3D TILT EFFECT
================================================================ */
function initTilt() {
  $$('.menu-card, [data-tilt]').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const rx = ((e.clientY - r.top  - r.height / 2) / r.height) * -10;
      const ry = ((e.clientX - r.left - r.width  / 2) / r.width)  *  10;
      card.style.transform  = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.025)`;
      card.style.transition = 'transform 0.1s';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform  = '';
      card.style.transition = 'transform 0.6s cubic-bezier(.16,1,.3,1)';
    });
  });
}

/* ================================================================
   13. SERVICE ACCORDION
================================================================ */
function initAccordion() {
  const items = $$('.svc-item');
  items.forEach((item, idx) => {
    const trigger = item.querySelector('.svc-trigger');
    const body    = item.querySelector('.svc-body');
    if (!trigger || !body) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      items.forEach(o => {
        o.classList.remove('open');
        const b = o.querySelector('.svc-body');
        if (b) b.style.maxHeight = '0';
        const icon = o.querySelector('.svc-icon');
        if (icon) icon.textContent = '＋';
      });
      if (!isOpen) {
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
        const icon = item.querySelector('.svc-icon');
        if (icon) icon.textContent = '×';
      }
    });

    // Init first item open
    if (idx === 0) {
      item.classList.add('open');
      body.style.maxHeight = body.scrollHeight + 'px';
      const icon = item.querySelector('.svc-icon');
      if (icon) icon.textContent = '×';
    }
  });
}

/* ================================================================
   14. PORTFOLIO FILTER + VIEW HINT
================================================================ */
function initPortfolioFilter() {
  const btns  = $$('.pf-filter-btn');
  const cards = $$('.pf-card');
  if (!btns.length || !cards.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat || 'all';
      cards.forEach(c => {
        const show = cat === 'all' || c.dataset.cat === cat;
        c.style.transition = 'opacity 0.4s, transform 0.4s';
        c.style.opacity    = show ? '1' : '0';
        c.style.transform  = show ? '' : 'scale(0.92)';
        c.style.pointerEvents = show ? '' : 'none';
      });
    });
  });

  // View hint circular text animation
  cards.forEach(card => {
    const hint = card.querySelector('.view-hint');
    if (!hint) return;
    let angle = 0, rafId = null;
    card.addEventListener('mouseenter', () => {
      const spin = () => {
        angle += 0.5;
        hint.style.setProperty('--rot', angle + 'deg');
        rafId = requestAnimationFrame(spin);
      };
      rafId = requestAnimationFrame(spin);
    });
    card.addEventListener('mouseleave', () => {
      if (rafId) cancelAnimationFrame(rafId);
    });
  });
}

/* ================================================================
   15. CTA RINGS ANIMATION (CSS fallback when no GSAP)
================================================================ */
function initCTARings() {
  if (gsapReady) return;
  const rings = $$('.cta-ring');
  rings.forEach((r, i) => {
    let angle = i * 30;
    const dir = i % 2 === 0 ? 1 : -1;
    const speed = 0.3 + i * 0.1;
    const spin = () => {
      angle += speed * dir;
      r.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
      requestAnimationFrame(spin);
    };
    spin();
  });
}

/* ================================================================
   16. ALL COUNTERS — [data-count] elements
================================================================ */
function initAllCounters() {
  $$('[data-count]').forEach(el => {
    if (el.dataset.counted) return;
    el.dataset.counted = '1';
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        io.unobserve(el);
        const target = parseInt(el.dataset.count) || 0;
        const suffix = el.dataset.s || '';
        let cur = 0, start = null;
        const dur = 2200;
        const step = ts => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / dur, 1);
          const ease = 1 - Math.pow(1 - p, 4);
          cur = Math.round(target * ease);
          el.textContent = cur + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });
    io.observe(el);
  });
}

/* ================================================================
   17. NEWSLETTER SUBMIT
================================================================ */
window.submitNL = function(e) {
  e.preventDefault();
  const form  = e.target;
  const email = form.querySelector('input[type="email"]');
  const msg   = form.querySelector('.nl-msg');
  if (!email || !email.value.trim()) return;

  const btn = form.querySelector('button');
  if (btn) { btn.disabled = true; btn.textContent = '送信中...'; }

  setTimeout(() => {
    if (msg) { msg.textContent = 'ご登録ありがとうございます！'; msg.style.color = '#C9A227'; }
    email.value = '';
    if (btn) { btn.disabled = false; btn.textContent = '登録する'; }
  }, 1200);
};

/* ================================================================
   18. SCROLL PROGRESS BAR
================================================================ */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const max = document.body.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
}

/* ================================================================
   19. HERO PARALLAX (without GSAP)
================================================================ */
function initHeroParallax() {
  if (gsapReady) return;
  const wrap = $('.hero-vid-wrap');
  if (!wrap) return;
  window.addEventListener('scroll', () => {
    wrap.style.transform = `translateY(${window.scrollY * 0.25}px)`;
  }, { passive: true });
}

/* ================================================================
   20. SCROLL SPY
================================================================ */
function initScrollSpy() {
  const sections = $$('section[id]');
  const navLinks = $$('.h-nav a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('active'));
        const link = navLinks.find(a => a.getAttribute('href') === '#' + e.target.id);
        if (link) link.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => io.observe(s));
}

/* ================================================================
   21. HOVER GLOW on cards
================================================================ */
function initCardGlow() {
  $$('.menu-card, .pf-card, .nl-card, .team-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const x  = ((e.clientX - r.left) / r.width)  * 100;
      const y  = ((e.clientY - r.top)  / r.height) * 100;
      card.style.setProperty('--mx', x + '%');
      card.style.setProperty('--my', y + '%');
      card.classList.add('glow');
    });
    card.addEventListener('mouseleave', () => card.classList.remove('glow'));
  });
}

/* ================================================================
   22. REVEAL OBSERVER (data-reveal + data-d)
================================================================ */
function initRevealObserver() {
  const all = $$('[data-reveal]');
  if (!all.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = e.target.dataset.d ? parseFloat(e.target.dataset.d) * 0.12 : 0;
        setTimeout(() => e.target.classList.add('revealed'), delay * 1000);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  all.forEach(el => io.observe(el));
}

/* ================================================================
   23. TYPEWRITER EFFECT
================================================================ */
function initTypewriter() {
  $$('[data-typewrite]').forEach(el => {
    const words = (el.dataset.typewrite || '').split('|');
    if (!words.length) return;
    let wi = 0, ci = 0, deleting = false;
    const cursor = document.createElement('span');
    cursor.textContent = '|';
    cursor.style.cssText = 'animation:blink 0.8s infinite;color:var(--g2);';
    el.appendChild(cursor);
    const textNode = document.createTextNode('');
    el.insertBefore(textNode, cursor);

    const tick = () => {
      const word = words[wi % words.length];
      if (!deleting) {
        textNode.textContent = word.slice(0, ++ci);
        if (ci >= word.length) { deleting = true; setTimeout(tick, 2000); return; }
      } else {
        textNode.textContent = word.slice(0, --ci);
        if (ci <= 0) { deleting = false; wi++; }
      }
      setTimeout(tick, deleting ? 50 : 80);
    };
    tick();
  });
}

/* ================================================================
   24. MOUSE TRAIL SPARKLES
================================================================ */
function initMouseTrail() {
  if (window.matchMedia('(pointer:coarse)').matches) return;
  const colors = ['#C9A227','#E8C547','#F0D060','#B8860B'];
  let last = 0;
  document.addEventListener('mousemove', e => {
    const now = Date.now();
    if (now - last < 50) return;
    last = now;
    const sp = document.createElement('div');
    sp.style.cssText = `position:fixed;pointer-events:none;z-index:9990;border-radius:50%;
      width:4px;height:4px;
      left:${e.clientX - 2}px;top:${e.clientY - 2}px;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      opacity:0.6;transition:all 0.9s;transform:scale(1);`;
    document.body.appendChild(sp);
    requestAnimationFrame(() => {
      sp.style.opacity   = '0';
      sp.style.transform = `translate(${(Math.random()-0.5)*30}px,${-15 - Math.random()*25}px) scale(0)`;
    });
    setTimeout(() => sp.remove(), 950);
  });
}

/* ================================================================
   25. HOVER SCALE utility
================================================================ */
function initHoverScale() {
  $$('[data-hover-scale]').forEach(el => {
    const s = el.dataset.hoverScale || '1.04';
    el.style.transition = 'transform 0.3s';
    el.addEventListener('mouseenter', () => el.style.transform = `scale(${s})`);
    el.addEventListener('mouseleave', () => el.style.transform = '');
  });
}

/* ================================================================
   26. ADMIN UI
================================================================ */
function initAdminUI() {
  $$('[data-confirm]').forEach(el => {
    el.addEventListener('click', e => {
      if (!confirm(el.dataset.confirm)) e.preventDefault();
    });
  });

  const titleInput = document.getElementById('title');
  const slugInput  = document.getElementById('slug');
  if (titleInput && slugInput && !slugInput.value) {
    titleInput.addEventListener('input', () => {
      slugInput.value = titleInput.value
        .toLowerCase()
        .replace(/[^\w\u3000-\u9fff\u30a0-\u30ff\u3040-\u309f]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 80);
    });
  }

  $$('textarea[maxlength]').forEach(ta => {
    const counter = document.createElement('div');
    counter.style.cssText = 'text-align:right;font-size:11px;color:#aaa;margin-top:4px;';
    ta.parentElement.appendChild(counter);
    const update = () => { counter.textContent = `${ta.value.length} / ${ta.maxLength}`; };
    ta.addEventListener('input', update);
    update();
  });
}

/* ================================================================
   27. TAKEOUT SECTION — heading entrance
================================================================ */
function initTakeoutSection() {
  const concept = $('.takeout-concept');
  if (!concept) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  io.observe(concept);
}

/* ================================================================
   28. ABOUT "For the Better" entrance
================================================================ */
function initAboutSection() {
  const forEl    = $('.about-for');
  const betterEl = $('.about-better');
  const helloEl  = $('.about-hello');
  if (!forEl && !betterEl) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        if (helloEl) helloEl.classList.add('revealed');
        setTimeout(() => { if (forEl) forEl.classList.add('revealed'); }, 200);
        setTimeout(() => { if (betterEl) betterEl.classList.add('revealed'); }, 400);
        io.disconnect();
      }
    });
  }, { threshold: 0.2 });

  const about = $('#about');
  if (about) io.observe(about);
}

/* ================================================================
   INIT ALL
================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // JS動作確認クラスを即付与 → [data-reveal]のアニメーションを有効化
  document.body.classList.add('js-ready');
  initLoading();
  initCursor();
  initHeader();
  initMenu();
  initSmoothScroll();
  initHeroVideo();
  initParticles();
  initMagneticButtons();
  initTilt();
  initAccordion();
  initPortfolioFilter();
  initCTARings();
  initAllCounters();
  initHeroParallax();
  initScrollProgress();
  initTypewriter();
  initCardGlow();
  initRevealObserver();
  initScrollSpy();
  initHoverScale();
  initMouseTrail();
  initAdminUI();
  initTakeoutSection();
  initAboutSection();

  // Tickers (JS fallback — replaced by GSAP if available)
  initTickers();

  // GSAP — init after short delay to ensure CDN loaded
  const tryGSAP = () => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      initGSAP();
    } else {
      initFallbackReveal();
    }
  };

  if (typeof gsap !== 'undefined') {
    tryGSAP();
  } else {
    setTimeout(tryGSAP, 600);
  }
});

/* ── CSS injection ── */
(function injectCSS() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes blink {
      0%,100%{opacity:1} 50%{opacity:0}
    }
    .io-hidden {
      opacity:0;
      transform:translateY(30px);
      transition:opacity 0.8s,transform 0.8s cubic-bezier(.16,1,.3,1);
    }
    .io-hidden.io-visible,
    .io-hidden[data-d="1"].io-visible,
    .io-hidden[data-d="2"].io-visible,
    .io-hidden[data-d="3"].io-visible,
    .io-hidden[data-d="4"].io-visible {
      opacity:1;
      transform:none;
    }
    .menu-link {
      opacity:0;
      transform:translateY(24px);
      transition:opacity 0.5s,transform 0.5s cubic-bezier(.16,1,.3,1);
    }
    .menu-link.visible {
      opacity:1;
      transform:none;
    }
    [data-reveal] {
      opacity:0;
      transform:translateY(40px);
      transition:opacity 0.9s,transform 0.9s cubic-bezier(.16,1,.3,1);
    }
    [data-reveal].revealed {
      opacity:1;
      transform:none;
    }
    .about-for,
    .about-better,
    .about-hello {
      opacity:0;
      transform:translateY(40px);
      transition:opacity 1s,transform 1s cubic-bezier(.16,1,.3,1);
    }
    .about-for.revealed,
    .about-better.revealed,
    .about-hello.revealed {
      opacity:1;
      transform:none;
    }
    .takeout-concept {
      opacity:0;
      transform:translateY(60px);
      transition:opacity 1.2s,transform 1.2s cubic-bezier(.16,1,.3,1);
    }
    .takeout-concept.revealed {
      opacity:1;
      transform:none;
    }
  `;
  document.head.appendChild(style);
})();
