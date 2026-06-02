import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const DB_FILE = path.join(process.cwd(), "students.json");

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

// Initialize database
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify(defaultStudents, null, 2), "utf-8");
}

function getStudents() {
  try {
    const data = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function saveStudents(students: any[]) {
  fs.writeFileSync(DB_FILE, JSON.stringify(students, null, 2), "utf-8");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Add JSON middleware
  app.use(express.json());

  // API endpoint for checking NISN
  // Using POST so that NISN isn't easily visibly logged in standard GET access logs
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
    // Secure search: The backend filters the result locally and only returns the specific student's data.
    const student = students.find((s: any) => s.nisn === nisn);

    if (student) {
      // Intentionally omitting other fields (if any secret fields exist) to ensure confidentiality
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
  // DO NOT DO THIS IN REAL PRODUCTION WITHOUT PROPER SESSIONS!
  const requireAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authHeader = req.headers.authorization;
    // VERY simple password simulation for the demo: "Admin123"
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
        // Human error correction: normalize minor spelling variations
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
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
