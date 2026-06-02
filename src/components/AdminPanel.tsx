import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Lock, LogOut, Plus, Trash2, ShieldCheck, CheckCircle2, XCircle, Upload, FileText, HelpCircle, Check, AlertCircle, Download } from 'lucide-react';

interface Student {
  nisn: string;
  name: string;
  status: 'LULUS' | 'TIDAK LULUS';
  message: string;
}

export function AdminPanel() {
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // New Student Form State
  const [newNisn, setNewNisn] = useState('');
  const [newName, setNewName] = useState('');
  const [newStatus, setNewStatus] = useState<'LULUS' | 'TIDAK LULUS'>('LULUS');
  const [newMessage, setNewMessage] = useState('');

  // Bulk Upload States
  const [activeTab, setActiveTab] = useState<'manual' | 'bulk'>('manual');
  const [bulkText, setBulkText] = useState('');
  const [parsedStudents, setParsedStudents] = useState<Student[]>([]);
  const [overwrite, setOverwrite] = useState(true);
  const [bulkResult, setBulkResult] = useState<{ added: number; updated: number; skipped: number } | null>(null);
  const [selectedNisns, setSelectedNisns] = useState<string[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Parse bulk input when change
  useEffect(() => {
    if (!bulkText.trim()) {
      setParsedStudents([]);
      return;
    }

    const lines = bulkText.split('\n');
    const list: Student[] = [];

    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line) continue;

      // Skip common Excel/CSV headers
      const lower = line.toLowerCase();
      if (
        (lower.includes('nisn') && lower.includes('nama')) ||
        (lower.includes('no') && lower.includes('status')) ||
        (lower.startsWith('nisn;') || lower.startsWith('nisn,'))
      ) {
        continue;
      }

      // Try split by: 
      // 1. Tab (from copying Excel/Google Sheets cells)
      // 2. Semicolon ; (common Indonesian Excel CSV export)
      // 3. Comma , (standard CSV)
      let parts = line.split('\t');
      if (parts.length < 2) parts = line.split(';');
      if (parts.length < 2) parts = line.split(',');

      if (parts.length >= 2) {
        const nisn = parts[0].replace(/['"\s]/g, '').trim(); // slice quote characters and spaces
        const name = parts[1].replace(/['"]/g, '').trim();
        
        let statusRaw = parts[2] ? parts[2].replace(/['"]/g, '').trim().toUpperCase() : 'LULUS';
        let status: 'LULUS' | 'TIDAK LULUS' = 'LULUS';
        
        if (
          statusRaw.includes('TIDAK') || 
          statusRaw === 'TL' || 
          statusRaw.includes('GAGAL') || 
          statusRaw === 'FALSE' || 
          statusRaw === '0'
        ) {
          status = 'TIDAK LULUS';
        }

        const message = parts[3] ? parts[3].replace(/['"]/g, '').trim() : '';

        if (nisn && name) {
          list.push({
            nisn,
            name,
            status,
            message,
          });
        }
      }
    }
    setParsedStudents(list);
  }, [bulkText]);

  // Check if we have token in local storage
  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken');
    if (savedToken) {
      setIsLoggedIn(true);
      fetchStudents(savedToken);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Hardcoded simple check matching server
    if (password === 'Admin123') {
      const token = 'Admin123';
      localStorage.setItem('adminToken', token);
      setIsLoggedIn(true);
      fetchStudents(token);
      setError(null);
    } else {
      setError('Password salah.');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    setStudents([]);
    setPassword('');
  };

  const fetchStudents = async (token: string) => {
    try {
      const res = await fetch('/api/admin/students', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setStudents(data);
      } else {
        handleLogout();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('adminToken');
    if (!token) return;

    try {
      const res = await fetch('/api/admin/students', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({
          nisn: newNisn.trim(),
          name: newName.trim(),
          status: newStatus,
          message: newMessage.trim()
        })
      });

      if (res.ok) {
        // Reset form
        setNewNisn('');
        setNewName('');
        setNewStatus('LULUS');
        setNewMessage('');
        // Refresh list
        fetchStudents(token);
      } else {
        const data = await res.json();
        alert(data.error || 'Gagal menambahkan siswa');
      }
    } catch (err) {
      alert('Terjadi kesalahan jaringan.');
    } finally {
      setLoading(false);
    }
  };

  const handleBulkUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (parsedStudents.length === 0) {
      alert('Belum ada data siswa yang valid untuk diunggah.');
      return;
    }

    setLoading(true);
    setBulkResult(null);
    const token = localStorage.getItem('adminToken');
    if (!token) return;

    try {
      const res = await fetch('/api/admin/students/bulk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          studentsList: parsedStudents,
          overwrite: overwrite
        })
      });

      if (res.ok) {
        const resultData = await res.json();
        setBulkResult({
          added: resultData.addedCount || 0,
          updated: resultData.updatedCount || 0,
          skipped: resultData.skippedCount || 0
        });
        setBulkText(''); // Clear input text area
        fetchStudents(token); // Update list
      } else {
        const data = await res.json();
        alert(data.error || 'Gagal mengunggah data secara massal.');
      }
    } catch (err) {
      alert('Terjadi kesalahan jaringan.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadTemplate = () => {
    // Standard CSV template using comma/semicolon for Indonesian Excel
    const csvContent = "NISN,NAMA,STATUS,PESAN\n" +
      "0012345678,Ahmad Fauzi,LULUS,Selamat! Anda dinyatakan LULUS.\n" +
      "0019876543,Siti Aminah,TIDAK LULUS,Maaf tetap semangat dan jangan putus asa.";
    
    // Add BOM for Excel utf8 encoding compatibility
    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "template_upload_kelulusan.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === 'string') {
        setBulkText(text);
        if (bulkResult) setBulkResult(null); // clear previous success banner
      }
    };
    reader.readAsText(file);
  };

  const handleDelete = async (nisn: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus data NISN ${nisn}?`)) return;
    const token = localStorage.getItem('adminToken');
    if (!token) return;

    try {
      const res = await fetch(`/api/admin/students/${nisn}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        fetchStudents(token);
      } else {
        alert('Gagal menghapus siswa');
      }
    } catch (err) {
      alert('Terjadi kesalahan jaringan.');
    }
  };

  const handleToggleSelect = (nisn: string) => {
    setSelectedNisns((prev) =>
      prev.includes(nisn) ? prev.filter((item) => item !== nisn) : [...prev, nisn]
    );
  };

  const handleToggleSelectAll = () => {
    if (selectedNisns.length === students.length) {
      setSelectedNisns([]);
    } else {
      setSelectedNisns(students.map((s) => s.nisn));
    }
  };

  const handleDeleteBulk = async () => {
    if (selectedNisns.length === 0) return;
    if (!confirm(`Apakah Anda yakin ingin menghapus ${selectedNisns.length} data siswa secara kolektif?`)) return;

    const token = localStorage.getItem('adminToken');
    if (!token) return;

    setLoading(true);
    try {
      const res = await fetch('/api/admin/students/delete-bulk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ nisns: selectedNisns })
      });

      if (res.ok) {
        setSelectedNisns([]);
        fetchStudents(token);
      } else {
        const data = await res.json();
        alert(data.error || 'Gagal menghapus siswa terpilih.');
      }
    } catch (err) {
      alert('Terjadi kesalahan jaringan.');
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 text-slate-100 font-sans relative overflow-hidden">
        {/* Simple Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px]"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full max-w-sm bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-400/30">
              <ShieldCheck className="text-blue-400 w-8 h-8" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-center mb-2">Admin Portal</h2>
          <p className="text-sm text-slate-400 text-center mb-8">Masuk untuk mengelola data kelulusan.</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-2">Password Admin</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password..."
                  required
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              </div>
            </div>

            {error && <p className="text-red-400 text-sm text-center bg-red-500/10 py-2 rounded-lg">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-lg active:scale-[0.98]"
            >
              Log In
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col p-6 md:p-12 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[0%] left-[-10%] w-[30%] h-[30%] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px]"></div>
      </div>

      <header className="relative z-10 w-full max-w-6xl mx-auto flex justify-between items-center bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl mb-8">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-blue-400" />
          <div>
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
            <p className="text-xs text-slate-400">Pengelolaan Data Kelulusan</p>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 px-4 py-2 rounded-xl transition-all border border-red-500/20"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-bold">Keluar</span>
        </button>
      </header>

      <main className="relative z-10 flex-1 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Form Container with Manual vs Bulk tabs */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[2rem] flex flex-col gap-6">
          <div className="flex border-b border-white/10 p-1 bg-slate-900/50 rounded-2xl">
            <button
              onClick={() => { setActiveTab('manual'); if (bulkResult) setBulkResult(null); }}
              className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                activeTab === 'manual'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Plus className="w-4 h-4" />
              Manual
            </button>
            <button
              onClick={() => setActiveTab('bulk')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                activeTab === 'bulk'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Upload className="w-4 h-4" />
              Upload Massal
            </button>
          </div>

          {activeTab === 'manual' ? (
            <div>
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-emerald-400">
                <Plus className="w-5 h-5" />
                Tambah Satu Siswa
              </h2>
              <form onSubmit={handleAddStudent} className="space-y-4">
                <div>
                  <label className="text-xs uppercase tracking-widest text-slate-400 font-bold block mb-1.5">NISN</label>
                  <input
                    type="text"
                    required
                    value={newNisn}
                    onChange={(e) => setNewNisn(e.target.value)}
                    placeholder="Contoh: 0012345678"
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-slate-400 font-bold block mb-1.5">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Nama Lengkap Siswa"
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-slate-400 font-bold block mb-1.5">Status Kelulusan</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as any)}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm appearance-none cursor-pointer"
                  >
                    <option value="LULUS">LULUS</option>
                    <option value="TIDAK LULUS">TIDAK LULUS</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-slate-400 font-bold block mb-1.5">Pesan Tambahan (Opsional)</label>
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Pesan kelulusan kustom..."
                    rows={3}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl font-bold transition-all mt-4 text-sm"
                >
                  {loading ? 'Menyimpan...' : 'Simpan Data'}
                </button>
              </form>
            </div>
          ) : (
            <div>
              <h2 className="text-lg font-bold mb-2 flex items-center gap-2 text-blue-400">
                <Upload className="w-5 h-5" />
                Upload Data Siswa Massal
              </h2>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                  Copy dan paste dari tabel **Excel / Google Sheets**, atau pilih file **CSV** Anda di bawah ini.
                </p>
                <button
                  type="button"
                  onClick={handleDownloadTemplate}
                  className="shrink-0 text-xs bg-slate-800 hover:bg-slate-700 text-blue-300 font-bold py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all border border-blue-500/10 hover:border-blue-500/20 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-blue-400" />
                  Unduh Template
                </button>
              </div>

              {bulkResult && (
                <div className="mb-4 p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-300 space-y-1">
                  <p className="font-bold">🎉 Berhasil mengunggah data!</p>
                  <div className="grid grid-cols-3 gap-2 mt-1.5 text-center font-semibold text-[11px]">
                    <div className="bg-emerald-500/20 text-emerald-300 p-1.5 rounded">Baru: +{bulkResult.added}</div>
                    <div className="bg-blue-500/20 text-blue-300 p-1.5 rounded">Update: {bulkResult.updated}</div>
                    <div className="bg-slate-500/20 text-slate-300 p-1.5 rounded">Lewat: {bulkResult.skipped}</div>
                  </div>
                </div>
              )}

              <form onSubmit={handleBulkUpload} className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs uppercase tracking-widest text-slate-400 font-bold block">
                      Data Excel / Text CSV
                    </label>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1"
                    >
                      <FileText className="w-3.5 h-3.5" /> Pilih File CSV
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".csv,.txt"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>

                  <textarea
                    value={bulkText}
                    onChange={(e) => setBulkText(e.target.value)}
                    placeholder="Contoh format paste dari Excel:&#10;0012345678	Ahmad Fauzi	LULUS	Selamat!&#10;0019876543	Siti Aminah	TIDAK LULUS	Tetap semangat!&#10;&#10;Atau ketik manual dipisah karakter tab / titik koma."
                    rows={6}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-xs font-mono leading-relaxed"
                  ></textarea>
                </div>

                <div className="flex items-center gap-2 bg-slate-900/30 p-2.5 rounded-xl border border-white/5">
                  <input
                    type="checkbox"
                    id="overwrite-check"
                    checked={overwrite}
                    onChange={(e) => setOverwrite(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-white/10 rounded bg-slate-950 focus:ring-blue-500/50 focus:ring-2 cursor-pointer"
                  />
                  <label htmlFor="overwrite-check" className="text-[11px] text-slate-300 cursor-pointer select-none">
                    Perbarui data jika NISN sudah terdaftar (Update/Upsert)
                  </label>
                </div>

                {parsedStudents.length > 0 && (
                  <div className="p-3.5 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-blue-300 flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4" />
                        Preview Unggah ({parsedStudents.length} siswa)
                      </span>
                    </div>
                    <div className="max-h-32 overflow-y-auto space-y-1.5 pr-1 text-[11px]">
                      {parsedStudents.slice(0, 5).map((student, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-slate-950/40 p-1.5 rounded border border-white/5">
                          <div className="truncate max-w-[120px] font-semibold text-slate-200">
                            {student.name}
                          </div>
                          <div className="flex items-center gap-1.5 font-mono">
                            <span className="text-[10px] text-slate-400">{student.nisn}</span>
                            {student.status === 'LULUS' ? (
                              <span className="bg-emerald-500/20 text-emerald-400 px-1 py-0.5 rounded text-[9px] font-bold">LULUS</span>
                            ) : (
                              <span className="bg-red-500/20 text-red-400 px-1 py-0.5 rounded text-[9px] font-bold">TL</span>
                            )}
                          </div>
                        </div>
                      ))}
                      {parsedStudents.length > 5 && (
                        <p className="text-[10px] text-slate-500 italic text-center pt-1">
                          Dan {parsedStudents.length - 5} siswa lainnya...
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || parsedStudents.length === 0}
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl font-bold transition-all text-sm flex items-center justify-center gap-2"
                >
                  {loading ? 'Mengunggah...' : `Unggah ${parsedStudents.length} Siswa`}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Data List Container */}
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden flex flex-col h-full min-h-[500px]">
          <div className="p-6 border-b border-white/10 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Daftar Siswa</h2>
              <div className="flex items-center gap-2">
                {selectedNisns.length > 0 && (
                  <button
                    onClick={handleDeleteBulk}
                    className="flex items-center gap-1.5 text-xs bg-red-600 hover:bg-red-500 text-white font-bold py-1.5 px-3 rounded-lg transition-all border border-red-500/10 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Hapus Terpilih ({selectedNisns.length})
                  </button>
                )}
                <div className="bg-slate-800 px-3 py-1 text-xs rounded-full font-bold">
                  Total: {students.length}
                </div>
              </div>
            </div>

            {students.length > 0 && (
              <div className="flex items-center justify-between bg-slate-900/30 p-2.5 rounded-xl border border-white/5">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="select-all-students"
                    checked={students.length > 0 && selectedNisns.length === students.length}
                    onChange={handleToggleSelectAll}
                    className="w-4 h-4 text-blue-600 border-white/10 rounded bg-slate-950 focus:ring-blue-500/50 focus:ring-2 cursor-pointer"
                  />
                  <label htmlFor="select-all-students" className="text-xs text-slate-300 font-semibold cursor-pointer select-none">
                    Pilih Semua Siswa
                  </label>
                </div>
                {selectedNisns.length > 0 && (
                  <span className="text-[10px] text-blue-400 font-mono">
                    {selectedNisns.length} dari {students.length} terpilih
                  </span>
                )}
              </div>
            )}
          </div>
          <div className="flex-1 overflow-auto p-6">
            {students.length === 0 ? (
              <div className="h-full flex items-center justify-center text-slate-500">
                Belum ada data siswa.
              </div>
            ) : (
              <div className="space-y-4">
                {students.map((s) => (
                  <div key={s.nisn} className={`bg-white/5 border p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:bg-white/10 ${selectedNisns.includes(s.nisn) ? 'border-blue-500/40 bg-blue-500/5' : 'border-white/10'}`}>
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={selectedNisns.includes(s.nisn)}
                        onChange={() => handleToggleSelect(s.nisn)}
                        className="w-4 h-4 mt-1.5 text-blue-600 border-white/10 rounded bg-slate-950 focus:ring-blue-500/50 focus:ring-2 cursor-pointer shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-bold text-lg">{s.name}</span>
                          {s.status === 'LULUS' ? (
                            <span className="flex items-center gap-1 text-[10px] font-bold bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full border border-emerald-500/30">
                              <CheckCircle2 className="w-3 h-3" /> LULUS
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-[10px] font-bold bg-red-500/20 text-red-400 px-2 py-1 rounded-full border border-red-500/30">
                              <XCircle className="w-3 h-3" /> TIDAK LULUS
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-400">
                          <span className="font-mono">{s.nisn}</span>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDelete(s.nisn)}
                      className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-all border border-red-500/20 self-end md:self-auto"
                      title="Hapus Data"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
