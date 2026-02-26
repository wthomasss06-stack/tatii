import { useEffect } from 'react';

const useAnimations = () => {
  useEffect(() => {
    // ── Intersection Observer pour révéler les éléments au scroll ──
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.12 }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => revealObserver.observe(el));

    // ── Curseur personnalisé ──
    const cursor = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    const moveCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursor) {
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
      }
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      if (cursorRing) {
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';
      }
      requestAnimationFrame(animateRing);
    };

    document.addEventListener('mousemove', moveCursor);
    animateRing();

    // Grossir l'anneau sur les éléments interactifs
    const interactives = document.querySelectorAll('a, button, .project-card, .filter-btn');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', () => cursorRing?.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => cursorRing?.classList.remove('cursor-hover'));
    });

    // ── Compteurs animés ──
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.target);
            const duration = 1800;
            const step = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
              current += step;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              el.textContent = Math.floor(current) + (el.dataset.suffix || '');
            }, 16);

            counterObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('.counter').forEach((el) => counterObserver.observe(el));

    // ── Parallax sur le hero ──
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroVisual = document.querySelector('.hero-visual');
      const heroBg = document.querySelector('.hero-noise');
      if (heroVisual) heroVisual.style.transform = `translateY(${scrollY * 0.25}px)`;
      if (heroBg) heroBg.style.transform = `translateY(${scrollY * 0.1}px)`;

      // Navbar active link
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section) => {
        const top = section.offsetTop - 100;
        const bottom = top + section.offsetHeight;
        const link = document.querySelector(`.nav-link[href="#${section.id}"]`);
        if (link) {
          if (scrollY >= top && scrollY < bottom) {
            document.querySelectorAll('.nav-link').forEach((l) => l.classList.remove('active'));
            link.classList.add('active');
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // ── Smooth scroll sur les ancres ──
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    });

    return () => {
      revealObserver.disconnect();
      counterObserver.disconnect();
      document.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
};

export default useAnimations;