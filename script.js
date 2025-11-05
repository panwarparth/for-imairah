const targetDate = new Date("Nov 28, 2025 00:00:00").getTime();
setInterval(updateCountdown, 1000);

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;
  const d = Math.floor(distance / (1000 * 60 * 60 * 24));
  const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((distance % (1000 * 60)) / 1000);
  document.getElementById("countdown").textContent = `${d}d ${h}h ${m}m ${s}s`;
  if (distance < 0)
    document.getElementById("countdown").textContent = "🎂 It's your day, Miru! 🎉";
}

function fadeToSection(id) {
  document.querySelectorAll('.fade-section').forEach(sec => sec.classList.remove('visible'));
  const next = document.getElementById(id);
  setTimeout(() => next.classList.add('visible'), 200);
}

function startExperience() {
  fadeToSection('menuSection');
  document.getElementById('music').play();
  setInterval(() => {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.textContent = '💗';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (3 + Math.random() * 3) + 's';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
  }, 300);
}

function showSection(section) {
  fadeToSection(section === 'home' ? 'homeSection'
                 : section === 'menu' ? 'menuSection'
                 : section === 'messages' ? 'messagesSection'
                 : 'pdfTool');
}

const messages = [
  "You make ordinary days feel magical 💖",
  "You're my favorite notification 🥰",
  "Even your chaos feels perfect 💞",
  "If smiles were stars, you'd light up the galaxy 🌌"
];
function newMessage() {
  const msg = messages[Math.floor(Math.random() * messages.length)];
  document.getElementById("messageText").textContent = msg;
}
