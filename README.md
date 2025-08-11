# ProcodeCG Internship Management System

A comprehensive internship management system built for ProcodeCG that manages alumni data, projects, and member information across different universities including Telkom University and Binus University.

## 🚀 Features

- **Multi-University Support**: Separate data management for different universities (Telkom & Binus)
- **Alumni Management**: Track alumni data across multiple years (2020-2025)
- **Project Management**: CRUD operations for internship projects with categories
- **Member Management**: Track team members and their roles
- **Search & Filter**: Advanced search and category filtering capabilities
- **Responsive Design**: Modern, clean UI that works on all devices
- **Real-time Updates**: Dynamic content updates without page refreshes
- **Database Integration**: SQLite databases with seeded data
- **Multi-Server Architecture**: Separate servers for different universities

## 🏗️ Architecture

The system consists of multiple servers:

- **Main Server** (Port 3000): Serves static files and Telkom University data
- **Alumni Server** (Port 3001): Manages alumni data with years, projects, and members
- **Binus Server** (Port 3001): Alternative server for Binus University data

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/bunnyFL9/Internship-final.git
   cd Internship-final
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Seed the databases**
   ```bash
   # Seed alumni database
   node alumni-seed.js
   
   # Seed Binus database
   node binseed.js
   ```

## 🚦 Running the Application

### Option 1: Start All Servers (Recommended)
```bash
node start-servers.js
```

This will start:
- Telu server on port 3000
- Alumni server on port 3001

### Option 2: Start Individual Servers
```bash
# Main Telu server
node server.js

# Alumni server (in another terminal)
node alumni-server.js

# Binus server (alternative)
node binus-server.js
```

## 🌐 Access URLs

After starting the servers, you can access:

- **Main Page**: http://localhost:3000/index.html
- **Telkom University Page**: http://localhost:3000/telu.html
- **Binus University Page**: http://localhost:3000/binus.html
- **Activities Page**: http://localhost:3000/activities.html
- **Calendar Page**: http://localhost:3000/calendar.html
- **Tracks Page**: http://localhost:3000/tracks.html

## 📊 API Endpoints

### Telu Server (Port 3000)
- `GET /api/projects` - Get all Telu projects
- `POST /api/projects` - Create new Telu project
- `PUT /api/projects/:id` - Update Telu project
- `DELETE /api/projects/:id` - Delete Telu project
- `GET /api/members` - Get all Telu members
- `POST /api/members` - Create new Telu member
- `PUT /api/members/:id` - Update Telu member
- `DELETE /api/members/:id` - Delete Telu member

### Alumni Server (Port 3001)
- `GET /api/years` - Get all years with summary
- `GET /api/years/:year` - Get specific year details
- `GET /api/years/:year/projects` - Get projects for a year
- `GET /api/years/:year/members` - Get members for a year
- `GET /api/projects` - Get all alumni projects
- `GET /api/members` - Get all alumni members
- `GET /api/stats` - Get statistics summary

### Binus Server (Port 3001 - Alternative)
Similar endpoints as Alumni server but for Binus University data.

## 🗄️ Database Structure

The system uses SQLite databases:

### Alumni Database (`alumni.db`)
- **years**: Year information with descriptions
- **projects**: Project details with team information
- **members**: Member details with team associations

### Telu Database (`internship.db`)
- **projects**: Telkom University projects
- **members**: Telkom University team members

### Binus Database (`binus.db`)
- **projects**: Binus University projects
- **members**: Binus University team members

## 🎨 Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Database**: SQLite3
- **Styling**: Custom CSS with modern design
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Inter)

## 📁 Project Structure

```
Internship-final/
├── README.md                 # Main documentation
├── package.json             # Node.js dependencies
├── start-servers.js         # Server startup script
├── server.js               # Main Telu server
├── alumni-server.js        # Alumni data server
├── binus-server.js         # Binus university server
├── alumni-seed.js          # Alumni database seeder
├── binseed.js             # Binus database seeder
├── create-binus-tables.js # Binus table creation
├── index.html             # Main alumni page
├── telu.html              # Telkom university page
├── binus.html             # Binus university page
├── activities.html        # Activities page
├── calendar.html          # Calendar page
├── tracks.html            # Tracks page
├── styles.css             # Main stylesheet
├── script.js              # Shared JavaScript utilities
├── alumni.js              # Alumni page functionality
├── *.db                   # SQLite database files
└── assets/                # Images and static files
```

## 🛠️ Development

### Adding New Universities
1. Create a new server file (e.g., `university-server.js`)
2. Create corresponding HTML page
3. Update `start-servers.js` to include the new server
4. Create seed file for initial data

### Database Schema Changes
Update the respective seed files and table creation scripts.

### UI Modifications
Main styles are in `styles.css`. Each page has its own JavaScript functionality.

## 🔐 Environment Variables

The system uses default ports but can be configured:
- `PORT`: Server port (default: 3000 for main, 3001 for alumni/binus)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Commit and push to your fork
5. Create a pull request

## 👨‍💻 Authors

**Restu Jagat Wibisono**
- GitHub: [@bunnyFL9](https://github.com/bunnyFL9)
- ProcodeCG Internship Program 2025

**Muhammad Fayiz Firdaus**
- ProcodeCG Internship Program 2025

**Aliep Anugrah Putra A.**
- ProcodeCG Internship Program 2025

## 🙏 Acknowledgments

- ProcodeCG for the internship opportunity
- All intern contributors across different universities
- Mentors and supervisors for their guidance

---

**Note**: This system manages real internship data for ProcodeCG. Please handle all data responsibly and follow the company's data privacy guidelines.
