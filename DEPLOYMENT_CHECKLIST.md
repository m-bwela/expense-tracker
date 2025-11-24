# Pre-Deployment Checklist

Use this checklist before deploying to production to ensure everything is configured correctly.

## ✅ Environment Setup

### Backend Environment Variables
- [ ] `PORT` is set (or use default 5000)
- [ ] Database credentials are configured:
  - [ ] `DB_DATABASE` or `DATABASE_URL`
  - [ ] `DB_USER` (if not using DATABASE_URL)
  - [ ] `DB_HOST` (if not using DATABASE_URL)
  - [ ] `DB_PASSWORD` (if not using DATABASE_URL)
  - [ ] `DB_PORT` (if not using DATABASE_URL)
- [ ] `JWT_SECRET` is set to a secure random string (not the example!)
- [ ] `NODE_ENV` is set to `production`
- [ ] `CORS_ORIGIN` is configured for your frontend domain

### Frontend Environment Variables
- [ ] `VITE_API_URL` points to your production backend API

## 🔒 Security

- [ ] Generated new JWT secret (not using example)
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
- [ ] Database password is strong and unique
- [ ] `.env` files are NOT committed to git
- [ ] CORS is restricted to your domain (not `*` in production)
- [ ] SSL/HTTPS is enabled on your platform
- [ ] Database SSL is enabled for production

## 💾 Database

- [ ] PostgreSQL database is created
- [ ] Database schema is applied (`database/schema.sql`)
- [ ] Database connection is tested
- [ ] Backup strategy is in place

## 🐳 Docker Setup (if using)

- [ ] `.env` file is created in project root
- [ ] Docker and Docker Compose are installed
- [ ] Port 3000, 5000, and 5432 are available
- [ ] `docker compose config` runs without errors

## ☁️ Cloud Platform Setup (if using)

### Render
- [ ] PostgreSQL database is created
- [ ] Backend web service is created
- [ ] Frontend static site is created
- [ ] Environment variables are set on all services
- [ ] Database schema is applied

### Vercel + Railway
- [ ] Railway PostgreSQL database is created
- [ ] Railway backend service is created
- [ ] Vercel project is created
- [ ] Environment variables are set
- [ ] Custom domains configured (if applicable)

## 🧪 Testing

- [ ] Application builds successfully
  - [ ] Backend: `cd server && npm install && npm start`
  - [ ] Frontend: `cd "client side" && npm install && npm run build`
- [ ] Database connection works
- [ ] User registration works
- [ ] User login works
- [ ] Expenses can be created
- [ ] Expenses can be read
- [ ] Expenses can be updated
- [ ] Expenses can be deleted

## 📊 Monitoring

- [ ] Logging is configured
- [ ] Error tracking is set up (optional but recommended)
- [ ] Uptime monitoring is configured (optional)
- [ ] Database monitoring is enabled

## 🚀 Deployment

- [ ] Code is committed and pushed to GitHub
- [ ] Deployment platform is triggered or manual deploy is initiated
- [ ] Deployment completes without errors
- [ ] Application is accessible via URL
- [ ] All functionality is tested in production

## 📝 Post-Deployment

- [ ] Test user registration and login
- [ ] Create and verify sample expense
- [ ] Check browser console for errors
- [ ] Verify API responses are correct
- [ ] Test on mobile devices
- [ ] Check application performance

## 🔧 Optional but Recommended

- [ ] Custom domain is configured
- [ ] Analytics are set up (Google Analytics, etc.)
- [ ] Rate limiting is configured
- [ ] Database connection pooling is optimized
- [ ] CDN is configured for static assets
- [ ] Regular backups are scheduled

## 🆘 Troubleshooting

If you encounter issues, check:

1. **Application logs** on your platform
2. **Database connection** - verify credentials and network access
3. **Environment variables** - ensure all required vars are set
4. **CORS configuration** - frontend domain must be allowed
5. **API URL** - frontend must point to correct backend URL

## 📚 Resources

- Main README: `README.md`
- Quick Start: `QUICKSTART.md`
- Docker Guide: `deployment-guides/DOCKER.md`
- Render Guide: `deployment-guides/RENDER.md`
- Vercel/Railway Guide: `deployment-guides/VERCEL-RAILWAY.md`
- Deployment Summary: `DEPLOYMENT_SUMMARY.md`

## ✨ Ready to Deploy?

Run the verification script:
```bash
./verify-deployment.sh
```

If all checks pass, you're ready to deploy! 🎉

Choose your deployment method from `QUICKSTART.md` and follow the guide.
