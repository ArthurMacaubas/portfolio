import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://arthurpietro.dev/sitemap.xml", // troque pelo domínio final
  };
}
