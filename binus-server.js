const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initialize SQLite database for Binus University
const db = new sqlite3.Database('binus.db', (err) => {
  if (err) {
    console.error('Could not connect to Binus database', err);
  } else {
    console.log('Connected to Binus SQLite database');
  }
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
db.run(createProjectsTable);

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
db.run(createMembersTable);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Binus University Internship Projects API',
    status: 'Connected',
    endpoints: {
      'GET /api/projects': 'Get all Binus projects',
      'POST /api/projects': 'Create new Binus project',
      'PUT /api/projects/:id': 'Update Binus project',
      'DELETE /api/projects/:id': 'Delete Binus project',
      'GET /api/members': 'Get all Binus members',
      'POST /api/members': 'Create new Binus member',
      'PUT /api/members/:id': 'Update Binus member',
      'DELETE /api/members/:id': 'Delete Binus member',
      'GET /api/projects/:id/members': 'Get members for a Binus project'
    }
  });
});

// PROJECTS ENDPOINTS FOR BINUS
// Get all projects
app.get('/api/projects', (req, res) => {
  db.all('SELECT * FROM projects', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Create new project
app.post('/api/projects', (req, res) => {
  const { team, title, category, link, year } = req.body;
  if (!team || !title || !category) {
    return res.status(400).json({ error: 'Team, title, and category are required' });
  }
  db.run(
    'INSERT INTO projects (team, title, category, link, year) VALUES (?, ?, ?, ?, ?)',
    [team, title, category, link, year],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, team, title, category, link, year });
    }
  );
});

// Update project
app.put('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  const { team, title, category, link, year } = req.body;
  if (!team || !title || !category) {
    return res.status(400).json({ error: 'Team, title, and category are required' });
  }
  db.run(
    'UPDATE projects SET team = ?, title = ?, category = ?, link = ?, year = ? WHERE id = ?',
    [team, title, category, link, year, id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id, team, title, category, link, year });
    }
  );
});

// Delete project
app.delete('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM projects WHERE id = ?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  });
});

// Get members for a specific project
app.get('/api/projects/:id/members', (req, res) => {
  const { id } = req.params;
  db.all('SELECT * FROM members WHERE team = (SELECT team FROM projects WHERE id = ?)', [id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// MEMBERS ENDPOINTS FOR BINUS
// Get all members
app.get('/api/members', (req, res) => {
  db.all('SELECT * FROM members', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Create new member
app.post('/api/members', (req, res) => {
  const { name, team, major, role } = req.body;
  if (!name || !team) {
    return res.status(400).json({ error: 'Name and team are required' });
  }
  db.run(
    'INSERT INTO members (name, team, major, role) VALUES (?, ?, ?, ?)',
    [name, team, major, role],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, name, team, major, role });
    }
  );
});

// Update member
app.put('/api/members/:id', (req, res) => {
  const { id } = req.params;
  const { name, team, major, role } = req.body;
  if (!name || !team) {
    return res.status(400).json({ error: 'Name and team are required' });
  }
  db.run(
    'UPDATE members SET name = ?, team = ?, major = ?, role = ? WHERE id = ?',
    [name, team, major, role, id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id, name, team, major, role });
    }
  );
});

// Delete member
app.delete('/api/members/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM members WHERE id = ?', [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Member not found' });
    }
    res.json({ message: 'Member deleted successfully' });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Binus University server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
    } else {
      console.log('Binus database connection closed.');
    }
    process.exit(0);
  });
}); 