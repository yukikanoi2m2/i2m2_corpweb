/* ================================================================
   i2m2 — main.js  (Vanilla JS + GSAP 3 + ScrollTrigger)
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
    prog += (100 - prog) * 0.04 + 0.4;
    if (fill) fill.style.width = Math.min(prog, 100) + '%';
    if (prog < 100) requestAnimationFrame(tick);
  };
  tick();

  const done = () => {
    if (fill) fill.style.width = '100%';
    setTimeout(() => {
      el.classList.add('done');
      document.body.classList.add('loaded');
      setTimeout(() => el.style.display = 'none', 800);
      startHeroAnimations();
    }, 300);
  };

  if (document.readyState === 'complete') {
    done();
  } else {
    window.addEventListener('load', done);
    setTimeout(done, 3000); // failsafe
  }
}

/* ================================================================
   2.  CUSTOM CURSOR
================================================================ */
function initCursor() {
  const dot  = $('#cur-dot');
  const ring = $('#cur-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;
  let hovering = false;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  document.addEventListener('mouseover', e => {
    const t = e.target.closest('a, button, [data-cur], .mag-btn');
    if (t) { hovering = true; ring.classList.add('hov'); }
  });
  document.addEventListener('mouseout', e => {
    const t = e.target.closest('a, button, [data-cur], .mag-btn');
    if (t) { hovering = false; ring.classList.remove('hov'); }
  });

  document.addEventListener('mousedown', () => ring.classList.add('click'));
  document.addEventListener('mouseup',   () => ring.classList.remove('click'));

  const raf = () => {
    dot.style.transform  = `translate(${mx}px,${my}px)`;
    rx = lerp(rx, mx, 0.12);
    ry = lerp(ry, my, 0.12);
    ring.style.transform = `translate(${rx}px,${ry}px)`;
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

  // Close on link click
  $$('[data-mc]', ov).forEach(a => a.addEventListener('click', () => { if (open) toggle(); }));

  // Stagger menu links on open
  const links = $$('.menu-link', ov);
  const obs = new MutationObserver(() => {
    if (ov.classList.contains('open')) {
      links.forEach((l, i) => {
        l.style.transitionDelay = (i * 0.06) + 's';
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
  const kicker = $('#heroKicker');
  const title  = $('#heroTitle');
  const sub    = $('#heroSub');
  const foot   = $('#heroFoot');
  const stats  = $$('.hs-item');

  const seq = [kicker, title, sub, foot].filter(Boolean);
  seq.forEach((el, i) => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(40px)';
    el.style.transition = `opacity 0.9s ${0.1 + i * 0.18}s, transform 0.9s ${0.1 + i * 0.18}s`;
    requestAnimationFrame(() => {
      el.style.opacity   = '1';
      el.style.transform = 'translateY(0)';
    });
  });

  // Hero word by word reveal
  $$('.ht-word', document).forEach((w, i) => {
    w.style.opacity   = '0';
    w.style.transform = 'translateY(60px) skewY(6deg)';
    w.style.transition = `opacity 1s ${0.4 + i * 0.22}s cubic-bezier(.16,1,.3,1), transform 1s ${0.4 + i * 0.22}s cubic-bezier(.16,1,.3,1)`;
    requestAnimationFrame(() => { w.style.opacity = '1'; w.style.transform = 'none'; });
  });

  // Stats counter
  setTimeout(() => startCounters(stats.flatMap(el => $$('.hs-num', el))), 900);
}

/* ================================================================
   7.  HERO VIDEO / PLACEHOLDER LOGIC
================================================================ */
function initHeroVideo() {
  const vid  = $('#heroVid');
  const ph   = $('#heroPlaceholder');
  if (!ph) return;

  if (!vid || vid.error) {
    ph.style.opacity = '1';
    if (vid) vid.style.display = 'none';
    return;
  }

  vid.addEventListener('loadeddata', () => {
    ph.style.transition = 'opacity 0.8s';
    ph.style.opacity = '0';
    setTimeout(() => { ph.style.display = 'none'; }, 800);
  });

  vid.addEventListener('error', () => {
    ph.style.opacity = '1';
    vid.style.display = 'none';
  });

  // If already loaded
  if (vid.readyState >= 2) {
    ph.style.opacity = '0';
    setTimeout(() => { ph.style.display = 'none'; }, 800);
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
  const N = 70;
  let W, H;

  const resize = () => {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  };
  resize();
  window.addEventListener('resize', resize);

  const GOLD_COLORS = ['rgba(200,160,40,', 'rgba(240,208,100,', 'rgba(184,134,11,', 'rgba(255,220,80,'];

  class Particle {
    constructor() { this.reset(true); }
    reset(init = false) {
      this.x  = Math.random() * W;
      this.y  = init ? Math.random() * H : H + 10;
      this.r  = Math.random() * 2.5 + 0.5;
      this.vy = -(Math.random() * 0.6 + 0.2);
      this.vx = (Math.random() - 0.5) * 0.3;
      this.a  = Math.random() * 0.7 + 0.2;
      this.da = (Math.random() - 0.5) * 0.003;
      this.col = GOLD_COLORS[Math.floor(Math.random() * GOLD_COLORS.length)];
      this.life = 0;
      this.maxLife = Math.random() * 400 + 200;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.a  += this.da;
      this.a   = clamp(this.a, 0.05, 0.9);
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
    // Draw connections between close particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 80) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(200,160,40,${0.15 * (1 - dist/80)})`;
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
   9.  GSAP SCROLL ANIMATIONS
================================================================ */
function initGSAP() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    // fallback: simple IntersectionObserver reveal
    initFallbackReveal();
    return;
  }
  gsapReady = true;
  gsap.registerPlugin(ScrollTrigger);

  // Default ease
  const ease = 'power3.out';

  /* ── Fade up (generic) ── */
  const fadeEls = $$('.gsap-fade');
  if (fadeEls.length) fadeEls.forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
      y: 60, opacity: 0, duration: 1, ease
    });
  });

  /* ── Fade from left ── */
  const fadeLEls = $$('.gsap-fade-l');
  if (fadeLEls.length) fadeLEls.forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
      x: -80, opacity: 0, duration: 1.1, ease
    });
  });

  /* ── Fade from right ── */
  const fadeREls = $$('.gsap-fade-r');
  if (fadeREls.length) fadeREls.forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
      x: 80, opacity: 0, duration: 1.1, ease
    });
  });

  /* ── Staggered cards ── */
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

  /* ── Number counters (via .num-val[data-n] child) ── */
  $$('.gsap-num').forEach(el => {
    const numVal = el.querySelector('.num-val[data-n]') || el;
    const target = parseFloat(numVal.dataset.n || '0') || 0;
    const suffix = numVal.dataset.s || '';
    const isFloat = String(numVal.dataset.n || '').includes('.');
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
            numVal.textContent = (isFloat ? obj.val.toFixed(1) : Math.round(obj.val)) + suffix;
          }
        });
      }
    });
  });

  /* ── Process steps ── */
  const steps = $$('.gsap-proc');
  if (steps.length) {
    gsap.from(steps, {
      scrollTrigger: { trigger: steps[0], start: 'top 80%', toggleActions: 'play none none none' },
      x: -60, opacity: 0, duration: 0.8, stagger: 0.15, ease
    });
  }

  /* ── Awards list ── */
  $$('.gsap-award').forEach((el, i) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
      x: -40, opacity: 0, duration: 0.7, delay: i * 0.05, ease
    });
  });

  /* ── Service accordion items ── */
  const svcItems = $$('.gsap-svc-item');
  if (svcItems.length) {
    gsap.from(svcItems, {
      scrollTrigger: { trigger: svcItems[0], start: 'top 82%', toggleActions: 'play none none none' },
      y: 40, opacity: 0, duration: 0.75, stagger: 0.1, ease
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

  /* ── Ticker marquee (enhance) ── */
  const ticker = $('.ticker-track');
  if (ticker && ticker.scrollWidth > 0) {
    const w = ticker.scrollWidth / 2;
    if (w > 0) {
      gsap.to(ticker, {
        x: -w, duration: 18, ease: 'none', repeat: -1,
        modifiers: { x: gsap.utils.unitize(v => parseFloat(v) % w) }
      });
    }
  }

  /* ── Parallax hero video ── */
  const heroVidWrap = $('.hero-vid-wrap');
  if (heroVidWrap) {
    gsap.to(heroVidWrap, {
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.5 },
      yPercent: 20, ease: 'none'
    });
  }

  /* ── Hero scroll indicator ── */
  const heroProg = $('.hero-scroll-fill');
  if (heroProg) {
    gsap.to(heroProg, {
      scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom bottom', scrub: true },
      scaleY: 1, transformOrigin: 'top center', ease: 'none'
    });
  }

  /* ── Section headings scale in ── */
  $$('.sec-tag, .sec-heading, .sec-sub').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
      y: 30, opacity: 0, duration: 0.85, ease
    });
  });

  /* ── Team cards scale + fade ── */
  const teamCards = $$('.team-card');
  if (teamCards.length) {
    gsap.from(teamCards, {
      scrollTrigger: { trigger: teamCards[0].parentElement, start: 'top 80%' },
      scale: 0.88, opacity: 0, duration: 0.85, stagger: 0.1, ease: 'back.out(1.4)'
    });
  }

  /* ── CTA rings pulse ── */
  const rings = $$('.cta-ring');
  rings.forEach((r, i) => {
    gsap.to(r, {
      scrollTrigger: { trigger: r.closest('.cta-section') || r, start: 'top 80%', toggleActions: 'play none none none' },
      rotation: 360, duration: 20 + i * 8, ease: 'none', repeat: -1
    });
  });

  /* ── Portfolio cards reveal ── */
  const portCards = $$('.port-card');
  if (portCards.length) {
    gsap.from(portCards, {
      scrollTrigger: { trigger: portCards[0].parentElement, start: 'top 78%' },
      y: 60, opacity: 0, scale: 0.95, duration: 0.85, stagger: 0.15, ease: 'power3.out'
    });
  }

  /* ── News cards ── */
  const ncards = $$('.nl-card, .nc-card, .news-card');
  if (ncards.length) {
    gsap.from(ncards, {
      scrollTrigger: { trigger: ncards[0].parentElement, start: 'top 82%' },
      y: 50, opacity: 0, duration: 0.8, stagger: 0.1, ease
    });
  }

  /* ── Horizontal scroll peek (numbers section) ── */
  const numGrid = $('.nums-grid');
  if (numGrid) {
    gsap.from($$('.num-item', numGrid), {
      scrollTrigger: { trigger: numGrid, start: 'top 80%' },
      y: 50, opacity: 0, duration: 0.9, stagger: 0.15, ease
    });
  }
}

/* Fallback reveal without GSAP */
function initFallbackReveal() {
  const targets = $$('.gsap-fade, .gsap-fade-l, .gsap-fade-r, .gsap-card, .gsap-num, .gsap-proc, .gsap-award, .gsap-svc-item');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('io-visible'); io.unobserve(e.target); } });
  }, { threshold: 0.1 });
  targets.forEach(t => { t.classList.add('io-hidden'); io.observe(t); });
}

/* ================================================================
   10. MAGNETIC BUTTON EFFECT
================================================================ */
function initMagneticButtons() {
  $$('.mag-btn').forEach(btn => {
    let bx = 0, by = 0;
    let ax = 0, ay = 0;
    let raf_id = null;

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

    btn.addEventListener('mouseleave', () => { bx = 0; by = 0; if (!raf_id) raf_id = requestAnimationFrame(animate); });
  });
}

/* ================================================================
   11. 3D TILT EFFECT (menu cards / portfolio cards)
================================================================ */
function initTilt() {
  $$('.menu-card, .port-card, [data-tilt]').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r   = card.getBoundingClientRect();
      const cx  = r.left + r.width  / 2;
      const cy  = r.top  + r.height / 2;
      const rx  = ((e.clientY - cy) / r.height) * -12;
      const ry  = ((e.clientX - cx) / r.width)  *  12;
      card.style.transform   = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.03)`;
      card.style.transition  = 'transform 0.1s';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform  = '';
      card.style.transition = 'transform 0.5s cubic-bezier(.16,1,.3,1)';
    });
  });
}

/* ================================================================
   12. HERO STATS COUNTER  (plain version, called from hero anim)
================================================================ */
function startCounters(els) {
  if (!els || !els.length) return;
  els.forEach(el => {
    const target = parseInt(el.dataset.count || 0);
    const suffix = el.dataset.s || '';
    let cur = 0;
    const step = () => {
      cur += Math.ceil((target - cur) * 0.06) + 1;
      if (cur >= target) { el.textContent = target + suffix; return; }
      el.textContent = cur + suffix;
      requestAnimationFrame(step);
    };
    step();
  });
}

/* ================================================================
   13. NUM-VAL COUNTER (numbers section in page)
================================================================ */
function initNumCounters() {
  const els = $$('.num-val[data-n]');
  if (!els.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      const el    = e.target;
      const target = parseFloat(el.dataset.n);
      const suffix = el.dataset.s || '';
      const isFloat = String(el.dataset.n).includes('.');
      let cur = 0, start = null;
      const dur = 2200;
      const step = ts => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 4);
        cur = target * ease;
        el.textContent = (isFloat ? cur.toFixed(1) : Math.round(cur)) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }, { threshold: 0.4 });
  els.forEach(el => io.observe(el));
}

/* ================================================================
   14. SERVICE ACCORDION
================================================================ */
function initAccordion() {
  $$('.svc-item').forEach(item => {
    const trigger = item.querySelector('.svc-trigger') || item.querySelector('.svc-head');
    const body    = item.querySelector('.svc-body');
    if (!trigger || !body) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all
      $$('.svc-item.open').forEach(o => {
        o.classList.remove('open');
        const b = o.querySelector('.svc-body');
        if (b) b.style.maxHeight = '0';
      });
      if (!isOpen) {
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
    // Init first item open
    if (item === $$('.svc-item')[0]) {
      item.classList.add('open');
      body.style.maxHeight = body.scrollHeight + 'px';
    }
  });
}

/* ================================================================
   15. PORTFOLIO FILTER
================================================================ */
function initPortfolioFilter() {
  const btns  = $$('.pf-filter-btn');
  const cards = $$('.port-card');
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
        c.style.transform  = show ? 'scale(1)' : 'scale(0.9)';
        c.style.pointerEvents = show ? '' : 'none';
      });
    });
  });
}

/* ================================================================
   16. HERO PARALLAX (without GSAP)
================================================================ */
function initHeroParallax() {
  if (gsapReady) return; // GSAP handles it
  const wrap = $('.hero-vid-wrap');
  if (!wrap) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    wrap.style.transform = `translateY(${y * 0.3}px)`;
  }, { passive: true });
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

  // Simulate / hook to API
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
  let bar = document.getElementById('scrollProgress');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'scrollProgress';
    bar.style.cssText = 'position:fixed;top:0;left:0;height:2px;background:linear-gradient(90deg,#B8860B,#E8C547);z-index:9999;transition:width 0.1s;pointer-events:none;';
    document.body.appendChild(bar);
  }
  window.addEventListener('scroll', () => {
    const max = document.body.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
}

/* ================================================================
   19. TYPEWRITER EFFECT (for taglines)
================================================================ */
function initTypewriter() {
  $$('[data-typewrite]').forEach(el => {
    const words  = (el.dataset.typewrite || '').split('|');
    if (!words.length) return;
    let wi = 0, ci = 0, deleting = false;
    const cursor = document.createElement('span');
    cursor.textContent = '|';
    cursor.style.cssText = 'animation:blink 0.8s infinite;color:var(--g2);';
    el.appendChild(cursor);

    const tick = () => {
      const word = words[wi % words.length];
      if (!deleting) {
        el.childNodes[0] && (el.childNodes[0].textContent = word.slice(0, ++ci));
        if (ci >= word.length) { deleting = true; setTimeout(tick, 1800); return; }
      } else {
        el.childNodes[0] && (el.childNodes[0].textContent = word.slice(0, --ci));
        if (ci <= 0) { deleting = false; wi++; }
      }
      setTimeout(tick, deleting ? 50 : 80);
    };
    const textNode = document.createTextNode('');
    el.insertBefore(textNode, cursor);
    tick();
  });
}

/* ================================================================
   20. STICKY NEWSLETTER SIDEBAR OBSERVER
================================================================ */
function initStickyNewsletter() {
  const nl = $('.news-letter');
  if (!nl) return;
  const sticky = nl.querySelector('.nl-sticky');
  if (!sticky) return;

  // Already handled via CSS position:sticky — just add scroll class
  window.addEventListener('scroll', () => {
    const r = nl.getBoundingClientRect();
    sticky.classList.toggle('stuck', r.top <= 0);
  }, { passive: true });
}

/* ================================================================
   21. HOVER GLOW on cards
================================================================ */
function initCardGlow() {
  $$('.menu-card, .port-card, .nl-card, .nc-card').forEach(card => {
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
   22. ANIMATED SECTION REVEAL (IntersectionObserver fallback for non-GSAP pages)
================================================================ */
function initRevealObserver() {
  const all = $$('[data-reveal]');
  if (!all.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  all.forEach(el => io.observe(el));
}

/* ================================================================
   23. ACTIVE NAV HIGHLIGHT (scroll-spy)
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
   24. TICKER ANIMATION (CSS fallback)
================================================================ */
function initTickerFallback() {
  if (gsapReady) return;
  const track = $('.ticker-track');
  if (!track) return;
  let pos = 0;
  const speed = 0.5;
  const w = track.scrollWidth / 2;
  const tick = () => {
    pos += speed;
    if (pos >= w) pos -= w;
    track.style.transform = `translateX(-${pos}px)`;
    requestAnimationFrame(tick);
  };
  tick();
}

/* ================================================================
   25. HERO SCROLL ANIMATION (letter-by-letter entrance)
================================================================ */
function initHeroLetters() {
  $$('.ht-word').forEach((word, wi) => {
    if (word.dataset.animated) return;
    word.dataset.animated = '1';
    const txt = word.textContent;
    const wrapped = txt.split('').map((c, i) => {
      const delay = (wi * 8 + i) * 0.04;
      return c === ' ' ? ' '
        : `<span style="display:inline-block;opacity:0;transform:translateY(40px);animation:letter-in 0.6s ${delay}s forwards;">${c}</span>`;
    }).join('');
    word.innerHTML = wrapped;
  });
}

/* ================================================================
   26. MOUSE TRAIL SPARKLES
================================================================ */
function initMouseTrail() {
  const colors = ['#C9A227','#E8C547','#F0D060','#B8860B'];
  let last = 0;
  document.addEventListener('mousemove', e => {
    const now = Date.now();
    if (now - last < 40) return;
    last = now;
    const sp = document.createElement('div');
    sp.style.cssText = `position:fixed;pointer-events:none;z-index:9998;border-radius:50%;
      width:5px;height:5px;
      left:${e.clientX - 2.5}px;top:${e.clientY - 2.5}px;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      opacity:0.7;transition:all 0.8s;transform:scale(1);`;
    document.body.appendChild(sp);
    requestAnimationFrame(() => {
      sp.style.opacity   = '0';
      sp.style.transform = `translate(${(Math.random()-0.5)*40}px,${-20 - Math.random()*30}px) scale(0)`;
    });
    setTimeout(() => sp.remove(), 850);
  });
}

/* ================================================================
   27. ANIMATE NUMBERS on data-count elements
================================================================ */
function initAllCounters() {
  $$('[data-count]').forEach(el => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        io.unobserve(el);
        const target = parseInt(el.dataset.count) || 0;
        const suffix = el.dataset.s || '';
        let cur = 0, start = null;
        const step = ts => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / 2000, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          cur = Math.round(target * ease);
          el.textContent = cur + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.5 });
    io.observe(el);
  });
}

/* ================================================================
   28. ADMIN: confirm delete
================================================================ */
function initAdminUI() {
  $$('[data-confirm]').forEach(el => {
    el.addEventListener('click', e => {
      if (!confirm(el.dataset.confirm)) e.preventDefault();
    });
  });

  // Auto-generate slug from title
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

  // Character counter for textarea
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
   29. HOVER SCALE (general utility)
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
   30. ANIMATE IN PAGE TRANSITION (simple fade)
================================================================ */
function initPageTransition() {
  document.querySelectorAll('a').forEach(a => {
    if (a.hostname !== location.hostname || a.href.includes('#')) return;
    a.addEventListener('click', e => {
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      const href = a.href;
      document.body.style.transition = 'opacity 0.3s';
      document.body.style.opacity = '0';
      setTimeout(() => { location.href = href; }, 300);
    });
  });
}

/* ================================================================
   INIT ALL
================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initLoading();
  initCursor();
  initHeader();
  initMenu();
  initSmoothScroll();
  initHeroVideo();
  initParticles();
  initMagneticButtons();
  initTilt();
  initNumCounters();
  initAccordion();
  initPortfolioFilter();
  initHeroParallax();
  initScrollProgress();
  initTypewriter();
  initStickyNewsletter();
  initCardGlow();
  initRevealObserver();
  initScrollSpy();
  initTickerFallback();
  initAllCounters();
  initAdminUI();
  initHoverScale();
  initMouseTrail();

  // GSAP — init after fonts/styles loaded
  if (typeof gsap !== 'undefined') {
    initGSAP();
  } else {
    // Retry once after 500ms (CDN async)
    setTimeout(() => {
      if (typeof gsap !== 'undefined') initGSAP();
      else initFallbackReveal();
    }, 500);
  }

  // Page transition (optional — enable if desired)
  // initPageTransition();
});

/* ── CSS injection for letter-in animation ── */
(function injectCSS() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes letter-in {
      to { opacity:1; transform:translateY(0); }
    }
    @keyframes blink {
      0%,100% { opacity:1; } 50% { opacity:0; }
    }
    .io-hidden { opacity:0; transform:translateY(30px); transition:opacity 0.8s,transform 0.8s; }
    .io-visible { opacity:1; transform:none; }
    .menu-link { opacity:0; transform:translateY(20px); transition:opacity 0.5s,transform 0.5s; }
    .menu-link.visible { opacity:1; transform:none; }
  `;
  document.head.appendChild(style);
})();
