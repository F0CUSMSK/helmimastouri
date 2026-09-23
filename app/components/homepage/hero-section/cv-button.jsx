"use client";

import { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaDownload } from "react-icons/fa";

// Public files fetched/opened directly need the basePath prefix — a plain
// fetch() or window.open() bypasses the prefixing Next applies to <Image>.
// The env var is baked in at build time by the deploy workflow.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

const CV_OPTIONS = [
  {
    code: "FR",
    label: "Français",
    file: `${BASE_PATH}/cv-helmi-fr.pdf`,
    accent: "#10B981",
  },
  {
    code: "EN",
    label: "English",
    file: `${BASE_PATH}/cv-helmi-en.pdf`,
    accent: "#00E5FF",
  },
];

function CvButton() {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);

  // Closing waits a beat so moving the pointer from the button into the
  // panel (or a fast overshoot) never dismisses it mid-flight.
  const openMenu = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpen(true);
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 250);
  };

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    []
  );

  // The plain `download` attribute is ignored by some browsers/webviews and
  // just navigates; fetching a blob and clicking a temp anchor forces a real
  // file save, with a clean filename. Falls back to a new tab on failure.
  const handleDownload = (opt) => async (e) => {
    e.preventDefault();
    setOpen(false);
    try {
      const res = await fetch(opt.file);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Helmi_Mastouri_CV_${opt.code}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
    } catch {
      window.open(opt.file, "_blank", "noopener");
    }
  };

  return (
    <div className="relative" onMouseEnter={openMenu} onMouseLeave={scheduleClose}>
      {/* Trigger */}
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Download CV — choose language"
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-2 px-5 py-3 bg-transparent border rounded-lg font-mono text-sm tracking-wider uppercase transition-all duration-300 ${
          open
            ? "border-[#00E5FF] text-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.2)]"
            : "border-[#1E293B] text-gray-300 hover:border-[#00E5FF] hover:text-[#00E5FF] hover:shadow-[0_0_20px_rgba(0,229,255,0.15)]"
        } backdrop-blur-sm`}
      >
        <FaDownload size={15} />
        <span>Download CV</span>
        <FaChevronDown
          size={11}
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Language panel — the pt-2.5 bridges the button-to-card gap so the
          hover zone is continuous and the panel can't close mid-transit */}
      <div
        role="menu"
        aria-hidden={!open}
        className={`absolute left-0 top-full z-30 w-60 origin-top transition-all duration-300 ease-out ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-1.5 pointer-events-none"
        }`}
      >
        <div className="pt-2.5">
          <div
            className="rounded-lg overflow-hidden"
            style={{
              background: "rgba(19, 25, 38, 0.97)",
              border: "1px solid rgba(0, 229, 255, 0.25)",
              boxShadow:
                "0 12px 35px rgba(0, 0, 0, 0.55), 0 0 22px rgba(0, 229, 255, 0.08)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            {/* Top accent line */}
            <div className="h-[2px] w-full bg-gradient-to-r from-[#10B981] via-[#00E5FF] to-[#10B981] opacity-70"></div>

            <div className="px-3.5 pt-2.5 pb-1 font-mono text-[9px] tracking-[0.28em] text-gray-500 uppercase select-none">
              &gt; select_language
            </div>

            <div className="p-1.5 pt-0.5">
              {CV_OPTIONS.map((opt, i) => (
                <a
                  key={opt.code}
                  role="menuitem"
                  href={opt.file}
                  onClick={handleDownload(opt)}
                  tabIndex={open ? 0 : -1}
                  className={`flex items-center gap-2.5 px-2.5 py-2.5 rounded-md border transition-all duration-300 ${
                    open
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-2.5 opacity-0"
                  }`}
                  style={{
                    backgroundColor: `${opt.accent}08`,
                    borderColor: `${opt.accent}30`,
                    transitionDelay: open ? `${90 + i * 80}ms` : "0ms",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${opt.accent}15`;
                    e.currentTarget.style.borderColor = `${opt.accent}60`;
                    e.currentTarget.style.boxShadow = `0 0 14px ${opt.accent}20`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = `${opt.accent}08`;
                    e.currentTarget.style.borderColor = `${opt.accent}30`;
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <span
                    className="px-1.5 py-0.5 rounded font-mono text-[10px] font-bold flex-shrink-0"
                    style={{
                      color: opt.accent,
                      border: `1px solid ${opt.accent}45`,
                      backgroundColor: `${opt.accent}0d`,
                    }}
                  >
                    {opt.code}
                  </span>
                  <span className="font-mono text-xs text-gray-200">
                    CV — {opt.label}
                  </span>
                  <FaDownload
                    size={11}
                    className="ml-auto flex-shrink-0"
                    style={{ color: opt.accent }}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CvButton;
