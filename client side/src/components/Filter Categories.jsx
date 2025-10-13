import React from "react";

export default function FilterCategories({ selectedCategory, onCategoryChange }) {

function handleFocus(e) {
    e.target.style.backgroundColor = "lightgreen";
}

function handleBlur(e) {
    e.target.style.backgroundColor = "";
}

    return (
        <div className="filter-categories">
            <label htmlFor="category-filter">Filter Expenses by Category:</label>
            <select 
                id="category-filter" 
                value={selectedCategory} 
                onChange={(e) => onCategoryChange(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
            >
                <option value="all">All</option>
                <option value="food">Food</option>
                <option value="transport">Transport</option>
                <option value="entertainment">Entertainment</option>
                <option value="utilities">Utilities</option>
                <option value="other">Other</option>
            </select>
        </div>
    );
}
