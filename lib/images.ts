// Verified Unsplash imagery — warm, sunlit, café/brunch direction.
// IMPORTANT: These are placeholders until real Augusto photos are supplied.
// Each ID has been visually verified to match its label and to NOT contain
// competitor branding (Stir Coffee Co., BROEI, etc. were removed).

const u = (id: string, w = 1800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const images = {
  heroInterior: u("photo-1517248135467-4c7edcad34c4", 2400),
  archesInterior: u("photo-1525610553991-2bede1a236e2", 2000),
  interiorWide: u("photo-1517248135467-4c7edcad34c4", 2400),
  cafeCounter: u("photo-1517248135467-4c7edcad34c4", 2200),
  exterior: u("photo-1559925393-8be0ec4767c8", 2400),
  archedDoorway: u("photo-1517959105821-eaf2591984ca", 2000),

  flatWhite: u("photo-1497636577773-f1231844b336", 1800),
  coffeePour: u("photo-1495474472287-4d71bcdd2085", 1800),
  espresso: u("photo-1485808191679-5f86510681a2", 1600),
  matchaLatte: u("photo-1515823064-d6e0c04616a7", 1600),

  avocadoToast: u("photo-1588137378633-dea1336ce1e2", 1800),
  croissant: u("photo-1555507036-ab1f4038808a", 1600),
  pastries: u("photo-1509440159596-0249088772ff", 1800),
  pastelDeNata: u("photo-1509440159596-0249088772ff", 1600),

  brunchOverhead: u("photo-1493770348161-369560ae357d", 2000),
  flatlayBrunch: u("photo-1533089860892-a7c6f0a88666", 1800),
  gardenBowl: u("photo-1533089860892-a7c6f0a88666", 1800),

  detail: u("photo-1493857671505-72967e2e2760", 1600),
  greenJuice: u("photo-1622597467836-f3285f2131b8", 1600),
  founder: u("photo-1556909114-f6e7ad7d3136", 1800),
  table: u("photo-1567521464027-f127ff144326", 2000),

  // Legacy aliases (still referenced in places — kept for back-compat)
  toast: u("photo-1588137378633-dea1336ce1e2", 1800),
  matchaWhisk: u("photo-1515823064-d6e0c04616a7", 1600),
};
