import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock, Bell } from 'lucide-react';

export function CountdownTimer() {
  // Target: June 2, 2026 at 22:00 WIB (which is 15:00 UTC)
  const targetTime = Date.UTC(2026, 5, 2, 15, 0, 0); // 5 is June in JS Date index
  
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isFinished: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isFinished: false });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = Date.now();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isFinished: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isFinished: false
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [targetTime]);

  // Pad numbers with leading zero
  const pad = (num: number) => String(num).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="w-full max-w-md mx-auto mb-6 bg-slate-900/40 backdrop-blur-xl border border-blue-500/20 rounded-[2rem] p-6 shadow-xl relative overflow-hidden"
    >
      {/* Decorative gradient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-60"></div>

      <div className="flex items-center gap-2.5 mb-4 justify-center">
        <div className={`p-1.5 rounded-lg ${timeLeft.isFinished ? 'bg-emerald-500/10 text-emerald-400' : 'bg-blue-500/10 text-blue-400'} border border-current/10 animate-pulse`}>
          <Clock className="w-4 h-4" />
        </div>
        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-300">
          {timeLeft.isFinished ? 'PENGUMUMAN DIBUKA' : 'HITUNG MUNDUR PENGUMUMAN'}
        </span>
        <span className="text-[9px] font-bold bg-white/10 border border-white/10 px-1.5 py-0.5 rounded-full text-slate-300">
          WIB
        </span>
      </div>

      {timeLeft.isFinished ? (
        <div className="text-center py-2">
          <motion.p 
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ repeat: Infinity, repeatType: 'reverse', duration: 1.5 }}
            className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300"
          >
            Sistem Kelulusan Resmi Telah Dibuka!
          </motion.p>
          <p className="text-xs text-slate-400 mt-1">Silakan masukkan NISN Anda di bawah ini untuk melihat hasil.</p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-3 text-center">
          {/* Days */}
          <div className="bg-slate-950/60 border border-white/5 rounded-2xl p-3 shadow-inner">
            <span className="block text-2xl font-extrabold text-white font-mono tracking-tight leading-none mb-1">
              {pad(timeLeft.days)}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Hari</span>
          </div>

          {/* Hours */}
          <div className="bg-slate-950/60 border border-white/5 rounded-2xl p-3 shadow-inner">
            <span className="block text-2xl font-extrabold text-white font-mono tracking-tight leading-none mb-1">
              {pad(timeLeft.hours)}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Jam</span>
          </div>

          {/* Minutes */}
          <div className="bg-slate-950/60 border border-white/5 rounded-2xl p-3 shadow-inner">
            <span className="block text-2xl font-extrabold text-white font-mono tracking-tight leading-none mb-1">
              {pad(timeLeft.minutes)}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Menit</span>
          </div>

          {/* Seconds */}
          <div className="bg-slate-950/60 border border-blue-500/10 rounded-2xl p-3 shadow-inner">
            <span className="block text-2xl font-extrabold text-blue-400 font-mono tracking-tight leading-none mb-1">
              {pad(timeLeft.seconds)}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Detik</span>
          </div>
        </div>
      )}

      {/* Release info text */}
      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-medium">
        <Bell className="w-3.5 h-3.5 text-blue-400 shrink-0" />
        <span>Rilis resmi: 2 Juni 2026, Pukul 22.00 WIB</span>
      </div>
    </motion.div>
  );
}
