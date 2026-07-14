import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  reportWeeklyData,
  reportMonthlyData,
  reportYearlyData,
  heatmapData,
  HeatmapDay
} from '../data/mockData';
import { Calendar, TrendingUp, Award, Clock, ArrowUpRight } from 'lucide-react';

type ReportTab = 'weekly' | 'monthly' | 'yearly';

export default function Reports() {
  const [activeTab, setActiveTab] = useState<ReportTab>('weekly');
  const [hoveredDay, setHoveredDay] = useState<HeatmapDay | null>(null);

  // Pick data source dynamically
  const getChartData = () => {
    switch (activeTab) {
      case 'weekly':
        return reportWeeklyData;
      case 'monthly':
        return reportMonthlyData;
      case 'yearly':
        return reportYearlyData;
    }
  };

  const getAdherenceSummary = () => {
    switch (activeTab) {
      case 'weekly':
        return { percent: 91, label: 'Optimal Success Rate', comment: 'Metformin adherence was exceptional.' };
      case 'monthly':
        return { percent: 94, label: 'Highest Monthly Average', comment: 'Hydration goal achieved on 27/30 days.' };
      case 'yearly':
        return { percent: 93, label: 'Stable Annual Average', comment: 'No critical hypertensive flags detected.' };
    }
  };

  // Map intensity levels of the heatmap to premium Tailwind colors
  const getHeatmapColor = (level: number) => {
    switch (level) {
      case 4:
        return 'bg-brand-emerald border-emerald-600/10 hover:shadow-brand-emerald/40 hover:scale-105'; // Perfect
      case 3:
        return 'bg-emerald-400 border-emerald-500/10 hover:shadow-emerald-400/30 hover:scale-105'; // Great
      case 2:
        return 'bg-emerald-200 border-emerald-300/10 hover:shadow-emerald-200/20 hover:scale-105'; // OK
      case 1:
        return 'bg-brand-rose/40 border-brand-rose/15 hover:shadow-brand-rose/10 hover:scale-105'; // Missed multiple
      case 0:
        return 'bg-slate-100 border-slate-200 hover:bg-slate-200 hover:scale-105'; // Missed all
      default:
        return 'bg-slate-100 border-slate-200';
    }
  };

  const summary = getAdherenceSummary();

  return (
    <section id="reports" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background border-line divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Intro */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="font-sans font-semibold text-xs text-brand-emerald tracking-widest uppercase block mb-3">
              Clinical Export
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-brand-dark mb-4">
              Structured clinical health summaries.
            </h2>
            <p className="font-sans text-slate-600">
              Transform biometric streams into structured, professional clinical reports. Downloadable as HIPAA-compliant files to share directly with your care providers.
            </p>
          </div>

          {/* Premium Selector Button Pill */}
          <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80 self-start md:self-end">
            {(['weekly', 'monthly', 'yearly'] as ReportTab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-white text-brand-dark shadow-md'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard preview layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: Adherence Bar Chart (col-span-8) */}
          <motion.div
            key={activeTab} // reset animation on tab swap
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-8 rounded-3xl glass-card border border-slate-200/60 p-6 sm:p-8 shadow-xl flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block mb-0.5">COMPLIANCE SPLIT</span>
                <h3 className="font-display font-bold text-base text-brand-dark">Adherence: Completed vs Missed</h3>
              </div>
              
              <div className="flex gap-4 text-xs font-semibold">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-brand-emerald" />
                  <span className="text-slate-600">Taken</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-brand-rose" />
                  <span className="text-slate-600">Missed</span>
                </div>
              </div>
            </div>

            <div className="w-full h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getChartData()} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'var(--font-mono)' }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'var(--font-mono)' }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(15, 23, 42, 0.9)',
                      border: 'none',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '11px',
                      fontFamily: 'var(--font-sans)',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar dataKey="completed" fill="#10B981" radius={[4, 4, 0, 0]} barSize={24} />
                  <Bar dataKey="missed" fill="#EF4444" radius={[4, 4, 0, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-brand-emerald animate-pulse-slow" />
                <span className="text-xs text-slate-500 font-semibold leading-relaxed">
                  Compliance is up by <span className="text-brand-emerald font-bold">2.4%</span> this period.
                </span>
              </div>
              
              <button className="text-xs font-bold text-brand-dark hover:text-brand-emerald flex items-center gap-1.5 transition-colors group">
                Export HIPAA PDF
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* RIGHT: Vitals Overview (col-span-4) */}
          <div className="lg:col-span-4 flex flex-col gap-8 h-full justify-between">
            
            {/* Adherence Score Ring Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="rounded-3xl glass-card border border-slate-200/60 p-6 shadow-lg flex items-center justify-between"
            >
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block mb-1">AGGREGATE RATING</span>
                <h4 className="font-display font-extrabold text-2xl text-brand-dark mb-1">{summary.percent}%</h4>
                <p className="font-display font-bold text-xs text-brand-emerald mb-2">{summary.label}</p>
                <p className="font-sans text-[11px] text-slate-500 leading-normal truncate">{summary.comment}</p>
              </div>

              <div className="relative w-18 h-18 shrink-0 bg-brand-emerald/10 border border-brand-emerald/20 rounded-2xl flex items-center justify-center">
                <Award className="w-9 h-9 text-brand-emerald" />
              </div>
            </motion.div>

            {/* Calendar Heatmap Grid Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
              className="rounded-3xl glass-card border border-slate-200/60 p-6 shadow-lg flex-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase block mb-0.5">COMPLIANCE HEATMAP</span>
                    <h4 className="font-display font-bold text-sm text-brand-dark">Daily Streak Calendar</h4>
                  </div>
                  <Calendar className="w-4 h-4 text-slate-400" />
                </div>

                {/* Grid */}
                <div className="grid grid-cols-7 gap-1.5 my-3 relative">
                  {heatmapData.map((day) => (
                    <div
                      key={day.day}
                      onMouseEnter={() => setHoveredDay(day)}
                      onMouseLeave={() => setHoveredDay(null)}
                      className={`aspect-square w-full rounded-md border transition-all duration-200 cursor-help ${getHeatmapColor(day.level)}`}
                    />
                  ))}
                </div>

                {/* Heatmap Legend */}
                <div className="flex justify-between items-center text-[9px] text-slate-400 font-bold uppercase tracking-wider pt-2 border-t border-slate-100">
                  <span>Missed All</span>
                  <div className="flex gap-1">
                    <span className="w-2.5 h-2.5 rounded bg-slate-100 border border-slate-200" />
                    <span className="w-2.5 h-2.5 rounded bg-emerald-200 border border-emerald-300" />
                    <span className="w-2.5 h-2.5 rounded bg-emerald-400 border border-emerald-500" />
                    <span className="w-2.5 h-2.5 rounded bg-brand-emerald border border-emerald-600" />
                  </div>
                  <span>Perfect</span>
                </div>
              </div>

              {/* Tooltip display */}
              <div className="mt-4 h-8 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-200/40 px-3">
                <p className="font-mono text-[10px] text-slate-600 text-center truncate">
                  {hoveredDay ? (
                    <span className="font-semibold">{hoveredDay.tooltip}</span>
                  ) : (
                    'Hover over calendar cells for data details.'
                  )}
                </p>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
