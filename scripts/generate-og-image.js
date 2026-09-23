// One-off generator for public/og.png (1200×630 Open Graph card).
// Re-run with: node scripts/generate-og-image.js
const sharp = require("sharp");

const W = 1200;
const H = 630;

// Escape text for XML
const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const name = "HELMI MASTOURI";
const role = "Cybersecurity Engineer";
const tagline =
  "DevSecOps · SIEM Operations · Cloud Hardening · Threat Detection";
const status = "OPEN TO PFE INTERNSHIP — EUROPE 2027";
const prompt = "helmi@sec-ops:~$ whoami";

const svg = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0B0F17"/>
      <stop offset="1" stop-color="#101827"/>
    </linearGradient>
    <linearGradient id="line" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#00E5FF" stop-opacity="0"/>
      <stop offset="0.5" stop-color="#00E5FF"/>
      <stop offset="1" stop-color="#00E5FF" stop-opacity="0"/>
    </linearGradient>
    <pattern id="grid" width="44" height="44" patternUnits="userSpaceOnUse">
      <path d="M 44 0 L 0 0 0 44" fill="none" stroke="#00E5FF" stroke-opacity="0.06" stroke-width="1"/>
    </pattern>
    <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="10" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>

  <!-- Radial accents -->
  <circle cx="1050" cy="80" r="260" fill="#00E5FF" opacity="0.07"/>
  <circle cx="120" cy="580" r="220" fill="#10B981" opacity="0.06"/>

  <!-- HUD corner brackets -->
  <g stroke="#00E5FF" stroke-width="4" fill="none" opacity="0.85">
    <path d="M 36 76 L 36 36 L 76 36"/>
    <path d="M ${W - 36} 76 L ${W - 36} 36 L ${W - 76} 36"/>
  </g>
  <g stroke="#10B981" stroke-width="4" fill="none" opacity="0.85">
    <path d="M 36 ${H - 76} L 36 ${H - 36} L 76 ${H - 36}"/>
    <path d="M ${W - 36} ${H - 76} L ${W - 36} ${H - 36} L ${W - 76} ${H - 36}"/>
  </g>

  <!-- Terminal prompt -->
  <text x="84" y="170" font-family="Consolas, 'Courier New', monospace" font-size="26" fill="#10B981">${esc(prompt)}</text>

  <!-- Name -->
  <text x="84" y="290" font-family="'Segoe UI', Arial, sans-serif" font-size="88" font-weight="800" fill="#FFFFFF" letter-spacing="2">${esc(name)}</text>

  <!-- Role -->
  <text x="84" y="368" font-family="Consolas, 'Courier New', monospace" font-size="46" fill="#00E5FF" filter="url(#glow)">${esc(role)}</text>

  <!-- Divider -->
  <rect x="84" y="416" width="1032" height="2" fill="url(#line)"/>

  <!-- Tagline -->
  <text x="84" y="486" font-family="'Segoe UI', Arial, sans-serif" font-size="28" fill="#94A3B8">${esc(tagline)}</text>

  <!-- Status badge -->
  <rect x="84" y="528" width="596" height="46" rx="8" fill="#10B981" fill-opacity="0.1" stroke="#10B981" stroke-opacity="0.5"/>
  <circle cx="116" cy="551" r="7" fill="#10B981"/>
  <text x="138" y="559" font-family="Consolas, 'Courier New', monospace" font-size="21" fill="#10B981" letter-spacing="3">${esc(status)}</text>

  <!-- Site -->
  <text x="${W - 84}" y="559" text-anchor="end" font-family="Consolas, 'Courier New', monospace" font-size="22" fill="#64748B">&gt;_ helmimastouri.dev</text>
</svg>`;

sharp(Buffer.from(svg))
  .png()
  .toFile("public/og.png")
  .then((info) => console.log("Wrote public/og.png", info))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
