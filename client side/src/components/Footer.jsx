import React from "react";

export default function Footer() {
    const yourName = "Tye Nzambu";
    const year = new Date().getFullYear();
    return (
        <footer className="footer">
            <p>&copy; 2025 - {year} Personal Expense Tracker. All rights reserved.</p>
            <p>Created by {yourName}</p>
            <p>Follow me on:</p>
            <a className="fa fa-linkedin" href="https://www.linkedin.com/in/tye-nzambu-07254muzan"></a>
            <a className="fa fa-twitter" href="https://x.com/Tyejoseph1"></a>
            <a className="fa fa-github" href="https://github.com/m-bwela"></a>
        </footer>
    )
}