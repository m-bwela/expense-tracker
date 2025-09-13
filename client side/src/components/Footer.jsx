import React from "react";

export default function Footer() {
    const yourName = "Tye Nzambu";
    const year = new Date().getFullYear();
    return (
        <footer className="footer">
            <p>&copy; {year} Personal Expense Tracker. All rights reserved.</p>
            <p>Created by {yourName}</p>
            <p>Follow me on:</p>
            <a className="fa fa-linkedin" href="https://ke.linkedin.com/in/tye-joseph-0bb158239/"></a>
            <a className="fa fa-twitter" href="https://x.com/Tyejoseph1"></a>
            <a className="fa fa-github" href="https://github.com/m-bwela"></a>
        </footer>
    )
}