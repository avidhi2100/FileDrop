import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { FaFile } from "react-icons/fa";
import { FaBars, FaUserAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/home",
      name: "Home",
      icon: <FaHome />,
    },
    {
      path: "/login",
      name: "Log Out",
      icon: <FaSignOutAlt />,
    },
  ];
  return (
    <div className="container">
      <div style={{ width: isOpen ? "200px" : "50px" }} className="SideBar">
        <div className="top-section">
          <div className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeclassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
