import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import ScrollToTop from "./components/helper/scroll-to-top";
import ScrollProgress from "./components/helper/scroll-progress";
import CyberBackground from "./components/helper/cyber-background";
import Navbar from "./components/navbar";
import "./css/card.scss";
import "./css/globals.scss";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

// Set NEXT_PUBLIC_APP_URL in production (e.g. https://your-domain.com) so
// canonical, sitemap and social-card URLs resolve to absolute URLs.
const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Helmi Mastouri | Cybersecurity Engineer Portfolio",
  description:
    "Portfolio of Helmi Mastouri – Cybersecurity Engineer specialising in DevSecOps, SIEM Operations, Cloud Hardening, and Threat Detection. AZ-900 certified, actively seeking PFE internship in Europe.",
  keywords: [
    "Helmi Mastouri",
    "Cybersecurity Engineer",
    "DevSecOps",
    "SIEM",
    "SOC Analyst",
    "Azure",
    "Threat Detection",
    "Tunisia",
    "PFE internship",
  ],
  authors: [{ name: "Helmi Mastouri" }],
  creator: "Helmi Mastouri",
  openGraph: {
    title: "Helmi Mastouri | Cybersecurity Engineer",
    description:
      "DevSecOps · SIEM Operations · Cloud Hardening · Threat Detection. AZ-900 certified — open to PFE internships in Europe.",
    url: "/",
    siteName: "Helmi Mastouri — Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Helmi Mastouri — Cybersecurity Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Helmi Mastouri | Cybersecurity Engineer",
    description:
      "DevSecOps · SIEM Operations · Cloud Hardening · Threat Detection.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans`} suppressHydrationWarning>
        <CyberBackground />
        <ScrollProgress />
        <ToastContainer />
        <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
          <Navbar />
          {children}
          <ScrollToTop />
        </main>
        <Footer />
      </body>
    </html>
  );
}
