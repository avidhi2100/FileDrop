import React, {useState} from "react";
import { BrowserRouter as Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();
    const[userName, setUserName] = useState("");
    const[userPassword, setUserPassword] = useState("");
    const[userRole, setUserRole] = useState("");
    localStorage.setItem("userName", userName);
    async function login(event) {
        event.preventDefault();
        try {
            await axios.post("http://localhost:8080/api/v1/user/login", {
                userName: userName,
                userPassword: userPassword,
                userRole: userRole
            }).then((res) =>
            {
                navigate("/home");

            });
        } catch(err) {
            if(err.response.status === 401) {
                alert("Password does not match");
            } else if(err.response.status === 404) {
                alert("User does not exist");
            } else {
                alert(err);
            }
        }
    }
  return (
    <>
      <Nav />
      <p className="caccount">Login</p>
      <input type="text"  required={true} placeholder="Username" value={userName} onChange={(event) => {
          setUserName(event.target.value);}} ></input>
      <input type="password" required={true} placeholder="Password" value={userPassword} onChange={(event) => {
          setUserPassword(event.target.value);
      }}></input>
        <select className="role" value={userRole} onChange={(event => {
            setUserRole(event.target.value);
        })}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
        </select>
      <button
        className="submit"
        onClick={login}>
        Log In
      </button>
    </>
  );
};

export default Login;
