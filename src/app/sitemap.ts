import type { MetadataRoute } from "next";
import { site } from "@/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/fleet/", "/locations/", "/about/", "/contact/"].map((path, i) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly",
    priority: i === 0 ? 1 : 0.7,
  }));
}
