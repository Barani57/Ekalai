/* =========================================================
   EKALAI — interactions & motion (Bootstrap 5 + Anime.js 3)
   WebMint Solutions
   ========================================================= */
(function () {
  'use strict';

  const root = document.documentElement;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const WA = '917358423062';

  // If Anime.js failed to load, show everything without motion
  const hasAnime = typeof window.anime === 'function';
  if (!hasAnime) root.classList.remove('anim');
  const MOTION = root.classList.contains('anim');

  /* ---------- Analytics helper (GA4) ---------- */
  function track(name, params) {
    if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
  }
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-track]');
    if (!el) return;
    const ev = el.getAttribute('data-track');
    if (ev !== 'form_submit') track(ev, { label: (el.textContent || '').trim().slice(0, 60) });
  });

  /* ---------- Header: scrolled state, scrollspy, back-to-top ---------- */
  const header = $('#siteHeader');
  const toTop = $('.to-top');
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 24);
    toTop.classList.toggle('show', y > 900);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: MOTION ? 'smooth' : 'auto' }));

  const navLinks = $$('#navLinks a');
  const spyMap = { home: 'home', about: 'about', philosophy: 'philosophy', mentor: 'mentor', work: 'mentor', programs: 'programs', fees: 'fees', gallery: 'gallery', reviews: 'gallery', faq: 'contact', enquire: 'contact', contact: 'contact' };
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const key = spyMap[en.target.id];
      navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + key));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  Object.keys(spyMap).forEach((id) => { const s = document.getElementById(id); if (s) spy.observe(s); });

  /* ---------- Mobile menu: close on link click ---------- */
  const mm = $('#mobileMenu');
  $$('.mm-links a', mm).forEach((a) => a.addEventListener('click', () => {
    const inst = window.bootstrap && window.bootstrap.Offcanvas.getInstance(mm);
    if (inst) inst.hide();
  }));

  /* ---------- Marquee: duplicate items for a seamless loop ---------- */
  const track_ = $('.marquee-track');
  if (track_) {
    $$('img', track_).forEach((img) => {
      const c = img.cloneNode(true); c.alt = ''; c.setAttribute('aria-hidden', 'true'); track_.appendChild(c);
    });
  }

  /* ---------- Hero title: split into words ---------- */
  const title = $('[data-split]');
  if (title && MOTION) {
    const walk = (node) => {
      Array.from(node.childNodes).forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            const w = document.createElement('span'); w.className = 'w';
            const i = document.createElement('span'); i.textContent = part; w.appendChild(i); frag.appendChild(w);
          });
          node.replaceChild(frag, n);
        } else if (n.nodeType === 1 && n.classList.contains('hl')) {
          const w = document.createElement('span'); w.className = 'w';
          n.parentNode.insertBefore(w, n); const i = document.createElement('span'); w.appendChild(i); i.appendChild(n);
        }
      });
    };
    walk(title);
  }

  /* ---------- Count up ---------- */
  function countUp(el) {
    const end = parseInt(el.getAttribute('data-count'), 10) || 0;
    if (!MOTION) { el.textContent = end; return; }
    const o = { v: 0 };
    anime({ targets: o, v: end, duration: 1600, easing: 'easeOutExpo', update: () => { el.textContent = Math.round(o.v); } });
  }

  /* ---------- Draw SVG doodles ---------- */
  function drawDoodles(scope) {
    if (!MOTION) return;
    $$('svg.doodle', scope).forEach((svg) => {
      const use = svg.querySelector('use');
      const id = use && use.getAttribute('href');
      const sym = id && document.querySelector(id);
      if (!sym || svg.dataset.drawn) return;
      svg.dataset.drawn = '1';
      // inline the symbol paths so they can be stroked-in
      svg.setAttribute('viewBox', sym.getAttribute('viewBox'));
      svg.innerHTML = sym.innerHTML;
      anime({ targets: svg.querySelectorAll('path,circle'), strokeDashoffset: [anime.setDashoffset, 0], duration: 1600, delay: anime.stagger(140), easing: 'easeInOutSine' });
    });
  }

  /* ---------- Hero intro timeline ---------- */
  function heroIntro() {
    const hl = $('.hero .hl');
    if (!MOTION) { if (hl) hl.classList.add('is-in'); $$('[data-count]').forEach(countUp); return; }
    const tl = anime.timeline({ easing: 'easeOutQuint' });
    tl.add({ targets: '.hero-visual .arch', opacity: [0, 1], scaleY: [0.6, 1], translateY: [40, 0], duration: 1100 }, 0)
      .add({ targets: '.hero-portrait', opacity: [0, 1], translateY: [60, 0], translateX: ['-50%', '-50%'], duration: 1200 }, 200)
      .add({ targets: '[data-hero="1"]', opacity: [0, 1], translateY: [16, 0], duration: 800 }, 150)
      .add({ targets: '.hero-title .w > span', translateY: ['110%', '0%'], duration: 1000, delay: anime.stagger(55) }, 260)
      .add({ targets: '[data-hero="2"]', opacity: [0, 1], translateY: [20, 0], duration: 900 }, 850)
      .add({ targets: '[data-hero="3"]', opacity: [0, 1], translateY: [20, 0], duration: 900 }, 1000)
      .add({ targets: '[data-hero="4"]', opacity: [0, 1], translateY: [20, 0], duration: 900, complete: () => $$('[data-count]').forEach(countUp) }, 1150)
      .add({ targets: '.float-chip', opacity: [0, 1], scale: [0.85, 1], duration: 900, delay: anime.stagger(180) }, 1100);
    setTimeout(() => { if (hl) hl.classList.add('is-in'); }, 900);
    setTimeout(() => drawDoodles($('.hero')), 700);
    // gentle floating of chips
    setTimeout(() => {
      anime({ targets: '.chip-a', translateY: [0, -8], duration: 2600, direction: 'alternate', loop: true, easing: 'easeInOutSine' });
      anime({ targets: '.chip-b', translateY: [0, 8], duration: 3000, direction: 'alternate', loop: true, easing: 'easeInOutSine' });
    }, 2200);
  }

  /* ---------- Scroll reveal ---------- */
  function reveal(el) {
    const type = el.getAttribute('data-anim');
    if (el.hasAttribute('data-stagger')) {
      anime({ targets: el.children, opacity: [0, 1], translateY: [32, 0], duration: 1000, delay: anime.stagger(110), easing: 'easeOutQuint' });
    } else if (type === 'scale') {
      anime({ targets: el, opacity: [0, 1], scale: [0.96, 1], translateY: [24, 0], duration: 1200, easing: 'easeOutQuint' });
    } else {
      anime({ targets: el, opacity: [0, 1], translateY: [28, 0], duration: 1000, easing: 'easeOutQuint' });
    }
    $$('.hl', el).forEach((h) => h.classList.add('is-in'));
    if (el.classList.contains('hl')) el.classList.add('is-in');
    drawDoodles(el);
  }

  if (MOTION && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        reveal(en.target);
        io.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    $$('[data-anim],[data-stagger]').forEach((el) => { if (!el.closest('.hero')) io.observe(el); });

    // doodles & highlights living outside revealed blocks
    const io2 = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        drawDoodles(en.target);
        $$('.hl', en.target).forEach((h) => h.classList.add('is-in'));
        io2.unobserve(en.target);
      });
    }, { threshold: 0.2 });
    $$('section').forEach((s) => { if (!s.classList.contains('hero')) io2.observe(s); });
  } else {
    $$('.hl').forEach((h) => h.classList.add('is-in'));
  }

  /* ---------- Gallery pins swing on reveal ---------- */
  const grid = $('#galleryGrid');
  if (grid && MOTION) {
    $$('.art', grid).forEach((a) => (a.style.opacity = 0));
    const gio = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        anime({ targets: en.target, opacity: [0, 1], translateY: [-24, 0], rotate: [anime.random(-6, 6), 0], duration: 1100, easing: 'easeOutElastic(1, .7)' });
        gio.unobserve(en.target);
      });
    }, { threshold: 0.1 });
    $$('.art', grid).forEach((a) => gio.observe(a));
  }

  /* ---------- Gallery filters ---------- */
  $$('.filter-chips button').forEach((btn) => {
    btn.addEventListener('click', () => {
      $$('.filter-chips button').forEach((b) => b.classList.toggle('active', b === btn));
      const f = btn.dataset.filter;
      const items = $$('#galleryGrid .art');
      items.forEach((it) => {
        const show = f === 'all' || it.dataset.cat.split(' ').includes(f);
        it.classList.toggle('is-hidden', !show);
        it.style.opacity = 1;
      });
      if (MOTION) anime({ targets: items.filter((i) => !i.classList.contains('is-hidden')), opacity: [0, 1], scale: [0.94, 1], duration: 600, delay: anime.stagger(50), easing: 'easeOutQuint' });
    });
  });

  /* ---------- Lightbox ---------- */
  const lbEl = $('#lightbox');
  let lbList = [], lbIndex = 0, lbModal = null;
  function lbShow() {
    const it = lbList[lbIndex]; if (!it) return;
    const img = $('img', lbEl); const cap = $('figcaption', lbEl);
    img.src = it.dataset.src; img.alt = (it.querySelector('img') || {}).alt || '';
    cap.textContent = it.dataset.caption || '';
    const multi = lbList.length > 1;
    $('.lb-prev', lbEl).style.display = multi ? '' : 'none';
    $('.lb-next', lbEl).style.display = multi ? '' : 'none';
  }
  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-lightbox]'); if (!t) return;
    const group = t.dataset.lightbox;
    lbList = $$('[data-lightbox="' + group + '"]').filter((x) => !x.closest('.is-hidden'));
    lbIndex = lbList.indexOf(t);
    lbShow();
    if (window.bootstrap) { lbModal = lbModal || new window.bootstrap.Modal(lbEl); lbModal.show(); }
  });
  $('.lb-prev', lbEl).addEventListener('click', () => { lbIndex = (lbIndex - 1 + lbList.length) % lbList.length; lbShow(); });
  $('.lb-next', lbEl).addEventListener('click', () => { lbIndex = (lbIndex + 1) % lbList.length; lbShow(); });
  document.addEventListener('keydown', (e) => {
    if (!lbEl.classList.contains('show')) return;
    if (e.key === 'ArrowLeft') $('.lb-prev', lbEl).click();
    if (e.key === 'ArrowRight') $('.lb-next', lbEl).click();
  });

  /* ---------- Program tabs: animate cards on change; open tab from footer ---------- */
  $$('#programTabs button').forEach((b) => {
    b.addEventListener('shown.bs.tab', () => {
      const pane = $(b.dataset.bsTarget);
      track('program_view', { program: b.textContent.trim() });
      if (MOTION) anime({ targets: pane.querySelectorAll('.path-card,.world-card,.spec-card,.spec-intro'), opacity: [0, 1], translateY: [24, 0], duration: 800, delay: anime.stagger(80), easing: 'easeOutQuint' });
    });
  });
  $$('[data-open-tab]').forEach((a) => a.addEventListener('click', () => {
    const btn = $(a.dataset.openTab);
    if (btn && window.bootstrap) window.bootstrap.Tab.getOrCreateInstance(btn).show();
  }));

  /* ---------- Fees: studio / online toggle ---------- */
  $$('.mode-toggle button').forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.price-card');
      $$('.mode-toggle button', card).forEach((b) => b.classList.toggle('active', b === btn));
      $$('[data-mode-text]', card).forEach((p) => p.classList.toggle('d-none', p.dataset.modeText !== btn.dataset.mode));
    });
  });

  /* ---------- "Enquire" buttons prefill the program ---------- */
  const sel = $('#fProgram');
  $$('[data-program]').forEach((a) => a.addEventListener('click', () => {
    const want = a.dataset.program;
    const opt = Array.from(sel.options).find((o) => o.text === want) ||
      Array.from(sel.options).find((o) => want.includes('Specialised') && o.text === 'Art of Doodling') ||
      Array.from(sel.options).find((o) => o.text.startsWith('Not sure'));
    if (want === 'Trial Class') sel.value = 'Trial Class';
    else if (opt && !/Group|One-on-One|Specialised/.test(want)) sel.value = opt.text;
    else sel.value = 'Not sure yet — please guide me';
    if (/One-on-One/.test(want)) $('#mOnline').checked = true;
  }));

  /* ---------- Testimonials: tabs, arrows, progress ---------- */
  const tracks = $$('.rev-track');
  const prog = $('.rev-progress span');
  const active = () => tracks.find((t) => !t.classList.contains('d-none'));
  function updateProg() {
    const t = active(); if (!t || !prog) return;
    const max = t.scrollWidth - t.clientWidth;
    const ratio = t.clientWidth / t.scrollWidth;
    prog.style.width = Math.max(ratio * 100, 12) + '%';
    const pos = max > 0 ? t.scrollLeft / max : 0;
    prog.style.transform = 'translateX(' + (pos * (100 / Math.max(ratio, 0.12) - 100)) + '%)';
  }
  tracks.forEach((t) => t.addEventListener('scroll', updateProg, { passive: true }));
  window.addEventListener('resize', updateProg);
  updateProg();
  $$('.mini-tabs button').forEach((b) => b.addEventListener('click', () => {
    $$('.mini-tabs button').forEach((x) => { x.classList.toggle('active', x === b); x.setAttribute('aria-selected', x === b); });
    tracks.forEach((t) => t.classList.toggle('d-none', t.dataset.group !== b.dataset.rev));
    const t = active(); t.scrollLeft = 0; updateProg();
    if (MOTION) anime({ targets: t.children, opacity: [0, 1], translateX: [30, 0], duration: 700, delay: anime.stagger(70), easing: 'easeOutQuint' });
  }));
  const step = (dir) => { const t = active(); const card = t.querySelector('.rev-card'); t.scrollBy({ left: dir * (card.offsetWidth + 24), behavior: 'smooth' }); };
  $('.rev-prev').addEventListener('click', () => step(-1));
  $('.rev-next').addEventListener('click', () => step(1));

  /* ---------- Enquiry form → WhatsApp ---------- */
  const form = $('#enquiryForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;
    $$('[required]', form).forEach((f) => {
      const valid = f.checkValidity() && f.value.trim() !== '';
      f.classList.toggle('is-invalid', !valid);
      if (!valid && ok) { f.focus(); ok = false; }
    });
    if (!ok) return;
    const d = new FormData(form);
    const lines = [
      'Hi Ekalai! I would like to enquire about classes.',
      '',
      'Learner: ' + d.get('learner'),
      d.get('parent') ? 'Parent: ' + d.get('parent') : null,
      'Age: ' + d.get('age'),
      'Phone: ' + d.get('phone'),
      d.get('email') ? 'Email: ' + d.get('email') : null,
      'Program: ' + d.get('program'),
      'Mode: ' + d.get('mode'),
      d.get('message') ? 'Message: ' + d.get('message') : null
    ].filter((l) => l !== null).join('\n');
    track('form_submit', { program: d.get('program'), mode: d.get('mode') });
    window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(lines), '_blank', 'noopener');
    const ok_ = $('#formSuccess');
    ok_.hidden = false;
    if (MOTION) anime({ targets: ok_, opacity: [0, 1], scale: [0.96, 1], duration: 600, easing: 'easeOutQuint' });
    setTimeout(() => { ok_.hidden = true; form.reset(); }, 7000);
  });
  $$('[required]', form).forEach((f) => f.addEventListener('input', () => f.classList.remove('is-invalid')));

  /* ---------- Magnetic WhatsApp button (pointer devices) ---------- */
  const wa = $('.wa-float');
  if (MOTION && window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
    wa.addEventListener('mousemove', (e) => {
      const r = wa.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.35, y = (e.clientY - r.top - r.height / 2) * 0.35;
      anime({ targets: wa, translateX: x, translateY: y, duration: 300, easing: 'easeOutQuad' });
    });
    wa.addEventListener('mouseleave', () => anime({ targets: wa, translateX: 0, translateY: 0, duration: 700, easing: 'easeOutElastic(1, .5)' }));
  }

  /* ---------- Subtle parallax on hero visual ---------- */
  if (MOTION && window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
    const hv = $('.hero-visual');
    $('.hero').addEventListener('mousemove', (e) => {
      const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx, dy = (e.clientY - cy) / cy;
      anime({ targets: hv.querySelectorAll('.doodle'), translateX: dx * 10, translateY: dy * 10, duration: 900, easing: 'easeOutQuad' });
    });
  }

  /* ---------- Start ---------- */
  window.__ekReady = true;
  if (document.fonts && document.fonts.ready) {
    Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 900))]).then(heroIntro);
  } else heroIntro();
})();
