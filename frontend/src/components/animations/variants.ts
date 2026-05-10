import type { Variants } from 'framer-motion';

// Panel entry
export const panelReveal: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" } 
  }
};

// Float animation (for widgets)
export const float = (delay = 0, distance = 4): Variants => ({
  animate: {
    y: [0, -distance, 0],
    transition: { 
      duration: 6, 
      repeat: Infinity,
      ease: "easeInOut", 
      delay 
    }
  }
});

// Breathing glow (for core + active elements)
export const breathe = (minOpacity = 0.6, maxOpacity = 1.0): Variants => ({
  animate: {
    opacity: [minOpacity, maxOpacity, minOpacity],
    scale: [1, 1.02, 1],
    transition: { 
      duration: 4, 
      repeat: Infinity,
      ease: "easeInOut" 
    }
  }
});

// Pulse (for status indicators)
export const pulse: Variants = {
  animate: {
    opacity: [1, 0.3, 1],
    transition: { 
      duration: 1.4, 
      repeat: Infinity,
      ease: "easeInOut" 
    }
  }
};

// Stagger container (for lists)
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.1, 
      delayChildren: 0.2 
    }
  }
};

// Stagger child
export const staggerChild: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" } 
  }
};

// Rotate (for rings)
export const rotateClockwise = (duration = 20): Variants => ({
  animate: {
    rotate: 360,
    transition: { duration, repeat: Infinity, ease: "linear" }
  }
});

export const rotateCounter = (duration = 15): Variants => ({
  animate: {
    rotate: -360,
    transition: { duration, repeat: Infinity, ease: "linear" }
  }
});

// Legacy variants for backward compatibility
export const fadeIn = (delay: number = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8, delay }
});

export const slideUp = (delay: number = 0) => ({
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.6, ease: "easeOut", delay }
});
