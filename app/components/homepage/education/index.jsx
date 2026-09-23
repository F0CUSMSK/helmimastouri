// @flow strict
import { educations } from "@/utils/data/educations";
import { FaGraduationCap } from "react-icons/fa";
import GlowCard from "../../helper/glow-card";

function Education() {
  return (
    <div id="education" className="relative z-50 border-t my-12 lg:my-24 border-[#1E293B]">
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
            Education
          </span>
          <span className="w-10 sm:w-24 h-[2px] bg-[#1E293B]"></span>
        </div>
      </div>

      <div className="py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col gap-6">
            {
              educations.map(education => (
                <GlowCard key={education.id} identifier={`education-${education.id}`}>
                  <div className="p-4 lg:p-6 relative text-white">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs sm:text-sm text-[#00E5FF] font-mono tracking-wider">
                        {education.duration}
                      </span>
                      <div className="text-[#10B981] transition-all duration-300 hover:scale-110">
                        <FaGraduationCap size={24} />
                      </div>
                    </div>
                    <h3 className="text-base sm:text-xl mb-1 font-semibold text-white font-heading">
                      {education.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-400 font-mono">
                      {education.institution}
                    </p>
                  </div>
                </GlowCard>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;