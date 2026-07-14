import { motion } from 'motion/react';
import { Star, Quote, ShieldCheck } from 'lucide-react';
import { testimonialsData } from '../data/mockData';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-slate-50/20 dark:bg-[#070b14] relative overflow-hidden transition-colors duration-300">
      {/* Decorative backdrop blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-brand-emerald/5 dark:bg-brand-emerald/3 filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-brand-sky/5 dark:bg-brand-sky/3 filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-18">
          <span className="font-sans font-semibold text-xs text-brand-emerald tracking-widest uppercase block mb-3">
            Real Endorsements
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-brand-dark dark:text-white mb-4">
            Trusted by medical experts, built for families.
          </h2>
          <p className="font-sans text-slate-600 dark:text-slate-300">
            Hear from leading medical researchers, active chronic patients, and family caregivers about how Health Reminder Plus has changed their health metrics.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonialsData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
              whileHover={{ y: -6, scale: 1.015 }}
              className="p-8 rounded-3xl bg-white/70 dark:bg-[#0b1324]/40 backdrop-blur-md border border-slate-200/50 dark:border-white/10 shadow-lg hover:shadow-xl hover:border-brand-emerald/20 dark:hover:border-brand-emerald/20 hover:shadow-brand-emerald/5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Inner highlight outlines */}
              <div className="absolute inset-[1px] rounded-[23px] border border-white/20 dark:border-white/5 pointer-events-none" />

              {/* Decorative Quote icon */}
              <div className="absolute top-6 right-8 text-slate-200/50 dark:text-slate-800/30">
                <Quote className="w-10 h-10 stroke-1" />
              </div>

              <div className="relative z-10">
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                {/* Comment */}
                <p className="font-sans text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic mb-6">
                  "{item.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3.5 pt-5 border-t border-slate-100 dark:border-white/5 mt-auto relative z-10">
                <img
                  src={item.avatarUrl}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-11 h-11 rounded-full object-cover border border-slate-200 dark:border-slate-800"
                />
                <div>
                  <h4 className="font-display font-extrabold text-sm text-brand-dark dark:text-white flex items-center gap-1">
                    {item.name}
                    {idx === 0 && (
                      <ShieldCheck className="w-3.5 h-3.5 text-brand-emerald shrink-0" />
                    )}
                  </h4>
                  <span className="font-sans text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-tight block">
                    {item.role}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
