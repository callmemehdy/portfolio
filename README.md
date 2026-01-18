# Portfolio Website

<div align="center">

![Python](https://img.shields.io/badge/Python-3.13-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115.0-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-3-003B57?style=for-the-badge&logo=sqlite&logoColor=white)

A modern, vintage-styled portfolio website with GitHub integration, dark/light mode, and admin dashboard for managing projects dynamically.

[Live Demo](#) | [Features](#features) | [Installation](#installation) | [Usage](#usage)

</div>

---

## Overview

This portfolio website is a full-stack application that seamlessly integrates with GitHub to showcase your selected repositories. Built with a retro/vintage aesthetic, it features a clean, nostalgic design with modern functionality including dark mode, project visibility controls, and a powerful admin dashboard.

### Key Highlights

- **GitHub Integration** - Automatically fetches and displays repository information
- **Admin Dashboard** - Manage projects, visibility, descriptions, and personal settings
- **Dark/Light Mode** - Toggle between themes with smooth transitions
- **Responsive Design** - Optimized for all screen sizes
- **Vintage Aesthetic** - Retro terminal-inspired design with modern UX
- **JWT Authentication** - Secure admin operations
- **RESTful API** - Clean backend architecture with FastAPI

---

## Features

### Frontend

- **React 18** with modern hooks and context API
- **Vite** for lightning-fast development and builds
- **TailwindCSS** with custom vintage/retro theme
- **Lucide Icons** for consistent iconography
- **Dark/Light Mode** with system preference detection
- **Responsive Design** with mobile-first approach
- **Smooth Animations** and transitions
- **Admin Panel** for content management

### Backend

- **FastAPI** framework for high-performance API
- **SQLite** database for data persistence
- **GitHub API v3** integration
- **JWT Authentication** for secure endpoints
- **CORS** middleware configured
- **Environment-based** configuration
- **Async/Await** patterns throughout

### Project Management

- **Select/Deselect** repositories from GitHub
- **Custom Descriptions** for each project
- **Visibility Toggle** (show/hide from public view)
- **Project Reordering** with drag-and-drop style controls
- **Automatic Sync** with GitHub repository data
- **README Preview** in modal popups

### Personal Settings

- **Editable Profile** information
- **Contact Details** management
- **Bio/Description** customization
- **Social Links** (GitHub, LinkedIn)
- **Real-time Updates** across the site

---

## Tech Stack

### Backend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| ![Python](https://img.shields.io/badge/Python-3.13-3776AB?logo=python&logoColor=white) | 3.13+ | Core language |
| ![FastAPI](https://img.shields.io/badge/FastAPI-0.115.0-009688?logo=fastapi&logoColor=white) | 0.115.0 | Web framework |
| ![SQLite](https://img.shields.io/badge/SQLite-3-003B57?logo=sqlite&logoColor=white) | 3.x | Database |
| ![Uvicorn](https://img.shields.io/badge/Uvicorn-0.32.0-499848?logo=gunicorn&logoColor=white) | 0.32.0 | ASGI server |
| ![HTTPX](https://img.shields.io/badge/HTTPX-0.28.1-000000?logo=python&logoColor=white) | 0.28.1 | HTTP client |
| Pydantic | 2.10.3 | Data validation |

### Frontend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| ![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=black) | 18.2.0 | UI framework |
| ![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF?logo=vite&logoColor=white) | 5.0.8 | Build tool |
| ![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.0-06B6D4?logo=tailwindcss&logoColor=white) | 3.4.0 | Styling |
| ![Lucide](https://img.shields.io/badge/Lucide-0.562.0-F56565?logo=lucide&logoColor=white) | 0.562.0 | Icons |
| Axios | 1.6.5 | HTTP client |
| React Router | 6.21.1 | Routing |

---

## Installation

### Prerequisites

- **Node.js** 18+ and npm/yarn
- **Python** 3.13+
- **Git**
- **GitHub Personal Access Token** ([Create one here](https://github.com/settings/tokens))

### Clone Repository

```bash
git clone https://github.com/mel-akar/portfolio.git
cd portfolio
```

### Backend Setup

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
source venv/bin/activate  # Linux/Mac
# or
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt
```

### Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install
```

### Environment Configuration

Create `.env` files in both backend and frontend directories:

**backend/.env**
```env
# GitHub Configuration
GITHUB_TOKEN=your_github_personal_access_token_here
GITHUB_USERNAME=your_github_username

# JWT Configuration
SECRET_KEY=your-super-secret-key-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=change-this-password
```

**frontend/.env**
```env
VITE_API_URL=http://localhost:8000
```

You can use `make setup` to automatically create these files from templates.

#### Creating GitHub Personal Access Token

1. Go to [GitHub Settings > Developer Settings > Personal Access Tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a descriptive name
4. Select scopes: `repo` (all), `user:read`
5. Generate token and copy it to `.env`

---

## Usage

### Using Makefile (Recommended)

```bash
# Install all dependencies
make install

# Setup environment files from templates
make setup

# Run both backend and frontend
make start

# Run backend only
make backend

# Run frontend only
make frontend

# Stop all servers
make stop

# Clean build artifacts
make clean

# Remove all dependencies
make clean-all

# Quick commit and push
make push

# View all commands
make help
```

### Manual Commands

#### Backend

```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at `http://localhost:8000`

#### Frontend

```bash
cd frontend
npm run dev
```

Frontend will be available at `http://localhost:5173`

### First Time Setup

1. Start both backend and frontend
2. Navigate to `http://localhost:5173`
3. Click the login button in header (visible only when not authenticated)
4. Login with credentials from `.env`:
   - Username: `admin`
   - Password: (what you set in `.env`)
5. Access admin dashboard to configure:
   - Select repositories to display
   - Add custom descriptions
   - Update personal settings
   - Toggle project visibility

---

## API Documentation

Once the backend is running, visit:

- **Interactive API Docs**: `http://localhost:8000/docs`
- **Alternative Docs**: `http://localhost:8000/redoc`

### Main Endpoints

#### Public Endpoints

```
GET  /api/projects              - Get all visible projects
GET  /api/github/repos          - List all GitHub repositories
GET  /api/github/repo/{owner}/{repo} - Get specific repository details
GET  /api/settings              - Get personal settings
```

#### Protected Endpoints (Require Authentication)

```
POST   /api/auth/login          - Login to admin
POST   /api/projects            - Add project to portfolio
DELETE /api/projects/{id}       - Remove project from portfolio
PATCH  /api/projects/{id}/visibility - Toggle project visibility
PATCH  /api/projects/{id}/description - Update project description
PATCH  /api/projects/{id}/order - Reorder projects
PUT    /api/settings            - Update personal settings
```

---

## Project Structure

```
portfolio/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                 # FastAPI application entry
│   │   ├── database.py             # Database configuration
│   │   ├── models.py               # SQLAlchemy models
│   │   └── routes/
│   │       ├── __init__.py
│   │       ├── auth.py             # Authentication endpoints
│   │       ├── projects.py         # Project management
│   │       ├── github.py           # GitHub API integration
│   │       └── settings.py         # Settings management
│   ├── .env                        # Backend environment variables
│   ├── .env.example                # Backend env template
│   ├── requirements.txt            # Python dependencies
│   ├── portfolio.db                # SQLite database
│   ├── migrate_add_visibility.py   # Database migration script
│   └── venv/                       # Virtual environment
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx          # Navigation header
│   │   │   ├── Footer.jsx          # Footer with quote
│   │   │   ├── Hero.jsx            # Landing section
│   │   │   ├── About.jsx           # About section
│   │   │   ├── Projects.jsx        # Project showcase
│   │   │   ├── ProjectCard.jsx     # Individual project card
│   │   │   ├── Contact.jsx         # Contact form
│   │   │   ├── ProjectManager.jsx  # Admin project management
│   │   │   ├── SettingsPanel.jsx   # Admin settings
│   │   │   ├── ThemeToggle.jsx     # Dark/light mode toggle
│   │   │   └── RepoModal.jsx       # Repository detail modal
│   │   ├── pages/
│   │   │   ├── Home.jsx            # Main page
│   │   │   ├── Admin.jsx           # Admin dashboard
│   │   │   └── Login.jsx           # Login page
│   │   ├── context/
│   │   │   └── ThemeContext.jsx    # Dark mode context
│   │   ├── services/               # API service layer
│   │   ├── utils/                  # Utility functions
│   │   ├── styles/
│   │   │   └── index.css           # Global styles
│   │   ├── assets/                 # Static assets
│   │   ├── App.jsx                 # Root component
│   │   └── main.jsx                # Entry point
│   ├── public/                     # Public static files
│   ├── .env                        # Frontend environment variables
│   ├── .env.example                # Frontend env template
│   ├── package.json                # Node dependencies
│   ├── tailwind.config.js          # Tailwind configuration
│   ├── postcss.config.js           # PostCSS configuration
│   ├── vite.config.js              # Vite configuration
│   └── vercel.json                 # Vercel deployment config
├── .gitignore                      # Git ignore rules
├── Makefile                        # Build automation
├── LICENSE                         # MIT License
└── README.md                       # This file
```

---

## Configuration

### Tailwind Custom Theme

The project uses a custom vintage/retro color palette:

```javascript
// Light Mode
vintage-paper: #F4ECD8
vintage-ink: #2C2416
vintage-accent: #8B4513
vintage-muted: #A0826D

// Dark Mode
dark-bg: #1a1a1a
dark-paper: #2a2a2a
dark-ink: #e8e6e3
dark-accent: #D2691E
dark-border: #404040
```

### Database Schema

**Projects Table**
```sql
- id: INTEGER PRIMARY KEY
- github_url: TEXT UNIQUE
- custom_description: TEXT
- display_order: INTEGER
- is_visible: BOOLEAN
- created_at: TIMESTAMP
```

**Settings Table**
```sql
- id: INTEGER PRIMARY KEY
- full_name: TEXT
- job_title: TEXT
- subtitle: TEXT
- email: TEXT
- phone: TEXT
- location: TEXT
- github_url: TEXT
- linkedin_url: TEXT
- bio: TEXT
- updated_at: TIMESTAMP
```

---

## Development

### Adding New Features

1. **Backend**: Add routes in `backend/app/routes/`
2. **Frontend**: Create components in `frontend/src/components/`
3. **Styling**: Use Tailwind classes with dark mode support
4. **State**: Use React Context for global state

### Code Style

- **Python**: Follow PEP 8
- **JavaScript**: Use ESLint recommended
- **React**: Functional components with hooks
- **CSS**: Tailwind utility-first approach

### Testing

```bash
# Backend tests (if implemented)
cd backend
pytest

# Frontend tests (if implemented)
cd frontend
npm test
```

---

## Deployment

### Backend Deployment

**Option 1: Traditional Server**
```bash
cd backend
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

**Option 2: Docker**
```dockerfile
FROM python:3.13-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Frontend Deployment

```bash
cd frontend
npm run build
# Deploy the 'dist' folder to your hosting service
```

**Recommended Platforms**:
- Vercel (Frontend)
- Railway (Backend)
- Render (Full Stack)
- DigitalOcean (VPS)

### Environment Variables for Production

Remember to update `.env` with production values:
- Generate strong `SECRET_KEY`
- Change `ADMIN_PASSWORD`
- Update CORS origins in `backend/app/main.py`

---

## Troubleshooting

### Common Issues

**Backend won't start**
```bash
# Check Python version
python --version  # Should be 3.13+

# Recreate virtual environment
rm -rf venv
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

**Frontend won't start**
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**GitHub API rate limit**
- Ensure `GITHUB_TOKEN` is set in `.env`
- Token increases rate limit from 60 to 5000 requests/hour

**Database errors**
```bash
# Delete and recreate database
rm backend/portfolio.db
# Restart backend - database will be recreated
```

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Author

**Mehdi EL AKARY**

- GitHub: [@callmemehdy](https://github.com/callmemehdy)
- LinkedIn: [elakarymehdi](https://linkedin.com/in/elakarymehdi)
- Email: mehdyakr@gmail.com

---

## Acknowledgments

- FastAPI for the excellent Python web framework
- React team for the powerful UI library
- TailwindCSS for the utility-first CSS framework
- GitHub for the comprehensive API
- Lucide for beautiful icons

---

<div align="center">

**"What I cannot create, I do not understand"** - Richard Feynman

Made with passion for clean code and elegant design

</div>
