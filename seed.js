const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('telkom.db');

// Dummy projects
const projects = [
  { team: "Team 1", title: "Implementasi Multi-Signature Web3 Wallet untuk DAO dengan Optimisasi Gas Berbasis Solidity", category: "Blockchain & Web3", link: "", year: 2025 },
  { team: "Team 2", title: "Sistem Keamanan Data Kesehatan Pribadi dengan Secure Medical Record", category: "Cybersecurity & Data Privacy", link: "", year: 2025 },
  { team: "Team 3", title: "Expense Tracker Berbasis WEB3", category: "Blockchain & Web3", link: "", year: 2025 },
  { team: "Team 4", title: "Deteksi kendaraan kelebihan beban di pintu masuk tol dengan object recognition machine learning (ex: YOLO)", category: "AI & Machine Learning", link: "", year: 2025 },
  { team: "Team 5", title: "Membuat reksp growth suatu brand atau personal dari jumlah follower dan likes di social media", category: "AI & Machine Learning", link: "", year: 2025 },
  { team: "Team 6", title: "Deteksi kendaraan kelebihan beban di pintu masuk tol dengan object recognition machine learning (ex: YOLO)", category: "AI & Machine Learning", link: "", year: 2025 },
  { team: "Team 7", title: "Perancangan dan Implementasi Website Interaktif sebagai Media Pembelajaran Akademik di ProdiQCC dengan Integrasi AI sebagai Virtual Learning Assistant", category: "Web Development & Digital Platforms", link: "", year: 2025 },
  { team: "Team 8", title: "Sistem Monitoring Parkiran Motor Berbasis Kamera Menggunakan Algoritma YOLO dengan Interface Aplikasi Web", category: "AI & Machine Learning", link: "", year: 2025 },
  { team: "Team 9", title: "Deteksi transaksi tidak wajar (penipuan, pencucian uang, dll) dengan machine learning", category: "AI & Machine Learning", link: "", year: 2025 },
  { team: "Team 10", title: "Rancang Bangun Sistem Informasi E-Learning (Learning Management System) Berbasis Web", category: "Web Development & Digital Platforms", link: "", year: 2025 },
  { team: "Team 11", title: "Uji Efektivitas Konfigurasi Firewall dan Aturan SYNPROXY pada Iptables untuk Mederasi Serangan SYN Flood dan SSH Brute Force di Server Ubuntu", category: "Cybersecurity & Data Privacy", link: "", year: 2025 },
  { team: "Team 12", title: "Desain Sistem Penerimaan Paket Otomatis Berbasis ESP32-CAM dengan Fitur Kamera, Kunci Servo, dan Deteksi Penempatan Paket", category: "IoT & Embedded Systems", link: "", year: 2025 },
  { team: "Team 13", title: "Deteksi kendaraan kelebihan beban di pintu masuk tol dengan object recognition machine learning (ex: YOLO)", category: "AI & Machine Learning", link: "", year: 2025 },
  { team: "Team 14", title: "Klasifikasi Otomatis Jenis Sampah Rumah Tangga Menggunakan Convolutional Neural Network (CNN)", category: "AI & Machine Learning", link: "", year: 2025 },
  { team: "Team 15", title: "Website pencatat penjualan untuk UMKM Cemilque", category: "Web Development & Digital Platforms", link: "", year: 2025 },
  { team: "Team 16", title: "Simple personal AI yang bisa mengingatkan jadwal berdasarkan input teks", category: "AI & Machine Learning", link: "", year: 2025 },
  { team: "Team 17", title: "Membuat rekap progress murid dari report yang diposting di website/blog menggunakan web scrapping", category: "Web Development & Digital Platforms", link: "", year: 2025 },
  { team: "Team 18", title: "Membuat prototype info trackrecord Internship Procode", category: "Web Development & Digital Platforms", link: "", year: 2025 },
  { team: "Team 19", title: "Sistem Rekap Otomatis Progres Murid dari Laporan Blog WordPress ProCodeCG", category: "Web Development & Digital Platforms", link: "", year: 2025 },
  { team: "Team 20", title: "(Judul tidak terlihat jelas, kemungkinan terkait website/otomasi)", category: "Web Development & Digital Platforms", link: "", year: 2025 }
];

// Dummy members
const members = [
  { name: "Khoerul Umam", team: "Team 1" },
  { name: "Yozarino Hady", team: "Team 2" },
  { name: "Khalid Nurahman", team: "Team 2" },
  { name: "Kisy Ahmadjaya Cendekia", team: "Team 2" },
  { name: "Hafizh Naufal", team: "Team 3" },
  { name: "Muhammad Rafi Maulana", team: "Team 3" },
  { name: "Zheo Marten Oliver", team: "Team 3" },
  { name: "Rajendra Aria Nismara", team: "Team 4" },
  { name: "TIO Ramanisah Fazrin", team: "Team 4" },
  { name: "Syahla Setia Pratiwi", team: "Team 4" },
  { name: "Audy Ranayu Sammy Prahastry Rachman", team: "Team 4" },
  { name: "Dwi Agus Cahyo Ilahi", team: "Team 5" },
  { name: "Gita Adi Pangestu", team: "Team 5" },
  { name: "Arsik Myardi", team: "Team 5" },
  { name: "Haekal Zaki", team: "Team 6" },
  { name: "Marcellinus Geofani Sitohalo", team: "Team 7" },
  { name: "Abdul Malik Rahman", team: "Team 7" },
  { name: "Rizky Januar Hardi", team: "Team 8" },
  { name: "Kukuh Lintang Fajar", team: "Team 8" },
  { name: "Bagus Fakhrurahman", team: "Team 8" },
  { name: "Rafi Muhammad Hibban", team: "Team 8" },
  { name: "Elieser Pasaribu", team: "Team 9" },
  { name: "Bima Aji Kusuma", team: "Team 9" },
  { name: "Josua Owen Fernandi Silaban", team: "Team 9" },
  { name: "Juandra Aghifary", team: "Team 10" },
  { name: "Muhammad Afandi Harahap", team: "Team 10" },
  { name: "Muhammad Arif Fauzy Sihite", team: "Team 11" },
  { name: "Daniel Parlindungan Sinaga", team: "Team 11" },
  { name: "Azhar Lesmana", team: "Team 12" },
  { name: "Ezra Diva Kielaro", team: "Team 12" },
  { name: "Martsendro Eylano", team: "Team 12" },
  { name: "M Alva Fahrizki", team: "Team 12" },
  { name: "Fadhilul Adib", team: "Team 13" },
  { name: "Muhammad Dzikri Muqimilhaq", team: "Team 14" },
  { name: "Haikal Ali", team: "Team 15" },
  { name: "Darryl Satria Wibowo", team: "Team 15" },
  { name: "Muhammad Sabian Aziz", team: "Team 16" },
  { name: "Rifal Azhar Permana", team: "Team 17" },
  { name: "Aldhiaris Muhammad Azka", team: "Team 17" },
  { name: "Rakha Primindra", team: "Team 17" },
  { name: "Muhammad Fayiz Firdaus", team: "Team 18" },
  { name: "Aliep Anugrah", team: "Team 18" },
  { name: "Restu Jagat Wibisono", team: "Team 18" },
  { name: "Yaddast Nur Qomariyah", team: "Team 19" },
  { name: "Aura Izzatul Afifa", team: "Team 20" }
];

db.serialize(() => {
  db.run('DELETE FROM projects');
  db.run('DELETE FROM members');
  const projStmt = db.prepare('INSERT INTO projects (team, title, category, link, year) VALUES (?, ?, ?, ?, ?)');
  projects.forEach(p => projStmt.run(p.team, p.title, p.category, p.link, p.year));
  projStmt.finalize();

  const memStmt = db.prepare('INSERT INTO members (name, team) VALUES (?, ?)');
  members.forEach(m => memStmt.run(m.name, m.team));
  memStmt.finalize();

  console.log('Dummy data inserted!');
  db.close();
}); 