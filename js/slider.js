const html = document.documentElement;
const toggleButton = document.getElementById('themeToggle');

const images = document.querySelectorAll('.image');
const taglines = document.querySelectorAll('.tagline');
const steps = document.querySelectorAll('.step');

let currentIndex = 0;

function show(index) {
  if (index === currentIndex) return;
  currentIndex = index;

  images.forEach(img => img.classList.remove('visible'));
  taglines.forEach(tag => tag.classList.remove('visible'));

  const img = document.querySelector(`.image[data-index="${index}"]`);
  const tag = document.querySelector(`.tagline[data-index="${index}"]`);

  if (img) img.classList.add('visible');
  if (tag) tag.classList.add('visible');
}

window.addEventListener('scroll', () => {
  steps.forEach((step, i) => {
    const rect = step.getBoundingClientRect();
    if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
      show(i);
    }
  });
});

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  html.dataset.theme = savedTheme;
  toggleButton.textContent = savedTheme === "light" ? "🌙" : "🌞";
}

function toggleTheme() {
  const isLight = html.dataset.theme === 'light';
  const newTheme = isLight ? 'dark' : 'light';
  html.dataset.theme = newTheme;
  toggleButton.textContent = newTheme === 'light' ? '🌙' : '🌞';
  localStorage.setItem("theme", newTheme);
}

toggleButton.addEventListener('click', toggleTheme);

document.addEventListener('keydown', e => {
  if (e.key.toLowerCase() === 't') toggleTheme();
});

let touchStartX = 0;

window.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
});

window.addEventListener('touchend', e => {
  const touchEndX = e.changedTouches[0].screenX;
  const deltaX = touchEndX - touchStartX;

  if (Math.abs(deltaX) > 50) {
    if (deltaX < 0 && currentIndex < images.length - 1) {
      show(currentIndex + 1);
    } else if (deltaX > 0 && currentIndex > 0) {
      show(currentIndex - 1);
    }
  }
});
