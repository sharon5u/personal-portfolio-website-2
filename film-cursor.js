(() => {
  const cursor = document.querySelector('.film-cursor');
  const clapSound = document.querySelector('#clap-sound');

  if (!cursor) return;

  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  if (!finePointer.matches) return;

  if (clapSound) {
    clapSound.volume = 0.35;
  }

  document.addEventListener('mousemove', (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
    cursor.classList.add('is-visible');
  });

  document.addEventListener('mouseleave', () => {
    cursor.classList.remove('is-visible');
  });

  const clickableSelector = 'a, button, .reel-card, [role="button"]';

  document.addEventListener('mouseover', (event) => {
    if (event.target.closest(clickableSelector)) {
      cursor.classList.add('is-hovering');
    }
  });

  document.addEventListener('mouseout', (event) => {
    if (event.target.closest(clickableSelector)) {
      cursor.classList.remove('is-hovering');
    }
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest(clickableSelector)) return;

    cursor.classList.remove('is-clapping');
    void cursor.offsetWidth;
    cursor.classList.add('is-clapping');

    if (clapSound) {
      clapSound.currentTime = 0;
      clapSound.play().catch(() => {});
    }

    window.setTimeout(() => {
      cursor.classList.remove('is-clapping');
    }, 170);
  });
})();
