import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Mail, Send, Github, Twitter, Linkedin, Heart } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 2000);
  };

  const productLinks = [
    { name: 'Core Alarms', href: '#features' },
    { name: 'Hydration Tracking', href: '#features' },
    { name: 'Biometrics Sync', href: '#devices' },
    { name: 'AI Companion', href: '#assistant' },
    { name: 'Family Shield', href: '#family' },
  ];

  const companyLinks = [
    { name: 'About Us', href: '#' },
    { name: 'Partnerships', href: '#' },
    { name: 'Press Kit', href: '#' },
    { name: 'HIPAA Audits', href: '#' },
    { name: 'Careers', href: '#' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'SLA Terms', href: '#' },
    { name: 'FDA Disclaimers', href: '#' },
    { name: 'Data Security', href: '#' },
  ];

  return (
    <footer id="footer" className="bg-slate-50 dark:bg-[#070b14] text-slate-600 dark:text-slate-400 py-16 border-t border-slate-200 dark:border-white/5 relative overflow-hidden transition-colors duration-300">
      {/* Decorative ambient background rays */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-emerald/5 dark:bg-brand-emerald/2 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top: Brand and Newsletter Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-slate-200 dark:border-white/5">
          
          {/* Logo Column (col-span-5) */}
          <div className="lg:col-span-5 flex flex-col items-start gap-4">
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-brand-emerald/10 dark:bg-brand-emerald/15 flex items-center justify-center border border-brand-emerald/20">
                <Activity className="w-5 h-5 text-brand-emerald" />
              </div>
              <span className="font-display font-bold text-lg text-brand-dark dark:text-white tracking-tight">
                Health Reminder <span className="text-brand-emerald font-extrabold text-2xl">Plus</span>
              </span>
            </a>
            
            <p className="font-sans text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm mt-2">
              Our clinical wellness platform empowers thousands of caregivers and patients, providing intelligent medication scheduling and cardiovascular biometrics tracking under HIPAA compliance guidelines.
            </p>

            {/* Social Links */}
            <div className="flex gap-4 mt-2">
              <a href="#" className="p-2.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:border-brand-emerald dark:hover:border-brand-emerald hover:text-brand-dark dark:hover:text-white shadow-sm transition-all text-slate-500 dark:text-slate-400" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:border-brand-emerald dark:hover:border-brand-emerald hover:text-brand-dark dark:hover:text-white shadow-sm transition-all text-slate-500 dark:text-slate-400" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:border-brand-emerald dark:hover:border-brand-emerald hover:text-brand-dark dark:hover:text-white shadow-sm transition-all text-slate-500 dark:text-slate-400" aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Newsletter Column (col-span-7) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h3 className="font-display font-bold text-sm text-brand-dark dark:text-white mb-2 uppercase tracking-wider">
              Subscribe to Clinical Updates
            </h3>
            <p className="font-sans text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4 max-w-lg">
              Receive actionable health logs, medication scheduling advice, and smartwatch syncing advancements curated directly by our MD board.
            </p>

            {/* Subscription Form */}
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md w-full relative z-10">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 dark:text-slate-500" />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubscribed}
                  required
                  className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-xs text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-brand-emerald focus:bg-white dark:focus:bg-slate-900 transition-all shadow-xs"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubscribed}
                className="px-6 py-3.5 rounded-2xl bg-slate-950 hover:bg-slate-900 dark:bg-brand-emerald dark:hover:bg-brand-emerald/90 text-white dark:text-slate-900 font-sans font-bold text-xs flex items-center gap-1.5 shadow-lg dark:shadow-brand-emerald/10 cursor-pointer transition-colors shrink-0"
              >
                {isSubscribed ? 'Subscribed!' : 'Subscribe'}
                <Send className="w-3.5 h-3.5" />
              </motion.button>
            </form>

            <AnimatePresence>
              {isSubscribed && (
                <motion.span
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="text-brand-emerald text-xs font-sans font-bold mt-2.5 block animate-pulse"
                >
                  Subscription confirmed. Welcome to Health Reminder Plus.
                </motion.span>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Middle: Foot Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-12 text-xs">
          
          {/* Col 1 */}
          <div>
            <h4 className="font-display font-extrabold text-brand-dark dark:text-white uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-slate-500 hover:text-brand-emerald dark:text-slate-400 dark:hover:text-white transition-colors duration-200">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-display font-extrabold text-brand-dark dark:text-white uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-slate-500 hover:text-brand-emerald dark:text-slate-400 dark:hover:text-white transition-colors duration-200">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-display font-extrabold text-brand-dark dark:text-white uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-slate-500 hover:text-brand-emerald dark:text-slate-400 dark:hover:text-white transition-colors duration-200">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 (Clinical Disclosures) */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-display font-extrabold text-brand-dark dark:text-white uppercase tracking-wider mb-4">Clinical Disclosures</h4>
            <p className="font-sans text-[10px] text-slate-400 dark:text-slate-500 leading-relaxed">
              Health Reminder Plus provides automated software schedules and sensor synchronization to assist user routines. It does not replace professional medical advice, clinical diagnosis, or active physician checkups. Always consult a certified physician before adjusting medicine regimes.
            </p>
          </div>

        </div>

        {/* Bottom copyright notice */}
        <div className="pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 dark:text-slate-500 font-sans">
          <span>&copy; {new Date().getFullYear()} Health Reminder Plus Inc. All rights reserved.</span>
          <div className="flex items-center gap-1.5">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-brand-rose fill-brand-rose" />
            <span>for a healthier world.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
