import React from "react";
import "./components.css";

const NavForProfile = () => {
  return (
    <nav className="nav">
      <a href="/home" className="site-title">
        FileDrop
      </a>
      <ul>
          <li>{localStorage.getItem("userName")}</li>
        <li>
          <a href="/login" onClick={() => {
              localStorage.clear();
          }}>Log Out</a>
        </li>
      </ul>
    </nav>
  );
};
export default NavForProfile;
