import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerChild, float, breathe } from '../animations/variants';

const Sidebar: React.FC = () => {
  const menuItems = [
    { icon: 'hub', label: 'CORE HUB' },
    { icon: 'psychology', label: 'NEURAL HUB', active: true },
    { icon: 'database', label: 'MEMORY BANK' },
    { icon: 'account_tree', label: 'LOGIC FLOW' },
    { icon: 'folder_open', label: 'ARCHIVES' },
  ];

  return (
    <motion.aside 
      variants={float(0, 3)}
      animate="animate"
      className="fixed left-12 top-1/2 -translate-y-1/2 z-40 w-16 group hover:w-56 transition-all duration-700 ease-out"
    >
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="holographic-glass rounded-full py-8 flex flex-col items-center gap-6 overflow-hidden backdrop-blur-xl border-white/10"
      >
        {/* Top Logo Icon */}
        <motion.div variants={staggerChild} className="p-2 mb-4">
          <motion.div 
            whileHover={{ rotate: 180, scale: 1.1 }}
            className="w-8 h-8 rounded-lg bg-primary-fixed-dim/10 flex items-center justify-center border border-primary-fixed-dim/30 cursor-pointer transition-all duration-500"
          >
            <span className="material-symbols-outlined text-primary-fixed-dim text-lg">hub</span>
          </motion.div>
        </motion.div>

        <nav className="flex flex-col w-full">
          {menuItems.filter(i => i.icon !== 'hub').map((item, index) => (
            <motion.div 
              key={index}
              variants={staggerChild}
              className={`relative ${item.active ? 'nav-item-active' : ''} group/item flex items-center gap-6 px-4 py-4 cursor-pointer transition-all hover:bg-white/5`}
            >
              <div className="relative">
                {item.active && (
                  <motion.div 
                    variants={breathe(0.2, 0.6)}
                    animate="animate"
                    className="absolute inset-0 bg-primary-fixed-dim rounded-full blur-md"
                  />
                )}
                <motion.span 
                  whileHover={{ scale: 1.15 }}
                  className={`material-symbols-outlined shrink-0 relative z-10 transition-colors duration-300 ${item.active ? 'text-primary-fixed-dim glow-cyan' : 'text-on-surface-variant/40 group-hover/item:text-primary-fixed-dim'}`}
                >
                  {item.icon}
                </motion.span>
              </div>
              
              <span className="font-label-caps text-[10px] tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-[-10px] group-hover:translate-x-0">
                {item.label}
              </span>

              {/* Tooltip on hover (simplified as label sliding in) */}
            </motion.div>
          ))}
        </nav>

        <motion.div variants={staggerChild} className="mt-auto pb-4">
          <motion.span 
            whileHover={{ scale: 1.2, color: '#00dbe9' }}
            className="material-symbols-outlined text-on-surface-variant/20 cursor-pointer transition-colors"
          >
            security
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.aside>
  );
};

export default Sidebar;
