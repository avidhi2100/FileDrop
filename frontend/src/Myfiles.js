import React from "react";
import "./App.css";
import NavForProfile from "./components/NavForProfile";
import Sidebar from "./components/Sidebar";

const Myfiles = () => {
  return (
    <>
      <NavForProfile />
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="files">
        <h1>My Files</h1>
      </div>
    </>
  );
};

export default Myfiles;
