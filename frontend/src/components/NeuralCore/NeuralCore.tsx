import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { rotateClockwise, rotateCounter, breathe } from '../animations/variants';

const NeuralCore: React.FC = () => {
  // Memoize particles to avoid re-renders
  const particles = useMemo(() => Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    size: Math.random() * 2 + 1,
    duration: 15 + Math.random() * 15,
    delay: Math.random() * -20,
    orbitRadius: 180 + Math.random() * 100,
    opacity: 0.1 + Math.random() * 0.4
  })), []);

  return (
    <div className="relative w-[600px] h-[600px] flex items-center justify-center transform-gpu">
      
      {/* LAYER 1 — OUTER ATMOSPHERE */}
      <motion.div 
        variants={breathe(0.1, 0.2)}
        animate="animate"
        className="absolute w-[800px] h-[800px] bg-primary-fixed-dim/5 rounded-full blur-[100px] pointer-events-none will-change-[opacity,transform]"
      />

      {/* LAYER 9 — PARTICLE FIELD (CSS Optimized) */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute left-1/2 top-1/2 bg-primary-fixed-dim rounded-full"
            style={{ 
              width: p.size, 
              height: p.size,
              opacity: p.opacity,
              '--orbit-radius': `${p.orbitRadius}px`,
              '--duration': `${p.duration}s`,
              animation: `core-orbit ${p.duration}s linear infinite`,
              animationDelay: `${p.delay}s`,
              willChange: 'transform'
            } as any}
          />
        ))}
      </div>

      {/* LAYER 2 — ORBIT RING */}
      <motion.svg 
        variants={rotateClockwise(40)} // Slower for smoothness
        animate="animate"
        className="absolute w-[95%] h-[95%] opacity-10 will-change-transform" 
        viewBox="0 0 100 100"
      >
        <circle cx="50" cy="50" fill="none" r="48" stroke="#00dbe9" strokeDasharray="1 12" strokeWidth="0.1" />
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <circle 
            key={deg} 
            cx={50 + 48 * Math.cos(deg * Math.PI / 180)} 
            cy={50 + 48 * Math.sin(deg * Math.PI / 180)} 
            r="0.4" 
            fill="#00dbe9" 
          />
        ))}
      </motion.svg>
      
      {/* LAYER 3 — DATA RING */}
      <motion.svg 
        variants={rotateCounter(25)}
        animate="animate"
        className="absolute w-[80%] h-[80%] opacity-20 will-change-transform" 
        viewBox="0 0 100 100"
      >
        <circle cx="50" cy="50" fill="none" r="45" stroke="#00dbe9" strokeDasharray="15 5 30 10" strokeWidth="0.2" />
      </motion.svg>
      
      {/* LAYER 4 — ENERGY RING */}
      <motion.svg 
        variants={rotateClockwise(15)}
        animate="animate"
        className="absolute w-[65%] h-[65%] will-change-transform" 
        viewBox="0 0 100 100"
      >
        <defs>
          <linearGradient id="energyGrad" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#00dbe9" />
            <stop offset="50%" stopColor="transparent" />
            <stop offset="100%" stopColor="#ebb2ff" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" fill="none" r="42" stroke="url(#energyGrad)" strokeWidth="0.6" strokeLinecap="round" strokeDasharray="50 110" />
      </motion.svg>

      {/* LAYER 5 — INNER HALO */}
      <motion.div 
        animate={{ 
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-64 h-64 rounded-full bg-primary-fixed-dim/10 blur-[60px] will-change-opacity"
      />

      {/* Central Assembly */}
      <div className="relative z-20 w-56 h-56 flex items-center justify-center group">
        {/* LAYER 6 — CORE GLASS */}
        <div className="relative w-40 h-40 rounded-full holographic-glass border-white/10 flex items-center justify-center overflow-hidden accelerate">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-fixed-dim/10 to-secondary-container/10 opacity-30" />
          
          {/* LAYER 7 — CORE ICON */}
          <motion.span 
            animate={{ opacity: [0.8, 1, 0.8], scale: [0.98, 1.02, 0.98] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="material-symbols-outlined text-6xl text-white opacity-90 relative z-10 will-change-[opacity,transform]"
          >
            bolt
          </motion.span>
        </div>

        {/* LAYER 8 — FLOATING METADATA */}
        <MetadataChip position="top" label="SYNAPSE_LOAD" value="84.2%" />
        <MetadataChip position="right" label="LATENCY" value="1.2ms" />
        <MetadataChip position="bottom" label="STATUS" value="OPTIMAL" />
        <MetadataChip position="left" label="NODES" value="247" />
      </div>
    </div>
  );
};

const MetadataChip: React.FC<{ position: 'top' | 'right' | 'bottom' | 'left', label: string, value: string }> = ({ position, label, value }) => {
  const positions = {
    top: "-top-24 left-1/2 -translate-x-1/2",
    right: "top-1/2 -right-32 -translate-y-1/2",
    bottom: "-bottom-24 left-1/2 -translate-x-1/2",
    left: "top-1/2 -left-32 -translate-y-1/2"
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`absolute ${positions[position]} flex flex-col items-center holographic-glass px-4 py-2 rounded-2xl border-primary-fixed-dim/10 z-30 min-w-[100px] accelerate`}
    >
      <span className="font-label-caps text-[7px] text-primary-fixed-dim tracking-tighter mb-0.5 opacity-60">{label}</span>
      <span className="font-display-lg text-base text-white leading-none tracking-wider">{value}</span>
    </motion.div>
  );
};

export default NeuralCore;
