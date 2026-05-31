/*
 * JavaScript for the menu (contents) page of ASAC Magazine.
 *
 * This script constructs the list of categories on the fly based on
 * translation and metadata objects. Each menu item displays the category
 * name and a few article titles. When hovered, an overlay reveals the
 * first article’s image. Clicking on an item navigates to the category
 * listing page. The language toggle updates all text accordingly.
 */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('menuContainer');
  const langBtn = document.getElementById('menuLangToggle');

  // Read language from query string or localStorage
  const params = new URLSearchParams(window.location.search);
  let currentLang = params.get('lang') || localStorage.getItem('asacLang') || 'fr';

  // Category metadata: image file names
  const categoriesMeta = [
    { key: 'Éditorial', img: 'focus.jpg' },
    { key: 'Actualité', img: 'actualite.jpg' },
    { key: 'Évènement', img: 'actualite.jpg' },
    { key: 'Focus', img: 'focus.jpg' },
    { key: 'Vie de l’ASAC', img: 'emploi.jpg' },
    { key: 'Ça bouge !', img: 'cabouge.jpg' },
    { key: 'Votre avis compte', img: 'cabouge.jpg' },
    { key: "Les métiers de l'assurance", img: 'emploi.jpg' },
    { key: 'Emploi', img: 'emploi.jpg' },
    { key: 'Instant fun / Jeu', img: 'cabouge.jpg' },
    { key: 'Membres de l’ASAC', img: 'focus.jpg' },
  ];

  // Translation strings for French and English
  const translations = {
    fr: {
      lang: 'FR',
      categories: {
        'Éditorial': 'Éditorial',
        'Actualité': 'Actualité',
        'Évènement': 'Évènement',
        'Focus': 'Focus',
        'Vie de l’ASAC': 'Vie de l’ASAC',
        'Ça bouge !': 'Ça bouge !',
        'Votre avis compte': 'Votre avis compte',
        "Les métiers de l'assurance": "Les métiers de l'assurance",
        'Emploi': 'Emploi',
        'Instant fun / Jeu': 'Instant fun / Jeu',
        'Membres de l’ASAC': 'Membres de l’ASAC',
      },
      articles: {
        'Éditorial': ['Article éditorial 1', 'Article éditorial 2', 'Article éditorial 3'],
        'Actualité': ['Article actualité 1', 'Article actualité 2', 'Article actualité 3'],
        'Évènement': ['Article évènement 1', 'Article évènement 2', 'Article évènement 3'],
        'Focus': ['Article Focus 1', 'Article Focus 2', 'Article Focus 3'],
        'Vie de l’ASAC': ['Article Vie de l’ASAC 1', 'Article Vie de l’ASAC 2'],
        'Ça bouge !': ['Article Ça bouge 1', 'Article Ça bouge 2'],
        'Votre avis compte': ['Article Avis 1', 'Article Avis 2'],
        "Les métiers de l'assurance": ['Article Métiers 1', 'Article Métiers 2'],
        'Emploi': ['Article Emploi 1', 'Article Emploi 2'],
        'Instant fun / Jeu': ['Article Instant fun 1', 'Article Instant fun 2'],
        'Membres de l’ASAC': ['Article Membres 1', 'Article Membres 2'],
      },
    },
    en: {
      lang: 'EN',
      categories: {
        'Éditorial': 'Editorial',
        'Actualité': 'News',
        'Évènement': 'Event',
        'Focus': 'Focus',
        'Vie de l’ASAC': 'Life of ASAC',
        'Ça bouge !': "What's Up",
        'Votre avis compte': 'Your Opinion Counts',
        "Les métiers de l'assurance": 'Insurance Careers',
        'Emploi': 'Employment',
        'Instant fun / Jeu': 'Fun & Games',
        'Membres de l’ASAC': 'ASAC Members',
      },
      articles: {
        'Éditorial': ['Editorial article 1', 'Editorial article 2', 'Editorial article 3'],
        'Actualité': ['News article 1', 'News article 2', 'News article 3'],
        'Évènement': ['Event article 1', 'Event article 2', 'Event article 3'],
        'Focus': ['Focus article 1', 'Focus article 2', 'Focus article 3'],
        'Vie de l’ASAC': ['Life at ASAC 1', 'Life at ASAC 2'],
        'Ça bouge !': ["What's up article 1", "What's up article 2"],
        'Votre avis compte': ['Opinion article 1', 'Opinion article 2'],
        "Les métiers de l'assurance": ['Career article 1', 'Career article 2'],
        'Emploi': ['Employment article 1', 'Employment article 2'],
        'Instant fun / Jeu': ['Fun article 1', 'Fun article 2'],
        'Membres de l’ASAC': ['Members article 1', 'Members article 2'],
      },
    },
  };

  function renderMenu() {
    container.innerHTML = '';
    const t = translations[currentLang];
    categoriesMeta.forEach((cat) => {
      const name = cat.key;
      const translatedName = t.categories[name] || name;
      const articles = t.articles[name] || [];
      // Create item
      const item = document.createElement('div');
      item.className = 'menu-item';
      item.dataset.category = name;
      // Title
      const h3 = document.createElement('h3');
      h3.textContent = translatedName;
      // List of articles
      const ul = document.createElement('ul');
      articles.forEach((article) => {
        const li = document.createElement('li');
        li.textContent = article;
        ul.appendChild(li);
      });
      // Arrow SVG
      const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      arrow.setAttribute('viewBox', '0 0 24 24');
      arrow.setAttribute('class', 'arrow');
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      // The arrow path is a simple right arrow
      path.setAttribute(
        'd',
        'M8 5l7 7-7 7'
      );
      arrow.appendChild(path);
      // Overlay
      const overlay = document.createElement('div');
      overlay.className = 'overlay';
      overlay.style.backgroundImage = `linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2)), url('images/${cat.img}')`;
      const overlayTitle = document.createElement('h3');
      overlayTitle.textContent = translatedName;
      overlayTitle.style.marginBottom = '0.5rem';
      const overlaySubtitle = document.createElement('p');
      overlaySubtitle.textContent = articles[0] || '';
      overlaySubtitle.style.fontSize = '0.9rem';
      overlaySubtitle.style.opacity = '0.8';
      overlay.appendChild(overlayTitle);
      overlay.appendChild(overlaySubtitle);
      // Assemble item
      item.appendChild(h3);
      item.appendChild(ul);
      item.appendChild(arrow);
      item.appendChild(overlay);
      container.appendChild(item);
    });
  }

  renderMenu();

  // Update language toggle and translations
  function applyLang() {
    const t = translations[currentLang];
    langBtn.textContent = t.lang;
    // update heading and subtitle
    document.querySelector('.magazine-title').textContent = currentLang === 'fr'
      ? 'ASSURANCES ET SÉCURITÉ'
      : 'INSURANCE & SECURITY';
    document.querySelector('.magazine-subtitle').textContent = currentLang === 'fr'
      ? "Le Magazine de l'Association des Sociétés d'Assurance du Cameroun"
      : 'Magazine of the Association of Insurance Companies of Cameroon';
    renderMenu();
  }
  applyLang();

  langBtn.addEventListener('click', () => {
    currentLang = currentLang === 'fr' ? 'en' : 'fr';
    localStorage.setItem('asacLang', currentLang);
    // update query string without reloading
    const url = new URL(window.location.href);
    url.searchParams.set('lang', currentLang);
    window.history.replaceState({}, '', url);
    applyLang();
  });

  // Click handler to navigate to category page
  container.addEventListener('click', (e) => {
    let target = e.target;
    while (target && !target.classList.contains('menu-item')) {
      target = target.parentElement;
    }
    if (target && target.dataset.category) {
      const cat = target.dataset.category;
      window.location.href = `category.html?cat=${encodeURIComponent(cat)}&lang=${currentLang}`;
    }
  });
});