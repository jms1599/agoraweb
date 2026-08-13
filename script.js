// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const siteNav = document.getElementById('siteNav');

if (menuToggle && siteNav) {
  const closeMenu = () => {
    siteNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (e) => {
    if (!siteNav.classList.contains('is-open')) return;
    if (siteNav.contains(e.target) || menuToggle.contains(e.target)) return;
    closeMenu();
  });
}

// Hero typewriter
const typedEl = document.getElementById('typedWord');

if (typedEl) {
  const words = ['Lectures', 'Talks', 'Panels', 'Debates', 'Readings', 'Q&As', 'Discussions', 'Courses'];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    typedEl.textContent = words[0];
  } else {
    const typeSpeed = 118;
    const pauseAfterType = 1800;
    const deleteSpeed = 72;
    const pauseAfterDelete = 300;

    let wordIndex = 0;
    let phase = 'typing';

    const tick = () => {
      const word = words[wordIndex];
      const current = typedEl.textContent;
      let delay = typeSpeed;

      if (phase === 'typing') {
        if (current.length < word.length) {
          typedEl.textContent = word.slice(0, current.length + 1);
        } else {
          phase = 'pausing';
          delay = pauseAfterType;
        }
      } else if (phase === 'pausing') {
        phase = 'deleting';
        delay = 60;
      } else {
        if (current.length > 0) {
          typedEl.textContent = current.slice(0, -1);
          delay = deleteSpeed;
        } else {
          phase = 'typing';
          wordIndex = (wordIndex + 1) % words.length;
          delay = pauseAfterDelete;
        }
      }

      setTimeout(tick, delay);
    };

    tick();
  }
}
