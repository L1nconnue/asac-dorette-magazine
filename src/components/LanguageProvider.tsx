"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Language = "en" | "fr";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: keyof typeof translations.en) => string;
};

const translations = {
  en: {
    back: "Back",
    billboards: "Billboards",
    printers: "Printers",
    tvRadio: "TV & Radio",
    magazines: "Magazines",
    live: "Live",
    sample: "Sample",
    preview: "Preview",
    verifiedStructures: "verified structures",
    shops: "shops",
    stations: "stations",
    placeholder: "placeholder",
    open: "Open",
    privatePreview: "Private preview",
    doNotShare: "Do not share outside the team",
    intro: "A curated guide to verified media opportunities in Cameroon.",
    menu: "Menu",
    close: "Close",
    signOut: "Sign out",
    language: "Language",
    refresh: "Refresh",
    syncing: "Syncing...",
    search: "Search",
    searchPrinters: "Search printers and filters",
    searchTvRadio: "Search TV & Radio and filters",
    searchMagazines: "Search magazines and filters",
    filters: "Filters",
    showFilters: "Show filters",
    hideFilters: "Hide filters",
    showBillboards: "Show billboards",
    clearFilters: "Clear filters",
    nothingMatches: "Nothing matches that search. Clear the filters to see everything.",
    resultsOf: "of",
    call: "Call",
    services: "Services",
    city: "City",
    placeholderNotice: "Placeholder listings. These records are examples for layout review, not verified inventory.",
    comingSoon: "Coming soon",
    arrondissement: "Arrondissement",
    availability: "Availability",
    format: "Format",
    owner: "Régie / owner",
    condition: "Condition",
    lights: "Lights",
    faces: "Faces",
    reset: "Reset",
    selected: "selected",
  },
  fr: {
    back: "Retour",
    billboards: "Panneaux",
    printers: "Imprimeurs",
    tvRadio: "TV & Radio",
    magazines: "Magazines",
    live: "En direct",
    sample: "Exemple",
    preview: "Aperçu",
    verifiedStructures: "structures vérifiées",
    shops: "prestataires",
    stations: "stations",
    placeholder: "exemple",
    open: "Ouvrir",
    privatePreview: "Aperçu privé",
    doNotShare: "Ne pas partager hors équipe",
    intro: "Un guide sélectif des opportunités média vérifiées au Cameroun.",
    menu: "Menu",
    close: "Fermer",
    signOut: "Déconnexion",
    language: "Langue",
    refresh: "Actualiser",
    syncing: "Synchronisation...",
    search: "Rechercher",
    searchPrinters: "Recherche et filtres imprimeurs",
    searchTvRadio: "Recherche et filtres TV & Radio",
    searchMagazines: "Recherche et filtres magazines",
    filters: "Filtres",
    showFilters: "Afficher les filtres",
    hideFilters: "Masquer les filtres",
    showBillboards: "Afficher les panneaux",
    clearFilters: "Effacer les filtres",
    nothingMatches: "Aucun résultat ne correspond. Effacez les filtres pour tout voir.",
    resultsOf: "sur",
    call: "Appeler",
    services: "Services",
    city: "Ville",
    placeholderNotice: "Fiches exemples pour valider la mise en page. Elles ne sont pas encore un inventaire vérifié.",
    comingSoon: "Bientôt",
    arrondissement: "Arrondissement",
    availability: "Disponibilité",
    format: "Format",
    owner: "Régie / propriétaire",
    condition: "État",
    lights: "Éclairage",
    faces: "Faces",
    reset: "Réinitialiser",
    selected: "sélectionné",
  },
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("tmg-language");
    if (stored === "fr" || stored === "en") setLanguageState(stored);
  }, []);

  const setLanguage = (next: Language) => {
    setLanguageState(next);
    window.localStorage.setItem("tmg-language", next);
    document.documentElement.lang = next;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      t: (key) => translations[language][key],
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
