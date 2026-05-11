# Portfolio Website

<div align="center">

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![GitHub API](https://img.shields.io/badge/GitHub%20API-v3-000000?style=for-the-badge&logo=github&logoColor=white)

A modern, frontend-only portfolio website powered by GitHub API. Displays your public repositories with a beautiful vintage-inspired design.

[Features](#features) | [Installation](#installation) | [Usage](#usage) | [Configuration](#configuration)

</div>

---

## Overview

This is a **frontend-only** portfolio website that automatically fetches and displays your public GitHub repositories. Built with React and styled with Tailwind CSS, it features a retro/vintage aesthetic with modern functionality including dark mode support.

No backend required! All data comes directly from the GitHub API.

### Key Highlights

- **GitHub API Integration** - Automatically fetches your public repositories
- **Zero Backend** - Runs entirely in the browser
- **Dark/Light Mode** - Toggle between themes with smooth transitions
- **Responsive Design** - Optimized for all screen sizes
- **Vintage Aesthetic** - Retro terminal-inspired design with modern UX
- **README Preview** - View repository READMEs in a beautiful modal
- **Deploy Anywhere** - Static files, deploy to Vercel, Netlify, GitHub Pages, etc.

---

## Features

### Frontend Only

- **React 18** with modern hooks and context API
- **Vite** for lightning-fast development and builds
- **TailwindCSS** with custom vintage/retro theme
- **Lucide Icons** for consistent iconography
- **Dark/Light Mode** with system preference detection
- **Responsive Design** with mobile-first approach
- **Smooth Animations** and transitions
- **README Markdown Rendering** with react-markdown

### GitHub Integration

- **Public Repository Listing** - Automatically fetches from GitHub
- **Repository Metadata** - Stars, forks, language, topics
- **README Display** - View formatted README files in modals
- **User Profile Data** - Display name and bio from GitHub profile

### Project Management

- **Automatic Sync** - Always shows latest GitHub data
- **README Preview** - In-modal markdown rendering
- **Repository Links** - Direct links to GitHub repositories
- **Language Detection** - Color-coded language indicators
- **Topic Tags** - Display repository topics/tags

---

## Tech Stack

### Frontend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| ![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=black) | 18.2.0 | UI framework |
| ![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF?logo=vite&logoColor=white) | 5.0.8 | Build tool |
| ![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.0-06B6D4?logo=tailwindcss&logoColor=white) | 3.4.0 | Styling |
| ![React Router](https://img.shields.io/badge/React%20Router-6.21.1-CA4245?logo=react-router) | 6.21.1 | Routing |
| ![React Markdown](https://img.shields.io/badge/React%20Markdown-9.0.0-000000?logo=markdown) | 9.0.0 | Markdown rendering |
| ![Lucide](https://img.shields.io/badge/Lucide-0.562.0-F56565?logo=lucide&logoColor=white) | 0.562.0 | Icons |

---

## Installation

### Prerequisites

- **Node.js** 18+ and npm/yarn
- **Git**

### Clone Repository

```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

### Install Dependencies

```bash
make install
# or
cd frontend && npm install
```

### Environment Configuration

Create a `.env` file in the `frontend` directory:

```bash
cp frontend/.env.example frontend/.env
```

Edit `frontend/.env`:

```env
# GitHub Configuration
VITE_GITHUB_USERNAME=yourgithubusername
```

Replace `yourgithubusername` with your actual GitHub username.

---

## Usage

### Using Makefile (Recommended)

```bash
# Install dependencies
make install

# Setup environment file
make setup

# Start development server
make start

# Build for production
make build

# Preview production build
make preview

# Stop development server
make stop

# View all commands
make help
```

### Manual Commands

```bash
cd frontend

# Development
npm run dev          # Start dev server at http://localhost:5173

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Linting
npm run lint         # Run ESLint
```

Development server will be available at `http://localhost:5173`

---

## How It Works

1. **GitHub Username Configuration** - Set your username in `.env`
2. **Repository Fetching** - Frontend fetches public repos using GitHub API v3
3. **Dynamic Rendering** - Repositories automatically displayed and sorted by stars
4. **README Loading** - Click README button to fetch and display repo README
5. **No Authentication** - Uses public GitHub API (60 requests/hour without token, 5000 with)

### GitHub API Rate Limits

- **Without Authentication**: 60 requests per hour
- **With Personal Access Token**: 5000 requests per hour

For better limits, you can add a GitHub Personal Access Token:

1. Go to [GitHub Settings > Developer Settings > Personal Access Tokens](https://github.com/settings/tokens)
2. Create a new token with `public_repo` scope
3. No code changes needed - the app works with public data only

---

## Project Structure

```
portfolio/
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
│   │   │   ├── RepoModal.jsx       # Repository detail modal
│   │   │   └── ThemeToggle.jsx     # Dark/light mode toggle
│   │   ├── pages/
│   │   │   └── Home.jsx            # Main page
│   │   ├── context/
│   │   │   └── ThemeContext.jsx    # Dark mode context
│   │   ├── services/
│   │   │   └── github.js           # GitHub API service
│   │   ├── utils/
│   │   │   └── helpers.js          # Utility functions
│   │   ├── styles/
│   │   │   └── index.css           # Global styles
│   │   ├── App.jsx                 # Root component
│   │   └── main.jsx                # Entry point
│   ├── public/                     # Public static files
│   ├── .env.example                # Environment template
│   ├── package.json                # Dependencies
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

### GitHub API Service

The `github.js` service provides these methods:

```javascript
// Fetch user's public repositories
githubService.getRepos(username, { perPage: 100, sort: 'updated', type: 'owner' })

// Get repository details
githubService.getRepoDetail(owner, repo)

// Get repository README (markdown)
githubService.getRepoReadme(owner, repo)

// Get user profile information
githubService.getUser(username)

// Check GitHub API rate limit
githubService.getRateLimit()
```

---

## Deployment

### Vercel (Recommended)

```bash
# Build
npm run build

# Deploy the 'dist' folder to Vercel
```

Or connect your GitHub repo directly to Vercel - it will auto-deploy on push.

### Netlify

```bash
# Build
npm run build

# Deploy the 'dist' folder to Netlify
```

Or use Netlify's GitHub integration for automatic deployments.

### GitHub Pages

```bash
# Build
npm run build

# Push 'dist' folder to gh-pages branch
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci --only=production
COPY frontend/dist ./dist
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

### Environment Variables for Production

Update `.env` with your GitHub username:

```env
VITE_GITHUB_USERNAME=yourusername
```

---

## Troubleshooting

### Frontend won't start

```bash
# Clear node modules and reinstall
rm -rf frontend/node_modules package-lock.json
npm install
```

### Repositories not showing

1. Ensure `VITE_GITHUB_USERNAME` is set correctly in `.env`
2. Check that you have public repositories on GitHub
3. Verify GitHub API is accessible (not blocked by firewall/ISP)
4. Check browser console for API errors

### GitHub API rate limit reached

- Rate limits are per IP address
- Create a Personal Access Token for higher limits
- Wait for the rate limit to reset (hourly)

### README not displaying

- Not all repositories have README files
- README must be named `README.md` (case-sensitive on some systems)
- Check browser console for fetch errors

---

## Contributing

Contributions are welcome! Feel free to submit a Pull Request.

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

- React team for the powerful UI library
- GitHub API for comprehensive repository data
- TailwindCSS for the utility-first CSS framework
- Lucide for beautiful icons
- React Markdown for markdown rendering

---

<div align="center">

**"What I cannot create, I do not understand"** - Richard Feynman

Made with passion for clean code and elegant design

</div>

