/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import DashboardPreview from './components/DashboardPreview';
import Features from './components/Features';
import AIAssistant from './components/AIAssistant';
import Reports from './components/Reports';
import FamilyMonitoring from './components/FamilyMonitoring';
import DeviceSync from './components/DeviceSync';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored === 'light' || stored === 'dark') return stored;
      // Default to light for a clean medical SaaS look
      return 'light';
    }
    return 'light';
  });

  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Sync theme to document element
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Initial loader effect (450ms duration)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  // Track scroll progress for the top bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToDemo = () => {
    const element = document.getElementById('demo');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="relative min-h-screen bg-brand-bg dark:bg-[#090d16] text-brand-dark dark:text-slate-100 antialiased overflow-x-hidden select-none selection:bg-brand-emerald/20 selection:text-brand-dark transition-colors duration-300">
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-brand-emerald via-teal-400 to-brand-sky z-[100] transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Initial Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="app-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25, ease: 'easeInOut' } }}
            className="fixed inset-0 bg-slate-50 dark:bg-[#090d16] z-[99999] flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="flex flex-col items-center gap-4 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-emerald/10 flex items-center justify-center border border-brand-emerald/20 shadow-md">
                <Activity className="w-8 h-8 text-brand-emerald animate-pulse" />
              </div>
              <h1 className="font-display font-bold text-xl text-brand-dark dark:text-white tracking-tight">
                Health Reminder <span className="text-brand-emerald">Plus</span>
              </h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main App Content */}
      <div className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}>
        {/* 1. Glassmorphism Navigation Header */}
        <Navbar onTryDemoClick={handleScrollToDemo} theme={theme} onThemeToggle={handleToggleTheme} />

        {/* 2. Atmospheric Hero Section with orbiting alerts */}
        <Hero onTryDemoClick={handleScrollToDemo} />

        {/* 3. Metrics grid with count-up indicators */}
        <Stats />

        {/* 4. Centerpiece Interactive Dashboard Simulator */}
        <DashboardPreview theme={theme} />

        {/* 5. Complete grid of 8 capability cards */}
        <Features />

        {/* 6. AI Conversation Simulator */}
        <AIAssistant />

        {/* 7. Clinical Analytics chart toggles & calendar heatmap */}
        <Reports />

        {/* 8. Caregiver Relative Health monitors */}
        <FamilyMonitoring />

        {/* 9. Connected device smartwatch diagnostics */}
        <DeviceSync />

        {/* 10. Peer reviews & MD medical endorsements */}
        <Testimonials />

        {/* 11. Tiered subscriptions with interactive mock modal */}
        <Pricing />

        {/* 12. Expandable Accordion Frequently Asked Questions */}
        <FAQ />

        {/* 13. Double-deck Footer containing newsletter block & medical disclosure */}
        <Footer />
      </div>
    </div>
  );
}

