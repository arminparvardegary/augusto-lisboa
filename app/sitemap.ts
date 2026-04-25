import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const base = "https://augustolisboa.com";

const paths = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/menu", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/story", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/visit", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/reserve", priority: 0.85, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routing.locales.flatMap((locale) =>
    paths.map(({ path, priority, changeFrequency }) => {
      const url = `${base}/${locale}${path === "/" ? "" : path}`;
      return {
        url,
        lastModified: now,
        changeFrequency,
        priority,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((alt) => [
              alt,
              `${base}/${alt}${path === "/" ? "" : path}`,
            ]),
          ),
        },
      };
    }),
  );
}
