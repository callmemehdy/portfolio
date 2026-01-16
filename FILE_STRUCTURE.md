#  Complete File Structure

```
portfolio/

  README.md                      # Main documentation (11KB+)
  QUICKSTART.md                  # 5-minute setup guide
  PROJECT_COMPLETE.md            # Completion summary
  FILE_STRUCTURE.md              # This file
  LICENSE                        # MIT License
  .gitignore                     # Git ignore rules
  start.sh                       # Unix/Linux start script
  start.bat                      # Windows start script

  backend/                       # FastAPI Backend
     requirements.txt           # Python dependencies
     .env.example               # Environment template
     .gitignore                 # Backend ignore rules
   
    app/
         __init__.py
         main.py                # FastAPI application entry
         config.py              # Configuration management
       
        database/
            __init__.py
            database.py        # SQLAlchemy setup
       
        models/
            __init__.py
            project.py         # Database models
            schemas.py         # Pydantic schemas
       
        routes/
            __init__.py
            auth.py            # Authentication endpoints
            projects.py        # Project CRUD endpoints
            github.py          # GitHub API endpoints
       
        services/
             __init__.py
             auth_service.py    # JWT & auth logic
             github_service.py  # GitHub API client

   frontend/                     # React Frontend
      package.json               # Node dependencies
      .env.example               # Environment template
      .gitignore                 # Frontend ignore rules
      index.html                 # HTML entry point
      vite.config.js             # Vite configuration
      tailwind.config.js         # Tailwind CSS config
      postcss.config.js          # PostCSS config
    
     src/
          main.jsx               # React entry point
          App.jsx                # Main app component
        
         components/
             Header.jsx         # Navigation header
             Footer.jsx         # Footer component
             Hero.jsx           # Hero with typewriter
             About.jsx          # About section
             Projects.jsx       # Projects showcase
             ProjectCard.jsx    # Individual project card
             RepoModal.jsx      # README viewer modal
             Contact.jsx        # Contact form
        
         pages/
             Home.jsx           # Main portfolio page
             Login.jsx          # Admin login page
             Admin.jsx          # Admin panel (terminal)
        
         services/
             api.js             # API client & auth
        
         utils/
             helpers.js         # Utility functions
        
         styles/
              index.css          # Custom Tailwind styles
```

##  Statistics

### Backend (Python/FastAPI)
- **Files**: 11 Python files
- **Lines**: ~1,200 lines of code
- **Components**:
  - 1 main application
  - 1 configuration module
  - 1 database module
  - 3 model/schema files
  - 3 route modules
  - 2 service modules

### Frontend (React/Vite)
- **Files**: 21 JavaScript/JSX files
- **Lines**: ~1,800 lines of code
- **Components**:
  - 8 reusable components
  - 3 page components
  - 1 API service
  - 1 utility module
  - 1 main app file

### Configuration & Docs
- **Config Files**: 8 files
- **Documentation**: 4 markdown files
- **Scripts**: 2 start scripts
- **Templates**: 2 .env.example files

### Total Project
- **Total Files**: 44+ files
- **Total Lines**: ~3,000+ lines
- **Languages**: Python, JavaScript, JSX, CSS, JSON, Markdown
- **Size**: ~150KB (excluding dependencies)

##  File Descriptions

### Root Level
- `README.md` - Complete documentation with setup, usage, and deployment
- `QUICKSTART.md` - Quick 5-minute setup guide
- `PROJECT_COMPLETE.md` - Project completion summary
- `FILE_STRUCTURE.md` - This file, showing project structure
- `LICENSE` - MIT License
- `.gitignore` - Git ignore rules
- `start.sh` - Bash script to start both servers (Unix/Linux/Mac)
- `start.bat` - Batch script to start both servers (Windows)

### Backend Files

#### Core
- `main.py` - FastAPI app initialization, CORS, routes
- `config.py` - Environment variable management with pydantic-settings

#### Database
- `database/database.py` - SQLAlchemy engine, session, base model

#### Models
- `models/project.py` - Project database model
- `models/schemas.py` - Pydantic request/response schemas

#### Routes (API Endpoints)
- `routes/auth.py` - POST /api/auth/login
- `routes/projects.py` - GET/POST/PUT/DELETE /api/projects
- `routes/github.py` - GET /api/github/repos, GET /api/github/repo/{owner}/{repo}

#### Services
- `services/auth_service.py` - JWT token creation/verification
- `services/github_service.py` - GitHub API client with caching

### Frontend Files

#### Core
- `main.jsx` - React app mounting
- `App.jsx` - Router setup, authentication state

#### Pages
- `pages/Home.jsx` - Main portfolio page (combines all sections)
- `pages/Login.jsx` - Admin login with terminal theme
- `pages/Admin.jsx` - Admin panel for managing projects

#### Components
- `components/Header.jsx` - Navigation bar with admin button
- `components/Footer.jsx` - Footer with social links
- `components/Hero.jsx` - Hero section with typewriter effect
- `components/About.jsx` - About section with skills
- `components/Projects.jsx` - Projects section (fetches and displays)
- `components/ProjectCard.jsx` - Individual project card (punch card style)
- `components/RepoModal.jsx` - Modal for README viewing
- `components/Contact.jsx` - Contact form (vintage style)

#### Services & Utils
- `services/api.js` - Axios setup, API calls, auth helpers
- `utils/helpers.js` - Language colors, date formatting, text truncation

#### Styles
- `styles/index.css` - Tailwind imports + custom vintage styles

#### Config
- `vite.config.js` - Vite dev server configuration
- `tailwind.config.js` - Custom vintage color palette & fonts
- `postcss.config.js` - PostCSS with Tailwind plugin
- `package.json` - Dependencies and scripts
- `index.html` - HTML template with Google Fonts

##  Key Design Files

### Colors & Theme
- `frontend/tailwind.config.js` - Vintage color palette definition

### Typography
- `frontend/index.html` - Google Fonts (Courier Prime, Special Elite, VT323)
- `frontend/tailwind.config.js` - Font family configuration

### Custom Styles
- `frontend/src/styles/index.css` - Vintage cards, buttons, animations

##  Configuration Files

### Environment
- `backend/.env.example` - Backend environment template
- `frontend/.env.example` - Frontend environment template

### Build Tools
- `frontend/vite.config.js` - Vite bundler configuration
- `frontend/tailwind.config.js` - Tailwind CSS configuration
- `frontend/postcss.config.js` - PostCSS configuration

### Dependencies
- `backend/requirements.txt` - Python packages
- `frontend/package.json` - Node packages

##  Documentation Files

1. **README.md** (11KB)
   - Complete project documentation
   - Setup instructions
   - Usage guide
   - API reference
   - Deployment guide
   - Troubleshooting

2. **QUICKSTART.md** (3.5KB)
   - 5-minute setup guide
   - Step-by-step instructions
   - Common issues
   - Quick customization tips

3. **PROJECT_COMPLETE.md** (6KB)
   - Project completion summary
   - Features list
   - Statistics
   - Next steps
   - Customization guide

4. **FILE_STRUCTURE.md** (This file)
   - Complete file tree
   - File descriptions
   - Statistics
   - Organization guide

##  Entry Points

### Development
- **Backend**: `python -m app.main` or `uvicorn app.main:app --reload`
- **Frontend**: `npm run dev`

### Production
- **Backend**: `uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4`
- **Frontend**: `npm run build` → serve `dist/` folder

### Easy Start
- **Unix/Linux/Mac**: `./start.sh`
- **Windows**: `start.bat`

##  Dependencies

### Backend (Python)
- fastapi - Web framework
- uvicorn - ASGI server
- sqlalchemy - ORM
- python-dotenv - Environment variables
- httpx - HTTP client for GitHub API
- python-jose - JWT tokens
- passlib - Password hashing
- markdown - README rendering
- pydantic & pydantic-settings - Validation

### Frontend (Node.js)
- react & react-dom - UI library
- react-router-dom - Routing
- axios - HTTP client
- vite - Build tool
- tailwindcss - CSS framework
- autoprefixer & postcss - CSS processing

##  Key Features by File

### Authentication Flow
1. `Login.jsx` - User enters password
2. `api.js` - Sends to `/api/auth/login`
3. `auth.py` - Validates password
4. `auth_service.py` - Creates JWT token
5. `api.js` - Stores token in localStorage
6. `App.jsx` - Protects admin routes

### Project Management Flow
1. `Admin.jsx` - User selects repo
2. `api.js` - POST to `/api/projects`
3. `projects.py` - Validates and saves
4. `project.py` - Database model
5. `Projects.jsx` - Fetches and displays

### GitHub Integration Flow
1. `Projects.jsx` - Fetches selected projects
2. `api.js` - GET from `/api/github/repos`
3. `github.py` - Route handler
4. `github_service.py` - Calls GitHub API
5. Cache - Stores for 10 minutes
6. `ProjectCard.jsx` - Displays repo data

