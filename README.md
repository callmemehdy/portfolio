#  Vintage Portfolio - GitHub Integrated Portfolio Website

A fully functional, retro-styled portfolio website that showcases your GitHub repositories with a nostalgic vintage/retro aesthetic. Built with FastAPI backend, React frontend, and SQLite database.

![Vintage Computing Aesthetics](https://img.shields.io/badge/Style-Vintage%20%26%20Retro-brown?style=for-the-badge)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

##  Features

###  Vintage/Retro Design
- **Nostalgic Aesthetic**: Warm sepia tones, muted pastels, and terminal-green themes
- **Retro Typography**: Monospace fonts (Courier, VT323, Special Elite)
- **Vintage Elements**: Punch card styling, typewriter effects, terminal themes
- **Paper Texture**: Subtle grain overlay for authentic vintage feel
- **Simple Animations**: Minimal, tasteful transitions and fades

###  Backend (FastAPI)
- **RESTful API** with comprehensive endpoints
- **GitHub API Integration** - Fetch repositories, README, commits, and stats
- **SQLite Database** - Store selected projects and custom descriptions
- **JWT Authentication** - Secure admin operations
- **Caching System** - Reduce GitHub API rate limit issues
- **CORS Support** - Configured for frontend integration

###  Frontend (React + Vite)
- **Modern React** with hooks and functional components
- **Tailwind CSS** with custom vintage color scheme
- **Responsive Design** - Works on all devices
- **Admin Panel** - Terminal-style interface for managing projects
- **Project Showcase** - Display selected repositories with detailed info
- **README Viewer** - Modal with formatted markdown display
- **Contact Form** - Vintage-styled contact section

###  Security
- JWT token-based authentication
- Password-protected admin routes
- Environment variable configuration
- Secure credential storage

##  Project Structure

```
portfolio/
 backend/
    app/
       database/
          __init__.py
          database.py          # SQLAlchemy configuration
       models/
          __init__.py
          project.py           # Database models
          schemas.py           # Pydantic schemas
       routes/
          __init__.py
          auth.py              # Authentication endpoints
          github.py            # GitHub API endpoints
          projects.py          # Project management endpoints
       services/
          __init__.py
          auth_service.py      # JWT & authentication logic
          github_service.py    # GitHub API interactions
       __init__.py
       config.py                # Configuration management
       main.py                  # FastAPI application
    .env.example
    requirements.txt

 frontend/
     src/
        components/
           About.jsx            # About section
           Contact.jsx          # Contact form
           Footer.jsx           # Footer component
           Header.jsx           # Navigation header
           Hero.jsx             # Hero section with typewriter effect
           ProjectCard.jsx      # Project display card
           Projects.jsx         # Projects showcase section
           RepoModal.jsx        # README viewer modal
        pages/
           Admin.jsx            # Admin panel (terminal theme)
           Home.jsx             # Main portfolio page
           Login.jsx            # Admin login page
        services/
           api.js               # API service & axios setup
        styles/
           index.css            # Custom Tailwind styles
        utils/
           helpers.js           # Utility functions
        App.jsx                  # Main app component
        main.jsx                 # React entry point
     index.html
     .env.example
     package.json
     postcss.config.js
     tailwind.config.js
     vite.config.js
```

##  Quick Start

### Prerequisites
- Python 3.8+
- Node.js 18+
- GitHub Personal Access Token
- Git

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd portfolio
```

### 2. Backend Setup

#### Create Virtual Environment
```bash
cd backend
python -m venv venv

# On Linux/Mac:
source venv/bin/activate

# On Windows:
venv\Scripts\activate
```

#### Install Dependencies
```bash
pip install -r requirements.txt
```

#### Configure Environment Variables
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
# GitHub Configuration
GITHUB_TOKEN=ghp_your_github_personal_access_token
GITHUB_USERNAME=your_github_username

# Security (generate with: openssl rand -hex 32)
SECRET_KEY=your_secret_key_here_at_least_32_characters_long
ADMIN_PASSWORD=your_secure_admin_password

# Database
DATABASE_URL=sqlite:///./portfolio.db

# CORS Origins
CORS_ORIGINS=http://localhost:3000,http://localhost:5173

# Server
HOST=0.0.0.0
PORT=8000
```

#### Create GitHub Personal Access Token

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a descriptive name (e.g., "Portfolio API")
4. Select scopes:
   -  `repo` (Full control of private repositories)
   -  `read:user` (Read user profile data)
5. Click "Generate token"
6. Copy the token and paste it in your `.env` file

#### Generate Secret Key
```bash
# On Linux/Mac:
openssl rand -hex 32

# On Windows (PowerShell):
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})
```

#### Run the Backend
```bash
python -m app.main
# or
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at: `http://localhost:8000`
API Documentation: `http://localhost:8000/docs`

### 3. Frontend Setup

#### Install Dependencies
```bash
cd frontend
npm install
```

#### Configure Environment Variables
```bash
cp .env.example .env
```

Edit `.env`:
```env
VITE_API_URL=http://localhost:8000
```

#### Run the Frontend
```bash
npm run dev
```

Frontend will be available at: `http://localhost:5173`

##  Usage Guide

### Accessing the Portfolio
1. Open `http://localhost:5173` in your browser
2. Browse the portfolio sections:
   - **Hero**: Typewriter effect introduction
   - **About**: Skills and background
   - **Projects**: Selected GitHub repositories
   - **Contact**: Contact form

### Managing Projects (Admin)

#### Login to Admin Panel
1. Click the "Admin" button in the header
2. Enter your admin password (from `.env`)
3. You'll be redirected to the terminal-style admin panel

#### Add Projects
1. Browse "All Repositories" list on the right
2. Click `[ADD TO PORTFOLIO]` on any repository
3. The project will appear in "Selected Projects"

#### Remove Projects
1. Find the project in "Selected Projects"
2. Click `REMOVE` button
3. Project will be removed from portfolio

#### Reorder Projects
1. Use  and  buttons to adjust display priority
2. Higher priority projects appear first
3. Changes are saved automatically

### API Endpoints

#### Public Endpoints
- `GET /` - API information
- `GET /health` - Health check
- `GET /api/projects` - Get all selected projects
- `GET /api/github/repos` - Get all GitHub repositories
- `GET /api/github/repo/{owner}/{repo}` - Get repo details

#### Protected Endpoints (Require JWT Token)
- `POST /api/auth/login` - Authenticate and get token
- `POST /api/projects` - Add project to portfolio
- `PUT /api/projects/{id}` - Update project
- `DELETE /api/projects/{id}` - Remove project

##  Customization

### Color Scheme
Edit `frontend/tailwind.config.js`:
```javascript
colors: {
  vintage: {
    cream: '#F4F1DE',      // Background
    tan: '#E8DABE',        // Secondary background
    brown: '#8B7355',      // Text muted
    darkBrown: '#5C4742',  // Text dark
    ink: '#2C2416',        // Primary text
    accent: '#C77B58',     // Accent color
    mint: '#A3B899',       // Success color
    terminal: '#33FF33',   // Terminal green
    terminalBg: '#0C0C0C', // Terminal background
  }
}
```

### Fonts
Edit `frontend/index.html` to add/change Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font&display=swap" rel="stylesheet">
```

Update `frontend/tailwind.config.js`:
```javascript
fontFamily: {
  mono: ['Your Font', 'monospace'],
}
```

### Content
Edit the following components:
- `Hero.jsx` - Update welcome text
- `About.jsx` - Update bio, skills, and background
- `Contact.jsx` - Update contact information
- `Footer.jsx` - Update social links

##  Development

### Backend Development
```bash
cd backend
# Run with auto-reload
uvicorn app.main:app --reload

# Run tests (if you add them)
pytest

# Check code style
black app/
flake8 app/
```

### Frontend Development
```bash
cd frontend
# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

##  Deployment

### Backend Deployment

#### Using Uvicorn (Production)
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

#### Using Docker
Create `backend/Dockerfile`:
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY app/ ./app/
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

Build and run:
```bash
docker build -t portfolio-backend .
docker run -p 8000:8000 --env-file .env portfolio-backend
```

### Frontend Deployment

#### Build Production Bundle
```bash
npm run build
# Output will be in dist/ directory
```

#### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

#### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

#### Deploy to Static Hosting
Upload the contents of `dist/` to any static hosting service:
- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront
- Nginx

##  Troubleshooting

### Backend Issues

**Error: "Could not validate credentials"**
- Check if `GITHUB_TOKEN` is valid
- Ensure token has correct scopes
- Generate a new token if expired

**Error: "Module not found"**
- Ensure virtual environment is activated
- Run `pip install -r requirements.txt` again

**Database errors**
- Delete `portfolio.db` and restart the server
- Check SQLite is installed

### Frontend Issues

**Error: "Failed to fetch"**
- Check if backend is running on port 8000
- Verify `VITE_API_URL` in `.env`
- Check CORS settings in backend

**Build errors**
- Delete `node_modules/` and run `npm install`
- Clear cache: `npm cache clean --force`

**Styling issues**
- Run `npm run build` to regenerate Tailwind CSS
- Check browser console for errors

##  License

This project is open source and available under the [MIT License](LICENSE).

##  Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

##  Support

If you have any questions or need help, please open an issue or contact me at your-email@example.com

##  Acknowledgments

- FastAPI for the amazing Python web framework
- React team for the frontend library
- Tailwind CSS for the styling framework
- GitHub API for repository data
- Retro computing aesthetics for inspiration

---

**Built with  and nostalgia for vintage computing**



[GitHub] • [Portfolio] • [LinkedIn]
