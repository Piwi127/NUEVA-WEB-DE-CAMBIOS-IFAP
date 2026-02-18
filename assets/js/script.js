const form = document.querySelector("#contactForm");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".nav-links a");


const WEBAPP_URL =
  "https://script.google.com/macros/s/AKfycbyuC2is5OPEOqizW3wQhmg2M91fqbtdvRSiOXB0gxq04h2rQh9TWH-o4vKk6UFfGmdpFg/exec";

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.textContent : "";

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.add("loading");
      submitBtn.textContent = "Enviando...";
    }

    const data = new FormData();
    data.append("nombre", document.getElementById("nombre").value.trim());
    data.append("correo", document.getElementById("correo").value.trim());
    data.append("telefono", document.getElementById("telefono").value.trim());
    data.append("evento", document.getElementById("evento").value);
    data.append("comentarios", document.getElementById("comentarios").value.trim());

    let sentOk = false;

    try {
      await fetch(WEBAPP_URL, {
        method: "POST",
        mode: "no-cors",
        body: data,
      });

      alert("\u00a1Gracias por inscribirte! En breve recibir\u00e1s el link de ingreso en tu correo.");
      form.reset();
      sentOk = true;
    } catch (error) {
      console.error("Error:", error);
    }

    if (!sentOk) {
      alert("Hubo un error al enviar el formulario. Intenta nuevamente.");
    }

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.classList.remove("loading");
      submitBtn.textContent = originalText;
    }
  });
}
if (navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const startTyping = ({ target, phrases, messageDuration }) => {
  const typingSpeed = 70;
  const deletingSpeed = 45;
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let messageStart = 0;

  const typeLoop = () => {
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {
      if (charIndex === 0) {
        messageStart = performance.now();
      }
      charIndex += 1;
      target.textContent = currentPhrase.slice(0, charIndex);

      if (charIndex >= currentPhrase.length) {
        isDeleting = true;
        const elapsed = performance.now() - messageStart;
        const remaining = Math.max(0, messageDuration - elapsed);
        setTimeout(typeLoop, remaining);
        return;
      }

      setTimeout(typeLoop, typingSpeed);
      return;
    }

    charIndex -= 1;
    target.textContent = currentPhrase.slice(0, charIndex);

    if (charIndex <= 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeLoop, 350);
      return;
    }

    setTimeout(typeLoop, deletingSpeed);
  };

  if (prefersReducedMotion) {
    target.textContent = phrases[0];
  } else {
    typeLoop();
  }
};

const typingTarget = document.querySelector("#inscription-typing");

if (typingTarget) {
  startTyping({
    target: typingTarget,
    phrases: [
      "Inscr\u00edbete al primer taller.",
      "IFAP - Instituto de Formaci\u00f3n Archiv\u00edstica Peruana.",
    ],
    messageDuration: 10000,
  });
}

const aboutTypingTarget = document.querySelector("#about-typing");

if (aboutTypingTarget) {
  startTyping({
    target: aboutTypingTarget,
    phrases: ["Una comunidad que impulsa la archiv\u00edstica en el Per\u00fa"],
    messageDuration: 10000,
  });
}
