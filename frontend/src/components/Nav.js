import React from "react";
import "./components.css";

const Nav = () => {
  return (
    <nav className="nav">
      <a href="/" className="site-title">
        FileDrop
      </a>
      <ul>
        <li>
          <a href="/signup">Sign Up</a>
        </li>
        <li>
          <a href="/login">Login</a>
        </li>
      </ul>
    </nav>
  );
};
export default Nav;
