import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LoginForm } from './components/LoginForm';
import { ResultCard } from './components/ResultCard';
import { StudentResult, AnnouncementResponse } from './types';
import { SchoolLogo } from './components/SchoolLogo';
import { CountdownTimer } from './components/CountdownTimer';
import { studentsDatabase } from './data/students';

export default function App() {
  const [result, setResult] = useState<StudentResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [logoError, setLogoError] = useState(false);
  
  // Admin Preview states
  const [isAdminBypass, setIsAdminBypass] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');

  // Target: June 2, 2026 22:00 WIB (15:00 UTC)
  const targetTime = Date.UTC(2026, 5, 2, 15, 0, 0);
  const [isLocked, setIsLocked] = useState(Date.now() < targetTime);

  React.useEffect(() => {
    const checkLockStatus = () => {
      setIsLocked(Date.now() < targetTime);
    };
    checkLockStatus();
    const interval = setInterval(checkLockStatus, 1000);
    return () => clearInterval(interval);
  }, [targetTime]);

  const effectiveLocked = isLocked && !isAdminBypass;

  const handleCheckNisn = (nisn: string) => {
    if (effectiveLocked) {
      setError('Mohon maaf, pengumuman kelulusan belum dibuka resmi. Silakan tunggu hingga hitung mundur selesai.');
      return;
    }
    setIsLoading(true);
    setError(null);
    
    // Simulate a brief, clean loading animation (600ms) to provide a professional experience
    setTimeout(() => {
      const match = studentsDatabase.find((s) => s.nisn === nisn.trim());
      
      if (match) {
        setResult({
          name: match.name,
          status: match.status,
          message: match.message
        });
      } else {
        setError('Data siswa dengan NISN tersebut tidak ditemukan. Silakan periksa kembali nomor NISN Anda.');
      }
      setIsLoading(false);
    }, 600);
  };

  const handleBack = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-between p-6 md:p-12 relative overflow-hidden font-sans text-slate-100">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/30 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/30 rounded-full blur-[120px]"></div>
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-emerald-500/20 rounded-full blur-[100px]"></div>
      </div>

      {/* Header Section */}
      <header className="relative z-10 w-full flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center shadow-xl overflow-hidden p-1">
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
          <div className="text-center md:text-left">
            <h1 className="text-xl font-bold tracking-tight text-white">SMP NEGERI 21 KOTA JAMBI</h1>
            <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">Dinas Pendidikan Kota Jambi</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isAdminBypass ? (
            <button 
              onClick={() => setIsAdminBypass(false)}
              className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/35 text-emerald-300 rounded-full text-xs font-semibold hover:bg-emerald-500/30 transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-950/20 cursor-pointer active:scale-95 animate-pulse"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Mode Preview Aktif (Keluar)
            </button>
          ) : (
            <button 
              onClick={() => {
                setAdminPassword('');
                setAdminError('');
                setShowAdminModal(true);
              }}
              className="px-4 py-2 bg-slate-800/60 hover:bg-slate-700/80 border border-white/10 rounded-full text-xs font-semibold text-slate-200 hover:text-white transition-all cursor-pointer shadow-lg shadow-slate-950/40 active:scale-95"
            >
              🔑 Akses Preview Guru
            </button>
          )}
          <div className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-xs font-medium text-slate-300 whitespace-nowrap">
            Tahun Ajaran 2025 / 2026
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center w-full py-8">
        <div className="w-full max-w-md mx-auto">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                {isAdminBypass && (
                  <div className="mb-4 bg-emerald-500/20 border border-emerald-500/30 rounded-2xl p-4 text-center text-xs text-emerald-300 font-medium leading-relaxed">
                    ⚠️ <strong>MODE PREVIEW GURU/ADMIN AKTIF</strong><br />
                    Membuka kunci sistem kelulusan untuk simulasi. Ketikkan NISN apa saja untuk menguji.
                  </div>
                )}
                <CountdownTimer />
                <LoginForm 
                  onSubmit={handleCheckNisn} 
                  isLoading={isLoading} 
                  error={error} 
                  isLocked={effectiveLocked}
                />
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <ResultCard 
                  result={result} 
                  onBack={handleBack} 
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="relative z-10 w-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 max-md:gap-8 items-end">
        <div className="text-xs text-slate-500 md:text-left text-center leading-relaxed">
          <p className="font-bold text-slate-400 uppercase mb-1">Lokasi Sekolah</p>
          Jl. Lingkar Selatan, Kenali Asam Bawah,<br />
          Kec. Kota Baru, Kota Jambi, Jambi 36129
        </div>
        <div className="flex justify-center flex-col items-center">
           <p className="text-[10px] text-slate-600 uppercase tracking-[0.3em] mb-4 text-center">Dikelola Oleh Tim IT SMPN 21</p>
           <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
        </div>
        <div className="text-xs text-slate-500 md:text-right text-center mt-4 md:mt-0">
          <p>© 2025 SMP Negeri 21 Kota Jambi.</p>
          <p>Hak Cipta Dilindungi Undang-Undang.</p>
        </div>
      </footer>

      {/* Admin Verification Modal */}
      <AnimatePresence>
        {showAdminModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAdminModal(false)}
              className="absolute inset-0 bg-slate-950/85 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-sm bg-slate-900/90 border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col gap-4 text-slate-100 z-10"
            >
              <div className="text-center">
                <span className="text-4xl block mb-2">🔑</span>
                <h3 className="text-xl font-bold text-white">Mode Preview Guru</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Gunakan fitur ini untuk melakukan simulasi pengecekan NISN siswa sebelum pintu pengumuman resmi dibuka.
                </p>
              </div>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (adminPassword === "Admin123") {
                    setIsAdminBypass(true);
                    setShowAdminModal(false);
                    setAdminError('');
                  } else {
                    setAdminError('Password salah!');
                  }
                }}
                className="space-y-4 mt-2"
              >
                <div>
                  <input 
                    type="password"
                    placeholder="Masukkan Password Admin"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full bg-slate-950/70 border border-white/15 rounded-xl py-3 px-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-sm font-medium"
                    autoFocus
                  />
                  {adminError && (
                    <p className="text-red-400 text-xs text-center mt-2 font-semibold">❌ {adminError}</p>
                  )}
                </div>

                <div className="flex gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAdminModal(false)}
                    className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-all cursor-pointer border border-white/5"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all cursor-pointer border border-blue-400/20 shadow-lg shadow-blue-900/30"
                  >
                    Konfirmasi
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
