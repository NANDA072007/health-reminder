import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, MessageCircleQuestion, Sparkles } from 'lucide-react';
import { faqData } from '../data/mockData';

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-24 bg-slate-50/60 relative overflow-hidden">
      {/* Decorative ambient blobs */}
      <div className="absolute top-[30%] left-[5%] w-[400px] h-[400px] rounded-full bg-brand-sky/5 filter blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-sans font-semibold text-xs text-brand-emerald tracking-widest uppercase block mb-3">
            Inquiries
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-brand-dark mb-4">
            Frequently Asked Questions.
          </h2>
          <p className="font-sans text-xs sm:text-sm text-slate-600">
            Have questions about clinical compliance, data privacy, or smartwatch compatibility? Review our structured explanations below.
          </p>
        </div>

        {/* Accordions Container */}
        <div className="space-y-4">
          {faqData.map((faq, idx) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`rounded-3xl border transition-all duration-300 ${
                  isOpen
                    ? 'bg-white border-brand-emerald shadow-lg shadow-brand-emerald/5'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                {/* Accordion Trigger Button */}
                <button
                  onClick={() => handleToggle(faq.id)}
                  className="w-full text-left px-6 py-5 flex justify-between items-center gap-4 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-bold text-sm sm:text-base text-brand-dark hover:text-brand-emerald transition-colors leading-snug">
                    {faq.question}
                  </span>
                  
                  {/* Chevron Icon rotate animation */}
                  <div className={`p-1.5 rounded-xl bg-slate-50 border border-slate-100 transition-transform duration-300 shrink-0 text-slate-500 ${isOpen ? 'rotate-180 bg-brand-emerald/10 border-brand-emerald/20 text-brand-emerald' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Accordion Content wrapper */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 border-t border-slate-100">
                        <p className="font-sans text-xs sm:text-sm text-slate-500 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
