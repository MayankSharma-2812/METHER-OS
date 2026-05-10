import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type VoiceState = 'idle' | 'listening' | 'processing' | 'responding';

interface VoiceBarProps {
  voiceState?: VoiceState;
}

const VoiceBar: React.FC<VoiceBarProps> = ({ voiceState: propState }) => {
  const [internalState, setInternalState] = useState<VoiceState>('idle');
  
  useEffect(() => {
    if (propState) {
      setInternalState(propState);
      return;
    }

    const states: VoiceState[] = ['idle', 'listening', 'processing', 'responding'];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % states.length;
      setInternalState(states[index]);
    }, 4000);
    return () => clearInterval(interval);
  }, [propState]);

  const stateConfig = {
    idle: {
      placeholder: "Express a neural directive...",
      icon: "mic",
      glow: "rgba(0,219,233,0.1)",
      micGlow: "opacity-40"
    },
    listening: {
      placeholder: "Listening for neural directive...",
      icon: "mic",
      glow: "rgba(255,100,150,0.2)",
      micGlow: "opacity-100 text-red-400"
    },
    processing: {
      placeholder: "Processing...",
      icon: "refresh",
      glow: "rgba(0,219,233,0.3)",
      micGlow: "animate-spin opacity-60"
    },
    responding: {
      placeholder: "METHER OS responding...",
      icon: "volume_up",
      glow: "rgba(0,219,233,0.4)",
      micGlow: "opacity-100"
    }
  };

  const current = stateConfig[internalState];

  return (
    <footer className="fixed bottom-12 left-1/2 -translate-x-1/2 w-full max-w-xl z-50 px-8 transform-gpu">
      <div className="relative group">
        {/* Volumetric Ambient Light under the bar (Optimized blur) */}
        <motion.div 
          animate={{ opacity: internalState !== 'idle' ? 0.8 : 0.3 }}
          className="absolute inset-x-0 -bottom-8 h-16 bg-primary-fixed-dim/10 blur-[40px] rounded-full transition-opacity duration-1000 will-change-opacity" 
        />
        
        <motion.div 
          animate={{ 
            boxShadow: `0 0 15px ${current.glow}`,
            borderColor: internalState !== 'idle' ? 'rgba(0,219,233,0.3)' : 'rgba(255,255,255,0.05)'
          }}
          className="holographic-glass rounded-full h-14 flex items-center px-6 gap-5 border transition-all duration-500 overflow-hidden relative accelerate"
        >
          <AnimatePresence>
            {internalState === 'listening' && (
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary-fixed-dim to-transparent will-change-transform"
              />
            )}
          </AnimatePresence>

          <motion.span 
            animate={internalState === 'listening' ? { opacity: [0.7, 1, 0.7] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
            className={`material-symbols-outlined transition-colors duration-500 ${internalState === 'idle' ? 'text-primary-fixed-dim' : 'text-primary-container'} ${current.micGlow} will-change-opacity`}
          >
            {current.icon}
          </motion.span>
          
          <div className="flex-1">
            <input 
              className="w-full bg-transparent border-none focus:ring-0 text-on-surface font-body-md placeholder:text-on-surface-variant/20 text-sm tracking-wide outline-none" 
              placeholder={current.placeholder}
              type="text"
              readOnly={internalState !== 'idle'}
            />
          </div>
          
          {/* Waveform Visualization (Simplified animations) */}
          <div className="flex gap-1 items-center h-5 px-2">
            {[1, 2, 3, 4, 5, 6, 7].map((_, i) => (
              <motion.div
                key={i}
                animate={
                  internalState === 'idle' ? { height: '20%' } :
                  internalState === 'listening' ? { height: ['30%', '70%', '30%'] } :
                  internalState === 'processing' ? { height: '40%', opacity: [0.3, 0.6, 0.3] } :
                  { height: ['40%', '90%', '40%'] }
                }
                transition={{ 
                  duration: internalState === 'listening' ? 0.4 : 0.8, 
                  repeat: Infinity, 
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
                className={`w-0.5 rounded-full bg-primary-fixed-dim ${internalState !== 'idle' ? 'opacity-80' : 'opacity-20'} will-change-[height,opacity]`}
              />
            ))}
          </div>
          
          <button className="material-symbols-outlined text-on-surface-variant/30 hover:text-primary-fixed-dim transition-colors cursor-pointer">
            send
          </button>
        </motion.div>
      </div>
    </footer>
  );
};

export default VoiceBar;
