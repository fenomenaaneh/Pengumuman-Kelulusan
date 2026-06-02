import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

// Default mock students if file doesn't exist
const defaultStudents = [
  { 
    nisn: "0012345678", 
    name: "Ahmad Faisal", 
    status: "LULUS", 
    message: "Selamat! Anda dinyatakan LULUS dari SMP Negeri 21 Kota Jambi." 
  },
  { 
    nisn: "0019876543", 
    name: "Budi Santoso", 
    status: "LULUS", 
    message: "Selamat! Anda dinyatakan LULUS dari SMP Negeri 21 Kota Jambi." 
  },
  { 
    nisn: "0025556667", 
    name: "Siti Aminah", 
    status: "LULUS", 
    message: "Selamat! Anda dinyatakan LULUS dari SMP Negeri 21 Kota Jambi." 
  },
  { 
    nisn: "0031122334", 
    name: "Rizki Pratama", 
    status: "TIDAK LULUS", 
    message: "Maaf, Anda dinyatakan TIDAK LULUS. Tetap semangat dan jangan putus asa." 
  }
];

// Configure databases: Vercel serverless runs in read-only environment, except /tmp
const SOURCE_DB_FILE = path.join(process.cwd(), "students.json");
const WRITABLE_DB_FILE = process.env.VERCEL 
  ? path.join("/tmp", "students.json")
  : SOURCE_DB_FILE;

// Initialize database
if (process.env.VERCEL) {
  if (!fs.existsSync(WRITABLE_DB_FILE)) {
    try {
      if (fs.existsSync(SOURCE_DB_FILE)) {
        fs.copyFileSync(SOURCE_DB_FILE, WRITABLE_DB_FILE);
      } else {
        fs.writeFileSync(WRITABLE_DB_FILE, JSON.stringify(defaultStudents, null, 2), "utf-8");
      }
    } catch (e) {
      console.error("Vercel Temp File Init Error:", e);
    }
  }
} else {
  if (!fs.existsSync(SOURCE_DB_FILE)) {
    fs.writeFileSync(SOURCE_DB_FILE, JSON.stringify(defaultStudents, null, 2), "utf-8");
  }
}

function getStudents() {
  try {
    const targetFile = fs.existsSync(WRITABLE_DB_FILE) ? WRITABLE_DB_FILE : SOURCE_DB_FILE;
    const data = fs.readFileSync(targetFile, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function saveStudents(students: any[]) {
  try {
    fs.writeFileSync(WRITABLE_DB_FILE, JSON.stringify(students, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write database file:", err);
  }
}

// Configure Express app
const app = express();
app.use(express.json());

// API endpoint for checking NISN
app.post("/api/pengumuman", (req, res) => {
  const { nisn } = req.body;

  // Check if the current time is before June 2, 2026 22:00 WIB (15:00 UTC)
  const TARGET_RELEASE_TIME = Date.UTC(2026, 5, 2, 15, 0, 0); // Month 5 is June
  if (Date.now() < TARGET_RELEASE_TIME) {
    return res.status(403).json({
      success: false,
      error: "Mohon maaf, pengumuman kelulusan belum dibuka resmi. Silakan tunggu hingga hitung mundur di halaman awal selesai."
    });
  }

  if (!nisn) {
    return res.status(400).json({ error: "NISN tidak boleh kosong." });
  }

  const students = getStudents();
  const student = students.find((s: any) => s.nisn === nisn);

  if (student) {
    res.json({
      success: true,
      data: {
        name: student.name,
        status: student.status,
        message: student.message
      }
    });
  } else {
    res.status(404).json({ 
      success: false, 
      error: "Data siswa dengan NISN tersebut tidak terdaftar di sistem." 
    });
  }
});

// Admin middleware to verify simple password
const requireAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers.authorization;
  // Admin password: "Admin123"
  if (authHeader === "Bearer Admin123") {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

// Get all students
app.get("/api/admin/students", requireAdmin, (req, res) => {
  res.json(getStudents());
});

// Add a student
app.post("/api/admin/students", requireAdmin, (req, res) => {
  const { nisn, name, status, message } = req.body;
  if (!nisn || !name || !status) {
    return res.status(400).json({ error: "NISN, name, and status are required" });
  }

  const students = getStudents();
  if (students.find((s: any) => s.nisn === nisn)) {
    return res.status(400).json({ error: "Student with this NISN already exists" });
  }

  students.push({
    nisn,
    name,
    status,
    message: message || (status === "LULUS" ? "Selamat! Anda dinyatakan LULUS dari SMP Negeri 21 Kota Jambi." : "Maaf, Anda dinyatakan TIDAK LULUS. Tetap semangat dan jangan putus asa.")
  });
  saveStudents(students);
  res.json({ success: true });
});

// Bulk add/update students
app.post("/api/admin/students/bulk", requireAdmin, (req, res) => {
  const { studentsList, overwrite } = req.body;
  if (!studentsList || !Array.isArray(studentsList)) {
    return res.status(400).json({ error: "Daftar siswa harus berupa array/list." });
  }

  const students = getStudents();
  let addedCount = 0;
  let updatedCount = 0;
  let skippedCount = 0;

  for (const item of studentsList) {
    const nisn = String(item.nisn || "").trim();
    const name = String(item.name || "").trim();
    let status = String(item.status || "").trim().toUpperCase();

    if (!nisn || !name) {
      skippedCount++;
      continue;
    }

    if (status !== "LULUS" && status !== "TIDAK LULUS") {
      if (status.includes("LULUS") && !status.includes("TIDAK")) {
        status = "LULUS";
      } else if (status.includes("TIDAK") || status.includes("GAGAL")) {
        status = "TIDAK LULUS";
      } else {
        status = "LULUS";
      }
    }

    const defaultMessage = status === "LULUS"
      ? "Selamat! Anda dinyatakan LULUS dari SMP Negeri 21 Kota Jambi."
      : "Maaf, Anda dinyatakan TIDAK LULUS. Tetap semangat dan jangan putus asa.";
    const message = String(item.message || "").trim() || defaultMessage;

    const existingIndex = students.findIndex((s: any) => s.nisn === nisn);
    if (existingIndex !== -1) {
      if (overwrite) {
        students[existingIndex] = { nisn, name, status, message };
        updatedCount++;
      } else {
        skippedCount++;
      }
    } else {
      students.push({ nisn, name, status, message });
      addedCount++;
    }
  }

  saveStudents(students);
  res.json({ success: true, addedCount, updatedCount, skippedCount });
});

// Delete a student
app.delete("/api/admin/students/:nisn", requireAdmin, (req, res) => {
  const { nisn } = req.params;
  let students = getStudents();
  students = students.filter((s: any) => s.nisn !== nisn);
  saveStudents(students);
  res.json({ success: true });
});

// Bulk delete students
app.post("/api/admin/students/delete-bulk", requireAdmin, (req, res) => {
  const { nisns } = req.body;
  if (!nisns || !Array.isArray(nisns)) {
    return res.status(400).json({ error: "Daftar NISN harus berupa array." });
  }
  let students = getStudents();
  const beforeCount = students.length;
  students = students.filter((s: any) => !nisns.includes(s.nisn));
  saveStudents(students);
  const deletedCount = beforeCount - students.length;
  res.json({ success: true, deletedCount });
});

export { app };

// Start function for fullstack development/production container
async function startServer() {
  const PORT = 3000;

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Only listener starts on stand-alone container architectures, NOT Vercel Serverless
if (!process.env.VERCEL) {
  startServer();
}
