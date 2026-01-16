# Portfolio Website - Project Complete

## Overview
Your fully functional portfolio website is now running with vintage/retro styling, GitHub integration, and dynamic content management.

## Access URLs
- **Frontend**: http://localhost:5174/
- **Admin Panel**: http://localhost:5174/admin
- **API Documentation**: http://localhost:8000/docs
- **Backend API**: http://localhost:8000/api

## Features Implemented

### 1. GitHub Integration
- Fetches all your public repositories
- Displays repository details (stars, forks, language, description)
- Shows README content in modals
- Real-time sync with GitHub API
- Custom descriptions override GitHub descriptions

### 2. Dynamic Settings System
All personal information is editable through the Admin Panel:
- Full Name: Mehdi EL AKARY
- Job Title: AI/Software Engineer
- Subtitle: Machine Learning Enthusiast | 1337 Coding School
- Email: mehdyakr@gmail.com
- Phone: +212 610-959642
- Location: Casablanca, Morocco
- GitHub & LinkedIn URLs
- Bio/About section

### 3. Project Management
- Select which repositories appear on your portfolio
- Reorder projects (display priority)
- Add custom descriptions
- Toggle visibility (public/private)
- Visual indicators for hidden projects

### 4. Vintage/Retro Design
- Warm sepia tones with dark mode support
- Monospace typography (IBM Plex Mono)
- Terminal-style aesthetics
- Retro borders and styling
- Smooth theme transitions
- Lucide React icons (no emojis)

### 5. Admin Panel Features
- **JWT Authentication** (password protected)
- **Projects Tab**: Manage repository visibility and order
- **Settings Tab**: Edit all personal information
- **Dashboard Stats**: View project counts
- **Responsive Design**: Works on all devices

### 6. Technical Stack

**Backend (FastAPI)**:
- Python 3.13
- SQLite database
- GitHub API v3 integration
- JWT authentication
- CORS enabled
- Auto-reloading in development

**Frontend (React + Vite)**:
- React 18
- Tailwind CSS for styling
- Lucide React for icons
- Axios for API calls
- React Router for navigation
- Dark/Light mode toggle

## Project Structure
```
portfolio/
├── backend/
│   ├── app/
│   │   ├── routes/         # API endpoints
│   │   ├── services/       # Business logic
│   │   ├── models/         # Data models
│   │   ├── database/       # DB configuration
│   │   └── main.py         # FastAPI app
│   ├── portfolio.db        # SQLite database
│   ├── requirements.txt    # Python dependencies
│   └── venv/               # Virtual environment
│
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── styles/         # CSS files
│   │   ├── utils/          # Utilities
│   │   └── App.jsx         # Main app
│   ├── public/             # Static assets
│   ├── package.json        # Node dependencies
│   └── node_modules/       # Dependencies
│
├── Makefile                # Build & run commands
├── .env                    # Environment variables
└── README.md               # Setup instructions
```

## Available Commands (Makefile)

```bash
make install        # Install all dependencies
make start          # Start both servers
make backend        # Start backend only
make frontend       # Start frontend only
make clean          # Clean temporary files
make help           # Show all commands
```

## Environment Variables (.env)
```
GITHUB_TOKEN=your_github_token_here
ADMIN_PASSWORD=admin123
SECRET_KEY=your-secret-key-here
```

## How to Use

### 1. Start the Portfolio
```bash
make start
```

### 2. View Your Portfolio
Open http://localhost:5174/ in your browser

### 3. Login to Admin Panel
1. Go to http://localhost:5174/admin
2. Enter password: `admin123`
3. Manage your projects and settings

### 4. Edit Personal Information
1. Login to admin panel
2. Click "Settings" tab
3. Edit any field
4. Click "Save Changes"
5. Refresh homepage to see updates

### 5. Manage Projects
1. Login to admin panel
2. Click "Projects" tab
3. Toggle visibility with eye icon
4. Reorder with up/down arrows
5. Add custom descriptions
6. Changes save automatically

## API Endpoints

### Public Endpoints
- `GET /api/projects` - Get all visible projects
- `GET /api/settings` - Get personal information
- `GET /api/github/repos` - Get all GitHub repos
- `POST /api/auth/login` - Login to admin panel

### Protected Endpoints (Require JWT)
- `POST /api/projects` - Add project to portfolio
- `DELETE /api/projects/{id}` - Remove project
- `PUT /api/projects/{id}/order` - Reorder projects
- `PUT /api/projects/{id}/visibility` - Toggle visibility
- `PUT /api/settings` - Update settings
- `POST /api/settings/batch` - Update multiple settings

## Database Schema

### Projects Table
- id (INTEGER PRIMARY KEY)
- repo_name (TEXT)
- repo_url (TEXT)
- custom_description (TEXT)
- display_order (INTEGER)
- is_visible (BOOLEAN)
- added_at (TIMESTAMP)

### Settings Table
- key (TEXT PRIMARY KEY)
- value (TEXT)
- updated_at (TIMESTAMP)

## Features in Detail

### Dark Mode
- Toggle button in header
- Persists across page reloads
- Smooth transitions
- Retro color palettes for both themes

### Responsive Design
- Mobile-first approach
- Breakpoints for tablets and desktops
- Hamburger menu on mobile
- Touch-friendly admin panel

### GitHub API Integration
- Caching to avoid rate limits
- Automatic refresh every 5 minutes
- Shows repository statistics
- Displays primary programming language

### Security
- JWT token authentication
- Password hashing with bcrypt
- CORS protection
- Secure HTTP headers

## Customization

### Change Admin Password
Edit `.env` file:
```
ADMIN_PASSWORD=your_new_password
```

### Add More Settings Fields
1. Add to database: `INSERT INTO settings (key, value) VALUES ('new_field', 'value')`
2. Add to Settings component in frontend
3. Restart backend

### Modify Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  'vintage-cream': '#f5e6d3',
  'vintage-ink': '#2d2d2d',
  // Add your colors
}
```

## Troubleshooting

### Port Already in Use
If port 8000 or 5173 is busy:
```bash
# Kill process on port 8000
lsof -ti:8000 | xargs kill -9

# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### Database Locked
```bash
# Stop all servers
make stop  # or Ctrl+C

# Restart
make start
```

### GitHub API Rate Limit
- Wait 1 hour for limit reset
- Or use authenticated requests (already configured)
- Check limit: `curl -H "Authorization: token YOUR_TOKEN" https://api.github.com/rate_limit`

## Next Steps

### Recommended Enhancements
1. **Deploy to Production**
   - Use Gunicorn for backend
   - Build frontend: `npm run build`
   - Deploy to Vercel/Netlify/Heroku

2. **Add Blog Section**
   - Create posts table
   - Add markdown support
   - Implement CRUD operations

3. **Contact Form**
   - Add email service integration
   - Form validation
   - Spam protection

4. **Analytics**
   - Google Analytics
   - Track visitor stats
   - Project view counts

5. **Performance**
   - Image optimization
   - Code splitting
   - Service worker/PWA

## Support & Documentation

- FastAPI Docs: https://fastapi.tiangolo.com/
- React Docs: https://react.dev/
- Tailwind CSS: https://tailwindcss.com/
- GitHub API: https://docs.github.com/en/rest

## Project Status

**Status**: ✅ COMPLETE & RUNNING

**Last Updated**: 2026-01-16

**Version**: 1.0.0

**Author**: Mehdi EL AKARY

---

Your portfolio is ready to showcase your work! Happy coding! 🚀
