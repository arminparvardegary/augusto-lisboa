// Single source of truth for site copy, hours, contact, and press.
// Owner-supplied values must replace anything marked TODO.

export const site = {
  brand: {
    name: "Augusto Lisboa",
    tagline: "Better food, better mood.",
    est: "2021",
    location: "Belém, Lisboa",
    instagramHandle: "@augustolisboapt",
    instagramUrl: "https://instagram.com/augustolisboapt",
  },

  contact: {
    address: {
      street: "Rua de Belém",
      postal: "1300-085",
      city: "Lisboa",
      country: "Portugal",
    },
    email: "ola@augustolisboa.pt", // TODO: confirm with owner
    phone: null as string | null, // TODO: get the real number from owner
    mapsUrl: "https://maps.google.com/?q=Augusto+Lisboa+Bel%C3%A9m",
    mapsEmbedSrc:
      "https://www.google.com/maps?q=Augusto+Lisboa+Bel%C3%A9m&output=embed",
  },

  hours: [
    { days: "Monday — Tuesday", time: "10:00 — 15:30" },
    { days: "Wednesday", time: "Closed" },
    { days: "Thursday — Friday", time: "10:00 — 15:30" },
    { days: "Saturday — Sunday", time: "09:30 — 16:00" },
  ],
  hoursShort: "Mon–Fri 10:00–15:30 · Weekends 09:30–16:00 · Closed Wed",

  hero: {
    headline: "A slower",
    scriptWord: "morning",
    tail: "in Belém.",
    cta: "Begin the day",
  },

  story: {
    intro:
      "Augusto started as a small idea between friends — a corner of Belém where the coffee is taken seriously, the eggs come from a farm we trust, and the avocado is always perfectly ripe. Four years on, it's still the same long table, the same playlist, and the same morning light pouring through the arches.",
    heading:
      "Augusto is a sunlit room on Rua de Belém — slow brunches, careful coffee, and a kitchen that treats every plate as a small, generous gesture.",
  },

  // Only verified press — see owner review.
  press: [
    { name: "Tripadvisor 2025", note: "Travelers' Choice" },
    { name: "Time Out Lisboa", note: "Featured: Brunch in Belém" },
    { name: "Visit Lisboa", note: "Recommended cafés" },
    { name: "@augustolisboapt", note: "Instagram" },
  ],

  signatureCards: [
    { title: "Flat White", subtitle: "Coffee", imageKey: "flatWhite" as const },
    { title: "Avocado Toast", subtitle: "Brunch", imageKey: "avocadoToast" as const },
    { title: "Iced Matcha", subtitle: "Drinks", imageKey: "matchaLatte" as const },
    { title: "Pastel de Nata", subtitle: "Pastry", imageKey: "pastelDeNata" as const },
    { title: "Garden Bowl", subtitle: "Plates", imageKey: "gardenBowl" as const },
  ],
};
