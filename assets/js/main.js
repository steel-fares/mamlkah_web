const heroImages = [
  "assets/images/site/site-image-001.jpg",
  "assets/images/site/site-image-002.jpg",
  "assets/images/site/site-image-003.jpg",
];

const body = document.body;
const html = document.documentElement;
const navbar = document.getElementById("navbar");
const heroBg = document.getElementById("heroBg");
const langButtons = document.querySelectorAll(".lang-btn");
const galleryCount = document.querySelector(".gcnt");
const galleryItems = [...document.querySelectorAll(".gitem")];
const filterButtons = [...document.querySelectorAll(".fb")];

const lb = document.getElementById("lb");
const lbImg = document.getElementById("lb-img");
const lbCap = document.getElementById("lb-cap");
const lbCtr = document.getElementById("lb-ctr");

const nameInput = document.getElementById("inputName");
const phoneInput = document.getElementById("inputPhone");
const messageInput = document.getElementById("inputMessage");
const serviceSelect = document.getElementById("serviceSelect");
const sendBtn = document.getElementById("sendBtn");

const serviceOptionsByLang = {
  ar: [
    "اختر نوع الخدمة",
    "بناء فيلا سكنية",
    "مبنى تجاري أو حكومي",
    "ترميم وصيانة",
    "أعمال عزل مائي / حراري",
    "تكييف مركزي",
    "كهرباء وسباكة",
    "تشطيبات وتجهيزات",
    "حمام سباحة",
    "استشارة هندسية",
  ],
  en: [
    "Select a service",
    "Residential Villa Construction",
    "Commercial or Public Building",
    "Renovation & Maintenance",
    "Waterproofing / Thermal Insulation",
    "Central HVAC",
    "Electrical & Plumbing",
    "Fit-Out & Finishing",
    "Swimming Pool",
    "Engineering Consultation",
  ],
};

const projects = galleryItems.map((item, index) => ({
  index,
  src: item.querySelector("img")?.getAttribute("src") || "",
  name: item.querySelector(".gname")?.textContent.trim() || "",
  type: item.querySelector(".gtype")?.textContent.trim() || "",
}));

let visibleIndices = [];
let currentLightboxIndex = 0;

function currentLanguage() {
  return body.classList.contains("lang-en") ? "en" : "ar";
}

function setHero(el, index) {
  if (!heroBg || !heroImages[index]) return;
  heroBg.style.backgroundImage = `url("${heroImages[index]}")`;
  document.querySelectorAll(".hthumb").forEach((thumb, thumbIndex) => {
    thumb.classList.toggle("active", thumbIndex === index);
  });
}

window.setHero = setHero;

function updateStaticLanguageFields(lang) {
  document.title =
    lang === "en"
      ? "Mamlkah Construction | المملكة للإنشاءات"
      : "المملكة للإنشاءات | Mamlkah Construction";

  html.lang = lang;

  if (nameInput) {
    nameInput.placeholder = lang === "en" ? "Enter your full name" : "أدخل اسمك الكامل";
  }

  if (phoneInput) {
    phoneInput.placeholder = lang === "en" ? "Enter your phone number" : "أدخل رقم هاتفك";
  }

  if (messageInput) {
    messageInput.placeholder =
      lang === "en" ? "Write your project details here..." : "اكتب تفاصيل مشروعك هنا...";
  }

  if (serviceSelect) {
    [...serviceSelect.options].forEach((option, index) => {
      option.textContent = serviceOptionsByLang[lang][index];
    });
  }
}

function updateGalleryCount() {
  if (!galleryCount) return;
  const total = projects.length;
  const showing = visibleIndices.length;
  galleryCount.textContent =
    currentLanguage() === "en"
      ? `Showing ${showing} of ${total} projects`
      : `عرض ${showing} من أصل ${total} مشروع`;
}

function updateVisibleIndices() {
  visibleIndices = galleryItems
    .filter(item => !item.classList.contains("hidden"))
    .map(item => Number(item.dataset.index));
  updateGalleryCount();
}

function showLightbox() {
  const project = projects[visibleIndices[currentLightboxIndex]];
  if (!project) return;
  lbImg.src = project.src;
  lbCap.textContent = `${project.name} — ${project.type}`;
  lbCtr.textContent = `${currentLightboxIndex + 1} / ${visibleIndices.length}`;
}

function openLightbox(projectIndex) {
  currentLightboxIndex = visibleIndices.indexOf(projectIndex);
  if (currentLightboxIndex < 0) currentLightboxIndex = 0;
  showLightbox();
  lb.classList.add("open");
  body.style.overflow = "hidden";
}

function closeLightbox() {
  lb.classList.remove("open");
  body.style.overflow = "";
}

function applyLanguage(lang) {
  body.classList.remove("lang-ar", "lang-en");
  body.classList.add(lang === "en" ? "lang-en" : "lang-ar");

  langButtons.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  updateStaticLanguageFields(lang);
  updateGalleryCount();

  if (lb.classList.contains("open")) {
    showLightbox();
  }

  localStorage.setItem("mamlkah-language", lang);
}

const observer = new IntersectionObserver(
  entries => {
    entries.forEach((entry, index) => {
      if (!entry.isIntersecting) return;
      setTimeout(() => entry.target.classList.add("visible"), index * 65);
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
);

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

window.addEventListener("scroll", () => {
  if (!navbar) return;
  navbar.style.background = window.scrollY > 60 ? "rgba(13,13,13,0.99)" : "rgba(13,13,13,0.96)";
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

langButtons.forEach(btn => {
  btn.addEventListener("click", () => applyLanguage(btn.dataset.lang));
});

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.f;
    galleryItems.forEach(item => {
      item.classList.toggle("hidden", filter !== "all" && item.dataset.type !== filter);
    });

    updateVisibleIndices();
  });
});

galleryItems.forEach(item => {
  item.addEventListener("click", () => openLightbox(Number(item.dataset.index)));
});

document.getElementById("lb-close")?.addEventListener("click", closeLightbox);
document.getElementById("lb-next")?.addEventListener("click", () => {
  currentLightboxIndex = (currentLightboxIndex - 1 + visibleIndices.length) % visibleIndices.length;
  showLightbox();
});
document.getElementById("lb-prev")?.addEventListener("click", () => {
  currentLightboxIndex = (currentLightboxIndex + 1) % visibleIndices.length;
  showLightbox();
});

lb?.addEventListener("click", event => {
  if (event.target === lb) {
    closeLightbox();
  }
});

document.addEventListener("keydown", event => {
  if (!lb?.classList.contains("open")) return;

  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") {
    currentLightboxIndex = (currentLightboxIndex + 1) % visibleIndices.length;
    showLightbox();
  }
  if (event.key === "ArrowRight") {
    currentLightboxIndex = (currentLightboxIndex - 1 + visibleIndices.length) % visibleIndices.length;
    showLightbox();
  }
});

sendBtn?.addEventListener("click", () => {
  const name = nameInput?.value.trim() || "";
  const lang = currentLanguage();

  if (!name) {
    alert(lang === "en" ? "Please enter your full name." : "الرجاء إدخال اسمك الكامل");
    return;
  }

  alert(
    lang === "en"
      ? `Thank you, ${name}!\nWe will contact you shortly.`
      : `شكراً ${name}!\nسيتم التواصل معك قريباً.`
  );
});

updateVisibleIndices();
applyLanguage(localStorage.getItem("mamlkah-language") || "ar");
