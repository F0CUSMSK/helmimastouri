"use client";

import { useEffect, useRef } from "react";

const LINK_DIST = 140;
const MOUSE_DIST = 160;
// Colors kept in sync with globals.scss tokens
const CYAN = "0, 229, 255";
const GREEN = "16, 185, 129";

function CyberBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let raf = 0;
    let nodes = [];
    let pulses = [];
    let width = 0;
    let height = 0;
    const mouse = { x: -1e4, y: -1e4 };

    const rand = (a, b) => a + Math.random() * (b - a);

    const spawnNodes = () => {
      const count = Math.max(40, Math.min(120, Math.round((width * height) / 18000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: rand(-0.18, 0.18),
        vy: rand(-0.18, 0.18),
        r: rand(1.1, 2.6),
        green: Math.random() < 0.28,
      }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      spawnNodes();
    };

    const spawnPulse = () => {
      const a = nodes[(Math.random() * nodes.length) | 0];
      if (!a) return;
      let best = null;
      let bestD = LINK_DIST;
      for (const b of nodes) {
        if (b === a) continue;
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < bestD) {
          bestD = d;
          best = b;
        }
      }
      if (!best) return;
      pulses.push({
        ax: a.x,
        ay: a.y,
        bx: best.x,
        by: best.y,
        t: 0,
        speed: rand(0.008, 0.016),
        green: Math.random() < 0.5,
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Node-to-node links
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK_DIST * LINK_DIST) {
            const t = 1 - Math.sqrt(d2) / LINK_DIST;
            ctx.strokeStyle = `rgba(${CYAN},${(t * 0.2).toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Links from the cursor to nearby nodes
      for (const n of nodes) {
        const d = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        if (d < MOUSE_DIST) {
          const t = 1 - d / MOUSE_DIST;
          ctx.strokeStyle = `rgba(${CYAN},${(t * 0.28).toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(n.x, n.y);
          ctx.stroke();
        }
      }

      // Data packets traveling along links
      for (const p of pulses) {
        const x = p.ax + (p.bx - p.ax) * p.t;
        const y = p.ay + (p.by - p.ay) * p.t;
        const c = p.green ? GREEN : CYAN;
        ctx.fillStyle = `rgba(${c},${(0.08 * (1 - p.t)).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(${c},${(0.9 * (1 - p.t * 0.4)).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      // Nodes on top
      for (const n of nodes) {
        ctx.fillStyle = n.green
          ? `rgba(${GREEN},0.8)`
          : `rgba(${CYAN},0.75)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = width + 20;
        else if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        else if (n.y > height + 20) n.y = -20;
      }

      if (Math.random() < 0.02 && pulses.length < 6) spawnPulse();
      for (let i = pulses.length - 1; i >= 0; i--) {
        pulses[i].t += pulses[i].speed;
        if (pulses[i].t >= 1) pulses.splice(i, 1);
      }

      draw();
      raf = requestAnimationFrame(step);
    };

    const onPointerMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onPointerLeave = () => {
      mouse.x = -1e4;
      mouse.y = -1e4;
    };

    resize();
    window.addEventListener("resize", resize);

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      // One static frame — no animation, no listeners
      draw();
    } else {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.documentElement.addEventListener(
        "pointerleave",
        onPointerLeave,
        { passive: true }
      );
      raf = requestAnimationFrame(step);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener(
        "pointerleave",
        onPointerLeave
      );
    };
  }, []);

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    >
      {/* Ambient glow orbs */}
      <div
        className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-[#00E5FF] opacity-[0.07] blur-3xl"
        style={{ animation: "float 16s ease-in-out infinite" }}
      ></div>
      <div
        className="absolute -bottom-40 -left-32 w-[520px] h-[520px] rounded-full bg-[#10B981] opacity-[0.07] blur-3xl"
        style={{ animation: "float 20s ease-in-out infinite 3s" }}
      ></div>
      <canvas ref={canvasRef} className="absolute inset-0 opacity-70"></canvas>
    </div>
  );
}

export default CyberBackground;
