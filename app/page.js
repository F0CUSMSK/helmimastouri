import { personalData } from "@/utils/data/personal-data";
import AboutSection from "./components/homepage/about";
import Certifications from "./components/homepage/certifications";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";
import Reveal from "./components/helper/reveal";

// Structured data so search engines render a rich Person result
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Helmi Mastouri",
  jobTitle: "Cybersecurity Engineer",
  description:
    "Cybersecurity Engineering student specialising in DevSecOps, SIEM Operations, Cloud Hardening, and Threat Detection.",
  email: `mailto:${personalData.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sousse",
    addressCountry: "TN",
  },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "EPI Digital School" },
    { "@type": "CollegeOrUniversity", name: "ISIMA Mahdia" },
  ],
  knowsAbout: [
    "DevSecOps",
    "SIEM",
    "Azure",
    "Threat Detection",
    "Network Security",
    "Python",
  ],
  sameAs: [personalData.github, personalData.linkedIn],
};

export default async function Home() {
  return (
    <div suppressHydrationWarning>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <HeroSection />
      <Reveal>
        <AboutSection />
      </Reveal>
      <Reveal>
        <Experience />
      </Reveal>
      <Reveal>
        <Projects />
      </Reveal>
      <Reveal>
        <Skills />
      </Reveal>
      <Reveal>
        <Certifications />
      </Reveal>
      <Reveal>
        <Education />
      </Reveal>
      <Reveal>
        <ContactSection />
      </Reveal>
    </div>
  )
};
