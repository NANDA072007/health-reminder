import { useState, useEffect, MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Pill, Droplet, Activity, ArrowRight, Sparkles, Clock, Heart, Shield, Cpu } from 'lucide-react';

interface HeroProps {
  onTryDemoClick: () => void;
}

export default function Hero({ onTryDemoClick }: HeroProps) {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches
      );
    };
    checkTouch();
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice) return;
    const rect = e.currentTarget.getBoundingClientRect();
    // Calculate normalized offset from center (-0.5 to 0.5)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  // Eased spring coordinates
  const springConfig = { damping: 28, stiffness: 100, mass: 1 };
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    mouseX.set(mousePosition.x);
    mouseY.set(mousePosition.y);
  }, [mousePosition, mouseX, mouseY]);

  // Transform mappings
  // Background blobs slow drifting
  const blob1X = useTransform(springX, [-0.5, 0.5], [-40, 40]);
  const blob1Y = useTransform(springY, [-0.5, 0.5], [-40, 40]);

  const blob2X = useTransform(springX, [-0.5, 0.5], [40, -40]);
  const blob2Y = useTransform(springY, [-0.5, 0.5], [40, -40]);

  const blob3X = useTransform(springX, [-0.5, 0.5], [-20, 20]);
  const blob3Y = useTransform(springY, [-0.5, 0.5], [20, -20]);

  // Phone Mockup (rotated ±5° on cursor move)
  const phoneRotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const phoneRotateY = useTransform(springX, [-0.5, 0.5], [-5, 5]);
  const phoneTranslateX = useTransform(springX, [-0.5, 0.5], [-12, 12]);
  const phoneTranslateY = useTransform(springY, [-0.5, 0.5], [-12, 12]);

  // 3D Reflections overlay offset
  const reflectionX = useTransform(springX, [-0.5, 0.5], [30, -30]);
  const reflectionY = useTransform(springY, [-0.5, 0.5], [30, -30]);

  // Floating reminder cards (Independent movement maintaining 3D perspective)
  const card1X = useTransform(springX, [-0.5, 0.5], [-45, 45]);
  const card1Y = useTransform(springY, [-0.5, 0.5], [-45, 45]);

  const card2X = useTransform(springX, [-0.5, 0.5], [50, -50]);
  const card2Y = useTransform(springY, [-0.5, 0.5], [-35, 35]);

  const card3X = useTransform(springX, [-0.5, 0.5], [-35, 35]);
  const card3Y = useTransform(springY, [-0.5, 0.5], [40, -40]);

  // 3D Background health objects parallax transforms
  const capsuleX = useTransform(springX, [-0.5, 0.5], [-30, 30]);
  const capsuleY = useTransform(springY, [-0.5, 0.5], [-30, 30]);

  const dropX = useTransform(springX, [-0.5, 0.5], [40, -40]);
  const dropY = useTransform(springY, [-0.5, 0.5], [-25, 25]);

  const heartX = useTransform(springX, [-0.5, 0.5], [-20, 20]);
  const heartY = useTransform(springY, [-0.5, 0.5], [20, -20]);

  const watchX = useTransform(springX, [-0.5, 0.5], [35, -35]);
  const watchY = useTransform(springY, [-0.5, 0.5], [35, -35]);

  const stethoscopeX = useTransform(springX, [-0.5, 0.5], [-50, 50]);
  const stethoscopeY = useTransform(springY, [-0.5, 0.5], [40, -40]);

  const ecgX = useTransform(springX, [-0.5, 0.5], [25, -25]);
  const ecgY = useTransform(springY, [-0.5, 0.5], [-45, 45]);

  const chipX = useTransform(springX, [-0.5, 0.5], [-15, 15]);
  const chipY = useTransform(springY, [-0.5, 0.5], [-15, 15]);

  // Final mobile-disabled values
  const finalRotateX = isTouchDevice ? 0 : phoneRotateX;
  const finalRotateY = isTouchDevice ? 0 : phoneRotateY;
  const finalTranslateX = isTouchDevice ? 0 : phoneTranslateX;
  const finalTranslateY = isTouchDevice ? 0 : phoneTranslateY;

  // Render 25 static floating particles data
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    top: `${(i * 17) % 100}%`,
    left: `${(i * 23) % 100}%`,
    size: ((i * 3) % 4) + 2, // 2px to 5px
    delay: (i * 0.4) % 4,
    duration: ((i * 7) % 8) + 12, // 12s to 20s
  }));

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen pt-32 pb-20 flex items-center overflow-hidden bg-slate-50/40 dark:bg-[#070b14] transition-colors duration-300"
    >
      {/* Premium 3D Background - Mesh gradients and soft moving blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        
        {/* Subtle radial base background lighting */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(16,185,129,0.04),transparent_50%)]" />

        {/* Moving Blobs */}
        <motion.div
          style={{ x: blob1X, y: blob1Y }}
          className="absolute top-[8%] right-[4%] w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.12)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(16,185,129,0.06)_0%,transparent_70%)] filter blur-2xl"
        />
        <motion.div
          style={{ x: blob2X, y: blob2Y }}
          className="absolute bottom-[10%] left-[2%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.12)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(56,189,248,0.06)_0%,transparent_70%)] filter blur-2xl"
        />
        <motion.div
          style={{ x: blob3X, y: blob3Y }}
          className="absolute top-[35%] left-[25%] w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,rgba(147,51,234,0.07)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(147,51,234,0.04)_0%,transparent_70%)] filter blur-2xl"
        />

        {/* Floating Particles */}
        <div className="absolute inset-0 z-0">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 100 }}
              animate={{ 
                opacity: [0, 0.6, 0.6, 0],
                y: [-20, -180],
                x: [0, Math.sin(p.id) * 15, -Math.sin(p.id) * 15]
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: "easeInOut"
              }}
              style={{
                position: "absolute",
                top: p.top,
                left: p.left,
                width: p.size,
                height: p.size,
                borderRadius: "50%",
                background: p.id % 2 === 0 ? "#10B981" : "#38BDF8",
                boxShadow: p.id % 2 === 0 ? "0 0 8px rgba(16,185,129,0.5)" : "0 0 8px rgba(56,189,248,0.5)",
              }}
            />
          ))}
        </div>

        {/* ----------------- Premium 3D Floating Health Objects ----------------- */}
        
        {/* 1. 3D Glass Capsule (Top Left Background) */}
        <motion.div
          style={{ x: capsuleX, y: capsuleY }}
          animate={{ y: [0, -12, 0], rotate: [20, 24, 20] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[18%] left-[6%] z-10 select-none hidden xl:block pointer-events-none hover:scale-105 transition-transform"
        >
          <div className="w-12 h-24 rounded-full bg-slate-900/10 dark:bg-white/5 backdrop-blur-md border border-white/20 shadow-[0_12px_30px_rgba(16,185,129,0.15),inset_0_2px_8px_rgba(255,255,255,0.4)] flex flex-col overflow-hidden relative">
            <div className="h-1/2 bg-gradient-to-b from-brand-emerald/75 to-teal-500/50 flex items-center justify-center relative">
              <div className="absolute top-1.5 left-2 w-2.5 h-6 bg-white/40 rounded-full filter blur-[1px]" />
            </div>
            <div className="h-1/2 bg-gradient-to-b from-white/20 to-white/5 flex items-center justify-center relative">
              <div className="absolute top-1.5 left-2 w-2.5 h-6 bg-white/20 rounded-full filter blur-[1px]" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-black/10 mix-blend-overlay" />
          </div>
        </motion.div>

        {/* 2. 3D Glass Water Droplet (Bottom Right Background) */}
        <motion.div
          style={{ x: dropX, y: dropY }}
          animate={{ y: [0, 10, 0], rotate: [45, 52, 45] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[15%] right-[10%] z-10 select-none hidden xl:block pointer-events-none"
        >
          <div className="w-16 h-16 rounded-[0_50%_50%_50%] bg-gradient-to-br from-brand-sky/60 via-blue-500/40 to-indigo-600/10 backdrop-blur-md border border-white/25 shadow-[0_12px_35px_rgba(56,189,248,0.2),inset_0_2px_8px_rgba(255,255,255,0.5)] relative">
            <div className="absolute top-2.5 left-2.5 w-4.5 h-8 bg-white/40 rounded-full -rotate-45 filter blur-[0.5px]" />
            <div className="absolute bottom-2 right-2 w-6 h-6 bg-brand-sky/30 rounded-full filter blur-md" />
          </div>
        </motion.div>

        {/* 3. 3D Glass Heart (Middle Right behind Phone) */}
        <motion.div
          style={{ x: heartX, y: heartY }}
          animate={{ y: [0, -15, 0], scale: [1, 1.04, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-[28%] right-[32%] z-0 select-none hidden xl:block pointer-events-none opacity-45 dark:opacity-30"
        >
          <div className="w-14 h-14 bg-gradient-to-br from-rose-500/50 to-red-600/20 backdrop-blur-lg border border-white/10 shadow-[0_15px_40px_rgba(244,63,94,0.2),inset_0_2px_8px_rgba(255,255,255,0.4)] flex items-center justify-center relative rounded-2xl rotate-45">
            <div className="absolute inset-0 flex items-center justify-center -rotate-45">
              <Heart className="w-7 h-7 text-white/90 fill-white/10" />
            </div>
            <div className="absolute top-1.5 left-3 w-3 h-1.5 bg-white/35 rounded-full filter blur-[0.5px]" />
          </div>
        </motion.div>

        {/* 4. 3D Glass Smartwatch (Middle Left Background) */}
        <motion.div
          style={{ x: watchX, y: watchY }}
          animate={{ y: [0, 14, 0], rotate: [-10, -5, -10] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute top-[45%] left-[4%] z-10 select-none hidden xl:block pointer-events-none"
        >
          <div className="w-20 h-20 rounded-3xl bg-slate-900/10 dark:bg-white/5 backdrop-blur-md border border-white/20 shadow-[0_12px_30px_rgba(56,189,248,0.1),inset_0_2px_8px_rgba(255,255,255,0.3)] flex flex-col items-center justify-center p-3 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-sky/10 to-transparent rounded-3xl" />
            <div className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center relative">
              <div className="w-9 h-9 rounded-full bg-brand-sky/20 border border-brand-sky/30 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-brand-sky animate-ping" />
              </div>
            </div>
            <div className="absolute top-1.5 right-3 w-4 h-1 bg-white/30 rounded-full filter blur-[0.5px]" />
          </div>
        </motion.div>

        {/* 5. 3D Glass Stethoscope (Top Right Background) */}
        <motion.div
          style={{ x: stethoscopeX, y: stethoscopeY }}
          animate={{ y: [0, -8, 0], rotate: [5, 12, 5] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[12%] right-[12%] z-10 select-none hidden xl:block pointer-events-none"
        >
          <div className="w-18 h-18 rounded-full bg-slate-900/10 dark:bg-white/5 backdrop-blur-md border border-white/20 shadow-[0_12px_30px_rgba(147,51,234,0.1),inset_0_2px_8px_rgba(255,255,255,0.3)] flex items-center justify-center relative">
            <div className="w-12 h-12 rounded-full border border-dashed border-white/30 flex items-center justify-center">
              <Activity className="w-6 h-6 text-brand-purple/80" />
            </div>
            <div className="absolute top-2 left-4 w-3 h-1.5 bg-white/40 rounded-full filter blur-[0.5px]" />
          </div>
        </motion.div>

        {/* 6. 3D Glass ECG Pulse (Bottom Left Background) */}
        <motion.div
          style={{ x: ecgX, y: ecgY }}
          animate={{ y: [0, 11, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          className="absolute bottom-[18%] left-[12%] z-10 select-none hidden xl:block pointer-events-none"
        >
          <div className="w-24 h-16 rounded-2xl bg-slate-900/10 dark:bg-white/5 backdrop-blur-md border border-white/20 shadow-[0_12px_30px_rgba(16,185,129,0.1),inset_0_2px_8px_rgba(255,255,255,0.3)] p-3 relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-emerald/10 via-transparent to-transparent" />
            <svg className="w-full h-8 stroke-brand-emerald stroke-[2.5] fill-none overflow-visible" viewBox="0 0 100 30">
              <path d="M0,15 L30,15 L38,5 L46,25 L54,12 L58,18 L64,15 L100,15" className="path-pulse" />
            </svg>
            <div className="absolute top-1 left-2 w-6 h-1 bg-white/30 rounded-full filter blur-[0.5px]" />
          </div>
        </motion.div>

        {/* 7. 3D Glass AI Chip (Middle Right Background) */}
        <motion.div
          style={{ x: chipX, y: chipY }}
          animate={{ y: [0, -10, 0], rotate: [-5, 5, -5] }}
          transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
          className="absolute top-[48%] right-[5%] z-10 select-none hidden xl:block pointer-events-none"
        >
          <div className="w-20 h-20 rounded-2xl bg-slate-950/20 dark:bg-slate-900/40 backdrop-blur-xl border border-white/25 shadow-[0_15px_35px_rgba(16,185,129,0.15),inset_0_2px_8px_rgba(255,255,255,0.4)] relative p-3 flex flex-col items-center justify-center">
            {/* CPU connection legs */}
            <div className="absolute -top-1 left-1/4 right-1/4 h-1.5 flex justify-between px-1">
              <div className="w-1 h-full bg-brand-emerald/40 rounded-full" />
              <div className="w-1 h-full bg-brand-emerald/40 rounded-full" />
              <div className="w-1 h-full bg-brand-emerald/40 rounded-full" />
            </div>
            <div className="absolute -bottom-1 left-1/4 right-1/4 h-1.5 flex justify-between px-1">
              <div className="w-1 h-full bg-brand-emerald/40 rounded-full" />
              <div className="w-1 h-full bg-brand-emerald/40 rounded-full" />
              <div className="w-1 h-full bg-brand-emerald/40 rounded-full" />
            </div>
            <div className="absolute -left-1 top-1/4 bottom-1/4 w-1.5 flex flex-col justify-between py-1">
              <div className="h-1 w-full bg-brand-emerald/40 rounded-full" />
              <div className="h-1 w-full bg-brand-emerald/40 rounded-full" />
              <div className="h-1 w-full bg-brand-emerald/40 rounded-full" />
            </div>
            <div className="absolute -right-1 top-1/4 bottom-1/4 w-1.5 flex flex-col justify-between py-1">
              <div className="h-1 w-full bg-brand-emerald/40 rounded-full" />
              <div className="h-1 w-full bg-brand-emerald/40 rounded-full" />
              <div className="h-1 w-full bg-brand-emerald/40 rounded-full" />
            </div>

            <div className="w-10 h-10 rounded-lg bg-slate-950 border border-brand-emerald/30 flex items-center justify-center relative">
              <Cpu className="w-5 h-5 text-brand-emerald" />
              <div className="absolute inset-0 bg-brand-emerald/10 filter blur-xs animate-pulse rounded-lg" />
            </div>
            <div className="absolute top-1 left-3 w-4 h-1 bg-white/30 rounded-full filter blur-[0.5px]" />
          </div>
        </motion.div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
            {/* Subtle Pill Banner */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 self-center lg:self-start px-3.5 py-1.5 rounded-full bg-brand-emerald/10 border border-brand-emerald/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-brand-emerald" />
              <span className="font-sans font-semibold text-xs text-brand-emerald tracking-wide uppercase">
                Next-Gen AI Care Assistant
              </span>
            </motion.div>

            {/* Core H1 Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6.5xl tracking-tight leading-[1.1] text-brand-dark dark:text-white mb-6"
            >
              Your Personal <br />
              <span className="bg-gradient-to-r from-brand-emerald via-teal-500 to-brand-sky bg-clip-text text-transparent">
                AI Health Assistant
              </span>
            </motion.h1>

            {/* Subheading Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              className="font-sans text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              Health Reminder Plus adapts seamlessly to your lifestyle. Stay aligned with intelligent prescription tracking, hydration goals, sleep analysis, and cardiovascular vital monitoring — keeping you and your family securely protected.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
            >
              <motion.button
                onClick={onTryDemoClick}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-brand-dark dark:bg-white text-white dark:text-slate-900 font-sans font-semibold text-base shadow-xl shadow-brand-dark/15 hover:shadow-brand-dark/30 dark:shadow-none flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
              >
                Try Live Demo
                <ArrowRight className="w-5 h-5 text-white/90 dark:text-slate-800" />
              </motion.button>

              <motion.a
                href="#features"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white dark:bg-white/5 text-slate-700 dark:text-slate-200 font-sans font-semibold text-base border border-slate-200/80 dark:border-white/10 shadow-md hover:shadow-lg hover:bg-slate-50/50 dark:hover:bg-white/10 flex items-center justify-center gap-2 transition-all duration-300"
              >
                Explore Features
              </motion.a>
            </motion.div>

            {/* Feature Checkmarks Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-12 pt-8 border-t border-slate-200/60 dark:border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-left"
            >
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-brand-emerald/10 flex items-center justify-center">
                  <Shield className="w-3.5 h-3.5 text-brand-emerald" />
                </div>
                <span className="font-sans font-medium text-xs text-slate-600 dark:text-slate-400">HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-brand-emerald/10 flex items-center justify-center">
                  <Heart className="w-3.5 h-3.5 text-brand-emerald" />
                </div>
                <span className="font-sans font-medium text-xs text-slate-600 dark:text-slate-400">24/7 Monitoring</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <div className="w-5 h-5 rounded-full bg-brand-emerald/10 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-brand-emerald" />
                </div>
                <span className="font-sans font-medium text-xs text-slate-600 dark:text-slate-400">Adaptive AI Logs</span>
              </div>
            </motion.div>
          </div>

          {/* Right Hero Content (Premium 3D Floating Smartphone & Orbiting Cards) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative mt-10 lg:mt-0 select-none">
            
            {/* Visual Backing Platform Glow */}
            <div className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-brand-emerald/10 to-brand-sky/20 filter blur-3xl z-0 pointer-events-none" />

            {/* Perspective Wrapper for real 3D depth */}
            <div 
              style={{ perspective: "1500px", transformStyle: "preserve-3d" }}
              className="relative w-[300px] h-[600px] flex items-center justify-center"
            >
              
              {/* Soft Realistic Shadow beneath phone (Scales/fades with y bobbing) */}
              <motion.div
                animate={{ 
                  scale: [1, 0.92, 1],
                  opacity: [0.35, 0.2, 0.35],
                  y: [280, 280, 280]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  translateX: finalTranslateX,
                  translateZ: "-100px",
                }}
                className="absolute w-[220px] h-6 bg-slate-950/50 dark:bg-black/80 rounded-full filter blur-xl z-0 pointer-events-none"
              />

              {/* Phone Mockup Frame with slow floating bobbing */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  x: finalTranslateX,
                  rotateX: finalRotateX,
                  rotateY: finalRotateY,
                  transformStyle: 'preserve-3d',
                  translateZ: "0px",
                }}
                className="w-[280px] h-[565px] rounded-[48px] bg-slate-900 border-[1.5px] border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.1),0_0_0_8px_#1e293b,0_0_0_10px_#334155,0_0_60px_rgba(16,185,129,0.12)] relative z-10 flex flex-col overflow-hidden group"
              >
                
                {/* Multi-layer Glass Reflection Overlay (Cursor-reactive) */}
                <motion.div
                  style={{ 
                    x: reflectionX, 
                    y: reflectionY,
                  }}
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/12 mix-blend-overlay z-25 pointer-events-none w-[400px] h-[800px] -left-12 -top-24"
                />

                {/* Metallic Inner Highlight Rim */}
                <div className="absolute inset-[1px] rounded-[46px] border border-white/10 pointer-events-none z-24" />

                {/* Dynamic Island (Sleek pill that pulses to indicate active health logs) */}
                <div className="absolute top-2.5 left-1/2 transform -translate-x-1/2 w-32 h-7.5 bg-black rounded-full z-30 flex items-center justify-between px-3 relative border border-white/15 overflow-hidden">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald animate-pulse" />
                    <span className="text-[8px] font-bold text-slate-300 font-mono tracking-widest">LIVE FEED</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-1 rounded-full bg-slate-800" />
                    <div className="w-2 h-2 rounded-full bg-slate-900 border border-slate-700/50" />
                  </div>
                </div>

                {/* Status Bar */}
                <div className="pt-9.5 px-6 flex items-center justify-between text-white/90 font-mono text-[10px] z-20">
                  <span>09:14 AM</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald animate-pulse" />
                    <span>5G</span>
                    <span>95%</span>
                  </div>
                </div>

                {/* Inner Screen Header */}
                <div className="px-5 pt-4 pb-2.5 z-20 flex flex-col">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">TODAY'S AI FEED</span>
                  <span className="text-lg font-display font-extrabold text-white flex items-center gap-1">
                    Daily Vitals <span className="text-brand-emerald">●</span>
                  </span>
                </div>

                {/* Mock App Screen Contents */}
                <div className="flex-1 px-4 overflow-y-auto space-y-3 z-20 scrollbar-none pb-8">
                  {/* Active Blood Pressure Warning Alert inside feed */}
                  <div className="p-3.5 rounded-2xl bg-brand-rose/10 border border-brand-rose/20 flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold text-brand-rose tracking-wider uppercase">Vitals Warning</span>
                      <span className="text-[8px] text-brand-rose/70">08:00 AM</span>
                    </div>
                    <span className="text-xs font-bold text-white leading-tight">BP Alert: Grandfather</span>
                    <span className="text-[10px] text-slate-300 leading-snug">
                      Sys: 142 mmHg flagged. Emergency contact notified.
                    </span>
                  </div>

                  {/* Simulated notifications */}
                  <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-white/10 flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-brand-emerald/10 flex items-center justify-center">
                        <Pill className="w-3.5 h-3.5 text-brand-emerald" />
                      </div>
                      <div className="flex-1 flex flex-col">
                        <span className="text-xs font-bold text-white">Multivitamin</span>
                        <span className="text-[9px] text-slate-400">08:00 AM • Taken</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-white/10 flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-brand-sky/10 flex items-center justify-center">
                        <Droplet className="w-3.5 h-3.5 text-brand-sky" />
                      </div>
                      <div className="flex-1 flex flex-col">
                        <span className="text-xs font-bold text-white">Hydration Window</span>
                        <span className="text-[9px] text-slate-400">10:00 AM • Complete</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-white/10 flex flex-col gap-1.5 opacity-50">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-brand-purple/10 flex items-center justify-center">
                        <Activity className="w-3.5 h-3.5 text-brand-purple" />
                      </div>
                      <div className="flex-1 flex flex-col">
                        <span className="text-xs font-bold text-white">Afternoon Stretch</span>
                        <span className="text-[9px] text-slate-400">02:15 PM • Scheduled</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Home Indicator */}
                <div className="h-5 flex items-center justify-center pb-2 z-20">
                  <div className="w-24 h-1 bg-white/30 rounded-full" />
                </div>

                {/* Dynamic decorative visual rays behind mockup inside container */}
                <div className="absolute -bottom-10 left-0 right-0 h-40 bg-gradient-to-t from-brand-emerald/20 to-transparent blur-xl pointer-events-none" />
              </motion.div>

              {/* ----------------- Orbiting Reminder Cards ----------------- */}
              {/* Cards have larger displacements and rotate around the phone preserving 3D space */}

              {/* Orbiting Card 1 (Top Left, translateZ is foreground) */}
              <motion.div
                style={{ 
                  x: card1X, 
                  y: card1Y,
                  translateZ: "80px",
                  rotateX: finalRotateX,
                  rotateY: finalRotateY
                }}
                className="absolute top-[8%] -left-[18%] sm:-left-[32%] z-20 p-4 rounded-2xl bg-white/70 dark:bg-slate-900/80 backdrop-blur-md border border-white/30 dark:border-white/10 shadow-xl flex items-start gap-3 w-[205px] sm:w-[225px] transition-all duration-300 hover:scale-105"
              >
                <div className="w-9 h-9 rounded-xl bg-brand-emerald/10 flex items-center justify-center border border-brand-emerald/20 shadow-sm shrink-0">
                  <Pill className="w-5 h-5 text-brand-emerald" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block text-[10px] font-bold text-brand-emerald uppercase tracking-wider mb-0.5">MEDICINE</span>
                  <p className="font-display font-bold text-xs text-brand-dark dark:text-white truncate">Vitamin D3 (1000 IU)</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span className="text-[10px] font-medium text-slate-500">08:30 AM</span>
                  </div>
                </div>
              </motion.div>

              {/* Orbiting Card 2 (Middle Right, translateZ is deep foreground) */}
              <motion.div
                style={{ 
                  x: card2X, 
                  y: card2Y,
                  translateZ: "110px",
                  rotateX: finalRotateX,
                  rotateY: finalRotateY
                }}
                className="absolute top-[42%] -right-[15%] sm:-right-[28%] z-20 p-4 rounded-2xl bg-white/70 dark:bg-slate-900/80 backdrop-blur-md border border-white/30 dark:border-white/10 shadow-xl flex items-start gap-3 w-[195px] sm:w-[215px] transition-all duration-300 hover:scale-105"
              >
                <div className="w-9 h-9 rounded-xl bg-brand-sky/10 flex items-center justify-center border border-brand-sky/20 shadow-sm shrink-0">
                  <Droplet className="w-5 h-5 text-brand-sky" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block text-[10px] font-bold text-brand-sky uppercase tracking-wider mb-0.5">HYDRATION</span>
                  <p className="font-display font-bold text-xs text-brand-dark dark:text-white truncate">Hourly Window</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span className="text-[10px] font-medium text-slate-500">Target 250ml</span>
                  </div>
                </div>
              </motion.div>

              {/* Orbiting Card 3 (Bottom Left, translateZ is background) */}
              <motion.div
                style={{ 
                  x: card3X, 
                  y: card3Y,
                  translateZ: "-50px",
                  rotateX: finalRotateX,
                  rotateY: finalRotateY
                }}
                className="absolute bottom-[14%] -left-[12%] sm:-left-[24%] z-0 p-4 rounded-2xl bg-white/50 dark:bg-slate-900/60 backdrop-blur-sm border border-white/20 dark:border-white/5 shadow-lg flex items-start gap-3 w-[195px] sm:w-[215px] opacity-90 transition-all duration-300 hover:scale-105"
              >
                <div className="w-9 h-9 rounded-xl bg-brand-purple/10 flex items-center justify-center border border-brand-purple/20 shadow-sm shrink-0">
                  <Activity className="w-5 h-5 text-brand-purple" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block text-[10px] font-bold text-brand-purple uppercase tracking-wider mb-0.5">EXERCISE</span>
                  <p className="font-display font-bold text-xs text-brand-dark dark:text-white truncate font-sans">Posture Check</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span className="text-[10px] font-medium text-slate-500">Every 2 Hours</span>
                  </div>
                </div>
              </motion.div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
