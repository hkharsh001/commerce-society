// =======================
// COMMERCE SOCIETY JS
// =======================
document.addEventListener("DOMContentLoaded", () => {

  // ===== Throttle Function =====
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

  // ===== AOS Initialization =====
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 900,
      once: true,
      offset: 120
    });
  }

  // ===== Mobile Menu Toggle =====
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

    // Close when clicking nav links
    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => closeMenu());
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (navMenu.classList.contains("active") && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        closeMenu();
      }
    });
  }

  // ===== Scroll Features =====
  const backToTopButton = document.getElementById("back-to-top");
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("#nav-menu a[href^='#']");

  const handleScroll = () => {
    const scrollY = window.pageYOffset;

    // Show/hide Back-to-Top
    if (backToTopButton) {
      if (scrollY > 300) {
        backToTopButton.classList.add("visible");
      } else {
        backToTopButton.classList.remove("visible");
      }
    }

    // Active nav link highlighting
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (scrollY >= sectionTop - 150) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href").substring(1) === current) {
        link.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", throttle(handleScroll, 100));

  // ===== Back to Top Smooth Scroll =====
  if (backToTopButton) {
    backToTopButton.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
