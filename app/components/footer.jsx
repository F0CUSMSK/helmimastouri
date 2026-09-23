// @flow strict
import Link from 'next/link';
import { personalData } from '@/utils/data/personal-data';
import { BsGithub, BsLinkedin } from "react-icons/bs";

function Footer() {
  return (
    <div className="relative border-t bg-[#0B0F17] border-[#1E293B] text-white">
      <div className="mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] py-6 lg:py-10">
        <div className="flex justify-center -z-40">
          <div className="absolute top-0 h-[1px] w-1/2 bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent"></div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm font-mono text-gray-500">
            &gt; © {new Date().getFullYear()} <span className="text-[#00E5FF]">Helmi Mastouri</span> — Securing the digital frontier.
          </p>
          <div className="flex items-center gap-5">
            <Link
              target="_blank"
              href={personalData.github}
              className="flex items-center gap-2 text-gray-500 font-mono text-sm hover:text-[#00E5FF] transition-all duration-300"
            >
              <BsGithub size={18} />
              <span>GitHub</span>
            </Link>
            <Link
              target="_blank"
              href={personalData.linkedIn}
              className="flex items-center gap-2 text-gray-500 font-mono text-sm hover:text-[#00E5FF] transition-all duration-300"
            >
              <BsLinkedin size={18} />
              <span>LinkedIn</span>
            </Link>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Footer;