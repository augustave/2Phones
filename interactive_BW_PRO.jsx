import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * Refactor goals (non-visual):
 * - Reduce rerenders from high-frequency mousemove (use rAF + refs)
 * - Keep telemetry bounded and derived from movement
 * - Respect reduced motion
 * - Provide pointer + touch support (not just mouse)
 * - Make cursor optional on coarse pointers
 */

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(!!mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

type Point = { x: number; y: number };

type TelemetryLog = {
  id: string;
  x: number;
  y: number;
  status: "NOMINAL" | "ANOMALY DETECTED";
  ts: number;
};

export default function App() {
  // Size
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // UI state that can be slower than pointer events
  const [mousePos, setMousePos] = useState<Point>({ x: 0, y: 0 });
  const [telemetry, setTelemetry] = useState<TelemetryLog[]>([]);

  // Image fallback: prevents the browser “broken image” icon from showing
  const [imageOk, setImageOk] = useState(true);

  // Refs to avoid rerendering at pointer frequency
  const posRef = useRef<Point>({ x: 0, y: 0 });
  const lastPosRef = useRef<Point>({ x: 0, y: 0 });
  const lastTelemetryAtRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const reducedMotion = usePrefersReducedMotion();

  // Window resize
  useEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Pointer movement (mouse, pen, touch)
  useEffect(() => {
    const el = window;

    const scheduleUIUpdate = () => {
      if (rafRef.current != null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        setMousePos({ ...posRef.current });
      });
    };

    const maybeEmitTelemetry = () => {
      const now = Date.now();
      if (now - lastTelemetryAtRef.current < 150) return;

      const p = posRef.current;
      const lp = lastPosRef.current;
      const speed = Math.abs(p.x - lp.x) + Math.abs(p.y - lp.y);

      // Movement threshold
      if (speed <= 20) {
        lastTelemetryAtRef.current = now;
        lastPosRef.current = { ...p };
        return;
      }

      const status = Math.random() > 0.8 ? "ANOMALY DETECTED" : "NOMINAL";
      const id = `SCAN_NODE_${Math.floor(Math.random() * 9999)}`;
      const log: TelemetryLog = { id, x: p.x, y: p.y, status, ts: now };

      setTelemetry((prev) => {
        const next = [...prev, log];
        return next.slice(-6); // bounded
      });

      lastTelemetryAtRef.current = now;
      lastPosRef.current = { ...p };
    };

    const onPointerMove = (e: PointerEvent) => {
      // Use client coords; for touch, PointerEvent provides these too
      posRef.current = { x: e.clientX, y: e.clientY };
      scheduleUIUpdate();
      maybeEmitTelemetry();
    };

    el.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      el.removeEventListener("pointermove", onPointerMove as any);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Tilt
  const tilt = useMemo(() => {
    if (!windowSize.width || !windowSize.height) {
      return { rotateX: 0, rotateY: 0 };
    }

    const x = (mousePos.x / windowSize.width - 0.5) * 2; // -1..1
    const y = (mousePos.y / windowSize.height - 0.5) * 2;

    // Clamp so corners don’t over-tilt on huge screens
    const rotateY = clamp(x * 10, -10, 10);
    const rotateX = clamp(-y * 10, -10, 10);

    return reducedMotion ? { rotateX: 0, rotateY: 0 } : { rotateX, rotateY };
  }, [mousePos.x, mousePos.y, windowSize.width, windowSize.height, reducedMotion]);

  const isCoarsePointer = useMemo(() => {
    // Basic detection: hide custom cursor on touch-first devices
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(pointer: coarse)")?.matches ?? false;
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-[#0a0a0a] overflow-hidden flex items-center justify-center font-mono cursor-none"
      style={{ perspective: "1000px" }}
    >
      {/* Local CSS (kept as-is, but respects reduced motion) */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes scanline {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
          animation: scanline 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @keyframes pulse-text {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-scan { animation: none !important; }
          .animate-ping { animation: none !important; }
        }
      `,
        }}
      />

      {/* Main 3D Container */}
      <div
        className="relative transition-transform duration-200 ease-out will-change-transform shadow-2xl"
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          width: "90vw",
          maxWidth: "1200px",
          aspectRatio: "16/9",
        }}
      >
        {/* Image (with safe fallback to avoid broken-image icon) */}
        {imageOk ? (
          <img
            src="/Art_direction__concepta_moody_conceptual_portrait__delpmaspu.png"
            alt="Conceptual Portrait"
            className="w-full h-full object-cover rounded-sm opacity-90 filter contrast-125 brightness-90"
            draggable={false}
            onError={() => setImageOk(false)}
          />
        ) : (
          <div className="w-full h-full rounded-sm opacity-90 bg-[#0d0d0d]" />
        )
        }

        {/* Scanner box */}
        <div className="absolute top-[22%] left-[37.5%] w-[10.5%] h-[47%] border-[1px] border-white/20 z-10 overflow-hidden pointer-events-none mix-blend-overlay">
          <div className="absolute left-0 w-full h-1 bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.8)] animate-scan" />
          <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-50" />
        </div>

        {/* Corner marks */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/50" />
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/50" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/50" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/50" />

        {/* Telemetry */}
        <div className="absolute bottom-8 right-8 text-[10px] sm:text-xs text-white/70 tracking-widest text-right mix-blend-difference">
          <p
            className="mb-2 text-white font-bold opacity-80"
            style={{ animation: reducedMotion ? "none" : "pulse-text 2s infinite" }}
          >
            SYSTEM.ACTIVE
          </p>
          {telemetry.map((log) => (
            <p key={log.ts + log.id} className="opacity-70">
              {`> ${log.id}: [${Math.round(log.x)}, ${Math.round(log.y)}] - STATUS: ${log.status}`}
            </p>
          ))}
          <p className="mt-2 text-white/50">
            X:{Math.round(mousePos.x)} Y:{Math.round(mousePos.y)}
          </p>
        </div>

        {/* Header overlay */}
        <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-8">
          <div className="flex justify-between items-start text-xs text-white/40 mix-blend-difference tracking-widest">
            <span>SYS_VER_9.0.4</span>
            <span>ENGAGE_PROTOCOL</span>
          </div>
        </div>
      </div>

      {/* Custom cursor (hide on coarse pointer or reduced motion preference) */}
      {!isCoarsePointer && (
        <div
          className="fixed top-0 left-0 pointer-events-none z-50 transition-transform duration-75 ease-out mix-blend-difference"
          style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
          aria-hidden
        >
          <div className="relative -ml-4 -mt-4 w-8 h-8">
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white opacity-80 -translate-y-1/2" />
            <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white opacity-80 -translate-x-1/2" />
            <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-red-500 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_5px_rgba(239,68,68,1)]" />
            <div
              className="absolute inset-0 border border-white/30 rounded-full animate-ping"
              style={{ animationDuration: reducedMotion ? "0s" : "3s" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
