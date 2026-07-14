import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Menu, X, Sparkles, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  onTryDemoClick: () => void;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
}

export default function Navbar({ onTryDemoClick, theme, onThemeToggle }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'AI Assistant', href: '#assistant' },
    { name: 'Interactive Demo', href: '#demo' },
    { name: 'Family Shield', href: '#family' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-white/70 dark:bg-[#090d16]/70 backdrop-blur-md border-b border-white/40 dark:border-white/5 shadow-sm'
          : 'py-5 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-brand-emerald/10 flex items-center justify-center border border-brand-emerald/20 transition-all duration-300 group-hover:bg-brand-emerald group-hover:shadow-lg group-hover:shadow-brand-emerald/20">
              <Activity className="w-5 h-5 text-brand-emerald group-hover:text-white transition-colors duration-300" />
            </div>
            <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-brand-dark dark:text-white flex items-center gap-1.5">
              Health Reminder <span className="text-brand-emerald font-extrabold text-2xl leading-none">Plus</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-sans font-medium text-sm text-slate-600 dark:text-slate-300 hover:text-brand-dark dark:hover:text-white transition-colors duration-200 relative group py-2"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-emerald transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA & Theme Toggle Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {/* Smooth Theme Toggle Button */}
            <button
              onClick={onThemeToggle}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-transparent dark:border-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer flex items-center justify-center h-10 w-10 overflow-hidden relative"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ y: -15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 15, opacity: 0 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                >
                  {theme === 'light' ? (
                    <Moon className="w-4.5 h-4.5 text-slate-600" />
                  ) : (
                    <Sun className="w-4.5 h-4.5 text-amber-400" />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>

            <button
              onClick={onTryDemoClick}
              className="font-sans font-semibold text-sm text-brand-emerald hover:text-brand-emerald/80 transition-colors duration-200 px-4 py-2"
            >
              Learn More
            </button>
            <motion.button
              onClick={onTryDemoClick}
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="font-sans font-semibold text-sm text-white bg-brand-emerald hover:bg-brand-emerald/90 transition-all duration-200 px-5 py-2.5 rounded-xl shadow-lg shadow-brand-emerald/15 hover:shadow-brand-emerald/25 flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-white" />
              Try Demo
            </motion.button>
          </div>

          {/* Mobile Actions: theme toggle + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Theme Toggle */}
            <button
              onClick={onThemeToggle}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer flex items-center justify-center h-10 w-10 overflow-hidden"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ y: -15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 15, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {theme === 'light' ? (
                    <Moon className="w-4.5 h-4.5 text-slate-600" />
                  ) : (
                    <Sun className="w-4.5 h-4.5 text-amber-400" />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-white/95 dark:bg-[#090d16]/95 backdrop-blur-lg border-b border-slate-100 dark:border-white/5 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block font-sans font-medium text-base text-slate-600 dark:text-slate-300 hover:text-brand-dark dark:hover:text-white py-3 border-b border-slate-100 dark:border-white/5 last:border-0"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onTryDemoClick();
                  }}
                  className="w-full text-center font-sans font-semibold text-slate-700 dark:text-slate-300 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                >
                  Learn More
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onTryDemoClick();
                  }}
                  className="w-full font-sans font-semibold text-center text-white bg-brand-emerald py-3.5 rounded-xl shadow-md flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  Try Demo
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
