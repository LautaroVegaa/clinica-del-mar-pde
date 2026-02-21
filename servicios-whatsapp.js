document.addEventListener('DOMContentLoaded', () => {
  const DEFAULT_NUMBER = '59895480490'; // +598 95 480 490
  const cards = document.querySelectorAll('.servicios__grid .card');

  if (!cards.length) return;

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const service = (card.dataset.service || '').trim();
      if (!service) return;

      // Si la card trae número propio (Nutrición), lo usa. Si no, usa el default.
      const phone = (card.dataset.whatsapp || DEFAULT_NUMBER).trim();

      const message = `Hola, quisiera realizar una consulta sobre ${service}. ¡Muchas gracias!`;
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

      window.open(url, '_blank', 'noopener');
    });
  });
});