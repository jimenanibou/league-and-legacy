/* ============================================
   LEAGUE & LEGACY — MAIN JS
   ============================================ */

// --- OVERLAY OPEN / CLOSE ---

function openOverlay(id) {
  const overlay = document.getElementById('overlay-' + id);
  if (!overlay) return;
  overlay.setAttribute('aria-hidden', 'false');
  overlay.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  // Reset scroll to first slide
  const photos = overlay.querySelector('.overlay__photos');
  if (photos) photos.scrollLeft = 0;
  buildDots(id);
}

function closeOverlay() {
  document.querySelectorAll('.overlay').forEach(el => {
    el.setAttribute('aria-hidden', 'true');
    el.classList.remove('is-open');
  });
  document.body.style.overflow = '';
}

// Close on ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeOverlay();
});

// Allow keyboard activation of cards
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.click();
    }
  });
});


// --- SCROLL DOTS ---

function buildDots(id) {
  const photos = document.getElementById(id + '-slides');
  const dotsContainer = document.getElementById(id + '-dots');
  if (!photos || !dotsContainer) return;

  const slides = photos.querySelectorAll('.overlay__photo-slide, .overlay__photo-slide--story');
  dotsContainer.innerHTML = '';

  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'overlay__dot' + (i === 0 ? ' is-active' : '');
    dotsContainer.appendChild(dot);
  });

  // Update active dot on scroll
  photos.addEventListener('scroll', () => {
    const index = Math.round(photos.scrollLeft / photos.clientWidth);
    dotsContainer.querySelectorAll('.overlay__dot').forEach((dot, i) => {
      dot.classList.toggle('is-active', i === index);
    });
  });
}


// --- CONNECT FORM OPTION SELECTOR ---

function selectOption(btn, type) {
  // Remove active from all
  document.querySelectorAll('.connect__option').forEach(el => el.classList.remove('is-active'));
  btn.classList.add('is-active');

  // Update hidden form subject
  const subjects = {
    share: 'League & Legacy — Share my story',
    nominate: 'League & Legacy — Nomination',
    collaborate: 'League & Legacy — Collaboration inquiry',
    press: 'League & Legacy — Press inquiry'
  };
  const subjectField = document.getElementById('form-subject');
  if (subjectField) subjectField.value = subjects[type] || subjects.share;
}
