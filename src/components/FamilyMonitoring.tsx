import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Heart, ShieldAlert, CheckCircle2, PhoneCall, AlertTriangle, Activity } from 'lucide-react';
import { familyMembersData } from '../data/mockData';
import { FamilyMember } from '../types';

export default function FamilyMonitoring() {
  const [members, setMembers] = useState<FamilyMember[]>(familyMembersData);
  const [nudgedId, setNudgedId] = useState<string | null>(null);

  // Nudge Action handler
  const handleNudge = (id: string, name: string) => {
    setNudgedId(id);
    
    // If we nudge Grandfather (danger alert), after 2 seconds we can also "resolve" it for demo realism!
    setTimeout(() => {
      setNudgedId(null);
      if (id === 'fam-1') {
        setMembers((prev) =>
          prev.map((m) => {
            if (m.id === 'fam-1') {
              return {
                ...m,
                alertState: 'normal',
                medicationStatus: 'Blood Pressure Tablet taken (Logged via nudge)',
                healthScore: 89,
                activeReminders: ['Ramipril 5mg (Taken - 09:15 AM)', 'Hydration (Completed - 10:00 AM)', 'Insulin Dose (Pending - 01:00 PM)']
              };
            }
            return m;
          })
        );
      }
    }, 2500);
  };

  const getAlertBadge = (state: string, message: string) => {
    switch (state) {
      case 'danger':
        return (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-brand-rose/10 border border-brand-rose/25 text-brand-rose animate-pulse-slow">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold uppercase tracking-wider font-mono">Critical Flag</span>
          </div>
        );
      case 'warning':
        return (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-brand-amber/10 border border-brand-amber/25 text-brand-amber">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold uppercase tracking-wider font-mono">Pending Task</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-brand-emerald/10 border border-brand-emerald/25 text-brand-emerald">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold uppercase tracking-wider font-mono">Stable</span>
          </div>
        );
    }
  };

  const getBorderColor = (state: string) => {
    switch (state) {
      case 'danger':
        return 'border-brand-rose/40 hover:border-brand-rose shadow-brand-rose/5 hover:shadow-brand-rose/15';
      case 'warning':
        return 'border-brand-amber/40 hover:border-brand-amber shadow-brand-amber/5 hover:shadow-brand-amber/10';
      default:
        return 'border-slate-200/60 hover:border-slate-300 shadow-slate-200/5 hover:shadow-slate-200/20';
    }
  };

  return (
    <section id="family" className="py-24 bg-slate-50/60 relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-emerald/5 filter blur-3xl z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-18">
          <span className="font-sans font-semibold text-xs text-brand-emerald tracking-widest uppercase block mb-3">
            Family Guardian
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-brand-dark mb-4">
            Protect your family circles, remotely.
          </h2>
          <p className="font-sans text-slate-600">
            A single, comprehensive panel to watch over children or aging parents. Receive instant clinical alerts when prescriptions are skipped or critical biometric values are exceeded.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member) => {
            const isNudged = nudgedId === member.id;
            const isDanger = member.alertState === 'danger';
            
            return (
              <motion.div
                key={member.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className={`group p-6 rounded-3xl bg-white border shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden ${getBorderColor(member.alertState)}`}
              >
                {/* Danger Pulsing Ray Background */}
                {isDanger && (
                  <div className="absolute inset-x-0 top-0 h-1.5 bg-brand-rose animate-pulse-slow" />
                )}

                <div>
                  {/* Top Bar: Profile Pic & Score */}
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div className="relative">
                      <img
                        src={member.avatarUrl}
                        alt={member.name}
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md relative z-10"
                      />
                      {/* Interactive alert status ring */}
                      <span className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white z-20 flex items-center justify-center ${
                        member.alertState === 'danger'
                          ? 'bg-brand-rose'
                          : member.alertState === 'warning'
                          ? 'bg-brand-amber'
                          : 'bg-brand-emerald'
                      }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="block text-[9px] font-bold text-slate-400 tracking-wider uppercase">Health Index</span>
                      <span className={`font-display font-extrabold text-2xl ${
                        member.healthScore >= 95
                          ? 'text-brand-emerald'
                          : member.healthScore >= 85
                          ? 'text-slate-800'
                          : 'text-brand-rose'
                      }`}>
                        {member.healthScore}%
                      </span>
                    </div>
                  </div>

                  {/* Identity */}
                  <div className="mb-4">
                    <h3 className="font-display font-extrabold text-base text-brand-dark leading-tight">
                      {member.name}
                    </h3>
                    <span className="font-sans text-xs text-slate-500 font-semibold">{member.relationship}</span>
                  </div>

                  {/* Status Box */}
                  <div className="mb-5 flex flex-col gap-2">
                    {getAlertBadge(member.alertState, member.medicationStatus)}
                    <p className={`font-sans text-xs leading-normal font-semibold ${isDanger ? 'text-brand-rose' : 'text-slate-600'}`}>
                      {member.medicationStatus}
                    </p>
                  </div>

                  {/* Active Vitals Feed inside family member card */}
                  <div className="space-y-2 pt-4 border-t border-slate-100 mb-6">
                    <span className="text-[9px] font-bold text-slate-400 tracking-wider uppercase block">Prescription Feed</span>
                    {member.activeReminders.map((rem, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[10px] text-slate-500 font-sans">
                        <Activity className="w-3.5 h-3.5 text-slate-400" />
                        <span className="truncate">{rem}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Action Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleNudge(member.id, member.name)}
                  disabled={isNudged}
                  className={`w-full py-3 rounded-2xl font-sans font-bold text-xs flex items-center justify-center gap-1.5 border transition-all ${
                    isNudged
                      ? 'bg-slate-900 text-white border-slate-900'
                      : isDanger
                      ? 'bg-brand-rose/10 hover:bg-brand-rose hover:text-white text-brand-rose border-brand-rose/20 hover:border-brand-rose'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <PhoneCall className={`w-3.5 h-3.5 ${isNudged ? 'animate-bounce' : ''}`} />
                  {isNudged
                    ? 'Pinging Watch...'
                    : isDanger
                    ? 'Trigger Urgent Alert nudge'
                    : 'Send Routine Nudge'}
                </motion.button>

                {/* Subtle time details */}
                <div className="mt-3 text-center">
                  <span className="text-[9px] text-slate-400 font-mono">Last activity checked: {member.lastActive}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
