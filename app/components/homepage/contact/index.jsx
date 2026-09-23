// @flow strict
import { personalData } from '@/utils/data/personal-data';
import Link from 'next/link';
import { BiLogoLinkedin } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { IoLogoGithub, IoMdCall } from "react-icons/io";
import { MdAlternateEmail } from "react-icons/md";
import ContactForm from './contact-form';

function ContactSection() {
  return (
    <div id="contact" className="my-12 lg:my-16 relative mt-24 text-white border-t border-[#1E293B]">
      <div className="w-[100px] h-[100px] bg-[#00E5FF] rounded-full absolute top-6 left-[42%] translate-x-1/2 filter blur-3xl opacity-10"></div>

      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent w-full" />
        </div>
      </div>

      <div className="hidden lg:flex flex-col items-center absolute top-24 -right-8">
        <span className="bg-[#131926] border border-[#00E5FF20] w-fit text-[#00E5FF] rotate-90 p-2 px-5 text-xl rounded-md font-mono">
          CONTACT
        </span>
        <span className="h-36 w-[2px] bg-gradient-to-b from-[#00E5FF] to-transparent"></span>
      </div>

      <div className="pt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <ContactForm />
        <div className="lg:w-3/4 ">
          <div className="flex flex-col gap-5 lg:gap-9">
            <p className="text-sm md:text-xl flex items-center gap-3">
              <MdAlternateEmail
                className="bg-[#1E293B] p-2 rounded-full hover:bg-[#00E5FF] hover:scale-110 transition-all duration-300 text-[#00E5FF] hover:text-[#0B0F17] cursor-pointer"
                size={36}
              />
              <span className="font-mono text-gray-300">{personalData.email}</span>
            </p>
            <p className="text-sm md:text-xl flex items-center gap-3">
              <IoMdCall
                className="bg-[#1E293B] p-2 rounded-full hover:bg-[#00E5FF] hover:scale-110 transition-all duration-300 text-[#00E5FF] hover:text-[#0B0F17] cursor-pointer"
                size={36}
              />
              <span className="font-mono text-gray-300">
                {personalData.phone}
              </span>
            </p>
            <p className="text-sm md:text-xl flex items-center gap-3">
              <CiLocationOn
                className="bg-[#1E293B] p-2 rounded-full hover:bg-[#00E5FF] hover:scale-110 transition-all duration-300 text-[#00E5FF] hover:text-[#0B0F17] cursor-pointer"
                size={36}
              />
              <span className="font-mono text-gray-300">
                {personalData.address}
              </span>
            </p>
          </div>
          <div className="mt-8 lg:mt-16 flex items-center gap-5 lg:gap-10">
            <Link target="_blank" href={personalData.github}>
              <IoLogoGithub
                className="bg-[#1E293B] p-3 rounded-full hover:bg-[#00E5FF] hover:scale-110 transition-all duration-300 text-[#00E5FF] hover:text-[#0B0F17] cursor-pointer"
                size={48}
              />
            </Link>
            <Link target="_blank" href={personalData.linkedIn}>
              <BiLogoLinkedin
                className="bg-[#1E293B] p-3 rounded-full hover:bg-[#00E5FF] hover:scale-110 transition-all duration-300 text-[#00E5FF] hover:text-[#0B0F17] cursor-pointer"
                size={48}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;