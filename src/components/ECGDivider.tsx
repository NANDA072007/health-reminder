import React from 'react';
import { motion } from 'motion/react';

export default function ECGDivider() {
  return (
    <div className="relative w-full h-12 flex items-center justify-center overflow-hidden pointer-events-none z-15 bg-transparent my-1">
      {/* Soft gradient backgrounds for smooth blend */}
      <div className="absolute inset-x-0 h-px bg-slate-200/60 dark:bg-white/10" />
      
      {/* Pulse Beam container */}
      <div className="absolute w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
        <svg
          className="w-full h-10 stroke-brand-emerald fill-none opacity-45 dark:opacity-60 overflow-visible"
          viewBox="0 0 1200 40"
          preserveAspectRatio="none"
        >
          {/* Animated path simulating ECG pulse heartbeat drifting across the screen */}
          <motion.path
            d="M0,20 L380,20 L395,20 L402,10 L409,32 L416,5 L423,23 L430,20 L450,20 L750,20 L765,20 L772,10 L779,32 L786,5 L793,23 L800,20 L820,20 L1200,20"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0.2, pathOffset: 0 }}
            animate={{
              pathOffset: [0, 1],
              pathLength: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
            className="filter drop-shadow-[0_0_4px_rgba(16,185,129,0.5)]"
          />
          {/* Faded background path for structural outline */}
          <path
            d="M0,20 L380,20 L395,20 L402,10 L409,32 L416,5 L423,23 L430,20 L450,20 L750,20 L765,20 L772,10 L779,32 L786,5 L793,23 L800,20 L820,20 L1200,20"
            strokeWidth="1"
            stroke="currentColor"
            className="text-slate-200/40 dark:text-white/5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
