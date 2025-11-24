# Quick Start Guide

Get the Expense Tracker up and running in minutes!

## Choose Your Deployment Method

### 🐳 Option 1: Docker (Recommended for Quick Start)

**Prerequisites:** Docker and Docker Compose installed

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd expense-tracker

# 2. Create environment file
cat > .env << EOF
DB_PASSWORD=your_secure_password
JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
EOF

# 3. Start everything
docker-compose up -d

# 4. Set up the database
docker cp database/schema.sql expense-tracker-db:/tmp/schema.sql
docker exec -i expense-tracker-db psql -U postgres -d expense_tracker -f /tmp/schema.sql

# 5. Open your browser
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000
```

**To stop:**
```bash
docker-compose down
```

---

### 💻 Option 2: Local Development

**Prerequisites:** Node.js 18+, PostgreSQL 12+

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd expense-tracker

# 2. Set up PostgreSQL
createdb expense_tracker
psql expense_tracker < database/schema.sql

# 3. Set up Backend
cd server
cp .env.example .env
# Edit .env with your database credentials and JWT secret
npm install
npm run dev  # Starts on port 5000

# 4. Set up Frontend (in a new terminal)
cd "client side"
npm install
npm run dev  # Starts on port 5173
```

**Access the app:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

---

### ☁️ Option 3: Deploy to Cloud (Render)

**Prerequisites:** Render account, GitHub repository

1. **Deploy Database:**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - New → PostgreSQL
   - Name: `expense-tracker-db`
   - Create Database
   - Note the Internal Database URL

2. **Deploy Backend:**
   - New → Web Service
   - Connect your GitHub repo
   - Settings:
     - Root Directory: `server`
     - Build Command: `npm install`
     - Start Command: `npm start`
   - Environment Variables:
     ```
     DATABASE_URL = <from step 1>
     JWT_SECRET = <generate with crypto.randomBytes(32).toString('hex')>
     NODE_ENV = production
     ```
   - Create Web Service
   - Note your backend URL

3. **Deploy Frontend:**
   - New → Static Site
   - Connect your GitHub repo
   - Settings:
     - Root Directory: `client side`
     - Build Command: `npm install && npm run build`
     - Publish Directory: `dist`
   - Environment Variable:
     ```
     VITE_API_URL = https://your-backend-url.onrender.com/api
     ```
   - Create Static Site

4. **Initialize Database:**
   - Connect to your database using the external connection URL
   - Run: `psql <connection-url> -f database/schema.sql`

✅ Done! Your app is live on Render.

---

## Common Issues

### Docker: Port already in use
```bash
# Find and kill the process using the port
sudo lsof -i :3000
sudo kill -9 <PID>
```

### Database connection failed
- Check PostgreSQL is running: `pg_isready`
- Verify credentials in `.env`
- Ensure database exists: `psql -l | grep expense_tracker`

### Frontend can't reach backend
- Verify `VITE_API_URL` is set correctly
- Check CORS settings in `server/app.js`
- Ensure backend is running

### Build errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. **Create an account** in the app
2. **Add your first expense**
3. **Explore features:**
   - Filter by category
   - View expense history
   - Track spending patterns

## Development Commands

### Backend
```bash
cd server
npm run dev    # Development with hot reload
npm start      # Production mode
```

### Frontend
```bash
cd "client side"
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run linter
```

## Need Help?

- 📖 Check the [full README](README.md)
- 🐳 See [Docker deployment guide](deployment-guides/DOCKER.md)
- ☁️ See [Render deployment guide](deployment-guides/RENDER.md)
- 🚀 See [Vercel/Railway guide](deployment-guides/VERCEL-RAILWAY.md)

## Security Reminders

⚠️ **Before deploying to production:**
- Change default passwords
- Generate strong JWT secret
- Set proper CORS origins
- Use HTTPS
- Enable database SSL
- Set up regular backups
