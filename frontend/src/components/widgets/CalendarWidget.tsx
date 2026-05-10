import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { float, panelReveal, breathe } from '../animations/variants';

const CalendarWidget: React.FC = () => {
  const [dateText, setDateText] = useState('');
  const fullDate = 'OCT 24';

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDateText(fullDate.substring(0, i));
      i++;
      if (i > fullDate.length) clearInterval(interval);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const events = [
    { time: '14:00', title: 'Core Sync', active: true },
    { time: '16:30', title: 'Archive Sweep', active: false },
  ];

  return (
    <motion.div 
      variants={panelReveal}
      initial="hidden"
      animate="visible"
      className="absolute top-48 left-12"
    >
      <motion.div 
        variants={float(0.5, 3)}
        animate="animate"
        whileHover={{ x: 8, borderColor: 'rgba(235, 178, 255, 0.3)' }}
        className="w-48 holographic-glass rounded-3xl p-6 pointer-events-auto transition-all duration-500 border border-transparent"
      >
        <div className="flex justify-between items-center mb-6">
          <span className="font-label-caps text-[10px] text-secondary tracking-widest min-w-[50px]">
            {dateText}
          </span>
          <span className="material-symbols-outlined text-secondary/40 text-sm">calendar_today</span>
        </div>
        <div className="space-y-3">
          {events.map((event, i) => (
            <motion.div 
              key={i}
              whileHover={{ x: 4, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
              className={`p-3 rounded-xl border-l transition-colors duration-300 relative overflow-hidden ${event.active ? 'bg-primary-fixed-dim/5 border-primary-fixed-dim/40' : 'bg-white/5 border-white/10 opacity-40'}`}
            >
              {event.active && (
                <motion.div 
                  variants={breathe(0.05, 0.1)}
                  animate="animate"
                  className="absolute inset-0 bg-primary-fixed-dim"
                />
              )}
              <div className="relative z-10">
                <div className="text-[9px] font-label-caps opacity-40">{event.time}</div>
                <div className="text-xs font-body-md tracking-wide">{event.title}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CalendarWidget;
