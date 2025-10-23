
window.addEventListener('load', () => {
  document.querySelector('.loader')?.classList.add('hidden');
});


const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));




const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

document.querySelectorAll('.tilt').forEach(el => {
  const strength = 6;  

  function setTilt(e) {
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;   
    const py = (e.clientY - rect.top) / rect.height;   
    const rx = clamp((0.5 - py) * strength * 12, -strength, strength); 
    const ry = clamp((px - 0.5) * strength * 12, -strength, strength);
    el.style.setProperty('--rx', rx.toFixed(2) + 'deg');
    el.style.setProperty('--ry', ry.toFixed(2) + 'deg');
    el.style.setProperty('--tz', '8px'); 
  }

  function resetTilt() {
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
    el.style.setProperty('--tz', '0px');
  }

  el.addEventListener('mousemove', setTilt);
  el.addEventListener('mouseleave', resetTilt);
});




(() => {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  hero.addEventListener('mousemove', (e) => {
    const r = hero.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    hero.style.setProperty('--parx', (x * 8).toFixed(2) + 'px');
    hero.style.setProperty('--pary', (y * 8).toFixed(2) + 'px');
  });
})();



const modal = document.getElementById('quickview');
const qvImg = document.getElementById('qv-img');
const qvName = document.getElementById('qv-name');
const qvPrice = document.getElementById('qv-price');

document.querySelectorAll('[data-quickview]').forEach(card => {
  card.addEventListener('click', (e) => {

    const img = card.querySelector('img');
    const name = card.querySelector('.name')?.textContent || card.querySelector('.muted')?.textContent || 'Aurora Piece';
    const price = card.querySelector('.price')?.textContent || '$—';

    qvImg.src = img.src;
    qvImg.alt = img.alt || name;
    qvName.textContent = name;
    qvPrice.textContent = price;
    modal.classList.add('show');
  });
});

modal?.addEventListener('click', (e) => {
  if (e.target === modal || e.target.classList.contains('modal-close')) {
    modal.classList.remove('show');
  }
});


const chips = document.querySelectorAll('.chip');
chips.forEach(chip => chip.addEventListener('click', () => {
  chips.forEach(c => c.classList.remove('is-active'));
  chip.classList.add('is-active');
  const filter = chip.dataset.filter;
  document.querySelectorAll('.products .card').forEach(card => {
    const cat = card.dataset.category || 'all';
    card.style.display = (filter === 'all' || filter === cat) ? '' : 'none';
  });
}));