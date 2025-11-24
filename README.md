# Expense Tracker

A full-stack expense tracking application built with React, Node.js, Express, and PostgreSQL.

## Features

- User authentication (Register/Login)
- Track expenses by category
- Filter and search expenses
- Responsive Material-UI design

## Tech Stack

**Frontend:**
- React 19
- Vite
- Material-UI (MUI)
- Axios
- React Router

**Backend:**
- Node.js
- Express 5
- PostgreSQL
- JWT Authentication
- bcryptjs

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Local Development Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd expense-tracker
```

### 2. Database Setup

Create a PostgreSQL database:

```sql
CREATE DATABASE expense_tracker;
```

Run the database schema (you'll need to create the necessary tables for users and expenses).

### 3. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
PORT=5000
DB_DATABASE=expense_tracker
DB_USER=postgres
DB_HOST=localhost
DB_PASSWORD=your_password
DB_PORT=5432
JWT_SECRET=your_jwt_secret_here
```

Start the backend server:

```bash
# Development mode with hot reload
npm run dev

# Production mode
npm start
```

### 4. Frontend Setup

```bash
cd "client side"
npm install
```

Create a `.env` file in the `client side` directory (optional for local development):

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (Vite default port).

## Building for Production

### Frontend Build

```bash
cd "client side"
npm run build
```

This creates an optimized production build in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Deployment Options

### Option 1: Deploy with Docker

The easiest way to deploy this application is using Docker Compose.

1. Install [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)

2. Update the environment variables in `docker-compose.yml`

3. Run the application:

```bash
docker-compose up -d
```

The application will be available at `http://localhost:3000`

To stop the application:

```bash
docker-compose down
```

### Option 2: Deploy to Render

#### Deploy Backend to Render

1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repository
3. Configure the service:
   - **Build Command:** `cd server && npm install`
   - **Start Command:** `cd server && npm start`
   - **Environment:** Node
4. Add environment variables:
   - `PORT` (Render provides this automatically)
   - `DB_DATABASE`, `DB_USER`, `DB_HOST`, `DB_PASSWORD`, `DB_PORT`
   - `JWT_SECRET`
   - Or use `DATABASE_URL` if using Render's PostgreSQL
5. Create a PostgreSQL database on Render and link it to your service

#### Deploy Frontend to Render (Static Site)

1. Create a new Static Site on Render
2. Configure the service:
   - **Build Command:** `cd "client side" && npm install && npm run build`
   - **Publish Directory:** `client side/dist`
3. Add environment variable:
   - `VITE_API_URL`: Your backend API URL (e.g., `https://your-api.onrender.com/api`)

### Option 3: Deploy to Vercel (Frontend) + Railway (Backend)

#### Deploy Backend to Railway

1. Create a new project on [Railway](https://railway.app)
2. Add your GitHub repository
3. Add a PostgreSQL database
4. Configure environment variables
5. Deploy

#### Deploy Frontend to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to the frontend directory:
   ```bash
   cd "client side"
   ```
3. Deploy:
   ```bash
   vercel --prod
   ```
4. Add environment variable in Vercel dashboard:
   - `VITE_API_URL`: Your Railway backend URL

### Option 4: Deploy to DigitalOcean / AWS / Azure

1. Set up a virtual machine (VPS)
2. Install Node.js and PostgreSQL
3. Clone your repository
4. Set up environment variables
5. Use PM2 to manage the Node.js process:
   ```bash
   npm install -g pm2
   cd server
   pm2 start server.js --name expense-tracker-api
   pm2 save
   pm2 startup
   ```
6. Set up Nginx as a reverse proxy
7. Configure SSL with Let's Encrypt

## Environment Variables

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| DB_DATABASE | PostgreSQL database name | expense_tracker |
| DB_USER | PostgreSQL user | postgres |
| DB_HOST | PostgreSQL host | localhost |
| DB_PASSWORD | PostgreSQL password | your_password |
| DB_PORT | PostgreSQL port | 5432 |
| JWT_SECRET | Secret key for JWT tokens | Generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| DATABASE_URL | Full PostgreSQL connection string (alternative) | postgresql://user:pass@host:port/db |

### Frontend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| VITE_API_URL | Backend API URL | http://localhost:5000/api (dev) or https://api.example.com/api (prod) |

## Production Considerations

1. **Security:**
   - Never commit `.env` files to version control
   - Use strong JWT secrets in production
   - Enable CORS only for trusted domains
   - Use HTTPS in production
   - Implement rate limiting

2. **Database:**
   - Set up regular backups
   - Use connection pooling
   - Enable SSL for database connections in production

3. **Monitoring:**
   - Set up application logging
   - Monitor server resources
   - Track error rates
   - Use tools like PM2, Datadog, or New Relic

4. **Performance:**
   - Enable compression in Express
   - Use CDN for static assets
   - Implement caching strategies
   - Optimize database queries

## Development Commands

### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

### Frontend
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

ISC

## Support

For issues and questions, please open an issue in the GitHub repository.
