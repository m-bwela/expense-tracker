const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'Expense Tracker API is running' });
});

// Routes
app.use('/api/expenses', require('./routes/expenses'));

// TODO: Add these routes when you create login/register functionality
// app.use('/api/users', require('./routes/users'));
// app.use('/api/auth', require('./routes/auth'));

module.exports = app;