import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Sparkles, X, Heart, ShieldAlert } from 'lucide-react';
import { pricingPlansData } from '../data/mockData';

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleSubscribe = (planName: string) => {
    setSelectedPlan(planName);
  };

  const handleCloseModal = () => {
    setSelectedPlan(null);
  };

  return (
    <section id="pricing" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background border-line divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-18">
          <span className="font-sans font-semibold text-xs text-brand-emerald tracking-widest uppercase block mb-3">
            Pricing Plans
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-brand-dark mb-4">
            Transparent pricing for unified family care.
          </h2>
          <p className="font-sans text-slate-600">
            Choose the plan that suits your personal needs or expand up to enterprise clinical care support. Zero lock-ins, cancel anytime.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 items-center">
          {pricingPlansData.map((plan) => {
            const isPopular = plan.isPopular;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: isPopular ? 0.1 : 0 }}
                whileHover={{ y: -6 }}
                className={`rounded-3xl p-8 shadow-lg transition-all duration-300 flex flex-col justify-between relative ${
                  isPopular
                    ? 'bg-slate-900 text-white border-2 border-brand-emerald lg:scale-105 lg:z-10 shadow-brand-emerald/10 hover:shadow-brand-emerald/20 h-[560px]'
                    : 'bg-white text-slate-800 border border-slate-200/80 h-[500px]'
                }`}
              >
                {/* Popular Highlight Badge */}
                {isPopular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-brand-emerald text-white shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-white animate-pulse" />
                    MOST POPULAR
                  </span>
                )}

                <div>
                  {/* Plan Identifier */}
                  <div className="mb-6">
                    <h3 className={`font-display font-extrabold text-lg mb-1 ${isPopular ? 'text-white' : 'text-brand-dark'}`}>
                      {plan.name}
                    </h3>
                    <p className={`font-sans text-xs ${isPopular ? 'text-slate-400' : 'text-slate-500'}`}>
                      {plan.description}
                    </p>
                  </div>

                  {/* Price Block */}
                  <div className="flex items-baseline mb-6">
                    <span className={`font-display font-extrabold text-4xl sm:text-5xl tracking-tight ${isPopular ? 'text-brand-emerald' : 'text-brand-dark'}`}>
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className={`font-sans text-xs font-semibold ml-1.5 ${isPopular ? 'text-slate-400' : 'text-slate-500'}`}>
                        {plan.period}
                      </span>
                    )}
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs">
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${isPopular ? 'text-brand-emerald' : 'text-brand-emerald'}`} />
                        <span className={isPopular ? 'text-slate-300' : 'text-slate-600'}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Plan CTA */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSubscribe(plan.name)}
                  className={`w-full py-3.5 rounded-2xl font-sans font-bold text-xs shadow-md transition-all cursor-pointer ${
                    isPopular
                      ? 'bg-brand-emerald hover:bg-brand-emerald/90 text-white shadow-brand-emerald/10'
                      : 'bg-slate-950 hover:bg-slate-800 text-white shadow-slate-950/5'
                  }`}
                >
                  {plan.ctaText}
                </motion.button>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Checkout Success Mock Popup Modal */}
      <AnimatePresence>
        {selectedPlan && (
          <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="max-w-md w-full bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xl relative text-center flex flex-col items-center"
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-brand-emerald mb-6">
                <Check className="w-8 h-8" />
              </div>

              <span className="text-[10px] font-bold text-brand-emerald uppercase tracking-wider block mb-1">MOCK SUBSCRIPTION ACTIVE</span>
              <h3 className="font-display font-extrabold text-xl text-brand-dark mb-3">
                Welcome to {selectedPlan}!
              </h3>
              
              <p className="font-sans text-xs text-slate-500 leading-relaxed mb-6">
                Thank you for selecting our clinical wellness platform. Since this is an interactive design preview, your sandbox account has been pre-configured with complete, mock-unlocked premium metrics.
              </p>

              <button
                onClick={handleCloseModal}
                className="w-full py-3.5 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white font-sans font-bold text-xs shadow-md transition-colors"
              >
                Enter Premium Dashboard
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
