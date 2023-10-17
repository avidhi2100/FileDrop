import React from "react";
import { BrowserRouter as Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";

const App = () => {
  const navigate = useNavigate();
  return (
    <>
      <Nav />
      <div>
        <button
          className="signup"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Sign Up
        </button>
        <button
          className="login"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </button>
      </div>

      <div class="air air1"></div>
      <div class="air air2"></div>
      <div class="air air3"></div>
      <div class="air air4"></div>
    </>
  );
};

export default App;
