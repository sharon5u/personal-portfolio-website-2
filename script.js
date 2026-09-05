// Highlights the nav link for whichever section is currently in view.
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (!sections.length || !navLinks.length) return;

  const setCurrent = (id) => {
    navLinks.forEach((link) => {
      const isMatch = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('current', isMatch);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      if (visible.length > 0) {
        setCurrent(visible[0].target.id);
      }
    },
    {
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    }
  );

  sections.forEach((section) => observer.observe(section));
});

//ChatGPT assisted with adding the tilt feature
// Subtle profile photo tilt
const profileFrame = document.querySelector('.hero-photo-frame');

if (profileFrame) {
  profileFrame.addEventListener('mousemove', (event) => {
    const rect = profileFrame.getBoundingClientRect();

    // Cursor position inside the photo
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Convert cursor position to values between -1 and 1
    const xPercent = (x / rect.width - 0.5) * 2;
    const yPercent = (y / rect.height - 0.5) * 2;

    // Maximum tilt = 3 degrees
    const rotateY = xPercent * 3;
    const rotateX = yPercent * -3;

    profileFrame.style.transform =
      `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  // Return to normal when cursor leaves
  profileFrame.addEventListener('mouseleave', () => {
    profileFrame.style.transform =
      'perspective(800px) rotateX(0deg) rotateY(0deg)';
  });
}

// ---------------------------------------------------------------------------
// Cinematic scene transitions (shared by index.html and every scene page:
// music.html, film.html, hiking.html, snowboarding.html).
//
// What this does:
// 1. On every page load, fades the full-screen black overlay OUT so arriving
//    at a page feels like it's fading in from black.
// 2. Any link marked with a `data-transition` attribute (the "Back to the
//    reel", "Previous scene", and "Next scene" links) fades the overlay IN
//    before navigating, so leaving a page also fades through black.
// 3. Clicking a reel-card on the homepage pauses the moving film strip,
//    zooms that one frame up large, fades the overlay in, then navigates to
//    that interest's page — like the frame is being pulled off the reel.
//
// Everything here respects prefers-reduced-motion: if the visitor has that
// setting on, links just navigate immediately with no animation.
// ---------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.querySelector('.scene-transition-overlay');
  if (!overlay) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Fade in from black on arrival at any page.
  requestAnimationFrame(() => {
    overlay.classList.remove('is-active');
  });

  // Generic "fade to black, then go" links (back / previous / next scene).
  document.querySelectorAll('[data-transition]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const url = link.getAttribute('href');
      if (!url || reduceMotion) return;

      event.preventDefault();
      overlay.classList.add('is-active');
      window.setTimeout(() => {
        window.location.href = url;
      }, 400);
    });
  });

  // Reel-card "open scene" launch, only present on the homepage.
  document.querySelectorAll('.reel-card[data-scene]').forEach((card) => {
    card.addEventListener('click', (event) => {
      const url = card.getAttribute('href');
      if (!url) return;

      if (reduceMotion) return; // let it navigate normally, no animation

      event.preventDefault();

      const track = document.querySelector('.reel-track');
      if (track) track.style.animationPlayState = 'paused';

      card.classList.add('is-launching');
      card.style.transform = 'scale(7)';
      overlay.classList.add('is-active');

      window.setTimeout(() => {
        window.location.href = url;
      }, 600);
    });
  });
});
