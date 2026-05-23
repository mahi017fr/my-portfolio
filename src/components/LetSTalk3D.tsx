import React, { useState } from 'react';

const LetSTalk3D: React.FC = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Calculate mouse position relative to the middle of the element (-0.5 to 0.5)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    // Tilt angle amplitudes: more rotation for immersive depth (up to 35 degrees)
    setTilt({
      x: x * 35,
      y: -y * 35,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  // Spectacular 3D retro-futuristic layered shadows with high contrast amber glow
  const textShadow3D = isHovered
    ? `
        0 1px 0 #b45309,
        0 2px 0 #92400e,
        0 3px 0 #78350f,
        0 4px 0 #451a03,
        0 5px 0 #1c1917,
        0 6px 0 #0c0a09,
        0 8px 12px rgba(0, 0, 0, 0.7),
        0 12px 25px rgba(255, 140, 66, 0.45),
        0 20px 45px rgba(255, 140, 66, 0.2)
      `
    : `
        0 1px 0 #92400e,
        0 2px 0 #78350f,
        0 3px 0 #451a03,
        0 4px 0 #0c0a09,
        0 5px 8px rgba(0, 0, 0, 0.6),
        0 8px 18px rgba(255, 140, 66, 0.25),
        0 15px 30px rgba(0, 0, 0, 0.15)
      `;

  return (
    <div
      className="relative select-none cursor-pointer py-10 px-4 flex items-center justify-center overflow-visible"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1000px' }}
    >
      <h2
        className="font-display font-black text-6xl md:text-8xl xl:text-[9vw] uppercase tracking-tighter leading-none italic text-brand-amber transition-all duration-300 ease-out select-none"
        style={{
          transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale(${isHovered ? 1.05 : 1})`,
          textShadow: textShadow3D,
          transformStyle: 'preserve-3d',
        }}
      >
        Let's Talk
      </h2>
    </div>
  );
};

export default LetSTalk3D;
