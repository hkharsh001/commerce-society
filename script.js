// ===== HAMBURGER MENU TOGGLE =====
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
  menuToggle.classList.toggle('open');
});

// ===== SCROLL ANIMATION =====
const fadeElems = document.querySelectorAll('.fade-in');

function handleScroll() {
  fadeElems.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', handleScroll);
handleScroll(); // trigger on load

// ===== SMOOTH SCROLLING FOR NAV LINKS =====
const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').slice(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
      nav.classList.remove('active');
      menuToggle.classList.remove('open');
    }
  });
});

// ===== ANNOUNCEMENT AUTO SLIDE =====
let currentAnnouncement = 0;
const announcements = document.querySelectorAll('.announcement');
if (announcements.length > 0) {
  setInterval(() => {
    announcements[currentAnnouncement].classList.remove('active');
    currentAnnouncement = (currentAnnouncement + 1) % announcements.length;
    announcements[currentAnnouncement].classList.add('active');
  }, 4000);
}

// ===== GALLERY IMAGE LIGHTBOX =====
const galleryImages = document.querySelectorAll('.gallery img');
const lightbox = document.createElement('div');
lightbox.classList.add('lightbox');
document.body.appendChild(lightbox);

galleryImages.forEach(img => {
  img.addEventListener('click', () => {
    lightbox.classList.add('active');
    const lightboxImg = document.createElement('img');
    lightboxImg.src = img.src;
    while (lightbox.firstChild) lightbox.removeChild(lightbox.firstChild);
    lightbox.appendChild(lightboxImg);
  });
});

lightbox.addEventListener('click', () => {
  lightbox.classList.remove('active');
});
