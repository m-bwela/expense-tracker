# Database Setup

This directory contains the database schema for the Expense Tracker application.

## Schema

The application uses two main tables:

1. **users** - Stores user account information
2. **expenses** - Stores expense records linked to users

## Setup Instructions

### Option 1: Using psql Command Line

```bash
# Connect to your PostgreSQL instance
psql -U postgres -d expense_tracker

# Run the schema file
\i database/schema.sql

# Or run it directly
psql -U postgres -d expense_tracker -f database/schema.sql
```

### Option 2: Using a PostgreSQL Client

1. Connect to your PostgreSQL database using a client like:
   - pgAdmin
   - DBeaver
   - TablePlus
   - Azure Data Studio

2. Open and execute the `schema.sql` file

### Option 3: Using Docker

If you're using the provided docker-compose setup:

```bash
# Start the services
docker-compose up -d

# Copy schema to container
docker cp database/schema.sql expense-tracker-db:/tmp/schema.sql

# Execute schema
docker exec -i expense-tracker-db psql -U postgres -d expense_tracker -f /tmp/schema.sql
```

### Option 4: Automated Setup (Development)

For development, you can run the schema automatically when the server starts:

Create a file `server/init-db.js`:

```javascript
const pool = require('./config/db');
const fs = require('fs');
const path = require('path');

async function initDatabase() {
  try {
    const schema = fs.readFileSync(
      path.join(__dirname, '../database/schema.sql'),
      'utf8'
    );
    await pool.query(schema);
    console.log('✅ Database schema initialized');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
  }
}

module.exports = initDatabase;
```

Then call it in your `server.js` before starting the server.

## Cloud Platforms

### Render

1. Go to your PostgreSQL database dashboard
2. Click "Connect"
3. Choose "External Connection"
4. Use the provided connection details with psql:
   ```bash
   PGPASSWORD=your_password psql -h hostname -U username database_name -f database/schema.sql
   ```

### Railway

1. Click on your PostgreSQL service
2. Go to "Data" tab
3. Click "Query"
4. Paste the contents of schema.sql and execute

### Vercel/Supabase

If using Supabase as your PostgreSQL provider:
1. Go to the SQL Editor in Supabase dashboard
2. Paste the schema.sql contents
3. Run the query

## Migrations

For production applications, consider using a migration tool like:
- [node-pg-migrate](https://github.com/salsita/node-pg-migrate)
- [Knex.js](http://knexjs.org/)
- [Sequelize](https://sequelize.org/)
- [Prisma](https://www.prisma.io/)

## Backup

To backup your database:

```bash
# Local
pg_dump -U postgres expense_tracker > backup.sql

# Docker
docker exec expense-tracker-db pg_dump -U postgres expense_tracker > backup.sql

# Restore
psql -U postgres expense_tracker < backup.sql
```

## Notes

- The schema uses `IF NOT EXISTS` clauses, so it's safe to run multiple times
- Indexes are created for common query patterns
- The `updated_at` field is automatically updated via a trigger
- Foreign keys ensure referential integrity
