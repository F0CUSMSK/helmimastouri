// @flow strict

import Image from "next/image";
import { certifications } from "@/utils/data/certifications";
import { FaMicrosoft } from "react-icons/fa";
import { SiCisco, SiComptia, SiFortinet, SiNvidia } from "react-icons/si";

const issuerIcons = {
  Microsoft: FaMicrosoft,
  CompTIA: SiComptia,
  Cisco: SiCisco,
  Fortinet: SiFortinet,
  NVIDIA: SiNvidia,
};

// Raster logos for issuers without an icon in react-icons —
// pre-tinted to the card accent color, so no CSS color needed
const issuerImages = {
  IBM: { src: "/ibm-logo.png", width: 39, height: 14, alt: "IBM" },
};

const domainColors = {
  "Cloud": { accent: "#00E5FF", bg: "#00E5FF08", border: "#00E5FF20" },
  "Networking": { accent: "#00E5FF", bg: "#00E5FF08", border: "#00E5FF20" },
  "Security": { accent: "#10B981", bg: "#10B98108", border: "#10B98120" },
  "Offensive": { accent: "#10B981", bg: "#10B98108", border: "#10B98120" },
  "Threat Intel": { accent: "#10B981", bg: "#10B98108", border: "#10B98120" },
  "SOC / Blue Team": { accent: "#10B981", bg: "#10B98108", border: "#10B98120" },
  "AI / ML": { accent: "#fbbf24", bg: "#fbbf2408", border: "#fbbf2420" },
};

function Certifications() {
  return (
    <div id="certifications" className="relative z-50 border-t my-12 lg:my-24 border-[#1E293B]">
      <div className="w-[100px] h-[100px] bg-[#10B981] rounded-full absolute top-6 left-[42%] translate-x-1/2 filter blur-3xl opacity-10"></div>

      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-[#10B981] to-transparent w-full" />
        </div>
      </div>

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-10 sm:w-24 h-[2px] bg-[#1E293B]"></span>
          <span className="bg-[#131926] border border-[#10B98120] w-fit text-[#10B981] p-2 px-3 sm:px-5 text-base sm:text-xl rounded-md font-mono">
            Certifications
          </span>
          <span className="w-10 sm:w-24 h-[2px] bg-[#1E293B]"></span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 pt-8">
        {certifications.map((cert) => {
          const IconComponent = issuerIcons[cert.issuer];
          const image = issuerImages[cert.issuer];
          const colors = domainColors[cert.domain] || domainColors["Security"];
          const inProgress = cert.status === "in-progress";

          return (
            <div
              key={cert.id}
              className={`group relative rounded-xl border bg-[#131926]/60 backdrop-blur-sm p-4 lg:p-5 transition-all duration-500 hover:-translate-y-1 ${
                inProgress
                  ? "border-[#fbbf2425] hover:border-[#fbbf2450] hover:shadow-[0_0_25px_rgba(251,191,36,0.08)]"
                  : "border-[#1E293B] hover:border-[#10B98135] hover:shadow-[0_0_25px_rgba(16,185,129,0.08)]"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="flex items-center justify-center p-2 rounded-md transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: colors.bg, border: `1px solid ${colors.border}` }}
                >
                  {image ? (
                    <Image src={image.src} alt={image.alt} width={image.width} height={image.height} />
                  ) : (
                    <IconComponent style={{ color: colors.accent }} size={20} />
                  )}
                </div>

                {inProgress ? (
                  <span
                    className="flex items-center gap-1.5 px-2 py-1 rounded font-mono text-[9px] tracking-widest border border-[#fbbf2425] bg-[#fbbf2408] text-[#fbbf24]"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-[#fbbf24]"
                      style={{ animation: "pulseRing 2s ease-out infinite" }}
                    ></span>
                    IN PROGRESS
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 px-2 py-1 rounded font-mono text-[9px] tracking-widest border border-[#10B98125] bg-[#10B98108] text-[#10B981]">
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-[#10B981]"
                      style={{ animation: "pulseRing 3s ease-out infinite" }}
                    ></span>
                    CERTIFIED
                  </span>
                )}
              </div>

              <h3 className="text-sm font-semibold text-white font-heading leading-snug group-hover:text-[#10B981] transition-colors duration-300">
                {cert.name}
              </h3>

              <div className="flex items-center justify-between mt-3">
                <span className="font-mono text-[11px] text-gray-500">{cert.issuer}</span>
                <span
                  className="px-2 py-0.5 rounded font-mono text-[9px] tracking-wide"
                  style={{ backgroundColor: colors.bg, border: `1px solid ${colors.border}`, color: colors.accent }}
                >
                  {cert.domain}
                </span>
              </div>

              {cert.note && (
                <p className="mt-2 font-mono text-[10px] text-[#fbbf24]/80">{cert.note}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Certifications;
