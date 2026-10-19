import type { MetadataRoute } from "next";
import { solutions } from "../data/solutions";
import { industries } from "../data/industries";
import { brands } from "../data/brands";
import { siteConfig } from "../data/siteConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.siteUrl;

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/book`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  const solutionPages: MetadataRoute.Sitemap = solutions.map((s) => ({
    url: `${baseUrl}/solutions/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const industryPages: MetadataRoute.Sitemap = industries.map((ind) => ({
    url: `${baseUrl}/for/${ind.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const brandPages: MetadataRoute.Sitemap = brands.map((b) => ({
    url: `${baseUrl}/work/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // Note: /thank-you is deliberately excluded from the sitemap.
  return [...staticPages, ...solutionPages, ...industryPages, ...brandPages];
}
