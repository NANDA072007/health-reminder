import { useState } from 'react';
import { motion } from 'motion/react';
import { Watch, Activity, Cloud, Bluetooth, RefreshCw, Battery, Radio } from 'lucide-react';
import { syncDevicesData } from '../data/mockData';
import { SyncDevice } from '../types';

export default function DeviceSync() {
  const [devices, setDevices] = useState<SyncDevice[]>(syncDevicesData);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Sync refresh simulation
  const handleForceSync = () => {
    setIsRefreshing(true);
    setDevices((prev) =>
      prev.map((d) => (d.status === 'connected' ? { ...d, status: 'syncing' } : d))
    );

    setTimeout(() => {
      setIsRefreshing(false);
      setDevices(syncDevicesData);
    }, 2000);
  };

  const getDeviceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Watch':
        return <Watch className="w-6 h-6 text-brand-sky" />;
      case 'Activity':
        return <Activity className="w-6 h-6 text-brand-rose" />;
      case 'Cloud':
        return <Cloud className="w-6 h-6 text-brand-purple" />;
      default:
        return <Bluetooth className="w-6 h-6 text-brand-emerald" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'syncing':
        return (
          <div className="flex items-center gap-1 text-brand-purple">
            <RefreshCw className="w-3 h-3 animate-spin" />
            <span className="text-[9px] font-bold uppercase tracking-wider font-mono">Syncing...</span>
          </div>
        );
      case 'disconnected':
        return (
          <div className="flex items-center gap-1 text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            <span className="text-[9px] font-bold uppercase tracking-wider font-mono">Inactive</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-1 text-brand-emerald">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald animate-pulse" />
            <span className="text-[9px] font-bold uppercase tracking-wider font-mono">Connected</span>
          </div>
        );
    }
  };

  const getBatteryColor = (level: number) => {
    if (level > 70) return 'text-brand-emerald';
    if (level > 30) return 'text-brand-amber';
    return 'text-brand-rose';
  };

  return (
    <section id="devices" className="py-24 bg-white dark:bg-[#070b14] relative overflow-hidden transition-colors duration-300">
      {/* Decorative background split line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-white/10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Intro */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="font-sans font-semibold text-xs text-brand-emerald tracking-widest uppercase block mb-3">
              Biometric Ingress
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-brand-dark dark:text-white mb-4">
              Real-time smartwatch sensor pairing.
            </h2>
            <p className="font-sans text-slate-600 dark:text-slate-300">
              Health Reminder Plus connects directly to native biometrics endpoints. No manuals or Bluetooth pairing loops needed — we gather heart rates, sleep states, and hydration targets passively.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleForceSync}
            disabled={isRefreshing}
            className="px-6 py-3 rounded-2xl bg-brand-dark dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-sans font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10 cursor-pointer self-start lg:self-end"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Force Syncing...' : 'Sync Connected Devices'}
          </motion.button>
        </div>

        {/* Central bluetooth beacon and devices split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: Central Bluetooth beacon graphic (Lg: col-span-5) */}
          <div className="lg:col-span-5 flex items-center justify-center relative py-8">
            
            {/* Visual concentric pulsing waves representing Bluetooth signal */}
            <div className="absolute w-[240px] h-[240px] rounded-full border border-brand-sky/20 dark:border-brand-sky/15 animate-pulse-slow" />
            <div className="absolute w-[340px] h-[340px] rounded-full border border-brand-sky/10 dark:border-brand-sky/5 animate-ping opacity-25" style={{ animationDuration: '4s' }} />
            <div className="absolute w-[140px] h-[140px] rounded-full bg-brand-sky/5 filter blur-xl" />

            {/* Pulsing Beacon Circle */}
            <div className="w-24 h-24 rounded-full bg-brand-sky/10 dark:bg-brand-sky/5 border border-brand-sky/30 dark:border-brand-sky/20 flex items-center justify-center relative shadow-lg shadow-brand-sky/5 z-10 animate-float-slow">
              <div className="w-16 h-16 rounded-full bg-brand-sky flex items-center justify-center shadow-lg shadow-brand-sky/30">
                <Bluetooth className="w-8 h-8 text-white animate-pulse" />
              </div>
              <div className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-lg bg-slate-900 dark:bg-slate-950 border border-white/10 dark:border-white/5 text-[9px] font-mono text-white flex items-center gap-1">
                <Radio className="w-3 h-3 text-brand-sky animate-bounce" />
                <span>ACTIVE</span>
              </div>
            </div>

          </div>

          {/* RIGHT: Grid of Connected Devices (Lg: col-span-7) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {devices.map((device, idx) => (
              <motion.div
                key={device.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -4, scale: 1.015 }}
                className="p-5 rounded-3xl bg-white/70 dark:bg-[#0b1324]/40 backdrop-blur-md border border-slate-200/50 dark:border-white/10 shadow-sm hover:shadow-md hover:border-brand-sky/30 dark:hover:border-brand-sky/30 hover:shadow-brand-sky/5 transition-all duration-300 flex items-center justify-between gap-4 relative overflow-hidden"
              >
                {/* Inner highlight overlay */}
                <div className="absolute inset-[1px] rounded-[23px] border border-white/20 dark:border-white/5 pointer-events-none" />
                
                <div className="flex items-center gap-3.5 min-w-0 relative z-10">
                  {/* Icon Wrapper */}
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-white/5 flex items-center justify-center shrink-0">
                    {getDeviceIcon(device.iconName)}
                  </div>

                  {/* Text Details */}
                  <div className="min-w-0">
                    <h3 className="font-display font-bold text-sm text-brand-dark dark:text-white truncate">
                      {device.name}
                    </h3>
                    
                    <div className="flex items-center gap-2 mt-1">
                      {getStatusBadge(device.status)}
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">• {device.lastSync}</span>
                    </div>
                  </div>
                </div>

                {/* Battery level gauge */}
                <div className="flex flex-col items-end shrink-0 relative z-10">
                  <div className={`flex items-center gap-1 text-xs font-mono font-bold ${getBatteryColor(device.batteryLevel)}`}>
                    <Battery className="w-4 h-4" />
                    <span>{device.batteryLevel}%</span>
                  </div>
                  <span className="text-[9px] text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5 font-bold">BATTERY</span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
