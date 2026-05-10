import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { float, panelReveal } from '../animations/variants';

const TelemetryWidget: React.FC = () => {
  const [load, setLoad] = useState(0);
  const [latency, setLatency] = useState(0);
  const [bandwidth, setBandwidth] = useState(0);

  useEffect(() => {
    // Counting animations
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setLoad(Math.floor(progress * 84.2));
      setLatency(Number((progress * 1.2).toFixed(1)));
      setBandwidth(Number((progress * 1.2).toFixed(1)));
      if (step >= steps) clearInterval(timer);
    }, interval);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      variants={panelReveal}
      initial="hidden"
      animate="visible"
      className="absolute bottom-32 left-1/4"
    >
      <motion.div 
        variants={float(1, 4)}
        animate="animate"
        whileHover={{ scale: 1.02, borderColor: 'rgba(0, 219, 233, 0.4)' }}
        className="w-72 holographic-glass rounded-2xl p-5 pointer-events-auto border border-transparent transition-colors duration-500 space-y-6"
      >
        {/* SYNAPSE_LOAD */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="font-label-caps text-[8px] opacity-40 tracking-widest uppercase">Synapse Load</span>
            <span className="font-display-lg text-lg text-primary">{load}%</span>
          </div>
          <div className="relative w-12 h-12 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90">
              <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
              <motion.circle 
                cx="24" cy="24" r="20" fill="none" 
                stroke="#00dbe9" strokeWidth="2" 
                strokeDasharray="125.6"
                initial={{ strokeDashoffset: 125.6 }}
                animate={{ strokeDashoffset: 125.6 - (125.6 * load) / 100 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="glow-cyan"
              />
            </svg>
          </div>
        </div>

        {/* BANDWIDTH */}
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <span className="font-label-caps text-[8px] opacity-40 tracking-widest uppercase">Bandwidth</span>
            <span className="font-display-lg text-lg text-primary">{bandwidth} GB/S</span>
          </div>
          <div className="flex items-end gap-1 h-8">
            {[20, 60, 100, 40, 10, 30].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                className={`w-1 rounded-full ${i === 2 ? 'bg-primary-fixed-dim glow-cyan' : 'bg-primary-fixed-dim/30'}`}
              />
            ))}
          </div>
        </div>

        {/* LATENCY */}
        <div className="flex justify-between items-center border-t border-white/5 pt-4">
          <span className="font-label-caps text-[8px] opacity-40 tracking-widest uppercase">Neural Latency</span>
          <motion.span 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="font-display-lg text-sm text-secondary"
          >
            {latency}ms
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TelemetryWidget;
