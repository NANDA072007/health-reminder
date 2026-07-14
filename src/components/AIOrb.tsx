import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Sparkles, Activity } from 'lucide-react';

interface AIOrbProps {
  isListening?: boolean;
  isTyping?: boolean;
}

export default function AIOrb({ isListening = false, isTyping = false }: AIOrbProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  // Mouse coordinate motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for cursor reactivity
  const springConfig = { stiffness: 100, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-15, 15]), springConfig);
  const translateX = useSpring(useTransform(mouseX, [-200, 200], [-10, 10]), springConfig);
  const translateY = useSpring(useTransform(mouseY, [-200, 200], [-10, 10]), springConfig);

  // Inverse shadow animations (shadow shrinks as orb rises)
  const shadowScale = useTransform(translateY, [-10, 10], [0.85, 1.15]);
  const shadowOpacity = useTransform(translateY, [-10, 10], [0.35, 0.65]);

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  // Particles list
  const [particles] = useState(() => 
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      angle: (i * Math.PI * 2) / 18,
      radius: 48 + Math.random() * 25,
      size: 1.5 + Math.random() * 2.5,
      speed: 0.4 + Math.random() * 0.8,
    }))
  );

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-72 h-72 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing select-none"
      style={{ perspective: 1000 }}
    >
      {/* 3D Container responsive to Mouse springs */}
      <motion.div
        style={{
          rotateX: isTouch ? 0 : rotateX,
          rotateY: isTouch ? 0 : rotateY,
          x: isTouch ? 0 : translateX,
          y: isTouch ? 0 : translateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          y: isHovered ? [-4, 4, -4] : [-8, 8, -8],
        }}
        transition={{
          y: {
            repeat: Infinity,
            duration: 4,
            ease: 'easeInOut',
          },
        }}
        className="relative w-64 h-64 flex items-center justify-center z-10"
      >
        {/* Outer Rotating Cyber Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
          className="absolute w-56 h-56 rounded-full border border-dashed border-brand-emerald/30 dark:border-brand-emerald/20 p-2 flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d', translateZ: -20 }}
        >
          {/* Orbital nodes on ring */}
          <div className="absolute top-0 w-2.5 h-2.5 rounded-full bg-brand-emerald shadow-lg shadow-brand-emerald/80" />
          <div className="absolute bottom-0 w-2 h-2 rounded-full bg-brand-sky shadow-lg shadow-brand-sky/80" />
        </motion.div>

        {/* Inner Rotating Glass Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
          className="absolute w-44 h-44 rounded-full border border-white/20 dark:border-white/5 bg-gradient-to-tr from-white/5 to-white/10 dark:from-white/2 dark:to-white/5 backdrop-blur-xs flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d', translateZ: 10 }}
        >
          <div className="absolute left-0 w-1.5 h-1.5 rounded-full bg-brand-sky" />
          <div className="absolute right-0 w-1.5 h-1.5 rounded-full bg-brand-emerald" />
        </motion.div>

        {/* Pulse Ripple Waves (Active voice state) */}
        {(isListening || isTyping) && (
          <>
            <motion.div
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ scale: 1.8, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeOut' }}
              className="absolute w-36 h-36 rounded-full border-2 border-brand-emerald/40 pointer-events-none"
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0.4 }}
              animate={{ scale: 2.2, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeOut', delay: 0.5 }}
              className="absolute w-36 h-36 rounded-full border border-brand-sky/30 pointer-events-none"
            />
          </>
        )}

        {/* Glowing Orb Sphere Glass Case */}
        <div
          className="absolute w-36 h-36 rounded-full bg-gradient-to-tr from-brand-emerald/20 via-slate-900/40 to-brand-sky/20 dark:from-brand-emerald/10 dark:via-slate-950/60 dark:to-brand-sky/10 backdrop-blur-sm border border-white/30 dark:border-white/10 shadow-[0_0_50px_rgba(16,185,129,0.15)] flex items-center justify-center overflow-hidden"
          style={{ transformStyle: 'preserve-3d', translateZ: 30 }}
        >
          {/* Rotating Highlight Reflection Reflection Glass */}
          <div className="absolute top-1.5 left-6 w-12 h-6 rounded-full bg-gradient-to-b from-white/30 to-transparent filter blur-[1px] rotate-[-15deg] pointer-events-none" />

          {/* Deep Core Pulse Element */}
          <motion.div
            animate={{
              scale: isListening ? [1, 1.25, 1] : isTyping ? [1, 1.15, 1] : [1, 1.05, 1],
              opacity: isListening ? [0.8, 1, 0.8] : [0.7, 0.9, 0.7],
            }}
            transition={{
              repeat: Infinity,
              duration: isListening ? 1.2 : 2.5,
              ease: 'easeInOut',
            }}
            className="w-16 h-16 rounded-full bg-gradient-to-tr from-brand-emerald via-teal-400 to-brand-sky filter blur-[4px] relative flex items-center justify-center"
          >
            {/* Plasma Glow Dots inside Core */}
            <div className="absolute w-6 h-6 rounded-full bg-white filter blur-[2px] animate-pulse" />
          </motion.div>

          {/* Liquid Swirling Plasma Rings inside Glass */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
            className="absolute inset-4 rounded-full border border-brand-emerald/20 dark:border-brand-emerald/10 border-t-brand-sky border-b-brand-emerald mix-blend-screen opacity-60"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 5, ease: 'linear' }}
            className="absolute inset-8 rounded-full border border-brand-sky/10 dark:border-brand-sky/5 border-l-brand-emerald border-r-teal-400 mix-blend-screen opacity-50"
          />
        </div>

        {/* Orbiting Particle Cloud */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            animate={{
              x: [
                Math.cos(p.angle) * p.radius,
                Math.cos(p.angle + Math.PI) * p.radius,
                Math.cos(p.angle + Math.PI * 2) * p.radius,
              ],
              y: [
                Math.sin(p.angle) * p.radius * 0.4,
                Math.sin(p.angle + Math.PI) * p.radius * 0.4,
                Math.sin(p.angle + Math.PI * 2) * p.radius * 0.4,
              ],
              scale: [0.6, 1.2, 0.6],
              opacity: [0.3, 0.9, 0.3],
            }}
            transition={{
              repeat: Infinity,
              duration: 8 / p.speed,
              ease: 'linear',
            }}
            className="absolute w-1 h-1 rounded-full pointer-events-none"
            style={{
              width: p.size,
              height: p.size,
              background: p.id % 2 === 0 ? '#10B981' : '#38BDF8',
              boxShadow: `0 0 6px ${p.id % 2 === 0 ? '#10B981' : '#38BDF8'}`,
              translateZ: p.id % 2 === 0 ? 50 : -40,
            }}
          />
        ))}
      </motion.div>

      {/* Fuzzy Soft Ambient Drop Shadow underneath */}
      <motion.div
        style={{
          scale: shadowScale,
          opacity: shadowOpacity,
        }}
        className="absolute bottom-2 w-28 h-4 rounded-full bg-slate-900/20 dark:bg-black/40 filter blur-md pointer-events-none z-0"
      />

      {/* Live AI Status Pill */}
      <div className="absolute bottom-8 px-3.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 flex items-center gap-1.5 shadow-lg z-20">
        <span className={`w-1.5 h-1.5 rounded-full ${isListening ? 'bg-brand-rose animate-ping' : isTyping ? 'bg-brand-emerald animate-bounce' : 'bg-brand-emerald animate-pulse'}`} />
        <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest font-mono">
          {isListening ? 'VOICE REC' : isTyping ? 'ENGINE ACTIVE' : 'ORB STANDBY'}
        </span>
      </div>
    </div>
  );
}
