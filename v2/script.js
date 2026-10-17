/* ============================================================
   LOVE PUMP — v2
   GSAP + ScrollTrigger + Lenis + Mixcloud Widget API
   Progressive enhancement: sem GSAP (ou com reduced motion)
   o site continua completo, só sem animações.
   ============================================================ */

(() => {
  'use strict';

  const C = window.LP_CONFIG;
  const I = window.LP_I18N;
  const root = document.documentElement;

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
  const isHttp = (url) => /^https?:\/\//i.test(url || '');

  const hasGsap = !!(window.gsap && window.ScrollTrigger);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // .motion pode já ter sido removida pelo timeout de segurança do <head>
  const motion = hasGsap && !reduceMotion && root.classList.contains('motion');

  window.__lpReady = true;
  if (!motion) root.classList.remove('motion');
  if (hasGsap) gsap.registerPlugin(ScrollTrigger);

  const refresh = () => { if (hasGsap) ScrollTrigger.refresh(); };

  /* ------------------------------------------------------------
     0. CONTEÚDO DO CONFIG → DOM
     ------------------------------------------------------------ */
  $('#year').textContent = new Date().getFullYear();

  $$('[data-sc-profile]').forEach((a) => { a.href = C.soundcloud.profile; });
  $$('a[href^="mailto:booking@lovepump.no"]').forEach((a) => {
    a.href = a.href.replace('booking@lovepump.no', C.contact.email);
    if (a.textContent.trim() === 'booking@lovepump.no') a.textContent = C.contact.email;
  });

  // Faixa "Played at": lista acessível + marquee decorativo
  const stagesTrack = $('#stagesTrack');
  stagesTrack.innerHTML = (C.stages || []).map((s) => `<span>${esc(s)}</span><b>✶</b>`).join('');
  stagesTrack.parentElement.setAttribute('aria-hidden', 'true');
  const stagesList = document.createElement('p');
  stagesList.className = 'sr-only';
  stagesList.textContent = (C.stages || []).join(', ');
  stagesTrack.parentElement.after(stagesList);

  /* ------------------------------------------------------------
     1. SMOOTH SCROLL (Lenis)
     ------------------------------------------------------------ */
  let lenis = null;
  if (motion && window.Lenis) {
    lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  function scrollToTarget(target, immediate = false) {
    const el = typeof target === 'string' ? document.getElementById(target.replace('#', '')) : target;
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.4, immediate });
    else el.scrollIntoView({ behavior: immediate || reduceMotion ? 'auto' : 'smooth' });
  }

  /* ------------------------------------------------------------
     2. NAV — esconde ao descer, volta ao subir, indica a secção
     ------------------------------------------------------------ */
  const nav = $('#nav');
  let lastY = 0;
  let menuOpen = false;

  function onScroll(y) {
    nav.classList.toggle('is-solid', y > 40);
    if (Math.abs(y - lastY) > 4) {
      nav.classList.toggle('is-hidden', y > lastY && y > window.innerHeight * 0.7 && !menuOpen);
      lastY = y;
    }
  }
  if (lenis) lenis.on('scroll', (e) => onScroll(e.scroll));
  else window.addEventListener('scroll', () => onScroll(window.scrollY), { passive: true });

  const navNo = $('#navNo');
  const navName = $('#navName');
  const navLinks = $$('.nav-links a');

  function setSection(section) {
    navNo.textContent = section.dataset.no;
    navName.dataset.i18n = section.dataset.name;
    navName.innerHTML = I.t(section.dataset.name);
    navLinks.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + section.id));
  }

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setSection(entry.target); });
    }, { rootMargin: '-45% 0px -54% 0px' });
    $$('[data-no]').forEach((s) => io.observe(s));
  }

  /* ------------------------------------------------------------
     3. MENU MOBILE
     ------------------------------------------------------------ */
  const burger = $('#burger');
  const burgerLabel = $('.nav-burger-label', burger);
  const menu = $('#menu');

  function setMenu(open, done) {
    if (open === menuOpen) { if (done) done(); return; }
    menuOpen = open;
    burger.setAttribute('aria-expanded', String(open));
    burgerLabel.dataset.i18n = open ? 'nav.close' : 'nav.menu';
    burgerLabel.innerHTML = I.t(burgerLabel.dataset.i18n);
    nav.classList.remove('is-hidden');

    if (open) {
      menu.hidden = false;
      if (lenis) lenis.stop();
      document.body.style.overflow = 'hidden';
      if (motion) {
        gsap.fromTo(menu, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: 0.7, ease: 'expo.inOut' });
        // opacity (não autoAlpha): com visibility:hidden os links não recebem foco
        gsap.fromTo($$('.menu-links a', menu), { yPercent: 60, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: 'expo.out', delay: 0.25 });
      }
      $('.menu-links a', menu).focus({ preventScroll: true });
      if (done) done();
    } else {
      const close = () => {
        menu.hidden = true;
        if (lenis) lenis.start();
        document.body.style.overflow = '';
        if (done) done();
      };
      if (motion) gsap.to(menu, { clipPath: 'inset(0 0 100% 0)', duration: 0.55, ease: 'expo.inOut', onComplete: close });
      else close();
    }
  }

  burger.addEventListener('click', () => setMenu(!menuOpen));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOpen) { setMenu(false); burger.focus(); }
  });
  window.matchMedia('(min-width: 901px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });

  /* ------------------------------------------------------------
     4. LINKS INTERNOS (+ data-enquire pré-seleciona o tipo)
     ------------------------------------------------------------ */
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const hash = a.getAttribute('href');
    if (hash === '#' || hash === '#main') return;
    const target = document.getElementById(hash.slice(1));
    if (!target) return;
    e.preventDefault();
    if (a.dataset.enquire) Form.setType(a.dataset.enquire);
    // com o menu aberto o Lenis está parado: só dá para rolar depois de fechar
    if (menuOpen) setMenu(false, () => scrollToTarget(target));
    else scrollToTarget(target);
  });

  /* ------------------------------------------------------------
     5. MARQUEES (reagem à velocidade e direção do scroll)
     ------------------------------------------------------------ */
  function initMarquees() {
    $$('[data-marquee]').forEach((m) => {
      const track = $('.marquee-track', m);
      const original = track.innerHTML;
      let html = original;
      let guard = 0;
      track.innerHTML = html;
      while (track.scrollWidth < window.innerWidth * 1.2 && guard++ < 8) {
        html += original;
        track.innerHTML = html;
      }
      track.innerHTML = html + html; // loop contínuo em -50%

      if (!motion) return;

      const dir = Number(m.dataset.direction || 1);
      const pxPerSec = m.classList.contains('marquee--stages') ? 45 : 70;
      const tween = gsap.fromTo(track,
        { xPercent: 0 },
        { xPercent: -50, duration: (track.scrollWidth / 2) / pxPerSec, ease: 'none', repeat: -1 });
      // espaço para tocar "para trás" sem bater no início
      tween.totalTime(tween.duration() * 500);
      tween.timeScale(dir);

      ScrollTrigger.create({
        trigger: m,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate(self) {
          const v = self.getVelocity();
          const d = dir * self.direction;
          const boost = 1 + Math.min(Math.abs(v) / 350, 5);
          gsap.to(tween, {
            timeScale: d * boost,
            duration: 0.2,
            overwrite: true,
            onComplete: () => gsap.to(tween, { timeScale: d, duration: 1.2, ease: 'power2.out' })
          });
        }
      });
    });
  }

  /* ------------------------------------------------------------
     6. SPLIT DE PALAVRAS (mantém <em> e outros elementos)
     ------------------------------------------------------------ */
  function splitWords(el) {
    const walk = (node) => {
      Array.from(node.childNodes).forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            const span = document.createElement('span');
            span.className = 'w';
            span.textContent = part;
            frag.appendChild(span);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) {
          walk(n);
        }
      });
    };
    walk(el);
    return $$('.w', el);
  }

  let manifestoTween = null;
  function buildManifesto() {
    if (!motion) return;
    if (manifestoTween) { manifestoTween.scrollTrigger.kill(); manifestoTween.kill(); }
    const el = $('#manifestoText');
    const words = splitWords(el);
    manifestoTween = gsap.fromTo(words, { opacity: 0.12 }, {
      opacity: 1,
      ease: 'none',
      stagger: 0.1,
      scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 50%', scrub: true }
    });
  }

  /* ------------------------------------------------------------
     7. INTRO (loader) + HERO
     ------------------------------------------------------------ */
  function intro() {
    const loader = $('#loader');
    if (!motion) {
      loader.remove();
      if (location.hash) scrollToTarget(location.hash, true);
      return;
    }

    if (!location.hash) {
      if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);
    }

    let seen = false;
    try {
      seen = sessionStorage.getItem('lp-intro') === '1';
      sessionStorage.setItem('lp-intro', '1');
    } catch (_) { /* storage bloqueado */ }
    const d = seen ? 0.5 : 1.35;

    if (lenis) lenis.stop();

    const star = $('#loaderStar');
    const count = $('#loaderCount');
    const len = star.getTotalLength ? star.getTotalLength() : 900;
    const counter = { v: 0 };
    const chars = $$('.wordmark .ch');

    gsap.set(star, { strokeDasharray: len, strokeDashoffset: len, fill: '#d4ff3f', fillOpacity: 0, transformOrigin: '50% 50%' });
    gsap.set(loader, { clipPath: 'inset(0 0 0% 0)' });
    gsap.set(chars, { yPercent: 115 });
    gsap.set('#heroDisc', { scale: 0.55, autoAlpha: 0, rotation: -50 });
    gsap.set(['.hero-meta', '.hero-foot'], { autoAlpha: 0, y: 24 });

    // Sai do loader sempre, mesmo se a timeline travar (reload, aba em segundo plano):
    // senão a estrela fica na tela e o scroll (Lenis) continua parado
    const finish = () => {
      if (!loader.isConnected) return;
      loader.remove();
      if (lenis) lenis.start();
      refresh();
      if (location.hash) scrollToTarget(location.hash, true);
    };
    const rescue = setTimeout(() => { tl.kill(); finish(); }, 7000);

    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      .to(star, { strokeDashoffset: 0, duration: d, ease: 'power2.inOut' }, 0)
      .to(counter, {
        v: 100, duration: d, ease: 'power2.inOut',
        onUpdate: () => { count.textContent = String(Math.round(counter.v)).padStart(3, '0'); }
      }, 0)
      .to(star, { fillOpacity: 1, scale: 0.85, rotation: 36, duration: 0.45, ease: 'power3.inOut' })
      .to(loader, { clipPath: 'inset(0 0 100% 0)', duration: 0.95, ease: 'expo.inOut' }, '+=0.05')
      .to(chars, { yPercent: 0, duration: 1.2, stagger: 0.045 }, '-=0.5')
      .to('#heroDisc', { scale: 1, autoAlpha: 1, rotation: 0, duration: 1.6 }, '<0.1')
      .to(['.hero-meta', '.hero-foot'], { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.12 }, '<0.3')
      .add(() => { clearTimeout(rescue); finish(); }, '<');
  }

  function heroScroll() {
    if (!motion) return;
    const st = { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true };
    gsap.to('.wm-line--1', { xPercent: -14, ease: 'none', scrollTrigger: st });
    gsap.to('.wm-line--2', { xPercent: 14, ease: 'none', scrollTrigger: { ...st } });
    gsap.to('#heroDisc', { yPercent: 18, ease: 'none', scrollTrigger: { ...st } });
    gsap.to('#heroDisc img', { scale: 1.4, ease: 'none', scrollTrigger: { ...st } });
    gsap.to('#heroRing', { rotation: 360, duration: 40, ease: 'none', repeat: -1, transformOrigin: '50% 50%' });
  }

  /* ------------------------------------------------------------
     8. REVEALS
     ------------------------------------------------------------ */
  function reveals() {
    if (!motion) return;

    $$('.sec-head').forEach((head) => {
      const bits = $$('.sec-no, .sec-label', head);
      const title = $('.rv-i', head);
      gsap.set(head, { '--lx': 0 });
      gsap.set(bits, { autoAlpha: 0 });
      gsap.set(title, { yPercent: 108 });
      gsap.timeline({ scrollTrigger: { trigger: head, start: 'top 88%', once: true } })
        .to(head, { '--lx': 1, duration: 1.3, ease: 'expo.inOut' })
        .to(bits, { autoAlpha: 1, duration: 0.6, stagger: 0.08 }, '-=0.9')
        .to(title, { yPercent: 0, duration: 1.2, ease: 'expo.out' }, '-=0.85');
    });

    batchReveal([
      '.manifesto .kicker', '.deck', '.tracks', '.agenda-foot', '.stages-label',
      '.about-body > *', '.about-photo figcaption',
      '.contact-aside > *', '.form > *', '.footer-top'
    ].join(','));

    const photo = $('#aboutPhoto');
    gsap.fromTo(photo, { clipPath: 'inset(100% 0 0 0)' }, {
      clipPath: 'inset(0% 0 0 0)', duration: 1.5, ease: 'expo.inOut',
      scrollTrigger: { trigger: photo, start: 'top 82%', once: true }
    });
    gsap.fromTo($('img', photo), { yPercent: -16 }, {
      yPercent: 0, ease: 'none',
      scrollTrigger: { trigger: photo, start: 'top bottom', end: 'bottom top', scrub: true }
    });

    gsap.from('.footer-mark span', {
      yPercent: 105, duration: 1.3, ease: 'expo.out', stagger: 0.04,
      scrollTrigger: { trigger: '.footer-mark', start: 'top 92%', once: true }
    });
  }

  function batchReveal(targets) {
    const els = typeof targets === 'string' ? $$(targets) : targets;
    if (!motion || !els.length) return;
    gsap.set(els, { autoAlpha: 0, y: 36 });
    const show = (batch) => gsap.to(batch, {
      autoAlpha: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.08, overwrite: true
    });
    ScrollTrigger.batch(els, { start: 'top 90%', once: true, onEnter: show, onLeave: show });
  }

  /* ------------------------------------------------------------
     9. MIXES — Mixcloud
     Os metadados (nome, capa, duração, género) vêm da API pública
     do Mixcloud; o áudio toca num widget escondido, controlado pela
     Widget API. A UI (deck + tracklist + mini player) é toda nossa.
     ------------------------------------------------------------ */
  const Mixes = (() => {
    const MC = C.mixcloud || {};
    const list = $('#tracklist');
    const status = $('#tracksStatus');
    const deck = $('#deck');
    const record = $('#record');
    const art = $('#recordArt');
    const tonearm = $('#tonearm');
    const kicker = $('#deckKicker');
    const titleEl = $('#deckTitle');
    const playBtn = $('#deckPlay');
    const prevBtn = $('#deckPrev');
    const nextBtn = $('#deckNext');
    const curEl = $('#deckCur');
    const durEl = $('#deckDur');
    const fill = $('#deckFill');
    const bar = $('#deckProgress');
    const mini = $('#mini');
    const miniPlay = $('#miniPlay');
    const miniTitle = $('#miniTitle');
    const miniKicker = $('#miniKicker');
    const miniFill = $('#miniFill');
    const moreLink = $('#mixesMore');
    const moreLabel = $('span', moreLink);

    const API = 'https://api.mixcloud.com';
    const LIMIT = MC.limit || 8;
    let widget = null;
    let loadedKey = '';      // mix que está no widget neste momento
    let sounds = [];
    let current = -1;
    let playing = false;
    let started = false;
    let deckVisible = true;
    let durationMs = 0;
    let positionMs = 0;
    let loadStarted = false;
    let armBusy = false;     // o braço está a descer/subir (não seguir o progresso)

    // o kicker é gerido aqui (estado), não pelo i18n genérico
    kicker.removeAttribute('data-i18n');

    const spin = motion
      ? gsap.to(record, { rotation: '+=360', duration: 1.8, ease: 'none', repeat: -1, paused: true }).timeScale(0)
      : null;

    const fmt = (ms) => {
      const s = Math.max(0, Math.floor((ms || 0) / 1000));
      const h = Math.floor(s / 3600);
      const m = Math.floor((s % 3600) / 60);
      const sec = String(s % 60).padStart(2, '0');
      return h ? `${h}:${String(m).padStart(2, '0')}:${sec}` : `${m}:${sec}`;
    };

    // 'https://www.mixcloud.com/user/mix/' → '/user/mix/'
    const keyFrom = (url) => {
      try {
        const path = new URL(url, 'https://www.mixcloud.com').pathname;
        return path.endsWith('/') ? path : `${path}/`;
      } catch (_) { return ''; }
    };

    const normalize = (cc) => {
      const p = cc.pictures || {};
      return {
        key: cc.key,
        url: cc.url,
        title: cc.name,
        art: p['640wx640h'] || p.extra_large || p.large || '',
        thumb: p['320wx320h'] || p.large || '',
        duration: (cc.audio_length || 0) * 1000,
        genre: (cc.tags && cc.tags[0] && cc.tags[0].name) || '',
        year: String(cc.created_time || '').slice(0, 4)
      };
    };

    // Um braço de vinil real vai da borda para o centro ao longo do disco
    const ARM_REST = -4;
    const armAngle = (ratio) => 16 + 14 * Math.max(0, Math.min(1, ratio || 0));

    const sideLabel = (i, half) => (i < half ? `A${i + 1}` : `B${i - half + 1}`);

    function render() {
      const half = Math.ceil(sounds.length / 2);
      list.innerHTML = sounds.map((s, i) => {
        const meta = [s.genre, s.year].filter(Boolean).join(' · ');
        const side = i === 0 || (i === half && half < sounds.length)
          ? `<li class="track-side mono" aria-hidden="true">${esc(I.t('mixes.side'))} ${i === 0 ? 'A' : 'B'}</li>`
          : '';
        return `${side}<li>
          <button type="button" class="track" data-i="${i}">
            <span class="track-no mono">${sideLabel(i, half)}</span>
            <span class="track-art">${s.thumb ? `<img src="${esc(s.thumb)}" alt="" width="56" height="56" loading="lazy" decoding="async">` : ''}</span>
            <span class="track-main">
              <span class="track-title">${esc(s.title)}</span>
              <span class="track-meta mono">${esc(meta)}</span>
            </span>
            <span class="track-dur mono">${fmt(s.duration)}</span>
            <span class="track-eq" aria-hidden="true"><i></i><i></i><i></i></span>
          </button>
        </li>`;
      }).join('');
      syncRows();
    }

    function syncRows() {
      $$('.track', list).forEach((b) => {
        const on = Number(b.dataset.i) === current;
        b.classList.toggle('is-current', on);
        b.classList.toggle('is-playing', on && playing);
        if (on) b.setAttribute('aria-current', 'true');
        else b.removeAttribute('aria-current');
      });
    }

    function labels() {
      if (deck.classList.contains('is-idle')) { kicker.textContent = I.t('mixes.soon'); return; }
      const state = playing ? 'mixes.now' : (current < 0 ? 'mixes.idle' : 'mixes.paused');
      kicker.textContent = I.t(state);
      miniKicker.textContent = I.t(state);
      [playBtn, miniPlay].forEach((b) => b.setAttribute('aria-label', I.t(playing ? 'mixes.pause' : 'mixes.play')));
    }

    // "Tudo no Mixcloud" (perfil) ou, sem perfil, "Abrir no Mixcloud" (mix atual)
    function syncMoreLink() {
      const s = sounds[Math.max(current, 0)];
      const href = MC.profile || (s && s.url) || '';
      moreLink.hidden = !href;
      if (href) moreLink.href = href;
      moreLabel.dataset.i18n = MC.profile ? 'mixes.all' : 'mixes.open';
      moreLabel.innerHTML = I.t(moreLabel.dataset.i18n);
    }

    function setCurrent(i) {
      const prev = current;
      current = i;
      const s = sounds[i];
      durationMs = s.duration;
      titleEl.textContent = s.title;
      miniTitle.textContent = s.title;
      durEl.textContent = fmt(durationMs);
      progress(0);
      prevBtn.disabled = i <= 0;
      nextBtn.disabled = i >= sounds.length - 1;
      syncRows();
      labels();
      syncMoreLink();

      if (motion && prev !== -1 && prev !== i) {
        gsap.timeline()
          .to(record, { xPercent: -135, duration: 0.45, ease: 'power3.in' })
          .add(() => { if (s.art) art.src = s.art; })
          .fromTo(record, { xPercent: 135 }, { xPercent: 0, duration: 0.8, ease: 'expo.out' });
      } else if (s.art) {
        art.src = s.art;
      }
    }

    function setPlaying(p) {
      if (p === playing) return;
      playing = p;
      if (p) started = true;
      deck.classList.toggle('is-playing', p);
      playBtn.classList.toggle('is-playing', p);
      miniPlay.classList.toggle('is-playing', p);
      syncRows();
      labels();
      updateMini();

      const angle = p ? armAngle(durationMs ? positionMs / durationMs : 0) : ARM_REST;
      if (motion) {
        armBusy = true;
        gsap.to(tonearm, { rotation: angle, duration: 1, ease: 'power2.inOut', overwrite: true, onComplete: () => { armBusy = false; } });
        if (p) {
          spin.play();
          gsap.to(spin, { timeScale: 1, duration: 1, ease: 'power2.out', overwrite: true });
        } else {
          gsap.to(spin, { timeScale: 0, duration: 1.6, ease: 'power2.out', overwrite: true, onComplete: () => spin.pause() });
        }
      } else {
        tonearm.style.transform = `rotate(${angle}deg)`;
      }
    }

    function progress(pos) {
      positionMs = pos || 0;
      const ratio = durationMs ? positionMs / durationMs : 0;
      const pct = Math.max(0, Math.min(1, ratio)) * 100;
      fill.style.width = `${pct}%`;
      miniFill.style.width = `${pct}%`;
      curEl.textContent = fmt(positionMs);
      bar.setAttribute('aria-valuenow', String(Math.round(pct)));
      bar.setAttribute('aria-valuetext', `${fmt(positionMs)} / ${fmt(durationMs)}`);
      if (playing && !armBusy) {
        if (motion) gsap.to(tonearm, { rotation: armAngle(ratio), duration: 0.5, ease: 'power1.out', overwrite: true });
        else tonearm.style.transform = `rotate(${armAngle(ratio)}deg)`;
      }
    }

    function updateMini() {
      mini.classList.toggle('is-on', started && !deckVisible);
    }

    function select(i) {
      if (!widget || !sounds[i]) return;
      if (i === current) { toggle(); return; }
      setCurrent(i);
      if (loadedKey === sounds[i].key) { widget.play(); return; }
      loadedKey = sounds[i].key;
      widget.load(loadedKey, true);
    }

    function toggle() {
      if (!widget || !sounds.length) return;
      if (current < 0) { select(0); return; }
      widget.togglePlay();
    }

    function step(delta) {
      const next = current + delta;
      if (next >= 0 && next < sounds.length) select(next);
    }

    function seekRatio(ratio) {
      if (!widget || current < 0 || !durationMs) return;
      const ms = Math.max(0, Math.min(1, ratio)) * durationMs;
      widget.seek(ms / 1000);
      progress(ms);
    }

    // Sem mixes ou widget bloqueado: tira os controlos mortos
    // e deixa só o disco + a mensagem + o link.
    function unavailable(key) {
      list.innerHTML = '';
      deck.classList.add('is-idle');
      kicker.textContent = I.t('mixes.soon');
      status.dataset.i18n = key;
      status.innerHTML = I.t(key);
      syncMoreLink();
      refresh();
    }
    const fail = () => unavailable('mixes.error');

    const getJSON = (path) => fetch(API + path).then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    });

    // Mixes listados à mão primeiro, depois os da conta (sem repetidos)
    async function fetchMixes() {
      const keys = (MC.mixes || []).map(keyFrom).filter(Boolean);
      const [picked, feed] = await Promise.all([
        Promise.allSettled(keys.map((k) => getJSON(k))),
        MC.user ? getJSON(`/${encodeURIComponent(MC.user)}/cloudcasts/?limit=${LIMIT}`).catch(() => null) : null
      ]);
      const all = picked.filter((r) => r.status === 'fulfilled').map((r) => r.value)
        .concat((feed && feed.data) || []);
      const seen = new Set();
      return all.filter((cc) => cc && cc.key && !seen.has(cc.key) && seen.add(cc.key))
        .slice(0, LIMIT).map(normalize);
    }

    const loadScript = (src) => new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });

    function createWidget() {
      const iframe = document.createElement('iframe');
      iframe.title = 'Mixcloud';
      iframe.allow = 'autoplay; encrypted-media';
      iframe.tabIndex = -1;
      loadedKey = sounds[0].key;
      iframe.src = `https://player-widget.mixcloud.com/widget/iframe/?${new URLSearchParams({
        feed: loadedKey, hide_cover: '1', mini: '1', hide_artwork: '1', autoplay: '0'
      })}`;
      $('#scFrame').appendChild(iframe);

      const w = Mixcloud.PlayerWidget(iframe);
      const timeout = setTimeout(fail, 20000);
      w.ready.then(() => {
        clearTimeout(timeout);
        widget = w;
        playBtn.disabled = false;
        nextBtn.disabled = sounds.length < 2;

        w.events.play.on(() => {
          w.getCurrentKey().then((key) => {
            loadedKey = key || loadedKey;
            const i = sounds.findIndex((s) => s.key === loadedKey);
            if (i >= 0 && i !== current) setCurrent(i);
          });
          setPlaying(true);
        });
        w.events.pause.on(() => setPlaying(false));
        w.events.ended.on(() => {
          setPlaying(false);
          if (current < sounds.length - 1) step(1);
        });
        w.events.progress.on((pos, dur) => {
          if (dur) durationMs = dur * 1000;
          progress(pos * 1000);
        });
      });
    }

    async function load() {
      if (loadStarted) return;
      loadStarted = true;
      let mixes;
      try { mixes = await fetchMixes(); } catch (_) { fail(); return; }
      sounds = mixes;
      if (!sounds.length) { unavailable('mixes.empty'); return; }

      delete status.dataset.i18n;
      status.textContent = '';
      render();
      titleEl.textContent = sounds[0].title;
      durEl.textContent = fmt(sounds[0].duration);
      if (sounds[0].art) art.src = sounds[0].art;
      syncMoreLink();
      if (motion) {
        gsap.from($$('.tracklist > li', list), { autoAlpha: 0, y: 24, duration: 0.9, stagger: 0.05, ease: 'expo.out' });
      }
      refresh();

      try {
        if (!window.Mixcloud) await loadScript('https://widget.mixcloud.com/media/js/widgetApi.js');
        createWidget();
      } catch (_) { fail(); }
    }

    // --- eventos da UI ---
    list.addEventListener('click', (e) => {
      const b = e.target.closest('.track');
      if (b) select(Number(b.dataset.i));
    });
    playBtn.addEventListener('click', toggle);
    miniPlay.addEventListener('click', toggle);
    prevBtn.addEventListener('click', () => step(-1));
    nextBtn.addEventListener('click', () => step(1));

    let dragging = false;
    const ratioFrom = (e) => {
      const r = bar.getBoundingClientRect();
      return (e.clientX - r.left) / r.width;
    };
    bar.addEventListener('pointerdown', (e) => {
      dragging = true;
      bar.setPointerCapture(e.pointerId);
      seekRatio(ratioFrom(e));
    });
    bar.addEventListener('pointermove', (e) => { if (dragging) seekRatio(ratioFrom(e)); });
    bar.addEventListener('pointerup', () => { dragging = false; });
    bar.addEventListener('pointercancel', () => { dragging = false; });
    bar.addEventListener('keydown', (e) => {
      if (!durationMs) return;
      const stepMs = 10000;
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        seekRatio((positionMs + (e.key === 'ArrowRight' ? stepMs : -stepMs)) / durationMs);
      }
    });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => {
        deckVisible = entry.isIntersecting;
        updateMini();
      }).observe(deck);

      // carrega o widget quando a secção se aproxima
      // (o widget do Mixcloud é pesado: não entra no carregamento inicial)
      new IntersectionObserver((entries, obs) => {
        if (entries.some((en) => en.isIntersecting)) { obs.disconnect(); load(); }
      }, { rootMargin: '400px 0px' }).observe($('#mixes'));
    } else {
      window.addEventListener('load', () => setTimeout(load, 1200));
    }

    labels();

    return {
      refresh() { if (sounds.length) render(); labels(); }
    };
  })();

  /* ------------------------------------------------------------
     10. AGENDA
     ------------------------------------------------------------ */
  const Agenda = (() => {
    const up = $('#gigsUpcoming');
    const past = $('#gigsPast');
    const empty = $('#gigsEmpty');
    const toggle = $('#pastToggle');
    const toggleLabel = $('#pastToggleLabel');
    const count = $('#pastCount');

    const parse = (str) => {
      const [y, m, d] = String(str).split('-').map(Number);
      return new Date(y, (m || 1) - 1, d || 1);
    };
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const events = (C.events || [])
      .map((e) => Object.assign({}, e, { d: parse(e.date) }))
      .filter((e) => !isNaN(e.d));
    const upcoming = events.filter((e) => e.d >= today).sort((a, b) => a.d - b.d);
    const previous = events.filter((e) => e.d < today).sort((a, b) => b.d - a.d);
    let open = false;
    let firstRender = true;

    function row(e) {
      const loc = I.locale;
      const day = String(e.d.getDate()).padStart(2, '0');
      const month = new Intl.DateTimeFormat(loc, { month: 'short' }).format(e.d).replace('.', '');
      const weekday = new Intl.DateTimeFormat(loc, { weekday: 'short' }).format(e.d).replace('.', '');

      let cta = '<span></span>';
      if (e.status === 'soldout') {
        cta = `<span class="gig-cta gig-cta--muted">${esc(I.t('agenda.soldout'))}</span>`;
      } else if (isHttp(e.url)) {
        cta = `<a class="gig-cta" href="${esc(e.url)}" target="_blank" rel="noopener">${esc(I.t(e.status === 'free' ? 'agenda.info' : 'agenda.tickets'))}</a>`;
      } else if (e.status === 'free') {
        cta = `<span class="gig-cta gig-cta--muted">${esc(I.t('agenda.free'))}</span>`;
      }

      return `<li class="gig">
        <time class="gig-date" datetime="${esc(e.date)}">
          <span class="gig-day">${day}</span>
          <span class="mono">${esc(month)} ${e.d.getFullYear()}<br>${esc(weekday)}</span>
        </time>
        <div>
          <h3 class="gig-title">${esc(e.title)}</h3>
          <p class="gig-venue">${esc(e.venue || 'TBA')}</p>
        </div>
        <span class="gig-where mono">${esc(e.city)}${e.country ? `, ${esc(e.country)}` : ''}</span>
        ${cta}
      </li>`;
    }

    function render() {
      up.innerHTML = upcoming.map(row).join('');
      past.innerHTML = previous.map(row).join('');
      empty.hidden = upcoming.length > 0;
      toggle.hidden = previous.length === 0;
      toggleLabel.textContent = I.t(open ? 'agenda.past_hide' : 'agenda.past_show');
      count.textContent = previous.length ? `(${previous.length})` : '';

      if (firstRender) {
        firstRender = false;
        batchReveal($$('.gig', up));
      }
    }

    toggle.addEventListener('click', () => {
      open = !open;
      past.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
      toggleLabel.textContent = I.t(open ? 'agenda.past_hide' : 'agenda.past_show');
      if (open && motion) {
        gsap.from($$('.gig', past), { autoAlpha: 0, y: 20, duration: 0.8, stagger: 0.05, ease: 'expo.out' });
      }
      refresh();
    });

    // Dados estruturados (Google: MusicEvent) só para datas futuras
    if (upcoming.length) {
      const ld = document.createElement('script');
      ld.type = 'application/ld+json';
      ld.textContent = JSON.stringify(upcoming.map((e) => ({
        '@context': 'https://schema.org',
        '@type': 'MusicEvent',
        name: `Love Pump — ${e.title}`,
        startDate: e.date,
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        location: {
          '@type': 'Place',
          name: e.venue && e.venue !== 'TBA' ? e.venue : e.city,
          address: { '@type': 'PostalAddress', addressLocality: e.city, addressCountry: e.country }
        },
        performer: { '@type': 'Person', name: 'Love Pump' },
        ...(isHttp(e.url) ? { url: e.url } : {})
      })));
      document.head.appendChild(ld);
    }

    return { render };
  })();

  /* ------------------------------------------------------------
     11. FORMULÁRIO DE CONTACTO
     ------------------------------------------------------------ */
  const Form = (() => {
    const form = $('#contactForm');
    const status = $('#formStatus');
    const submit = $('#formSubmit');
    const submitLabel = $('#formSubmitLabel');
    const bookingRow = $('[data-when="booking"]', form);
    const typeInputs = $$('input[name="type"]', form);
    const required = $$('[required]', form);
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    const currentType = () => (typeInputs.find((i) => i.checked) || typeInputs[0]).value;

    function syncType() {
      bookingRow.hidden = currentType() !== 'booking';
      refresh();
    }

    function setType(value) {
      const input = typeInputs.find((i) => i.value === value);
      if (input) { input.checked = true; syncType(); }
    }

    function validate(input) {
      const field = input.closest('.field');
      const err = $('.field-err', field);
      const v = input.value.trim();
      let key = '';
      if (input.required && !v) key = 'form.err.required';
      else if (input.type === 'email' && v && !emailRe.test(v)) key = 'form.err.email';
      field.classList.toggle('is-invalid', !!key);
      input.setAttribute('aria-invalid', key ? 'true' : 'false');
      if (err) {
        if (key) { err.dataset.i18n = key; err.innerHTML = I.t(key); } else { delete err.dataset.i18n; err.textContent = ''; }
      }
      return !key;
    }

    function setStatus(key, ok) {
      status.className = `form-status ${ok ? 'is-ok' : 'is-err'}`;
      status.dataset.i18n = key;
      status.innerHTML = I.t(key);
    }

    function setBusy(busy) {
      submit.disabled = busy;
      submitLabel.dataset.i18n = busy ? 'form.sending' : 'form.send';
      submitLabel.innerHTML = I.t(submitLabel.dataset.i18n);
    }

    function openMail(data, typeLabel) {
      const lines = [
        `${I.t('form.type')} ${typeLabel}`,
        `${I.t('form.name')}: ${data.name}`,
        `${I.t('form.email')}: ${data.email}`,
        data.organisation ? `${I.t('form.org')}: ${data.organisation}` : null,
        data.date ? `${I.t('form.date')}: ${data.date}` : null,
        data.city ? `${I.t('form.location')}: ${data.city}` : null,
        '',
        data.message
      ].filter((l) => l !== null);
      window.location.href = `mailto:${C.contact.email}?subject=${encodeURIComponent(data._subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
      setStatus('form.mailto', true);
    }

    function burst() {
      if (!motion) return;
      const r = submit.getBoundingClientRect();
      const box = document.createElement('div');
      box.className = 'burst';
      box.style.left = `${r.left + r.width / 2}px`;
      box.style.top = `${r.top + r.height / 2}px`;
      document.body.appendChild(box);
      const stars = Array.from({ length: 18 }, () => {
        const s = document.createElement('span');
        s.textContent = '✶';
        box.appendChild(s);
        return s;
      });
      gsap.fromTo(stars, { scale: 0 }, {
        x: () => gsap.utils.random(-240, 240),
        y: () => gsap.utils.random(-220, 60),
        rotation: () => gsap.utils.random(-300, 300),
        scale: () => gsap.utils.random(0.6, 1.8),
        opacity: 0,
        duration: () => gsap.utils.random(1, 1.7),
        ease: 'expo.out'
      });
      gsap.delayedCall(2, () => box.remove());
    }

    required.forEach((input) => {
      input.addEventListener('blur', () => { if (input.value) validate(input); });
      input.addEventListener('input', () => {
        if (input.closest('.field').classList.contains('is-invalid')) validate(input);
      });
    });
    typeInputs.forEach((i) => i.addEventListener('change', syncType));

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const results = required.map(validate);
      if (results.includes(false)) {
        const first = required.find((i) => i.getAttribute('aria-invalid') === 'true');
        if (first) first.focus();
        return;
      }

      const data = Object.fromEntries(new FormData(form).entries());
      if (data.website) { setStatus('form.success', true); form.reset(); return; } // bot
      delete data.website;
      if (data.type !== 'booking') { delete data.date; delete data.city; }

      const typeLabel = I.t(`form.type.${data.type}`);
      data._subject = `[${typeLabel}] ${data.name}${data.organisation ? ` — ${data.organisation}` : ''}`;
      data.language = I.lang;
      data.page = location.href;

      const endpoint = (C.contact.formEndpoint || '').trim();
      if (!endpoint) { openMail(data, typeLabel); return; }

      setBusy(true);
      status.textContent = '';
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        form.reset();
        syncType();
        setStatus('form.success', true);
        burst();
      } catch (_) {
        setStatus('form.error', false);
      } finally {
        setBusy(false);
      }
    });

    syncType();
    return { setType };
  })();

  /* ------------------------------------------------------------
     12. TROCA DE IDIOMA
     ------------------------------------------------------------ */
  I.onChange(() => {
    buildManifesto();
    Agenda.render();
    Mixes.refresh();
    requestAnimationFrame(refresh);
  });

  /* ------------------------------------------------------------
     13. ARRANQUE
     ------------------------------------------------------------ */
  Agenda.render();
  initMarquees();
  buildManifesto();
  heroScroll();
  reveals();
  intro();

  if (hasGsap) {
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
    window.addEventListener('load', refresh);
  }
})();
