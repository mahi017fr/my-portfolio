import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring, useMotionValue, useMotionTemplate } from "motion/react";

export function ServiceCard({ s, idx }: { s: any; idx: number; key?: any }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Initialize interactive motion values
  const mouseX = useMotionValue(100);
  const mouseY = useMotionValue(100);

  // Smooth springs for 3D rotation
  const rotateX = useSpring(useMotionValue(0), { stiffness: 80, damping: 15 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 80, damping: 15 });

  // Automatic gentle sway and spotlight path when not hovered
  useEffect(() => {
    if (isHovered) return;

    let frameId: number;
    // Offset standard start time using idx so cards sway out of sync
    let angle = idx * 1.5;

    const animateIdle = () => {
      angle += 0.015;

      // Rock card back and forth gently (Max 4.5 degrees)
      const rx = Math.sin(angle) * 4.5;
      const ry = Math.cos(angle * 0.8) * 4.5;
      rotateX.set(rx);
      rotateY.set(ry);

      // Float the glowing spotlight automatically in a responsive elliptical path
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        if (rect.width && rect.height) {
          const cx = rect.width / 2;
          const cy = rect.height / 2;
          const rxOfs = rect.width * 0.35;
          const ryOfs = rect.height * 0.35;
          
          mouseX.set(cx + Math.cos(angle) * rxOfs);
          mouseY.set(cy + Math.sin(angle * 1.2) * ryOfs);
        }
      }

      frameId = requestAnimationFrame(animateIdle);
    };

    // Tiny stagger delay before beginning the idle animation
    const timer = setTimeout(() => {
      frameId = requestAnimationFrame(animateIdle);
    }, idx * 100);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timer);
    };
  }, [isHovered, idx]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    setIsHovered(true);
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse position relative to card center
    const xVal = e.clientX - rect.left;
    const yVal = e.clientY - rect.top;

    mouseX.set(xVal);
    mouseY.set(yVal);

    // Dynamic rotation mapping (Max range of 15 degrees)
    const xRotation = -((yVal - height / 2) / height) * 15;
    const yRotation = ((xVal - width / 2) / width) * 15;

    rotateX.set(xRotation);
    rotateY.set(yRotation);
  }

  function handleMouseLeave() {
    setIsHovered(false);
  }

  // Create radial gradient for the floating spotlight (now broader and softer)
  const spotlightStyle = useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, rgba(255, 140, 66, 0.15), transparent 80%)`;

  return (
    <div className="h-full [perspective:1200px]">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative group p-8 lg:p-10 bg-neutral-900/40 border border-brand-amber/30 hover:border-brand-amber/50 rounded-[2.5rem] md:rounded-[3rem] h-full flex flex-col justify-between overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.85)] transition-colors duration-500 backdrop-blur-md cursor-pointer"
      >
        {/* Dynamic Cursor & Idle Auto-Spotlight Overlay - Always present and moving */}
        <motion.div 
          className="absolute inset-0 pointer-events-none opacity-100 z-10"
          style={{ background: spotlightStyle }}
        />

        {/* Cyber Digital Ring Background Accent (Always active and visible) */}
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full border border-brand-amber/20 opacity-10 pointer-events-none scale-100" />
        <div className="absolute -right-28 -top-28 w-96 h-96 rounded-full border border-dashed border-brand-amber/15 opacity-5 pointer-events-none scale-100" />

        {/* Cyber Grid Pattern Background inside Card */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />

        {/* Accent Flare Always Visible */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-brand-amber/8 blur-[50px] opacity-100 pointer-events-none" />

        {/* 3D Content Wrapper for Translation depth */}
        <div className="relative z-20 flex flex-col h-full justify-between" style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
          <div>
            {/* Hanging Indicator Pill */}
            <div 
              className="flex justify-between items-start mb-10"
              style={{ transform: "translateZ(10px)" }}
            >
              {/* Active Golden Icon Container */}
              <div 
                className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-brand-amber text-black shadow-[0_0_30px_rgba(255,140,66,0.35)] flex items-center justify-center transition-all duration-500"
                style={{ transform: "translateZ(30px)" }}
              >
                <div className="scale-110 transition-transform duration-500">
                  {s.icon}
                </div>
              </div>

              {/* Status Ring */}
              <div 
                className="px-3 py-1 rounded-full bg-brand-amber/10 border border-brand-amber/20 transition-all duration-500"
                style={{ transform: "translateZ(15px)" }}
              >
                <span className="text-[8px] font-mono tracking-wider text-brand-amber">SYSTEM READY</span>
              </div>
            </div>

            <h3 
              className="text-2xl md:text-3xl font-display font-black uppercase tracking-tighter mb-4 italic text-brand-amber transition-colors duration-300"
              style={{ transform: "translateZ(25px)" }}
            >
              {s.title}
            </h3>

            <p 
              className="text-neutral-200 font-sans text-xs md:text-sm leading-relaxed transition-colors duration-300"
              style={{ transform: "translateZ(20px)" }}
            >
              {s.desc}
            </p>
          </div>

          {/* Dynamic Holographic Footer with text removed */}
          <div 
            className="mt-12 flex items-center justify-between pointer-events-none"
            style={{ transform: "translateZ(15px)" }}
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-amber animate-pulse shadow-[0_0_8px_rgba(255,140,66,0.8)]" />
            </div>
            <div className="flex items-center gap-3">
              <div className="h-[1px] w-12 bg-brand-amber/30 transition-all duration-500" />
              <span className="text-[10px] font-mono text-neutral-400 transition-colors">
                0{idx + 1}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
