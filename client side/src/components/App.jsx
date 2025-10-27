import React, { useEffect, useState } from 'react';
import Heading from './Heading';
import Footer from './Footer';
import Input from './Input';
import FilterCategories from './Filter Categories';
import '../assets/main.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import api from '../services/api';

function App() {

  const [expenses, setExpenses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch expenses from API when component mounts
  useEffect(() => {
    fetchExpenses();
  }, []);
  
  // Fetch all expenses from the backend
  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const response = await api.get('/expenses');
      setExpenses(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching expenses:', err);
      setError('Failed to load expenses. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Calculate the total amount of all filtered expenses
  const calculateTotal = () => {
    return getFilteredExpenses().reduce((total, expense) => {
      return total + Number(expense.amount);
    }, 0).toFixed(2);
  };
  
  // Get expenses filtered by the selected category
  const getFilteredExpenses = () => {
    if (selectedCategory === "all") {
      return expenses;
    }
    return expenses.filter(expense => expense.category === selectedCategory);
  };

  // Add expense via API
  async function addExpense(newExpense) {
    try {
      const response = await api.post('/expenses', {
        name: newExpense.expenseName,
        amount: newExpense.newAmount,
        category: newExpense.newCategory,
        date: newExpense.newDate
      });
      
      // Add the new expense to state
      setExpenses(prevExpenses => [...prevExpenses, response.data]);
      setError(null);
    } catch (err) {
      console.error('Error adding expense:', err);
      setError('Failed to add expense. Please try again.');
    }
  }

  // Delete expense via API
  async function handleDelete(id) {
    try {
      await api.delete(`/expenses/${id}`);
      
      // Remove from state
      setExpenses(prevExpenses => 
        prevExpenses.filter(expenseItem => expenseItem.id !== id)
      );
      setError(null);
    } catch (err) {
      console.error('Error deleting expense:', err);
      setError('Failed to delete expense. Please try again.');
    }
  }

  // Edit expense via API
  async function handleEdit(id, updatedExpense) {
    try {
      const response = await api.put(`/expenses/${id}`, {
        name: updatedExpense.expenseName,
        amount: updatedExpense.newAmount,
        category: updatedExpense.newCategory,
        date: updatedExpense.newDate
      });
      
      // Update state
      setExpenses(prevExpenses =>
        prevExpenses.map(expenseItem =>
          expenseItem.id === id ? response.data : expenseItem
        )
      );
      setError(null);
    } catch (err) {
      console.error('Error updating expense:', err);
      setError('Failed to update expense. Please try again.');
    }
  }

  // Show loading state
  if (loading) {
    return (
      <main className="container">
        <Heading />
        <div style={{ textAlign: 'center', padding: '50px', color: '#fff' }}>
          Loading expenses...
        </div>
      </main>
    );
  }

  return (
    <main className="container">
      <Heading />
      
      {/* Show error message if there's an error */}
      {error && (
        <div style={{ 
          padding: '10px', 
          marginBottom: '20px', 
          backgroundColor: 'rgba(255, 0, 0, 0.2)', 
          border: '1px solid #f5c6cb', 
          borderRadius: '4px', 
          color: '#fff' 
        }}>
          {error}
        </div>
      )}
      
      <Input 
        onExpenseAdd={addExpense}
      />
      <FilterCategories 
        selectedCategory={selectedCategory} 
        onCategoryChange={setSelectedCategory} 
      />
      <div className="expense-table">
        <table>
          <thead>
            <tr>
              <th>Expense Name</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {getFilteredExpenses().length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: '#fff' }}>
                  No expenses found. Add your first expense above!
                </td>
              </tr>
            ) : (
              getFilteredExpenses().map((expenseItem) => (
                <tr key={expenseItem.id}>
                  <td>{expenseItem.expense_name}</td>
                  <td>${expenseItem.amount}</td>
                  <td>{expenseItem.category}</td>
                  <td>{expenseItem.date}</td>
                  <td>
                    <button 
                      style={{color: "blue", backgroundColor: "transparent", borderRadius: "4px"}} 
                      onClick={() => handleEdit(expenseItem.id, {
                        expenseName: prompt("Enter new expense name:", expenseItem.expense_name) || expenseItem.expense_name,
                        newAmount: prompt("Enter new amount:", expenseItem.amount) || expenseItem.amount,
                        newCategory: prompt("Enter new category:", expenseItem.category) || expenseItem.category,
                        newDate: prompt("Enter new date (YYYY-MM-DD):", expenseItem.date) || expenseItem.date,
                      })}>
                      <EditIcon />
                    </button>
                    <button 
                      onClick={() => handleDelete(expenseItem.id)} 
                      style={{color: "red", backgroundColor: "transparent", borderRadius: "4px", marginLeft: "8px"}}>
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="total-amount">
          <strong>Total:</strong> $<span id="total-amount">{calculateTotal()}</span>
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default App
