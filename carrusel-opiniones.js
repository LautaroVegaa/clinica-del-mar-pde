document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.querySelector('#opinionesCarousel') || document.querySelector('.opiniones-carousel');
  const track = document.querySelector('.carousel-track');
  if (!track) return;

  const prevBtn = document.querySelector('#opinionesPrev') || document.querySelector('.carousel-arrow--left');
  const nextBtn = document.querySelector('#opinionesNext') || document.querySelector('.carousel-arrow--right');

  let cards = Array.from(track.children);
  let currentIndex = 0;

  const AUTOPLAY_MS = 4500;
  let autoPlayInterval = null;

  function updateCarousel() {
    cards = Array.from(track.children);
    const firstCard = track.children[0];
    if (!firstCard) return;

    const cardWidth = firstCard.getBoundingClientRect().width || 0;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const offset = currentIndex * (cardWidth + gap);

    track.style.transform = `translateX(-${offset}px)`;
  }

  function goTo(index) {
    cards = Array.from(track.children);
    const total = cards.length;
    if (total <= 1) {
      currentIndex = 0;
      updateCarousel();
      return;
    }

    // Loop infinito
    if (index < 0) currentIndex = total - 1;
    else if (index >= total) currentIndex = 0;
    else currentIndex = index;

    updateCarousel();
  }

  function next() {
    goTo(currentIndex + 1);
  }

  function prev() {
    goTo(currentIndex - 1);
  }

  function stopAutoPlay() {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
    }
  }

  function startAutoPlay() {
    stopAutoPlay();
    autoPlayInterval = setInterval(next, AUTOPLAY_MS);
  }

  function resetAutoPlay() {
    startAutoPlay();
  }

  // Click flechas
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prev();
      resetAutoPlay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      next();
      resetAutoPlay();
    });
  }

  // Pausa en hover
  if (carousel) {
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
  }

  // Teclado
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prev();
      resetAutoPlay();
    }
    if (e.key === 'ArrowRight') {
      next();
      resetAutoPlay();
    }
  });

  // Inicialización
  updateCarousel();
  startAutoPlay();

  // Recalcular al redimensionar (por si cambia el ancho)
  window.addEventListener('resize', updateCarousel);
});