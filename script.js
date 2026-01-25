const items = document.querySelectorAll(".carousel-item");
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");
const form = document.querySelector("#contactForm");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".nav-links a");
const promoModal = document.querySelector("#promo-modal");

let currentIndex = 0;

const showItem = (index) => {
  items.forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });
};

const nextItem = () => {
  currentIndex = (currentIndex + 1) % items.length;
  showItem(currentIndex);
};

const prevItem = () => {
  currentIndex = (currentIndex - 1 + items.length) % items.length;
  showItem(currentIndex);
};

nextBtn.addEventListener("click", nextItem);
prevBtn.addEventListener("click", prevItem);

setInterval(nextItem, 7000);


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

if (promoModal) {
  const openPromo = () => {
    promoModal.classList.add("is-open");
    promoModal.setAttribute("aria-hidden", "false");
  };

  const closePromo = () => {
    promoModal.classList.remove("is-open");
    promoModal.setAttribute("aria-hidden", "true");
  };

  window.addEventListener("load", () => {
    setTimeout(openPromo, 600);
  });

  promoModal.addEventListener("click", (event) => {
    if (event.target.dataset.close === "true") {
      closePromo();
    }
  });
}
