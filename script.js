// script.js
document.addEventListener("DOMContentLoaded", () => {

  // ===== THROTTLE FUNCTION =====
  const throttle = (func, limit) => {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  };

  // ===== AOS INITIALIZATION =====
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100
    });
  }

  // ===== MOBILE MENU =====
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  const closeMenu = () => {
    navMenu.classList.remove("active");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      navMenu.classList.toggle("active");
      menuToggle.classList.toggle("active");
      const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", !isExpanded);
    });

    const navLinks = navMenu.querySelectorAll("a");
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        if (navMenu.classList.contains("active")) {
          closeMenu();
        }
      });
    });

    document.addEventListener("click", (e) => {
      if (navMenu.classList.contains("active") && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        closeMenu();
      }
    });
  }

  // ===== SCROLL EFFECTS =====
  const backToTopButton = document.getElementById("back-to-top");
  const sections = document.querySelectorAll("section[id]");
  const navLinksForScroll = document.querySelectorAll("#nav-menu a[href^='#']");

  const handleScroll = () => {
    const scrollY = window.pageYOffset;

    // Back to Top Button
    if (backToTopButton) {
      if (scrollY > 300) {
        backToTopButton.classList.add("visible");
      } else {
        backToTopButton.classList.remove("visible");
      }
    }

    // Active nav link highlight
    if (sections.length > 0 && navLinksForScroll.length > 0) {
      let currentSectionId = "";
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 150) {
          currentSectionId = section.getAttribute("id");
        }
      });

      navLinksForScroll.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").substring(1) === currentSectionId) {
          link.classList.add("active");
        }
      });
    }
  };

  window.addEventListener("scroll", throttle(handleScroll, 100));

  // ===== BACK TO TOP BUTTON CLICK =====
  if (backToTopButton) {
    backToTopButton.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
});
