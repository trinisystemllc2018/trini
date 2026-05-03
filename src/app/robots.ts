import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Standard crawlers — allow everything except API
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      // Google — full access
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/"],
      },
      // Bing — full access (critical for Bing Copilot AI answers)
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/"],
      },
      // GPTBot (ChatGPT browsing) — allow for AI citation
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/api/"],
      },
      // ClaudeBot (Anthropic) — allow for AI citation
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/api/"],
      },
      // PerplexityBot — allow for Perplexity answers
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/api/"],
      },
      // Google AI (Gemini)
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
    ],
    // Submit BOTH sitemaps for redundancy. If Next.js dynamic sitemap fails
    // to render (as Google reported in webmaster console), the static fallback
    // is served directly from /public — bulletproof.
    sitemap: [
      "https://trinisystem.vercel.app/sitemap.xml",
      "https://trinisystem.vercel.app/sitemap-static.xml",
    ],
  };
}
