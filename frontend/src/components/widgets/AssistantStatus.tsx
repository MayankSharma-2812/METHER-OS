import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { panelReveal, float } from '../animations/variants';

const AssistantStatus: React.FC = () => {
  const [text, setText] = useState('');
  const fullText = 'Listening for commands...';

  useEffect(() => {
    let i = 0;
    let isDeleting = false;
    
    const interval = setInterval(() => {
      if (!isDeleting) {
        setText(fullText.substring(0, i));
        i++;
        if (i > fullText.length) {
          isDeleting = true;
          setTimeout(() => {}, 2000); // Pause at end
        }
      } else {
        setText(fullText.substring(0, i));
        i--;
        if (i === 0) {
          isDeleting = false;
        }
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      variants={panelReveal}
      initial="hidden"
      animate="visible"
      className="absolute bottom-32 right-1/4"
    >
      <motion.div 
        variants={float(1.5, 3)}
        animate="animate"
        whileHover={{ scale: 1.05, paddingRight: '2.5rem' }}
        className="holographic-glass rounded-full px-6 py-4 flex items-center gap-4 pointer-events-auto transition-all duration-500 cursor-pointer group"
      >
        <div className="relative w-10 h-10">
          <motion.div 
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.1, 0.3]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-emerald-400/20 rounded-full" 
          />
          <div className="relative w-full h-full rounded-full border border-primary-fixed-dim/30 flex items-center justify-center bg-black/40">
            <motion.div 
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" 
            />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-label-caps text-[8px] text-primary-fixed-dim tracking-[0.2em]">METHER_AI</span>
          <span className="text-xs font-body-md opacity-80 min-w-[160px]">
            {text}
            <motion.span 
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="inline-block w-1 h-3 bg-primary-fixed-dim ml-1 align-middle"
            />
          </span>
        </div>
        
        {/* Hidden info that appears on hover */}
        <motion.div 
          className="absolute right-6 opacity-0 group-hover:opacity-40 transition-opacity"
        >
          <span className="material-symbols-outlined text-sm">chevron_right</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default AssistantStatus;
