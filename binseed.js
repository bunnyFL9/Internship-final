const sqlite3 = require('sqlite3').verbose();

// Connect to Binus database
const db = new sqlite3.Database('binus.db', (err) => {
  if (err) {
    console.error('Could not connect to Binus database', err);
    return;
  }
  console.log('Connected to Binus SQLite database for seeding');
});

// Sample data for Binus University
const sampleProjects = [
  {
    team: 'BinusTech Innovators',
    title: 'AI-Powered Student Management System',
    category: 'AI & Machine Learning',
    link: 'https://github.com/binustech/ai-student-system',
    year: 2025
  },
  {
    team: 'BinusWeb Solutions',
    title: 'E-Learning Platform with Real-time Collaboration',
    category: 'Web Development & Digital Platforms',
    link: 'https://github.com/binusweb/elearning-platform',
    year: 2025
  },
  {
    team: 'BinusBlock',
    title: 'Decentralized Certificate Verification System',
    category: 'Blockchain & Web3',
    link: 'https://github.com/binusblock/cert-verification',
    year: 2025
  },
  {
    team: 'BinusSecure',
    title: 'Advanced Network Security Monitoring Tool',
    category: 'Cybersecurity & Data Privacy',
    link: 'https://github.com/binussecure/network-monitor',
    year: 2025
  },
  {
    team: 'BinusIoT',
    title: 'Smart Campus Environment Monitoring System',
    category: 'IoT & Embedded Systems',
    link: 'https://github.com/binusiot/smart-campus',
    year: 2025
  }
];

const sampleMembers = [
  {
    name: 'Ahmad Rizki',
    team: 'BinusTech Innovators',
    major: 'Computer Science',
    role: 'Team Lead & Backend Developer'
  },
  {
    name: 'Sarah Putri',
    team: 'BinusTech Innovators',
    major: 'Computer Science',
    role: 'AI/ML Engineer'
  },
  {
    name: 'Budi Santoso',
    team: 'BinusTech Innovators',
    major: 'Information Systems',
    role: 'Frontend Developer'
  },
  {
    name: 'Dewi Sari',
    team: 'BinusWeb Solutions',
    major: 'Computer Science',
    role: 'Full Stack Developer'
  },
  {
    name: 'Rendi Pratama',
    team: 'BinusWeb Solutions',
    major: 'Information Systems',
    role: 'UI/UX Designer'
  },
  {
    name: 'Maya Indah',
    team: 'BinusWeb Solutions',
    major: 'Computer Science',
    role: 'Backend Developer'
  },
  {
    name: 'Fajar Ramadhan',
    team: 'BinusBlock',
    major: 'Computer Science',
    role: 'Blockchain Developer'
  },
  {
    name: 'Nina Safitri',
    team: 'BinusBlock',
    major: 'Information Systems',
    role: 'Smart Contract Developer'
  },
  {
    name: 'Adi Nugraha',
    team: 'BinusSecure',
    major: 'Computer Science',
    role: 'Security Engineer'
  },
  {
    name: 'Rina Marlina',
    team: 'BinusSecure',
    major: 'Information Systems',
    role: 'Network Analyst'
  },
  {
    name: 'Hendra Wijaya',
    team: 'BinusIoT',
    major: 'Computer Engineering',
    role: 'IoT Engineer'
  },
  {
    name: 'Siti Nurhaliza',
    team: 'BinusIoT',
    major: 'Computer Science',
    role: 'Embedded Systems Developer'
  }
];

// Function to seed projects
function seedProjects() {
  console.log('Seeding projects...');
  
  sampleProjects.forEach((project, index) => {
    db.run(
      'INSERT OR IGNORE INTO projects (team, title, category, link, year) VALUES (?, ?, ?, ?, ?)',
      [project.team, project.title, project.category, project.link, project.year],
      function(err) {
        if (err) {
          console.error('Error inserting project:', err);
        } else {
          if (this.changes > 0) {
            console.log(`✓ Project "${project.title}" added`);
          } else {
            console.log(`- Project "${project.title}" already exists`);
          }
        }
        
        // Check if this is the last project
        if (index === sampleProjects.length - 1) {
          console.log('Projects seeding completed!\n');
          seedMembers();
        }
      }
    );
  });
}

// Function to seed members
function seedMembers() {
  console.log('Seeding members...');
  
  sampleMembers.forEach((member, index) => {
    db.run(
      'INSERT OR IGNORE INTO members (name, team, major, role) VALUES (?, ?, ?, ?)',
      [member.name, member.team, member.major, member.role],
      function(err) {
        if (err) {
          console.error('Error inserting member:', err);
        } else {
          if (this.changes > 0) {
            console.log(`✓ Member "${member.name}" added to ${member.team}`);
          } else {
            console.log(`- Member "${member.name}" already exists`);
          }
        }
        
        // Check if this is the last member
        if (index === sampleMembers.length - 1) {
          console.log('Members seeding completed!\n');
          finishSeeding();
        }
      }
    );
  });
}

// Function to finish seeding
function finishSeeding() {
  console.log('🎉 Binus University database seeding completed!');
  console.log(`📊 Added ${sampleProjects.length} projects and ${sampleMembers.length} members`);
  console.log('🚀 You can now start the Binus server with: node binus-server.js');
  
  // Close database connection
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
    } else {
      console.log('Database connection closed.');
    }
    process.exit(0);
  });
}

// Start seeding process
console.log('🌱 Starting Binus University database seeding...\n');
seedProjects(); 