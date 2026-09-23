// @flow strict

import * as React from 'react';
import { FaShieldAlt } from "react-icons/fa";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

function ProjectCard({ project, index }) {

  return (
    <div className={`group relative rounded-xl border border-[#1E293B] bg-[#131926]/60 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-[#00E5FF30] hover:shadow-[0_0_30px_rgba(0,229,255,0.06)] hover:-translate-y-1`}>
      {/* Top gradient bar */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent opacity-30 group-hover:opacity-80 transition-opacity duration-500"></div>

      <div className="p-5 lg:p-6 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="p-2 rounded-md bg-[#00E5FF08] border border-[#00E5FF15] group-hover:border-[#00E5FF35] transition-all duration-300">
            <FaShieldAlt className="text-[#00E5FF]" size={20} aria-hidden="true" />
          </div>
          <span className="text-xs text-gray-600 font-mono">{project.role}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-[#00E5FF] transition-colors duration-300 font-heading">
          {project.name}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tools.map((tag, i) => (
            <span
              key={i}
              className="px-2.5 py-1 text-[10px] font-mono rounded-md bg-[#10B98108] border border-[#10B98115] text-[#10B981] hover:bg-[#10B98112] hover:border-[#10B98130] transition-all duration-300 cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links — render only when the project defines them */}
        {(project.code || project.demo) && (
          <div className="mt-auto flex items-center gap-3 pt-2 border-t border-[#1E293B]/60">
            {project.code && (
              <a
                href={project.code}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-[#00E5FF] transition-colors duration-300"
              >
                <FaGithub size={14} aria-hidden="true" />
                <span>Source</span>
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-[#10B981] transition-colors duration-300"
              >
                <FaExternalLinkAlt size={12} aria-hidden="true" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;