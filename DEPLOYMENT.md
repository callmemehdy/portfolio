# Deployment Guide

## Deploy to Vercel (Recommended - Free Tier)

### Prerequisites
- GitHub account
- Vercel account (sign up at vercel.com with your GitHub account)

### Step 1: Prepare Your Repository

Your repository is already set up correctly with the frontend in `/frontend` directory.

### Step 2: Deploy Frontend to Vercel

1. Go to https://vercel.com/new
2. Import your GitHub repository: `mel-akar/portfolio`
3. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. Add Environment Variables in Vercel Dashboard:
   - `VITE_API_URL` = Your backend URL (see Step 3)

5. Click "Deploy"

### Step 3: Deploy Backend

For the backend, you have several free options:

#### Option A: Railway.app (Recommended for FastAPI)

1. Sign up at https://railway.app
2. Create new project → Deploy from GitHub repo
3. Select your `portfolio` repository
4. Configure:
   - **Root Directory**: `backend`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Add Environment Variables:
   - `GITHUB_TOKEN` = your GitHub personal access token
   - `SECRET_KEY` = your JWT secret key
   - `ADMIN_USERNAME` = admin
   - `ADMIN_PASSWORD` = your admin password
   - `CORS_ORIGINS` = https://your-vercel-app.vercel.app (add this after deploying frontend)
6. Railway will auto-detect Python and install dependencies
7. **After deployment completes**, copy your Railway app URL from the deployment dashboard
   - It will look like: `https://portfolio-production-xxxx.up.railway.app`
   - Or you can set a custom domain in Railway settings
8. Go back to Vercel → Settings → Environment Variables
9. Add/Update `VITE_API_URL` with your Railway URL **IMPORTANT: Must include https://**
   - Example: `https://energetic-happiness-production.up.railway.app`
   - NOT: `energetic-happiness-production.up.railway.app:8080`
10. Redeploy your Vercel frontend to apply the new environment variable
11. Go back to Railway → Variables → Update `CORS_ORIGINS` with your Vercel URL
    - Example: `https://portfolio-kappa-ten-86.vercel.app`

#### Option B: Render.com (Alternative)

1. Sign up at https://render.com
2. New → Web Service
3. Connect GitHub repository
4. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Add Environment Variables (same as Railway)
6. Free tier includes 750 hours/month

#### Option C: Fly.io (More Technical)

1. Install Fly CLI: `curl -L https://fly.io/install.sh | sh`
2. Login: `fly auth login`
3. Create `fly.toml` in backend directory:

```toml
app = "your-portfolio-api"
primary_region = "iad"

[build]
  builder = "paketobuildpacks/builder:base"

[env]
  PORT = "8000"

[[services]]
  http_checks = []
  internal_port = 8000
  processes = ["app"]
  protocol = "tcp"

  [[services.ports]]
    force_https = true
    handlers = ["http"]
    port = 80

  [[services.ports]]
    handlers = ["tls", "http"]
    port = 443
```

4. Deploy: `fly deploy`
5. Set secrets:
   ```bash
   fly secrets set GITHUB_TOKEN=your_token
   fly secrets set SECRET_KEY=your_secret
   fly secrets set ADMIN_USERNAME=admin
   fly secrets set ADMIN_PASSWORD=your_password
   ```

### Step 4: Update Frontend API URL

After deploying the backend:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add/Update:
   - `VITE_API_URL` = `https://your-backend-url.railway.app` (or render/fly URL)
3. Redeploy frontend: Deployments → Click "..." → Redeploy

### Step 5: Configure CORS

Make sure your backend `app/main.py` CORS settings include your Vercel domain:

```python
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://your-portfolio.vercel.app",  # Add your Vercel URL
    "https://*.vercel.app",  # Allow all Vercel preview deployments
]
```

Update and push changes, then redeploy.

### Step 6: Test Your Deployment

1. Visit your Vercel URL
2. Check if projects load from your backend
3. Test admin login
4. Verify GitHub integration works

### Environment Variables Summary

**Frontend (Vercel)**:
- `VITE_API_URL` - Your backend API URL

**Backend (Railway/Render/Fly)**:
- `GITHUB_TOKEN` - Your GitHub personal access token
- `SECRET_KEY` - JWT secret key (generate with: `openssl rand -hex 32`)
- `ADMIN_USERNAME` - Your admin username
- `ADMIN_PASSWORD` - Your admin password

### Database Note

The SQLite database will persist on Railway/Render as long as the service is running. For production, consider:
- Using Railway's PostgreSQL addon (free tier available)
- Render's PostgreSQL (free tier available)
- Supabase (free PostgreSQL hosting)

### Custom Domain (Optional)

Both Vercel and Railway support custom domains:

**Vercel**:
1. Go to Settings → Domains
2. Add your domain
3. Update DNS records as instructed

**Railway**:
1. Go to Settings → Domains
2. Add custom domain
3. Update DNS CNAME record

### Troubleshooting

**Frontend can't connect to backend**:
- Check `VITE_API_URL` environment variable
- Verify CORS settings in backend
- Check browser console for errors

**Backend not starting**:
- Check environment variables are set
- Verify Python version (3.10+)
- Check logs in Railway/Render dashboard

**GitHub API not working**:
- Verify `GITHUB_TOKEN` is valid
- Check token has correct permissions (repo, read:user)
- Check API rate limits

### Cost Breakdown

- **Vercel**: Free tier (100GB bandwidth, unlimited projects)
- **Railway**: $5 free credit/month (enough for small apps)
- **Render**: Free tier (750 hours/month)
- **Fly.io**: Free tier (3 shared VMs)

All options are completely free for a portfolio website with moderate traffic.

### Recommended Setup

For best performance and simplicity:
- **Frontend**: Vercel (instant deploys, global CDN)
- **Backend**: Railway (simple setup, good for Python)
- **Database**: SQLite (included) or upgrade to Railway PostgreSQL if needed

### Continuous Deployment

Both Vercel and Railway support automatic deployments:
- Push to `main` branch → Auto deploys to production
- Push to other branches → Preview deployments (Vercel only)

Your portfolio will automatically update when you push changes to GitHub!
