# 💰 Expense Tracker - Full Stack Application

A modern, full-stack expense tracking application built with React, Node.js, Express, and PostgreSQL.

![Tech Stack](https://img.shields.io/badge/React-19-blue) ![Node.js](https://img.shields.io/badge/Node.js-Express-green) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)

## ✨ Features

- 🔐 **User Authentication** - Secure JWT-based login and registration
- 💵 **Expense Management** - Add, edit, delete expenses with categories
- 📊 **Category Filtering** - Filter expenses by category
- 📈 **Real-time Totals** - Automatic expense total calculation
- 🎨 **Modern UI** - Beautiful gradient design with smooth animations
- 📱 **Responsive** - Works perfectly on mobile and desktop
- 💾 **Persistent Data** - All data saved to PostgreSQL database

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 16+ installed
- PostgreSQL installed and running
- Git

### 1. Clone the repository
```bash
git clone https://github.com/m-bwela/expense-tracker.git
cd expense-tracker
```

### 2. Setup Backend
```bash
cd server
npm install

# Create .env file
echo "PORT=5000
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_password
DB_DATABASE=expense_tracker
DB_PORT=5432
JWT_SECRET=your_jwt_secret_here" > .env

# Create database and tables
# Use pgAdmin or psql to run: server/schema.sql

# Start backend
npm run dev
```

Backend will run on `http://localhost:5000`

### 3. Setup Frontend
```bash
cd "../client side"
npm install

# Start frontend
npm run dev
```

Frontend will run on `http://localhost:5173`

### 4. Test the app
1. Visit `http://localhost:5173`
2. Register a new account
3. Add some expenses
4. Logout and login to verify persistence

## 🌐 Deployment

This app is designed to be deployed on free hosting platforms:

- **Backend + Database**: Render (Free tier)
- **Frontend**: Vercel (Free tier)

📖 **Full deployment guide**: See [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📁 Project Structure

```
expense-tracker/
├── client side/          # React frontend (Vite)
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── context/      # Auth context
│   │   ├── services/     # API service
│   │   └── assets/       # CSS and images
│   └── package.json
│
├── server/              # Node.js backend
│   ├── config/          # Database config
│   ├── routes/          # API routes
│   ├── middleware/      # Auth middleware
│   ├── schema.sql       # Database schema
│   └── package.json
│
└── DEPLOYMENT.md        # Deployment instructions
```

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool
- **React Router** - Navigation
- **Axios** - HTTP client
- **Material-UI Icons** - Icons
- **Context API** - State management

### Backend
- **Node.js** - Runtime
- **Express 5** - Web framework
- **PostgreSQL** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin support

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Expenses
- `GET /api/expenses` - Get all user expenses (protected)
- `POST /api/expenses` - Create expense (protected)
- `PUT /api/expenses/:id` - Update expense (protected)
- `DELETE /api/expenses/:id` - Delete expense (protected)

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- Input validation
- SQL injection prevention (parameterized queries)
- CORS configuration

## 🎨 Screenshots

### Login Page
Modern gradient design with smooth animations

### Dashboard
Clean expense table with filtering and totals

### Responsive Design
Works perfectly on all devices

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**m-bwela**
- GitHub: [@m-bwela](https://github.com/m-bwela)

## 🙏 Acknowledgments

- Icons from Material-UI
- Gradient inspiration from modern SaaS designs
- Built with love and ☕

---

**Happy expense tracking! 💰**
