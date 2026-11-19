// Whatever is Lovely motion: GSAP + Lenis, SplitText hero, scroll reveals,
// counters, parallax, testimonial slider, FAQ accordion, per-field form
// validation + toast. Everything animated lives behind the
// prefers-reduced-motion guard; reveals default to visible so no-JS /
// failed-JS never hides content.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const toastEl = document.getElementById('toast');
let toastTimer = 0;
function showToast(msg: string) {
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toastEl.classList.remove('show'), 4500);
}

let lenis: Lenis | null = null;
if (!reduced) {
  lenis = new Lenis({ lerp: 0.1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

if (!reduced) {
  document.querySelectorAll<HTMLElement>('h1[data-split]').forEach((h1) => {
    try {
      const split = new SplitText(h1, { type: 'words' });
      gsap.from(split.words, { y: 26, opacity: 0, duration: 0.55, ease: 'power3.out', stagger: 0.045, delay: 0 });
    } catch {
      const words = (h1.textContent || '').trim().split(/\s+/);
      h1.innerHTML = words.map((w) => `<span class="inline-block">${w}</span>`).join(' ');
      gsap.from(h1.querySelectorAll('span'), { y: 26, opacity: 0, duration: 0.55, ease: 'power3.out', stagger: 0.045 });
    }
  });
  gsap.from('[data-hero]', { y: 16, opacity: 0, duration: 0.6, ease: 'power3.out', stagger: 0.06, delay: 0 });
  // Hero children marked [data-hero-item] enter in sequence after the hero
  // container (index adds the attribute; this code is the entrance itself).
  document.querySelectorAll<HTMLElement>('[data-hero-item]').forEach((el, i) => {
    gsap.from(el, { y: 18, opacity: 0, duration: 0.55, ease: 'power3.out', delay: 0.08 + i * 0.07 });
  });
  document.querySelectorAll<HTMLElement>('.reveal').forEach((el) => {
    const siblings = [...(el.parentElement?.children ?? [])].filter((c) => c.classList.contains('reveal'));
    const delay = Math.min(Math.max(siblings.indexOf(el), 0) * 0.07, 0.21);
    gsap.from(el, { opacity: 0, y: 24, duration: 0.8, ease: 'power3.out', delay, scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
  });
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count || 0);
    const obj = { v: 0 };
    gsap.to(obj, { v: target, duration: 1.6, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 92%' }, onUpdate: () => { el.textContent = Math.round(obj.v).toLocaleString('en-US'); } });
  });
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    gsap.to(el, { yPercent: 5, ease: 'none', scrollTrigger: { trigger: el.closest('section') ?? el, start: 'top top', end: 'bottom top', scrub: true } });
  });
  document.querySelectorAll<HTMLElement>('[data-parallax-img]').forEach((img) => {
    gsap.fromTo(img, { yPercent: -4 }, { yPercent: 4, ease: 'none', scrollTrigger: { trigger: img.closest('figure, div') ?? img, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
  if (finePointer) {
    document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        gsap.to(btn, { x: (e.clientX - (r.left + r.width / 2)) * 0.25, y: (e.clientY - (r.top + r.height / 2)) * 0.35, duration: 0.3, ease: 'power2.out' });
      });
      btn.addEventListener('mouseleave', () => gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' }));
    });
  }
}

const progress = document.getElementById('scroll-progress');
const header = document.getElementById('site-header');
const toTop = document.getElementById('back-to-top');
const mobileMenu = document.getElementById('mobile-menu');
let lastY = window.scrollY;
let ticking = false;
function onScroll() {
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (progress) progress.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
  if (header) {
    const menuOpen = mobileMenu && !mobileMenu.classList.contains('hidden');
    const hide = y > 140 && y > lastY + 4 && !menuOpen;
    const show = y < lastY - 4 || y <= 140;
    if (hide) header.classList.add('header-hidden');
    else if (show) header.classList.remove('header-hidden');
  }
  toTop?.classList.toggle('show', y > 600);
  lastY = y;
  ticking = false;
}
window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
onScroll();
toTop?.addEventListener('click', () => {
  if (lenis) lenis.scrollTo(0, { immediate: reduced });
  else window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
});

// Testimonial slider: drag/swipe + keyboard + pause on hover/focus
const track = document.querySelector<HTMLElement>('#testi-track');
const viewport = document.getElementById('testi-viewport');
const slides = track?.querySelectorAll<HTMLElement>('[data-slide]');
const dots = [...document.querySelectorAll<HTMLElement>('[data-dot]')];
let idx = 0;
let timer: number | undefined;
let paused = false;
let inView = true;
const go = (i: number) => {
  if (!track || !slides?.length) return;
  idx = (i + slides.length) % slides.length;
  track.style.transform = `translateX(-${idx * 100}%)`;
  dots.forEach((d, di) => {
    d.classList.toggle('bg-gold', di === idx);
    // Inactive dots are bg-white/30 — the slider sits on a dark terra
    // section, so the old bg-ink/20 was nearly invisible there.
    d.classList.toggle('bg-white/30', di !== idx);
    if (di === idx) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current');
  });
};
const startAuto = () => {
  window.clearInterval(timer);
  if (track && slides?.length && !paused && !reduced && inView) timer = window.setInterval(() => go(idx + 1), 6000);
};
const pauseAuto = () => { paused = true; window.clearInterval(timer); };
const resumeAuto = () => { paused = false; startAuto(); };
document.getElementById('testi-prev')?.addEventListener('click', () => { go(idx - 1); startAuto(); });
document.getElementById('testi-next')?.addEventListener('click', () => { go(idx + 1); startAuto(); });
dots.forEach((d, di) => d.addEventListener('click', () => { go(di); startAuto(); }));
if (viewport && track && slides?.length) {
  viewport.addEventListener('mouseenter', pauseAuto);
  viewport.addEventListener('mouseleave', resumeAuto);
  viewport.addEventListener('focusin', pauseAuto);
  viewport.addEventListener('focusout', resumeAuto);
  viewport.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(idx - 1); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); go(idx + 1); }
    else if (e.key === 'Home') { e.preventDefault(); go(0); }
    else if (e.key === 'End') { e.preventDefault(); go(slides.length - 1); }
  });
  let startX = 0; let dx = 0; let dragging = false;
  viewport.addEventListener('pointerdown', (e) => { dragging = true; startX = e.clientX; dx = 0; viewport.classList.add('dragging'); viewport.setPointerCapture(e.pointerId); });
  viewport.addEventListener('pointermove', (e) => { if (!dragging) return; dx = e.clientX - startX; track.style.transform = `translateX(calc(-${idx * 100}% + ${dx}px))`; });
  const endDrag = () => { if (!dragging) return; dragging = false; viewport.classList.remove('dragging'); if (Math.abs(dx) > 60) go(idx + (dx < 0 ? 1 : -1)); else go(idx); startAuto(); };
  viewport.addEventListener('pointerup', endDrag);
  viewport.addEventListener('pointercancel', endDrag);
  document.addEventListener('visibilitychange', () => { if (document.hidden) window.clearInterval(timer); else startAuto(); });
  // Pause auto-advance while the slider is off-screen, so it never sits
  // mid-transition when the visitor scrolls back to it (or during a
  // full-page screenshot pass). Resumes when it scrolls into view.
  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      inView = entries[0]?.isIntersecting ?? true;
      if (inView) startAuto(); else window.clearInterval(timer);
    }, { threshold: 0.25 }).observe(viewport);
  }
  startAuto();
}

// FAQ accordion
document.querySelectorAll<HTMLElement>('[data-faq-btn]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const panel = btn.nextElementSibling as HTMLElement | null;
    if (!panel) return;
    const open = panel.dataset.open === 'true';
    panel.dataset.open = String(!open);
    btn.setAttribute('aria-expanded', String(!open));
  });
});

// Forms: inline per-field validation + toast (all mock — localStorage only, no mailto)
function fieldError(input: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, msg: string) {
  const err = document.getElementById(`${input.id}-error`);
  if (err) { err.textContent = msg; err.classList.remove('invisible'); }
  input.setAttribute('aria-invalid', 'true');
}
function fieldClear(input: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) {
  const err = document.getElementById(`${input.id}-error`);
  if (err) { err.textContent = ''; err.classList.add('invisible'); }
  input.removeAttribute('aria-invalid');
}
function validName(input: HTMLInputElement | null) {
  if (!input) return false;
  if (input.value.trim().length < 2) { fieldError(input, 'Please enter your name.'); return false; }
  fieldClear(input); return true;
}
function validEmail(input: HTMLInputElement | null) {
  if (!input) return false;
  if (!emailRe.test(input.value.trim())) { fieldError(input, 'Please enter a valid email address.'); return false; }
  fieldClear(input); return true;
}
function validMsg(input: HTMLTextAreaElement | null, min = 10) {
  if (!input) return false;
  if (input.value.trim().length < min) { fieldError(input, `Please tell us a little more (at least ${min} characters).`); return false; }
  fieldClear(input); return true;
}
function validRequired(input: HTMLInputElement | HTMLSelectElement | null, msg: string) {
  if (!input) return false;
  if (!input.value.trim()) { fieldError(input, msg); return false; }
  fieldClear(input); return true;
}

// Work With Us form (mock — stored in the visitor's browser only, no
// mail app, no email sent). Past dates are rejected; Sundays are fine.
const wf = document.getElementById('work-form') as HTMLFormElement | null;
if (wf) {
  const name = document.getElementById('wf-name') as HTMLInputElement;
  const email = document.getElementById('wf-email') as HTMLInputElement;
  const date = document.getElementById('wf-date') as HTMLInputElement;
  const service = document.getElementById('wf-service') as HTMLSelectElement;
  const msg = document.getElementById('wf-message') as HTMLTextAreaElement;
  // min=today, set at runtime so it is always the real today.
  const todayIso = new Date().toLocaleDateString('en-CA');
  date.min = todayIso;
  const validDate = (input: HTMLInputElement) => {
    if (!input.value) { fieldError(input, 'Please pick your wedding date (or your best guess).'); return false; }
    if (input.value < todayIso) { fieldError(input, 'That date is in the past — please pick a future date.'); return false; }
    fieldClear(input); return true;
  };
  name.addEventListener('blur', () => validName(name));
  email.addEventListener('blur', () => validEmail(email));
  date.addEventListener('blur', () => validDate(date));
  date.addEventListener('change', () => validDate(date));
  service.addEventListener('change', () => validRequired(service, 'Please choose a service.'));
  msg.addEventListener('blur', () => validMsg(msg));
  wf.addEventListener('submit', (e) => {
    e.preventDefault();
    const ok = [validName(name), validEmail(email), validDate(date), validRequired(service, 'Please choose a service.'), validMsg(msg)];
    if (ok.includes(false)) { (document.querySelector('[aria-invalid="true"]') as HTMLElement)?.focus(); return; }
    const ref = 'WL-' + Array.from({ length: 6 }, () => 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'[Math.floor(Math.random() * 31)]).join('');
    const enquiry = {
      ref,
      name: name.value.trim(),
      email: email.value.trim(),
      date: date.value,
      service: service.value,
      message: msg.value.trim(),
      submittedAt: new Date().toISOString(),
    };
    try {
      const prev = JSON.parse(localStorage.getItem('wil-enquiries') ?? '[]') as unknown[];
      prev.push(enquiry);
      localStorage.setItem('wil-enquiries', JSON.stringify(prev));
    } catch { /* private mode — the on-screen confirmation still shows */ }
    const refEl = document.getElementById('wf-ref');
    if (refEl) refEl.textContent = ref;
    const summaryEl = document.getElementById('wf-summary');
    if (summaryEl) {
      const niceDate = new Date(`${date.value}T12:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
      summaryEl.textContent = `${name.value.trim()} · ${email.value.trim()} · ${niceDate} · ${service.value}`;
    }
    document.getElementById('work-form-ok')?.classList.remove('hidden');
    document.getElementById('work-form-ok')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'nearest' });
    showToast(`Thanks — enquiry ${ref} saved.`);
    wf.reset();
  });
}

// Newsletter (footer) — mock: stored in the visitor's browser only.
const nf = document.getElementById('newsletter-form') as HTMLFormElement | null;
if (nf) {
  const email = document.getElementById('newsletter-email') as HTMLInputElement;
  email.addEventListener('blur', () => validEmail(email));
  nf.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validEmail(email)) { email.focus(); return; }
    try { localStorage.setItem('wil-newsletter', email.value.trim()); } catch { /* private mode */ }
    document.getElementById('newsletter-ok')?.classList.remove('hidden');
    showToast('Thanks — you are on the list.');
    nf.reset();
  });
}
