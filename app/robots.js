// Required for `output: 'export'`: robots.js compiles to a route handler,
// and static export only emits route handlers marked as fully static.
export const dynamic = "force-static";

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
