//STICKY WHATSAPP
window.addEventListener("DOMContentLoaded", () => {
  const stickyWA = document.querySelector(".sticky-wa");

  if (!stickyWA) return;

  function toggleSticky() {
    const scrollY = window.scrollY;

    if (scrollY > 700) {
      stickyWA.classList.add("show");
    } else {
      stickyWA.classList.remove("show");
    }
  }

  window.addEventListener("scroll", toggleSticky, { passive: true });

  toggleSticky(); // biar langsung sinkron saat refresh
});

// NAVBAR SCROLL EFFECT
const navbar = document.getElementById("mainNavbar");

window.addEventListener("scroll", () => {

  if(window.scrollY > 50){

    navbar.classList.add("scrolled");
    navbar.classList.remove("transparent");

  }else{

    navbar.classList.add("transparent");
    navbar.classList.remove("scrolled");

  }

});

// MOBILE MENU AUTO CLOSE
document.querySelectorAll('#mobileMenu .nav-link').forEach(link => {

  link.addEventListener('click', () => {

    const offcanvas =
      bootstrap.Offcanvas.getInstance(
        document.getElementById('mobileMenu')
      );

    offcanvas.hide();

  });

});

// Auto close juga untuk tombol WhatsApp di mobile menu
document.querySelectorAll(
'#mobileMenu .nav-link, #mobileMenu .btn-whatsapp'
).forEach(item => {

  item.addEventListener('click', () => {

    const offcanvas =
      bootstrap.Offcanvas.getInstance(
        document.getElementById('mobileMenu')
      );

    offcanvas.hide();

  });

});

const mobileMenu = document.getElementById('mobileMenu');
let menuOpened = false;

mobileMenu.addEventListener('shown.bs.offcanvas', () => {
  if(!menuOpened){
    history.pushState( {mobileMenu:true }, '');
    menuOpened = true;
  }
});

mobileMenu.addEventListener('hidden.bs.offcanvas', () => {
  menuOpened = false;
});

window.addEventListener('popstate', () => {
  const offcanvas = bootstrap.Offcanvas.getInstance(mobileMenu);
  if(offcanvas){
  offcanvas.hide();
  }
});

//INTERSECTION ANIMATIONS
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      
      // delay kecil biar lebih natural (Apple feel)
      setTimeout(() => {
        entry.target.classList.add("show");
      }, 80);

      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12
});

document.querySelectorAll(
  ".product-card, .review-card, .why-card"
).forEach((el) => observer.observe(el));

// SMOOTH SCROLL APPLE
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    if (!target) return;

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});

// TRACKING WHATSAPP BUTTON CLICK
document.getElementById("stickyWa").addEventListener("click", function () {
  
  // Google Analytics event
  if (typeof gtag !== "undefined") {
    gtag("event", "click_whatsapp_sticky", {
      event_category: "conversion",
      event_label: "sticky_button"
    });
  }

  console.log("WA Sticky clicked");
});