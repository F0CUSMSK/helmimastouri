// next/image with `unoptimized: true` passes the src through untouched,
// so public assets need the basePath prefix applied manually for GitHub
// Pages project-site deploys. Baked in at build time from the same env var
// next.config.js reads (NEXT_PUBLIC_BASE_PATH).
export const withBasePath = (p) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${p}`;
