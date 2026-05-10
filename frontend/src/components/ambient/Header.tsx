import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface HeaderProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab = 'TELEMETRY', onTabChange }) => {
  const [statusText, setStatusText] = useState('');
  const fullStatus = 'NODE_04 ACTIVE';

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setStatusText(fullStatus.substring(0, i));
      i++;
      if (i > fullStatus.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 h-20 px-12 flex justify-between items-center bg-gradient-to-b from-black/60 to-transparent backdrop-blur-[2px]"
    >
      <div className="flex items-center gap-10">
        <div className="flex flex-col group cursor-pointer">
          <span className="font-display-lg text-2xl tracking-[0.2em] text-primary-fixed-dim glow-cyan group-hover:text-white transition-colors duration-500">METHER OS</span>
          <span className="font-label-caps text-[8px] tracking-[0.4em] opacity-40 uppercase group-hover:opacity-60 transition-opacity">Neural Infrastructure v2.4</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          {['TELEMETRY', 'DIAGNOSTICS', 'NETWORK'].map((item) => {
            const isActive = activeTab === item;
            return (
              <div key={item} className="relative py-1 cursor-pointer group" onClick={() => onTabChange?.(item)}>
                <span className={`text-sm tracking-widest font-label-caps transition-all duration-500 ${isActive ? 'text-primary-fixed-dim glow-cyan' : 'text-on-surface-variant/40 group-hover:text-primary-fixed-dim/70'}`}>
                  {item}
                </span>
                {isActive && (
                  <motion.div 
                    layoutId="header-nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-primary-fixed-dim shadow-[0_0_8px_rgba(0,219,233,0.8)]"
                  />
                )}
              </div>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3 px-4 py-1.5 border border-white/5 rounded-full bg-white/5">
          <motion.div 
            animate={{ 
              opacity: [1, 0.4, 1],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 1.4, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" 
          />
          <span className="font-label-caps text-[10px] tracking-widest text-on-surface-variant min-w-[110px]">
            {statusText}
            <motion.span 
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="inline-block w-1 h-3 bg-emerald-400 ml-1"
            />
          </span>
        </div>
        
        <div className="flex items-center gap-5">
          <motion.button 
            whileHover={{ rotate: 90, scale: 1.1 }}
            className="material-symbols-outlined text-on-surface-variant/60 hover:text-primary-fixed transition-all text-xl cursor-pointer"
          >
            settings
          </motion.button>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-10 h-10 rounded-full border border-primary-fixed-dim/30 p-0.5 overflow-hidden ring-4 ring-primary-fixed-dim/5 cursor-pointer"
          >
            <img 
              alt="AI Core Avatar" 
              className="w-full h-full rounded-full object-cover grayscale brightness-125" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRit3s7REW24w1r121_frQBfZkJcfuqjIpxRmil8ZwS8FzVdE8dy5YAnUz7zSNYv0lnscvQ5GPGha7snF4NivafJ-baI_xfuJKvifUkoPYLEnpH8VCGXh5wl7yfRHw5FGj76V7f3-DdOt1NfqTo3QX5_5z6vj9wRiFIJGrICql8CEa7SBqPj90Zd4M6YX7kBxPkyfoabIXTJV6X-ydRCncHxRkcJ1LtRog4a_V3V1k6Ag9ZrUgSife3rp2tk7oA_5I4y6VQk00DDwI" 
            />
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
