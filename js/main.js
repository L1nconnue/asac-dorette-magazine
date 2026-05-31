/*
 * Main JavaScript for the ASAC Magazine home page.
 *
 * This script binds scrolling animations, language switching, and navigation
 * events. An IntersectionObserver animates featured cards into view by
 * toggling an `.active` class. Language translations are stored in an object
 * and applied dynamically to the DOM when the language toggle is clicked.
 */

document.addEventListener('DOMContentLoaded', () => {
  const panels = document.querySelectorAll('.panel');
  const cards = document.querySelectorAll('.feature-card');
  const langBtn = document.getElementById('langToggle');
  const menuBtn = document.getElementById('menuToggle');
  const heroTitle = document.querySelector('.magazine-title');
  const heroSubtitle = document.querySelector('.magazine-subtitle');

  // Set z‑indices so that later sections stack above earlier ones
  // Assign increasing z‑indices so that later sections stack above earlier ones.
  // This ordering ensures that as you scroll down, each new panel covers the
  // previous one, emulating the Floema overlay effect.
  panels.forEach((panel, index) => {
    panel.style.zIndex = index + 1;
  });

  // IntersectionObserver to animate cards when they enter the viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    },
    { threshold: 0.25 }
  );
  cards.forEach((card) => observer.observe(card));

  // Translation strings
  const translations = {
    fr: {
      lang: 'FR',
      menu: 'Sommaire',
      heroTitle: 'ASSURANCES ET SÉCURITÉ',
      heroSubtitle: "Le Magazine de l'Association des Sociétés d'Assurance du Cameroun",
      categories: {
        Focus: 'Focus',
        Emploi: 'Emploi',
        'Ça bouge !': 'Ça bouge !',
        Actualité: 'Actualité',
      },
      titles: {
        Focus: "Titre de l'article Focus",
        Emploi: "Titre de l'article Emploi",
        'Ça bouge !': "Titre de l'article Ça Bouge",
        Actualité: "Titre de l'article Actualité",
      },
    },
    en: {
      lang: 'EN',
      menu: 'Contents',
      heroTitle: 'INSURANCE & SECURITY',
      heroSubtitle: 'Magazine of the Association of Insurance Companies of Cameroon',
      categories: {
        Focus: 'Focus',
        Emploi: 'Employment',
        'Ça bouge !': "What's Up", // translation for Ça bouge
        Actualité: 'News',
      },
      titles: {
        Focus: 'Focus article title',
        Emploi: 'Employment article title',
        'Ça bouge !': "What's Up article title",
        Actualité: 'News article title',
      },
    },
  };

  // Determine the current language from localStorage or default to French
  let currentLang = localStorage.getItem('asacLang') || 'fr';

  function applyTranslations() {
    const t = translations[currentLang];
    langBtn.textContent = t.lang;
    // Update only the text inside the menu label span so we don't
    // overwrite the burger icon markup
    const menuLabelEl = menuBtn.querySelector('.menu-label');
    if (menuLabelEl) {
      menuLabelEl.textContent = t.menu;
    } else {
      menuBtn.textContent = t.menu;
    }
    heroTitle.textContent = t.heroTitle;
    heroSubtitle.textContent = t.heroSubtitle;
    // Update each feature card
    cards.forEach((card) => {
      const category = card.dataset.category;
      const label = card.querySelector('.category-label');
      const titleEl = card.querySelector('.card-title');
      label.textContent = t.categories[category] || category;
      titleEl.textContent = t.titles[category] || '';
    });
  }

  applyTranslations();

  // Toggle language between French and English
  langBtn.addEventListener('click', () => {
    currentLang = currentLang === 'fr' ? 'en' : 'fr';
    localStorage.setItem('asacLang', currentLang);
    applyTranslations();
  });

  // Navigate to menu page
  menuBtn.addEventListener('click', () => {
    window.location.href = `menu.html?lang=${currentLang}`;
  });

  // Navigate to category page when clicking a feature card
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const cat = card.dataset.category;
      window.location.href = `category.html?cat=${encodeURIComponent(cat)}&lang=${currentLang}`;
    });
  });
});