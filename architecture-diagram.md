# Architecture Diagram - ProcodeCG Internship Alumni System

## 🏗️ System Architecture Overview

```mermaid
graph TB
    subgraph "Client Side - Frontend"
        A["🌐 Web Browser"]
        B["📱 index.html<br/>Main Landing Page"]
        C["🎯 university.html<br/>University Selection"]
        D["🏛️ telu.html<br/>Telkom Database UI"]
        E["🏢 binus.html<br/>Binus Database UI"]
        F["📊 alumni.js<br/>Alumni Data Manager"]
        G["🎨 styles.css<br/>Global Styling"]
        H["⚡ script.js<br/>Common Functions"]
    end

    subgraph "Server Side - Backend"
        I["🖥️ telkom-server.js<br/>Port: 3000<br/>Express.js Server"]
        J["🖥️ binus-server.js<br/>Port: 3002<br/>Express.js Server"]
        K["🔧 start-servers.js<br/>Server Orchestrator"]
    end

    subgraph "Database Layer"
        L[("💾 telkom.db<br/>SQLite Database<br/>- projects table<br/>- members table")]
        M[("💾 binus.db<br/>SQLite Database<br/>- projects table<br/>- members table")]
    end

    subgraph "Data Seeding & Migration"
        N["🌱 seed.js<br/>Telkom Data Seeder"]
        O["🌱 binseed.js<br/>Binus Data Seeder"]
        P["📋 create-binus-tables.js<br/>Database Schema Creator"]
    end

    subgraph "External Resources"
        Q["🖼️ Static Assets<br/>- procodelogo.png<br/>- logotelu.png<br/>- logobinus.png<br/>- fotoprofil.png<br/>- teluhero.jpg<br/>- binushero.jpg"]
        R["🌐 External APIs<br/>- Google Fonts<br/>- Font Awesome<br/>- Unsplash Images"]
    end

    %% Client-Server Connections
    A --> B
    A --> C
    A --> D
    A --> E
    B --> F
    C --> F
    D --> F
    E --> F
    B --> G
    C --> G
    D --> G
    E --> G
    B --> H
    C --> H
    D --> H
    E --> H

    %% API Connections
    F -->|"GET /api/stats/by-year<br/>GET /api/projects<br/>GET /api/members"| I
    F -->|"GET /api/stats/by-year<br/>GET /api/projects<br/>GET /api/members"| J
    D -->|"CRUD Operations<br/>POST/PUT/DELETE<br/>/api/projects<br/>/api/members"| I
    E -->|"CRUD Operations<br/>POST/PUT/DELETE<br/>/api/projects<br/>/api/members"| J

    %% Database Connections
    I -->|"SQL Queries"| L
    J -->|"SQL Queries"| M

    %% Data Seeding
    N -->|"Initialize Data"| L
    O -->|"Initialize Data"| M
    P -->|"Create Tables"| M

    %% Static Resources
    A --> Q
    A --> R

    %% Server Management
    K -->|"Start/Manage"| I
    K -->|"Start/Manage"| J

    %% Styling
    classDef frontend fill:#e3f2fd,stroke:#1976d2,stroke-width:2px
    classDef backend fill:#e8f5e8,stroke:#388e3c,stroke-width:2px
    classDef database fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    classDef seeding fill:#fce4ec,stroke:#c2185b,stroke-width:2px
    classDef external fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px

    class A,B,C,D,E,F,G,H frontend
    class I,J,K backend
    class L,M database
    class N,O,P seeding
    class Q,R external
```

## 🔧 Technology Stack

```mermaid
graph LR
    subgraph "Frontend Technologies"
        A1["HTML5"]
        A2["CSS3"]
        A3["Vanilla JavaScript"]
        A4["Font Awesome Icons"]
        A5["Google Fonts"]
    end

    subgraph "Backend Technologies"
        B1["Node.js"]
        B2["Express.js"]
        B3["SQLite3"]
        B4["CORS Middleware"]
        B5["Body Parser"]
    end

    subgraph "Development Tools"
        C1["npm Package Manager"]
        C2["JSON Configuration"]
        C3["Modular Architecture"]
    end

    A1 --> B1
    A2 --> B2
    A3 --> B3
    A4 --> B4
    A5 --> B5
    
    classDef frontend fill:#e3f2fd,stroke:#1976d2
    classDef backend fill:#e8f5e8,stroke:#388e3c
    classDef tools fill:#fff3e0,stroke:#f57c00
    
    class A1,A2,A3,A4,A5 frontend
    class B1,B2,B3,B4,B5 backend
    class C1,C2,C3 tools
```

## 📊 Data Flow Architecture

```mermaid
sequenceDiagram
    participant User as 👤 User
    participant Browser as 🌐 Browser
    participant AlumniJS as 📊 alumni.js
    participant TelkomAPI as 🖥️ Telkom API
    participant BinusAPI as 🖥️ Binus API
    participant TelkomDB as 💾 Telkom DB
    participant BinusDB as 💾 Binus DB

    User->>Browser: Opens index.html
    Browser->>AlumniJS: Load alumni manager
    AlumniJS->>TelkomAPI: GET /api/stats/by-year
    AlumniJS->>BinusAPI: GET /api/stats/by-year
    
    TelkomAPI->>TelkomDB: Query projects & members
    BinusAPI->>BinusDB: Query projects & members
    
    TelkomDB-->>TelkomAPI: Return data
    BinusDB-->>BinusAPI: Return data
    
    TelkomAPI-->>AlumniJS: Return year stats
    BinusAPI-->>AlumniJS: Return year stats
    
    AlumniJS->>Browser: Render year cards
    Browser-->>User: Display alumni cards
    
    User->>Browser: Clicks year 2025
    Browser->>Browser: Redirect to university.html
    
    User->>Browser: Clicks university logo
    Browser->>Browser: Redirect to telu.html/binus.html
    
    Browser->>TelkomAPI: CRUD operations
    TelkomAPI->>TelkomDB: Execute SQL
    TelkomDB-->>TelkomAPI: Return results
    TelkomAPI-->>Browser: Return response
    Browser-->>User: Update UI
```

## 🏗️ File Structure & Dependencies

```mermaid
graph TD
    subgraph "Project Root"
        ROOT["/home/restu/internship-dev/"]
    end
    
    subgraph "Frontend Files"
        F1["index.html"]
        F2["university.html"] 
        F3["telu.html"]
        F4["binus.html"]
        F5["styles.css"]
        F6["script.js"]
        F7["alumni.js"]
    end
    
    subgraph "Backend Files"
        B1["telkom-server.js"]
        B2["binus-server.js"]
        B3["start-servers.js"]
        B4["server.js"]
    end
    
    subgraph "Database Files"
        D1["telkom.db"]
        D2["binus.db"]
        D3["seed.js"]
        D4["binseed.js"]
        D5["create-binus-tables.js"]
    end
    
    subgraph "Assets"
        A1["procodelogo.png"]
        A2["logotelu.png"]
        A3["logobinus.png"]
        A4["fotoprofil.png"]
        A5["teluhero.jpg"]
        A6["binushero.jpg"]
    end
    
    subgraph "Config Files"
        C1["package.json"]
        C2["node_modules/"]
    end

    ROOT --> F1
    ROOT --> F2
    ROOT --> F3
    ROOT --> F4
    ROOT --> F5
    ROOT --> F6
    ROOT --> F7
    ROOT --> B1
    ROOT --> B2
    ROOT --> B3
    ROOT --> B4
    ROOT --> D1
    ROOT --> D2
    ROOT --> D3
    ROOT --> D4
    ROOT --> D5
    ROOT --> A1
    ROOT --> A2
    ROOT --> A3
    ROOT --> A4
    ROOT --> A5
    ROOT --> A6
    ROOT --> C1
    ROOT --> C2

    classDef frontend fill:#e3f2fd,stroke:#1976d2
    classDef backend fill:#e8f5e8,stroke:#388e3c
    classDef database fill:#fff3e0,stroke:#f57c00
    classDef assets fill:#fce4ec,stroke:#c2185b
    classDef config fill:#f3e5f5,stroke:#7b1fa2

    class F1,F2,F3,F4,F5,F6,F7 frontend
    class B1,B2,B3,B4 backend
    class D1,D2,D3,D4,D5 database
    class A1,A2,A3,A4,A5,A6 assets
    class C1,C2 config
```

## 🔌 API Architecture

```mermaid
graph TB
    subgraph "Telkom API Endpoints (Port 3000)"
        T1["GET /api/projects<br/>📋 Get all projects"]
        T2["POST /api/projects<br/>➕ Create project"]
        T3["PUT /api/projects/:id<br/>✏️ Update project"]
        T4["DELETE /api/projects/:id<br/>🗑️ Delete project"]
        T5["GET /api/members<br/>👥 Get all members"]
        T6["POST /api/members<br/>➕ Create member"]
        T7["PUT /api/members/:id<br/>✏️ Update member"]
        T8["DELETE /api/members/:id<br/>🗑️ Delete member"]
        T9["GET /api/stats/by-year<br/>📊 Get statistics"]
    end

    subgraph "Binus API Endpoints (Port 3002)"
        B1["GET /api/projects<br/>📋 Get all projects"]
        B2["POST /api/projects<br/>➕ Create project"]
        B3["PUT /api/projects/:id<br/>✏️ Update project"]
        B4["DELETE /api/projects/:id<br/>🗑️ Delete project"]
        B5["GET /api/members<br/>👥 Get all members"]
        B6["POST /api/members<br/>➕ Create member"]
        B7["PUT /api/members/:id<br/>✏️ Update member"]
        B8["DELETE /api/members/:id<br/>🗑️ Delete member"]
        B9["GET /api/stats/by-year<br/>📊 Get statistics"]
    end

    subgraph "Frontend Consumers"
        UI1["🏛️ telu.html"]
        UI2["🏢 binus.html"]
        UI3["📊 alumni.js"]
    end

    UI1 --> T1
    UI1 --> T2
    UI1 --> T3
    UI1 --> T4
    UI1 --> T5
    UI1 --> T6
    UI1 --> T7
    UI1 --> T8

    UI2 --> B1
    UI2 --> B2
    UI2 --> B3
    UI2 --> B4
    UI2 --> B5
    UI2 --> B6
    UI2 --> B7
    UI2 --> B8

    UI3 --> T9
    UI3 --> B9

    classDef telkom fill:#e8f5e8,stroke:#388e3c
    classDef binus fill:#fce4ec,stroke:#c2185b
    classDef frontend fill:#e3f2fd,stroke:#1976d2

    class T1,T2,T3,T4,T5,T6,T7,T8,T9 telkom
    class B1,B2,B3,B4,B5,B6,B7,B8,B9 binus
    class UI1,UI2,UI3 frontend
```

## 🗄️ Database Schema

```mermaid
erDiagram
    TELKOM_PROJECTS ||--o{ TELKOM_MEMBERS : "team relationship"
    BINUS_PROJECTS ||--o{ BINUS_MEMBERS : "team relationship"
    
    TELKOM_PROJECTS {
        integer id PK
        string team
        string title
        string category
        string link
        integer year
        datetime created_at
        datetime updated_at
    }
    
    TELKOM_MEMBERS {
        integer id PK
        string name
        string team FK
        string major
        string role
        datetime created_at
        datetime updated_at
    }
    
    BINUS_PROJECTS {
        integer id PK
        string team
        string title
        string category
        string link
        integer year
        datetime created_at
        datetime updated_at
    }
    
    BINUS_MEMBERS {
        integer id PK
        string name
        string team FK
        string major
        string role
        datetime created_at
        datetime updated_at
    }
```

## 🚀 Deployment Architecture

```mermaid
graph TB
    subgraph "Development Environment"
        DEV["💻 Local Development<br/>Linux Mint"]
        PORT1["🔌 localhost:3000<br/>Telkom Server"]
        PORT2["🔌 localhost:3002<br/>Binus Server"]
    end
    
    subgraph "File System"
        FS["/home/restu/internship-dev/<br/>📁 Project Directory"]
        DB1["💾 telkom.db"]
        DB2["💾 binus.db"]
        STATIC["📁 Static Assets<br/>(Images, CSS, JS)"]
    end
    
    subgraph "Process Management"
        PM["⚡ start-servers.js<br/>Process Orchestrator"]
        PROC1["🔄 telkom-server process"]
        PROC2["🔄 binus-server process"]
    end
    
    DEV --> FS
    FS --> DB1
    FS --> DB2
    FS --> STATIC
    PM --> PROC1
    PM --> PROC2
    PROC1 --> PORT1
    PROC2 --> PORT2
    
    classDef env fill:#e3f2fd,stroke:#1976d2
    classDef storage fill:#fff3e0,stroke:#f57c00
    classDef process fill:#e8f5e8,stroke:#388e3c
    
    class DEV,PORT1,PORT2 env
    class FS,DB1,DB2,STATIC storage
    class PM,PROC1,PROC2 process
```

## 📈 System Features & Capabilities

### **Core Features:**
- 🎯 **Multi-University Support**: Separate databases for Telkom & Binus
- 📊 **Dynamic Statistics**: Real-time data aggregation from multiple sources  
- 🔍 **Advanced Search**: Filter by category, team name, project title
- ⚡ **Real-time CRUD**: Instant database operations with UI feedback
- 📱 **Responsive Design**: Mobile-friendly interface
- 🎨 **Interactive UI**: Hover effects, animations, modal dialogs

### **Technical Highlights:**
- 🏗️ **Microservices Architecture**: Independent servers per university
- 🔄 **API-First Design**: RESTful endpoints with JSON responses
- 💾 **SQLite Integration**: Lightweight, file-based database
- 🚀 **Express.js Framework**: Fast, minimal web framework
- 🎨 **Modern CSS**: Flexbox, Grid, CSS3 animations
- ⚡ **Vanilla JavaScript**: No framework dependencies

### **Security & Performance:**
- 🛡️ **CORS Protection**: Cross-origin request security
- 🔒 **Input Validation**: Server-side data validation
- ⚡ **Optimized Queries**: Efficient database operations
- 📦 **Asset Optimization**: Compressed images and minified CSS

