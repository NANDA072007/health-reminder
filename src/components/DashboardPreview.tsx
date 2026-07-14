import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Pill,
  Droplet,
  Flame,
  Activity,
  Heart,
  TrendingUp,
  Plus,
  Moon,
  CheckCircle,
  Clock,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import { dashboardReminders, weightTrendData } from '../data/mockData';
import { Reminder } from '../types';

interface DashboardPreviewProps {
  theme?: 'light' | 'dark';
}

export default function DashboardPreview({ theme = 'light' }: DashboardPreviewProps) {
  const [reminders, setReminders] = useState<Reminder[]>(dashboardReminders);
  const [waterIntake, setWaterIntake] = useState(1250); // ml
  const waterTarget = 2500; // ml
  const [steps, setSteps] = useState(6742);
  const stepTarget = 10000;
  
  // Custom Live Simulations
  const [heartRate, setHeartRate] = useState(72);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; id: number } | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number>(Date.now() - 120000); // starts 2m ago
  const [timeString, setTimeString] = useState("2 minutes ago");
  const [completingId, setCompletingId] = useState<string | null>(null);
  const [particlesList, setParticlesList] = useState<{ id: number; x: number; y: number; color: string }[]>([]);

  // Heart rate fluctuation (72 -> 74 -> 71 bpm)
  useEffect(() => {
    const interval = setInterval(() => {
      setHeartRate((prev) => {
        const choices = [71, 72, 73, 74, 75, 72, 70];
        let next = prev;
        while (next === prev) {
          next = choices[Math.floor(Math.random() * choices.length)];
        }
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Natural step counter increments
  useEffect(() => {
    const interval = setInterval(() => {
      setSteps((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Update "Last Updated" timestamp string every second
  useEffect(() => {
    const interval = setInterval(() => {
      const diff = Math.floor((Date.now() - lastUpdated) / 1000);
      if (diff < 5) {
        setTimeString("just now");
      } else if (diff < 60) {
        setTimeString(`${diff} seconds ago`);
      } else {
        const mins = Math.floor(diff / 60);
        setTimeString(`${mins} minute${mins > 1 ? 's' : ''} ago`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [lastUpdated]);

  const triggerUpdate = () => {
    setLastUpdated(Date.now());
  };

  const showToast = (message: string) => {
    const id = Date.now();
    setToast({ message, id });
    setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 3000);
  };

  // Calculate statistics dynamically
  const completedReminders = reminders.filter((r) => r.status === 'completed').length;
  const totalReminders = reminders.length;
  const adherencePercentage = Math.round((completedReminders / totalReminders) * 100);

  // Sorting: unfinished reminders bubble to top naturally
  const sortedReminders = [...reminders].sort((a, b) => {
    if (a.status === 'completed' && b.status !== 'completed') return 1;
    if (a.status !== 'completed' && b.status === 'completed') return -1;
    return 0;
  });

  // Toggle medication complete/pending state
  const handleToggleReminder = (id: string) => {
    let updatedReminder: Reminder | null = null;
    
    setReminders((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const nextStatus = r.status === 'completed' ? 'pending' : 'completed';
          updatedReminder = { ...r, status: nextStatus };
          return updatedReminder;
        }
        return r;
      })
    );

    triggerUpdate();

    if (updatedReminder && (updatedReminder as Reminder).status === 'completed') {
      // Highlight card
      setHighlightedId(id);
      setTimeout(() => setHighlightedId(null), 850);
      
      // Trigger 3D Capsule Animation for medicine type
      if ((updatedReminder as Reminder).type === 'medicine') {
        setCompletingId(id);
        const newParticles = Array.from({ length: 15 }, (_, i) => ({
          id: Date.now() + i,
          x: (Math.random() - 0.5) * 220,
          y: (Math.random() - 0.5) * 160 - 20,
          color: i % 2 === 0 ? '#10B981' : '#38BDF8'
        }));
        setParticlesList(newParticles);
        setTimeout(() => {
          setCompletingId(null);
          setParticlesList([]);
        }, 1500);
      }

      // Toast notification
      showToast(`Great! ${(updatedReminder as Reminder).title} recorded.`);
    }
  };

  // Add water helper
  const handleAddWater = () => {
    setWaterIntake((prev) => Math.min(prev + 250, waterTarget * 2));
    triggerUpdate();
    showToast("Added 250ml water intake.");
  };

  // Manual step trigger
  const handleSimulateStep = () => {
    setSteps((prev) => prev + 128);
    triggerUpdate();
    showToast("Logged 128 steps.");
  };

  // Reset demo states
  const handleResetDemo = () => {
    setReminders(dashboardReminders);
    setWaterIntake(1250);
    setSteps(6742);
    setHighlightedId(null);
    setToast(null);
    setLastUpdated(Date.now());
    showToast("Demo reset to defaults.");
  };

  // Safe icon mapping for schedule elements
  const getReminderIcon = (type: string) => {
    switch (type) {
      case 'medicine':
        return <Pill className="w-4 h-4 text-brand-emerald" />;
      case 'water':
        return <Droplet className="w-4 h-4 text-brand-sky" />;
      case 'exercise':
        return <Flame className="w-4 h-4 text-brand-purple" />;
      default:
        return <Activity className="w-4 h-4 text-brand-amber" />;
    }
  };

  const getReminderColor = (type: string) => {
    switch (type) {
      case 'medicine':
        return 'bg-brand-emerald/10 text-brand-emerald border-brand-emerald/20 dark:border-brand-emerald/30';
      case 'water':
        return 'bg-brand-sky/10 text-brand-sky border-brand-sky/20 dark:border-brand-sky/30';
      case 'exercise':
        return 'bg-brand-purple/10 text-brand-purple border-brand-purple/20 dark:border-brand-purple/30';
      default:
        return 'bg-brand-amber/10 text-brand-amber border-brand-amber/20 dark:border-brand-amber/30';
    }
  };

  // Custom tooltips for recharts
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3 bg-slate-900/95 backdrop-blur-md border border-white/10 rounded-xl shadow-xl text-xs font-mono">
          <p className="text-white font-sans font-semibold mb-1">Weight Entry</p>
          <p className="text-brand-emerald font-bold">{payload[0].value} kg</p>
          <p className="text-slate-400 text-[10px] mt-0.5">{payload[0].payload.day}</p>
        </div>
      );
    }
    return null;
  };

  // Water SVG Percentage Circumference Helper (radius = 35)
  const radius = 35;
  const strokeCircumference = 2 * Math.PI * radius;
  const waterPercentage = Math.min((waterIntake / waterTarget) * 100, 100);
  const strokeDashoffset = strokeCircumference - (waterPercentage / 100) * strokeCircumference;

  const isDark = theme === 'dark';

  return (
    <section id="demo" className="py-24 bg-slate-50/60 dark:bg-slate-950/20 relative overflow-hidden transition-colors duration-300">
      {/* Decorative Blur Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-sky/5 dark:bg-brand-sky/3 filter blur-3xl z-0 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-brand-emerald/5 dark:bg-brand-emerald/3 filter blur-3xl z-0 pointer-events-none" />

      {/* Elegant sliding success toast inside canvas wrapper */}
      <div className="fixed bottom-6 right-6 z-[9999] pointer-events-none">
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="px-4 py-3.5 rounded-2xl bg-slate-900/95 dark:bg-white/95 backdrop-blur-md shadow-2xl border border-white/10 dark:border-slate-200 pointer-events-auto flex items-center gap-3 w-80 max-w-[90vw]"
            >
              <div className="w-8 h-8 rounded-xl bg-brand-emerald/10 flex items-center justify-center border border-brand-emerald/20 shrink-0">
                <CheckCircle className="w-4 h-4 text-brand-emerald" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display font-bold text-xs text-white dark:text-slate-900 truncate">
                  Record Logged
                </p>
                <p className="font-sans text-[11px] text-slate-300 dark:text-slate-500 truncate leading-snug">
                  {toast.message}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Intro */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="font-sans font-semibold text-xs text-brand-emerald tracking-widest uppercase block mb-3">
              Interactive Sandbox
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-brand-dark dark:text-white mb-4">
              The AI Health dashboard in action.
            </h2>
            <p className="font-sans text-slate-600 dark:text-slate-300">
              This is a live preview of the client dashboard. Toggle medications, log water intake, and watch the compliance analytics react instantly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="px-3 py-1.5 rounded-xl bg-white/40 dark:bg-white/5 border border-slate-200/60 dark:border-white/5 flex items-center gap-2 font-mono text-[10px] text-slate-500 dark:text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              <span>Last updated {timeString}</span>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleResetDemo}
              className="px-4 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white shadow-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              Reset Demo
            </motion.button>
          </div>
        </div>

        {/* Dashboard Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Today's Schedule (Lg: col-span-5) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            whileHover={{ y: -4 }}
            className="lg:col-span-5 rounded-3xl bg-white/45 dark:bg-[#0b1324]/40 backdrop-blur-xl border border-white/40 dark:border-white/10 p-6 sm:p-8 shadow-xl hover:shadow-2xl hover:shadow-brand-emerald/5 transition-all duration-300 relative overflow-hidden"
          >
            {/* Ambient Emerald Glow inside card */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-brand-emerald/10 dark:bg-brand-emerald/5 rounded-full filter blur-2xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div>
                <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block mb-0.5">CURRENT AGENDA</span>
                <h3 className="font-display font-bold text-lg text-brand-dark dark:text-white flex items-center gap-2">
                  Today's Reminders
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-emerald/10 text-brand-emerald">
                    {completedReminders}/{totalReminders} Done
                  </span>
                </h3>
              </div>
              <Clock className="w-5 h-5 text-slate-400" />
            </div>

            {/* Reminder List */}
            <div className="space-y-3.5 mb-6 relative z-10">
              <AnimatePresence initial={false}>
                {sortedReminders.map((rem) => {
                  const isCompleted = rem.status === 'completed';
                  const isHighlighted = highlightedId === rem.id;
                  const isCompleting = completingId === rem.id;

                  return (
                    <motion.div
                      key={rem.id}
                      layout
                      whileHover={{ scale: 1.015 }}
                      transition={{ type: 'spring', stiffness: 220, damping: 25 }}
                      className={`p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-4 cursor-pointer relative overflow-hidden ${
                        isCompleted
                          ? 'bg-slate-50/40 dark:bg-slate-900/20 border-slate-200/40 dark:border-white/5 opacity-60'
                          : 'bg-white/90 dark:bg-slate-900/60 border-slate-200/80 dark:border-white/10 shadow-sm'
                      } ${
                        isHighlighted 
                          ? 'ring-2 ring-brand-emerald border-brand-emerald dark:border-brand-emerald shadow-lg shadow-brand-emerald/10' 
                          : ''
                      }`}
                      onClick={() => handleToggleReminder(rem.id)}
                    >
                      {/* 3D Completing Animation Overlay */}
                      {isCompleting && (
                        <div className="absolute inset-0 z-30 rounded-2xl overflow-hidden pointer-events-none flex items-center justify-center bg-brand-emerald/15 dark:bg-brand-emerald/20 backdrop-blur-xs">
                          {/* Expanding Green Ripple Pulse */}
                          <motion.div
                            initial={{ scale: 0.1, opacity: 0.9 }}
                            animate={{ scale: 2.2, opacity: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="absolute w-40 h-40 rounded-full bg-gradient-to-r from-brand-emerald/40 to-teal-500/20"
                          />
                          
                          {/* 3D Rotating Capsule */}
                          <div className="relative flex flex-col items-center justify-center">
                            <motion.div
                              initial={{ y: -60, rotate: 0, scale: 0.2, opacity: 0 }}
                              animate={{ 
                                y: [-60, -45, 12], 
                                rotate: [0, 180, 360], 
                                scale: [0.2, 1.2, 0.8],
                                opacity: [0, 1, 1, 0]
                              }}
                              transition={{ duration: 1.1, ease: "easeInOut" }}
                              className="w-5 h-10 rounded-full bg-gradient-to-b from-brand-emerald to-teal-400 border border-white/40 shadow-lg relative flex flex-col overflow-hidden"
                            >
                              <div className="h-1/2 bg-white/20" />
                              <div className="absolute top-1 left-1 w-1 h-3 bg-white/40 rounded-full filter blur-[0.5px]" />
                            </motion.div>

                            {/* Mini Container Cup that the capsule falls into */}
                            <motion.div
                              initial={{ scale: 0.8 }}
                              animate={{ 
                                scale: [0.8, 1.15, 1],
                                y: [0, 4, 0]
                              }}
                              transition={{ duration: 0.8, delay: 0.45 }}
                              className="w-10 h-8 rounded-b-xl border-x-2 border-b-2 border-brand-emerald/60 bg-brand-emerald/10 flex items-center justify-center relative mt-2"
                            >
                              <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-emerald/30" />
                              {/* Checkmark Morph */}
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: [0, 0, 1.3, 1] }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                              >
                                <CheckCircle className="w-5 h-5 text-brand-emerald fill-brand-emerald/20" />
                              </motion.div>
                            </motion.div>
                          </div>

                          {/* Tiny Explosion Particles */}
                          {particlesList.map((p) => (
                            <motion.div
                              key={p.id}
                              initial={{ x: 0, y: 10, scale: 1, opacity: 1 }}
                              animate={{ 
                                x: p.x, 
                                y: p.y, 
                                scale: 0.2, 
                                opacity: 0 
                              }}
                              transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                              className="absolute w-2.5 h-2.5 rounded-full"
                              style={{ 
                                background: p.color,
                                boxShadow: `0 0 6px ${p.color}`
                              }}
                            />
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-3.5 min-w-0">
                        {/* Custom Interactive Checkbox */}
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                            isCompleted
                              ? 'bg-brand-emerald border-brand-emerald text-white'
                              : 'border-slate-300 dark:border-slate-600 hover:border-slate-400'
                          }`}
                        >
                          {isCompleted && (
                            <motion.svg
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-3.5 h-3.5 stroke-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={3}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </motion.svg>
                          )}
                        </div>

                        {/* Reminder Details */}
                        <div className="min-w-0">
                          <p
                            className={`font-display font-bold text-sm text-brand-dark dark:text-white transition-all ${
                              isCompleted ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-100'
                            }`}
                          >
                            {rem.title}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold border ${getReminderColor(rem.type)}`}>
                              {rem.dosage}
                            </span>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">{rem.schedule}</span>
                          </div>
                        </div>
                      </div>

                      {/* Icon */}
                      <div className={`p-2 rounded-xl border ${getReminderColor(rem.type)} shrink-0`}>
                        {getReminderIcon(rem.type)}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Simulated Clinical Advice */}
            <div className="p-4 rounded-2xl bg-brand-emerald/5 dark:bg-brand-emerald/3 border border-brand-emerald/10 dark:border-brand-emerald/10 flex items-start gap-3 relative z-10">
              <Sparkles className="w-5 h-5 text-brand-emerald shrink-0 mt-0.5 animate-pulse" />
              <div>
                <p className="font-display font-bold text-xs text-brand-dark dark:text-slate-200 mb-0.5">AI Adherence Engine</p>
                <p className="font-sans text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  {adherencePercentage >= 80
                    ? 'Excellent job. Adherence is optimal. Keeping this streak reduces long-term cardiovascular risks.'
                    : 'A bit behind schedule. Remember to take Metformin with food to protect your gastric lining.'}
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Biometrics Panel (Lg: col-span-7) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            
            {/* Core Adherence Progress Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
              whileHover={{ y: -4 }}
              className="rounded-3xl bg-white/45 dark:bg-[#0b1324]/40 backdrop-blur-xl border border-white/40 dark:border-white/10 p-6 shadow-lg hover:shadow-xl hover:shadow-brand-emerald/5 transition-all duration-300 flex items-center justify-between relative overflow-hidden"
            >
              {/* Inner highlight overlay */}
              <div className="absolute inset-[1px] rounded-[23px] border border-white/15 dark:border-white/5 pointer-events-none" />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-brand-emerald/10 dark:bg-brand-emerald/5 rounded-full filter blur-xl pointer-events-none" />

              <div className="relative z-10">
                <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block mb-1">COMPLIANCE</span>
                <p className="font-display font-extrabold text-3xl text-brand-dark dark:text-white mb-1">
                  {adherencePercentage}%
                </p>
                <p className="font-sans text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                  Daily Medication Adherence
                </p>
              </div>
              <div className="w-16 h-16 rounded-full bg-brand-emerald/10 border border-brand-emerald/20 flex items-center justify-center relative shrink-0 z-10">
                <CheckCircle className="w-8 h-8 text-brand-emerald" />
              </div>
            </motion.div>

            {/* Hydration Circular Progress Ring */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
              whileHover={{ y: -4 }}
              className="rounded-3xl bg-white/45 dark:bg-[#0b1324]/40 backdrop-blur-xl border border-white/40 dark:border-white/10 p-6 shadow-lg hover:shadow-xl hover:shadow-brand-sky/5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Inner highlight overlay */}
              <div className="absolute inset-[1px] rounded-[23px] border border-white/15 dark:border-white/5 pointer-events-none" />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-brand-sky/10 dark:bg-brand-sky/5 rounded-full filter blur-xl pointer-events-none" />

              <div className="flex justify-between items-start relative z-10">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block mb-1">HYDRATION</span>
                  <p className="font-display font-extrabold text-2xl text-brand-dark dark:text-white mb-0.5">
                    {waterIntake.toLocaleString()} <span className="text-sm font-sans font-normal text-slate-400 dark:text-slate-500">/ {waterTarget} ml</span>
                  </p>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                    {Math.round(waterPercentage)}% of Daily Goal
                  </span>
                </div>
                
                {/* SVG Progress Circle */}
                <div className="relative w-18 h-18 shrink-0">
                  <svg className="w-full h-full transform -rotate-95" viewBox="0 0 80 80">
                    <circle className="stroke-slate-100 dark:stroke-slate-800" fill="none" strokeWidth={6} cx={40} cy={40} r={radius} />
                    <circle
                      className="stroke-brand-sky transition-all duration-500 ease-out"
                      fill="none"
                      strokeWidth={6}
                      strokeLinecap="round"
                      cx={40}
                      cy={40}
                      r={radius}
                      strokeDasharray={strokeCircumference}
                      strokeDashoffset={strokeDashoffset}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Droplet className="w-5 h-5 text-brand-sky animate-bounce" />
                  </div>
                </div>
              </div>

              {/* Add Water Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddWater}
                className="mt-4 w-full py-2.5 rounded-xl bg-brand-sky/15 hover:bg-brand-sky/25 border border-brand-sky/20 font-sans font-bold text-xs text-sky-700 dark:text-sky-400 flex items-center justify-center gap-1.5 transition-all cursor-pointer relative z-10"
              >
                <Plus className="w-3.5 h-3.5" />
                Log +250 ml
              </motion.button>
            </motion.div>

            {/* Steps & Fitness Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
              whileHover={{ y: -4 }}
              className="rounded-3xl bg-white/45 dark:bg-[#0b1324]/40 backdrop-blur-xl border border-white/40 dark:border-white/10 p-6 shadow-lg hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Inner highlight overlay */}
              <div className="absolute inset-[1px] rounded-[23px] border border-white/15 dark:border-white/5 pointer-events-none" />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-orange-500/10 dark:bg-orange-500/5 rounded-full filter blur-xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block mb-0.5">FITNESS</span>
                    <p className="font-display font-extrabold text-2xl text-brand-dark dark:text-white">
                      {steps.toLocaleString()} <span className="text-xs font-normal text-slate-400 dark:text-slate-500">steps</span>
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/20">
                    <Flame className="w-4.5 h-4.5 animate-pulse" />
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-4">
                  <div
                    className="h-full bg-orange-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((steps / stepTarget) * 100, 100)}%` }}
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSimulateStep}
                className="w-full py-2.5 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/20 font-sans font-bold text-xs text-orange-700 dark:text-orange-400 flex items-center justify-center gap-1.5 transition-all cursor-pointer relative z-10"
              >
                Simulate 128 Steps
              </motion.button>
            </motion.div>

            {/* Heart Rate & BP Cardiovascular Card (Fluctuates softly) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
              whileHover={{ y: -4 }}
              className="rounded-3xl bg-white/45 dark:bg-[#0b1324]/40 backdrop-blur-xl border border-white/40 dark:border-white/10 p-6 shadow-lg hover:shadow-xl hover:shadow-brand-rose/5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Inner highlight overlay */}
              <div className="absolute inset-[1px] rounded-[23px] border border-white/15 dark:border-white/5 pointer-events-none" />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-brand-rose/10 dark:bg-brand-rose/5 rounded-full filter blur-xl pointer-events-none" />

              <div className="flex justify-between items-start relative z-10">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block mb-1">CARDIOVITALS</span>
                  <div className="flex gap-4 items-center">
                    <div>
                      <p className="font-display font-extrabold text-2xl text-brand-dark dark:text-white flex items-baseline gap-1">
                        {heartRate} <span className="text-[10px] font-normal text-slate-400 dark:text-slate-500">BPM</span>
                      </p>
                      <span className="text-[9px] text-slate-400 dark:text-slate-500 block font-semibold uppercase tracking-wider">Heart Rate</span>
                    </div>
                    <div className="w-px h-8 bg-slate-200 dark:bg-white/10" />
                    <div>
                      <p className="font-display font-extrabold text-2xl text-brand-dark dark:text-white flex items-baseline gap-1">
                        119/77 <span className="text-[10px] font-normal text-slate-400 dark:text-slate-500">mmHg</span>
                      </p>
                      <span className="text-[9px] text-slate-400 dark:text-slate-500 block font-semibold uppercase tracking-wider">Blood Pressure</span>
                    </div>
                  </div>
                </div>
                {/* Visual pulse speed bound to heartRate state */}
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{
                    repeat: Infinity,
                    duration: 60 / heartRate, // dynamic real heart rhythm frequency!
                    ease: 'easeInOut'
                  }}
                  className="w-10 h-10 rounded-xl bg-brand-rose/10 flex items-center justify-center text-brand-rose shrink-0"
                >
                  <Heart className="w-5 h-5 fill-brand-rose" />
                </motion.div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center gap-4 text-[10px] text-slate-500 dark:text-slate-400 font-sans relative z-10">
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald" />
                  <span>Sinus Rhythm Normal</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald" />
                  <span>Stage 0 (Healthy)</span>
                </div>
              </div>
            </motion.div>

            {/* Full-width weight trend Line Chart (Automatically recolors) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
              whileHover={{ y: -4 }}
              className="rounded-3xl bg-white/45 dark:bg-[#0b1324]/40 backdrop-blur-xl border border-white/40 dark:border-white/10 p-6 shadow-lg hover:shadow-xl hover:shadow-brand-emerald/5 transition-all duration-300 sm:col-span-2 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Inner highlight overlay */}
              <div className="absolute inset-[1px] rounded-[23px] border border-white/15 dark:border-white/5 pointer-events-none" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-emerald/10 dark:bg-brand-emerald/5 rounded-full filter blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between mb-4 relative z-10">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block mb-0.5">TREND SUMMARY</span>
                  <h4 className="font-display font-bold text-sm text-brand-dark dark:text-white">Weekly Weight Tracking</h4>
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-brand-emerald/10 text-brand-emerald font-sans font-bold text-[10px] border border-brand-emerald/20">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>-1.3 kg loss</span>
                </div>
              </div>

              <div className="w-full h-44 mt-2 relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weightTrendData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: isDark ? '#64748b' : '#94a3b8', fontSize: 10, fontFamily: 'var(--font-mono)' }}
                    />
                    <YAxis
                      domain={[76, 79]}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: isDark ? '#64748b' : '#94a3b8', fontSize: 10, fontFamily: 'var(--font-mono)' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="weight"
                      stroke="#10B981"
                      strokeWidth={3}
                      dot={{ r: 4, strokeWidth: 1, fill: isDark ? '#1e293b' : '#fff' }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
