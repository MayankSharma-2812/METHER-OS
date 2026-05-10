import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timeline = [
      { delay: 300, next: 1 },    // METHER OS fades in
      { delay: 800, next: 2 },    // NEURAL INFRASTRUCTURE appears
      { delay: 400, next: 3 },    // Line expands
      { delay: 400, next: 4 },    // INITIALIZING SYSTEMS
      { delay: 400, next: 5 },    // Random hex scrolling
      { delay: 400, next: 6 },    // Fade out
    ];

    let currentTimeout: any;

    const runTimeline = (index: number) => {
      if (index >= timeline.length) {
        onComplete();
        return;
      }

      currentTimeout = setTimeout(() => {
        setStep(timeline[index].next);
        runTimeline(index + 1);
      }, timeline[index].delay);
    };

    runTimeline(0);

    return () => clearTimeout(currentTimeout);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-background flex items-center justify-center font-label-caps overflow-hidden">
      <AnimatePresence>
        {step < 6 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center"
          >
            {step >= 1 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl tracking-[0.4em] text-primary-fixed-dim glow-cyan mb-2"
              >
                METHER OS
              </motion.div>
            )}
            
            {step >= 2 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                className="text-[10px] tracking-[0.5em] text-on-surface uppercase mb-8"
              >
                NEURAL INFRASTRUCTURE v2.4
              </motion.div>
            )}

            {step >= 3 && (
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '240px' }}
                className="h-[1px] bg-primary-fixed-dim/30 mb-8"
              />
            )}

            {step >= 4 && (
              <motion.div className="flex items-center gap-2 text-xs text-primary-fixed-dim/60">
                <span className="tracking-widest">INITIALIZING SYSTEMS...</span>
                <motion.span 
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  className="w-2 h-4 bg-primary-fixed-dim"
                />
              </motion.div>
            )}

            {step >= 5 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                className="absolute inset-0 p-12 overflow-hidden pointer-events-none text-[10px] text-primary-fixed-dim leading-tight break-all"
              >
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="mb-1">
                    {Math.random().toString(16).substring(2).toUpperCase()}
                    {Math.random().toString(16).substring(2).toUpperCase()}
                    {Math.random().toString(16).substring(2).toUpperCase()}
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BootSequence;
