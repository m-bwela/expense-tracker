const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware - CORS configuration for production
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'Expense Tracker API is running' });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/expenses', require('./routes/expenses'));

// TODO: Add users routes when needed
// app.use('/api/users', require('./routes/users'));

module.exports = app;