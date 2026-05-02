import { MetadataRoute } from "next";
import { TOOLS, CATEGORIES } from "@/lib/tools";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://peaktoolshub.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    ...Object.keys(CATEGORIES).map(cat => ({
      url: `${SITE_URL}/category/${cat}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
  ];

  // Tool pages
  const toolPages: MetadataRoute.Sitemap = TOOLS.map(tool => ({
    url: `${SITE_URL}/tools/${tool.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Programmatic SEO: currency pair pages (high-traffic targets)
  // Major pairs — not just MYR, to capture global traffic
  const majorCurrencies = ["USD", "EUR", "GBP", "MYR", "SGD", "JPY", "AUD", "CAD", "CNY", "THB", "IDR", "INR"];
  const currencyPages: MetadataRoute.Sitemap = majorCurrencies.flatMap(from =>
    majorCurrencies.filter(to => to !== from).map(to => ({
      url: `${SITE_URL}/convert/${from.toLowerCase()}-to-${to.toLowerCase()}`,
      lastModified: now,
      changeFrequency: "hourly" as const,
      priority: 0.7,
    }))
  );

  return [...staticPages, ...toolPages, ...currencyPages];
}
