// Required for `output: 'export'`: sitemap.js compiles to a route handler,
// and static export only emits route handlers marked as fully static.
export const dynamic = "force-static";

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export default function sitemap() {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
