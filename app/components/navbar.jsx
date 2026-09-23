"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Certs" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

function Navbar() {
  const [open, setOpen] = useState(false);

  // Next.js doesn't reliably scroll between same-page hash links, so we
  // scroll explicitly — this is what makes the second, third, … menu click work.
  const goTo = (e, id) => {
    e.preventDefault();
    setOpen(false);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = id ? document.getElementById(id) : null;
    if (id && target) {
      target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", `/#${id}`);
    } else {
      window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
      history.replaceState(null, "", "/");
    }
  };

  return (
    <nav className="bg-[#0B0F17]/80 backdrop-blur-md sticky top-0 z-[60] border-b border-[#1E293B]">
      <div className="flex items-center justify-between py-4">
        <div className="flex flex-shrink-0 items-center">
          <Link
            href="/"
            onClick={(e) => goTo(e, null)}
            className="text-[#00E5FF] text-2xl font-bold font-mono tracking-wider transition-all duration-300 hover:text-glow-cyan">
            &gt;_ HM
          </Link>
        </div>

        {/* Desktop menu */}
        <ul className="hidden md:flex md:flex-row md:space-x-1">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <Link
                className="block px-4 py-2 no-underline outline-none hover:no-underline"
                href={`/#${link.id}`}
                onClick={(e) => goTo(e, link.id)}
              >
                <div className="text-sm text-gray-500 font-mono uppercase transition-colors duration-300 hover:text-[#00E5FF]">
                  {link.label}
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger — mobile only */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          aria-controls="navbar-mobile"
          onClick={() => setOpen((o) => !o)}
          className="md:hidden flex flex-col items-center justify-center gap-[5px] w-11 h-11 rounded-md border border-[#1E293B] bg-transparent transition-all duration-300 hover:border-[#00E5FF] hover:shadow-[0_0_15px_rgba(0,229,255,0.15)]"
        >
          <span className={`block w-5 h-[2px] bg-[#00E5FF] transition-all duration-300 ${open ? "rotate-45 translate-y-[7px]" : ""}`}></span>
          <span className={`block w-5 h-[2px] bg-[#00E5FF] transition-all duration-300 ${open ? "opacity-0 translate-x-2" : ""}`}></span>
          <span className={`block w-5 h-[2px] bg-[#00E5FF] transition-all duration-300 ${open ? "-rotate-45 -translate-y-[7px]" : ""}`}></span>
        </button>
      </div>

      {/* Mobile menu panel */}
      <div
        id="navbar-mobile"
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
          open ? "max-h-[26rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col px-4 pb-4">
          {NAV_LINKS.map((link, i) => (
            <li
              key={link.id}
              className={`transition-all duration-300 ${
                open ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${i * 45}ms` : "0ms" }}
            >
              <Link
                className="flex items-center gap-2 py-3 border-b border-[#1E293B]/60 no-underline outline-none hover:no-underline"
                href={`/#${link.id}`}
                onClick={(e) => goTo(e, link.id)}
              >
                <span className="text-[#00E5FF] font-mono text-xs">&gt;</span>
                <span className="text-sm text-gray-300 font-mono uppercase tracking-wider transition-colors duration-300">
                  {link.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
