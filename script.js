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
