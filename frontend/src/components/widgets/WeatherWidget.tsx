import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { float, panelReveal } from '../animations/variants';

const WeatherWidget: React.FC = () => {
  const [temp, setTemp] = useState(0);

  useEffect(() => {
    let current = 0;
    const target = 24;
    const interval = setInterval(() => {
      if (current < target) {
        current += 1;
        setTemp(current);
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      variants={panelReveal}
      initial="hidden"
      animate="visible"
      className="absolute top-24 right-24"
    >
      <motion.div 
        variants={float(0, 3)}
        animate="animate"
        whileHover={{ scale: 1.02, borderColor: 'rgba(0, 219, 233, 0.4)' }}
        className="w-64 holographic-glass rounded-3xl p-8 pointer-events-auto transition-colors duration-500 border border-transparent"
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="font-display-lg text-lg tracking-wide opacity-80">Neo-Tokyo</h3>
            <p className="font-label-caps text-[10px] opacity-40 uppercase">Digital Dusk</p>
          </div>
          <motion.span 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="material-symbols-outlined text-3xl text-primary-fixed-dim glow-cyan"
          >
            cloud_queue
          </motion.span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-display-lg text-primary">{temp}°</span>
          <div className="flex flex-col">
            <span className="text-primary-fixed-dim/60 font-label-caps text-[9px] tracking-widest flex items-center">
              OPTIMAL_STATE
              <motion.span 
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-1 h-3 bg-primary-fixed-dim/60 ml-1"
              />
            </span>
          </div>
        </div>
        <div className="mt-6 h-0.5 w-full bg-white/5 rounded-full overflow-hidden relative">
          <motion.div 
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 w-2/3 bg-gradient-to-r from-transparent via-primary-fixed-dim to-transparent glow-cyan" 
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WeatherWidget;
