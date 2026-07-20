// Highlights whichever section is currently in view on both nav versions.
// Harmless on pages without these sections (like lamp.html) — it just finds
// nothing and does nothing.
const sections = ['now', 'about', 'story', 'connect'];
const navLinks = document.querySelectorAll('.side-nav a, .bottom-nav a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.target === id);
      });
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });

sections.forEach(id => {
  const el = document.getElementById(id);
  if (el) navObserver.observe(el);
});

// Scroll-reveal: fades in beats, entries, gallery photos, and other content
// blocks as they enter view. Each element only needs the class "reveal".
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealEls.length) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => revealObserver.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in-view'));
}

// MOTIF: fan — blades turn based on how far you've scrolled, not a timer,
// so it visibly spins "as you move." Skipped entirely if the visitor's
// system asks for reduced motion.
const fanBlades = document.querySelector('.fan-blades');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (fanBlades && !reducedMotion) {
  let ticking = false;
  function spinFan() {
    const deg = (window.scrollY || window.pageYOffset) * 0.4;
    fanBlades.style.transform = 'rotate(' + deg + 'deg)';
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { window.requestAnimationFrame(spinFan); ticking = true; }
  }, { passive: true });
}
