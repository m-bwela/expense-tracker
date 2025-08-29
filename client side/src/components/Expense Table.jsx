import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function ExpenseTable(props) {


function handleClick() {
    props.onDelete(props.id);
}


    return (
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

                    <tr>
                        <td>{props.expenseName}</td>
                        <td>${props.newAmount}</td>
                        <td>{props.newCategory}</td>
                        <td>{props.newDate}</td>
                        <td>
                            <button style={{color: "blue", backgroundColor: "transparent", borderRadius: "4px"}}><EditIcon /></button>
                            <button onClick={handleClick} style={{color: "red", backgroundColor: "transparent", borderRadius: "4px", marginLeft: "8px"}}><DeleteIcon /></button>
                        </td>
                    </tr>
                    
                </tbody>
            </table>
            <div className="total-amount">
                <strong>Total:</strong> $<span id="total-amount">{props.newAmount}</span>
            </div>
        </div>
    )
}