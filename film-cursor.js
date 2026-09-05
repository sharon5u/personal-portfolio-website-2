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
<!-- Clapperboard sound -->
<audio id="clap-sound" src="clap.wav" preload="auto"></audio>

<script src="script.js" defer></script>
<script src="film-cursor.js" defer></script>

const sceneLabel = document.querySelector('#scene-cursor-label');

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;

  if (sceneLabel) {
    sceneLabel.style.left = `${mouseX + 42}px`;
    sceneLabel.style.top = `${mouseY + 10}px`;
  }
});


const sections = document.querySelectorAll(
  '#about-details, #projects, #contact, .tools'
);

let currentScene = null;


const sceneNames = new Map([
  ['about-details', 'The Story'],
  ['projects', 'Selected Work'],
  ['contact', 'Final Credits']
]);


const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const section = entry.target;

      let sceneName =
        sceneNames.get(section.id) ||
        section.dataset.scene ||
        'New Scene';

      if (currentScene === section) return;

      currentScene = section;

      if (filmCursor) {
        filmCursor.classList.remove('scene-wiggle');

        void filmCursor.offsetWidth;

        filmCursor.classList.add('scene-wiggle');

        setTimeout(() => {
          filmCursor.classList.remove('scene-wiggle');
        }, 600);
      }

      if (sceneLabel) {
        sceneLabel.textContent = sceneName;

        sceneLabel.classList.remove('show');

        void sceneLabel.offsetWidth;

        sceneLabel.classList.add('show');

        setTimeout(() => {
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

