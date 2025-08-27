// -------------------------
// Language Switcher (Full Version)
// -------------------------

// Apply translations to elements
function applyTranslations(translations, lang) {
    // عناصر عادية بالـ data-translate
    document.querySelectorAll("[data-translate]").forEach((el) => {
        const key = el.getAttribute("data-translate");
        if (translations[key]) {
            el.textContent = translations[key];
        }
    });

    // Placeholder في الفورم
    document.querySelectorAll("[data-placeholder]").forEach((el) => {
        const key = el.getAttribute("data-placeholder");
        if (translations[key]) {
            el.setAttribute("placeholder", translations[key]);
        }
    });

    // تحديث اتجاه الصفحة (يمين لليسار / شمال لليمين)
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
}

async function loadTranslations(lang) {
    try {
        const response = await fetch(`${lang}.json`);
        if (!response.ok) {
            throw new Error(`Could not load ${lang}.json`);
        }

        const translations = await response.json();
        applyTranslations(translations, lang);

        // حفظ اللغة المختارة
        localStorage.setItem("selectedLang", lang);

        // تحديث الزر النشط
        updateActiveLangButton();

        // 👈 هنا بقى إضافة تغيير الاتجاه
        if (lang === "ar") {
            document.documentElement.setAttribute("dir", "rtl");
        } else {
            document.documentElement.setAttribute("dir", "ltr");
        }

    } catch (error) {
        console.error("Translation error:", error);

        // fallback للإنجليزي
        if (lang !== "en") {
            const enResponse = await fetch("en.json");
            const enTranslations = await enResponse.json();
            applyTranslations(enTranslations, "en");
            localStorage.setItem("selectedLang", "en");
            updateActiveLangButton();

            // 👈 تغيير الاتجاه لو وقع في الإنجليزي
            document.documentElement.setAttribute("dir", "ltr");
        }
    }
}

// تحديث الزر النشط
function updateActiveLangButton() {
    const selectedLang = localStorage.getItem("selectedLang") || "en";
    document.querySelectorAll(".lang-btn").forEach((btn) => {
        btn.classList.toggle("active", btn.getAttribute("data-lang") === selectedLang);
    });
}

// تغيير اللغة عند الضغط على زر
document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        const lang = btn.getAttribute("data-lang");
        loadTranslations(lang);
    });
});

// تحميل اللغة المحفوظة أو الافتراضية
window.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("selectedLang") || "en";
    loadTranslations(savedLang);
});

// -------------------------
// Mobile Navbar Toggle
// -------------------------
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");

mobileMenuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

// -------------------------
// Projects Lightbox
// -------------------------
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const projectImages = document.querySelectorAll(".project-image img");
let currentIndex = 0;

function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = projectImages[index].src;
    lightboxCaption.textContent = projectImages[index].alt;
    lightbox.style.display = "flex";
    document.body.style.overflow = "hidden"; // Prevent scrolling when lightbox is open
}

function closeLightbox() {
    lightbox.style.display = "none";
    document.body.style.overflow = "auto"; // Re-enable scrolling
}

function showPrev() {
    currentIndex = (currentIndex - 1 + projectImages.length) % projectImages.length;
    openLightbox(currentIndex);
}

function showNext() {
    currentIndex = (currentIndex + 1) % projectImages.length;
    openLightbox(currentIndex);
}

projectImages.forEach((img, index) => {
    img.addEventListener("click", () => openLightbox(index));
});

lightboxClose.addEventListener("click", closeLightbox);
prevBtn.addEventListener("click", showPrev);
nextBtn.addEventListener("click", showNext);

window.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
});

// Close lightbox with Escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.style.display === "flex") {
        closeLightbox();
    }
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        if (targetId === "#") return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: "smooth"
            });
        }
    });

});






