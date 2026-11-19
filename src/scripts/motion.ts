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
  const heroPar = document.querySelector('[data-parallax]');
  if (heroPar) {
    gsap.to(heroPar, { yPercent: 5, ease: 'none', scrollTrigger: { trigger: heroPar.closest('section'), start: 'top top', end: 'bottom top', scrub: true } });
  }
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
const go = (i: number) => {
  if (!track || !slides?.length) return;
  idx = (i + slides.length) % slides.length;
  track.style.transform = `translateX(-${idx * 100}%)`;
  dots.forEach((d, di) => {
    d.classList.toggle('bg-gold', di === idx);
    d.classList.toggle('bg-ink/20', di !== idx);
    if (di === idx) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current');
  });
};
const startAuto = () => {
  window.clearInterval(timer);
  if (track && slides?.length && !paused && !reduced) timer = window.setInterval(() => go(idx + 1), 6000);
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

// Forms: inline per-field validation + toast (mailto unchanged)
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

// Work With Us form (mock — no charge, opens mail app)
const wf = document.getElementById('work-form') as HTMLFormElement | null;
if (wf) {
  const name = document.getElementById('wf-name') as HTMLInputElement;
  const email = document.getElementById('wf-email') as HTMLInputElement;
  const date = document.getElementById('wf-date') as HTMLInputElement;
  const service = document.getElementById('wf-service') as HTMLSelectElement;
  const msg = document.getElementById('wf-message') as HTMLTextAreaElement;
  name.addEventListener('blur', () => validName(name));
  email.addEventListener('blur', () => validEmail(email));
  date.addEventListener('blur', () => validRequired(date, 'Please pick your wedding date (or your best guess).'));
  service.addEventListener('change', () => validRequired(service, 'Please choose a service.'));
  msg.addEventListener('blur', () => validMsg(msg));
  wf.addEventListener('submit', (e) => {
    e.preventDefault();
    const ok = [validName(name), validEmail(email), validRequired(date, 'Please pick your wedding date (or your best guess).'), validRequired(service, 'Please choose a service.'), validMsg(msg)];
    if (ok.includes(false)) { (document.querySelector('[aria-invalid="true"]') as HTMLElement)?.focus(); return; }
    const body = `Hi Whatever is Lovely team,\n\nWe would love to work with you!\n\nName: ${name.value.trim()}\nEmail: ${email.value.trim()}\nWedding date: ${date.value}\nService: ${service.value}\n\n${msg.value.trim()}`;
    const okEl = document.getElementById('work-form-ok');
    okEl?.classList.remove('hidden');
    showToast('Thanks — opening your mail app…');
    window.setTimeout(() => {
      window.location.href = `mailto:hello@whateverislovely.com?subject=${encodeURIComponent('New wedding enquiry — ' + name.value.trim() + ' — ' + date.value)}&body=${encodeURIComponent(body)}`;
    }, 500);
    wf.reset();
  });
}

// Newsletter (footer)
const nf = document.getElementById('newsletter-form') as HTMLFormElement | null;
if (nf) {
  const email = document.getElementById('newsletter-email') as HTMLInputElement;
  email.addEventListener('blur', () => validEmail(email));
  nf.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validEmail(email)) { email.focus(); return; }
    document.getElementById('newsletter-ok')?.classList.remove('hidden');
    showToast('Thanks — you are on the list.');
    nf.reset();
  });
}
