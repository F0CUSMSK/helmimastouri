// @flow strict

import { personalData } from "@/utils/data/personal-data";
import Link from "next/link";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import Terminal from "./terminal";
import CvButton from "./cv-button";

function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-between py-8 lg:py-16 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-40 -z-10"></div>

      {/* Floating particles */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-[#00E5FF] rounded-full opacity-20" style={{ animation: 'float 6s ease-in-out infinite' }}></div>
      <div className="absolute top-40 right-20 w-1 h-1 bg-[#10B981] rounded-full opacity-30" style={{ animation: 'float 8s ease-in-out infinite 1s' }}></div>
      <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-[#00E5FF] rounded-full opacity-15" style={{ animation: 'float 7s ease-in-out infinite 2s' }}></div>
      <div className="absolute top-60 right-1/3 w-1 h-1 bg-[#10B981] rounded-full opacity-20" style={{ animation: 'float 9s ease-in-out infinite 0.5s' }}></div>

      <div className="grid grid-cols-1 items-start lg:grid-cols-2 lg:gap-12 gap-y-8 w-full">
        <div className="order-2 lg:order-1 flex flex-col items-start justify-center p-2 pb-20 md:pb-10 lg:pt-10">
          {/* Status indicator */}
          <div className="flex items-center gap-2.5 mb-6 animate-fade-in-up">
            <div className="w-2.5 h-2.5 bg-[#10B981] rounded-full" style={{ animation: 'pulseRing 2s ease-out infinite' }}></div>
            <span className="text-[#10B981] font-mono text-xs tracking-widest uppercase">Available for PFE Internship</span>
          </div>

          <h1 className="font-heading text-3xl font-bold leading-10 text-white md:font-extrabold lg:text-[2.6rem] lg:leading-[3.5rem] animate-fade-in-up stagger-1">
            Hello, <br />
            {"I'm "}
            <span className="text-[#00E5FF] text-glow-cyan">{personalData.name}</span>
            <br />
            <span className="text-[#00E5FF]">{personalData.designation}</span>
          </h1>

          <p className="mt-6 text-gray-400 text-sm lg:text-base leading-relaxed animate-fade-in-up stagger-2">
            Specialising in <span className="text-[#00E5FF] font-medium">DevSecOps</span>, <span className="text-[#00E5FF] font-medium">SIEM Operations</span>, <span className="text-[#00E5FF] font-medium">Cloud Hardening</span>, and <span className="text-[#00E5FF] font-medium">Threat Detection</span>. Actively seeking a PFE internship (SOC Analyst or DevSecOps) in Europe for early 2027.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3 animate-fade-in-up stagger-3">
            {/* Primary CTA — solid Cyber Cyan */}
            <Link
              href={`mailto:${personalData.email}`}
              className="group flex items-center gap-2 px-6 py-3 bg-[#00E5FF] rounded-lg text-[#0B0F17] font-mono text-sm font-bold tracking-wider uppercase hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-all duration-300 hover:scale-[1.02]"
            >
              <MdEmail size={18} />
              <span>Contact Me</span>
            </Link>

            {/* CV download — hover or click to reveal FR/EN */}
            <CvButton />

            {/* Secondary — glass outline */}
            <Link
              href={personalData.github}
              target="_blank"
              className="group flex items-center gap-2 px-5 py-3 bg-transparent border border-[#1E293B] rounded-lg text-gray-300 font-mono text-sm tracking-wider uppercase hover:border-[#00E5FF] hover:text-[#00E5FF] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,229,255,0.15)] backdrop-blur-sm"
            >
              <BsGithub size={18} />
              <span>View GitHub</span>
            </Link>

            <Link
              href={personalData.linkedIn}
              target="_blank"
              className="group flex items-center gap-2 px-5 py-3 bg-transparent border border-[#1E293B] rounded-lg text-gray-300 font-mono text-sm tracking-wider uppercase hover:border-[#00E5FF] hover:text-[#00E5FF] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,229,255,0.15)] backdrop-blur-sm"
            >
              <BsLinkedin size={18} />
              <span>LinkedIn</span>
            </Link>
          </div>
        </div>

        {/* ═══ INTERACTIVE TERMINAL WINDOW ═══ */}
        <div className="order-1 lg:order-2 relative animate-fade-in-up stagger-2">
          <div className="rounded-xl" style={{ animation: 'borderGlow 4s ease-in-out infinite' }}>
            <Terminal />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;