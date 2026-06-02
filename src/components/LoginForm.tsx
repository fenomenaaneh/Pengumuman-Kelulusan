import React, { useState } from 'react';
import { Lock, Search } from 'lucide-react';
import { SchoolLogo } from './SchoolLogo';

interface LoginFormProps {
  onSubmit: (nisn: string) => void;
  isLoading: boolean;
  error: string | null;
  isLocked?: boolean;
}

export function LoginForm({ onSubmit, isLoading, error, isLocked = false }: LoginFormProps) {
  const [nisn, setNisn] = useState('');
  const [logoError, setLogoError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked) return;
    if (nisn.trim().length > 0) {
      onSubmit(nisn.trim());
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-2xl rounded-[2.5rem] border border-white/20 shadow-2xl p-10 flex flex-col items-center">
      <div className="w-24 h-24 bg-emerald-500/10 rounded-3xl flex items-center justify-center mb-6 border border-emerald-500/20 overflow-hidden shadow-inner p-1">
        {logoError ? (
          <SchoolLogo className="w-full h-full" />
        ) : (
          <img 
            src="/logo.png" 
            alt="Logo SMPN 21 Jambi" 
            className="w-full h-full object-contain" 
            onError={() => setLogoError(true)} 
          />
        )}
      </div>
      
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-white mb-2">Cek Kelulusan</h2>
        <p className="text-slate-400 text-sm leading-relaxed">
          {isLocked 
            ? "Pintu sistem pengumuman kelulusan akan terbuka secara otomatis setelah hitung mundur selesai."
            : "Masukkan Nomor Induk Siswa Nasional (NISN) Anda untuk melihat pengumuman kelulusan resmi."
          }
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <div className="space-y-2 text-left">
          <label htmlFor="nisn" className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-4 block">
            Nomor Induk Siswa Nasional
          </label>
          <div className="relative">
            <input
              type="text"
              id="nisn"
              value={nisn}
              onChange={(e) => setNisn(e.target.value)}
              placeholder={isLocked ? "SISTEM MASIH TERKUNCI" : "Contoh: 008712XXXX"}
              className={`w-full border rounded-2xl py-4 px-6 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-lg font-medium tracking-wider uppercase ${
                isLocked 
                  ? "bg-slate-950/30 border-white/5 cursor-not-allowed select-none text-slate-500" 
                  : "bg-slate-900/50 border-white/10"
              }`}
              disabled={isLoading || isLocked}
            />
          </div>
          <p className="text-xs text-slate-500 mt-1 ml-4 hidden md:block">
            {isLocked 
              ? "Silakan menunggu hingga pukul 22:00 WIB." 
              : "Pastikan NISN yang dimasukkan sesuai dengan data sekolah."
            }
          </p>
        </div>

        {error && (
          <div className="bg-red-500/20 text-red-200 p-4 rounded-xl text-sm border border-red-500/30 text-center">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || isLocked || !nisn.trim()}
          className={`w-full flex justify-center items-center py-4 text-white rounded-2xl font-bold text-lg shadow-lg transition-all border active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${
            isLocked 
              ? "bg-slate-800 border-white/5 text-slate-400 cursor-not-allowed shadow-none" 
              : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 border-blue-400/20 shadow-blue-900/40"
          }`}
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Memproses...
            </span>
          ) : isLocked ? (
            <span className="flex items-center gap-2">
              <Lock className="w-5 h-5 shrink-0" />
              Sistem Belum Dibuka
            </span>
          ) : (
            <span className="flex items-center">
              Verifikasi & Lihat Hasil
            </span>
          )}
        </button>
      </form>

      <div className="mt-8 flex items-center gap-3 text-xs text-slate-500 italic">
        <Lock className="w-4 h-4" />
        Data terlindungi dengan enkripsi NISN validasi sistem.
      </div>
    </div>
  );
}
