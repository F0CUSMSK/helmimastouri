import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import ScrollToTop from "./components/helper/scroll-to-top";
import CyberBackground from "./components/helper/cyber-background";
import Navbar from "./components/navbar";
import "./css/card.scss";
import "./css/globals.scss";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata = {
  title: "Helmi Mastouri | Cybersecurity Engineer Portfolio",
  description:
    "Portfolio of Helmi Mastouri – Cybersecurity Engineer specialising in DevSecOps, SIEM Operations, Cloud Hardening, and Threat Detection. AZ-900 certified, actively seeking PFE internship in Europe.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans`} suppressHydrationWarning>
        <CyberBackground />
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
