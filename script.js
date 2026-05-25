const body = document.body;
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelectorAll('.nav__link');
const sections = document.querySelectorAll('main section[id]');
const revealItems = document.querySelectorAll('.reveal');
const form = document.querySelector('#contactForm');
const sendForm = document.querySelector('#sendForm');

menuToggle?.addEventListener('click', () => {
  const isOpen = body.classList.toggle('menu-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    body.classList.remove('menu-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    navLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, {
  rootMargin: '-45% 0px -50% 0px',
  threshold: 0,
});

sections.forEach((section) => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.16,
});

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 45, 260)}ms`;
  revealObserver.observe(item);
});

sendForm?.addEventListener('click', (event) => {
  event.preventDefault();

  if (!form?.reportValidity()) return;

  const data = new FormData(form);
  const name = data.get('name') || '';
  const email = data.get('email') || '';
  const goal = data.get('goal') || '';
  const message = data.get('message') || '';

  const subject = encodeURIComponent(`Solicitud de información - ${name}`);
  const body = encodeURIComponent(
    `Nombre: ${name}\nEmail: ${email}\nObjetivo: ${goal}\n\nSituación actual:\n${message}`
  );

  window.location.href = `mailto:contacto@lenadorbonsais.com?subject=${subject}&body=${body}`;
});
