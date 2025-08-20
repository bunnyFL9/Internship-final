const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Initialize SQLite database
const db = new sqlite3.Database('telkom.db', (err) => {
  if (err) {
    console.error('Could not connect to database', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Create projects table
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

// Create members table
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
    message: 'Internship Projects API',
    status: 'Connected',
    endpoints: {
      'GET /api/projects': 'Get all projects',
      'POST /api/projects': 'Create new project',
      'PUT /api/projects/:id': 'Update project',
      'DELETE /api/projects/:id': 'Delete project',
      'GET /api/members': 'Get all members',
      'POST /api/members': 'Create new member',
      'PUT /api/members/:id': 'Update member',
      'DELETE /api/members/:id': 'Delete member',
      'GET /api/projects/:id/members': 'Get members for a project'
    }
  });
});

// PROJECTS ENDPOINTS
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
// Delete project (and its members)
app.delete('/api/projects/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT team FROM projects WHERE id = ?', [id], (err, row) => {
    if (err || !row) return res.status(404).json({ error: 'Project not found' });
    const teamName = row.team;
    db.run('DELETE FROM projects WHERE id = ?', [id], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      db.run('DELETE FROM members WHERE team = ?', [teamName], function(err2) {
        if (err2) return res.status(500).json({ error: err2.message });
        res.json({ message: 'Project and its members deleted', id });
      });
    });
  });
});
// Get members for a project
app.get('/api/projects/:id/members', (req, res) => {
  const { id } = req.params;
  db.get('SELECT team FROM projects WHERE id = ?', [id], (err, row) => {
    if (err || !row) return res.status(404).json({ error: 'Project not found' });
    db.all('SELECT * FROM members WHERE team = ?', [row.team], (err2, rows) => {
      if (err2) return res.status(500).json({ error: err2.message });
      res.json(rows);
    });
  });
});

// MEMBERS ENDPOINTS
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
    res.json({ message: 'Member deleted', id });
  });
});

// STATISTICS ENDPOINTS
// Get statistics by year
app.get('/api/stats/by-year', (req, res) => {
  const query = `
    SELECT 
      COALESCE(p.year, 2025) as year,
      COUNT(DISTINCT p.id) as project_count,
      COUNT(DISTINCT m.id) as member_count
    FROM projects p
    LEFT JOIN members m ON p.team = m.team
    GROUP BY p.year
    ORDER BY p.year DESC
  `;
  
  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get overall statistics
app.get('/api/stats', (req, res) => {
  const query = `
    SELECT 
      COUNT(DISTINCT p.id) as total_projects,
      COUNT(DISTINCT m.id) as total_members,
      COUNT(DISTINCT p.category) as total_categories,
      'Telkom University' as university
    FROM projects p
    LEFT JOIN members m ON p.team = m.team
  `;
  
  db.get(query, [], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Telkom University server running on port ${PORT}`);
});
