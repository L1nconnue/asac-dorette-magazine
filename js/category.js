/*
 * JavaScript for the category listing page.
 *
 * This script reads the selected category and language from the query string,
 * loads a set of sample articles for demonstration, and renders them as
 * interactive cards. Clicking a card opens a modal with the full article
 * content and images. The modal can be closed with the close button or by
 * pressing the Escape key. Localization is handled using simple lookup
 * objects similar to the other pages.
 */

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const catKey = params.get('cat') || 'Focus';
  let currentLang = params.get('lang') || localStorage.getItem('asacLang') || 'fr';

  const labelEl = document.getElementById('categoryLabel');
  const articlesContainer = document.getElementById('articlesContainer');
  const modal = document.getElementById('articleModal');
  const modalClose = document.getElementById('modalClose');
  const articleContent = document.getElementById('articleContent');
  const pageClose = document.getElementById('closeBtn');

  // Sample data for categories and articles
  const data = {
    Focus: [
      {
        title: { fr: "Titre Focus 1", en: "Focus Title 1" },
        subtitle: { fr: "Résumé rapide du premier article de la catégorie Focus.", en: "Brief summary of the first Focus article." },
        image: 'images/focus.jpg',
        content: {
          fr: [
            "Ceci est le contenu du premier article Focus. Utilisez cet espace pour ajouter des informations pertinentes et captivantes qui intéresseront les lecteurs.",
            "Continuez avec d'autres paragraphes pour structurer l'article et offrir un récit clair et fluide.",
          ],
          en: [
            "This is the content of the first Focus article. Use this space to add relevant and engaging information that will interest readers.",
            "Continue with additional paragraphs to structure the article and provide a clear and fluid narrative.",
          ],
        },
      },
      {
        title: { fr: "Titre Focus 2", en: "Focus Title 2" },
        subtitle: { fr: "Un autre aperçu intéressant de la catégorie Focus.", en: "Another interesting overview of the Focus category." },
        image: 'images/focus.jpg',
        content: {
          fr: [
            "Deuxième article pour la catégorie Focus. Le contenu peut être développé en fonction des besoins.",
            "Incluez des anecdotes, des études de cas ou des interviews pour enrichir l'expérience du lecteur.",
          ],
          en: [
            "Second article for the Focus category. The content can be developed according to needs.",
            "Include anecdotes, case studies, or interviews to enrich the reader's experience.",
          ],
        },
      },
    ],
    Emploi: [
      {
        title: { fr: "Titre Emploi 1", en: "Employment Title 1" },
        subtitle: { fr: "Opportunités d'emploi et conseils de carrière.", en: "Job opportunities and career advice." },
        image: 'images/emploi.jpg',
        content: {
          fr: [
            "Cet article décrit les tendances actuelles du marché du travail et fournit des conseils pour réussir vos candidatures.",
            "Explorez les secteurs porteurs au Cameroun et comment développer vos compétences pour maximiser vos chances.",
          ],
          en: [
            "This article describes current labour market trends and provides tips for successful applications.",
            "Explore booming sectors in Cameroon and how to develop your skills to maximise your chances.",
          ],
        },
      },
      {
        title: { fr: "Titre Emploi 2", en: "Employment Title 2" },
        subtitle: { fr: "Focus sur les métiers de l'assurance.", en: "Focus on insurance professions." },
        image: 'images/emploi.jpg',
        content: {
          fr: [
            "Découvrez les différents métiers de l'assurance et les compétences requises pour y accéder.",
            "Des témoignages de professionnels illustrent les parcours possibles dans ce secteur.",
          ],
          en: [
            "Discover the different professions in insurance and the skills required to access them.",
            "Testimonies from professionals illustrate possible career paths in this sector.",
          ],
        },
      },
    ],
    'Ça bouge !': [
      {
        title: { fr: "Ça bouge 1", en: "What's Up 1" },
        subtitle: { fr: "Les nouvelles initiatives qui dynamisent le secteur.", en: "New initiatives energising the sector." },
        image: 'images/cabouge.jpg',
        content: {
          fr: [
            "Dans cette rubrique, nous mettons en avant les événements et actions récentes qui stimulent l'industrie.",
            "Partagez vos expériences et participez à la dynamique en envoyant vos actualités.",
          ],
          en: [
            "In this section, we highlight recent events and actions that stimulate the industry.",
            "Share your experiences and join the momentum by sending us your news.",
          ],
        },
      },
    ],
    Actualité: [
      {
        title: { fr: "Actualité 1", en: "News 1" },
        subtitle: { fr: "Dernières informations du monde de l'assurance.", en: "Latest information from the world of insurance." },
        image: 'images/actualite.jpg',
        content: {
          fr: [
            "Restez informé avec nos articles de news couvrant les faits marquants de la semaine.",
            "Nos journalistes sélectionnent l'essentiel pour que vous ne manquiez rien.",
          ],
          en: [
            "Stay informed with our news articles covering the highlights of the week.",
            "Our journalists select the essentials so you don't miss anything.",
          ],
        },
      },
    ],
  };

  // Translation for category names
  const catTranslations = {
    fr: {
      Focus: 'Focus',
      Emploi: 'Emploi',
      'Ça bouge !': 'Ça bouge !',
      Actualité: 'Actualité',
    },
    en: {
      Focus: 'Focus',
      Emploi: 'Employment',
      'Ça bouge !': "What's Up",
      Actualité: 'News',
    },
  };

  // Fallback sample if category not defined
  function getArticlesForCategory(cat) {
    return data[cat] || [
      {
        title: { fr: `${cat} Article`, en: `${cat} Article` },
        subtitle: { fr: 'Texte introductif.', en: 'Introductory text.' },
        image: 'images/actualite.jpg',
        content: {
          fr: ['Contenu générique pour cet article.'],
          en: ['Generic content for this article.'],
        },
      },
    ];
  }

  // Apply category label translation
  function updateLabel() {
    labelEl.textContent = catTranslations[currentLang][catKey] || catKey;
  }

  // Render articles in list
  function renderArticles() {
    articlesContainer.innerHTML = '';
    const articles = getArticlesForCategory(catKey);
    articles.forEach((article, index) => {
      const card = document.createElement('div');
      card.className = 'article-card';
      card.style.backgroundImage = `url('${article.image}')`;
      card.dataset.index = index;
      // Info overlay
      const info = document.createElement('div');
      info.className = 'article-info';
      const h3 = document.createElement('h3');
      h3.textContent = article.title[currentLang] || article.title.fr;
      const p = document.createElement('p');
      p.textContent = article.subtitle[currentLang] || article.subtitle.fr;
      info.appendChild(h3);
      info.appendChild(p);
      card.appendChild(info);
      articlesContainer.appendChild(card);
    });
  }

  updateLabel();
  renderArticles();

  // Click handler for each article card
  articlesContainer.addEventListener('click', (e) => {
    let target = e.target;
    while (target && !target.classList.contains('article-card')) {
      target = target.parentElement;
    }
    if (target) {
      const idx = parseInt(target.dataset.index);
      openArticleModal(idx);
    }
  });

  // Populate modal with selected article content
  function openArticleModal(index) {
    const articles = getArticlesForCategory(catKey);
    const article = articles[index];
    articleContent.innerHTML = '';
    // Title
    const h1 = document.createElement('h1');
    h1.textContent = article.title[currentLang] || article.title.fr;
    h1.style.fontFamily = 'Bebas Neue, cursive';
    h1.style.fontSize = '2rem';
    h1.style.marginBottom = '1rem';
    articleContent.appendChild(h1);
    // Subtitle
    const subtitle = document.createElement('p');
    subtitle.textContent = article.subtitle[currentLang] || article.subtitle.fr;
    subtitle.style.fontSize = '1rem';
    subtitle.style.marginBottom = '1rem';
    subtitle.style.opacity = '0.8';
    articleContent.appendChild(subtitle);
    // Image at top
    const img = document.createElement('img');
    img.src = article.image;
    img.alt = h1.textContent;
    articleContent.appendChild(img);
    // Paragraphs
    const paragraphs = article.content[currentLang] || article.content.fr;
    paragraphs.forEach((para) => {
      const p = document.createElement('p');
      p.textContent = para;
      p.style.marginBottom = '1rem';
      articleContent.appendChild(p);
    });
    // Show modal
    modal.classList.remove('hidden');
  }

  // Close modal
  function closeModal() {
    modal.classList.add('hidden');
  }
  modalClose.addEventListener('click', closeModal);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
  });

  // Navigate back to previous page
  pageClose.addEventListener('click', () => {
    window.history.back();
  });
});