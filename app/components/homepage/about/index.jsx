// @flow strict

import Image from "next/image";
import { personalData } from "@/utils/data/personal-data";
import { RiShieldCheckFill } from "react-icons/ri";
import { FaUserShield, FaCloud } from "react-icons/fa";

function AboutSection() {
  return (
    <div id="about" className="my-12 lg:my-16 relative">
      <div className="hidden lg:flex flex-col items-center absolute top-16 -right-8">
        <span className="bg-[#131926] border border-[#00E5FF20] w-fit text-[#00E5FF] rotate-90 p-2 px-5 text-xl rounded-md font-mono">
          ABOUT_ME
        </span>
        <span className="h-36 w-[2px] bg-gradient-to-b from-[#00E5FF] to-transparent"></span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        <div className="order-2 lg:order-1">
          <p className="font-mono mb-5 text-[#00E5FF] text-xl uppercase tracking-widest">
            &gt; whoami
          </p>
          <p className="text-gray-300 text-sm lg:text-base leading-relaxed mb-6">
            {personalData.description}
          </p>

          {/* Key highlights */}
          <div className="space-y-4 mt-6">
            <div className="flex items-start gap-3 group">
              <div className="mt-1 p-2 rounded-md bg-[#00E5FF08] border border-[#00E5FF15] group-hover:border-[#00E5FF40] transition-all duration-300">
                <FaUserShield className="text-[#00E5FF]" size={18} />
              </div>
              <div>
                <p className="text-white font-medium text-sm">Cybersecurity Engineering Student</p>
                <p className="text-gray-500 text-xs mt-1">EPI Digital School — Graduating Jun 2027</p>
              </div>
            </div>
            <div className="flex items-start gap-3 group">
              <div className="mt-1 p-2 rounded-md bg-[#10B98108] border border-[#10B98115] group-hover:border-[#10B98140] transition-all duration-300">
                <FaCloud className="text-[#10B981]" size={18} />
              </div>
              <div>
                <p className="text-white font-medium text-sm">AZ-900 Certified</p>
                <p className="text-gray-500 text-xs mt-1">CompTIA Security+ SY0-701 expected Dec 2026</p>
              </div>
            </div>
            <div className="flex items-start gap-3 group">
              <div className="mt-1 p-2 rounded-md bg-[#00E5FF08] border border-[#00E5FF15] group-hover:border-[#00E5FF40] transition-all duration-300">
                <RiShieldCheckFill className="text-[#00E5FF]" size={18} />
              </div>
              <div>
                <p className="text-white font-medium text-sm">Shift-Left Security Advocate</p>
                <p className="text-gray-500 text-xs mt-1">SIEM operations · Vulnerability management · CI/CD security</p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile photo — HUD frame */}
        <div className="flex justify-center order-1 lg:order-2">
          <div className="relative w-full max-w-xs sm:max-w-sm">
            {/* HUD corner brackets */}
            <div className="absolute -top-2.5 -left-2.5 w-9 h-9 border-t-[3px] border-l-[3px] border-[#00E5FF] z-10"></div>
            <div className="absolute -top-2.5 -right-2.5 w-9 h-9 border-t-[3px] border-r-[3px] border-[#00E5FF] z-10"></div>
            <div className="absolute -bottom-2.5 -left-2.5 w-9 h-9 border-b-[3px] border-l-[3px] border-[#10B981] z-10"></div>
            <div className="absolute -bottom-2.5 -right-2.5 w-9 h-9 border-b-[3px] border-r-[3px] border-[#10B981] z-10"></div>

            <div
              className="group relative rounded-xl overflow-hidden border border-[#1E293B] bg-[#131926] transition-all duration-500 hover:shadow-[0_0_35px_rgba(0,229,255,0.12)]"
              style={{ animation: 'borderGlow 4s ease-in-out infinite' }}
            >
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src={personalData.profile}
                  alt="Portrait of Helmi Mastouri"
                  fill
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  className="object-cover grayscale-[35%] contrast-[1.05] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-[1.03]"
                />
                {/* Scanline overlay */}
                <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,rgba(11,15,23,0.25)_0px,rgba(11,15,23,0.25)_1px,transparent_1px,transparent_3px)] opacity-60 group-hover:opacity-15 transition-opacity duration-500"></div>
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0B0F17]/90 via-transparent to-transparent"></div>
                <div className="absolute top-3 left-3 px-2 py-1 rounded bg-[#0B0F17]/80 backdrop-blur-sm border border-[#00E5FF30] font-mono text-[9px] tracking-[0.2em] text-[#00E5FF]">
                  SUBJECT: HELMI_M
                </div>
              </div>
              {/* Status bar */}
              <div className="relative flex items-center gap-2 px-4 py-2.5 bg-[#0d1117] border-t border-[#1E293B]">
                <span
                  className="w-2 h-2 rounded-full bg-[#10B981] flex-shrink-0"
                  style={{ animation: 'pulseRing 2s ease-out infinite' }}
                ></span>
                <span className="font-mono text-[10px] tracking-[0.15em] text-[#10B981]">IDENTITY&nbsp;VERIFIED</span>
                <span className="ml-auto font-mono text-[10px] text-gray-600">AUTH-204</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;