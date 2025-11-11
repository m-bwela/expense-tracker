import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Heading from './Heading';
import Footer from './Footer';
import Input from './Input';
import FilterCategories from './Filter Categories';
import Navbar from './Navbar';
import '../assets/main.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import api from '../services/api';

// Import auth components
import Login from './auth/Login';
import Register from './auth/Register';
import { AuthProvider } from '../context/AuthContext';
import PrivateRoute from './routing/PrivateRoute';

function Dashboard() {
  const [expenses, setExpenses] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [loading, setLoading] = React.useState(true);

  // Fetch expenses from database when component mounts
  React.useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await api.get('/expenses');
        setExpenses(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching expenses:', error);
        setLoading(false);
      }
    };
    fetchExpenses();
  }, []);
  
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

  async function addExpense(newExpense) {
    try {
      // Send to backend API
      const response = await api.post('/expenses', {
        expense_name: newExpense.expenseName,
        amount: newExpense.newAmount,
        category: newExpense.newCategory,
        expense_date: newExpense.newDate
      });
      
      // Add the returned expense (with database ID) to state
      setExpenses(prevExpenses => [...prevExpenses, response.data]);
    } catch (error) {
      console.error('Error adding expense:', error);
      alert('Failed to add expense. Please try again.');
    }
  }

  async function handleDelete(id) {
    try {
      // Delete from backend API
      await api.delete(`/expenses/${id}`);
      
      // Remove from state
      setExpenses(prevExpenses => {
        return prevExpenses.filter((expenseItem) => {
          return expenseItem.id !== id;
        });
      });
    } catch (error) {
      console.error('Error deleting expense:', error);
      alert('Failed to delete expense. Please try again.');
    }
  }

  async function handleEdit(id, updatedExpense) {
    try {
      // Update in backend API
      const response = await api.put(`/expenses/${id}`, {
        expense_name: updatedExpense.expenseName,
        amount: updatedExpense.newAmount,
        category: updatedExpense.newCategory,
        expense_date: updatedExpense.newDate
      });
      
      // Update in state
      setExpenses(prevExpenses => {
        return prevExpenses.map((expenseItem) => {
          if (expenseItem.id === id) {
            return response.data;
          } else {
            return expenseItem;
          }
        });
      });
    } catch (error) {
      console.error('Error updating expense:', error);
      alert('Failed to update expense. Please try again.');
    }
  }

  return (
    <>
      <Navbar />
      <main className="container">
        <Heading />
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
            {loading ? (
              <tr>
                <td colSpan="5" style={{textAlign: 'center'}}>Loading expenses...</td>
              </tr>
            ) : getFilteredExpenses().length === 0 ? (
              <tr>
                <td colSpan="5" style={{textAlign: 'center'}}>No expenses yet. Add your first expense above!</td>
              </tr>
            ) : (
              getFilteredExpenses().map((expenseItem) => (
                <tr key={expenseItem.id}>
                  <td>{expenseItem.expense_name}</td>
                  <td>${expenseItem.amount}</td>
                  <td>{expenseItem.category}</td>
                  <td>{new Date(expenseItem.date).toLocaleDateString()}</td>
                  <td>
                    <button 
                      style={{color: "blue", backgroundColor: "transparent", borderRadius: "4px"}} 
                      onClick={() => handleEdit(expenseItem.id, {
                        expenseName: prompt("Enter new expense name:", expenseItem.expense_name) || expenseItem.expense_name,
                        newAmount: prompt("Enter new amount:", expenseItem.amount) || expenseItem.amount,
                        newCategory: prompt("Enter new category:", expenseItem.category) || expenseItem.category,
                        newDate: prompt("Enter new date (YYYY-MM-DD):", expenseItem.date.split('T')[0]) || expenseItem.date.split('T')[0],
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
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;