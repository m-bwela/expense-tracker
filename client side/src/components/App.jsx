import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Heading from './Heading';
import Footer from './Footer';
import Input from './Input';
import FilterCategories from './Filter Categories';
import Navbar from './Navbar';
import '../assets/main.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// Import auth components
import Login from './auth/Login';
import Register from './auth/Register';
import { AuthProvider } from '../context/AuthContext';
import PrivateRoute from './routing/PrivateRoute';

function Dashboard() {
  const [expenses, setExpenses] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  
  // Calculate the total amount of all filtered expenses
  const calculateTotal = () => {
    return getFilteredExpenses().reduce((total, expense) => {
      return total + Number(expense.newAmount);
    }, 0).toFixed(2);
  };
  
  // Get expenses filtered by the selected category
  const getFilteredExpenses = () => {
    if (selectedCategory === "all") {
      return expenses;
    }
    return expenses.filter(expense => expense.newCategory === selectedCategory);
  };

  function addExpense(newExpense) {
    const expenseWithId = {...newExpense, id: uuidv4()};
    setExpenses(prevExpenses => {
      return [...prevExpenses, expenseWithId];
    });
  }

  function handleDelete(id) {
    setExpenses(prevExpenses => {
      return prevExpenses.filter((expenseItem) => {
        return expenseItem.id !== id;
      });
    });
  }

  function handleEdit(id, updatedExpense) { 
    setExpenses(prevExpenses => {
      return prevExpenses.map((expenseItem) => {
        if (expenseItem.id === id) {
          return {...expenseItem, ...updatedExpense};
        } else {
          return expenseItem;
        }
      });
    });
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
            {getFilteredExpenses().map((expenseItem) => (
              <tr key={expenseItem.id}>
                <td>{expenseItem.expenseName}</td>
                <td>${expenseItem.newAmount}</td>
                <td>{expenseItem.newCategory}</td>
                <td>{expenseItem.newDate}</td>
                <td>
                  <button 
                    style={{color: "blue", backgroundColor: "transparent", borderRadius: "4px"}} 
                    onClick={() => handleEdit(expenseItem.id, {
                      expenseName: prompt("Enter new expense name:", expenseItem.expenseName) || expenseItem.expenseName,
                      newAmount: prompt("Enter new amount:", expenseItem.newAmount) || expenseItem.newAmount,
                      newCategory: prompt("Enter new category:", expenseItem.newCategory) || expenseItem.newCategory,
                      newDate: prompt("Enter new date (YYYY-MM-DD):", expenseItem.newDate) || expenseItem.newDate,
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
            ))}
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