// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');

if (navToggle && navMobile) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMobile.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMobile.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMobile.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Fade-in on scroll
const fadeEls = document.querySelectorAll('.fade-in');

if ('IntersectionObserver' in window && fadeEls.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  fadeEls.forEach((el) => observer.observe(el));
} else {
  fadeEls.forEach((el) => el.classList.add('is-visible'));
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Headline word cycle (typewriter effect)
const cycleWord = document.getElementById('cycleWord');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (cycleWord) {
  const words = ['lectures', 'films', 'exhibits', 'debates', 'readings'];

  if (reduceMotion) {
    cycleWord.textContent = words[0];
  } else {
    const typingSpeed = 170;
    const deletingSpeed = 110;
    const pauseAfterType = 2600;
    const pauseAfterDelete = 700;

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const tick = () => {
      const currentWord = words[wordIndex];

      if (!deleting) {
        charIndex++;
        cycleWord.textContent = currentWord.slice(0, charIndex);

        if (charIndex === currentWord.length) {
          deleting = true;
          setTimeout(tick, pauseAfterType);
          return;
        }
        setTimeout(tick, typingSpeed);
      } else {
        charIndex--;
        cycleWord.textContent = currentWord.slice(0, charIndex);

        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          setTimeout(tick, pauseAfterDelete);
          return;
        }
        setTimeout(tick, deletingSpeed);
      }
    };

    tick();
  }
}
