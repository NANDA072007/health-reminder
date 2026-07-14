import { motion } from 'motion/react';
import {
  Pill,
  Droplet,
  Moon,
  Activity,
  Brain,
  Heart,
  Watch,
  Users,
  Sparkles
} from 'lucide-react';
import { featuresData } from '../data/mockData';

export default function Features() {
  // Safe icon mapping for Feature cards
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Pills':
        return <Pill className="w-6 h-6 text-brand-emerald" />;
      case 'Droplet':
        return <Droplet className="w-6 h-6 text-brand-sky" />;
      case 'Moon':
        return <Moon className="w-6 h-6 text-brand-purple" />;
      case 'Activity':
        return <Activity className="w-6 h-6 text-brand-rose" />;
      case 'BrainCircuit':
        return <Brain className="w-6 h-6 text-brand-emerald" />;
      case 'HeartPulse':
        return <Heart className="w-6 h-6 text-brand-rose" />;
      case 'Watch':
        return <Watch className="w-6 h-6 text-brand-sky" />;
      case 'Users':
        return <Users className="w-6 h-6 text-brand-amber" />;
      default:
        return <Sparkles className="w-6 h-6 text-slate-500" />;
    }
  };

  return (
    <section id="features" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative top grid lines for tech-forward feel */}
      <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(to_bottom,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:100%_8px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-18">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="font-sans font-semibold text-xs text-brand-emerald tracking-widest uppercase block mb-3"
          >
            Capabilities Platform
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-brand-dark mb-4"
          >
            Fully integrated clinical-grade features.
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-sans text-slate-600"
          >
            No secondary architectures, no gaps. Each modular component works continuously behind the scenes to protect your wellbeing.
          </motion.p>
        </div>

        {/* 8 Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresData.map((feat, idx) => (
            <motion.div
              key={feat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: 'easeOut' }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group p-6 rounded-3xl glass-card border shadow-sm hover:shadow-xl hover:border-slate-300/60 transition-all duration-300 flex flex-col justify-between h-full"
            >
              <div>
                {/* Header inside Card */}
                <div className="flex items-center justify-between mb-5">
                  <div className={`p-3 rounded-2xl bg-gradient-to-tr ${feat.gradientFrom} ${feat.gradientTo} border border-slate-200/40 shrink-0`}>
                    {getIcon(feat.iconName)}
                  </div>
                  
                  {/* Dynamic Badge */}
                  {feat.badge && (
                    <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-brand-emerald/15 text-brand-emerald">
                      {feat.badge}
                    </span>
                  )}
                </div>

                {/* Content */}
                <h3 className="font-display font-bold text-base text-brand-dark mb-2.5">
                  {feat.title}
                </h3>
                
                <p className="font-sans text-xs text-slate-500 leading-relaxed">
                  {feat.description}
                </p>
              </div>

              {/* High-end subtle indicator */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[10px] font-bold text-brand-emerald opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>Learn how it works</span>
                <span>→</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
