const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files

// Initialize SQLite database
const db = new sqlite3.Database('alumni.db', (err) => {
  if (err) {
    console.error('Could not connect to database', err);
  } else {
    console.log('Connected to Alumni SQLite database');
  }
});

// Create tables
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

db.serialize(() => {
  db.exec(createTables, (err) => {
    if (err) {
      console.error('Error creating tables:', err);
    } else {
      console.log('Tables created successfully');
    }
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'ProcodeCG Alumni API',
    status: 'Connected',
    endpoints: {
      'GET /api/years': 'Get all years with summary',
      'GET /api/years/:year': 'Get specific year details',
      'GET /api/years/:year/projects': 'Get projects for a year',
      'GET /api/years/:year/members': 'Get members for a year',
      'GET /api/projects': 'Get all projects',
      'GET /api/members': 'Get all members',
      'POST /api/years': 'Add new year',
      'POST /api/projects': 'Add new project',
      'POST /api/members': 'Add new member'
    }
  });
});

// YEARS ENDPOINTS
app.get('/api/years', (req, res) => {
  const query = `
    SELECT 
      y.*,
      COUNT(DISTINCT p.id) as project_count,
      COUNT(DISTINCT m.id) as member_count
    FROM years y
    LEFT JOIN projects p ON y.year = p.year
    LEFT JOIN members m ON y.year = m.year
    GROUP BY y.id
    ORDER BY y.year DESC
  `;
  
  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get('/api/years/:year', (req, res) => {
  const { year } = req.params;
  const query = `
    SELECT 
      y.*,
      COUNT(DISTINCT p.id) as project_count,
      COUNT(DISTINCT m.id) as member_count
    FROM years y
    LEFT JOIN projects p ON y.year = p.year
    LEFT JOIN members m ON y.year = m.year
    WHERE y.year = ?
    GROUP BY y.id
  `;
  
  db.get(query, [year], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Year not found' });
    res.json(row);
  });
});

app.post('/api/years', (req, res) => {
  const { year, description } = req.body;
  if (!year) {
    return res.status(400).json({ error: 'Year is required' });
  }
  
  db.run('INSERT INTO years (year, description) VALUES (?, ?)', 
    [year, description], 
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, year, description });
    }
  );
});

// PROJECTS ENDPOINTS
app.get('/api/projects', (req, res) => {
  const { year, category } = req.query;
  let query = 'SELECT * FROM projects';
  let params = [];
  
  if (year || category) {
    query += ' WHERE';
    if (year) {
      query += ' year = ?';
      params.push(year);
    }
    if (category) {
      query += year ? ' AND' : '';
      query += ' category = ?';
      params.push(category);
    }
  }
  
  query += ' ORDER BY year DESC, team_name';
  
  db.all(query, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get('/api/years/:year/projects', (req, res) => {
  const { year } = req.params;
  db.all('SELECT * FROM projects WHERE year = ? ORDER BY team_name', 
    [year], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

app.post('/api/projects', (req, res) => {
  const { year, team_name, project_title, category, description, github_link, demo_link, image_url } = req.body;
  
  if (!year || !team_name || !project_title || !category) {
    return res.status(400).json({ error: 'Year, team name, project title, and category are required' });
  }
  
  db.run(
    'INSERT INTO projects (year, team_name, project_title, category, description, github_link, demo_link, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [year, team_name, project_title, category, description, github_link, demo_link, image_url],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ 
        id: this.lastID, 
        year, 
        team_name, 
        project_title, 
        category, 
        description, 
        github_link, 
        demo_link, 
        image_url 
      });
    }
  );
});

// MEMBERS ENDPOINTS
app.get('/api/members', (req, res) => {
  const { year, team_name } = req.query;
  let query = 'SELECT * FROM members';
  let params = [];
  
  if (year || team_name) {
    query += ' WHERE';
    if (year) {
      query += ' year = ?';
      params.push(year);
    }
    if (team_name) {
      query += year ? ' AND' : '';
      query += ' team_name = ?';
      params.push(team_name);
    }
  }
  
  query += ' ORDER BY year DESC, name';
  
  db.all(query, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get('/api/years/:year/members', (req, res) => {
  const { year } = req.params;
  db.all('SELECT * FROM members WHERE year = ? ORDER BY name', 
    [year], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

app.post('/api/members', (req, res) => {
  const { name, year, team_name, university, major, role, linkedin_url, github_url, profile_image } = req.body;
  
  if (!name || !year || !team_name) {
    return res.status(400).json({ error: 'Name, year, and team name are required' });
  }
  
  db.run(
    'INSERT INTO members (name, year, team_name, university, major, role, linkedin_url, github_url, profile_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [name, year, team_name, university, major, role, linkedin_url, github_url, profile_image],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ 
        id: this.lastID, 
        name, 
        year, 
        team_name, 
        university, 
        major, 
        role, 
        linkedin_url, 
        github_url, 
        profile_image 
      });
    }
  );
});

// STATISTICS ENDPOINT
app.get('/api/stats', (req, res) => {
  const statsQuery = `
    SELECT 
      COUNT(DISTINCT y.year) as total_years,
      COUNT(DISTINCT p.id) as total_projects,
      COUNT(DISTINCT m.id) as total_members,
      COUNT(DISTINCT p.category) as total_categories
    FROM years y
    LEFT JOIN projects p ON y.year = p.year
    LEFT JOIN members m ON y.year = m.year
  `;
  
  db.get(statsQuery, [], (err, stats) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(stats);
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Alumni Server running on port ${PORT}`);
}); 