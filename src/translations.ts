const TRANSLATIONS: { [key: string]: { [key: string]: string } } = {
  graphicTypeOverview: {
    de: "Übersicht",
    en: "Overview",
  },
  graphicTypeSingle: {
    de: "Spiel",
    en: "Game",
  },
  selectGame: {
    de: "Spiel Auswählen",
    en: "Select Game",
  },
  selectPhoto: {
    de: "Foto Auswählen",
    en: "Select Photo",
  },
  downloadImage: {
    de: "Bild Herunterladen",
    en: "Download Image",
  },
  uploadPhoto: {
    de: "Foto Hochladen",
    en: "Upload Photo",
  },
};

export function getLang() {
  if (navigator.languages != undefined) {
    return navigator.languages[0].split("-")?.[0];
  }

  return navigator.language.split("-")?.[0];
}

const defaultLocale = "en";
const locale = getLang() || defaultLocale;

export function i18n(id: string) {
  if (TRANSLATIONS?.[id]?.[locale]) {
    return TRANSLATIONS?.[id]?.[locale];
  }

  if (TRANSLATIONS?.[id]?.[defaultLocale]) {
    return TRANSLATIONS?.[id]?.[defaultLocale];
  }

  return id;
}
