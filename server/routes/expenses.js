const express = require('express');
const router = express.Router();
const pool = require('../config//db'); // Assuming you have a db.js file exporting your database pool

// Get all expenses
router.get('/', auth, async (req, res) => {
    try {
        const expenses = await pool.query(
            'SELECT * FROM expenses WHERE user_id = $1 ORDER BY date DESC',
            [req.user.id]
        );
        res.json(expenses.rows);
    } catch (error) {
        console.error('Error fetching expenses:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Add a new expense
router.post('/', auth, async (req, res) => {
    const { name, amount, category, date } = req.body;
    try {
        const newExpense = await pool.query(
            'INSERT INTO expenses (user_id, name, amount, category, date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [req.user.id, name, amount, category, date]
        );
        res.json(newExpense.rows[0]);
    } catch (error) {
        console.error('Error adding expense:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update an expense
router.put('/:id', auth, async (req, res) => {
    const { id } = req.params;
    const { name, amount, category, date } = req.body;
    try {
        const updatedExpense = await pool.query(
            'UPDATE expenses SET name = $1, amount = $2, category = $3, date = $4 WHERE id = $5 AND user_id = $6 RETURNING *',
            [name, amount, category, date, id, req.user.id]
        );
        res.json(updatedExpense.rows[0]);
    } catch (error) {
        console.error('Error updating expense:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete an expense
router.delete('/:id', auth, async (req, res) => {
    const { id } = req.params;
    try {
        const deletedExpense = await pool.query(
            'DELETE FROM expenses WHERE id = $1 AND user_id = $2 RETURNING *',
            [id, req.user.id]
        );
        res.json(deletedExpense.rows[0]);
    } catch (error) {
        console.error('Error deleting expense:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
