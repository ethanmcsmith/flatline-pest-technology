document.documentElement.classList.add('js');

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.primary-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('open', !isOpen);
});

navigation?.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    navigation.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }
});

document.querySelectorAll('[data-service]').forEach((link) => {
  link.addEventListener('click', () => {
    const select = document.querySelector('#service');
    if (select) select.value = link.dataset.service;
  });
});

document.querySelector('#inspection-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const message = [
    'Hi Flatline, I would like to request an inspection.',
    '',
    `Name: ${form.get('name')}`,
    `Phone: ${form.get('phone')}`,
    `Service: ${form.get('service')}`,
    `Property: ${form.get('property')}`,
    `Area: ${form.get('location')}`,
    form.get('details') ? `Details: ${form.get('details')}` : null,
  ].filter(Boolean).join('\n');

  window.open(`https://wa.me/18687793528?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
});

document.querySelector('#year').textContent = new Date().getFullYear();

const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
  const row = Math.floor(index / 3);
  card.classList.add(row % 2 === 0 ? 'animate-from-right' : 'animate-from-left');
});

if ('IntersectionObserver' in window) {
  const cardObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -5% 0px' });

  serviceCards.forEach((card) => cardObserver.observe(card));
} else {
  serviceCards.forEach((card) => card.classList.add('is-visible'));
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const heroVideo = document.querySelector('.hero-video');
if (reducedMotion.matches) heroVideo?.pause();
