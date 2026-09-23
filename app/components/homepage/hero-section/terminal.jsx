"use client";

import { useEffect, useRef, useState } from "react";

// Segment tones — kept in sync with globals.scss tokens
const TONES = {
  cyan: "#00E5FF",
  green: "#10B981",
  gray: "#9ca3af",
  dim: "#6b7280",
  white: "#e5e7eb",
};

// Each script: a command typed live, then output revealed line by line.
// Lines are arrays of { t: text, c: tone, b: bold } segments.
const SCRIPTS = [
  {
    id: "whoami",
    label: "whoami.sh",
    command: "./whoami.sh --verbose",
    lines: [
      [{ t: "[+]", c: "cyan" }, { t: " User: ", c: "gray" }, { t: "Helmi Mastouri", c: "white", b: true }],
      [{ t: "[+]", c: "cyan" }, { t: " Role: ", c: "gray" }, { t: "Cybersecurity Engineer & DevSecOps", c: "white" }],
      [{ t: "[+]", c: "cyan" }, { t: " Status: ", c: "gray" }, { t: "Available for PFE Internship (Early 2027)", c: "green" }],
      [{ t: "[+]", c: "cyan" }, { t: " Target: ", c: "gray" }, { t: "Europe — SOC Analyst / DevSecOps", c: "white" }],
      [{ t: "[+]", c: "cyan" }, { t: " Core Stack: ", c: "gray" }, { t: "Azure · Terraform · GitHub Actions · Vault", c: "white" }],
      [{ t: "[+]", c: "cyan" }, { t: " SIEM & Detection: ", c: "gray" }, { t: "ELK Stack · Wazuh · T-Pot · FortiGate", c: "white" }],
      [{ t: "", c: "dim" }],
      [{ t: "[✔]", c: "green" }, { t: " Shift-Left Pipeline: ", c: "gray" }, { t: "AUTOMATED", c: "green", b: true }],
      [{ t: "[✔]", c: "green" }, { t: " Threat Detection: ", c: "gray" }, { t: "ONLINE", c: "green", b: true }],
      [{ t: "[✔]", c: "green" }, { t: " Ready to Hire: ", c: "gray" }, { t: "TRUE", c: "green", b: true }],
    ],
  },
  {
    id: "nmap",
    label: "nmap",
    command: "nmap -sV --script vuln scanme.helmi.sec",
    lines: [
      [{ t: "Starting Nmap 7.94 ( https://nmap.org )", c: "dim" }],
      [{ t: "Nmap scan report for scanme.helmi.sec (10.10.42.1)", c: "dim" }],
      [{ t: "Host is up (0.00042s latency).", c: "dim" }],
      [{ t: "", c: "dim" }],
      [{ t: "PORT      ", c: "white", b: true }, { t: "STATE ", c: "white", b: true }, { t: "SERVICE      VERSION", c: "white", b: true }],
      [{ t: "22/tcp    ", c: "gray" }, { t: "open ", c: "green" }, { t: "ssh          OpenSSH 9.6 (hardened)", c: "gray" }],
      [{ t: "443/tcp   ", c: "gray" }, { t: "open ", c: "green" }, { t: "https        nginx 1.25 · TLS 1.3 only", c: "gray" }],
      [{ t: "8080/tcp  ", c: "gray" }, { t: "open ", c: "green" }, { t: "http-proxy   Vault API 1.15 (sealed)", c: "gray" }],
      [{ t: "", c: "dim" }],
      [{ t: "[✔]", c: "green" }, { t: " 0 critical vulnerabilities found", c: "gray" }],
      [{ t: "[✔]", c: "green" }, { t: " TLS certificate: ", c: "gray" }, { t: "A+ rating · 42 days to expiry", c: "white" }],
      [{ t: "Nmap done: 1 host scanned in 2.41 seconds", c: "dim" }],
    ],
  },
  {
    id: "pipeline",
    label: "ci-gates",
    command: "make security-gates",
    lines: [
      [{ t: "→ terraform plan    ", c: "gray" }, { t: "..........  ", c: "dim" }, { t: "PASS", c: "cyan", b: true }],
      [{ t: "→ checkov (IaC)     ", c: "gray" }, { t: "..........  ", c: "dim" }, { t: "PASS", c: "green", b: true }, { t: "  0 failures", c: "dim" }],
      [{ t: "→ gitleaks (secrets)", c: "gray" }, { t: "..........  ", c: "dim" }, { t: "PASS", c: "green", b: true }, { t: "  0 leaks", c: "dim" }],
      [{ t: "→ trivy (container) ", c: "gray" }, { t: "..........  ", c: "dim" }, { t: "PASS", c: "green", b: true }, { t: "  0 HIGH|CRIT", c: "dim" }],
      [{ t: "→ zap baseline (DAST)", c: "gray" }, { t: ".........  ", c: "dim" }, { t: "PASS", c: "green", b: true }],
      [{ t: "", c: "dim" }],
      [{ t: "[✔]", c: "green" }, { t: " Security gates: ", c: "gray" }, { t: "5/5 PASSED", c: "green", b: true }],
      [{ t: "[✔]", c: "green" }, { t: " Image signed & pushed to registry", c: "gray" }],
      [{ t: "[✔]", c: "green" }, { t: " Deployment authorized — ", c: "gray" }, { t: "shift-left complete", c: "cyan" }],
    ],
  },
];

function Prompt({ typed, showCursor }) {
  return (
    <div className="whitespace-pre-wrap">
      <span className="text-[#10B981]">helmi@sec-ops</span>
      <span className="text-gray-500">:</span>
      <span className="text-[#00E5FF]">~</span>
      <span className="text-gray-400">$ </span>
      <span className="text-gray-300">{typed}</span>
      {showCursor && <span className="cursor-blink" aria-hidden="true"></span>}
    </div>
  );
}

function Terminal() {
  const [scriptIdx, setScriptIdx] = useState(0);
  const [runToken, setRunToken] = useState(0);
  const [typed, setTyped] = useState("");
  const [lines, setLines] = useState([]);
  const [phase, setPhase] = useState("typing"); // typing | output | done
  const bodyRef = useRef(null);

  const runScript = (idx) => {
    setScriptIdx(idx);
    setRunToken((t) => t + 1);
  };

  useEffect(() => {
    let cancelled = false;
    const timers = [];
    const wait = (ms) =>
      new Promise((resolve) => {
        timers.push(setTimeout(resolve, ms));
      });

    const script = SCRIPTS[scriptIdx];
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    (async () => {
      setTyped("");
      setLines([]);
      setPhase("typing");

      if (reduced) {
        setTyped(script.command);
        setLines(script.lines);
        setPhase("done");
        return;
      }

      for (let i = 1; i <= script.command.length; i++) {
        if (cancelled) return;
        await wait(34 + Math.random() * 42);
        setTyped(script.command.slice(0, i));
      }

      await wait(380);
      if (cancelled) return;
      setPhase("output");

      for (const line of script.lines) {
        if (cancelled) return;
        await wait(100 + Math.random() * 130);
        setLines((prev) => [...prev, line]);
      }

      setPhase("done");
      await wait(3200);
      if (cancelled) return;
      // Auto-cycle to the next script
      setScriptIdx((i) => (i + 1) % SCRIPTS.length);
    })();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [scriptIdx, runToken]);

  // Keep the newest line in view as output streams in
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [typed, lines, phase]);

  const active = SCRIPTS[scriptIdx];

  return (
    <div className="relative rounded-xl border border-[#1E293B] overflow-hidden">
      {/* Terminal header */}
      <div className="bg-[#1a1f2e] px-4 py-3 flex items-center gap-3 border-b border-[#1E293B]">
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
          <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
        </div>
        <span className="hidden sm:inline font-mono text-xs text-gray-500 tracking-wide truncate">
          bash — helmi@sec-ops:~
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          {SCRIPTS.map((script, idx) => (
            <button
              key={script.id}
              type="button"
              onClick={() => runScript(idx)}
              aria-pressed={idx === scriptIdx}
              className={`px-2 py-0.5 rounded font-mono text-[10px] tracking-wide transition-all duration-300 border ${
                idx === scriptIdx
                  ? "text-[#00E5FF] border-[#00E5FF40] bg-[#00E5FF0d] shadow-[0_0_10px_rgba(0,229,255,0.12)]"
                  : "text-gray-500 border-transparent hover:text-gray-300 hover:border-[#1E293B]"
              }`}
            >
              {script.label}
            </button>
          ))}
        </div>
      </div>

      {/* Terminal body — fixed height so the layout never shifts while typing */}
      <div
        ref={bodyRef}
        className="relative bg-[#0d1117] px-4 lg:px-6 py-5 lg:py-6 h-[320px] sm:h-[340px] lg:h-[380px] overflow-y-auto"
        aria-label="Terminal demo: security scripts"
      >
        <div className="absolute inset-0 grid-bg opacity-10" aria-hidden="true"></div>
        <div className="relative font-mono text-[11px] sm:text-xs lg:text-[13px] leading-[1.7]">
          <Prompt typed={typed} showCursor={phase === "typing"} />
          {lines.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap">
              {line.map((seg, j) => (
                <span
                  key={j}
                  style={{ color: TONES[seg.c] || TONES.gray }}
                  className={seg.b ? "font-semibold" : undefined}
                >
                  {seg.t}
                </span>
              ))}
            </div>
          ))}
          {phase === "done" && <Prompt typed="" showCursor={true} />}
        </div>
      </div>
    </div>
  );
}

export default Terminal;
