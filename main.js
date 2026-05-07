// Initialize Lucide icons
if (window.lucide) {
  window.lucide.createIcons();
}

// --- Mobile Menu Logic ---
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

// Close mobile menu on link click
document.querySelectorAll(".mobile-link").forEach((link) => {
  link.addEventListener("click", () => {
    if (mobileMenu) mobileMenu.classList.add("hidden");
  });
});

// --- Scroll Animation (Intersection Observer with Dynamic Stagger) ---
const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px",
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");

      // If this container has reveal-items or reveal-slide, stagger them
      const items = entry.target.querySelectorAll(".reveal-item, .reveal-slide");
      items.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add("active");
        }, index * 120); // Slightly slower stagger for better feel
      });
    }
  });
}, observerOptions);

// Register main containers to observe
document.querySelectorAll(".reveal, section").forEach((el) => {
  revealObserver.observe(el);
});

// --- Language Toggle Logic ---
const langBtn = document.getElementById("lang-toggle");
if (langBtn) {
  langBtn.addEventListener("click", () => {
    const span = langBtn.querySelector("span");
    if (span) {
      span.textContent = span.textContent === "JA" ? "EN" : "JA";
    }
  });
}

// --- Navbar Scroll Effect ---
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add("shadow-sm", "bg-white/95");
      navbar.classList.remove("bg-white/80");
    } else {
      navbar.classList.remove("shadow-sm", "bg-white/95");
      navbar.classList.add("bg-white/80");
    }
  }
});

emailjs.init("wIHQ4-0wzc9jcOmJD");

const form = document.getElementById("contact-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs
    .sendForm("service_tvc3eqt", "template_ijet9b1", this)
    .then(() => {
      const toast = document.getElementById("toast");

      toast.classList.add("show");

      form.reset();

      setTimeout(() => {
        toast.classList.remove("show");
      }, 3000);
    })

    .catch((error) => {
      alert("送信失敗");
      console.log(error);
    });
});
