const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('alumni.db');

// Create tables first
const createTables = `
  CREATE TABLE IF NOT EXISTS years (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    year INTEGER UNIQUE NOT NULL,
    description TEXT,
    total_projects INTEGER DEFAULT 0,
    total_members INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    year INTEGER NOT NULL,
    team_name TEXT NOT NULL,
    project_title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    github_link TEXT,
    demo_link TEXT,
    image_url TEXT,
    FOREIGN KEY (year) REFERENCES years (year)
  );

  CREATE TABLE IF NOT EXISTS members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    year INTEGER NOT NULL,
    team_name TEXT NOT NULL,
    university TEXT,
    major TEXT,
    role TEXT,
    linkedin_url TEXT,
    github_url TEXT,
    profile_image TEXT,
    FOREIGN KEY (year) REFERENCES years (year),
    FOREIGN KEY (team_name) REFERENCES projects (team_name)
  );
`;

// Sample years data
const years = [
  { year: 2025, description: "Latest batch with cutting-edge projects in AI, Web3, and IoT" },
  { year: 2024, description: "Innovative projects focusing on cybersecurity and machine learning" },
  { year: 2023, description: "Breakthrough projects in blockchain and web development" },
  { year: 2022, description: "Pioneering work in mobile apps and data science" },
  { year: 2021, description: "Foundation projects in web development and automation" },
  { year: 2020, description: "First batch with diverse projects across multiple domains" }
];

// Sample projects data
const projects = [
  // 2025 Projects
  { year: 2025, team_name: "Team Alpha", project_title: "Multi-Signature Web3 Wallet for DAO", category: "Blockchain & Web3", description: "Advanced wallet system with multi-signature capabilities for DAO governance", github_link: "https://github.com/procodecg/web3-wallet", demo_link: "https://demo.procodecg.com/web3-wallet" },
  { year: 2025, team_name: "Team Beta", project_title: "Secure Medical Record System", category: "Cybersecurity & Data Privacy", description: "HIPAA-compliant medical record management with blockchain security", github_link: "https://github.com/procodecg/medical-records", demo_link: "https://demo.procodecg.com/medical-records" },
  { year: 2025, team_name: "Team Gamma", project_title: "Expense Tracker Web3", category: "Blockchain & Web3", description: "Decentralized expense tracking with smart contracts", github_link: "https://github.com/procodecg/expense-tracker", demo_link: "https://demo.procodecg.com/expense-tracker" },
  { year: 2025, team_name: "Team Delta", project_title: "Vehicle Overload Detection with YOLO", category: "AI & Machine Learning", description: "Real-time vehicle weight detection using computer vision", github_link: "https://github.com/procodecg/vehicle-detection", demo_link: "https://demo.procodecg.com/vehicle-detection" },
  { year: 2025, team_name: "Team Epsilon", project_title: "Social Media Growth Analytics", category: "AI & Machine Learning", description: "AI-powered social media growth prediction and analytics", github_link: "https://github.com/procodecg/social-analytics", demo_link: "https://demo.procodecg.com/social-analytics" },

  // 2024 Projects
  { year: 2024, team_name: "Team Zeta", project_title: "Interactive Learning Platform", category: "Web Development & Digital Platforms", description: "AI-powered virtual learning assistant for academic institutions", github_link: "https://github.com/procodecg/learning-platform", demo_link: "https://demo.procodecg.com/learning-platform" },
  { year: 2024, team_name: "Team Eta", project_title: "Smart Parking Monitoring System", category: "AI & Machine Learning", description: "Camera-based parking monitoring with YOLO algorithm", github_link: "https://github.com/procodecg/parking-system", demo_link: "https://demo.procodecg.com/parking-system" },
  { year: 2024, team_name: "Team Theta", project_title: "Fraud Detection System", category: "AI & Machine Learning", description: "Machine learning-based transaction fraud detection", github_link: "https://github.com/procodecg/fraud-detection", demo_link: "https://demo.procodecg.com/fraud-detection" },

  // 2023 Projects
  { year: 2023, team_name: "Team Iota", project_title: "E-Learning Management System", category: "Web Development & Digital Platforms", description: "Comprehensive LMS for educational institutions", github_link: "https://github.com/procodecg/lms", demo_link: "https://demo.procodecg.com/lms" },
  { year: 2023, team_name: "Team Kappa", project_title: "Firewall Security Testing", category: "Cybersecurity & Data Privacy", description: "Advanced firewall configuration and SYN proxy testing", github_link: "https://github.com/procodecg/firewall-testing", demo_link: "https://demo.procodecg.com/firewall-testing" },

  // 2022 Projects
  { year: 2022, team_name: "Team Lambda", project_title: "Smart Package Delivery System", category: "IoT & Embedded Systems", description: "ESP32-based automated package delivery with camera detection", github_link: "https://github.com/procodecg/package-delivery", demo_link: "https://demo.procodecg.com/package-delivery" },
  { year: 2022, team_name: "Team Mu", project_title: "Waste Classification CNN", category: "AI & Machine Learning", description: "Automatic household waste classification using CNN", github_link: "https://github.com/procodecg/waste-classification", demo_link: "https://demo.procodecg.com/waste-classification" },

  // 2021 Projects
  { year: 2021, team_name: "Team Nu", project_title: "UMKM Sales Tracker", category: "Web Development & Digital Platforms", description: "Sales tracking website for small businesses", github_link: "https://github.com/procodecg/sales-tracker", demo_link: "https://demo.procodecg.com/sales-tracker" },
  { year: 2021, team_name: "Team Xi", project_title: "Personal AI Assistant", category: "AI & Machine Learning", description: "Text-based personal AI with schedule management", github_link: "https://github.com/procodecg/ai-assistant", demo_link: "https://demo.procodecg.com/ai-assistant" },

  // 2020 Projects
  { year: 2020, team_name: "Team Omicron", project_title: "Student Progress Tracker", category: "Web Development & Digital Platforms", description: "Web scraping-based student progress monitoring", github_link: "https://github.com/procodecg/progress-tracker", demo_link: "https://demo.procodecg.com/progress-tracker" },
  { year: 2020, team_name: "Team Pi", project_title: "Internship Portfolio System", category: "Web Development & Digital Platforms", description: "Comprehensive internship tracking and portfolio system", github_link: "https://github.com/procodecg/portfolio-system", demo_link: "https://demo.procodecg.com/portfolio-system" }
];

// Sample members data
const members = [
  // 2025 Members
  { name: "Khoerul Umam", year: 2025, team_name: "Team Alpha", university: "Universitas Telkom", major: "Computer Science", role: "Team Lead" },
  { name: "Yozarino Hady", year: 2025, team_name: "Team Beta", university: "Universitas Binus", major: "Information Systems", role: "Backend Developer" },
  { name: "Khalid Nurahman", year: 2025, team_name: "Team Beta", university: "Universitas Indonesia", major: "Computer Science", role: "Frontend Developer" },
  { name: "Kisy Ahmadjaya Cendekia", year: 2025, team_name: "Team Beta", university: "Institut Teknologi Bandung", major: "Information Technology", role: "Full Stack Developer" },
  { name: "Hafizh Naufal", year: 2025, team_name: "Team Gamma", university: "Universitas Telkom", major: "Computer Science", role: "Blockchain Developer" },
  { name: "Muhammad Rafi Maulana", year: 2025, team_name: "Team Gamma", university: "Universitas Binus", major: "Information Systems", role: "Smart Contract Developer" },
  { name: "Zheo Marten Oliver", year: 2025, team_name: "Team Gamma", university: "Universitas Indonesia", major: "Computer Science", role: "Frontend Developer" },
  { name: "Rajendra Aria Nismara", year: 2025, team_name: "Team Delta", university: "Institut Teknologi Bandung", major: "Information Technology", role: "AI Engineer" },
  { name: "TIO Ramanisah Fazrin", year: 2025, team_name: "Team Delta", university: "Universitas Telkom", major: "Computer Science", role: "Computer Vision Engineer" },
  { name: "Syahla Setia Pratiwi", year: 2025, team_name: "Team Delta", university: "Universitas Binus", major: "Information Systems", role: "Data Scientist" },
  { name: "Audy Ranayu Sammy Prahastry Rachman", year: 2025, team_name: "Team Delta", university: "Universitas Indonesia", major: "Computer Science", role: "ML Engineer" },
  { name: "Dwi Agus Cahyo Ilahi", year: 2025, team_name: "Team Epsilon", university: "Institut Teknologi Bandung", major: "Information Technology", role: "Data Analyst" },
  { name: "Gita Adi Pangestu", year: 2025, team_name: "Team Epsilon", university: "Universitas Telkom", major: "Computer Science", role: "ML Engineer" },
  { name: "Arsik Myardi", year: 2025, team_name: "Team Epsilon", university: "Universitas Binus", major: "Information Systems", role: "Data Scientist" },

  // 2024 Members
  { name: "Haekal Zaki", year: 2024, team_name: "Team Zeta", university: "Universitas Indonesia", major: "Computer Science", role: "Full Stack Developer" },
  { name: "Marcellinus Geofani Sitohalo", year: 2024, team_name: "Team Eta", university: "Institut Teknologi Bandung", major: "Information Technology", role: "AI Engineer" },
  { name: "Abdul Malik Rahman", year: 2024, team_name: "Team Eta", university: "Universitas Telkom", major: "Computer Science", role: "Computer Vision Engineer" },
  { name: "Rizky Januar Hardi", year: 2024, team_name: "Team Theta", university: "Universitas Binus", major: "Information Systems", role: "ML Engineer" },
  { name: "Kukuh Lintang Fajar", year: 2024, team_name: "Team Theta", university: "Universitas Indonesia", major: "Computer Science", role: "Data Scientist" },
  { name: "Bagus Fakhrurahman", year: 2024, team_name: "Team Theta", university: "Institut Teknologi Bandung", major: "Information Technology", role: "Backend Developer" },
  { name: "Rafi Muhammad Hibban", year: 2024, team_name: "Team Theta", university: "Universitas Telkom", major: "Computer Science", role: "Frontend Developer" },

  // 2023 Members
  { name: "Elieser Pasaribu", year: 2023, team_name: "Team Iota", university: "Universitas Binus", major: "Information Systems", role: "Full Stack Developer" },
  { name: "Bima Aji Kusuma", year: 2023, team_name: "Team Iota", university: "Universitas Indonesia", major: "Computer Science", role: "Backend Developer" },
  { name: "Josua Owen Fernandi Silaban", year: 2023, team_name: "Team Iota", university: "Institut Teknologi Bandung", major: "Information Technology", role: "Frontend Developer" },
  { name: "Juandra Aghifary", year: 2023, team_name: "Team Kappa", university: "Universitas Telkom", major: "Computer Science", role: "Security Engineer" },
  { name: "Muhammad Afandi Harahap", year: 2023, team_name: "Team Kappa", university: "Universitas Binus", major: "Information Systems", role: "Network Security Specialist" },

  // 2022 Members
  { name: "Muhammad Arif Fauzy Sihite", year: 2022, team_name: "Team Lambda", university: "Universitas Indonesia", major: "Computer Science", role: "IoT Engineer" },
  { name: "Daniel Parlindungan Sinaga", year: 2022, team_name: "Team Lambda", university: "Institut Teknologi Bandung", major: "Information Technology", role: "Embedded Systems Developer" },
  { name: "Azhar Lesmana", year: 2022, team_name: "Team Mu", university: "Universitas Telkom", major: "Computer Science", role: "AI Engineer" },
  { name: "Ezra Diva Kielaro", year: 2022, team_name: "Team Mu", university: "Universitas Binus", major: "Information Systems", role: "ML Engineer" },
  { name: "Martsendro Eylano", year: 2022, team_name: "Team Mu", university: "Universitas Indonesia", major: "Computer Science", role: "Data Scientist" },
  { name: "M Alva Fahrizki", year: 2022, team_name: "Team Mu", university: "Institut Teknologi Bandung", major: "Information Technology", role: "Computer Vision Engineer" },

  // 2021 Members
  { name: "Fadhilul Adib", year: 2021, team_name: "Team Nu", university: "Universitas Telkom", major: "Computer Science", role: "Full Stack Developer" },
  { name: "Muhammad Dzikri Muqimilhaq", year: 2021, team_name: "Team Xi", university: "Universitas Binus", major: "Information Systems", role: "AI Engineer" },
  { name: "Haikal Ali", year: 2021, team_name: "Team Nu", university: "Universitas Indonesia", major: "Computer Science", role: "Frontend Developer" },
  { name: "Darryl Satria Wibowo", year: 2021, team_name: "Team Nu", university: "Institut Teknologi Bandung", major: "Information Technology", role: "Backend Developer" },
  { name: "Muhammad Sabian Aziz", year: 2021, team_name: "Team Xi", university: "Universitas Telkom", major: "Computer Science", role: "ML Engineer" },
  { name: "Rifal Azhar Permana", year: 2021, team_name: "Team Xi", university: "Universitas Binus", major: "Information Systems", role: "NLP Engineer" },

  // 2020 Members
  { name: "Aldhiaris Muhammad Azka", year: 2020, team_name: "Team Omicron", university: "Universitas Indonesia", major: "Computer Science", role: "Full Stack Developer" },
  { name: "Rakha Primindra", year: 2020, team_name: "Team Omicron", university: "Institut Teknologi Bandung", major: "Information Technology", role: "Web Scraping Specialist" },
  { name: "Muhammad Fayiz Firdaus", year: 2020, team_name: "Team Pi", university: "Universitas Telkom", major: "Computer Science", role: "Full Stack Developer" },
  { name: "Aliep Anugrah", year: 2020, team_name: "Team Pi", university: "Universitas Binus", major: "Information Systems", role: "Frontend Developer" },
  { name: "Restu Jagat Wibisono", year: 2020, team_name: "Team Pi", university: "Universitas Indonesia", major: "Computer Science", role: "Backend Developer" },
  { name: "Yaddast Nur Qomariyah", year: 2020, team_name: "Team Pi", university: "Institut Teknologi Bandung", major: "Information Technology", role: "UI/UX Designer" },
  { name: "Aura Izzatul Afifa", year: 2020, team_name: "Team Pi", university: "Universitas Telkom", major: "Computer Science", role: "Full Stack Developer" }
];

db.serialize(() => {
  // Create tables first
  db.exec(createTables, (err) => {
    if (err) {
      console.error('Error creating tables:', err);
    } else {
      console.log('Tables created successfully');
    }
  });

  // Clear existing data
  db.run('DELETE FROM members');
  db.run('DELETE FROM projects');
  db.run('DELETE FROM years');

  // Insert years
  const yearStmt = db.prepare('INSERT INTO years (year, description) VALUES (?, ?)');
  years.forEach(y => yearStmt.run(y.year, y.description));
  yearStmt.finalize();

  // Insert projects
  const projStmt = db.prepare('INSERT INTO projects (year, team_name, project_title, category, description, github_link, demo_link) VALUES (?, ?, ?, ?, ?, ?, ?)');
  projects.forEach(p => projStmt.run(p.year, p.team_name, p.project_title, p.category, p.description, p.github_link, p.demo_link));
  projStmt.finalize();

  // Insert members
  const memStmt = db.prepare('INSERT INTO members (name, year, team_name, university, major, role) VALUES (?, ?, ?, ?, ?, ?)');
  members.forEach(m => memStmt.run(m.name, m.year, m.team_name, m.university, m.major, m.role));
  memStmt.finalize();

  console.log('✅ Alumni database seeded successfully!');
  console.log(`📊 Inserted ${years.length} years, ${projects.length} projects, and ${members.length} members`);
  
  db.close();
}); 