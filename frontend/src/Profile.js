import React from "react";
import "./App.css";
import NavForProfile from "./components/NavForProfile";
import Sidebar from "./components/Sidebar";

const Profile = () => {
  return (
    <>
      <NavForProfile />
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="profile">
        <h1>My Profile</h1>
      </div>
    </>
  );
};

export default Profile;
