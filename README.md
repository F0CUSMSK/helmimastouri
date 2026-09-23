Developer Portfolio — Abu Said

A personal portfolio built with Next.js, Tailwind CSS and React. Lightweight, animated, and easy to customize.

This repository contains the source for Abu Said's developer portfolio: a responsive site with an animated hero, projects, experience, education, skills, and a contact form that delivers messages via email and Telegram.

What you'll find here
- Tech: Next.js, React, Tailwind CSS, Sass, Lottie animations
- Contact: Server-side API routes that send email (Nodemailer) and Telegram messages
- Content: Simple JS files under `utils/data/` drive the portfolio content (projects, experience, skills, etc.)

Getting started
---------------

1. Install dependencies

```bash
npm install
```

2. Create a local env file

Create a `.env.local` at the project root and add the required environment variables (example below).

3. Run the development server

```bash
npm run dev
```

Available scripts
-----------------
- `npm run dev` — run Next.js in development mode
- `npm run build` — build for production
- `npm run start` — start the production server
- `npm run lint` — run ESLint

Environment variables
---------------------
The contact API and CAPTCHA verification rely on a few environment variables. Add these to `.env.local`:

```
EMAIL_ADDRESS=your@email.com
GMAIL_PASSKEY=your_gmail_app_password
TELEGRAM_BOT_TOKEN=123456:ABC-DEF
TELEGRAM_CHAT_ID=987654321
NEXT_PUBLIC_RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
```

Notes:
- For sending email via Gmail/Nodemailer, use an App Password (recommended) or configure OAuth. Do not commit credentials.
- The project verifies CAPTCHA server-side using `NEXT_PUBLIC_RECAPTCHA_SECRET_KEY`.

Where to edit content
---------------------
- Primary content lives under `utils/data/` — edit `personal-data.js`, `projects-data.js`, `experience.js`, `educations.js`, `skills.js`, and related files to change what's shown on the site.
- Page and component source lives in the `app/` and `components/` folders. The homepage sections are under `components/homepage/`.
- Lottie files are stored in `public/assets/lottie/` and SVGs under `app/assets/svg/`.

Contact form behavior
---------------------
- The contact route is implemented at `app/api/contact/route.js` and will:
  - send a Telegram message using `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`
  - send an email to `EMAIL_ADDRESS` using Nodemailer
  - verify reCAPTCHA via `app/api/google/route.js`

Deployment
----------
- Vercel is recommended for Next.js projects — push the repo and configure the environment variables in the Vercel dashboard.
- Make sure to set the same environment variables in your hosting platform.

Extras & tips
-------------
- Adjust animations and Lottie files in `components/helper/animation-lottie.jsx`.
- If images fail to build (Sharp-related errors), ensure your environment has the required build tools or use a Node version compatible with the installed `sharp` binary.
- Run `npm run lint` to catch stylistic issues before committing.

Need help?
-----------
If you want, I can:
- add a `.env.example` file with placeholders
- update the README with deployment steps for Vercel/GitHub Actions
- or make small content edits to `utils/data/` and preview them locally

Happy customizing — the site is intentionally simple to make editing and deploying straightforward.
