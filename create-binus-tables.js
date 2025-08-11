const sqlite3 = require('sqlite3').verbose();

console.log('🔧 Creating Binus University database tables...\n');

// Connect to Binus database
const db = new sqlite3.Database('binus.db', (err) => {
  if (err) {
    console.error('Could not connect to Binus database', err);
    return;
  }
  console.log('✅ Connected to Binus SQLite database');
});

// Create projects table for Binus
const createProjectsTable = `
CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  team TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  link TEXT,
  year INTEGER
);
`;

// Create members table for Binus
const createMembersTable = `
CREATE TABLE IF NOT EXISTS members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  team TEXT NOT NULL,
  major TEXT,
  role TEXT
);
`;

// Execute table creation
db.serialize(() => {
  console.log('📊 Creating projects table...');
  db.run(createProjectsTable, (err) => {
    if (err) {
      console.error('❌ Error creating projects table:', err);
    } else {
      console.log('✅ Projects table created successfully');
    }
  });

  console.log('👥 Creating members table...');
  db.run(createMembersTable, (err) => {
    if (err) {
      console.error('❌ Error creating members table:', err);
    } else {
      console.log('✅ Members table created successfully');
    }
  });
});

// Wait a bit then close
setTimeout(() => {
  console.log('\n🎉 Database tables created successfully!');
  console.log('🚀 You can now run: node binseed.js');
  
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
    } else {
      console.log('Database connection closed.');
    }
    process.exit(0);
  });
}, 1000); 