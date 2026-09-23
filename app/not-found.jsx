// @flow strict

import Link from "next/link";

function page() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[80vh] text-center overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 -z-10" aria-hidden="true"></div>

      <p className="font-mono text-[#10B981] text-sm tracking-widest uppercase mb-4">
        &gt; error_404: segment_not_found
      </p>

      <h1 className="font-heading text-7xl md:text-8xl font-extrabold text-white text-glow-cyan leading-none">
        4<span className="text-[#00E5FF]">0</span>4
      </h1>

      <p className="mt-6 text-gray-400 text-sm lg:text-base max-w-md">
        {"// This route doesn't exist on the perimeter. The page you're looking for was moved, deleted, or never deployed."}
      </p>

      <Link
        className="mt-8 flex items-center gap-2 px-6 py-3 bg-[#00E5FF] rounded-lg text-[#0B0F17] font-mono text-sm font-bold tracking-wider uppercase no-underline transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] hover:scale-[1.02]"
        href="/"
      >
        <span>&lt;</span>
        <span>Return to Base</span>
      </Link>
    </div>
  );
};

export default page;
