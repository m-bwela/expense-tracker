import React, { useState } from "react";

export default function Input(props) {
const [newExpense, setNewExpense] = useState({
  expenseName: "",
  newAmount: 0,
  newCategory: "",
  newDate: ""
});

function handleSubmit(event) {
  if (!newExpense.expenseName || !newExpense.newAmount || !newExpense.newCategory || !newExpense.newDate) {
    alert("Please fill in all fields.");
    event.preventDefault();
    return;
  }
props.onExpenseAdd(newExpense);
  setNewExpense({
    expenseName: "",
    newAmount: 0,
    newCategory: "",
    newDate: ""
  })
  event.preventDefault();
}

function handleFocus(e) {
      e.target.style.backgroundColor = "lightgreen";
    }

    function handleBlur(e) {
      e.target.style.backgroundColor = "";
    }

    return (
        <form id="expense-form" >
          <input type="text" placeholder="Expense Name" id="expense-name" value={newExpense.expenseName} onChange={(e) => setNewExpense({ ...newExpense, expenseName: e.target.value })} onFocus={handleFocus} onBlur={handleBlur} />
          <input type="number" placeholder="Amount" id="expense-amount" value={newExpense.newAmount} onChange={(e) => setNewExpense({ ...newExpense, newAmount: e.target.value })} onFocus={handleFocus} onBlur={handleBlur} />
          <select id="expense-category" value={newExpense.newCategory} onChange={(e) => setNewExpense({ ...newExpense, newCategory: e.target.value })} onFocus={handleFocus} onBlur={handleBlur}>
            <option value="">Select Category</option>
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="entertainment">Entertainment</option>
            <option value="utilities">Utilities</option>
            <option value="other">Other</option>
          </select>
          <input type="date" id="expense-date" value={newExpense.newDate} onChange={(e) => setNewExpense({ ...newExpense, newDate: e.target.value })} onFocus={handleFocus} onBlur={handleBlur} />
            <button type="submit" id="add-expense-btn" onClick={handleSubmit}>Add Expense</button>
        </form>
    )
}