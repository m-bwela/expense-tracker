# Deploying to Render

This guide walks you through deploying the Expense Tracker application to Render.

## Prerequisites

- A [Render](https://render.com) account
- Your code pushed to GitHub

## Step 1: Create PostgreSQL Database

1. Log in to your Render dashboard
2. Click "New +" and select "PostgreSQL"
3. Configure the database:
   - **Name:** expense-tracker-db
   - **Database:** expense_tracker
   - **User:** (auto-generated)
   - **Region:** Choose closest to your users
   - **Plan:** Free (or paid for production)
4. Click "Create Database"
5. Wait for the database to be created
6. Note down the **Internal Database URL** from the database dashboard

## Step 2: Deploy Backend API

1. Click "New +" and select "Web Service"
2. Connect your GitHub repository
3. Configure the service:
   - **Name:** expense-tracker-api
   - **Region:** Same as your database
   - **Branch:** main (or your default branch)
   - **Root Directory:** `server`
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free (or paid for production)

4. Add Environment Variables (click "Advanced" then "Add Environment Variable"):
   ```
   DATABASE_URL = [Internal Database URL from Step 1]
   JWT_SECRET = [Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"]
   NODE_ENV = production
   ```

5. Click "Create Web Service"
6. Wait for the deployment to complete
7. Note down your backend URL (e.g., `https://expense-tracker-api.onrender.com`)

## Step 3: Deploy Frontend

1. Click "New +" and select "Static Site"
2. Connect your GitHub repository (if not already connected)
3. Configure the service:
   - **Name:** expense-tracker-frontend
   - **Branch:** main
   - **Root Directory:** `client side`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`

4. Add Environment Variable:
   ```
   VITE_API_URL = https://your-backend-url.onrender.com/api
   ```
   Replace with your actual backend URL from Step 2

5. Click "Create Static Site"
6. Wait for the deployment to complete

## Step 4: Set Up Database Schema

You'll need to create the necessary database tables. Connect to your PostgreSQL database and run your schema SQL:

1. From the database dashboard, click "Connect" and choose "External Connection"
2. Use a PostgreSQL client (like psql, DBeaver, or pgAdmin) to connect
3. Run your database schema SQL to create tables

Alternatively, you can add a database initialization script to your backend that runs on startup.

## Step 5: Configure CORS (if needed)

Update your backend's CORS configuration in `server/app.js` to only allow your frontend domain:

```javascript
app.use(cors({
  origin: 'https://your-frontend-url.onrender.com',
  credentials: true
}));
```

## Important Notes

### Free Tier Limitations

- **Web Services:** Spin down after 15 minutes of inactivity (cold starts can take 30+ seconds)
- **PostgreSQL:** Limited to 1GB storage, 97 hours of uptime per month
- **Static Sites:** Always active

### Custom Domains

To use a custom domain:
1. Go to your service settings
2. Click "Custom Domain"
3. Follow the instructions to add DNS records

### SSL/HTTPS

Render automatically provides SSL certificates for all deployments.

### Environment Variables Updates

When you update environment variables:
1. Changes trigger automatic redeployment
2. Your service will restart with new variables

### Monitoring

- View logs in the Render dashboard under "Logs"
- Set up notifications for deployment failures
- Monitor your database usage in the database dashboard

## Troubleshooting

### Backend won't start
- Check the logs for error messages
- Verify all environment variables are set correctly
- Ensure DATABASE_URL is correctly configured

### Frontend can't connect to backend
- Verify VITE_API_URL is set correctly
- Check CORS configuration in backend
- Ensure backend is running (check logs)

### Database connection issues
- Verify DATABASE_URL format is correct
- Check database is running in Render dashboard
- Ensure SSL is enabled in database configuration

## Updating Your Deployment

Render automatically deploys when you push to your connected branch:

1. Make changes locally
2. Commit and push to GitHub
3. Render automatically detects changes and redeploys

To manually redeploy:
1. Go to your service dashboard
2. Click "Manual Deploy"
3. Select "Deploy latest commit"

## Cost Optimization

For production use:
- Upgrade to paid plans to avoid cold starts
- Use the same region for all services to reduce latency
- Monitor your PostgreSQL storage usage
- Consider upgrading database for better performance
