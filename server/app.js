const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Trust proxy (needed for deployment platforms like Render, Railway, etc.)
app.set('trust proxy', 1);

// CORS configuration
const corsOptions = {
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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