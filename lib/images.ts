// Curated Unsplash imagery — warm, sunlit, editorial café/brunch direction.
// All images served via Unsplash's CDN with size & quality params.

const u = (id: string, w = 1800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const images = {
  heroInterior: u("photo-1559305616-3f99cd43e353", 2400),
  heroBrunch: u("photo-1551024601-bec78aea704b", 2200),
  archesInterior: u("photo-1525610553991-2bede1a236e2", 2000),
  flatlayBrunch: u("photo-1533089860892-a7c6f0a88666", 1800),
  coffeePour: u("photo-1495474472287-4d71bcdd2085", 1800),
  matchaWhisk: u("photo-1545665277-5937489579f2", 1600),
  croissant: u("photo-1555507036-ab1f4038808a", 1600),
  toast: u("photo-1484723091739-30a097e8f929", 1800),
  interiorWide: u("photo-1554118811-1e0d58224f24", 2400),
  detail: u("photo-1493857671505-72967e2e2760", 1600),
  candid: u("photo-1521017432531-fbd92d768814", 1800),
  pastries: u("photo-1509440159596-0249088772ff", 1800),
  espresso: u("photo-1497935586351-b67a49e012bf", 1600),
  brunchOverhead: u("photo-1493770348161-369560ae357d", 2000),
  archedDoorway: u("photo-1517959105821-eaf2591984ca", 2000),
  cafeCounter: u("photo-1554118811-1e0d58224f24", 2200),
  greenJuice: u("photo-1622597467836-f3285f2131b8", 1600),
  founder: u("photo-1556909114-f6e7ad7d3136", 1800),
  table: u("photo-1567521464027-f127ff144326", 2000),
  exterior: u("photo-1554118811-1e0d58224f24", 2400),
};
