document.addEventListener('DOMContentLoaded', () => {
  // init AOS
  if (typeof AOS !== 'undefined') AOS.init({ duration:700, once:true, offset:100 });

  // menu toggle (hamburger)
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  function closeMenu(){
    menuToggle.classList.remove('active');
    navLinks.classList.remove('show');
    menuToggle.setAttribute('aria-expanded','false');
  }

  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('show');
    const expanded = menuToggle.classList.contains('active');
    menuToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
  });

  // close on outside click
  document.addEventListener('click', (e) =>{
    if (navLinks.classList.contains('show') && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
      closeMenu();
    }
  });

  // close on link click
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => closeMenu());
  });

  // back to top button
  const back = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) back.classList.add('visible');
    else back.classList.remove('visible');
  });
  back.addEventListener('click', (e) => { e.preventDefault(); window.scrollTo({top:0, behavior:'smooth'}); });

  // lightweight duplicate-collab hack: clone first items to make smooth feel (if needed)
  const track = document.querySelector('.collab-track');
  if(track){
    // don't overdo cloning on very small screens
    try {
      const items = Array.from(track.children);
      items.slice(0, items.length).forEach(i => track.appendChild(i.cloneNode(true)));
    } catch(e){}
  }
});
