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

const footer = document.querySelector('.footer');

footer?.querySelector('.brand')?.remove();
footer?.querySelector('.footer__nav')?.remove();

if (footer && !document.querySelector('.back-to-top')) {
  const backToTopStyles = document.createElement('style');
  backToTopStyles.textContent = `
    .back-to-top {
      display: grid;
      width: 48px;
      height: 48px;
      place-items: center;
      margin: 18px auto 26px;
      border: 1px solid var(--border);
      background: rgba(255, 255, 255, 0.035);
      color: var(--accent);
      box-shadow: 0 0 20px rgba(185, 255, 0, 0.10);
      transition: transform .2s ease, border-color .2s ease, background .2s ease, box-shadow .2s ease;
    }

    .back-to-top:hover {
      transform: translateY(-4px);
      border-color: var(--accent);
      background: rgba(185, 255, 0, 0.09);
      box-shadow: 0 0 26px rgba(185, 255, 0, 0.18);
    }

    .back-to-top svg {
      width: 24px;
      height: 24px;
      fill: currentColor;
    }
  `;
  document.head.appendChild(backToTopStyles);

  const backToTop = document.createElement('a');
  backToTop.className = 'back-to-top';
  backToTop.href = '#top';
  backToTop.setAttribute('aria-label', 'Subir al inicio');
  backToTop.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 4 4.5 11.5l1.42 1.42L11 7.83V20h2V7.83l5.08 5.09 1.42-1.42L12 4Z"/>
    </svg>
  `;

  footer.insertAdjacentElement('afterend', backToTop);
}
