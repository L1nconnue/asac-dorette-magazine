/* ============================================
   ASAC MAGAZINE — app.js
   State-machine navigation, bilingual, no overlaps.
============================================ */

const ARTICLES = {
  editorial: [{
    title_fr: "L'impératif de l'assainissement de notre marché",
    title_en: "The imperative of cleaning up our market",
    img: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80",
    content_fr: `<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</p>
    <p><strong>Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.</strong></p>
    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in</p>`,
    content_en: `<p>The insurance market requires rigorous attention to quality, ethics, and regulatory compliance. This editorial examines the pressing need to clean up malpractices that undermine consumer confidence and market stability.</p>
    <p><strong>We must collectively commit to transparency, accountability, and the highest standards of professional conduct to build a sustainable and trusted insurance ecosystem in Cameroon.</strong></p>
    <p>The ASAC remains fully committed to partnering with regulators and all stakeholders to achieve this important transformation of our sector.</p>`
  }],
  actualite: [
    { title_fr: "Fusion approuvée pour Sanlam et Allianz", title_en: "Merger approved for Sanlam and Allianz", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
      content_fr: `<p>Les autorités de régulation de Côte d'Ivoire et du Sénégal ont approuvé la fusion des filiales d'assurance de Sanlam et d'Allianz. Cette opération crée l'un des plus grands groupes d'assurance de la sous-région.</p><p><strong>Cette fusion représente une étape majeure dans la consolidation du marché des assurances en Afrique subsaharienne.</strong></p>`,
      content_en: `<p>Regulatory authorities in Côte d'Ivoire and Senegal have approved the merger of Sanlam and Allianz insurance subsidiaries, creating one of the largest groups in the sub-region.</p>` },
    { title_fr: "Les assureurs célèbrent la Journée des droits des femmes", title_en: "Insurers celebrate International Women's Rights Day", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
      content_fr: `<p>Le secteur des assurances au Cameroun a célébré la Journée internationale des droits des femmes. De nombreuses compagnies ont organisé des événements pour mettre en valeur le rôle des femmes dans l'industrie.</p>`,
      content_en: `<p>The Cameroonian insurance sector celebrated International Women's Rights Day with special events highlighting women's role in the industry.</p>` }
  ],
  evenement: [{ title_fr: "48ème Assemblée Générale de la FANAF à Nouakchott", title_en: "48th General Assembly of FANAF in Nouakchott", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    content_fr: `<p>La 48ème Assemblée Générale de la FANAF s'est tenue à Nouakchott, en Mauritanie, réunissant des professionnels de toute la zone francophone.</p><p><strong>Les thèmes incluaient la digitalisation, l'inclusion financière et les défis réglementaires.</strong></p>`,
    content_en: `<p>The 48th FANAF General Assembly in Nouakchott brought together insurance professionals from across the French-speaking zone.</p>` }],
  focus: [{ title_fr: "Formation sur les nouveautés de la Loi de Finances 2024", title_en: "Training on the Finance Act 2024", img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    content_fr: `<p>L'ASAC a organisé des formations intensives pour préparer les professionnels aux nouvelles dispositions de la Loi de Finances 2024, rassemblant plus de 200 participants.</p><p><strong>La Loi de Finances 2024 introduit des modifications significatives en matière de fiscalité des contrats d'assurance.</strong></p>`,
    content_en: `<p>ASAC organized intensive training for professionals on the Finance Act 2024, with over 200 participants attending.</p>` }],
  vie: [{ title_fr: "Renforcer la gouvernance du secteur", title_en: "Strengthening sector governance", img: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80",
    content_fr: `<p>L'ASAC poursuit ses efforts pour renforcer la gouvernance des assurances au Cameroun avec de nouvelles initiatives pour la transparence et la protection des assurés.</p>`,
    content_en: `<p>ASAC continues its efforts to strengthen insurance governance in Cameroon with new transparency initiatives.</p>` }],
  bouge: [
    { title_fr: "Nouvelles nominations au sein du secteur", title_en: "New appointments in the sector", img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80",
      content_fr: `<p>Le secteur enregistre plusieurs nominations importantes reflétant le dynamisme des équipes dirigeantes.</p>`, content_en: `<p>The sector records several important appointments reflecting management dynamism.</p>` },
    { title_fr: "Lancement de nouveaux produits d'assurance vie", title_en: "Launch of new life insurance products", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
      content_fr: `<p>Plusieurs compagnies ont lancé de nouveaux produits d'assurance vie innovants.</p>`, content_en: `<p>Several companies launched innovative new life insurance products.</p>` }
  ],
  avis: [{ title_fr: "Ce que pensent vraiment les assurés", title_en: "What policyholders really think", img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80",
    content_fr: `<p>Notre enquête annuelle révèle un tableau nuancé de la perception du secteur par le grand public.</p><p><strong>Les assurés souhaitent des procédures de sinistres plus rapides et une meilleure communication.</strong></p>`,
    content_en: `<p>Our annual survey reveals a nuanced picture of public perception of the sector.</p>` }],
  metiers: [{ title_fr: "Portrait d'un actuaire : entre chiffres et stratégie", title_en: "Portrait of an actuary", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    content_fr: `<p>L'actuariat utilise les mathématiques et la théorie financière pour analyser et gérer les risques.</p><p><strong>Au Cameroun, la demande pour les actuaires qualifiés est en pleine croissance.</strong></p>`,
    content_en: `<p>Actuarial science uses mathematics and finance to manage insurance risks. Demand for qualified actuaries in Cameroon is growing rapidly.</p>` }],
  emploi: [
    { title_fr: "Responsable Actuariat — Yaoundé", title_en: "Actuarial Manager — Yaoundé", img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80",
      content_fr: `<p><strong>Compagnie d'Assurances du Cameroun</strong> · Yaoundé · CDI</p><p>Missions : modélisation des risques, provisions techniques, reporting CIMA.</p>`,
      content_en: `<p><strong>Insurance Company of Cameroon</strong> · Yaoundé · Permanent</p>` },
    { title_fr: "Chargé de Sinistres — Douala", title_en: "Claims Officer — Douala", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
      content_fr: `<p><strong>Activa Assurances</strong> · Douala · CDI</p><p>Gestion des sinistres de l'ouverture à la clôture.</p>`,
      content_en: `<p><strong>Activa Assurances</strong> · Douala · Permanent</p>` }
  ],
  fun: [{ title_fr: "Quiz : Testez vos connaissances !", title_en: "Quiz: Test your knowledge!", img: "https://images.unsplash.com/photo-1509869175650-a1d97972541a?w=800&q=80",
    content_fr: `<p>🎯 <strong>Quiz Assurance du mois</strong></p><p><strong>Q1 :</strong> Durée de prescription en assurance selon le Code CIMA ?<br>A) 1 an · B) 2 ans · C) 5 ans · D) 10 ans</p><p><em>Réponses dans le prochain numéro !</em></p>`,
    content_en: `<p>🎯 <strong>Monthly Insurance Quiz</strong></p><p><strong>Q1:</strong> Statute of limitations under CIMA Code?<br>A) 1 yr · B) 2 yrs · C) 5 yrs · D) 10 yrs</p>` }],
  membres: [
    { title_fr: "Activa Assurances", title_en: "Activa Assurances", img: "https://images.unsplash.com/photo-1560472355-536de3962603?w=800&q=80", content_fr: `<p>L'une des principales compagnies au Cameroun, produits vie et non-vie. Fondée en 1999.</p>`, content_en: `<p>One of Cameroon's leading insurers. Founded in 1999.</p>` },
    { title_fr: "Chanas Assurances", title_en: "Chanas Assurances", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80", content_fr: `<p>Reconnue pour la qualité de ses services dans les branches auto, habitation, santé et vie.</p>`, content_en: `<p>Recognized for quality service in auto, home, health and life.</p>` },
    { title_fr: "Allianz Cameroun", title_en: "Allianz Cameroun", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80", content_fr: `<p>Filiale du groupe Allianz, expertise internationale adaptée au marché local.</p>`, content_en: `<p>Part of the global Allianz group with local expertise.</p>` },
    { title_fr: "NSIA Cameroun", title_en: "NSIA Cameroun", img: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=800&q=80", content_fr: `<p>Groupe panafricain d'assurance avec des solutions innovantes pour les Camerounais.</p>`, content_en: `<p>Pan-African group with innovative solutions for Cameroonians.</p>` }
  ]
};

const CAT = {
  editorial:{ fr:"ÉDITORIAL", en:"EDITORIAL", img:"https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80" },
  actualite:{ fr:"ACTUALITÉ", en:"NEWS",      img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80" },
  evenement:{ fr:"ÉVÈNEMENT", en:"EVENT",      img:"https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80" },
  focus:    { fr:"FOCUS",     en:"FOCUS",      img:"https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80" },
  vie:      { fr:"VIE DE L'ASAC", en:"ASAC LIFE", img:"https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80" },
  bouge:    { fr:"ÇA BOUGE !",    en:"ON THE MOVE!", img:"https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80" },
  avis:     { fr:"VOTRE AVIS COMPTE", en:"YOUR OPINION MATTERS", img:"https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80" },
  metiers:  { fr:"LES MÉTIERS",    en:"INSURANCE CAREERS", img:"https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80" },
  emploi:   { fr:"EMPLOI",        en:"EMPLOYMENT", img:"https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80" },
  fun:      { fr:"INSTANT FUN",   en:"FUN TIME",   img:"https://images.unsplash.com/photo-1509869175650-a1d97972541a?w=800&q=80" },
  membres:  { fr:"MEMBRES",       en:"MEMBERS",    img:"https://images.unsplash.com/photo-1560472355-536de3962603?w=800&q=80" },
};

// ─── STATE ──────────────
let lang = 'fr';
let stack = ['home'];
const P = {
  home:     document.getElementById('homePage'),
  menu:     document.getElementById('menuPage'),
  article:  document.getElementById('articlePage'),
  category: document.getElementById('categoryPage'),
};

function render() {
  const top = stack[stack.length - 1];
  const sec = stack.length > 1 ? stack[stack.length - 2] : null;
  Object.entries(P).forEach(([k, el]) => {
    el.classList.remove('active', 'behind');
    if (k === top) el.classList.add('active');
    else if (k === sec) el.classList.add('behind');
  });

  // Show or hide the fixed top bar depending on which page is active. The
  // top bar is only visible on the home page; other pages (menu, article,
  // category) have their own navigation controls.  We also reset the
  // hamburger state when leaving the menu.
  const tb = document.getElementById('topBar');
  if (tb) {
    if (top === 'home') {
      tb.style.display = 'flex';
    } else {
      tb.style.display = 'none';
    }
  }
}

// ─── NAV ──────────────
function showHome() {
  stack = ['home'];
  document.getElementById('hamburger').classList.remove('open');
  render();
  P.home.scrollTop = 0;
}

function toggleMenu() {
  const h = document.getElementById('hamburger');
  if (stack[stack.length - 1] === 'menu') {
    stack.pop();
    h.classList.remove('open');
    resetAnim();
  } else {
    if (!stack.includes('menu')) stack.push('menu');
    h.classList.add('open');
    requestAnimationFrame(() => { P.menu.classList.add('active'); resetAnim(); });
  }
  render();
}

function resetAnim() {
  document.querySelectorAll('#menuPage .m-card').forEach(c => {
    c.style.animation = 'none'; void c.offsetHeight; c.style.animation = '';
  });
}

function openCategory(key) {
  const m = CAT[key], arts = ARTICLES[key] || [];
  document.getElementById('catPageLabel').textContent = m[lang] || m.fr;
  document.getElementById('catHeroImg').src = m.img;
  document.getElementById('catHeroText').innerHTML = '<h2>' + (m[lang] || m.fr) + '</h2>';

  const list = document.getElementById('categoryList');
  list.innerHTML = '';
  arts.forEach((a, i) => {
    const t = a['title_' + lang] || a.title_fr;
    const s = trunc(strip(a['content_' + lang] || a.content_fr), 80);
    const d = document.createElement('div');
    d.className = 'cat-item'; d.onclick = () => openArticle(key, i);
    d.innerHTML = `<div class="cat-thumb"><img src="${a.img}" alt="" loading="lazy"/></div>
      <div class="cat-info"><strong>${t}</strong><p>${s}</p></div>
      <span class="cat-arrow"><img src="arrow_red.svg" alt="→"/></span>`;
    list.appendChild(d);
  });

  if (stack[stack.length - 1] === 'menu') {
    stack[stack.length - 1] = 'category';
    document.getElementById('hamburger').classList.remove('open');
  } else { stack.push('category'); }
  render(); P.category.scrollTop = 0;
}
function closeCategory() { stack.pop(); render(); }

function openArticle(key, i) {
  const m = CAT[key], a = (ARTICLES[key] || [])[i]; if (!a) return;
  document.getElementById('articleCatLabel').textContent = m[lang] || m.fr;
  document.getElementById('articleHeroImg').src = a.img;
  document.getElementById('articleTitle').textContent = a['title_' + lang] || a.title_fr;
  document.getElementById('articleContent').innerHTML = a['content_' + lang] || a.content_fr;
  const arts = ARTICLES[key] || [];
  document.getElementById('articleNextImg').src = (arts[(i+1)%arts.length] || a).img;
  if (stack[stack.length - 1] !== 'article') stack.push('article');
  render(); P.article.scrollTop = 0;
}
function closeArticle() { stack.pop(); render(); }

// ─── LANG ──────────────
function toggleLang() {
  lang = lang === 'fr' ? 'en' : 'fr';
  document.getElementById('langFR').classList.toggle('active', lang === 'fr');
  document.getElementById('langEN').classList.toggle('active', lang === 'en');
  applyLang();
}
function applyLang() {
  document.querySelectorAll('[data-fr]').forEach(el => {
    const v = el.getAttribute('data-' + lang);
    if (v !== null) el.innerHTML = v;
  });
}

// ─── UTILS ──────────────
function strip(h) { const d = document.createElement('div'); d.innerHTML = h; return d.textContent || ''; }
function trunc(s, n) { return s.length > n ? s.slice(0, n).trimEnd() + '…' : s; }

// ─── INIT ──────────────
document.addEventListener('DOMContentLoaded', () => {
  // Apply the currently selected language to all data-* attributes.
  applyLang();
  // Render the initial page state.
  render();
  // When the home page scrolls, toggle the scrolled class on the top bar
  // to switch between transparent and white backgrounds.  The bar only
  // listens while the home page is in view; on other pages it is hidden.
  const homePage = document.getElementById('homePage');
  const topBar = document.getElementById('topBar');
  if (homePage && topBar) {
    homePage.addEventListener('scroll', () => {
      if (homePage.scrollTop > 40) {
        topBar.classList.add('scrolled');
      } else {
        topBar.classList.remove('scrolled');
      }
    });
  }
});
