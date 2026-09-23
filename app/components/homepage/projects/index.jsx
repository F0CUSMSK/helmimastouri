import { personalData } from '@/utils/data/personal-data';
import { projectsData } from '@/utils/data/projects-data';
import { FaGithub } from 'react-icons/fa';
import ProjectCard from './project-card';

const Projects = () => {

  return (
    <div id='projects' className="relative z-50 my-12 lg:my-24 border-t border-[#1E293B]">
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
            Key Projects
          </span>
          <span className="w-10 sm:w-24 h-[2px] bg-[#1E293B]"></span>
        </div>
      </div>

      <div className="pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectsData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <a
            href={personalData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 px-6 py-3 bg-transparent border border-[#1E293B] rounded-lg text-gray-300 font-mono text-sm tracking-wider uppercase transition-all duration-300 hover:border-[#00E5FF] hover:text-[#00E5FF] hover:shadow-[0_0_20px_rgba(0,229,255,0.15)]"
          >
            <FaGithub size={18} aria-hidden="true" />
            <span>More on GitHub</span>
            <span className="text-[#00E5FF] transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Projects;