(() => {
  const cursor = document.querySelector('.film-cursor');
  const clapSound = document.querySelector('#clap-sound');
  const sceneLabel = document.querySelector('#scene-cursor-label');

  if (!cursor) return;

  const finePointer = window.matchMedia(
    '(hover: hover) and (pointer: fine)'
  );

  if (!finePointer.matches) return;

  if (clapSound) {
    clapSound.volume = 0.35;
  }


  /* ---------- CURSOR MOVEMENT ---------- */

  document.addEventListener('mousemove', (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
    cursor.classList.add('is-visible');

    if (sceneLabel) {
      sceneLabel.style.left = `${event.clientX + 42}px`;
      sceneLabel.style.top = `${event.clientY + 10}px`;
    }
  });

  document.addEventListener('mouseleave', () => {
    cursor.classList.remove('is-visible');
  });


  /* ---------- CLICKABLE ELEMENT HOVER ---------- */

  const clickableSelector =
    'a, button, .reel-card, [role="button"]';

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


  /* ---------- CLAPPERBOARD CLICK ---------- */

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


  /* ---------- SCENE CHANGE EFFECT ---------- */

  const sections = document.querySelectorAll(
    '#about-details, #projects, #contact, .tools'
  );

  const sceneNames = new Map([
    ['about-details', 'The Story'],
    ['projects', 'Selected Work'],
    ['contact', 'Final Credits']
  ]);

  let currentScene = null;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {

        if (!entry.isIntersecting) return;

        const section = entry.target;

        const sceneName =
          sceneNames.get(section.id) ||
          section.dataset.scene ||
          'Tools of the Trade';

        if (currentScene === section) return;

        currentScene = section;


        /* Wiggle clapperboard */

        cursor.classList.remove('scene-wiggle');

        void cursor.offsetWidth;

        cursor.classList.add('scene-wiggle');

        window.setTimeout(() => {
          cursor.classList.remove('scene-wiggle');
        }, 600);


        /* Show scene name */

        if (sceneLabel) {
          sceneLabel.textContent = `SCENE: ${sceneName}`;

          sceneLabel.classList.remove('show');

          void sceneLabel.offsetWidth;

          sceneLabel.classList.add('show');

          window.setTimeout(() => {
            sceneLabel.classList.remove('show');
          }, 1400);
        }
      });
    },
    {
      threshold: 0.45
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });

})();
