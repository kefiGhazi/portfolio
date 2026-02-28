// Typing effect
const phrases = [
  "Lead Développeur Fullstack",
  "Expert PHP / Symfony",
  "Architecte Docker & CI/CD",
  "Tech Lead Agile",
];
let pi = 0, ci = 0, del = false;
const typedEl = document.getElementById("hero-typed");
function type() {
  const cur = phrases[pi];
  typedEl.textContent = del ? cur.slice(0, --ci) : cur.slice(0, ++ci);
  if (!del && ci === cur.length) {
    del = true;
    return setTimeout(type, 1800);
  }
  if (del && ci === 0) {
    del = false;
    pi = (pi + 1) % phrases.length;
  }
  setTimeout(type, del ? 40 : 75);
}
type();

// Language circles + sidebar skill bars
setTimeout(() => {
  document.querySelectorAll(".lc-fill").forEach((el) => {
    const circ = 119.38;
    const offset = circ - (circ * parseInt(el.dataset.pct)) / 100;
    el.style.strokeDashoffset = offset;
  });
  document.querySelectorAll(".sb-skill-fill").forEach((el) => {
    el.style.width = el.dataset.width + "%";
  });
}, 400);

// Intersection Observer — fade-up
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("visible");
      io.unobserve(e.target);
    });
  },
  { threshold: 0.1 }
);
document
  .querySelectorAll(".fade-up, .tl-item, .edu-item")
  .forEach((el) => io.observe(el));

// Formulaire de contact
const form = document.getElementById("contact-form");
if (form) {
  const feedback = form.querySelector(".cf-feedback");
  const submitBtn = form.querySelector(".cf-submit");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      feedback.textContent = "Veuillez remplir tous les champs requis.";
      feedback.className = "cf-feedback error";
      return;
    }
    submitBtn.disabled = true;
    submitBtn.querySelector(".cf-btn-text").textContent = "Envoi en cours…";
    // Simulation d'envoi (remplacer par un vrai appel API)
    setTimeout(() => {
      feedback.textContent = "✓ Message envoyé ! Je vous répondrai dans les plus brefs délais.";
      feedback.className = "cf-feedback success";
      form.reset();
      submitBtn.disabled = false;
      submitBtn.querySelector(".cf-btn-text").textContent = "Envoyer le message";
    }, 1200);
  });
}

// Active nav on scroll + aria-current
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".sb-nav a");
window.addEventListener("scroll", () => {
  let cur = "";
  sections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 200) cur = s.id;
  });
  navLinks.forEach((a) => {
    const isActive = a.getAttribute("href") === "#" + cur;
    a.classList.toggle("active", isActive);
    a.setAttribute("aria-current", isActive ? "true" : "false");
  });
});
navLinks.forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      // Déplacer le focus pour les utilisateurs clavier (RGAA 12.13)
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    }
  });
});
