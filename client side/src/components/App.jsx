import React from 'react';
import { v4 as uuidv4} from 'uuid';
import Heading from './Heading';
import Footer from './Footer';
import Input from './Input';
import ExpenseTable from './Expense Table';
import FilterCategories from './Filter Categories';
import '../assets/main.css';

function App() {

  const [expenses, setExpenses] = React.useState([]);

  function addExpense(newExpense) {
    const expenseWithId = {...newExpense, id: uuidv4()};
    setExpenses(prevExpenses => {
      return [...prevExpenses, expenseWithId];
    })
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
      prevExpenses.map((expenseItem) => {
        if (expenseItem.id === id) {
          return {...expenseItem, ...updatedExpense};
        } else {
          return expenseItem;
        }
      })
    })
  }

  return (
    <main className="container">
      <Heading />
      <Input 
        onExpenseAdd={addExpense}
      />
      {expenses.map((expenseItem) => {
        return (
        <ExpenseTable
          key={expenseItem.id}
          id={expenseItem.id} 
          expenseName={expenseItem.expenseName}
          newAmount={expenseItem.newAmount}
          newCategory={expenseItem.newCategory}
          newDate={expenseItem.newDate}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
        );
      })}
      <FilterCategories />
      <Footer />
    </main>
  )
}

export default App
