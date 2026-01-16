#  Quick Setup Guide

This is a step-by-step guide to get your vintage portfolio running in 5 minutes!

##  Prerequisites Check

Before starting, make sure you have:
-  Python 3.8 or higher (`python --version`)
-  Node.js 18 or higher (`node --version`)
-  Git installed (`git --version`)

##  Step-by-Step Setup

### Step 1: Get Your GitHub Token (2 minutes)

1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Name it: `Portfolio API`
4. Check these boxes:
   -  `repo` (all sub-items)
   -  `read:user`
5. Click "Generate token" at bottom
6. **COPY THE TOKEN** (you won't see it again!)

### Step 2: Backend Setup (2 minutes)

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate it
# On Mac/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Setup environment
cp .env.example .env
```

Now edit `backend/.env`:
```env
GITHUB_TOKEN=paste_your_token_here
GITHUB_USERNAME=your_github_username
SECRET_KEY=any_long_random_string_here
ADMIN_PASSWORD=choose_a_password
```

### Step 3: Frontend Setup (1 minute)

```bash
# Open new terminal, go to frontend
cd frontend

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# (default settings work fine)
```

### Step 4: Launch! 

#### Option A: Easy Start (Recommended)

**On Mac/Linux:**
```bash
./start.sh
```

**On Windows:**
```bash
start.bat
```

#### Option B: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
python -m app.main
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Step 5: Access Your Portfolio

1. **Portfolio**: http://localhost:5173
2. **Admin Panel**: http://localhost:5173/login
3. **API Docs**: http://localhost:8000/docs

Login with the password you set in `.env`!

##  First Steps

1. **Login to Admin** (click Admin button or go to /login)
2. **Select Projects** - Choose repos to showcase
3. **Reorder** - Use  buttons to prioritize
4. **Customize** - Edit About.jsx and other components

##  Quick Customization

### Change Colors
Edit `frontend/tailwind.config.js` → colors → vintage

### Change Content
- `frontend/src/components/Hero.jsx` - Landing text
- `frontend/src/components/About.jsx` - Your bio
- `frontend/src/components/Contact.jsx` - Contact info
- `frontend/src/components/Footer.jsx` - Social links

### Change Fonts
Edit `frontend/index.html` - Update Google Fonts link
Edit `frontend/tailwind.config.js` - Update fontFamily

##  Common Issues

**"Module not found"**
- Backend: Activate venv and `pip install -r requirements.txt`
- Frontend: `npm install`

**"Failed to fetch"**
- Check backend is running on port 8000
- Check `VITE_API_URL` in frontend/.env

**"Authentication failed"**
- Check `GITHUB_TOKEN` is valid
- Generate a new token if needed

**"Port already in use"**
- Backend: Change PORT in backend/.env
- Frontend: Change port in vite.config.js

##  Next Steps

1. Read the full [README.md](README.md) for detailed docs
2. Customize the design to match your style
3. Deploy to production (Vercel/Netlify for frontend, Railway/Render for backend)
4. Add your own features!

##  You're Done!

Your vintage portfolio is now running! Make it yours by customizing the content and colors.

Need help? Check the main README.md or open an issue.

**Happy coding! **
