# Deploying to Vercel (Frontend) and Railway (Backend)

This guide shows you how to deploy the frontend to Vercel and the backend to Railway.

## Part 1: Deploy Backend to Railway

### Prerequisites
- A [Railway](https://railway.app) account
- Your code pushed to GitHub

### Step 1: Create New Project

1. Log in to Railway
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Select your expense-tracker repository
5. Railway will detect the services - cancel the automatic detection

### Step 2: Add PostgreSQL Database

1. In your project, click "New"
2. Select "Database" → "PostgreSQL"
3. The database will be created automatically
4. Note that Railway will set the `DATABASE_URL` environment variable automatically

### Step 3: Configure Backend Service

1. Click "New" → "GitHub Repo"
2. Select your repository
3. In the service settings:
   - **Name:** backend (or expense-tracker-api)
   - **Root Directory:** `server`
   - **Build Command:** `npm install` (auto-detected)
   - **Start Command:** `npm start` (auto-detected)

### Step 4: Add Environment Variables

1. Click on your backend service
2. Go to "Variables" tab
3. Add the following variables:
   ```
   DATABASE_URL = (automatically set if database is linked)
   JWT_SECRET = [Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"]
   NODE_ENV = production
   PORT = (automatically set by Railway)
   ```

### Step 5: Generate Domain

1. Go to "Settings" tab
2. Under "Domains", click "Generate Domain"
3. Note your backend URL (e.g., `https://expense-tracker-api-production.up.railway.app`)

## Part 2: Deploy Frontend to Vercel

### Prerequisites
- A [Vercel](https://vercel.com) account
- Vercel CLI (optional): `npm i -g vercel`

### Method 1: Using Vercel Dashboard

1. Log in to Vercel
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset:** Vite
   - **Root Directory:** `client side`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

5. Add Environment Variable:
   - Click "Environment Variables"
   - Add variable:
     ```
     Name: VITE_API_URL
     Value: https://your-railway-backend-url.railway.app/api
     ```
   - Select all environments (Production, Preview, Development)

6. Click "Deploy"
7. Wait for deployment to complete

### Method 2: Using Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Navigate to frontend directory:
   ```bash
   cd "client side"
   ```

3. Login to Vercel:
   ```bash
   vercel login
   ```

4. Deploy:
   ```bash
   vercel
   ```
   
   Answer the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? **expense-tracker** (or your preferred name)
   - In which directory is your code? **.**
   - Override settings? **Y**
   - Build Command? **npm run build**
   - Output Directory? **dist**
   - Development Command? **npm run dev**

5. Set environment variable:
   ```bash
   vercel env add VITE_API_URL
   ```
   Enter your Railway backend URL when prompted

6. Deploy to production:
   ```bash
   vercel --prod
   ```

## Step 3: Configure CORS

Update your backend's CORS configuration in `server/app.js`:

```javascript
app.use(cors({
  origin: [
    'https://your-vercel-app.vercel.app',
    'https://your-custom-domain.com'  // if you have one
  ],
  credentials: true
}));
```

Commit and push this change - Railway will auto-deploy.

## Custom Domains

### Add Custom Domain to Vercel

1. Go to your project settings in Vercel
2. Click "Domains"
3. Add your domain
4. Follow DNS configuration instructions

### Add Custom Domain to Railway

1. Go to your backend service settings
2. Under "Domains", click "Custom Domain"
3. Enter your domain (e.g., api.yourdomain.com)
4. Add the provided CNAME record to your DNS

## Monitoring and Logs

### Railway
- View logs in the Railway dashboard
- Click on your service → "Deployments" → Select deployment → "View Logs"
- Monitor metrics in the "Metrics" tab

### Vercel
- View deployment logs in the Vercel dashboard
- Go to your project → "Deployments" → Select deployment → "View Function Logs"
- Monitor analytics in the "Analytics" tab

## Automatic Deployments

Both platforms support automatic deployments:

### Railway
- Automatically deploys when you push to your connected branch
- Configure in Settings → "Triggers"

### Vercel
- Automatically deploys on every push to main branch
- Creates preview deployments for pull requests
- Configure in Settings → "Git"

## Environment-Specific Variables

### Development
Create a `.env.local` file in your frontend:
```env
VITE_API_URL=http://localhost:5000/api
```

### Production
Set in Vercel dashboard under Environment Variables

## Troubleshooting

### Frontend can't reach backend
- Check VITE_API_URL is correctly set in Vercel
- Verify CORS configuration in backend
- Ensure Railway backend is deployed and running

### Railway build fails
- Check build logs for errors
- Verify package.json is correct
- Ensure all dependencies are listed

### Vercel build fails
- Check build logs
- Verify Vite configuration
- Ensure build command is correct

### Database connection issues
- Verify DATABASE_URL is set in Railway
- Check database is running in Railway dashboard
- Review connection logs

## Cost

### Railway
- **Free Tier:** $5 worth of usage per month
- **Pro:** $20/month with $20 included usage
- PostgreSQL databases count toward usage

### Vercel
- **Hobby (Free):** Unlimited personal projects
- **Pro:** $20/month for commercial projects
- Static sites are generally very cheap to run

## Updates and Rollbacks

### Railway
- Auto-deploys on git push
- Rollback: Go to "Deployments" → Click on previous deployment → "Redeploy"

### Vercel
- Auto-deploys on git push
- Rollback: Go to "Deployments" → Previous deployment → "Promote to Production"
