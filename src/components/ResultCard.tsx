import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';
import { StudentResult } from '../types';

interface ResultCardProps {
  result: StudentResult;
  onBack: () => void;
}

export function ResultCard({ result, onBack }: ResultCardProps) {
  const isPassed = result.status === 'LULUS';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="w-full max-w-lg mx-auto bg-white/10 backdrop-blur-2xl rounded-[2.5rem] border border-white/20 shadow-2xl overflow-hidden"
    >
      <div className={`p-8 pb-10 text-center ${isPassed ? 'bg-emerald-500/20 border-b border-emerald-500/30' : 'bg-red-500/20 border-b border-red-500/30'}`}>
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5, duration: 0.8, delay: 0.2 }}
          className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center backdrop-blur-sm mb-6 ${isPassed ? 'bg-emerald-500/30 border border-emerald-400/50' : 'bg-red-500/30 border border-red-400/50'}`}
        >
          {isPassed ? (
            <CheckCircle2 size={56} className="text-emerald-400 shadow-sm" />
          ) : (
            <XCircle size={56} className="text-red-400 shadow-sm" />
          )}
        </motion.div>
        
        <h2 className="text-4xl font-extrabold text-white tracking-tight mb-2 drop-shadow-sm">
          {result.status}
        </h2>
        <p className="text-slate-300 text-sm">
          Tahun Ajaran 2025/2026
        </p>
      </div>

      <div className="p-8 text-center border-b border-white/10 bg-black/10">
        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-2">Nama Siswa</p>
        <p className="text-2xl font-bold text-white tracking-wide">{result.name}</p>
      </div>

      <div className="p-8 pb-10 space-y-10">
        <div className="text-center">
          <p className="text-slate-300 leading-relaxed text-sm md:text-base max-w-[280px] mx-auto">
            {result.message}
          </p>
        </div>

        <button
          onClick={onBack}
          className="w-full flex justify-center items-center py-4 bg-slate-800/50 hover:bg-slate-700/50 text-white rounded-2xl font-bold text-lg transition-all border border-white/10 active:scale-[0.98]"
        >
          <ArrowLeft size={20} className="mr-2 text-slate-400" />
          Kembali
        </button>
      </div>
    </motion.div>
  );
}
