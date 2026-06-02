import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LoginForm } from './components/LoginForm';
import { ResultCard } from './components/ResultCard';
import { StudentResult, AnnouncementResponse } from './types';
import { SchoolLogo } from './components/SchoolLogo';
import { CountdownTimer } from './components/CountdownTimer';

export default function App() {
  const [result, setResult] = useState<StudentResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [logoError, setLogoError] = useState(false);

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

  const handleCheckNisn = async (nisn: string) => {
    if (isLocked) {
      setError('Pengumuman belum dirilis secara resmi.');
      return;
    }
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/pengumuman', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nisn }),
      });
      
      const data: AnnouncementResponse = await response.json();
      
      if (response.ok && data.success && data.data) {
        setResult(data.data);
      } else {
        setError(data.error || 'Terjadi kesalahan pada sistem. Silakan coba lagi.');
      }
    } catch (err) {
      setError('Gagal terhubung ke server. Periksa koneksi internet Anda.');
    } finally {
      setIsLoading(false);
    }
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
        <div className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-xs font-medium text-slate-300 whitespace-nowrap">
          Tahun Ajaran 2025 / 2026
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
                <CountdownTimer />
                <LoginForm 
                  onSubmit={handleCheckNisn} 
                  isLoading={isLoading} 
                  error={error} 
                  isLocked={isLocked}
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
    </div>
  );
}
