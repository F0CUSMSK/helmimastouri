// next/image with `unoptimized: true` passes the src through untouched,
// so public assets need the basePath prefix applied manually for GitHub
// Pages project-site deploys. We import directly from next.config.js so
// the prefix always stays in sync with the config.
const { basePath } = require('../next.config');

export const withBasePath = (p) => `${basePath}${p}`;
