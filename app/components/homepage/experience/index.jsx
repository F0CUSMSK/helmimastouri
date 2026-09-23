// @flow strict

import { experiences } from "@/utils/data/experience";
import { BsShieldLock } from "react-icons/bs";
import GlowCard from "../../helper/glow-card";

function Experience() {
  return (
    <div id="experience" className="relative z-50 border-t my-12 lg:my-24 border-[#1E293B]">
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
            Experience
          </span>
          <span className="w-10 sm:w-24 h-[2px] bg-[#1E293B]"></span>
        </div>
      </div>

      <div className="py-8">
        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#00E5FF] via-[#10B981] to-transparent"></div>

          <div className="flex flex-col gap-8">
            {experiences.map(experience => (
              <div key={experience.id} className="relative pl-12 md:pl-20">
                {/* Timeline dot */}
                <div className="absolute left-[9px] md:left-[25px] top-4 w-[14px] h-[14px] rounded-full bg-[#0B0F17] border-2 border-[#00E5FF]" style={{ animation: 'pulseRing 3s ease-out infinite' }}></div>

                <GlowCard identifier={`experience-${experience.id}`}>
                  <div className="p-4 lg:p-6 relative">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs sm:text-sm text-[#10B981] font-mono tracking-wider">
                        {experience.duration}
                      </span>
                      <div className="text-[#00E5FF] transition-all duration-300 hover:scale-110">
                        <BsShieldLock size={24} />
                      </div>
                    </div>
                    <h3 className="text-base sm:text-xl mb-1 font-semibold text-white font-heading">
                      {experience.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#00E5FF] font-mono mb-3">
                      {experience.company}
                    </p>
                    {experience.bullets && (
                      <ul className="space-y-2 mt-3">
                        {experience.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-400 text-xs sm:text-sm">
                            <span className="text-[#10B981] mt-1 flex-shrink-0">▹</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </GlowCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;