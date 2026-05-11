<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script>
/* ── CURSOR ──────────────────────────────────── */
const cur  = document.getElementById('cur');
const curR = document.getElementById('curR');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top  = my + 'px';
});

(function loop() {
  rx += (mx - rx) * .11;
  ry += (my - ry) * .11;
  curR.style.left = rx + 'px';
  curR.style.top  = ry + 'px';
  requestAnimationFrame(loop);
})();

document.querySelectorAll('a, button, .svc-card, .p-card, .case-card, .fo, .testi-card, .stat-box').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('hovered'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('hovered'));
});

/* ── LOADER ──────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    gsap.to('#loader', {
      opacity: 0, duration: .6, ease: 'power2.inOut',
      onComplete: () => {
        document.getElementById('loader').style.display = 'none';
        heroIn();
      }
    });
  }, 2200);
});

/* ── HERO ENTRANCE ───────────────────────────── */
function heroIn() {
  const tl = gsap.timeline();
  tl.to('.hero-h1 .line span', {
    y: '0%', duration: 1.2, stagger: .14, ease: 'power4.out'
  })
  .to('#hEyebrow', { opacity: 1, y: 0, duration: .7, ease: 'power3.out' }, '-=.7')
  .to('#hSub',    { opacity: 1, duration: .7, ease: 'power3.out' }, '-=.5')
  .to('#hActs',   { opacity: 1, duration: .6, ease: 'power3.out' }, '-=.4')
  .to('#hScroll', { opacity: 1, duration: .5, ease: 'power3.out' }, '-=.2');
}

/* ── STICKY NAV ──────────────────────────────── */
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('stuck', window.scrollY > 70);
});

/* ── SCROLL REVEAL ───────────────────────────── */
const rvObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('in'), i * 55);
      rvObs.unobserve(e.target);
    }
  });
}, { threshold: .1 });
document.querySelectorAll('.rv').forEach(el => rvObs.observe(el));

/* ── COUNTERS ────────────────────────────────── */
const cntObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = parseFloat(el.dataset.target);
    const sfx    = el.dataset.sfx || '';
    const isFloat = target % 1 !== 0;
    const dur = 2200;
    const start = performance.now();

    (function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      const v = target * ease;
      if (target >= 1000) {
        el.textContent = Math.floor(v).toLocaleString() + sfx;
      } else if (isFloat) {
        el.textContent = v.toFixed(1) + sfx;
      } else {
        el.textContent = Math.floor(v) + sfx;
      }
      if (p < 1) requestAnimationFrame(tick);
    })(start);

    cntObs.unobserve(el);
  });
}, { threshold: .5 });
document.querySelectorAll('.stat-n[data-target]').forEach(el => cntObs.observe(el));

/* ── TESTIMONIAL DRAG ────────────────────────── */
const tt = document.getElementById('tt');
let isDown = false, startX, scrollLeft;
tt.addEventListener('mousedown', e => { isDown = true; tt.classList.add('dragging'); startX = e.pageX - tt.offsetLeft; scrollLeft = tt.scrollLeft; });
tt.addEventListener('mouseleave', () => { isDown = false; tt.classList.remove('dragging'); });
tt.addEventListener('mouseup', () => { isDown = false; tt.classList.remove('dragging'); });
tt.addEventListener('mousemove', e => {
  if (!isDown) return; e.preventDefault();
  tt.scrollLeft = scrollLeft - (e.pageX - tt.offsetLeft - startX) * 1.6;
});

/* ── MULTI-STEP FORM ─────────────────────────── */
let step = 1;
const total = 4;
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const sc      = document.getElementById('sc');

function updateForm() {
  document.querySelectorAll('.form-page').forEach((p, i) => p.classList.toggle('on', i + 1 === step));
  document.querySelectorAll('.fsn').forEach((n, i) => n.classList.toggle('on', i + 1 === step));
  sc.textContent = `Step ${step} of ${total}`;
  prevBtn.style.display = step > 1 ? 'flex' : 'none';
  nextBtn.querySelector('span').textContent = step === total ? 'Submit Application' : 'Next →';
}

nextBtn.addEventListener('click', () => {
  if (step < total) { step++; updateForm(); }
  else {
    nextBtn.querySelector('span').textContent = 'Submitted ✓';
    nextBtn.style.background = '#2D7A4F';
    nextBtn.disabled = true;
    setTimeout(() => window.location.href = 'dashboard.html', 1400);
  }
});
prevBtn.addEventListener('click', () => { if (step > 1) { step--; updateForm(); } });

document.querySelectorAll('.fo').forEach(fo => {
  fo.addEventListener('click', function() {
    this.parentElement.querySelectorAll('.fo').forEach(f => f.classList.remove('sel'));
    this.classList.add('sel');
  });
});

/* ── MAGNETIC BUTTONS ────────────────────────── */
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mousemove', function(e) {
    const r = this.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width  / 2) * .12;
    const y = (e.clientY - r.top  - r.height / 2) * .12;
    this.style.transform = `translate(${x}px,${y}px)`;
  });
  btn.addEventListener('mouseleave', function() { this.style.transform = ''; });
});

/* ── PARALLAX HERO GLOW ──────────────────────── */
window.addEventListener('scroll', () => {
  const g = document.querySelector('.hero-glow');
  if (g) g.style.transform = `translateY(${window.scrollY * .25}px)`;
});
</script>