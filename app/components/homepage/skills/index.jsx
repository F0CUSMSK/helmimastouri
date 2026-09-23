"use client";

import { skillCategories } from "@/utils/data/skills";
import { FaShieldAlt, FaNetworkWired } from "react-icons/fa";
import { SiElastic } from "react-icons/si";

const categoryIcons = {
  "Security & Cloud": FaShieldAlt,
  "SIEM & Monitoring": SiElastic,
  "Networking & Dev": FaNetworkWired,
};

const categoryColors = {
  "Security & Cloud": { accent: "#00E5FF", bg: "#00E5FF06", border: "#00E5FF15", hoverBorder: "#00E5FF35" },
  "SIEM & Monitoring": { accent: "#10B981", bg: "#10B98106", border: "#10B98115", hoverBorder: "#10B98135" },
  "Networking & Dev": { accent: "#00E5FF", bg: "#00E5FF06", border: "#00E5FF15", hoverBorder: "#00E5FF35" },
};

function Skills() {
  return (
    <div id="skills" className="relative z-50 border-t my-12 lg:my-24 border-[#1E293B]">
      <div className="w-[100px] h-[100px] bg-[#00E5FF] rounded-full absolute top-6 left-[42%] translate-x-1/2 filter blur-3xl opacity-10"></div>

      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent w-full" />
        </div>
      </div>

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-10 sm:w-24 h-[2px] bg-[#1E293B]"></span>
          <span className="bg-[#131926] border border-[#00E5FF20] w-fit text-[#00E5FF] p-2 px-3 sm:px-5 text-base sm:text-xl rounded-md font-mono">
            Technical Skills
          </span>
          <span className="w-10 sm:w-24 h-[2px] bg-[#1E293B]"></span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        {skillCategories.map((cat, catIdx) => {
          const colors = categoryColors[cat.category] || categoryColors["Security & Cloud"];
          const IconComponent = categoryIcons[cat.category] || FaShieldAlt;

          return (
            <div
              key={catIdx}
              className={`group rounded-xl bg-[#131926]/60 backdrop-blur-sm p-5 lg:p-6 transition-all duration-500 hover:shadow-lg hover:-translate-y-1 ${
                catIdx === skillCategories.length - 1 && skillCategories.length % 2 === 1 ? "md:col-span-2" : ""
              }`}
              style={{ border: `1px solid ${colors.border}` }}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="p-2 rounded-md transition-all duration-300"
                  style={{ backgroundColor: colors.bg, border: `1px solid ${colors.border}` }}
                >
                  <IconComponent style={{ color: colors.accent }} size={20} />
                </div>
                <h3 className="font-mono text-sm font-semibold tracking-wider uppercase" style={{ color: colors.accent }}>
                  {cat.category}
                </h3>
              </div>

              {/* Skill tags */}
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, skillIdx) => (
                  <span
                    key={skillIdx}
                    className="px-3 py-1.5 text-xs font-mono rounded-md cursor-default transition-all duration-300 hover:scale-105"
                    style={{
                      backgroundColor: colors.bg,
                      border: `1px solid ${colors.border}`,
                      color: colors.accent,
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.borderColor = colors.hoverBorder;
                      e.target.style.boxShadow = `0 0 12px ${colors.accent}15`;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.borderColor = colors.border;
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Skills;