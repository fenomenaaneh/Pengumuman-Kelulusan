import { StudentResult } from '../types';

export interface StudentRecord extends StudentResult {
  nisn: string;
}

/**
 * Daftar Data Kelulusan Siswa Resmi SMP Negeri 21 Kota Jambi
 * 
 * Data ini dibaca langsung secara statis (tanpa perlu API dari server)
 * untuk menghindari kegagalan loading/error pada Vercel.
 */
export const studentsDatabase: StudentRecord[] = [
  {
    nisn: "0119069463",
    name: "Abdul Fathir",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0119655915",
    name: "ABEL DHEA RENANDA",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0114859368",
    name: "Adelard Danadyaksa",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0111057175",
    name: "AGDI MARTINES BANCIN",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0126371597",
    name: "AHMAD UTAMA CELVIN NUR CAHYA",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0119798644",
    name: "Airin Azahra",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0112419090",
    name: "Akila Alfarizi Baitullah Siregar",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0117349389",
    name: "ALFI NIHAYATUL KHUSNAH",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0115737028",
    name: "ALIF AZIIZ",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0115388186",
    name: "ALIFAH ADAWIYAH",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0119964040",
    name: "AMELIA SAPUTRI",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0105101947",
    name: "AMELLIA ZAHRRA RAHMADHANI",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0119856561",
    name: "Angga Saputra",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0112752125",
    name: "Annisa Mis Daryanti",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0107199007",
    name: "Arif Maulana Putra",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0108068692",
    name: "ARINI DEFVANI PUTRI",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0117046697",
    name: "Arkan Dwi Syahputra",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0125000404",
    name: "ASOLEHNI NUROHMA",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0111857428",
    name: "Asyifa Kurnia Sari",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0118994020",
    name: "ATHIFAH ZUHARIAH",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0111184949",
    name: "Aurelia Putri",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0114677467",
    name: "Axl Faletehan",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0116485727",
    name: "AYUNITA JUNIAR BR GULTOM",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0102763176",
    name: "AZILLA RAMADHANI",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "3119420643",
    name: "AZZAM BIMA ASSALAM",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0107141736",
    name: "BAYU LASHER",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0111641958",
    name: "CARLITA AULINA. S",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0119463628",
    name: "CITRA MISCHELLE ANGGREINI GULTOM",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0111849350",
    name: "Dafa Putra Angara",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0105522121",
    name: "DEDEK ARIYANTO",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0114844676",
    name: "Defry Apriliansyah",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0094467337",
    name: "Desti Febri Ariyani",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0118936011",
    name: "DIAH TRYALIFIRAH",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0119235017",
    name: "Dika Viki Ilahi",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0118839265",
    name: "DIMAS SUSILO",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0113582734",
    name: "Dinda Oktavia",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0111069714",
    name: "DINO RAMADHANI",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0111127135",
    name: "Dwi Ramatdhani",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0101956526",
    name: "FAUZOFAN PRATAMA",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0119309002",
    name: "Feliy Aprilia",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0114714368",
    name: "FIONIKA ANUGRAH RAMADHANI",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0117127502",
    name: "FITRIYA AUDITA",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0116047340",
    name: "Florensia",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0116320431",
    name: "GABRIEL ISAAC SITUMORANG",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0117685973",
    name: "Gabriel Reynaldi Manulang",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0117902736",
    name: "GABRIEL SIMORANGKIR",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0111581849",
    name: "Geisya Agustina BR Silaban",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "3103511898",
    name: "GIBRAN ANDREAN PUTRA",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0116763151",
    name: "Gilang Samuddera",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0113920887",
    name: "Gracia Angelina",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0113091916",
    name: "HANUM CANDRA NINGTYAS",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0107648381",
    name: "Jeskiel Pasaribu",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0112020856",
    name: "Junior Rasya Arya Wiguna",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0119938534",
    name: "KEYLA HASNAA PUTRI",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0117898795",
    name: "Khumaira Nur mahmuda",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0115597919",
    name: "Laura Syahbilla",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0111979101",
    name: "M MISBAHUL HAQ",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0111827840",
    name: "M. Royhan Hasibuan",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0119967099",
    name: "M.Addrian Firmansyah",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0115939168",
    name: "M.Raditya Dwi Setio",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0111579085",
    name: "MANASIK AJI SYAPUTRA",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0125786556",
    name: "MARSELA DWI CANTIKA",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0117627472",
    name: "Maulana Ibrahim",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0117662747",
    name: "Miftahul Jannah",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0111060927",
    name: "MUHAIMIN AHMAD",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0101556820",
    name: "MUHAMAD MUSDAR",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0094704247",
    name: "MUHAMAD SAPUTRA",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0117561850",
    name: "MUHAMAT SIDIK SAPUTRA",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0114662028",
    name: "Muhammad Raydit",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "3117718495",
    name: "MUHAMMAD RIFQII JUSTICE GUNAWAN",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "3113392880",
    name: "Muhammad Zaifan",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "3127187090",
    name: "MUSLIMAH VINNY WIDIASTUTI",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0119964016",
    name: "Nabila Vauziya Riyani",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0118183767",
    name: "NADA SORAYA",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0119014407",
    name: "Naira Rahmayani",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0102282003",
    name: "Najwa Aqila",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0119945832",
    name: "Nasya Irawan",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0128233057",
    name: "Neschya Nadila Putri",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0112189493",
    name: "Neyna Nevhiona",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0119590146",
    name: "Neysha Dwi Fadhila",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0115369322",
    name: "NIKITA AULIA SARI",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0103388930",
    name: "Nindi Cantika",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0116461649",
    name: "NOPRYANSYAH",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0118690253",
    name: "NUKE MEVAN AGENTA M",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0112127325",
    name: "NUR AFRIYAN SAPUTRA",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0102677920",
    name: "NUR ASYIFA REGINA",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0108668091",
    name: "Nur Azizah",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0108829502",
    name: "NUR HIDAYAH",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0116645603",
    name: "OKTAVI ANGGRAENI",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0114991506",
    name: "PUTRI KARINA",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0082598788",
    name: "RADIT ADITIA MARBUN",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0116505330",
    name: "Rakhmat Zakir Zakaria",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0119366393",
    name: "RAMADHAN SAPITRAH",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0111880984",
    name: "Ranju Fliska Mulia",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0111647913",
    name: "Ranrazes Raja Guk Guk",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0105187499",
    name: "RANTI SURYANI PUTRI",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0116170469",
    name: "Rasya Agso Alfadilah",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0104938226",
    name: "RASYID HANDIKA",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0119913732",
    name: "Raya Fitra Ramadhan",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0109254320",
    name: "REGINA NIKMATUL KAMALIA",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0092654179",
    name: "RIAN KUSNALDI",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0115034444",
    name: "Ridho Nur Rohim",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0117636916",
    name: "Rifki Fadilah Dwi Putra",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0116075766",
    name: "RIYAN STIAWAN",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0117196331",
    name: "RIZKI JATMIKO",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0118012408",
    name: "Rizki Ramadhan",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0119604588",
    name: "ROBY ADITYA PUTRA SIANIPAR",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0102307133",
    name: "Sabiyah Sakya Desma",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0105556251",
    name: "Sarah Neiska Butar-Butar",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0118671301",
    name: "Sasy Wijayana",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "3111731908",
    name: "SELVI KAMAYANTI",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "3117533195",
    name: "Septiani Zahra Amelia",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0112712137",
    name: "Silvia Yopi Sazana Damanik",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0116986663",
    name: "SRI REZEKI",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0111947674",
    name: "SUSI ANGGRAINI",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0116607945",
    name: "SYARA AISWARAY",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0107118898",
    name: "Tantya Zahratu syita",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0117244901",
    name: "TASYA MEYLIANDRA",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0115247926",
    name: "THERESA MAIDIKA",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0106506689",
    name: "TIFANI",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0102748244",
    name: "UPIZZA",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0119561840",
    name: "WABIL DWI SEPTIAN",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0118304859",
    name: "ZANETA PUTRI NUR ILFANI",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0107299098",
    name: "ZASKYA AL HIDAYAH",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0118708808",
    name: "ZHAFIRAH SEPTIANI",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0098380521",
    name: "ZHANTIKA FHRIZZA MAHARANI",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  },
  {
    nisn: "0126788161",
    name: "Zia Zhafirah",
    status: "LULUS",
    message: "Selamat! Anda dinyatakan LULUS."
  }
];
