import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const AmbientBackground: React.FC = () => {
  // Memoize background particles
  const particles = useMemo(() => Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    duration: 30 + Math.random() * 30,
    delay: Math.random() * -30,
    driftX: (Math.random() - 0.5) * 200,
    driftY: (Math.random() - 0.5) * 200,
    opacity: 0.05 + Math.random() * 0.1
  })), []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#08090d] transform-gpu">
      {/* LAYER B — PERSPECTIVE GRID (Simplified) */}
      <div className="absolute inset-0 perspective-[1000px] overflow-hidden">
        <motion.div 
          animate={{ 
            translateY: [-300, -260],
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute inset-x-0 top-0 h-[200vh] perspective-grid rotate-x-[75deg] opacity-[0.04] will-change-transform"
        />
      </div>
      
      {/* LAYER C — RADIAL GLOW (Behind Neural Core) */}
      <motion.div 
        animate={{ opacity: [0.08, 0.12, 0.08] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-primary-fixed-dim/30 rounded-full blur-[100px] will-change-opacity"
      />
      
      {/* LAYER D — SCANLINES */}
      <div className="absolute inset-0 scanlines opacity-[0.02]" />
      
      {/* LAYER E — CORNER VIGNETTE (Static CSS) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,_rgba(0,0,0,0.3)_0%,_transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,_rgba(0,0,0,0.3)_0%,_transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_100%,_rgba(0,0,0,0.3)_0%,_transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,_rgba(0,0,0,0.3)_0%,_transparent_40%)]" />
      
      {/* LAYER F — FLOATING PARTICLES (CSS Optimized) */}
      <div className="absolute inset-0">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute w-[1px] h-[1px] bg-primary-fixed-dim rounded-full"
            style={{ 
              left: p.left, 
              top: p.top,
              opacity: p.opacity,
              '--drift-x': `${p.driftX}px`,
              '--drift-y': `${p.driftY}px`,
              animation: `drift ${p.duration}s linear infinite`,
              animationDelay: `${p.delay}s`,
              willChange: 'transform'
            } as any}
          />
        ))}
      </div>
      
      {/* Static Volumetric Light (No animation for performance) */}
      <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] bg-primary-fixed-dim/5 rounded-full blur-[100px]" />
    </div>
  );
};

export default AmbientBackground;
