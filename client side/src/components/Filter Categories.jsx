import React from "react";

export default function FilterCategories() {
    return (
        <div className="filter-categories">
            <label htmlFor="category-filter">Filter Expenses by Category:</label>
            <select id="category-filter">
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
