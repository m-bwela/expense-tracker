# Deploying with Docker

This guide explains how to deploy the Expense Tracker application using Docker and Docker Compose.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed (version 20.10+)
- [Docker Compose](https://docs.docker.com/compose/install/) installed (version 2.0+)

## Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd expense-tracker
```

### 2. Set Environment Variables

Create a `.env` file in the root directory:

```env
# Database password
DB_PASSWORD=your_secure_password_here

# JWT Secret - generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET=your_jwt_secret_key_here
```

### 3. Build and Start

```bash
docker-compose up -d
```

This will:
- Pull the PostgreSQL image
- Build the backend Docker image
- Build the frontend Docker image
- Start all services

### 4. Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **PostgreSQL:** localhost:5432

### 5. View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f postgres
```

### 6. Stop the Application

```bash
docker-compose down
```

To also remove volumes (database data):
```bash
docker-compose down -v
```

## Production Deployment

### Option 1: On a VPS (DigitalOcean, AWS EC2, etc.)

1. **Set up your VPS:**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Docker
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   
   # Install Docker Compose
   sudo apt install docker-compose-plugin
   ```

2. **Clone your repository:**
   ```bash
   git clone <your-repo-url>
   cd expense-tracker
   ```

3. **Configure environment:**
   ```bash
   nano .env
   # Set production values
   ```

4. **Update docker-compose for production:**
   
   Edit the frontend build args to use your domain:
   ```yaml
   frontend:
     build:
       context: ./client side
       dockerfile: Dockerfile
       args:
         VITE_API_URL: https://api.yourdomain.com/api  # Update this
   ```

5. **Set up reverse proxy (Nginx):**
   
   Create `/etc/nginx/sites-available/expense-tracker`:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }

   server {
       listen 80;
       server_name api.yourdomain.com;

       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   Enable the site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/expense-tracker /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

6. **Set up SSL with Let's Encrypt:**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com -d api.yourdomain.com
   ```

7. **Start the application:**
   ```bash
   docker-compose up -d
   ```

### Option 2: Using Docker Swarm

1. **Initialize Swarm:**
   ```bash
   docker swarm init
   ```

2. **Deploy stack:**
   ```bash
   docker stack deploy -c docker-compose.yml expense-tracker
   ```

3. **Scale services:**
   ```bash
   docker service scale expense-tracker_backend=3
   ```

### Option 3: Using Kubernetes

Create Kubernetes manifests or use Helm charts (advanced).

## Database Management

### Backup Database

```bash
# Create backup
docker exec expense-tracker-db pg_dump -U postgres expense_tracker > backup.sql

# Restore backup
cat backup.sql | docker exec -i expense-tracker-db psql -U postgres -d expense_tracker
```

### Access PostgreSQL

```bash
docker exec -it expense-tracker-db psql -U postgres -d expense_tracker
```

## Updating the Application

### Method 1: Rebuild Everything

```bash
# Pull latest code
git pull

# Rebuild and restart
docker-compose down
docker-compose up -d --build
```

### Method 2: Update Specific Service

```bash
# Update backend only
docker-compose up -d --build backend

# Update frontend only
docker-compose up -d --build frontend
```

## Monitoring

### Health Checks

Check service health:
```bash
docker-compose ps
```

### Resource Usage

```bash
docker stats
```

### Container Logs

```bash
# Follow logs
docker-compose logs -f --tail=100

# Save logs to file
docker-compose logs --no-color > logs.txt
```

## Troubleshooting

### Port Already in Use

```bash
# Check what's using port 3000
sudo lsof -i :3000

# Kill the process
sudo kill -9 <PID>
```

### Database Connection Issues

```bash
# Check if database is running
docker-compose ps postgres

# Check database logs
docker-compose logs postgres

# Restart database
docker-compose restart postgres
```

### Frontend Can't Connect to Backend

1. Check if backend is running:
   ```bash
   docker-compose ps backend
   ```

2. Check backend logs:
   ```bash
   docker-compose logs backend
   ```

3. Verify API URL in frontend build args

### Out of Disk Space

```bash
# Clean up unused containers, images, and volumes
docker system prune -a --volumes

# Remove specific volumes
docker volume ls
docker volume rm <volume_name>
```

## Performance Optimization

### Reduce Image Size

1. Use multi-stage builds (already implemented)
2. Use Alpine-based images (already implemented)
3. Minimize layers in Dockerfile

### Optimize PostgreSQL

Add to docker-compose.yml under postgres service:
```yaml
command: postgres -c shared_buffers=256MB -c max_connections=200
```

### Enable Caching

The Nginx configuration already includes caching for static assets.

## Security Best Practices

1. **Use secrets management:**
   ```bash
   # Create Docker secrets
   echo "your_password" | docker secret create db_password -
   ```

2. **Run as non-root user:**
   Already implemented in Dockerfiles

3. **Keep images updated:**
   ```bash
   docker-compose pull
   docker-compose up -d
   ```

4. **Scan for vulnerabilities:**
   ```bash
   docker scan expense-tracker-api
   docker scan expense-tracker-frontend
   ```

## Docker Compose Commands Reference

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# Rebuild services
docker-compose up -d --build

# View logs
docker-compose logs -f

# Execute command in container
docker-compose exec backend sh
docker-compose exec postgres psql -U postgres

# Scale services
docker-compose up -d --scale backend=3

# Remove everything including volumes
docker-compose down -v
```

## Alternative: Kubernetes Deployment

For larger scale deployments, consider using Kubernetes. Here's a basic example:

### Create deployment.yaml

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: expense-tracker-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
      - name: backend
        image: your-registry/expense-tracker-backend:latest
        ports:
        - containerPort: 5000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: url
```

## Summary

Docker provides a consistent way to deploy your application across different environments. The provided docker-compose.yml file makes it easy to:

- Deploy locally for development
- Deploy to production on any Docker-compatible platform
- Scale services as needed
- Manage the entire stack with simple commands

For production use, always:
- Use strong passwords
- Enable SSL/TLS
- Set up proper monitoring
- Implement regular backups
- Keep images updated
