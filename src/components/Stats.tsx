import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { CheckCircle2, Users, BellRing, HeartPulse } from 'lucide-react';
import { statsData } from '../data/mockData';

interface CounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

function AnimatedCounter({ value, prefix = '', suffix = '', duration = 1500 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      
      const current = easeProgress * value;
      setCount(current);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };
    window.requestAnimationFrame(step);
  }, [isInView, value, duration]);

  // Format the display count based on whether the target value is decimal
  const displayCount = Number.isInteger(value)
    ? Math.floor(count).toLocaleString()
    : count.toFixed(1);

  return (
    <span ref={ref} className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-brand-dark tracking-tight tabular-nums">
      {prefix}
      {displayCount}
      {suffix}
    </span>
  );
}

export default function Stats() {
  // Map icons safely for premium visual balance
  const getIcon = (id: string) => {
    switch (id) {
      case 'stat-1':
        return (
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-brand-emerald mb-6 group-hover:bg-brand-emerald group-hover:text-white transition-all duration-300">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        );
      case 'stat-2':
        return (
          <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-brand-sky mb-6 group-hover:bg-brand-sky group-hover:text-white transition-all duration-300">
            <Users className="w-6 h-6" />
          </div>
        );
      case 'stat-3':
        return (
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-brand-purple mb-6 group-hover:bg-brand-purple group-hover:text-white transition-all duration-300">
            <BellRing className="w-6 h-6" />
          </div>
        );
      case 'stat-4':
        return (
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-brand-rose mb-6 group-hover:bg-brand-rose group-hover:text-white transition-all duration-300">
            <HeartPulse className="w-6 h-6" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="stats" className="py-20 bg-white relative overflow-hidden">
      {/* Decorative high-end divider element */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core section intro */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-sans font-semibold text-xs text-brand-emerald tracking-widest uppercase block mb-3">
            Proven Outcomes
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-brand-dark">
            Adherence metrics built on certified clinical guidelines.
          </h2>
        </div>

        {/* 4 Bento Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
              whileHover={{ y: -6 }}
              className="group p-8 rounded-3xl glass-card border shadow-sm hover:shadow-xl hover:border-slate-300/60 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Metirc Icon */}
                {getIcon(stat.id)}

                {/* Animated counter display */}
                <div className="flex items-baseline mb-2">
                  <AnimatedCounter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </div>

                {/* Metric Label */}
                <h3 className="font-display font-bold text-base text-slate-800 mb-3 group-hover:text-brand-dark transition-colors">
                  {stat.label}
                </h3>
              </div>

              {/* Description copy with high-contrast balance */}
              <p className="font-sans text-xs text-slate-500 leading-relaxed mt-auto">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
