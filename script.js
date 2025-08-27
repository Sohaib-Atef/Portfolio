// -------------------------
// Language Switcher (Full Version)
// -------------------------

const langButtons = document.querySelectorAll(".lang-btn");
let currentLang = "en";

// Detect browser language and set initial language
function detectBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    
    if (browserLang.startsWith('ar')) {
        return "ar";
    } else if (browserLang.startsWith('zh')) {
        return "zh";
    } else {
        return "en"; // default to English
    }
}

// Check if user has previously selected a language
const savedLang = localStorage.getItem('selectedLanguage');
if (savedLang) {
    currentLang = savedLang;
} else {
    currentLang = detectBrowserLanguage();
}

// Update active button based on current language
function updateActiveLangButton() {
    langButtons.forEach(btn => {
        btn.classList.remove("active");
        if (btn.getAttribute("data-lang") === currentLang) {
            btn.classList.add("active");
        }
    });
}

// Load translations from JSON file inside locales folder
async function loadTranslations(lang) {
    try {
        const response = await fetch(`${lang}.json`);
        if (!response.ok) throw new Error(`Could not load ${lang}.json`);
        const translations = await response.json();
        applyTranslations(translations, lang);
        
        // Update direction and language attribute
        document.documentElement.dir = (lang === "ar") ? "rtl" : "ltr";
        document.documentElement.lang = lang;
        document.body.classList.toggle("rtl", lang === "ar");
        document.body.classList.toggle("ltr", lang !== "ar");
        
        // Save selected language
        localStorage.setItem('selectedLanguage', lang);
        updateActiveLangButton();
    } catch (error) {
        console.error("Translation error:", error);
        
        // Fallback to English if translation file not found
        if (lang !== "en") {
            console.log("Falling back to English...");
            loadTranslations("en");
        }
    }
}

// Apply translations to elements
function applyTranslations(translations, lang) {
    // تحديث لغة واتجاه وسم HTML الأساسي
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === "ar") ? "rtl" : "ltr";
    
    // تطبيق الترجمات على العناصر
    document.querySelectorAll("[data-translate]").forEach(el => {
        const key = el.getAttribute("data-translate");
        if (translations[key]) {
            if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
                el.placeholder = translations[key];
            } else {
                el.textContent = translations[key];
            }
        }
    });

    // تحديث class لل body
    document.body.className = lang === "ar" ? "rtl" : "ltr";
}

// Handle Language button clicks
langButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const lang = btn.getAttribute("data-lang");
        if (lang !== currentLang) {
            currentLang = lang;
            loadTranslations(lang);
        }
    });
});

// Load default language on first run
loadTranslations(currentLang);

async function loadTranslations(lang) {
    try {
        const response = await fetch(`${lang}.json`);
        console.log('Translation response:', response); // للتdebug
        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            throw new Error(`Could not load ${lang}.json`);
        }
        const translations = await response.json();
        console.log('Loaded translations:', translations); // للتdebug
        applyTranslations(translations, lang);
    } catch (error) {
        console.error("Translation error:", error);
        // Fallback to English
        if (lang !== "en") {
            console.log("Falling back to English...");
            const enResponse = await fetch('en.json');
            const enTranslations = await enResponse.json();
            applyTranslations(enTranslations, "en");
        }
    }
}

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


