# ProcodeCG Alumni Backend System

This is a new backend system specifically designed for managing ProcodeCG internship alumni data with a clean, organized structure.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Seed the Database
```bash
npm run alumni-seed
```

### 3. Start the Alumni Server
```bash
npm run alumni
```

The server will run on `http://localhost:3001`

## 📊 Database Structure

### Tables

#### `years`
- `id` - Primary key
- `year` - Year (2020-2025)
- `description` - Year description
- `total_projects` - Number of projects (auto-calculated)
- `total_members` - Number of members (auto-calculated)

#### `projects`
- `id` - Primary key
- `year` - Foreign key to years
- `team_name` - Team name
- `project_title` - Project title
- `category` - Project category
- `description` - Project description
- `github_link` - GitHub repository link
- `demo_link` - Demo link
- `image_url` - Project image URL

#### `members`
- `id` - Primary key
- `name` - Member name
- `year` - Foreign key to years
- `team_name` - Foreign key to projects
- `university` - University name
- `major` - Major/degree
- `role` - Role in the project
- `linkedin_url` - LinkedIn profile
- `github_url` - GitHub profile
- `profile_image` - Profile image URL

## 🔌 API Endpoints

### Years
- `GET /api/years` - Get all years with summary
- `GET /api/years/:year` - Get specific year details
- `POST /api/years` - Add new year

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects?year=2025&category=AI` - Filter projects
- `GET /api/years/:year/projects` - Get projects for a year
- `POST /api/projects` - Add new project

### Members
- `GET /api/members` - Get all members
- `GET /api/members?year=2025&team_name=Team Alpha` - Filter members
- `GET /api/years/:year/members` - Get members for a year
- `POST /api/members` - Add new member

### Statistics
- `GET /api/stats` - Get overall statistics

## 🎯 Frontend Integration

The frontend (`index.html`) now uses real data from the API:

1. **Dynamic Loading**: Years are loaded from the API
2. **Interactive Cards**: Click on year cards to see details
3. **Modal Details**: View projects and members for each year
4. **Real-time Stats**: Project and member counts are live

## 📝 Sample Data

The seed file includes:
- **6 years** (2020-2025)
- **18 projects** across different categories
- **50+ members** from various universities

### Categories
- Blockchain & Web3
- Cybersecurity & Data Privacy
- AI & Machine Learning
- Web Development & Digital Platforms
- IoT & Embedded Systems

## 🔧 Adding New Data

### Via API
```bash
# Add a new year
curl -X POST http://localhost:3001/api/years \
  -H "Content-Type: application/json" \
  -d '{"year": 2026, "description": "Future batch"}'

# Add a new project
curl -X POST http://localhost:3001/api/projects \
  -H "Content-Type: application/json" \
  -d '{"year": 2025, "team_name": "Team New", "project_title": "New Project", "category": "AI & Machine Learning"}'

# Add a new member
curl -X POST http://localhost:3001/api/members \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "year": 2025, "team_name": "Team New", "university": "Universitas Indonesia", "major": "Computer Science", "role": "Developer"}'
```

### Via Database
You can also directly modify the `alumni.db` file using SQLite tools.

## 🎨 Frontend Features

- **Loading States**: Shows spinner while loading data
- **Error Handling**: Displays error messages if API fails
- **Responsive Design**: Works on all screen sizes
- **Animations**: Smooth transitions and hover effects
- **Modal Details**: Rich modal with project and member information

## 🔄 Migration from Old System

The new system is completely separate from the old `server.js`. You can run both simultaneously:
- Old system: `npm start` (port 3000)
- New system: `npm run alumni` (port 3001)

## 📱 Usage

1. Start the alumni server: `npm run alumni`
2. Open `index.html` in your browser
3. Click on year cards to see detailed information
4. View projects and members for each year

The system automatically loads real data and provides an interactive experience for exploring ProcodeCG's internship alumni! 