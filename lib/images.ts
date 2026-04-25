// Local image manifest — all files live in /public/images/
// Organised by section so the owner / admin can swap individual assets.
// When real Augusto photos arrive, replace the file at the same path
// and the whole site picks it up automatically.

const hero = "/images/hero";
const brand = "/images/brand";
const story = "/images/story";
const menu = "/images/menu";
const space = "/images/space";
const press = "/images/press";
const visit = "/images/visit";

export const images = {
  // Hero & brand
  heroInterior: `${hero}/01-hero-interior.jpg`,
  heroMobile: `${hero}/02-hero-mobile.jpg`,
  monogramBg: `${brand}/03-brand-monogram-bg.jpg`,

  // Story
  storyCounter: `${story}/04-story-counter.jpg`,
  storyBanquette: `${story}/05-story-banquette.jpg`,
  storyDetail: `${story}/06-story-detail.jpg`,

  // Menu
  flatWhite: `${menu}/07-menu-flatwhite.jpg`,
  avocadoToast: `${menu}/08-menu-avocadotoast.jpg`,
  matchaLatte: `${menu}/09-menu-matcha.jpg`,
  pastelDeNata: `${menu}/10-menu-pastel-de-nata.jpg`,
  gardenBowl: `${menu}/11-menu-garden-bowl.jpg`,
  croissant: `${menu}/12-menu-croissant.jpg`,

  // Space
  spaceBar: `${space}/13-space-bar.jpg`,
  spaceTable: `${space}/14-space-table.jpg`,
  spaceArches: `${space}/15-space-arches.jpg`,
  spaceWindow: `${space}/16-space-window.jpg`,

  // Press
  pressPortrait: `${press}/17-press-portrait.jpg`,

  // Visit
  exterior: `${visit}/18-visit-exterior.jpg`,

  // Legacy aliases — keep the old keys pointing at the most sensible new file
  // so existing page code continues to work until we refactor call sites.
  archesInterior: `${space}/15-space-arches.jpg`,
  interiorWide: `${space}/13-space-bar.jpg`,
  cafeCounter: `${story}/04-story-counter.jpg`,
  archedDoorway: `${space}/15-space-arches.jpg`,
  coffeePour: `${menu}/07-menu-flatwhite.jpg`,
  espresso: `${menu}/07-menu-flatwhite.jpg`,
  toast: `${menu}/08-menu-avocadotoast.jpg`,
  matchaWhisk: `${menu}/09-menu-matcha.jpg`,
  pastries: `${menu}/12-menu-croissant.jpg`,
  brunchOverhead: `${menu}/11-menu-garden-bowl.jpg`,
  flatlayBrunch: `${menu}/11-menu-garden-bowl.jpg`,
  detail: `${story}/06-story-detail.jpg`,
  greenJuice: `${menu}/11-menu-garden-bowl.jpg`,
  founder: `${press}/17-press-portrait.jpg`,
  table: `${space}/14-space-table.jpg`,
};
